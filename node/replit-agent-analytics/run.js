import { randomUUID } from "node:crypto";
import * as amplitude from "@amplitude/analytics-node";
import { AmplitudeAI, AIConfig, OpenAI } from "@amplitude/ai";
import { createReportAgent } from "./report-agent.js";

const apiKey = process.env.AMPLITUDE_AI_API_KEY?.trim();
const providerKey = process.env.OPENAI_API_KEY?.trim();
const model = process.env.OPENAI_MODEL?.trim();
const userId = process.env.DEMO_USER_ID?.trim();
const zone = (process.env.AMPLITUDE_SERVER_ZONE || "US").trim();
if (!apiKey || !providerKey || !model || !userId || !["US", "EU"].includes(zone)) {
  console.error("Add the demo configuration and select US or EU. No model request was made.");
  process.exitCode = 1;
} else {
  amplitude.init(apiKey, { serverZone: zone });
  const ai = new AmplitudeAI({ amplitude, config: new AIConfig({ contentMode: "metadata_only", redactPii: true, debug: false }) });
  const openai = new OpenAI({ apiKey: providerKey, amplitude: ai });
  const explainReport = createReportAgent({ ai, openai });
  const taskId = randomUUID();
  try {
    const answer = await explainReport({ taskId, userId, model, question: "Summarize the report and suggest one question to investigate." });
    console.log(answer);
    console.log(`Finished synthetic task ${taskId}. Check the processed session separately.`);
  } catch {
    console.error("The assistant failed. Check provider access and configuration; no reply was confirmed.");
    process.exitCode = 1;
  }
}
