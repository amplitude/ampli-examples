const { Ampli } = require('../src/ampli');
import * as amplitude from '@amplitude/analytics-node';

class BaseCheckPlugin {
  name = 'checkPlugin';
  type = amplitude.Types.PluginType.BEFORE;
  async setup(config) {
    return undefined;
  }
  async execute(context) {}
}

describe('Ampli Node JS SDK tests', () => {
  let userId = 'test-ampli-user-id';
  let consoleLogMock;
  let consoleErrorMock;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  test('should log error if load() without any arguments without ApiKeys for each environment', async () => {
    const ampli = new Ampli();
    await ampli.load().promise;

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock.mock.calls).toEqual([
      [`ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'`],
    ]);
  });

  test('should identify()', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context) {
        expect(context.event_type).toBe(amplitude.Types.SpecialEventType.IDENTIFY);
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

    const ampli = new Ampli();
    ampli.load({
      client: { apiKey: 'test-api-key' },
    }).promise.then(() => {
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
      async execute(context) {
        expect(context.event_type).toBe(amplitude.Types.SpecialEventType.IDENTIFY);
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

    const ampli = new Ampli();
    ampli.load({
      client: { apiKey: 'test-api-key' },
    }).promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.client.setGroup('Group name', 'Group Value', { user_id: userId });

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });


  test('should groupIdentify()', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context) {
        expect(context.event_type).toBe(amplitude.Types.SpecialEventType.GROUP_IDENTIFY);
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

    const ampli = new Ampli();
    ampli.load({
      client: { apiKey: 'test-api-key' },
    }).promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      const amplitudeIdentify = new amplitude.Identify();
      amplitudeIdentify.set('requiredBoolean', true);
      amplitudeIdentify.set('optionalString', 'some-string');
      ampli.client.groupIdentify('Group name', 'Group Value', amplitudeIdentify);

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });

  test('should track an event with no properties', done => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context) {
        expect(context.event_type).toBe('Event No Properties');
        expect(context.user_id).toBe(userId);
        done();
        return context
      }
    }

    const ampli = new Ampli();
    ampli.load({
      client: { apiKey: 'test-api-key' },
    }).promise.then(() => {
      ampli.client.add(new CheckPlugin());
      ampli.client.remove('amplitude');

      ampli.eventNoProperties(userId);

      expect(consoleLogMock).toHaveBeenCalledTimes(0);
      expect(consoleErrorMock).toHaveBeenCalledTimes(0);
    });
  });

  test('should track an event with properties of all types', (done) => {
    class CheckPlugin extends BaseCheckPlugin {
      async execute(context) {
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

    const ampli = new Ampli();
    ampli.load({
      client: { apiKey: 'test-api-key' },
    }).promise.then(() => {
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
