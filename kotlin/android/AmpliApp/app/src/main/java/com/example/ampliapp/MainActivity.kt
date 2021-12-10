package com.example.ampliapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import com.amplitude.ampli.*

class MainActivity : AppCompatActivity() {
    private val userId: String = "ampli-kotlin-user-id"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val btnIdentify = findViewById<Button>(R.id.btn_identify)
        btnIdentify.setOnClickListener {
            ampli.identify(userId, IdentifyProperties(
                requiredNumber = 42.0,
            ))
        }

        val btnEventWithOptionalProperties = findViewById<Button>(R.id.btn_optional_properties)
        btnEventWithOptionalProperties.setOnClickListener {
            ampli.track(EventWithOptionalProperties(EventWithOptionalPropertiesProperties(
                optionalBoolean = true,
            )))
        }

        val btnEventWithAllProperties = findViewById<Button>(R.id.btn_all_properties)
        btnEventWithAllProperties.setOnClickListener {
            ampli.eventWithAllProperties(EventWithAllPropertiesProperties(
                requiredNumber = 1.23,
                requiredArray = listOf("I'm", "required"),
                requiredBoolean = false,
                requiredEnum = RequiredEnum.Enum1,
                requiredInteger = 42,
                requiredString = "Hi!"
            ))
        }
    }
}