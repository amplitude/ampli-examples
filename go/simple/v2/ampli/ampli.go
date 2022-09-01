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

// NewConfig is amplitude.NewConfig alias
var NewConfig = amplitude.NewConfig

// NewClient is amplitude.NewClient alias
var NewClient = amplitude.NewClient

// EventOptions is amplitude.EventOptions alias
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

func DefaultConfiguration() amplitude.Config {
	config := NewConfig("")
	config.Plan = amplitude.Plan{
		Branch:    "main",
		Source:    "go-Ampli",
		Version:   "0",
		VersionID: "79154a50-f057-4db5-9755-775e4e9f05e6",
	}

	return config
}

// LoadClientOptions is Instance options setting to initialize Ampli client.
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
//	- Instance: the LoadClientOptions struct
type LoadOptions struct {
	Environment Environment
	Disabled    bool
	Client      LoadClientOptions
}

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

func (event *baseEvent) toAmplitudeEvent() amplitude.Event {
	return amplitude.Event{
		EventType:       event.eventType,
		EventProperties: event.properties,
	}
}

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

// EventWithAllProperties
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types
//
// Event with all properties
//
// Owner: Test codegen.
type EventWithAllProperties struct {
	*baseEvent
}

type EventWithAllPropertiesRequiredEnum string

const (
	EventWithAllPropertiesRequiredEnumEnum1 EventWithAllPropertiesRequiredEnum = "Enum1"
	EventWithAllPropertiesRequiredEnumEnum2 EventWithAllPropertiesRequiredEnum = "Enum2"
)

func NewEventWithAllProperties(requiredArray []string, requiredBool bool, requiredEnum EventWithAllPropertiesRequiredEnum, requiredInteger int, requiredNumber float64, requiredString string) *EventWithAllProperties {
	return &EventWithAllProperties{
		newBaseEvent("Event With All Properties", map[string]interface{}{
			"requiredArray":   requiredArray,
			"requiredBool":    requiredBool,
			"requiredEnum":    requiredEnum,
			"requiredInteger": requiredInteger,
			"requiredNumber":  requiredNumber,
			"requiredString":  requiredString,
		}),
	}
}

func (event *EventWithAllProperties) SetOptionalString(optionalString string) *EventWithAllProperties {
	event.properties["optionalString"] = optionalString

	return event
}

func (event *EventWithAllProperties) SetOptionalBool(optionalBool bool) *EventWithAllProperties {
	event.properties["optionalBool"] = optionalBool

	return event
}

// EventWithArrayTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types
//
// Description for event with Array Types
//
// Owner: Test codegen.
type EventWithArrayTypes struct {
	*baseEvent
}

func NewEventWithArrayTypes(requiredBooleanArray []bool, requiredNumberArray []float64, requiredObjectArray []interface{}, requiredStringArray []string) *EventWithArrayTypes {
	return &EventWithArrayTypes{
		newBaseEvent("Event With Array Types", map[string]interface{}{
			"requiredBooleanArray": requiredBooleanArray,
			"requiredNumberArray":  requiredNumberArray,
			"requiredObjectArray":  requiredObjectArray,
			"requiredStringArray":  requiredStringArray,
		}),
	}
}

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

// EventWithDifferentCasingTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes
//
// Description for case with space
//
// Owner: Test codegen.
type EventWithDifferentCasingTypes struct {
	*baseEvent
}

type EventWithDifferentCasingTypesEnumCamelCase string

const EventWithDifferentCasingTypesEnumCamelCaseEnumCamelCase EventWithDifferentCasingTypesEnumCamelCase = "enumCamelCase"

type EventWithDifferentCasingTypesEnumPascalCase string

const EventWithDifferentCasingTypesEnumPascalCaseEnumPascalCase EventWithDifferentCasingTypesEnumPascalCase = "EnumPascalCase"

type EventWithDifferentCasingTypesEnumSnakeCase string

const EventWithDifferentCasingTypesEnumSnakeCaseEnumSnakeCase EventWithDifferentCasingTypesEnumSnakeCase = "enum_snake_case"

type EventWithDifferentCasingTypesEnumWithSpace string

const EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace EventWithDifferentCasingTypesEnumWithSpace = "enum with space"

func NewEventWithDifferentCasingTypes(
	enumCamelCase EventWithDifferentCasingTypesEnumCamelCase,
	enumPascalCase EventWithDifferentCasingTypesEnumPascalCase,
	enumSnakeCase EventWithDifferentCasingTypesEnumSnakeCase,
	enumWithSpace EventWithDifferentCasingTypesEnumWithSpace,
	propertyWithCamelCase string,
	propertyWithPascalCase string,
	propertyWithSnakeCase string,
	propertyWithSpace string,
) *EventWithDifferentCasingTypes {
	return &EventWithDifferentCasingTypes{
		newBaseEvent("event withDifferent_CasingTypes", map[string]interface{}{
			"enumCamelCase":            enumCamelCase,
			"EnumPascalCase":           enumPascalCase,
			"enum_snake_case":          enumSnakeCase,
			"enum with space":          enumWithSpace,
			"propertyWithCamelCase":    propertyWithCamelCase,
			"PropertyWithPascalCase":   propertyWithPascalCase,
			"property_with_snake_case": propertyWithSnakeCase,
			"property with space":      propertyWithSpace,
		}),
	}
}

// EventWithEnumTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types
//
// Description for event with enum types
//
// Owner: Test codegen.
type EventWithEnumTypes struct {
	*baseEvent
}

type EventWithEnumTypesOptionalEnum string

const (
	EventWithEnumTypesOptionalEnumOptionalEnum1 EventWithEnumTypesOptionalEnum = "optional enum 1"
	EventWithEnumTypesOptionalEnumOptionalEnum2 EventWithEnumTypesOptionalEnum = "optional enum 2"
)

type EventWithEnumTypesRequiredEnum string

const (
	EventWithEnumTypesRequiredEnumRequiredEnum1 EventWithEnumTypesRequiredEnum = "required enum 1"
	EventWithEnumTypesRequiredEnumRequiredEnum2 EventWithEnumTypesRequiredEnum = "required enum 2"
)

func NewEventWithEnumTypes(requiredEnum EventWithEnumTypesRequiredEnum) *EventWithEnumTypes {
	return &EventWithEnumTypes{newBaseEvent("Event With Enum Types", map[string]interface{}{
		"required num": requiredEnum,
	})}
}

func (event *EventWithEnumTypes) SetOptionalEnum(optionalEnum EventWithEnumTypesOptionalEnum) *EventWithEnumTypes {
	event.properties["optional enum"] = optionalEnum

	return event
}

// EventWithOptionalArrayTypes
//
// [View in Tracking Plan]: https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types
//
// Description for event with optional array types
//
// Owner: Test codegen.
type EventWithOptionalArrayTypes struct {
	*baseEvent
}

func NewEventWithOptionalArrayTypes() *EventWithOptionalArrayTypes {
	return &EventWithOptionalArrayTypes{newBaseEvent("Event With Optional Array Types", map[string]interface{}{})}
}

func (event *EventWithOptionalArrayTypes) SetOptionalBooleanArray(optionalBooleanArray []bool) *EventWithOptionalArrayTypes {
	event.properties["optionalBooleanArray"] = optionalBooleanArray

	return event
}

func (event *EventWithOptionalArrayTypes) SetOptionalJSONArray(optionalJSONArray []interface{}) *EventWithOptionalArrayTypes {
	event.properties["optionalJSONArray"] = optionalJSONArray

	return event
}

func (event *EventWithOptionalArrayTypes) SetOptionalNumberArray(optionalNumberArray []float64) *EventWithOptionalArrayTypes {
	event.properties["optionalNumberArray"] = optionalNumberArray

	return event
}

func (event *EventWithOptionalArrayTypes) SetOptionalOptionalStringArray(optionalStringArray []string) *EventWithOptionalArrayTypes {
	event.properties["optionalStringArray"] = optionalStringArray

	return event
}

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
		log.Print("Error: Ampli.Load() requires option.Environment, " +
			"and apiKey from either options.Instance.APIKey or APIKey[options.Environment], " +
			"or options.Instance.Instance")
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

// Track tracks an amplitudeEvent.
func (a *Ampli) Track(userID string, event amplitudeEvent, eventOptions EventOptions) {
	if !a.InitializedAndEnabled() {
		return
	}

	a.setUserID(userID, &eventOptions)

	baseEvent := event.toAmplitudeEvent()
	baseEvent.EventOptions = eventOptions

	a.Client.Track(baseEvent)
}

// Identify identifies a user and set user properties.
func (a *Ampli) Identify(userID string, identify *Identify, eventOptions EventOptions) {
	a.Track(userID, identify, eventOptions)
}

// GroupIdentify identifies a group and set group properties.
func (a *Ampli) GroupIdentify(groupType string, groupName string, group *Group, eventOptions EventOptions) {
	group.groups = map[string][]string{groupType: {groupName}}
	event := group.toAmplitudeEvent()
	event.EventOptions = eventOptions

	a.Client.Track(event)
}

// SetGroup sets group for the current user.
func (a *Ampli) SetGroup(userID string, groupType string, groupName []string, eventOptions EventOptions) {
	a.setUserID(userID, &eventOptions)

	a.Client.SetGroup(groupType, groupName, eventOptions)
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

func (a *Ampli) EventMaxIntForTest(userID string, event *EventMaxIntForTest, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventNoProperties(userID string, event *EventNoProperties, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventObjectTypes(userID string, event *EventObjectTypes, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithAllProperties(userID string, event *EventWithAllProperties, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithArrayTypes(userID string, event *EventWithArrayTypes, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithConstTypes(userID string, event *EventWithConstTypes, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithDifferentCasingTypes(userID string, event *EventWithDifferentCasingTypes, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithEnumTypes(userID string, event *EventWithEnumTypes, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithOptionalArrayTypes(userID string, event *EventWithOptionalArrayTypes, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithOptionalProperties(userID string, event *EventWithOptionalProperties, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}

func (a *Ampli) EventWithTemplateProperties(userID string, event *EventWithTemplateProperties, eventOptions EventOptions) {
	a.Track(userID, event, eventOptions)
}
