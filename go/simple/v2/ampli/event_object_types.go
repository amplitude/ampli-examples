package ampli

// EventObjectTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types
//
// Event with Object and Object Array
//
// Owner: Test codegen.
type EventObjectTypes struct {
	*baseEvent
}

func NewEventObjectTypes(requiredObject interface{}, requiredObjectArray []interface{}) *EventObjectTypes {
	return &EventObjectTypes{
		newBaseEvent("Event Object Types", map[string]interface{}{
			"requiredObject":      requiredObject,
			"requiredObjectArray": requiredObjectArray,
		}),
	}
}
