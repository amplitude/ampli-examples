/**
 * Ampli - A strong typed wrapper for your Analytics
 *
 * This file is generated by Amplitude.
 * To update run 'ampli pull obj-c-ampli'
 *
 * Required dependencies: Amplitude-iOS^8.6.0
 * Tracking Plan Version: 0
 * Build: 1.0.0
 *
 * [View Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/latest)
 *
 * [Full Setup Instructions](https://data.amplitude.com/test-codegen/Test%20Codegen/implementation/obj-c-ampli)
 */
#import <Foundation/Foundation.h>
#import "Amplitude.h"

typedef NSMutableDictionary<NSString *, id> MiddlewareExtra;

typedef NS_ENUM(NSInteger, AmpliEnvironment) {
  development,
  production
};

@interface Event: NSObject
@property (nonatomic, strong, readonly) NSString * _Nonnull eventType;
@property (nonatomic, strong, readonly) NSDictionary * _Nullable eventProperties;
@end

@interface LoadClientOptions: NSObject
@property (nonatomic, strong, readwrite) NSString * _Nullable apiKey;
@property (nonatomic, strong, readwrite) Amplitude * _Nullable instance;
@end

@class LoadOptionsBuilder;

@interface LoadOptions: NSObject
@property (nonatomic, readwrite) AmpliEnvironment environment;
@property (nonatomic, readwrite) BOOL disabled;
@property (nonatomic, readwrite) LoadClientOptions * _Nullable client;
- (instancetype _Nonnull) withOverrides:(void (^_Nonnull)(LoadOptionsBuilder*_Nonnull))buildBlock;
+ (instancetype _Nonnull) builderBlock:(void (^_Nonnull)(LoadOptionsBuilder*_Nonnull))buildBlock;
@end

@interface LoadOptionsBuilder: NSObject
@property (nonatomic, readwrite) AmpliEnvironment environment;
@property (nonatomic, readwrite) BOOL disabled;
@property (nonatomic, readwrite) NSString * _Nullable apiKey;
@property (nonatomic, readwrite) Amplitude * _Nullable instance;
- (instancetype _Nonnull)initWithOptions:(LoadOptions *_Nullable)options;
- (LoadOptions *_Nonnull)build;
@end

@class EventProperties;
@class ContextProperties;
@class EventMaxIntForTestProperties;
@class EventNoPropertiesProperties;
@class EventObjectTypesProperties;
@class EventWithAllPropertiesProperties;
@class EventWithAllPropertiesRequiredEnum;
@class EventWithArrayTypesProperties;
@class EventWithConstTypesProperties;
@class EventWithDifferentCasingTypesProperties;
@class EventWithDifferentCasingTypesEnumCamelCase;
@class EventWithDifferentCasingTypesEnumPascalCase;
@class EventWithDifferentCasingTypesEnumSnakeCase;
@class EventWithDifferentCasingTypesEnumWithSpace;
@class EventWithEnumTypesProperties;
@class EventWithEnumTypesOptionalEnum;
@class EventWithEnumTypesRequiredEnum;
@class EventWithOptionalArrayTypesProperties;
@class EventWithOptionalPropertiesProperties;
@class GroupProperties;
@class IdentifyProperties;

NS_ASSUME_NONNULL_BEGIN

#pragma mark - Boxed enums

/// Event 2 Property - Enum
@interface EventWithAllPropertiesRequiredEnum : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithAllPropertiesRequiredEnum *)enum1;
+ (EventWithAllPropertiesRequiredEnum *)enum2;
@end

/// descriptionForEnumCamelCase
@interface EventWithDifferentCasingTypesEnumCamelCase : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithDifferentCasingTypesEnumCamelCase *)enumCamelCase;
@end

/// DescirptionForEnumPascalCase
@interface EventWithDifferentCasingTypesEnumPascalCase : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithDifferentCasingTypesEnumPascalCase *)enumPascalCase;
@end

