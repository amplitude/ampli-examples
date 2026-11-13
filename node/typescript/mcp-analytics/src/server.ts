import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { initializeAnalytics } from './analytics.js';
import { executeTool } from './handler.js';
const analytics=await initializeAnalytics();
const server=new McpServer({name:'build-calculator',version:'1.0.0'});
const active=new Set<Promise<unknown>>();
const userId=process.env.BUILD_MCP_USER_ID||'build-mcp-local-user';
server.registerTool('double_number',{
  description:'Double a number locally. Failure and wait modes are explicit QA fixtures.',
  inputSchema:{value:z.number().int().min(-1000).max(1000),mode:z.enum(['success','fail','wait']),runId:z.uuid(),privateNote:z.string().max(100).optional()},
},async(args,extra)=>{
  const task=executeTool(args,extra.signal,String(extra.requestId),analytics,userId,async()=>{
    const token=extra._meta?.progressToken;
    if(token!==undefined)await extra.sendNotification({method:'notifications/progress',params:{progressToken:token,progress:1,total:2}});
  });
  active.add(task);try{return await task;}finally{active.delete(task);}
});
server.registerTool('finish_run',{description:'Wait for active fixture calls and flush their telemetry.'},async()=>{
  await Promise.allSettled([...active]);
  try{await analytics?.flush();return {content:[{type:'text' as const,text:analytics?'Telemetry accepted.':'Telemetry disabled.'}]};}
  catch{return {isError:true,content:[{type:'text' as const,text:'Telemetry failed.'}]};}
});
let closing:Promise<void>|undefined;
async function close(){
  if(!closing)closing=(async()=>{
    await Promise.allSettled([...active]);
    try {await analytics?.flush();console.error('MCP telemetry flush finished.');}
    catch {console.error('MCP telemetry flush failed.');process.exitCode=1;}
    await server.close();
  })();return closing;
}
server.server.onclose=()=>{void close();};
process.stdin.on('end',()=>{void close();});
for(const signal of ['SIGTERM','SIGINT'])process.on(signal,()=>{void close();});
await server.connect(new StdioServerTransport());
