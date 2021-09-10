import { Loggers } from '@itly/sdk';
import { SegmentPlugin } from '@itly/plugin-segment-node';
import { AmpliMethod, Event, Middleware } from '../ampli/amplitude-node';
import { UserTrackExtra } from '../types';

/**
 * FIXME: Page should be part of the tracking plan & Ampli SDK
 */
export interface PageProperties {
  name: string;
  category: 'Registration' | 'Help' | 'Purchase';
  myPageProp: boolean;
}

export class Page implements Event {
  name = 'Page';
  id = 'page';
  version = '1.0.0';
  properties: PageProperties;

  constructor(properties: PageProperties) {
    this.properties = properties;
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
    const { userId, event, extra } = payload;
    const userExtra = extra as UserTrackExtra;
    const anonymousId = userExtra?.segment?.anonymousId;

    switch (payload.method) {
      case AmpliMethod.Identify:
        segmentItlyPlugin.identify(userId, event.properties)
        break;

      case AmpliMethod.Track:
        switch (event.name) {
          case 'Page':
            // Send page events using the page() method
            const { name, category, ...pageProperties } = (event as Page).properties;
            segmentItlyPlugin.page(userId, category, name, pageProperties);
            break;

          default:
            // All other events can use standard track()
            segmentItlyPlugin.track(userId, event)
        }
        break;
    }
    next();
  };

  // Return middleware
  return segmentItlyPluginMiddleware;
}
