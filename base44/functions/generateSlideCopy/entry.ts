import { createClientFromRequest } from 'npm:@base44/sdk@0.8.48';

export default async function(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const appDescription = (body.appDescription || '').toString().slice(0, 1200);
    const count = Math.min(10, Math.max(1, parseInt(body.count, 10) || 8));
    const category = (body.category || '').toString().slice(0, 40);

    if (!appDescription.trim()) {
      return Response.json({ error: 'App description is required' }, { status: 400 });
    }

    const catLine = category ? `The app category is "${category}".` : '';
    const prompt = `You write punchy App Store / Google Play screenshot marketing copy.
${catLine}
App description: ${appDescription}

Write exactly ${count} screenshot slides. Each slide has:
- heading: a bold, ultra-short benefit headline (2 to 4 words, max ~28 characters), no trailing punctuation, no emojis.
- subheading: one supporting line (6 to 12 words) that expands the benefit, no emojis, no quotes.

Order them to tell a story: a hook, then core benefits, then a social-proof or reassurance line, then a closing call-to-action style line. Plain text only.

Return JSON matching this schema: { "slides": [ { "heading": string, "subheading": string } ] }`;

    const res = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: 'object',
        properties: {
          slides: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                heading: { type: 'string' },
                subheading: { type: 'string' },
              },
              required: ['heading', 'subheading'],
            },
          },
        },
        required: ['slides'],
      },
    });

    const slides = Array.isArray(res?.slides)
      ? res.slides.map((s: any) => ({
          heading: String(s.heading || '').slice(0, 80),
          subheading: String(s.subheading || '').slice(0, 160),
        })).filter((s) => s.heading)
      : [];

    return Response.json({ slides });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}