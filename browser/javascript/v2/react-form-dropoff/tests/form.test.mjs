import test from 'node:test';
import assert from 'node:assert/strict';
import { projectFormEvent, validation } from '../src/form-events.js';
const attempt = '11111111-2222-4333-8444-555555555555';
const marker = 'PRIVATE_FORM_FIXTURE_20261113';

test('validation produces only fixed reasons for missing, malformed and complete fields', () => {
  assert.equal(validation('email', marker), 'email_format');
  assert.equal(validation('email', `${marker}@example.test`), 'valid');
  assert.equal(validation('display_name', ''), 'required');
  assert.equal(validation('display_name', marker), 'valid');
  assert.equal(validation('team_size', marker), 'team_choice');
  assert.equal(validation('team_size', '1-10'), 'valid');
});
test('projection does not copy raw or nested values into any event', () => {
  const result = projectFormEvent('Form Field Invalid', attempt, { field: 'email', reason: 'email_format', phase: 'blur', value: marker, nested: { text: marker } });
  assert.equal(result.properties.field_id, 'email');
  assert.equal(result.properties.validation_reason, 'email_format');
  assert.ok(!JSON.stringify(result).includes(marker));
  assert.equal(projectFormEvent('Form Submitted', marker), null);
  assert.equal(projectFormEvent('Form Field Focused', attempt, { field: marker }), null);
});
