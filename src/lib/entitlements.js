// Free-tier limits. Pro unlocks everything.
export const FREE_DEVICE_IDS = ['iphone-6.7'];
export const FREE_TEMPLATE_IDS = ['aurora', 'editorial', 'coral'];
export const FREE_MAX_PROJECTS = 3;
export const FREE_MAX_SLIDES = 5;

export const isPro = (user) => user?.plan === 'pro';

export const canUseDevice = (user, deviceId) => isPro(user) || FREE_DEVICE_IDS.includes(deviceId);
export const canUseTemplate = (user, id) => isPro(user) || FREE_TEMPLATE_IDS.includes(id);