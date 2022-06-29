# ampli.py
# 
# Ampli - A strong typed wrapper for your Analytics
# 
# This file is generated by Amplitude.
# To update run 'ampli pull python-ampli'
# 
# Required dependencies: amplitude-analytics
# Tracking Plan Version: 0
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
    DEVELOPMENT = 'development'
    PRODUCTION = 'production'


API_KEY: Dict[Environment, str] = {
    Environment("development"): "",
    Environment("production"): ""
}

DEFAULT_CONFIGURATION = Config(
    plan=Plan(
        branch="main",
        source="python-ampli",
        version="0",
        version_id="79154a50-f057-4db5-9755-775e4e9f05e6"
    )
)


class LoadClientOptions:
    
    def __init__(self, api_key: Optional[str] = None,
                 instance: Optional[Amplitude] = None,
                 configuration: Optional[Config] = None):
        self.api_key = api_key
        self.instance = instance
        self.configuration = configuration


class LoadOptions:

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
        self.user_properties = {
            "optionalArray": optional_array,
            "requiredNumber": required_number
        }


class Group(GroupIdentifyEvent):
    """Group

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Group)

    Group properties.

    :param required_boolean: Description for group requiredBoolean
    :param optional_string: Description for group optionalString
    """

    def __init__(
        self,
        required_boolean: bool,
        optional_string: Optional[str] = None
    ):
        super().__init__()
        self.group_properties = {
            "optionalString": optional_string,
            "requiredBoolean": required_boolean
        }


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
        self.event_properties = {
            "intMax10": int_max_10
        }


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
        self.event_properties = {
            "requiredObject": required_object,
            "requiredObjectArray": required_object_array
        }


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
        self.event_properties = {
            "optionalString": optional_string,
            "requiredArray": required_array,
            "requiredBoolean": required_boolean,
            "requiredConst": "some-const-value",
            "requiredEnum": required_enum,
            "requiredInteger": required_integer,
            "requiredNumber": required_number,
            "requiredString": required_string
        }


class EventWithArrayTypes(BaseEvent):
    """Event With Array Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Array%20Types)

    Description for event with Array Types

    Owner: Test codegen

    :param required_boolean_array: description for required boolean array
    :param required_number_array: Description for required number array
    :param required_object_array: Description for required object array
    :param required_string_array: description for required string array
    """

    def __init__(
        self,
        required_boolean_array: List[bool],
        required_number_array: List[float],
        required_object_array: List[Any],
        required_string_array: List[str]
    ):
        super().__init__(event_type="Event With Array Types")
        self.event_properties = {
            "requiredBooleanArray": required_boolean_array,
            "requiredNumberArray": required_number_array,
            "requiredObjectArray": required_object_array,
            "requiredStringArray": required_string_array
        }


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
        self.event_properties = {
            "Boolean Const": True,
            "Integer Const": 10,
            "Number Const": 2.2,
            "String Const": "String-Constant",
            "String Const WIth Quotes": "\"String \"Const With\" Quotes\"",
            "String Int Const": 0
        }


class EventWithDifferentCasingTypes(BaseEvent):
    """event withDifferent_CasingTypes

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/event%20withDifferent_CasingTypes)

    Description for case with space

    Owner: Test codegen

    :param enum_camel_case: descriptionForEnumCamelCase
    :param enum_pascal_case: DescirptionForEnumPascalCase
    :param enum_snake_case: description_for_enum_snake_case
    :param enum_with_space: Description for enum with space
    :param property_with_camel_case: descriptionForCamelCase
    :param property_with_pascal_case: DescriptionForPascalCase
    :param property_with_snake_case: Description_for_snake_case
    :param property_with_space: Description for case with space
    """

    class EnumCamelCase(enum.Enum):
        ENUM_CAMEL_CASE = "enumCamelCase"

    class EnumPascalCase(enum.Enum):
        ENUM_PASCAL_CASE = "EnumPascalCase"

    class EnumSnakeCase(enum.Enum):
        ENUM_SNAKE_CASE = "enum_snake_case"

    class EnumWithSpace(enum.Enum):
        ENUM_WITH_SPACE = "enum with space"

    def __init__(
        self,
        enum_camel_case: "EventWithDifferentCasingTypes.EnumCamelCase",
        enum_pascal_case: "EventWithDifferentCasingTypes.EnumPascalCase",
        enum_snake_case: "EventWithDifferentCasingTypes.EnumSnakeCase",
        enum_with_space: "EventWithDifferentCasingTypes.EnumWithSpace",
        property_with_camel_case: str,
        property_with_pascal_case: str,
        property_with_snake_case: str,
        property_with_space: str
    ):
        super().__init__(event_type="event withDifferent_CasingTypes")
        self.event_properties = {
            "enumCamelCase": enum_camel_case,
            "EnumPascalCase": enum_pascal_case,
            "enum_snake_case": enum_snake_case,
            "enum with space": enum_with_space,
            "propertyWithCamelCase": property_with_camel_case,
            "PropertyWithPascalCase": property_with_pascal_case,
            "property_with_snake_case": property_with_snake_case,
            "property with space": property_with_space
        }


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
        self.event_properties = {
            "optional enum": optional_enum,
            "required enum": required_enum
        }


