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

// On mobile (and inside the Base44 app shell) the blob <a download> trick is
// silently dropped by the WebView, so nothing saves. The Web Share API with
// files opens the native share/save sheet — the same sheet the browser uses —
// letting the user save the image/ZIP to Photos/Files or forward it. Desktop
// browsers without the API fall back to a normal anchor download.
const saveBlob = async (blob, filename, mime) => {
  const file = new File([blob], filename, { type: mime });
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (e) {
      if (e?.name === 'AbortError') return; // user dismissed the sheet
      // fall through to anchor download
    }
  }
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

// Render a slide element straight to an image blob — used by the editor to
// pre-render the current slide in the background so the download/save sheet
// opens instantly when the user taps download.
export const renderSlideBlob = async (el, device, mime) => {
  const canvas = await renderCanvas(el, device);
  return canvasToBlob(canvas, mime);
};

// Save an already-rendered blob (pre-rendered cache path) — opens the native
// save/share sheet with no rendering delay.
export const downloadBlob = (blob, filename, mime) => saveBlob(blob, filename, mime);

export async function exportSlide(el, device, filename, format = 'png', onProgress) {
  if (!el) return;
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  onProgress?.(5);
  const blob = await renderSlideBlob(el, device, mime);
  onProgress?.(95);
  await saveBlob(blob, `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`, mime);
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
  await saveBlob(blob, `${baseName}-screenshots.zip`, 'application/zip');
  onProgress?.(100);
}