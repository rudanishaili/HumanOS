const express = require("express");

const ActivityLog = require("../models/ActivityLog");
const DesktopLog = require("../models/DesktopLog");

const calculateHumanOSMetrics =
require("../services/behaviorEngine");

const router = express.Router();

router.get("/", async (req, res) => {

  try {

    const browserActivities =
      await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(100);

    const desktopActivities =
      await DesktopLog.find()
      .sort({ createdAt: -1 })
      .limit(100);

    const metrics =
      calculateHumanOSMetrics(
        browserActivities,
        desktopActivities
      );

    res.json(metrics);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;