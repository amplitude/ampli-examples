package ampli

// EventNoProperties
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties
//
// Event w no properties description
//
// Owner: Test codegen.
type EventNoProperties struct {
	*baseEvent
}

func NewEventNoProperties() *EventNoProperties {
	return &EventNoProperties{
		newBaseEvent("Event No Properties", map[string]interface{}{}),
	}
}
