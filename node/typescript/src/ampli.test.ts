import { Ampli, ApiKey } from './ampli';
import { SpecialEventType } from "@amplitude/types";
import { NodeClient } from "@amplitude/node";

describe('Ampli Node JS SDK tests', () => {
  let ampli: Ampli;
  let userId = 'test-ampli-user-id';
  let consoleLogMock: jest.SpyInstance;
  let consoleWarnMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

    ampli = new Ampli();
    // Set API keys for tests
    ApiKey.production = 'test-api-key-prod';
    ApiKey.development = 'test-api-key-dev';
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    consoleWarnMock.mockRestore();
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
    ampli.client.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe(SpecialEventType.IDENTIFY);
      expect(payload.event.user_id).toBe(userId);
      expect(payload.event.user_properties).toEqual({
        "$set": {
          optionalArray: ["A", "ray"],
          requiredNumber: 42,
        }
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
    const mockAmp = { logEvent: jest.fn() };

    ampli.load({ client: { instance: mockAmp as unknown as NodeClient } });

    ampli.setGroup(userId, 'Group name', 'Group Value');

    const logEventCalls = mockAmp.logEvent.mock.calls;
    expect(logEventCalls.length).toBe(1);
    expect(logEventCalls[0][0]).toEqual({
      "device_id": undefined,
      "event_type": "$identify",
      "groups": {"Group name": "Group Value"},
      "user_id": userId,
      "user_properties": {"$set": {"Group name": "Group Value"}},
    });
    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });


  test('should groupIdentify()', () => {
    const mockAmp = { logEvent: jest.fn() };

    ampli.load({ client: { instance: mockAmp as unknown as NodeClient } });

    ampli.groupIdentify('Group name', 'Group Value', { requiredBoolean: true, optionalString: 'some-string' });

    const logEventCalls = mockAmp.logEvent.mock.calls;
    expect(logEventCalls.length).toBe(1);
    const { device_id, ...callArgument } = logEventCalls[0][0];
    expect(device_id).toMatch(/.+/);
    expect(callArgument).toEqual({
      "event_type": "$groupidentify",
      "groups": {"Group name": "Group Value"},
      "group_properties": {"$set": {"optionalString": "some-string", "requiredBoolean": true}},
    });
    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with no properties', done => {
    ampli.load();
    ampli.client.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe('Event No Properties');
      done();
    });
    ampli.eventNoProperties(userId);
    ampli.flush();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with properties of all types', (done) => {
    ampli.load();
    ampli.client.addEventMiddleware((payload) => {
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
    ampli.eventWithAllProperties(userId, {
      requiredBoolean: false,
      requiredInteger: 42,
      requiredEnum: "Enum1",
      requiredNumber: 42.0,
      requiredString: "Required string",
      requiredArray: ["Required","string"],
    });
    ampli.flush();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleWarnMock).toHaveBeenCalledTimes(0);
  });
});
