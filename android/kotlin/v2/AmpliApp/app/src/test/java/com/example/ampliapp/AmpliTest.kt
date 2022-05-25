package com.example.ampliapp

import android.content.Context
import com.amplitude.ampli.*
import com.amplitude.android.Amplitude
import com.amplitude.core.events.EventOptions
import com.amplitude.core.events.Identify
import org.json.JSONArray
import org.json.JSONObject
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.ArgumentCaptor
import org.mockito.Captor
import org.mockito.Mockito
import org.mockito.Mockito.*
import org.mockito.junit.MockitoJUnitRunner

@RunWith(MockitoJUnitRunner::class)
class AmpliTest {
    lateinit var ampli: Ampli

    private val userId = "test-ampli-user-id"
    private val deviceId = "test-ampli-device-id"

    @Captor
    lateinit var jsonObjectCaptor: ArgumentCaptor<JSONObject>
    @Captor
    lateinit var jsonArrayCaptor: ArgumentCaptor<JSONArray>
    @Captor
    lateinit var identifyCaptor: ArgumentCaptor<Identify>

    @Captor
    private val argCaptor: ArgumentCaptor<Map<String, Any?>>? = null

    @Before
    fun setUp() {
        this.ampli = Ampli()
    }
}
