import * as amplitude from "@amplitude/unified";

document.querySelector("#report-route").textContent = location.pathname === "/reports/monthly" ? "Monthly report" : "Weekly report";
document.querySelector("#report-summary").textContent = location.pathname === "/reports/monthly" ? "320 actions in the past 30 days." : "84 actions in the past 7 days.";
const apiKey = (import.meta.env.VITE_AMPLITUDE_API_KEY || "").trim();
const zone = (import.meta.env.VITE_AMPLITUDE_SERVER_ZONE || "US").trim();
const status = document.querySelector("#status");
const startButton = document.querySelector("#start");
const exportButton = document.querySelector("#export-report");
let started = false;
let starting;
let exports = 0;

exportButton.addEventListener("click", () => {
  exports += 1;
  document.querySelector("#exports").textContent = String(exports);
  if (started) amplitude.track("Report Exported", { report_period: location.pathname === "/reports/monthly" ? "30d" : "7d" });
});

startButton.addEventListener("click", () => {
  if (starting) return;
  if (!apiKey || !["US", "EU"].includes(zone)) {
    status.textContent = "Add the development configuration and restart Vite. Local export still works.";
    return;
  }
  startButton.disabled = true;
  starting = start().catch(() => {
    status.textContent = "Setup failed. Check configuration and connectivity, then reload.";
  });
});

async function start() {
  await amplitude.initAll(apiKey, {
    serverZone: zone,
    analytics: { autocapture: { sessions: true } },
    sessionReplay: {
      sampleRate: 1,
      privacyConfig: { defaultMaskLevel: "medium", maskSelector: ["#sensitive"], blockSelector: ["#excluded"] },
    },
    engagement: { skip: true },
  });
  amplitude.setUserId("build-web-heatmaps-demo");
  started = true;
  document.querySelector("#pause").disabled = false;
  status.textContent = `Replay requested; device ${amplitude.getDeviceId()}. Verify the processed recording.`;
}

document.querySelector("#pause").addEventListener("click", () => {
  amplitude.sessionReplay()?.stop();
  status.textContent = "Recording paused; analytics remains active.";
});
