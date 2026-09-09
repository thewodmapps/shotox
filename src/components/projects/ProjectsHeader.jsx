import React from 'react';
import { Crown } from 'lucide-react';
import { Brand } from '@/components/Logo';

export default function ProjectsHeader() {
  return (
    <header className="h-14 bg-[#0B0B12] text-white flex items-center justify-between px-4 sm:px-6 border-b border-white/10">
      <Brand to="/" size={26} textClass="text-white" />
      <a href="/#pricing" className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 transition-colors">
        <Crown className="w-3.5 h-3.5 text-yellow-300" /> Upgrade
      </a>
    </header>
  );
}