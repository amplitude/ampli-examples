package com.amplitude.ampli;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.platform.Plugin;

import java.util.HashMap;
import java.util.Map;

public class SetAmpliExtrasPlugin implements Plugin {
    public com.amplitude.core.Amplitude amplitude;
    @NonNull
    @Override
    public com.amplitude.core.Amplitude getAmplitude() {
        return this.amplitude;
    }

    @Override
    public void setAmplitude(@NonNull com.amplitude.core.Amplitude amplitude) {
        this.amplitude = amplitude;
    }

    @NonNull
    @Override
    public Type getType() {
        return Type.Before;
    }

    @Nullable
    @Override
    public BaseEvent execute(@NonNull BaseEvent baseEvent) {
        Map<String, Object> ampliExtra = new HashMap<>();
        Map<String, String> ingestionMetadataValue = new HashMap<>();
        ingestionMetadataValue.put("sourceName", "android-java-ampli");
        ingestionMetadataValue.put("sourceVersion", "2.0.0");
        Map<String, Map<String, String>> ingestionMetadataMap = new HashMap<>();
        ingestionMetadataMap.put("ingestionMetadata", ingestionMetadataValue);
        ampliExtra.put("ampli", ingestionMetadataMap);
        Map<String, Object> extra = baseEvent.getExtra();
        extra.putAll(ampliExtra);
        baseEvent.setExtra(extra);
        return baseEvent;
    }

    @Override
    public void setup(@NonNull com.amplitude.core.Amplitude amplitude) {
        this.amplitude = amplitude;
    }
}