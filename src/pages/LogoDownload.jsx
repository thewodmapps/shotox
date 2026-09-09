import React, { useEffect } from 'react';
import { Logo } from '@/components/Logo';

const LOGO_URL =
  'https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/b3e63b968_shotox.png';

export default function LogoDownload() {
  useEffect(() => {
    const a = document.createElement('a');
    a.href = LOGO_URL;
    a.download = 'shotox-logo-512.png';
    a.target = '_blank';
    a.click();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B12] flex flex-col items-center justify-center gap-6 p-8">
      <div className="flex items-center gap-2 text-white font-display font-bold text-xl">
        <Logo size={28} /> Shotox
      </div>
      <p className="text-white/60 text-sm">Your 512×512 PNG is downloading…</p>
      <img src={LOGO_URL} width={512} height={512} alt="Shotox logo" className="rounded-3xl shadow-2xl" />
      <a href={LOGO_URL} download="shotox-logo-512.png" className="text-white/60 text-xs underline">Download manually</a>
    </div>
  );
}