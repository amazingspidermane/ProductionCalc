import { describe, it, expect, vi } from 'vitest';

// initPwaUpdate() reaches for a virtual module Vite only provides during a
// build, so the import is stubbed. Only shouldCheck() is exercised here — the
// rest is service-worker plumbing that has to be judged in a real browser.
vi.mock('virtual:pwa-register', () => ({ registerSW: () => () => {} }));

const { shouldCheck } = await import('./pwa-update.js');

const MINUTE = 60 * 1000;

describe('shouldCheck', () => {
  it('refuses while offline, however long it has been', () => {
    expect(shouldCheck(0, 24 * 60 * MINUTE, false)).toBe(false);
  });

  it('refuses inside the throttle gap', () => {
    // Foregrounding fires a check; a phone picked up and put down repeatedly
    // must not turn that into a request per glance.
    expect(shouldCheck(0, 1 * MINUTE, true)).toBe(false);
    expect(shouldCheck(0, 4.9 * MINUTE, true)).toBe(false);
  });

  it('allows once the gap has elapsed', () => {
    expect(shouldCheck(0, 5 * MINUTE, true)).toBe(true);
    expect(shouldCheck(0, 30 * MINUTE, true)).toBe(true);
  });

  it('measures from the last check, not from startup', () => {
    const lastCheck = 100 * MINUTE;
    expect(shouldCheck(lastCheck, lastCheck + 2 * MINUTE, true)).toBe(false);
    expect(shouldCheck(lastCheck, lastCheck + 6 * MINUTE, true)).toBe(true);
  });

  it('does not fire on a clock that jumped backwards', () => {
    // Phones correct their clocks; a negative elapsed time must not be read as
    // "long enough ago".
    expect(shouldCheck(100 * MINUTE, 90 * MINUTE, true)).toBe(false);
  });
});
