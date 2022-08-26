package ampli

// EventWithAllProperties
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types
//
// Event with all properties
//
// Owner: Test codegen.
type EventWithAllProperties struct {
	*baseEvent
}

type EventWithAllPropertiesRequiredEnum string

const (
	EventWithAllPropertiesRequiredEnumEnum1 EventWithAllPropertiesRequiredEnum = "Enum1"
	EventWithAllPropertiesRequiredEnumEnum2 EventWithAllPropertiesRequiredEnum = "Enum2"
)

func NewEventWithAllProperties(requiredArray []string, requiredBool bool, requiredEnum EventWithAllPropertiesRequiredEnum, requiredInteger int, requiredNumber float64, requiredString string) *EventWithAllProperties {
	return &EventWithAllProperties{
		newBaseEvent("Event With All Properties", map[string]interface{}{
			"requiredArray":   requiredArray,
			"requiredBool":    requiredBool,
			"requiredEnum":    requiredEnum,
			"requiredInteger": requiredInteger,
			"requiredNumber":  requiredNumber,
			"requiredString":  requiredString,
		}),
	}
}

func (event *EventWithAllProperties) SetOptionalString(optionalString string) *EventWithAllProperties {
	event.properties["optionalString"] = optionalString

	return event
}

func (event *EventWithAllProperties) SetOptionalBool(optionalBool bool) *EventWithAllProperties {
	event.properties["optionalBool"] = optionalBool

	return event
}
