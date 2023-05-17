package com.example.ampliapp

import com.amplitude.ampli.*
import com.amplitude.Amplitude
import com.amplitude.Event
import com.amplitude.MiddlewareExtra
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject
import kotlin.test.assertEquals
import kotlin.test.Test
import kotlin.test.BeforeTest
import org.mockito.ArgumentCaptor
import org.mockito.Captor
import org.mockito.Mockito.*
import kotlin.test.assertNull

class AmpliTest {
    lateinit var ampli: Ampli

    private val userId = "test-ampli-user-id"
    private val deviceId = "test-ampli-device-id"

    @Captor
    lateinit var eventCaptor: ArgumentCaptor<Event>
    @Captor
    lateinit var extraCaptor: ArgumentCaptor<MiddlewareExtra>

    @BeforeTest
    fun setUp() {
        this.ampli = Ampli()
        this.eventCaptor = ArgumentCaptor.forClass(Event::class.java)
        this.extraCaptor = ArgumentCaptor.forClass(MiddlewareExtra::class.java)
    }

    @Test
    fun load() {
        val client = mock(Amplitude::class.java)

        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client, apiKey = "sample-api-key")))

        verify(client, times(0)).init(any())
    }

    @Test
    fun identify() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        this.ampli.identify(
            userId,
            Identify(
                requiredNumber = 42.0,
                optionalArray = arrayOf("A", "ray")
            ).options(deviceId = deviceId),
            EventOptions(userId = "some-user"),
            extra
        )

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture())

        val event = eventCaptor.value
        assertEquals("\$identify", event.eventType)
        assertEquals(userId, event.userId)
        assertEquals(deviceId, event.deviceId)
        assertEquals(
            """{
  "requiredNumber": 42,
  "optionalArray": [
    "A",
    "ray"
  ]
}""", event.userProperties.toString(2)
        )
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun setGroupSingleValue() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        val groupProperties = JSONObject()
        try {
            groupProperties.put("group-1", "value-1")
        } catch (e: JSONException) {
            System.err.println("Error converting properties to JSONObject: ${e.message}")
        }

        val amplitudeEvent = Event("\$identify", userId)
        amplitudeEvent.groupProperties = groupProperties
        this.ampli.client.logEvent(amplitudeEvent, extra)

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture())

        val event = eventCaptor.value
        assertEquals("\$identify", event.eventType)
        assertEquals(userId, event.userId)
        assertEquals(
            """{"group-1": "value-1"}""", event.groupProperties.toString(2)
        )
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun setGroupMultipleValues() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        val groupNames = try {
            JSONArray(arrayOf("value-1", "value-2", "value-3"))
        } catch (e: JSONException) {
            System.err.printf("Error converting value to JSONArray: %s%n", e.message)
            JSONArray()
        }

        val groupProperties = JSONObject()
        try {
            groupProperties.put("group-1", groupNames)
        } catch (e: JSONException) {
            System.err.println("Error converting properties to JSONObject: ${e.message}")
        }

        val amplitudeEvent = Event("\$identify", userId)
        amplitudeEvent.groupProperties = groupProperties

        this.ampli.client.logEvent(amplitudeEvent, extra)

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture())

        val event = eventCaptor.value
        assertEquals("\$identify", event.eventType)
        assertEquals(userId, event.userId)
        assertEquals(
            """{"group-1": [
  "value-1",
  "value-2",
  "value-3"
]}""", event.groupProperties.toString(2)
        )
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun trackEventNoProperties() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        this.ampli.eventNoProperties(userId, EventOptions(deviceId = deviceId, userId = "some-user"), extra)

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture())

        val event = eventCaptor.value
        assertEquals("Event No Properties", event.eventType)
        assertEquals(userId, event.userId)
        assertEquals(deviceId, event.deviceId)
        assertNull(event.eventProperties)
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun trackEventWithAllProperties() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        this.ampli.track(null,
            EventWithAllProperties(
                requiredString = "Required string",
                requiredArray = arrayOf("Required", "array"),
                requiredBoolean = true,
                requiredEnum = EventWithAllProperties.RequiredEnum.ENUM_2,
                requiredInteger = 41,
                requiredNumber = 42.0
            ).options(EventOptions(deviceId = deviceId)),
            EventOptions(userId = userId),
            extra
        )

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture())

        val event = eventCaptor.value
        assertEquals("Event With All Properties", event.eventType)
        assertEquals(userId, event.userId)
        assertEquals(deviceId, event.deviceId)
        assertEquals(
            """{
  "requiredEnum": "Enum2",
  "requiredArray": [
    "Required",
    "array"
  ],
  "requiredNumber": 42,
  "requiredConst": "some-const-value",
  "requiredBoolean": true,
  "requiredInteger": 41,
  "requiredString": "Required string"
}""", event.eventProperties.toString(2)
        )
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun flush() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.flush()

        verify(client, times(1)).flushEvents()
    }

    @Test
    fun eventOptionsSessionId() {
        val client = mock(Amplitude::class.java)
        this.ampli.load(LoadOptions(client = LoadClientOptions(instance = client)))
        this.ampli.eventNoProperties(userId, EventOptions(deviceId = deviceId, userId = "some-user", sessionId = 999L))
        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture())
        val event = eventCaptor.value
        assertEquals(999L, event.sessionId)
    }
}