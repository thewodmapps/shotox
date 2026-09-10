import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FolderOpen, LayoutTemplate, UserCircle2 } from 'lucide-react';
import AccountModal from '@/components/account/AccountModal';

const TEMPLATES_HASH = '#templates-gallery';

const TABS = [
  { key: 'projects', label: 'Projects', icon: FolderOpen, target: '/projects' },
  { key: 'templates', label: 'Templates', icon: LayoutTemplate, target: '/projects', hash: TEMPLATES_HASH },
  { key: 'account', label: 'Account', icon: UserCircle2 },
];

// Which tab "owns" the current location — drives the active highlight and the
// per-tab last-path memory so each tab keeps its own navigation stack.
const ownerKey = (location) => {
  if (location.pathname === '/editor') return 'projects';
  if (location.pathname === '/projects') return location.hash === TEMPLATES_HASH ? 'templates' : 'projects';
  return null;
};

export default function BottomTabBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [accountOpen, setAccountOpen] = useState(false);
  // Independent per-tab memory: each tab remembers its last path and restores it on switch.
  const [lastPath, setLastPath] = useState({
    projects: '/projects',
    templates: `/projects${TEMPLATES_HASH}`,
  });

  const activeKey = ownerKey(location);

  useEffect(() => {
    if (!activeKey) return;
    const full = location.pathname + (location.hash || '');
    setLastPath((p) => (p[activeKey] === full ? p : { ...p, [activeKey]: full }));
  }, [activeKey, location.pathname, location.hash]);

  const handle = (t) => {
    if (t.key === 'account') {
      setAccountOpen(true);
      return;
    }
    const rootPath = t.target + (t.hash || '');
    const current = location.pathname + (location.hash || '');
    if (activeKey === t.key) {
      // Re-selecting the active tab resets it to root.
      if (current === rootPath) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate(rootPath);
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 60);
      }
      return;
    }
    // Switching tabs restores the tab's remembered path (or its root if none).
    navigate(lastPath[t.key] || rootPath);
  };

  const isActive = (t) => activeKey === t.key;
  // The bar belongs to the Projects screen; the editor owns its own bottom edge.
  const showBar = location.pathname === '/projects';

  return (
    <>
      {showBar && (
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
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 text-sm transition-colors no-callout min-h-11 ${
                  active ? 'text-white' : 'text-white/55 hover:text-white'
                }`}
              >
                <t.icon className="w-5 h-5" />
                <span className="text-sm font-medium">{t.label}</span>
              </button>
            );
          })}
        </nav>
      )}
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}