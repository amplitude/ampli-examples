package com.amplitude.ampli

import com.amplitude.common.jvm.ConsoleLogger
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
                jsonObject.put("source_name", sourceName)
            }
            if (!sourceVersion.isNullOrEmpty()) {
                jsonObject.put("source_version", sourceVersion)
            }
        } catch (e: JSONException) {
            ConsoleLogger.logger.error("JSON Serialization of ingestion metadata object failed")
        }
        return jsonObject
    }
}