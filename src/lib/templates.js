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

export const slideHeight = (device) => (BASE_W * device.h) / device.w;

export const FONTS = [
  'Sora', 'Inter', 'Space Grotesk', 'Poppins', 'Montserrat', 'DM Sans',
  'Plus Jakarta Sans', 'Outfit', 'Manrope', 'Bricolage Grotesque', 'Archivo',
  'Lexend', 'Nunito', 'Oswald', 'Bebas Neue', 'Playfair Display', 'Fraunces',
  'Lora', 'Instrument Serif',
];
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

export const THEME_STYLES = ['swipe', 'spotlight', 'split', 'grid', 'brush', 'orbs', 'neon', 'minimal'];
export const TEMPLATE_TAGS = ['All', '3D Devices', 'Dark', 'Colorful', 'Gradient', 'Minimal'];
export const CATEGORIES = ['All', 'Productivity', 'Finance', 'Beauty', 'Food', 'Travel', 'Fitness', 'Education', 'Social', 'AI', 'Entertainment', 'Games', 'Health', 'Commerce'];

export const MOCK_TYPES = ['hero', 'list', 'detail', 'stats', 'grid', 'chat', 'profile', 'success'];

// Per-template device pose: shifts the phone's x offset, rotation, scale, and
// vertical bleed so each template frames the mockup differently.
export const POSES = [
  { x: 0, rot: 0, scale: 1, topDelta: 0 },
  { x: 12, rot: 8, scale: 0.97, topDelta: 8 },
  { x: -12, rot: -8, scale: 0.97, topDelta: 8 },
  { x: 0, rot: 14, scale: 1, topDelta: 6 },
  { x: 0, rot: 0, scale: 0.88, topDelta: 42 },
  { x: 0, rot: 0, scale: 1.06, topDelta: -40 },
  { x: 8, rot: -10, scale: 1, topDelta: 10 },
  { x: -8, rot: 10, scale: 1, topDelta: 10 },
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
  style: 'swipe',
  mock: 'hero',
  pose: null,
  align: 'center',
  ...o,
});

const L8 = ['phone-bottom', 'tilted', 'phone-top', 'text-only', 'phone-bottom', 'tilted', 'phone-top', 'text-only'];

