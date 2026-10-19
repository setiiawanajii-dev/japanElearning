import {createClient,type Client,type InValue} from '@libsql/client';
import schema from './schema.json';
let client:Client|undefined;
let initialized:Promise<unknown>|undefined;
function connection(){
 const url=process.env.TURSO_DATABASE_URL;
 if(!url)throw Error('Database belum diatur.');
 if(process.env.VERCEL&&(!url.startsWith('libsql://')&&!url.startsWith('https://')))throw Error('Vercel memerlukan database Turso jarak jauh.');
 if(!client)client=createClient({url,authToken:process.env.TURSO_AUTH_TOKEN});
 return client;
}
async function ready(){
 const c=connection();
 if(!initialized)initialized=c.batch(schema,'write').catch(e=>{initialized=undefined;throw e});
 await initialized;return c;
}
class Statement{
 constructor(readonly sql:string,readonly args:InValue[]=[]){ }
 bind(...args:InValue[]){return new Statement(this.sql,args)}
 async all<T=Record<string,unknown>>(){const c=await ready();const r=await c.execute({sql:this.sql,args:this.args});return {results:r.rows as unknown as T[]}}
 async first<T=Record<string,unknown>>(){const r=await this.all<T>();return r.results[0]??null}
 async run(){const c=await ready();return c.execute({sql:this.sql,args:this.args})}
}
export const database={prepare:(sql:string)=>new Statement(sql),async batch(statements:Statement[]){const c=await ready();return c.batch(statements.map(s=>({sql:s.sql,args:s.args})),'write')}};
export const env={get DB(){return process.env.TURSO_DATABASE_URL?database:undefined},get AI_GATEWAY_URL(){return process.env.AI_GATEWAY_URL},get AI_GATEWAY_TOKEN(){return process.env.AI_GATEWAY_TOKEN}};
