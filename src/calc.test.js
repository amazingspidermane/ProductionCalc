import { describe, it, expect } from 'vitest';
import {
  STANDARD_PACK,
  evaluateExpression,
  parseNumericInput,
  fmt,
  computeSkuYields,
  packToStandardCases,
  standardCasesFromLines,
  standardCasesFromSource,
  deriveFromStandardCases,
  casesPerMaterialUnit,
  materialUnitsForCases,
  casesFromMaterialUnits,
  unitsToPull,
  optimumTasteDate,
  parsePrintCode,
  productionDateFromCode,
  DAY_LETTERS,
  parseMaterialList,
  formatMaterialList,
  packFactorOf,
  materialUnitsForStandardCases,
  buildRunPlan,
} from './calc.js';

// Fixtures mirroring real entries from the Firestore data.
const CAN_12OZ    = { type: 'can', galPerPallet: 118, casesPerPallet: 340.375 };
const CAN_75OZ    = { type: 'can', galPerPallet: 109, casesPerPallet: 506 };
const BOTTLE_20OZ = { type: 'bottle', factor: 1.7281 };

const TRAY_24PK   = { unitsPerPallet: 2400, unitsPerCase: 1, unitName: 'Pallets' };
const WRAPS_12PK  = { unitsPerPallet: 8880, unitsPerCase: 2, unitName: 'Pallets' };
const CAPS_BOX    = { unitsPerPallet: 58850, unitsPerCase: 24, unitName: 'Boxes' };

describe('evaluateExpression', () => {
  it('evaluates the documented example', () => {
    expect(evaluateExpression('506*24/30')).toBeCloseTo(404.8, 6);
  });

  it('handles parentheses and precedence', () => {
    expect(evaluateExpression('(2+3)*4')).toBe(20);
    expect(evaluateExpression('2+3*4')).toBe(14);
  });

  it('returns 0 for empty or nonsense input rather than throwing', () => {
    expect(evaluateExpression('')).toBe(0);
    expect(evaluateExpression('   ')).toBe(0);
    expect(evaluateExpression('*/+')).toBe(0);
  });

  it('returns 0 rather than Infinity on divide by zero', () => {
    expect(evaluateExpression('5/0')).toBe(0);
  });

  // The expression goes through new Function(), so the sanitiser is load-bearing.
  // The property that matters is that no identifier survives it: what reaches
  // the evaluator is arithmetic or nothing, never a callable or an assignment.
  it('cannot execute code or cause side effects', () => {
    globalThis.__calcPwned = false;

    // `=` is not an allowed character, so assignment can never be expressed.
    expect(evaluateExpression('(globalThis.__calcPwned = true)')).toBe(0);
    expect(globalThis.__calcPwned).toBe(false);

    delete globalThis.__calcPwned;
  });

  it('reduces identifiers to their surviving arithmetic', () => {
    expect(evaluateExpression('alert(1)')).toBe(1);         // -> "(1)"
    expect(evaluateExpression('1;globalThis')).toBe(1);     // -> "1", name stripped
    expect(evaluateExpression('fetch("/x")')).toBe(0);      // -> "(/)"  invalid
    expect(evaluateExpression('window.location')).toBe(0);  // -> "."    invalid
  });

  it('leaves no letters in anything it evaluates', () => {
    for (const attack of ['alert(1)', 'fetch(1)', 'eval(1)', 'globalThis', 'import(1)']) {
      // Whatever the numeric result, it must be a finite number, never a
      // function call's return value or a thrown error escaping.
      expect(Number.isFinite(evaluateExpression(attack))).toBe(true);
    }
  });
});

describe('parseNumericInput', () => {
  it('parses plain and thousands-separated numbers', () => {
    expect(parseNumericInput('1234.5')).toBe(1234.5);
    expect(parseNumericInput('1,234.5')).toBe(1234.5);
    expect(parseNumericInput('28,800')).toBe(28800);
  });

  it('evaluates = expressions', () => {
    expect(parseNumericInput('=506*24/30')).toBeCloseTo(404.8, 6);
  });

  it('treats blank and non-numeric input as zero', () => {
    expect(parseNumericInput('')).toBe(0);
    expect(parseNumericInput('   ')).toBe(0);
    expect(parseNumericInput('abc')).toBe(0);
    expect(parseNumericInput(null)).toBe(0);
    expect(parseNumericInput(undefined)).toBe(0);
  });
});

