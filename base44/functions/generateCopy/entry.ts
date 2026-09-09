import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const description = (body?.description || '').toString().trim().slice(0, 500);
    const count = Math.min(Math.max(parseInt(body?.count) || 3, 1), 8);
    if (!description) return Response.json({ error: 'Description is required' }, { status: 400 });

    const schema = {
      type: 'object',
      properties: {
        slides: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              heading: { type: 'string' },
              subheading: { type: 'string' }
            },
            required: ['heading', 'subheading']
          }
        }
      },
      required: ['slides']
    };

    const prompt = `You write App Store / Google Play screenshot marketing copy for a mobile app.
App description: "${description}"
Write ${count} short, punchy, conversion-focused screenshot slides. Each slide has:
- "heading": a bold hook, max 5 words, title case, no punctuation at the end.
- "subheading": a concrete benefit, max 12 words, no emoji, no quotes.
Vary the angle across slides (hook -> key benefit -> social proof -> ease -> outcome). No numbering. Return JSON matching the schema.`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: schema
    });

    const slides = Array.isArray(result?.slides)
      ? result.slides.map((s) => ({
          heading: String(s.heading || '').slice(0, 80),
          subheading: String(s.subheading || '').slice(0, 140)
        })).filter((s) => s.heading)
      : [];

    return Response.json({ slides });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}