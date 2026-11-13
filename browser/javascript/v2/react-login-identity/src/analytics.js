import * as amplitude from '@amplitude/unified';

let ready;
let enabled = false;
export function initializeAnalytics(session) {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
  if (!apiKey) return Promise.resolve({ status: 'disabled', needsSignout: false });
  if (!ready) {
    ready = amplitude.initAll(apiKey, {
      instanceName: 'build-login-identity',
      serverZone: import.meta.env.VITE_AMPLITUDE_SERVER_ZONE === 'EU' ? 'EU' : 'US',
      analytics: { autocapture: false, remoteConfig: { fetchRemoteConfig: false } },
      sessionReplay: { sampleRate: 0 }, engagement: { skip: true },
    }).then(() => {
      enabled = true;
      if (session.user) amplitude.setUserId(session.user.id);
      // Don't reset for null/loading state. An explicit sign-out clears stale identity.
      return { status: 'ready', needsSignout: !session.user && Boolean(amplitude.getUserId()) };
    }).catch((error) => {
      console.error('Analytics initialization failed', error);
      return { status: 'error', needsSignout: false };
    });
  }
  return ready;
}

export function analyticsIdentity() {
  return enabled ? { userId: amplitude.getUserId() ?? null, deviceId: amplitude.getDeviceId() } : { userId: null, deviceId: null };
}
export function identifySignedInUser(user) {
  if (enabled) amplitude.setUserId(user.id);
}
export function resetAfterSignout() {
  if (enabled) amplitude.reset();
}
export async function trackDemoVisit(signedIn) {
  if (!enabled) return 'Analytics disabled; the local session still works.';
  const result = await amplitude.track('Identity Demo Viewed', {
    auth_state: signedIn ? 'signed_in' : 'anonymous',
  }).promise;
  if (result.code !== 200) throw new Error(`Visit upload: ${result.message}`);
  return 'Visit event accepted. Check the identity in Amplitude.';
}
