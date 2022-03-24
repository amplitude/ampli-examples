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
      </div>
    </div>
  )
}

export default Home
