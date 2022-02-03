package org.example;

import com.amplitude.*;

import org.json.JSONException;

public class LoggingMiddleware implements Middleware {
    @Override
    public void run(MiddlewarePayload payload, MiddlewareNext next) {
        String eventType = null;
        String eventProperties = null;
        if (payload.event != null) {
            eventType = payload.event.eventType;
            if (payload.event.eventProperties != null) {
                try {
                    eventProperties = payload.event.eventProperties.toString(2);
                } catch (JSONException e) {
                    System.err.println(e.toString());
                }
            }
        }

        String extra = null;
        if (payload.extra != null) {
            extra = payload.extra.toString();
        }

        System.out.printf("[ampli] event=%s, properties=%s, extra=%s%n", eventType, eventProperties, extra);

        next.run(payload);
    }
}
