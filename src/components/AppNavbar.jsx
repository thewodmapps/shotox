import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Crown, Check, Sparkles, Infinity as InfinityIcon, LogOut, UserCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import AccountModal from '@/components/account/AccountModal';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#templates', label: 'Templates' },
  { href: '/blog', label: 'Blog' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQs' },
];

const PLAN_BADGE = {
  monthly: { label: 'Pro Monthly', icon: Check, className: 'bg-lime-100 text-lime-800 border border-lime-200' },
  yearly: { label: 'Pro Yearly', icon: Sparkles, className: 'bg-violet-100 text-violet-700 border border-violet-200' },
  lifetime: { label: 'Lifetime', icon: InfinityIcon, className: 'bg-amber-100 text-amber-800 border border-amber-200' },
};

// The single unified navbar used across the entire website and app — same
// white floating-pill style and color everywhere.
export default function AppNavbar() {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [accountOpen, setAccountOpen] = useState(false);
  const badge = PLAN_BADGE[user?.plan];

  const goSection = (href) => {
    if (location.pathname === '/') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 140);
    }
  };

  const onLink = (e, l) => {
    if (l.href.startsWith('#')) { e.preventDefault(); goSection(l.href); }
  };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-4 pr-2 py-2 no-callout">
        <Brand to="/" size={32} textClass="text-[#0B0B12]" />
        <div className="hidden md:flex items-center gap-7 text-sm text-[#0B0B12]/70">
          {LINKS.map((l) => l.href.startsWith('#') ? (
            <a key={l.href} href={l.href} onClick={(e) => onLink(e, l)} className="hover:text-[#0B0B12] transition-colors">{l.label}</a>
          ) : (
            <Link key={l.href} to={l.href} className="hover:text-[#0B0B12] transition-colors">{l.label}</Link>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              {badge ? (
                <button onClick={() => goSection('#pricing')} title="View plans"
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 sm:px-3 rounded-full ${badge.className} hover:opacity-90 transition-opacity`}>
                  <badge.icon className="w-3.5 h-3.5" /> <span className="hidden sm:inline">{badge.label}</span>
                </button>
              ) : (
                <button onClick={() => goSection('#pricing')} title="Upgrade"
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 sm:px-3 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 text-white hover:opacity-90 transition-opacity">
                  <Crown className="w-3.5 h-3.5 text-yellow-200" /> <span className="hidden sm:inline">Upgrade</span>
                </button>
              )}
              <button onClick={() => setAccountOpen(true)} title="Account"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full text-[#0B0B12]/70 hover:bg-black/5 hover:text-[#0B0B12] transition-colors">
                <UserCircle2 className="w-4 h-4" /> Account
              </button>
              <button onClick={() => base44.auth.logout('/')} title="Sign out"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-full text-[#0B0B12]/70 hover:bg-black/5 hover:text-[#0B0B12] transition-colors">
                <LogOut className="w-4 h-4" /> Sign out
              </button>
            </>
          ) : (
            <Button asChild className="rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-5">
              <Link to="/projects">Get started free</Link>
            </Button>
          )}
        </div>
      </nav>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}