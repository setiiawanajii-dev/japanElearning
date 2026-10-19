import {createClient} from '@libsql/client';
import schema from '../lib/schema.json' with {type:'json'};
if(!process.env.TURSO_DATABASE_URL)throw Error('TURSO_DATABASE_URL belum diisi.');
const db=createClient({url:process.env.TURSO_DATABASE_URL,authToken:process.env.TURSO_AUTH_TOKEN});
await db.batch(schema,'write');db.close();console.log('Tabel siap. Data yang sudah ada dipertahankan.');
