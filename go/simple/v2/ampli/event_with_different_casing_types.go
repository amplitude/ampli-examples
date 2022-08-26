package ampli

// EventWithDifferentCasingTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes
//
// Description for case with space
//
// Owner: Test codegen.
type EventWithDifferentCasingTypes struct {
	*baseEvent
}

type EventWithDifferentCasingTypesEnumCamelCase string

const EventWithDifferentCasingTypesEnumCamelCaseEnumCamelCase EventWithDifferentCasingTypesEnumCamelCase = "enumCamelCase"

type EventWithDifferentCasingTypesEnumPascalCase string

const EventWithDifferentCasingTypesEnumPascalCaseEnumPascalCase EventWithDifferentCasingTypesEnumPascalCase = "EnumPascalCase"

type EventWithDifferentCasingTypesEnumSnakeCase string

const EventWithDifferentCasingTypesEnumSnakeCaseEnumSnakeCase EventWithDifferentCasingTypesEnumSnakeCase = "enum_snake_case"

type EventWithDifferentCasingTypesEnumWithSpace string

const EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace EventWithDifferentCasingTypesEnumWithSpace = "enum with space"

func NewEventWithDifferentCasingTypes(
	enumCamelCase EventWithDifferentCasingTypesEnumCamelCase,
	enumPascalCase EventWithDifferentCasingTypesEnumPascalCase,
	enumSnakeCase EventWithDifferentCasingTypesEnumSnakeCase,
	enumWithSpace EventWithDifferentCasingTypesEnumWithSpace,
	propertyWithCamelCase string,
	propertyWithPascalCase string,
	propertyWithSnakeCase string,
	propertyWithSpace string,
) *EventWithDifferentCasingTypes {
	return &EventWithDifferentCasingTypes{
		newBaseEvent("event withDifferent_CasingTypes", map[string]interface{}{
			"enumCamelCase":            enumCamelCase,
			"EnumPascalCase":           enumPascalCase,
			"enum_snake_case":          enumSnakeCase,
			"enum with space":          enumWithSpace,
			"propertyWithCamelCase":    propertyWithCamelCase,
			"PropertyWithPascalCase":   propertyWithPascalCase,
			"property_with_snake_case": propertyWithSnakeCase,
			"property with space":      propertyWithSpace,
		}),
	}
}
