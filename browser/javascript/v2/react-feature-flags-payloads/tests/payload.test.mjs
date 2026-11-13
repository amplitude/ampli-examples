import React,{act} from 'react';
import {createRoot} from 'react-dom/client';
import {test,expect,vi} from 'vitest';
import {createReportClient,flagKey} from '../src/flags.js';
import {configFromVariant} from '../src/config.js';
import {Report} from '../src/App.jsx';

test('actual Experiment client supplies valid/control/missing/invalid payload inputs to strict application projection',async()=>{
 const variants=[{value:'expanded',payload:{reportLimit:5,showComparison:true}},{value:'control',payload:{reportLimit:9,showComparison:true}},undefined,{value:'expanded'},...[
  null,'{"reportLimit":5,"showComparison":true}',[],{reportLimit:100,showComparison:true},{reportLimit:2.5,showComparison:false},{reportLimit:5,showComparison:'true'},{reportLimit:5,showComparison:true,private:'PRIVATE_PAYLOAD_FIXTURE'}
 ].map(payload=>({value:'expanded',payload}))];
 for(const [index,variant] of variants.entries()){
  const c=await createReportClient({apiKey:'fake-test-key',deploymentKey:'fake-deployment-key',instanceName:crypto.randomUUID(),experimentOptions:{source:'initialVariants',initialVariants:variant?{[flagKey]:variant}:{},httpClient:{request:vi.fn().mockRejectedValue(Error('No network'))}}});
  const result=configFromVariant(c.experiment.all()[flagKey]);
  if(index===0)expect(result).toEqual({reportLimit:5,showComparison:true,source:'remote'});
  else expect(result).toMatchObject({reportLimit:2,showComparison:false});
  expect(JSON.stringify(result)).not.toContain('PRIVATE_PAYLOAD_FIXTURE');
 }
});
test('validated config determines rendered report count and comparison; invalid config uses visible defaults',async()=>{
 globalThis.IS_REACT_ACT_ENVIRONMENT=true;
 const host=document.createElement('div');document.body.append(host);const root=createRoot(host);
 try {
  await act(()=>root.render(React.createElement(Report,{config:configFromVariant({value:'expanded',payload:{reportLimit:5,showComparison:true}})})));
  expect(host.querySelectorAll('li')).toHaveLength(5);expect(host.querySelector('#comparison')).not.toBeNull();
  await act(()=>root.render(React.createElement(Report,{config:configFromVariant({value:'expanded',payload:{reportLimit:999,showComparison:true}})})));
  expect(host.querySelectorAll('li')).toHaveLength(2);expect(host.querySelector('#comparison')).toBeNull();expect(host.querySelector('#config-source').textContent).toBe('invalid_payload');
 }finally{await act(()=>root.unmount());host.remove();}
});
