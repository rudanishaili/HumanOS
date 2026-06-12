const express = require("express");
const router = express.Router();

const ActivityLog = require("../models/ActivityLog");
const DesktopLog = require("../models/DesktopLog");
const calculateHumanOSMetrics = require("../services/behaviorEngine");

router.get("/", async (req, res) => {
  try {
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

    let insight = "";

    if (metrics.humanOSScore >= 75) {
      insight =
        "HumanOS is stable. Your focus and recovery balance are currently supporting strong learning momentum.";
    } else if (metrics.mentalCPU >= 70) {
      insight =
        "Mental CPU is elevated. HumanOS recommends reducing tab switching and focusing on one task cycle at a time.";
    } else if (metrics.batteryRecovery < 40) {
      insight =
        "Recovery state is low. Short breaks may help the system return with better focus stability.";
    } else {
      insight =
        "HumanOS is adapting. Your current pattern shows moderate focus with room to improve consistency.";
    }

    res.json({
      metrics,
      insight
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;