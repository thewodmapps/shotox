import React, { useState } from 'react';
import { X, Link2, Check, Twitter, Facebook, Linkedin, Send, Mail } from 'lucide-react';

const slugify = (s) =>
  (s || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'design';

const WhatsAppIcon = ({ className = '' }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const SOCIAL = [
  { id: 'x', label: 'X', brand: '#000000', icon: Twitter, share: (url, text) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
  { id: 'fb', label: 'Facebook', brand: '#1877F2', icon: Facebook, share: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` },
  { id: 'li', label: 'LinkedIn', brand: '#0A66C2', icon: Linkedin, share: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
  { id: 'wa', label: 'WhatsApp', brand: '#25D366', icon: WhatsAppIcon, share: (url, text) => `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}` },
  { id: 'tg', label: 'Telegram', brand: '#229ED9', icon: Send, share: (url, text) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}` },
  { id: 'gm', label: 'Gmail', brand: '#EA4335', icon: Mail, share: (url, text) => `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}` },
];

export default function ShareModal({ open, url, title = 'My Shotox design', projectId, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!open) return null;

  const brandUrl = `https://shotox.in/${slugify(title)}${projectId ? `?p=${projectId}` : ''}`;

  const handleShare = (share) => {
    window.open(share(brandUrl, title), '_blank', 'noopener,noreferrer');
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(brandUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

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
              type="button"
              onClick={() => handleShare(share)}
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