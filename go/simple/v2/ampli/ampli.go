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

	"github.com/amplitude/analytics-go/amplitude"
)

var Client = Ampli{}

type Environment string

const (
	EnvironmentDevelopment Environment = "development"
	EnvironmentProduction  Environment = "production"
)

var APIKey = map[Environment]string{
	EnvironmentDevelopment: "",
	EnvironmentProduction:  "",
}

func DefaultConfiguration() amplitude.Config {
	config := amplitude.NewConfig("")
	config.Plan = amplitude.Plan{
		Branch:    "main",
		Source:    "go-Ampli",
		Version:   "0",
		VersionID: "79154a50-f057-4db5-9755-775e4e9f05e6",
	}
	return config
}

// LoadClientOptions is Client options setting to initialize Ampli client.
//
// Params:
// 	- APIKey: the API key of Amplitude project
// 	- Instance: the core SDK instance used by Ampli client
// 	- Configuration: the core SDK client configuration instance
type LoadClientOptions struct {
	APIKey        string
	Instance      amplitude.Client
	Configuration amplitude.Config
}

func (l LoadClientOptions) isEmpty() bool {
	return l.APIKey == "" && l.Instance == nil && l.Configuration.IsEmpty()
}

// LoadOptions is options setting to initialize Ampli client.
//
// Params:
//	- Environment: the environment of Amplitude Data project
//	- Disabled: the flag of disabled Ampli client
//	- Client: the LoadClientOptions struct
type LoadOptions struct {
	Environment Environment
	Disabled    bool
	Client      LoadClientOptions
}

// Identify
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Identify
//
// Identify properties
//
// Params:
//	- RequiredNumber: description for Ampli.Identify RequiredNumber
//	- OptionalArray: description for Ampli.Identify OptionalArray
type Identify struct {
	RequiredNumber float64
	OptionalArray  []string
}

// Group
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Group
//
// Group properties
//
// Params:
//	- RequiredBool: description for group RequiredBool
//	- OptionalString: description for group OptionalString
type Group struct {
	RequiredBoolean bool
	OptionalString  string
}

type StronglyTypedEvent interface {
	ToEvent() amplitude.Event
}

// EventMaxIntForTest
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest
//
// Event to test schema validation
//
// Owner: Test codegen
//
// Params:
//	- IntMax10: property to test schema validation
type EventMaxIntForTest struct {
	IntMax10 int
}

func (stronglyTypedEvent EventMaxIntForTest) ToEvent() amplitude.Event {
	return amplitude.Event{
		EventType: "EventMaxIntForTest",
		EventProperties: map[string]interface{}{
			"intMax10": stronglyTypedEvent.IntMax10,
		},
	}
}

// EventNoProperties
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties
//
// Event with no properties description
//
// Owner: Test codegen.
type EventNoProperties struct {
	amplitude.Event
}

func (stronglyTypedEvent EventNoProperties) ToEvent() amplitude.Event {
	return amplitude.Event{
		EventType: "Event No Properties",
	}
}

// EventObjectTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types
//
// Event with Object and Object Array
//
// Owner: Test codegen
//
// Params:
//	- RequiredObject: property object type
//	- RequiredObjectArray: property object array type
type EventObjectTypes struct {
	RequiredObject      interface{}
	RequiredObjectArray []interface{}
}

func (stronglyTypedEvent EventObjectTypes) ToEvent() amplitude.Event {
	return amplitude.Event{
		EventType: "Event Object Types",
		EventProperties: map[string]interface{}{
			"requiredObject":      stronglyTypedEvent.RequiredObject,
			"requiredObjectArray": stronglyTypedEvent.RequiredObjectArray,
		},
	}
}

type Ampli struct {
	Disabled bool
	Client   amplitude.Client
}

