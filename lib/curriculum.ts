import {bridgeLessons} from './content/bridges';
import {contextWords} from './content/context-words';
import {transferLessons} from './content/transfer';
import baseline from './content/checkpoint-baseline.json';
import type {Lesson,Question,Scenario} from './types';
import {legacyLessons,legacyScenarios} from './content/legacy';
import {n5} from './content/n5';
import {n4} from './content/n4';
import {n3} from './content/n3';
import {kanaLessons} from './content/kana';
import {comprehension} from './content/comprehension';
import {wordLessons} from './content/word-lessons';
import {unitScenarios} from './content/scenarios';
export type {Lesson,Question,Scenario,Skill} from './types';
export {kanaReference} from './content/kana';
export const levels=[{id:'N5',label:'Fondasi',available:true},{id:'N4',label:'Keseharian',available:true},{id:'N3',label:'Ekspresi & pendapat',available:true},{id:'N2',label:'Belum tersedia',available:false},{id:'N1',label:'Belum tersedia',available:false}];
const legacy=legacyLessons.map(l=>({...l,unit:l.id==='kana-1'?'01 · Huruf dan bunyi':l.id==='intro'?'02 · Diri dan benda':l.id==='request'?'01 · Bantuan dan aturan':'01 · Perubahan dan sudut pandang',skill:l.id==='kana-1'?'kana' as const:'grammar' as const,scenarioId:l.id==='kana-1'?'n5-01':l.id==='intro'?'n5-02':l.id==='request'?'n4-01':'n3-01'}));
const content:Lesson[]=[...legacy,...kanaLessons,...n5,...n4,...n3,...wordLessons,...comprehension,...bridgeLessons,...contextWords,...transferLessons];
const before:Record<string,string[]>={'n5-topic':['n5-question-words','n5-noun-past'],'n5-masu':['n5-verb-groups','n5-dictionary'],'n5-before-after':['n5-request-basic'],'n4-intention':['n4-volitional-form']};
for(const [target,ids] of Object.entries(before)){for(const id of ids){const at=content.findIndex(l=>l.id===id);const [lesson]=content.splice(at,1);content.splice(content.findIndex(l=>l.id===target),0,lesson)}}
export const units=levels.filter(l=>l.available).flatMap(level=>[...new Set(content.filter(l=>l.level===level.id).map(l=>l.unit))].sort().map(title=>({id:level.id.toLowerCase()+'-'+title.slice(0,2),level:level.id,title,lessonIds:content.filter(l=>l.level===level.id&&l.unit===title).map(l=>l.id)})));
const checkpoints:Lesson[]=units.map(u=>{const members=content.filter(l=>u.lessonIds.includes(l.id));return {id:'check-'+u.id,level:u.level,unit:u.title,title:'Evaluasi unit '+u.title.slice(0,2),subtitle:'Gabungkan pemahaman dari semua pelajaran dalam unit ini',minutes:15,goal:'Meninjau pola, bacaan kata, dan pemahaman konteks pada unit ini.',explanation:'Kerjakan setelah materi unit. Evaluasi ini mempertahankan soal inti agar progres lama tetap berlaku. Materi tambahan diuji di latihan masing-masing dan evaluasi akhir level. Setiap soal disertai pembahasan. Penyelesaian berarti semua soal akhirnya terjawab benar, bukan bukti lulus level JLPT. Kesalahan tetap masuk riwayat dan jadwal pengulangan.',examples:members[0].examples.slice(0,1),vocabulary:members.flatMap(l=>l.vocabulary).slice(0,8),guided:'Sebelum mulai, coba ringkas tiap pelajaran tanpa melihat. Jika kesulitan, buka kembali pelajaran terkait. Boleh memperbaiki jawaban setelah membaca pembahasan.',summary:'Ulangi pola yang masih sulit, lalu gunakan dalam skenario kaiwa unit ini. Nilai latihan dan kelancaran percakapan tetap dinilai terpisah.',questions:((baseline as Record<string,Question[]>)[u.id]||members.map(l=>({...l.questions[0],id:l.id+'--'+l.questions[0].id}))),status:'draft',reviewStatus:'needs-review',skill:'assessment',scenarioId:u.id,prerequisites:members.map(l=>l.id)}});
export const lessons:Lesson[]=units.flatMap(u=>[...content.filter(l=>l.level===u.level&&l.unit===u.title),...checkpoints.filter(l=>l.level===u.level&&l.unit===u.title)]);
export const scenarios:Scenario[]=[...unitScenarios,...legacyScenarios];
export const curriculumStats={lessons:lessons.filter(l=>l.skill!=='assessment').length,checkpoints:checkpoints.length,questions:lessons.reduce((n,l)=>n+l.questions.length,0),units:units.length,vocabulary:new Set(content.flatMap(l=>l.vocabulary.map(v=>v.jp+'|'+v.reading))).size,reading:content.filter(l=>l.skill==='reading').length,listening:content.filter(l=>l.skill==='listening').length,scenarios:unitScenarios.length};
export function getLearningPath(target:string,fromZero:boolean){const index=levels.findIndex(l=>l.id===target);const included=fromZero?levels.slice(0,index+1).map(l=>l.id):[target];return lessons.filter(l=>included.includes(l.level));}
export const normalize=(s:string)=>s.normalize('NFKC').replace(/[\s。．、，,.!?！？]/g,'').toLowerCase();
export function grade(q:Question,answer:string){return q.answers.some(a=>normalize(a)===normalize(answer));}
export function schedule(previous:number,correct:boolean,now=Date.now()){const days=correct?(previous===0?1:Math.min(previous*2,60)):0;return {intervalDays:days,dueAt:now+(correct?days*86400000:600000)};}

// Practice before a successful card is due must not inflate its interval.
// Correcting an error (interval 0) starts the first one-day interval.
export function scheduleAnswer(old:{interval_days:number;due_at:number}|null,correct:boolean,now=Date.now()){
 return correct&&old&&old.interval_days>0&&old.due_at>now
  ?{intervalDays:old.interval_days,dueAt:old.due_at}
  :schedule(old?.interval_days||0,correct,now);
}
