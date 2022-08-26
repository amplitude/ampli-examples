package ampli

// EventMaxIntForTest
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest
//
// Event to test schema validation
//
// Owner: Test codegen.
type EventMaxIntForTest struct {
	*baseEvent
}

func NewEventMaxIntForTest(intMax10 int) *EventMaxIntForTest {
	return &EventMaxIntForTest{
		newBaseEvent("EventMaxIntForTest", map[string]interface{}{
			"intMax10": intMax10,
		}),
	}
}
