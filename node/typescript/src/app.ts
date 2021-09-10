import dotenv from 'dotenv';
import * as Ampli from './ampli';
import * as Amplitude from './ampli/amplitude-node';
import { EventWithOptionalProperties } from './ampli';

// Read Configuration
dotenv.config()
const { AMPLITUDE_API_KEY } = process.env;

/**
 * Get a default Ampli instance via getInstance()
 * This requires connecting your account via `ampli pull`
 * which will set you API key in the generated Ampli SDK
 */
// const ampli = Ampli.getInstance()

/** OR Provide a specific API key */
// const ampli = Ampli.getInstance(AMPLITUDE_API_KEY)

/**
 * OR Use an existing Amplitude NodeClient
 */
const client = Amplitude.init(AMPLITUDE_API_KEY, { logLevel: 3 });
const ampli = Ampli.getInstance(client);

/**
 * OR Make your own Ampli instance
 */
// const ampli = new Ampli.Ampli(client);
// Ampli.setInstance(ampli);

const userId = 'ampli-user-id';

/**
 * Identify the user
 */
ampli.identify(userId, undefined, {
  requiredNumber: 42,
}, {
  platform: process.platform,
});

/**
 * Track Events via strongly typed methods
 */
ampli.eventNoProperties(userId);
ampli.eventWithAllProperties(userId, {
  requiredNumber: 1.23,
  requiredArray: ["I'm", 'required'],
  requiredBoolean: false,
  requiredEnum: Ampli.RequiredEnum.Enum1,
  requiredInteger: 42,
  requiredString: 'Hi!',
})

/**
 * Track Events with strongly typed Event classes
 */
ampli.track(userId, new EventWithOptionalProperties({
  optionalBoolean: true,
}))

/**
 * Flush all pending events
 */
ampli.flush().then(() => {
  console.log("Ampli event tracking complete!");
});
