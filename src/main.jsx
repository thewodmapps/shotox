import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/App.jsx'
import '@/index.css'

// Apply dark mode in mobile-width viewports (Android WebView) when the system
// scheme is dark, by toggling the existing `.dark` token class on <html>.
// Desktop (wide) viewports are never toggled, so light mode there is unchanged.
const hasMatchMedia = typeof window !== 'undefined' && window.matchMedia;
if (hasMatchMedia) {
  const scheme = window.matchMedia('(prefers-color-scheme: dark)');
  const mobile = window.matchMedia('(max-width: 767px)');
  const applyScheme = () => document.documentElement.classList.toggle('dark', scheme.matches && mobile.matches);
  applyScheme();
  scheme.addEventListener?.('change', applyScheme);
  mobile.addEventListener?.('change', applyScheme);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)