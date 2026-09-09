// Blog post data. Each post has a slug matching the BlogSection cards so
// clicking a card routes to /blog/<slug> and renders the full article.
export const POSTS = [
  {
    slug: 'design-app-store-screenshots-that-convert',
    tag: 'App Store Optimization',
    title: 'How to Design App Store Screenshots That Convert',
    read: '6 min',
    accent: 'from-violet-500 to-fuchsia-500',
    image: 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/f69eef0e9_generated_image.png',
    updated: '2026-09-09',
    body: `Your first App Store screenshot is the single biggest driver of whether a visitor taps **Get**. Most users never scroll past the second image, so the first two screenshots have to do the heavy lifting.

## Lead with the benefit, not the feature

The headline on screenshot one should answer one question: *what will this app do for me?* Write the benefit in plain language — "Track expenses in seconds" beats "Advanced expense tracking engine." Keep the headline to six words or fewer so it stays legible at thumbnail size in search results.

## Build a visual hierarchy

A strong screenshot has three layers: a bold headline at the top, the device mockup as the hero, and an optional subheading that adds context. The headline should be the largest element, the subheading roughly half its size, and the mockup framed so the most important UI is visible without obstruction.

## Use contrast for readability

Dark backgrounds with light text (or the reverse) consistently outperform mid-tone palettes. If your app has a light interface, pair it with a colored or gradient background so the device frame pops. Test your screenshot at 25% zoom — if the headline is still readable, it will survive the App Store thumbnail.

## Tell a story across the set

Treat your screenshots as a sequence, not a random collection. The first image is the hook, the second shows the core workflow, and the rest highlight standout features. Duplicate your strongest layout and swap the content so the set feels cohesive.

## Avoid common rejection traps

Apple rejects screenshots that include other device brands, unrelated UI, or text that doesn't match your app. Keep device frames Apple-accurate, and never mock up a screenshot inside a competitor's phone. Tools like Shotox ship App Store-accurate frames so you don't have to draw them.`,
  },
  {
    slug: 'google-play-screenshot-sizes-2026',
    tag: 'Google Play',
    title: 'Google Play Screenshot Sizes & Feature Graphics in 2026',
    read: '5 min',
    accent: 'from-emerald-500 to-teal-500',
    image: 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/62f080fdd_generated_image.png',
    updated: '2026-09-09',
    body: `Google Play requires a different set of assets than the App Store, and getting the dimensions right the first time saves rejections and re-uploads.

## Required screenshot dimensions

- **Phone:** minimum 320px, maximum 3840px on the long edge; 16:9 or 9:16, at least one is landscape and one portrait if you provide both.
- **7-inch tablet:** 1080px minimum on the long edge.
- **10-inch tablet:** 1080px minimum on the long edge.
- **Feature graphic:** exactly 1024px × 500px — this is the wide banner shown at the top of your store listing.

## The feature graphic

The feature graphic is the first thing users see on the Play Store. Keep the most important content in the center 60% of the canvas — the edges are often cropped or overlaid with badges on different devices. Avoid placing text close to the borders.

## PNG or JPEG, 24-bit

Google Play accepts PNG (24-bit, no alpha) or JPEG. No transparency on screenshots — a transparent PNG will render with an unpredictable background on some devices. Stick to opaque backgrounds.

## Export once, ship everywhere

A single Shotox project can export phone, 7-inch, 10-inch and the feature graphic from the same design. Because the device presets are pinned to Google's specs, you won't accidentally ship a 1023px-wide feature graphic that gets silently rejected.`,
  },
  {
    slug: 'best-fonts-for-app-screenshots',
    tag: 'Design',
    title: 'The Best Fonts for App Screenshots (and How to Pair Them)',
    read: '7 min',
    accent: 'from-orange-500 to-pink-500',
    image: 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/0767dcc86_generated_image.png',
    updated: '2026-09-09',
    body: `Typography makes or breaks an app screenshot. The right typeface communicates premium quality at a glance; the wrong one makes a great app look amateur.

## Pick a display typeface for the headline

Your headline font should be bold, geometric, and instantly readable. Strong choices include **Sora**, **Inter**, **Satoshi** and **Poppins**. These fonts hold their shape at small sizes and have heavy enough weights (700–800) to carry a headline.

## Keep the subheading in a humanist sans

Pair a geometric display face with a slightly warmer humanist sans for the subheading. Inter is a safe companion because it was designed for screens and has excellent x-height. The contrast between a tight geometric headline and a readable humanist subheading creates clear hierarchy.

## Size rules of thumb

- Headline: 32–40pt equivalent on a phone screenshot.
- Subheading: roughly 50–60% of the headline size.
- Never go below 12pt equivalent — anything smaller vanishes at thumbnail size.

## Limit to two fonts

Using more than two typefaces in a single screenshot creates visual noise. If you need a third voice, change the weight or case of an existing font rather than introducing a new one.

## Test the thumbnail

Before shipping, shrink your screenshot to 120px wide. If the headline is still readable and the hierarchy is obvious, the font pairing works.`,
  },
  {
    slug: 'screenshots-matter-more-than-description',
    tag: 'ASO',
    title: 'Why Your App Screenshots Matter More Than Your Description',
    read: '4 min',
    accent: 'from-blue-500 to-indigo-500',
    image: 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/e491487a3_generated_image.png',
    updated: '2026-09-09',
    body: `Studies of App Store behavior consistently show that only about 2% of visitors read the full app description, while nearly everyone scrolls through the screenshots. Yet most teams spend more time writing the description than designing the screenshots.

## The scroll is the pitch

When a user lands on your listing, the screenshots load above the fold. The description is buried below the fold and behind a "more" tap. Your screenshots are effectively your entire sales pitch for the majority of visitors.

## Screenshots drive the install decision

A/B tests repeatedly show that swapping a weak first screenshot for a strong one can lift install rates by 15–30% — a bigger impact than almost any copy change. The first screenshot alone often accounts for the majority of the lift.

## What this means for your launch

Before you write a single word of your description, design the screenshot set. Get the headline, the device framing, and the visual hierarchy right. Only then fill in the description to reinforce what the screenshots already show.

## Keep iterating

Your screenshots are not set-and-forget. Revisit them after every major release. A new feature that belongs above the fold should push an older screenshot down or replace it entirely.`,
  },
  {
    slug: 'figma-to-store-ready-checklist',
    tag: 'Workflow',
    title: 'From Figma to Store-Ready: A Designer\u2019s Export Checklist',
    read: '8 min',
    accent: 'from-rose-500 to-violet-500',
    image: 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/8f7446311_generated_image.png',
    updated: '2026-09-09',
    body: `Designing the screenshot in Figma is half the job. The other half is exporting it so the store accepts it and it looks crisp on every device.

## 1. Set the correct canvas size

Start from the exact store spec, not a generic artboard. App Store 6.7" is 1290×2796px; Google Play feature graphic is 1024×500px. Designing at the final resolution avoids resampling artifacts.

## 2. Mind the safe zones

Keep critical content out of the top 10% and bottom 10% of the canvas — these areas are cropped or overlaid with status bars and store badges on some devices. Center your hero content.

## 3. Use sRGB color profile

Export in sRGB. Display P3 or Adobe RGB profiles can shift colors unpredictably on the store. Flatten any transparency to an opaque background.

## 4. Export at 2x or 3x

For Retina sharpness, export at 2x or 3x of your logical size, then downscale if the store requires a specific dimension. PNG preserves text crispness; JPEG is acceptable for photographic content.

## 5. Name files consistently

Use a naming scheme like \`appname_screen_01_6.7in.png\` so your set stays ordered and your localization team can match files by index.

## 6. Verify on a real device

Airdrop the final set to your phone and view it in the Photos app at thumbnail size. If it reads well there, it will read well on the store.

## Skip the manual pipeline

Shotox handles steps 1, 2, 4 and 5 automatically — you design once, and every export is already at the right size, named, and store-compliant.`,
  },
  {
    slug: '10-app-screenshot-layouts',
    tag: 'Inspiration',
    title: '10 App Screenshot Layouts That Work for Every Category',
    read: '6 min',
    accent: 'from-amber-500 to-orange-500',
    image: 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/3cced2d46_generated_image.png',
    updated: '2026-09-09',
    body: `Great screenshots follow a small number of proven layouts. Here are the patterns that work across finance, fitness, social and games.

## 1. Top text, centered device

The classic: a bold headline at the top third, the device mockup centered below. Works for any category and is the safest first screenshot.

## 2. Tilted 3D device

A phone tilted at 8–12 degrees with a soft shadow. Adds depth without distracting from the UI. Great for feature highlights.

## 3. Split landscape

For feature graphics: text on the left, device on the right (or the reverse). Balanced and reads well at wide aspect ratios.

## 4. Text-only statement

No device at all — just a powerful headline on a bold background. Use it as the first or last screenshot to set the tone.

## 5. Stacked devices

Two phones overlapping at different depths. Perfect for showing a before/after or a multi-step flow.

## 6. Spotlight background

A radial glow behind the device in your accent color. Adds energy without a busy photo.

## 7. Dotted grid

A subtle dotted pattern behind the device. Feels technical and precise — ideal for productivity and finance apps.

## 8. Brush stroke

A hand-drawn brush stroke weaving around the device. Adds personality for creative and social apps.

## 9. Neon rings

Concentric outline rings behind the device. Gives a modern, techy feel for AI and developer tools.

## 10. Gradient mesh

A smooth multi-color gradient fill. The most flexible background — adapts to any brand palette.

Every one of these layouts ships as a ready template inside Shotox, so you can try them all in minutes.`,
  },
];

export const getPost = (slug) => POSTS.find((p) => p.slug === slug);