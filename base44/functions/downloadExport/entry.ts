// Same-origin download proxy for the native app WebView.
//
// In the Base44 Android/iOS WebView, a blob: URL <a download> never reaches
// the download pipeline (the `download` attribute has no WebView hook) and a
// cross-origin https link opens the external browser — so an exported
// screenshot won't silently save on the phone. This endpoint is served from
// the app's own origin, fetches the already-uploaded public file, and returns
// it with Content-Disposition: attachment. The caller navigates to it with a
// PLAIN navigation (no `download` attribute) so the attachment header — the
// part WebView actually respects — triggers the DownloadManager, which saves
// to the Downloads folder (under a "Shotox/" subpath where the wrapper
// supports path hints). Every code path returns an attachment so a plain
// window.location navigation never replaces the editor page on error.
export default async function (req) {
  const attach = (body, contentType, filename, status = 200) => {
    const headers = new Headers();
    headers.set('Content-Type', contentType);
    headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    if (typeof body === 'string') body = new TextEncoder().encode(body);
    return new Response(body, { status, headers });
  };

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
    if (!fileUrl) return attach('missing url', 'text/plain', 'Shotox/error.txt', 400);

    let parsed;
    try {
      parsed = new URL(fileUrl);
    } catch {
      return attach('bad url', 'text/plain', 'Shotox/error.txt', 400);
    }
    // Only re-stream Base44 storage hosts so the endpoint can't be used as an
    // open proxy. These files are already world-readable (UploadPublicFile).
    const host = parsed.hostname.toLowerCase();
    if (!host.endsWith('base44.com') && !host.endsWith('wixstatic.com')) {
      return attach('forbidden host', 'text/plain', 'Shotox/error.txt', 403);
    }

    const res = await fetch(fileUrl);
    if (!res.ok) return attach('fetch failed: ' + res.status, 'text/plain', 'Shotox/error.txt', 502);
    const buf = await res.arrayBuffer();
    const safeName = (name || 'download').replace(/[^a-zA-Z0-9._-]/g, '_');
    return attach(buf, res.headers.get('Content-Type') || 'application/octet-stream', `Shotox/${safeName}`);
  } catch (error) {
    return attach(error.message || 'error', 'text/plain', 'Shotox/error.txt', 500);
  }
}