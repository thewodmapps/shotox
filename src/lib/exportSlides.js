import html2canvas from 'html2canvas';
import JSZip from 'jszip';

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
      const src = img.getAttribute('src') || img.src;
      if (!src || src.startsWith('data:')) return;
      try {
        const res = await fetch(src, { mode: 'cors' });
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

const renderCanvas = async (el, device) => {
  // The hidden export instances may be rendered supersampled (e.g. the
  // 1024×500 feature graphic at 2x) for a crisper result. Capture at the
  // element's actual render size, then downscale to the device's true spec.
  const rw = el.offsetWidth || device.w;
  const rh = el.offsetHeight || device.h;
  const holder = document.createElement('div');
  holder.style.cssText = `position:fixed;left:0;top:0;width:${rw}px;height:${rh}px;overflow:hidden;pointer-events:none;z-index:-1;`;
  const clone = el.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '0';
  holder.appendChild(clone);
  document.body.appendChild(holder);
  if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch {} }
  await inlineImages(holder);
  const capOpts = { scale: 1, useCORS: true, backgroundColor: null, width: rw, height: rh, scrollX: 0, scrollY: 0, windowWidth: rw, windowHeight: rh, logging: false };
  let canvas;
  try {
    // foreignObjectRendering makes the browser render the slide itself, so text
    // lands exactly where it does in the editor (html2canvas's own text renderer
    // is what was pushing the heading down). The timeout guards against any
    // pending-resource hang; on failure we fall back to the default renderer.
    canvas = await Promise.race([
      html2canvas(holder, { ...capOpts, foreignObjectRendering: true }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('fo-timeout')), 25000)),
    ]);
  } catch {
    canvas = await html2canvas(holder, capOpts);
  } finally {
    document.body.removeChild(holder);
  }
  if (canvas.width !== device.w || canvas.height !== device.h) {
    const out = document.createElement('canvas');
    out.width = device.w;
    out.height = device.h;
    const ctx = out.getContext('2d');
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(canvas, 0, 0, device.w, device.h);
    return out;
  }
  return canvas;
};

const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

const canvasToBlob = (canvas, mime) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), mime, 0.95);
  });

export async function exportSlide(el, device, filename, format = 'png', onProgress) {
  if (!el) return;
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  onProgress?.(5);
  const canvas = await renderCanvas(el, device);
  onProgress?.(85);
  const blob = await canvasToBlob(canvas, mime);
  onProgress?.(95);
  triggerDownload(blob, `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`);
  onProgress?.(100);
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
    const canvas = await renderCanvas(el, device);
    const blob = await canvasToBlob(canvas, mime);
    zip.file(`${i + 1}.${ext}`, blob);
  }
  onProgress?.(95);
  const blob = await zip.generateAsync({ type: 'blob' });
  triggerDownload(blob, `${baseName}-screenshots.zip`);
  onProgress?.(100);
}