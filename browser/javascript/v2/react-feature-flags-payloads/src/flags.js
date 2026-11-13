import { createInstance } from '@amplitude/unified';
export const flagKey='report-layout';
export async function createReportClient({apiKey,deploymentKey,zone='US',instanceName='build-payload-demo',experimentOptions={}}) {
  if(!apiKey?.trim()||!deploymentKey?.trim())return null;
  const analytics=createInstance();
  await analytics.initAll(apiKey,{instanceName,serverZone:zone==='EU'?'EU':'US',analytics:{autocapture:false,remoteConfig:{fetchRemoteConfig:false}},sessionReplay:{sampleRate:0},engagement:{skip:true},experiment:{deploymentKey,fetchOnStart:false,pollOnStart:false,automaticFetchOnAmplitudeIdentityChange:false,automaticExposureTracking:false,retryFetchOnFailure:false,fetchTimeoutMillis:1000,...experimentOptions}});
  const experiment=analytics.experiment();
  if(!experiment)throw Error('Experiment did not initialize.');
  return {analytics,experiment};
}
