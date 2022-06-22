package com.example.ampliapp;

import com.amplitude.api.*;

import org.json.JSONException;

public class LoggingMiddleware implements Middleware {
    @Override
    public void run(MiddlewarePayload payload, MiddlewareNext next) {
        String event = null;
        if (payload.event != null) {
            try {
                event = payload.event.toString(2);
            } catch (JSONException e) {
                System.err.println(e.toString());
            }
        }

        String extra = null;
        if (payload.extra != null) {
            extra = payload.extra.toString();
        }

        System.out.printf("[ampli] event=%s, extra=%s%n", event, extra);

        next.run(payload);
    }
}
