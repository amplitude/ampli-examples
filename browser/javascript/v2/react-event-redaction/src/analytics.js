import * as amplitude from '@amplitude/unified';
import { redactionPlugin } from './policy.js';
import { rawFixture, privateMarker } from './fixture.js';

let ready;
let enabled = false;
export function initializeAnalytics() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
  if (!apiKey) return Promise.resolve({ status: 'disabled', deviceId: null });
  if (!ready) {
    ready = amplitude.initAll(apiKey, {
      serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
      analytics: {
        autocapture: false, remoteConfig: { fetchRemoteConfig: false },
        transport: { type: 'fetch', referrerPolicy: 'no-referrer' },
      },
      sessionReplay: { sampleRate: 0 }, engagement: { skip: true },
    }).then(async () => {
      await amplitude.add(redactionPlugin()).promise;
      enabled = true;
      return { status: 'ready', deviceId: amplitude.getDeviceId() };
    }).catch((error) => {
      console.error('Policy initialization failed', error);
      return { status: 'error', deviceId: null };
    });
  }
  return ready;
}

export async function sendPolicyFixture(blocked = false) {
  if (!enabled) return 'Analytics disabled. Add the test-project key and rebuild.';
  const event = blocked ? { event_type: `${privateMarker} Unknown Event` } : rawFixture(window.location.href);
  const result = await amplitude.track(event).promise;
  if (blocked && result.code === 0) return 'Unlisted event dropped by the policy.';
  if (result.code !== 200) throw new Error(result.message);
  return 'Allowed event accepted. Inspect the actual uploaded and processed fields.';
}
