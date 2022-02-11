/* eslint-disable no-unused-vars */
const dotenv = require('dotenv');
const { init: initAmplitudeNodeClient } = require('@amplitude/node');
const { ampli } = require('./ampli');
const { EventWithOptionalProperties } = require('./ampli');
const { getSegmentMiddleware, loggingMiddleware, stopMiddleware } = require('./middleware');

const userId = 'ampli-node-js-user-id';

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
 * OR Specify an environment
 */
// ampli.load({ environment: 'development' })

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
    options: { logLevel: 3 },
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
ampli.identify(userId,
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
  requiredEnum: 'Enum1',
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
  { segment: { anonymousId: 'anon-id' } }
)

ampli.setGroup(userId, 'test group', 'node-js-ampli')

ampli.groupIdentify('test group', 'node-js-ampli', { requiredBoolean: true });

/**
 * Flush all pending events
 */
ampli.flush().promise.then(() => {
  console.log("Ampli event tracking complete!");
});
