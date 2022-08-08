const { Types } = require('@amplitude/analytics-node');

/**
 * Logging Plugin
 *
 * Logs all the things
 */
class LoggingPlugin {
  constructor() {
    this.name = 'logging';
    this.type = Types.PluginType.BEFORE;
  }

  async setup(config) {
  }

  async execute(context) {
    const jsonEvent = JSON.stringify(context, undefined, 2);
    console.log(`[ampli] event=${jsonEvent}`);

    return context;
  }
}

module.exports.LoggingPlugin = LoggingPlugin;
