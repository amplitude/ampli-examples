import { createInstance } from '@amplitude/unified';
import { ampli, DefaultConfiguration } from './ampli';

const button = document.querySelector<HTMLButtonElement>('#track')!;
const status = document.querySelector<HTMLParagraphElement>('#status')!;

async function start() {
  const apiKey = import.meta.env.VITE_AMPLITUDE_API_KEY;
  if (!apiKey) {
    status.textContent = 'Set VITE_AMPLITUDE_API_KEY in .env to run this example.';
    return;
  }

  try {
    const client = createInstance();
    await client.initAll(apiKey, {
      analytics: { ...DefaultConfiguration },
      sessionReplay: { sampleRate: 1 },
    });
    await ampli.load({ client: { instance: client } }).promise;

    status.textContent = 'Unified and Ampli are ready.';
    button.disabled = false;
  } catch (error) {
    status.textContent = `Initialization failed: ${String(error)}`;
  }
}

button.addEventListener('click', async () => {
  const result = await ampli.eventNoProperties().promise;
  const hasReplayId = Object.hasOwn(result?.event.event_properties ?? {}, '[Amplitude] Session Replay ID');
  status.textContent = `Typed event result: ${result?.code ?? 'no response'}; Session Replay ID ${hasReplayId ? 'attached' : 'not attached'}`;
});

void start();
