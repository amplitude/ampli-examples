package com.example.ampliapp;

import com.amplitude.ampli.Identify;
import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.events.EventOptions;
import com.amplitude.core.events.GroupIdentifyEvent;
import com.amplitude.core.events.IdentifyEvent;
import com.amplitude.core.platform.DestinationPlugin;
import com.segment.analytics.Analytics;
import com.segment.analytics.Properties;
import com.segment.analytics.Traits;

import org.json.JSONObject;

import java.util.Map;

public class SegmentDestinationPlugin extends DestinationPlugin {
    android.content.Context context;
    Analytics analytics;
    public SegmentDestinationPlugin(android.content.Context appContext) {
        this.context = appContext;
    }
    @Override
     public void setup(Amplitude amplitude) {
        super.setup(amplitude);
        analytics = new Analytics.Builder(this.context, "YOUR-SEGMENT-API-KEY")
                .build();

        Analytics.setSingletonInstance(analytics);
    }

    @Override
    public BaseEvent track(BaseEvent payload) {
        Properties properties = new Properties();
        Map<String, Object> props = payload.getEventProperties();
        for (Map.Entry<String,Object> entry : payload.getEventProperties().entrySet()) {
            properties.putValue(entry.getKey(),entry.getValue());
        }
        analytics.track(payload.eventType, properties);
        return payload;
    }

    @Override
    public IdentifyEvent identify(IdentifyEvent payload) {
        Traits traits =  new Traits();
        for (Map.Entry<String,Object> entry : payload.getUserProperties().entrySet()) {
            traits.putValue(entry.getKey(), entry.getValue());
        }
        Analytics.with(this.context).identify(traits);

        return payload;
    }

    @Override
    public GroupIdentifyEvent groupIdentify(GroupIdentifyEvent payload) {
        Traits traits =  new Traits();
        String groupId = payload.getGroups().entrySet().iterator().next().getKey();
        for (Map.Entry<String,Object> entry : payload.getGroups().entrySet()) {
            traits.putValue(entry.getKey(),entry.getValue());
        }
        Analytics.with(context).group(groupId, traits);

        return payload;
    }
}