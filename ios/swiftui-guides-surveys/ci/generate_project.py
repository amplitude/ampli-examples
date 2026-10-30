"""Generate a minimal Xcode project using the unchanged tutorial source files."""
import hashlib
import plistlib
from pathlib import Path
from xml.etree import ElementTree as ET

root = Path(__file__).resolve().parents[1]
objects = {}
def ident(name):
    return hashlib.sha256(name.encode()).hexdigest()[:24].upper()
def add(node_name, **fields):
    key = ident(node_name)
    assert key not in objects
    objects[key] = fields
    return key

def file(name, path, kind):
    return add(name, isa='PBXFileReference', lastKnownFileType=kind, path=path, sourceTree='<group>')

sources = sorted(root.glob('AmplitudeReports/**/*.swift'))
assert len(sources) == 4
app_refs = [file(str(p.relative_to(root)), str(p.relative_to(root)), 'sourcecode.swift') for p in sources]
ui_ref = file('ui-source', 'UITests/SmokeTests.swift', 'sourcecode.swift')
config_ref = file('config', 'Config/Amplitude.xcconfig', 'text.xcconfig')
plist_ref = file('plist', 'AmplitudeReports/Info.plist', 'text.plist.xml')
app_product = add('app-product', isa='PBXFileReference', explicitFileType='wrapper.application', path='AmplitudeReports.app', sourceTree='BUILT_PRODUCTS_DIR')
ui_product = add('ui-product', isa='PBXFileReference', explicitFileType='wrapper.cfbundle', path='ReportUITests.xctest', sourceTree='BUILT_PRODUCTS_DIR')
products = add('products', isa='PBXGroup', children=[app_product, ui_product], name='Products', sourceTree='<group>')
main = add('main', isa='PBXGroup', children=app_refs+[ui_ref, config_ref, plist_ref, products], sourceTree='<group>')
package = add('package', isa='XCRemoteSwiftPackageReference', repositoryURL='https://github.com/amplitude/AmplitudeUnified-Swift', requirement={'kind':'exactVersion','version':'0.0.4'})
product = add('sdk-product', isa='XCSwiftPackageProductDependency', package=package, productName='AmplitudeUnified')
sdk_build = add('sdk-build', isa='PBXBuildFile', productRef=product)
engagement_package = add('engagement-package', isa='XCRemoteSwiftPackageReference', repositoryURL='https://github.com/amplitude/Amplitude-Engagement-Swift', requirement={'kind':'exactVersion','version':'4.2.0'})
engagement_product = add('engagement-product', isa='XCSwiftPackageProductDependency', package=engagement_package, productName='AmplitudeEngagementSwift')
engagement_build = add('engagement-build', isa='PBXBuildFile', productRef=engagement_product)

def phase(name, kind, files):
    return add(name, isa=kind, buildActionMask=2147483647, files=files, runOnlyForDeploymentPostprocessing=0)
def source_phase(name, refs):
    builds = [add(name+str(i), isa='PBXBuildFile', fileRef=ref) for i, ref in enumerate(refs)]
    return phase(name, 'PBXSourcesBuildPhase', builds)
def configs(name, settings, base=None):
    refs=[]
    for mode in ('Debug','Release'):
        args=dict(isa='XCBuildConfiguration', name=mode, buildSettings=dict(settings))
        if base: args['baseConfigurationReference']=base
        if mode=='Debug':
            args['buildSettings']['SWIFT_OPTIMIZATION_LEVEL']='-Onone'
            args['buildSettings']['ONLY_ACTIVE_ARCH']='YES'
        refs.append(add(name+mode, **args))
    return add(name+'-list', isa='XCConfigurationList', buildConfigurations=refs, defaultConfigurationIsVisible=0, defaultConfigurationName='Release')
