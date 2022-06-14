package com.example.ampliapp;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import android.content.Context;
import android.media.metrics.Event;

import com.amplitude.ampli.Ampli;
import com.amplitude.ampli.EventWithAllProperties;
import com.amplitude.ampli.Group;
import com.amplitude.ampli.Identify;
import com.amplitude.ampli.LoadClientOptions;
import com.amplitude.ampli.LoadOptions;
import com.amplitude.android.Amplitude;
import com.amplitude.android.events.BaseEvent;
import com.amplitude.android.events.EventOptions;
import com.amplitude.android.events.Plan;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.kotlin.KArgumentCaptor;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Map;

@RunWith(MockitoJUnitRunner.class)
public class AmpliTest {
    Ampli ampli;

    private final String userId = "test-ampli-user-id";
    private final String deviceId = "test-ampli-device-id";

    ArgumentCaptor<BaseEvent> eventCaptor = ArgumentCaptor.forClass(BaseEvent.class);
    ArgumentCaptor<EventOptions> optionsCaptor = ArgumentCaptor.forClass(EventOptions.class);
    ArgumentCaptor<String[]> stringArrayCaptor = ArgumentCaptor.forClass(String[].class);

    @Before
    public void setUp() {
        this.ampli = new Ampli();
    }

    @Test
    public void load() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);


        Plan plan = new Plan("branch-1", "source-1", "version-1", "version-1-id");
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client).setPlan(plan)));

        verify(client, times(0)).build();
    }

    @Test
    public void identify() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));
        EventOptions eventOptions = new EventOptions();
        eventOptions.setDeviceId(deviceId);
        eventOptions.setUserId(userId);
        this.ampli.identify(
                userId,
                Identify.builder().requiredNumber(42.0).optionalArray(new String[]{"A", "ray"}).build(),
                eventOptions
        );

        verify(client, times(1)).setUserId(userId);
        verify(client, times(1)).setDeviceId(deviceId);

        verify(client, times(1)).track(eventCaptor.capture(), any());
        assertEquals(
                "{\"requiredNumber\":42,\"optionalArray\":[\"A\",\"ray\"]}",
                new JSONObject(eventCaptor.getValue().getUserProperties()).toString()
        );
    }

    @Test
    public void setGroupSingleValue() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        EventOptions eventOptions = new EventOptions();
        eventOptions.setDeviceId(deviceId);
        eventOptions.setUserId(userId);
        this.ampli.setGroup(
                "group-1",
                "value-1",
                eventOptions
        );

        verify(client, times(1)).setGroup(eq("group-1"), eq("value-1"), optionsCaptor.capture());

        assertEquals(
                userId,
                optionsCaptor.getValue().getUserId()
        );
        assertEquals(
                deviceId,
                optionsCaptor.getValue().getDeviceId()
        );
    }

 @Test
    public void setGroupMultipleValue() throws JSONException {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        EventOptions eventOptions = new EventOptions();
        eventOptions.setDeviceId(deviceId);
        eventOptions.setUserId(userId);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.setGroup(
                "group-1",
                new String[]{"value-1", "value-2", "value-3"},
                eventOptions
        );


        verify(client, times(1)).setGroup(eq("group-1"), stringArrayCaptor.capture(), optionsCaptor.capture());

         assertEquals(
                "[\"value-1\",\"value-2\",\"value-3\"]",
                 new JSONArray(stringArrayCaptor.getValue()).toString()
        );
        assertEquals(
             userId,
             optionsCaptor.getValue().getUserId()
        );
        assertEquals(
             deviceId,
             optionsCaptor.getValue().getDeviceId()
        );
 }

    @Test
    public void groupIdentify() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        EventOptions eventOptions = new EventOptions();
        eventOptions.setDeviceId(deviceId);
        eventOptions.setUserId(userId);
        this.ampli.groupIdentify(
                "group-type-1",
                "group-name-1",
                Group.builder().requiredBoolean(false).optionalString("test-string").build(),
                eventOptions
        );

       verify(client, times(1)).track(eventCaptor.capture(), any());

        assertEquals(
                "{\"requiredBoolean\":false,\"optionalString\":\"test-string\"}",
                new JSONObject(eventCaptor.getValue().getUserProperties()).toString()
        );
        assertEquals(
                "{\"group-type-1\":\"group-name-1\"}",
                new JSONObject(eventCaptor.getValue().getGroups()).toString()
        );
    }

    @Test
    public void trackEventNoProperties() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        EventOptions eventOptions = new EventOptions();
        eventOptions.setDeviceId(deviceId);
        eventOptions.setUserId(userId);
        this.ampli.eventNoProperties(eventOptions);

        verify(client, times(1)).track(
                eventCaptor.capture(),
                optionsCaptor.capture()
        );
        assertEquals(
                userId,
                optionsCaptor.getValue().getUserId()
        );
        assertEquals(
                deviceId,
                optionsCaptor.getValue().getDeviceId()
        );
        assertEquals(
                "Event No Properties",
                 eventCaptor.getValue().getEventType()
        );
        assertEquals("{}", new JSONObject(eventCaptor.getValue().getEventProperties()).toString());
    }

    @Test
    public void trackEventWithAllProperties() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        EventOptions eventOptions = new EventOptions();
        eventOptions.setDeviceId(deviceId);
        eventOptions.setUserId(userId);
        this.ampli.eventWithAllProperties(
                EventWithAllProperties.builder()
                        .requiredArray(new String[]{"Required", "array"})
                        .requiredBoolean(true)
                        .requiredEnum(EventWithAllProperties.RequiredEnum.ENUM2)
                        .requiredInteger(41)
                        .requiredNumber(42.0)
                        .requiredString("Required string")
                        .build(),
                eventOptions
        );

        verify(client, times(1)).track(
                eventCaptor.capture(),
                optionsCaptor.capture()
        );

        assertEquals(
                userId,
                optionsCaptor.getValue().getUserId()
        );
        assertEquals(
                deviceId,
                optionsCaptor.getValue().getDeviceId()
        );
        assertEquals(
                "Event With All Properties",
                eventCaptor.getValue().getEventType()
        );
        assertEquals(
                "{\"requiredEnum\":\"Enum2\",\"requiredArray\":[\"Required\",\"array\"],\"requiredNumber\":42,\"requiredConst\":\"some-const-value\",\"requiredBoolean\":true,\"requiredInteger\":41,\"requiredString\":\"Required string\"}",
                new JSONObject(eventCaptor.getValue().getEventProperties()).toString()
        );
    }

    @Test
    public void flush() {
        Amplitude client = mock(Amplitude.class);
        Context appContext = mock(Context.class);
        this.ampli.load(appContext, new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.flush();

        verify(client, times(1)).flush();
    }
}
