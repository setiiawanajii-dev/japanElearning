import {spawn} from 'node:child_process';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const server=spawn(process.execPath,['scripts/serve.mjs'],{env:{...process.env,PORT:'5193'},stdio:'ignore'}),base='http://127.0.0.1:5193';
try{let r;for(let i=0;i<40;i++){try{r=await fetch(base);if(r.ok)break}catch{}await new Promise(r=>setTimeout(r,200))}assert.ok(r?.ok);assert.match(await r.text(),/Progres di browser ini/);assert.equal((await fetch(base+'/api/learning')).status,404);assert.equal((await fetch(base+'/login')).status,404);const m=JSON.parse(fs.readFileSync('lib/audio-manifest.json'));const audio=await fetch(base+Object.values(m)[0]);assert.equal(audio.status,200);assert.equal(Buffer.from(await audio.arrayBuffer()).toString('ascii',0,4),'RIFF');console.log('Static smoke passed: page, audio, no login/API routes.')}finally{server.kill('SIGTERM')}
