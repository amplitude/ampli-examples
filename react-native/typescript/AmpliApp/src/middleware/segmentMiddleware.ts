import {createClient, Config, JsonMap} from '@segment/analytics-react-native';
import {
  BaseEvent,
  GroupIdentifyEvent,
  IdentifyEvent,
  IdentifyOperation,
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

    switch (event.eventType) {
      case SpecialEventType.IDENTIFY:
        const identifyEvent = event as IdentifyEvent;
        const userId = event.userId;

        console.log(
          `segment.identify(${userId}, ${JSON.stringify(
            identifyEvent.userProperties,
          )})`,
        );
        analytics.identify(
          userId,
          identifyEvent.userProperties[IdentifyOperation.SET] as JsonMap,
        );
        break;

      case SpecialEventType.GROUP_IDENTIFY:
        const groupIdentifyEvent = event as GroupIdentifyEvent;
        const groupId = `${groupIdentifyEvent.groupType}:${
          Array.isArray(groupIdentifyEvent.groupName)
            ? groupIdentifyEvent.groupName.join(',')
            : groupIdentifyEvent.groupName
        }`;
        console.log(
          `segment.group(${groupId}, ${JSON.stringify(
            groupIdentifyEvent.groupProperties,
          )})`,
        );
        analytics.group(
          groupId,
          groupIdentifyEvent.groupProperties[IdentifyOperation.SET] as JsonMap,
        );
        break;

      default:
        const baseEvent = event as BaseEvent;
        console.log(
          `segment.track(${event.eventType}, ${JSON.stringify(
            baseEvent.eventProperties,
          )})`,
        );
        analytics.track(event.eventType, baseEvent.eventProperties);
        break;
    }

    next(payload);
  };
}
