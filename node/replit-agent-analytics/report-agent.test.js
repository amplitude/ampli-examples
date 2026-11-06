import test from "node:test";
import assert from "node:assert/strict";
import { AIConfig, OpenAI } from "@amplitude/ai";
import { MockAmplitudeAI } from "@amplitude/ai/testing";
import OpenAIClient from "openai";
import { createReportAgent } from "./report-agent.js";

function setup({ failure=false, empty=false }={}) {
  const ai=new MockAmplitudeAI(new AIConfig({contentMode:"metadata_only",debug:false}));
  const requests=[];
  const client=new OpenAIClient({apiKey:"synthetic-not-a-real-key",maxRetries:0,fetch:async(url,options)=>{
    requests.push(JSON.parse(options.body));
    if(failure) return new Response(JSON.stringify({error:{message:"synthetic-provider-error",type:"server_error"}}),{status:500,headers:{"content-type":"application/json"}});
    return new Response(JSON.stringify({id:"chatcmpl-local-test",object:"chat.completion",created:1,model:"gpt-4o-mini",choices:[{index:0,message:{role:"assistant",content:empty?"":"synthetic reply private@example.com"},finish_reason:"stop"}],usage:{prompt_tokens:11,completion_tokens:7,total_tokens:18}}),{headers:{"content-type":"application/json"}});
  }});
  const openai=new OpenAI({client,amplitude:ai});
  return {ai,openai,requests,run:createReportAgent({ai,openai})};
}
const args={taskId:"synthetic-report-task-1",userId:"build-replit-agent-demo",question:"synthetic private question private@example.com",model:"gpt-4o-mini"};
test("wrapped provider emits one user message and one response, then closes the task",async()=>{
  const {ai,requests,run}=setup();const reply=await run(args);
  assert.match(reply,/synthetic reply/);assert.equal(requests.length,1);
  assert.equal(ai.getEvents("[Agent] User Message").length,1);
  assert.equal(ai.getEvents("[Agent] AI Response").length,1);
  assert.equal(ai.getEvents("[Agent] Session End").length,1);
  assert.equal(ai.getEvents("[Agent] Tool Call").length,0);
  assert.ok(ai.events.every(e=>e.user_id===args.userId&&e.event_properties["[Agent] Session ID"]===args.taskId));
  const p=ai.getEvents("[Agent] AI Response")[0].event_properties;
  assert.equal(p["[Agent] Input Tokens"],11);assert.equal(p["[Agent] Output Tokens"],7);assert.equal(p["[Agent] Provider"],"openai");
  assert.ok(!JSON.stringify(ai.events).includes("private@example.com"));
  for(const event of ai.events) assert.ok(!("$llm_message" in event.event_properties));
});
test("positive control: a manual user message plus the wrapper duplicates the input",async()=>{
  const {ai,openai}=setup();
  await ai.agent("duplication-positive-control").session({userId:args.userId,sessionId:"synthetic-duplicate-task"}).run(async s=>{
    s.trackUserMessage(args.question);
    await openai.chat.completions.create({model:args.model,messages:[{role:"user",content:args.question}]});
  });
  assert.equal(ai.getEvents("[Agent] User Message").length,2);
});
test("concurrent users and tasks keep identity separate",async()=>{
  const {ai,run}=setup();await Promise.all([run(args),run({...args,taskId:"synthetic-other-task",userId:"synthetic-other-user"})]);
  assert.equal(ai.getEvents("[Agent] User Message").length,2);
  for(const e of ai.events) assert.equal(e.user_id,e.event_properties["[Agent] Session ID"]===args.taskId?args.userId:"synthetic-other-user");
  assert.equal(new Set(ai.events.map(e=>e.event_properties["[Agent] Agent ID"])).size,1);
});
test("flush is awaited before returning and also after failure",async()=>{
  const ok=setup();let flushCompleted=false;ok.ai.flush=async()=>{await Promise.resolve();flushCompleted=true};
  await ok.run(args);assert.equal(flushCompleted,true);
  const bad=setup({failure:true});let flushed=false;bad.ai.flush=async()=>{flushed=true};
  await assert.rejects(bad.run(args));assert.equal(flushed,true);assert.equal(bad.ai.getEvents("[Agent] Session End").length,1);
});
test("empty reply is not reported as successful application output",async()=>{
  const {run}=setup({empty:true});await assert.rejects(run(args),/no text/);
});
test("configuration guard prevents provider requests",async()=>{
  const {run,requests}=setup();await assert.rejects(run({...args,userId:""}),/configuration/);assert.equal(requests.length,0);
});
