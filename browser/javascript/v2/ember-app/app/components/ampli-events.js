import Component from '@glimmer/component';
import { action } from '@ember/object';
import { ampli, EventWithOptionalProperties } from '../ampli';

const userId = 'ampli-ember-js-user-id';

export default class AmpliEventsComponent extends Component {
  @action
  identify() {
    ampli.identify(userId, { requiredNumber: 42 });
  }

  @action
  group() {
    ampli.setGroup('test group', 'ember-js-ampli');
  }

  @action
  groupIdentify() {
    ampli.groupIdentify('test group', 'ember-js-ampli', {
      requiredBoolean: true,
    });
  }

  @action
  eventWithOptionalProperties() {
    ampli.track(new EventWithOptionalProperties({ optionalBoolean: true }));
  }

  @action
  eventWithAllProperties() {
    ampli.eventWithAllProperties({
      requiredNumber: 1.23,
      requiredArray: ["I'm", 'required'],
      requiredBoolean: false,
      requiredEnum: 'Enum1',
      requiredInteger: 42,
      requiredString: 'Hi!',
    });
  }

  @action
  otherProperties() {
    ampli.eventNoProperties();

    ampli.eventWithConstTypes();

    ampli.eventWithOptionalProperties({
      optionalBoolean: true,
    });

    ampli.eventMaxIntForTest({
      intMax10: 5,
    });

    ampli.eventObjectTypes({
      requiredObject: { 'key-1': 'value-1' },
      requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
    });

    ampli.eventWithArrayTypes({
      requiredBooleanArray: [true, false],
      requiredNumberArray: [1.2, 3, 4.56],
      requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
      requiredStringArray: ['string-1', 'string-2', 'string-3'],
    });

    ampli.eventWithEnumTypes({
      'required enum': 'required enum 2',
    });

    ampli.eventWithOptionalArrayTypes({
      optionalBooleanArray: [true, false],
    });

    ampli.eventWithTemplateProperties({
      required_event_property: 'event property',
      required_template_property: 'template property',
      optional_template_property: 1.23,
    });

    ampli.eventWithDifferentCasingTypes({
      'enum with space': 'enum with space',
      enum_snake_case: 'enum_snake_case',
      enumCamelCase: 'enumCamelCase',
      EnumPascalCase: 'EnumPascalCase',
      'property with space': 'property with space',
      property_with_snake_case: 'property with snake case',
      propertyWithCamelCase: 'property with camel case',
      PropertyWithPascalCase: 'property with pascal case',
    });
  }
}
