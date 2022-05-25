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

            ampli.track(EventWithOptionalProperties(
                optionalBoolean = true,
            ))
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

        val btnOtherEvents = findViewById<Button>(R.id.btn_other_events)
        btnOtherEvents.setOnClickListener {
            ampli.eventMaxIntForTest(
                intMax10 = 9
            )

            ampli.eventNoProperties()

            ampli.eventWithConstTypes()

            ampli.eventWithArrayTypes(
                requiredBooleanArray = arrayOf(true, false, true),
                requiredNumberArray = arrayOf(1.1, 2.2, 3.3),
                requiredStringArray = arrayOf("a", "bc", "def"),
                requiredObjectArray = arrayOf(1, "a", true)
            )

            ampli.eventObjectTypes(
                requiredObject = 3,
                requiredObjectArray = arrayOf(1, "a", true)
            )

            ampli.eventWithEnumTypes(
                requiredEnum = EventWithEnumTypes.RequiredEnum.REQUIRED_ENUM_2
            )

            ampli.eventWithOptionalArrayTypes(
                optionalBooleanArray = arrayOf(false, true)
            )

            ampli.eventWithDifferentCasingTypes(
                enumCamelCase = EventWithDifferentCasingTypes.EnumCamelCase.ENUM_CAMEL_CASE,
                enumPascalCase = EventWithDifferentCasingTypes.EnumPascalCase.ENUM_PASCAL_CASE,
                enumSnakeCase = EventWithDifferentCasingTypes.EnumSnakeCase.ENUM_SNAKE_CASE,
                enumWithSpace = EventWithDifferentCasingTypes.EnumWithSpace.ENUM_WITH_SPACE,
                propertyWithCamelCase = "property with camel case",
                propertyWithPascalCase = "property with pascal case",
                propertyWithSnakeCase = "property with snake case",
                propertyWithSpace = "property with space"
            )
        }
    }
}