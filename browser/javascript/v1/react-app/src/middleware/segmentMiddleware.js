import { SpecialEventType } from '../ampli';

/**
 * @typedef SegmentOptions
 * @type object
 * @property {number} [flushAt]
 */

/**
 * @typedef SegmentExtra
 * @type object
 * @property {object} [segment]
 * @property {string} [segment.anonymousId]
 * @property {function} [segment.callback]
 */

/**
 * getSegmentMiddleware
 *
 * Initializes Segment tracker and returns Segment Middleware
 *
 * @param {string} writeKey
 *
 * @return {Middleware}
 */
export function getSegmentMiddleware(writeKey)  {
  /**
   * getSegmentMiddleware
   *
   * Initializes Segment tracker and returns Segment Middleware
   *
   * @param {string} writeKey
   * @param {SegmentOptions} options
   *
   * @return {Segment}
   */
  function loadSegment(writeKey, options) {
    // Segment (https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/quickstart/)
    // @ts-ignore
    // eslint-disable-next-line
    !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="YOUR_WRITE_KEY";analytics.SNIPPET_VERSION="4.13.2";
      analytics.load(writeKey, options);
    }}();
    console.log('loaded segment', writeKey);

    // @ts-ignore
    return window.analytics;
  }

  // Create Segment tracker
  const analytics = loadSegment(writeKey, {
    flushAt: 1
  });

  // Create Segment Middleware
  /** @type {Middleware} */
  const segmentMiddleware = (payload, next) => {
    const { event, extra } = payload;
    /** @type {SegmentExtra} */
    const segmentExtra = extra;
    const anonymousId = segmentExtra?.segment?.anonymousId;
    const segmentCallback = segmentExtra?.segment?.callback;

    console.log(`segment: anonymousId:${anonymousId} callback:${segmentCallback}`);
    switch (event.event_type) {
      case SpecialEventType.Identify:
        const { user_id } = event;
        console.log(`segment.identify(${user_id}, ${JSON.stringify(event.event_properties)})`);
        analytics.identify(user_id, event.event_properties, { anonymousId }, segmentCallback)
        break;

      default:
        console.log(`segment.track(${event.event_type}, ${JSON.stringify(event.event_properties)})`);
        analytics.track(event.event_type, event.event_properties, { anonymousId }, segmentCallback);
        break;
    }

    next(payload);
  };

  // Return middleware
  return segmentMiddleware;
}
