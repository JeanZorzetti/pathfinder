import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import * as serviceWorkerRegistration from "./utils/serviceWorkerRegistration";

// Build: 2025-01-19 - PWA Support Added
console.log('🚀 Pathfinder Build: 2025-01-19 - PWA Support');

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA support
serviceWorkerRegistration.register({
  onSuccess: () => {
    console.log('[PWA] App is ready for offline use');
  },
  onUpdate: (registration) => {
    console.log('[PWA] New version available');
    // Dispatch custom event for the app to handle updates
    window.dispatchEvent(new CustomEvent('sw-update-available', {
      detail: { registration }
    }));
  },
  onError: (error) => {
    console.error('[PWA] Service worker registration failed:', error);
  },
});
