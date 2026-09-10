import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Check, Loader2, Cloud, LogOut, Share2, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingKey, setPendingKey] = useState(null);
  const pick = (e, key, which, format) => {
    e.preventDefault();
    setPendingKey(key);
    setTimeout(() => {
      setMenuOpen(false);
      setPendingKey(null);
      onExport(which, format);
    }, 450);
  };
  return (
    <header className="min-h-14 safe-top shrink-0 flex items-center gap-3 px-3 sm:px-4 bg-[#0B0B12] border-b border-white/10 text-white no-callout">
      <Link to="/projects" className="w-11 h-11 grid place-items-center rounded-lg hover:bg-white/10 transition-colors" aria-label="Back to projects">
        <ArrowLeft className="w-4 h-4" />
      </Link>
      <Brand to="/" size={24} textClass="text-white" className="hidden sm:flex" />
      <div className="flex-1 flex justify-center">
        <input
          value={project.name}
          onChange={(e) => onRename(e.target.value)}
          className="bg-transparent text-sm text-center font-medium outline-none rounded-md px-3 py-1.5 hover:bg-white/5 focus:bg-white/10 w-40 sm:w-60 transition-colors"
        />
      </div>
      <span className="hidden md:flex items-center gap-1.5 text-sm text-white/60">
        <S.icon className={`w-3.5 h-3.5 ${status === 'saving' ? 'animate-spin' : ''}`} /> {S.label}
      </span>
      {status === 'error' && onRetry && (
        <button onClick={onRetry} className="hidden md:inline-flex items-center gap-1.5 text-sm text-amber-300 hover:text-amber-200 px-2.5 py-1 rounded-full border border-amber-400/30 hover:bg-amber-400/10 transition-colors no-callout">
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      )}
      <span className="hidden lg:block text-sm text-white/60 px-2.5 py-1 rounded-full border border-white/10">
        {device.name} · {device.w} × {device.h}
      </span>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="sm" disabled={exporting} className="bg-white text-[#0B0B12] hover:bg-white/90 rounded-full px-4">
            {exporting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Download className="w-4 h-4 mr-1.5" />}
            Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-60">
          <DropdownMenuItem disabled={!!pendingKey} onSelect={(e) => pick(e, 'current-png', 'current', 'png')} className={pendingKey === 'current-png' ? 'bg-violet-500/15' : ''}>
            <span className="flex items-center justify-between w-full">Current slide · PNG{pendingKey === 'current-png' && <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-300" />}</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!!pendingKey} onSelect={(e) => pick(e, 'current-jpeg', 'current', 'jpeg')} className={pendingKey === 'current-jpeg' ? 'bg-violet-500/15' : ''}>
            <span className="flex items-center justify-between w-full">Current slide · JPEG{pendingKey === 'current-jpeg' && <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-300" />}</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!!pendingKey} onSelect={(e) => pick(e, 'all-png', 'all', 'png')} className={pendingKey === 'all-png' ? 'bg-violet-500/15' : ''}>
            <span className="flex items-center justify-between w-full">All slides · PNG{pendingKey === 'all-png' && <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-300" />}</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={!!pendingKey} onSelect={(e) => pick(e, 'all-jpeg', 'all', 'jpeg')} className={pendingKey === 'all-jpeg' ? 'bg-violet-500/15' : ''}>
            <span className="flex items-center justify-between w-full">All slides · JPEG{pendingKey === 'all-jpeg' && <Loader2 className="w-3.5 h-3.5 animate-spin text-violet-300" />}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        <button onClick={onShare} className="w-11 h-11 grid place-items-center rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" title="Share design" aria-label="Share design">
          <Share2 className="w-4 h-4" />
        </button>
        <button onClick={() => base44.auth.logout('/')} className="w-11 h-11 grid place-items-center rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" title="Sign out" aria-label="Sign out">
        <LogOut className="w-4 h-4" />
        </button>
        </header>
  );
}