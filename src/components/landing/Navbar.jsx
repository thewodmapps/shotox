import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-4 pr-2 py-2">
        <Brand to="/" size={32} textClass="text-[#0B0B12]" />
        <div className="hidden md:flex items-center gap-7 text-sm text-[#0B0B12]/70">
          <a href="#templates" className="hover:text-[#0B0B12] transition-colors">Templates</a>
          <a href="#features" className="hover:text-[#0B0B12] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#0B0B12] transition-colors">Pricing</a>
        </div>
        <Button asChild className="rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-5">
          <Link to="/projects">{isAuthenticated ? 'Dashboard' : 'Get started free'}</Link>
        </Button>
      </nav>
    </header>
  );
}