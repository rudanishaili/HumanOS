const express = require("express");
const router = express.Router();

const ActivityLog = require("../models/ActivityLog");
const DesktopLog = require("../models/DesktopLog");
const ChatHistory = require("../models/ChatHistory");
const calculateHumanOSMetrics = require("../services/behaviorEngine");

router.get("/daily", async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const browserActivities = await ActivityLog.find({
      createdAt: { $gte: startOfDay }
    }).sort({ createdAt: -1 });

    const desktopActivities = await DesktopLog.find({
      createdAt: { $gte: startOfDay }
    }).sort({ createdAt: -1 });

    const futureSelfSessions = await ChatHistory.find({
      createdAt: { $gte: startOfDay }
    }).sort({ createdAt: -1 });

    const metrics = calculateHumanOSMetrics(
      browserActivities,
      desktopActivities
    );

    const tabSwitches = browserActivities.filter(
      activity => activity.type === "tab_switch"
    ).length;

    const learningDomains = [
      "leetcode.com",
      "chatgpt.com",
      "github.com",
      "geeksforgeeks.org",
      "youtube.com"
    ];

    const learningActivities = browserActivities.filter(
      activity => learningDomains.includes(activity.domain)
    ).length;

    let reportStatus = "Stable";

    if (metrics.humanOSScore >= 80) reportStatus = "Excellent";
    else if (metrics.humanOSScore >= 65) reportStatus = "Stable";
    else if (metrics.humanOSScore >= 45) reportStatus = "Needs Focus";
    else reportStatus = "Overloaded";

    res.json({
      date: new Date(),
      status: reportStatus,
      metrics,
      summary: {
        browserActivities: browserActivities.length,
        desktopSignals: desktopActivities.length,
        tabSwitches,
        learningActivities,
        futureSelfSessions: futureSelfSessions.length
      },
      recommendation:
        metrics.mentalCPU > 70
          ? "Reduce context switching and complete one focused task cycle before opening new tabs."
          : "Your system pattern looks balanced. Continue your current learning rhythm."
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;