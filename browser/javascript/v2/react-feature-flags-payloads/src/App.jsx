import React,{useRef,useState,useEffect} from 'react';
import {chooseConfig,exposeReport} from './analytics.js';
import {configFromVariant} from './config.js';
export function Report({config}){
 const reports=Array.from({length:10},(_,i)=>`Demo report ${i+1}`);
 return <section id="report"><h2>Local report list</h2><p>Config source: <strong id="config-source">{config.source}</strong></p>
 <p>Report limit: <strong id="report-limit">{config.reportLimit}</strong></p><ul id="reports">{reports.slice(0,config.reportLimit).map(x=><li key={x}>{x}</li>)}</ul>{config.showComparison&&<p id="comparison">Weekly comparison (demo): +2 reports</p>}</section>;
}
export function App({analytics}){
 const [result,setResult]=useState({config:configFromVariant(null),assigned:false}),[busy,setBusy]=useState(false),[token,setToken]=useState(0),[message,setMessage]=useState('Choose an existing designated test identity.');const exposed=useRef(-1);
 useEffect(()=>{if(result.assigned&&exposed.current!==token){exposed.current=token;exposeReport(analytics.client);}},[result,token,analytics.client]);
 async function load(user){if(busy)return;setBusy(true);try{setResult(await chooseConfig(analytics.client,user));setToken(x=>x+1);setMessage('Assignment checked; inspect config source.');}catch{setResult({config:configFromVariant(null),assigned:false});setMessage('Fetch failed; safe defaults.');}finally{setBusy(false);}}
 return <main><h1>Validate remote report configuration</h1><p>This local list contains ten demo reports. A valid expanded payload controls its limit and comparison. Missing or invalid data uses two reports and no comparison.</p>
 <button id="control" disabled={busy} onClick={()=>load('build-ios-flags-control-20261029')}>Load control test user</button>
 <button id="expanded" disabled={busy} onClick={()=>load('build-web-flags-demo')}>Load expanded test user</button>
 <p role="status">{message}</p><p>Analytics: <strong>{analytics.status}</strong></p><Report config={result.config}/></main>;
}
