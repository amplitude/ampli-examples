import Segment from 'analytics-node';
import { Types } from '@amplitude/analytics-node';

export default class SegmentPlugin implements Types.DestinationPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION as any;
  segment: Segment;

  constructor(writeKey: string) {
    // Create Segment tracker
    this.segment = new Segment(writeKey, {
      flushAt: 1
    });
  }

  async setup(config: Types.Config): Promise<undefined> {
    return undefined;
  }

  execute(context: Types.Event): Promise<Types.Result> {
    return new Promise<Types.Result>(resolve => {
      const {
        event_type,
        event_properties,
        user_id,
        user_properties,
        groups,
        group_properties
      } = context;
      const callback = (err: Error) => {
        resolve({ event: context, code: err ? 0 : 200, message: err ? err.message : '' });
      }

      switch (event_type) {
        case Types.SpecialEventType.IDENTIFY:
        case Types.SpecialEventType.GROUP_IDENTIFY:
          const groupValues = groups ? Object.values(groups) : [];
          if (groupValues.length === 0) {
            this.segment.identify({
              userId: user_id!,
              traits: user_properties?.[Types.IdentifyOperation.SET],
            }, callback);
          } else {
            this.segment.group({
              userId: user_id!,
              groupId: groupValues[0],
              traits: group_properties?.[Types.IdentifyOperation.SET],
            }, callback);
          }
          break;

        case 'page':
          // @ts-ignore
          const { name, category, ...properties } = event_properties;

          this.segment.page({
            userId: user_id!,
            category,
            name,
            properties,
          }, callback);
          break;

        default:
          this.segment.track({
            userId: user_id!,
            event: event_type,
            properties: event_properties,
          }, callback);
          break;
      }
    });
  }
}
