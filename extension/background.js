let lastActiveTab = null;

function getDomain(url) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "unknown";
  }
}

async function sendActivity(activity) {
  try {
    await fetch("http://localhost:5000/api/activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(activity)
    });

    console.log("HumanOS activity sent:", activity);
  } catch (error) {
    console.error("Failed to send HumanOS activity:", error);
  }
}

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);

  if (!tab.url || tab.url.startsWith("chrome://")) return;

  const activity = {
    type: "tab_switch",
    title: tab.title,
    url: tab.url,
    domain: getDomain(tab.url),
    timestamp: new Date().toISOString()
  };

  lastActiveTab = activity;

  sendActivity(activity);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status !== "complete") return;
  if (!tab.url || tab.url.startsWith("chrome://")) return;

  const activity = {
    type: "page_visit",
    title: tab.title,
    url: tab.url,
    domain: getDomain(tab.url),
    timestamp: new Date().toISOString()
  };

  lastActiveTab = activity;

  sendActivity(activity);
});