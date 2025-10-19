/**
 * Service Worker Registration
 * Handles PWA installation and updates
 */

export interface ServiceWorkerConfig {
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onError?: (error: Error) => void;
}

export function register(config?: ServiceWorkerConfig) {
  if ('serviceWorker' in navigator) {
    // Wait for window load to ensure app is fully loaded
    window.addEventListener('load', () => {
      const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;

      registerValidSW(swUrl, config);
    });
  } else {
    console.log('[PWA] Service Workers are not supported in this browser');
  }
}

async function registerValidSW(swUrl: string, config?: ServiceWorkerConfig) {
  try {
    const registration = await navigator.serviceWorker.register(swUrl);

    console.log('[PWA] Service Worker registered:', registration);

    registration.onupdatefound = () => {
      const installingWorker = registration.installing;

      if (!installingWorker) {
        return;
      }

      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            console.log('[PWA] New content is available; please refresh.');

            if (config?.onUpdate) {
              config.onUpdate(registration);
            }

            // Show update notification
            showUpdateNotification(registration);
          } else {
            // Content is cached for offline use
            console.log('[PWA] Content is cached for offline use.');

            if (config?.onSuccess) {
              config.onSuccess(registration);
            }
          }
        }
      };
    };
  } catch (error) {
    console.error('[PWA] Error during service worker registration:', error);

    if (config?.onError) {
      config.onError(error as Error);
    }
  }
}

function showUpdateNotification(registration: ServiceWorkerRegistration) {
  // Create a custom event to notify the app about updates
  const event = new CustomEvent('sw-update-available', {
    detail: { registration },
  });
  window.dispatchEvent(event);
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
        console.log('[PWA] Service Worker unregistered');
      })
      .catch((error) => {
        console.error('[PWA] Error unregistering service worker:', error);
      });
  }
}

/**
 * Check if there's a service worker update available
 */
export async function checkForUpdates(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.update();
    return true;
  } catch (error) {
    console.error('[PWA] Error checking for updates:', error);
    return false;
  }
}

/**
 * Skip waiting and activate new service worker immediately
 */
export function skipWaiting() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  navigator.serviceWorker.ready.then((registration) => {
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  });
}

/**
 * Handle service worker updates by reloading the page
 */
export function handleUpdate() {
  skipWaiting();

  // Listen for the controlling service worker change
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
}
