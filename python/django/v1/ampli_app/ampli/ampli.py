# ampli.py
# 
# Ampli - A strong typed wrapper for your Analytics
# 
# This file is generated by Amplitude.
# To update run 'ampli pull python-ampli'
# 
# Required dependencies: amplitude-analytics >=1.0.0,==1.*
# Tracking Plan Version: 1
# Build: 1.0.0
# Runtime: python-ampli
# 
# [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
# 
# [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/main/latest/getting-started/python-ampli)
# 
# pylint: skip-file
# flake8: noqa
# 
# WARNING: We do our best to remove lint warning from this file but if you would like to disable linting completely you will need to take some extra steps. See more details here: https://stackoverflow.com/questions/18444840/how-to-disable-a-pep8-error-in-a-specific-file/48772387


import logging
import enum
from typing import Dict, Optional, List, Any, Union

from amplitude import Amplitude, Config, Plan, BaseEvent, EventOptions, IdentifyEvent, GroupIdentifyEvent


class Environment(enum.Enum):
    PROD = 'prod'
    DEV = 'dev'


API_KEY: Dict[Environment, str] = {
    Environment("prod"): "",
    Environment("dev"): ""
}

DEFAULT_CONFIGURATION = Config(
    plan=Plan(
        branch="main",
        source="python-ampli",
        version="1",
        version_id="a61c3908-ca4d-4c8d-8f81-54ad3ba17b9c"
    )
)


class LoadClientOptions:
    """Client options setting to initialize Ampli client

    :param api_key: The API key of Amplitude project. Default to None.
    :param instance: The core SDK instance used by Ampli client. Default to None
    :param configuration: The core SDK client configuration instance. Default to None
    """

    def __init__(self, api_key: Optional[str] = None,
                 instance: Optional[Amplitude] = None,
                 configuration: Optional[Config] = None):
        self.api_key = api_key
        self.instance = instance
        self.configuration = configuration


class LoadOptions:
    """Options setting to initialize Ampli client

    :param environment: The environment of Amplitude Data project. Default to None.
    :param disabled: The flag of disabled Ampli client. Default to False
    :param client: The LoadClientOptions instance. Default to None
    """

    def __init__(self, environment: Environment = None,
                 disabled: bool = False,
                 client: LoadClientOptions = None):
        self.environment = environment
        self.disabled = disabled
        self.client = client


class Identify(IdentifyEvent):
    """Identify

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Identify)

    Identify properties.

    :param required_number: Description for identify requiredNumber
    :param optional_array: Description for identify optionalArray
    """

    def __init__(
        self,
        required_number: float,
        optional_array: Optional[List[str]] = None
    ):
        super().__init__()
        properties = {
            "optionalArray": optional_array,
            "requiredNumber": required_number
        }
        self.user_properties = {k: v for k, v in properties.items() if v is not None}


class EventNoProperties(BaseEvent):
    """Event No Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20No%20Properties)

    Event w no properties description

    Owner: Test codegen
    """

    def __init__(
        self
    ):
        super().__init__(event_type="Event No Properties")


