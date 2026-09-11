import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';

// Eight distinct banner "designs" — each a different palette + layout + mock,
// so the 8 AI options look genuinely varied, not the same content recolored.
const PALETTES = [
  { bg: { type: 'gradient', color: '#7C3AED', from: '#7C3AED', to: '#EC4899', angle: 135 }, style: 'swipe', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', layout: 'phone-bottom', mock: 'hero', font: 'Sora', dev: 'titanium' },
  { bg: { type: 'gradient', color: '#6366F1', from: '#6366F1', to: '#0EA5E9', angle: 135 }, style: 'spotlight', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', layout: 'phone-bottom', mock: 'list', font: 'Inter', dev: 'black' },
  { bg: { type: 'solid', color: '#0B0B12', from: '#0B0B12', to: '#0B0B12', angle: 135 }, style: 'neon', hc: '#A5B4FC', sc: 'rgba(255,255,255,0.72)', layout: 'phone-bottom', mock: 'stats', font: 'Space Grotesk', dev: 'black' },
  { bg: { type: 'gradient', color: '#F97316', from: '#F97316', to: '#DB2777', angle: 135 }, style: 'brush', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', layout: 'phone-bottom', mock: 'detail', font: 'Sora', dev: 'titanium' },
  { bg: { type: 'gradient', color: '#10B981', from: '#10B981', to: '#3B82F6', angle: 135 }, style: 'orbs', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.85)', layout: 'phone-bottom', mock: 'grid', font: 'Inter', dev: 'titanium' },
  { bg: { type: 'solid', color: '#FFFFFF', from: '#FFFFFF', to: '#FFFFFF', angle: 135 }, style: 'minimal', hc: '#0B0B12', sc: 'rgba(11,11,18,0.65)', layout: 'phone-bottom', mock: 'profile', font: 'Sora', dev: 'white' },
  { bg: { type: 'gradient', color: '#1E1B4B', from: '#1E1B4B', to: '#7C3AED', angle: 135 }, style: 'split', hc: '#FFFFFF', sc: 'rgba(255,255,255,0.8)', layout: 'text-only', mock: 'hero', font: 'Sora', dev: 'titanium' },
  { bg: { type: 'gradient', color: '#FBBF24', from: '#FBBF24', to: '#F97316', angle: 135 }, style: 'spotlight', hc: '#1C1917', sc: 'rgba(28,25,23,0.72)', layout: 'phone-bottom', mock: 'success', font: 'Sora', dev: 'white' },
];

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const appDescription = (body.appDescription || '').toString().slice(0, 1200);
    const screenshotUrls = Array.isArray(body.screenshotUrls)
      ? body.screenshotUrls.filter((u: any) => typeof u === 'string').slice(0, 3)
      : [];

    if (!appDescription.trim() && !screenshotUrls.length) {
      return Response.json({ error: 'Describe your app or upload a screenshot' }, { status: 400 });
    }

    const visionLine = screenshotUrls.length
      ? 'I have attached screenshot(s) of the app — study them to understand what the app does and its visual style, then write copy that matches.'
      : '';
    const descLine = appDescription.trim() ? `App description: ${appDescription}` : 'Infer what the app does from the attached screenshots.';

    const prompt = `You write marketing copy for a Google Play "Feature Graphic" — a single 1024×500 banner that must communicate the app's value in one glance.
${visionLine}
${descLine}

Generate exactly 8 DISTINCT banner options, each using a DIFFERENT marketing angle so the user has real variety:
1. Benefit-led — the core outcome users get.
2. Social proof / trust — credibility, a number, or reassurance.
3. Feature-led — the single most compelling capability.
4. Aspirational — the dream end-state.
5. Curiosity hook — a bold statement or question that makes you want to know more.
6. Ease / simplicity — how little effort it takes.
7. Differentiation — why it's unlike the alternatives.
8. Call-to-action — a direct "get started" style close.

For each option:
- heading: a bold, ultra-short headline (2 to 5 words, max ~32 characters). No trailing punctuation, no emojis, no quotes.
- subheading: one supporting line (6 to 12 words) that expands the headline. No emojis, no quotes.

Plain text only. Return JSON: { "options": [ { "heading": string, "subheading": string } ] } with exactly 8 items, in the order above.`;

    const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      ...(screenshotUrls.length ? { file_urls: screenshotUrls } : {}),
      response_json_schema: {
        type: 'object',
        properties: {
          options: {
            type: 'array',
            items: {
              type: 'object',
              properties: { heading: { type: 'string' }, subheading: { type: 'string' } },
              required: ['heading', 'subheading'],
            },
          },
        },
        required: ['options'],
      },
    });

    const opts = Array.isArray(res?.options) ? res.options.slice(0, 8) : [];
    while (opts.length < 8) opts.push({ heading: 'Your headline here', subheading: 'A short line that explains the benefit' });

    const slides = opts.map((o: any, i: number) => {
      const p = PALETTES[i % PALETTES.length];
      return {
        heading: String(o.heading || '').slice(0, 80),
        subheading: String(o.subheading || '').slice(0, 160),
        headingColor: p.hc,
        subColor: p.sc,
        bg: p.bg,
        layout: p.layout,
        style: p.style,
        mock: p.mock,
        font: p.font,
        deviceStyle: p.dev,
        pose: null,
        align: 'center',
        headingScale: 1.25,
        subScale: 1.05,
      };
    });

    return Response.json({ slides });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}