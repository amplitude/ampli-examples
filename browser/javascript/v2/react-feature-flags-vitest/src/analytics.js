import { createReportClient, loadReport, flagKey } from './flags.js';
let ready;
export function initializeAnalytics(){
 if(!ready)ready=createReportClient({apiKey:import.meta.env.VITE_AMPLITUDE_API_KEY,deploymentKey:import.meta.env.VITE_AMPLITUDE_DEPLOYMENT_KEY,zone:import.meta.env.VITE_AMPLITUDE_SERVER_ZONE});
 return ready.then(client=>({status:client?'ready':'disabled',client})).catch(()=>({status:'error',client:null}));
}
export async function chooseReport(client,userId){
 if(!client)return {view:'control',assigned:false};
 client.analytics.setUserId(userId);
 return loadReport(client,{user_id:userId,device_id:client.analytics.getDeviceId()},{clear:true});
}
export function exposeReport(client){client?.experiment.exposure(flagKey);}
