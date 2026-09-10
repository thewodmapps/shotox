import React, { useState } from 'react';
import { Download, Check, Loader2, Cloud, AlertTriangle, RefreshCw, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveDevice } from '@/lib/templates';

const STATUS = {
  saved: { icon: Check, label: 'Saved' },
  dirty: { icon: Cloud, label: 'Unsaved changes' },
  saving: { icon: Loader2, label: 'Saving…' },
  error: { icon: AlertTriangle, label: 'Save failed' },
};

export default function EditorActionBar({ project, status, onRename, onExport, onShare, exporting, onRetry }) {
  const S = STATUS[status] || STATUS.saved;
  const device = resolveDevice(project);
  const [dlOpen, setDlOpen] = useState(false);
  const [picked, setPicked] = useState(null);
  const opts = [
    { key: 'current-png', which: 'current', format: 'png', label: 'Current slide', sub: 'PNG · single image' },
    { key: 'current-jpeg', which: 'current', format: 'jpeg', label: 'Current slide', sub: 'JPEG · single image' },
    { key: 'all-png', which: 'all', format: 'png', label: 'All slides', sub: 'PNG · ZIP archive' },
    { key: 'all-jpeg', which: 'all', format: 'jpeg', label: 'All slides', sub: 'JPEG · ZIP archive' },
  ];
  const choose = (o) => {
    setPicked(o.key);
    setTimeout(() => {
      setDlOpen(false);
      onExport(o.which, o.format);
      setTimeout(() => setPicked(null), 300);
    }, 260);
  };
  return (
    <div className="min-h-12 shrink-0 flex items-center gap-2 px-3 sm:px-4 bg-[#0B0B12]/95 backdrop-blur border-b border-white/10 text-white no-callout">
      <input
        value={project.name}
        onChange={(e) => onRename(e.target.value)}
        className="bg-transparent text-sm font-medium outline-none rounded-md px-3 py-1.5 hover:bg-white/5 focus:bg-white/10 w-32 sm:w-56 transition-colors"
      />
      <span className="flex items-center gap-1.5 text-xs text-white/60">
        <S.icon className={`w-3.5 h-3.5 ${status === 'saving' ? 'animate-spin' : ''}`} /> <span className="hidden sm:inline">{S.label}</span>
      </span>
      {status === 'error' && onRetry && (
        <button onClick={onRetry} className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 px-2 py-1 rounded-full border border-amber-400/30 hover:bg-amber-400/10 transition-colors no-callout">
          <RefreshCw className="w-3 h-3" /> <span className="hidden sm:inline">Retry</span>
        </button>
      )}
      <span className="hidden lg:inline text-xs text-white/50 px-2.5 py-1 rounded-full border border-white/10">
        {device.name} · {device.w} × {device.h}
      </span>
      <div className="flex-1" />
      <div className="relative">
        <Button size="sm" disabled={exporting} onClick={() => setDlOpen((v) => !v)} className="bg-white text-[#0B0B12] hover:bg-white/90 rounded-full px-3">
          {exporting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Download className="w-4 h-4 mr-1.5" />}
          <span className="hidden sm:inline">Download</span>
        </Button>
        {dlOpen && !exporting && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setDlOpen(false)} />
            <div className="absolute right-0 top-full mt-2 z-50 w-60 rounded-2xl bg-[#111118] border border-white/10 shadow-2xl p-1.5">
              {opts.map((o) => {
                const active = picked === o.key;
                return (
                  <button key={o.key} onClick={() => choose(o)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors ${active ? 'bg-violet-500/20 text-white' : 'text-white/80 hover:bg-white/10'}`}>
                    <span className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 ${active ? 'bg-violet-500 text-white' : 'bg-white/5 text-white/70'}`}>
                      {active ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{o.label}</span>
                      <span className="block text-xs text-white/50">{o.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
      <button onClick={onShare} className="inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white px-2.5 py-1.5 rounded-full hover:bg-white/10 transition-colors" title="Share design" aria-label="Share design">
        <Share2 className="w-4 h-4" /> <span className="hidden sm:inline">Share</span>
      </button>
    </div>
  );
}