class EventObjectTypes(BaseEvent):
    """Event Object Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20Object%20Types)

    Event with Object and Object Array

    Owner: Test codegen

    :param required_object: Property Object Type
    :param required_object_array: Property Object Array Type
    """

    def __init__(
        self,
        required_object: Any,
        required_object_array: List[Any]
    ):
        super().__init__(event_type="Event Object Types")
        properties = {
            "requiredObject": required_object,
            "requiredObjectArray": required_object_array
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithAllProperties(BaseEvent):
    """Event With All Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20All%20Properties)

    Event w all properties description

    Owner: Test codegen

    :param required_array: Event 2 Property - Array
    :param required_boolean: Event 2 Property - Boolean
    :param required_enum: Event 2 Property - Enum
    :param required_integer: Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
    :param required_number: Event 2 Property - Number
    :param required_string: Event 2 Property - String
    :param optional_string: Event 2 Property - Optional String    *     * Examples:    * Some string, or another
    """

    class RequiredEnum(enum.Enum):
        ENUM_1 = "Enum1"
        ENUM_2 = "Enum2"

    def __init__(
        self,
        required_array: List[str],
        required_boolean: bool,
        required_enum: "EventWithAllProperties.RequiredEnum",
        required_integer: int,
        required_number: float,
        required_string: str,
        optional_string: Optional[str] = None
    ):
        super().__init__(event_type="Event With All Properties")
        properties = {
            "optionalString": optional_string,
            "requiredArray": required_array,
            "requiredBoolean": required_boolean,
            "requiredConst": "some-const-value",
            "requiredEnum": required_enum,
            "requiredInteger": required_integer,
            "requiredNumber": required_number,
            "requiredString": required_string
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithArrayTypes(BaseEvent):
    """Event With Array Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types)

    Description for event with Array Types

    Owner: Test codegen

    :param required_boolean_array: description for required boolean array
    :param required_enum_array: Description for enum array property
    :param required_number_array: Description for required number array
    :param required_object_array: Description for required object array
    :param required_string_array: description for required string array
    """

    def __init__(
        self,
        required_boolean_array: List[bool],
        required_enum_array: List[str],
        required_number_array: List[float],
        required_object_array: List[Any],
        required_string_array: List[str]
    ):
        super().__init__(event_type="Event With Array Types")
        properties = {
            "requiredBooleanArray": required_boolean_array,
            "requiredEnumArray": required_enum_array,
            "requiredNumberArray": required_number_array,
            "requiredObjectArray": required_object_array,
            "requiredStringArray": required_string_array
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithConstTypes(BaseEvent):
    """Event With Const Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Const%20Types)

    Description for event with const types

    Owner: Test codegen
    """

    def __init__(
        self
    ):
        super().__init__(event_type="Event With Const Types")
        properties = {
            "Boolean Const": True,
            "Integer Const": 10,
            "Number Const": 2.2,
            "String Const": "String-Constant",
            "String Const WIth Quotes": "\"String \"Const With\" Quotes\"",
            "String Int Const": 0
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithEnumTypes(BaseEvent):
    """Event With Enum Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Enum%20Types)

    Description for event with enum types

    Owner: Test codegen

    :param required_enum: Description for optional enum
    :param optional_enum: Description for required enum
    """

    class OptionalEnum(enum.Enum):
        OPTIONAL_ENUM_1 = "optional enum 1"
        OPTIONAL_ENUM_2 = "optional enum 2"

    class RequiredEnum(enum.Enum):
        REQUIRED_ENUM_1 = "required enum 1"
        REQUIRED_ENUM_2 = "required enum 2"

    def __init__(
        self,
        required_enum: "EventWithEnumTypes.RequiredEnum",
        optional_enum: Optional["EventWithEnumTypes.OptionalEnum"] = None
    ):
        super().__init__(event_type="Event With Enum Types")
        properties = {
            "optional enum": optional_enum,
            "required enum": required_enum
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithOptionalArrayTypes(BaseEvent):
    """Event With Optional Array Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types)

    Description for event with optional array types

    Owner: Test codegen

    :param optional_boolean_array: Description for optional boolean array
    :param optional_enum_array: Description for optional enum array
    :param optional_json_array: Description for optional object array
    :param optional_number_array: Description for optional number array
    :param optional_string_array: Description for optional string array
    """

    def __init__(
        self,
        optional_boolean_array: Optional[List[bool]] = None,
        optional_enum_array: Optional[List[str]] = None,
        optional_json_array: Optional[List[Any]] = None,
        optional_number_array: Optional[List[float]] = None,
        optional_string_array: Optional[List[str]] = None
    ):
        super().__init__(event_type="Event With Optional Array Types")
        properties = {
            "optionalBooleanArray": optional_boolean_array,
            "optionalEnumArray": optional_enum_array,
            "optionalJSONArray": optional_json_array,
            "optionalNumberArray": optional_number_array,
            "optionalStringArray": optional_string_array
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithOptionalProperties(BaseEvent):
    """Event With Optional Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Properties)

    Event w optional properties description

    Owner: Test codegen

    :param optional_array_number: Property has no description provided in tracking plan.
    :param optional_array_string: Property has no description provided in tracking plan.
    :param optional_boolean: Property has no description provided in tracking plan.
    :param optional_number: Property has no description provided in tracking plan.
    :param optional_string: Optional String property description
    """

    def __init__(
        self,
        optional_array_number: Optional[List[float]] = None,
        optional_array_string: Optional[List[str]] = None,
        optional_boolean: Optional[bool] = None,
        optional_number: Optional[float] = None,
        optional_string: Optional[str] = None
    ):
        super().__init__(event_type="Event With Optional Properties")
        properties = {
            "optionalArrayNumber": optional_array_number,
            "optionalArrayString": optional_array_string,
            "optionalBoolean": optional_boolean,
            "optionalNumber": optional_number,
            "optionalString": optional_string
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithTemplateProperties(BaseEvent):
    """Event With Template Properties

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Template%20Properties)

    Event with template properties description

    Owner: Test codegen

    :param required_event_property: required_event_property description
    :param required_template_property: required_template_property description
    :param optional_event_property: optional_event_property description
    :param optional_template_property: optional_template_property description
    """

    def __init__(
        self,
        required_event_property: str,
        required_template_property: str,
        optional_event_property: Optional[float] = None,
        optional_template_property: Optional[float] = None
    ):
        super().__init__(event_type="Event With Template Properties")
        properties = {
            "optional_event_property": optional_event_property,
            "optional_template_property": optional_template_property,
            "required_event_property": required_event_property,
            "required_template_property": required_template_property
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventWithDifferentCasingTypes(BaseEvent):
    """event withDifferent_CasingTypes

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes)

    Description for case with space

    Owner: Test codegen

    :param enum_with_space: Description for enum with space
    :param enum_snake_case: description_for_enum_snake_case
    :param enum_camel_case: descriptionForEnumCamelCase
    :param enum_pascal_case: DescirptionForEnumPascalCase
    :param property_with_space: Description for case with space
    :param property_with_snake_case: Description_for_snake_case
    :param property_with_camel_case: descriptionForCamelCase
    :param property_with_pascal_case: DescriptionForPascalCase
    """

    class EnumWithSpace(enum.Enum):
        ENUM_WITH_SPACE = "enum with space"

    class EnumSnakeCase(enum.Enum):
        ENUM_SNAKE_CASE = "enum_snake_case"

    class EnumCamelCase(enum.Enum):
        ENUM_CAMEL_CASE = "enumCamelCase"

    class EnumPascalCase(enum.Enum):
        ENUM_PASCAL_CASE = "EnumPascalCase"

    def __init__(
        self,
        enum_with_space: "EventWithDifferentCasingTypes.EnumWithSpace",
        enum_snake_case: "EventWithDifferentCasingTypes.EnumSnakeCase",
        enum_camel_case: "EventWithDifferentCasingTypes.EnumCamelCase",
        enum_pascal_case: "EventWithDifferentCasingTypes.EnumPascalCase",
        property_with_space: str,
        property_with_snake_case: str,
        property_with_camel_case: str,
        property_with_pascal_case: str
    ):
        super().__init__(event_type="event withDifferent_CasingTypes")
        properties = {
            "enum with space": enum_with_space,
            "enum_snake_case": enum_snake_case,
            "enumCamelCase": enum_camel_case,
            "EnumPascalCase": enum_pascal_case,
            "property with space": property_with_space,
            "property_with_snake_case": property_with_snake_case,
            "propertyWithCamelCase": property_with_camel_case,
            "PropertyWithPascalCase": property_with_pascal_case
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class EventMaxIntForTest(BaseEvent):
    """EventMaxIntForTest

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/EventMaxIntForTest)

    Event to test schema validation

    Owner: Test codegen

    :param int_max_10: property to test schema validation
    """

    def __init__(
        self,
        int_max_10: int
    ):
        super().__init__(event_type="EventMaxIntForTest")
        properties = {
            "intMax10": int_max_10
        }
        self.event_properties = {k: v for k, v in properties.items() if v is not None}


class Ampli:

    def __init__(self):
        self.client: Amplitude = None
        self.disabled: bool = False

    def load(self, options: LoadOptions):
        """Initialize the Ampli wrapper. Call once when your application starts.

        :param options: Configuration options to initialize the Ampli wrapper with. 'environment', 'client.api_key' or 'client.instance' is required.
        """

        self.disabled = options.disabled

        if self.client:
            logging.getLogger(__name__).warning('Warning: Ampli is already initialized. ampli.load() should be called once at application start up.')
            return

        if not options.client:
            options.client = LoadClientOptions(configuration=DEFAULT_CONFIGURATION)

        api_key = None
        if options.client.api_key:
            api_key = options.client.api_key
        elif options.environment:
            api_key = API_KEY[options.environment]
        if not (api_key or options.client.instance):
            logging.getLogger(__name__).error("ampli.load() requires 'environment', 'client.api_key', or 'client.instance'")
            return

        configuration = options.client.configuration or DEFAULT_CONFIGURATION
        self.client = options.client.instance or Amplitude(api_key=api_key, configuration=configuration)

        if not self.client.configuration.plan:
            self.client.configuration.plan = DEFAULT_CONFIGURATION.plan

        # Python SDK min version 1.1.0 supports IngestionMetadata
        # This lazy module loading is for backward compatible concern.
        import amplitude
        if hasattr(amplitude, "IngestionMetadata"):
            ingestion_metadata_class = getattr(amplitude, "IngestionMetadata")
            self.client.configuration.ingestion_metadata = ingestion_metadata_class(
                source_name="python-python-ampli",
                source_version="1.0.0"
            )

    def initialized_and_enabled(self) -> bool:
        """ Check if Ampli is initialized and enabled

        :returns: True if Ampli is initialized and not disabled, False otherwise.
        """
        if not self.client:
            logging.getLogger(__name__).error("Ampli is not yet initialized. Called `ampli.load()` on app start.")
            return False
        return not self.disabled

    def track(self, user_id: Optional[str], event: BaseEvent, event_options: Optional[EventOptions] = None):
        """Track event

        :param user_id: The user's ID.
        :param event: The event to be tracked.
        :param event_options: Extra optional event attributes options.
        """
        if not self.initialized_and_enabled():
            return
        if not event_options:
            event_options = EventOptions()
        if user_id:
            event_options["user_id"] = user_id
        event.load_event_options(event_options)
        self.client.track(event)

    def identify(self, user_id: Optional[str], event: Identify, event_options: Optional[EventOptions] = None):
        """Identify a user and set user properties.

        :param user_id: The user's ID.
        :param event: The Identify event instance.
        :param event_options: Extra optional event attributes options.
        """
        if not self.initialized_and_enabled():
            return
        self.track(user_id, event, event_options)


    def flush(self):
        """Flush events waiting in buffer"""
        if not self.initialized_and_enabled():
            return []
        return self.client.flush()

    def shutdown(self):
        """Disable and shutdown the Ampli client"""
        if not self.initialized_and_enabled():
            return
        self.client.shutdown()
        self.disabled = True

    def event_no_properties(
        self,
        user_id: Optional[str],
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event No Properties'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20No%20Properties')

        Event w no properties description

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, EventNoProperties(), event_options)

    def event_object_types(
        self,
        user_id: Optional[str],
        event: EventObjectTypes,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event Object Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20Object%20Types')

        Event with Object and Object Array

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_all_properties(
        self,
        user_id: Optional[str],
        event: EventWithAllProperties,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With All Properties'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20All%20Properties')

        Event w all properties description

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_array_types(
        self,
        user_id: Optional[str],
        event: EventWithArrayTypes,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Array Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Array%20Types')

        Description for event with Array Types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_const_types(
        self,
        user_id: Optional[str],
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Const Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Const%20Types')

        Description for event with const types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, EventWithConstTypes(), event_options)

    def event_with_enum_types(
        self,
        user_id: Optional[str],
        event: EventWithEnumTypes,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Enum Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Enum%20Types')

        Description for event with enum types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_optional_array_types(
        self,
        user_id: Optional[str],
        event: EventWithOptionalArrayTypes,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Optional Array Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Optional%20Array%20Types')

        Description for event with optional array types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_optional_properties(
        self,
        user_id: Optional[str],
        event: EventWithOptionalProperties,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Optional Properties'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Optional%20Properties')

        Event w optional properties description

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_template_properties(
        self,
        user_id: Optional[str],
        event: EventWithTemplateProperties,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Template Properties'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Template%20Properties')

        Event with template properties description

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_with_different_casing_types(
        self,
        user_id: Optional[str],
        event: EventWithDifferentCasingTypes,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'event withDifferent_CasingTypes'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'event%20withDifferent_CasingTypes')

        Description for case with space

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)

    def event_max_int_for_test(
        self,
        user_id: Optional[str],
        event: EventMaxIntForTest,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'EventMaxIntForTest'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'EventMaxIntForTest')

        Event to test schema validation

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event: The event to track.
        :param event_options: Extra optional event attributes options.
        """
        self.track(user_id, event, event_options)


ampli = Ampli()
