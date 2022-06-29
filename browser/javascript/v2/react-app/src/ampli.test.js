import { Ampli, ApiKey } from './ampli';

describe('Ampli Browser JS SDK V2 tests', () => {
  /** @typedef {Ampli}*/
  let ampli;
  let userId = 'test-browser-js-ampli-user-id';
  let consoleLogMock;
  let consoleErrorMock;

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

  test('should log warning if load() without any arguments without ApiKeys for each environment', () => {
    ApiKey.production = '';
    ApiKey.development = '';
    ampli.load();

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(1);
    expect(consoleErrorMock.mock.calls).toEqual([
      [`ERROR: ampli.load() requires 'environment', 'client.apiKey', or 'client.instance'`],
    ]);
  });

  test('should identify()', async () => {
    const send = jest.fn().mockReturnValueOnce({
      status: 'success',
      statusCode: 200,
      body: {
        eventsIngested: 1,
        payloadSizeBytes: 1,
        serverUploadTime: 1,
      },
    });
    await ampli.load({
      client: {
        configuration: {
          transportProvider: {
            send,
          },
        },
      },
    })?.promise;
    const response = await ampli.identify(userId, {
      optionalArray: ['A', 'ray'],
      requiredNumber: 42,
    })?.promise;

    expect(response.event.event_type).toBe('$identify');
    expect(response.event.user_id).toBe(userId);
    expect(response.event.user_properties).toEqual({
      $set: {
        optionalArray: ['A', 'ray'],
        requiredNumber: 42,
      },
    });
    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should setGroup()', () => {
    const mockAmp = { setGroup: jest.fn() };

    ampli.load({ client: { instance: mockAmp } });

    ampli.setGroup('Group name', 'Group Value');

    const setGroupCalls = mockAmp.setGroup.mock.calls;
    expect(setGroupCalls.length).toBe(1);
    expect(setGroupCalls[0]).toEqual(['Group name', 'Group Value']);

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should groupIdentify()', async () => {
    const mockAmp = { groupIdentify: jest.fn() };
    const send = jest.fn().mockReturnValueOnce({
      status: 'success',
      statusCode: 200,
      body: {
        eventsIngested: 1,
        payloadSizeBytes: 1,
        serverUploadTime: 1,
      },
    });
    await ampli.load({
      client: {
        instance: mockAmp,
        configuration: {
          transportProvider: {
            send,
          },
        },
      },
    })?.promise;

    await ampli.groupIdentify('Group name', 'Group Value', {
      requiredBoolean: true,
      optionalString: 'some-string',
    })?.promise;

    const groupIdentifyCalls = mockAmp.groupIdentify.mock.calls;
    expect(groupIdentifyCalls.length).toBe(1);
    expect(groupIdentifyCalls[0]).toEqual([
      'Group name',
      'Group Value',
      {
        _propertySet: new Set(['requiredBoolean', 'optionalString']),
        _properties: {
          $set: {
            optionalString: 'some-string',
            requiredBoolean: true,
          },
        },
      },
      undefined,
    ]);

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with no properties', async () => {
    const send = jest.fn().mockReturnValueOnce({
      status: 'success',
      statusCode: 200,
      body: {
        eventsIngested: 1,
        payloadSizeBytes: 1,
        serverUploadTime: 1,
      },
    });
    await ampli.load({
      client: {
        configuration: {
          transportProvider: {
            send,
          },
        },
      },
    })?.promise;

    const response = await ampli.eventNoProperties()?.promise;

    expect(response.event.event_type).toBe('Event No Properties');
    expect(response.event.event_properties).toBe(undefined);

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });

  test('should track an event with properties of all types', async () => {
    const send = jest.fn().mockReturnValueOnce({
      status: 'success',
      statusCode: 200,
      body: {
        eventsIngested: 1,
        payloadSizeBytes: 1,
        serverUploadTime: 1,
      },
    });
    await ampli.load({
      client: {
        configuration: {
          transportProvider: {
            send,
          },
        },
      },
    })?.promise;

    const response = await ampli.eventWithAllProperties({
      requiredBoolean: false,
      requiredInteger: 42,
      requiredEnum: 'Enum1',
      requiredNumber: 42.0,
      requiredString: 'Required string',
      requiredArray: ['Required', 'string'],
    })?.promise;

    expect(response.event.event_type).toBe('Event With All Properties');
    expect(response.event.event_properties).toEqual({
      requiredBoolean: false,
      requiredConst: 'some-const-value',
      requiredInteger: 42,
      requiredEnum: 'Enum1',
      requiredNumber: 42.0,
      requiredString: 'Required string',
      requiredArray: ['Required', 'string'],
    });

    expect(consoleLogMock).toHaveBeenCalledTimes(0);
    expect(consoleErrorMock).toHaveBeenCalledTimes(0);
  });
});
