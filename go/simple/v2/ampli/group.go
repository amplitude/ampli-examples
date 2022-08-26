package ampli

import "github.com/amplitude/analytics-go/amplitude"

// Group
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Group
//
// Group properties.
type Group struct {
	*baseEvent
	groups map[string][]string
}

func NewGroup(requiredBoolean bool) *Group {
	return &Group{
		baseEvent: newBaseEvent(amplitude.GroupIdentifyEventType, map[string]interface{}{
			"requiredBoolean": requiredBoolean,
		}),
	}
}

func (event *Group) SetOptionalString(optionString string) *Group {
	event.properties["optionalString"] = optionString

	return event
}

func (event *Group) toAmplitudeEvent() amplitude.Event {
	identify := amplitude.Identify{}
	for name, value := range event.properties {
		identify.Set(name, value)
	}

	return amplitude.Event{
		EventType:       event.eventType,
		GroupProperties: identify.Properties,
		Groups:          event.groups,
	}
}
