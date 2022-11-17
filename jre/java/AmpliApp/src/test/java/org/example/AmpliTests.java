package org.example;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import com.amplitude.Amplitude;
import com.amplitude.MiddlewareExtra;
import com.amplitude.ampli.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;

public class AmpliTests {
    Ampli ampli;

    private final String userId = "test-ampli-user-id";
    private final String deviceId = "test-ampli-device-id";

    @Captor
    ArgumentCaptor<com.amplitude.Event> eventCaptor;
    @Captor
    ArgumentCaptor<MiddlewareExtra> extraCaptor;

    @BeforeEach
    void setUp() {
        this.ampli = new Ampli();
        this.eventCaptor = ArgumentCaptor.forClass(com.amplitude.Event.class);
        this.extraCaptor = ArgumentCaptor.forClass(MiddlewareExtra.class);
    }

    @Test
    void load() {
        Amplitude client = mock(Amplitude.class);

        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        verify(client, times(0)).init(any());
    }

    @Test
    public void identify() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.identify(
            userId,
            Identify.builder().requiredNumber(42.0).optionalArray(new String[]{"A", "ray"}).build(),
            new EventOptions().setDeviceId(deviceId).setUserId("some-user"),
            extra
        );

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture());

        com.amplitude.Event event = eventCaptor.getValue();
        assertEquals("Identify", event.eventType);
        assertEquals(userId, event.userId);
        assertEquals(deviceId, event.deviceId);
        assertEquals(
            "{\"requiredNumber\":42,\"optionalArray\":[\"A\",\"ray\"]}",
            event.userProperties.toString()
        );
        assertEquals(
            "{abc=123, xyz=987}",
            extraCaptor.getValue().toString()
        );
    }

    @Test
    public void setGroupSingleValue() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.setGroup(
            userId,
            "group-1",
            "value-1",
            new EventOptions().setDeviceId(deviceId).setUserId(userId),
            extra
        );

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture());

        com.amplitude.Event event = eventCaptor.getValue();
        assertEquals("$identify", event.eventType);
        assertEquals(userId, event.userId);
        assertEquals(deviceId, event.deviceId);
        assertEquals(
            "{\"group-1\":\"value-1\"}",
            event.groupProperties.toString()
        );
        assertEquals(
            "{abc=123, xyz=987}",
            extraCaptor.getValue().toString()
        );
    }

    @Test
    public void setGroupMultipleValue() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.setGroup(
            userId,
            "group-1",
            new String[]{"value-1", "value-2", "value-3"},
            new EventOptions().setDeviceId(deviceId).setUserId(userId),
            extra
        );

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture());

        com.amplitude.Event event = eventCaptor.getValue();
        assertEquals("$identify", event.eventType);
        assertEquals(userId, event.userId);
        assertEquals(deviceId, event.deviceId);
        assertEquals(
            "{\"group-1\":[\"value-1\",\"value-2\",\"value-3\"]}",
            event.groupProperties.toString()
        );
        assertEquals(
            "{abc=123, xyz=987}",
            extraCaptor.getValue().toString()
        );
    }

    @Test
    public void trackEventNoProperties() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.eventNoProperties(
            userId,
            new EventOptions().setDeviceId(deviceId).setUserId("some-user"),
            extra
        );

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture());

        com.amplitude.Event event = eventCaptor.getValue();
        assertEquals("Event No Properties", event.eventType);
        assertEquals(userId, event.userId);
        assertEquals(deviceId, event.deviceId);
        assertNull(event.eventProperties);
        assertEquals(
            "{abc=123, xyz=987}",
            extraCaptor.getValue().toString()
        );
    }

    @Test
    public void trackEventWithAllProperties() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        MiddlewareExtra extra = new MiddlewareExtra();
        extra.put("abc", 123);
        extra.put("xyz", "987");

        this.ampli.eventWithAllProperties(
            null,
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

        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture());

        com.amplitude.Event event = eventCaptor.getValue();
        assertEquals("Event With All Properties", event.eventType);
        assertEquals(userId, event.userId);
        assertEquals(deviceId, event.deviceId);
        assertEquals(
            "{\"requiredEnum\":\"Enum2\",\"requiredArray\":[\"Required\",\"array\"],\"requiredNumber\":42,\"requiredConst\":\"some-const-value\",\"requiredBoolean\":true,\"requiredInteger\":41,\"requiredString\":\"Required string\"}",
            event.eventProperties.toString()
        );
        assertEquals(
            "{abc=123, xyz=987}",
            extraCaptor.getValue().toString()
        );
    }

    @Test
    public void flush() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));

        this.ampli.flush();

        verify(client, times(1)).flushEvents();
    }

    @Test
    public void eventOptionsSessionId() {
        Amplitude client = mock(Amplitude.class);
        this.ampli.load(new LoadOptions().setClient(new LoadClientOptions().setInstance(client)));
        this.ampli.eventNoProperties(
                userId,
                new EventOptions().setDeviceId(deviceId).setUserId("some-user").setSessionId(999L)
        );
        verify(client, times(1)).logEvent(eventCaptor.capture(), extraCaptor.capture());
        com.amplitude.Event event = eventCaptor.getValue();
        assertEquals(999L, event.sessionId);
    }
}
