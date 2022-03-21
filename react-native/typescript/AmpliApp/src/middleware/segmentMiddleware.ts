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
export function getSegmentMiddleware(config: Config): {
  client: ReturnType<typeof createClient>;
  middleware: Middleware;
} {
  // Create Segment tracker
  const client = createClient(config);

  // Create Segment Middleware
  return {
    client,
    middleware: (payload, next) => {
      const {event} = payload;

      switch (event.eventType) {
        case SpecialEventType.IDENTIFY:
          const identifyEvent = event as IdentifyEvent;

          console.log(
            `segment.identify(${JSON.stringify(identifyEvent.userProperties)})`,
          );
          client.identify(
            undefined,
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
          client.group(
            groupId,
            groupIdentifyEvent.groupProperties[
              IdentifyOperation.SET
            ] as JsonMap,
          );
          break;

        default:
          const baseEvent = event as BaseEvent;
          console.log(
            `segment.track(${event.eventType}, ${JSON.stringify(
              baseEvent.eventProperties,
            )})`,
          );
          client.track(event.eventType, baseEvent.eventProperties);
          break;
      }

      next(payload);
    },
  };
}
