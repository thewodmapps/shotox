import React, { useEffect, useState } from 'react';
import { X, Download, Save, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Shown only inside the native app WebView, where blob/anchor downloads don't
// reach device storage. A single tap on "Save to gallery" calls the Web Share
// API with the rendered image files — from within the click gesture, so the
// share sheet opens reliably — and the user picks "Save to Photos / Save image"
// to write them to the gallery. Falls back to per-file anchor download if the
// WebView doesn't support sharing files.
const dataUrlToFile = async (dataUrl, filename, mime) => {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: mime || blob.type });
};

const canShareFiles = (files) =>
  typeof navigator !== 'undefined' &&
  typeof navigator.canShare === 'function' &&
  navigator.canShare({ files });

export default function SaveImagesOverlay({ images, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | sharing | done

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!images?.length) return null;

  const saveAll = async () => {
    setStatus('sharing');
    try {
      const files = await Promise.all(
        images.map((img) => dataUrlToFile(img.dataUrl, img.filename, img.mime))
      );
      if (canShareFiles(files)) {
        await navigator.share({ files, title: 'Screenshots' });
        setStatus('done');
        return;
      }
      // No file sharing — fall back to per-file anchor download (data URL).
      images.forEach((img) => {
        const a = document.createElement('a');
        a.href = img.dataUrl;
        a.download = img.filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
      });
      setStatus('done');
    } catch {
      setStatus('idle');
    }
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-2 text-white">
          <Save className="w-5 h-5 text-violet-300" />
          <span className="font-display font-semibold">Save your screenshots</span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-9 h-9 rounded-full bg-white/10 text-white hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 overscroll-contain">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-white/70 mb-4 text-center leading-relaxed">
            Tap <span className="text-white font-medium">Save to gallery</span>, then choose{' '}
            <span className="text-white font-medium">Save to Photos</span> /{' '}
            <span className="text-white font-medium">Save image</span> in the share sheet.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {images.map((img, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <img src={img.dataUrl} alt={`Screenshot ${i + 1}`} className="w-full rounded-xl" />
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center gap-2">
            <Button
              onClick={saveAll}
              disabled={status === 'sharing'}
              className="rounded-xl bg-violet-500 hover:bg-violet-600 text-white px-8 h-12 text-base"
            >
              {status === 'done' ? (
                <><Check className="w-4 h-4" /> Saved</>
              ) : (
                <><Download className="w-4 h-4" /> {status === 'sharing' ? 'Opening…' : 'Save to gallery'}</>
              )}
            </Button>
            <span className="text-xs text-white/40">
              {images.length} screenshot{images.length > 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}