package com.example.ampliapp

import android.content.Context
import com.amplitude.core.platform.DestinationPlugin
import com.segment.analytics.Analytics
import com.segment.analytics.Properties
import com.segment.analytics.Traits

class SegmentDestinationPlugin(appContext: Context, segmentApiKey: String) : DestinationPlugin() {
    val context: Context = appContext;
    var analytics: Analytics? = null;
    val SEGMENT_API_KEY = segmentApiKey;

    override fun setup(amplitude: com.amplitude.core.Amplitude) {
        super.setup(amplitude)
        analytics = Analytics.Builder(context, SEGMENT_API_KEY).build()
    }

    override fun track(payload: com.amplitude.core.events.BaseEvent): com.amplitude.core.events.BaseEvent {
        val eventProperties : Properties =  Properties();
        payload.eventProperties?.forEach { entry -> entry.value?.let {
            eventProperties.put(entry.key,
                it
            )
        } }

        analytics?.track(payload.eventType, eventProperties);
        return payload
    }

    override fun identify(payload: com.amplitude.core.events.IdentifyEvent): com.amplitude.core.events.IdentifyEvent {
        val traits = Traits()
        payload.userProperties?.forEach { entry -> entry.value?.let {
            traits.put(entry.key,
                it
            )
        } }

        Analytics.with(context).identify(traits)
        return payload
    }

    override fun groupIdentify(payload: com.amplitude.core.events.GroupIdentifyEvent): com.amplitude.core.events.GroupIdentifyEvent {
        val traits = Traits()
        val groupId: String? = payload.groups?.keys?.first()

        payload.groupProperties?.forEach { entry -> entry.value?.let {
            traits.put(entry.key,
                it
            )
        } }

        if (groupId != null) {
            Analytics.with(context).group(groupId, traits)
        }

        return payload
    }


}