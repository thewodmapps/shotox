import React from 'react';
import { Loader2, Check, X, Download } from 'lucide-react';

// Single download popup. Three phases:
//  - exporting: spinner + progress %
//  - ready: render finished, "Save to phone" button (native WebView only —
//    Android only allows saving via the system share sheet, which needs a tap)
//  - done: green check in a circle + "File saved" + close X (top right)
export default function ExportOverlay({ pct, exporting, ready, done, onSave, onClose }) {
  const value = Math.min(100, Math.max(0, Math.round(pct)));
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="relative flex flex-col items-center gap-5 px-10 py-9 rounded-3xl bg-[#0B0B12]/85 border border-white/10 shadow-2xl">
        {done && onClose && (
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-full text-white/60 hover:bg-white/10 transition-colors" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        )}
        {done ? (
          <>
            <div className="grid place-items-center w-16 h-16 rounded-full bg-green-500/15 border border-green-400/30">
              <Check className="w-8 h-8 text-green-400" strokeWidth={3} />
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-white">File saved</div>
              <div className="text-xs text-white/50 mt-1">Saved to your phone</div>
            </div>
          </>
        ) : ready ? (
          <>
            <div className="grid place-items-center w-16 h-16 rounded-full bg-violet-500/15 border border-violet-400/30">
              <Download className="w-8 h-8 text-violet-300" />
            </div>
            <div className="text-center">
              <div className="font-display text-xl font-bold text-white">Ready to save</div>
              <div className="text-xs text-white/50 mt-1">Tap below, then choose “Save to Photos”</div>
            </div>
            <button onClick={onSave} className="mt-1 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white text-sm font-semibold shadow-lg shadow-pink-500/30">
              <Download className="w-4 h-4" /> Save to phone
            </button>
          </>
        ) : (
          <>
            <Loader2 className="w-9 h-9 text-violet-300 animate-spin" />
            <div className="text-center">
              <div className="font-display text-3xl font-bold text-white tabular-nums">{value}%</div>
              <div className="text-xs text-white/50 mt-1">Exporting your screenshots…</div>
            </div>
            <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-150" style={{ width: `${value}%` }} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}