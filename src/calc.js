/**
 * Pure calculation core for the Production Calculator.
 *
 * No DOM, no Firebase, no side effects — everything here is a plain function of
 * its arguments so it can be tested directly. main.js owns all the wiring and
 * calls into this module for the arithmetic.
 *
 * These numbers drive real inventory counts, so behaviour here is deliberately
 * pinned by src/calc.test.js. Change a formula and expect a test to fail.
 */

/** The plant records all volume against a 24-pack baseline. */
export const STANDARD_PACK = 24;

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Print-code day letters, indexed by Date#getDay() (0 = Sunday). */
export const DAY_LETTERS = ["G", "A", "B", "C", "D", "E", "F"];

/** Weekday names, same indexing as DAY_LETTERS. */
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday",
                          "Thursday", "Friday", "Saturday"];

// ---------------------------------------------------------------------------
// Input parsing
// ---------------------------------------------------------------------------

/**
 * Evaluate a user-typed arithmetic expression, e.g. "506*24/30".
 *
 * Everything outside digits and basic operators is stripped before evaluation,
 * so no identifier can survive to be called. Returns 0 on anything unusable
 * rather than throwing, because this runs on every keystroke.
 */
export function evaluateExpression(expr) {
  const sanitized = String(expr ?? "").replace(/[^0-9+\-*/(). ]/g, "");
  if (sanitized.trim() === "") return 0;
  try {
    const result = new Function("return " + sanitized)();
    return typeof result === "number" && isFinite(result) ? result : 0;
  } catch (e) {
    return 0;
  }
}

/**
 * Parse a value typed into any numeric field.
 * Handles thousands separators ("1,234.5") and `=` expressions ("=12*24/30").
 */
export function parseNumericInput(value) {
  if (typeof value === "number") return isFinite(value) ? value : 0;
  const str = String(value ?? "").trim();
  if (str === "") return 0;
  if (str.startsWith("=")) return evaluateExpression(str.slice(1));
  const n = parseFloat(str.replace(/,/g, ""));
  return isFinite(n) ? n : 0;
}

/** Display formatting: thousands separators, decimals only when meaningful. */
export function fmt(num, { decimals = 2 } = {}) {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return "";
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(num) ? 0 : decimals,
    maximumFractionDigits: decimals,
  });
}

// ---------------------------------------------------------------------------
// Syrup
// ---------------------------------------------------------------------------

/**
 * Yields for a SKU.
 *   cans    — derived from the pallet spec
 *   bottles — `factor` is already cases per gallon; pallets don't apply
 */
export function computeSkuYields(product) {
  if (!product) return { casesPerGal: 0, casesPerPlt: 0 };
  if (product.type === "bottle") {
    return { casesPerGal: product.factor, casesPerPlt: 0 };
  }
  return {
    casesPerGal: product.casesPerPallet / product.galPerPallet,
    casesPerPlt: product.casesPerPallet,
  };
}

/** Convert a count of physical packs into 24-pack standard cases. */
export function packToStandardCases(count, packSize) {
  return (count || 0) * (packSize || 0) / STANDARD_PACK;
}

/**
 * Total standard cases across the per-line counts.
 * @param {Array<{count:number, packSize:number}>} lines
 */
export function standardCasesFromLines(lines) {
  return (lines || []).reduce(
    (sum, l) => sum + packToStandardCases(l && l.count, l && l.packSize), 0);
}

/** Standard cases implied by a value typed into one of the top-row fields. */
export function standardCasesFromSource(product, yields, source, value) {
  if (!product) return 0;
  const v = value || 0;
  switch (source) {
    case "gals":
      return product.type === "bottle" ? v * product.factor : v * yields.casesPerGal;
    case "plts":
      // Bottles have no pallet figure to convert from.
      return product.type === "bottle" ? 0 : v * yields.casesPerPlt;
    case "cases":
      return v;
    default:
      return 0;
  }
}

/** Gallons and pallets implied by a standard-case total. */
export function deriveFromStandardCases(product, yields, stdCases) {
  if (!product) return { gals: 0, plts: 0 };
  if (product.type === "bottle") {
    return { gals: stdCases / product.factor, plts: 0 };
  }
  return {
    gals: stdCases / yields.casesPerGal,
    plts: stdCases / yields.casesPerPlt,
  };
}

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------

/** Cases produced by one unit of a material (one pallet / roll / box / reel). */
export function casesPerMaterialUnit(material) {
  if (!material) return 0;
  const per = material.unitsPerPallet / material.unitsPerCase;
  return isFinite(per) ? per : 0;
}

/** Material units required to hit a case target. */
export function materialUnitsForCases(material, cases) {
  const per = casesPerMaterialUnit(material);
  if (!per || !(cases > 0)) return 0;
  return cases / per;
}

