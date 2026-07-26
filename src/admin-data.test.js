import { describe, it, expect } from 'vitest';
import {
  escapeCsvValue,
  toCsv,
  parseCsv,
  parseCsvRows,
  SCHEMAS,
  coerceRecord,
  validateRecord,
  significantChanges,
  planUpsert,
  classifyEntry,
} from './admin-data.js';

describe('CSV escaping', () => {
  it('leaves plain values alone', () => {
    expect(escapeCsvValue('12oz Can')).toBe('12oz Can');
    expect(escapeCsvValue(3600)).toBe('3600');
  });

  // A real description in the materials data: "28mm Caps (58,850/Box)".
  it('quotes values containing commas', () => {
    expect(escapeCsvValue('28mm Caps (58,850/Box)')).toBe('"28mm Caps (58,850/Box)"');
  });

  it('doubles embedded quotes', () => {
    expect(escapeCsvValue('a "b" c')).toBe('"a ""b"" c"');
  });

  it('quotes values containing newlines', () => {
    expect(escapeCsvValue('line1\nline2')).toBe('"line1\nline2"');
  });

  it('renders null and undefined as empty', () => {
    expect(escapeCsvValue(null)).toBe('');
    expect(escapeCsvValue(undefined)).toBe('');
  });
});

describe('CSV round-trip', () => {
  const columns = ['name', 'desc', 'unitsPerPallet'];

  it('survives a value containing a comma', () => {
    const rows = [{ name: 'Bottle Caps (Box)', desc: '28mm Caps (58,850/Box)', unitsPerPallet: 58850 }];
    const parsed = parseCsv(toCsv(rows, columns));
    expect(parsed).toHaveLength(1);
    expect(parsed[0].name).toBe('Bottle Caps (Box)');
    expect(parsed[0].desc).toBe('28mm Caps (58,850/Box)');
    expect(parsed[0].unitsPerPallet).toBe('58850');
  });

  it('survives quotes and newlines inside fields', () => {
    const rows = [{ name: 'A "quoted" name', desc: 'two\nlines', unitsPerPallet: 1 }];
    const parsed = parseCsv(toCsv(rows, columns));
    expect(parsed[0].name).toBe('A "quoted" name');
    expect(parsed[0].desc).toBe('two\nlines');
  });

  it('round-trips many rows', () => {
    const rows = Array.from({ length: 25 }, (_, i) => ({
      name: `Item ${i}`, desc: `desc, with comma ${i}`, unitsPerPallet: i * 100,
    }));
    const parsed = parseCsv(toCsv(rows, columns));
    expect(parsed).toHaveLength(25);
    expect(parsed[24].desc).toBe('desc, with comma 24');
  });
});

describe('CSV parsing', () => {
  it('uses the header row as keys', () => {
    const out = parseCsv('name,weeks\nDiet,13\nZero,18');
    expect(out).toEqual([{ name: 'Diet', weeks: '13' }, { name: 'Zero', weeks: '18' }]);
  });

  it('accepts CRLF line endings', () => {
    expect(parseCsv('name,weeks\r\nDiet,13\r\n')).toEqual([{ name: 'Diet', weeks: '13' }]);
  });

  it('strips a UTF-8 BOM, which Excel writes', () => {
    const out = parseCsv('﻿name,weeks\nDiet,13');
    expect(Object.keys(out[0])).toEqual(['name', 'weeks']);
  });

  it('ignores blank lines', () => {
    expect(parseCsv('name,weeks\n\nDiet,13\n\n')).toEqual([{ name: 'Diet', weeks: '13' }]);
  });

  it('fills missing trailing columns with empty strings', () => {
    expect(parseCsv('name,weeks,category\nDiet,13')).toEqual([
      { name: 'Diet', weeks: '13', category: '' },
    ]);
  });

  it('returns an empty array for empty input', () => {
    expect(parseCsv('')).toEqual([]);
    expect(parseCsv('   \n')).toEqual([]);
  });

  it('keeps a comma inside quotes as one field', () => {
    expect(parseCsvRows('a,"b,c",d')[0]).toEqual(['a', 'b,c', 'd']);
  });
});

