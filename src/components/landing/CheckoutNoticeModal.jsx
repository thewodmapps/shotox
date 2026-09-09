import React from 'react';
import { ExternalLink, X } from 'lucide-react';

export default function CheckoutNoticeModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 backdrop-blur-md p-6" onClick={onClose}>
      <div
        className="relative w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#15151f] to-[#0b0b12] border border-white/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-48 rounded-full bg-gradient-to-r from-violet-600/40 to-pink-600/40 blur-[90px] pointer-events-none" />
        <button onClick={onClose} className="absolute top-3.5 right-3.5 z-10 p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">
          <X className="w-4 h-4" />
        </button>
        <div className="relative p-7 text-center">
          <div className="mx-auto w-14 h-14 grid place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-pink-500/30 border border-white/10">
            <ExternalLink className="w-6 h-6 text-pink-300" />
          </div>
          <h3 className="mt-5 font-display text-xl font-bold text-white tracking-tight">Checkout runs on the live app</h3>
          <p className="mt-2 text-sm text-white/55 leading-relaxed">
            Stripe checkout can't open inside the editor preview. Continue to the Shotox app in this tab to choose your plan.
          </p>
          <button
            onClick={() => {
              const url = "https://shotox.in/#pricing";
              try {
                window.top.location.href = url;
              } catch (e) {
                window.open(url, "_blank", "noopener");
              }
              onClose();
            }}
            className="mt-6 w-full h-11 rounded-xl bg-gradient-to-r from-violet-500 to-pink-500 hover:opacity-90 text-white font-medium inline-flex items-center justify-center gap-2 transition-opacity"
          >
            Continue to Shotox <ExternalLink className="w-4 h-4" />
          </button>
          <button onClick={onClose} className="mt-2 w-full h-10 rounded-xl text-sm text-white/45 hover:text-white/70 transition-colors">
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}