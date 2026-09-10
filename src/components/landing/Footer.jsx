import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '@/components/Logo';

// TODO: replace with your real Google Play listing URL once published.
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps';

const PlayBadge = () => (
  <a
    href={GOOGLE_PLAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-black rounded-xl px-5 py-2.5 border border-white/15 hover:border-white/30 hover:scale-[1.02] transition-all"
  >
    <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" aria-hidden="true">
      <path fill="#34A853" d="M4 3.2c0-1 .8-1.5 1.7-1l13.2 7.6c.9.5.9 1.9 0 2.4L5.7 19.8c-.9.5-1.7 0-1.7-1z" opacity="0" />
      <path fill="#fff" d="M5.2 2.4 18 12 5.2 21.6c-.8-.4-1.2-1.1-1.2-2V4.4c0-.9.4-1.6 1.2-2z" />
    </svg>
    <span className="text-left leading-tight">
      <span className="block text-[10px] tracking-wide text-white/60 uppercase">Get it on</span>
      <span className="block text-lg font-medium text-white -mt-0.5">Google Play</span>
    </span>
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-[#0B0B12] text-white/50 border-t border-white/10 pt-14 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600/25 via-fuchsia-600/15 to-pink-600/25 border border-white/10 px-6 sm:px-10 py-8 sm:py-10 mb-12">
          <div className="absolute -top-24 -right-16 w-72 h-72 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">Take Shotox with you</h3>
              <p className="mt-2 text-sm text-white/55 max-w-md">Design stunning app screenshots on the go. Download the Shotox app from the Google Play Store.</p>
            </div>
            <PlayBadge />
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Brand to="/" size={28} textClass="text-white" />
            <p className="mt-4 text-sm max-w-sm leading-relaxed">Create beautiful, customized app screenshots for the App Store & Google Play — in minutes, not days.</p>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="/#templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="/#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="/#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/#faq" className="hover:text-white transition-colors">FAQs</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <a href="mailto:thewodmapps@gmail.com" className="hover:text-white transition-colors text-sm">Support</a>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p>© {new Date().getFullYear()} Shotox. All rights reserved.</p>
          <p className="text-white/30">App screenshot generator for App Store & Google Play.</p>
        </div>
      </div>
    </footer>
  );
}