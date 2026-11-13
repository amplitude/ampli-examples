const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const demoUser = /^build-redaction-[0-9a-f-]{36}$/i;

export function projectAllowedEvent(event) {
  try {
    if (event?.event_type !== 'Support Search Completed' || !uuid.test(event.device_id ?? '')) return null;
    const input = event.event_properties ?? {};
    if (!['billing', 'setup', 'other'].includes(input.category)
      || typeof input.has_results !== 'boolean') return null;
    // Construct a new event: unlisted top-level and nested fields are omitted.
    return {
      event_type: 'Support Search Completed',
      device_id: event.device_id,
      ...(demoUser.test(event.user_id ?? '') ? { user_id: event.user_id } : {}),
      ...(Number.isFinite(event.time) ? { time: event.time } : {}),
      ...(Number.isFinite(event.session_id) ? { session_id: event.session_id } : {}),
      ...(Number.isSafeInteger(event.event_id) ? { event_id: event.event_id } : {}),
      ...(uuid.test(event.insert_id ?? '') ? { insert_id: event.insert_id } : {}),
      event_properties: { category: input.category, has_results: input.has_results },
    };
  } catch {
    return null;
  }
}

export function redactionPlugin() {
  return {
    name: 'build-redaction-policy', type: 'enrichment',
    execute: async (event) => projectAllowedEvent(event),
  };
}
