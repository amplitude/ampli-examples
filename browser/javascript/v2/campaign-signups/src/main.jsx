import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { readAccount } from './accounts.js';
import { initializeAnalytics } from './analytics.js';
import { App } from './App.jsx';
import './style.css';

async function start() {
  let account;
  try { account = readAccount(localStorage); }
  catch { document.getElementById('root').textContent = 'Demo storage is unavailable or invalid.'; return; }
  const analytics = await initializeAnalytics(account);
  createRoot(document.getElementById('root')).render(
    <StrictMode><App analytics={analytics} initialAccount={account} /></StrictMode>,
  );
}
start();
