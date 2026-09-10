import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Check, Sparkles, Infinity as InfinityIcon, LogOut, UserCircle2 } from 'lucide-react';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import AccountModal from '@/components/account/AccountModal';

const PLAN_BADGE = {
  monthly: {
    label: 'Pro Monthly',
    icon: Check,
    className: 'bg-white/10 border border-white/15 text-white',
    iconClass: 'text-lime-300',
  },
  yearly: {
    label: 'Pro Yearly',
    icon: Sparkles,
    className: 'bg-violet-500/15 border border-violet-400/30 text-violet-200',
    iconClass: 'text-violet-300',
  },
  lifetime: {
    label: 'Lifetime',
    icon: InfinityIcon,
    className: 'bg-gradient-to-r from-amber-400/20 to-pink-500/20 border border-amber-300/30 text-amber-100',
    iconClass: 'text-amber-300',
  },
};

export default function ProjectsHeader() {
  const { user } = useAuth();
  const badge = PLAN_BADGE[user?.plan];
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 min-h-16 safe-top bg-[#08080d]/70 backdrop-blur-xl text-white flex items-center justify-between px-4 sm:px-6 border-b border-white/10 no-callout">
      <Brand to="/" size={26} textClass="text-white" />
      <div className="flex items-center gap-1.5 sm:gap-2">
        {badge ? (
          <span className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full ${badge.className}`}>
            <badge.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${badge.iconClass}`} /> <span className="hidden sm:inline">{badge.label}</span>
          </span>
        ) : (
          <Link to="/#pricing" className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
            <Crown className="w-3.5 h-3.5 text-yellow-200" /> <span className="hidden sm:inline">Upgrade</span>
          </Link>
        )}
        <button onClick={() => setAccountOpen(true)} className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:gap-1.5 text-sm font-medium px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors" title="Account" aria-label="Account">
          <UserCircle2 className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Account</span>
        </button>
        <button onClick={() => base44.auth.logout('/')} className="inline-flex items-center justify-center w-9 h-9 sm:w-auto sm:h-auto sm:gap-1.5 text-sm font-medium px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors" title="Sign out" aria-label="Sign out">
          <LogOut className="w-4 h-4 shrink-0" /> <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}