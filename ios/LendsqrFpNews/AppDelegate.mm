#import "AppDelegate.h"

#import <Firebase.h>

#import <CodePush/CodePush.h>

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"LendsqrFpNews";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  [FIRApp configure];

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
// as instructed by Codepush
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  return [CodePush bundleURL];
#endif
}

@end
