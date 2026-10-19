import {sameOrigin} from '../../../lib/request-origin';
export const runtime='nodejs';
import {getUser} from '../../../lib/auth';
import {env} from '../../../lib/database';
import {z} from 'zod';
import {examBanks,examVersion,publicExam,scoreExam} from '../../../lib/assessment';
export const dynamic='force-dynamic';
const schema=z.object({id:z.string().uuid(),level:z.enum(['N5','N4','N3']),answers:z.array(z.object({id:z.string().max(50),answer:z.string().max(500),usedTranscript:z.boolean().optional()})).max(20)});
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(req:Request){try{
 const u=await getUser();if(!u)return json({error:'Silakan masuk dahulu.'},401);
 if(!env.DB)return json({error:'Database lokal belum tersedia.'},503);
 const level=new URL(req.url).searchParams.get('level')||'N5';if(!examBanks[level])return json({error:'Level belum tersedia.'},400);
 const history=await env.DB.prepare('SELECT id,result,created_at FROM level_assessments WHERE user_id=? AND level=? ORDER BY created_at DESC LIMIT 10').bind(u.userId,level).all<{id:string;result:string;created_at:number}>();
 return json({version:examVersion,questions:publicExam(level),history:history.results.map(r=>({id:r.id,createdAt:r.created_at,result:JSON.parse(r.result)}))});
 }catch{return json({error:'Evaluasi belum bisa dimuat. Periksa koneksi dan konfigurasi database.'},503)}}
export async function POST(req:Request){try{
 if(!sameOrigin(req))return json({error:'Asal permintaan tidak diizinkan.'},403);
 const u=await getUser();if(!u)return json({error:'Silakan masuk dahulu.'},401);
 if(!env.DB)return json({error:'Database lokal belum tersedia.'},503);
 let raw;try{raw=await req.json()}catch{return json({error:'Permintaan tidak valid.'},400)}
 const parsed=schema.safeParse(raw);if(!parsed.success)return json({error:'Jawaban evaluasi tidak valid.'},400);
 const b=parsed.data;const ids=new Set(b.answers.map(a=>a.id));
 if(ids.size!==b.answers.length||b.answers.some(a=>!examBanks[b.level].some(q=>q.id===a.id)))return json({error:'Soal tidak sesuai level atau terduplikasi.'},400);
 const result=scoreExam(b.level,b.answers);
 await env.DB.prepare('INSERT OR IGNORE INTO level_assessments(id,user_id,level,version,result,created_at) VALUES(?,?,?,?,?,?)').bind(b.id,u.userId,b.level,examVersion,JSON.stringify(result),Date.now()).run();
 const saved=await env.DB.prepare('SELECT result FROM level_assessments WHERE id=? AND user_id=?').bind(b.id,u.userId).first<{result:string}>();
 if(!saved)return json({error:'ID evaluasi tidak dapat digunakan. Mulai evaluasi baru.'},409);
 return json({id:b.id,result:JSON.parse(saved.result)});
 }catch{return json({error:'Hasil belum tersimpan. Coba kirim kembali; pengiriman ulang tidak menggandakan hasil.'},503)}}
