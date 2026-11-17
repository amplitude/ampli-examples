import { randomUUID } from 'node:crypto';
import { createAnalytics } from './analytics.js';
import { createFixture } from './fixture.js';

const args = process.argv.slice(2);
if (args.some(arg => arg !== '--send')) throw new Error('Only --send is supported.');
const fixture = createFixture(randomUUID());
const { events, ...summary } = fixture;
if (!args.includes('--send')) {
  console.log(JSON.stringify({ mode: 'dry-run', ...summary, events }, null, 2));
} else {
  try {
    const analytics = await createAnalytics({ apiKey: process.env.AMPLITUDE_API_KEY,
      serverZone: process.env.AMPLITUDE_SERVER_ZONE || 'US' });
    const uploadsAccepted = await analytics.send(events);
    console.log(JSON.stringify({ mode: 'sent', ...summary, uploadsAccepted }, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
