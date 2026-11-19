import { initializeAnalytics, currentIdentity, record } from './analytics.js';
import './style.css';

const url = new URL(window.location.href);
const runId = url.searchParams.get('demo_run_id') || crypto.randomUUID();
url.searchParams.set('demo_run_id', runId);
window.history.replaceState(null, '', url);

const start = document.querySelector('#start');
const report = document.querySelector('#report');
const status = document.querySelector('#status');
const identity = document.querySelector('#identity');
let reports = 0;

function showIdentity() {
  identity.textContent = JSON.stringify({ runId, ...currentIdentity() }, null, 2);
}

start.addEventListener('click', async () => {
  start.disabled = true;
  status.textContent = 'Initializing analytics...';
  if (!await initializeAnalytics()) {
    status.textContent = 'Analytics unavailable. Check your key and server zone, then reload.';
    return;
  }
  showIdentity();
  status.textContent = 'Analytics ready. Sending demo event...';
  const accepted = await record('Cookieless Demo Opened', runId);
  status.textContent = accepted ? 'Demo event accepted (HTTP 200).' : 'Demo event not confirmed within 3 seconds.';
});

report.addEventListener('click', async () => {
  reports += 1;
  document.querySelector('#report-result').textContent = `Sample report ${reports} generated. No real report data is sent.`;
  const accepted = await record('Cookieless Report Generated', runId);
  showIdentity();
  status.textContent = accepted ? 'Report event accepted (HTTP 200).' : 'Report generated; analytics delivery not confirmed.';
});
