import { module, test } from 'qunit';
import { Ampli } from 'ember-app/ampli';

const send = () => ({
  status: 'success',
  statusCode: 200,
  body: {
    eventsIngested: 1,
    payloadSizeBytes: 1,
    serverUploadTime: 1,
  },
});

module('Unit | ampli', function () {
  test('should identify()', async function (assert) {
    const ampli = new Ampli();
    await ampli.load({
      client: {
        apiKey: 'test-api-key',
        configuration: {
          transportProvider: {
            send,
          },
        },
      },
    })?.promise;

    const response = await ampli.identify('test-user-id', {
      optionalArray: ['A', 'ray'],
      requiredNumber: 42,
    })?.promise;

    assert.strictEqual(response.event.event_type, '$identify');
    assert.strictEqual(response.event.user_id, 'test-user-id');
    assert.deepEqual(response.event.user_properties, {
      $set: {
        optionalArray: ['A', 'ray'],
        requiredNumber: 42,
      },
    });
  });

  test('should track an event with properties of all types', async function (assert) {
    const ampli = new Ampli();
    await ampli.load({
      client: {
        apiKey: 'test-api-key',
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

    assert.strictEqual(response.event.event_type, 'Event With All Properties');
    assert.deepEqual(response.event.event_properties, {
      requiredBoolean: false,
      requiredConst: 'some-const-value',
      requiredInteger: 42,
      requiredEnum: 'Enum1',
      requiredNumber: 42.0,
      requiredString: 'Required string',
      requiredArray: ['Required', 'string'],
    });
  });
});
