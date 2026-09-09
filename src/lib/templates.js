export const BASE_W = 300;

export const DEVICES = [
  { id: 'iphone-6.7', name: 'iPhone 6.7" (15 Pro Max)', w: 1290, h: 2796, platform: 'ios', form: 'phone' },
  { id: 'iphone-6.5', name: 'iPhone 6.5" (11 Pro Max)', w: 1242, h: 2688, platform: 'ios', form: 'phone' },
  { id: 'iphone-5.5', name: 'iPhone 5.5" (8 Plus)', w: 1242, h: 2208, platform: 'ios', form: 'phone' },
  { id: 'ipad-13', name: 'iPad 13" (Pro M4)', w: 2064, h: 2752, platform: 'ios', form: 'tablet' },
  { id: 'ipad-11', name: 'iPad 11" (Pro)', w: 1668, h: 2388, platform: 'ios', form: 'tablet' },
  { id: 'android-phone', name: 'Google Play Phone', w: 1080, h: 1920, platform: 'android', form: 'phone' },
  { id: 'android-tab-10', name: 'Android Tablet 10"', w: 1200, h: 1920, platform: 'android', form: 'tablet' },
  { id: 'feature-graphic', name: 'Google Play Feature', w: 1024, h: 500, platform: 'android', form: 'feature' },
];

export const getDevice = (id, custom) => {
  if (id === 'custom' && custom) {
    const w = custom.w || 1080;
    const h = custom.h || 1920;
    return { id: 'custom', name: 'Custom', w, h, platform: w > h ? 'android' : 'ios', form: w > h ? 'feature' : 'phone' };
  }
  return DEVICES.find((d) => d.id === id) || DEVICES[0];
};

export const resolveDevice = (project) =>
  getDevice(project.device, project.custom_w ? { w: project.custom_w, h: project.custom_h } : null);

export const slideHeight = (device) => Math.round((BASE_W * device.h) / device.w);

export const FONTS = ['Sora', 'Inter', 'Space Grotesk', 'Playfair Display', 'Fraunces'];
export const LAYOUTS = [
  { id: 'phone-bottom', name: 'Phone below' },
  { id: 'phone-top', name: 'Phone above' },
  { id: 'tilted', name: 'Tilted 3D' },
  { id: 'text-only', name: 'Text only' },
];
export const DEVICE_STYLES = [
  { id: 'black', name: 'Black' },
  { id: 'white', name: 'White' },
  { id: 'titanium', name: 'Titanium' },
];
export const SOLID_COLORS = ['#0B0B12', '#1E1B4B', '#2C2542', '#7C3AED', '#DB2777', '#EA580C', '#F59E0B', '#16A34A', '#0EA5E9', '#D9F99D', '#FDF2F8', '#FFFFFF'];
export const GRADIENTS = [
  ['#7C3AED', '#EC4899'], ['#0EA5E9', '#6366F1'], ['#F97316', '#F43F5E'], ['#10B981', '#3B82F6'],
  ['#111827', '#4C1D95'], ['#FDE68A', '#F97316'], ['#A7F3D0', '#67E8F9'], ['#FBCFE8', '#C4B5FD'],
];

export const TEMPLATE_TAGS = ['All', '3D Devices', 'Dark', 'Colorful', 'Gradient', 'Minimal'];
export const CATEGORIES = ['All', 'Productivity', 'Finance', 'Beauty', 'Food', 'Travel', 'Fitness', 'Education', 'Social', 'AI', 'Entertainment', 'Games', 'Health'];

let uid = 0;
export const makeId = () => `${Date.now().toString(36)}${(uid++).toString(36)}`;
export const grad = (from, to, angle = 135) => ({ type: 'gradient', color: from, from, to, angle });
export const solid = (color) => ({ type: 'solid', color, from: color, to: color, angle: 135 });

export const makeSlide = (o = {}) => ({
  id: makeId(),
  heading: 'Your headline here',
  subheading: 'A short line that explains the benefit',
  headingColor: '#FFFFFF',
  subColor: 'rgba(255,255,255,0.75)',
  bg: grad('#7C3AED', '#EC4899'),
  screenshotUrl: '',
  layout: 'phone-bottom',
  deviceStyle: 'black',
  font: 'Sora',
  align: 'center',
  ...o,
});

const t = (id, name, category, tags, font, base, slides) => ({
  id, name, category, tags, font,
  slides: slides.map((s) => makeSlide({ font, ...base, ...s })),
});

