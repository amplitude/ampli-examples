import React, { useRef, useState } from 'react';
import { fields, validation } from './form-events.js';
import { recordFormEvent } from './analytics.js';

const empty = () => ({ display_name: '', email: '', team_size: '' });
export function App({ analytics }) {
  const [values, setValues] = useState(empty);
  const [attempt, setAttempt] = useState(() => crypto.randomUUID());
  const [stage, setStage] = useState('editing');
  const [message, setMessage] = useState('Use synthetic values only.');
  const started = useRef(false);
  function ensureStarted() {
    if (!started.current) { started.current = true; recordFormEvent('Form Started', attempt); }
  }
  function focus(field) { ensureStarted(); recordFormEvent('Form Field Focused', attempt, { field }); }
  function blur(field) {
    const reason = validation(field, values[field]);
    recordFormEvent(reason === 'valid' ? 'Form Field Completed' : 'Form Field Invalid', attempt, { field, reason, phase: 'blur' });
  }
  function submit(event) {
    event.preventDefault(); ensureStarted();
    const invalid = fields.filter((field) => validation(field, values[field]) !== 'valid');
    if (invalid.length) {
      for (const field of invalid) recordFormEvent('Form Field Invalid', attempt, { field, reason: validation(field, values[field]), phase: 'submit' });
      setMessage('Fix the required fields and use the listed team size.'); return;
    }
    recordFormEvent('Form Submitted', attempt); setStage('completed');
    setMessage('Local validation completed. No account was created.');
  }
  function leave() {
    ensureStarted(); recordFormEvent('Form Exited', attempt); setStage('exited');
    setMessage('Left this demo attempt without submitting.');
  }
  function restart() {
    setAttempt(crypto.randomUUID()); setValues(empty()); setStage('editing'); started.current = false;
    setMessage('New attempt. Use synthetic values only.');
  }
  return (
    <main>
      <p className="eyebrow">FORM TELEMETRY DEMO</p><h1>Track progress without values</h1>
      <p>This form validates locally. It doesn't create an account or send email. Analytics receives fixed field IDs and validation reasons; the entered values stay in this component's state.</p>
      {stage === 'editing' ? <form noValidate onSubmit={submit}>
        <label htmlFor="display_name">Demo display name</label>
        <input id="display_name" value={values.display_name} onFocus={() => focus('display_name')} onBlur={() => blur('display_name')}
          onChange={(e) => setValues({ ...values, display_name: e.target.value })} />
        <label htmlFor="email">Demo email</label>
        <input id="email" type="email" value={values.email} onFocus={() => focus('email')} onBlur={() => blur('email')}
          onChange={(e) => setValues({ ...values, email: e.target.value })} />
        <label htmlFor="team_size">Team size</label>
        <select id="team_size" value={values.team_size} onFocus={() => focus('team_size')} onBlur={() => blur('team_size')}
          onChange={(e) => setValues({ ...values, team_size: e.target.value })}>
          <option value="">Choose a size</option><option value="1-10">1-10</option><option value="11-50">11-50</option><option value="51+">51+</option>
        </select>
        <button id="submit" type="submit">Submit locally</button>
        <button id="leave" type="button" onClick={leave}>Leave form (demo)</button>
      </form> : <button id="restart" onClick={restart}>Start another attempt</button>}
      <p role="status">{message}</p>
      <p>Stage: <strong id="stage">{stage}</strong></p>
      <p>Attempt: <code id="attempt-id">{attempt}</code></p>
      <aside><p>Analytics: <strong id="analytics-status">{analytics.status}</strong></p>
        <p>Device ID: <code id="device-id">{analytics.deviceId ?? 'not initialized'}</code></p></aside>
    </main>
  );
}