/** Cases producible from a quantity of material on hand. */
export function casesFromMaterialUnits(material, units) {
  const per = casesPerMaterialUnit(material);
  if (!per || !(units > 0)) return 0;
  return units * per;
}

/**
 * Fractional units aren't pullable from a warehouse, so translate to the whole
 * number an operator acts on plus how much of the last one gets consumed.
 * Returns null when there's nothing to pull.
 */
export function unitsToPull(units) {
  if (!units || units <= 0 || !isFinite(units)) return null;
  // Tolerate float dust so an exact 3.0000000004 doesn't demand a 4th pallet.
  const whole = Math.ceil(units - 1e-9);
  const remainder = whole - units;
  return {
    whole,
    exactlyFull: remainder < 1e-6,
    lastUsedPct: Math.round((1 - remainder) * 100),
  };
}

// ---------------------------------------------------------------------------
// Run plans
// ---------------------------------------------------------------------------

/**
 * A product's bill of materials is stored as a pipe-delimited string so it
 * survives the CSV round-trip without fighting the comma separator.
 */
export function parseMaterialList(value) {
  if (Array.isArray(value)) return value.map((s) => String(s).trim()).filter(Boolean);
  return String(value ?? "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

export function formatMaterialList(names) {
  return (names || []).map((s) => String(s).trim()).filter(Boolean).join("|");
}

/**
 * How many standard 24-cases one physical case of this material makes.
 *
 * A 35-pack film tray wraps 35 cans, so one tray is 35/24 standard cases. Most
 * materials are already 24-based and carry no factor at all.
 */
export function packFactorOf(material) {
  const f = material && material.stdCaseFactor;
  return Number.isFinite(f) && f > 0 ? f : 1;
}

/**
 * Material units needed to cover a target expressed in standard 24-cases.
 *
 * Distinct from materialUnitsForCases(), which takes the material's own
 * physical cases. Everything on a run plan is driven by one standard-case
 * target, so the conversion has to happen here or oversized packs over-pull.
 */
export function materialUnitsForStandardCases(material, stdCases) {
  if (!material || !(stdCases > 0)) return 0;
  return materialUnitsForCases(material, stdCases / packFactorOf(material));
}

/**
 * Standard 24-cases producible from a quantity of material on hand.
 * The inverse of materialUnitsForStandardCases().
 */
export function standardCasesFromMaterialUnits(material, units) {
  if (!material || !(units > 0)) return 0;
  return casesFromMaterialUnits(material, units) * packFactorOf(material);
}

/**
 * Everything a run needs: syrup volume plus every material to pull.
 *
 * A run is rarely one pack size. 10,000 35-packs plus 2,000 18-packs plus
 * 5,000 12-packs is one run, and the materials don't apply evenly across it —
 * 35-pack film trays are consumed only by the 35-pack portion. So each pack
 * line carries its own count, pack size and materials, and a material's demand
 * is summed across just the lines that actually use it.
 *
 * @param {object} product
 * @param {Array<{count:number, packSize:number, materials:string[]}>} lines
 * @param {Object<string,object>} materialsDb  name -> material record
 */
export function buildRunPlan({ product, lines, materialsDb } = {}) {
  const db = materialsDb || {};

  const packLines = (lines || []).filter(Boolean).map((l) => {
    const count = l.count > 0 ? l.count : 0;
    const packSize = l.packSize > 0 ? l.packSize : 0;
    return {
      count,
      packSize,
      stdCases: packToStandardCases(count, packSize),
      materials: (l.materials || []).filter(Boolean),
    };
  });

  const stdCases = packLines.reduce((sum, l) => sum + l.stdCases, 0);
  const yields = computeSkuYields(product);
  const { gals, plts } = deriveFromStandardCases(product, yields, stdCases);

  // Sum exact units per material first and round once at the end. Rounding each
  // line separately would pull a spare pallet for every line sharing a material.
  const totals = new Map();
  for (const line of packLines) {
    for (const name of line.materials) {
      const entry = totals.get(name) || { name, data: db[name], units: 0 };
      entry.units += materialUnitsForStandardCases(db[name], line.stdCases);
      totals.set(name, entry);
    }
  }

  const materials = [...totals.values()]
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ name, data, units }) => ({
      name,
      unitName: (data && data.unitName) || "Pallets",
      desc: (data && data.desc) || "",
      packFactor: packFactorOf(data),
      casesPerUnit: casesPerMaterialUnit(data),
      // A material with no usable conversion can't be planned; the UI says so
      // rather than quietly printing a zero that looks like "none needed".
      usable: casesPerMaterialUnit(data) > 0,
      units,
      pull: unitsToPull(units),
    }));

  return { stdCases, gals, plts, lines: packLines, materials };
}

// ---------------------------------------------------------------------------
// QA date codes
// ---------------------------------------------------------------------------