const isLight = (hex) => {
  const h = (hex || '').replace('#', '');
  if (!h) return false;
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return false;
  return (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 > 0.62;
};

const COPY = {
  Productivity: {
    h: ['Plan your day in seconds', 'Focus on what matters', 'Never miss a deadline', 'Build better habits', 'Your day, beautifully organized', 'Sync across all devices', 'Start your morning right', 'Beat the overwhelm', 'Get more done, calmly', 'One list for everything'],
    s: ['Smart schedules that adapt to your life', 'Priorities, reminders and gentle nudges', 'Smart alerts that respect your time', 'Streaks that keep you consistent', 'One glance. Everything in place.', 'Your tasks follow you everywhere', 'A clear plan in under a minute', 'Deep work, without the noise'],
  },
  Finance: {
    h: ['Trade anytime, anywhere', 'Security you can trust', 'Grow your assets', 'Instant price alerts', 'Portfolio at a glance', 'Low fees, high speed', 'Smart market signals', 'Own your money', 'Invest in seconds', 'Track every cent'],
    s: ['Real-time markets in your pocket', 'Bank-grade encryption, always on', 'Insights that move with the market', 'Never miss a move again', 'Track every asset in real time', 'Execute in milliseconds', 'AI-tuned to your strategy', 'Cold storage by default'],
  },
  Beauty: {
    h: ['Beauty curated for you', 'Personalized picks', 'Unbox something new', 'Glow on the go', 'Shade matched', 'Routine builder', 'Treat yourself', 'Clean beauty club', 'Shine brighter', 'Editor favorites'],
    s: ['Everything for your routine, monthly', 'Matched to your skin and style', 'Full-size products every month', 'Beauty tips in your pocket', 'Find your perfect color in seconds', 'AM and PM, made effortless', 'Self-care, delivered monthly', 'Clean ingredients, real results'],
  },
  Food: {
    h: ['Hot meals in minutes', 'Track every order live', 'Eat what you love', 'Cravings, sorted', 'Group orders, easy', 'Rewards that add up', 'Schedule your feast', 'Fresh, fast, always warm', 'Healthy options galore', 'Save your go-to spots'],
    s: ['From local kitchens to your door', 'Know exactly when dinner arrives', 'Thousands of restaurants, one app', 'Personalized picks every visit', 'Everyone pays their share in-app', 'Earn bites on every order', 'Order ahead for any occasion', 'Delivery that never disappoints'],
  },
  Travel: {
    h: ['Travel beyond limits', 'Find flights in seconds', 'Your perfect escape', 'Wander without worry', 'Hidden gems, unlocked', 'Plan trips together', 'Skip the lines', 'Chase the sunset', 'Pack and go', 'Adventure awaits'],
    s: ['Destinations that feel like daydreams', 'Compare every airline at a glance', 'Curated stays for every budget', 'Travel insurance built in', 'Local picks in every city', 'Shared itineraries for the group', 'Book tours and tickets in advance', 'Find golden hour anywhere on earth'],
  },
  Fitness: {
    h: ['Reach your goals', 'Turn effort into results', 'Connect with athletes', 'Train smarter', 'Move with intent', 'Recover smarter', 'Crush your goals', 'Find your rhythm', 'Move with purpose', 'Push past limits'],
    s: ['Programs built around your body', 'Track every workout, every rep', 'Compete with friends worldwide', 'AI plans that adapt to you', 'Workouts that fit your day', 'Rest days built into every plan', 'Milestones you can be proud of', 'Audio-guided runs and rides'],
  },
  Education: {
    h: ['Read what moves you', 'Listen anywhere', 'Your library, curated', 'Ideas worth your time', 'Read deeply', 'Offline editions', 'Learn while reading', 'Master any subject', 'Study smarter', 'Curiosity, rewarded'],
    s: ['Hand-picked stories, every morning', 'Audio editions for the commute', 'Save, highlight and revisit', 'Essays from the best minds', 'A calmer way to stay informed', 'Your reads, ready anywhere', 'Big ideas from every lesson', 'Bite-sized lessons that stick'],
  },
  Social: {
    h: ['Find your people', 'Share what matters', 'Never miss a moment', 'Start the conversation', 'Vibe with your circle', 'Go live in a tap', 'Your feed, your rules', 'Connect without noise', 'Build your tribe', 'Express yourself'],
    s: ['Communities built around your vibe', 'Post, react and connect in real time', 'Live updates from everyone you follow', 'Threads, polls and voice rooms', 'Private groups that feel like home', 'Broadcast to the world instantly', 'Algorithms you actually control', 'Social, the way it should be'],
  },
  AI: {
    h: ['Ask anything, instantly', 'Answers you can trust', 'Search, reimagined', 'Your ideas, amplified', 'Summaries in a tap', 'Create without limits', 'Speak, it understands', 'Your AI, your rules', 'Think out loud', 'From prompt to product'],
    s: ['AI that thinks at the speed of thought', 'Every reply backed by sources', 'From question to clarity in seconds', 'Draft, refine and ship faster', 'Turn long reads into quick wins', 'Images, text and code in one place', 'Natural voice, every language', 'Custom assistants for any task'],
  },
  Entertainment: {
    h: ['Watch on all devices', 'Stream top movies', 'Discover new shows', 'Binge without ads', 'Download and go', 'Profiles for everyone', 'New episodes tonight', 'Press play, escape', 'Your library, anywhere', 'Endless stories'],
    s: ['Your library goes wherever you do', 'New releases every Friday', 'Pick up exactly where you left off', 'Uninterrupted stories, always', 'Offline viewing for the road', 'Personal watchlists per person', 'Your favorites, always fresh', 'Cinema-grade in your pocket'],
  },
  Games: {
    h: ['Play anywhere, anytime', 'Compete globally', 'Level up faster', 'Team up instantly', 'Unlock rare loot', 'Battle in real time', 'Your saga awaits', 'Victory starts here', 'Climb the ranks', 'Squad up fast'],
    s: ['Cloud saves across every device', 'Climb the leaderboard every week', 'Daily quests and epic rewards', 'Squad up with friends in seconds', 'Collectibles that matter', 'Zero lag, all the glory', 'Stories that adapt to you', 'Train, rank, repeat'],
  },
  Health: {
    h: ['Breathe easier', 'Sleep deeper', 'Feel your best', 'Pause and reset', 'Calm your mind', 'Sleep stories', 'Mindful moments', 'Rest, renewed', 'Find your balance', 'Wind down gently'],
    s: ['Guided sessions for every moment', 'Wind down with calming soundscapes', 'Track mood, rest and recovery', 'One-minute meditations anywhere', 'Science-backed stress relief', 'Drift off, gently', 'Tiny breaks, big difference', 'Wake up the best version of you'],
  },
  Commerce: {
    h: ['Discover sneaker culture', 'Verified products only', 'Streetwear starts here', 'Explore sneaker culture', 'Elevate your style', 'Find your pair', 'Cop the latest drops', 'Track every sale', 'Authentic, always', 'Your sneaker source'],
    s: ['Thousands of verified listings', 'Every pair checked by experts', 'From grails to daily beaters', 'Curated drops, every week', 'Match your fit in seconds', 'Bid, buy and sell in one tap', 'Real-time market prices', 'A community of 520k sneakerheads'],
  },
};

// Template descriptors: (style, palette, font, device) make each visually distinct.
// style: swipe | spotlight | split | grid | brush | orbs | neon | minimal
const D = [
  // ── Productivity ──
  { id: 'aurora', name: 'Aurora', cat: 'Productivity', style: 'swipe', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#7C3AED', '#EC4899'), grad('#6366F1', '#0EA5E9'), solid('#1E1B4B'), grad('#8B5CF6', '#EC4899')] },
  { id: 'momentum', name: 'Momentum', cat: 'Productivity', style: 'spotlight', font: 'Inter', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#4F46E5', '#0EA5E9'), solid('#312E81'), grad('#6366F1', '#A855F7'), solid('#1E1B4B')] },
  { id: 'cadence', name: 'Cadence', cat: 'Productivity', style: 'grid', font: 'Space Grotesk', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#0EA5E9', '#6366F1'), grad('#8B5CF6', '#3B82F6'), solid('#0F172A'), grad('#6366F1', '#0EA5E9')] },
  { id: 'tidy', name: 'Tidy', cat: 'Productivity', style: 'minimal', font: 'Inter', dev: 'white', hc: '#0B0B12', sc: 'rgba(11,11,18,0.65)', colors: [solid('#F8FAFC'), solid('#E2E8F0'), solid('#F1F5F9'), solid('#FFFFFF')] },
  { id: 'flowstate', name: 'Flowstate', cat: 'Productivity', style: 'orbs', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#6D28D9', '#4F46E5'), solid('#1E1B4B'), grad('#7C3AED', '#6366F1'), solid('#312E81')] },
  // ── Finance ──
  { id: 'midnight', name: 'Midnight', cat: 'Finance', style: 'neon', font: 'Space Grotesk', dev: 'titanium', hc: '#A3E635', sc: 'rgba(196,197,253,0.8)', colors: [solid('#0B0B12'), grad('#111827', '#4C1D95'), solid('#020617'), grad('#0F0524', '#1E1B4B')] },
  { id: 'matrix', name: 'Matrix', cat: 'Finance', style: 'grid', font: 'Space Grotesk', dev: 'black', hc: '#4ADE80', sc: 'rgba(255,255,255,0.7)', colors: [solid('#020617'), solid('#052E16'), solid('#0B0B12'), grad('#020617', '#052E16')] },
  { id: 'ledger', name: 'Ledger', cat: 'Finance', style: 'split', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#1E3A8A', '#0EA5E9'), solid('#0C1840'), grad('#1E40AF', '#0EA5E9'), solid('#0F172A')] },
  { id: 'vault', name: 'Vault', cat: 'Finance', style: 'orbs', font: 'Inter', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [solid('#0B0B12'), grad('#111827', '#1E1B4B'), solid('#020617'), grad('#0F0524', '#1E3A8A')] },
  { id: 'compound', name: 'Compound', cat: 'Finance', style: 'swipe', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#7C3AED', '#4F46E5'), solid('#1E1B4B'), grad('#6366F1', '#3B82F6'), solid('#312E81')] },
  // ── Beauty ──
  { id: 'candy', name: 'Candy', cat: 'Beauty', style: 'swipe', font: 'Sora', dev: 'white', hc: '#4C1D95', sc: 'rgba(76,29,149,0.7)', colors: [grad('#FBCFE8', '#C4B5FD'), grad('#F9A8D4', '#FBCFE8'), solid('#C4B5FD'), grad('#FBCFE8', '#F0ABFC')] },
  { id: 'lush', name: 'Lush', cat: 'Beauty', style: 'minimal', font: 'Playfair Display', dev: 'white', hc: '#831843', sc: 'rgba(131,24,67,0.7)', colors: [solid('#FDF2F8'), solid('#FBCFE8'), solid('#FCE7F3'), solid('#FDF2F8')] },
  { id: 'glow', name: 'Glow', cat: 'Beauty', style: 'spotlight', font: 'Fraunces', dev: 'white', hc: '#4C1D95', sc: 'rgba(76,29,149,0.7)', colors: [grad('#FBCFE8', '#F0ABFC'), grad('#C4B5FD', '#FBCFE8'), solid('#F5D0FE'), grad('#F9A8D4', '#C4B5FD')] },
  { id: 'petal', name: 'Petal', cat: 'Beauty', style: 'brush', font: 'Sora', dev: 'white', hc: '#831843', sc: 'rgba(131,24,67,0.7)', colors: [solid('#FBCFE8'), grad('#F9A8D4', '#FCE7F3'), solid('#FDF2F8'), grad('#FBCFE8', '#F9A8D4')] },
  // ── Food ──
  { id: 'coral', name: 'Coral Pop', cat: 'Food', style: 'swipe', font: 'Sora', dev: 'white', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#F97316', '#F43F5E'), solid('#EA580C'), grad('#F43F5E', '#F97316'), grad('#FB923C', '#F43F5E')] },
  { id: 'mint', name: 'Mint Fresh', cat: 'Food', style: 'minimal', font: 'Fraunces', dev: 'white', hc: '#14532D', sc: 'rgba(20,83,45,0.7)', colors: [solid('#DCFCE7'), solid('#BBF7D0'), solid('#F0FDF4'), solid('#DCFCE7')] },
  { id: 'feast', name: 'Feast', cat: 'Food', style: 'orbs', font: 'Sora', dev: 'white', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', colors: [solid('#16A34A'), grad('#22C55E', '#16A34A'), solid('#15803D'), grad('#4ADE80', '#16A34A')] },
  { id: 'savor', name: 'Savor', cat: 'Food', style: 'split', font: 'Inter', dev: 'titanium', hc: '#1C1917', sc: 'rgba(28,25,23,0.7)', colors: [grad('#FDE68A', '#F97316'), grad('#FED7AA', '#FDBA74'), solid('#FEF3C7'), grad('#FBBF24', '#F97316')] },
  { id: 'crave', name: 'Crave', cat: 'Food', style: 'spotlight', font: 'Sora', dev: 'white', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#F43F5E', '#EC4899'), solid('#E11D48'), grad('#FB7185', '#F43F5E'), solid('#BE123C')] },
  // ── Travel ──
  { id: 'golden', name: 'Golden Hour', cat: 'Travel', style: 'swipe', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#F97316', '#DB2777'), grad('#FB923C', '#F43F5E'), solid('#EA580C'), grad('#F97316', '#F43F5E')] },
  { id: 'voyage', name: 'Voyage', cat: 'Travel', style: 'neon', font: 'Sora', dev: 'black', hc: '#93C5FD', sc: 'rgba(255,255,255,0.8)', colors: [grad('#0C1840', '#1E3A8A'), grad('#075985', '#0EA5E9'), solid('#0C1840'), grad('#0F172A', '#1E40AF')] },
  { id: 'wander', name: 'Wander', cat: 'Travel', style: 'grid', font: 'Inter', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#0EA5E9', '#06B6D4'), grad('#3B82F6', '#0EA5E9'), solid('#0C4A6E'), grad('#06B6D4', '#3B82F6')] },
  { id: 'compass', name: 'Compass', cat: 'Travel', style: 'brush', font: 'Sora', dev: 'white', hc: '#1C1917', sc: 'rgba(28,25,23,0.7)', colors: [grad('#FED7AA', '#FDBA74'), grad('#FBBF24', '#F97316'), solid('#FFF7ED'), grad('#FDE68A', '#FBBF24')] },
  // ── Fitness ──
  { id: 'ocean', name: 'Ocean', cat: 'Fitness', style: 'swipe', font: 'Inter', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#0EA5E9', '#1E3A8A'), grad('#10B981', '#3B82F6'), solid('#0C4A6E'), grad('#0EA5E9', '#10B981')] },
  { id: 'pulse', name: 'Pulse', cat: 'Fitness', style: 'spotlight', font: 'Sora', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#F97316', '#EF4444'), solid('#DC2626'), grad('#EF4444', '#F43F5E'), solid('#B91C1C')] },
  { id: 'stride', name: 'Stride', cat: 'Fitness', style: 'grid', font: 'Space Grotesk', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#10B981', '#0EA5E9'), grad('#22C55E', '#3B82F6'), solid('#064E3B'), grad('#0EA5E9', '#10B981')] },
  { id: 'apex', name: 'Apex', cat: 'Fitness', style: 'orbs', font: 'Sora', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#F97316', '#EF4444'), solid('#B91C1C'), grad('#EF4444', '#F43F5E'), solid('#7F1D1D')] },
  // ── Education ──
  { id: 'editorial', name: 'Editorial', cat: 'Education', style: 'minimal', font: 'Playfair Display', dev: 'black', hc: '#1C1917', sc: 'rgba(28,25,23,0.65)', colors: [solid('#FAF5EF'), solid('#EDE4D8'), solid('#F5EFE6'), solid('#EDE4D8')] },
  { id: 'study', name: 'Study', cat: 'Education', style: 'swipe', font: 'Sora', dev: 'white', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', colors: [grad('#3B82F6', '#8B5CF6'), solid('#2563EB'), grad('#6366F1', '#A78BFA'), grad('#8B5CF6', '#3B82F6')] },
  { id: 'scholar', name: 'Scholar', cat: 'Education', style: 'split', font: 'Inter', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#1E3A8A', '#3B82F6'), solid('#1D4ED8'), grad('#3B82F6', '#6366F1'), solid('#1E40AF')] },
  { id: 'bright', name: 'Bright', cat: 'Education', style: 'orbs', font: 'Sora', dev: 'white', hc: '#0B0B12', sc: 'rgba(11,11,18,0.7)', colors: [grad('#FDE68A', '#FBBF24'), grad('#FED7AA', '#F97316'), solid('#FEF3C7'), grad('#FBBF24', '#EA580C')] },
  // ── Social ──
  { id: 'galaxy', name: 'Galaxy', cat: 'Social', style: 'neon', font: 'Space Grotesk', dev: 'titanium', hc: '#C4B5FD', sc: 'rgba(255,255,255,0.7)', colors: [grad('#0F0524', '#7C3AED'), grad('#1E1B4B', '#DB2777'), solid('#0F0524'), grad('#0F0524', '#1E3A8A')] },
  { id: 'vibe', name: 'Vibe', cat: 'Social', style: 'orbs', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#DB2777', '#7C3AED'), grad('#6366F1', '#EC4899'), solid('#831843'), grad('#EC4899', '#7C3AED')] },
  { id: 'loop', name: 'Loop', cat: 'Social', style: 'grid', font: 'Space Grotesk', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#6366F1', '#8B5CF6'), solid('#1E1B4B'), grad('#7C3AED', '#3B82F6'), solid('#0F0524')] },
  { id: 'tribe', name: 'Tribe', cat: 'Social', style: 'swipe', font: 'Inter', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#7C3AED', '#DB2777'), grad('#EC4899', '#F97316'), solid('#4C1D95'), grad('#6366F1', '#EC4899')] },
  // ── AI ──
  { id: 'lime', name: 'Neon Lime', cat: 'AI', style: 'minimal', font: 'Space Grotesk', dev: 'black', hc: '#0B0B12', sc: 'rgba(11,11,18,0.7)', colors: [solid('#D9F99D'), solid('#ECFCCB'), solid('#D9F99D'), solid('#ECFCCB')] },
  { id: 'neoncity', name: 'Neon City', cat: 'AI', style: 'neon', font: 'Space Grotesk', dev: 'titanium', hc: '#F0ABFC', sc: 'rgba(196,197,253,0.8)', colors: [grad('#1E1B4B', '#7C3AED'), grad('#0F0A1E', '#DB2777'), grad('#020617', '#0EA5E9'), solid('#0F0A1E')] },
  { id: 'synapse', name: 'Synapse', cat: 'AI', style: 'grid', font: 'Sora', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#3B82F6', '#6366F1'), grad('#8B5CF6', '#3B82F6'), solid('#1E1B4B'), grad('#6366F1', '#A855F7')] },
  { id: 'prompt', name: 'Prompt', cat: 'AI', style: 'split', font: 'Inter', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#7C3AED', '#4F46E5'), grad('#6366F1', '#0EA5E9'), solid('#312E81'), grad('#4F46E5', '#6366F1')] },
  { id: 'spark', name: 'Spark', cat: 'AI', style: 'spotlight', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', colors: [grad('#F59E0B', '#EF4444'), grad('#F97316', '#EC4899'), solid('#C2410C'), grad('#F43F5E', '#F97316')] },
  // ── Entertainment ──
  { id: 'streamio', name: 'Streamio', cat: 'Entertainment', style: 'neon', font: 'Sora', dev: 'black', hc: '#FFFFFF', sc: 'rgba(196,197,253,0.8)', colors: [grad('#0B0B12', '#7C3AED'), solid('#0B0B12'), grad('#1E1B4B', '#EC4899'), grad('#0B0B12', '#1E3A8A')] },
  { id: 'reel', name: 'Reel', cat: 'Entertainment', style: 'orbs', font: 'Inter', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#7C3AED', '#3B82F6'), grad('#EC4899', '#7C3AED'), solid('#1E1B4B'), grad('#6366F1', '#EC4899')] },
  { id: 'marquee', name: 'Marquee', cat: 'Entertainment', style: 'swipe', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', colors: [grad('#C2410C', '#7C2D12'), grad('#EA580C', '#B45309'), solid('#7C2D12'), grad('#9A3412', '#C2410C')] },
  { id: 'binge', name: 'Binge', cat: 'Entertainment', style: 'grid', font: 'Space Grotesk', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#4C1D95', '#7C3AED'), solid('#1E1B4B'), grad('#6D28D9', '#4F46E5'), solid('#0F0524')] },
  // ── Games ──
  { id: 'play', name: 'Play', cat: 'Games', style: 'swipe', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#7C3AED', '#3B82F6'), solid('#6D28D9'), grad('#3B82F6', '#EC4899'), grad('#8B5CF6', '#3B82F6')] },
  { id: 'arcade', name: 'Arcade', cat: 'Games', style: 'neon', font: 'Space Grotesk', dev: 'titanium', hc: '#4ADE80', sc: 'rgba(255,255,255,0.8)', colors: [solid('#020617'), grad('#020617', '#16A34A'), solid('#0B0B12'), grad('#020617', '#0EA5E9')] },
  { id: 'nexus', name: 'Nexus', cat: 'Games', style: 'grid', font: 'Sora', dev: 'black', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#3B82F6', '#8B5CF6'), grad('#6366F1', '#EC4899'), solid('#1E1B4B'), grad('#8B5CF6', '#3B82F6')] },
  { id: 'quest', name: 'Quest', cat: 'Games', style: 'orbs', font: 'Inter', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', colors: [grad('#F59E0B', '#EF4444'), grad('#F97316', '#EC4899'), solid('#B45309'), grad('#F43F5E', '#F97316')] },
  { id: 'clan', name: 'Clan', cat: 'Games', style: 'spotlight', font: 'Sora', dev: 'titanium', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', colors: [grad('#6D28D9', '#4F46E5'), solid('#5B21B6'), grad('#7C3AED', '#6D28D9'), solid('#4C1D95')] },
  // ── Health ──
  { id: 'calm', name: 'Calm', cat: 'Health', style: 'minimal', font: 'Playfair Display', dev: 'white', hc: '#1E3A8A', sc: 'rgba(30,58,138,0.7)', colors: [grad('#DBEAFE', '#E0E7FF'), solid('#BFDBFE'), grad('#E0E7FF', '#FBCFE8'), solid('#DBEAFE')] },
  { id: 'serene', name: 'Serene', cat: 'Health', style: 'orbs', font: 'Fraunces', dev: 'white', hc: '#14532D', sc: 'rgba(20,83,45,0.7)', colors: [solid('#DCFCE7'), grad('#BBF7D0', '#DCFCE7'), solid('#ECFDF5'), solid('#D1FAE5')] },
  { id: 'balance', name: 'Balance', cat: 'Health', style: 'spotlight', font: 'Inter', dev: 'white', hc: '#0F766E', sc: 'rgba(15,118,110,0.7)', colors: [grad('#99F6E4', '#5EEAD4'), solid('#CCFBF1'), grad('#A7F3D0', '#99F6E4'), solid('#D1FAE5')] },
  { id: 'bloomwell', name: 'Bloom Well', cat: 'Health', style: 'brush', font: 'Playfair Display', dev: 'white', hc: '#831843', sc: 'rgba(131,24,67,0.7)', colors: [solid('#FCE7F3'), grad('#FBCFE8', '#FCE7F3'), solid('#FDF2F8'), grad('#F9A8D4', '#FBCFE8')] },
  // ── Commerce ──
  { id: 'kicksy', name: 'Kicksy', cat: 'Commerce', style: 'brush', font: 'Playfair Display', dev: 'white', hc: '#14532D', sc: 'rgba(20,83,45,0.7)', colors: [solid('#b8e9b0'), grad('#BBF7D0', '#b8e9b0'), solid('#A7F3D0'), solid('#DCFCE7')] },
];

const tagsFor = (d) => {
  const tags = new Set();
  if (d.style === 'minimal') tags.add('Minimal');
  if (d.colors.some((c) => c.type === 'gradient')) tags.add('Gradient');
  tags.add(isLight(d.colors[0].from) ? 'Colorful' : 'Dark');
  if (d.dev === 'titanium' || d.dev === 'black') tags.add('3D Devices');
  return Array.from(tags);
};

const perCat = {};
export const TEMPLATES = D.map((d, di) => {
  perCat[d.cat] = perCat[d.cat] || 0;
  const off = perCat[d.cat]++;
  const pose = POSES[di % POSES.length];
  const pool = COPY[d.cat];
  const slides = [];
  for (let i = 0; i < 8; i++) {
    slides.push(
      makeSlide({
        font: d.font,
        style: d.style,
        mock: MOCK_TYPES[(off + i) % MOCK_TYPES.length],
        pose,
        layout: L8[i % 8],
        heading: pool.h[(off * 3 + i) % pool.h.length],
        subheading: pool.s[(off * 2 + i) % pool.s.length],
        bg: d.colors[i % d.colors.length],
        headingColor: d.hc,
        subColor: d.sc,
        deviceStyle: d.dev,
      })
    );
  }
  return { id: d.id, name: d.name, category: d.cat, tags: tagsFor(d), font: d.font, style: d.style, slides };
});

export const getTemplate = (id) => TEMPLATES.find((x) => x.id === id) || TEMPLATES[0];