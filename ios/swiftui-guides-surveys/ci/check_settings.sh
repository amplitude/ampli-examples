#!/bin/bash
set -euo pipefail
root_dir="$(cd "$(dirname "$0")/.." && pwd)"
settings_dir="$(mktemp -d)"
trap 'rm -rf "$settings_dir"' EXIT
mkdir -p "$settings_dir/Sources/ReportCore" "$settings_dir/Tests/ReportCoreTests"
cp "$root_dir/ci/SettingsPackage.swift" "$settings_dir/Package.swift"
cp "$root_dir/AmplitudeReports/Core/AnalyticsSettings.swift" "$settings_dir/Sources/ReportCore/"
cp "$root_dir/Tests/SettingsTests.swift" "$settings_dir/Tests/ReportCoreTests/"
swift test --package-path "$settings_dir"
