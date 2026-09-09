// Blog posts — markdown body rendered by BlogPost page.
// Covers use on-brand CSS gradients (no external image deps).

export const BLOG_POSTS = [
  {
    slug: 'app-screenshot-best-practices',
    title: 'App Store Screenshot Best Practices That Convert',
    excerpt: 'The exact layout, hierarchy, and copy rules that turn a listing screenshot into an install.',
    category: 'Design',
    accent: 'from-violet-600 to-fuchsia-500',
    readTime: '6 min read',
    date: '2026-09-02',
    body: `## Lead with one idea per screen

The App Store only gives you a handful of screenshots before the fold. Each one should communicate **a single benefit**, not a feature dump. A user scrolling at speed should understand the value in under a second.

## Hierarchy: headline, device, caption

A reliable structure that converts: a bold one-line headline at the top, the device mockup as the hero, and a short caption underneath. Keep the headline to 4–6 words.

## Color and contrast

Screenshots sit on a white App Store background by default. A saturated gradient behind your device makes the mockup pop and pulls the eye. Just make sure your text contrast stays accessible.

## Export at native resolution

Always export at the **exact pixel size** Apple and Google request. Downscaling a larger image softens text; upscaling a smaller one blurs it. Shotox ships store-ready sizes for every device class.
`,
  },
  {
    slug: 'android-vs-ios-screenshot-sizes',
    title: 'Android vs iOS: The Complete Screenshot Size Guide',
    excerpt: 'Every required device size, aspect ratio, and format for App Store and Google Play in one place.',
    category: 'Specs',
    accent: 'from-sky-500 to-emerald-400',
    readTime: '5 min read',
    date: '2026-08-26',
    body: `## iOS sizes

Apple requires 6.7", 6.5", 5.5" and now iPad sizes depending on the device family. The 6.7" class is the most-viewed — design there first, then adapt.

## Google Play sizes

Play asks for a phone screenshot (16:9 or 9:16), a 7" tablet, a 10" tablet, and optionally a feature graphic (1024x500) for the top of the listing.

## One source, many exports

Designing once and exporting to every size is the whole game. Keep your core composition flexible so it crops cleanly into portrait, landscape, and the wide feature graphic.
`,
  },
  {
    slug: 'why-screenshots-drive-installs',
    title: 'Why Your Screenshots Drive More Installs Than Your Description',
    excerpt: 'Users judge an app in seconds — here is what the eye actually lands on first.',
    category: 'Conversion',
    accent: 'from-orange-500 to-pink-500',
    readTime: '4 min read',
    date: '2026-08-18',
    body: `## People scan, they do not read

Eye-tracking studies on app stores show users barely read the description. The first two screenshots carry almost all the decision weight.

## The first screenshot is your headline

Treat screenshot #1 like a billboard. A benefit-led line + a clean device shot outperforms a feature list every time.

## Iterate, do not guess

Swap the first screenshot, keep everything else, and watch install-rate changes in App Store Connect. Small visual tweaks move the needle more than copy rewrites.
`,
  },
  {
    slug: 'feature-graphic-that-converts',
    title: 'Designing a Google Play Feature Graphic That Converts',
    excerpt: 'The 1024x500 banner is the most underused asset in your Play Store listing.',
    category: 'Play Store',
    accent: 'from-indigo-600 to-violet-500',
    readTime: '5 min read',
    date: '2026-08-10',
    body: `## The feature graphic is your billboard

It shows at the top of your Play listing and in search results. Most apps leave it blank or default — that is free real estate you should claim.

## Keep it legible at a glance

At 1024x500, anything smaller than a short headline gets lost on mobile. One word + your device shot is plenty.

## Match your screenshot system

Use the same gradient and type system as your screenshots so the listing feels like one product, not a patchwork.
`,
  },
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);