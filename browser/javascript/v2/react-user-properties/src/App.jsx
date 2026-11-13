import React, { useRef, useState } from 'react';
import { updatePreferences, clearPreferredTheme } from './analytics.js';

export function App({ analytics }) {
  const [plan, setPlan] = useState('starter');
  const [theme, setTheme] = useState('dark');
  const [busy, setBusy] = useState(false);
  const pending = useRef(false);
  const [message, setMessage] = useState('Choose properties for the synthetic demo user.');
  async function run(action) {
    if (pending.current) return;
    pending.current = true; setBusy(true);
    try { setMessage(await action()); }
    catch (error) { setMessage(error.message); }
    finally { pending.current = false; setBusy(false); }
  }
  return (
    <main>
      <p className="eyebrow">USER PROPERTIES DEMO</p>
      <h1>Update a demo user</h1>
      <p>These controls change analytics properties for a synthetic user. They don't change billing, account membership, or application settings.</p>
      <label htmlFor="plan">Plan property</label>
      <select id="plan" value={plan} disabled={busy} onChange={(e) => setPlan(e.target.value)}>
        <option value="starter">Starter</option><option value="pro">Pro</option>
      </select>
      <label htmlFor="theme">Theme property</label>
      <select id="theme" value={theme} disabled={busy} onChange={(e) => setTheme(e.target.value)}>
        <option value="dark">Dark</option><option value="light">Light</option>
      </select>
      <button id="apply" disabled={busy} onClick={() => run(() => updatePreferences({ plan, theme }))}>Apply properties</button>
      <button id="clear-theme" disabled={busy} onClick={() => run(clearPreferredTheme)}>Clear theme property</button>
      <p role="status">{busy ? 'Sending...' : message}</p>
      <aside>
        <p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
        <p>User ID: <code id="user-id">{analytics.userId ?? 'not initialized'}</code></p>
        <p>Device ID: <code id="device-id">{analytics.deviceId ?? 'not initialized'}</code></p>
      </aside>
    </main>
  );
}