/// description_for_enum_snake_case
@interface EventWithDifferentCasingTypesEnumSnakeCase : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithDifferentCasingTypesEnumSnakeCase *)enumSnakeCase;
@end

/// Description for enum with space
@interface EventWithDifferentCasingTypesEnumWithSpace : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithDifferentCasingTypesEnumWithSpace *)enumWithSpace;
@end

/// Description for required enum
@interface EventWithEnumTypesOptionalEnum : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithEnumTypesOptionalEnum *)optionalEnum1;
+ (EventWithEnumTypesOptionalEnum *)optionalEnum2;
@end

/// Description for optional enum
@interface EventWithEnumTypesRequiredEnum : NSObject
@property (nonatomic, readonly, copy) NSString *value;
+ (instancetype _Nullable)withValue:(NSString *)value;
+ (EventWithEnumTypesRequiredEnum *)requiredEnum1;
+ (EventWithEnumTypesRequiredEnum *)requiredEnum2;
@end

#pragma mark - Object interfaces

@interface EventProperties : NSObject
@property (nonatomic, nullable, strong) ContextProperties *context;
@property (nonatomic, nullable, strong) EventMaxIntForTestProperties *eventMaxIntForTest;
@property (nonatomic, nullable, strong) EventNoPropertiesProperties *eventNoProperties;
@property (nonatomic, nullable, strong) EventObjectTypesProperties *eventObjectTypes;
@property (nonatomic, nullable, strong) EventWithAllPropertiesProperties *eventWithAllProperties;
@property (nonatomic, nullable, strong) EventWithArrayTypesProperties *eventWithArrayTypes;
@property (nonatomic, nullable, strong) EventWithConstTypesProperties *eventWithConstTypes;
@property (nonatomic, nullable, strong) EventWithDifferentCasingTypesProperties *eventWithDifferentCasingTypes;
@property (nonatomic, nullable, strong) EventWithEnumTypesProperties *eventWithEnumTypes;
@property (nonatomic, nullable, strong) EventWithOptionalArrayTypesProperties *eventWithOptionalArrayTypes;
@property (nonatomic, nullable, strong) EventWithOptionalPropertiesProperties *eventWithOptionalProperties;
@property (nonatomic, nullable, strong) GroupProperties *group;
@property (nonatomic, nullable, strong) IdentifyProperties *identify;
@end

@interface ContextProperties : NSObject
@end

/// Event to test schema validation
@interface EventMaxIntForTestProperties : NSObject
/// property to test schema validation
@property (nonatomic, assign) NSNumber *intMax10;
@end

/// Event w no properties description
@interface EventNoPropertiesProperties : NSObject
@end

/// Event with Object and Object Array
@interface EventObjectTypesProperties : NSObject
/// Property Object Type
@property (nonatomic, nullable, copy) id requiredObject;
/// Property Object Array Type
@property (nonatomic, copy) NSArray *requiredObjectArray;
@end

/// Event w all properties description
@interface EventWithAllPropertiesProperties : NSObject
/// Event 2 Property - Optional String    *     * Examples:    * Some string, or another
@property (nonatomic, nullable, copy) NSString *optionalString;
/// Event 2 Property - Array
@property (nonatomic, copy) NSArray<NSString *> *requiredArray;
/// Event 2 Property - Boolean
@property (nonatomic, assign) NSNumber *requiredBoolean;
/// Event 2 Property - Enum
@property (nonatomic, assign) EventWithAllPropertiesRequiredEnum *requiredEnum;
/// Event 2 Property - Integer    *     * Examples:    * 5, 4, 3
@property (nonatomic, assign) NSNumber *requiredInteger;
/// Event 2 Property - Number
@property (nonatomic, assign) NSNumber *requiredNumber;
/// Event 2 Property - String
@property (nonatomic, copy) NSString *requiredString;
@end

