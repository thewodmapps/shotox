import React from 'react';
import { Crown } from 'lucide-react';
import { Brand } from '@/components/Logo';

export default function ProjectsHeader() {
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#08080d]/70 backdrop-blur-xl text-white flex items-center justify-between px-4 sm:px-6 border-b border-white/10">
      <Brand to="/" size={26} textClass="text-white" />
      <a href="/#pricing" className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
        <Crown className="w-3.5 h-3.5 text-yellow-200" /> Upgrade
      </a>
    </header>
  );
}