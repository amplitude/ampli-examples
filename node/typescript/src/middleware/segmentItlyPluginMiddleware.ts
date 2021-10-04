import { Loggers} from '@itly/sdk';
import { SegmentPlugin } from '@itly/plugin-segment-node';
import { UserTrackExtra } from '../types';
import { BaseEvent, Middleware, SpecialEventType } from "@amplitude/types";

/**
 * FIXME: Page should be part of the tracking plan & Ampli SDK
 */
export interface PageProperties {
  name: string;
  category: 'Registration' | 'Help' | 'Purchase';
  myPageProp: boolean;
}

export class Page implements BaseEvent {
  event_type = 'Page';
  event_id_in_plan = 'page';
  event_version = '1.0.0';
  event_properties: PageProperties;

  constructor(event_properties: PageProperties) {
    this.event_properties = event_properties;
  }
}

/**
 * getSegmentItlyPluginMiddleware
 *
 * Segment middleware using the Iteratively Segment Plugin
 */
export function getSegmentItlyPluginMiddleware(writeKey: string): Middleware {
  // Create Segment plugin
  const segmentItlyPlugin = new SegmentPlugin(writeKey, {
    flushAt: 1
  });

  // Call load to initialize the plugin
  // FIXME: Should we update the SDK to make these params optional?
  segmentItlyPlugin.load({
    environment: 'production',
    logger: Loggers.Console
  });

  // Create Segment Middleware
  const segmentItlyPluginMiddleware: Middleware = (payload, next) => {
    const { event, extra } = payload;
    const userExtra = extra as UserTrackExtra;
    const anonymousId = userExtra?.segment?.anonymousId;
    const userId = event.user_id;

    switch (payload.event.event_type) {
      case SpecialEventType.IDENTIFY:
        segmentItlyPlugin.identify(userId, event.user_properties)
        break;

      case 'Page':
        // Send page events using the page() method
        const { name, category, ...pageProperties } = (event as Page).event_properties;
        segmentItlyPlugin.page(userId, category, name, pageProperties);
        break;

      default:
        // All other events can use standard track()
        segmentItlyPlugin.track(userId, {
          name: event.event_type,
          properties: event.event_properties,
        })
        break;
    }

    next(payload);
  };

  // Return middleware
  return segmentItlyPluginMiddleware;
}
