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

// rotating layouts across the 8 slides for variety
const L8 = ['phone-bottom', 'tilted', 'phone-top', 'text-only', 'phone-bottom', 'tilted', 'phone-top', 'text-only'];

const t = (id, name, category, tags, font, base, slides) => ({
  id, name, category, tags, font,
  slides: slides.map((s, i) => makeSlide({ font, layout: L8[i % 8], ...base, ...s })),
});

export const TEMPLATES = [
  // ── Productivity ──
  t('aurora', 'Aurora', 'Productivity', ['Gradient', 'Colorful', '3D Devices'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Plan your day in seconds', subheading: 'Smart schedules that adapt to your life', bg: grad('#7C3AED', '#EC4899') },
    { heading: 'Focus on what matters', subheading: 'Priorities, reminders and gentle nudges', bg: grad('#6366F1', '#0EA5E9') },
    { heading: 'Loved by busy people', subheading: 'Designed for deep work and calm', bg: grad('#EC4899', '#F97316') },
    { heading: 'Your day, beautifully organized', subheading: 'One glance. Everything in place.', bg: solid('#1E1B4B') },
    { heading: 'Never miss a deadline', subheading: 'Smart alerts that respect your time', bg: grad('#8B5CF6', '#EC4899') },
    { heading: 'Sync across all devices', subheading: 'Your tasks follow you everywhere', bg: grad('#0EA5E9', '#6366F1') },
    { heading: 'Build better habits', subheading: 'Streaks and gentle daily reminders', bg: solid('#4C1D95') },
    { heading: 'Start your morning right', subheading: 'A clear plan in under a minute', bg: grad('#7C3AED', '#0EA5E9') },
  ]),
  t('bloom', 'Bloom', 'Productivity', ['Colorful', 'Minimal'], 'Fraunces', { headingColor: '#14532D', subColor: 'rgba(20,83,45,0.7)', deviceStyle: 'white' }, [
    { heading: 'Build better habits', subheading: 'Small steps, big change', bg: solid('#DCFCE7') },
    { heading: 'Stay on track', subheading: 'Streaks that keep you going', bg: solid('#BBF7D0') },
    { heading: 'Celebrate progress', subheading: 'See how far you have come', bg: solid('#DCFCE7') },
    { heading: 'Gentle daily reminders', subheading: 'Nudges that never nag', bg: solid('#A7F3D0') },
    { heading: 'Your goals, visualized', subheading: 'Beautiful charts for every habit', bg: solid('#DCFCE7') },
    { heading: 'Pair up with friends', subheading: 'Accountability made simple', bg: solid('#BBF7D0') },
    { heading: 'Mindful and focused', subheading: 'One habit at a time', bg: solid('#F0FDF4') },
    { heading: 'Start fresh today', subheading: 'Your best year starts now', bg: solid('#DCFCE7') },
  ]),
  // ── Finance ──
  t('midnight', 'Midnight', 'Finance', ['Dark', '3D Devices', 'Minimal'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left', subColor: '#A3E635' }, [
    { heading: 'Trade anytime, anywhere', subheading: 'Real-time markets in your pocket', bg: solid('#0B0B12') },
    { heading: 'Security you can trust', subheading: 'Bank-grade encryption, always on', bg: grad('#111827', '#4C1D95') },
    { heading: 'Grow your assets', subheading: 'Insights that move with the market', bg: solid('#0B0B12') },
    { heading: 'Instant price alerts', subheading: 'Never miss a move again', bg: solid('#020617') },
    { heading: 'Portfolio at a glance', subheading: 'Track every asset in real time', bg: grad('#0F0524', '#1E1B4B') },
    { heading: 'Low fees, high speed', subheading: 'Execute in milliseconds', bg: solid('#0B0B12') },
    { heading: 'Smart market signals', subheading: 'AI-tuned to your strategy', bg: grad('#111827', '#1E3A8A') },
    { heading: 'Your money, secured', subheading: 'Cold storage by default', bg: solid('#020617') },
  ]),
  t('matrix', 'Matrix', 'Finance', ['Dark', 'Minimal'], 'Space Grotesk', { align: 'left', deviceStyle: 'black', subColor: '#4ADE80' }, [
    { heading: 'Track every coin', subheading: 'Real-time portfolio, zero clutter', bg: solid('#020617') },
    { heading: 'Insights that pay', subheading: 'AI signals tuned to your strategy', bg: solid('#020617') },
    { heading: 'Secure by design', subheading: 'Cold storage, warm interface', bg: solid('#020617') },
    { heading: 'Trade in milliseconds', subheading: 'Engineered for serious traders', bg: solid('#052E16') },
    { heading: 'Watchlist, refined', subheading: 'Only the assets that matter', bg: solid('#020617') },
    { heading: 'Charts that breathe', subheading: 'Live candles, zero lag', bg: solid('#052E16') },
    { heading: 'Alerts that matter', subheading: 'Custom triggers for every move', bg: solid('#020617') },
    { heading: 'Own your stack', subheading: 'Power-user controls, by default', bg: solid('#052E16') },
  ]),
  // ── AI ──
  t('lime', 'Neon Lime', 'AI', ['Colorful', 'Minimal'], 'Space Grotesk', { headingColor: '#0B0B12', subColor: 'rgba(11,11,18,0.7)', deviceStyle: 'black' }, [
    { heading: 'Discover topics faster', subheading: 'Answers with sources you can trust', bg: solid('#D9F99D') },
    { heading: 'Speed meets intelligence', subheading: 'Ask anything, get clarity instantly', bg: solid('#0B0B12'), headingColor: '#D9F99D', subColor: 'rgba(217,249,157,0.75)' },
    { heading: 'Explore without limits', subheading: 'Curated feeds for curious minds', bg: solid('#D9F99D') },
    { heading: 'Your second brain', subheading: 'Notes that organize themselves', bg: solid('#ECFCCB') },
    { heading: 'From prompt to product', subheading: 'Ship ideas in record time', bg: solid('#0B0B12'), headingColor: '#D9F99D', subColor: 'rgba(217,249,157,0.75)' },
    { heading: 'Summarize anything', subheading: 'Pages, podcasts, meetings', bg: solid('#D9F99D') },
    { heading: 'Think out loud', subheading: 'Voice notes, transcribed instantly', bg: solid('#ECFCCB') },
    { heading: 'Answers, not ads', subheading: 'A cleaner way to search', bg: solid('#0B0B12'), headingColor: '#D9F99D', subColor: 'rgba(217,249,157,0.75)' },
  ]),
  t('neon', 'Neon City', 'AI', ['Dark', 'Colorful', '3D Devices'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left', headingColor: '#F0ABFC', subColor: '#C4B5FD' }, [
    { heading: 'Ask anything, instantly', subheading: 'AI that thinks at the speed of thought', bg: grad('#1E1B4B', '#7C3AED') },
    { heading: 'Answers you can trust', subheading: 'Every reply backed by sources', bg: grad('#0F0A1E', '#DB2777'), headingColor: '#FBCFE8', subColor: '#F9A8D4' },
    { heading: 'Search, reimagined', subheading: 'From question to clarity in seconds', bg: grad('#020617', '#0EA5E9'), headingColor: '#A5F3FC', subColor: '#7DD3FC' },
    { heading: 'Your ideas, amplified', subheading: 'Draft, refine and ship faster', bg: solid('#0F0A1E') },
    { heading: 'Summaries in a tap', subheading: 'Turn long reads into quick wins', bg: grad('#1E1B4B', '#6366F1') },
    { heading: 'Create without limits', subheading: 'Images, text and code in one place', bg: grad('#0F0A1E', '#DB2777'), headingColor: '#FBCFE8', subColor: '#F9A8D4' },
    { heading: 'Speak, it understands', subheading: 'Natural voice, every language', bg: solid('#020617'), headingColor: '#A5F3FC', subColor: '#7DD3FC' },
    { heading: 'Your AI, your rules', subheading: 'Custom assistants for any task', bg: grad('#1E1B4B', '#7C3AED') },
  ]),
  // ── Food ──
  t('coral', 'Coral Pop', 'Food', ['Colorful', 'Gradient'], 'Sora', { deviceStyle: 'white' }, [
    { heading: 'Hot meals in minutes', subheading: 'From local kitchens to your door', bg: grad('#F97316', '#F43F5E') },
    { heading: 'Track every order live', subheading: 'Know exactly when dinner arrives', bg: solid('#EA580C') },
    { heading: 'Eat what you love', subheading: 'Thousands of restaurants, one app', bg: grad('#FDE68A', '#F97316'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)' },
    { heading: 'Cravings, sorted', subheading: 'Personalized picks every visit', bg: grad('#F43F5E', '#F97316') },
    { heading: 'Group orders, easy', subheading: 'Everyone pays their share in-app', bg: solid('#F97316') },
    { heading: 'Rewards that add up', subheading: 'Earn bites on every order', bg: grad('#FB923C', '#F43F5E') },
    { heading: 'Schedule your feast', subheading: 'Order ahead for any occasion', bg: solid('#EA580C') },
    { heading: 'Fresh, fast, always warm', subheading: 'Delivery that never disappoints', bg: grad('#FDE68A', '#F43F5E'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)' },
  ]),
  t('mint', 'Mint Fresh', 'Food', ['Colorful', 'Minimal'], 'Fraunces', { headingColor: '#14532D', subColor: 'rgba(20,83,45,0.7)', deviceStyle: 'white' }, [
    { heading: 'Your favourite meals delivered', subheading: 'Fresh, fast and always warm', bg: solid('#DCFCE7') },
    { heading: 'Quick delivery', subheading: 'Average delivery time: 22 minutes', bg: solid('#16A34A'), headingColor: '#F0FDF4', subColor: 'rgba(240,253,244,0.8)' },
    { heading: 'Top rated by users', subheading: '4.8 rating on Google Play', bg: solid('#DCFCE7') },
    { heading: 'Healthy options galore', subheading: 'Salads, bowls and power plates', bg: solid('#BBF7D0') },
    { heading: 'Save your go-to spots', subheading: 'Reorder in a single tap', bg: solid('#DCFCE7') },
    { heading: 'Track to your door', subheading: 'Live updates from kitchen to home', bg: solid('#16A34A'), headingColor: '#F0FDF4', subColor: 'rgba(240,253,244,0.8)' },
    { heading: 'Special offers daily', subheading: 'Exclusive deals for members', bg: solid('#BBF7D0') },
    { heading: 'Eat well, live well', subheading: 'Good food made effortless', bg: solid('#DCFCE7') },
  ]),
  // ── Travel ──
  t('sunset', 'Golden Hour', 'Travel', ['Gradient', 'Colorful', '3D Devices'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Travel beyond limits', subheading: 'Destinations that feel like daydreams', bg: grad('#F97316', '#DB2777') },
    { heading: 'Find flights in seconds', subheading: 'Compare every airline at a glance', bg: grad('#FB923C', '#F43F5E') },
    { heading: 'Your perfect escape', subheading: 'Curated stays for every budget', bg: grad('#FDE68A', '#F97316'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)' },
    { heading: 'Wander without worry', subheading: 'Travel insurance built in', bg: solid('#EA580C') },
    { heading: 'Hidden gems, unlocked', subheading: 'Local picks in every city', bg: grad('#F97316', '#F43F5E') },
    { heading: 'Plan trips together', subheading: 'Shared itineraries for the whole group', bg: grad('#FDBA74', '#FB7185') },
    { heading: 'Skip the lines', subheading: 'Book tours and tickets in advance', bg: solid('#C2410C') },
    { heading: 'Chase the sunset', subheading: 'Find golden hour anywhere on earth', bg: grad('#FDE68A', '#DB2777'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)' },
  ]),
  t('voyage', 'Voyage', 'Travel', ['Dark', 'Gradient', '3D Devices'], 'Sora', { deviceStyle: 'black', align: 'left', subColor: '#93C5FD' }, [
    { heading: 'Wander further', subheading: 'Book flights, trains and stays in one tap', bg: grad('#0C1840', '#1E3A8A') },
    { heading: 'Explore the world', subheading: 'Itineraries built around your style', bg: grad('#075985', '#0EA5E9'), subColor: '#BAE6FD' },
    { heading: 'Pack and go', subheading: 'Smart packing lists for every trip', bg: solid('#0C1840') },
    { heading: 'Off the beaten path', subheading: 'Discover places locals love', bg: grad('#0F172A', '#1E40AF') },
    { heading: 'Your trip, offline-ready', subheading: 'Maps and guides without the signal', bg: solid('#0C1840') },
    { heading: 'Currency, sorted', subheading: 'Spend smart in any country', bg: grad('#075985', '#1E3A8A'), subColor: '#BAE6FD' },
    { heading: 'Travel memories, kept', subheading: 'Journeys that tell a story', bg: solid('#0F172A') },
    { heading: 'Adventure awaits', subheading: 'Your next chapter starts here', bg: grad('#0C1840', '#0EA5E9') },
  ]),
  // ── Beauty ──
  t('candy', 'Candy', 'Beauty', ['Colorful', 'Gradient'], 'Sora', { headingColor: '#4C1D95', subColor: 'rgba(76,29,149,0.7)', deviceStyle: 'white' }, [
    { heading: 'Beauty curated for you', subheading: 'Everything for your routine, monthly', bg: grad('#FBCFE8', '#C4B5FD') },
    { heading: 'Personalized picks', subheading: 'Matched to your skin and style', bg: solid('#7C3AED'), headingColor: '#FFFFFF', subColor: 'rgba(255,255,255,0.75)' },
    { heading: 'Unbox something new', subheading: 'Full-size products, every month', bg: grad('#F9A8D4', '#FBCFE8') },
    { heading: 'Glow on the go', subheading: 'Beauty tips in your pocket', bg: grad('#FBCFE8', '#F0ABFC') },
    { heading: 'Shade matched', subheading: 'Find your perfect color in seconds', bg: solid('#C4B5FD') },
    { heading: 'Routine builder', subheading: 'AM and PM, made effortless', bg: grad('#DDD6FE', '#F9A8D4') },
    { heading: 'Loved by members', subheading: 'Join 100k+ beauty lovers', bg: solid('#F0ABFC') },
    { heading: 'Treat yourself', subheading: 'Self-care, delivered monthly', bg: grad('#FBCFE8', '#C4B5FD') },
  ]),
  t('lush', 'Lush', 'Beauty', ['Minimal', 'Colorful'], 'Playfair Display', { headingColor: '#831843', subColor: 'rgba(131,24,67,0.7)', deviceStyle: 'white' }, [
    { heading: 'Premium beauty picks', subheading: 'Hand-selected by experts', bg: solid('#FDF2F8') },
    { heading: 'Your monthly glam bag', subheading: 'Customize it your way', bg: solid('#FBCFE8') },
    { heading: 'Shine brighter', subheading: 'Clean ingredients, real results', bg: solid('#FDF2F8') },
    { heading: 'Skincare that listens', subheading: 'Formulas tuned to your skin', bg: solid('#FCE7F3') },
    { heading: 'Glow routines', subheading: 'Simple steps, stunning skin', bg: solid('#FBCFE8') },
    { heading: 'Editor favorites', subheading: 'The products everyone talks about', bg: solid('#FDF2F8') },
    { heading: 'Clean beauty club', subheading: 'Never any nasties', bg: solid('#FCE7F3') },
    { heading: 'Unbox joy', subheading: 'A surprise treat every month', bg: solid('#FBCFE8') },
  ]),
  // ── Fitness ──
  t('ocean', 'Ocean', 'Fitness', ['Gradient', '3D Devices'], 'Inter', { deviceStyle: 'titanium' }, [
    { heading: 'Set and reach fitness goals', subheading: 'Programs built around your body', bg: grad('#0EA5E9', '#1E3A8A') },
    { heading: 'Turn effort into results', subheading: 'Track every workout, every rep', bg: grad('#10B981', '#3B82F6') },
    { heading: 'Connect with athletes', subheading: 'Compete with friends worldwide', bg: grad('#1E3A8A', '#0EA5E9') },
    { heading: 'Train smarter', subheading: 'AI plans that adapt to you', bg: solid('#0C4A6E') },
    { heading: 'Move with intent', subheading: 'Workouts that fit your day', bg: grad('#0EA5E9', '#10B981') },
    { heading: 'Recovery, prioritized', subheading: 'Rest days built into every plan', bg: grad('#3B82F6', '#1E3A8A') },
    { heading: 'Crush your goals', subheading: 'Milestones you can be proud of', bg: solid('#075985') },
    { heading: 'Find your rhythm', subheading: 'Audio-guided runs and rides', bg: grad('#10B981', '#0EA5E9') },
  ]),
  t('pulse', 'Pulse', 'Fitness', ['Colorful', '3D Devices', 'Gradient'], 'Sora', { deviceStyle: 'black' }, [
    { heading: 'Move with purpose', subheading: 'Workouts that adapt to your energy', bg: grad('#EF4444', '#F97316') },
    { heading: 'Track every heartbeat', subheading: 'Real-time stats that keep you honest', bg: solid('#DC2626') },
    { heading: 'Recover smarter', subheading: 'Rest days built into every plan', bg: grad('#F97316', '#FDE047'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)' },
    { heading: 'Push past limits', subheading: 'Challenges that fire you up', bg: solid('#B91C1C') },
    { heading: 'Train anywhere', subheading: 'Bodyweight, gear, or gym', bg: grad('#F97316', '#EF4444') },
    { heading: 'Live classes daily', subheading: 'Sweat together, from home', bg: solid('#DC2626') },
    { heading: 'Build momentum', subheading: 'Streaks that keep you consistent', bg: grad('#FB923C', '#F97316'), headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.7)' },
    { heading: 'Feel the energy', subheading: 'Workouts that leave you glowing', bg: solid('#B91C1C') },
  ]),
  // ── Education ──
  t('editorial', 'Editorial', 'Education', ['Minimal'], 'Playfair Display', { headingColor: '#1C1917', subColor: 'rgba(28,25,23,0.65)', deviceStyle: 'black' }, [
    { heading: 'Read what moves you', subheading: 'Hand-picked stories, every morning', bg: solid('#FAF5EF') },
    { heading: 'Listen anywhere', subheading: 'Audio editions for the commute', bg: solid('#EDE4D8') },
    { heading: 'Your library, curated', subheading: 'Save, highlight and revisit', bg: solid('#FAF5EF') },
    { heading: 'Ideas worth your time', subheading: 'Essays from the best minds', bg: solid('#F5EFE6') },
    { heading: 'Read deeply', subheading: 'A calmer way to stay informed', bg: solid('#EDE4D8') },
    { heading: 'Offline editions', subheading: 'Your reads, ready anywhere', bg: solid('#FAF5EF') },
    { heading: 'Bookmarks that matter', subheading: 'Keep what speaks to you', bg: solid('#F5EFE6') },
    { heading: 'A daily ritual', subheading: 'Five minutes to think bigger', bg: solid('#EDE4D8') },
  ]),
  t('study', 'Study', 'Education', ['Colorful', '3D Devices'], 'Sora', { deviceStyle: 'white' }, [
    { heading: 'Learn while reading', subheading: 'Big ideas from every lesson', bg: grad('#3B82F6', '#8B5CF6') },
    { heading: 'Reading made fun', subheading: 'Track progress and earn badges', bg: solid('#2563EB') },
    { heading: 'Listen and learn', subheading: 'Audio lessons for every level', bg: grad('#60A5FA', '#A78BFA') },
    { heading: 'Master any subject', subheading: 'Bite-sized lessons that stick', bg: grad('#8B5CF6', '#3B82F6') },
    { heading: 'Practice with quizzes', subheading: 'Instant feedback, real growth', bg: solid('#1D4ED8') },
    { heading: 'Learn together', subheading: 'Classrooms, reinvented', bg: grad('#6366F1', '#A78BFA') },
    { heading: 'Study smarter', subheading: 'Spaced repetition, built in', bg: solid('#4F46E5') },
    { heading: 'Curiosity, rewarded', subheading: 'Turn learning into adventure', bg: grad('#3B82F6', '#6366F1') },
  ]),
  // ── Social ──
  t('galaxy', 'Galaxy', 'Social', ['Dark', 'Gradient', '3D Devices'], 'Space Grotesk', { deviceStyle: 'titanium', align: 'left', subColor: '#C4B5FD' }, [
    { heading: 'Find your people', subheading: 'Communities built around your vibe', bg: grad('#0F0524', '#7C3AED') },
    { heading: 'Share what matters', subheading: 'Post, react and connect in real time', bg: grad('#1E1B4B', '#DB2777'), subColor: '#F9A8D4' },
    { heading: 'Never miss a moment', subheading: 'Live updates from everyone you follow', bg: solid('#0F0524') },
    { heading: 'Start the conversation', subheading: 'Threads, polls and voice rooms', bg: grad('#0F0524', '#1E3A8A'), subColor: '#93C5FD' },
    { heading: 'Vibe with your circle', subheading: 'Private groups that feel like home', bg: solid('#1E1B4B') },
    { heading: 'Go live in a tap', subheading: 'Broadcast to the world instantly', bg: grad('#1E1B4B', '#7C3AED') },
    { heading: 'Your feed, your rules', subheading: 'Algorithms you actually control', bg: solid('#0F0524') },
    { heading: 'Connect without noise', subheading: 'Social, the way it should be', bg: grad('#0F0524', '#DB2777'), subColor: '#F9A8D4' },
  ]),
  // ── Entertainment ──
  t('stream', 'Streamio', 'Entertainment', ['Dark', '3D Devices'], 'Sora', { deviceStyle: 'black', subColor: '#C4B5FD' }, [
    { heading: 'Watch on all devices', subheading: 'Your library goes wherever you do', bg: grad('#0B0B12', '#7C3AED') },
    { heading: 'Stream top movies', subheading: 'New releases every Friday', bg: solid('#0B0B12'), subColor: '#A78BFA' },
    { heading: 'Discover new shows', subheading: 'Pick up exactly where you left off', bg: grad('#1E1B4B', '#EC4899'), subColor: '#F9A8D4' },
    { heading: 'Binge without ads', subheading: 'Uninterrupted stories, always', bg: solid('#0B0B12'), subColor: '#C4B5FD' },
    { heading: 'Download and go', subheading: 'Offline viewing for the road', bg: grad('#0B0B12', '#1E3A8A'), subColor: '#93C5FD' },
    { heading: 'Profiles for everyone', subheading: 'Personal watchlists per person', bg: solid('#1E1B4B'), subColor: '#F9A8D4' },
    { heading: 'New episodes tonight', subheading: 'Your favorites, always fresh', bg: grad('#1E1B4B', '#7C3AED') },
    { heading: 'Press play, escape', subheading: 'Cinema-grade in your pocket', bg: solid('#0B0B12'), subColor: '#A78BFA' },
  ]),
  // ── Games ──
  t('play', 'Play', 'Games', ['Colorful', '3D Devices', 'Gradient'], 'Sora', { deviceStyle: 'titanium' }, [
    { heading: 'Play anywhere, anytime', subheading: 'Cloud saves across every device', bg: grad('#7C3AED', '#3B82F6') },
    { heading: 'Compete globally', subheading: 'Climb the leaderboard every week', bg: solid('#6D28D9') },
    { heading: 'Level up faster', subheading: 'Daily quests and epic rewards', bg: grad('#3B82F6', '#EC4899') },
    { heading: 'Team up instantly', subheading: 'Squad up with friends in seconds', bg: grad('#8B5CF6', '#3B82F6') },
    { heading: 'Unlock rare loot', subheading: 'Collectibles that matter', bg: solid('#5B21B6') },
    { heading: 'Battle in real time', subheading: 'Zero lag, all the glory', bg: grad('#3B82F6', '#8B5CF6') },
    { heading: 'Your saga awaits', subheading: 'Stories that adapt to you', bg: solid('#6D28D9') },
    { heading: 'Victory starts here', subheading: 'Train, rank, repeat', bg: grad('#7C3AED', '#EC4899') },
  ]),
  // ── Health ──
  t('calm', 'Calm', 'Health', ['Gradient', 'Minimal'], 'Playfair Display', { headingColor: '#1E3A8A', subColor: 'rgba(30,58,138,0.7)', deviceStyle: 'white' }, [
    { heading: 'Breathe easier', subheading: 'Guided sessions for every moment', bg: grad('#DBEAFE', '#E0E7FF') },
    { heading: 'Sleep deeper', subheading: 'Wind down with calming soundscapes', bg: solid('#BFDBFE') },
    { heading: 'Feel your best', subheading: 'Track mood, rest and recovery', bg: grad('#E0E7FF', '#FBCFE8'), headingColor: '#831843', subColor: 'rgba(131,24,67,0.7)' },
    { heading: 'Pause and reset', subheading: 'One-minute meditations anywhere', bg: solid('#DBEAFE') },
    { heading: 'Calm your mind', subheading: 'Science-backed stress relief', bg: solid('#E0E7FF') },
    { heading: 'Sleep stories', subheading: 'Drift off, gently', bg: grad('#BFDBFE', '#E0E7FF') },
    { heading: 'Mindful moments', subheading: 'Tiny breaks, big difference', bg: solid('#DBEAFE') },
    { heading: 'Rest, renewed', subheading: 'Wake up the best version of you', bg: grad('#E0E7FF', '#DBEAFE') },
  ]),
];

export const getTemplate = (id) => TEMPLATES.find((x) => x.id === id) || TEMPLATES[0];