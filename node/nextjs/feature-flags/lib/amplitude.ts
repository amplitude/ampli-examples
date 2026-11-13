// Keep replay/consent/engagement settings from other Next.js Build pages when merging.
'use client';
import * as amplitude from '@amplitude/unified';
let ready: Promise<void> | undefined;
let queue: Promise<unknown> = Promise.resolve();
export function amplitudeReady() {
  if (!ready) {
    const key = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    const deploymentKey = process.env.NEXT_PUBLIC_AMPLITUDE_DEPLOYMENT_KEY;
    if (!key || !deploymentKey) return Promise.reject(new Error('Set both Amplitude keys'));
    ready = Promise.resolve(amplitude.initAll(key, {
      analytics: { autocapture: true, remoteConfig: { fetchRemoteConfig: false } },
      sessionReplay: { sampleRate: 0 },
      engagement: { skip: true },
      experiment: {
        deploymentKey, fetchTimeoutMillis: 3000,
        automaticFetchOnAmplitudeIdentityChange: false,
        retryFetchOnFailure: false, fetchOnStart: false, pollOnStart: false,
        throwOnError: true, automaticExposureTracking: false,
      },
    }));
  }
  return ready;
}
export function loadPricing(userId: string | null, signOut = false): Promise<{ value: string | null; userId: string | null }> {
  const task = queue.catch(() => {}).then(async () => {
    await amplitudeReady();
    const experiment = amplitude.experiment();
    if (!experiment) throw new Error('Experiment did not initialize');
    // All identity changes and variant reads belong to this serialized operation.
    if (signOut) amplitude.reset();
    else if (userId) amplitude.setUserId(userId);
    experiment.clear();
    await experiment.fetch({ user_id: amplitude.getUserId(), device_id: amplitude.getDeviceId() });
    return { value: experiment.all()['pricing-page-v2']?.value ?? null, userId: amplitude.getUserId() ?? null };
  });
  queue = task;
  return task;
}

export function exposePricing() { amplitude.experiment()?.exposure('pricing-page-v2'); }
