/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';

import * as amplitude from '@amplitude/analytics-react-native';
import {ampli} from './ampli';
import {EventWithOptionalProperties} from './ampli';
import LoggingPlugin from './plugins/loggingPlugin';
import SegmentPlugin from './plugins/segmentPlugin';

const {AMPLITUDE_API_KEY = '', SEGMENT_WRITE_KEY = ''} = Config;

const userId = 'ampli-v2-react-native-js-user-id';

async function initAmpli() {
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
  // ampli.load({environment: 'development'});

  /** OR Provide a specific Amplitude API key */
  // ampli.load({client: {apiKey: AMPLITUDE_API_KEY}});

  /**
   * OR Use an existing Amplitude instance
   */
  // const amplitudeClient = createInstance();
  // ampli.load({client: {instance: amplitudeClient}});

  /**
   * OR Specify AmplitudeNode 'options'
   */
  await ampli.load({
    client: {
      apiKey: AMPLITUDE_API_KEY,
      configuration: {logLevel: amplitude.Types.LogLevel.Verbose},
    },
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

initAmpli();

function App() {
  return (
    <View>
      <View style={styles.appHeader}>
        <Button
          title="Identify"
          onPress={() => {
            ampli.identify(userId, {requiredNumber: 42});
          }}
        />

        <Button
          title="Set Group"
          onPress={() =>
            ampli.client.setGroup('test group', 'react-native-javascript-ampli')
          }
        />

        <Button
          title="Group Identify"
          onPress={() => {
            const amplitudeIdentify = new amplitude.Identify();
            amplitudeIdentify.set('requiredBoolean', true);
            ampli.client.groupIdentify(
              'test group',
              'react-native-javascript-ampli',
              amplitudeIdentify,
            );
          }}
        />

        <Button
          title="Event w/ Optional Properties"
          onPress={() =>
            ampli.track(
              new EventWithOptionalProperties({optionalBoolean: true}),
            )
          }
        />

        <Button
          title="Event w/ All Properties"
          onPress={() => {
            ampli.eventWithAllProperties({
              requiredNumber: 1.23,
              requiredArray: ["I'm", 'required'],
              requiredBoolean: false,
              requiredEnum: 'Enum1',
              requiredInteger: 42,
              requiredString: 'Hi!',
            });
          }}
        />

        <Button
          title="Other Events"
          onPress={() => {
            ampli.eventNoProperties();

            ampli.eventWithConstTypes();

            ampli.eventWithOptionalProperties({
              optionalBoolean: true,
            });

            ampli.eventMaxIntForTest({
              intMax10: 5,
            });

            ampli.eventObjectTypes({
              requiredObject: {'key-1': 'value-1'},
              requiredObjectArray: [{'key-1': 'value-1'}, {'key-2': 'value-2'}],
            });

            ampli.eventWithArrayTypes({
              requiredBooleanArray: [true, false],
              requiredEnumArray: ['enum1'],
              requiredNumberArray: [1.2, 3, 4.56],
              requiredObjectArray: [{'key-1': 'value-1'}, {'key-2': 'value-2'}],
              requiredStringArray: ['string-1', 'string-2', 'string-3'],
            });

            ampli.eventWithEnumTypes({
              'required enum': 'required enum 2',
            });

            ampli.eventWithOptionalArrayTypes({
              optionalBooleanArray: [true, false],
            });

            ampli.eventWithTemplateProperties({
              required_event_property: 'event property',
              required_template_property: 'template property',
              optional_template_property: 1.23,
            });

            ampli.eventWithDifferentCasingTypes({
              'enum with space': 'enum with space',
              enum_snake_case: 'enum_snake_case',
              enumCamelCase: 'enumCamelCase',
              EnumPascalCase: 'EnumPascalCase',
              'property with space': 'property with space',
              property_with_snake_case: 'property with snake case',
              propertyWithCamelCase: 'property with camel case',
              PropertyWithPascalCase: 'property with pascal case',
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appHeader: {
    backgroundColor: '#282c34',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white',
  },
});

export default App;
