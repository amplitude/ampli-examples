//
// The example of destination plugin
// This destination plugin will also send event to Segment
//
package com.example.ampliapp

import android.content.Context
import com.amplitude.core.events.GroupIdentifyEvent
import com.amplitude.core.events.IdentifyEvent
import com.amplitude.core.events.BaseEvent
import com.amplitude.core.platform.DestinationPlugin
import com.segment.analytics.Analytics
import com.segment.analytics.Properties
import com.segment.analytics.Traits

/**
 * Segment destination plugin
 * @param appContext the Context
 * @param writeKey the segmentWriteKey defined in secrets.xml
 */
class SegmentDestinationPlugin(appContext: Context, writeKey: String) : DestinationPlugin() {
    var analytics: Analytics? = null
    val context: Context = appContext
    init {
        analytics = Analytics.Builder(appContext, writeKey).build()
    }

    override fun track(payload: BaseEvent): BaseEvent {
        val eventProperties =  Properties()
        payload.eventProperties?.forEach { entry -> entry.value?.let {
            eventProperties.put(entry.key,
                it
            )
        } }

        analytics?.track(payload.eventType, eventProperties)
        return payload
    }

    override fun identify(payload: IdentifyEvent): IdentifyEvent {
        val traits = Traits()
        payload.userProperties?.forEach { entry -> entry.value?.let {
            traits.put(entry.key,
                it
            )
        } }

        Analytics.with(context).identify(traits)
        return payload
    }

    override fun groupIdentify(payload: GroupIdentifyEvent): GroupIdentifyEvent {
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