import test from 'node:test';
import assert from 'node:assert/strict';
import { productLink, cleanHandoffUrl } from '../src/handoff.js';

const target = 'https://product.example/start?plan=team#workspace';
test('handoff carries both IDs, a short expiry and existing URL state', () => {
  const url = new URL(productLink(target, 'https://product.example',
    { deviceId: 'test-device-12345', sessionId: 1794956000000 }, 'run-1', 100000));
  assert.equal(url.searchParams.get('ampDeviceId'), 'test-device-12345');
  assert.equal(url.searchParams.get('ampSessionId'), '1794956000000');
  assert.equal(url.searchParams.get('ampTimestamp'), '160000');
  assert.equal(url.searchParams.get('plan'), 'team');
  assert.equal(url.hash, '#workspace');
});
test('missing identity keeps navigation usable without identifier parameters', () => {
  const url = new URL(productLink(target, 'https://product.example', null, 'run-1'));
  assert.equal(url.searchParams.has('ampDeviceId'), false);
  assert.equal(url.searchParams.has('ampSessionId'), false);
  assert.equal(url.searchParams.has('ampTimestamp'), false);
});
test('unapproved destinations are rejected', () => {
  assert.throws(() => productLink('https://elsewhere.example', 'https://product.example', null, 'run'), /configured origin/);
});
test('cleanup removes handoff parameters while retaining app query and hash', () => {
  assert.equal(cleanHandoffUrl(target + '&ignored=1'), '/start?plan=team#workspace&ignored=1');
  assert.equal(cleanHandoffUrl('https://product.example/start?plan=team&ampDeviceId=abcde&ampSessionId=12345&ampTimestamp=99999&demoRunId=run#workspace'), '/start?plan=team#workspace');
});
