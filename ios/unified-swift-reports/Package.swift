// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "AmplitudeReportsChecks",
    platforms: [.macOS(.v14), .iOS(.v17)],
    products: [.library(name: "ReportCore", targets: ["ReportCore"])],
    dependencies: [
        .package(url: "https://github.com/amplitude/AmplitudeUnified-Swift", exact: "0.0.4")
    ],
    targets: [
        .target(name: "ReportCore", dependencies: [
            .product(name: "AmplitudeUnified", package: "AmplitudeUnified-Swift")
        ], path: "AmplitudeReports/Core"),
        .testTarget(name: "ReportCoreTests", dependencies: ["ReportCore"], path: "Tests")
    ]
)
