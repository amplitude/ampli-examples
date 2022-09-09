// ampli.go
//
// Ampli - A strong typed wrapper for your Analytics
//
// This file is generated by Amplitude.
// To update run 'ampli pull go-ampli'
//
// Required dependencies: analytics-go
// Tracking Plan Version: 0
// Build: 1.0.0
// Runtime: go-ampli
//
// [View Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest
//
// [Full Setup Instructions]: https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/main/latest/getting-started/go-ampli
//

package ampli

import (
	"log"
	"sync"

	"github.com/amplitude/analytics-go/amplitude"
)

// NewClientConfig is amplitude.NewConfig alias.
var NewClientConfig = amplitude.NewConfig

// NewClient is amplitude.NewClient alias.
var NewClient = amplitude.NewClient

// EventOptions is amplitude.EventOptions alias.
type EventOptions = amplitude.EventOptions

var Instance = Ampli{}

type Environment string

const (
	EnvironmentDevelopment Environment = "development"
	EnvironmentProduction  Environment = "production"
)

var APIKey = map[Environment]string{
	EnvironmentDevelopment: "",
	EnvironmentProduction:  "",
}

// LoadClientOptions is Instance options setting to initialize Ampli client.
//
// Params:
//   - APIKey: the API key of Amplitude project
//   - Instance: the core SDK instance used by Ampli client
//   - Configuration: the core SDK client configuration instance
type LoadClientOptions struct {
	APIKey        string
	Instance      amplitude.Client
	Configuration amplitude.Config
}

// LoadOptions is options setting to initialize Ampli client.
//
// Params:
//   - Environment: the environment of Amplitude Data project
//   - Disabled: the flag of disabled Ampli client
//   - Instance: the LoadClientOptions struct
type LoadOptions struct {
	Environment Environment
	Disabled    bool
	Client      LoadClientOptions
}

type baseEvent struct {
	eventType  string
	properties map[string]interface{}
}

type Event interface {
	toAmplitudeEvent() amplitude.Event
}

func newBaseEvent(eventType string, properties map[string]interface{}) *baseEvent {
	return &baseEvent{
		eventType:  eventType,
		properties: properties,
	}
}

func (event *baseEvent) toAmplitudeEvent() amplitude.Event {
	return amplitude.Event{
		EventType:       event.eventType,
		EventProperties: event.properties,
	}
}

var Identify = struct {
	Builder func() interface {
		SetRequiredNumber(requiredNumber float64) IdentifyBuilder
	}
}{
	Builder: func() interface {
		SetRequiredNumber(requiredNumber float64) IdentifyBuilder
	} {
		return &identifyBuilder{properties: map[string]interface{}{}}
	},
}

type IdentifyEvent interface {
	Event
	identify()
}

type identifyEvent struct {
	*baseEvent
}

func (e identifyEvent) identify() {}

type identifyBuilder struct {
	properties map[string]interface{}
}

func (b *identifyBuilder) SetRequiredNumber(requiredNumber float64) IdentifyBuilder {
	b.properties["requiredNumber"] = requiredNumber

	return b
}

type IdentifyBuilder interface {
	SetOptionalArray(optionalArray []string) IdentifyBuilder
	Build() IdentifyEvent
}

func (b *identifyBuilder) SetOptionalArray(optionalArray []string) IdentifyBuilder {
	b.properties["optionalArray"] = optionalArray

	return b
}

func (b *identifyBuilder) Build() IdentifyEvent {
	return &identifyEvent{
		newBaseEvent(amplitude.IdentifyEventType, b.properties),
	}
}

func (e identifyEvent) toAmplitudeEvent() amplitude.Event {
	identify := amplitude.Identify{}

	for name, value := range e.properties {
		identify.Set(name, value)
	}

	return amplitude.Event{
		EventType:      e.eventType,
		UserProperties: identify.Properties,
	}
}

var Group = struct {
	Builder func() interface {
		SetRequiredBoolean(requiredBoolean bool) GroupBuilder
	}
}{
	Builder: func() interface {
		SetRequiredBoolean(requiredBoolean bool) GroupBuilder
	} {
		return &groupBuilder{properties: map[string]interface{}{}}
	},
}

type GroupEvent interface {
	Event
	group()
}

type groupEvent struct {
	*baseEvent
}

func (e groupEvent) group() {}

