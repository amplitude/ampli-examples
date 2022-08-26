package ampli

// EventWithOptionalArrayTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types
//
// Description for event with optional array types
//
// Owner: Test codegen.
type EventWithOptionalArrayTypes struct {
	*baseEvent
}

func NewEventWithOptionalArrayTypes() *EventWithOptionalArrayTypes {
	return &EventWithOptionalArrayTypes{newBaseEvent("Event With Optional Array Types", map[string]interface{}{})}
}

func (event *EventWithOptionalArrayTypes) SetOptionalBooleanArray(optionalBooleanArray []bool) *EventWithOptionalArrayTypes {
	event.properties["optionalBooleanArray"] = optionalBooleanArray

	return event
}

func (event *EventWithOptionalArrayTypes) SetOptionalJSONArray(optionalJSONArray []interface{}) *EventWithOptionalArrayTypes {
	event.properties["optionalJSONArray"] = optionalJSONArray

	return event
}

func (event *EventWithOptionalArrayTypes) SetOptionalNumberArray(optionalNumberArray []float64) *EventWithOptionalArrayTypes {
	event.properties["optionalNumberArray"] = optionalNumberArray

	return event
}

func (event *EventWithOptionalArrayTypes) SetOptionalOptionalStringArray(optionalStringArray []string) *EventWithOptionalArrayTypes {
	event.properties["optionalStringArray"] = optionalStringArray

	return event
}
