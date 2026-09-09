import React from 'react';
import { Link } from 'react-router-dom';
import { Brand } from '@/components/Logo';

export default function Footer() {
  return (
    <footer className="bg-[#0B0B12] text-white/50 border-t border-white/10 pt-14 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
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