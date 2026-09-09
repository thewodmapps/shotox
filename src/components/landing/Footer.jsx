import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B12] text-white/50 border-t border-white/10 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <Link to="/" className="flex items-center gap-2 text-white font-display font-semibold">
          <span className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-pink-500 grid place-items-center text-xs">Z</span> Zubilo
        </Link>
        <p>App screenshot generator for App Store & Google Play.</p>
        <p>© {new Date().getFullYear()} Zubilo</p>
      </div>
    </footer>
  );
}