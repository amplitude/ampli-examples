import {createClient, Config, JsonMap} from '@segment/analytics-react-native';
import {
  BaseEvent,
  GroupIdentifyEvent,
  IdentifyEvent,
  Middleware,
  SpecialEventType,
} from '@amplitude/react-native';

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
    const {event} = payload;

    switch (event.event_type) {
      case SpecialEventType.IDENTIFY:
        const identifyEvent = event as IdentifyEvent;
        const userId = event.user_id;

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

      case SpecialEventType.GROUP_IDENTIFY:
        const groupIdentifyEvent = event as GroupIdentifyEvent;
        const groupId = `${groupIdentifyEvent.group_type}:${
          Array.isArray(groupIdentifyEvent.group_name)
            ? groupIdentifyEvent.group_name.join(',')
            : groupIdentifyEvent.group_name
        }`;
        console.log(
          `segment.group(${groupId}, ${JSON.stringify(
            groupIdentifyEvent.group_properties,
          )})`,
        );
        analytics.group(
          groupId,
          groupIdentifyEvent.group_properties.payload.$set as JsonMap,
        );
        break;

      default:
        const baseEvent = event as BaseEvent;
        console.log(
          `segment.track(${event.event_type}, ${JSON.stringify(
            baseEvent.event_properties,
          )})`,
        );
        analytics.track(event.event_type, baseEvent.event_properties);
        break;
    }

    next(payload);
  };
}
