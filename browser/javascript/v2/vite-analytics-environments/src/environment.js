export const modes=['development','staging','production'];
export function resolveEnvironment(mode,env){
 if(!modes.includes(mode))throw Error('Unknown build mode.');
 if(!env.VITE_AMPLITUDE_API_KEY?.trim())return {mode,status:'disabled'};
 if(!/^[a-zA-Z0-9_-]{10,128}$/.test(env.VITE_AMPLITUDE_API_KEY.trim()))throw Error('Use a plain ingestion key without quotes or variable expansion.');
 if(env.VITE_APP_ENV!==mode)throw Error('Environment label must match the Vite mode.');
 if(!/^\d{3,12}$/.test(env.VITE_AMPLITUDE_PROJECT_ID||''))throw Error('Set the designated numeric project ID.');
 if(!['US','EU'].includes(env.VITE_AMPLITUDE_SERVER_ZONE))throw Error('Use an explicit US or EU zone.');
 if(!/^build-env-[a-z0-9-]{3,80}$/.test(env.VITE_BUILD_MARKER||''))throw Error('Use a synthetic build-env- marker.');
 return {mode,status:'configured',apiKey:env.VITE_AMPLITUDE_API_KEY.trim(),projectId:env.VITE_AMPLITUDE_PROJECT_ID,zone:env.VITE_AMPLITUDE_SERVER_ZONE,marker:env.VITE_BUILD_MARKER};
}
export function validateProfiles(profiles){
 const resolved=modes.map(mode=>resolveEnvironment(mode,profiles[mode]||{}));
 if(resolved.some(x=>x.status!=='configured'))throw Error('Configure all three mode files first.');
 for(const field of ['apiKey','projectId','marker'])if(new Set(resolved.map(x=>x[field])).size!==3)throw Error(`Each mode needs a distinct ${field}.`);
 return resolved;
}
