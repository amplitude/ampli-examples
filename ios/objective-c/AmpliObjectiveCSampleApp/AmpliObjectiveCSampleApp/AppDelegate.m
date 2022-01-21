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
    [ampli setGroup:@"ampli group type" value:@"ampli objective-c group"];

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

//    // This seems kinda pointless, its just as verbose as the above usage but would greatly increase codegen size
//    [ampli eventWithAllPropertiesWithRequiredArray:@[@"I'm required"]
//             requiredBoolean:true
//             requiredEnum:EventWithAllPropertiesRequiredEnumEnum2
//             requiredInteger:1
//             requiredNumber:4.2
//             requiredString:@"I'm also required"
//             builderBlock:^(EventWithAllPropertiesBuilder * b) {
//        b.optionalString = @"I'm optional";
//    }];


    // TODO: Do we want to allow to track using direct params? Seems kinda pointless

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
