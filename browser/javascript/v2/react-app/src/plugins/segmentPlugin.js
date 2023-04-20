import { AnalyticsBrowser } from '@segment/analytics-next';
import { Types } from '@amplitude/analytics-browser';

export default class SegmentPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION;

  constructor(writeKey) {
    // Create Segment tracker
    this.segment = new AnalyticsBrowser();
    this.writeKey = writeKey;
  }

  async setup(config) {
    this.segment.load({
      writeKey: this.writeKey,
    });
  }

  execute(context) {
    return new Promise(resolve => {
      const {
        event_type,
        event_properties,
        user_id,
        user_properties,
        groups,
        group_properties,
      } = context;
      const callback = (ctx) => {
        resolve({ event: context, code: 200, message: '' });
      };

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
        case Types.SpecialEventType.GROUP_IDENTIFY:
          const groupValues = groups ? Object.values(groups) : [];
          if (groupValues.length === 0) {
            this.segment.identify(
              user_id,
              user_properties?.[Types.IdentifyOperation.SET],
              {},
              callback,
            );
          } else {
            this.segment.group(
              groupValues[0],
              group_properties?.[Types.IdentifyOperation.SET],
              {},
              callback,
            );
          }
          break;

        case 'page':
          // @ts-ignore
          const { name, category, ...properties } = event_properties;
          this.segment.page(category, name, properties, {}, callback);
          break;

        default:
          this.segment.track(event_type, event_properties, {}, callback);
          break;
      }
    });
  }
}