/// Description for event with Array Types
@interface EventWithArrayTypesProperties : NSObject
/// description for required boolean array
@property (nonatomic, copy) NSArray<NSNumber *> *requiredBooleanArray;
/// Description for required number array
@property (nonatomic, copy) NSArray<NSNumber *> *requiredNumberArray;
/// Description for required object array
@property (nonatomic, copy) NSArray *requiredObjectArray;
/// description for required string array
@property (nonatomic, copy) NSArray<NSString *> *requiredStringArray;
@end

/// Description for event with const types
@interface EventWithConstTypesProperties : NSObject
@end

/// Description for case with space
@interface EventWithDifferentCasingTypesProperties : NSObject
/// Description for enum with space
@property (nonatomic, assign) EventWithDifferentCasingTypesEnumWithSpace *enumWithSpace;
/// description_for_enum_snake_case
@property (nonatomic, assign) EventWithDifferentCasingTypesEnumSnakeCase *enumSnakeCase;
/// descriptionForEnumCamelCase
@property (nonatomic, assign) EventWithDifferentCasingTypesEnumCamelCase *enumCamelCase;
/// DescirptionForEnumPascalCase
@property (nonatomic, assign) EventWithDifferentCasingTypesEnumPascalCase *enumPascalCase;
/// Description for case with space
@property (nonatomic, copy) NSString *propertyWithSpace;
/// Description_for_snake_case
@property (nonatomic, copy) NSString *propertyWithSnakeCase;
/// descriptionForCamelCase
@property (nonatomic, copy) NSString *propertyWithCamelCase;
/// DescriptionForPascalCase
@property (nonatomic, copy) NSString *propertyWithPascalCase;
@end

/// Description for event with enum types
@interface EventWithEnumTypesProperties : NSObject
/// Description for required enum
@property (nonatomic, nullable, assign) EventWithEnumTypesOptionalEnum *optionalEnum;
/// Description for optional enum
@property (nonatomic, assign) EventWithEnumTypesRequiredEnum *requiredEnum;
@end

/// Description for event with optional array types
@interface EventWithOptionalArrayTypesProperties : NSObject
/// Description for optional boolean array
@property (nonatomic, nullable, copy) NSArray<NSNumber *> *optionalBooleanArray;
/// Description for optional object array
@property (nonatomic, nullable, copy) NSArray *optionalJsonArray;
/// Description for optional number array
@property (nonatomic, nullable, copy) NSArray<NSNumber *> *optionalNumberArray;
/// Description for optional string array
@property (nonatomic, nullable, copy) NSArray<NSString *> *optionalStringArray;
@end

/// Event w optional properties description
@interface EventWithOptionalPropertiesProperties : NSObject
@property (nonatomic, nullable, copy)   NSArray<NSNumber *> *optionalArrayNumber;
@property (nonatomic, nullable, copy)   NSArray<NSString *> *optionalArrayString;
@property (nonatomic, nullable, strong) NSNumber *optionalBoolean;
@property (nonatomic, nullable, strong) NSNumber *optionalNumber;
/// Optional String property description
@property (nonatomic, nullable, copy) NSString *optionalString;
@end

@interface GroupProperties : NSObject
/// Description for group optionalString
@property (nonatomic, nullable, copy) NSString *optionalString;
/// Description for group requiredBoolean
@property (nonatomic, assign) NSNumber *requiredBoolean;
@end

@interface IdentifyProperties : NSObject
/// Description for identify optionalArray
@property (nonatomic, nullable, copy) NSArray<NSString *> *optionalArray;
/// Description for identify requiredNumber
@property (nonatomic, assign) NSNumber *requiredNumber;
@end

NS_ASSUME_NONNULL_END

@interface Context: Event
+ (instancetype _Nonnull)initEvent;
@end

@interface Identify: Event
+ (instancetype _Nonnull)initWithEventProperties: (IdentifyProperties *_Nonnull) eventProperties;
@end
  
