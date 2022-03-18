import { ampli, DefaultOptions } from "./ampli";
import loggingMiddleware from "./middleware/loggingMiddleware";
import { init as initNodeClient } from '@amplitude/node';
import { LogLevel } from '@amplitude/types';

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;

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

/**
 * OR Use an existing Amplitude instance
 * requires "import { init as initNodeClient } from '@amplitude/node';"
 */
// const instance = initNodeClient(AMPLITUDE_API_KEY!, { ...DefaultOptions, logLevel: LogLevel.Verbose });
// ampli.load({ client: { instance } });

/**
 * OR Specify AmplitudeClient 'config'
 */
ampli.load({
    client: {
        apiKey: AMPLITUDE_API_KEY,
    }
})

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
 * Middleware can also modify the event stream
 * Adding stop middleware will prevent events from going to Amplitude
 */
// ampli.client.addEventMiddleware(stopMiddleware);
