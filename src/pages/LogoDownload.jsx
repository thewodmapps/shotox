import React, { useEffect, useRef } from 'react';
import { Logo } from '@/components/Logo';

// Exact brand mark used across the site (Logo.jsx), rendered full-bleed (no rounded gaps)
// so the gradient covers the entire 512×512 canvas.
const SVG_MARKUP = (id) => `
<svg width="512" height="512" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
      <stop stop-color="#7C3AED"/>
      <stop offset="0.5" stop-color="#EC4899"/>
      <stop offset="1" stop-color="#F97316"/>
    </linearGradient>
  </defs>
  <rect width="40" height="40" fill="url(#${id})"/>
  <path d="M29 12 C 29 9.5, 13 9.5, 13 15 C 13 19, 29 19, 29 23 C 29 28.5, 13 28.5, 13 26" stroke="rgba(255,255,255,0.45)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M28 13 C 28 10.5, 12 10.5, 12 16 C 12 20, 28 20, 28 24 C 28 29.5, 12 29.5, 12 27" stroke="white" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

export default function LogoDownload() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const id = 'zg-' + Math.random().toString(36).slice(2);
    const svg = SVG_MARKUP(id);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const img = new Image();
    img.onload = () => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(img, 0, 0, 512, 512);
      URL.revokeObjectURL(url);
      // auto-download
      const a = document.createElement('a');
      a.href = canvasRef.current.toDataURL('image/png');
      a.download = 'shotox-logo-512.png';
      a.click();
    };
    img.src = url;
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B12] flex flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-center gap-2 text-white font-display font-bold text-xl">
        <Logo size={28} /> Shotox
      </div>
      <p className="text-white/60 text-sm">Rendering exact 512×512 PNG…</p>
      <canvas ref={canvasRef} width="512" height="512" className="rounded-2xl shadow-2xl" />
      <p className="text-white/40 text-xs">The file downloaded automatically. If not, right-click the image → Save image as.</p>
    </div>
  );
}