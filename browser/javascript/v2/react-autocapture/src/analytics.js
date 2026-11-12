import * as amplitude from '@amplitude/unified';
import { analyticsOptions } from './capture-policy.js';

let ready;

export function initializeAnalytics() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
  if (!apiKey) {
    return Promise.resolve({ status: 'disabled', deviceId: null });
  }

  if (!ready) {
    ready = amplitude.initAll(apiKey, {
      serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
      analytics: analyticsOptions,
      sessionReplay: { sampleRate: 0 },
      engagement: { skip: true },
    }).then(() => ({ status: 'ready', deviceId: amplitude.getDeviceId() }))
      .catch((error) => {
        console.error('Amplitude initialization failed', error);
        return { status: 'error', deviceId: null };
      });
  }

  return ready;
}
