package com.amplitude.ampli

import org.json.JSONObject

class IngestionMetadata (var sourceName: String, var sourceVersion: String) {

    fun toJsonObject(): JSONObject {
        var jsonObject = JSONObject()
        jsonObject.put("source_name", sourceName)
        jsonObject.put("source_version", sourceVersion)

        return jsonObject
    }
}