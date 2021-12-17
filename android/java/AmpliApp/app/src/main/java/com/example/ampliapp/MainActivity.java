package com.example.ampliapp;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.widget.Button;

import com.amplitude.ampli.*;

public class MainActivity extends AppCompatActivity {
    private final String userId = "ampli-java-user-id";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Button btnIdentify = this.findViewById(R.id.btn_identify);
        btnIdentify.setOnClickListener(v -> {
            Ampli.getInstance().identify(userId, Identify.requiredNumber(42.0).build());
        });

        Button btnEventWithOptionalProperties = this.findViewById(R.id.btn_optional_properties);
        btnEventWithOptionalProperties.setOnClickListener(v -> {
            Ampli.getInstance().track(EventWithOptionalProperties
                    .optionalBoolean(true)
                    .build()
            );
        });

        Button btnEventWithAllProperties = this.findViewById(R.id.btn_all_properties);
        btnEventWithAllProperties.setOnClickListener(v -> {
            Ampli.getInstance().eventWithAllProperties(EventWithAllProperties
                    .requiredArray(new String[]{"I'm", "required"})
                    .requiredBoolean(false)
                    .requiredEnum(EventWithAllPropertiesRequiredEnum.ENUM1)
                    .requiredInteger(42)
                    .requiredNumber(1.23)
                    .requiredString("Hi!")
                    .build());
        });
    }
}