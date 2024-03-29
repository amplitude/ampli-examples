import { Ampli, ApiKey } from './ampli';
import { SpecialEventType } from "@amplitude/types";
import { NodeClient } from "@amplitude/node";
import { Identify as AmplitudeIdentify } from '@amplitude/identify';

describe('Ampli Node JS SDK tests', () => {
  let ampli: Ampli;
  let userId = 'test-ampli-user-id';
  let consoleLogMock: jest.SpyInstance;
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    consoleLogMock = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation();

    ampli = new Ampli();
    // Set API keys for tests
    ApiKey.prod = 'test-api-key-prod';
    ApiKey.dev = 'test-api-key-dev';
  });

  afterEach(() => {
    consoleLogMock.mockRestore();
    consoleErrorMock.mockRestore();
  });

  test('should identify()', done => {
    ampli.load({ environment: 'dev' });
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
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should setGroup()', () => {
    const mockAmp = { logEvent: jest.fn() };

    ampli.load({ client: { instance: mockAmp as unknown as NodeClient } });

    const setGroupIdentify = new AmplitudeIdentify().setGroup('Group name', 'Group Value');
    const setGroupIdentifyEvent = setGroupIdentify.identifyUser(userId);
    ampli.client.logEvent(setGroupIdentifyEvent);

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
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });


  test('should groupIdentify()', () => {
    const mockAmp = { logEvent: jest.fn() };

    ampli.load({ client: { instance: mockAmp as unknown as NodeClient } });

    const groupIdentify = new AmplitudeIdentify();
    groupIdentify.set('requiredBoolean', true);
    groupIdentify.set('optionalString', 'some-string');
    const groupIdentifyEvent = groupIdentify.identifyGroup('Group name', 'Group Value');
    ampli.client.logEvent(groupIdentifyEvent);

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
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with no properties', done => {
    ampli.load({ environment: 'dev' });
    ampli.client.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe('Event No Properties');
      done();
    });
    ampli.eventNoProperties(userId);
    ampli.flush();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with properties of all types', (done) => {
    ampli.load({ environment: 'dev' });
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
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });
});
