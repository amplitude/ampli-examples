import dotenv from 'dotenv';
import { LogLevel } from "@amplitude/types";
import { Ampli, ampli, Environment, EventWithOptionalProperties, RequiredEnum } from './ampli';
import { Page } from './middleware/segmentItlyPluginMiddleware';
import { UserTrackExtra } from "./types";
import { Service1 } from "./services/service-1";
import { getUserIdMiddleware } from "./middleware/userIdMiddleware";
import loggingMiddleware from "../../../browser/typescript/react-app/src/middleware/loggingMiddleware";

export const userId = 'ampli-node-ts-user-id';

// Read Configuration
dotenv.config()
const { AMPLITUDE_API_KEY, SEGMENT_WRITE_KEY } = process.env;

/**
 * Start by calling ampli.load()
 *
 * 'ampli' is the default instance of Ampli()
 */

/**
 * When you pull your tracking plan you can use the defaults and call load() without arguments
 *
 * This requires connecting your account via `ampli pull`
 * which will set you API key in the generated Ampli SDK
 */
// ampli.load();

/**
 * OR Specify a Ampli.Environment
 */
// ampli.load({ environment: Environment.development})

/** OR Provide a specific Amplitude API key */
// ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } })

/**
 * OR Use an existing Amplitude NodeClient
 */
// const amplitudeNodeClient = init(AMPLITUDE_API_KEY, { logLevel: 3 });
// ampli.load({ client: { instance: amplitudeNodeClient } });

/**
 * OR Specify NodeClient 'options'
 */
ampli.load({
  client: {
    apiKey: AMPLITUDE_API_KEY,
    options: { logLevel: LogLevel.Verbose },
  }
});

/**
 * For testing you can disable ampli
 */
// ampli.load({
//   disabled: process.env.IS_TESTING ? true : false,
// });

/**
 * Make as many Ampli instances as you want
 */
// const ampli2 = new Ampli();
// ampli2.load({ client: { apiKey: 'api-key-2' } });

/**
 * Middleware can be used for many things including
 * logging, filtering, event modification and more.
 */

/**
 * Logging
 */
ampli.client.addEventMiddleware(loggingMiddleware);

/**
 * 3rd party destination support
 */
// const segmentMiddleware = getSegmentMiddleware(SEGMENT_WRITE_KEY);
// ampli.client.addEventMiddleware(segmentMiddleware);

/**
 * Centralize user id logic
 */
// ampli.client.addEventMiddleware(getUserIdMiddleware(
//   () => 'ampli-user-id-from-resolver',
//   () => 'ampli-device-id-from-resolver'
// ));

/**
 * Use Legacy Itly Plugins by adapting them to middleware
 */
// const segmentItlyPluginMiddleware = getSegmentItlyPluginMiddleware(SEGMENT_WRITE_KEY);
// ampli.client.addEventMiddleware(segmentItlyPluginMiddleware);

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

ampli.setGroup('test-group', 'a-group-value', { user_id: userId });

/**
 * Track Events via strongly typed methods
 */
ampli.eventNoProperties(userId);
ampli.eventWithAllProperties(userId, {
  requiredNumber: 1.23,
  requiredArray: ["I'm", 'required'],
  requiredBoolean: false,
  requiredEnum: RequiredEnum.Enum1,
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

// NOTICE: This will show a warning in the console about missing 'user_id' unless you add UserIdMiddleware
ampli.eventMaxIntForTest(undefined, {
  intMax10: 5,
});

/**
 * Example Page Event
 * See segmentItlyPluginMiddleware.ts
 */
ampli.track(userId, new Page({
  name: 'Sign up',
  category: 'Registration',
  myPageProp: true,
}));

const myService = new Service1();
myService.doAction1();
myService.doAction2().then(() => {
  console.log('Action 2 complete!');
});

/**
 * Flush all pending events
 *
 * Wait for returned promise to complete
 */
ampli.flush().promise.then(() => {
  console.log("Ampli event tracking complete!");
});
