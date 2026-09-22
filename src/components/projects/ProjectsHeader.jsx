import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, UserCircle2, Home } from 'lucide-react';
import { Brand } from '@/components/Logo';
import { base44 } from '@/api/base44Client';
import AccountModal from '@/components/account/AccountModal';

export default function ProjectsHeader() {
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-[#0B0B12] text-white border-b border-white/10 no-callout">
      <div className="safe-top" />
      <div className="min-h-16 flex items-center gap-3 px-3 sm:px-4">
      <Brand to="/" size={24} textClass="text-white" />
      <div className="ml-auto flex items-center gap-3">
        <Link to="/" className="w-11 h-11 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Home" aria-label="Home">
          <Home className="w-4 h-4" />
        </Link>
        <button onClick={() => setAccountOpen(true)} className="w-11 h-11 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Account" aria-label="Account">
          <UserCircle2 className="w-4 h-4" />
        </button>
        <button onClick={() => base44.auth.logout('/')} className="w-11 h-11 grid place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors" title="Sign out" aria-label="Sign out">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
      </div>
    </header>
  );
}