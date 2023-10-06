//
//  AppDelegate.m
//  AmpliObjectiveCSampleApp
//
//  Created by Qingzhuo Zhen on 11/24/21.
//

#import "AppDelegate.h"
#import "Ampli.h"
#import "Amplitude.h"

@interface AppDelegate ()

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions2:(NSDictionary *)launchOptions {
    [Amplitude instance].trackingSessionEvents = true;
    [[Amplitude instance] initializeApiKey:@"YOUR-API-KEY"];
    
    NSString* eventType = @"Button Clicked";
    NSDictionary* eventProperties = @{@"key": @"value"};
    [[Amplitude instance] logEvent:eventType withEventProperties:eventProperties];
    
    NSNumber* timestamp = [NSNumber numberWithLongLong:[[NSDate date] timeIntervalSince1970] * 1000];
    //[[Amplitude instance] logEvent:eventType withTimestamp:timestamp];
    
    NSDictionary* groups = @{@"orgId": @"10"};
    [[Amplitude instance] logEvent:eventType withEventProperties:eventProperties withGroups:groups];
 
    [[Amplitude instance] uploadEvents];
    
    NSString* userId = @"TEST-USER-ID";
    [[Amplitude instance] setUserId:userId];
    
    NSString* deviceId = @"TEST-DEVICE-ID";
    [[Amplitude instance] setDeviceId:deviceId];
 
    [[Amplitude instance] setSessionId:[timestamp longLongValue]];
    
    [[Amplitude instance] clearUserProperties];
    
    [[Amplitude instance] setUserProperties:@{
        @"membership": @"paid",
        @"payment": @"bank"
    }];
    
    AMPIdentify* identify = [AMPIdentify new];
    [identify set:@"membership" value:@"paid"];
    [[Amplitude instance] identify:identify];
    
    [[Amplitude instance] groupIdentifyWithGroupType:@"TEST-GROUP-TYPE" groupName:@"TEST-GROUP-NAME" groupIdentify:identify];
    
    AMPRevenue* revenue = [AMPRevenue new];
    [revenue setProductIdentifier:@"productidentifier"];
    [revenue setQuantity:3];
    [revenue setPrice:@3.99];
    [[Amplitude instance] logRevenueV2:revenue];
    
    return true;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    /*
     * '[Ampli instance]' is the default instance of Ampli
     *
     * When you pull your tracking plan you can use the defaults and call load() without arguments
     * This requires connecting your account via `ampli pull` which will set you API key in the generated Ampli SDK
     */
    // [Ampli.instance]

    /*
     * OR Specify a AmpliEnvironment
     */
    // [Ampli.instance load:[LoadOptions initWithEnvironment:development]];

    /*
     * OR Provide a specific Amplitude API key
     */
    // [Ampli.instance load:[LoadOptions initWithApiKey:@"Custom api key"]];

    /*
     * OR Use an existing Amplitude instance
     * requires `#import "Amplitude.h"`
     */
    // Amplitude *client = [Amplitude instanceWithName:@"instanceName"];
    // [client initializeApiKey:@"Custom api key"];
    // [Ampli.instance load:[LoadOptions initWithAmplitudeInstance:client]];

    /*
     * For testing you can disable Ampli
     */
    // [Ampli.instance load:[LoadOptions initWithDisabled:ENV.IS_TESTING ? YES : NO]];

    /*
     * Make as many Ampli instances as you want
     */
    // Ampli ampli2 = [Ampli new];
    // [ampli2 load:[LoadOptions initWithApiKey:@"Custom api key"]];

    NSString *apiKey = [[[NSProcessInfo processInfo] environment] objectForKey:@"AMPLITUDE_API_KEY"];
    Ampli *ampli = [Ampli instance];

    // Load
    [ampli load:[LoadOptions builderBlock:^(LoadOptionsBuilder *b) {
        b.apiKey = apiKey;
    }]];

    // Add Middleware
    AMPBlockMiddleware *loggingMiddleware = [[AMPBlockMiddleware alloc] initWithBlock: ^(AMPMiddlewarePayload *payload, AMPMiddlewareNext _Nonnull next) {
        // Output event and extra from payload
        NSString *logString = [NSString stringWithFormat:@"event=%@ extra=%@", [payload event], [payload extra]];
        NSLog(@"[ampli] %@", logString);
        // Continue to next middleware
        next(payload);
    }];
    [ampli.client addEventMiddleware:loggingMiddleware];

    // Identify
    [ampli identify:@"ampli-objc-user" event:[Identify requiredNumber: 1.23F builderBlock:^(IdentifyBuilder *b) {
        b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
    }]];

    // Set Group
    [ampli.client setGroup:@"ampli group type" groupName:@"ampli objective-c group"];

    // GroupIdentify
    AMPIdentify *identifyArgs = [AMPIdentify identify];
    [identifyArgs set:@"requiredBoolean" value:@true];
    [identifyArgs set:@"optionalString" value:@"optional string"];
    [ampli.client groupIdentifyWithGroupType:@"ampli group type" groupName:@"ampli objective-c group" groupIdentify:identifyArgs];

    // MiddlewareExtra can be used to pass information to middleware
    NSMutableDictionary *extra = [NSMutableDictionary new];
    [extra setObject:@"extra test" forKey:@"test"];

    // Track events with dedicated event methods
    [ampli eventNoProperties];

    [ampli eventMaxIntForTest:[EventMaxIntForTest intMax10: 5]];
    [ampli track:[EventMaxIntForTest intMax10: 20] extra:extra];

    [ampli eventWithConstTypes: extra];

    [ampli track:[EventWithAllProperties requiredArray:@[@"I'm required"]
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum2
                                         requiredInteger:1
                                         requiredNumber:4.2
                                         requiredString:@"I'm also required"
                                         builderBlock:^(EventWithAllPropertiesBuilder * b) {
                                             b.optionalString = @"I'm optional";
    }]];

    [ampli eventWithAllProperties:[EventWithAllProperties requiredArray:@[@"I'm required"]
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum2
                                         requiredInteger:1
                                         requiredNumber:4.2
                                         requiredString:@"I'm also required"
                                         builderBlock:^(EventWithAllPropertiesBuilder * b) {
                                             b.optionalString = @"I'm optional";
    }]];

    NSDictionary *obj = @{ @"key" : @true, @"key2" : @42 };

    [ampli eventObjectTypes:[EventObjectTypes requiredObject:obj
                                          requiredObjectArray:@[obj]
    ]];

    [ampli eventWithArrayTypes:[EventWithArrayTypes requiredBooleanArray:@[@true]
                                          requiredEnumArray:@[@"Enum1"]
                                          requiredNumberArray:@[@1.0]
                                          requiredObjectArray:@[obj]
                                          requiredStringArray:@[@"required"]
    ]];

    [ampli eventWithEnumTypes:[EventWithEnumTypes requiredEnum:EventWithEnumTypesRequiredEnumRequiredEnum2]];

    [ampli eventWithOptionalArrayTypes:[EventWithOptionalArrayTypes new]];

    [ampli eventWithOptionalProperties:[EventWithOptionalProperties new]];

    [ampli eventWithTemplateProperties:[EventWithTemplateProperties requiredEventProperty:@"event property"
                                          requiredTemplateProperty:@"template property"
    ]];

    [ampli eventWithDifferentCasingTypes:[EventWithDifferentCasingTypes enumWithSpace:EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace
                                          enumSnakeCase:EventWithDifferentCasingTypesEnumSnakeCaseEnumSnakeCase
                                          enumCamelCase:EventWithDifferentCasingTypesEnumCamelCaseEnumCamelCase
                                          enumPascalCase:EventWithDifferentCasingTypesEnumPascalCaseEnumPascalCase
                                          propertyWithSpace:@"property with space"
                                          propertyWithSnakeCase:@"property with snake case"
                                          propertyWithCamelCase:@"property with camel case"
                                          propertyWithPascalCase:@"property with pascal case"
    ]];

    [ampli flush];
    return YES;
}


#pragma mark - UISceneSession lifecycle


- (UISceneConfiguration *)application:(UIApplication *)application configurationForConnectingSceneSession:(UISceneSession *)connectingSceneSession options:(UISceneConnectionOptions *)options {
    // Called when a new scene session is being created.
    // Use this method to select a configuration to create the new scene with.
    return [[UISceneConfiguration alloc] initWithName:@"Default Configuration" sessionRole:connectingSceneSession.role];
}


- (void)application:(UIApplication *)application didDiscardSceneSessions:(NSSet<UISceneSession *> *)sceneSessions {
    // Called when the user discards a scene session.
    // If any sessions were discarded while the application was not running, this will be called shortly after application:didFinishLaunchingWithOptions.
    // Use this method to release any resources that were specific to the discarded scenes, as they will not return.
}


@end
