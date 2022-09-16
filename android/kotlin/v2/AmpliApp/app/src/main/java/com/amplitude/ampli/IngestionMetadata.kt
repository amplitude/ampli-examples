package com.amplitude.ampli

import com.amplitude.common.jvm.ConsoleLogger
import com.amplitude.core.events.IngestionMetadata.Companion.AMP_INGESTION_METADATA_SOURCE_NAME
import com.amplitude.core.events.IngestionMetadata.Companion.AMP_INGESTION_METADATA_SOURCE_VERSION
import org.json.JSONException
import org.json.JSONObject

class IngestionMetadata (sourceName: String, sourceVersion: String) {
     var sourceName : String
     var sourceVersion : String
    init {
        this.sourceName = sourceName
        this.sourceVersion = sourceVersion
    }

    fun toJsonObject(): JSONObject {
        var jsonObject = JSONObject()
        try {
            if (!sourceName.isNullOrEmpty()) {
                jsonObject.put(AMP_INGESTION_METADATA_SOURCE_NAME, sourceName)
            }
            if (!sourceVersion.isNullOrEmpty()) {
                jsonObject.put(AMP_INGESTION_METADATA_SOURCE_VERSION, sourceVersion)
            }
        } catch (e: JSONException) {
            ConsoleLogger.logger.error("JSON Serialization of ingestion metadata object failed")
        }
        return jsonObject
    }
}