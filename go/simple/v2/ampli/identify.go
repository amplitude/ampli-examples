package ampli

import "github.com/amplitude/analytics-go/amplitude"

// Identify
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Identify
//
// Identify properties.
type Identify struct {
	*baseEvent
}

func NewIdentify(requiredNumber float64) *Identify {
	return &Identify{
		newBaseEvent(amplitude.IdentifyEventType, map[string]interface{}{
			"requiredNumber": requiredNumber,
		}),
	}
}

func (event *Identify) SetOptionalArray(optionalArray []string) *Identify {
	event.properties["optionalArray"] = optionalArray

	return event
}

func (event *Identify) toAmplitudeEvent() amplitude.Event {
	identify := amplitude.Identify{}

	for name, value := range event.properties {
		identify.Set(name, value)
	}

	return amplitude.Event{
		EventType:      event.eventType,
		UserProperties: identify.Properties,
	}
}
