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
    // Shared previews keep the watermark when the original owner is on the free
    // plan — matching the watermark applied to their own exports.
    let watermark = true;
    try {
      if (project.created_by_id) {
        const owner = await base44.asServiceRole.entities.User.get(project.created_by_id);
        watermark = !owner?.plan || owner.plan === 'free';
      }
    } catch {
      watermark = true;
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