type groupBuilder struct {
	properties map[string]interface{}
}

func (b *groupBuilder) SetRequiredBoolean(requiredBoolean bool) GroupBuilder {
	b.properties["requiredBoolean"] = requiredBoolean

	return b
}

type GroupBuilder interface {
	SetOptionalString(optionalString string) GroupBuilder
	Build() GroupEvent
}

func (b *groupBuilder) SetOptionalString(optionalString string) GroupBuilder {
	b.properties["optionalString"] = optionalString

	return b
}

func (b *groupBuilder) Build() GroupEvent {
	return &groupEvent{
		baseEvent: newBaseEvent(amplitude.GroupIdentifyEventType, b.properties),
	}
}

func (e groupEvent) toAmplitudeEvent() amplitude.Event {
	identify := amplitude.Identify{}
	for name, value := range e.properties {
		identify.Set(name, value)
	}

	return amplitude.Event{
		EventType:       e.eventType,
		GroupProperties: identify.Properties,
	}
}

var EventNoProperties = struct {
	Builder func() EventNoPropertiesBuilder
}{
	Builder: func() EventNoPropertiesBuilder {
		return &eventNoPropertiesBuilder{properties: map[string]interface{}{}}
	},
}

type EventNoPropertiesEvent interface {
	Event
	eventNoPropertiesEvent()
}

type eventNoPropertiesEvent struct {
	*baseEvent
}

func (e eventNoPropertiesEvent) eventNoPropertiesEvent() {}

type eventNoPropertiesBuilder struct {
	properties map[string]interface{}
}

type EventNoPropertiesBuilder interface {
	Build() EventNoPropertiesEvent
}

func (b *eventNoPropertiesBuilder) Build() EventNoPropertiesEvent {
	return &eventNoPropertiesEvent{
		newBaseEvent("Event No Properties", b.properties),
	}
}

type EventWithAllPropertiesRequiredEnum string

var EventWithAllProperties = struct {
	RequiredEnum struct {
		Enum1 EventWithAllPropertiesRequiredEnum
		Enum2 EventWithAllPropertiesRequiredEnum
	}
	Builder func() interface {
		SetRequiredArray(requiredArray []string) interface {
			SetRequiredBool(requiredBool bool) interface {
				SetRequiredEnum(requiredEnum EventWithAllPropertiesRequiredEnum) interface {
					SetRequiredInteger(requiredInteger int) interface {
						SetRequiredNumber(requiredNumber float64) interface {
							SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
						}
					}
				}
			}
		}
	}
}{
	RequiredEnum: struct {
		Enum1 EventWithAllPropertiesRequiredEnum
		Enum2 EventWithAllPropertiesRequiredEnum
	}{
		Enum1: "Enum1",
		Enum2: "Enum2",
	},
	Builder: func() interface {
		SetRequiredArray(requiredArray []string) interface {
			SetRequiredBool(requiredBool bool) interface {
				SetRequiredEnum(requiredEnum EventWithAllPropertiesRequiredEnum) interface {
					SetRequiredInteger(requiredInteger int) interface {
						SetRequiredNumber(requiredNumber float64) interface {
							SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
						}
					}
				}
			}
		}
	} {
		return &eventWithAllPropertiesBuilder{properties: map[string]interface{}{}}
	},
}

type EventWithAllPropertiesEvent interface {
	Event
	eventWithAllPropertiesEvent()
}

type eventWithAllPropertiesEvent struct {
	*baseEvent
}

func (e eventWithAllPropertiesEvent) eventWithAllPropertiesEvent() {}

type eventWithAllPropertiesBuilder struct {
	properties map[string]interface{}
}

func (b *eventWithAllPropertiesBuilder) SetRequiredArray(requiredArray []string) interface {
	SetRequiredBool(requiredBool bool) interface {
		SetRequiredEnum(requiredEnum EventWithAllPropertiesRequiredEnum) interface {
			SetRequiredInteger(requiredInteger int) interface {
				SetRequiredNumber(requiredNumber float64) interface {
					SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
				}
			}
		}
	}
} {
	b.properties["requiredArray"] = requiredArray

	return b
}

func (b *eventWithAllPropertiesBuilder) SetRequiredBool(requiredBool bool) interface {
	SetRequiredEnum(requiredEnum EventWithAllPropertiesRequiredEnum) interface {
		SetRequiredInteger(requiredInteger int) interface {
			SetRequiredNumber(requiredNumber float64) interface {
				SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
			}
		}
	}
} {
	b.properties["requiredBool"] = requiredBool

	return b
}