describe('fmt', () => {
  it('adds thousands separators', () => {
    expect(fmt(28800)).toBe('28,800');
  });

  it('omits decimals for whole numbers but keeps them otherwise', () => {
    expect(fmt(12)).toBe('12');
    expect(fmt(4.16666)).toBe('4.17');
  });

  it('returns empty string for non-finite values', () => {
    expect(fmt(Infinity)).toBe('');
    expect(fmt(NaN)).toBe('');
    expect(fmt(null)).toBe('');
  });
});

describe('pack size conversion', () => {
  it('uses a 24-pack baseline', () => {
    expect(STANDARD_PACK).toBe(24);
  });

  // The ratios called out in the in-app guide.
  it('matches the documented multipliers', () => {
    expect(packToStandardCases(1, 18)).toBe(0.75);
    expect(packToStandardCases(1, 24)).toBe(1);
    expect(packToStandardCases(1, 35)).toBeCloseTo(1.45833, 4);
  });

  it('sums the three line counts', () => {
    // 100@18 + 0@24 + 100@35 = 75 + 0 + 145.8333
    expect(standardCasesFromLines([
      { count: 100, packSize: 18 },
      { count: 0,   packSize: 24 },
      { count: 100, packSize: 35 },
    ])).toBeCloseTo(220.8333, 3);
  });

  it('treats blank lines as zero', () => {
    expect(standardCasesFromLines([
      { count: undefined, packSize: 18 },
      { count: 250, packSize: 18 },
      { count: null, packSize: 35 },
    ])).toBe(187.5);
  });

  it('returns 0 for no lines', () => {
    expect(standardCasesFromLines([])).toBe(0);
    expect(standardCasesFromLines(undefined)).toBe(0);
  });
});

describe('computeSkuYields', () => {
  it('derives can yields from the pallet spec', () => {
    const y = computeSkuYields(CAN_12OZ);
    expect(y.casesPerGal).toBeCloseTo(2.8845, 4);
    expect(y.casesPerPlt).toBe(340.375);
  });

  it('uses factor directly for bottles and reports no pallet yield', () => {
    const y = computeSkuYields(BOTTLE_20OZ);
    expect(y.casesPerGal).toBe(1.7281);
    expect(y.casesPerPlt).toBe(0);
  });

  it('returns zeroes for a missing product', () => {
    expect(computeSkuYields(null)).toEqual({ casesPerGal: 0, casesPerPlt: 0 });
  });
});

describe('syrup conversions', () => {
  it('converts standard cases to gallons and pallets for a can', () => {
    const y = computeSkuYields(CAN_12OZ);
    const { gals, plts } = deriveFromStandardCases(CAN_12OZ, y, 10000);
    expect(gals).toBeCloseTo(3466.76, 1);
    expect(plts).toBeCloseTo(29.38, 2);
  });

  it('round-trips cases -> gallons -> cases', () => {
    const y = computeSkuYields(CAN_75OZ);
    const { gals } = deriveFromStandardCases(CAN_75OZ, y, 5000);
    expect(standardCasesFromSource(CAN_75OZ, y, 'gals', gals)).toBeCloseTo(5000, 6);
  });

  it('round-trips cases -> pallets -> cases', () => {
    const y = computeSkuYields(CAN_12OZ);
    const { plts } = deriveFromStandardCases(CAN_12OZ, y, 1234.5);
    expect(standardCasesFromSource(CAN_12OZ, y, 'plts', plts)).toBeCloseTo(1234.5, 6);
  });

  it('reports no pallets for bottle SKUs', () => {
    const y = computeSkuYields(BOTTLE_20OZ);
    const { gals, plts } = deriveFromStandardCases(BOTTLE_20OZ, y, 1000);
    expect(plts).toBe(0);
    expect(gals).toBeCloseTo(578.67, 2);
  });

  it('ignores a pallet figure typed against a bottle SKU', () => {
    const y = computeSkuYields(BOTTLE_20OZ);
    expect(standardCasesFromSource(BOTTLE_20OZ, y, 'plts', 50)).toBe(0);
  });

  it('passes standard cases through unchanged', () => {
    const y = computeSkuYields(CAN_12OZ);
    expect(standardCasesFromSource(CAN_12OZ, y, 'cases', 777)).toBe(777);
  });

  it('returns 0 when no product is selected', () => {
    expect(standardCasesFromSource(null, { casesPerGal: 1, casesPerPlt: 1 }, 'gals', 10)).toBe(0);
    expect(deriveFromStandardCases(null, {}, 100)).toEqual({ gals: 0, plts: 0 });
  });
});

