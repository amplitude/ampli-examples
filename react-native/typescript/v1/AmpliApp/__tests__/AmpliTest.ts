import {Ampli, EventOptions} from '../src/ampli';
import {Amplitude, MiddlewareExtra} from '@amplitude/react-native';
import * as amplitude from '@amplitude/react-native';

type MockClient = {
  identify: jest.Mock;
  groupIdentify: jest.Mock;
  setGroup: jest.Mock;
  logEvent: jest.Mock;
  setUserId: jest.Mock;
  setDeviceId: jest.Mock;
  uploadEvents: jest.Mock;
  setPlan: jest.Mock;
};

describe('ampli tests', () => {
  const userId = 'test-user-id';
  const options: EventOptions = {
    userId: 'options-user-id',
    deviceId: 'options-device-id',
  };
  const extra: MiddlewareExtra = {'extra-key': 'extra-value'};

  let ampli: Ampli;
  const client: MockClient = {
    identify: jest.fn(),
    groupIdentify: jest.fn(),
    setGroup: jest.fn(),
    logEvent: jest.fn(),
    setUserId: jest.fn(),
    setDeviceId: jest.fn(),
    uploadEvents: jest.fn(),
    setPlan: jest.fn(),
  };

  beforeEach(() => {
    ampli = new Ampli();
    ampli.load({client: {instance: client as unknown as Amplitude}});
  });

  afterEach(() => {
    client.identify.mockReset();
    client.groupIdentify.mockReset();
    client.setGroup.mockReset();
    client.logEvent.mockReset();
    client.setUserId.mockReset();
    client.setDeviceId.mockReset();
    client.uploadEvents.mockReset();
    client.setPlan.mockReset();
  });

  function checkSnapshots() {
    expect(client.identify.mock.calls).toMatchSnapshot('identify');
    expect(client.groupIdentify.mock.calls).toMatchSnapshot('groupIdentify');
    expect(client.setGroup.mock.calls).toMatchSnapshot('setGroup');
    expect(client.logEvent.mock.calls).toMatchSnapshot('logEvent');
    expect(client.setUserId.mock.calls).toMatchSnapshot('setUserId');
    expect(client.setDeviceId.mock.calls).toMatchSnapshot('setDeviceId');
    expect(client.uploadEvents.mock.calls).toMatchSnapshot('uploadEvents');
  }

  test('identify', async () => {
    const {promise} = ampli.identify(
      userId,
      {
        requiredNumber: 123,
        optionalArray: ['A', 'BC'],
      },
      options,
      extra,
    );
    await promise;
    checkSnapshots();
  });

  test('groupIdentify', async () => {
    const amplitudeIdentify = new amplitude.Identify();
    amplitudeIdentify.set('requiredBoolean', true);
    amplitudeIdentify.set('optionalString', 'abc');

    await ampli.client.groupIdentify(
      'test-group-type',
      'test-group-name',
      amplitudeIdentify,
      extra,
    );
    checkSnapshots();
  });

  test('setGroup', async () => {
    await ampli.client.setGroup('test-group-type', 'test-group-name');
    checkSnapshots();
  });

  test('setGroup (multiple names)', async () => {
    await ampli.client.setGroup('test-group-type', [
      'test-group-name1',
      'test-group-name2',
    ]);
    checkSnapshots();
  });

  test('eventNoProperties', async () => {
    const {promise} = ampli.eventNoProperties(options, extra);
    await promise;
    checkSnapshots();
  });

  test('eventWithAllProperties', async () => {
    const {promise} = ampli.eventWithAllProperties(
      {
        requiredArray: ['a', 'bc'],
        requiredBoolean: true,
        requiredEnum: 'Enum1',
        requiredInteger: 123,
        requiredNumber: 45.67,
        requiredString: 'required-string',
        optionalString: 'optional-string',
      },
      options,
      extra,
    );
    await promise;
    checkSnapshots();
  });

  test('flush', async () => {
    const {promise} = ampli.flush();
    await promise;
    checkSnapshots();
  });
});
