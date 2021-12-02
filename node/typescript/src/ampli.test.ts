import { Ampli, ApiKey } from './ampli';
import { SpecialEventType } from "@amplitude/types";

describe('Ampli Node JS SDK tests', () => {
  /** @typedef {Ampli}*/
  let ampli;
  let userId = 'test-ampli-user-id';

  beforeEach(() => {
    ampli = new Ampli();
    // Set API keys for tests
    ApiKey.production = 'test-api-key-prod';
    ApiKey.development = 'test-api-key-dev';
  });

  test('should load() without any arguments if there are ApiKeys for each environment', () => {
    expect(() => ampli.load()).not.toThrow();
  });

  test('should error if load() without any arguments without ApiKeys for each environment', () => {
    ApiKey.production = '';
    ApiKey.development = '';
    expect(() => ampli.load()).toThrow();
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
  });

  test('should setGroup()', () => {
    const mockAmp = { logEvent: jest.fn() };

    ampli.load({ client: { instance: mockAmp } });

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
  });

  test('should track an event with no properties', done => {
    ampli.load();
    ampli.client.addEventMiddleware((payload) => {
      expect(payload.event.event_type).toBe('Event No Properties');
      done();
    });
    ampli.eventNoProperties(userId);
    ampli.flush();
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
  });
});