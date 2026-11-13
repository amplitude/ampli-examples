import { createReportClient, flagKey } from './flags.js';
import { configFromVariant } from './config.js';
let ready;
export function initializeAnalytics(){
 if(!ready)ready=createReportClient({apiKey:import.meta.env.VITE_AMPLITUDE_API_KEY,deploymentKey:import.meta.env.VITE_AMPLITUDE_DEPLOYMENT_KEY,zone:import.meta.env.VITE_AMPLITUDE_SERVER_ZONE});
 return ready.then(client=>({status:client?'ready':'disabled',client})).catch(()=>({status:'error',client:null}));
}
export async function chooseConfig(client,userId){
 if(!client)return {config:configFromVariant(null),assigned:false};
 client.analytics.setUserId(userId);client.experiment.clear();
 await client.experiment.fetch({user_id:userId,device_id:client.analytics.getDeviceId()});
 const variant=client.experiment.all()[flagKey];
 return {config:configFromVariant(variant),assigned:typeof variant?.value==='string'};
}
export function exposeReport(client){client?.experiment.exposure(flagKey);}
