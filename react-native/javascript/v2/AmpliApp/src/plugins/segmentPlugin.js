import {createClient} from '@segment/analytics-react-native';
import {Types} from '@amplitude/analytics-react-native';

export default class SegmentPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION;

  constructor(writeKey) {
    // Create Segment tracker
    this.segment = createClient({
      writeKey,
      flushAt: 1,
    });
  }

  async setup(config) {
    return undefined;
  }

  async execute(context) {
    return new Promise(resolve => {
      const {event_type, event_properties, user_id, user_properties} = context;

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
          this.segment.identify(
            user_id,
            user_properties?.[Types.IdentifyOperation.SET],
          );
          break;

        case Types.SpecialEventType.GROUP_IDENTIFY:
          // not implemented
          break;

        default:
          this.segment.track(event_type, event_properties);
          break;
      }

      resolve({event: context, code: 0, message: ''});
    });
  }
}
