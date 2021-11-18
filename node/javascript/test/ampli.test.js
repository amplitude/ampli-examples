const { Ampli, ApiKey } = require("../src/ampli");

describe('Ampli Node JS SDK tests', () => {
  /** @typedef {Ampli}*/
  let ampli;
  let userId = 'test-ampli-user-id';

  // Applies only to tests in this describe block
  beforeEach(() => {
    ampli = new Ampli();
    // Set API keys for tests
    ApiKey.production = 'test-api-key-prod';
    ApiKey.development = 'test-api-key-dev';
    // return initializeFoodDatabase();
  });

  test('should load() without any arguments if there are ApiKeys for each environment', () => {
    expect(() => ampli.load()).not.toThrow();
  });

  test('should error if load() without any arguments without ApiKeys for each environment', () => {
    ApiKey.production = '';
    ApiKey.development = '';
    expect(() => ampli.load()).toThrow();
  });

  test('should track an event with no properties', done => {
    ampli.load();
    ampli.client?.addEventMiddleware((payload) => {
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