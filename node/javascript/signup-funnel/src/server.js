import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { openStore, start, register, saveProfile, leave } from './store.js';
export function createApp(db, port) {
  const origin = `http://127.0.0.1:${port}`;
  return createServer(async (req,res) => {
    const json=(code,data)=>{res.writeHead(code,{'content-type':'application/json','cache-control':'no-store'});res.end(JSON.stringify(data));};
    if(req.headers.host!==`127.0.0.1:${port}`)return json(403,{error:'Use the loopback URL.'});
    if(req.method==='GET'&&req.url==='/'){res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});return res.end(await readFile(new URL('../public/index.html',import.meta.url)));}
    if(req.method!=='POST'||req.headers.origin!==origin||req.headers['content-type']!=='application/json')return json(403,{error:'Same-origin JSON required.'});
    try {
      let raw='';for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>4096)return json(413,{error:'Request too large.'});}
      const body=JSON.parse(raw);const cookies=Object.fromEntries((req.headers.cookie||'').split(';').filter(x=>x.includes('=')).map(x=>x.trim().split('=')));
      const id=cookies.build_signup_attempt;
      if(req.url==='/api/new'){res.setHeader('set-cookie',['build_signup_attempt=; Max-Age=0; HttpOnly; SameSite=Strict; Path=/','build_signup_session=; Max-Age=0; HttpOnly; SameSite=Strict; Path=/']);return json(200,{reset:true});}
      if(req.url==='/api/start') {const attempt=start(db,id);res.setHeader('set-cookie',`build_signup_attempt=${attempt}; HttpOnly; SameSite=Strict; Path=/`);return json(200,{attempt});}
      if(req.url==='/api/signup') {const account=register(db,id,body.username,body.password);res.setHeader('set-cookie',`build_signup_session=${account.session}; HttpOnly; SameSite=Strict; Path=/`);return json(201,{userId:account.userId});}
      if(req.url==='/api/profile')return json(200,saveProfile(db,id,cookies.build_signup_session,body.role));
      if(req.url==='/api/leave'){leave(db,id);return json(200,{exited:true});}
      return json(404,{error:'Unknown route.'});
    }catch{return json(400,{error:'Operation failed. Check synthetic inputs or choose a unique username.'});}
  });
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
  const port=Number(process.env.PORT||5194);const db=openStore(process.env.BUILD_DB_PATH||'data/signup.sqlite');
  const server=createApp(db,port);server.listen(port,'127.0.0.1',()=>console.log(`Open http://127.0.0.1:${port}`));
  for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>db.close()));
}
