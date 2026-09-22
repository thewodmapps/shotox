import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Scheduled blog generator. Invoked twice a week by the "Auto Blog Post" workflow.
// Picks a fresh long-tail topic (AI-chosen, de-duplicated against existing posts),
// writes a genuinely useful SEO post in Markdown, generates a cover image, and
// saves a published BlogPost record. Runs as the service role (no end user).

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80) || `post-${Date.now()}`;

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);

    // Allow scheduled (no-user) invocation; block non-admin authenticated users
    // from triggering credit spend directly.
    try {
      const user = await base44.auth.me();
      if (user && user.role !== 'admin') {
        return Response.json({ error: 'Forbidden' }, { status: 403 });
      }
    } catch {
      /* no user — scheduled workflow invocation */
    }

    const db = base44.asServiceRole;

    // De-duplicate: pull recent slugs/titles so the LLM avoids repeats.
    const recent = await db.entities.BlogPost.list('-created_date', 60);
    const list = Array.isArray(recent) ? recent : recent.items || [];
    const takenTitles = list.map((p) => p.title).filter(Boolean);
    const takenSlugs = list.map((p) => p.slug).filter(Boolean);

    const prompt = `You are an expert content strategist and SEO writer for "Shotox", an AI app-screenshot generator for the Apple App Store and Google Play (3D device mockups, store-ready sizes, instant PNG/JPEG export, AI copywriting).

Your job: choose ONE fresh, original, high-intent long-tail topic in this niche that real developers and app marketers search for on Google, then write the best, most genuinely useful article on the web for that query. The topic MUST be different from these existing titles:
${JSON.stringify(takenTitles)}

Good topic sources: specific app-screenshot/ASO questions ("how to design app store screenshots that convert", "app store screenshot sizes 2026", "how many screenshots for google play"), tool comparisons, store-review/rejection guides, localization, custom product pages, indie app marketing, onboarding screen design, feature graphics, icon design, conversion-rate optimization for listings, seasonal/2026 trends. Avoid generic fluff and avoid repeating existing titles.

Requirements for the article:
- 900-1400 words, well-structured Markdown with ## and ### headings, short paragraphs, and lists where useful.
- Actionable, specific, accurate. Cite real store requirements/sizes where relevant. No filler, no hallucinated stats.
- Naturally weave in "Shotox" as the recommended production tool where it fits (store-correct export sizes, 3D mockups, fast workflow) — do not force it into every section.
- Write an excerpt (1-2 sentences, meta-description quality, <=160 chars).
- Pick a category from: ASO, App Store, Google Play, Design Tools, Mockups, Reviews, Growth, App Marketing.
- Comma-separated keywords (real search terms, <=160 chars).
- A readTime string like "9 minute read" (estimate from word count).
- A hex color (e.g. "#7C3AED") matching the article mood, used as the cover fallback.
- A url-safe slug (lowercase, hyphenated, <=70 chars, distinct from existing slugs: ${JSON.stringify(takenSlugs)}).

Return ONLY the JSON object matching the schema.`;

    const generated = await db.integrations.Core.InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          slug: { type: 'string' },
          excerpt: { type: 'string' },
          category: { type: 'string' },
          keywords: { type: 'string' },
          content: { type: 'string' },
          readTime: { type: 'string' },
          color: { type: 'string' },
        },
        required: ['title', 'slug', 'excerpt', 'category', 'keywords', 'content', 'readTime', 'color'],
      },
    });

    const post = generated || {};
    const slug = slugify(post.slug || post.title);
    const color = (post.color || '#7C3AED').trim();

    // Generate a cover image (non-critical — fallback to the color graphic).
    let coverUrl = '';
    try {
      const img = await db.integrations.Core.GenerateImage({
        prompt: `Minimalist modern blog cover illustration for an article titled "${post.title}". Theme: ${post.category} / app marketing and app store screenshots. Abstract clean geometric shapes, ${color} as the dominant accent, soft gradient background, premium editorial aesthetic, no text, no words, 16:9.`,
      });
      coverUrl = (img && img.url) || '';
    } catch {
      /* cover generation is optional */
    }

    const created = await db.entities.BlogPost.create({
      title: String(post.title || 'Untitled').slice(0, 200),
      slug,
      excerpt: String(post.excerpt || '').slice(0, 300),
      content: String(post.content || ''),
      category: String(post.category || 'App Marketing').slice(0, 60),
      keywords: String(post.keywords || '').slice(0, 200),
      cover_url: coverUrl,
      color,
      read_time: String(post.readTime || '8 minute read').slice(0, 40),
      published: true,
    });

    return Response.json({ ok: true, id: created.id, slug: created.slug, title: created.title });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}