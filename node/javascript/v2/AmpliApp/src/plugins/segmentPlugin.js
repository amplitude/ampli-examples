const Segment = require( 'analytics-node');
const { Types } = require('@amplitude/analytics-node');

class SegmentPlugin {
  constructor(writeKey) {
    this.name = 'segment';
    this.type = Types.PluginType.DESTINATION;
    // Create Segment tracker
    this.segment = new Segment(writeKey, {
      flushAt: 1
    });
  }

  async setup(config) {
  }

  async execute(context) {
    return new Promise(resolve => {
      const { event_type, event_properties, user_id, user_properties } = context;
      const callback = (err) => {
        resolve({ event: context, code: err ? 0 : 200, message: err ? err.message : '' });
      }

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
          this.segment.identify({
            userId: user_id,
            traits: user_properties,
          }, callback);
          break;

        default:
          this.segment.track({
            userId: user_id,
            event: event_type,
            properties: event_properties,
          }, callback);
          break;
      }
    });
  }
}

module.exports.SegmentPlugin = SegmentPlugin;
