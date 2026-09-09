import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, LogOut } from 'lucide-react';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';

export default function ProjectsHeader() {
  const { user } = useAuth();
  const pro = user?.plan === 'pro';
  return (
    <header className="sticky top-0 z-30 h-16 bg-[#08080d]/70 backdrop-blur-xl text-white flex items-center justify-between px-4 sm:px-6 border-b border-white/10">
      <Brand to="/" size={26} textClass="text-white" />
      <div className="flex items-center gap-2">
        {pro ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white">
            <Check className="w-3.5 h-3.5 text-lime-300" /> Pro
          </span>
        ) : (
          <Link to="/#pricing" className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
            <Crown className="w-3.5 h-3.5 text-yellow-200" /> Upgrade
          </Link>
        )}
        <button onClick={() => base44.auth.logout('/')} className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors" title="Sign out">
          <LogOut className="w-3.5 h-3.5" /> Sign out
        </button>
      </div>
    </header>
  );
}