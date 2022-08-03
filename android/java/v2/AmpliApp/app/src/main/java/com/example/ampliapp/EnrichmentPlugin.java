package com.example.ampliapp;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.platform.Plugin;

import java.util.HashMap;

public class EnrichmentPlugin implements Plugin {
    public Amplitude amplitude;
    @NonNull
    @Override
    public Amplitude getAmplitude() {
        return this.amplitude;
    }

    @Override
    public void setAmplitude(@NonNull Amplitude amplitude) {
        this.amplitude = amplitude;
    }

    @NonNull
    @Override
    public Type getType() {
        return Type.Enrichment;
    }

    @Nullable
    @Override
    public BaseEvent execute(@NonNull BaseEvent baseEvent) {
        if (baseEvent.getEventProperties() == null) {
            baseEvent.setEventProperties(new HashMap<String, Object>());
        }
        baseEvent.getEventProperties().put("custom android event property", "test");
        return baseEvent;
    }

    @Override
    public void setup(@NonNull Amplitude amplitude) {
        this.amplitude = amplitude;
    }
}