func (b *eventWithAllPropertiesBuilder) SetRequiredEnum(requiredEnum EventWithAllPropertiesRequiredEnum) interface {
	SetRequiredInteger(requiredInteger int) interface {
		SetRequiredNumber(requiredNumber float64) interface {
			SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
		}
	}
} {
	b.properties["requiredEnum"] = requiredEnum

	return b
}

func (b *eventWithAllPropertiesBuilder) SetRequiredInteger(requiredInteger int) interface {
	SetRequiredNumber(requiredNumber float64) interface {
		SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
	}
} {
	b.properties["requiredInteger"] = requiredInteger

	return b
}

func (b *eventWithAllPropertiesBuilder) SetRequiredNumber(requiredNumber float64) interface {
	SetRequiredString(requiredString string) EventWithAllPropertiesBuilder
} {
	b.properties["requiredNumber"] = requiredNumber

	return b
}

func (b *eventWithAllPropertiesBuilder) SetRequiredString(requiredString string) EventWithAllPropertiesBuilder {
	b.properties["requiredString"] = requiredString

	return b
}

type EventWithAllPropertiesBuilder interface {
	SetOptionalString(optionalString string) EventWithAllPropertiesBuilder
	Build() EventWithAllPropertiesEvent
}

func (b *eventWithAllPropertiesBuilder) SetOptionalString(optionalString string) EventWithAllPropertiesBuilder {
	b.properties["optionalString"] = optionalString

	return b
}

func (b *eventWithAllPropertiesBuilder) Build() EventWithAllPropertiesEvent {
	return &eventWithAllPropertiesEvent{
		newBaseEvent("Event With All Properties", b.properties),
	}
}

var EventWithOptionalProperties = struct {
	Builder func() EventWithOptionalPropertiesBuilder
}{
	Builder: func() EventWithOptionalPropertiesBuilder {
		return &eventWithOptionalPropertiesBuilder{properties: map[string]interface{}{}}
	},
}

type EventWithOptionalPropertiesEvent interface {
	Event
	eventWithOptionalProperties()
}

type eventWithOptionalPropertiesEvent struct {
	*baseEvent
}

func (e eventWithOptionalPropertiesEvent) eventWithOptionalProperties() {}

type eventWithOptionalPropertiesBuilder struct {
	properties map[string]interface{}
}

type EventWithOptionalPropertiesBuilder interface {
	SetOptionalArrayNumber(optionalArrayNumber []float64) EventWithOptionalPropertiesBuilder
	SetOptionalArrayString(optionalArrayString []string) EventWithOptionalPropertiesBuilder
	SetOptionalBoolean(optionalBoolean bool) EventWithOptionalPropertiesBuilder
	SetOptionalString(optionalString string) EventWithOptionalPropertiesBuilder
	Build() EventWithOptionalPropertiesEvent
}

func (b *eventWithOptionalPropertiesBuilder) SetOptionalArrayNumber(optionalArrayNumber []float64) EventWithOptionalPropertiesBuilder {
	b.properties["optionalArrayNumber"] = optionalArrayNumber

	return b
}

func (b *eventWithOptionalPropertiesBuilder) SetOptionalArrayString(optionalArrayString []string) EventWithOptionalPropertiesBuilder {
	b.properties["optionalArrayString"] = optionalArrayString

	return b
}

func (b *eventWithOptionalPropertiesBuilder) SetOptionalBoolean(optionalBoolean bool) EventWithOptionalPropertiesBuilder {
	b.properties["optionalBoolean"] = optionalBoolean

	return b
}

func (b *eventWithOptionalPropertiesBuilder) SetOptionalString(optionalString string) EventWithOptionalPropertiesBuilder {
	b.properties["optionalString"] = optionalString

	return b
}

func (b *eventWithOptionalPropertiesBuilder) Build() EventWithOptionalPropertiesEvent {
	return &eventWithOptionalPropertiesEvent{
		newBaseEvent("Event With Optional Properties", b.properties),
	}
}

type Ampli struct {
	Disabled bool
	Client   amplitude.Client
	mutex    sync.RWMutex
}

