import * as amplitude from '@amplitude/unified';
import { projectFormEvent } from './form-events.js';

let ready;
let enabled = false;
export function initializeAnalytics() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
  if (!apiKey) return Promise.resolve({ status: 'disabled', deviceId: null });
  if (!ready) ready = amplitude.initAll(apiKey, {
    serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
    analytics: { autocapture: false, remoteConfig: { fetchRemoteConfig: false } },
    sessionReplay: { sampleRate: 0 }, engagement: { skip: true },
  }).then(() => {
    enabled = true;
    return { status: 'ready', deviceId: amplitude.getDeviceId() };
  }).catch((error) => {
    console.error('Analytics initialization failed', error);
    return { status: 'error', deviceId: null };
  });
  return ready;
}

export function recordFormEvent(type, attemptId, metadata) {
  const event = projectFormEvent(type, attemptId, metadata);
  if (!enabled || !event) return;
  void amplitude.track(event.type, event.properties).promise.then((result) => {
    if (result.code !== 200) console.warn('Form telemetry not accepted:', result.message);
  }).catch((error) => console.warn('Form telemetry failed', error));
}
