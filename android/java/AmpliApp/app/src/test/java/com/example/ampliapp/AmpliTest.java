package com.example.ampliapp;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import android.content.Context;

import com.amplitude.ampli.Ampli;
import com.amplitude.ampli.EventOptions;
import com.amplitude.ampli.EventWithAllProperties;
import com.amplitude.ampli.Identify;
import com.amplitude.ampli.LoadClientOptions;
import com.amplitude.ampli.LoadOptions;
import com.amplitude.api.AmplitudeClient;
import com.amplitude.api.MiddlewareExtra;
import com.amplitude.api.Plan;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class AmpliTest {
    Ampli ampli;

    private final String userId = "test-ampli-user-id";
    private final String deviceId = "test-ampli-device-id";

    @Captor
    ArgumentCaptor<JSONObject> jsonObjectCaptor;
    @Captor
    ArgumentCaptor<JSONArray> jsonArrayCaptor;
    @Captor
    ArgumentCaptor<MiddlewareExtra> extraCaptor;

    @Before
    public void setUp() {
        this.ampli = new Ampli();
    }

    @Test
    public void load() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);

        Plan plan = new Plan().setBranch("branch-1").setSource("source-1").setVersion("version-1");
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client).setPlan(plan)));

        verify(client, times(0)).initialize(any(), any());
        verify(client, times(1)).setPlan(plan);
    }

    @Test
    public void identify() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.identify(
                userId,
                Identify.builder().requiredNumber(42.0).optionalArray(new String[]{"A", "ray"}).build(),
                new EventOptions().setDeviceId(deviceId).setUserId("some-user"),
                extra
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);

        verify(client, times(1)).setUserProperties(jsonObjectCaptor.capture(), extraCaptor.capture());
        assertEquals(
                "{\"requiredNumber\":42,\"optionalArray\":[\"A\",\"ray\"]}",
                jsonObjectCaptor.getValue().toString()
        );
        assertEquals(
                "{abc=123, xyz=987}",
                extraCaptor.getValue().toString()
        );
    }

    @Test
    public void setGroupSingleValue() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.setGroup(
                "group-1",
                "value-1",
                new EventOptions().setDeviceId(deviceId).setUserId(userId),
                extra
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).setGroup(eq("group-1"), eq("value-1"), extraCaptor.capture());
        assertEquals(
                "{abc=123, xyz=987}",
                extraCaptor.getValue().toString()
        );
    }

    @Test
    public void setGroupMultipleValue() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.setGroup(
                "group-1",
                new String[]{"value-1", "value-2", "value-3"},
                new EventOptions().setDeviceId(deviceId).setUserId(userId),
                extra
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).setGroup(eq("group-1"), jsonArrayCaptor.capture(), extraCaptor.capture());
        assertEquals(
                "[\"value-1\",\"value-2\",\"value-3\"]",
                jsonArrayCaptor.getValue().toString()
        );
        assertEquals(
                "{abc=123, xyz=987}",
                extraCaptor.getValue().toString()
        );
    }

    @Test
    public void trackEventNoProperties() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.eventNoProperties(
                new EventOptions().setDeviceId(deviceId).setUserId(userId),
                extra
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).logEvent(
                eq("Event No Properties"),
                jsonObjectCaptor.capture(),
                extraCaptor.capture()
        );
        assertNull(jsonObjectCaptor.getValue());
        assertEquals(
                "{abc=123, xyz=987}",
                extraCaptor.getValue().toString()
        );
    }

    @Test
    public void trackEventWithAllProperties() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.eventWithAllProperties(
                EventWithAllProperties.builder()
                        .requiredArray(new String[]{"Required", "array"})
                        .requiredBoolean(true)
                        .requiredEnum(EventWithAllProperties.RequiredEnum.ENUM2)
                        .requiredInteger(41)
                        .requiredNumber(42.0)
                        .requiredString("Required string")
                        .build(),
                new EventOptions().setDeviceId(deviceId).setUserId(userId),
                extra
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);
        verify(client, times(1)).logEvent(
                eq("Event With All Properties"),
                jsonObjectCaptor.capture(),
                extraCaptor.capture()
        );
        assertEquals(
                "{\"requiredEnum\":\"Enum2\",\"requiredArray\":[\"Required\",\"array\"],\"requiredNumber\":42,\"requiredConst\":\"some-const-value\",\"requiredBoolean\":true,\"requiredInteger\":41,\"requiredString\":\"Required string\"}",
                jsonObjectCaptor.getValue().toString()
        );
        assertEquals(
                "{abc=123, xyz=987}",
                extraCaptor.getValue().toString()
        );
    }

    @Test
    public void flush() {
        AmplitudeClient client = mock(AmplitudeClient.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.flush();

        verify(client, times(1)).uploadEvents();
    }
}
