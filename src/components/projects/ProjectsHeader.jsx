import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crown, Check, Sparkles, Infinity as InfinityIcon, LogOut, UserCircle2 } from 'lucide-react';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import AccountModal from '@/components/account/AccountModal';

const PLAN_BADGE = {
  monthly: {
    label: 'Pro Monthly',
    icon: Check,
    className: 'bg-emerald-50 border border-emerald-200 text-emerald-700',
    iconClass: 'text-emerald-500',
  },
  yearly: {
    label: 'Pro Yearly',
    icon: Sparkles,
    className: 'bg-violet-50 border border-violet-200 text-violet-700',
    iconClass: 'text-violet-500',
  },
  lifetime: {
    label: 'Lifetime',
    icon: InfinityIcon,
    className: 'bg-amber-50 border border-amber-200 text-amber-700',
    iconClass: 'text-amber-500',
  },
};

export default function ProjectsHeader() {
  const { user } = useAuth();
  const badge = PLAN_BADGE[user?.plan];
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const goPricing = () => navigate('/#pricing');

  return (
    <header className="fixed top-4 inset-x-0 z-40 flex justify-center px-4">
      <nav className="w-full max-w-5xl flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-4 pr-2 py-2 no-callout">
        <Brand to="/" size={28} textClass="text-[#0B0B12]" />
      <div className="flex items-center gap-1.5 sm:gap-2">
        {badge ? (
          <button onClick={goPricing} title={badge.label} aria-label={badge.label} className={`inline-flex items-center justify-center w-9 h-9 rounded-full ${badge.className} hover:opacity-90 transition-opacity`}>
            <badge.icon className={`w-4 h-4 ${badge.iconClass}`} />
          </button>
        ) : (
          <Link to="/#pricing" title="Upgrade" aria-label="Upgrade" className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
            <Crown className="w-4 h-4 text-yellow-200" />
          </Link>
        )}
        <button onClick={() => setAccountOpen(true)} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/5 border border-black/10 text-[#0B0B12]/80 hover:bg-black/10 hover:text-[#0B0B12] transition-colors" title="Account" aria-label="Account">
          <UserCircle2 className="w-4 h-4 shrink-0" />
        </button>
        <button onClick={() => base44.auth.logout('/')} className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/5 border border-black/10 text-[#0B0B12]/80 hover:bg-black/10 hover:text-[#0B0B12] transition-colors" title="Sign out" aria-label="Sign out">
          <LogOut className="w-4 h-4 shrink-0" />
        </button>
      </div>
      </nav>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}