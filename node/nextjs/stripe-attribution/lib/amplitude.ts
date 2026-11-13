// lib/amplitude.ts
'use client';
// Keep lines other Next.js pages added here: replay masking and sampling
// (/build/nextjs-session-replay), experiment configuration
// (/build/nextjs-feature-flags), and engagement options
// (/build/nextjs-guides-surveys). Merge into your existing initAll call.
import * as amplitude from '@amplitude/unified';

declare global {
  var __campaignAmplitudeReady: Promise<void> | undefined;
}

export function amplitudeReady(): Promise<void> {
  if (typeof window === 'undefined') return Promise.resolve();
  if (!globalThis.__campaignAmplitudeReady) {
    const key = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
    if (!key) return Promise.reject(new Error('Missing Amplitude API key'));
    globalThis.__campaignAmplitudeReady = amplitude.initAll(key, {
      analytics: {
        remoteConfig: { fetchRemoteConfig: false },
        autocapture: {
          pageViews: true,
          attribution: { trackingMethod: ['userProperty', 'eventProperty'] },
        },
      },
      sessionReplay: { sampleRate: 0 },
      engagement: { skip: true },
    });
  }
  return globalThis.__campaignAmplitudeReady;
}

if (typeof window !== 'undefined') {
  void amplitudeReady().catch(console.error);
}

export { amplitude };

// Bound the UI wait; the SDK may finish queued work after the UI continues.
export async function bestEffortAnalytics(work: () => Promise<unknown>): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    await Promise.race([
      work(),
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Analytics wait timed out')), 1500); }),
    ]);
  } catch (error) { console.error('Browser analytics unavailable', error); }
  finally { clearTimeout(timer); }
}
