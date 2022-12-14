import {Ampli, EventOptions, ReactNativeClient} from '../src/ampli';
import * as amplitude from '@amplitude/analytics-react-native';

type MockClient = {
  identify: jest.Mock;
  groupIdentify: jest.Mock;
  setGroup: jest.Mock;
  track: jest.Mock;
  flush: jest.Mock;
};

describe('ampli tests', () => {
  const userId = 'test-user-id';
  const options: EventOptions = {
    user_id: 'options-user-id',
    device_id: 'options-device-id',
  };

  const getVoidPromiseResult = () => ({promise: Promise.resolve()});

  let ampli: Ampli;
  const client: MockClient = {
    identify: jest.fn(getVoidPromiseResult),
    groupIdentify: jest.fn(getVoidPromiseResult),
    setGroup: jest.fn(getVoidPromiseResult),
    track: jest.fn(getVoidPromiseResult),
    flush: jest.fn(getVoidPromiseResult),
  };

  beforeEach(() => {
    ampli = new Ampli();
    ampli.load({client: {instance: client as unknown as ReactNativeClient}});
  });

  afterEach(() => {
    client.identify.mockClear();
    client.groupIdentify.mockClear();
    client.setGroup.mockClear();
    client.track.mockClear();
    client.flush.mockClear();
  });

  function checkSnapshots() {
    expect(client.identify.mock.calls).toMatchSnapshot('identify');
    expect(client.groupIdentify.mock.calls).toMatchSnapshot('groupIdentify');
    expect(client.setGroup.mock.calls).toMatchSnapshot('setGroup');
    expect(client.track.mock.calls).toMatchSnapshot('track');
    expect(client.flush.mock.calls).toMatchSnapshot('flush');
  }

  test('identify', async () => {
    await ampli.identify(
      userId,
      {
        requiredNumber: 123,
        optionalArray: ['A', 'BC'],
      },
      options,
    ).promise;
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
      options,
    ).promise;
    checkSnapshots();
  });

  test('setGroup', async () => {
    await ampli.client.setGroup('test-group-type', 'test-group-name', options)
      .promise;
    checkSnapshots();
  });

  test('setGroup (multiple names)', async () => {
    await ampli.client.setGroup(
      'test-group-type',
      ['test-group-name1', 'test-group-name2'],
      options,
    ).promise;
    checkSnapshots();
  });

  test('eventNoProperties', async () => {
    await ampli.eventNoProperties(options).promise;
    checkSnapshots();
  });

  test('eventWithAllProperties', async () => {
    await ampli.eventWithAllProperties(
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
    ).promise;
    checkSnapshots();
  });

  test('flush', async () => {
    await ampli.flush().promise;
    checkSnapshots();
  });
});
