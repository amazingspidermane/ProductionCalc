/**
 * Where the numbers on screen came from.
 *
 * The calculator merges hardcoded defaults with Firestore data. If Firestore is
 * unreachable the app still renders — with figures frozen at whenever the code
 * was written — and previously said nothing at all. On a plant floor that means
 * an operator can be reading months-old conversion factors and never know.
 *
 * Pure functions so the precedence rules are testable.
 */

export const STATUS = {
  PENDING:  'pending',   // first load, nothing back yet
  LIVE:     'live',      // served by the Firestore backend
  CACHED:   'cached',    // real data, but from the on-device cache
  DEFAULTS: 'defaults',  // no data at all — showing built-in constants
};

/**
 * Classify a single Firestore snapshot.
 * A cached-but-empty snapshot means there is nothing stored locally either, so
 * what the user sees is the hardcoded defaults, not their data.
 */
export function statusFromSnapshot({ fromCache, isEmpty }) {
  if (!fromCache) return STATUS.LIVE;
  return isEmpty ? STATUS.DEFAULTS : STATUS.CACHED;
}

/**
 * Combine per-collection statuses into one headline, worst-first: a single
 * stale collection is enough to make the whole screen untrustworthy.
 */
export function overallDataStatus(statuses) {
  const values = Object.values(statuses || {});
  if (!values.length) return STATUS.PENDING;
  if (values.includes(STATUS.DEFAULTS)) return STATUS.DEFAULTS;
  if (values.includes(STATUS.CACHED)) return STATUS.CACHED;
  if (values.includes(STATUS.PENDING)) return STATUS.PENDING;
  return STATUS.LIVE;
}

/**
 * How a status should be presented.
 * `show` is false only when everything is live — the banner stays out of the
 * way when there is nothing to say.
 */
export function describeDataStatus(status, isOnline = true) {
  switch (status) {
    case STATUS.LIVE:
      return {
        show: false, level: 'ok', icon: 'fa-circle-check',
        label: 'Live data', detail: 'Synced with the database.',
      };

    case STATUS.CACHED:
      return {
        show: true, level: 'warn', icon: isOnline ? 'fa-rotate' : 'fa-cloud-arrow-down',
        label: isOnline ? 'Reconnecting…' : 'Offline',
        detail: 'Showing the last data saved on this device. Recent changes may be missing.',
      };

    case STATUS.DEFAULTS:
      return {
        show: true, level: 'error', icon: 'fa-triangle-exclamation',
        label: 'Using built-in defaults',
        detail: "Couldn't reach the database. These figures ship with the app and may be out of date — check before relying on them.",
      };

    default:
      return {
        show: true, level: 'pending', icon: 'fa-spinner',
        label: 'Loading…', detail: 'Fetching the latest data.',
      };
  }
}
