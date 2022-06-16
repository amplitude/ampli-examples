package com.example.ampliapp;

import com.amplitude.core.Amplitude;
import com.amplitude.core.events.BaseEvent;
import com.amplitude.core.events.GroupIdentifyEvent;
import com.amplitude.core.events.IdentifyEvent;
import com.amplitude.core.platform.DestinationPlugin;
import com.segment.analytics.Analytics;
import com.segment.analytics.Properties;
import com.segment.analytics.Traits;

import java.util.Map;

public class SegmentDestinationPlugin extends DestinationPlugin {
    android.content.Context context;
    Analytics analytics;
    String SEGMENT_API_KEY;
    public SegmentDestinationPlugin(android.content.Context appContext, String segmentAPIKey) {
        this.context = appContext;
        this.SEGMENT_API_KEY = segmentAPIKey;
    }
    @Override
     public void setup(Amplitude amplitude) {
        super.setup(amplitude);
        analytics = new Analytics.Builder(this.context, SEGMENT_API_KEY)
                .build();

        Analytics.setSingletonInstance(analytics);
    }

    @Override
    public BaseEvent track(BaseEvent event) {
        Properties properties = new Properties();
        for (Map.Entry<String,Object> entry : event.getEventProperties().entrySet()) {
            properties.putValue(entry.getKey(),entry.getValue());
        }
        analytics.track(event.eventType, properties);
        return event;
    }

    @Override
    public IdentifyEvent identify(IdentifyEvent identifyEvent) {
        Traits traits =  new Traits();
        for (Map.Entry<String,Object> entry : identifyEvent.getUserProperties().entrySet()) {
            traits.putValue(entry.getKey(), entry.getValue());
        }
        Analytics.with(this.context).identify(traits);

        return identifyEvent;
    }

    @Override
    public GroupIdentifyEvent groupIdentify(GroupIdentifyEvent groupIdentifyEvent) {
        Traits traits =  new Traits();
        String groupId = groupIdentifyEvent.getGroups().entrySet().iterator().next().getKey();
        for (Map.Entry<String,Object> entry : groupIdentifyEvent.getGroups().entrySet()) {
            traits.putValue(entry.getKey(),entry.getValue());
        }
        Analytics.with(context).group(groupId, traits);

        return groupIdentifyEvent;
    }
}