import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json().catch(() => ({}));
    const id = body?.id;
    if (!id || typeof id !== 'string') {
      return Response.json({ error: 'Missing project id' }, { status: 400 });
    }
    const project = await base44.asServiceRole.entities.Project.get(id);
    if (!project) {
      return Response.json({ error: 'Project not found' }, { status: 404 });
    }
    // Watermark reflects the project owner's tier: free users keep the Shotox
    // watermark on shared previews; Pro users do not. Defaults to watermarked
    // if the owner's plan can't be resolved (e.g. deleted account).
    let watermark = true;
    try {
      if (project.created_by_id) {
        const owner = await base44.asServiceRole.entities.User.get(project.created_by_id);
        const plan = owner?.plan;
        watermark = !(plan && plan !== 'free');
      }
    } catch {
      // keep watermark true
    }
    // Public-safe projection: only the data needed to render a read-only preview.
    return Response.json({
      name: project.name,
      platform: project.platform,
      device: project.device,
      custom_w: project.custom_w,
      custom_h: project.custom_h,
      slides: project.slides || [],
      watermark,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}