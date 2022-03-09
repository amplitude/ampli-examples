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

import {ampli} from './ampli';
import {EventWithOptionalProperties} from './ampli';
// import {getSegmentMiddleware} from './middleware/segmentMiddleware';
// import stopMiddleware from './middleware/stopMiddleware';
import loggingMiddleware from './middleware/loggingMiddleware';

const {
  AMPLITUDE_API_KEY = '',
  // SEGMENT_WRITE_KEY = '',
} = Config;

const userId = 'ampli-react-native-ts-user-id';

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
// const segmentMiddleware = getSegmentMiddleware({writeKey: SEGMENT_WRITE_KEY});
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
          onPress={() => ampli.identify(userId, {requiredNumber: 42})}
        />

        <Button
          title="Set Group"
          onPress={() =>
            ampli.setGroup('test group', 'react-native-typescript-ampli')
          }
        />

        <Button
          title="Group Identify"
          onPress={() =>
            ampli.groupIdentify('test group', 'react-native-typescript-ampli', {
              requiredBoolean: true,
            })
          }
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
          title="Event w/ Segment"
          onPress={() => {
            ampli.track(
              new EventWithOptionalProperties({
                optionalString: 'Event with segment middleware extras',
              }),
              undefined,
              {
                segment: {
                  userId,
                },
              },
            );
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
