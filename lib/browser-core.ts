import {z} from 'zod';
import {lessons,levels,scenarios,grade,scheduleAnswer} from './curriculum';
import {examBanks,scoreExam,examVersion,type ExamAnswer} from './assessment';
export const profileSchema=z.object({name:z.string().trim().min(1).max(50),level:z.string().refine(v=>levels.some(l=>l.id===v&&l.available)),minutes:z.number().int().min(5).max(120),exam:z.string().max(10),goal:z.enum(['sehari-hari','kehidupan di Jepang','pekerjaan','perjalanan']),start:z.enum(['zero','placement']),furigana:z.boolean(),romaji:z.boolean()});
const requestSchema=z.discriminatedUnion('action',[
 z.object({action:z.literal('profile'),profile:profileSchema}),
 z.object({action:z.literal('answer'),lessonId:z.string(),questionId:z.string(),answer:z.string().max(500),review:z.boolean().optional()}),
 z.object({action:z.literal('complete'),lessonId:z.string()}),
 z.object({action:z.literal('chat'),scenarioId:z.string(),message:z.string().trim().min(1).max(500),mode:z.enum(['learn','conversation'])})]);
import {demoReply} from './browser-demo';
const time=z.number().int().nonnegative();
const knownLesson=z.string().refine(id=>lessons.some(l=>l.id===id));
const answerSchema=z.object({id:z.string().max(50),answer:z.string().max(500),usedTranscript:z.boolean().optional()});
const examSchema=z.object({id:z.string().uuid(),level:z.enum(['N5','N4','N3']),answers:z.array(answerSchema).max(20),createdAt:time,version:z.literal(examVersion)}).refine(e=>new Set(e.answers.map(a=>a.id)).size===e.answers.length&&e.answers.every(a=>examBanks[e.level].some(q=>q.id===a.id)));
const validCard=(id:string)=>lessons.some(l=>l.questions.some(q=>l.id+':'+q.id===id));
export const stateSchema=z.object({
 version:z.literal(1),profile:profileSchema.nullable(),
 attempts:z.array(z.object({id:z.string(),lesson_id:knownLesson,question_id:z.string(),answer:z.string().max(500),correct:z.boolean(),created_at:time})).max(500),
 reviews:z.array(z.object({card_id:z.string().refine(validCard),interval_days:z.number().min(0).max(60),due_at:time})).max(2000),
 completions:z.array(z.object({lesson_id:knownLesson,created_at:time})).max(500),
 mastered:z.array(z.string().refine(validCard)).max(2000),
 chats:z.array(z.object({id:z.string(),scenario_id:z.string(),message:z.string().max(500),reply:z.string().max(2000),feedback:z.string().max(3000),created_at:time})).max(60),
 stats:z.object({attemptsTotal:time,correctTotal:time,chatsTotal:time}),
 exams:z.array(examSchema).max(30)
});
export type BrowserState=z.infer<typeof stateSchema>;
export function emptyState():BrowserState{return {version:1,profile:null,attempts:[],reviews:[],completions:[],mastered:[],chats:[],stats:{attemptsTotal:0,correctTotal:0,chatsTotal:0},exams:[]}}
export function applyAction(current:BrowserState,input:unknown,now=Date.now(),id=crypto.randomUUID()){
 const parsed=requestSchema.safeParse(input);if(!parsed.success)throw Error('Periksa kembali isian Anda.');const b=parsed.data;const state=structuredClone(current);let result:unknown={ok:true};
 if(b.action==='profile')state.profile=b.profile;
 if(b.action==='answer'){
  const l=lessons.find(l=>l.id===b.lessonId),q=l?.questions.find(q=>q.id===b.questionId);if(!l||!q)throw Error('Latihan tidak ditemukan.');
  const card_id=l.id+':'+q.id,old=state.reviews.find(r=>r.card_id===card_id);if(b.review&&(!old||old.due_at>now))throw Error('Kartu ini belum jatuh tempo.');
  const correct=grade(q,b.answer),next=scheduleAnswer(old??null,correct,now);
  state.attempts=[{id,lesson_id:l.id,question_id:q.id,answer:b.answer,correct,created_at:now},...state.attempts].slice(0,500);
  state.reviews=[...state.reviews.filter(r=>r.card_id!==card_id),{card_id,interval_days:next.intervalDays,due_at:next.dueAt}];
  if(correct&&!state.mastered.includes(card_id))state.mastered.push(card_id);
  state.stats.attemptsTotal++;if(correct)state.stats.correctTotal++;
  result={correct,explanation:q.explanation,accepted:q.answers[0],next};
 }
 if(b.action==='complete'){
  const l=lessons.find(l=>l.id===b.lessonId);if(!l||!l.questions.every(q=>state.mastered.includes(l.id+':'+q.id)))throw Error('Jawab semua latihan dengan benar sebelum menyelesaikan pelajaran.');
  if(!state.completions.some(c=>c.lesson_id===l.id))state.completions.push({lesson_id:l.id,created_at:now});
 }
 if(b.action==='chat'){
  const s=scenarios.find(s=>s.id===b.scenarioId);if(!s)throw Error('Skenario tidak ditemukan.');const reply=demoReply(s,b);
  state.chats=[{id,scenario_id:s.id,message:b.message,reply:reply.reply,feedback:reply.feedback,created_at:now},...state.chats].slice(0,60);state.stats.chatsTotal++;result=reply;
 }
 return {state,result};
}
export function saveExam(current:BrowserState,id:string,level:string,answers:ExamAnswer[],now=Date.now()){
 const exam=examSchema.parse({id,level,answers,createdAt:now,version:examVersion});const state=structuredClone(current),old=state.exams.find(e=>e.id===id);
 if(old&&old.level!==level)throw Error('Evaluasi tidak sesuai level.');
 const saved=old||exam;if(!old)state.exams=[exam,...state.exams.filter(e=>e.level===level).slice(0,9),...state.exams.filter(e=>e.level!==level)].sort((a,b)=>b.createdAt-a.createdAt);
 return {state,result:{id:saved.id,result:scoreExam(saved.level,saved.answers)}};
}
export function exportBackup(state:BrowserState){return JSON.stringify({app:'kotoba-browser',version:1,exportedAt:new Date().toISOString(),data:state},null,2)}
export function parseBackup(text:string){
 if(text.length>8_000_000)throw Error('Berkas cadangan terlalu besar.');
 try{const raw=JSON.parse(text);if(raw.app!=='kotoba-browser'||raw.version!==1)throw Error();return stateSchema.parse(raw.data)}catch{throw Error('Cadangan tidak valid atau tidak cocok dengan versi ini. Progres belum diubah.')}
}
