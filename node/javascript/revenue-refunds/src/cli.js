import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { demoRecords, validateRecords, totalCents } from './records.js';

try {
  const [command, file = 'data/transactions.json'] = process.argv.slice(2);
  if (command === 'seed') {
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(demoRecords(), null, 2) + '\n', { flag: 'wx' });
    console.log(`Created ${file}. Keep this file unchanged for retries.`);
  } else if (['preview', 'send'].includes(command)) {
    const records = validateRecords(JSON.parse(readFileSync(file, 'utf8')));
    console.log(JSON.stringify({ records: records.length, userId: records[0].userId, netRevenue: totalCents(records) / 100, currency: 'USD' }));
    if (command === 'send') {
      const { sendRecords } = await import('./analytics.js');
      const results = await sendRecords(records);
      for (const result of results) console.log(JSON.stringify(result));
      if (results.some((r) => r.status !== 'accepted')) process.exitCode = 1;
    }
  } else {
    throw Error('Use: pnpm demo seed|preview|send [file]');
  }
} catch (error) {
  // Keep input values and payment-provider payloads out of diagnostic output.
  console.error(error.code === 'EEXIST' ? 'File exists. Reuse it, or choose a different path for a new demo.' : 'Command failed. Check the command, file format, transaction rules, and environment.');
  process.exitCode = 1;
}
