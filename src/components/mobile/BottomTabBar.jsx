import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FolderOpen, LayoutTemplate, UserCircle2 } from 'lucide-react';
import AccountModal from '@/components/account/AccountModal';

const TABS = [
  { key: 'projects', label: 'Projects', icon: FolderOpen, target: '/projects' },
  { key: 'templates', label: 'Templates', icon: LayoutTemplate, target: '/projects', hash: '#templates-gallery' },
  { key: 'account', label: 'Account', icon: UserCircle2 },
];

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);

  const isActive = (t) => {
    if (t.key === 'account') return false;
    return location.pathname === t.target;
  };

  const handle = (t) => {
    if (t.key === 'account') {
      setAccountOpen(true);
      return;
    }
    const onTarget = location.pathname === t.target;
    if (onTarget && !t.hash) {
      // re-select on active tab → reset to root (scroll to top)
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (t.hash) {
      if (location.pathname === t.target) {
        document.querySelector(t.hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(t.target);
        setTimeout(() => document.querySelector(t.hash)?.scrollIntoView({ behavior: 'smooth' }), 160);
      }
      return;
    }
    navigate(t.target);
  };

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 flex items-stretch bg-[#08080d]/90 backdrop-blur-xl border-t border-white/10 no-callout"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        aria-label="Primary"
      >
        {TABS.map((t) => {
          const active = isActive(t);
          return (
            <button
              key={t.key}
              onClick={() => handle(t)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 text-sm transition-colors no-callout ${
                active ? 'text-white' : 'text-white/55 hover:text-white'
              }`}
            >
              <t.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{t.label}</span>
            </button>
          );
        })}
      </nav>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}