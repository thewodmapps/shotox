import React from 'react';
import { Brand } from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B12] text-white/50 border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <Brand to="/" size={24} textClass="text-white" />
        <p>App screenshot generator for App Store & Google Play.</p>
        <p>© {new Date().getFullYear()} Shotox</p>
      </div>
    </footer>
  );
}