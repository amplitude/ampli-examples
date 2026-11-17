import React, { useEffect, useRef, useState } from 'react';
import { createAccount } from './accounts.js';
import { recordSignup } from './analytics.js';

export function App({ analytics, initialAccount }) {
  const [path, setPath] = useState(location.pathname);
  const [account, setAccount] = useState(initialAccount);
  const [plan, setPlan] = useState('starter');
  const [message, setMessage] = useState('');
  const busy = useRef(false);
  useEffect(() => {
    const onPop = () => setPath(location.pathname);
    addEventListener('popstate', onPop);
    return () => removeEventListener('popstate', onPop);
  }, []);

  function navigateToSignup() {
    history.pushState({}, '', '/signup');
    setPath('/signup');
  }

  async function submit(event) {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true;
    try {
      const result = createAccount(localStorage, plan);
      setAccount(result.account);
      if (!result.created) { setMessage('This browser already has a demo account.'); return; }
      setMessage('Account created. Sending signup analytics...');
      try { setMessage(await recordSignup(result.account)); }
      catch { setMessage('Account created. Signup analytics is unavailable.'); }
    } catch {
      setMessage('Account not created. Check browser storage and the selected plan.');
    } finally { busy.current = false; }
  }

  return <main>
    <p className="eyebrow">Campaign signup demo</p>
    <h1>See which campaign brought a signup.</h1>
    <p>This example creates a demo account in this browser only. It has no server authentication or billing.</p>
    <section aria-label="Analytics status">
      <p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
      <p>Device ID: <code id="device-id">{analytics.deviceId || 'not initialized'}</code></p>
      <p>Current route: <code id="route">{path}</code></p>
    </section>
    {account ? <section>
      <h2>Your demo account exists</h2>
      <p>User ID: <code id="user-id">{account.userId}</code></p>
      <p>Selected demo plan: {account.plan}</p>
      <p>Reloading restores the account without sending another signup.</p>
    </section> : path === '/signup' ? <form onSubmit={submit}>
      <h2>Create your demo account</h2>
      <label htmlFor="plan">Demo plan</label>
      <select id="plan" value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="starter">Starter</option><option value="pro">Pro</option>
      </select>
      <button type="submit">Create demo account</button>
    </form> : <button onClick={navigateToSignup}>Continue to signup</button>}
    <p role="status" id="result">{message}</p>
  </main>;
}
