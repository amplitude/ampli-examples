import * as amplitude from '@amplitude/analytics-browser';

let ready;
let enabled = false;

export function initializeAnalytics() {
  if (!ready) ready = (async () => {
    const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
    if (!apiKey) return false;
    const serverZone = import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US';
    if (!['US', 'EU'].includes(serverZone)) throw new Error('Use US or EU for the server zone.');
    await amplitude.init(apiKey, {
      instanceName: 'build-cookieless',
      serverZone,
      identityStorage: 'localStorage',
      remoteConfig: { fetchRemoteConfig: false },
      autocapture: false,
      flushMaxRetries: 0,
    }).promise;
    enabled = true;
    return true;
  })().catch(() => false);
  return ready;
}

export function currentIdentity() {
  return enabled ? {
    deviceId: amplitude.getDeviceId(),
    sessionId: amplitude.getSessionId(),
    userId: amplitude.getUserId() ?? null,
  } : null;
}

export async function record(name, runId) {
  if (!enabled) return false;
  let timer;
  try {
    const upload = (async () => {
      const pending = amplitude.track(name, {
        demo_run_id: runId,
        demo_source: 'build-cookieless',
        identity_storage: 'localStorage',
      });
      await amplitude.flush().promise;
      return (await pending.promise).code === 200;
    })();
    return await Promise.race([upload, new Promise(resolve => {
      timer = setTimeout(() => resolve(false), 3000);
    })]);
  } catch { return false; }
  finally { clearTimeout(timer); }
}
