// Free-tier limits. Pro unlocks everything.
// Free users choose ONE device (any of them) and get the first 3 starter templates.
export const FREE_TEMPLATE_IDS = ['lotus', 'royale', 'tempo'];
export const FREE_MAX_PROJECTS = 3;
export const FREE_MAX_SLIDES = 8;

export const isPro = (user) => !!user?.plan && user.plan !== 'free';

// The single device a free user has locked in as their free pick. null until
// they create their first project (during which any device is selectable).
export const freeDeviceChoice = (user) => (!isPro(user) ? user?.free_device || null : null);

export const canUseDevice = (user, deviceId) => {
  if (isPro(user)) return true;
  const chosen = user?.free_device;
  return !chosen || chosen === deviceId;
};

export const canUseTemplate = (user, id) => isPro(user) || FREE_TEMPLATE_IDS.includes(id);