import { createInstance } from '@amplitude/unified';
export const flagKey='report-layout';
export function reportView(variant) { return variant?.value==='expanded'?'expanded':'control'; }
export async function createReportClient({apiKey,deploymentKey,zone='US',instanceName='build-vitest-demo',experimentOptions={}}) {
  if(!apiKey?.trim()||!deploymentKey?.trim())return null;
  const analytics=createInstance();
  await analytics.initAll(apiKey,{instanceName,serverZone:zone==='EU'?'EU':'US',analytics:{autocapture:false,remoteConfig:{fetchRemoteConfig:false}},sessionReplay:{sampleRate:0},engagement:{skip:true},experiment:{deploymentKey,fetchOnStart:false,pollOnStart:false,automaticFetchOnAmplitudeIdentityChange:false,automaticExposureTracking:false,retryFetchOnFailure:false,fetchTimeoutMillis:1000,...experimentOptions}});
  const experiment=analytics.experiment();
  if(!experiment)throw Error('Experiment did not initialize.');
  return {analytics,experiment};
}
export async function loadReport(client,user,{clear=false}={}) {
  if(!client)return {view:'control',assigned:false};
  if(clear)client.experiment.clear();
  await client.experiment.fetch(user);
  const variant=client.experiment.all()[flagKey];
  return {view:reportView(variant),assigned:typeof variant?.value==='string',value:variant?.value??null};
}