common={'SDKROOT':'iphoneos','IPHONEOS_DEPLOYMENT_TARGET':'17.0','SWIFT_VERSION':'5.0','CODE_SIGNING_ALLOWED':'NO','TARGETED_DEVICE_FAMILY':'1,2'}
project_configs=configs('project',common)
app_configs=configs('app',{'PRODUCT_NAME':'$(TARGET_NAME)','PRODUCT_BUNDLE_IDENTIFIER':'com.amplitude.build.guidereports','MARKETING_VERSION':'1.0','CURRENT_PROJECT_VERSION':'1','GENERATE_INFOPLIST_FILE':'NO','INFOPLIST_FILE':'AmplitudeReports/Info.plist','INFOPLIST_EXPAND_BUILD_SETTINGS':'YES','LD_RUNPATH_SEARCH_PATHS':['$(inherited)','@executable_path/Frameworks']},config_ref)
app=add('app-target',isa='PBXNativeTarget',name='AmplitudeReports',productName='AmplitudeReports',productReference=app_product,productType='com.apple.product-type.application',buildConfigurationList=app_configs,buildPhases=[source_phase('app-sources',app_refs),phase('app-frameworks','PBXFrameworksBuildPhase',[sdk_build,engagement_build]),phase('app-resources','PBXResourcesBuildPhase',[])],buildRules=[],dependencies=[],packageProductDependencies=[product,engagement_product])
project_id=ident('project')
proxy=add('proxy',isa='PBXContainerItemProxy',containerPortal=project_id,proxyType=1,remoteGlobalIDString=app,remoteInfo='AmplitudeReports')
dep=add('dependency',isa='PBXTargetDependency',target=app,targetProxy=proxy)
ui_configs=configs('ui',{'PRODUCT_NAME':'$(TARGET_NAME)','PRODUCT_BUNDLE_IDENTIFIER':'com.amplitude.build.guidereports.uitests','GENERATE_INFOPLIST_FILE':'YES','TEST_TARGET_NAME':'AmplitudeReports','LD_RUNPATH_SEARCH_PATHS':['$(inherited)','@executable_path/Frameworks','@loader_path/Frameworks']})
ui=add('ui-target',isa='PBXNativeTarget',name='ReportUITests',productName='ReportUITests',productReference=ui_product,productType='com.apple.product-type.bundle.ui-testing',buildConfigurationList=ui_configs,buildPhases=[source_phase('ui-sources',[ui_ref]),phase('ui-frameworks','PBXFrameworksBuildPhase',[]),phase('ui-resources','PBXResourcesBuildPhase',[])],buildRules=[],dependencies=[dep])
add('project',isa='PBXProject',attributes={'LastUpgradeCheck':'2630','TargetAttributes':{ui:{'TestTargetID':app}}},buildConfigurationList=project_configs,compatibilityVersion='Xcode 14.0',developmentRegion='en',hasScannedForEncodings=0,knownRegions=['en','Base'],mainGroup=main,productRefGroup=products,projectDirPath='',projectRoot='',targets=[app,ui],packageReferences=[package,engagement_package])
p=root/'AmplitudeReports.xcodeproj';p.mkdir(exist_ok=True)
with (p/'project.pbxproj').open('wb') as out: plistlib.dump({'archiveVersion':'1','classes':{},'objectVersion':'56','objects':objects,'rootObject':project_id},out,sort_keys=False)
scheme=ET.Element('Scheme',LastUpgradeVersion='2630',version='1.3')
def buildable(parent,key,name,product_name):
    ET.SubElement(parent,'BuildableReference',BuildableIdentifier='primary',BlueprintIdentifier=key,BuildableName=product_name,BlueprintName=name,ReferencedContainer='container:AmplitudeReports.xcodeproj')
build=ET.SubElement(scheme,'BuildAction',parallelizeBuildables='YES',buildImplicitDependencies='YES');entries=ET.SubElement(build,'BuildActionEntries')
for key,name,product_name in [(app,'AmplitudeReports','AmplitudeReports.app'),(ui,'ReportUITests','ReportUITests.xctest')]:
    e=ET.SubElement(entries,'BuildActionEntry',buildForTesting='YES',buildForRunning='YES' if key==app else 'NO',buildForProfiling='NO',buildForArchiving='NO',buildForAnalyzing='YES');buildable(e,key,name,product_name)
test=ET.SubElement(scheme,'TestAction',buildConfiguration='Debug',selectedDebuggerIdentifier='Xcode.DebuggerFoundation.Debugger.LLDB',selectedLauncherIdentifier='Xcode.IDEFoundation.Launcher.LLDB',shouldUseLaunchSchemeArgsEnv='YES')
testables=ET.SubElement(test,'Testables');t=ET.SubElement(testables,'TestableReference',skipped='NO');buildable(t,ui,'ReportUITests','ReportUITests.xctest')
launch=ET.SubElement(scheme,'LaunchAction',buildConfiguration='Debug',selectedDebuggerIdentifier='Xcode.DebuggerFoundation.Debugger.LLDB',selectedLauncherIdentifier='Xcode.IDEFoundation.Launcher.LLDB',launchStyle='0',useCustomWorkingDirectory='NO',ignoresPersistentStateOnLaunch='NO',debugServiceExtension='internal',allowLocationSimulation='YES');run=ET.SubElement(launch,'BuildableProductRunnable',runnableDebuggingMode='0');buildable(run,app,'AmplitudeReports','AmplitudeReports.app')
ET.SubElement(scheme,'AnalyzeAction',buildConfiguration='Debug')
s=p/'xcshareddata/xcschemes';s.mkdir(parents=True,exist_ok=True);ET.ElementTree(scheme).write(s/'AmplitudeReports.xcscheme',encoding='UTF-8',xml_declaration=True)
print(f'Generated project: {len(app_refs)} app source files, one UI test file, Unified 0.0.4 and engagement 4.2.0.')
