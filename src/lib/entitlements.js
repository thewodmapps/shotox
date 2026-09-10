// Free-tier limits. Pro unlocks everything.
// Free users choose ONE device of their choice (any supported device) and can
// export all slides of a template. The chosen device is derived from their
// existing projects: with no projects yet, any device is available; once they
// create a project, only device(s) they've already used remain available.
export const FREE_TEMPLATE_IDS = ['lotus', 'royale'];
export const FREE_MAX_PROJECTS = 3;
export const FREE_MAX_SLIDES = 8;

export const isPro = (user) => !!user?.plan && user.plan !== 'free';

// `usedDevices` = unique device ids across the user's existing projects.
export const freeUsedDevices = (projects) =>
  [...new Set((projects || []).map((p) => p.device).filter(Boolean))];

export const canUseDevice = (user, deviceId, usedDevices = []) => {
  if (isPro(user)) return true;
  if (deviceId === 'custom') return false; // custom sizes stay Pro
  return usedDevices.length === 0 || usedDevices.includes(deviceId);
};
export const canUseTemplate = (user, id) => isPro(user) || FREE_TEMPLATE_IDS.includes(id);