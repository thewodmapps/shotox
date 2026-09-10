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
      <div className="flex items-center gap-2">
        {badge ? (
          <span className={`inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full ${badge.className}`}>
            <badge.icon className={`w-4 h-4 ${badge.iconClass}`} /> {badge.label}
          </span>
        ) : (
          <Link to="/#pricing" className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
            <Crown className="w-3.5 h-3.5 text-yellow-200" /> Upgrade
          </Link>
        )}
        <button onClick={() => setAccountOpen(true)} className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors" title="Account">
          <UserCircle2 className="w-4 h-4" /> Account
        </button>
        <button onClick={() => base44.auth.logout('/')} className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-full bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:text-white transition-colors" title="Sign out">
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}