/**
 * Optimum taste date for a production date.
 *
 * Shelf life runs from the Monday of the production week, so every day in a
 * given week yields the same expiry. Dates are anchored at noon local time so
 * that adding whole days across a daylight-saving boundary can't roll the
 * calendar date backwards or forwards.
 *
 * @param {string} prodDateStr  ISO date, "YYYY-MM-DD"
 * @param {number} weeks        shelf life in weeks
 * @returns {{display:string, printCode:string, expiry:Date, weekStart:Date}|null}
 */
export function optimumTasteDate(prodDateStr, weeks) {
  const w = Number(weeks);
  if (!w || isNaN(w) || !prodDateStr) return null;

  const prodDate = new Date(prodDateStr + "T12:00:00");
  if (isNaN(prodDate.getTime())) return null;

  const DAY_MS = 24 * 60 * 60 * 1000;
  const dayOfWeek = prodDate.getDay();
  const daysToSubtract = (dayOfWeek + 6) % 7;          // Monday-based week
  const weekStart = new Date(prodDate.getTime() - daysToSubtract * DAY_MS);
  const expiry = new Date(weekStart.getTime() + w * 7 * DAY_MS);

  const m = MONTHS[expiry.getMonth()];
  const d = String(expiry.getDate()).padStart(2, "0");
  const y = String(expiry.getFullYear()).slice(-2);

  return {
    display: `${m}-${d}-${y}`,
    printCode: `BB${m.toUpperCase()}${d}${y}DD${DAY_LETTERS[dayOfWeek]}`,
    expiry,
    weekStart,
  };
}

/**
 * Read a print code back into the date it encodes.
 *
 * The code carries the *expiry* date and the weekday the product was made —
 * "BBJUN0126DDC" is a June 1st 2026 best-before, produced on a Wednesday. It
 * does not carry the shelf life, so this alone can't say when it was made;
 * productionDateFromCode() adds that.
 *
 * Lenient about spacing, dashes and case, because the code is being copied off
 * a warm can by someone holding a clipboard.
 *
 * @returns {{expiry:Date, dayLetter:string, dayOfWeek:number, dayName:string}|null}
 */
export function parsePrintCode(code) {
  const s = String(code ?? "").toUpperCase().replace(/[\s\-_.]/g, "");
  const m = /^BB([A-Z]{3})(\d{2})(\d{2})DD([A-G])$/.exec(s);
  if (!m) return null;

  const monthIdx = MONTHS.findIndex((x) => x.toUpperCase() === m[1]);
  if (monthIdx < 0) return null;

  const day = Number(m[2]);
  const year = 2000 + Number(m[3]);
  const dayOfWeek = DAY_LETTERS.indexOf(m[4]);
  if (dayOfWeek < 0) return null;

  const expiry = new Date(year, monthIdx, day, 12, 0, 0);
  // Date rolls FEB31 forward into March rather than failing, so check it back.
  if (expiry.getMonth() !== monthIdx || expiry.getDate() !== day) return null;

  return {
    expiry,
    dayLetter: m[4],
    dayOfWeek,
    dayName: DAY_NAMES[dayOfWeek],
  };
}

/**
 * When was this made? The inverse of optimumTasteDate().
 *
 * Shelf life runs from the Monday of the production week, so the expiry gives
 * back that Monday, and the code's day letter says which day of that week the
 * line actually ran.
 *
 * @param {string} code   print code, e.g. "BBJUN0426DDC"
 * @param {number} weeks  shelf life for the product category
 * @returns {{prodDate:Date, isoDate:string, display:string, weekStart:Date,
 *            expiry:Date, dayName:string, weeks:number}|null}
 */
export function productionDateFromCode(code, weeks) {
  const parsed = parsePrintCode(code);
  const w = Number(weeks);
  if (!parsed || !w || isNaN(w) || w <= 0) return null;

  const DAY_MS = 24 * 60 * 60 * 1000;
  const weekStart = new Date(parsed.expiry.getTime() - w * 7 * DAY_MS);
  const prodDate = new Date(weekStart.getTime() + ((parsed.dayOfWeek + 6) % 7) * DAY_MS);

  const pad = (n) => String(n).padStart(2, "0");

  return {
    prodDate,
    // Shelf life is whole weeks from a Monday, so a code this system printed
    // always expires on a Monday. Anything else came from somewhere else — the
    // answer below is still the best reading, but it shouldn't be trusted blind.
    weekAligned: parsed.expiry.getDay() === 1,
    // Feeds straight back into optimumTasteDate() / an <input type="date">.
    isoDate: `${prodDate.getFullYear()}-${pad(prodDate.getMonth() + 1)}-${pad(prodDate.getDate())}`,
    display: `${MONTHS[prodDate.getMonth()]}-${pad(prodDate.getDate())}-${String(prodDate.getFullYear()).slice(-2)}`,
    weekStart,
    expiry: parsed.expiry,
    dayName: parsed.dayName,
    weeks: w,
  };
}
