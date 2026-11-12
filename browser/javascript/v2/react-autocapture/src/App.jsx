import React, { useState } from 'react';

export function App({ analytics }) {
  const [message, setMessage] = useState('No changes yet.');
  const [helpOpen, setHelpOpen] = useState(false);
  const path = window.location.pathname;
  const heading = path === '/app/billing/' ? 'Billing preferences'
    : path === '/app/admin/' ? 'Admin preview'
      : path === '/app/settings/' ? 'Workspace settings' : 'Welcome';

  return (
    <main>
      <p className="eyebrow">WORKSPACE DEMO</p>
      <h1>{heading}</h1>
      <p>This demo changes local display state. It does not save settings or charge a card.</p>
      <nav aria-label="Demo pages">
        <a href="/app/settings/">Settings</a>
        <a href="/app/billing/">Billing</a>
        <a href="/app/admin/">Admin</a>
        <a href="/welcome/">Welcome</a>
      </nav>
      <section aria-label="Workspace controls">
        <label htmlFor="plan">Preview plan</label>
        <select id="plan" defaultValue="starter" data-analytics-action="plan">
          <option value="starter">Starter</option>
          <option value="pro">Pro</option>
        </select>
        <button id="save" data-analytics-action="save"
          data-amp-track-action="settings_saved" data-amp-track-area="workspace"
          onClick={() => setMessage('Saved in this tab.')}>
          <span>Save preferences</span>
        </button>
        <button id="help" data-amp-default-track=""
          onClick={() => setHelpOpen((value) => !value)}>Toggle help</button>
        <div id="help-panel" role="button" tabIndex={0}
          onClick={() => setHelpOpen((value) => !value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setHelpOpen((value) => !value);
            }
          }}>More help</div>
        {helpOpen && <p>Changes apply only to this demo tab.</p>}
        <p role="status">{message}</p>
      </section>
      <aside aria-label="Analytics status">
        <p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
        <p>Device ID: <code id="device-id">{analytics.deviceId ?? 'not initialized'}</code></p>
      </aside>
    </main>
  );
}
