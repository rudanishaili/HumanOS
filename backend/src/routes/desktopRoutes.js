const express = require("express");
const DesktopLog = require("../models/DesktopLog");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const log = await DesktopLog.create(req.body);

    res.status(201).json({
      message: "Desktop activity saved successfully",
      log
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save desktop activity",
      error: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const logs = await DesktopLog.find()
      .select("-__v")
      .sort({ createdAt: -1 })
      .limit(30);

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch desktop logs",
      error: error.message
    });
  }
});

module.exports = router;