import React,{useRef,useState,useEffect} from 'react';
import {chooseReport,exposeReport} from './analytics.js';
export function App({analytics}){
 const [result,setResult]=useState({view:'control',assigned:false}),[busy,setBusy]=useState(false),[token,setToken]=useState(0),[message,setMessage]=useState('Choose an existing designated test identity.');const exposed=useRef(-1);
 useEffect(()=>{if(result.assigned&&exposed.current!==token){exposed.current=token;exposeReport(analytics.client);}},[result,token,analytics.client]);
 async function load(user){if(busy)return;setBusy(true);try{const next=await chooseReport(analytics.client,user);setResult(next);setToken(x=>x+1);setMessage(next.assigned?'Assignment loaded; inspect the result.':'No assignment; safe control.');}catch{setResult({view:'control',assigned:false});setMessage('Fetch failed; safe control.');}finally{setBusy(false);}}
 return <main><h1>Test a flag-gated report</h1><p>The report is a local fixture. These controls use existing test identities; they don't change targeting.</p>
 <button id="control" disabled={busy} onClick={()=>load('build-ios-flags-control-20261029')}>Load control test user</button>
 <button id="expanded" disabled={busy} onClick={()=>load('build-web-flags-demo')}>Load expanded test user</button>
 <p role="status">{message}</p><p>Analytics: <strong>{analytics.status}</strong></p><section id="report" data-view={result.view}><h2>{result.view==='expanded'?'Expanded report':'Standard report'}</h2><p>Saved reports:3</p>{result.view==='expanded'&&<p id="extra-detail">Weekly comparison: +2 reports</p>}</section></main>;
}
