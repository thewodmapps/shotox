import React from 'react';
import { Download, X } from 'lucide-react';

// Shown after an export finishes on the native app. A blob: URL <a download>
// doesn't save in mobile WebViews, so this sheet hands the file to the OS via
// navigator.share (Save to Photos / Files / share) — which requires a fresh
// user tap, hence the button.
export default function ShareSaveOverlay({ open, filename, onClose, onSave }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-sm px-6">
      <div className="relative flex flex-col items-center gap-4 px-8 py-8 rounded-3xl bg-[#0B0B12]/90 border border-white/10 shadow-2xl max-w-[88vw]">
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full text-white/60 hover:bg-white/10 transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="grid place-items-center w-14 h-14 rounded-2xl bg-gradient-to-r from-violet-500 to-pink-500 shadow-lg shadow-pink-500/30">
          <Download className="w-7 h-7 text-white" />
        </div>
        <div className="text-center">
          <div className="font-display text-lg font-bold text-white">Ready to save</div>
          {filename && <div className="text-xs text-white/50 mt-1 break-all">{filename}</div>}
        </div>
        <button onClick={onSave} className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white font-semibold text-sm shadow-lg shadow-pink-500/30 active:scale-95 transition-transform">
          <Download className="w-4 h-4" /> Save to phone
        </button>
      </div>
    </div>
  );
}