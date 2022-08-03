import Segment from 'analytics-node';
import { Middleware, SpecialEventType } from '@amplitude/types';
import { UserTrackExtra } from '../types';

/**
 * getSegmentMiddleware
 *
 * Initializes Segment tracker and returns Segment Middleware
 */
export function getSegmentMiddleware(writeKey: string): Middleware {
  // Create Segment tracker
  const segment = new Segment(writeKey, {
    flushAt: 1
  });

  // Create Segment Middleware
  const segmentMiddleware: Middleware = (payload, next) => {
    const { event: { event_type, event_properties, user_id: userId, user_properties }, extra } = payload;
    const userExtra = extra as UserTrackExtra;
    const anonymousId = userExtra?.segment?.anonymousId;

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
