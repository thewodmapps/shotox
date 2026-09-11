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
    className: 'bg-lime-400/15 border border-lime-300/40 text-lime-100 shadow-lg shadow-lime-500/20',
    iconClass: 'text-lime-300',
  },
  yearly: {
    label: 'Pro Yearly',
    icon: Sparkles,
    className: 'bg-violet-500/20 border border-violet-400/50 text-violet-100 shadow-lg shadow-violet-500/30',
    iconClass: 'text-violet-200',
  },
  lifetime: {
    label: 'Lifetime',
    icon: InfinityIcon,
    className: 'bg-gradient-to-r from-amber-400 to-pink-500 border border-amber-300/50 text-white shadow-lg shadow-pink-500/40',
    iconClass: 'text-white',
  },
};

export default function ProjectsHeader() {
  const { user } = useAuth();
  const badge = PLAN_BADGE[user?.plan];
  const [accountOpen, setAccountOpen] = useState(false);
  const navigate = useNavigate();
  const goPricing = () => navigate('/#pricing');

  return (
    <header className="sticky top-0 z-30 min-h-16 safe-top bg-[#0B0B12] text-white flex items-center gap-3 px-3 sm:px-4 border-b border-white/10 no-callout">
      <Brand to="/" size={24} textClass="text-white" />
      <div className="ml-auto flex items-center gap-3">
        {badge ? (
          <button onClick={goPricing} title={badge.label} className={`inline-flex items-center text-xs font-semibold p-2 rounded-full ${badge.className} hover:opacity-90 transition-opacity`}>
            <badge.icon className={`w-4 h-4 ${badge.iconClass}`} />
          </button>
        ) : (
          <Link to="/#pricing" className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30">
            <Crown className="w-3.5 h-3.5 text-yellow-200" /> Upgrade
          </Link>
        )}
        <button onClick={() => setAccountOpen(true)} className="w-11 h-11 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Account" aria-label="Account">
          <UserCircle2 className="w-4 h-4" />
        </button>
        <button onClick={() => base44.auth.logout('/')} className="w-11 h-11 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Sign out" aria-label="Sign out">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}