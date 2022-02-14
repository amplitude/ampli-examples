package com.example.ampliapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;

import com.amplitude.ampli.*;
import com.amplitude.api.MiddlewareExtra;

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
            Ampli.getInstance().setGroup("test group", "android-java-ampli");
        });

        Button btnGroupIdentify = this.findViewById(R.id.btn_group_identify);
        btnGroupIdentify.setOnClickListener(v -> {
            Ampli.getInstance().groupIdentify("test group", "android-java-ampli", Group.builder()
                    .requiredBoolean( true)
                    .build());
        });

        Button btnEventWithOptionalProperties = this.findViewById(R.id.btn_optional_properties);
        btnEventWithOptionalProperties.setOnClickListener(v -> {
            MiddlewareExtra extra = new MiddlewareExtra();
            extra.put("extra-key", "extra-value");

            Ampli.getInstance().track(EventWithOptionalProperties.builder()
                    .optionalBoolean(true)
                    .build(), null, extra);
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
    }
}