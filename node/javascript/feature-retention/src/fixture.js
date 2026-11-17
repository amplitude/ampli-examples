import { reportEvent } from './analytics.js';

export const DAY = 24 * 60 * 60 * 1000;

export function createFixture(runId, now = Date.now()) {
  const start = new Date(now);
  start.setUTCHours(12, 0, 0, 0);
  const dayZero = start.getTime() - 10 * DAY;
  const events = [];
  const add = (person, day, firstUse, feature = 'report_builder') => {
    events.push(reportEvent({ userId: `build-retention-${person}-${runId}`,
      reportId: `report-${events.length + 1}`, firstUse,
      occurredAt: dayZero + day * DAY, feature, runId }));
  };
  for (const person of ['alice', 'bob', 'carol', 'dana']) add(person, 0, true);
  add('alice', 1, false);
  add('alice', 7, false);
  add('bob', 1, false);
  add('bob', 1, false); // Two reports by one person still count as one returning user.
  add('carol', 2, false);
  add('dana', 1, false, 'dashboard'); // Other-feature activity isn't a report-builder return.
  return { runId, cohortDateUTC: new Date(dayZero).toISOString().slice(0, 10),
    expected: { cohortUsers: 4, returnOnDay1: '50%', returnOnDay7: '25%',
      returnOnOrAfterDay1: '75%' }, events };
}
