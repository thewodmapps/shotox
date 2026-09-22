import React, { useEffect, useState } from 'react';
import { X, Download, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Shown only inside the native app WebView, where blob/anchor downloads don't
// reach the device storage. Each screenshot is rendered on-screen so the user
// can press-and-hold → "Save image" (the WebView's own save, written to the
// gallery via MediaStore). The Save button also attempts a data-URL download,
// which some WebView wrappers do handle.
export default function SaveImagesOverlay({ images, onClose }) {
  const [saved, setSaved] = useState(() => (images || []).map(() => false));

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  if (!images?.length) return null;

  const tryDownload = (i) => {
    const { dataUrl, filename } = images[i];
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setSaved((s) => s.map((v, idx) => (idx === i ? true : v)));
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
            Press and hold an image, then tap <span className="text-white font-medium">“Save image”</span> to save it to your device.
            Or tap <span className="text-white font-medium">Save</span> under each one.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div key={i} className="rounded-2xl bg-white/5 border border-white/10 p-3">
                <img
                  src={img.dataUrl}
                  alt={`Screenshot ${i + 1}`}
                  draggable
                  className="w-full rounded-xl selectable-text"
                  style={{ WebkitTouchCallout: 'default', WebkitUserSelect: 'auto', userSelect: 'auto' }}
                />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-white/50 truncate">{img.filename}</span>
                  <Button
                    size="sm"
                    onClick={() => tryDownload(i)}
                    className="rounded-lg bg-violet-500 hover:bg-violet-600 text-white"
                  >
                    <Download className="w-3.5 h-3.5" /> {saved[i] ? 'Saved' : 'Save'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}