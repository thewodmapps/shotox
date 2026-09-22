import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from './SectionHeading';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Shotox enquiry from ${name || 'a visitor'}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ''}`);
    window.location.href = `mailto:thewodmapps@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-white">
      <div className="mx-auto max-w-5xl px-4">
        <SectionHeading align="center" eyebrow="Contact" title={<>Let's talk <span className="shotox-gradient-text">Shotox</span></>} subtitle="Questions, feedback, or a template request? Drop a message — we read everything." />

        <div className="mt-12 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <a href="mailto:thewodmapps@gmail.com" className="glass-card bg-[#0B0B12]/[0.03] border-black/10 text-[#0B0B12] hover:bg-[#0B0B12]/[0.06]">
              <Mail className="w-4 h-4" /> thewodmapps@gmail.com
            </a>
            <div className="glass-card bg-[#0B0B12]/[0.03] border-black/10 text-[#0B0B12]">
              <MessageCircle className="w-4 h-4" /> Avg. reply within 24 hours
            </div>
            <div className="glass-card bg-[#0B0B12]/[0.03] border-black/10 text-[#0B0B12]">
              <MapPin className="w-4 h-4" />&nbsp;India · Worldwide
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full max-w-2xl rounded-3xl bg-[#0B0B12]/[0.03] border border-black/10 p-6 sm:p-8 flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="h-11 w-full rounded-xl bg-white border border-black/10 px-4 text-sm text-[#0B0B12] placeholder:text-[#0B0B12]/40 focus:outline-none focus:ring-2 focus:ring-[#0B0B12]/20"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="h-11 w-full rounded-xl bg-white border border-black/10 px-4 text-sm text-[#0B0B12] placeholder:text-[#0B0B12]/40 focus:outline-none focus:ring-2 focus:ring-[#0B0B12]/20"
              />
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you need…"
              rows={5}
              className="w-full rounded-xl bg-white border border-black/10 px-4 py-3 text-sm text-[#0B0B12] placeholder:text-[#0B0B12]/40 focus:outline-none focus:ring-2 focus:ring-[#0B0B12]/20 resize-none"
            />
            <Button type="submit" className="ml-auto rounded-xl bg-[#0B0B12] hover:bg-[#0B0B12]/90 text-white px-6 h-11">
              <Send className="w-4 h-4" /> Send message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}