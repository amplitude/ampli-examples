package com.example.ampliapp

import android.content.Context
import com.amplitude.ampli.*
import com.amplitude.android.Amplitude
import com.amplitude.android.events.BaseEvent
import com.amplitude.android.events.EventOptions
import org.json.JSONObject
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.junit.MockitoJUnitRunner
import org.mockito.kotlin.argumentCaptor
import org.mockito.kotlin.*

@RunWith(MockitoJUnitRunner::class)
class AmpliTest {
    lateinit var ampli: Ampli
    val client = mock<Amplitude>()
    val appContext = mock<Context>()

    val optionsCaptor = argumentCaptor<EventOptions>()
    val mapCaptor = argumentCaptor<Map<String, Any>>()
    val arrayCapture = argumentCaptor<Array<String>>()
    val eventCaptor = argumentCaptor<BaseEvent>()

    private val userId = "test-ampli-user-id"
    private val deviceId = "test-ampli-device-id"

    @Before
    fun setUp() {
        this.ampli = Ampli()
    }

    @Test
    fun load() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        verify(client, times(0)).build()
    }

    @Test
    fun identify() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val eventOptions = EventOptions()
        eventOptions.userId = userId
        eventOptions.deviceId = deviceId

        this.ampli.identify(
            userId,
            Identify(
                requiredNumber = 42.0,
                optionalArray = arrayOf("A", "ray")
            ),
             eventOptions
        )

        verify(client, times(1)).identify(mapCaptor.capture(), optionsCaptor.capture())
        assertEquals(
            """{"requiredNumber":42,"optionalArray":["A","ray"]}""",
            JSONObject(mapCaptor.allValues.first()).toString()
        )
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun setGroupSingleValue() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val eventOptions = EventOptions()
        eventOptions.userId = userId
        eventOptions.deviceId = deviceId;

        this.ampli.setGroup(
            "group-1",
            "value-1",
            eventOptions
        )

        verify(client, times(1)).setGroup(eq("group-1"), eq("value-1"), optionsCaptor.capture())
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun setGroupMultipleValues() {
        val eventOptions = EventOptions()
        eventOptions.userId = userId;
        eventOptions.deviceId = deviceId;

        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.setGroup(
            "group-1",
            arrayOf("value-1", "value-2", "value-3"),
            eventOptions
        )

        verify(client, times(1)).setGroup(eq("group-1"), arrayCapture.capture(), optionsCaptor.capture())
        assertEquals(arrayOf("value-1", "value-2", "value-3").joinToString(), arrayCapture.allValues.first().joinToString())
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun groupIdentify() {
        val eventOptions = EventOptions()
        eventOptions.userId = userId;
        eventOptions.deviceId = deviceId;

        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.groupIdentify(
            "group-type-1",
            "group-name-1",
            Group(false, "test-string"),
            eventOptions
        )

        verify(client, times(1)).groupIdentify(eq("group-type-1"), eq("group-name-1"), mapCaptor.capture(), optionsCaptor.capture())
        assertEquals("""{
  "requiredBoolean": false,
  "optionalString": "test-string"
}""".trimMargin(), JSONObject(mapCaptor.allValues.first()).toString(2))
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun load() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        verify(client, times(0)).build()
    }

    @Test
    fun identify() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val eventOptions = EventOptions()
        eventOptions.userId = userId
        eventOptions.deviceId = deviceId

        this.ampli.identify(
            userId,
            Identify(
                requiredNumber = 42.0,
                optionalArray = arrayOf("A", "ray")
            ),
             eventOptions
        )

        verify(client, times(1)).identify(mapCaptor.capture(), optionsCaptor.capture())
        assertEquals(
            """{"requiredNumber":42,"optionalArray":["A","ray"]}""",
            JSONObject(mapCaptor.allValues.first()).toString()
        )
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun setGroupSingleValue() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val eventOptions = EventOptions()
        eventOptions.userId = userId
        eventOptions.deviceId = deviceId;

        this.ampli.setGroup(
            "group-1",
            "value-1",
            eventOptions
        )

        verify(client, times(1)).setGroup(eq("group-1"), eq("value-1"), optionsCaptor.capture())
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun setGroupMultipleValues() {
        val eventOptions = EventOptions()
        eventOptions.userId = userId;
        eventOptions.deviceId = deviceId;

        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.setGroup(
            "group-1",
            arrayOf("value-1", "value-2", "value-3"),
            eventOptions
        )

        verify(client, times(1)).setGroup(eq("group-1"), arrayCapture.capture(), optionsCaptor.capture())
        assertEquals(arrayOf("value-1", "value-2", "value-3").joinToString(), arrayCapture.allValues.first().joinToString())
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun groupIdentify() {
        val eventOptions = EventOptions()
        eventOptions.userId = userId;
        eventOptions.deviceId = deviceId;

        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.groupIdentify(
            "group-type-1",
            "group-name-1",
            Group(false, "test-string"),
            eventOptions
        )

        verify(client, times(1)).groupIdentify(eq("group-type-1"), eq("group-name-1"), mapCaptor.capture(), optionsCaptor.capture())
        assertEquals("""{
  "requiredBoolean": false,
  "optionalString": "test-string"
}""".trimMargin(), JSONObject(mapCaptor.allValues.first()).toString(2))
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }


    @Test
    fun trackEventNoProperties() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))
        this.ampli.eventNoProperties()

        verify(client, times(1)).track(
            eventCaptor.capture(),
            eq(null),
            eq(null)
        )
        assertEquals("EventNoProperties", eventCaptor.allValues.first().eventType )
    }

    @Test
    fun trackEventWithAllProperties() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val eventOptions = EventOptions()
        eventOptions.userId = userId
        eventOptions.deviceId = deviceId
        this.ampli.track(
            EventWithAllProperties(
                requiredString = "Required string",
                requiredArray = arrayOf("Required", "array"),
                requiredBoolean = true,
                requiredEnum = EventWithAllProperties.RequiredEnum.ENUM_2,
                requiredInteger = 41,
                requiredNumber = 42.0
            ),
            eventOptions,
        )
        verify(client, times(1)).track(
            eventCaptor.capture(),
            optionsCaptor.capture(),
            eq(null)
        )

        assertEquals("EventWithAllProperties", eventCaptor.allValues.first().eventType)
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
}""", JSONObject(eventCaptor.allValues.first().eventProperties).toString(2))
        assertEquals(userId, optionsCaptor.allValues.first().userId)
        assertEquals(deviceId, optionsCaptor.allValues.first().deviceId)
    }

    @Test
    fun flush() {
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.flush()

        verify(client, times(1)).flush()
    }
}