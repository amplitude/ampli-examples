import { readDataset, backfill } from './backfill.js';
const args=process.argv.slice(2);const positional=args.filter(x=>x!=='--send');
try{
 if(positional.length!==1)throw Error('Usage: pnpm backfill data/fixture.jsonl [--send]');
 const result=await backfill({dataset:readDataset(positional[0]),checkpoint:process.env.BUILD_CHECKPOINT||'data/checkpoint.json',apiKey:process.env.AMPLITUDE_API_KEY,zone:process.env.AMPLITUDE_SERVER_ZONE,send:args.includes('--send')});
 console.log(JSON.stringify(result,null,2));
}catch(e){console.error(e.message);process.exitCode=1;}
