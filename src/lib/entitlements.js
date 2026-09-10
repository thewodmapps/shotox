// Free-tier limits. Pro unlocks everything.
// Free users get 2 devices (watermarked) and can export all slides of a template.
export const FREE_DEVICE_IDS = ['iphone-6.7', 'android-phone'];
export const FREE_TEMPLATE_IDS = ['lotus', 'royale'];
export const FREE_MAX_PROJECTS = 3;
export const FREE_MAX_SLIDES = 8;

export const isPro = (user) => !!user?.plan && user.plan !== 'free';

export const canUseDevice = (user, deviceId) => isPro(user) || FREE_DEVICE_IDS.includes(deviceId);
export const canUseTemplate = (user, id) => isPro(user) || FREE_TEMPLATE_IDS.includes(id);