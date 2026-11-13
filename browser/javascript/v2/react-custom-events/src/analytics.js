import * as amplitude from '@amplitude/unified';

let ready;
let enabled = false;

export function initializeAnalytics() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
  if (!apiKey) return Promise.resolve({ status: 'disabled', deviceId: null });

  if (!ready) {
    ready = amplitude.initAll(apiKey, {
      serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
      analytics: {
        remoteConfig: { fetchRemoteConfig: false },
        autocapture: {
          attribution: false,
          pageViews: false,
          sessions: false,
          formInteractions: false,
          fileDownloads: false,
          pageUrlEnrichment: false,
          frustrationInteractions: false,
          networkTracking: false,
          webVitals: false,
          performanceTracking: false,
          elementInteractions: {
            cssSelectorAllowlist: ['#save-settings'],
            actionClickAllowlist: [],
            viewportContentUpdated: { enabled: false },
          },
        },
      },
      sessionReplay: { sampleRate: 0 },
      engagement: { skip: true },
    }).then(() => {
      enabled = true;
      return { status: 'ready', deviceId: amplitude.getDeviceId() };
    }).catch((error) => {
      console.error('Amplitude initialization failed', error);
      return { status: 'error', deviceId: null };
    });
  }
  return ready;
}

export function trackSettingsSaved(properties) {
  if (!enabled) return;
  // Upload completion doesn't control whether the preference save succeeded.
  void amplitude.track('Settings Saved', properties).promise.then((result) => {
    if (result.code !== 200) console.warn('Settings Saved upload:', result.message);
  }).catch((error) => console.warn('Settings Saved upload failed', error));
}
