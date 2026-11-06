export function createReportAgent({ ai, openai }) {
  const agent = ai.agent("replit-report-assistant", { description: "Explains a synthetic usage report" });
  return async function explainReport({ taskId, userId, question, model }) {
    if (!taskId || !userId || !question || !model) throw new Error("Task configuration is missing");
    try {
      return await agent.session({ userId, sessionId: taskId }).run(async () => {
        // The provider wrapper records the user message and AI response. Do not also track them manually.
        const result = await openai.chat.completions.create({
          model,
          messages: [
            { role: "system", content: "Explain this synthetic seven-day report: 12 exports and 8 active accounts. Be brief. Do not claim to access real customer records." },
            { role: "user", content: question },
          ],
        });
        const text = result.choices?.[0]?.message?.content;
        if (typeof text !== "string" || !text.trim()) throw new Error("The assistant returned no text");
        return text;
      });
    } finally {
      const pending = ai.flush();
      await (pending?.promise ?? pending);
    }
  };
}
