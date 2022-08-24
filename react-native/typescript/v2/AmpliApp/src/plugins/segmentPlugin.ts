import {createClient, JsonMap} from '@segment/analytics-react-native';
import {Types} from '@amplitude/analytics-react-native';

export default class SegmentPlugin implements Types.DestinationPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION as any;
  private segment: ReturnType<typeof createClient>;

  constructor(writeKey: string) {
    // Create Segment tracker
    this.segment = createClient({
      writeKey,
      flushAt: 1,
    });
  }

  async setup(_config: Types.Config): Promise<undefined> {
    return undefined;
  }

  execute(context: Types.Event): Promise<Types.Result> {
    return new Promise<Types.Result>(resolve => {
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
          this.segment.track(event_type, event_properties as JsonMap);
          break;
      }

      resolve({event: context, code: 0, message: ''});
    });
  }
}
