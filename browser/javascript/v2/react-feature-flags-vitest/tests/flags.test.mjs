import {test,expect,vi} from 'vitest';
import {createReportClient,loadReport,reportView,flagKey} from '../src/flags.js';
const user={user_id:'build-vitest-synthetic-user',device_id:'build-vitest-device'};
async function client(options={}){return createReportClient({apiKey:'fake-local-test-key',deploymentKey:'fake-local-deployment-key',instanceName:crypto.randomUUID(),experimentOptions:options});}
test('actual initialized Experiment client reads deterministic expanded/control/missing values without remote calls',async()=>{
 for(const [value,view] of [['expanded','expanded'],['control','control'],['unexpected','control']]){
  const request=vi.fn().mockRejectedValue(Error('Should not fetch'));
  const c=await client({source:'initialVariants',initialVariants:{[flagKey]:{value}},httpClient:{request}});
  expect(reportView(c.experiment.variant(flagKey))).toBe(view);expect(request).not.toHaveBeenCalled();
 }
 const c=await client({httpClient:{request:vi.fn()}});c.experiment.clear();expect(reportView(c.experiment.variant('unknown-flag',{value:'control'}))).toBe('control');
});
test('real SDK fetch caches result; failed refresh retains it, explicit clear prevents stale identity assignment',async()=>{
 const request=vi.fn().mockResolvedValueOnce({status:200,body:JSON.stringify({[flagKey]:{key:flagKey,value:'expanded'}})}).mockRejectedValue(Error('Synthetic offline'));
 const c=await client({httpClient:{request}});
 expect((await loadReport(c,user)).view).toBe('expanded');
 const attempts=request.mock.calls.length;expect(reportView(c.experiment.variant(flagKey))).toBe('expanded');expect(request.mock.calls.length).toBe(attempts);
 expect((await loadReport(c,user)).view).toBe('expanded');
 expect((await loadReport(c,{...user,user_id:'build-vitest-second-user'},{clear:true})).view).toBe('control');
 expect(c.experiment.all()[flagKey]).toBeUndefined();
});
test('blank key mode does not initialize and uses application control fallback',async()=>{
 const c=await createReportClient({apiKey:'',deploymentKey:''});expect(c).toBeNull();expect(await loadReport(c,user)).toEqual({view:'control',assigned:false});
});
