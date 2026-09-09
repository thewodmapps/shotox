export const BASE_W = 300;

export const DEVICES = [
  { id: 'iphone-6.7', name: 'iPhone 6.7" (15 Pro Max)', w: 1290, h: 2796, platform: 'ios' },
  { id: 'iphone-6.5', name: 'iPhone 6.5" (11 Pro Max)', w: 1242, h: 2688, platform: 'ios' },
  { id: 'iphone-5.5', name: 'iPhone 5.5" (8 Plus)', w: 1242, h: 2208, platform: 'ios' },
  { id: 'android-phone', name: 'Google Play Phone', w: 1080, h: 1920, platform: 'android' },
];
export const getDevice = (id) => DEVICES.find((d) => d.id === id) || DEVICES[0];
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

const t = (id, name, tags, font, base, slides) => ({
  id, name, tags, font,
  slides: slides.map((s) => makeSlide({ font, ...base, ...s })),
});

export const TEMPLATE_TAGS = ['All', '3D Devices', 'Dark', 'Colorful', 'Gradient', 'Minimal'];

export const TEMPLATES = [
  t('aurora', 'Aurora', ['Gradient', 'Colorful', '3D Devices'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Plan your day in seconds', subheading: 'Smart schedules that adapt to your life', bg: grad('#7C3AED', '#EC4899'), layout: 'tilted' },
    { heading: 'Focus on what matters', subheading: 'Priorities, reminders and gentle nudges', bg: grad('#6366F1', '#0EA5E9'), layout: 'phone-bottom' },
    { heading: 'Loved by 1M+ users', subheading: '4.9 rating on the App Store', bg: grad('#EC4899', '#F97316'), layout: 'phone-top' },
  ]),
  t('midnight', 'Midnight', ['Dark', '3D Devices', 'Minimal'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left' }, [
    { heading: 'Trade anytime, anywhere', subheading: 'Real-time markets in your pocket', bg: solid('#0B0B12'), layout: 'tilted', subColor: '#A3E635' },
    { heading: 'Security you can trust', subheading: 'Bank-grade encryption, always on', bg: grad('#111827', '#4C1D95'), layout: 'phone-bottom' },
    { heading: 'Grow your assets', subheading: 'Insights that move with the market', bg: solid('#0B0B12'), layout: 'phone-top', subColor: '#A3E635' },
  ]),
  t('lime', 'Neon Lime', ['Colorful', 'Minimal'], 'Space Grotesk', { headingColor: '#0B0B12', subColor: 'rgba(11,11,18,0.7)', deviceStyle: 'black' }, [
    { heading: 'Discover topics faster', subheading: 'Answers with sources you can trust', bg: solid('#D9F99D'), layout: 'phone-bottom' },
    { heading: 'Speed meets intelligence', subheading: 'Ask anything, get clarity instantly', bg: solid('#0B0B12'), headingColor: '#D9F99D', subColor: 'rgba(217,249,157,0.75)', layout: 'tilted' },
    { heading: 'Explore without limits', subheading: 'Curated feeds for curious minds', bg: solid('#D9F99D'), layout: 'phone-top' },
  ]),
  t('coral', 'Coral Pop', ['Colorful', 'Gradient'], 'Sora', { deviceStyle: 'white' }, [
    { heading: 'Hot meals in minutes', subheading: 'From local kitchens to your door', bg: grad('#F97316', '#F43F5E'), layout: 'phone-bottom' },
    { heading: 'Track every order live', subheading: 'Know exactly when dinner arrives', bg: solid('#EA580C'), layout: 'tilted' },
    { heading: 'Eat what you love', subheading: 'Thousands of restaurants, one app', bg: grad('#FDE68A', '#F97316'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)', layout: 'phone-top' },
  ]),
  t('editorial', 'Editorial', ['Minimal'], 'Playfair Display', { headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.65)', deviceStyle: 'black' }, [
    { heading: 'Read what moves you', subheading: 'Hand-picked stories, every morning', bg: solid('#FAF5EF'), layout: 'phone-bottom' },
    { heading: 'Listen anywhere', subheading: 'Audio editions for the commute', bg: solid('#EDE4D8'), layout: 'tilted' },
    { heading: 'Your library, curated', subheading: 'Save, highlight and revisit', bg: solid('#FAF5EF'), layout: 'phone-top' },
  ]),
  t('ocean', 'Ocean', ['Gradient', '3D Devices'], 'Inter', { deviceStyle: 'titanium' }, [
    { heading: 'Set and reach fitness goals', subheading: 'Programs built around your body', bg: grad('#0EA5E9', '#1E3A8A'), layout: 'tilted' },
    { heading: 'Turn effort into results', subheading: 'Track every workout, every rep', bg: grad('#10B981', '#3B82F6'), layout: 'phone-bottom' },
    { heading: 'Connect with athletes', subheading: 'Compete with friends worldwide', bg: grad('#1E3A8A', '#0EA5E9'), layout: 'phone-top' },
  ]),
  t('mint', 'Mint Fresh', ['Colorful', 'Minimal'], 'Fraunces', { headingColor: '#14532D', subColor: 'rgba(20,83,45,0.7)', deviceStyle: 'white' }, [
    { heading: 'Your favourite meals delivered', subheading: 'Fresh, fast and always warm', bg: solid('#DCFCE7'), layout: 'phone-bottom' },
    { heading: 'Quick delivery', subheading: 'Average delivery time: 22 minutes', bg: solid('#16A34A'), headingColor: '#F0FDF4', subColor: 'rgba(240,253,244,0.8)', layout: 'tilted' },
    { heading: 'Top rated by users', subheading: '4.8 rating on Google Play', bg: solid('#DCFCE7'), layout: 'phone-top' },
  ]),
  t('candy', 'Candy', ['Colorful', 'Gradient'], 'Sora', { headingColor: '#4C1D95', subColor: 'rgba(76,29,149,0.7)', deviceStyle: 'white' }, [
    { heading: 'Beauty curated for you', subheading: 'Everything for your routine, monthly', bg: grad('#FBCFE8', '#C4B5FD'), layout: 'phone-bottom' },
    { heading: 'Personalized picks', subheading: 'Matched to your skin and style', bg: solid('#7C3AED'), headingColor: '#FFFFFF', subColor: 'rgba(255,255,255,0.75)', layout: 'tilted' },
    { heading: 'Unbox something new', subheading: 'Full-size products, every month', bg: grad('#F9A8D4', '#FBCFE8'), layout: 'phone-top' },
  ]),
];
export const getTemplate = (id) => TEMPLATES.find((x) => x.id === id) || TEMPLATES[0];