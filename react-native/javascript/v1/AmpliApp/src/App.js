/* eslint-disable no-unused-vars */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Button, StyleSheet, View} from 'react-native';
import Config from 'react-native-config';
import * as amplitude from '@amplitude/react-native';

import {ampli} from './ampli';
import {EventWithOptionalProperties} from './ampli';
import {getSegmentMiddleware} from './middleware/segmentMiddleware';
import stopMiddleware from './middleware/stopMiddleware';
import loggingMiddleware from './middleware/loggingMiddleware';

const {AMPLITUDE_API_KEY = '', SEGMENT_WRITE_KEY = ''} = Config;

const userId = 'ampli-react-native-js-user-id';

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
 * requires "import {Amplitude} from '@amplitude/react-native';"
 */
// const instance = Amplitude.getInstance();
// instance.init(AMPLITUDE_API_KEY).then(() => {
//   ampli.load({client: {instance}});
// });

/**
 * OR Specify AmplitudeClient 'config'
 */
ampli.load({
  client: {
    apiKey: AMPLITUDE_API_KEY,
  },
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
// ampli2.load({client: {apiKey: 'api-key-2'}});

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
// const {client: segmentClient, middleware: segmentMiddleware} =
//   getSegmentMiddleware({writeKey: SEGMENT_WRITE_KEY});
// ampli.client.addEventMiddleware(segmentMiddleware);

/**
 * Middleware can also modify the event stream
 * Adding stop middleware will prevent events from going to Amplitude
 */
// ampli.client.addEventMiddleware(stopMiddleware);

function App() {
  return (
    <View>
      <View style={styles.appHeader}>
        <Button
          title="Identify"
          onPress={() => {
            // segmentClient.identify(userId);
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
            ampli.eventWithAllProperties(
              {
                requiredNumber: 1.23,
                requiredArray: ["I'm", 'required'],
                requiredBoolean: false,
                requiredEnum: 'Enum1',
                requiredInteger: 42,
                requiredString: 'Hi!',
              },
              undefined,
              {'extra-key': 'extra-value'},
            );
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
