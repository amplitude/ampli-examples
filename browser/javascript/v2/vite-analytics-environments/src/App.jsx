import React,{useState} from 'react';
import {sendEnvironmentCheck} from './analytics.js';
export function App({analytics}){
 const [busy,setBusy]=useState(false),[message,setMessage]=useState('Use only the three designated test destinations.');
 async function send(){if(busy||analytics.status!=='ready')return;setBusy(true);try{const result=await sendEnvironmentCheck(analytics);setMessage(result.code===200?'HTTP accepted. Verify the destination in Amplitude.':'Upload not accepted.');}catch{setMessage('Upload failed.');}finally{setBusy(false);}}
 return <main><h1>Check the analytics environment</h1><p>Each Vite mode builds with its own ingestion key. This UI displays configured labels, not a server-verified project lookup.</p><p>Status: <strong id="status">{analytics.status}</strong></p><p>Mode: <strong id="mode">{analytics.mode}</strong></p><p>Configured project: <code id="project">{analytics.projectId||'unconfigured'}</code></p><p>Marker: <code id="marker">{analytics.marker||'unconfigured'}</code></p><p>Device: <code id="device">{analytics.deviceId||'not initialized'}</code></p><button id="send" disabled={busy||analytics.status!=='ready'} onClick={send}>Send environment check</button><p role="status">{message}</p></main>;
}
