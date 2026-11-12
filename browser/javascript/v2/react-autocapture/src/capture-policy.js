const applicationUrl = /^https?:\/\/[^/]+\/app\//;
const adminUrl = /^https?:\/\/[^/]+\/app\/admin(?:\/|$)/;

export function isMeasuredPath(pathname) {
  return pathname.startsWith('/app/') && !/^\/app\/admin(?:\/|$)/.test(pathname);
}

export const analyticsOptions = {
  // Keep this tutorial's local policy authoritative for analytics autocapture.
  remoteConfig: { fetchRemoteConfig: false },
  autocapture: {
    attribution: false,
    sessions: false,
    formInteractions: false,
    fileDownloads: false,
    pageUrlEnrichment: false,
    frustrationInteractions: false,
    networkTracking: false,
    webVitals: false,
    performanceTracking: false,
    pageViews: {
      trackOn: () => isMeasuredPath(window.location.pathname),
      trackHistoryChanges: 'pathOnly',
    },
    elementInteractions: {
      cssSelectorAllowlist: ['[data-analytics-action]'],
      actionClickAllowlist: [],
      pageUrlAllowlist: [applicationUrl],
      pageUrlExcludelist: [adminUrl],
      dataAttributePrefix: 'data-amp-track-',
      viewportContentUpdated: { enabled: false },
    },
  },
};
