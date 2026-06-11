const express = require("express");
const router = express.Router();

const ActivityLog = require("../models/ActivityLog");
const DesktopLog = require("../models/DesktopLog");
const ChatHistory = require("../models/ChatHistory");

const calculateHumanOSMetrics =
require("../services/behaviorEngine");

const askOpenRouter =
require("../services/openRouterService");

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;

    const browserActivities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(100);

    const desktopActivities = await DesktopLog.find()
      .sort({ createdAt: -1 })
      .limit(100);

    const metrics = calculateHumanOSMetrics(
      browserActivities,
      desktopActivities
    );

    const prompt = `
You are Future Self inside a project called HumanOS.

HumanOS tagline:
"Your mind, running in real time."

You are not a normal chatbot.
You are the user's future version speaking back to them.

User question:
"${question}"

Current HumanOS metrics:
Mental CPU: ${metrics.mentalCPU}%
Focus Stability: ${metrics.focusStability}%
Battery Recovery: ${metrics.batteryRecovery}%
System Temperature: ${metrics.systemTemperature}%

Rules:
- Start with "Future Self:"
- Answer the user's exact question.
- Be motivating, calm, and personal.
- Do not sound like a doctor.
- Do not diagnose mental health.
- Do not use probability language.
- Do not say "as an AI".
- Use HumanOS-style language naturally.
- Keep the answer short and powerful.
- Mention the metrics only if useful.
`;

    let response = await askOpenRouter(prompt);

response = response
  .replace(/\\n/g, '\n')
  .trim();

await ChatHistory.create({
  question,
  response,
  metrics
});

res.json({
  response
});

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

router.get("/history", async (req, res) => {
  try {
    const history = await ChatHistory.find()
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(history);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;