// Starts a local production build with disposable data and generated test credentials.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import fs from 'node:fs';
fs.mkdirSync('work',{recursive:true});const base='http://127.0.0.1:5191';
const password=randomBytes(24).toString('hex');
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','5191'],{env:{...process.env,VERCEL:'',APP_PASSWORD:password,SESSION_SECRET:randomBytes(32).toString('hex'),TURSO_DATABASE_URL:'file:'+process.cwd()+'/work/smoke-'+randomBytes(8).toString('hex')+'.db',TURSO_AUTH_TOKEN:'',AI_GATEWAY_URL:'',AI_GATEWAY_TOKEN:'',NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','ignore','pipe']});
let errorLog='';server.stderr.on('data',d=>{errorLog+=d});
const get=(path,cookie)=>fetch(base+path,{headers:cookie?{cookie}:{}});
const post=(path,data,cookie,origin=base)=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',origin,...(cookie?{cookie}:{})},body:JSON.stringify(data),redirect:'manual'});
try{
 let ready=false;for(let i=0;i<60;i++){try{if((await get('/')).ok){ready=true;break}}catch{}await new Promise(r=>setTimeout(r,500));}assert.ok(ready,'Server failed to start');
 assert.equal((await get('/api/learning')).status,401);assert.equal((await get('/api/assessment')).status,401);
 assert.equal((await post('/api/auth/login',{password},null,'https://other.example')).status,403);
 assert.equal((await post('/api/auth/login',{password:'wrong'})).status,401);
 const login=await post('/api/auth/login',{password});assert.equal(login.status,200);const raw=login.headers.get('set-cookie');assert.match(raw,/HttpOnly/i);assert.match(raw,/Secure/i);assert.match(raw,/SameSite=strict/i);const cookie=raw.split(';')[0];
 assert.equal((await get('/api/learning',cookie)).status,200);
 assert.equal((await post('/api/learning',{action:'profile',profile:{name:'QA',level:'N5',minutes:20,exam:'',goal:'sehari-hari',start:'zero',furigana:true,romaji:true}},cookie)).status,200);
 assert.equal((await (await get('/api/learning',cookie)).json()).profile.name,'QA');
 const answer=await post('/api/learning',{action:'answer',lessonId:'kana-1',questionId:'k1',answer:'う'},cookie);assert.equal(answer.status,200);assert.ok((await answer.json()).correct);
 const chat=await post('/api/learning',{action:'chat',scenarioId:'intro',message:'リナです。',mode:'learn'},cookie);assert.equal(chat.status,200);assert.equal((await chat.json()).mode,'demo');
 const bank=await (await get('/api/assessment?level=N5',cookie)).json();assert.equal(bank.questions.length,20);assert.ok(bank.questions.every(q=>!q.answers));
 const id=crypto.randomUUID();const result=await post('/api/assessment',{id,level:'N5',answers:[]},cookie);assert.equal(result.status,200);assert.equal((await result.json()).result.correct,0);
 assert.ok((await (await get('/api/assessment?level=N5',cookie)).json()).history.some(h=>h.id===id));
 const manifest=JSON.parse(fs.readFileSync('lib/audio-manifest.json','utf8'));const media=await get(Object.values(manifest)[0]);assert.equal(media.status,200);assert.equal(Buffer.from(await media.arrayBuffer()).toString('ascii',0,4),'RIFF');
 assert.equal((await post('/api/auth/logout',{},cookie,'https://other.example')).status,403);const logout=await post('/api/auth/logout',{},cookie);assert.equal(logout.status,303);assert.match(logout.headers.get('set-cookie'),/Max-Age=0/);
 for(let i=0;i<18;i++)await post('/api/auth/login',{password:'wrong'});assert.equal((await post('/api/auth/login',{password:'wrong'})).status,429);
 console.log('Production smoke passed: login, cookie protections, API guards, password rate limit, profile persistence, answer scoring, assessment history, local audio, logout.');
}catch(e){console.error(errorLog);throw e}finally{server.kill('SIGTERM');}
