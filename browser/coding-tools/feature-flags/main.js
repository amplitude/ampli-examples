import * as amplitude from "@amplitude/unified";
const deploymentKey = (import.meta.env.VITE_AMPLITUDE_DEPLOYMENT_KEY || "").trim();
let layoutSource = "fallback";

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
  if (started) amplitude.track("Report Exported", { report_period: "7d", layout_source: layoutSource });
});

startButton.addEventListener("click", () => {
  if (starting) return;
  if (!apiKey || !["US", "EU"].includes(zone) || !deploymentKey) {
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
    analytics: { autocapture: false },
    sessionReplay: { sampleRate: 0 },
    experiment: { deploymentKey, automaticExposureTracking: false, retryFetchOnFailure: false, fetchTimeoutMillis: 5000 },
    engagement: { skip: true },
  });
  amplitude.setUserId("build-web-flags-demo");
  started = true;
  const client = amplitude.experiment();
  if (!client) throw new Error("Experiment client unavailable");
  // Do not log conversions under a fallback while assignment is still pending.
  exportButton.disabled = true;
  try {
    await client.fetch();
    const value = client.variant("report-layout").value;
    if (value === "control" || value === "expanded") {
      layoutSource = "assigned";
      document.querySelector("#layout").textContent = value === "expanded" ? "Expanded" : "Compact";
      document.querySelector("#detail").hidden = value !== "expanded";
      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      client.exposure("report-layout");
      status.textContent = `Assigned ${value}; device ${amplitude.getDeviceId()}.`;
    } else {
      status.textContent = "No usable assignment. Compact fallback; no assigned exposure.";
    }
  } catch {
    status.textContent = "Fetch failed. Compact fallback; no assigned exposure.";
  } finally {
    exportButton.disabled = false;
  }
}
