export const privateMarker = 'PRIVATE_FIXTURE_20261113';

export function rawFixture(pageUrl) {
  return {
    event_type: 'Support Search Completed',
    user_id: `${privateMarker}@example.test`,
    user_properties: { email: `${privateMarker}@example.test`, nested: { token: privateMarker } },
    groups: { company: privateMarker },
    event_properties: {
      category: 'billing', has_results: true,
      email: `${privateMarker}@example.test`,
      query: privateMarker, page_location: pageUrl,
      nested: { secret: privateMarker },
    },
  };
}
