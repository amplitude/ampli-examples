import { setTimeout as delay } from 'node:timers/promises';
import type { Analytics } from './analytics.js';
export type ToolArgs = {value:number; mode:'success'|'fail'|'wait';runId:string;privateNote?:string};
export async function executeTool(args:ToolArgs,signal:AbortSignal,requestId:string,analytics:Analytics,userId:string,started:()=>Promise<void>) {
  const sessionId=args.runId+':request:'+requestId;
  const execute=async(s?:{trackToolCall:(name:string,ms:number,success:boolean,options:Record<string,unknown>)=>unknown})=>{
    const begin=performance.now();let outcome:'success'|'failure'|'cancelled'='failure';let output:unknown;
    try {
      await started();
      if(args.mode==='wait')await delay(5000,undefined,{signal});
      signal.throwIfAborted();
      if(args.mode==='fail')throw Error('Synthetic tool failure.');
      output={doubled:args.value*2};outcome='success';
      return {content:[{type:'text' as const,text:JSON.stringify(output)}]};
    }catch{
      outcome=signal.aborted?'cancelled':'failure';output={outcome};
      return {isError:true,content:[{type:'text' as const,text:outcome}]};
    }finally{
      s?.trackToolCall('double_number',performance.now()-begin,outcome==='success',{
        input:args,output,toolType:'mcp',invocationId:requestId,
      });
    }
  };
  return analytics?analytics.agent.session({userId,sessionId,autoFlush:false}).run(s=>execute(s)):execute();
}
