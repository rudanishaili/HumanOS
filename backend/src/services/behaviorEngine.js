function calculateHumanOSMetrics(
  browserActivities,
  desktopActivities
) {

 const recentBrowser =
  browserActivities.slice(0, 30);

  const recentDesktop =
    desktopActivities.slice(0, 30);

  let tabSwitches = 0;
  let learningActivities = 0;
  let idleCount = 0;
  let activeCount = 0;

  const learningDomains = [
    "leetcode.com",
    "chatgpt.com",
    "github.com",
    "geeksforgeeks.org",
    "youtube.com"
  ];

  recentBrowser.forEach((activity) => {

    if (activity.type === "tab_switch") {
      tabSwitches++;
    }

    if (
      learningDomains.includes(activity.domain)
    ) {
      learningActivities++;
    }

  });

  recentDesktop.forEach((activity) => {

    if (activity.isIdle) {
      idleCount++;
    } else {
      activeCount++;
    }

  });

  const mentalCPU =
  Math.min(
    100,
    Math.round(
      20 +
      (tabSwitches * 1.1) +
      (activeCount * 0.15)
    )
  );

  const focusStability =
    Math.min(
      100,
      Math.round(
        (learningActivities * 3) -
        (tabSwitches * 1.2) +
        50
      )
    );

  const batteryRecovery =
    Math.min(
      100,
      Math.round(
        (idleCount * 4) +
        20
      )
    );

  const systemTemperature =
  Math.min(
    100,
    Math.round(
      (mentalCPU * 0.5) +
      (tabSwitches * 0.25)
    )
  );

  const humanOSScore =
  Math.round(
    (focusStability * 0.45) +
    (batteryRecovery * 0.25) +
    ((100 - mentalCPU) * 0.20) +
    ((100 - systemTemperature) * 0.10)
  );

return {
  mentalCPU: Math.max(0, mentalCPU),
  focusStability: Math.max(0, focusStability),
  batteryRecovery: Math.max(0, batteryRecovery),
  systemTemperature: Math.max(0, systemTemperature),
  humanOSScore: Math.max(0, Math.min(100, humanOSScore))
};

}

module.exports = calculateHumanOSMetrics;