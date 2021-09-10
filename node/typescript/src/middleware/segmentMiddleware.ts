import Segment from 'analytics-node';
import { AmpliMethod, Middleware } from '../ampli/amplitude-node';
import { UserTrackExtra } from '../types';

/**
 * getSegmentMiddleware
 *
 * Initializes Segment tracker and returns Segment Middleware
 */
export function getSegmentMiddleware(): Middleware {
  // Create Segment tracker
  const segment = new Segment(process.env.SEGMENT_WRITE_KEY, {
    flushAt: 1
  });

  // Create Segment Middleware
  const segmentMiddleware: Middleware = (payload, next) => {
    const { userId, event: { name, properties }, extra } = payload;
    const userExtra = extra as UserTrackExtra;
    const anonymousId = userExtra?.segment?.anonymousId;

    switch (payload.method) {
      case AmpliMethod.Identify:
        segment.identify({
          userId,
          anonymousId,
          traits: properties,
        })
        break;

      case AmpliMethod.Track:
        segment.track({
          userId,
          anonymousId,
          event: name,
          properties,
        })
        break;
    }
    next();
  };

  // Return middleware
  return segmentMiddleware;
}
