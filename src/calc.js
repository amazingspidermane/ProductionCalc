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
 * Material units one pack line consumes.
 *
 * Two kinds of material, and they scale with different things:
 *
 * - A **pre-formed pack** — a film tray — arrives from the shipper already
 *   built for one pack. A line of 5,000 35-packs needs 5,000 trays, whatever
 *   that works out to in 24-baseline volume. `stdCaseFactor` is what marks a
 *   material as this kind, so it now selects the rule rather than scaling the
 *   answer.
 * - **Everything else** — caps, labels — is consumed per can, so it scales with
 *   the line's volume. A 35-pack line puts 35 caps on every pack, not 24, and
 *   driving caps off the pack count would under-pull them by a third.
 *
 * Where a tray's own pack size matches the line's, both rules give the same
 * number; they diverge only when a line is pointed at a tray built for some
 * other pack size, and there the pack count is the one that can be filled.
 */
export function materialUnitsForLine(material, line) {
  if (!material || !line) return 0;
  return isPreformedPack(material)
    ? materialUnitsForCases(material, line.count)
    : materialUnitsForCases(material, line.stdCases);
}

/**
 * Does this material arrive already built for one pack?
 *
 * A film tray does: one 35-pack tray holds one 35-pack, so it is counted in
 * packs. Caps and labels do not — they are consumed per can and are counted in
 * standard cases. `stdCaseFactor` is only ever set on the pre-formed packs, so
 * it doubles as the marker. Both the Materials tab wording and the run-plan
 * arithmetic read this, so they cannot drift apart.
 */
