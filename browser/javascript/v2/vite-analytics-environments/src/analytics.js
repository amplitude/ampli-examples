import * as amplitude from '@amplitude/unified';
import {resolveEnvironment} from './environment.js';
let ready;
export function initializeAnalytics(){
 if(!ready)ready=(async()=>{
  const config=resolveEnvironment(import.meta.env.MODE,import.meta.env);
  if(config.status==='disabled')return config;
  await amplitude.initAll(config.apiKey,{instanceName:'build-env-'+config.mode,serverZone:config.zone,analytics:{autocapture:false,remoteConfig:{fetchRemoteConfig:false}},sessionReplay:{sampleRate:0},engagement:{skip:true}});
  return {mode:config.mode,status:'ready',projectId:config.projectId,marker:config.marker,deviceId:amplitude.getDeviceId()};
 })().catch(()=>({mode:import.meta.env.MODE,status:'error'}));
 return ready;
}
export async function sendEnvironmentCheck(config){
 if(config.status!=='ready')return {code:0};
 return amplitude.track('Build Environment Check',{app_environment:config.mode,configured_project_id:config.projectId,build_marker:config.marker}).promise;
}
