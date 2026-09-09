import React, { useState } from 'react';
import { X, Link2, Check, Twitter, Facebook, Linkedin, MessageCircle, Send, Mail } from 'lucide-react';

const slugify = (s) =>
  (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'design';

const SOCIAL = [
  { id: 'x', label: 'X', brand: '#000000', icon: Twitter, share: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
  { id: 'fb', label: 'Facebook', brand: '#1877F2', icon: Facebook, share: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { id: 'li', label: 'LinkedIn', brand: '#0A66C2', icon: Linkedin, share: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { id: 'wa', label: 'WhatsApp', brand: '#25D366', icon: MessageCircle, share: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
  { id: 'tg', label: 'Telegram', brand: '#229ED9', icon: Send, share: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
  { id: 'gm', label: 'Gmail', brand: '#EA4335', icon: Mail, share: (url, text) => `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}` },
];

export default function ShareModal({ open, url, title = 'My Shotox design', onClose }) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  const brandUrl = `https://shotox.in/${slugify(title)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brandUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const openShare = (fn) => window.open(fn(brandUrl, title), '_blank', 'noopener,noreferrer,width=620,height=540');

  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#15101c] p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-white">Share design</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {SOCIAL.map(({ id, label, brand, icon: Icon, share }) => (
            <button
              key={id}
              onClick={() => openShare(share)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <span
                className="w-12 h-12 rounded-2xl grid place-items-center bg-white/5 border border-white/10 text-white/80 transition-all duration-200 group-hover:scale-105 group-hover:text-white group-hover:border-transparent"
                style={{ '--brand': brand }}
              >
                <span
                  className="w-full h-full rounded-2xl grid place-items-center transition-colors duration-200 group-hover:bg-[var(--brand)]"
                >
                  <Icon className="w-5 h-5" />
                </span>
              </span>
              <span className="text-[11px] text-white/60 group-hover:text-white transition-colors">{label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 pl-3 pr-1.5 py-1.5">
          <Link2 className="w-4 h-4 text-white/40 shrink-0" />
          <input
            readOnly
            value={brandUrl}
            onFocus={(e) => e.target.select()}
            className="flex-1 min-w-0 bg-transparent text-sm text-white/70 outline-none"
          />
          <button
            onClick={copy}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              copied ? 'bg-green-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  );
}