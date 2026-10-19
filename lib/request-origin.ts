/** Compare with the actual HTTP Host; NextURL normalizes 127.0.0.1 to localhost. */
export function sameOrigin(req:Request){
 const raw=req.headers.get('origin'),host=req.headers.get('host');
 if(!raw||!host)return false;
 try{const origin=new URL(raw);if(origin.origin!==raw||origin.host.toLowerCase()!==host.toLowerCase())return false;
  if(origin.protocol==='https:')return true;
  return !process.env.VERCEL&&origin.protocol==='http:'&&['localhost','127.0.0.1','[::1]'].includes(origin.hostname);
 }catch{return false}
}
