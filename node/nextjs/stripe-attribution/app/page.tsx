// Keep your existing routes and auth; this is the standalone demo home.
'use client';
import { useEffect, useState } from 'react';
import { CheckoutButton } from '@/components/CheckoutButton';
import { amplitude, amplitudeReady, bestEffortAnalytics } from '@/lib/amplitude';
import { amplitudeUserId } from '@/lib/amplitude-user-id';
import { trackSignup } from '@/lib/signup-attribution';
export default function Home() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [busy, setBusy] = useState(true);
  const [message, setMessage] = useState('');
  useEffect(() => {
    void (async () => {
      try {
        const response = await fetch('/api/account');
        if (!response.ok) throw new Error('Account lookup failed');
        const { userId } = await response.json();
        setAccountId(userId);
        if (userId) {
          await bestEffortAnalytics(async () => { await amplitudeReady(); amplitude.setUserId(amplitudeUserId(userId)); });
        }
      } catch { setMessage('Could not load the demo account. Reload to retry.'); }
      finally { setBusy(false); }
    })();
  }, []);
  async function signup() {
    setBusy(true); setMessage('');
    try {
      const response = await fetch('/api/account', { method: 'POST' });
      if (!response.ok) throw new Error('Demo signup failed');
      const { userId, created } = await response.json();
      setAccountId(userId);
      if (created) await trackSignup(userId);
    } catch (error) { setMessage(String(error)); }
    finally { setBusy(false); }
  }
  return <>
    <h1>Campaign checkout demo</h1>
    <p>I can create a local demo account and buy a $20 report export in Stripe's sandbox.</p>
    <p>The account is a generated ID with a cookie session. No email or password is collected.</p>
    <p>{accountId ? `Account: ${amplitudeUserId(accountId)}` : 'No demo account yet'}</p>
    <button disabled={busy || !!accountId} onClick={signup}>Create demo account</button>
    {accountId && <CheckoutButton accountId={accountId} />}
    <p role="status">{message}</p>
  </>;
}
