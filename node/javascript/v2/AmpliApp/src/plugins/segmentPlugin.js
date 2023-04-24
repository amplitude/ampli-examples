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

  execute(context) {
    return new Promise(resolve => {
      const {
        event_type,
        event_properties,
        user_id,
        user_properties,
        groups,
        group_properties
      } = context;
      const callback = (err) => {
        resolve({ event: context, code: err ? 0 : 200, message: err ? err.message : '' });
      }

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
        case Types.SpecialEventType.GROUP_IDENTIFY:
          const groupValues = groups ? Object.values(groups) : [];
          if (groupValues.length === 0) {
            this.segment.identify({
              userId: user_id,
              traits: user_properties?.[Types.IdentifyOperation.SET],
            }, callback);
          } else {
            this.segment.group({
              userId: user_id,
              groupId: groupValues[0],
              traits: group_properties?.[Types.IdentifyOperation.SET],
            }, callback);
          }
          break;

        case 'page':
          // @ts-ignore
          const { name, category, ...properties } = event_properties;

          this.segment.page({
            userId: user_id,
            category,
            name,
            properties,
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

  async flush() {
    await this.segment.flush();
  }
}

module.exports.SegmentPlugin = SegmentPlugin;
