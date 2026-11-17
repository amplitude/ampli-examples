import * as amplitude from '@amplitude/unified';

let ready;
let enabled = false;

async function upload(name, properties, options) {
  const pending = amplitude.track(name, { demo_source: 'build-react-campaign-signups', ...properties }, options);
  await amplitude.flush().promise;
  return (await pending.promise).code;
}

export function initializeAnalytics(account) {
  if (ready) return ready;
  ready = (async () => {
    const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY?.trim();
    if (!apiKey) return { status: 'disabled', deviceId: null };
    const serverZone = import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || 'US';
    if (!['US', 'EU'].includes(serverZone)) throw Error('Invalid server zone.');
    await amplitude.initAll(apiKey, {
      instanceName: 'build-campaign-signups', serverZone,
      analytics: {
        remoteConfig: { fetchRemoteConfig: false },
        autocapture: {
          attribution: { trackingMethod: 'userProperty' },
          pageViews: false, sessions: false, formInteractions: false,
          fileDownloads: false, pageUrlEnrichment: false, elementInteractions: false,
          frustrationInteractions: false, webVitals: false, networkTracking: false,
        },
      },
      sessionReplay: { sampleRate: 0 }, engagement: { skip: true },
    });
    if (account) amplitude.setUserId(account.userId);
    enabled = true;
    const code = await upload('Campaign Landing Viewed', { account_exists: Boolean(account) });
    return { status: code === 200 ? 'ready' : 'upload failed', deviceId: amplitude.getDeviceId() };
  })().catch(() => ({ status: 'unavailable', deviceId: null }));
  return ready;
}

export async function recordSignup(account) {
  if (!enabled) return 'Account created. Analytics is disabled or unavailable.';
  amplitude.setUserId(account.userId);
  const code = await upload('Campaign Signup Completed', { plan: account.plan }, {
    insert_id: `signup-${account.userId}`, time: account.createdAt,
  });
  return code === 200
    ? 'Account created. Signup upload accepted; check processed data in Amplitude.'
    : 'Account created. Signup analytics upload failed.';
}
