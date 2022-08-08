import { Ampli, ApiKey } from './ampli';
import { Types } from '@amplitude/analytics-node';

abstract class BaseCheckPlugin implements Types.BeforePlugin {
  name = 'checkPlugin';
  type = Types.PluginType.BEFORE as any;
  async setup(config: Types.Config): Promise<undefined> {
    return undefined;
  }
  abstract async execute(context: Types.Event): Promise<Types.Event>;
}

describe('Ampli Node TS SDK tests', () => {
  let ampli: Ampli;
  let userId = 'test-ampli-user-id';
  let consoleLogMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    ampli = new Ampli();
    // Set API keys for tests
    ApiKey.production = 'test-api-key-prod';
    ApiKey.development = 'test-api-key-dev';
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  test('should load() without any arguments if there are ApiKeys for each environment', () => {
    expect(() => ampli.load()).not.toThrow();
    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should log error if load() without any arguments without ApiKeys for each environment', () => {
    ApiKey.production = '';
    ApiKey.development = '';
    ampli.load();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock.mock.calls).toEqual([
        [`ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'`],
    ]);
  });

  test('should identify()', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context: Types.Event): Promise<Types.Event> {
        expect(context.event_type).toBe(Types.SpecialEventType.IDENTIFY);
        expect(context.user_id).toBe(userId);
        expect(context.user_properties).toEqual({
          "$set": {
            optionalArray: ["A", "ray"],
            requiredNumber: 42,
          }
        });
        done();
        return context
      }
    }

    ampli.load().promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.identify(userId, {
        optionalArray: ["A", "ray"],
        requiredNumber: 42,
      });

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });

  test('should setGroup()', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context: Types.Event): Promise<Types.Event> {
        expect(context.event_type).toBe(Types.SpecialEventType.IDENTIFY);
        // TODO: expect(context.user_id).toBe(userId);
        expect(context.user_properties).toEqual({
          "$set": {
            'Group name': 'Group Value',
          }
        });
        expect(context.groups).toEqual({"Group name": "Group Value"});
        done();
        return context
      }
    }

    ampli.load().promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.setGroup(userId, 'Group name', 'Group Value');

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });


  test('should groupIdentify()', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context: Types.Event): Promise<Types.Event> {
        expect(context.event_type).toBe(Types.SpecialEventType.GROUP_IDENTIFY);
        // TODO: expect(context.user_id).toBe(userId);
        expect(context.group_properties).toEqual({
          "$set": {
            optionalString: 'some-string',
            requiredBoolean: true,
          }
        });
        expect(context.groups).toEqual({"Group name": "Group Value"});
        done();
        return context
      }
    }

    ampli.load().promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.groupIdentify('Group name', 'Group Value', { requiredBoolean: true, optionalString: 'some-string' });

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });

  test('should track an event with no properties', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context: Types.Event): Promise<Types.Event> {
        expect(context.event_type).toBe('Event No Properties');
        expect(context.user_id).toBe(userId);
        done();
        return context
      }
    }

    ampli.load().promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.eventNoProperties(userId);

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });

  test('should track an event with properties of all types', (done) => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context: Types.Event): Promise<Types.Event> {
        expect(context.event_type).toBe('Event With All Properties');
        expect(context.event_properties).toEqual({
          requiredBoolean: false,
          requiredConst: "some-const-value",
          requiredInteger: 42,
          requiredEnum: "Enum1",
          requiredNumber: 42.0,
          requiredString: "Required string",
          requiredArray: ["Required","string"],
        });
        done();
        return context
      }
    }

    ampli.load().promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.eventWithAllProperties(userId, {
        requiredBoolean: false,
        requiredInteger: 42,
        requiredEnum: "Enum1",
        requiredNumber: 42.0,
        requiredString: "Required string",
        requiredArray: ["Required", "string"],
      });

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });
});
