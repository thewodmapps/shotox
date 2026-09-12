import {
  Bot, TrendingDown, Smartphone, ListChecks, CreditCard, Languages, Store,
  Eye, PenTool, Briefcase,
} from 'lucide-react';

// 10 additional SEO-optimized posts (the Sep 2026 launch batch). Globally-targeted, unique angles.
export const NEW_POSTS = [
  {
    slug: 'app-screenshots-for-ai-apps',
    title: 'App Screenshots for AI and Chatbot Apps: A 2026 Design Guide',
    excerpt: 'AI apps are the fastest-growing category in 2026. Here is how to design AI and chatbot app screenshots that show intelligence, build trust, and convert curious users into installs.',
    category: 'Templates',
    date: 'Sep 12, 2026',
    readTime: '11 minute read',
    color: '#7C3AED',
    icon: Bot,
    keywords: 'ai app screenshots, chatbot app mockup, ai app design, generative ai app store',
    content: `## Why AI Apps Need Their Own Screenshot Language

AI apps are everywhere in 2026, and users are both curious and skeptical. They want to see intelligence in action, but they also want proof the app is safe and useful — not a toy. Your screenshots must show a real AI interaction and the result it produces, not a blank prompt box.

## The AI Screenshot Set

### Slide 1 — The Outcome
The result the AI produces — a generated image, a written summary, a solved problem. Show the payoff, not the prompt.

### Slide 2 — The Interaction
The chat or prompt screen with a real, specific request. Show that the app understands natural language.

### Slide 3 — Speed
"Answers in seconds" with a streaming or typing indicator. AI users care about latency.

### Slide 4 — Control
Editing, regenerating, or guiding the output. Show the user is in charge, not the model.

### Slide 5 — Trust and Privacy
How your app handles data — no training on inputs, private sessions, or content filters. Trust is the conversion blocker for AI.

## Design Notes

- **Modern, tech-forward palettes** — violet, indigo, near-black with a vivid accent
- **Real prompts and outputs**, never "Lorem ipsum" or placeholder chat
- **Show the human + AI loop**, not just a finished result
- **3D frames** with a slight tilt for a premium, future-facing feel

## What to Avoid

- An empty chat box as slide one (no value shown)
- Generic robot graphics instead of real app UI
- Hiding how data is handled — AI users look for this

AI users install the intelligence. Show the interaction and the outcome in five slides and they convert.`,
  },
  {
    slug: 'why-app-screenshots-not-converting',
    title: 'Why Your App Screenshots Aren\'t Converting (and How to Diagnose It)',
    excerpt: 'Low install rate despite good traffic? Your screenshots are usually the culprit. Here is a diagnostic framework to find exactly which slide is losing users.',
    category: 'ASO',
    date: 'Sep 12, 2026',
    readTime: '12 minute read',
    color: '#DC2626',
    icon: TrendingDown,
    keywords: 'app screenshots not converting, low install rate, aso diagnosis, app store conversion',
    content: `## When Traffic Comes But Installs Don't

If your app ranks and gets impressions but visitors don't install, the problem is almost always the listing — and within the listing, almost always the screenshots. Diagnosing which slide loses users turns a vague problem into a fixable one.

## The Diagnostic Funnel

### 1. Check the Store Conversion Rate
Both stores report "installers / visitors". If it is below 25% for a free app, your listing is underperforming. Screenshots are the first place to look.

### 2. Identify the Drop-Off
On Google Play, Store Listing Experiments show which variant converts. On iOS, Custom Product Pages show per-page conversion. Find where users bounce.

### 3. Audit Slide One in Isolation
Slide one is shown in search results. If search-to-install is low but listing-to-install is fine, slide one is the problem. It must show the outcome, not a settings screen.

### 4. Audit the First Three Slides
Most users never scroll past the third screenshot. If those three don't sell the core value, the rest don't matter.

## The Common Culprits

- **Slide one is a settings or login screen** — no one cares yet
- **Tiny text** unreadable on a phone thumbnail
- **No headline** — a raw screenshot with no context
- **Inconsistent design** across slides, killing trust
- **Wrong device or size** — looks broken in the listing

## How to Fix and Re-Test

Change one element at a time: slide one's headline, then its screenshot, then its background. Run a Custom Product Page or Store Listing Experiment for two weeks and keep the winner. A tool like Shotox lets you duplicate a set, swap one slide, and export a new variant in minutes.

## The Compounding Fix

Every conversion improvement you make applies to every future visitor. Diagnosing screenshots is the highest-ROI hour you can spend on an app that already has traffic.

Don't guess what's wrong. Measure, isolate the slide, fix it, and watch the install rate climb.`,
  },
  {
    slug: 'iphone-screenshot-dimensions-2026',
    title: 'iPhone Screenshot Dimensions for Every Model in 2026',
    excerpt: 'Every iPhone App Store screenshot size in one place — iPhone 6.7", 6.5", 5.5", and the newer 6.9" requirements — with exact pixel dimensions.',
    category: 'Guides',
    date: 'Sep 12, 2026',
    readTime: '10 minute read',
    color: '#2563EB',
    icon: Smartphone,
    keywords: 'iphone screenshot dimensions, app store screenshot sizes, iphone 6.7 screenshot size, ios screenshot resolution',
    content: `## Why Exact iPhone Sizes Matter

Apple reviews screenshot dimensions strictly. A screenshot off by a single pixel is rejected, and one that is "close enough" renders blurry in the listing. Getting the exact iPhone screenshot dimensions right is non-negotiable for a clean submission.

## The Required iPhone Screenshot Sizes

### iPhone 6.9" (iPhone 16 Pro Max and later)
- **Portrait:** 1320 × 2860 px
- **Landscape:** 2860 × 1320 px

### iPhone 6.7" (iPhone 14 Pro Max, 15 Pro Max)
- **Portrait:** 1290 × 2796 px
- **Landscape:** 2796 × 1290 px

### iPhone 6.5" (iPhone 11 Pro Max, 14 Plus)
- **Portrait:** 1242 × 2688 px
- **Landscape:** 2688 × 1242 px

### iPhone 5.5" (iPhone 8 Plus, 7 Plus)
- **Portrait:** 1242 × 2208 px
- **Landscape:** 2208 × 1242 px

## Which Sizes You Must Submit

- If your app runs on iPhone, submit the **6.7"** and **6.5"** sets at minimum
- The **5.5"** set is required if you support older devices
- The **6.9"** set is required for the newest flagship listings
- Apple scales between sizes, but each must be exact at its own resolution

## iPad Sizes (If Your App Runs on iPad)

- **iPad 13" (12.9", 3rd gen+):** 2064 × 2752 px (portrait)
- **iPad 11":** 1668 × 2388 px (portrait)

## How to Hit Every Size Without the Math

Exporting each size manually is error-prone. A generator that locks every export to the correct dimensions removes the risk entirely. Shotox ships every iPhone and iPad size as a one-tap preset — upload once, export every required resolution at exact spec.

## Tips for Crisp Exports

- Export at the native resolution, never upscale
- Use PNG for sharp text and UI
- Keep headlines large enough to read at thumbnail size
- Test the final images on a real iPhone before submitting

Bookmark this list and never submit at the wrong iPhone size again.`,
  },
  {
    slug: 'ab-test-screenshots-google-play',
    title: 'How to A/B Test App Screenshots on Google Play Store Listing Experiments',
    excerpt: 'Google Play\'s built-in Store Listing Experiments let you A/B test screenshots for free. Here is exactly how to set one up and read the results.',
    category: 'Google Play',
    date: 'Sep 11, 2026',
    readTime: '13 minute read',
    color: '#0D9488',
    icon: ListChecks,
    keywords: 'google play store listing experiments, ab test screenshots, play store aso testing, screenshot ab test',
    content: `## Why Play Store Experiments Are the Best Free ASO Tool

Google Play includes a native A/B testing tool — Store Listing Experiments — that lets you test different screenshots, icons, and feature graphics against real visitors for free. No third-party tool required. Most Android developers never use it, which is free conversion left on the table.

## What You Can Test

- **Screenshots** (the highest-impact test)
- **App icon**
- **Feature graphic**
- **Short description**
- **Hero video / promo video**

You can run up to **4 variants** (1 control + 3 challengers) simultaneously.

## Step-by-Step: Running a Screenshot Experiment

### Step 1 — Produce Your Variants
Build two or three alternate screenshot sets. Change **one thing** per variant — the first slide's headline, the background color, or the device angle. A tool like Shotox lets you duplicate a set, swap one slide, and export a full new variant in minutes.

### Step 2 — Create the Experiment
In the Play Console, go to **Grow → Store presence → Store listing experiments → Create experiment**. Choose "Store listing" and up to 4 variants.

### Step 3 — Upload Variants
Each variant gets its own screenshot set, icon, or feature graphic. Set the traffic split (default 50/50, or equal across all variants).

### Step 4 — Run It Long Enough
Let it run until you reach statistical significance — usually **7 to 14 days**. Stopping early gives unreliable results.

### Step 5 — Read the Results
Play Console shows install conversion per variant, the confidence level, and the expected lift. Apply the winner to your default listing.

## What to Test First

1. **First screenshot** — the most-seen, highest-impact slide
2. **Headline copy** on slide one
3. **Background color** (light vs dark)
4. **Feature graphic** for Play-specific listing views

## How to Produce Variants Fast

The bottleneck in A/B testing is creative production. If a new variant takes a day, you run few tests. If it takes minutes, you run many. Shotox turns variant production into a 10-minute task so you can experiment continuously.

Store Listing Experiments are the most underused free tool in Android ASO. Start your first test this week and let data — not opinion — pick your screenshots.`,
  },
  {
    slug: 'app-screenshots-for-subscription-apps',
    title: 'App Screenshots for Subscription Apps: Selling the Paywall Value',
    excerpt: 'Subscription apps live and die on perceived value. Here is how to design screenshots that justify a recurring price before the user ever sees the paywall.',
    category: 'Templates',
    date: 'Sep 11, 2026',
    readTime: '11 minute read',
    color: '#9333EA',
    icon: CreditCard,
    keywords: 'subscription app screenshots, paywall app design, freemium app mockup, app monetization screenshots',
    content: `## Why Subscription Apps Need a Value-First Screenshot Set

Subscription apps ask users to pay repeatedly. Before a user ever hits the paywall, your screenshots must build the case that the app is worth a recurring price. Screenshots that show features fail; screenshots that show outcomes and accumulated value succeed.

## The Subscription Screenshot Set

### Slide 1 — The Core Outcome
The single most valuable result the app delivers. Not a feature — the payoff.

### Slide 2 — The Depth
A feature that shows the app is genuinely powerful, not a thin wrapper. This justifies the price.

### Slide 3 — The Habit or Progress
Streaks, history, or accumulated content. Show that the app gets better the longer you use it — the recurring price pays off over time.

### Slide 4 — Premium Exclusivity
What unlocked-only looks like — a clear visual of the "before vs after" of subscribing. Make the upgrade visible.

### Slide 5 — The Free Entry
Show that there is a free way in. Users are more willing to install a paid app when they can try it first.

## Design Notes

- **Premium palettes** — deep indigo, near-black, or rich jewel tones signal value
- **Show accumulated content** (long streaks, full libraries) to imply longevity
- **Subtle "Pro" badges** on premium features, not aggressive lock icons
- **3D frames** with a refined, restrained tilt — premium reads as calm

## What to Avoid

- A slide that is just a price list (sells the cost, not the value)
- Locking every feature visually (looks like a paywall ad, not an app)
- No sign of a free tier (lowers install willingness)
- Flashy graphics that undercut a premium feel

## The Paywall Psychology

Users who feel the app is valuable before the paywall convert far better than users surprised by it. Your screenshots do the pre-sell; the paywall just closes. Shotox ships premium-style templates with 3D frames and rich palettes built for subscription apps.

Subscription users install the value. Build the case across five slides and the paywall feels fair, not friction.`,
  },
  {
    slug: 'localize-app-screenshots-japan',
    title: 'How to Localize App Screenshots for the Japanese App Store',
    excerpt: 'Japan is one of the highest-revenue app markets in the world. Here is how to localize your screenshots for Japanese users — beyond just translating the words.',
    category: 'Growth',
    date: 'Sep 11, 2026',
    readTime: '12 minute read',
    color: '#EC4899',
    icon: Languages,
    keywords: 'localize app screenshots japan, japanese app store screenshots, app localization japan, aso japan',
    content: `## Why Japan Is Worth the Localization Effort

Japan consistently ranks among the top three App Store revenue markets globally. Japanese users also install far less from English listings — they expect a native experience. Localizing your screenshots for Japan is one of the highest-ROI expansion moves available, and most Western apps never do it.

## It Is More Than Translation

Direct translation fails in Japan. Headlines that work in English often feel blunt or awkward in Japanese, where tone, brevity, and politeness matter. A native speaker — not a machine — should write your Japanese headlines. Keep them short; Japanese headlines can be longer in characters, so design for room.

## What to Localize Beyond Words

### Headlines
Rewrite them for Japanese phrasing, not word-for-word translation. Lead with the benefit, politely.

### Dates, Currencies, and Units
Use ¥ for prices, Japanese date formats, and metric units. A "$" or "lbs" in a Japanese screenshot breaks trust instantly.

### Names and Imagery
Where possible, use Japanese names, locales, and imagery. A fitness app showing New York in a Japanese listing feels foreign; showing Tokyo feels native.

### Color Nuances
White and red carry strong cultural resonance in Japan. Soft pastels and clean minimalism perform well; aggressive neon can feel cheap.

## The Localization Workflow

1. **Identify Japan as a target** via your install data
2. **Re-research keywords** for the Japanese market — do not translate keywords
3. **Write Japanese headlines** with a native copywriter
4. **Duplicate your template set** and swap only the text per locale
5. **Adapt dates, currency, and imagery**
6. **Submit localized screenshots** in App Store Connect for the ja locale
7. **Measure** Japanese installs and iterate

## How to Ship It Fast

Duplicating a set and re-texting per language is slow by hand. Shotox lets you duplicate a template and swap the headline text per locale in minutes — the design stays identical, only the words change. This makes a full Japanese set a 15-minute job.

## What to Avoid

- Machine translation that reads wrong to native eyes
- Leaving English headlines in a Japanese set
- Forgetting ¥, metric units, and date formats
- Ignoring Japanese keyword research (translated keywords miss real search volume)

Japan rewards apps that show up natively. Localize your screenshots properly and a top-three revenue market opens up to you.`,
  },
  {
    slug: 'app-screenshots-for-marketplace-apps',
    title: 'App Screenshots for Two-Sided Marketplace Apps',
    excerpt: 'Marketplace apps have two audiences — buyers and sellers. Here is how to design screenshots that speak to both without confusing either.',
    category: 'Templates',
    date: 'Sep 10, 2026',
    readTime: '11 minute read',
    color: '#F97316',
    icon: Store,
    keywords: 'marketplace app screenshots, two-sided marketplace app, buyer seller app mockup, marketplace app design',
    content: `## The Marketplace Screenshot Problem

Two-sided marketplaces (ride-sharing, home rentals, freelance services, resale) have a unique challenge: the same listing must convince both buyers and sellers to install. Screenshots that only show one side lose the other. Your set must serve both audiences in five slides.

## Lead With the Larger Side

Most marketplaces have a dominant side — usually buyers. Lead with the buyer experience (search, book, receive), then dedicate one or two slides to the seller experience (list, earn, manage). The buyer is the volume; the seller is the supply. You need both, but the buyer hook comes first.

## The Marketplace Screenshot Set

### Slide 1 — The Core Promise (Buyer)
The outcome: a ride, a stay, a service, booked in seconds. Desire first.

### Slide 2 — Search and Discovery (Buyer)
Filters, map, and browsing. Show depth of supply.

### Slide 3 — The Transaction (Buyer)
Booking, paying, or messaging in a few taps. Show it is safe and easy.

### Slide 4 — The Seller Side
Listing an item, service, or space — and seeing earnings. This recruits supply.

### Slide 5 — Trust and Safety
Reviews, verification, or guarantees. Trust is the conversion blocker for marketplaces.

## Design Notes

- **Warm, energetic palettes** — orange, coral, teal for a friendly marketplace feel
- **Real listings and people**, never grey placeholders
- **Clear price and rating** in every buyer shot
- **Show earnings clearly** in the seller slide — money recruits supply
- **3D frames** with a modern, friendly tilt

## What to Avoid

- Showing only the buyer side (sellers never install)
- Showing only the seller side (buyers never install)
- No trust or safety slide (marketplace users are cautious)
- Empty grids that imply low supply

## How to Ship It Fast

Shotox ships marketplace-category templates with warm, trust-forward layouts and 3D frames built for two-sided apps. Drop in your real screens and export a set that serves both audiences.

Marketplace users install the match — buyers want supply, sellers want demand. Show both in five slides and your listing serves the whole platform.`,
  },
  {
    slug: 'app-store-scrolling-psychology',
    title: 'The Psychology of App Store Scrolling: How Users Actually Read Screenshots',
    excerpt: 'Users don\'t read your screenshots — they scan them in seconds. Here is what eye-tracking and behavioral research tells us about how to design for the scroll.',
    category: 'ASO',
    date: 'Sep 10, 2026',
    readTime: '13 minute read',
    color: '#7C3AED',
    icon: Eye,
    keywords: 'app store scrolling psychology, how users read app screenshots, app store user behavior, screenshot eye tracking',
    content: `## Users Don't Read — They Scan

Behavioral research on app store behavior is consistent: users spend a few seconds on a listing, and within those seconds their eyes dart across the first two or three screenshots before deciding. Understanding how the eye moves through a screenshot set is the difference between a listing that converts and one that gets skipped.

## How the Eye Moves

### The First 0.5 Seconds: Slide One
The eye lands on the largest, highest-contrast element. If that is a bold headline stating an outcome, you hold attention. If it is a cluttered dashboard, the user scrolls past.

### The Next 1.5 Seconds: The First Three Slides
The eye scans top-to-bottom, left-to-right, in an F-pattern. Headlines get read; body text gets skipped. Users look for a reason to keep scrolling — each slide must give one.

### The Scroll Decision
After roughly three slides, the user either scrolls on or leaves. Slides four and five only matter if the first three earned the scroll.

## Designing for the Scan

### One Focal Point Per Slide
The eye can only focus on one thing at a time. A headline + a device + a detail creates competition. Pick a hero per slide.

### Headlines Beat Screenshots for the First Glance
Research shows users read the headline before they parse the screenshot. A strong headline frames the image; a missing headline leaves the image unexplained.

### High Contrast Wins Attention
The eye is drawn to contrast. White text on a dark background, or a vivid accent on a neutral base, pulls the gaze. Low-contrast pastels get skipped.

### Repetition Builds Recognition
The same layout and headline style on every slide tells the user "this is a series, keep scrolling." Inconsistent slides feel like random images and break the scroll.

## The Reverse: Why Users Leave

- **Slide one is a settings screen** — no value, instant bounce
- **Text is too small** — the eye skips what it can't read at a glance
- **No headline** — the image has no meaning without context
- **Clutter** — multiple competing elements, no focal point

## How to Build for the Scroll

Templates built on these principles bake them in: one focal point, consistent layout, high-contrast headlines, and a clear series structure. Shotox's templates are designed around the scroll — bold headlines, 3D focal devices, and consistent layouts that read as a series.

## The Takeaway

Design for the scan, not the read. The user who scans three slides in three seconds and installs is your real audience. Win those three seconds and the rest of your listing finally gets a chance.`,
  },
  {
    slug: 'make-app-screenshots-before-app-built',
    title: 'How to Make App Screenshots Before Your App Is Built',
    excerpt: 'You don\'t need a finished app to ship store screenshots. Here is how to create high-converting screenshots from mockups and Figma frames for pre-launch marketing.',
    category: 'Workflow',
    date: 'Sep 10, 2026',
    readTime: '10 minute read',
    color: '#2563EB',
    icon: PenTool,
    keywords: 'app screenshots before app built, pre-launch app screenshots, mockup app screenshots, figma app screenshots',
    content: `## Why You Need Screenshots Before the App Exists

App Store Connect and the Play Console let you create a listing before your app is finished. That means you can build screenshots early — for a landing page, a Product Hunt launch, pre-registration, or early press — all of which need visuals before there's a binary to screenshot. Waiting until the app is done delays your entire marketing runway.

## Where the Screens Come From

### Figma or Design Mockups
If you have high-fidelity designs in Figma, export the key screens as images. These stand in for real screenshots perfectly — they are the intended UI.

### A Clickable Prototype
Tools like Figma, ProtoPie, or a TestFlight build of a prototype let you capture real, interactive screens before the app ships.

### A Partial Build
If you have a working slice (onboarding plus the core screen), screenshot that and fill the rest with designs. Real screenshots where you have them, designs where you don't.

## The Pre-Launch Screenshot Set

### Slide 1 — The Outcome
Designed or real, show the payoff the finished app will deliver. This sells the promise.

### Slide 2 — The Core Screen
Your best-designed screen. Even a mockup reads as a real app if the design is clean.

### Slide 3 — A Feature Slide
A design of a secondary screen that shows depth.

### Slide 4 — Trust or Social Proof
A testimonial, a waitlist count, or a "coming soon" badge. For pre-launch, proof of demand matters.

### Slide 5 — The Call to Action
"Join the waitlist" or "Pre-order on the App Store." For pre-launch, the CTA is not "download" yet.

## Design Notes

- **Treat mockups as final** — apply the same 3D frames and polish as a real screenshot
- **Keep designs consistent** so the set doesn't look half-real, half-mockup
- **Use real content**, never placeholder text — even in a mockup
- **Label honestly** where needed ("coming soon") so reviewers and users aren't misled

## How to Ship It Fast

A screenshot generator doesn't care whether your image is a real capture or a Figma export — both get wrapped in the same 3D frame and template. Shotox lets you upload design exports just like real screenshots, so your pre-launch listing looks as polished as your post-launch one.

## What to Avoid

- Waiting until the app is fully built to start marketing
- Sloppy mockups that look unfinished (they read as an unfinished app)
- Misleading screenshots that don't match the eventual real app

You don't need a shipped app to ship great screenshots. Build them from designs, start your marketing early, and your launch already has an audience.`,
  },
  {
    slug: 'app-screenshots-for-b2b-enterprise-apps',
    title: 'App Screenshots for B2B and Enterprise Mobile Apps',
    excerpt: 'B2B and enterprise apps sell to decision-makers who judge professionalism fast. Here is how to design screenshots that build enterprise credibility and convert.',
    category: 'Templates',
    date: 'Sep 9, 2026',
    readTime: '11 minute read',
    color: '#1D4ED8',
    icon: Briefcase,
    keywords: 'b2b app screenshots, enterprise app mockup, business app design, saas mobile app screenshots',
    content: `## Why B2B Apps Need a Credibility-First Screenshot Set

Business and enterprise users decide fast — and they decide on professionalism. A consumer-app aesthetic (playful colors, casual copy) signals "not for work." Enterprise screenshots must project competence, security, and clarity from the first slide. Trust the look, trust the app.

## The B2B Screenshot Set

### Slide 1 — The Business Outcome
The result a business cares about — saved hours, closed deals, managed teams. Lead with the metric, not the interface.

### Slide 2 — The Core Workflow
The main task done in a few steps. Show that the app respects a busy professional's time.

### Slide 3 — Insights and Reporting
Dashboards, charts, or exportable reports. Decision-makers want data.

### Slide 4 — Security and Compliance
SSO, encryption, audit logs, or compliance badges (SOC 2, GDPR). This is the make-or-break slide for enterprise.

### Slide 5 — Team and Admin Controls
Roles, permissions, or team management. Enterprise buyers need to manage their org.

## Design Notes

- **Professional palettes** — navy, slate, deep indigo, with a single restrained accent
- **Structured, grid-based layouts** with strong hierarchy
- **Real, anonymized data** — never fake numbers that look suspicious
- **Clean 3D frames** with minimal decoration — restraint reads as enterprise-grade

## What to Avoid

- Playful, consumer-style colors that undercut a business tone
- Cluttered dashboards with no clear focal point
- No security or compliance slide (enterprise buyers look for it first)
- Casual copy in a serious category

## The Enterprise Buying Psychology

An enterprise buyer scrolls your screenshots looking for one thing: evidence this app is safe to deploy across their org. Security, admin controls, and clean professionalism do more converting than any feature. Shotox ships enterprise-style templates with structured layouts, trust palettes, and clean 3D frames built for B2B apps.

## How to Ship It Fast

Drop in your real screens, pick a professional template, set a navy or slate palette, and export. A full enterprise-grade set is a 20-minute job — the polish comes from the template, not from design hours.

Enterprise users install the credibility. Build it into every slide and cautious buyers convert.`,
  },
];