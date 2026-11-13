import React, { useRef, useState } from 'react';
import { createSettingsSaver, loadSettings, storageKey } from './settings.js';
import { trackSettingsSaved } from './analytics.js';

export function App({ analytics }) {
  const [preferences, setPreferences] = useState(() => loadSettings(localStorage));
  const [saved, setSaved] = useState(preferences);
  const [failNext, setFailNext] = useState(false);
  const [saving, setSaving] = useState(false);
  const pending = useRef(false);
  const [message, setMessage] = useState('Change a preference, then save.');
  const [saveSettings] = useState(() => createSettingsSaver({
    persistSettings: (settings) => localStorage.setItem(storageKey, JSON.stringify(settings)),
    trackSaved: trackSettingsSaved,
    pause: () => new Promise((resolve) => setTimeout(resolve, 650)),
  }));

  async function handleSubmit(event) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setSaving(true);
    const fail = failNext;
    setFailNext(false);
    setMessage('Saving...');
    try {
      const result = await saveSettings(preferences, { fail });
      if (result.status === 'saved') {
        setSaved(result.settings);
        setMessage('Preferences saved in this browser.');
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      pending.current = false;
      setSaving(false);
    }
  }

  return (
    <main>
      <p className="eyebrow">WORKSPACE DEMO</p>
      <h1>Workspace preferences</h1>
      <p>This demo saves to this browser's local storage. The delay and failure switch simulate a save request; no backend or email service is involved.</p>
      <form onSubmit={handleSubmit} aria-label="Workspace preferences">
        <label htmlFor="theme">Theme</label>
        <select id="theme" value={preferences.theme} disabled={saving}
          onChange={(event) => setPreferences({ ...preferences, theme: event.target.value })}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <label htmlFor="digest">Digest frequency</label>
        <select id="digest" value={preferences.digest} disabled={saving}
          onChange={(event) => setPreferences({ ...preferences, digest: event.target.value })}>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <label>
          <input id="fail-next" type="checkbox" checked={failNext} disabled={saving}
            onChange={(event) => setFailNext(event.target.checked)} /> Fail the next save
        </label>
        <button id="save-settings" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save preferences'}
        </button>
        <p role="status">{message}</p>
      </form>
      <section aria-label="Saved preferences">
        <h2>Saved preferences</h2>
        <p id="saved-values">Theme: {saved.theme}; digest: {saved.digest}</p>
      </section>
      <aside aria-label="Analytics status">
        <p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
        <p>Device ID: <code id="device-id">{analytics.deviceId ?? 'not initialized'}</code></p>
      </aside>
    </main>
  );
}
