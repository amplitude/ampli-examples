export const fields = ['display_name', 'email', 'team_size'];
const types = ['Form Started', 'Form Field Focused', 'Form Field Completed', 'Form Field Invalid', 'Form Submitted', 'Form Exited'];
const reasons = ['valid', 'required', 'name_length', 'email_format', 'team_choice'];

export function validation(field, value) {
  if (!fields.includes(field)) throw new Error('Unknown field.');
  if (typeof value !== 'string' || !value.trim()) return 'required';
  if (field === 'display_name' && (value.trim().length < 2 || value.length > 60)) return 'name_length';
  if (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'email_format';
  if (field === 'team_size' && !['1-10', '11-50', '51+'].includes(value)) return 'team_choice';
  return 'valid';
}

export function projectFormEvent(type, attemptId, metadata = {}) {
  if (!types.includes(type) || !/^[0-9a-f-]{36}$/i.test(attemptId)) return null;
  if (type.startsWith('Form Field') && !fields.includes(metadata.field)) return null;
  if (metadata.reason !== undefined && !reasons.includes(metadata.reason)) return null;
  if (metadata.phase !== undefined && !['blur', 'submit'].includes(metadata.phase)) return null;
  return {
    type,
    properties: { form_id: 'workspace_profile', attempt_id: attemptId,
      ...(fields.includes(metadata.field) ? { field_id: metadata.field } : {}),
      ...(reasons.includes(metadata.reason) ? { validation_reason: metadata.reason } : {}),
      ...(['blur', 'submit'].includes(metadata.phase) ? { validation_phase: metadata.phase } : {}),
    },
  };
}
