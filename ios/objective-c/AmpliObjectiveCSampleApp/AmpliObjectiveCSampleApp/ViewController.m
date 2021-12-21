//
//  ViewController.m
//  AmpliObjectiveCSampleApp
//
//  Created by Qingzhuo Zhen on 11/24/21.
//

#import "ViewController.h"
#import "Ampli.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    Ampli *ampli = [Ampli instance];
    EventMaxIntForTestProperties *eventMaxIntForTestProperties = [EventMaxIntForTestProperties new];
    eventMaxIntForTestProperties.intMax10 = @20;
    [ampli eventMaxIntForTest:eventMaxIntForTestProperties];
}

@end
