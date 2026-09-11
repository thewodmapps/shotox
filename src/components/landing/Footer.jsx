import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Globe } from 'lucide-react';
import { Brand } from '@/components/Logo';

const COLS = [
  {
    title: 'Product',
    links: [
      { label: 'How it works', to: '/#how-it-works' },
      { label: 'Features', to: '/#features' },
      { label: 'Templates', to: '/#templates' },
      { label: 'Pricing', to: '/#pricing' },
      { label: 'FAQs', to: '/#faq' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', to: '/blog' },
      { label: 'Privacy Policy', to: '/privacy' },
      { label: 'Terms of Service', to: '/terms' },
      { label: 'Support', to: 'mailto:thewodmapps@gmail.com' },
    ],
  },
];

const SOCIAL = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/atravellerguy/', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://www.youtube.com/@thewodmapps', label: 'YouTube' },
  { icon: Globe, href: 'https://apps.thewodm.com/', label: 'Website' },
];

export default function Footer() {
  return (
    <footer className="bg-[#0B0B12] text-white/50 border-t border-white/10 pt-14 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          <div className="col-span-2">
            <Brand to="/" size={28} textClass="text-white" />
            <p className="mt-4 text-sm max-w-sm leading-relaxed">Create beautiful, customized app screenshots for the Apple App Store & Google Play — in minutes, not days.</p>
            <div className="flex items-center gap-3 mt-5">
              {SOCIAL.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="w-11 h-11 rounded-xl grid place-items-center bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                  <s.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          {COLS.map((col) => (
            <div key={col.title}>
              <h2 className="text-white text-sm font-semibold mb-4">{col.title}</h2>
              <ul className="space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.to.startsWith('mailto:') ? (
                      <a href={l.to} className="hover:text-white transition-colors">{l.label}</a>
                    ) : (
                      <Link to={l.to} className="hover:text-white transition-colors">{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Shotox. All rights reserved.</p>
          <p className="text-white/30">AI app screenshot generator for the Apple App Store & Google Play.</p>
        </div>
      </div>
    </footer>
  );
}