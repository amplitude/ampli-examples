import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';
import { sessionRequest } from './session.js';
import { initializeAnalytics } from './analytics.js';
import './style.css';

async function start() {
  const session = await sessionRequest('session');
  const analytics = await initializeAnalytics(session);
  createRoot(document.getElementById('root')).render(<StrictMode><App session={session} analytics={analytics} /></StrictMode>);
}
start().catch((error) => {
  document.getElementById('root').textContent = `Could not load the session: ${error.message}. Reload to retry.`;
});
