const mongoose = require("mongoose");

const desktopLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    appName: String,
    windowTitle: String,
    idleSeconds: {
      type: Number,
      default: 0
    },
    isIdle: {
      type: Boolean,
      default: false
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("DesktopLog", desktopLogSchema);