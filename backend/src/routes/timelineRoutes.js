const express = require("express");
const router = express.Router();

const ChatHistory = require("../models/ChatHistory");
const ActivityLog = require("../models/ActivityLog");

router.get("/", async (req, res) => {
  try {

    const chats = await ChatHistory.find()
      .sort({ createdAt: -1 })
      .limit(20);

    const activities = await ActivityLog.find()
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      chats,
      activities
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;