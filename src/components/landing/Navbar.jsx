import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowLeft, Download, Check, Loader2, Cloud, LogOut, Share2, AlertTriangle, RefreshCw, Crown, Sparkles, Infinity as InfinityIcon, UserCircle2 } from 'lucide-react';
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
  monthly: { label: 'Pro Monthly', icon: Check, className: 'bg-black/5 border border-black/10 text-[#0B0B12]', iconClass: 'text-lime-600' },
  yearly: { label: 'Pro Yearly', icon: Sparkles, className: 'bg-violet-100 border border-violet-300 text-violet-700', iconClass: 'text-violet-600' },
  lifetime: { label: 'Lifetime', icon: InfinityIcon, className: 'bg-gradient-to-r from-amber-100 to-pink-100 border border-amber-300 text-amber-700', iconClass: 'text-amber-600' },
};

const STATUS = {
  saved: { icon: Check, label: 'Saved' },
  dirty: { icon: Cloud, label: 'Unsaved' },
  saving: { icon: Loader2, label: 'Saving…' },
  error: { icon: AlertTriangle, label: 'Save failed' },
};

export default function Navbar({
  variant = 'site',
  appBar = false,
  project,
  status = 'saved',
  exporting = false,
  onRename,
  onExport,
  onShare,
  onRetry,
}) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [dlOpen, setDlOpen] = useState(false);
  const [picked, setPicked] = useState(null);

  const isEditor = variant === 'editor';
  const badge = PLAN_BADGE[user?.plan];
  const S = STATUS[status] || STATUS.saved;

  const goPricing = () => {
    setOpen(false);
    const scroll = () => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    if (location.pathname === '/') { scroll(); return; }
    navigate('/');
    let attempts = 0;
    const poll = () => {
      if (document.getElementById('pricing')) { scroll(); return; }
      if (attempts++ < 60) setTimeout(poll, 30);
    };
    setTimeout(poll, 50);
  };

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

  const renderLink = (l, cls) => {
    const isSection = l.href.startsWith('#');
    if (!isSection) return <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={cls}>{l.label}</Link>;
    return <a key={l.href} href={l.href} onClick={(e) => handleSection(e, l.href)} className={cls}>{l.label}</a>;
  };

  const opts = [
    { key: 'current-png', which: 'current', format: 'png', label: 'Current slide', sub: 'PNG · single image' },
    { key: 'current-jpeg', which: 'current', format: 'jpeg', label: 'Current slide', sub: 'JPEG · single image' },
    { key: 'all-png', which: 'all', format: 'png', label: 'All slides', sub: 'PNG · ZIP archive' },
    { key: 'all-jpeg', which: 'all', format: 'jpeg', label: 'All slides', sub: 'JPEG · ZIP archive' },
  ];
  const choose = (o) => {
    setPicked(o.key);
    setTimeout(() => { setDlOpen(false); onExport?.(o.which, o.format); setTimeout(() => setPicked(null), 300); }, 260);
  };

  const renderPlan = (withLabel) => badge ? (
    <button onClick={goPricing} title="View plans" className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full ${withLabel ? 'px-3 py-1.5' : 'w-9 h-9 justify-center p-0'} ${badge.className} hover:opacity-90 transition-opacity`}>
      <badge.icon className={`w-4 h-4 ${badge.iconClass}`} /> {withLabel && <span>{badge.label}</span>}
    </button>
  ) : (
    <button onClick={goPricing} title="Upgrade" className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full text-white ${withLabel ? 'px-3 py-1.5' : 'w-9 h-9 justify-center p-0'} bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 transition-opacity`}>
      <Crown className="w-4 h-4 text-yellow-200" /> {withLabel && <span>Upgrade</span>}
    </button>
  );

  const renderAccount = (withLabel) => (
    <button onClick={() => { setAccountOpen(true); setOpen(false); }} title="Account" aria-label="Account" className={`inline-flex items-center justify-center text-sm font-medium rounded-full bg-black/5 border border-black/10 text-[#0B0B12]/80 hover:bg-black/10 transition-colors ${withLabel ? 'gap-1.5 px-3 py-1.5' : 'w-9 h-9 p-0'}`}>
      <UserCircle2 className="w-4 h-4 shrink-0" /> {withLabel && <span>Account</span>}
    </button>
  );

  const renderSignOut = (withLabel) => (
    <button onClick={() => base44.auth.logout('/')} title="Sign out" aria-label="Sign out" className={`inline-flex items-center justify-center text-sm font-medium rounded-full bg-black/5 border border-black/10 text-[#0B0B12]/80 hover:bg-black/10 transition-colors ${withLabel ? 'gap-1.5 px-3 py-1.5' : 'w-9 h-9 p-0'}`}>
      <LogOut className="w-4 h-4 shrink-0" /> {withLabel && <span>Sign out</span>}
    </button>
  );

  const linkCls = 'px-3 py-2 rounded-lg text-[#0B0B12]/80 hover:bg-black/5 transition-colors';

  return (
    <header className="fixed top-3 inset-x-0 z-50 flex justify-center px-3 safe-top no-callout">
      <nav className="w-full max-w-5xl flex items-center gap-1.5 rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-2 pr-2 py-2">
        {isEditor && (
          <Link to="/projects" aria-label="Back to projects" className="w-9 h-9 shrink-0 grid place-items-center rounded-lg text-[#0B0B12] hover:bg-black/5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        )}
        <Brand to="/" size={28} textClass="text-[#0B0B12]" className={isEditor ? 'hidden sm:flex' : ''} />
        {isEditor && (
          <input
            value={project?.name || ''}
            onChange={(e) => onRename?.(e.target.value)}
            className="flex-1 min-w-0 bg-transparent text-sm font-medium text-[#0B0B12] outline-none rounded-md px-2 py-1.5 hover:bg-black/5 focus:bg-black/10 transition-colors"
            aria-label="Project name"
          />
        )}
        {!isEditor && (
          <div className="hidden md:flex items-center gap-1 ml-2 text-sm text-[#0B0B12]/70">
            {LINKS.map((l) => renderLink(l, linkCls))}
          </div>
        )}
        {!isEditor && <div className="flex-1" />}
        {isEditor && (
          <>
            <span className="hidden md:flex items-center gap-1.5 text-xs text-[#0B0B12]/60 px-2 whitespace-nowrap">
              <S.icon className={`w-3.5 h-3.5 ${status === 'saving' ? 'animate-spin' : ''}`} /> {S.label}
            </span>
            {status === 'error' && onRetry && (
              <button onClick={onRetry} className="hidden md:inline-flex items-center gap-1.5 text-xs text-amber-600 hover:text-amber-500 px-2.5 py-1 rounded-full border border-amber-300 hover:bg-amber-50 transition-colors whitespace-nowrap">
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            )}
            <div className="relative shrink-0">
              <Button size="sm" disabled={exporting} onClick={() => setDlOpen((v) => !v)} className="bg-[#0B0B12] text-white hover:bg-[#0B0B12]/90 rounded-full px-3 sm:px-4">
                {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                <span className="hidden sm:inline ml-1.5">Download</span>
              </Button>
              {dlOpen && !exporting && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDlOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-50 w-60 rounded-2xl bg-white border border-black/10 shadow-2xl p-1.5">
                    {opts.map((o) => {
                      const active = picked === o.key;
                      return (
                        <button key={o.key} onClick={() => choose(o)} className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left transition-colors ${active ? 'bg-violet-100 text-[#0B0B12]' : 'text-[#0B0B12]/80 hover:bg-black/5'}`}>
                          <span className={`grid place-items-center w-8 h-8 rounded-lg shrink-0 ${active ? 'bg-violet-600 text-white' : 'bg-black/5 text-[#0B0B12]/70'}`}>
                            {active ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium">{o.label}</span>
                            <span className="block text-xs text-[#0B0B12]/50">{o.sub}</span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
            <button onClick={onShare} className="w-9 h-9 shrink-0 grid place-items-center rounded-lg text-[#0B0B12]/70 hover:bg-black/5 hover:text-[#0B0B12] transition-colors" title="Share design" aria-label="Share design">
              <Share2 className="w-4 h-4" />
            </button>
          </>
        )}
        {!isEditor && !appBar && (
          <Button asChild className="rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-5 hidden sm:inline-flex">
            <Link to="/projects">{isAuthenticated ? 'Dashboard' : 'Get started free'}</Link>
          </Button>
        )}
        {isAuthenticated && appBar && (
          <div className="flex items-center gap-1.5">
            {renderPlan(false)}
            {renderAccount(false)}
            {renderSignOut(false)}
          </div>
        )}
        {isAuthenticated && !isEditor && !appBar && (
          <div className="hidden md:flex items-center gap-1.5">
            {renderPlan(true)}
            {renderAccount(true)}
            {renderSignOut(true)}
          </div>
        )}
        {!isEditor && !appBar && (
          <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#0B0B12] hover:bg-black/5 transition-colors">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        )}
      </nav>

      {open && !isEditor && !appBar && (
        <div className="md:hidden absolute top-16 inset-x-3 rounded-2xl bg-white border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] p-5">
          <div className="flex flex-col gap-2">
            {!isEditor && LINKS.map((l) => {
              const isSection = l.href.startsWith('#');
              const cls = 'px-3 py-3.5 rounded-xl text-sm text-[#0B0B12]/80 hover:bg-black/5 transition-colors';
              if (!isSection) return <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className={cls}>{l.label}</Link>;
              return <a key={l.href} href={l.href} onClick={(e) => handleSection(e, l.href)} className={cls}>{l.label}</a>;
            })}
            {isEditor && (
              <button onClick={() => { onShare?.(); setOpen(false); }} className="px-3 py-3 rounded-xl text-sm text-left text-[#0B0B12]/80 hover:bg-black/5 transition-colors inline-flex items-center gap-2">
                <Share2 className="w-4 h-4" /> Share design
              </button>
            )}
            {!isEditor && (
              <Button asChild className="mt-3 rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white">
                <Link to="/projects" onClick={() => setOpen(false)}>{isAuthenticated ? 'Dashboard' : 'Get started free'}</Link>
              </Button>
            )}
          </div>
        </div>
      )}

      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </header>
  );
}