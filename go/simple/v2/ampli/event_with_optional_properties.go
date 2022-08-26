package ampli

// EventWithOptionalProperties
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties)
//
// Event w optional properties description
//
//Owner: Test codegen.
type EventWithOptionalProperties struct {
	*baseEvent
}

func NewEventWithOptionalProperties() *EventWithOptionalProperties {
	return &EventWithOptionalProperties{newBaseEvent("Event With Optional Properties", map[string]interface{}{})}
}

func (event *EventWithOptionalProperties) SetOptionalArrayNumber(optionalArrayNumber []float64) *EventWithOptionalProperties {
	event.properties["optionalArrayNumber"] = optionalArrayNumber

	return event
}

func (event *EventWithOptionalProperties) SetOptionalArrayString(optionalArrayString []string) *EventWithOptionalProperties {
	event.properties["optionalArrayString"] = optionalArrayString

	return event
}

func (event *EventWithOptionalProperties) SetOptionalBoolean(optionalBoolean bool) *EventWithOptionalProperties {
	event.properties["optionalBoolean"] = optionalBoolean

	return event
}

func (event *EventWithOptionalProperties) SetOptionalString(optionalString string) *EventWithOptionalProperties {
	event.properties["optionalString"] = optionalString

	return event
}

type EventWithTemplateProperties struct {
	*baseEvent
}

func NewEventWithTemplateProperties(requiredEventProperty string, requiredTemplateProperty string) *EventWithTemplateProperties {
	return &EventWithTemplateProperties{newBaseEvent("Event With Template Properties", map[string]interface{}{
		"required_event_property":    requiredEventProperty,
		"required_template_property": requiredTemplateProperty,
	})}
}

func (event *EventWithTemplateProperties) SetOptionalEventProperty(optionalEventProperty float64) *EventWithTemplateProperties {
	event.properties["optionalEventProperty"] = optionalEventProperty

	return event
}

func (event *EventWithTemplateProperties) SetOptionalTemplateProperty(optionalTemplateProperty float64) *EventWithTemplateProperties {
	event.properties["optionalTemplateProperty"] = optionalTemplateProperty

	return event
}