describe('coerceRecord', () => {
  it('converts numeric columns and trims strings', () => {
    const out = coerceRecord('materials', {
      name: '  Trays  ', unitsPerPallet: '2400', unitsPerCase: '1',
    });
    expect(out.name).toBe('Trays');
    expect(out.unitsPerPallet).toBe(2400);
    expect(out.unitsPerCase).toBe(1);
  });

  it('accepts thousands separators from spreadsheets', () => {
    expect(coerceRecord('materials', { name: 'x', unitsPerPallet: '58,850' }).unitsPerPallet)
      .toBe(58850);
  });

  // Storing 0 for a blank field is what produces Infinity downstream.
  it('omits blank fields instead of storing zero', () => {
    const out = coerceRecord('products', { name: 'Bottle', type: 'bottle', galPerPallet: '' });
    expect('galPerPallet' in out).toBe(false);
  });

  it('ignores columns outside the schema', () => {
    const out = coerceRecord('qacodes', { name: 'x', category: 'can', weeks: '13', bogus: 'y' });
    expect('bogus' in out).toBe(false);
  });
});

describe('validateRecord', () => {
  it('accepts a well-formed can product', () => {
    expect(validateRecord('products',
      { name: '12 oz. Can', type: 'can', galPerPallet: 118, casesPerPallet: 340.375 })).toEqual([]);
  });

  it('accepts a well-formed bottle product', () => {
    expect(validateRecord('products',
      { name: '20oz Bottle', type: 'bottle', factor: 1.7281 })).toEqual([]);
  });

  // This is the gap that let blank fields become 0 via `|| 0`.
  it('rejects a can product with missing pallet figures', () => {
    const errs = validateRecord('products', { name: 'Broken', type: 'can' });
    expect(errs.length).toBeGreaterThan(0);
    expect(errs.join(' ')).toMatch(/galPerPallet/);
    expect(errs.join(' ')).toMatch(/casesPerPallet/);
  });

  it('rejects zero and negative production values', () => {
    expect(validateRecord('products',
      { name: 'x', type: 'can', galPerPallet: 0, casesPerPallet: 10 }).join(' '))
      .toMatch(/galPerPallet/);
    expect(validateRecord('materials',
      { name: 'x', unitsPerPallet: -5, unitsPerCase: 1 }).join(' '))
      .toMatch(/unitsPerPallet/);
  });

  it('rejects a bottle product with no conversion factor', () => {
    expect(validateRecord('products', { name: 'x', type: 'bottle' }).join(' '))
      .toMatch(/factor/);
  });

  it('rejects an unknown product type', () => {
    expect(validateRecord('products', { name: 'x', type: 'keg' }).join(' '))
      .toMatch(/type/);
  });

  it('requires a name', () => {
    expect(validateRecord('materials', { unitsPerPallet: 10, unitsPerCase: 1 }).join(' '))
      .toMatch(/name/);
  });

  it('validates qa codes', () => {
    expect(validateRecord('qacodes', { name: 'x', category: 'can', weeks: 13 })).toEqual([]);
    expect(validateRecord('qacodes', { name: 'x', category: 'jug', weeks: 13 }).join(' '))
      .toMatch(/category/);
    expect(validateRecord('qacodes', { name: 'x', category: 'can', weeks: 0 }).join(' '))
      .toMatch(/weeks/);
  });

  it('flags non-numeric values', () => {
    expect(validateRecord('materials',
      { name: 'x', unitsPerPallet: NaN, unitsPerCase: 1 }).join(' '))
      .toMatch(/unitsPerPallet/);
  });

  it('does not repeat the same complaint twice', () => {
    const errs = validateRecord('materials', { name: 'x', unitsPerPallet: 0, unitsPerCase: 0 });
    expect(new Set(errs).size).toBe(errs.length);
  });
});