// Load initializes the Ampli wrapper.
// Call once when your application starts.
func (a *Ampli) Load(options LoadOptions) {
	a.Disabled = options.Disabled

	if a.Client != nil {
		log.Default().Printf("Warn: Ampli is already initialized. Ampli.load() should be called once at application start up.")

		return
	}

	if options.Client.isEmpty() {
		options.Client = LoadClientOptions{
			Configuration: DefaultConfiguration(),
		}
	}

	var apiKey string
	if options.Client.APIKey != "" {
		apiKey = options.Client.APIKey
	} else if options.Environment != "" {
		apiKey = APIKey[options.Environment]
	} else if options.Client.Configuration.APIKey != "" {
		apiKey = options.Client.Configuration.APIKey
	}

	if !(apiKey != "" || options.Client.Instance != nil) {
		log.Default().Printf("Error: Ampli.Load() requires option.Environment, " +
			"and apiKey from either options.Client.APIKey or APIKey[options.Environment], " +
			"or options.Client.Instance")
	}

	var configuration amplitude.Config
	if !options.Client.Configuration.IsEmpty() {
		configuration = options.Client.Configuration
	} else {
		configuration = DefaultConfiguration()
	}

	if configuration.Plan == (amplitude.Plan{}) {
		configuration.Plan = DefaultConfiguration().Plan
	}

	if options.Client.Instance != nil {
		a.Client = options.Client.Instance
	} else {
		configuration.APIKey = apiKey
		a.Client = amplitude.NewClient(configuration)
	}
}

// InitializedAndEnabled checks if Ampli is initialized and enabled.
func (a *Ampli) InitializedAndEnabled() bool {
	return !a.Disabled
}

// Track tracks an StronglyTypedEvent.
func (a *Ampli) Track(userID string, event StronglyTypedEvent, eventOptions amplitude.EventOptions) {
	if !a.InitializedAndEnabled() {
		return
	}

	if userID != "" {
		eventOptions.UserID = userID
	}

	baseEvent := event.ToEvent()
	baseEvent.EventOptions = eventOptions

	a.Client.Track(baseEvent)
}

// Identify identifies a user and set user properties.
func (a *Ampli) Identify(userID string, identify Identify, eventOptions amplitude.EventOptions) {
	if !a.InitializedAndEnabled() {
		return
	}

	if userID != "" {
		eventOptions.UserID = userID
	}

	identifyEvent := amplitude.Event{
		EventType: amplitude.IdentifyEventType,
		EventProperties: map[string]interface{}{
			"requiredNumber": identify.RequiredNumber,
			"optionalArray":  identify.OptionalArray,
		},
		EventOptions: eventOptions,
	}

	a.Client.Track(identifyEvent)
}

// GroupIdentify identifies a group and set group properties.
func (a *Ampli) GroupIdentify(groupType string, groupName string, group Group, eventOptions amplitude.EventOptions) {
	if !a.InitializedAndEnabled() {
		return
	}

	groupIdentifyEvent := amplitude.Event{
		EventType: amplitude.GroupIdentifyEventType,
		Groups:    map[string][]string{groupType: {groupName}},
		EventProperties: map[string]interface{}{
			"requiredBoolean": group.RequiredBoolean,
			"optionalString":  group.OptionalString,
		},
		EventOptions: eventOptions,
	}

	a.Client.Track(groupIdentifyEvent)
}

// SetGroup sets group for the current user.
func (a *Ampli) SetGroup(userID string, groupType string, groupName []string, eventOptions amplitude.EventOptions) {
	if !a.InitializedAndEnabled() {
		return
	}

	if userID != "" {
		eventOptions.UserID = userID
	}

	a.Client.SetGroup(groupType, groupName, eventOptions)
}

// Flush flushes events waiting in buffer.
func (a *Ampli) Flush() {
	if !a.InitializedAndEnabled() {
		return
	}

	a.Client.Flush()
}

// Shutdown disables and shutdowns Ampli Client.
func (a *Ampli) Shutdown() {
	if !a.InitializedAndEnabled() {
		return
	}

	a.Client.Shutdown()
	a.Disabled = true
}
