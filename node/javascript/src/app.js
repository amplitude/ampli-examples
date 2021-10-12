const dotenv = require('dotenv');
const { init: initAmplitudeNodeClient } = require('@amplitude/node');
const Ampli = require('./ampli');
const { EventWithOptionalProperties } = require('./ampli');
const { getSegmentMiddleware } = require('./middleware/segmentMiddleware');
const { stopMiddleware } = require('./middleware/stopMiddleware');

const userId = 'ampli-node-js-user-id';

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

/**
 * Flush all pending events
 */
ampli.flush().then(() => {
  console.log("Ampli event tracking complete!");
});
