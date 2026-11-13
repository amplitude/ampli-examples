import React, { useRef, useState } from 'react';
import { sendPolicyFixture } from './analytics.js';
import { privateMarker } from './fixture.js';

export function App({ analytics }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('Send a synthetic fixture through the policy.');
  const pending = useRef(false);
  async function send(blocked) {
    if (pending.current) return;
    pending.current = true; setBusy(true);
    try { setMessage(await sendPolicyFixture(blocked)); }
    catch (error) { setMessage(error.message); }
    finally { pending.current = false; setBusy(false); }
  }
  return (
    <main>
      <p className="eyebrow">EVENT POLICY DEMO</p><h1>Redact before upload</h1>
      <p>This fixture uses fake email, search text, and token values marked <code>{privateMarker}</code>. The policy keeps a category and result flag, plus selected SDK identifiers and timing. It is a finite example policy, not a general detector of personal data.</p>
      <button id="send-allowed" disabled={busy} onClick={() => send(false)}>Send allowed fixture</button>
      <button id="send-blocked" disabled={busy} onClick={() => send(true)}>Try an unlisted event</button>
      <p role="status">{busy ? 'Processing...' : message}</p>
      <aside>
        <p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
        <p>Device ID: <code id="device-id">{analytics.deviceId ?? 'not initialized'}</code></p>
      </aside>
    </main>
  );
}
