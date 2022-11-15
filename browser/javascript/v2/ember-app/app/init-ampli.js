import { ampli, DefaultConfiguration } from './ampli';
import config from 'ember-app/config/environment';

export default function initAmpli() {
  const { AMPLITUDE_API_KEY = '' } = config;

  if (!AMPLITUDE_API_KEY) {
    return;
  }

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
   * requires "import amplitude from '@amplitude/analytics-browser';"
   */
  // amplitude.init(AMPLITUDE_API_KEY, undefined, {
  //   ...DefaultConfiguration,
  //   logLevel: 3,
  // });
  // ampli.load({ client: { instance: amplitude } });

  /**
   * OR Specify AmplitudeClient 'options'
   */
  ampli.load({
    client: {
      apiKey: AMPLITUDE_API_KEY,
      configuration: { ...DefaultConfiguration, logLevel: 3 },
    },
  });

  /**
   * For testing you can disable ampli
   */
  // ampli.load({
  //   disabled: false,
  // });

  /**
   * Make as many Ampli instances as you want
   */
  // const ampli2 = new Ampli();
  // ampli2.load({ client: { apiKey: 'api-key-2' } });
}
