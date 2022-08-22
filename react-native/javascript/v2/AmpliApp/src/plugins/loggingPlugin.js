import {Types} from '@amplitude/analytics-react-native';

/**
 * Logging Plugin
 *
 * Logs all the things
 */
export default class LoggingPlugin {
  name = 'logging';
  type = Types.PluginType.BEFORE;

  async setup(config) {
    return undefined;
  }

  async execute(context) {
    const jsonEvent = JSON.stringify(context, undefined, 2);
    console.log(`[ampli] event=${jsonEvent}`);

    return context;
  }
}
