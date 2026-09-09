// Blog posts — markdown body rendered by BlogPost page.
// Covers are AI-generated editorial art (served via media.base44.com).

const IMG = 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b';

export const BLOG_POSTS = [
  {
    slug: 'app-screenshot-best-practices',
    title: 'App Store Screenshot Best Practices That Convert',
    excerpt: 'The exact layout, hierarchy, and copy rules that turn a listing screenshot into an install.',
    category: 'Design',
    cover: `${IMG}/0e0cc3499_generated_image.png`,
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
    cover: `${IMG}/81e44e337_generated_image.png`,
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
    cover: `${IMG}/76ed383ec_generated_image.png`,
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
    cover: `${IMG}/ec5dbb98b_generated_image.png`,
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
  {
    slug: 'app-icon-design-that-pops',
    title: 'App Icon Design That Pops in a Crowded Store',
    excerpt: 'A six-point checklist for an icon that earns the tap before the screenshot even loads.',
    category: 'Design',
    cover: `${IMG}/74bb81a2a_generated_image.png`,
    readTime: '6 min read',
    date: '2026-09-06',
    body: `## One symbol, not five

Your icon is 60×60 on the home screen and 120×120 in the store. It has to read at thumbnail size, which means one bold symbol, not a collage of features.

## Test on the wallpaper

Designers preview icons on a clean white canvas. Users see them on photos, gradients, and dark mode. Always test against both light and dark wallpapers.

## Avoid text in the icon

Three letters max, and only if they are your brand. Body copy in an icon is unreadable at home-screen size and signals an amateur listing.

## Shape your edges

iOS applies its own rounded mask; Android lets you ship custom shapes. Build on a square canvas and let each platform mask it — never hardcode a corner radius into the artwork.
`,
  },
  {
    slug: 'ab-test-your-app-screenshots',
    title: 'A/B Test Your App Screenshots Like a Growth Team',
    excerpt: 'A repeatable experiment loop that lifts install rate without touching your app code.',
    category: 'Conversion',
    cover: `${IMG}/c18895bbd_generated_image.png`,
    readTime: '7 min read',
    date: '2026-08-30',
    body: `## One variable at a time

Product page tests in App Store Connect let you swap screenshots against a control. Change the first screenshot only, then the headline color, then the background — never two at once, or you cannot read the winner.

## Let it run to significance

App Store tests need enough impressions to clear noise. A 7-day minimum avoids weekend skew and gives you a trustworthy install-rate delta.

## Log every winner

Keep a simple spreadsheet: hypothesis, variant, lift, and the screenshot file. Six months in, you have a playbook of what works for *your* category.

## Re-export, do not re-screenshot

When a variant wins, regenerate it at full resolution from your Shotox project — never ship a low-res test crop to production.
`,
  },
  {
    slug: 'localize-your-screenshots-multiply-installs',
    title: 'Localize Your Screenshots, Multiply Your Installs',
    excerpt: 'Translating the headline on each screenshot is the cheapest install lever most teams skip.',
    category: 'Growth',
    cover: `${IMG}/f039031e0_generated_image.png`,
    readTime: '6 min read',
    date: '2026-08-22',
    body: `## Words beat images for localization

Users skim the headline first. A screenshot with an English headline in a non-English store reads as "not for me" instantly — even if the app is fully translated.

## Keep the layout fixed

Duplicate your project, swap only the headline and caption per locale. The same device frame, gradient, and composition keeps your brand coherent across markets.

## Mind the text length

German and Portuguese run long; Chinese and Japanese run short. Design the headline box with breathing room so translations never break the layout.

## Prioritize by install volume

Start with the locales that already drive traffic in App Store Connect. Localizing your top three markets usually lifts installs more than chasing twenty small ones.
`,
  },
  {
    slug: 'indie-screenshot-workflow',
    title: "The Indie Dev's Screenshot Workflow That Beats Studios",
    excerpt: 'How a solo developer ships a full store-ready screenshot set in one afternoon.',
    category: 'Workflow',
    cover: `${IMG}/fdcb8e265_generated_image.png`,
    readTime: '5 min read',
    date: '2026-08-14',
    body: `## Start from a template, not a blank canvas

Studios have a design team. You have a deadline. A curated template gives you a proven layout in seconds — your job is to make it yours, not to invent the grid.

## Write the five headlines first

Before touching visuals, draft one benefit-led headline per screenshot. The copy is what sells; the design just carries it. If you cannot write a sharp headline for a feature, that screenshot probably shouldn't exist.

## Export the whole set at once

Design all slides in one project, then export every device size in a single click. A ZIP bundle keeps the filenames tidy for App Store Connect and Play Console uploads.

## Ship, then iterate

Your first set doesn't need to be perfect — it needs to be live. Put it in the store, watch the install rate, and improve the weakest screenshot next week.
`,
  },
];

export const getPostBySlug = (slug) => BLOG_POSTS.find((p) => p.slug === slug);