@interface Group: Event
+ (instancetype _Nonnull)initWithEventProperties: (GroupProperties *_Nonnull) eventProperties;
@end
  

@interface EventMaxIntForTest: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventMaxIntForTestProperties *_Nonnull) eventProperties;
@end
  
@interface EventNoProperties: Event
+ (instancetype _Nonnull)initEvent;
@end

@interface EventObjectTypes: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventObjectTypesProperties *_Nonnull) eventProperties;
@end
  
@interface EventWithAllProperties: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventWithAllPropertiesProperties *_Nonnull) eventProperties;
@end
  
@interface EventWithArrayTypes: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventWithArrayTypesProperties *_Nonnull) eventProperties;
@end
  
@interface EventWithConstTypes: Event
+ (instancetype _Nonnull)initEvent;
@end

@interface EventWithDifferentCasingTypes: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventWithDifferentCasingTypesProperties *_Nonnull) eventProperties;
@end
  
@interface EventWithEnumTypes: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventWithEnumTypesProperties *_Nonnull) eventProperties;
@end
  
@interface EventWithOptionalArrayTypes: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventWithOptionalArrayTypesProperties *_Nonnull) eventProperties;
@end
  
@interface EventWithOptionalProperties: Event
+ (instancetype _Nonnull)initWithEventProperties: (EventWithOptionalPropertiesProperties *_Nonnull) eventProperties;
@end
  

@class EventOptionsBuilder;

@interface EventOptions : NSObject
@property (nonatomic, strong) NSString * _Nullable deviceId;
@property (nonatomic, strong) NSString * _Nullable userId;
- (instancetype _Nonnull) withOverrides:(void (^_Nonnull)(EventOptionsBuilder*_Nonnull))buildBlock;
+ (instancetype _Nonnull) builderBlock:(void (^_Nonnull)(EventOptionsBuilder*_Nonnull))buildBlock;
@end

@interface EventOptionsBuilder: NSObject
@property (nonatomic, strong) NSString * _Nullable deviceId;
@property (nonatomic, strong) NSString * _Nullable userId;
- (instancetype _Nonnull)initWithOptions:(EventOptions *_Nullable)options;
- (EventOptions *_Nonnull)build;
@end


@interface Ampli: NSObject
@property (nonatomic, strong, readonly) Amplitude * _Nullable client;
@property (nonatomic, assign, readwrite) BOOL disabled;
+ (instancetype _Nonnull)instance;
- (instancetype _Nonnull )init;
- (void)load;
- (void)load:(LoadOptions *_Nullable)options;
- (void)track:(Event *_Nonnull)event;
- (void)track:(Event *_Nonnull)event extra:(MiddlewareExtra *_Nullable)extra;
- (void)track:(Event *_Nonnull)event options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;
- (void)identify:(NSString *_Nullable)userId properties:(IdentifyProperties *_Nullable)properties;
- (void)identify:(NSString *_Nullable)userId properties:(IdentifyProperties *_Nullable)properties options:(EventOptions *_Nullable)options;
- (void)identify:(NSString *_Nullable)userId properties:(IdentifyProperties *_Nullable)properties extra:(MiddlewareExtra *_Nullable)extra;
- (void)identify:(NSString *_Nullable)userId properties:(IdentifyProperties *_Nullable)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;
- (void)flush;
/**
EventMaxIntForTest

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest)

Event to test schema validation

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventMaxIntForTest:(EventMaxIntForTestProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
EventMaxIntForTest

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest)

Event to test schema validation

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventMaxIntForTest:(EventMaxIntForTestProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
EventMaxIntForTest

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/EventMaxIntForTest)

Event to test schema validation

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventMaxIntForTest:(EventMaxIntForTestProperties *_Nonnull)properties;

/**
Event No Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties)

Event w no properties description

Owner: Test codegen

@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventNoProperties:(MiddlewareExtra *_Nullable)extra;

/**
Event No Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties)

Event w no properties description

Owner: Test codegen

@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventNoProperties:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event No Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20No%20Properties)

Event w no properties description

Owner: Test codegen

*/
- (void)eventNoProperties;

