import {sameOrigin} from '../lib/request-origin.ts';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {authConfig,equalPassword,createSession,verifySession,sessionSeconds} from '../lib/auth-core.ts';
import {database} from '../lib/database.ts';
process.env.APP_PASSWORD='test-only-password-123';process.env.SESSION_SECRET='test-only-secret-012345678901234567890';process.env.TURSO_DATABASE_URL=':memory:';
test('Password check, signed session expiry, tampering and rotation',()=>{
 assert.ok(equalPassword(process.env.APP_PASSWORD));assert.ok(!equalPassword('wrong'));
 const now=Date.now(),token=createSession(now);assert.ok(verifySession(token,now));assert.ok(!verifySession(token,now+sessionSeconds*1000));assert.ok(!verifySession(token+'x',now));assert.ok(!verifySession('forged',now));
 process.env.APP_PASSWORD+='changed';assert.ok(!verifySession(token,now));process.env.APP_PASSWORD='short';assert.throws(authConfig);process.env.APP_PASSWORD='test-only-password-123';
});
test('SQLite adapter initializes, binds, persists and rolls back batches atomically',async()=>{
 await database.prepare('INSERT INTO profiles(user_id,data,updated_at) VALUES(?,?,?)').bind('test',JSON.stringify({name:'QA'}),1).run();
 assert.equal((await database.prepare('SELECT data FROM profiles WHERE user_id=?').bind('test').first()).data,'{"name":"QA"}');
 await assert.rejects(database.batch([database.prepare('INSERT INTO profiles VALUES(?,?,?)').bind('rollback','{}',1),database.prepare('INSERT INTO missing_table VALUES(?)').bind(1)]));
 assert.equal(await database.prepare('SELECT * FROM profiles WHERE user_id=?').bind('rollback').first(),null);
 process.env.VERCEL='1';await assert.rejects(database.prepare('SELECT 1').first());delete process.env.VERCEL;
});

test('Origin checks preserve actual localhost host and reject cross-origin or insecure deployed requests',()=>{
 const req=(origin,host)=>new Request('http://localhost:5191/api/auth/login',{headers:{...(origin?{origin}:{}),host}});
 assert.ok(sameOrigin(req('http://127.0.0.1:5191','127.0.0.1:5191')));
 assert.ok(!sameOrigin(req('https://other.example','kotoba.example')));
 assert.ok(!sameOrigin(req(null,'kotoba.example')));
 process.env.VERCEL='1';assert.ok(!sameOrigin(req('http://127.0.0.1:5191','127.0.0.1:5191')));assert.ok(sameOrigin(req('https://kotoba.example','kotoba.example')));delete process.env.VERCEL;
});
