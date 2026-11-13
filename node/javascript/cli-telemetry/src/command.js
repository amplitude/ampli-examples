import { readFile, stat } from 'node:fs/promises';
import { extname } from 'node:path';
export async function countLines(path) {
  const extension=extname(path||'').toLowerCase();
  const fileType=['.txt','.md'].includes(extension)?extension.slice(1):'other';
  try {
    if(!path)return {status:'invalid_arguments',fileType};
    const info=await stat(path);
    if(!info.isFile())return {status:'not_file',fileType};
    if(info.size>1024*1024)return {status:'too_large',fileType};
    const text=await readFile(path,'utf8');
    // Recheck after reading in case the file grew between stat and read.
    if(Buffer.byteLength(text)>1024*1024)return {status:'too_large',fileType};
    const lines=text.length===0?0:text.split('\n').length-(text.endsWith('\n')?1:0);
    return {status:'success',fileType,lines};
  }catch(e){return {status:e.code==='ENOENT'?'not_found':'io_error',fileType};}
}
