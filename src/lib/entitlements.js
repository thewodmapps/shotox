// Free-tier limits. Pro unlocks everything.
// Free users choose ONE device of their choice (stored as user.free_device),
// get 3 starter templates, up to 3 projects, and can export all slides of a template.
export const FREE_TEMPLATE_IDS = ['lotus', 'royale', 'aurora'];
export const FREE_MAX_PROJECTS = 3;
export const FREE_MAX_SLIDES = 8;

export const isPro = (user) => !!user?.plan && user.plan !== 'free';

// The single device a free user has chosen; null means not yet chosen.
export const getFreeDevice = (user) => user?.free_device || null;

// Free users can use their chosen device (or any device if they haven't chosen yet).
export const canUseDevice = (user, deviceId) =>
  isPro(user) || !user?.free_device || user?.free_device === deviceId;

export const canUseTemplate = (user, id) => isPro(user) || FREE_TEMPLATE_IDS.includes(id);