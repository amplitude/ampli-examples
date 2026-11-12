import test from 'node:test';
import assert from 'node:assert/strict';
import { analyticsOptions, isMeasuredPath } from '../src/capture-policy.js';

test('path rules separate the application boundary from lookalike paths', () => {
  for (const path of ['/app/settings/', '/app/billing/', '/app/administration/']) {
    assert.equal(isMeasuredPath(path), true, path);
  }
  for (const path of ['/welcome/', '/application/settings/', '/app', '/app/admin', '/app/admin/users/']) {
    assert.equal(isMeasuredPath(path), false, path);
  }
});

test('element URL policy agrees with page policy on normal and excluded fixtures', () => {
  const { pageUrlAllowlist: allow, pageUrlExcludelist: deny } = analyticsOptions.autocapture.elementInteractions;
  for (const origin of ['http://localhost:5173', 'https://example.com']) {
    for (const path of ['/app/settings/', '/app/billing/', '/app/admin/', '/app/admin/users/', '/welcome/']) {
      const url = origin + path;
      assert.equal(allow.some((r) => r.test(url)) && !deny.some((r) => r.test(url)), isMeasuredPath(path), url);
    }
  }
});
