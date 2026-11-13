import { AmplitudeAI, AIConfig, type AmplitudeEvent, type AmplitudeClientLike } from '@amplitude/ai';
import { createInstance, Types } from '@amplitude/analytics-node';
export async function initializeAnalytics(env = process.env, createClient = createInstance) {
  if (!env.AMPLITUDE_API_KEY?.trim()) return null;
  const client=createClient();
  await client.init(env.AMPLITUDE_API_KEY.trim(),{serverZone:env.AMPLITUDE_SERVER_ZONE==='EU'?'EU':'US',flushQueueSize:100,flushIntervalMillis:1000,flushMaxRetries:0,requestTimeoutMillis:3000,logLevel:Types.LogLevel.None}).promise;
  const queued: Promise<{code:number}>[]=[];
  // This adapter makes flush await the Node SDK wrappers and check each result.
  const adapter: AmplitudeClientLike={
    track(event: AmplitudeEvent) { queued.push(client.track(event).promise); },
    async flush() {
      await client.flush().promise;
      const results=await Promise.all(queued.splice(0));
      if(results.some(x=>x.code!==200))throw Error('Agent telemetry was not accepted.');
    },
  };
  const ai=new AmplitudeAI({amplitude:adapter,config:new AIConfig({contentMode:'metadata_only',redactPii:true,captureStackTrace:false})});
  return {ai,agent:ai.agent('build-mcp-calculator'),async flush(){await ai.flush();}};
}
export type Analytics = Awaited<ReturnType<typeof initializeAnalytics>>;
