//
//  AppDelegate.m
//  AmpliObjectiveCSampleApp
//
//  Created by Qingzhuo Zhen on 11/24/21.
//

#import "AppDelegate.h"
#import "Ampli.h"

@interface AppDelegate ()

@end

@implementation AppDelegate


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
    // [Ampli.instance load:[LoadOptions initWithEnvironment:dev]];

    /*
     * OR Provide a specific Amplitude API key
     */
    // [Ampli.instance load:[LoadOptions initWithApiKey:@"Custom api key"]];

    /*
     * OR Use an existing Amplitude instance
     * requires `@import AmplitudeSwift;`
     */
    // AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"Custom api key" instanceName:@"instanceName"];
    // Amplitude* client = [Amplitude initWithConfiguration:configuration];
    // LoadClientOptions* clientOptions = [LoadClientOptions initWithInstance:client];
    // [Ampli.instance load:[LoadOptions initWithClientOptions:clientOptions]];

    /*
     * For testing you can disable Ampli
     */
    // [Ampli.instance load:[LoadOptions initWithDisabled:ENV.IS_TESTING ? YES : NO]];

    /*
     * Make as many Ampli instances as you want
     */
    // Ampli* ampli2 = [Ampli new];
    // [ampli2 load:[LoadOptions initWithApiKey:@"Custom api key"]];

    NSString *apiKey = [[[NSProcessInfo processInfo] environment] objectForKey:@"AMPLITUDE_API_KEY"];
    Ampli *ampli = [Ampli instance];

    // Load
    [ampli load:[LoadOptions initWithApiKey:apiKey]];

    // Add Plugin
    [ampli.client add:[AMPPlugin initWithType:AMPPluginTypeDestination execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        NSString *logString = [NSString stringWithFormat:@"event_type=%@", event.eventType];
        NSLog(@"[ampli] %@", logString);
        return event;
    }]];

    // Identify
    [ampli identify:@"ampli-objc-user" identify:[Identify requiredNumber: 1.23F builderBlock:^(IdentifyBuilder *b) {
        b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
    }]];

    // Set Group
    [ampli.client setGroup:@"ampli group type" groupName:@"ampli objective-c group"];

    // GroupIdentify
    AMPIdentify *identifyArgs = [AMPIdentify new];
    [identifyArgs set:@"requiredBoolean" value:@true];
    [identifyArgs set:@"optionalString" value:@"optional string"];
    [ampli.client groupIdentify:@"ampli group type" groupName:@"ampli objective-c group" identify:identifyArgs];

    // Track events with dedicated event methods
    [ampli track:[EventNoProperties build]];

    [ampli track:[EventMaxIntForTest intMax10: 5]];
    [ampli track:[EventMaxIntForTest intMax10: 20]];

    [ampli track:[EventWithConstTypes build]];

    [ampli track:[EventWithAllProperties requiredArray:@[@"I'm required"]
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum2
                                         requiredInteger:1
                                         requiredNumber:4.2
                                         requiredString:@"I'm also required"
                                         builderBlock:^(EventWithAllPropertiesBuilder * b) {
                                             b.optionalString = @"I'm optional";
    }]];

    [ampli track:[EventWithAllProperties requiredArray:@[@"I'm required"]
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum2
                                         requiredInteger:1
                                         requiredNumber:4.2
                                         requiredString:@"I'm also required"
                                         builderBlock:^(EventWithAllPropertiesBuilder * b) {
                                             b.optionalString = @"I'm optional";
    }]];

    NSDictionary *obj = @{ @"key" : @true, @"key2" : @42 };

    [ampli track:[EventObjectTypes requiredObject:obj
                                          requiredObjectArray:@[obj]
    ]];

    [ampli track:[EventWithArrayTypes requiredBooleanArray:@[@true]
                                          requiredEnumArray:@[@"Enum1"]
                                          requiredNumberArray:@[@1.0]
                                          requiredObjectArray:@[obj]
                                          requiredStringArray:@[@"required"]
    ]];

    [ampli track:[EventWithEnumTypes requiredEnum:EventWithEnumTypesRequiredEnumRequiredEnum2]];

    [ampli track:[EventWithOptionalArrayTypes build]];

    [ampli track:[EventWithOptionalProperties build]];

    [ampli track:[EventWithTemplateProperties requiredEventProperty:@"event property"
                                          requiredTemplateProperty:@"template property"
    ]];

    [ampli track:[EventWithDifferentCasingTypes enumWithSpace:EventWithDifferentCasingTypesEnumWithSpaceEnumWithSpace
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
