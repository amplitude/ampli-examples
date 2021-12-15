package com.example.ampliapp

import android.content.Context
import androidx.test.platform.app.InstrumentationRegistry
import com.amplitude.ampli.*
import com.amplitude.api.AmplitudeClient
import com.amplitude.api.Plan
import org.json.JSONObject
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
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
    lateinit var appContext: Context

    private val userId = "test-ampli-user-id"
    private val deviceId = "test-ampli-device-id"

    @Captor
    lateinit var jsonObjectCaptor: ArgumentCaptor<JSONObject>

    @Before
    fun setUp() {
        // Context of the app under test.
        this.appContext = InstrumentationRegistry.getInstrumentation().targetContext

        this.ampli = Ampli()
    }

    @Test
    fun load() {
        val client = mock(AmplitudeClient::class.java)

        val plan = Plan().setBranch("branch-1").setSource("source-1").setVersion("version-1")
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client, plan = plan)))

        verify(client, times(0)).initialize(any(), any())

        verify(client, times(1)).setPlan(plan)
    }

    @Test
    fun identify() {
        val client = mock(AmplitudeClient::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.identify(
            userId,
            IdentifyProperties(requiredNumber = 42.0, optionalArray = listOf("A", "ray")),
            EventOptions(deviceId = deviceId, userId = "some-user")
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId

        verify(client, times(1)).setUserProperties(jsonObjectCaptor.capture())
        assertEquals(
            """{
  "optionalArray": "[A, ray]",
  "requiredNumber": 42
}""", jsonObjectCaptor.value.toString(2)
        )
    }

    @Test
    fun setGroupSingleValue() {
        val client = mock(AmplitudeClient::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.setGroup(
            "group-1",
            "value-1",
            EventOptions(deviceId = deviceId, userId = userId)
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).setGroup("group-1", "value-1")
    }

    @Test
    fun setGroupMultipleValues() {
        val client = mock(AmplitudeClient::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.setGroup(
            "group-1",
            arrayOf("value-1", "value-2", "value-3"),
            EventOptions(deviceId = deviceId, userId = userId)
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).setGroup("group-1", arrayOf("value-1", "value-2", "value-3"))
    }

    @Test
    fun trackEventNoProperties() {
        val client = mock(AmplitudeClient::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.eventNoProperties(
            EventOptions(deviceId = deviceId, userId = userId)
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).logEvent(eq("Event No Properties"), jsonObjectCaptor.capture())
        assertNull(jsonObjectCaptor.value)
    }

    @Test
    fun trackEventWithAllProperties() {
        val client = mock(AmplitudeClient::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.eventWithAllProperties(
            EventWithAllPropertiesProperties(
                requiredString = "Required string",
                requiredArray = listOf("Required", "array"),
                requiredBoolean = true,
                requiredEnum = EventWithAllPropertiesRequiredEnum.Enum2,
                requiredInteger = 41,
                requiredNumber = 42.0
            ),
            EventOptions(deviceId = deviceId, userId = userId)
        )

        verify(client, times(1)).userId = userId
        verify(client, times(1)).deviceId = deviceId
        verify(client, times(1)).logEvent(
            eq("Event With All Properties"),
            jsonObjectCaptor.capture()
        )
        assertEquals(
            """{
  "requiredArray": "[Required, array]",
  "requiredBoolean": true,
  "requiredConst": "some-const-value",
  "requiredEnum": "Enum2",
  "requiredInteger": 41,
  "requiredNumber": 42,
  "requiredString": "Required string"
}""", jsonObjectCaptor.value.toString(2)
        )
    }

    @Test
    fun flush() {
        val client = mock(AmplitudeClient::class.java)
        this.ampli.load(appContext, LoadOptions(client = LoadClientOptions(instance = client)))

        this.ampli.flush()

        verify(client, times(1)).uploadEvents()
    }
}