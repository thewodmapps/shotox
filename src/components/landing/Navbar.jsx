import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Crown, Check, Sparkles, Infinity as InfinityIcon, LogOut, UserCircle2 } from 'lucide-react';
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
  monthly: { label: 'Pro Monthly', icon: Check, className: 'bg-emerald-50 border border-emerald-200 text-emerald-700', iconClass: 'text-emerald-600' },
  yearly: { label: 'Pro Yearly', icon: Sparkles, className: 'bg-violet-50 border border-violet-200 text-violet-700', iconClass: 'text-violet-600' },
  lifetime: { label: 'Lifetime', icon: InfinityIcon, className: 'bg-amber-50 border border-amber-200 text-amber-700', iconClass: 'text-amber-600' },
};

export default function Navbar() {
  const { isAuthenticated, user } = useAuth();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const badge = PLAN_BADGE[user?.plan];

  const handleSection = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === '/') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 120);
    }
  };

  const renderLink = (l) => {
    const isSection = l.href.startsWith('#');
    if (!isSection) {
      return (
        <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="hover:text-[#0B0B12] transition-colors">
          {l.label}
        </Link>
      );
    }
    return (
      <a key={l.href} href={l.href} onClick={(e) => handleSection(e, l.href)} className="hover:text-[#0B0B12] transition-colors">
        {l.label}
      </a>
    );
  };

  const goPricing = () => { setOpen(false); navigate('/#pricing'); };

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-4 pr-2 py-2 no-callout">
        <Brand to="/" size={32} textClass="text-[#0B0B12]" />
        <div className="hidden md:flex items-center gap-7 text-sm text-[#0B0B12]/70">
          {LINKS.map(renderLink)}
        </div>
        <div className="flex items-center gap-1.5">
          {isAuthenticated ? (
            <>
              <button onClick={goPricing} title="View plans" className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-full ${badge ? badge.className : 'bg-gradient-to-r from-violet-500 to-pink-500 text-white'} hover:opacity-90 transition-opacity`}>
                {badge ? <badge.icon className={`w-3.5 h-3.5 ${badge.iconClass}`} /> : <Crown className="w-3.5 h-3.5 text-yellow-200" />}
                <span>{badge ? badge.label : 'Upgrade'}</span>
              </button>
              <Button asChild className="hidden sm:inline-flex rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-4">
                <Link to="/projects">Dashboard</Link>
              </Button>
              <button onClick={() => setAccountOpen(true)} aria-label="Account" title="Account" className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[#0B0B12]/70 hover:bg-black/5 transition-colors">
                <UserCircle2 className="w-5 h-5" />
              </button>
              <button onClick={() => base44.auth.logout('/')} aria-label="Sign out" title="Sign out" className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-[#0B0B12]/70 hover:bg-black/5 transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </>
          ) : (
            <Button asChild className="rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-5 hidden sm:inline-flex">
              <Link to="/projects">Get started free</Link>
            </Button>
          )}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#0B0B12] hover:bg-black/5 transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden absolute top-20 inset-x-4 rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] p-4">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => {
              const isSection = l.href.startsWith('#');
              const cls = 'px-3 py-3 rounded-xl text-sm text-[#0B0B12]/80 hover:bg-black/5 transition-colors';
              if (!isSection) {
                return (
                  <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={cls}>
                    {l.label}
                  </Link>
                );
              }
              return (
                <a key={l.href} href={l.href} onClick={(e) => handleSection(e, l.href)} className={cls}>
                  {l.label}
                </a>
              );
            })}
            {isAuthenticated ? (
              <>
                <button onClick={() => { setAccountOpen(true); setOpen(false); }} className="px-3 py-3 rounded-xl text-sm text-[#0B0B12]/80 hover:bg-black/5 transition-colors text-left flex items-center gap-2">
                  <UserCircle2 className="w-4 h-4" /> Account
                </button>
                <button onClick={() => base44.auth.logout('/')} className="px-3 py-3 rounded-xl text-sm text-[#0B0B12]/80 hover:bg-black/5 transition-colors text-left flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign out
                </button>
                <Button asChild className="mt-2 rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white">
                  <Link to="/projects" onClick={() => setOpen(false)}>Dashboard</Link>
                </Button>
              </>
            ) : (
              <Button asChild className="mt-2 rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white">
                <Link to="/projects" onClick={() => setOpen(false)}>Get started free</Link>
              </Button>
            )}
          </div>
        </div>
      )}
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}