import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, FolderOpen, LayoutTemplate, UserCircle2, LogOut, Sparkles, ArrowRight } from 'lucide-react';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';
import { base44 } from '@/api/base44Client';
import { isPro } from '@/lib/entitlements';
import AccountModal from '@/components/account/AccountModal';
import ThemeToggle from '@/components/ThemeToggle';

const PLAN_LABEL = { monthly: 'Pro Monthly', yearly: 'Pro Yearly', lifetime: 'Lifetime' };

const MenuItem = ({ icon: Icon, label, onClick, active, danger }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-medium transition-colors no-callout ${
      danger ? 'text-red-300 hover:bg-red-500/10' : active ? 'bg-white/10 text-white' : 'text-white/75 hover:bg-white/5 hover:text-white'
    }`}
  >
    <Icon className="w-5 h-5" /> {label}
  </button>
);

export default function MobileMenu({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const pro = isPro(user);
  const [accountOpen, setAccountOpen] = useState(false);

  const planLabel = pro ? (PLAN_LABEL[user.plan] || 'Pro') : 'Free';

  const go = (path, hash) => {
    onClose();
    if (hash) {
      if (location.pathname === path) {
        setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 80);
      } else {
        navigate(path);
        setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 180);
      }
      return;
    }
    if (location.pathname === path) window.scrollTo({ top: 0, behavior: 'smooth' });
    else navigate(path);
  };

  const handleAccount = () => {
    onClose();
    setTimeout(() => setAccountOpen(true), 200);
  };

  const handleSignOut = () => {
    onClose();
    base44.auth.logout('/');
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="mm-backdrop"
            className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
        )}
        {open && (
          <motion.aside
            key="mm-panel"
            className="fixed top-0 right-0 bottom-0 z-[80] w-[84%] max-w-sm bg-[#0B0B12] border-l border-white/10 flex flex-col md:hidden safe-top"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.28, ease: 'easeOut' }}
          >
            <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
              <Brand to="/" size={30} textClass="text-white" />
              <div className="flex items-center gap-1">
                <ThemeToggle className="w-10 h-10 text-white/70 hover:bg-white/10 hover:text-white" />
                <button onClick={onClose} className="w-10 h-10 grid place-items-center rounded-xl text-white/60 hover:bg-white/10 hover:text-white transition-colors" aria-label="Close menu">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="px-5 pt-5">
              {pro ? (
                <div className="rounded-2xl p-4 bg-gradient-to-br from-violet-600/30 to-pink-600/20 border border-white/10 flex items-center gap-3">
                  <span className="w-10 h-10 grid place-items-center rounded-xl bg-white/10 text-pink-200"><Sparkles className="w-5 h-5" /></span>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{planLabel}</p>
                    <p className="text-white/50 text-xs">All features unlocked</p>
                  </div>
                </div>
              ) : (
                <button onClick={() => { onClose(); navigate('/#pricing'); }} className="w-full rounded-2xl p-4 bg-gradient-to-br from-violet-500 to-pink-500 text-left flex items-center gap-3 shadow-lg shadow-pink-500/20">
                  <span className="w-10 h-10 grid place-items-center rounded-xl bg-white/20 text-white"><Sparkles className="w-5 h-5" /></span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm">Upgrade to Pro</p>
                    <p className="text-white/75 text-xs">Unlock all templates, devices & AI</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white shrink-0" />
                </button>
              )}
            </div>

            <nav className="px-3 py-4 space-y-1 flex-1 overflow-y-auto">
              <MenuItem icon={FolderOpen} label="Projects" active={location.pathname === '/projects'} onClick={() => go('/projects')} />
              <MenuItem icon={LayoutTemplate} label="Templates" onClick={() => go('/projects', '#templates-gallery')} />
              <MenuItem icon={UserCircle2} label="Account" onClick={handleAccount} />
            </nav>

            <div className="px-3 pb-6 pt-2 border-t border-white/10 safe-bottom">
              <MenuItem icon={LogOut} label="Sign out" onClick={handleSignOut} danger />
              <p className="text-center text-white/30 text-xs mt-4">© {new Date().getFullYear()} Shotox</p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}