import React from 'react';
import { Loader2 } from 'lucide-react';

export default function ExportOverlay({ pct }) {
  const value = Math.min(100, Math.max(0, Math.round(pct)));
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-5 px-10 py-9 rounded-3xl bg-[#0B0B12]/85 border border-white/10 shadow-2xl">
        <Loader2 className="w-9 h-9 text-violet-300 animate-spin" />
        <div className="text-center">
          <div className="font-display text-3xl font-bold text-white tabular-nums">{value}%</div>
          <div className="text-xs text-white/50 mt-1">Exporting your screenshots…</div>
        </div>
        <div className="w-56 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-violet-400 to-pink-400 transition-all duration-150" style={{ width: `${value}%` }} />
        </div>
      </div>
    </div>
  );
}