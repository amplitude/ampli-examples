import dotenv from 'dotenv';
import { init as initAmplitudeNodeClient } from '@amplitude/node'
import * as Ampli from './ampli';
import { Environment, EventWithOptionalProperties } from './ampli';
import { getSegmentMiddleware } from './middleware/segmentMiddleware';
import { getSegmentItlyPluginMiddleware, Page } from './middleware/segmentItlyPluginMiddleware';
import { stopMiddleware } from './middleware/stopMiddleware';
import { UserTrackExtra } from "./types";

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
/**
 * OR Specify a Ampli.Environment
 */
// const ampli = Ampli.getInstance(Environment.DEV);

/** OR Provide a specific API key */
// const ampli = Ampli.init(AMPLITUDE_API_KEY);

/**
 * OR Use an existing Amplitude NodeClient
 */
const client = initAmplitudeNodeClient(AMPLITUDE_API_KEY, { logLevel: 3 });
const ampli = Ampli.init(client);

/**
 * OR Make your own Ampli instance
 */
// const ampli = new Ampli.Ampli(client);
// Ampli.setInstance(ampli, 'myAmpli');

/**
 * You can add middleware for 3rd party destination support
 */
// const segmentMiddleware = getSegmentMiddleware(SEGMENT_WRITE_KEY);
// ampli.client.addEventMiddleware(segmentMiddleware);

/**
 * Legacy Itly Plugins can also be adapted to middleware
 */
// const segmentItlyPluginMiddleware = getSegmentItlyPluginMiddleware(SEGMENT_WRITE_KEY);
// ampli.client.addMiddleware(segmentItlyPluginMiddleware);

/**
 * Middleware can also modify the event stream
 * Adding stop middleware will prevent events from going to Amplitude
 */
// ampli.client.addEventMiddleware(stopMiddleware);

/**
 * Identify the user
 */
ampli.identify(userId, undefined,
  // Strongly typed user traits from your tracking plan
  { requiredNumber: 42 },
  // `options` allows setting additional Amplitude fields
  { platform: process.platform },
);

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
});

/**
 * Track Events with strongly typed Event classes
 */
ampli.track(userId, new EventWithOptionalProperties({
  optionalBoolean: true,
}));

ampli.eventWithOptionalProperties(undefined,
  {
    optionalBoolean: true,
  },
  // `options` allows setting additional Amplitude fields
  { device_id: '12345',  },
  // `extra` can be used to pass unstructured data to middleware
  { segment: { anonymousId: 'anon-id' } } as UserTrackExtra
)

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