// Load initializes the Ampli wrapper.
// Call once when your application starts.
func (a *Ampli) Load(options LoadOptions) {
	if a.Client != nil {
		log.Print("Warn: Ampli is already initialized. Ampli.Load() should be called once at application start up.")

		return
	}

	var apiKey string
	switch {
	case options.Client.APIKey != "":
		apiKey = options.Client.APIKey
	case options.Environment != "":
		apiKey = APIKey[options.Environment]
	default:
		apiKey = options.Client.Configuration.APIKey
	}

	if apiKey == "" && options.Client.Instance == nil {
		log.Print("Error: Ampli.Load() requires option.Environment, " +
			"and apiKey from either options.Instance.APIKey or APIKey[options.Environment], " +
			"or options.Instance.Instance")
	}

	clientConfig := options.Client.Configuration

	if clientConfig.Plan == nil {
		clientConfig.Plan = &amplitude.Plan{
			Branch:    "main",
			Source:    "go-Ampli",
			Version:   "0",
			VersionID: "79154a50-f057-4db5-9755-775e4e9f05e6",
		}
	}

	if options.Client.Instance != nil {
		a.Client = options.Client.Instance
	} else {
		clientConfig.APIKey = apiKey
		a.Client = amplitude.NewClient(clientConfig)
	}

	a.mutex.Lock()
	a.Disabled = options.Disabled
	a.mutex.Unlock()
}

// InitializedAndEnabled checks if Ampli is initialized and enabled.
func (a *Ampli) InitializedAndEnabled() bool {
	if a.Client == nil {
		log.Print("Error: Ampli is not yet initialized. Have you called Ampli.Load() on app start?")

		return false
	}

	a.mutex.RLock()
	defer a.mutex.RUnlock()

	return !a.Disabled
}

func (a *Ampli) setUserID(userID string, eventOptions *EventOptions) {
	if userID != "" {
		eventOptions.UserID = userID
	}
}

// Track tracks an Event.
func (a *Ampli) Track(userID string, event Event, eventOptions ...EventOptions) {
	if !a.InitializedAndEnabled() {
		return
	}

	var options EventOptions
	if len(eventOptions) > 0 {
		options = eventOptions[0]
	}

	a.setUserID(userID, &options)

	baseEvent := event.toAmplitudeEvent()
	baseEvent.EventOptions = options

	a.Client.Track(baseEvent)
}

// Identify identifies a user and set user properties.
func (a *Ampli) Identify(userID string, identify IdentifyEvent, eventOptions ...EventOptions) {
	a.Track(userID, identify, eventOptions...)
}

// GroupIdentify identifies a group and set group properties.
func (a *Ampli) GroupIdentify(groupType string, groupName string, group GroupEvent, eventOptions ...EventOptions) {
	event := group.toAmplitudeEvent()
	event.Groups = map[string][]string{groupType: {groupName}}
	if len(eventOptions) > 0 {
		event.EventOptions = eventOptions[0]
	}

	a.Client.Track(event)
}

// SetGroup sets group for the current user.
func (a *Ampli) SetGroup(userID string, groupType string, groupName []string, eventOptions ...EventOptions) {
	var options EventOptions
	if len(eventOptions) > 0 {
		options = eventOptions[0]
	}
	a.setUserID(userID, &options)

	a.Client.SetGroup(groupType, groupName, options)
}

// Flush flushes events waiting in buffer.
func (a *Ampli) Flush() {
	if !a.InitializedAndEnabled() {
		return
	}

	a.Client.Flush()
}

// Shutdown disables and shutdowns Ampli Instance.
func (a *Ampli) Shutdown() {
	if !a.InitializedAndEnabled() {
		return
	}

	a.mutex.Lock()
	a.Disabled = true
	a.mutex.Unlock()

	a.Client.Shutdown()
}

func (a *Ampli) EventNoProperties(userID string, event EventNoPropertiesEvent, eventOptions ...EventOptions) {
	a.Track(userID, event, eventOptions...)
}

func (a *Ampli) EventWithAllProperties(userID string, event EventWithAllPropertiesEvent, eventOptions ...EventOptions) {
	a.Track(userID, event, eventOptions...)
}

func (a *Ampli) EventWithOptionalProperties(userID string, event EventWithOptionalPropertiesEvent, eventOptions ...EventOptions) {
	a.Track(userID, event, eventOptions...)
}
