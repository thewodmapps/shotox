import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Check, Loader2, Cloud, LogOut, Share2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resolveDevice } from '@/lib/templates';
import { Brand } from '@/components/Logo';
import { base44 } from '@/api/base44Client';

const STATUS = {
  saved: { icon: Check, label: 'Saved' },
  dirty: { icon: Cloud, label: 'Unsaved changes' },
  saving: { icon: Loader2, label: 'Saving…' },
  error: { icon: AlertTriangle, label: 'Save failed' },
};

export default function EditorTopbar({ project, status, onRename, onExport, onShare, exporting, onRetry }) {
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
    <header className="fixed inset-x-0 z-40 flex justify-center px-3" style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)' }}>
      <nav className="w-full max-w-5xl flex items-center gap-2 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-2 pr-2 py-2 no-callout">
        <Link to="/projects" className="w-10 h-10 grid place-items-center rounded-xl hover:bg-black/5 transition-colors shrink-0" aria-label="Back to projects">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <Brand to="/" size={22} textClass="text-[#0B0B12]" className="hidden sm:flex shrink-0" />
        <div className="flex-1 flex justify-center min-w-0">
          <input
            value={project.name}
            onChange={(e) => onRename(e.target.value)}
            className="bg-transparent text-sm text-center font-medium text-[#0B0B12] outline-none rounded-md px-3 py-1.5 hover:bg-black/5 focus:bg-black/10 w-40 sm:w-56 transition-colors truncate"
          />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="hidden md:flex items-center gap-1.5 text-sm text-[#0B0B12]/60">
            <S.icon className={`w-3.5 h-3.5 ${status === 'saving' ? 'animate-spin' : ''}`} /> {S.label}
          </span>
          {status === 'error' && onRetry && (
            <button onClick={onRetry} className="hidden md:inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded-full border border-amber-400/30 hover:bg-amber-400/10 transition-colors no-callout">
              <RefreshCw className="w-3.5 h-3.5" /> Retry
            </button>
          )}
          <span className="hidden lg:block text-sm text-[#0B0B12]/60 px-2.5 py-1 rounded-full border border-black/10">
            {device.name} · {device.w} × {device.h}
          </span>
          <div className="relative">
            <Button size="icon" disabled={exporting} onClick={() => setDlOpen((v) => !v)} className="bg-[#0B0B12] text-white hover:bg-[#0B0B12]/90 rounded-xl" title="Download" aria-label="Download">
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
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
          <button onClick={onShare} className="w-10 h-10 grid place-items-center rounded-xl hover:bg-black/5 transition-colors text-[#0B0B12]/70 hover:text-[#0B0B12]" title="Share design" aria-label="Share design">
            <Share2 className="w-4 h-4" />
          </button>
          <button onClick={() => base44.auth.logout('/')} className="w-10 h-10 grid place-items-center rounded-xl hover:bg-black/5 transition-colors text-[#0B0B12]/70 hover:text-[#0B0B12]" title="Sign out" aria-label="Sign out">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}