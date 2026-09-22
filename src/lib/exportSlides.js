import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { base44 } from '@/api/base44Client';

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// html2canvas clones the entire document into an iframe, then walks it to
// re-locate the target element. Deeply nested, transformed, SVG-rich trees
// (our slide canvas) break that walk and throw "Unable to find element in
// cloned iframe". Rendering a fresh clone placed directly under <body> keeps
// the lookup path trivial and stable.
const TRANSPARENT_PX = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

// Inline every <img> in the clone as a data URL so the SVG used by
// foreignObjectRendering has no external/cross-origin resources — that's what
// made the previous attempt hang (the image never loaded inside the SVG).
const inlineImages = async (root) =>
  Promise.all(
    Array.from(root.querySelectorAll('img')).map(async (img) => {
      // crossOrigin / srcset / referrerPolicy left on the <img> can force a CORS
      // mode that taints the SVG render even after we swap src to a data: URL, and
      // srcset would re-introduce external sources the browser could pick. Strip
      // them before inlining.
      img.removeAttribute('crossorigin');
      img.removeAttribute('crossOrigin');
      img.removeAttribute('srcset');
      img.removeAttribute('srcset');
      img.removeAttribute('loading');
      img.removeAttribute('referrerpolicy');
      const src = img.getAttribute('src') || img.src;
      if (!src || src.startsWith('data:')) return;
      try {
        // Abort the fetch after 8s so a single unreachable image can never
        // stall the whole export (that was what left the dialog "stuck").
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(src, { mode: 'cors', signal: controller.signal });
        clearTimeout(t);
        const blob = await res.blob();
        img.src = await new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result);
          r.onerror = reject;
          r.readAsDataURL(blob);
        });
      } catch {
        img.src = TRANSPARENT_PX;
      }
    })
  );

const withTimeout = (p, ms, label) =>
  Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(label)), ms))]);

// Collect every stylesheet's CSS text. Same-origin sheets are read via
// cssRules; cross-origin sheets (Google Fonts @import) throw a SecurityError
// on cssRules, so we fetch them by href instead — otherwise the @font-face
// rules for Sora/Inter would be missing and the export would lose its fonts.
const collectCssText = async () => {
  let css = '';
  const sheets = Array.from(document.styleSheets);
  await Promise.all(
    sheets.map(async (sheet) => {
      let text = '';
      try {
        const rules = sheet.cssRules;
        if (rules) for (const r of rules) text += r.cssText + '\n';
      } catch {
        if (sheet.href) {
          try {
            const controller = new AbortController();
            const t = setTimeout(() => controller.abort(), 8000);
            const res = await fetch(sheet.href, { mode: 'cors', signal: controller.signal });
            clearTimeout(t);
            text = await res.text();
          } catch { /* skip unreachable sheet */ }
        }
      }
      css += text + '\n';
    })
  );
  return css;
};

// Browsers render an SVG loaded via <img> in "secure" mode: external resources
// (fonts, images) are NOT fetched. Our slide text uses Sora/Inter from Google
// Fonts, so without inlining the @font-face url()s as data URLs the text would
// fall back to a system font and the export would lose its typography.
const inlineFontUrls = async (css) => {
  const urls = [...css.matchAll(/url\(["']?(https?:\/\/[^"')]+)["']?\)/g)].map((m) => m[1]);
  const unique = [...new Set(urls)];
  if (!unique.length) return css;
  const map = {};
  await Promise.all(
    unique.map(async (u) => {
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 8000);
        const res = await fetch(u, { mode: 'cors', signal: controller.signal });
        clearTimeout(t);
        const blob = await res.blob();
        map[u] = await new Promise((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result);
          r.onerror = reject;
          r.readAsDataURL(blob);
        });
      } catch { /* leave as original url */ }
    })
  );
  return css.replace(/url\(["']?(https?:\/\/[^"')]+)["']?\)/g, (m, u) => (map[u] ? `url(${map[u]})` : m));
};

