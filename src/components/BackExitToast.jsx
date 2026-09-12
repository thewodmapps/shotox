import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

// Android system-back UX: when the user presses back on the home screen,
// show a "press back again to exit" toast instead of a silent dead press.
// On a second back press within 2s, let the app exit.
export default function BackExitToast() {
  const { pathname } = useLocation();
  const [toast, setToast] = useState(false);
  const armed = useRef(false);
  const timer = useRef(null);

  useEffect(() => {
    if (pathname !== '/') {
      setToast(false);
      armed.current = false;
      clearTimeout(timer.current);
      return;
    }

    const onPop = () => {
      if (armed.current) {
        // Second press within 2s → let the app exit (don't re-trap)
        armed.current = false;
        clearTimeout(timer.current);
        setToast(false);
        try { window.close(); } catch (e) {}
        return;
      }
      // First press → keep us in-app and prompt to press again
      armed.current = true;
      setToast(true);
      history.pushState(null, '');
      clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        armed.current = false;
        setToast(false);
      }, 2000);
    };

    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('popstate', onPop);
      clearTimeout(timer.current);
    };
  }, [pathname]);

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] px-4 py-2.5 rounded-full bg-black/85 text-white text-sm font-medium shadow-[0_8px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur-md no-callout pointer-events-none">
      Press back again to exit
    </div>
  );
}