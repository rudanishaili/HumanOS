function generateTimelineEvents(chats, activities) {
  const events = [];

  chats.forEach((chat) => {
    events.push({
      type: "future_self",
      title: "Future Self Reflection Created",
      description: chat.question,
      intensity: "blue",
      createdAt: chat.createdAt
    });
  });

  activities.forEach((activity) => {
    if (activity.type === "tab_switch") {
      events.push({
        type: "attention",
        title: "Attention Shift Detected",
        description: `Switched browser context to ${activity.domain}`,
        intensity: "red",
        createdAt: activity.createdAt
      });
    }

    if (
      activity.domain === "leetcode.com" ||
      activity.domain === "github.com" ||
      activity.domain === "chatgpt.com" ||
      activity.domain === "geeksforgeeks.org"
    ) {
      events.push({
        type: "learning",
        title: "Learning Activity Detected",
        description: `Productive activity on ${activity.domain}`,
        intensity: "green",
        createdAt: activity.createdAt
      });
    }
  });

  return events
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 25);
}

module.exports = generateTimelineEvents;