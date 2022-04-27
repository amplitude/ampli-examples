import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { ampli, EventWithOptionalProperties } from '../lib/ampli';

const userId = 'ampli-nextjs-user-id';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.app} key="app">
        <h2 key="title">Ampli Next.js TypeScript Example</h2>

        <button key="identify" onClick={() => ampli.identify(userId, { requiredNumber: 42 })}>
          Identify
        </button>

        <button key="set-group" onClick={() => ampli.setGroup(userId, 'test group', 'nextjs-ampli')}>
          Set Group
        </button>

        <button key="group-identify" onClick={() => ampli.groupIdentify('test group', 'nextjs-ampli', { requiredBoolean: true })}>
          Group Identify
        </button>

        <button key="event-optional-properties" onClick={() => ampli.track(userId, new EventWithOptionalProperties({ optionalBoolean: true, optionalString: 'client-side event' }))}>
          Event w/ Optional Properties
        </button>

        <button key="event-all-properties" onClick={() => {
          ampli.eventWithAllProperties(userId, {
            requiredNumber: 1.23,
            requiredArray: ["I'm", 'required'],
            requiredBoolean: false,
            requiredEnum: "Enum1",
            requiredInteger: 42,
            requiredString: 'Hi!',
          }, undefined, { 'extra-key': 'extra-value' })
        }}>
          Event w/ All Properties
        </button>

        <button key="server-side-event" onClick={async () => {
          await fetch('/api/hello')
        }}>
          Server-Side Event
        </button>

        <button key="other-events" onClick={() => {
          ampli.eventNoProperties(userId);

          ampli.eventMaxIntForTest(userId, {
            intMax10: 5,
          });

          ampli.eventWithConstTypes(userId);

          ampli.eventObjectTypes(userId, {
            requiredObject: { 'key-1': 'value-1' },
            requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
          });

          ampli.eventWithArrayTypes(userId, {
            requiredBooleanArray: [true, false],
            requiredNumberArray: [1.2, 3, 4.56],
            requiredObjectArray: [{ 'key-1': 'value-1' }, { 'key-2': 'value-2' }],
            requiredStringArray: ['string-1', 'string-2', 'string-3'],
          });

          ampli.eventWithEnumTypes(userId, {
            'required enum': 'required enum 2',
          });

          ampli.eventWithOptionalArrayTypes(userId, {
            optionalBooleanArray: [true, false],
          });

          ampli.eventWithTemplateProperties(userId, {
            required_event_property: 'event property',
            required_template_property: 'template property',
            optional_template_property: 1.23,
          });

          ampli.eventWithDifferentCasingTypes(userId, {
            'enum with space': 'enum with space',
            enum_snake_case: 'enum_snake_case',
            enumCamelCase: 'enumCamelCase',
            EnumPascalCase: 'EnumPascalCase',
            'property with space': 'property with space',
            property_with_snake_case: 'property with snake case',
            propertyWithCamelCase: 'property with camel case',
            PropertyWithPascalCase: 'property with pascal case'
          });
        }}>
          Other Events
        </button>
      </div>
    </div>
  )
}

export default Home
