import { randomUUID } from 'node:crypto';
import { createAnalytics } from './analytics.js';

const runId = randomUUID();
const analytics = await createAnalytics({
  apiKey: process.env.AMPLITUDE_API_KEY,
  serverZone: process.env.AMPLITUDE_SERVER_ZONE || 'US',
});
const acme = { id: `build-acme-${runId}`, name: 'Build Acme', plan: 'team' };
const birch = { id: `build-birch-${runId}`, name: 'Build Birch', plan: 'business' };
const alice = `build-alice-${runId}`;
const bob = `build-bob-${runId}`;

try {
  // Account metadata must arrive before the events that need it.
  await analytics.describeAccount(acme);
  await analytics.describeAccount(birch);
  await analytics.reportCreated({ userId: alice, accountId: acme.id, runId });
  await analytics.reportCreated({ userId: bob, accountId: acme.id, runId });
  // Alice switches to Birch. The event carries her current account explicitly.
  await analytics.reportCreated({ userId: alice, accountId: birch.id, runId });
  // This action belongs to the person, with no account context.
  await analytics.helpOpened({ userId: alice, runId });
  console.log(JSON.stringify({ runId, accounts: [acme.id, birch.id], uploadsAccepted: 6 }, null, 2));
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
