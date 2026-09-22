import React from 'react';
import { Download, X, ExternalLink } from 'lucide-react';

// Shown in the native Android/iOS WebView after an export finishes. The export
// is uploaded to storage and this modal hands the user a real link to tap — that
// user gesture lets the native system hand the navigation to the phone's default
// browser, which downloads the file to public Downloads / Gallery.
export default function NativeDownloadModal({ url, onClose }) {
  if (!url) return null;
  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/60 backdrop-blur-sm p-6">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#0B0B12] border border-white/10 shadow-2xl p-6 text-center">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="w-14 h-14 mx-auto rounded-2xl bg-violet-500/20 grid place-items-center">
          <Download className="w-7 h-7 text-violet-300" />
        </div>
        <h3 className="mt-4 font-display text-lg font-bold text-white">Your file is ready</h3>
        <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
          Tap below to open it in your browser and save it to your gallery.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 w-full h-11 rounded-xl bg-white text-[#0B0B12] font-semibold inline-flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
        >
          <ExternalLink className="w-4 h-4" /> Open in browser
        </a>
        <button
          onClick={onClose}
          className="mt-2 w-full h-10 rounded-xl text-white/50 text-sm hover:text-white transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}