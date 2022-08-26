package ampli

// EventWithEnumTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types
//
// Description for event with enum types
//
// Owner: Test codegen.
type EventWithEnumTypes struct {
	*baseEvent
}

type EventWithEnumTypesOptionalEnum string

const (
	EventWithEnumTypesOptionalEnumOptionalEnum1 EventWithEnumTypesOptionalEnum = "optional enum 1"
	EventWithEnumTypesOptionalEnumOptionalEnum2 EventWithEnumTypesOptionalEnum = "optional enum 2"
)

type EventWithEnumTypesRequiredEnum string

const (
	EventWithEnumTypesRequiredEnumRequiredEnum1 EventWithEnumTypesRequiredEnum = "required enum 1"
	EventWithEnumTypesRequiredEnumRequiredEnum2 EventWithEnumTypesRequiredEnum = "required enum 2"
)

func NewEventWithEnumTypes(requiredEnum EventWithEnumTypesRequiredEnum) *EventWithEnumTypes {
	return &EventWithEnumTypes{newBaseEvent("Event With Enum Types", map[string]interface{}{
		"required num": requiredEnum,
	})}
}

func (event *EventWithEnumTypes) SetOptionalEnum(optionalEnum EventWithEnumTypesOptionalEnum) *EventWithEnumTypes {
	event.properties["optional enum"] = optionalEnum

	return event
}
