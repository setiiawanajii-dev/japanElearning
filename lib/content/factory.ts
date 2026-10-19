import type {Lesson,Question} from '../types';
export type Row = [string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string,string];
// ID, unit, title, goal, explanation, jp1, kana1, translation1, jp2, kana2,
// translation2, words(jp~reading~meaning;...), cloze, choices(correct first), reason, chunks, summary.
export function makeLessons(level:string,rows:Row[]):Lesson[]{return rows.map(r=>{
 const [id,unit,title,goal,explanation,jp,reading,translation,jp2,reading2,translation2,words,prompt,choices,reason,chunks,summary]=r;
 const vocabulary=words.split(';').map(x=>{const [jp,reading,id]=x.split('~');return {jp,reading,id}});
 const options=choices.split('|'); const pieces=chunks.split('|');
 const rotation=id.length%options.length;const shuffled=[...options.slice(rotation),...options.slice(0,rotation)];
 const q:Question[]=[{id:'form',kind:'choice',prompt,options:shuffled,answers:[options[0]],explanation:reason},
 {id:'order',kind:'order',prompt:'Susun kalimat: '+translation,options:[...pieces.slice(1),pieces[0]],answers:[pieces.join('')],explanation:summary+' Contoh: '+jp},
 {id:'reading',kind:'text',prompt:'Tulis cara baca dalam hiragana: '+vocabulary[0].jp,answers:[vocabulary[0].reading],explanation:vocabulary[0].jp+' dibaca '+vocabulary[0].reading+' dan berarti '+vocabulary[0].id+'. Perhatikan bacaannya dalam konteks pelajaran.'},
 {id:'meaning',kind:'choice',prompt:'Apa arti '+vocabulary[1].jp+' dalam pelajaran ini?',options:[vocabulary[2].id,vocabulary[1].id,vocabulary[0].id,vocabulary[3].id],answers:[vocabulary[1].id],explanation:vocabulary[1].jp+' ('+vocabulary[1].reading+') berarti '+vocabulary[1].id+'.'}];
 return {id,level,unit,title,subtitle:goal,minutes:level==='N5'?15:20,goal,explanation,examples:[{jp,reading,romaji:'',id:translation},{jp:jp2,reading:reading2,romaji:'',id:translation2}],vocabulary,guided:'Contoh terbimbing: '+prompt+' Jawaban: '+options[0]+'. '+reason+' Baca kembali dua kalimat contoh, lalu ganti satu unsur (orang, benda, tempat, atau waktu) tanpa mengubah pola sasaran.',summary,questions:q,status:'draft',reviewStatus:'needs-review',skill:'grammar',scenarioId:level.toLowerCase()+'-'+unit.slice(0,2),production:{prompt:'Buat satu kalimat baru untuk tujuan: '+goal,model:jp2,checklist:['Pola sasaran dipakai sesuai penjelasan.','Makna masuk akal dan partikel sesuai.','Ragam sopan atau santai sesuai lawan bicara.']}};
})}
