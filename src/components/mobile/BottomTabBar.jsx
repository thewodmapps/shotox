import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Home as HomeIcon, FolderOpen, LayoutTemplate, MoreHorizontal, X,
  UserCircle2, LogOut, BookOpen, Tag, HelpCircle, Crown, Sparkles,
} from 'lucide-react';
import AccountModal from '@/components/account/AccountModal';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';

const TEMPLATES_HASH = '#templates-gallery';

// Primary tabs always visible on the bar; everything else folds into "More".
const PRIMARY = [
  { key: 'home', label: 'Home', icon: HomeIcon, to: '/' },
  { key: 'projects', label: 'Projects', icon: FolderOpen, to: '/projects' },
  { key: 'templates', label: 'Templates', icon: LayoutTemplate, to: '/projects', hash: TEMPLATES_HASH },
];

const ownerKey = (location) => {
  if (location.pathname === '/') return 'home';
  if (location.pathname === '/projects') return location.hash === TEMPLATES_HASH ? 'templates' : 'projects';
  return null;
};

// No bottom bar on the editor (it owns its own bottom edge) or auth/download flows.
const HIDDEN = ['/editor', '/login', '/register', '/forgot-password', '/reset-password', '/logo-download'];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  // Independent per-tab memory: each tab remembers its last path and restores it on switch.
  const [lastPath, setLastPath] = useState({
    home: '/',
    projects: '/projects',
    templates: `/projects${TEMPLATES_HASH}`,
  });

  const activeKey = ownerKey(location);
  const showBar = !HIDDEN.includes(location.pathname);

  useEffect(() => {
    if (!activeKey) return;
    const full = location.pathname + (location.hash || '');
    setLastPath((p) => (p[activeKey] === full ? p : { ...p, [activeKey]: full }));
  }, [activeKey, location.pathname, location.hash]);

  useEffect(() => {
    document.body.style.overflow = moreOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [moreOpen]);

  const goSection = (href) => {
    setMoreOpen(false);
    if (location.pathname === '/') {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 140);
    }
  };

  const handle = (t) => {
    const root = t.to + (t.hash || '');
    const current = location.pathname + (location.hash || '');
    if (activeKey === t.key) {
      // Re-selecting the active tab resets it to root.
      if (current === root) window.scrollTo({ top: 0, behavior: 'smooth' });
      else { navigate(root); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 60); }
      return;
    }
    navigate(lastPath[t.key] || root);
  };

  if (!showBar) return null;

  const moreItems = [
    { label: 'Features', icon: Sparkles, onClick: () => goSection('#features') },
    { label: 'Blog', icon: BookOpen, to: '/blog' },
    { label: 'Pricing', icon: Tag, onClick: () => goSection('#pricing') },
    { label: 'FAQs', icon: HelpCircle, onClick: () => goSection('#faq') },
    isAuthenticated
      ? { label: 'Account', icon: UserCircle2, onClick: () => { setMoreOpen(false); setAccountOpen(true); } }
      : { label: 'Get started', icon: Crown, to: '/projects' },
    isAuthenticated
      ? { label: 'Sign out', icon: LogOut, onClick: () => { setMoreOpen(false); base44.auth.logout('/'); } }
      : null,
  ].filter(Boolean);

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch bg-white/90 backdrop-blur-xl border-t border-black/5 no-callout"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Primary"
      >
        {PRIMARY.map((t) => {
          const active = activeKey === t.key;
          return (
            <button
              key={t.key}
              onClick={() => handle(t)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors no-callout min-h-11 ${active ? 'text-[#0B0B12]' : 'text-[#0B0B12]/45 hover:text-[#0B0B12]/70'}`}
            >
              <t.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setMoreOpen(true)}
          className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors no-callout min-h-11 text-[#0B0B12]/45 hover:text-[#0B0B12]/70"
        >
          <MoreHorizontal className="w-5 h-5" />
          <span className="text-sm font-medium">More</span>
        </button>
      </nav>

      {moreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMoreOpen(false)} />
          <div
            className="relative w-full rounded-t-3xl bg-white border-t border-black/5 shadow-2xl p-4"
            style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.5rem)' }}
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <span className="font-display font-bold text-[#0B0B12]">More</span>
              <button onClick={() => setMoreOpen(false)} className="w-9 h-9 grid place-items-center rounded-full hover:bg-black/5 no-callout" aria-label="Close">
                <X className="w-5 h-5 text-[#0B0B12]/60" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {moreItems.map((m, i) => (
                m.to ? (
                  <Link
                    key={i}
                    to={m.to}
                    onClick={() => setMoreOpen(false)}
                    className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-black/5 transition-colors no-callout text-[#0B0B12]/80"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-[#0B0B12]/5 text-[#0B0B12]">
                      <m.icon className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-medium">{m.label}</span>
                  </Link>
                ) : (
                  <button
                    key={i}
                    onClick={m.onClick}
                    className="flex flex-col items-center gap-2 py-3 rounded-2xl hover:bg-black/5 transition-colors no-callout text-[#0B0B12]/80"
                  >
                    <span className="grid place-items-center w-11 h-11 rounded-full bg-[#0B0B12]/5 text-[#0B0B12]">
                      <m.icon className="w-5 h-5" />
                    </span>
                    <span className="text-sm font-medium">{m.label}</span>
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}