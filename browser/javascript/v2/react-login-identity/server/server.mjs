import http from 'node:http';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const demoPassword = scryptSync('local-demo-password', 'local-build-demo', 32);
const users = {
  alex: { id: 'build-login-alex-v1', name: 'Alex' },
  sam: { id: 'build-login-sam-v1', name: 'Sam' },
};
const defaultRoot = fileURLToPath(new URL('../dist/', import.meta.url));

export function createDemoServer({ staticRoot = defaultRoot } = {}) {
  const sessions = new Map();
  return http.createServer(async (req, res) => {
    if (!/^127\.0\.0\.1:\d+$/.test(req.headers.host ?? '')) {
      res.writeHead(400); return res.end('Use the printed loopback URL.');
    }
    const origin = `http://${req.headers.host}`;
    const url = new URL(req.url, origin);
    const token = req.headers.cookie?.split(';').map((v) => v.trim())
      .find((v) => v.startsWith('build_demo_session='))?.split('=')[1];
    const session = token && sessions.get(token);
    const user = session && session.expiresAt > Date.now() ? users[session.username] : null;
    function json(status, body, cookie) {
      res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store',
        ...(cookie ? { 'Set-Cookie': cookie } : {}) });
      res.end(JSON.stringify(body));
    }
    try {
      if (url.pathname.startsWith('/api/')) {
        if (req.method === 'GET' && url.pathname === '/api/session') {
          return json(200, { user, state: user ? 'signed_in' : token ? 'expired' : 'anonymous' });
        }
        if (req.method !== 'POST' || req.headers.origin !== origin
          || !req.headers['content-type']?.startsWith('application/json')) {
          return json(403, { error: 'Use a same-origin JSON POST.' });
        }
        let body = '';
        for await (const chunk of req) {
          body += chunk;
          if (body.length > 2048) return json(413, { error: 'Request too large.' });
        }
        const input = JSON.parse(body || '{}');
        if (url.pathname === '/api/login') {
          const candidate = scryptSync(String(input.password ?? '').slice(0, 128), 'local-build-demo', 32);
          if (!Object.hasOwn(users, input.username) || !timingSafeEqual(candidate, demoPassword)) {
            return json(401, { error: 'The demo credentials did not match.' });
          }
          if (token) sessions.delete(token);
          const nextToken = randomBytes(32).toString('hex');
          sessions.set(nextToken, { username: input.username, expiresAt: Date.now() + 3600000 });
          return json(200, { user: users[input.username], state: 'signed_in' },
            `build_demo_session=${nextToken}; HttpOnly; SameSite=Strict; Path=/; Max-Age=3600`);
        }
        if (url.pathname === '/api/logout') {
          if (token) sessions.delete(token);
          return json(200, { user: null, state: 'anonymous' },
            'build_demo_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
        }
        return json(404, { error: 'Unknown demo endpoint.' });
      }
      if (req.method !== 'GET') { res.writeHead(405); return res.end(); }
      let filename = path.resolve(staticRoot, '.' + decodeURIComponent(url.pathname));
      if (url.pathname === '/') filename = path.join(staticRoot, 'index.html');
      if (!filename.startsWith(path.resolve(staticRoot) + path.sep)) {
        res.writeHead(403); return res.end();
      }
      const data = await readFile(filename);
      const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
      res.writeHead(200, { 'Content-Type': mime[path.extname(filename)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(data);
    } catch (error) {
      json(error.code === 'ENOENT' ? 404 : 400, { error: 'The demo request could not be completed.' });
    }
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  createDemoServer().listen(5190, '127.0.0.1', () => console.log('Local demo: http://127.0.0.1:5190'));
}
