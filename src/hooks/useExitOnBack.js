import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

// Premium Android back-button behaviour:
// - Normal in-app back navigation is left untouched.
// - When the user is on the home page ("/") and presses back to leave the app,
//   show a "press back again to exit" toast; a second back press within 2s exits.
export default function useExitOnBack() {
  const { pathname } = useLocation();
  const pathRef = useRef(pathname);
  pathRef.current = pathname;
  const lastBackRef = useRef(0);
  const recoveringRef = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      // Skip the synthetic popstate we dispatch to restore the app view
      if (recoveringRef.current) {
        recoveringRef.current = false;
        return;
      }
      // Only intercept when the user was on the home (exit) page
      if (pathRef.current !== '/') return;
      // If the browser landed on an in-app route, this is normal navigation — don't hijack
      const nextPath = window.location.pathname;
      if (nextPath && nextPath.startsWith('/')) return;

      // Otherwise the user is trying to leave the app from home
      const now = Date.now();
      if (now - lastBackRef.current < 2000) {
        // Confirmed exit — let the WebView leave / close
        lastBackRef.current = 0;
        return;
      }
      lastBackRef.current = now;
      // Bring the user back to home and prompt for a second press
      recoveringRef.current = true;
      window.history.pushState(null, '', '/');
      window.dispatchEvent(new PopStateEvent('popstate'));
      toast({ description: 'Press back again to exit' });
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);
}