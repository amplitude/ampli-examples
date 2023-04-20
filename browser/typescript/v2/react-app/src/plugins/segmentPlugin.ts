import { AnalyticsBrowser } from '@segment/analytics-next';
import { Types } from '@amplitude/analytics-browser';

export default class SegmentPlugin implements Types.DestinationPlugin {
  name = 'segment';
  type = Types.PluginType.DESTINATION as any;
  segment: AnalyticsBrowser;

  constructor(private readonly writeKey: string) {
    // Create Segment tracker
    this.segment = new AnalyticsBrowser();
  }

  async setup(config: Types.Config): Promise<undefined> {
    this.segment.load({
      writeKey: this.writeKey,
    });
    return;
  }

  execute(context: Types.Event): Promise<Types.Result> {
    return new Promise<Types.Result>(resolve => {
      const {
        event_type,
        event_properties,
        user_id,
        user_properties,
        groups,
        group_properties,
      } = context;
      const callback = (ctx: any) => {
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
