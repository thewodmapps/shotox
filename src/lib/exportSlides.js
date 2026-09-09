import html2canvas from 'html2canvas';
import { BASE_W, slideHeight } from '@/lib/templates';

export async function exportSlide(el, device, filename, format = 'png') {
  const canvas = await html2canvas(el, {
    scale: device.w / BASE_W,
    useCORS: true,
    backgroundColor: null,
    width: BASE_W,
    height: slideHeight(device),
    logging: false,
  });
  const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
  const a = document.createElement('a');
  a.download = `${filename}.${format === 'jpeg' ? 'jpg' : 'png'}`;
  a.href = canvas.toDataURL(mime, 0.95);
  a.click();
}

export const wait = (ms) => new Promise((r) => setTimeout(r, ms));