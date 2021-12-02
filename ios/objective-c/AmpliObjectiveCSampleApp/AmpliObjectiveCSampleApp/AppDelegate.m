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
    //    '[Ampli instance]' is the default instance of Ampli
    //
    //    When you pull your tracking plan you can use the defaults and call load() without arguments
    //    This requires connecting your account via `ampli pull` which will set you API key in the generated Ampli SDK
    //
    //    OR Specify a AmpliEnvironment
    //    [ampli load:[LoadOptions initWithEnvironment:development]];
    //
    //    OR Provide a specific Amplitude API key
    //    [ampli load:[LoadOptions initWithApiKey:@"Custom api key"]];
    //
    //    OR Use an existing Amplitude instance
    //    requires `#import "Amplitude.h"`
    //    Amplitude *instance = [Amplitude instanceWithName:@"instanceName"];
    //    [instance initializeApiKey:@"Custom api key"];
    //    [ampli load:[LoadOptions initWithAmplitudeInstance:instance]];
    //
    //    For testing you can disable ampli
    //    [ampli load:[LoadOptions initWithDisabled:ENV.IS_TESTING ? YES : NO]];
    //
    //    Make as many Ampli instances as you want
    //    Ampli ampli2 = [Ampli new];
    //    [ampli2 load:[LoadOptions initWithApiKey:@"Custom api key"]];
    NSString *apiKey = [[[NSProcessInfo processInfo] environment] objectForKey:@"AMPLITUDE_API_KEY"];
    Ampli *ampli = [Ampli instance];
    [ampli load:[LoadOptions initWithApiKey:apiKey]];
    IdentifyProperties *identifyProperties = [IdentifyProperties new];
    identifyProperties.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
    identifyProperties.requiredNumber = @22;
    [ampli identify:@"ampli-objc-user" properties:identifyProperties];
    [ampli eventNoProperties];
    NSMutableDictionary *extraDict = [NSMutableDictionary new];
    [extraDict setObject:@"extra test"
              forKey:@"test"];
    EventMaxIntForTestProperties *eventMaxIntForTestProperties = [EventMaxIntForTestProperties new];
    eventMaxIntForTestProperties.intMax10 = @20;
    [ampli eventMaxIntForTest:eventMaxIntForTestProperties withExtra:extraDict];
    [ampli eventWithConstTypes:extraDict];
    EventWithAllPropertiesProperties *eventWithAllPropertiesProperties = [EventWithAllPropertiesProperties new];
    eventWithAllPropertiesProperties.requiredArray = [NSArray arrayWithObjects:@"array element 1", @"array element 2", nil];
    eventWithAllPropertiesProperties.requiredBoolean = @YES;
    eventWithAllPropertiesProperties.requiredEnum = [RequiredEnum enum1];
    eventWithAllPropertiesProperties.requiredInteger = @10;
    eventWithAllPropertiesProperties.requiredNumber = @2.0;
    eventWithAllPropertiesProperties.requiredString = @"required string";
    EventWithAllProperties *eventWithAllProperties = [EventWithAllProperties initWithEventProperties:eventWithAllPropertiesProperties];
    [ampli track:eventWithAllProperties];
    
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
