export const choiceKey = 'build-consent-choice-v1';

export function readChoice(storage) {
  try { return storage.getItem(choiceKey) === 'granted' ? 'granted' : 'denied'; }
  catch { return 'denied'; }
}
export function writeChoice(storage, choice) {
  try { storage.setItem(choiceKey, choice); }
  catch {
    // Remove a stale grant if saving a new choice fails (for example, quota).
    storage.removeItem(choiceKey);
    throw new Error('Choice could not be saved. Tracking remains off.');
  }
}

export function createConsentController({ initialChoice, persist, loadClient }) {
  let choice = initialChoice === 'granted' ? 'granted' : 'denied';
  let phase = 'off';
  let client;
  let pending;
  let snapshot = { choice, phase, deviceId: null };
  const listeners = new Set();
  function publish(error = null) {
    snapshot = { choice, phase, error, deviceId: client?.getDeviceId() ?? null };
    for (const listener of listeners) listener(snapshot);
  }
  async function start() {
    if (choice !== 'granted') return;
    phase = 'starting'; publish();
    try {
      if (!pending) pending = (async () => {
        const loaded = await loadClient();
        if (choice !== 'granted') return null;
        client = loaded;
        await client.initialize();
        return client;
      })();
      const result = await pending;
      if (!result) { pending = null; phase = 'off'; publish(); return; }
      result.setOptOut(choice !== 'granted');
      phase = choice === 'granted' ? 'ready' : 'off'; publish();
    } catch (error) {
      choice = 'denied'; client?.setOptOut(true); phase = 'error'; publish(error.message);
    }
  }
  return {
    getSnapshot: () => snapshot,
    subscribe(listener) { listeners.add(listener); listener(snapshot); return () => listeners.delete(listener); },
    restore: start,
    async grant() {
      try { persist('granted'); }
      catch (error) { choice = 'denied'; client?.setOptOut(true); phase = 'error'; publish(error.message); return; }
      choice = 'granted'; await start();
    },
    deny() {
      choice = 'denied'; client?.setOptOut(true); phase = 'off';
      try { persist('denied'); publish(); }
      catch (error) { publish(error.message); }
    },
    async record() {
      if (choice !== 'granted' || phase !== 'ready') return false;
      const result = await client.track();
      return result.code === 200;
    },
  };
}
