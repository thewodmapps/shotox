import html2canvas from 'html2canvas';
import JSZip from 'jszip';

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// html2canvas clones the entire document into an iframe, then walks it to
// re-locate the target element. Deeply nested, transformed, SVG-rich trees
// (our slide canvas) break that walk and throw "Unable to find element in
// cloned iframe". Rendering a fresh clone placed directly under <body> keeps
// the lookup path trivial and stable.
const renderCanvas = async (el, device) => {
  // The hidden export instances are rendered at the device's exact native
  // dimensions (width = device.w) with NO css transform — every position
  // constant is already scaled to that size. So we capture 1:1 at scale 1,
  // which removes the html2canvas scale factor / transform that was shifting
  // content down and producing the extra top space in exported slides.
  const holder = document.createElement('div');
  holder.style.cssText = `position:fixed;left:0;top:0;width:${device.w}px;height:${device.h}px;overflow:hidden;pointer-events:none;z-index:-1;`;
  const clone = el.cloneNode(true);
  clone.style.position = 'absolute';
  clone.style.top = '0';
  clone.style.left = '0';
  holder.appendChild(clone);
  document.body.appendChild(holder);
  // Ensure web fonts are loaded before capture — html2canvas renders text offset
  // (extra top space) when it falls back to a default font mid-capture.
  if (document.fonts && document.fonts.ready) { try { await document.fonts.ready; } catch {} }
  try {
    return await html2canvas(holder, {
      scale: 1,
      useCORS: true,
      backgroundColor: null,
      width: device.w,
      height: device.h,
      scrollX: 0,
      scrollY: 0,
      windowWidth: device.w,
      windowHeight: device.h,
      logging: false,
    });
  } finally {
    document.body.removeChild(holder);
  }
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