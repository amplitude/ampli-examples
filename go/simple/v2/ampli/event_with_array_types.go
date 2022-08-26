package ampli

// EventWithArrayTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types
//
// Description for event with Array Types
//
// Owner: Test codegen.
type EventWithArrayTypes struct {
	*baseEvent
}

func NewEventWithArrayTypes(requiredBooleanArray []bool, requiredNumberArray []float64, requiredObjectArray []interface{}, requiredStringArray []string) *EventWithArrayTypes {
	return &EventWithArrayTypes{
		newBaseEvent("Event With Array Types", map[string]interface{}{
			"requiredBooleanArray": requiredBooleanArray,
			"requiredNumberArray":  requiredNumberArray,
			"requiredObjectArray":  requiredObjectArray,
			"requiredStringArray":  requiredStringArray,
		}),
	}
}
