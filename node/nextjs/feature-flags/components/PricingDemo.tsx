// Keep your existing auth flow; these buttons simulate account selection for QA.
'use client';
import { useEffect, useRef, useState } from 'react';
import { loadPricing, exposePricing } from '@/lib/amplitude';
export function PricingDemo() {
  const [user, setUser] = useState<string | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [status, setStatus] = useState('Loading flags');
  const generation = useRef(0);
  async function load(id: string | null, signOut = false) {
    const current = ++generation.current;
    setUser(id); setStatus('Loading flags'); setValue(null);
    try {
      const next = await loadPricing(id, signOut);
      if (current !== generation.current) return;
      setUser(next.userId); setValue(next.value); setStatus('Fresh fetch succeeded');
    } catch (error) {
      if (current === generation.current) setStatus(`Fetch failed: ${String(error)}`);
    }
  }
  useEffect(() => { void load(null); return () => { generation.current += 1; }; }, []);
  const loading = status === 'Loading flags';
  const fetched = status === 'Fresh fetch succeeded';
  useEffect(() => { if (fetched) exposePricing(); }, [fetched, value, user]);
  return <>
    <h1>Pricing rollout demo</h1>
    <p>These controls simulate sign-in. They do not authenticate an account or charge a card.</p>
    <p>Canonical user: {user ?? 'anonymous'}</p>
    <button disabled={loading} onClick={() => void load('user-build-flags-on')}>Use on test account</button>
    <button disabled={loading} onClick={() => void load('user-build-flags-off')}>Use OFF test account</button>
    <button disabled={loading} onClick={() => void load(null, true)}>Simulate sign-out</button>
    <button disabled={loading} onClick={() => void load(user)}>Fetch latest flag</button>
    <p role="status">{status}</p>
    {fetched && (value === 'on'
      ? <section><h2>New pricing</h2><p>Team: $20 per month, up to 5 projects.</p><button onClick={() => alert('Demo only: no purchase')}>Choose Team</button></section>
      : <section><h2>Current pricing</h2><p>Starter: $10 per month, 1 project.</p><button onClick={() => alert('Demo only: no purchase')}>Choose Starter</button></section>)}
  </>;
}
