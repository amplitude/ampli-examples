package com.example.ampliapp

import android.content.Context
import com.amplitude.core.events.GroupIdentifyEvent
import com.amplitude.core.events.IdentifyEvent
import com.amplitude.core.events.BaseEvent
import com.amplitude.core.Amplitude
import com.amplitude.core.platform.DestinationPlugin
import com.segment.analytics.Analytics
import com.segment.analytics.Properties
import com.segment.analytics.Traits

/**
 * The example of how to add the segment destination plugin in order to send event to segment
 * @param appContext the Context
 * @param segmentApiKey the segmentApiKey defined in secrets.xml
 */
class SegmentDestinationPlugin(appContext: Context, segmentApiKey: String) : DestinationPlugin() {
    var analytics: Analytics? = null;
    val context: Context = appContext;
    init {
        analytics = Analytics.Builder(appContext, segmentApiKey).build()
    }

    override fun track(event: BaseEvent): BaseEvent {
        val eventProperties =  Properties();
        event.eventProperties?.forEach { entry -> entry.value?.let {
            eventProperties.put(entry.key,
                it
            )
        } }

        analytics?.track(event.eventType, eventProperties);
        return event
    }

    override fun identify(identifyEvent: IdentifyEvent): IdentifyEvent {
        val traits = Traits()
        identifyEvent.userProperties?.forEach { entry -> entry.value?.let {
            traits.put(entry.key,
                it
            )
        } }

        Analytics.with(context).identify(traits)
        return identifyEvent
    }

    override fun groupIdentify(groupIdentifyEvent: GroupIdentifyEvent): GroupIdentifyEvent {
        val traits = Traits()
        val groupId: String? = groupIdentifyEvent.groups?.keys?.first()

        groupIdentifyEvent.groupProperties?.forEach { entry -> entry.value?.let {
            traits.put(entry.key,
                it
            )
        } }

        if (groupId != null) {
            Analytics.with(context).group(groupId, traits)
        }

        return groupIdentifyEvent
    }
}