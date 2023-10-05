//
//  AmpliTests.m
//  AmpliObjectiveCSampleAppTests
//
//  Created by Qingzhuo Zhen on 12/2/21.
//

#import <XCTest/XCTest.h>
@import AmplitudeSwift;
#import "Ampli.h"

@interface AmpliTests : XCTestCase
@property (nonatomic, strong) Ampli *ampli;
@property (nonatomic, weak) XCTestExpectation* pluginRun;
@end

@implementation AmpliTests

- (void)setUp {
    _ampli = [Ampli new];
    _pluginRun = [self expectationWithDescription:@"Wait for plugin run"];
}

- (void) initAmpliWithNewInstance:(NSString *) instanceName {
    AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:@"test-api-key" instanceName:instanceName];
    configuration.defaultTracking = AMPDefaultTrackingOptions.NONE;
    configuration.migrateLegacyData = false;
    LoadClientOptions* clientOptions = [LoadClientOptions initWithConfiguration:configuration];
    [_ampli load:[LoadOptions initWithClientOptions:clientOptions]];
}

- (void)testTrackWithNoProperies {
    [self initAmpliWithNewInstance:@"testTrackWithNoProperties"];

    [_ampli.client add:[AMPPlugin initWithType:AMPPluginTypeBefore execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        XCTAssertEqualObjects(event.eventType, @"Event No Properties");
        [self->_pluginRun fulfill];
        return event;
    }]];

    [_ampli track:[EventNoProperties build]];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:1.0 handler:^(NSError *error) {
        if (error) {
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testTrackEventWithAllTypes {
    [self initAmpliWithNewInstance:@"testTrackEventWithAllTypes"];

    NSMutableDictionary *extraDict = [NSMutableDictionary new];
    [extraDict setObject:@"extra test" forKey:@"test"];
    NSArray *requiredArray = [NSArray arrayWithObjects:@"array element 1", @"array element 2", nil];

    [_ampli.client add:[AMPPlugin initWithType:AMPPluginTypeBefore execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        AMPProperties* eventProperties = event.eventProperties;
        XCTAssertEqualObjects([eventProperties get:@"requiredArray"], requiredArray);
        XCTAssertEqualObjects([eventProperties get:@"requiredBoolean"], @true);
        XCTAssertEqualObjects([eventProperties get:@"requiredEnum"], @"Enum1");
        XCTAssertEqualObjects([eventProperties get:@"requiredInteger"], @10);
        XCTAssertEqualObjects([eventProperties get:@"requiredNumber"], @2.0F);
        XCTAssertEqualObjects([eventProperties get:@"requiredString"], @"required string");
        XCTAssertNil([eventProperties get:@"optionalString"]);
        [self->_pluginRun fulfill];
        return event;
    }]];

    [_ampli track:[EventWithAllProperties requiredArray:requiredArray
                                         requiredBoolean:true
                                         requiredEnum:EventWithAllPropertiesRequiredEnumEnum1
                                         requiredInteger:10
                                         requiredNumber:2.0F
                                         requiredString:@"required string"
    ]];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testIdentify {
    [self initAmpliWithNewInstance:@"testIdentify"];

    NSString* userId = @"test-user-id";
    NSString* deviceId = @"test-device-id";
    AMPEventOptions* eventOptions = [AMPEventOptions new];
    eventOptions.deviceId = deviceId;
    eventOptions.userId = userId;
    
    [_ampli.client add:[AMPPlugin initWithType:AMPPluginTypeBefore execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        XCTAssertEqualObjects(event.eventType, @"$identify");
        XCTAssertEqualObjects(event.userId, userId);
        XCTAssertEqualObjects(event.deviceId, deviceId);
        [self->_pluginRun fulfill];
        return event;
    }]];
    
    [_ampli identify:userId
           identify:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
    [_ampli flush];
    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testIdentifyUserIdOnEvent {
    [self initAmpliWithNewInstance:@"testIdentifyUserIdOnEvent"];

    NSString *eventOptionsUserId = @"test-user-id-options";
    NSString *deviceId = @"test-device-id";
    AMPEventOptions* eventOptions = [AMPEventOptions new];
    eventOptions.deviceId = deviceId;
    eventOptions.userId = eventOptionsUserId;

    [_ampli.client add:[AMPPlugin initWithType:AMPPluginTypeBefore execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        XCTAssertEqualObjects(event.eventType, @"$identify");
        XCTAssertEqualObjects(event.userId, eventOptionsUserId);
        XCTAssertEqualObjects(event.deviceId, deviceId);
        XCTAssertEqualObjects([self->_ampli.client getUserId], eventOptionsUserId);
        [self->_pluginRun fulfill];
        return event;
    }]];
    
    [_ampli identify:nil
           identify:[Identify requiredNumber: 22.0F builderBlock:^(IdentifyBuilder *b) {
                b.optionalArray = [NSArray arrayWithObjects:@"optional string", nil];
           }]
           options:eventOptions
   ];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testSetGroup {
    [self initAmpliWithNewInstance:@"testSetGroup"];

    NSString *groupType = @"test group type";
    NSString *groupName = @"test group name";

    [_ampli.client add:[AMPPlugin initWithType:AMPPluginTypeBefore execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        XCTAssertEqualObjects(event.eventType, @"$identify");
        AMPProperties* userProperties = event.userProperties;
        NSMutableDictionary *userPropertiesSet = [userProperties get:@"$set"];
        XCTAssertEqualObjects(userPropertiesSet[groupType], groupName);
        [self->_pluginRun fulfill];
        return event;
    }]];
    
    [_ampli.client setGroup:groupType groupName:groupName];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

- (void)testGroupIdentify {
    [self initAmpliWithNewInstance:@"testGroupIdentify"];

    NSString *groupType = @"test-group-type";
    NSString *groupName = @"test-group";
    
    [_ampli.client add:[AMPPlugin initWithType:AMPPluginTypeBefore execute:^AMPBaseEvent* _Nullable(AMPBaseEvent* _Nonnull event) {
        XCTAssertEqualObjects(event.eventType, @"$groupidentify");
        AMPProperties* groups = event.groups;
        XCTAssertEqual([groups get:groupType], groupName);
        NSMutableDictionary* groupPropertiesSet = [event.groupProperties get:@"$set"];
        XCTAssertEqual(groupPropertiesSet[@"requiredBoolean"], @false);
        XCTAssertEqual(groupPropertiesSet[@"optionalString"], @"optional string");
        [self->_pluginRun fulfill];
        return event;
    }]];

    AMPIdentify* identify = [AMPIdentify new];
    [identify set:@"requiredBoolean" value:@false];
    [identify set:@"optionalString" value:@"optional string"];
    [_ampli.client groupIdentify:groupType groupName:groupName identify:identify];
    [_ampli flush];

    [self waitForExpectationsWithTimeout:2.0 handler:^(NSError *error) {
        if (error) {
            NSLog(@"timeout errored: %@", error);
            XCTFail(@"test timed out");
        }
    }];
}

@end
