import { describe, it, expect } from 'vitest';
import {
  STATUS,
  statusFromSnapshot,
  overallDataStatus,
  describeDataStatus,
} from './data-status.js';

describe('statusFromSnapshot', () => {
  it('treats a server snapshot as live', () => {
    expect(statusFromSnapshot({ fromCache: false, isEmpty: false })).toBe(STATUS.LIVE);
  });

  it('treats a populated cache snapshot as cached', () => {
    expect(statusFromSnapshot({ fromCache: true, isEmpty: false })).toBe(STATUS.CACHED);
  });

  // Nothing cached means the screen is really showing hardcoded constants,
  // which is a stronger warning than "offline".
  it('treats an empty cache snapshot as defaults, not merely cached', () => {
    expect(statusFromSnapshot({ fromCache: true, isEmpty: true })).toBe(STATUS.DEFAULTS);
  });

  it('still counts an empty server snapshot as live', () => {
    // The collection genuinely has no documents; that is current information.
    expect(statusFromSnapshot({ fromCache: false, isEmpty: true })).toBe(STATUS.LIVE);
  });
});

describe('overallDataStatus', () => {
  const live = STATUS.LIVE, cached = STATUS.CACHED,
        defaults = STATUS.DEFAULTS, pending = STATUS.PENDING;

  it('is live only when every collection is live', () => {
    expect(overallDataStatus({ a: live, b: live, c: live })).toBe(live);
  });

  it('reports defaults if any single collection fell back', () => {
    expect(overallDataStatus({ a: live, b: live, c: defaults })).toBe(defaults);
  });

  it('ranks defaults above cached', () => {
    expect(overallDataStatus({ a: cached, b: defaults })).toBe(defaults);
  });

  it('ranks cached above pending', () => {
    expect(overallDataStatus({ a: cached, b: pending })).toBe(cached);
  });

  it('reports pending while a collection is still loading', () => {
    expect(overallDataStatus({ a: live, b: pending })).toBe(pending);
  });

  it('is pending when nothing has reported yet', () => {
    expect(overallDataStatus({})).toBe(pending);
    expect(overallDataStatus(null)).toBe(pending);
  });
});

describe('describeDataStatus', () => {
  it('stays hidden when data is live', () => {
    expect(describeDataStatus(STATUS.LIVE).show).toBe(false);
  });

  it('warns, and never hides, when data is stale', () => {
    for (const s of [STATUS.CACHED, STATUS.DEFAULTS, STATUS.PENDING]) {
      expect(describeDataStatus(s).show).toBe(true);
    }
  });

  it('escalates defaults to an error, not a warning', () => {
    expect(describeDataStatus(STATUS.DEFAULTS).level).toBe('error');
    expect(describeDataStatus(STATUS.CACHED).level).toBe('warn');
  });

  it('distinguishes genuinely offline from reconnecting', () => {
    expect(describeDataStatus(STATUS.CACHED, false).label).toBe('Offline');
    expect(describeDataStatus(STATUS.CACHED, true).label).toBe('Reconnecting…');
  });

  it('tells the operator the defaults may be wrong', () => {
    expect(describeDataStatus(STATUS.DEFAULTS).detail).toMatch(/out of date/i);
  });

  it('always supplies a label, icon and detail', () => {
    for (const s of Object.values(STATUS)) {
      const d = describeDataStatus(s);
      expect(d.label).toBeTruthy();
      expect(d.icon).toBeTruthy();
      expect(d.detail).toBeTruthy();
    }
  });
});
