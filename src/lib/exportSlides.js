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
  // The hidden export instances are rendered at the device's exact native
  // dimensions (width = device.w) with NO css transform — every position
  // constant is already scaled to that size, so we capture 1:1 at scale 1.
  const holder = document.createElement('div');
  holder.style.cssText = `position:fixed;left:0;top:0;width:${device.w}px;height:${device.h}px;overflow:hidden;pointer-events:none;z-index:-1;`;
  const clone = el.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '0';
  holder.appendChild(clone);
  document.body.appendChild(holder);
  if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch {} }
  await inlineImages(holder);
  const baseOpts = { scale: 1, useCORS: true, backgroundColor: null, width: device.w, height: device.h, scrollX: 0, scrollY: 0, windowWidth: device.w, windowHeight: device.h, logging: false };
  // In the native app WebView, SVG foreignObject rendering stalls and never
  // resolves, which freezes the export. Use html2canvas's default renderer
  // there (reliable in WebViews); keep foreignObjectRendering on the web where
  // text lands pixel-perfect.
  const isNative = typeof document !== 'undefined' && document.documentElement.classList && document.documentElement.classList.contains('native-app');
  try {
    if (isNative) {
      return await html2canvas(holder, baseOpts);
    }
    return await Promise.race([
      html2canvas(holder, { ...baseOpts, foreignObjectRendering: true }),
      new Promise((_, rej) => setTimeout(() => rej(new Error('fo-timeout')), 25000)),
    ]);
  } catch {
    return await html2canvas(holder, baseOpts);
  } finally {
    document.body.removeChild(holder);
  }
};

export const triggerDownload = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
};

// On mobile WebViews, an <a download>.click() on a blob: URL does not trigger
// the native download pipeline, so the file never saves. The Web Share API
// (navigator.share with files) is the reliable path on Android — but it needs
// a fresh user gesture, so the caller must invoke it from a tap (see the
// "Save to phone" sheet in the editor). Returns false if sharing isn't
// available so the caller can fall back to a direct download.
export const shareBlob = async (blob, filename) => {
  try {
    const file = new File([blob], filename, { type: blob.type || 'application/octet-stream' });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file] });
      return true;
    }
  } catch {}
  return false;
};

const canvasToBlob = (canvas, mime) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), mime, 0.95);
  });

export async function exportSlide(el, device, filename, format = 'png', onProgress) {
  if (!el) return null;
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  onProgress?.(5);
  const canvas = await renderCanvas(el, device);
  onProgress?.(85);
  const blob = await canvasToBlob(canvas, mime);
  onProgress?.(100);
  return { blob, filename: `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}` };
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
  onProgress?.(100);
  return { blob, filename: `${baseName}-screenshots.zip` };
}