// Computed once and cached for the session — font files are fetched a single
// time and reused across every slide in the batch.
let _inlinedCssCache = null;
const getInlinedCss = async () => {
  if (_inlinedCssCache) return _inlinedCssCache;
  let css = await collectCssText();
  css = await inlineFontUrls(css);
  // Drop @import rules — the @font-face rules are already inlined above, and an
  // @import url(https://…) left in the SVG is an external reference that taints
  // the canvas when the SVG is drawn.
  css = css.replace(/@import[^;]*;/gi, '');
  // Any external url() we couldn't inline (a font fetch that failed) would
  // taint the canvas — and that includes protocol-relative "//…" URLs which
  // resolve to https at runtime. Replace every remaining external url (http,
  // https, or //) with a harmless transparent data URL so the SVG is fully
  // self-contained. Failed fonts just fall back to a system font instead of
  // breaking the export. data: URLs are not matched and are preserved.
  css = css.replace(/url\(["']?(?:(?:https?:)?\/\/[^"')]+)["']?\)/gi, `url(${TRANSPARENT_PX})`);
  _inlinedCssCache = css;
  return css;
};

const renderCanvas = async (el, device, format = 'png') => {
  const width = device.w;
  const height = device.h;
  const holder = document.createElement('div');
  holder.style.cssText = `position:fixed;left:-99999px;top:0;width:${width}px;height:${height}px;overflow:hidden;pointer-events:none;`;
  const clone = el.cloneNode(true);
  clone.style.position = 'relative';
  clone.style.top = '0';
  clone.style.left = '0';
  clone.style.width = `${width}px`;
  clone.style.height = `${height}px`;
  clone.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
  holder.appendChild(clone);
  document.body.appendChild(holder);
  try {
    if (document.fonts && document.fonts.ready) { try { await withTimeout(document.fonts.ready, 3000, 'fonts'); } catch {} }
    await withTimeout(inlineImages(holder), 15000, 'images');

    // Inject the live document CSS into the clone so the foreignObject renders
    // with the same Tailwind classes / CSS variables it has on screen.
    const styleEl = document.createElement('style');
    styleEl.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    styleEl.textContent = await getInlinedCss();
    clone.insertBefore(styleEl, clone.firstChild);

    // Serialize → SVG foreignObject → Image → Canvas. The browser renders the
    // SVG (and the foreignObject HTML inside it) asynchronously during image
    // decode, OFF the main thread — so the page never freezes. The only
    // main-thread work is serializeToString (a few ms) and drawImage (a few ms).
    const xml = new XMLSerializer().serializeToString(clone);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject width="100%" height="100%">${xml}</foreignObject></svg>`;
    const svgBlob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    try {
      const img = await withTimeout(new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Render failed'));
        image.src = url;
      }), 20000, 'svg-decode');
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (format === 'jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, width, height); }
      ctx.drawImage(img, 0, 0, width, height);
      // If an external resource slipped past inlining, the canvas is tainted and
      // toBlob would throw "Tainted canvases may not be exported". Detect it now
      // and fall through to the html2canvas fallback, which re-renders the clone
      // whose images are already data: URLs → it cannot taint.
      try { ctx.getImageData(0, 0, 1, 1); }
      catch { throw new Error('tainted'); }
      return canvas;
    } catch (svgErr) {
      // Fallback if the SVG path fails OR produces a tainted canvas. The clone
      // is already fully inlined (every image is a data: URL), so html2canvas
      // can't taint or hang on cross-origin image loading. Capped so it can't hang.
      const baseOpts = { scale: 1, useCORS: false, allowTaint: false, backgroundColor: null, width, height, scrollX: 0, scrollY: 0, windowWidth: width, windowHeight: height, logging: false, imageTimeout: 10000 };
      return await withTimeout(html2canvas(holder, baseOpts), 25000, 'render-timeout');
    }
  } finally {
    if (holder.parentNode) document.body.removeChild(holder);
  }
};

const isNativeApp = () => document.documentElement.classList.contains('native-app');

// Builds a tiny self-contained preview page that Shotox uploads to public
// storage (media.base44.com) and opens in the phone's default browser from the
// native app. Because the page is served from the same origin as the exported
// file, the Save button can fetch the file and trigger a real download to the
// device's gallery — something the in-WebView download handler can't do (it
// saves to the app's private sandbox instead of public Downloads/MediaStore).
const buildSavePage = (fileUrl, filename, mime) => {
  const isImage = mime.startsWith('image/');
  const preview = isImage
    ? `<img id="img" src=${JSON.stringify(fileUrl)} alt="screenshot">`
    : `<div class="zip">📦<div class="zt">Your file is ready</div></div>`;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Save ${filename}</title><style>*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}html,body{height:100%;background:#0B0B12;color:#fff;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.bar{position:fixed;top:0;left:0;right:0;height:56px;display:flex;align-items:center;justify-content:flex-end;padding:6px 12px;padding-top:max(env(safe-area-inset-top),12px);background:rgba(11,11,18,.92);backdrop-filter:blur(8px);z-index:10;border-bottom:1px solid rgba(255,255,255,.08)}.save{display:inline-flex;align-items:center;gap:6px;height:40px;padding:0 20px;border-radius:12px;background:#fff;color:#0B0B12;font-weight:700;font-size:15px;border:none;cursor:pointer}.save:disabled{opacity:.7}.stage{min-height:100%;display:flex;align-items:center;justify-content:center;padding:68px 14px 28px}img{max-width:100%;max-height:76vh;border-radius:14px;box-shadow:0 12px 44px rgba(0,0,0,.55)}.zip{display:flex;flex-direction:column;align-items:center;gap:14px;font-size:46px}.zt{font-size:16px;color:rgba(255,255,255,.85)}.hint{text-align:center;color:rgba(255,255,255,.55);font-size:13px;margin-top:16px}</style></head><body><div class="bar"><button id="save" class="save">⬇ Save</button></div><div class="stage"><div>${preview}<div class="hint">Tap Save to download to your gallery.</div></div></div><script>const b=document.getElementById('save');b.addEventListener('click',async()=>{b.disabled=true;const t=b.textContent;b.textContent='Saving…';try{const r=await fetch(${JSON.stringify(fileUrl)});if(!r.ok)throw 0;const bl=await r.blob();const u=URL.createObjectURL(bl);const a=document.createElement('a');a.href=u;a.download=${JSON.stringify(filename)};document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),5000);b.textContent='Saved ✓';setTimeout(()=>{b.disabled=false;b.textContent=t;},1500);}catch(e){b.disabled=false;b.textContent=t;alert('Could not save automatically. Long-press the image and choose Save image.');}});</script></body></html>`;
};

// Website (real browser): a blob URL + `download` attribute saves directly to the
// user's Downloads folder via the browser's download manager.
//
// Native Android/iOS WebView: the `download` attribute + blob URL is handled by
// the wrapper, which saves to the app's private directory (not visible in Files
// or Gallery). So instead we upload the file, build a small preview page hosted on
// the same origin, and return that page's URL — the in-app modal opens it in the
// phone's default browser, where its Save button fetches the file (same-origin)
// and downloads it to public Downloads / Gallery.
const triggerDownload = async (blob, filename, mime) => {
  if (isNativeApp()) {
    const file = new File([blob], filename, { type: mime });
    const { file_url } = await base44.integrations.Core.UploadPublicFile({ file });
    // Build + upload a preview page (same origin as the file) whose Save button
    // forces a real download to the gallery, then return that page's URL.
    const html = buildSavePage(file_url, filename, mime);
    const { file_url: pageUrl } = await base44.integrations.Core.UploadPublicFile({
      file: new File([new Blob([html], { type: 'text/html' })], 'save.html', { type: 'text/html' })
    });
    return pageUrl;
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  return null; // website: download already triggered
};

const canvasToBlob = (canvas, mime) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), mime, 0.95);
  });

export async function exportSlide(el, device, filename, format = 'png', onProgress) {
  if (!el) return;
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  onProgress?.(5);
  const canvas = await renderCanvas(el, device, format);
  onProgress?.(85);
  const blob = await canvasToBlob(canvas, mime);
  onProgress?.(95);
  const result = await triggerDownload(blob, `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`, mime);
  onProgress?.(100);
  return result;
}

export async function exportAllSlides(els, device, baseName, format = 'png', onProgress) {
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const zip = new JSZip();
  const total = els.length;
  for (let i = 0; i < total; i++) {
    const el = els[i];
    if (!el) continue;
    onProgress?.((i / total) * 100);
    const canvas = await renderCanvas(el, device, format);
    const blob = await canvasToBlob(canvas, mime);
    zip.file(`${i + 1}.${ext}`, blob);
    // Yield to the event loop between slides so the UI stays responsive across
    // the whole batch (progress bar animates, buttons stay clickable).
    await wait(0);
  }
  onProgress?.(95);
  const blob = await zip.generateAsync({ type: 'blob' });
  const result = await triggerDownload(blob, `${baseName}-screenshots.zip`, 'application/zip');
  onProgress?.(100);
  return result;
}