import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Loader2, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { useAuth } from '@/lib/AuthContext';

const CONFIRM_PHRASE = 'DELETE';

export default function AccountModal({ open, onClose }) {
  const { user } = useAuth();
  const [typed, setTyped] = useState('');
  const [status, setStatus] = useState('idle'); // idle | working | done | error
  const [errorMsg, setErrorMsg] = useState('');

  const reset = () => {
    setTyped('');
    setStatus('idle');
    setErrorMsg('');
  };

  const close = () => {
    if (status === 'working') return;
    reset();
    onClose();
  };

  const confirm = async () => {
    if (typed.trim().toUpperCase() !== CONFIRM_PHRASE) return;
    setStatus('working');
    setErrorMsg('');
    try {
      await base44.functions.invoke('deleteAccount', {});
      setStatus('done');
      // give the user a moment to read, then sign out
      setTimeout(() => {
        base44.auth.logout('/');
      }, 1400);
    } catch (e) {
      setStatus('error');
      setErrorMsg(e?.message || 'Something went wrong. Please try again.');
    }
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-md rounded-3xl bg-[#0B0B12] border border-white/10 text-white p-6 shadow-2xl"
          >
            <button
              onClick={close}
              disabled={status === 'working'}
              className="absolute top-4 right-4 w-9 h-9 grid place-items-center rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="w-11 h-11 grid place-items-center rounded-2xl bg-red-500/15 border border-red-500/30 text-red-300">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <h2 className="font-display text-xl font-bold">Delete account</h2>
            </div>

            {status === 'done' ? (
              <div className="py-6 text-center">
                <p className="text-white/80 text-sm leading-relaxed">
                  Your account and all design data have been permanently deleted. Signing you out…
                </p>
                <Loader2 className="w-5 h-5 animate-spin text-white/60 mx-auto mt-4" />
              </div>
            ) : (
              <>
                <p className="text-sm text-white/65 leading-relaxed">
                  This permanently deletes <strong className="text-white">all your projects and design data</strong>. Your
                  designs, uploads and saved slides will be removed and cannot be recovered.
                </p>
                <p className="text-sm text-white/65 leading-relaxed mt-3">
                  This action is immediate and irreversible. Type{' '}
                  <span className="font-semibold text-red-300 tracking-wide">{CONFIRM_PHRASE}</span> below to confirm.
                </p>

                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  disabled={status === 'working'}
                  placeholder={CONFIRM_PHRASE}
                  className="mt-4 w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-sm outline-none focus:border-red-400/60 transition-colors disabled:opacity-50"
                />

                {status === 'error' && (
                  <p className="mt-3 text-sm text-red-300">{errorMsg}</p>
                )}

                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={close}
                    disabled={status === 'working'}
                    className="flex-1 h-11 rounded-xl bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors text-sm font-medium disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirm}
                    disabled={status === 'working' || typed.trim().toUpperCase() !== CONFIRM_PHRASE}
                    className="flex-1 h-11 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === 'working' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Deleting…
                      </>
                    ) : (
                      'Delete account'
                    )}
                  </button>
                </div>

                {user?.email && (
                  <p className="mt-4 text-xs text-white/40 text-center">Signed in as {user.email}</p>
                )}
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}