describe('materials', () => {
  it('computes cases per unit', () => {
    expect(casesPerMaterialUnit(TRAY_24PK)).toBe(2400);
    expect(casesPerMaterialUnit(WRAPS_12PK)).toBe(4440);
    expect(casesPerMaterialUnit(CAPS_BOX)).toBeCloseTo(2452.08, 2);
  });

  it('converts a case target into material units', () => {
    expect(materialUnitsForCases(TRAY_24PK, 10000)).toBeCloseTo(4.1667, 4);
  });

  it('converts material on hand into producible cases', () => {
    expect(casesFromMaterialUnits(TRAY_24PK, 12)).toBe(28800);
  });

  it('round-trips both directions', () => {
    const units = materialUnitsForCases(WRAPS_12PK, 9999);
    expect(casesFromMaterialUnits(WRAPS_12PK, units)).toBeCloseTo(9999, 6);
  });

  // A material saved with unitsPerCase: 0 would otherwise yield Infinity and
  // silently blank the output instead of failing visibly.
  it('guards against divide-by-zero in the material spec', () => {
    const broken = { unitsPerPallet: 100, unitsPerCase: 0 };
    expect(casesPerMaterialUnit(broken)).toBe(0);
    expect(materialUnitsForCases(broken, 500)).toBe(0);
    expect(casesFromMaterialUnits(broken, 5)).toBe(0);
  });

  it('returns 0 for missing material or non-positive input', () => {
    expect(materialUnitsForCases(null, 100)).toBe(0);
    expect(materialUnitsForCases(TRAY_24PK, 0)).toBe(0);
    expect(materialUnitsForCases(TRAY_24PK, -5)).toBe(0);
    expect(casesFromMaterialUnits(TRAY_24PK, 0)).toBe(0);
  });
});

describe('unitsToPull', () => {
  it('rounds up to a whole unit and reports how much of the last is used', () => {
    const p = unitsToPull(4.1667);
    expect(p.whole).toBe(5);
    expect(p.exactlyFull).toBe(false);
    expect(p.lastUsedPct).toBe(17);
  });

  it('recognises an exact number of units', () => {
    const p = unitsToPull(3);
    expect(p.whole).toBe(3);
    expect(p.exactlyFull).toBe(true);
  });

  it('rounds a fraction of a unit up to one', () => {
    const p = unitsToPull(0.2083);
    expect(p.whole).toBe(1);
    expect(p.lastUsedPct).toBe(21);
  });

  it('does not demand an extra unit for floating-point dust', () => {
    expect(unitsToPull(3.0000000001).whole).toBe(3);
  });

  it('returns null when there is nothing to pull', () => {
    expect(unitsToPull(0)).toBeNull();
    expect(unitsToPull(-1)).toBeNull();
    expect(unitsToPull(Infinity)).toBeNull();
    expect(unitsToPull(NaN)).toBeNull();
  });
});