/**
Event Object Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types)

Event with Object and Object Array

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventObjectTypes:(EventObjectTypesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
Event Object Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types)

Event with Object and Object Array

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventObjectTypes:(EventObjectTypesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event Object Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20Object%20Types)

Event with Object and Object Array

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventObjectTypes:(EventObjectTypesProperties *_Nonnull)properties;

/**
Event With All Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties)

Event w all properties description

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithAllProperties:(EventWithAllPropertiesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With All Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties)

Event w all properties description

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithAllProperties:(EventWithAllPropertiesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With All Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20All%20Properties)

Event w all properties description

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventWithAllProperties:(EventWithAllPropertiesProperties *_Nonnull)properties;

/**
Event With Array Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types)

Description for event with Array Types

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithArrayTypes:(EventWithArrayTypesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Array Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types)

Description for event with Array Types

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithArrayTypes:(EventWithArrayTypesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Array Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Array%20Types)

Description for event with Array Types

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventWithArrayTypes:(EventWithArrayTypesProperties *_Nonnull)properties;

/**
Event With Const Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types)

Description for event with const types

Owner: Test codegen

@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithConstTypes:(MiddlewareExtra *_Nullable)extra;

/**
Event With Const Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types)

Description for event with const types

Owner: Test codegen

@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithConstTypes:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Const Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Const%20Types)

Description for event with const types

Owner: Test codegen

*/
- (void)eventWithConstTypes;

/**
event withDifferent_CasingTypes

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes)

Description for case with space

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithDifferentCasingTypes:(EventWithDifferentCasingTypesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
event withDifferent_CasingTypes

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes)

Description for case with space

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithDifferentCasingTypes:(EventWithDifferentCasingTypesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
event withDifferent_CasingTypes

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/event%20withDifferent_CasingTypes)

Description for case with space

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventWithDifferentCasingTypes:(EventWithDifferentCasingTypesProperties *_Nonnull)properties;

/**
Event With Enum Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types)

Description for event with enum types

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithEnumTypes:(EventWithEnumTypesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Enum Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types)

Description for event with enum types

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithEnumTypes:(EventWithEnumTypesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Enum Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Enum%20Types)

Description for event with enum types

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventWithEnumTypes:(EventWithEnumTypesProperties *_Nonnull)properties;

/**
Event With Optional Array Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types)

Description for event with optional array types

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithOptionalArrayTypes:(EventWithOptionalArrayTypesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Optional Array Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types)

Description for event with optional array types

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithOptionalArrayTypes:(EventWithOptionalArrayTypesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Optional Array Types

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Array%20Types)

Description for event with optional array types

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventWithOptionalArrayTypes:(EventWithOptionalArrayTypesProperties *_Nonnull)properties;

/**
Event With Optional Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties)

Event w optional properties description

Owner: Test codegen

@param properties The event's properties
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithOptionalProperties:(EventWithOptionalPropertiesProperties *_Nonnull)properties extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Optional Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties)

Event w optional properties description

Owner: Test codegen

@param properties The event's properties
@param options Optional EventOptions
@param extra Extra untyped parameters for use in middleware.
*/
- (void)eventWithOptionalProperties:(EventWithOptionalPropertiesProperties *_Nonnull)properties options:(EventOptions *_Nullable)options extra:(MiddlewareExtra *_Nullable)extra;

/**
Event With Optional Properties

[View in Tracking Plan](https://data.amplitude.com/test-codegen/Test%20Codegen/events/main/0.0.0/Event%20With%20Optional%20Properties)

Event w optional properties description

Owner: Test codegen

@param properties The event's properties
*/
- (void)eventWithOptionalProperties:(EventWithOptionalPropertiesProperties *_Nonnull)properties;
@end
