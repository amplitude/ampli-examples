// lib/signup-attribution.ts
'use client';
import { amplitude, amplitudeReady, bestEffortAnalytics } from '@/lib/amplitude';
import { amplitudeUserId } from '@/lib/amplitude-user-id';

// Call only after your app confirms that it created a new account.
export async function trackSignup(accountId: string): Promise<void> {
  await bestEffortAnalytics(async () => {
    await amplitudeReady();
    const userId = amplitudeUserId(accountId);
    amplitude.setUserId(userId);
    const result = await amplitude.track({
      event_type: 'Signup Completed',
      insert_id: `signup-${userId}`,
    }).promise;
    if (result.code !== 200) console.error('Signup analytics:', result.message);
  });
}
