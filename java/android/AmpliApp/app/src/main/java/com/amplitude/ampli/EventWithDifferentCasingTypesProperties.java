//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull java-ampli'
//
// Required dependencies: com.amplitude:android-sdk:2.34.1, com.squareup.okhttp3:okhttp:4.2.2
// Tracking Plan Version: 0
// Build: 1.0.0
//
// [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
//
// [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/java-ampli)
//
package com.amplitude.ampli;

/**
 * Description for case with space
 */
public class EventWithDifferentCasingTypesProperties {
    private EnumWithSpace enumWithSpace;
    private EnumSnakeCase enumSnakeCase;
    private EnumCamelCase enumCamelCase;
    private EnumPascalCase enumPascalCase;
    private String propertyWithSpace;
    private String propertyWithSnakeCase;
    private String propertyWithCamelCase;
    private String propertyWithPascalCase;

    /**
     * Description for enum with space
     */
    public EnumWithSpace getEnumWithSpace() { return enumWithSpace; }
    public void setEnumWithSpace(EnumWithSpace value) { this.enumWithSpace = value; }

    /**
     * description_for_enum_snake_case
     */
    public EnumSnakeCase getEnumSnakeCase() { return enumSnakeCase; }
    public void setEnumSnakeCase(EnumSnakeCase value) { this.enumSnakeCase = value; }

    /**
     * descriptionForEnumCamelCase
     */
    public EnumCamelCase getEnumCamelCase() { return enumCamelCase; }
    public void setEnumCamelCase(EnumCamelCase value) { this.enumCamelCase = value; }

    /**
     * DescirptionForEnumPascalCase
     */
    public EnumPascalCase getEnumPascalCase() { return enumPascalCase; }
    public void setEnumPascalCase(EnumPascalCase value) { this.enumPascalCase = value; }

    /**
     * Description for case with space
     */
    public String getPropertyWithSpace() { return propertyWithSpace; }
    public void setPropertyWithSpace(String value) { this.propertyWithSpace = value; }

    /**
     * Description_for_snake_case
     */
    public String getPropertyWithSnakeCase() { return propertyWithSnakeCase; }
    public void setPropertyWithSnakeCase(String value) { this.propertyWithSnakeCase = value; }

    /**
     * descriptionForCamelCase
     */
    public String getPropertyWithCamelCase() { return propertyWithCamelCase; }
    public void setPropertyWithCamelCase(String value) { this.propertyWithCamelCase = value; }

    /**
     * DescriptionForPascalCase
     */
    public String getPropertyWithPascalCase() { return propertyWithPascalCase; }
    public void setPropertyWithPascalCase(String value) { this.propertyWithPascalCase = value; }
}
