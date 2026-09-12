import { useEffect, useRef } from 'react';
import { useToast } from '@/components/ui/use-toast';

const EXIT_WINDOW_MS = 2500;

export default function BackHandler() {
  const { toast, dismiss } = useToast();
  const toastIdRef = useRef(null);

  useEffect(() => {
    let lastPress = 0;

    const isRoot = () => {
      const p = window.location.pathname;
      return p === '/' || p === '';
    };

    const onPopState = () => {
      // Only intercept when the user is at the app root
      if (!isRoot()) return;

      const now = Date.now();

      if (now - lastPress < EXIT_WINDOW_MS) {
        // Second press within window -> exit the app
        if (toastIdRef.current) dismiss(toastIdRef.current);
        window.close();
        return;
      }

      // First press -> block the exit, re-seed history, show a toast
      lastPress = now;
      window.history.pushState(null, '', window.location.href);
      const t = toast({
        description: 'Press back again to exit',
        duration: EXIT_WINDOW_MS,
      });
      toastIdRef.current = t?.id ?? null;
    };

    // Seed a history entry so the very first back at root is interceptable
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [toast, dismiss]);

  return null;
}