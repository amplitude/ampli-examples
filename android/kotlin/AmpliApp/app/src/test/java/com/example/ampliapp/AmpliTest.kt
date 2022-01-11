package com.example.ampliapp

import android.content.Context
import com.amplitude.ampli.*
import com.amplitude.api.AmplitudeClient
import com.amplitude.api.MiddlewareExtra
import com.amplitude.api.Plan
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentCaptor
import org.mockito.Captor
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner


@RunWith(MockitoJUnitRunner::class)
class AmpliTest {
    lateinit var ampli: Ampli

    private val userId = "test-ampli-user-id"
    private val deviceId = "test-ampli-device-id"

    @Captor
    lateinit var jsonObjectCaptor: ArgumentCaptor<JSONObject>
    @Captor
    lateinit var jsonArrayCaptor: ArgumentCaptor<JSONArray>
    @Captor
    lateinit var extraCaptor: ArgumentCaptor<MiddlewareExtra>

    @Before
    fun setUp() {
        this.ampli = Ampli()
    }

    @Test
    fun load() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)

        val plan = Plan().setBranch("branch-1").setSource("source-1").setVersion("version-1")
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client, plan = plan)))

        verify(client, times(0)).initialize(any(), any())
        verify(client, times(1)).setPlan(plan)
    }

    @Test
    fun identify() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

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

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId

        verify(client, times(1)).setUserProperties(jsonObjectCaptor.capture(), extraCaptor.capture())
        assertEquals(
            """{
  "requiredNumber": 42,
  "optionalArray": [
    "A",
    "ray"
  ]
}""", jsonObjectCaptor.value.toString(2)
        )
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun setGroupSingleValue() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        this.ampli.setGroup(
            "group-1",
            "value-1",
            EventOptions(deviceId = deviceId, userId = userId),
            extra
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).setGroup(eq("group-1"), eq("value-1"), extraCaptor.capture())
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun setGroupMultipleValues() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        this.ampli.setGroup(
            "group-1",
            arrayOf("value-1", "value-2", "value-3"),
            EventOptions(deviceId = deviceId, userId = userId),
            extra
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).setGroup(eq("group-1"), jsonArrayCaptor.capture(), extraCaptor.capture())
        assertEquals("""["value-1","value-2","value-3"]""", jsonArrayCaptor.value.toString())
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun trackEventNoProperties() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.eventNoProperties()

        verify(client, times(0)).userId = any()
        verify(client, times(0)).deviceId = any()
        verify(client, times(1)).logEvent(
            eq("Event No Properties"),
            jsonObjectCaptor.capture(),
            extraCaptor.capture()
        )
        assertNull(jsonObjectCaptor.value)
        assertNull(extraCaptor.value)
    }

    @Test
    fun trackEventWithAllProperties() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        val extra = MiddlewareExtra(mapOf("abc" to 123, "xyz" to "987"))

        this.ampli.track(
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

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).logEvent(
            eq("Event With All Properties"),
            jsonObjectCaptor.capture(),
            extraCaptor.capture()
        )
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
}""", jsonObjectCaptor.value.toString(2)
        )
        assertEquals("{xyz=987, abc=123}", extraCaptor.value.toString())
    }

    @Test
    fun flush() {
        val client = mock(AmplitudeClient::class.java)
        val appContext = mock(Context::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.flush()

        verify(client, times(1)).uploadEvents()
    }
}