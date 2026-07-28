/**
 * Keeping the floor on the current build.
 *
 * This is a PWA, so a device that has it installed keeps running whatever
 * bundle its service worker cached until that worker is replaced. The figures
 * stay correct either way — Firestore streams those live — but the *code*
 * reading them does not, so a corrected formula can sit undelivered behind a
 * screen that looks perfectly fine. On a phone left open through a shift that
 * can last days.
 *
 * So: ask the server for a new build on a timer and whenever the app comes back
 * to the foreground, and when one lands, say so. Deliberately not an automatic
 * reload — that would wipe half-typed numbers with no warning, and this app
 * ships on purpose rather than silently.
 */
import { registerSW } from 'virtual:pwa-register';

/** How often to ask whether a new build exists. */
const UPDATE_INTERVAL_MS = 30 * 60 * 1000;   // 30 minutes

/**
 * Floor on how often a check can actually fire. Foregrounding the app triggers
 * one, and on a phone that is picked up and put down all shift that would
 * otherwise mean a request every few seconds.
 */
const MIN_CHECK_GAP_MS = 5 * 60 * 1000;      // 5 minutes

/**
 * Is it worth asking the server right now?
 *
 * Pure so the throttle is pinned by a test rather than inferred from network
 * traffic. Offline is a hard no — update() just rejects — and checks that land
 * inside the gap are dropped rather than queued, since the next foreground or
 * the timer will come round anyway.
 *
 * @param {number}  lastCheck  timestamp of the previous check
 * @param {number}  now
 * @param {boolean} isOnline
 */
export function shouldCheck(lastCheck, now, isOnline) {
  if (!isOnline) return false;
  return now - lastCheck >= MIN_CHECK_GAP_MS;
}

/**
 * Register the service worker and watch for new builds.
 *
 * @param {object}   handlers
 * @param {function} handlers.onNeedRefresh  called with an `apply()` that
 *   activates the waiting worker and reloads the page
 * @param {function} [handlers.onOfflineReady]
 * @returns {function} force an update check now
 */
export function initPwaUpdate({ onNeedRefresh, onOfflineReady } = {}) {
  let updateSW = null;
  let lastCheck = Date.now();

  const checkNow = (registration) => {
    // navigator.onLine is only a hint, but a false reading is reliable enough
    // to skip a request that would certainly fail.
    if (!shouldCheck(lastCheck, Date.now(), navigator.onLine !== false)) return;
    lastCheck = Date.now();
    // Nothing to report and nothing to retry, so failures are swallowed.
    registration.update().catch(() => {});
  };

  updateSW = registerSW({
    immediate: true,

    onNeedRefresh() {
      // updateSW(true) posts SKIP_WAITING to the worker that is waiting and
      // reloads once it takes control.
      if (onNeedRefresh) onNeedRefresh(() => updateSW(true));
    },

    onOfflineReady() {
      if (onOfflineReady) onOfflineReady();
    },

    onRegisteredSW(swUrl, registration) {
      if (!registration) return;

      setInterval(() => checkNow(registration), UPDATE_INTERVAL_MS);

      // The case the timer alone misses: the app sat backgrounded for hours and
      // is picked up mid-shift. Browsers throttle timers in hidden tabs, so
      // coming back to the foreground is the more reliable signal of the two.
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) checkNow(registration);
      });

      // Coming back onto plant wifi is the first moment a check can succeed.
      window.addEventListener('online', () => checkNow(registration));
    },

    onRegisterError(error) {
      // Worth seeing in a console, but never worth blocking the calculator for.
      console.warn('[pwa] service worker registration failed', error);
    },
  });

  return () => updateSW && updateSW(true);
}
