import * as amplitude from '@amplitude/unified';
import { preferenceIdentify, preferenceValues, clearedThemeIdentify } from './properties.js';

let ready;
let enabled = false;

export function initializeAnalytics() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
  if (!apiKey) return Promise.resolve({ status: 'disabled', userId: null, deviceId: null });
  if (!ready) {
    ready = amplitude.initAll(apiKey, {
      instanceName: 'build-user-properties',
      serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
      analytics: { autocapture: false, remoteConfig: { fetchRemoteConfig: false } },
      sessionReplay: { sampleRate: 0 },
      engagement: { skip: true },
    }).then(() => {
      const storageKey = 'build-user-properties-demo-id-v1';
      let userId = localStorage.getItem(storageKey);
      if (!userId) {
        userId = `build-properties-${crypto.randomUUID()}`;
        localStorage.setItem(storageKey, userId);
      }
      amplitude.setUserId(userId);
      enabled = true;
      return { status: 'ready', userId, deviceId: amplitude.getDeviceId() };
    }).catch((error) => {
      console.error('Analytics initialization failed', error);
      return { status: 'error', userId: null, deviceId: null };
    });
  }
  return ready;
}

async function identifyThenTrack(operation, eventName, properties) {
  if (!enabled) return 'Analytics is disabled. Add your test-project key and reload.';
  const update = await amplitude.identify(operation).promise;
  if (update.code !== 200) throw new Error(`Property update: ${update.message}`);
  const event = await amplitude.track(eventName, properties).promise;
  if (event.code !== 200) throw new Error(`Event upload: ${event.message}`);
  return 'Property update and follow-up event accepted. Check the profile in Amplitude.';
}

export function updatePreferences(input) {
  const values = preferenceValues(input);
  return identifyThenTrack(preferenceIdentify(values), 'Preferences Updated', {
    selected_plan: values.plan, selected_theme: values.theme,
  });
}

export function clearPreferredTheme() {
  return identifyThenTrack(clearedThemeIdentify(), 'Theme Preference Cleared', {});
}
