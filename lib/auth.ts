import {cookies} from 'next/headers';
import {sessionCookie,verifySession} from './auth-core';
export async function getUser(){
 const token=(await cookies()).get(sessionCookie)?.value;
 if(!verifySession(token))return null;
 return {userId:'owner',fullName:process.env.OWNER_NAME||'Teman belajar',email:'Akun pribadi'};
}
