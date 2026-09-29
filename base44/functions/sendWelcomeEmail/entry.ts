import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

// Called by the "Welcome Email On Signup" workflow. Sends a one-time welcome
// email to a newly registered app user. No user auth — it runs as the service
// role, so we verify the email belongs to a real app user before sending.
const LOGO_URL = 'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/b3e63b968_shotox.png';
const YEAR = new Date().getFullYear();

function emailShell(opts) {
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Inter,Segoe UI,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 16px 48px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid rgba(0,0,0,0.06);box-shadow:0 12px 40px -16px rgba(0,0,0,0.18);">
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
        ${opts.body}
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
}

export default async function(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    const full_name = String(body.full_name || '').trim();
    const user_id = String(body.user_id || '').trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: 'Invalid email' }, { status: 400 });
    }

    const base44 = createClientFromRequest(req);

    // Only email genuine app users — blocks public abuse of the endpoint.
    const users = await base44.asServiceRole.entities.User.filter({ email });
    if (!users || users.length === 0) {
      return Response.json({ error: 'User not found' }, { status: 404 });
    }
    const user = users[0];
    const logKey = String(user.id || user_id || '');

    // Idempotent: send the welcome exactly once per user.
    if (logKey) {
      const prior = await base44.asServiceRole.entities.EmailLog.filter({
        user_id: logKey,
        campaign: 'welcome'
      });
      if (prior && prior.length > 0) {
        return Response.json({ ok: true, skipped: 'already_sent', user_id: logKey });
      }
    }

    const first = full_name ? full_name.split(' ')[0] : 'there';

    const subject = `Welcome to Shotox${full_name ? `, ${first}` : ''} — let's make your first screenshots`;
    const html = emailShell({
      body: `<tr><td style="padding:4px 40px 0;">
          <h1 style="margin:0 0 12px;font-size:26px;font-weight:800;color:#0B0B12;letter-spacing:-0.02em;line-height:1.2;">You're in. Let's create store-ready screenshots.</h1>
          <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:rgba(11,11,18,0.7);">Hi ${first}, thanks for signing up. Shotox turns your raw app screenshots into beautiful, high-converting App Store &amp; Google Play artwork — 3D device frames, AI headlines, and instant export. All free, no watermarks, no limits.</p>
        </td></tr>
        <tr><td style="padding:8px 40px 24px;">
          <a href="https://shotox.in/projects" style="display:inline-block;background:#0B0B12;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 28px;border-radius:12px;">Open the editor →</a>
        </td></tr>
        <tr><td style="padding:0 40px 16px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:700;color:#0B0B12;">Quick start</p>
          <p style="margin:0;font-size:14px;line-height:1.7;color:rgba(11,11,18,0.7);">1. Pick a template or device frame<br>2. Upload your screenshot<br>3. Customize colors, headline &amp; layout<br>4. Export PNG/JPEG, ready to upload</p>
        </td></tr>
        <tr><td style="padding:8px 40px 32px;">
          <p style="margin:0;font-size:13px;line-height:1.6;color:rgba(11,11,18,0.5);">Browse tips on our <a href="https://shotox.in/blog" style="color:#7c3aed;text-decoration:underline;">ASO &amp; design blog</a>, or just reply to this email if you get stuck — we read everything.</p>
        </td></tr>`
    });

    const text = `Hi ${first},

Thanks for signing up for Shotox. Turn your raw app screenshots into beautiful, high-converting App Store & Google Play artwork — 3D device frames, AI headlines, instant export. All free, no watermarks.

Open the editor: https://shotox.in/projects

Quick start:
1. Pick a template or device frame
2. Upload your screenshot
3. Customize colors, headline & layout
4. Export PNG/JPEG, ready to upload

Tips on our blog: https://shotox.in/blog

© ${YEAR} Shotox · shotox.in`;

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: email,
      subject,
      html,
      text
    });

    if (logKey) {
      await base44.asServiceRole.entities.EmailLog.create({
        user_id: logKey,
        email,
        campaign: 'welcome'
      });
    }

    return Response.json({ ok: true, sent_to: email, user_id: logKey || user_id });
  } catch (error) {
    return Response.json({ error: error.message || String(error) }, { status: 500 });
  }
}