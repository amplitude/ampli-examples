import test from 'node:test';
import assert from 'node:assert/strict';
import { preferenceValues, preferenceIdentify, clearedThemeIdentify } from '../src/properties.js';

test('actual Identify serializes replacement, first value and counter separately', () => {
  const operations = preferenceIdentify({ plan: 'pro', theme: 'dark' }).getUserProperties();
  assert.deepEqual(operations, {
    $set: { plan: 'pro', preferred_theme: 'dark' },
    $setOnce: { first_theme: 'dark' },
    $add: { preference_updates: 1 },
  });
  assert.deepEqual(clearedThemeIdentify().getUserProperties(), { $unset: { preferred_theme: '-' } });
});

test('only fixed categories reach the operation builder', () => {
  assert.deepEqual(preferenceValues({ plan: 'starter', theme: 'light', email: 'omit@example.test' }), { plan: 'starter', theme: 'light' });
  assert.throws(() => preferenceIdentify({ plan: 'private free text', theme: 'light' }), /listed/);
  assert.throws(() => preferenceIdentify({ plan: 'pro', theme: 'unknown' }), /listed/);
});
