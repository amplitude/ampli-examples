import test from 'node:test';
import assert from 'node:assert/strict';
import { once } from 'node:events';
import { createDemoServer } from '../server/server.mjs';

test('real local session lifecycle rejects bad credentials and cross-origin writes', async (t) => {
  const server = createDemoServer(); server.listen(0, '127.0.0.1'); await once(server, 'listening');
  t.after(() => new Promise((resolve) => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const post = (route, body, cookie, requestOrigin = origin) => fetch(`${origin}/api/${route}`, {
    method: 'POST', headers: { Origin: requestOrigin, 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) }, body: JSON.stringify(body),
  });
  assert.equal((await (await fetch(`${origin}/api/session`)).json()).state, 'anonymous');
  assert.equal((await post('login', { username: 'alex', password: 'wrong' })).status, 401);
  assert.equal((await post('login', { username: 'alex', password: 'local-demo-password' }, null, 'https://other.example')).status, 403);
  const login = await post('login', { username: 'alex', password: 'local-demo-password' });
  assert.equal(login.status, 200);
  const setCookie = login.headers.get('set-cookie'); assert.match(setCookie, /HttpOnly; SameSite=Strict/);
  const cookie = setCookie.split(';')[0];
  const current = await (await fetch(`${origin}/api/session`, { headers: { Cookie: cookie } })).json();
  assert.equal(current.user.id, 'build-login-alex-v1');
  assert.equal((await post('logout', {}, cookie)).status, 200);
  assert.equal((await (await fetch(`${origin}/api/session`, { headers: { Cookie: cookie } })).json()).state, 'expired');
  const sam = await post('login', { username: 'sam', password: 'local-demo-password' });
  assert.equal((await sam.json()).user.id, 'build-login-sam-v1');
});
