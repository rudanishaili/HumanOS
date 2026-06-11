const express = require("express");
const ActivityLog = require("../models/ActivityLog");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const activity = await ActivityLog.create(req.body);

    res.status(201).json({
      message: "Activity saved successfully",
      activity
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save activity",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(activities);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message
    });
  }
});

module.exports = router;