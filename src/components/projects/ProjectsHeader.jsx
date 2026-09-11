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
  const navigate = useNavigate();
  const goPricing = () => navigate('/#pricing');

  return (
    <header className="sticky top-0 z-30 min-h-16 safe-top bg-[#08080d]/70 backdrop-blur-xl text-white flex items-center gap-2 sm:gap-3 px-4 sm:px-6 border-b border-white/10 no-callout">
      <Brand to="/" size={26} textClass="text-white" />
      <div className="ml-auto flex items-center gap-1.5">
        {badge ? (
          <button onClick={goPricing} title="View plans" className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full ${badge.className} hover:opacity-90 transition-opacity`}>
            <badge.icon className={`w-3.5 h-3.5 ${badge.iconClass}`} /> {badge.label}
          </button>
        ) : (
          <Link to="/#pricing" className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/20">
            <Crown className="w-3.5 h-3.5 text-yellow-200" /> Upgrade
          </Link>
        )}
        <button onClick={() => setAccountOpen(true)} className="w-9 h-9 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Account" aria-label="Account">
          <UserCircle2 className="w-4 h-4" />
        </button>
        <button onClick={() => base44.auth.logout('/')} className="w-9 h-9 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Sign out" aria-label="Sign out">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}