const dotenv = require('dotenv');
const { Types } = require('@amplitude/analytics-node');
const amplitude = require('@amplitude/analytics-node');
const { Ampli, ampli, EventWithOptionalProperties } = require('./ampli');
const { LoggingPlugin } = require('./plugins/loggingPlugin');
const { SegmentPlugin } = require('./plugins/segmentPlugin');

const userId = 'ampli-v2-node-js-user-id';

// Read Configuration
dotenv.config()
const { AMPLITUDE_API_KEY, SEGMENT_WRITE_KEY } = process.env;

async function initAmpli()
{
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
// ampli.load({ environment: 'development' });

  /** OR Provide a specific Amplitude API key */
// ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });

  /**
   * OR Use an existing Amplitude instance
   */
// const amplitudeNodeClient = createAmplitudeNode();
// ampli.load({ client: { instance: amplitudeNodeClient } });

  /**
   * OR Specify AmplitudeNode 'options'
   */
  await ampli.load({
    client: {
      apiKey: AMPLITUDE_API_KEY,
      configuration: { logLevel: Types.LogLevel.Verbose },
    }
  }).promise;

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
   * Plugins can be used for many things including
   * logging, event modification and more.
   */

  /**
   * Logging
   */
  ampli.client.add(new LoggingPlugin());

  /**
   * 3rd party destination support
   */
  // const segmentPlugin = new SegmentPlugin(SEGMENT_WRITE_KEY);
  // ampli.client.add(segmentPlugin);
}

async function sendEvents() {
  /**
   * Identify the user
   */
  ampli.identify(userId,
      // Strongly typed user traits from your tracking plan
      { requiredNumber: 42 },
      // `options` allows setting additional Amplitude fields
      { platform: process.platform },
  );

  ampli.client.setGroup('test group', 'node-js-ampli', { user_id: userId });

  /**
   * Track Events via strongly typed methods
   */
  ampli.eventNoProperties(userId);
  ampli.eventWithAllProperties(userId, {
    requiredNumber: 1.23,
    requiredArray: ["I'm", 'required'],
    requiredBoolean: false,
    requiredEnum: "Enum1",
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
      { device_id: '12345', },
  )

  ampli.eventMaxIntForTest(userId, {
    intMax10: 5,
  });

  ampli.eventWithConstTypes(userId);

  ampli.eventObjectTypes(userId, {
    requiredObject: { 'key-1': 'value-1' },
    requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
  });

  ampli.eventWithArrayTypes(userId, {
    requiredBooleanArray: [true, false],
    requiredNumberArray: [1.2, 3, 4.56],
    requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
    requiredStringArray: ['string-1', 'string-2', 'string-3'],
  });

  ampli.eventWithEnumTypes(userId, {
    'required enum': 'required enum 2',
  });

  ampli.eventWithOptionalArrayTypes(userId, {
    optionalBooleanArray: [true, false],
  });

  ampli.eventWithTemplateProperties(userId, {
    required_event_property: 'event property',
    required_template_property: 'template property',
    optional_template_property: 1.23,
  });

  ampli.eventWithDifferentCasingTypes(userId, {
    'enum with space': 'enum with space',
    enum_snake_case: 'enum_snake_case',
    enumCamelCase: 'enumCamelCase',
    EnumPascalCase: 'EnumPascalCase',
    'property with space': 'property with space',
    property_with_snake_case: 'property with snake case',
    propertyWithCamelCase: 'property with camel case',
    PropertyWithPascalCase: 'property with pascal case'
  });

  const amplitudeIdentify = new amplitude.Identify();
  amplitudeIdentify.set('requiredBoolean', true);
  ampli.client.groupIdentify('test group', 'node-js-ampli-v2', amplitudeIdentify);

  /**
   * Flush all pending events
   *
   * Wait for returned promise to complete
   */
  await ampli.flush().promise;
}

initAmpli().then(
    () => sendEvents()
);
