import React, { useEffect } from 'react';
import { X, CheckCircle2, Download, ImageDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { triggerDownload } from '@/lib/exportSlides';

export default function DownloadResult({ result, onClose }) {
  useEffect(() => {
    if (!result) return;
    return () => {
      if (result.url) URL.revokeObjectURL(result.url);
    };
  }, [result]);

  if (!result) return null;
  const isZip = result.isZip;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-md rounded-3xl bg-[#0B0B12] border border-white/10 p-6 text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-5 h-5 text-lime-400" />
          <h3 className="font-display text-lg font-bold">Your export is ready</h3>
        </div>

        {isZip ? (
          <p className="text-sm text-white/60 mb-5">
            A ZIP with {result.count} slides was generated. Tap <span className="text-white font-medium">Save file</span> to download it to your device.
          </p>
        ) : (
          <>
            <div className="rounded-2xl overflow-hidden border border-white/10 mb-3 bg-white/5 max-h-[55vh] flex items-center justify-center">
              <img src={result.url} alt="Exported slide" className="w-full block object-contain max-h-[55vh]" />
            </div>
            <p className="text-xs text-white/50 mb-5 leading-relaxed">
              On a phone or tablet, <span className="text-white/80 font-medium">long-press the image</span> above and choose “Save to Photos / Save image”. On desktop, use the button below.
            </p>
          </>
        )}

        <div className="flex items-center gap-2">
          <Button
            onClick={() => triggerDownload(result.blob, result.filename)}
            className="flex-1 h-11 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white border-0"
          >
            {isZip ? <Download className="w-4 h-4 mr-1.5" /> : <ImageDown className="w-4 h-4 mr-1.5" />}
            {isZip ? 'Save file' : 'Save image'}
          </Button>
          <Button variant="ghost" onClick={onClose} className="h-11 px-4 text-white/70 hover:text-white hover:bg-white/10">
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}