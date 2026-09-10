import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

export default async function deleteAccount(req: Request): Promise<Response> {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Permanently remove the user's design data: all projects they own.
    // RLS scopes Project operations to created_by_id === user.id for the calling user.
    let deletedProjects = 0;
    let hasMore = true;
    let guard = 0;
    while (hasMore && guard < 20) {
      guard += 1;
      const res = await base44.entities.Project.deleteMany({ created_by_id: user.id });
      if (typeof res === 'number') {
        deletedProjects += res;
        hasMore = false;
      } else {
        deletedProjects += Number(res?.deletedCount ?? 0);
        hasMore = !!res?.has_more;
      }
    }

    return Response.json({ ok: true, deletedProjects });
  } catch (error) {
    console.error('deleteAccount error:', error?.message || error);
    return Response.json({ error: error?.message || 'Failed to delete account data' }, { status: 500 });
  }
}