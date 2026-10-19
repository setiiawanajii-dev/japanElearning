import {sameOrigin} from '../../../../lib/request-origin';
import {NextResponse} from 'next/server';
import {authConfig,createSession,equalPassword,sessionCookie,sessionSeconds} from '../../../../lib/auth-core';
import {env} from '../../../../lib/database';
export const runtime='nodejs';
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Permintaan tidak diizinkan.'},{status:403});
 try{
  authConfig();if(!env.DB)return NextResponse.json({error:'Aplikasi belum selesai dikonfigurasi.'},{status:503});
  const body=await req.json().catch(()=>null);
  if(typeof body?.password!=='string'||body.password.length>500)return NextResponse.json({error:'Masukkan kata sandi yang valid.'},{status:400});
  // Shared durable limiter for this single-owner app; no reliance on spoofable IP headers.
  const window=Math.floor(Date.now()/900000);
  const attempt=await env.DB.prepare('INSERT INTO login_attempts(bucket,window,count) VALUES(?,?,1) ON CONFLICT(bucket) DO UPDATE SET window=excluded.window,count=CASE WHEN login_attempts.window=excluded.window THEN login_attempts.count+1 ELSE 1 END WHERE login_attempts.window<>excluded.window OR login_attempts.count<20 RETURNING count').bind('owner',window).first();
  if(!attempt)return NextResponse.json({error:'Terlalu banyak percobaan masuk. Tunggu hingga 15 menit.'},{status:429,headers:{'Retry-After':'900'}});
  if(!equalPassword(body.password))return NextResponse.json({error:'Kata sandi tidak sesuai.'},{status:401});
  const response=NextResponse.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  response.cookies.set(sessionCookie,createSession(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:sessionSeconds});return response;
 }catch{return NextResponse.json({error:'Aplikasi belum siap. Periksa konfigurasi login dan database.'},{status:503})}
}
