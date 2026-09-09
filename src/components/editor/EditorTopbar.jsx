import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Check, Loader2, Cloud, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { resolveDevice } from '@/lib/templates';
import { Brand } from '@/components/Logo';
import { base44 } from '@/api/base44Client';

const STATUS = {
  saved: { icon: Check, label: 'Saved' },
  dirty: { icon: Cloud, label: 'Unsaved changes' },
  saving: { icon: Loader2, label: 'Saving…' },
};

export default function EditorTopbar({ project, status, onRename, onExport, exporting }) {
  const S = STATUS[status] || STATUS.saved;
  const device = resolveDevice(project);
  return (
    <header className="h-14 shrink-0 flex items-center gap-3 px-3 sm:px-4 bg-[#0B0B12] border-b border-white/10 text-white">
      <Link to="/projects" className="p-2 rounded-lg hover:bg-white/10 transition-colors" aria-label="Back to projects">
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
      <span className="hidden md:flex items-center gap-1.5 text-xs text-white/50">
        <S.icon className={`w-3.5 h-3.5 ${status === 'saving' ? 'animate-spin' : ''}`} /> {S.label}
      </span>
      <span className="hidden lg:block text-xs text-white/50 px-2.5 py-1 rounded-full border border-white/10">
        {device.name} · {device.w} × {device.h}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" disabled={exporting} className="bg-white text-[#0B0B12] hover:bg-white/90 rounded-full px-4">
            {exporting ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> : <Download className="w-4 h-4 mr-1.5" />}
            Download
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => onExport('current', 'png')}>Current slide · PNG</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('current', 'jpeg')}>Current slide · JPEG</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('all', 'png')}>All slides · PNG</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onExport('all', 'jpeg')}>All slides · JPEG</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
        <button onClick={() => base44.auth.logout('/')} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white" title="Sign out" aria-label="Sign out">
        <LogOut className="w-4 h-4" />
        </button>
        </header>
  );
}