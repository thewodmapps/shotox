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
    className: 'bg-gradient-to-r from-sky-500 to-blue-600 shadow-lg shadow-blue-500/30 ring-1 ring-white/15',
    iconClass: 'text-white',
  },
  yearly: {
    label: 'Pro Yearly',
    icon: Sparkles,
    className: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/30 ring-1 ring-white/15',
    iconClass: 'text-white',
  },
  lifetime: {
    label: 'Lifetime',
    icon: InfinityIcon,
    className: 'bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg shadow-pink-500/30 ring-1 ring-white/15',
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
    <header className="sticky top-0 z-30 min-h-16 safe-top bg-[#08080d]/70 backdrop-blur-xl text-white flex items-center gap-2 sm:gap-3 px-4 sm:px-6 border-b border-white/10 no-callout">
      <Brand to="/" size={26} textClass="text-white" />
      <div className="ml-auto flex items-center gap-1.5">
        {badge ? (
          <button onClick={goPricing} title="View plans" className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white ${badge.className} hover:brightness-110 transition`}>
            <badge.icon className={`w-3.5 h-3.5 ${badge.iconClass}`} /> {badge.label}
          </button>
        ) : (
          <Link to="/#pricing" className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white bg-gradient-to-r from-violet-500 to-pink-500 hover:brightness-110 transition shadow-lg shadow-pink-500/30 ring-1 ring-white/15">
            <Crown className="w-3.5 h-3.5 text-yellow-200" /> Upgrade
          </Link>
        )}
        <button onClick={() => setAccountOpen(true)} className="w-10 h-10 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Account" aria-label="Account">
          <UserCircle2 className="w-4 h-4" />
        </button>
        <button onClick={() => base44.auth.logout('/')} className="w-10 h-10 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Sign out" aria-label="Sign out">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}