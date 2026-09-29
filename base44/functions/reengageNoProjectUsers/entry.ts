import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Scheduled daily. Finds users who signed up 2–4 days ago, have NOT created any
// project, and have not already received this campaign, then sends one
// re-engagement email each. Runs as the service role (no user auth).
const CAMPAIGN = 'no_project_d2';
const DAY_MS = 24 * 60 * 60 * 1000;
const LOGO_URL = 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/b3e63b968_shotox.png';
const YEAR = new Date().getFullYear();

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const now = new Date();
    const start = new Date(now.getTime() - 4 * DAY_MS);
    const end = new Date(now.getTime() - 2 * DAY_MS);

    // Users whose signup falls in the 2–4 day-ago window (bounded, each user
    // lands here once; missed days are caught by the dedup log).
    const users = await base44.asServiceRole.entities.User.filter({
      created_date: { $gte: start.toISOString(), $lt: end.toISOString() }
    });

    let emailed = 0;
    let skippedHasProject = 0;
    let skippedAlreadySent = 0;
    let errors = 0;

    for (const user of users) {
      try {
        const email = String(user.email || '').trim().toLowerCase();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) continue;

        // Already nudged in this campaign?
        const prior = await base44.asServiceRole.entities.EmailLog.filter({
          user_id: String(user.id),
          campaign: CAMPAIGN
        });
        if (prior && prior.length > 0) { skippedAlreadySent++; continue; }

        // Has at least one project?
        const projects = await base44.asServiceRole.entities.Project.filter({
          created_by_id: String(user.id)
        });
        if (projects && projects.length > 0) { skippedHasProject++; continue; }

        const first = (user.full_name || '').toString().trim().split(' ')[0] || 'there';

        const subject = `${first}, your first app screenshots are 2 minutes away`;
        const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Segoe UI,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px 48px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:28px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);box-shadow:0 12px 40px -16px rgba(0,0,0,0.18);">
        <tr><td style="padding:28px 40px 18px;">
          <table cellpadding="0" cellspacing="0"><tr>
            <td style="vertical-align:middle;"><img src="${LOGO_URL}" width="36" height="36" alt="Shotox" style="display:block;border-radius:10px;"></td>
            <td style="vertical-align:middle;padding-left:10px;font-size:20px;font-weight:800;color:#0B0B12;letter-spacing:-0.02em;">Shotox</td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:0 40px 20px;">
          <table cellpadding="0" cellspacing="0" style="width:48px;border-collapse:separate;"><tr>
            <td style="background:#c4b5fd;height:3px;width:16px;"></td>
            <td style="background:#f472b6;height:3px;width:16px;"></td>
            <td style="background:#fdba74;height:3px;width:16px;"></td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:4px 40px 0;">
          <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#0B0B12;letter-spacing:-0.02em;line-height:1.2;">You signed up but haven't made a screenshot yet</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:rgba(11,11,18,0.7);">Hi ${first}, your Shotox account is ready and waiting. Turn a plain screenshot into store-ready artwork in under two minutes — 3D device frames, AI headlines, one-click export. Free, no watermarks.</p>
        </td></tr>
        <tr><td style="padding:8px 40px 24px;">
          <a href="https://shotox.in/projects" style="display:inline-block;background:#0B0B12;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:12px;">Start your first design →</a>
        </td></tr>
        <tr><td style="padding:0 40px 16px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0B0B12;">In a rush? Three taps:</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(11,11,18,0.7);">1. Pick a template<br>2. Drop in your screenshot<br>3. Export PNG/JPEG</p>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(11,11,18,0.5);">Need ideas? Browse <a href="https://shotox.in/blog" style="color:#7c3aed;text-decoration:underline;">ASO &amp; screenshot design tips</a> on our blog.</p>
        </td></tr>
      </table>
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;margin-top:16px;">
        <tr><td style="padding:0 8px;">
          <p style="margin:0 0 8px;font-size:12px;color:rgba(11,11,18,0.5);">You received this email because you signed up for Shotox.</p>
          <p style="margin:0;font-size:12px;color:rgba(11,11,18,0.4);">© ${YEAR} Shotox · India · Worldwide · <a href="https://shotox.in" style="color:rgba(11,11,18,0.7);text-decoration:underline;">shotox.in</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

        const text = `Hi ${first},

You signed up for Shotox but haven't made a screenshot yet. Your account is ready — turn a plain screenshot into store-ready artwork in under two minutes. 3D device frames, AI headlines, one-click export. Free, no watermarks.

Start your first design: https://shotox.in/projects

Three taps: pick a template, drop in your screenshot, export PNG/JPEG.

Tips on our blog: https://shotox.in/blog

© ${new Date().getFullYear()} Shotox`;

        await base44.asServiceRole.integrations.Core.SendEmail({
          to: email,
          subject,
          html,
          text
        });

        await base44.asServiceRole.entities.EmailLog.create({
          user_id: String(user.id),
          email,
          campaign: CAMPAIGN
        });
        emailed++;
      } catch (err) {
        errors++;
      }
    }

    return Response.json({
      ok: true,
      window: { start: start.toISOString(), end: end.toISOString() },
      considered: users.length,
      emailed,
      skipped_has_project: skippedHasProject,
      skipped_already_sent: skippedAlreadySent,
      errors
    });
  } catch (error) {
    return Response.json({ error: error.message || String(error) }, { status: 500 });
  }
}