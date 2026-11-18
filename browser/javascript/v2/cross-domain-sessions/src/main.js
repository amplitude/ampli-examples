import './style.css';
import { initializeAnalytics, currentIdentity, record } from './analytics.js';
import { productLink, cleanHandoffUrl } from './handoff.js';

const site = document.body.dataset.site;
const incoming = new URL(location.href);
let runId = incoming.searchParams.get('demoRunId');
try { runId ||= sessionStorage.getItem('build-cross-domain-run'); } catch { /* Storage is optional. */ }
runId ||= crypto.randomUUID();
try { sessionStorage.setItem('build-cross-domain-run', runId); } catch { /* Keep the in-memory ID. */ }
const status = document.querySelector('#status');
const identity = document.querySelector('#identity');
const productUrl = import.meta.env.VITE_PRODUCT_URL || 'http://127.0.0.1:5173/product.html';

// Let the SDK read the handoff parameters before removing them from the address bar.
const enabled = await initializeAnalytics();
history.replaceState(history.state, '', cleanHandoffUrl(location.href));
const pageAccepted = await record(site === 'marketing'
  ? 'Build Cross-domain Marketing Viewed' : 'Build Cross-domain Product Viewed', runId);
function showIdentity() { identity.textContent = JSON.stringify({ runId, ...currentIdentity() }, null, 2); }
showIdentity();
status.textContent = !enabled ? 'Analytics unavailable. You can still use the demo.'
  : pageAccepted ? 'Page event upload accepted. Check processed data in Amplitude.'
  : 'Page event upload failed. You can still use the demo.';

if (site === 'marketing') {
  const button = document.querySelector('#open-product');
  button.disabled = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    await record('Build Cross-domain Handoff Clicked', runId);
    const target = productLink(productUrl, new URL(productUrl).origin, currentIdentity(), runId);
    location.assign(target);
  });
} else {
  const button = document.querySelector('#use-feature');
  button.disabled = false;
  button.addEventListener('click', async () => {
    const accepted = await record('Build Cross-domain Feature Used', runId);
    showIdentity();
    status.textContent = accepted ? 'Sample feature used. Event upload accepted.'
      : 'Sample feature used. Analytics disabled or upload failed.';
  });
}
