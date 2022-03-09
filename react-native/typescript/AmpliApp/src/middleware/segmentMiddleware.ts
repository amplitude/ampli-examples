import {createClient, Config, JsonMap} from '@segment/analytics-react-native';
import {
  BaseEvent,
  IdentifyEvent,
  Middleware,
  SpecialEventType,
} from '@amplitude/react-native';

export type SegmentExtra = {
  segment?: {
    userId?: string;
  };
};

/**
 * getSegmentMiddleware
 *
 * Initializes Segment tracker and returns Segment Middleware
 */
export function getSegmentMiddleware(config: Config): Middleware {
  // Create Segment tracker
  const analytics = createClient(config);

  // Create Segment Middleware
  return (payload, next) => {
    const {event, extra} = payload;
    const segmentExtra = extra as SegmentExtra;
    const userId = segmentExtra?.segment?.userId;

    console.log(`segment: userId:${userId}`);
    switch (event.event_type) {
      case SpecialEventType.IDENTIFY:
        const identifyEvent = event as IdentifyEvent;
        console.log(
          `segment.identify(${userId}, ${JSON.stringify(
            identifyEvent.user_properties,
          )})`,
        );
        analytics.identify(
          userId,
          identifyEvent.user_properties.payload.$set as JsonMap,
        );
        break;

      default:
        const baseEvent = event as BaseEvent;
        console.log(
          `segment.track(${event.event_type}, ${JSON.stringify(
            baseEvent.event_properties,
          )})`,
        );
        if (userId) {
          analytics.identify(userId);
        }
        analytics.track(event.event_type, baseEvent.event_properties);
        break;
    }

    next(payload);
  };
}
