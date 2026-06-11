function calculateHumanOSMetrics(
  browserActivities,
  desktopActivities
) {

  let mentalCPU = 30;
  let focusStability = 50;
  let batteryRecovery = 50;
  let systemTemperature = 30;

  const learningDomains = [
    "leetcode.com",
    "chatgpt.com",
    "geeksforgeeks.org",
    "youtube.com",
    "github.com"
  ];

  browserActivities.forEach((activity) => {

    if (activity.type === "tab_switch") {
      mentalCPU += 3;
      systemTemperature += 2;
    }

    if (
      learningDomains.includes(activity.domain)
    ) {
      focusStability += 2;
    }
  });

  desktopActivities.forEach((activity) => {

    if (activity.isIdle) {
      batteryRecovery += 3;
      mentalCPU -= 1;
    }

    if (!activity.isIdle) {
      mentalCPU += 1;
    }
  });

  mentalCPU = Math.min(100, Math.max(0, mentalCPU));
  focusStability = Math.min(100, Math.max(0, focusStability));
  batteryRecovery = Math.min(100, Math.max(0, batteryRecovery));
  systemTemperature = Math.min(100, Math.max(0, systemTemperature));

  return {
    mentalCPU,
    focusStability,
    batteryRecovery,
    systemTemperature
  };
}

module.exports = calculateHumanOSMetrics;