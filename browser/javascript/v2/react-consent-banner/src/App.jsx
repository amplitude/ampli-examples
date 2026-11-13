import React, { useEffect, useState } from 'react';

export function App({ controller, configured }) {
  const [state, setState] = useState(controller.getSnapshot);
  const [message, setMessage] = useState('Choose whether to enable analytics for this demo.');
  useEffect(() => controller.subscribe(setState), [controller]);
  async function record() {
    try { setMessage(await controller.record() ? 'Demo event accepted.' : 'No demo event accepted.'); }
    catch { setMessage('The demo event could not be uploaded.'); }
  }
  return (
    <main>
      <p className="eyebrow">CONSENT CONTROL DEMO</p><h1>Choose analytics collection</h1>
      <p>This first-party demo stores your choice locally. It imports and initializes Amplitude only after a grant, discards actions while off, and keeps replay disabled. Withdrawal stops new actions; it doesn't erase prior SDK storage or retract requests already sent.</p>
      {!configured && <p>No test key configured. Tracking stays off.</p>}
      <button id="grant" disabled={!configured} onClick={() => controller.grant()}>Allow analytics</button>
      <button id="deny" onClick={() => controller.deny()}>Decline or withdraw</button>
      <button id="record" disabled={state.phase !== 'ready'} onClick={record}>Record demo action</button>
      <p>Choice: <strong id="choice">{state.choice}</strong></p>
      <p>Analytics: <strong id="phase">{state.phase}</strong></p>
      <p role="status">{state.error ?? message}</p>
      <p>Device ID: <code id="device-id">{state.deviceId ?? 'not initialized'}</code></p>
    </main>
  );
}
