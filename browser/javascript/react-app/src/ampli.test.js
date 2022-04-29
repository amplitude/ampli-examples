import { Ampli, ApiKey } from './ampli';

describe('Ampli Browser JS SDK tests', () => {
  /** @typedef {Ampli}*/
  let ampli;
  let userId = 'test-browser-js-ampli-user-id';
  let consoleLogMock;
  let consoleWarnMock;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

    ampli = new Ampli();
    // Set API keys for tests
    ApiKey.production = 'test-api-key-prod';
    ApiKey.development = 'test-api-key-dev';
  });

  test('should load() without any arguments if there are ApiKeys for each environment', () => {
    expect(() => ampli.load()).not.toThrow();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should log warning if load() without any arguments without ApiKeys for each environment', () => {
    ApiKey.production = '';
    ApiKey.development = '';
    ampli.load();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(1);
    expect(consoleWarnMock.mock.calls).toEqual([
      [`WARNING: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'`],
    ]);
  });

  test('should identify()', done => {
    ampli.load();
    ampli.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe('Identify');
      expect(payload.event.user_id).toBe(userId);
      expect(payload.event).toEqual({
        "device_id": undefined,
        "event_type": "Identify",
        "user_id": userId,
        "event_properties": { optionalArray: ["A", "ray"], requiredNumber: 42 },
      });
      done();
    });
    ampli.identify(userId, {
      optionalArray: ["A", "ray"],
      requiredNumber: 42,
    });

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should setGroup()', () => {
    const mockAmp = { setGroup: jest.fn() };

    ampli.load({ client: { instance: mockAmp } });

    ampli.setGroup('Group name', 'Group Value');

    const setGroupCalls = mockAmp.setGroup.mock.calls;
    expect(setGroupCalls.length).toBe(1);
    expect(setGroupCalls[0]).toEqual(["Group name", "Group Value"]);
    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should groupIdentify()', () => {
    const mockAmp = { groupIdentify: jest.fn() };

    ampli.load({ client: { instance: mockAmp } });

    ampli.groupIdentify('Group name', 'Group Value', { requiredBoolean: true, optionalString: 'some-string' });

    const groupIdentifyCalls = mockAmp.groupIdentify.mock.calls;
    expect(groupIdentifyCalls.length).toBe(1);
    expect(groupIdentifyCalls[0]).toEqual([
      "Group name",
      "Group Value",
      {
        "properties": [
          "requiredBoolean",
          "optionalString"
        ],
        "userPropertiesOperations": {
          "$set": {
            "optionalString": "some-string",
            "requiredBoolean": true
          }
        }
      },
      undefined
    ]);
    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with no properties', done => {
    ampli.load();
    ampli.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe('Event No Properties');
      expect(payload.event.event_properties).toBe(undefined);
      done();
    });
    ampli.eventNoProperties();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with properties of all types', (done) => {
    ampli.load();
    ampli.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe('Event With All Properties');
      expect(payload.event.event_properties).toEqual({
        requiredBoolean: false,
        requiredConst: "some-const-value",
        requiredInteger: 42,
        requiredEnum: "Enum1",
        requiredNumber: 42.0,
        requiredString: "Required string",
        requiredArray: ["Required","string"],
      });
      done();
    })
    ampli.eventWithAllProperties({
      requiredBoolean: false,
      requiredInteger: 42,
      requiredEnum: "Enum1",
      requiredNumber: 42.0,
      requiredString: "Required string",
      requiredArray: ["Required","string"],
    });

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });
});