describe('significantChanges', () => {
  // The motivating typo: 340.375 mistyped as 3403.75.
  it('flags a 10x typo in a conversion factor', () => {
    const changes = significantChanges('products',
      { casesPerPallet: 340.375 }, { casesPerPallet: 3403.75 });
    expect(changes).toHaveLength(1);
    expect(changes[0].field).toBe('casesPerPallet');
    expect(changes[0].pctChange).toBe(900);
  });

  it('ignores a small correction', () => {
    expect(significantChanges('products',
      { casesPerPallet: 340.375 }, { casesPerPallet: 341 })).toEqual([]);
  });

  it('ignores unchanged values', () => {
    expect(significantChanges('materials',
      { unitsPerPallet: 2400, unitsPerCase: 1 },
      { unitsPerPallet: 2400, unitsPerCase: 1 })).toEqual([]);
  });

  it('only inspects production-critical fields', () => {
    expect(significantChanges('materials',
      { unitsPerPallet: 2400, desc: 'a' }, { unitsPerPallet: 2400, desc: 'totally different' }))
      .toEqual([]);
  });

  it('says nothing when creating a new record', () => {
    expect(significantChanges('products', null, { casesPerPallet: 1 })).toEqual([]);
  });

  it('honours a custom threshold', () => {
    expect(significantChanges('qacodes', { weeks: 10 }, { weeks: 12 }, 0.1)).toHaveLength(1);
    expect(significantChanges('qacodes', { weeks: 10 }, { weeks: 12 }, 0.5)).toHaveLength(0);
  });
});

describe('classifyEntry', () => {
  const defaults = { 'Built-in Only': {}, 'Both': {} };
  const ids = { 'Both': ['id-1'], 'Cloud Only': ['id-2'] };

  it('marks an entry that exists only in app code', () => {
    const c = classifyEntry('Built-in Only', ids, defaults);
    expect(c.isBuiltIn).toBe(true);
    expect(c.isCloud).toBe(false);
    expect(c.canDelete).toBe(false);   // nothing in Firestore to remove
    expect(c.primaryId).toBeNull();
  });

  it('marks a cloud entry that overrides a built-in', () => {
    const c = classifyEntry('Both', ids, defaults);
    expect(c.isCloud).toBe(true);
    expect(c.isBuiltIn).toBe(true);
    expect(c.overridesBuiltIn).toBe(true);
    expect(c.primaryId).toBe('id-1');
  });

  it('marks a cloud-only entry', () => {
    const c = classifyEntry('Cloud Only', ids, defaults);
    expect(c.isCloud).toBe(true);
    expect(c.isBuiltIn).toBe(false);
    expect(c.overridesBuiltIn).toBe(false);
    expect(c.canDelete).toBe(true);
  });

  it('counts duplicate documents sharing a name', () => {
    expect(classifyEntry('X', { X: ['a', 'b', 'c'] }, {}).duplicateCount).toBe(2);
    expect(classifyEntry('X', { X: ['a'] }, {}).duplicateCount).toBe(0);
  });

  it('handles an unknown name and missing inputs', () => {
    const c = classifyEntry('Nope', ids, defaults);
    expect(c.isCloud).toBe(false);
    expect(c.isBuiltIn).toBe(false);
    expect(classifyEntry('Nope', null, null).docIds).toEqual([]);
  });

  // Guards against a name like "constructor" being reported as built-in.
  it('is not fooled by inherited Object properties', () => {
    expect(classifyEntry('constructor', {}, {}).isBuiltIn).toBe(false);
    expect(classifyEntry('toString', {}, {}).isCloud).toBe(false);
  });
});

describe('planUpsert', () => {
  it('updates existing names rather than inserting duplicates', () => {
    const plan = planUpsert([{ name: 'A' }, { name: 'B' }], { A: ['id-a'] });
    expect(plan.update).toEqual([{ id: 'id-a', data: { name: 'A' } }]);
    expect(plan.create).toEqual([{ name: 'B' }]);
  });

  it('counts extra copies that the upsert will clean up', () => {
    const plan = planUpsert([{ name: 'A' }], { A: ['id-1', 'id-2', 'id-3'] });
    expect(plan.duplicatesCleaned).toBe(2);
  });

  // Re-running migrate must not add anything the second time.
  it('is idempotent when everything already exists', () => {
    const plan = planUpsert([{ name: 'A' }, { name: 'B' }], { A: ['1'], B: ['2'] });
    expect(plan.create).toEqual([]);
    expect(plan.update).toHaveLength(2);
  });

  it('treats an empty database as all-new', () => {
    expect(planUpsert([{ name: 'A' }], {}).create).toHaveLength(1);
  });
});
