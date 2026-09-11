import html2canvas from 'html2canvas';
import JSZip from 'jszip';
import { BASE_W, slideHeight } from '@/lib/templates';

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// html2canvas clones the entire document into an iframe, then walks it to
// re-locate the target element. Deeply nested, transformed, SVG-rich trees
// (our slide canvas) break that walk and throw "Unable to find element in
// cloned iframe". Rendering a fresh clone placed directly under <body> keeps
// the lookup path trivial and stable.
const renderCanvas = async (el, device) => {
  const h = slideHeight(device);
  const holder = document.createElement('div');
  holder.style.cssText = `position:fixed;left:-99999px;top:0;width:${BASE_W}px;height:${h}px;overflow:hidden;pointer-events:none;`;
  holder.appendChild(el.cloneNode(true));
  document.body.appendChild(holder);
  try {
    return await html2canvas(holder, {
      scale: device.w / BASE_W,
      useCORS: true,
      backgroundColor: null,
      width: BASE_W,
      height: h,
      logging: false,
    });
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

const canvasToBlob = (canvas, mime) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), mime, 0.95);
  });

export async function exportSlide(el, device, filename, format = 'png', onProgress) {
  if (!el) return null;
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  onProgress?.(5);
  const canvas = await renderCanvas(el, device);
  onProgress?.(85);
  const blob = await canvasToBlob(canvas, mime);
  onProgress?.(100);
  return { blob, filename: `${filename}.${ext}`, mime, count: 1 };
}

export async function exportAllSlides(els, device, baseName, format = 'png', onProgress) {
  const ext = format === 'jpeg' ? 'jpg' : 'png';
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const zip = new JSZip();
  const total = els.length;
  let count = 0;
  for (let i = 0; i < total; i++) {
    const el = els[i];
    if (!el) continue;
    onProgress?.((i / total) * 100);
    const canvas = await renderCanvas(el, device);
    const blob = await canvasToBlob(canvas, mime);
    zip.file(`${i + 1}.${ext}`, blob);
    count++;
  }
  onProgress?.(95);
  const blob = await zip.generateAsync({ type: 'blob' });
  onProgress?.(100);
  return { blob, filename: `${baseName}-screenshots.zip`, mime: 'application/zip', count };
}