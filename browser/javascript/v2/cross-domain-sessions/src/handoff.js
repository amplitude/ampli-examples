export function productLink(target, approvedOrigin, identity, runId, now = Date.now()) {
  const url = new URL(target);
  if (url.origin !== approvedOrigin || !['http:', 'https:'].includes(url.protocol)) {
    throw new Error('The product destination must match its configured origin.');
  }
  url.searchParams.set('demoRunId', runId);
  if (identity?.deviceId && Number.isSafeInteger(identity.sessionId) && identity.sessionId > 0) {
    url.searchParams.set('ampDeviceId', identity.deviceId);
    url.searchParams.set('ampSessionId', String(identity.sessionId));
    url.searchParams.set('ampTimestamp', String(now + 60_000));
  }
  return url.toString();
}

export function cleanHandoffUrl(href) {
  const url = new URL(href);
  for (const key of ['ampDeviceId', 'ampSessionId', 'ampTimestamp', 'deviceId', 'demoRunId']) {
    url.searchParams.delete(key);
  }
  return url.pathname + url.search + url.hash;
}
