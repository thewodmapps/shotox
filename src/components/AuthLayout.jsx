import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Brand } from "@/components/Logo";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="relative min-h-screen flex bg-background">
      {/* Left — branded collage (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0B0B12] bg-grid">
        <motion.div
          className="absolute -top-32 -left-24 w-[460px] h-[460px] rounded-full bg-violet-600/45 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-pink-500/40 blur-[120px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[380px] h-[380px] rounded-full bg-orange-500/25 blur-[120px]"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          <Link to="/" className="inline-flex items-center gap-2.5 group w-fit">
            <Brand to="/" size={36} textClass="text-white" />
          </Link>

          <div className="max-w-md">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-display text-4xl xl:text-5xl font-bold tracking-tight leading-[1.05]">
                App screenshots that <span className="shotox-gradient-text">sell your app.</span>
              </h2>
              <p className="mt-5 text-white/60 text-lg leading-relaxed">
                Design stunning, store-ready screenshots for iPhone, iPad &amp; Android in minutes — no design skills needed.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { k: "20+", v: "Templates" },
                { k: "All", v: "Devices" },
                { k: "1‑click", v: "Export" },
              ].map((s, i) => (
                <motion.div
                  key={s.v}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-md px-4 py-4"
                >
                  <div className="font-display text-2xl font-bold">{s.k}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.v}</div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 text-white/45 text-sm">
            <div className="flex -space-x-2">
              {["#a78bfa", "#f472b6", "#fdba74", "#86efac"].map((c) => (
                <span key={c} className="w-7 h-7 rounded-full border-2 border-[#0B0B12]" style={{ background: c }} />
              ))}
            </div>
            Loved by 1,000+ indie devs &amp; studios
          </div>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="w-full lg:w-1/2 flex flex-col">
        <div className="flex items-center justify-between px-6 sm:px-10 pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <div className="lg:hidden">
            <Brand to="/" size={28} textClass="text-foreground" />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 sm:px-10 py-10">
          <div className="w-full max-w-md">
            <div className="mb-9">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 mb-5 shadow-[0_18px_40px_-12px_rgba(124,58,237,0.6)]">
                {Icon ? (
                  <Icon className="w-7 h-7 text-white" aria-hidden="true" />
                ) : (
                  <img
                    src="https://media.base44.com/images/public/6aa0ad9172db932d1d29336b/b3e63b968_shotox.png"
                    alt="Shotox"
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-foreground">{title}</h1>
              {subtitle && <p className="text-muted-foreground mt-2.5 text-base">{subtitle}</p>}
            </div>

            <div>{children}</div>

            {footer && (
              <p className="text-center text-sm text-muted-foreground mt-7">{footer}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}