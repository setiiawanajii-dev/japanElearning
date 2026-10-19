import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
for(const file of ['learning','assessment','auth']){
 const out='work/'+file+'.test.mjs';
 await build({entryPoints:['tests/'+file+'.test.mjs'],bundle:true,platform:'node',format:'esm',outfile:out,packages:'external'});
 const r=spawnSync(process.execPath,[out],{stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);
}
