const { app, BrowserWindow, powerMonitor } = require("electron");
const axios = require("axios");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 430,
    height: 380,
    resizable: false,
    title: "HumanOS Desktop Companion",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  mainWindow.loadFile("index.html");
}

async function sendDesktopActivity(activity) {
  try {
    await axios.post("http://localhost:5000/api/desktop", activity);
    console.log("Desktop signal sent:", activity);
  } catch (error) {
    console.error("Failed to send desktop signal:", error.message);
  }
}

function sendHeartbeat() {
  const idleSeconds = powerMonitor.getSystemIdleTime();

  const activity = {
    type: "desktop_heartbeat",
    appName: "HumanOS Desktop Companion",
    windowTitle: "Desktop session active",
    idleSeconds,
    isIdle: idleSeconds > 60,
    timestamp: new Date().toISOString()
  };

  sendDesktopActivity(activity);
}

app.whenReady().then(() => {
  createWindow();

  sendDesktopActivity({
    type: "desktop_started",
    appName: "HumanOS Desktop Companion",
    windowTitle: "Desktop tracker launched",
    idleSeconds: 0,
    isIdle: false,
    timestamp: new Date().toISOString()
  });

  setInterval(sendHeartbeat, 10000);
});

app.on("window-all-closed", () => {
  sendDesktopActivity({
    type: "desktop_closed",
    appName: "HumanOS Desktop Companion",
    windowTitle: "Desktop tracker closed",
    timestamp: new Date().toISOString()
  });

  if (process.platform !== "darwin") app.quit();
});