package com.example.ampliapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;

import com.amplitude.ampli.*;

import java.util.HashMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {
    private final String userId = "ampli-java-user-id";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnIdentify = this.findViewById(R.id.btn_identify);
        btnIdentify.setOnClickListener(v -> {
            Ampli.getInstance().identify(userId, Identify.builder()
                    .requiredNumber(42.0)
                    .build());
        });

        Button btnSetGroup = this.findViewById(R.id.btn_set_group);
        btnSetGroup.setOnClickListener(v -> {
            Ampli.getInstance().getClient().setGroup("test group", "android-java-ampli");
        });

        Button btnGroupIdentify = this.findViewById(R.id.btn_group_identify);
        btnGroupIdentify.setOnClickListener(v -> {
            Map<String, Object> groupProperties = new HashMap<String, Object>() {{
                put("requiredBoolean", true);
            }};
            Ampli.getInstance().getClient().groupIdentify("test group", "android-java-ampli", groupProperties);
        });

        Button btnEventWithOptionalProperties = this.findViewById(R.id.btn_optional_properties);
        btnEventWithOptionalProperties.setOnClickListener(v -> {
            Ampli.getInstance().track(EventWithOptionalProperties.builder()
                    .optionalBoolean(true)
                    .build(), null);
        });

        Button btnEventWithAllProperties = this.findViewById(R.id.btn_all_properties);
        btnEventWithAllProperties.setOnClickListener(v -> {
            Ampli.getInstance().eventWithAllProperties(EventWithAllProperties.builder()
                    .requiredArray(new String[]{"I'm", "required"})
                    .requiredBoolean(false)
                    .requiredEnum(EventWithAllProperties.RequiredEnum.ENUM1)
                    .requiredInteger(42)
                    .requiredNumber(1.23)
                    .requiredString("Hi!")
                    .build());
        });

        Button btnOtherEvents = this.findViewById(R.id.btn_other_events);
        btnOtherEvents.setOnClickListener(v -> {
            Ampli.getInstance().eventMaxIntForTest(EventMaxIntForTest.builder()
                    .intMax10(9)
                    .build());

            Ampli.getInstance().eventNoProperties();

            Ampli.getInstance().eventWithConstTypes();

            Ampli.getInstance().eventWithArrayTypes(EventWithArrayTypes.builder()
                    .requiredBooleanArray(new Boolean[]{true, false, true})
                    .requiredEnumArray(new String[]{"enum1"})
                    .requiredNumberArray(new Double[]{1.1, 2.2, 3.3})
                    .requiredObjectArray(new Object[]{1, "a", true})
                    .requiredStringArray(new String[]{"a", "bc", "def"})
                    .build());

            Ampli.getInstance().eventObjectTypes(EventObjectTypes.builder()
                    .requiredObject("abc")
                    .requiredObjectArray(new Object[]{1, "a", true})
                    .build());

            Ampli.getInstance().eventWithEnumTypes(EventWithEnumTypes.builder()
                    .requiredEnum(EventWithEnumTypes.RequiredEnum.REQUIRED_ENUM_2)
                    .build());

            Ampli.getInstance().eventWithOptionalArrayTypes(EventWithOptionalArrayTypes.builder()
                    .optionalBooleanArray(new Boolean[]{false, true})
                    .build());

            Ampli.getInstance().eventWithDifferentCasingTypes(EventWithDifferentCasingTypes.builder()
                    .enumCamelCase(EventWithDifferentCasingTypes.EnumCamelCase.ENUMCAMELCASE)
                    .enumPascalCase(EventWithDifferentCasingTypes.EnumPascalCase.ENUMPASCALCASE)
                    .enumSnakeCase(EventWithDifferentCasingTypes.EnumSnakeCase.ENUM_SNAKE_CASE)
                    .enumWithSpace(EventWithDifferentCasingTypes.EnumWithSpace.ENUM_WITH_SPACE)
                    .propertyWithCamelCase("property with camel case")
                    .propertyWithPascalCase("property with pascal case")
                    .propertyWithSnakeCase("property with snake case")
                    .propertyWithSpace("property with space")
                    .build());

            Ampli.getInstance().eventWithTemplateProperties(EventWithTemplateProperties.builder()
                    .requiredEventProperty("event property")
                    .requiredTemplateProperty("template property")
                    .optionalEventProperty(1.23)
                    .build());
        });
    }
}