describe('optimumTasteDate', () => {
  it('computes the expiry and print code for a known date', () => {
    // 2026-07-24 is a Friday; its week starts Mon 2026-07-20.
    // +18 weeks -> 2026-11-23.
    const r = optimumTasteDate('2026-07-24', 18);
    expect(r.display).toBe('Nov-23-26');
    expect(r.printCode).toBe('BBNOV2326DDE');
  });

  it('snaps to the Monday of the production week', () => {
    // Every day of the same week must produce an identical expiry date.
    const week = ['2026-07-20', '2026-07-21', '2026-07-22',
                  '2026-07-23', '2026-07-24', '2026-07-25', '2026-07-26'];
    const displays = week.map(d => optimumTasteDate(d, 18).display);
    expect(new Set(displays).size).toBe(1);
    expect(displays[0]).toBe('Nov-23-26');
  });

  it('encodes the production day-of-week as a letter', () => {
    // Sunday -> G, Monday -> A ... Saturday -> F
    expect(optimumTasteDate('2026-07-19', 18).printCode.endsWith('G')).toBe(true); // Sun
    expect(optimumTasteDate('2026-07-20', 18).printCode.endsWith('A')).toBe(true); // Mon
    expect(optimumTasteDate('2026-07-25', 18).printCode.endsWith('F')).toBe(true); // Sat
  });

  // Anchoring at noon is what stops a DST shift moving the calendar date.
  it('is stable across a daylight-saving boundary', () => {
    // US DST starts 2026-03-08; 13 weeks from early Feb crosses it.
    const r = optimumTasteDate('2026-02-02', 13);
    expect(r.display).toBe('May-04-26');
    expect(r.expiry.getDate()).toBe(4);
  });

  it('rolls over the year correctly', () => {
    const r = optimumTasteDate('2026-12-28', 13);
    expect(r.display).toBe('Mar-29-27');
    expect(r.printCode).toBe('BBMAR2927DDA');
  });

  it('handles the longest shelf life', () => {
    expect(optimumTasteDate('2026-07-24', 52).display).toBe('Jul-19-27');
  });

  it('returns null for missing or invalid input', () => {
    expect(optimumTasteDate('', 18)).toBeNull();
    expect(optimumTasteDate('2026-07-24', 0)).toBeNull();
    expect(optimumTasteDate('2026-07-24', NaN)).toBeNull();
    expect(optimumTasteDate('not-a-date', 18)).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Run plans
// ---------------------------------------------------------------------------

// Reuses TRAY_24PK / CAPS_BOX from the fixtures above. The 35-pack film tray is
// the one real material whose pack size isn't 24, so it gets its own fixture.
const TRAY_35PK = { unitsPerPallet: 1600, unitsPerCase: 1, unitName: 'Pallets',
                    stdCaseFactor: 35 / 24 };

describe('parseMaterialList / formatMaterialList', () => {
  it('splits a pipe-delimited list', () => {
    expect(parseMaterialList('A|B')).toEqual(['A', 'B']);
  });

  // Material names contain commas and parentheses, which is exactly why the
  // separator is a pipe rather than a comma.
  it('keeps commas inside a name intact', () => {
    expect(parseMaterialList('Wraps (12-Pack), Blue|Caps')).toEqual(
      ['Wraps (12-Pack), Blue', 'Caps']);
  });

  it('trims whitespace and drops empty entries', () => {
    expect(parseMaterialList(' A | | B ')).toEqual(['A', 'B']);
  });

  it('treats missing values as an empty list', () => {
    expect(parseMaterialList(undefined)).toEqual([]);
    expect(parseMaterialList('')).toEqual([]);
  });

  it('passes an array through', () => {
    expect(parseMaterialList(['A', 'B'])).toEqual(['A', 'B']);
  });

  it('round-trips', () => {
    const names = ['12oz Can Wraps (24-Pack)', 'Bottle Caps (Box)'];
    expect(parseMaterialList(formatMaterialList(names))).toEqual(names);
  });
});

describe('packFactorOf', () => {
  it('defaults to 1 when no factor is set', () => {
    expect(packFactorOf(TRAY_24PK)).toBe(1);
    expect(packFactorOf(undefined)).toBe(1);
  });

  it('reads a configured factor', () => {
    expect(packFactorOf(TRAY_35PK)).toBeCloseTo(35 / 24, 6);
  });

  // A zero or negative factor would divide the plan into nonsense.
  it('ignores a non-positive or non-numeric factor', () => {
    expect(packFactorOf({ stdCaseFactor: 0 })).toBe(1);
    expect(packFactorOf({ stdCaseFactor: -2 })).toBe(1);
    expect(packFactorOf({ stdCaseFactor: NaN })).toBe(1);
  });
});

describe('materialUnitsForStandardCases', () => {
  // 24-based material: identical to the plain per-case calculation.
  it('matches materialUnitsForCases when the pack is already 24', () => {
    expect(materialUnitsForStandardCases(TRAY_24PK, 4800))
      .toBeCloseTo(materialUnitsForCases(TRAY_24PK, 4800), 9);
  });

  // The whole point of the factor: 5,000 standard cases is only 3,429 trays of
  // 35, so the run needs 2.14 pallets rather than 3.13.
  it('converts a standard-case target into the material own pack size', () => {
    expect(materialUnitsForStandardCases(TRAY_35PK, 5000)).toBeCloseTo(2.142857, 5);
  });

  it('over-pulls if the factor is ignored', () => {
    // Guards the regression the factor exists to prevent.
    expect(materialUnitsForCases(TRAY_35PK, 5000)).toBeCloseTo(3.125, 5);
  });

  it('returns 0 for missing material or non-positive target', () => {
    expect(materialUnitsForStandardCases(null, 100)).toBe(0);
    expect(materialUnitsForStandardCases(TRAY_24PK, 0)).toBe(0);
    expect(materialUnitsForStandardCases(TRAY_24PK, -5)).toBe(0);
  });
});


describe('buildRunPlan', () => {
  const DB = {
    'Trays24': TRAY_24PK,
    'Film35':  TRAY_35PK,
    'Wraps12': WRAPS_12PK,
    'Caps':    CAPS_BOX,
  };

  // The mixed run that motivated the line model.
  const MIXED = [
    { count: 10000, packSize: 35, materials: ['Film35'] },
    { count: 2000,  packSize: 18, materials: ['Wraps12'] },
    { count: 5000,  packSize: 12, materials: ['Wraps12'] },
  ];

  it('totals standard cases across every pack size', () => {
    const plan = buildRunPlan({ product: CAN_12OZ, lines: MIXED, materialsDb: DB });
    // 10000*35/24 + 2000*18/24 + 5000*12/24
    expect(plan.stdCases).toBeCloseTo(14583.3333 + 1500 + 2500, 3);
  });

  it('drives syrup off the combined total', () => {
    const plan = buildRunPlan({ product: CAN_12OZ, lines: MIXED, materialsDb: DB });
    const y = computeSkuYields(CAN_12OZ);
    expect(plan.gals).toBeCloseTo(plan.stdCases / y.casesPerGal, 6);
  });

  // The correctness point: a pack-specific material must not be planned against
  // the whole run. 10,000 35-packs need exactly 10,000 trays, not a share of
  // the 18,583 standard cases.
  it('charges a material only to the lines that use it', () => {
    const plan = buildRunPlan({ product: CAN_12OZ, lines: MIXED, materialsDb: DB });
    const film = plan.materials.find((m) => m.name === 'Film35');
    expect(film.units).toBeCloseTo(10000 / 1600, 6);
    expect(film.pull.whole).toBe(7);        // 6.25 -> 7
  });

  it('sums a material shared by several lines, rounding only once', () => {
    const plan = buildRunPlan({ product: CAN_12OZ, lines: MIXED, materialsDb: DB });
    const wraps = plan.materials.find((m) => m.name === 'Wraps12');
    // (1500 + 2500) standard cases / 4440 cases per pallet
    expect(wraps.units).toBeCloseTo(4000 / 4440, 6);
    expect(wraps.pull.whole).toBe(1);
  });

  it('rounds the summed total, not each line', () => {
    // Two lines of 0.6 pallets each: 1.2 total -> 2, never 1+1 rounded twice.
    const lines = [
      { count: 2664, packSize: 24, materials: ['Wraps12'] },
      { count: 2664, packSize: 24, materials: ['Wraps12'] },
    ];
    const plan = buildRunPlan({ product: CAN_12OZ, lines, materialsDb: DB });
    expect(plan.materials[0].units).toBeCloseTo(5328 / 4440, 6);
    expect(plan.materials[0].pull.whole).toBe(2);
  });

  it('lists each material once, alphabetically', () => {
    const plan = buildRunPlan({ product: CAN_12OZ, lines: MIXED, materialsDb: DB });
    expect(plan.materials.map((m) => m.name)).toEqual(['Film35', 'Wraps12']);
  });

  it('reports per-line standard cases for display', () => {
    const plan = buildRunPlan({ product: CAN_12OZ, lines: MIXED, materialsDb: DB });
    expect(plan.lines[0].stdCases).toBeCloseTo(14583.3333, 3);
    expect(plan.lines[1].stdCases).toBe(1500);
  });

  it('carries the unit name so the plan reads in plant terms', () => {
    const plan = buildRunPlan({
      product: BOTTLE_20OZ,
      lines: [{ count: 1000, packSize: 24, materials: ['Caps'] }],
      materialsDb: DB,
    });
    expect(plan.materials[0].unitName).toBe('Boxes');
  });

  it('reports no pallets for bottles', () => {
    const plan = buildRunPlan({
      product: BOTTLE_20OZ,
      lines: [{ count: 1000, packSize: 24, materials: [] }],
      materialsDb: DB,
    });
    expect(plan.plts).toBe(0);
    expect(plan.gals).toBeCloseTo(1000 / 1.7281, 4);
  });

  it('flags a material with no usable conversion instead of showing zero', () => {
    const plan = buildRunPlan({
      product: CAN_12OZ,
      lines: [{ count: 1000, packSize: 24, materials: ['Broken'] }],
      materialsDb: { Broken: { unitsPerPallet: 0, unitsPerCase: 1 } },
    });
    expect(plan.materials[0].usable).toBe(false);
    expect(plan.materials[0].pull).toBeNull();
  });

  it('ignores blank and zero lines', () => {
    const plan = buildRunPlan({
      product: CAN_12OZ,
      lines: [{ count: 0, packSize: 24, materials: ['Trays24'] },
              { count: 500, packSize: 0, materials: ['Trays24'] }],
      materialsDb: DB,
    });
    expect(plan.stdCases).toBe(0);
    expect(plan.materials[0].units).toBe(0);
    expect(plan.materials[0].pull).toBeNull();
  });

  it('is inert with no product and no lines', () => {
    const plan = buildRunPlan({});
    expect(plan.stdCases).toBe(0);
    expect(plan.gals).toBe(0);
    expect(plan.materials).toEqual([]);
    expect(plan.lines).toEqual([]);
  });
});

// Neither a "6-pack" nor a "12-pack" is a case size at this plant: a 12-pack is
// a 12x2 case and a 6-pack is a 6x4 case. Both hold 24 units, so both count as
// one standard case. Using the sold-unit number instead divides the standard
// cases — and the syrup with them — by two or four.
describe('12x2 and 6x4 pack conventions', () => {
  it('counts a 12x2 case as one standard case', () => {
    expect(packToStandardCases(4400, 24)).toBe(4400);
  });

  it('counts a 6x4 case as one standard case too', () => {
    expect(packToStandardCases(4400, 24)).toBe(4400);
  });

  it('would halve the run if 12 were used as the pack size', () => {
    expect(packToStandardCases(4400, 12)).toBe(2200);
  });

  it('would quarter the run if 6 were used as the pack size', () => {
    expect(packToStandardCases(4400, 6)).toBe(1100);
  });

  it('plans 12-pack wraps at two per 12x2 case', () => {
    const plan = buildRunPlan({
      product: CAN_12OZ,
      lines: [{ count: 4400, packSize: 24, materials: ['Wraps12'] }],
      materialsDb: { Wraps12: WRAPS_12PK },
    });
    expect(plan.stdCases).toBe(4400);
    // 4,400 cases x 2 wraps = 8,800 wraps; a pallet holds 8,880.
    expect(plan.materials[0].units).toBeCloseTo(8800 / 8880, 6);
    expect(plan.materials[0].pull.whole).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// Reverse date-code lookup
// ---------------------------------------------------------------------------

describe('parsePrintCode', () => {
  it('reads the expiry and production weekday out of a code', () => {
    const r = parsePrintCode('BBJUN0426DDC');
    expect(r.expiry.getFullYear()).toBe(2026);
    expect(r.expiry.getMonth()).toBe(5);      // June
    expect(r.expiry.getDate()).toBe(4);
    expect(r.dayLetter).toBe('C');
    expect(r.dayName).toBe('Wednesday');
  });

  it('maps every day letter back to the weekday it came from', () => {
    DAY_LETTERS.forEach((letter, dow) => {
      expect(parsePrintCode(`BBJUN0426DD${letter}`).dayOfWeek).toBe(dow);
    });
  });

  // Copied off a can by hand, so be forgiving about shape.
  it('tolerates lowercase, spaces and dashes', () => {
    const want = parsePrintCode('BBJUN0426DDC');
    for (const variant of ['bbjun0426ddc', 'BB JUN 04 26 DD C', 'BB-JUN0426-DD-C']) {
      expect(parsePrintCode(variant).expiry.getTime()).toBe(want.expiry.getTime());
    }
  });

  it('rejects malformed codes rather than guessing', () => {
    for (const bad of ['', 'BBJUN0426', 'JUN0426DDC', 'BBXXX0426DDC',
                       'BBJUN0426DDZ', 'BBJUN042026DDC', 'nonsense', null]) {
      expect(parsePrintCode(bad)).toBeNull();
    }
  });

  // Date would silently roll FEB31 into March, inventing a date nobody printed.
  it('rejects impossible calendar dates', () => {
    expect(parsePrintCode('BBFEB3126DDC')).toBeNull();
    expect(parsePrintCode('BBAPR3126DDC')).toBeNull();
    expect(parsePrintCode('BBFEB2925DDC')).toBeNull();   // 2025 wasn't a leap year
  });

  it('accepts a real leap day', () => {
    expect(parsePrintCode('BBFEB2924DDC').expiry.getDate()).toBe(29);
  });
});

describe('productionDateFromCode', () => {
  // BBJUN0126DDC: 1 June 2026 best-before (a Monday), produced on a Wednesday.
  // Generated by the forward pass from 2026-01-28 at 18 weeks.
  const REAL = 'BBJUN0126DDC';

  it('agrees with the code the forward pass produces', () => {
    expect(optimumTasteDate('2026-01-28', 18).printCode).toBe(REAL);
  });

  it('recovers the production date', () => {
    const r = productionDateFromCode(REAL, 18);
    expect(r.isoDate).toBe('2026-01-28');
    expect(r.display).toBe('Jan-28-26');
    expect(r.dayName).toBe('Wednesday');
    expect(r.prodDate.getDay()).toBe(3);
  });

  it('returns an ISO date that feeds straight back into the forward pass', () => {
    const back = productionDateFromCode(REAL, 18);
    expect(optimumTasteDate(back.isoDate, 18).printCode).toBe(REAL);
  });

  // The property that matters: the two directions must agree for every shelf
  // life and every weekday, or QA and the floor disagree about a hold.
  //
  // Compared as calendar dates, not timestamps. The forward pass reaches the
  // expiry by adding milliseconds, so crossing a DST boundary leaves it an hour
  // either side of noon; the reverse builds it at noon directly. A print code
  // carries no time of day, so the day is the whole of what must match.
  const sameDay = (a, b) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  it('round-trips against optimumTasteDate for every shelf life and weekday', () => {
    for (const w of [11, 13, 18, 22, 26, 30, 35, 39, 52]) {
      for (let offset = 0; offset < 7; offset++) {
        const iso = `2026-03-${String(12 + offset).padStart(2, '0')}`;
        const fwd = optimumTasteDate(iso, w);
        const back = productionDateFromCode(fwd.printCode, w);
        expect(back.isoDate).toBe(iso);
        expect(sameDay(back.expiry, fwd.expiry)).toBe(true);
        expect(sameDay(back.weekStart, fwd.weekStart)).toBe(true);
        expect(back.weekAligned).toBe(true);
      }
    }
  });

  // Shelf life is whole weeks measured from a Monday, so every generated code
  // expires on a Monday. This is what makes a bad code detectable.
  it('every generated code expires on a Monday', () => {
    for (const w of [11, 18, 39, 52]) {
      for (let offset = 0; offset < 7; offset++) {
        const iso = `2026-03-${String(12 + offset).padStart(2, '0')}`;
        expect(optimumTasteDate(iso, w).expiry.getDay()).toBe(1);
      }
    }
  });

  it('flags a code whose expiry is not a Monday as unaligned', () => {
    // 4 June 2026 is a Thursday — parseable, but not something we printed.
    const r = productionDateFromCode('BBJUN0426DDC', 18);
    expect(r).not.toBeNull();
    expect(r.weekAligned).toBe(false);
  });

  it('gives a different production date for a different shelf life', () => {
    const a = productionDateFromCode(REAL, 13);
    const b = productionDateFromCode(REAL, 39);
    expect(a.isoDate).not.toBe(b.isoDate);
    expect(a.prodDate.getTime()).toBeGreaterThan(b.prodDate.getTime());
  });

  it('survives a daylight-saving boundary', () => {
    // US DST starts 2026-03-08; a 13-week reach back from June crosses it.
    const fwd = optimumTasteDate('2026-02-02', 13);
    expect(productionDateFromCode(fwd.printCode, 13).isoDate).toBe('2026-02-02');
  });

  it('returns null without a usable code or shelf life', () => {
    expect(productionDateFromCode('rubbish', 18)).toBeNull();
    expect(productionDateFromCode(REAL, 0)).toBeNull();
    expect(productionDateFromCode(REAL, NaN)).toBeNull();
    expect(productionDateFromCode(REAL, undefined)).toBeNull();
  });
});
