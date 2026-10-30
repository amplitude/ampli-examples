// swift-tools-version: 5.9
import PackageDescription
let package = Package(name: "GuidesSettingsChecks", targets: [
    .target(name: "ReportCore"),
    .testTarget(name: "ReportCoreTests", dependencies: ["ReportCore"])
])
