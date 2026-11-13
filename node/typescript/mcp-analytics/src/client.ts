import { randomUUID } from 'node:crypto';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { fileURLToPath } from 'node:url';
const runId=randomUUID();
const env=Object.fromEntries(Object.entries(process.env).filter((x):x is [string,string]=>typeof x[1]==='string'));
const transport=new StdioClientTransport({command:process.execPath,args:[fileURLToPath(new URL('./server.js',import.meta.url))],env,stderr:'pipe'});
let stderr='';transport.stderr?.on('data',d=>{stderr+=d.toString();});
const client=new Client({name:'build-local-client',version:'1.0.0'});
try{
  await client.connect(transport);
  const tools=await client.listTools();if(!tools.tools.some(x=>x.name==='double_number'))throw Error('Tool missing.');
  const call=(mode:'success'|'fail'|'wait',options={})=>client.callTool({name:'double_number',arguments:{value:7,mode,runId,privateNote:'PRIVATE_MCP_FIXTURE_20261113'}},undefined,options);
  const success=await call('success');const failed=await call('fail');
  const controller=new AbortController();let cancelled=false;
  try {await call('wait',{signal:controller.signal,onprogress:()=>controller.abort(),timeout:2000});}
  catch {cancelled=controller.signal.aborted;}
  const flushed=await client.callTool({name:'finish_run',arguments:{}},undefined,{timeout:10000});
  console.log(JSON.stringify({runId,success:!success.isError,failure:failed.isError===true,cancelled,flushed:!flushed.isError}));
}finally{
  // EOF lets the child settle cancelled work and flush before normal termination.
  await transport.close();
  if(!stderr.includes('MCP telemetry flush finished.')){
    console.error('Child did not confirm its telemetry flush.');process.exitCode=1;
  }
  await client.close();
}