export const TEMPLATES = [
  // ── Productivity ──
  t('aurora', 'Aurora', 'Productivity', ['Gradient', 'Colorful', '3D Devices'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Plan your day in seconds', subheading: 'Smart schedules that adapt to your life', bg: grad('#7C3AED', '#EC4899'), layout: 'tilted' },
    { heading: 'Focus on what matters', subheading: 'Priorities, reminders and gentle nudges', bg: grad('#6366F1', '#0EA5E9'), layout: 'phone-bottom' },
    { heading: 'Loved by 1M+ users', subheading: '4.9 rating on the App Store', bg: grad('#EC4899', '#F97316'), layout: 'phone-top' },
  ]),
  t('bloom', 'Bloom', 'Productivity', ['Colorful', 'Minimal'], 'Fraunces', { headingColor: '#14532D', subColor: 'rgba(20,83,45,0.7)', deviceStyle: 'white' }, [
    { heading: 'Build better habits', subheading: 'Small steps, big change', bg: solid('#DCFCE7'), layout: 'phone-bottom' },
    { heading: 'Stay on track', subheading: 'Streaks that keep you going', bg: solid('#BBF7D0'), layout: 'tilted' },
    { heading: 'Celebrate progress', subheading: 'See how far you have come', bg: solid('#DCFCE7'), layout: 'phone-top' },
  ]),
  // ── Finance ──
  t('midnight', 'Midnight', 'Finance', ['Dark', '3D Devices', 'Minimal'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left' }, [
    { heading: 'Trade anytime, anywhere', subheading: 'Real-time markets in your pocket', bg: solid('#0B0B12'), layout: 'tilted', subColor: '#A3E635' },
    { heading: 'Security you can trust', subheading: 'Bank-grade encryption, always on', bg: grad('#111827', '#4C1D95'), layout: 'phone-bottom' },
    { heading: 'Grow your assets', subheading: 'Insights that move with the market', bg: solid('#0B0B12'), layout: 'phone-top', subColor: '#A3E635' },
  ]),
  t('matrix', 'Matrix', 'Finance', ['Dark', 'Minimal'], 'Space Grotesk', { align: 'left', deviceStyle: 'black', subColor: '#4ADE80' }, [
    { heading: 'Track every coin', subheading: 'Real-time portfolio, zero clutter', bg: solid('#020617'), layout: 'tilted' },
    { heading: 'Insights that pay', subheading: 'AI signals tuned to your strategy', bg: solid('#020617'), layout: 'phone-bottom' },
    { heading: 'Secure by design', subheading: 'Cold storage, warm interface', bg: solid('#020617'), layout: 'phone-top' },
  ]),
  // ── AI ──
  t('lime', 'Neon Lime', 'AI', ['Colorful', 'Minimal'], 'Space Grotesk', { headingColor: '#0B0B12', subColor: 'rgba(11,11,18,0.7)', deviceStyle: 'black' }, [
    { heading: 'Discover topics faster', subheading: 'Answers with sources you can trust', bg: solid('#D9F99D'), layout: 'phone-bottom' },
    { heading: 'Speed meets intelligence', subheading: 'Ask anything, get clarity instantly', bg: solid('#0B0B12'), headingColor: '#D9F99D', subColor: 'rgba(217,249,157,0.75)', layout: 'tilted' },
    { heading: 'Explore without limits', subheading: 'Curated feeds for curious minds', bg: solid('#D9F99D'), layout: 'phone-top' },
  ]),
  t('neon', 'Neon City', 'AI', ['Dark', 'Colorful', '3D Devices'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left' }, [
    { heading: 'Ask anything, instantly', subheading: 'AI that thinks at the speed of thought', bg: grad('#1E1B4B', '#7C3AED'), layout: 'tilted', headingColor: '#F0ABFC', subColor: '#C4B5FD' },
    { heading: 'Answers you can trust', subheading: 'Every reply backed by sources', bg: grad('#0F0A1E', '#DB2777'), layout: 'phone-bottom', headingColor: '#FBCFE8', subColor: '#F9A8D4' },
    { heading: 'Search, reimagined', subheading: 'From question to clarity in seconds', bg: grad('#020617', '#0EA5E9'), layout: 'phone-top', headingColor: '#A5F3FC', subColor: '#7DD3FC' },
  ]),
  // ── Food ──
  t('coral', 'Coral Pop', 'Food', ['Colorful', 'Gradient'], 'Sora', { deviceStyle: 'white' }, [
    { heading: 'Hot meals in minutes', subheading: 'From local kitchens to your door', bg: grad('#F97316', '#F43F5E'), layout: 'phone-bottom' },
    { heading: 'Track every order live', subheading: 'Know exactly when dinner arrives', bg: solid('#EA580C'), layout: 'tilted' },
    { heading: 'Eat what you love', subheading: 'Thousands of restaurants, one app', bg: grad('#FDE68A', '#F97316'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)', layout: 'phone-top' },
  ]),
  t('mint', 'Mint Fresh', 'Food', ['Colorful', 'Minimal'], 'Fraunces', { headingColor: '#14532D', subColor: 'rgba(20,83,45,0.7)', deviceStyle: 'white' }, [
    { heading: 'Your favourite meals delivered', subheading: 'Fresh, fast and always warm', bg: solid('#DCFCE7'), layout: 'phone-bottom' },
    { heading: 'Quick delivery', subheading: 'Average delivery time: 22 minutes', bg: solid('#16A34A'), headingColor: '#F0FDF4', subColor: 'rgba(240,253,244,0.8)', layout: 'tilted' },
    { heading: 'Top rated by users', subheading: '4.8 rating on Google Play', bg: solid('#DCFCE7'), layout: 'phone-top' },
  ]),
  // ── Travel ──
  t('sunset', 'Golden Hour', 'Travel', ['Gradient', 'Colorful', '3D Devices'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Travel beyond limits', subheading: 'Destinations that feel like daydreams', bg: grad('#F97316', '#DB2777'), layout: 'tilted' },
    { heading: 'Find flights in seconds', subheading: 'Compare every airline at a glance', bg: grad('#FB923C', '#F43F5E'), layout: 'phone-bottom' },
    { heading: 'Your perfect escape', subheading: 'Curated stays for every budget', bg: grad('#FDE68A', '#F97316'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)', layout: 'phone-top' },
  ]),
  t('voyage', 'Voyage', 'Travel', ['Dark', 'Gradient', '3D Devices'], 'Sora', { deviceStyle: 'black', align: 'left' }, [
    { heading: 'Wander further', subheading: 'Book flights, trains and stays in one tap', bg: grad('#0C1840', '#1E3A8A'), layout: 'tilted', subColor: '#93C5FD' },
    { heading: 'Explore the world', subheading: 'Itineraries built around your style', bg: grad('#075985', '#0EA5E9'), layout: 'phone-bottom', subColor: '#BAE6FD' },
    { heading: 'Pack and go', subheading: 'Smart packing lists for every trip', bg: solid('#0C1840'), layout: 'phone-top', subColor: '#93C5FD' },
  ]),
  // ── Beauty ──
  t('candy', 'Candy', 'Beauty', ['Colorful', 'Gradient'], 'Sora', { headingColor: '#4C1D95', subColor: 'rgba(76,29,149,0.7)', deviceStyle: 'white' }, [
    { heading: 'Beauty curated for you', subheading: 'Everything for your routine, monthly', bg: grad('#FBCFE8', '#C4B5FD'), layout: 'phone-bottom' },
    { heading: 'Personalized picks', subheading: 'Matched to your skin and style', bg: solid('#7C3AED'), headingColor: '#FFFFFF', subColor: 'rgba(255,255,255,0.75)', layout: 'tilted' },
    { heading: 'Unbox something new', subheading: 'Full-size products, every month', bg: grad('#F9A8D4', '#FBCFE8'), layout: 'phone-top' },
  ]),
  t('lush', 'Lush', 'Beauty', ['Minimal', 'Colorful'], 'Playfair Display', { headingColor: '#831843', subColor: 'rgba(131,24,67,0.7)', deviceStyle: 'white' }, [
    { heading: 'Premium beauty picks', subheading: 'Hand-selected by experts', bg: solid('#FDF2F8'), layout: 'phone-bottom' },
    { heading: 'Your monthly glam bag', subheading: 'Customize it your way', bg: solid('#FBCFE8'), layout: 'tilted' },
    { heading: 'Shine brighter', subheading: 'Clean ingredients, real results', bg: solid('#FDF2F8'), layout: 'phone-top' },
  ]),
  // ── Fitness ──
  t('ocean', 'Ocean', 'Fitness', ['Gradient', '3D Devices'], 'Inter', { deviceStyle: 'titanium' }, [
    { heading: 'Set and reach fitness goals', subheading: 'Programs built around your body', bg: grad('#0EA5E9', '#1E3A8A'), layout: 'tilted' },
    { heading: 'Turn effort into results', subheading: 'Track every workout, every rep', bg: grad('#10B981', '#3B82F6'), layout: 'phone-bottom' },
    { heading: 'Connect with athletes', subheading: 'Compete with friends worldwide', bg: grad('#1E3A8A', '#0EA5E9'), layout: 'phone-top' },
  ]),
  t('pulse', 'Pulse', 'Fitness', ['Colorful', '3D Devices', 'Gradient'], 'Sora', { deviceStyle: 'black' }, [
    { heading: 'Move with purpose', subheading: 'Workouts that adapt to your energy', bg: grad('#EF4444', '#F97316'), layout: 'tilted' },
    { heading: 'Track every heartbeat', subheading: 'Real-time stats that keep you honest', bg: solid('#DC2626'), layout: 'phone-bottom' },
    { heading: 'Recover smarter', subheading: 'Rest days built into every plan', bg: grad('#F97316', '#FDE047'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)', layout: 'phone-top' },
  ]),
  // ── Education ──
  t('editorial', 'Editorial', 'Education', ['Minimal'], 'Playfair Display', { headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.65)', deviceStyle: 'black' }, [
    { heading: 'Read what moves you', subheading: 'Hand-picked stories, every morning', bg: solid('#FAF5EF'), layout: 'phone-bottom' },
    { heading: 'Listen anywhere', subheading: 'Audio editions for the commute', bg: solid('#EDE4D8'), layout: 'tilted' },
    { heading: 'Your library, curated', subheading: 'Save, highlight and revisit', bg: solid('#FAF5EF'), layout: 'phone-top' },
  ]),
  t('study', 'Study', 'Education', ['Colorful', '3D Devices'], 'Sora', { deviceStyle: 'white' }, [
    { heading: 'Learn while reading', subheading: 'Big ideas from every lesson', bg: grad('#3B82F6', '#8B5CF6'), layout: 'tilted' },
    { heading: 'Reading made fun', subheading: 'Track progress and earn badges', bg: solid('#2563EB'), layout: 'phone-bottom' },
    { heading: 'Listen and learn', subheading: 'Audio lessons for every level', bg: grad('#60A5FA', '#A78BFA'), layout: 'phone-top' },
  ]),
  // ── Social ──
  t('galaxy', 'Galaxy', 'Social', ['Dark', 'Gradient', '3D Devices'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left' }, [
    { heading: 'Find your people', subheading: 'Communities built around your vibe', bg: grad('#0F0524', '#7C3AED'), layout: 'tilted', subColor: '#C4B5FD' },
    { heading: 'Share what matters', subheading: 'Post, react and connect in real time', bg: grad('#1E1B4B', '#DB2777'), layout: 'phone-bottom', subColor: '#F9A8D4' },
    { heading: 'Never miss a moment', subheading: 'Live updates from everyone you follow', bg: solid('#0F0524'), layout: 'phone-top', subColor: '#C4B5FD' },
  ]),
  // ── Entertainment ──
  t('stream', 'Streamio', 'Entertainment', ['Dark', '3D Devices'], 'Sora', { deviceStyle: 'black' }, [
    { heading: 'Watch on all devices', subheading: 'Your library goes wherever you do', bg: grad('#0B0B12', '#7C3AED'), layout: 'tilted', subColor: '#C4B5FD' },
    { heading: 'Stream top movies', subheading: 'New releases every Friday', bg: solid('#0B0B12'), layout: 'phone-bottom', subColor: '#A78BFA' },
    { heading: 'Discover new shows', subheading: 'Pick up exactly where you left off', bg: grad('#1E1B4B', '#EC4899'), layout: 'phone-top', subColor: '#F9A8D4' },
  ]),
  // ── Games ──
  t('play', 'Play', 'Games', ['Colorful', '3D Devices', 'Gradient'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Play anywhere, anytime', subheading: 'Cloud saves across every device', bg: grad('#7C3AED', '#3B82F6'), layout: 'tilted' },
    { heading: 'Compete globally', subheading: 'Climb the leaderboard every week', bg: solid('#6D28D9'), layout: 'phone-bottom' },
    { heading: 'Level up faster', subheading: 'Daily quests and epic rewards', bg: grad('#3B82F6', '#EC4899'), layout: 'phone-top' },
  ]),
  // ── Health ──
  t('calm', 'Calm', 'Health', ['Gradient', 'Minimal'], 'Playfair Display', { headingColor: '#1E3A8A', subColor: 'rgba(30,58,138,0.7)', deviceStyle: 'white' }, [
    { heading: 'Breathe easier', subheading: 'Guided sessions for every moment', bg: grad('#DBEAFE', '#E0E7FF'), layout: 'phone-bottom' },
    { heading: 'Sleep deeper', subheading: 'Wind down with calming soundscapes', bg: solid('#BFDBFE'), layout: 'tilted' },
    { heading: 'Feel your best', subheading: 'Track mood, rest and recovery', bg: grad('#E0E7FF', '#FBCFE8'), layout: 'phone-top' },
  ]),
];

export const getTemplate = (id) => TEMPLATES.find((x) => x.id === id) || TEMPLATES[0];