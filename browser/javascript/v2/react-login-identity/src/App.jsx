import React, { useRef, useState } from 'react';
import { sessionRequest } from './session.js';
import { analyticsIdentity, identifySignedInUser, resetAfterSignout, trackDemoVisit } from './analytics.js';

export function App({ session: initialSession, analytics }) {
  const [session, setSession] = useState(initialSession);
  const [identity, setIdentity] = useState(analyticsIdentity);
  const [needsSignout, setNeedsSignout] = useState(analytics.needsSignout || initialSession.state === 'expired');
  const [username, setUsername] = useState('alex');
  const [password, setPassword] = useState('local-demo-password');
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const [message, setMessage] = useState('Ready. Record a visit, then sign in.');
  async function run(action) {
    if (pending.current) return;
    pending.current = true; setBusy(true);
    try { await action(); setIdentity(analyticsIdentity()); }
    catch (error) { setMessage(error.message); }
    finally { pending.current = false; setBusy(false); }
  }
  async function login(event) {
    event.preventDefault();
    await run(async () => {
      const result = await sessionRequest('login', { username, password });
      identifySignedInUser(result.user);
      setSession(result); setMessage(`Signed in as ${result.user.name}. Record a visit.`);
    });
  }
  async function logout() {
    await run(async () => {
      const result = await sessionRequest('logout', {});
      resetAfterSignout();
      setSession(result); setNeedsSignout(false);
      setMessage('Signed out. The next visit uses a new device ID.');
    });
  }
  return (
    <main>
      <p className="eyebrow">LOCAL SESSION DEMO</p><h1>Login and analytics identity</h1>
      <p>This local-only example has two seeded demo users, Alex and Sam. Use local-demo-password for either. Sessions are kept in server memory and expire after one hour; restarting the server invalidates them. Use your existing auth system in a real app.</p>
      <p id="session-state">Session: {session.user?.name ?? session.state}</p>
      {needsSignout ? <p>Clear the previous sign-in before recording another visit.</p> : !session.user && (
        <form onSubmit={login}>
          <label htmlFor="username">Demo user</label>
          <select id="username" value={username} disabled={busy} onChange={(e) => setUsername(e.target.value)}>
            <option value="alex">Alex</option><option value="sam">Sam</option>
          </select>
          <label htmlFor="password">Demo password</label>
          <input id="password" type="password" value={password} disabled={busy} onChange={(e) => setPassword(e.target.value)} />
          <button id="login" disabled={busy}>Sign in</button>
        </form>
      )}
      {(session.user || needsSignout) && <button id="logout" disabled={busy} onClick={logout}>Sign out and clear identity</button>}
      <button id="visit" disabled={busy || needsSignout} onClick={() => run(async () => setMessage(await trackDemoVisit(Boolean(session.user))))}>Record a visit</button>
      <p role="status">{busy ? 'Working...' : message}</p>
      <aside>
        <p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
        <p>User ID: <code id="user-id">{identity.userId ?? 'anonymous'}</code></p>
        <p>Device ID: <code id="device-id">{identity.deviceId ?? 'not initialized'}</code></p>
      </aside>
    </main>
  );
}
