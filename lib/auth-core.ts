import {createHash,createHmac,timingSafeEqual} from 'node:crypto';
export const sessionCookie='kotoba_session';
export const sessionSeconds=7*24*60*60;
export function authConfig(){
 const password=process.env.APP_PASSWORD||'',secret=process.env.SESSION_SECRET||'';
 if(password.length<12||secret.length<32)throw Error('Isi APP_PASSWORD minimal 12 karakter dan SESSION_SECRET minimal 32 karakter.');
 return {password,secret};
}
export function equalPassword(input:string){const {password}=authConfig();return timingSafeEqual(createHash('sha256').update(input).digest(),createHash('sha256').update(password).digest())}
function signature(value:string){const {password,secret}=authConfig();return createHmac('sha256',secret).update(password+'\0'+value).digest('base64url')}
export function createSession(now=Date.now()){const payload=Buffer.from(JSON.stringify({sub:'owner',exp:Math.floor(now/1000)+sessionSeconds})).toString('base64url');return payload+'.'+signature(payload)}
export function verifySession(token:string|undefined,now=Date.now()){
 if(!token||token.length>1024)return false;
 try{const [payload,sig,extra]=token.split('.');if(!payload||!sig||extra)return false;const expected=Buffer.from(signature(payload)),actual=Buffer.from(sig);if(actual.length!==expected.length||!timingSafeEqual(actual,expected))return false;const data=JSON.parse(Buffer.from(payload,'base64url').toString());return data.sub==='owner'&&Number.isInteger(data.exp)&&data.exp>Math.floor(now/1000)&&data.exp<=Math.floor(now/1000)+sessionSeconds}catch{return false}
}
