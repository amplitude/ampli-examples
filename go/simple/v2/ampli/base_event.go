package ampli

import "github.com/amplitude/analytics-go/amplitude"

type baseEvent struct {
	eventType  string
	properties map[string]interface{}
}

type amplitudeEvent interface {
	toAmplitudeEvent() amplitude.Event
}

func newBaseEvent(eventType string, properties map[string]interface{}) *baseEvent {
	return &baseEvent{
		eventType:  eventType,
		properties: properties,
	}
}
