package com.example.ampliapp;

import android.content.Context;

import androidx.test.platform.app.InstrumentationRegistry;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.junit.MockitoJUnitRunner;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.amplitude.ampli.Ampli;
import com.amplitude.ampli.EventOptions;
import com.amplitude.ampli.EventWithAllPropertiesProperties;
import com.amplitude.ampli.EventWithAllPropertiesRequiredEnum;
import com.amplitude.ampli.IdentifyProperties;
import com.amplitude.ampli.LoadClientOptions;
import com.amplitude.ampli.LoadOptions;
import com.amplitude.api.AmplitudeClient;
import com.amplitude.api.Plan;

/**
 * Instrumented test, which will execute on an Android device.
 *
 * @see <a href="http://d.android.com/tools/testing">Testing documentation</a>
 */
@RunWith(MockitoJUnitRunner.class)
public class AmpliTest {
    Ampli ampli;
    Context appContext;

    private final String userId = "test-ampli-user-id";
    private final String deviceId = "test-ampli-device-id";

    @Captor
    ArgumentCaptor<JSONObject> jsonObjectCaptor;

    @Before
    public void setUp() {
        // Context of the app under test.
        this.appContext = InstrumentationRegistry.getInstrumentation().getTargetContext();

        this.ampli = new Ampli();
    }

    @Test
    public void load() {
        AmplitudeClient client = mock(AmplitudeClient.class);

        Plan plan = new Plan().setBranch("branch-1").setSource("source-1").setVersion("version-1");
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client).setPlan(plan)));

        verify(client, times(0)).initialize(any(), any());
        verify(client, times(1)).setPlan(plan);
    }

    @Test
    public void identify() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        IdentifyProperties properties = new IdentifyProperties();
        properties.setRequiredNumber(42.0);
        properties.setOptionalArray(new String[]{"A", "ray"});
        this.ampli.identify(
                userId,
                properties,
                new EventOptions().setDeviceId(deviceId).setUserId("some-user")
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);

        verify(client, times(1)).setUserProperties(jsonObjectCaptor.capture());
        assertEquals(
                "{\"requiredNumber\":42,\"optionalArray\":[\"A\",\"ray\"]}",
                jsonObjectCaptor.getValue().toString()
        );
    }

    @Test
    public void setGroupSingleValue() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.setGroup(
                "group-1",
                "value-1",
                new EventOptions().setDeviceId(deviceId).setUserId(userId)
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).setGroup("group-1", "value-1");
    }

    @Test
    public void setGroupMultipleValue() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.setGroup(
                "group-1",
                new String[]{"value-1", "value-2", "value-3"},
                new EventOptions().setDeviceId(deviceId).setUserId(userId)
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).setGroup("group-1", new String[]{"value-1", "value-2", "value-3"});
    }

    @Test
    public void trackEventNoProperties() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.eventNoProperties(
                new EventOptions().setDeviceId(deviceId).setUserId(userId)
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).logEvent(eq("Event No Properties"), jsonObjectCaptor.capture());
        assertNull(jsonObjectCaptor.getValue());
    }

    @Test
    public void trackEventWithAllProperties() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        EventWithAllPropertiesProperties properties = new EventWithAllPropertiesProperties();
        properties.setRequiredString("Required string");
        properties.setRequiredArray(new String[] { "Required", "array" });
        properties.setRequiredBoolean(true);
        properties.setRequiredEnum(EventWithAllPropertiesRequiredEnum.ENUM2);
        properties.setRequiredInteger(41);
        properties.setRequiredNumber(42);
        this.ampli.eventWithAllProperties(
                properties,
                new EventOptions().setDeviceId(deviceId).setUserId(userId)
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).logEvent(
                eq("Event With All Properties"),
                jsonObjectCaptor.capture()
        );
        assertEquals(
                "{\"requiredEnum\":\"Enum2\",\"requiredArray\":[\"Required\",\"array\"],\"requiredNumber\":42,\"requiredConst\":\"some-const-value\",\"requiredBoolean\":true,\"requiredInteger\":41,\"requiredString\":\"Required string\"}",
                jsonObjectCaptor.getValue().toString()
        );
    }

    @Test
    public void flush() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.flush();

        verify(client, times(1)).uploadEvents();
    }
}