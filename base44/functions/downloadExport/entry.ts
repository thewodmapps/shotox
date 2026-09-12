// Same-origin download proxy for the native app WebView.
//
// In the Base44 Android/iOS WebView, a blob: URL <a download> never reaches
// the download pipeline and a cross-origin https link opens the external
// browser — so an exported screenshot won't silently save on the phone. This
// endpoint is served from the app's own origin, fetches the already-uploaded
// public file, and returns it with Content-Disposition: attachment under a
// "Shotox/" path so the WebView's download handler saves it (ideally into a
// Shotox subfolder where the wrapper supports path hints, otherwise into
// Downloads). The page does not navigate away for an attachment response.
export default async function (req) {
  try {
    const url = new URL(req.url);
    let fileUrl = url.searchParams.get('url');
    let name = url.searchParams.get('name');
    if (!fileUrl && (req.method === 'POST' || req.method === 'PUT')) {
      try {
        const body = await req.json();
        fileUrl = body.url;
        name = body.name;
      } catch {}
    }
    if (!fileUrl) return new Response('missing url', { status: 400 });

    let parsed;
    try {
      parsed = new URL(fileUrl);
    } catch {
      return new Response('bad url', { status: 400 });
    }
    // Only re-stream Base44 storage hosts so the endpoint can't be used as an
    // open proxy. These files are already world-readable (UploadPublicFile).
    const host = parsed.hostname.toLowerCase();
    if (!host.endsWith('base44.com') && !host.endsWith('wixstatic.com')) {
      return new Response('forbidden host', { status: 403 });
    }

    const res = await fetch(fileUrl);
    if (!res.ok) return new Response('fetch failed: ' + res.status, { status: 502 });
    const buf = await res.arrayBuffer();
    const safeName = (name || 'download').replace(/[^a-zA-Z0-9._-]/g, '_');
    const headers = new Headers();
    headers.set('Content-Type', res.headers.get('Content-Type') || 'application/octet-stream');
    headers.set('Content-Disposition', `attachment; filename="Shotox/${safeName}"`);
    headers.set('Content-Length', String(buf.byteLength));
    return new Response(buf, { status: 200, headers });
  } catch (error) {
    return new Response(error.message || 'error', { status: 500 });
  }
}