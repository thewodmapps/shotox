import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-4 pr-2 py-2">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-[#0B0B12] tracking-tight">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-pink-500 grid place-items-center text-white text-sm shadow-lg shadow-violet-500/30">Z</span>
          Zubilo
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-[#0B0B12]/70">
          <Link to="/projects" className="hover:text-[#0B0B12] transition-colors">Templates</Link>
          <a href="#features" className="hover:text-[#0B0B12] transition-colors">Features</a>
          <a href="#pricing" className="hover:text-[#0B0B12] transition-colors">Pricing</a>
        </div>
        <Button asChild className="rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-5">
          <Link to="/projects">Get started free</Link>
        </Button>
      </nav>
    </header>
  );
}