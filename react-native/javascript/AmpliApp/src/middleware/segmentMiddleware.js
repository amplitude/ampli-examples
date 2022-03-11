import {createClient} from '@segment/analytics-react-native';
import {IdentifyOperation, SpecialEventType} from '@amplitude/react-native';

/**
 * getSegmentMiddleware
 *
 * Initializes Segment tracker and returns Segment Middleware
 */
export function getSegmentMiddleware(config) {
  // Create Segment tracker
  const client = createClient(config);

  // Create Segment Middleware
  return {
    client,
    middleware: (payload, next) => {
      const {event} = payload;

      switch (event.eventType) {
        case SpecialEventType.IDENTIFY:
          console.log(
            `segment.identify(${JSON.stringify(event.userProperties)})`,
          );
          client.identify(
            undefined,
            event.userProperties[IdentifyOperation.SET],
          );
          break;

        case SpecialEventType.GROUP_IDENTIFY:
          const groupId = `${event.groupType}:${
            Array.isArray(event.groupName)
              ? event.groupName.join(',')
              : event.groupName
          }`;
          console.log(
            `segment.group(${groupId}, ${JSON.stringify(
              event.groupProperties,
            )})`,
          );
          client.group(groupId, event.groupProperties[IdentifyOperation.SET]);
          break;

        default:
          console.log(
            `segment.track(${event.eventType}, ${JSON.stringify(
              event.eventProperties,
            )})`,
          );
          client.track(event.eventType, event.eventProperties);
          break;
      }

      next(payload);
    },
  };
}