export function isPreformedPack(material) {
  return !!material
    && Number.isFinite(material.stdCaseFactor)
    && material.stdCaseFactor > 0;
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
      entry.units += materialUnitsForLine(db[name], line);
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
      // Drives the wording: a pre-formed pack was pulled one per pack, not
      // converted through the 24 baseline.
      preformed: isPreformedPack(data),
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

/**
 * A code printed the night before the shift it belongs to would otherwise read
 * as "made tomorrow". One day of slack keeps that from being called impossible.
 */
const FUTURE_GRACE_DAYS = 1;

/**
 * Which product is this code likely to be?
 *
 * The code carries an expiry and a production weekday — never the shelf life —
 * so the product is genuinely not determined by it. What IS determined is the
 * production date *per candidate shelf life*: a longer shelf life pushes the
 * implied production date further back. Two facts then narrow the field hard:
 *
 *   1. A production date in the future is impossible. On a long-dated code that
 *      rules out every short shelf life outright, often leaving one answer.
 *   2. Product read off a line or a fresh pallet was made recently, so the
 *      candidate implying the most recent production date is the best bet.
 *
 * Candidates are shelf-life groups, not single products. Several SKUs share a
 * figure — 52 weeks covers Dasani bottles and Seagram's Seltzer alike — and no
 * amount of arithmetic separates them, so the group is as fine as this gets.
 *
 * @param {string} code  print code, e.g. "BBJUN0126DDC"
 * @param {Array<{name:string, weeks:number, category?:string}>} catalogue
 * @param {{today?:Date}} [options]
 * @returns {{expiry:Date, dayName:string, expired:boolean, weekAligned:boolean,
 *            sole:boolean, best:object|null, candidates:object[]}|null}
 */
export function identifyFromPrintCode(code, catalogue, { today = new Date() } = {}) {
  const parsed = parsePrintCode(code);
  if (!parsed) return null;

  // Anchor both ends of the subtraction at noon so the day count is whole and
  // a daylight-saving boundary can't shift it, matching optimumTasteDate().
  const noonToday = new Date(today.getFullYear(), today.getMonth(),
                             today.getDate(), 12, 0, 0);
  const DAY_MS = 24 * 60 * 60 * 1000;

  // Group the catalogue by shelf life; the code can only ever identify a group.
  const byWeeks = new Map();
  for (const entry of catalogue || []) {
    const w = Number(entry && entry.weeks);
    if (!(w > 0)) continue;
    const group = byWeeks.get(w) || { weeks: w, products: [] };
    group.products.push({
      name: String(entry.name ?? ''),
      category: entry.category,
    });
    byWeeks.set(w, group);
  }

  const candidates = [...byWeeks.values()].map((group) => {
    const r = productionDateFromCode(code, group.weeks);
    const ageDays = Math.round((noonToday.getTime() - r.prodDate.getTime()) / DAY_MS);
    return {
      ...group,
      products: group.products.slice().sort((a, b) => a.name.localeCompare(b.name)),
      prodDate: r.prodDate,
      isoDate: r.isoDate,
      display: r.display,
      dayName: r.dayName,
      ageDays,
      // Negative age means the line would not have run yet.
      possible: ageDays >= -FUTURE_GRACE_DAYS,
    };
  });

  // Possible readings first, most recently produced first — that is the whole
  // ranking. Impossible ones stay in the list, nearest-miss first, because
  // seeing them ruled out is what makes the surviving answer trustworthy.
  candidates.sort((a, b) => {
    if (a.possible !== b.possible) return a.possible ? -1 : 1;
    return a.possible ? a.ageDays - b.ageDays : b.ageDays - a.ageDays;
  });

  const possible = candidates.filter((c) => c.possible);

  return {
    expiry: parsed.expiry,
    dayName: parsed.dayName,
    expired: parsed.expiry.getTime() < noonToday.getTime(),
    // An expiry that isn't a Monday didn't come from this plant's system, so
    // every reading below is a guess about someone else's numbering.
    weekAligned: parsed.expiry.getDay() === 1,
    // One survivor is the strong case: arithmetic alone settled it.
    sole: possible.length === 1,
    best: possible[0] || null,
    candidates,
  };
}

// ---------------------------------------------------------------------------
// Water line (Dasani) — salts tank
// ---------------------------------------------------------------------------

/**
 * Case output for the water line, from the two numbers an operator can read
 * straight off the floor: batches made, and salts tank %.
 *
 * Source: batch sheet Fm-268-DD (Dasani Refresh, Formula WA/M-219.0).
 *
 * The sheet's "Yield (gals.) 20" field is not gallons -- it is the mineral
 * concentration a 50-unit batch produces, ~20%. That is what makes the whole
 * thing divide cleanly: one batch is 20%, so 1% is a twentieth of the batch's
 * case count. For 20oz that is 7,000 / 20 = 350 cases per 1%.
 *
 * This supersedes an earlier reading based on watching SALTS TK 2 move
 * 5.8% -> 22.0% (16.2%) on one batch. 20 is the specified figure; 16.2 was a
 * single observation, and the notes already flag the tank transmitters as
 * suspect. Using 20 also estimates fewer cases at a given reading, which is
 * the safe direction for a runout.
 *
 * IMPORTANT: `cases` here means cases in the size's own pack configuration --
 * 1.5L runs 12pk only, the others 24pk. These are NOT the app's standard
 * 24-cases and must not be added to Syrup or Run Plan totals without
 * converting.
 */

/** Fixed batch increment on the HMI (Batch Tank 1 & 2 Ops). */
export const WATER_BATCH_UNITS = 50;

/**
 * Mineral concentration produced by one 50-unit batch, from the batch sheet's
 * Yield field. The denominator behind every cases-per-1% figure below.
 */
export const WATER_PCT_PER_BATCH = 20;

/**
 * Per size: cases from one 50-unit batch, and the pack it runs as.
 *
 * casesPerBatch is read straight off the batch sheet, which groups 0.5L and 1L
 * on one line at 8,300 -- consistent with both sharing a conversion factor in
 * DEFAULT_PRODUCTS. Cases per 1% is derived rather than stored, so the two can
 * never drift apart.
 *
 * `packSize` is not on the sheet, which lists sizes only. 1.5L is confirmed
 * 12pk and is never run as 24pk.
 */
export const WATER_SIZES = {
  "12oz / 24pk":      { casesPerBatch: 11700, packSize: 24 },
  "20oz / 24pk":      { casesPerBatch: 7000,  packSize: 24 },
  "0.5L / 1L / 24pk": { casesPerBatch: 8300,  packSize: 24 },
  "1.5L / 12pk":      { casesPerBatch: 5550,  packSize: 12 },
};

/** Cases produced per 1% of mineral concentration, for one size. */
export function casesPerPctFor(size) {
  const s = WATER_SIZES[size];
  return s ? s.casesPerBatch / WATER_PCT_PER_BATCH : 0;
}

/**
 * Cases still available at a given tank level.
 *
 * Rounded DOWN. The four case counts on the batch sheet back-solve to finished
 * volumes spanning ~0.5%, so these are planning figures, not exact. Rounding
 * down means a runout estimate never promises cases that aren't there.
 */
export function casesFromTankLevel(size, levelPct) {
  const s = WATER_SIZES[size];
  if (!s || !(levelPct > 0)) return 0;
  return Math.floor(levelPct * casesPerPctFor(size));
}

/**
 * Tank level needed to cover a case target.
 * Exact value; the UI rounds up for display, since a shortfall means a runout.
 */
export function tankLevelForCases(size, cases) {
  const s = WATER_SIZES[size];
  if (!s || !(cases > 0)) return 0;
  return cases / casesPerPctFor(size);
}

/**
 * Batches needed for a case target.
 * Batches are made in whole 50-unit increments, so this rounds UP -- with the
 * same float-dust tolerance unitsToPull() uses, so an exact 2.0 doesn't ask
 * for a third.
 */
export function batchesForCases(size, cases) {
  const s = WATER_SIZES[size];
  if (!s || !(cases > 0)) return null;
  const exact = cases / s.casesPerBatch;
  return {
    exact,
    whole: Math.ceil(exact - 1e-9),
  };
}

/** Everything the water tab shows for one size. */
export function waterPlan(size, { levelPct, targetCases } = {}) {
  const s = WATER_SIZES[size];
  if (!s) return null;

  return {
    size,
    packSize: s.packSize,
    casesPerBatch: s.casesPerBatch,
    casesPerPct: casesPerPctFor(size),
    // From tank level: what's left.
    available: casesFromTankLevel(size, levelPct),
    // From a target: what it takes.
    levelNeeded: tankLevelForCases(size, targetCases),
    batches: batchesForCases(size, targetCases),
  };
}
