package com.example.ampliapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.amplitude.ampli.*
import com.amplitude.api.MiddlewareExtra

class MainActivity : AppCompatActivity() {
    private val userId: String = "ampli-kotlin-user-id"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnIdentify = findViewById<Button>(R.id.btn_identify)
        btnIdentify.setOnClickListener {
            ampli.identify(userId, Identify(
                requiredNumber = 42.0,
            ))
        }

        val btnSetGroup = findViewById<Button>(R.id.btn_set_group)
        btnSetGroup.setOnClickListener {
            ampli.setGroup("test group", "android-kotlin-ampli")
        }

        val btnGroupIdentify = findViewById<Button>(R.id.btn_group_identify)
        btnGroupIdentify.setOnClickListener {
            ampli.groupIdentify("test group", "android-kotlin-ampli", Group(requiredBoolean = true))
        }

        val btnEventWithOptionalProperties = findViewById<Button>(R.id.btn_optional_properties)
        btnEventWithOptionalProperties.setOnClickListener {
            val extra = MiddlewareExtra(mapOf("extra-key" to "extra-value"))

            ampli.track(EventWithOptionalProperties(
                optionalBoolean = true,
            ), extra = extra)
        }

        val btnEventWithAllProperties = findViewById<Button>(R.id.btn_all_properties)
        btnEventWithAllProperties.setOnClickListener {
            ampli.eventWithAllProperties(
                requiredNumber = 1.23,
                requiredArray = arrayOf("I'm", "required"),
                requiredBoolean = false,
                requiredEnum = EventWithAllProperties.RequiredEnum.ENUM_1,
                requiredInteger = 42,
                requiredString = "Hi!"
            )
        }
    }
}