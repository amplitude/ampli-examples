import dotenv from 'dotenv';
import * as Ampli from './ampli';
import * as Amplitude from './ampli/amplitude-node';
import { EventWithOptionalProperties } from './ampli';
import { getSegmentMiddleware } from './middleware/segmentMiddleware';
import { getSegmentItlyPluginMiddleware, Page } from './middleware/segmentItlyPluginMiddleware';
import { stopMiddleware } from './middleware/stopMiddleware';

const userId = 'ampli-user-id';

// Read Configuration
dotenv.config()
const { AMPLITUDE_API_KEY, SEGMENT_WRITE_KEY } = process.env;

/**
 * Get a default Ampli instance via getInstance()
 * This requires connecting your account via `ampli pull`
 * which will set you API key in the generated Ampli SDK
 */
// const ampli = Ampli.getInstance()

/** OR Provide a specific API key */
// const ampli = Ampli.getInstance(AMPLITUDE_API_KEY)

/**
 * OR Use an existing Amplitude NodeClient
 */
const client = Amplitude.init(AMPLITUDE_API_KEY, { logLevel: 3 });
const ampli = Ampli.getInstance(client);

/**
 * OR Make your own Ampli instance
 */
// const ampli = new Ampli.Ampli(client);
// Ampli.setInstance(ampli);

/**
 * You can add middleware for 3rd party destination support
 */
// const segmentMiddleware = getSegmentMiddleware(SEGMENT_WRITE_KEY);
// ampli.client.addMiddleware(segmentMiddleware);

/**
 * Legacy Itly Plugins can also be adapted to middleware
 */
// const segmentItlyPluginMiddleware = getSegmentItlyPluginMiddleware(SEGMENT_WRITE_KEY);
// ampli.client.addMiddleware(segmentItlyPluginMiddleware);

/**
 * Middleware can also modify the event stream
 * Adding stop middleware will prevent events from going to Amplitude
 */
// ampli.client.addMiddleware(stopMiddleware);

/**
 * Identify the user
 */
ampli.identify(userId, undefined, {
  requiredNumber: 42,
}, {
  platform: process.platform,
});

/**
 * Track Events via strongly typed methods
 */
ampli.eventNoProperties(userId);
ampli.eventWithAllProperties(userId, {
  requiredNumber: 1.23,
  requiredArray: ["I'm", 'required'],
  requiredBoolean: false,
  requiredEnum: Ampli.RequiredEnum.Enum1,
  requiredInteger: 42,
  requiredString: 'Hi!',
})

/**
 * Track Events with strongly typed Event classes
 */
ampli.track(userId, new EventWithOptionalProperties({
  optionalBoolean: true,
}))

/**
 * Example Page Event
 * See segmentItlyPluginMiddleware.ts
 */
ampli.track(userId, new Page({
  name: 'Sign up',
  category: 'Registration',
  myPageProp: true,
}));

/**
 * Flush all pending events
 */
ampli.flush().then(() => {
  console.log("Ampli event tracking complete!");
});
