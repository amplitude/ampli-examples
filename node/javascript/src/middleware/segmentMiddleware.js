const Segment = require( 'analytics-node');
const { SpecialEventType } = require('@amplitude/types');

/**
 * getSegmentMiddleware
 *
 * Initializes Segment tracker and returns Segment Middleware
 *
 * @param {string} writeKey
 *
 * @return {Middleware}
 */
function getSegmentMiddleware(writeKey) {
  // Create Segment tracker
  const segment = new Segment(writeKey, {
    flushAt: 1
  });

  // Create Segment Middleware
  const segmentMiddleware = (payload, next) => {
    const { event: { event_type, event_properties, user_id: userId, user_properties }, extra } = payload;
    const anonymousId = extra?.segment?.anonymousId;

    switch (event_type) {
      case SpecialEventType.IDENTIFY:
        segment.identify({
          userId,
          anonymousId,
          traits: user_properties,
        })
        break;

      default:
        segment.track({
          userId,
          anonymousId,
          event: event_type,
          properties: event_properties,
        })
        break;
    }

    next(payload);
  };

  // Return middleware
  return segmentMiddleware;
}

module.exports.getSegmentMiddleware = getSegmentMiddleware;