class EventWithOptionalArrayTypes(BaseEvent):
    """Event With Optional Array Types

    [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Event%20With%20Optional%20Array%20Types)

    Description for event with optional array types

    Owner: Test codegen

    :param optional_boolean_array: Description for optional boolean array
    :param optional_json_array: Description for optional object array
    :param optional_number_array: Description for optional number array
    :param optional_string_array: Description for optional string array
    """

    def __init__(
        self,
        optional_boolean_array: Optional[List[bool]] = None,
        optional_json_array: Optional[List[Any]] = None,
        optional_number_array: Optional[List[float]] = None,
        optional_string_array: Optional[List[str]] = None
    ):
        super().__init__(event_type="Event With Optional Array Types")
        self.event_properties = {
            "optionalBooleanArray": optional_boolean_array,
            "optionalJSONArray": optional_json_array,
            "optionalNumberArray": optional_number_array,
            "optionalStringArray": optional_string_array
        }


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
        self.event_properties = {
            "optionalArrayNumber": optional_array_number,
            "optionalArrayString": optional_array_string,
            "optionalBoolean": optional_boolean,
            "optionalNumber": optional_number,
            "optionalString": optional_string
        }


class Ampli:
    
    def __init__(self):
        self.client: Amplitude = None
        self.disabled: bool = False

    def load(self, options: Optional[LoadOptions] = None):
        """Initialize the Ampli SDK. Call once when your application starts.

        :param options: Configuration options to initialize the Ampli SDK with.
        """
        if not options:
            options = LoadOptions()
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
        :param event_options: Optional event options.
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
        :param event_options: Optional event options.
        """
        if not self.initialized_and_enabled():
            return
        self.track(user_id, event, event_options)

    def group_identify(self, group_type: str,
                       group_name: str,
                       event: Group, 
                       event_options: Optional[EventOptions] = None):
        """Identify a group and set group properties.

        :param group_type: The group type.
        :param group_name: The group name.
        :param event: The Group event instance.
        :param event_options: Optional event options.
        """
        if not self.initialized_and_enabled():
            return
        event.groups = {group_type: group_name}
        self.track(None, event, event_options)

    def set_group(self, user_id: Optional[str],
                  group_type: str,
                  group_name: Union[str, List[str]],
                  event_options: Optional[EventOptions] = None):
        """Set Group for the current user

        :param user_id: The user's ID.
        :param group_type: The group type.
        :param group_name: The group name.
        :param event_options: Optional event options.
        """
        if not self.initialized_and_enabled():
            return
        if not event_options:
            event_options = EventOptions()
        if user_id:
            event_options["user_id"] = user_id
        self.client.set_group(group_type, group_name, event_options)
        
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
        
    def event_max_int_for_test(
        self,
        user_id: Optional[str],
        int_max_10: int,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'EventMaxIntForTest'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'EventMaxIntForTest')

        Event to test schema validation

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param int_max_10: property to test schema validation
        """
        event = EventMaxIntForTest(
            int_max_10
        )
        self.track(user_id, event, event_options)

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
        :param event_options: Extra event attributes options.
        """
        event = EventNoProperties(

        )
        self.track(user_id, event, event_options)

    def event_object_types(
        self,
        user_id: Optional[str],
        required_object: Any,
        required_object_array: List[Any],
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event Object Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20Object%20Types')

        Event with Object and Object Array

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param required_object: Property Object Type
        :param required_object_array: Property Object Array Type
        """
        event = EventObjectTypes(
            required_object,
            required_object_array
        )
        self.track(user_id, event, event_options)

    def event_with_all_properties(
        self,
        user_id: Optional[str],
        required_array: List[str],
        required_boolean: bool,
        required_enum: "EventWithAllProperties.RequiredEnum",
        required_integer: int,
        required_number: float,
        required_string: str,
        optional_string: Optional[str] = None,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With All Properties'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20All%20Properties')

        Event w all properties description

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param required_array: Event 2 Property - Array
        :param required_boolean: Event 2 Property - Boolean
        :param required_enum: Event 2 Property - Enum
        :param required_integer: Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
        :param required_number: Event 2 Property - Number
        :param required_string: Event 2 Property - String
        :param optional_string: Event 2 Property - Optional String    *     * Examples:    * Some string, or another
        """
        event = EventWithAllProperties(
            required_array,
            required_boolean,
            required_enum,
            required_integer,
            required_number,
            required_string,
            optional_string
        )
        self.track(user_id, event, event_options)

    def event_with_array_types(
        self,
        user_id: Optional[str],
        required_boolean_array: List[bool],
        required_number_array: List[float],
        required_object_array: List[Any],
        required_string_array: List[str],
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Array Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Array%20Types')

        Description for event with Array Types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param required_boolean_array: description for required boolean array
        :param required_number_array: Description for required number array
        :param required_object_array: Description for required object array
        :param required_string_array: description for required string array
        """
        event = EventWithArrayTypes(
            required_boolean_array,
            required_number_array,
            required_object_array,
            required_string_array
        )
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
        :param event_options: Extra event attributes options.
        """
        event = EventWithConstTypes(

        )
        self.track(user_id, event, event_options)

    def event_with_different_casing_types(
        self,
        user_id: Optional[str],
        enum_camel_case: "EventWithDifferentCasingTypes.EnumCamelCase",
        enum_pascal_case: "EventWithDifferentCasingTypes.EnumPascalCase",
        enum_snake_case: "EventWithDifferentCasingTypes.EnumSnakeCase",
        enum_with_space: "EventWithDifferentCasingTypes.EnumWithSpace",
        property_with_camel_case: str,
        property_with_pascal_case: str,
        property_with_snake_case: str,
        property_with_space: str,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'event withDifferent_CasingTypes'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'event%20withDifferent_CasingTypes')

        Description for case with space

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param enum_camel_case: descriptionForEnumCamelCase
        :param enum_pascal_case: DescirptionForEnumPascalCase
        :param enum_snake_case: description_for_enum_snake_case
        :param enum_with_space: Description for enum with space
        :param property_with_camel_case: descriptionForCamelCase
        :param property_with_pascal_case: DescriptionForPascalCase
        :param property_with_snake_case: Description_for_snake_case
        :param property_with_space: Description for case with space
        """
        event = EventWithDifferentCasingTypes(
            enum_camel_case,
            enum_pascal_case,
            enum_snake_case,
            enum_with_space,
            property_with_camel_case,
            property_with_pascal_case,
            property_with_snake_case,
            property_with_space
        )
        self.track(user_id, event, event_options)

    def event_with_enum_types(
        self,
        user_id: Optional[str],
        required_enum: "EventWithEnumTypes.RequiredEnum",
        optional_enum: Optional["EventWithEnumTypes.OptionalEnum"] = None,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Enum Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Enum%20Types')

        Description for event with enum types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param required_enum: Description for optional enum
        :param optional_enum: Description for required enum
        """
        event = EventWithEnumTypes(
            required_enum,
            optional_enum
        )
        self.track(user_id, event, event_options)

    def event_with_optional_array_types(
        self,
        user_id: Optional[str],
        optional_boolean_array: Optional[List[bool]] = None,
        optional_json_array: Optional[List[Any]] = None,
        optional_number_array: Optional[List[float]] = None,
        optional_string_array: Optional[List[str]] = None,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Optional Array Types'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Optional%20Array%20Types')

        Description for event with optional array types

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param optional_boolean_array: Description for optional boolean array
        :param optional_json_array: Description for optional object array
        :param optional_number_array: Description for optional number array
        :param optional_string_array: Description for optional string array
        """
        event = EventWithOptionalArrayTypes(
            optional_boolean_array,
            optional_json_array,
            optional_number_array,
            optional_string_array
        )
        self.track(user_id, event, event_options)

    def event_with_optional_properties(
        self,
        user_id: Optional[str],
        optional_array_number: Optional[List[float]] = None,
        optional_array_string: Optional[List[str]] = None,
        optional_boolean: Optional[bool] = None,
        optional_number: Optional[float] = None,
        optional_string: Optional[str] = None,
        event_options: Optional[EventOptions] = None
    ):
        """Track event 'Event With Optional Properties'

        [View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest/Track%20event%20'Event%20With%20Optional%20Properties')

        Event w optional properties description

        Owner: Test codegen

        :param user_id: The user's ID.
        :param event_options: Extra event attributes options.
        :param optional_array_number: Property has no description provided in tracking plan.
        :param optional_array_string: Property has no description provided in tracking plan.
        :param optional_boolean: Property has no description provided in tracking plan.
        :param optional_number: Property has no description provided in tracking plan.
        :param optional_string: Optional String property description
        """
        event = EventWithOptionalProperties(
            optional_array_number,
            optional_array_string,
            optional_boolean,
            optional_number,
            optional_string
        )
        self.track(user_id, event, event_options)


ampli = Ampli()
