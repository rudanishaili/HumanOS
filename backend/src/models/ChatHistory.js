const mongoose = require("mongoose");

const chatHistorySchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true
    },
    response: {
      type: String,
      required: true
    },
    metrics: {
      mentalCPU: Number,
      focusStability: Number,
      batteryRecovery: Number,
      systemTemperature: Number
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("ChatHistory", chatHistorySchema);