import { Types } from "@amplitude/analytics-node";

/**
 * Logging Plugin
 *
 * Logs all the things
 */
export default class LoggingPlugin implements Types.BeforePlugin {
    name = 'logging';
    type = Types.PluginType.BEFORE as any;

    async setup(config: Types.Config): Promise<undefined> {
        return undefined;
    }

    async execute(context: Types.Event): Promise<Types.Event> {
        const jsonEvent = JSON.stringify(context, undefined, 2);
        console.log(`[ampli] event=${jsonEvent}`);

        return context;
    }
}
