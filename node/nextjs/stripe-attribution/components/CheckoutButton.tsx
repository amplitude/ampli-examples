// components/CheckoutButton.tsx
'use client';
import { useState } from 'react';
import { amplitude, amplitudeReady, bestEffortAnalytics } from '@/lib/amplitude';
import { amplitudeUserId } from '@/lib/amplitude-user-id';

export function CheckoutButton({ accountId }: { accountId: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function checkout() {
    setBusy(true);
    setError('');
    try {
      // Keep checkout usable even if browser analytics is blocked.
      await bestEffortAnalytics(async () => {
        await amplitudeReady();
        amplitude.setUserId(amplitudeUserId(accountId));
        await amplitude.track('Checkout Started').promise;
      });
      const response = await fetch('/api/checkout', { method: 'POST' });
      if (!response.ok) throw new Error('Could not start checkout. Try again.');
      const { url } = await response.json();
      window.location.assign(url);
    } catch (checkoutError) {
      setError(checkoutError instanceof Error ? checkoutError.message : 'Checkout failed');
      setBusy(false);
    }
  }

  return <>
    <button onClick={checkout} disabled={busy}>
      {busy ? 'Opening checkout...' : 'Buy for $20'}
    </button>
    {error && <p role="alert">{error}</p>}
  </>;
}
