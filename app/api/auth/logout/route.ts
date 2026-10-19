import {sameOrigin} from '../../../../lib/request-origin';
import {NextResponse} from 'next/server';
import {sessionCookie} from '../../../../lib/auth-core';
export async function POST(req:Request){
 if(!sameOrigin(req))return NextResponse.json({error:'Permintaan tidak diizinkan.'},{status:403});
 const r=NextResponse.redirect(new URL('/',req.headers.get('origin')!),303);r.cookies.set(sessionCookie,'',{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:0});return r;
}
