import * as amplitude from '@amplitude/unified';

let initialization;
export const client = {
  initialize() {
    if (!initialization) initialization = amplitude.initAll(import.meta.env.VITE_AMPLITUDE_API_KEY.trim(), {
      serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
      analytics: { optOut: true, autocapture: false, remoteConfig: { fetchRemoteConfig: false } },
      sessionReplay: { sampleRate: 0 }, engagement: { skip: true },
    });
    return initialization;
  },
  setOptOut: (value) => amplitude.setOptOut(value),
  getDeviceId: () => amplitude.getDeviceId(),
  track: () => amplitude.track('Consent Demo Action', { surface: 'local_preferences' }).promise,
};
