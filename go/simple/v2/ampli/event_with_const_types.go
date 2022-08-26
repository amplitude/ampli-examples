package ampli

// EventWithConstTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types
//
// Description for event with const types
//
// Owner: Test codegen.
type EventWithConstTypes struct {
	*baseEvent
}

func NewEventWithConstTypes() *EventWithConstTypes {
	return &EventWithConstTypes{
		newBaseEvent("Event With Const Types", map[string]interface{}{
			"Boolean Const":            true,
			"Integer Const":            10,
			"Number Const":             2.2,
			"String Const":             "String-Constant",
			"String Const WIth Quotes": "\"String \"Const With\" Quotes\"",
			"String Int Const":         0,
		}),
	}
}
