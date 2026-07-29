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
 * @returns {{check: function, apply: function, isWaiting: function}}
 */
export function initPwaUpdate({ onNeedRefresh, onOfflineReady } = {}) {
  let updateSW = null;
  let registration = null;
  let lastCheck = Date.now();
  /**
   * Set the moment a new worker starts installing.
   *
   * `registration.waiting` is the wrong thing to poll on its own: a worker that
   * is still downloading is neither waiting nor absent, so a caller checking
   * too early concludes there is no update and says so, moments before the
   * banner contradicts it. 'updatefound' is the earliest honest signal.
   */
  let updateFound = false;

  /**
   * @param {boolean} force  skip the throttle — someone pressed a button, and
   *   an answer they asked for is worth a request they can't otherwise trigger.
   */
  const checkNow = (force = false) => {
    if (!registration) return Promise.resolve(false);
    // navigator.onLine is only a hint, but a false reading is reliable enough
    // to skip a request that would certainly fail.
    if (!force && !shouldCheck(lastCheck, Date.now(), navigator.onLine !== false)) {
      return Promise.resolve(false);
    }
    lastCheck = Date.now();
    // Judge this check on its own result, not on one from ten minutes ago. A
    // worker already waiting still reports through registration.waiting below.
    if (force) updateFound = false;
    // Nothing to report and nothing to retry, so failures are swallowed.
    return registration.update().then(() => true).catch(() => false);
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

    onRegisteredSW(swUrl, reg) {
      if (!reg) return;
      registration = reg;

      reg.addEventListener('updatefound', () => { updateFound = true; });

      setInterval(() => checkNow(), UPDATE_INTERVAL_MS);

      // The case the timer alone misses: the app sat backgrounded for hours and
      // is picked up mid-shift. Browsers throttle timers in hidden tabs, so
      // coming back to the foreground is the more reliable signal of the two.
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) checkNow();
      });

      // Coming back onto plant wifi is the first moment a check can succeed.
      window.addEventListener('online', () => checkNow());
    },

    onRegisterError(error) {
      // Worth seeing in a console, but never worth blocking the calculator for.
      console.warn('[pwa] service worker registration failed', error);
    },
  });

  return {
    /** Ask the server now, throttle ignored. */
    check: () => checkNow(true),
    /** Activate the waiting worker and reload. */
    apply: () => updateSW && updateSW(true),
    /** Is a new build waiting, or on its way in? */
    hasUpdate: () => updateFound || !!(registration && registration.waiting),
  };
}
