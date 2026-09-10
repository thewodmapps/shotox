import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Brand } from '@/components/Logo';
import { useAuth } from '@/lib/AuthContext';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '#features', label: 'Features' },
  { href: '#templates', label: 'Templates' },
  { href: '/blog', label: 'Blog' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQs' },
];

export default function Navbar() {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl flex items-center justify-between rounded-2xl bg-white/90 backdrop-blur-xl border border-black/5 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.35)] pl-4 pr-2 py-2 no-callout">
        <Brand to="/" size={32} textClass="text-[#0B0B12]" />
        <div className="hidden md:flex items-center gap-7 text-sm text-[#0B0B12]/70">
          {LINKS.map(renderLink)}
        </div>
        <div className="flex items-center gap-1">
          <Button asChild className="rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-5 hidden sm:inline-flex">
            <Link to="/projects">{isAuthenticated ? 'Dashboard' : 'Get started'}</Link>
          </Button>
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
            <Button asChild className="mt-2 rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white">
              <Link to="/projects" onClick={() => setOpen(false)}>{isAuthenticated ? 'Dashboard' : 'Get started'}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}