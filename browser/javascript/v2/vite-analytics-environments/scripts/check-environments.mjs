import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { modes,validateProfiles } from '../src/environment.js';
export function readProfiles(root=process.cwd(),processEnv=process.env){
 const keys=['VITE_AMPLITUDE_API_KEY','VITE_AMPLITUDE_PROJECT_ID','VITE_APP_ENV','VITE_AMPLITUDE_SERVER_ZONE','VITE_BUILD_MARKER'];
 for(const key of keys)if(processEnv[key]!==undefined)throw Error('Remove global VITE environment overrides; use the reviewed mode files.');
 const profiles={};
 for(const mode of modes){
  const text=readFileSync(`${root}/.env.${mode}.local`,'utf8');
  profiles[mode]=Object.fromEntries(text.split('\n').filter(x=>x.trim()&&!x.trim().startsWith('#')).map(line=>{const i=line.indexOf('=');if(i<0)throw Error('Use plain KEY=value lines.');return [line.slice(0,i).trim(),line.slice(i+1).trim()];}));
 }
 return validateProfiles(profiles);
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{console.log(readProfiles().map(({mode,projectId,marker})=>({mode,projectId,marker})));}
 catch(e){console.error(e.message);process.exitCode=1;}
}
