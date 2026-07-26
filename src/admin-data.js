/**
 * Admin data plumbing: CSV round-tripping and record validation.
 *
 * Pure functions only — no DOM, no Firebase — so the rules that decide whether
 * a conversion factor is acceptable are testable. main.js uses the same
 * validators for both form saves and CSV imports, so the two can't drift.
 */

// ---------------------------------------------------------------------------
// CSV
// ---------------------------------------------------------------------------

/** Quote a value if it contains a comma, quote or newline. */
export function escapeCsvValue(value) {
  if (value === null || value === undefined) return "";
  const s = String(value);
  return /[",\r\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
}

/** Serialise records to CSV with an explicit column order. */
export function toCsv(rows, columns) {
  const lines = [columns.map(escapeCsvValue).join(",")];
  for (const row of rows || []) {
    lines.push(columns.map((c) => escapeCsvValue(row[c])).join(","));
  }
  return lines.join("\r\n");
}

/**
 * Split CSV text into rows of raw string fields.
 * Handles quoted fields containing commas and newlines, "" escapes, CRLF/LF,
 * and a leading BOM (Excel writes one).
 */
export function parseCsvRows(text) {
  const s = String(text ?? "").replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  let sawAny = false;

  for (let i = 0; i < s.length; i++) {
    const c = s[i];

    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') { inQuotes = true; sawAny = true; }
    else if (c === ",") { row.push(field); field = ""; sawAny = true; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && s[i + 1] === "\n") i++;   // consume CRLF as one break
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      sawAny = false;
    } else {
      field += c;
      sawAny = true;
    }
  }

  if (sawAny || field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

/** Parse CSV into objects keyed by the header row. Blank lines are dropped. */
export function parseCsv(text) {
  const rows = parseCsvRows(text).filter(
    (r) => !(r.length === 1 && r[0].trim() === "")
  );
  if (!rows.length) return [];

  const header = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) =>
    Object.fromEntries(header.map((h, i) => [h, r[i] === undefined ? "" : r[i]]))
  );
}

// ---------------------------------------------------------------------------
// Schemas
// ---------------------------------------------------------------------------

export const SCHEMAS = {
  materials: {
    columns: ["name", "number", "desc", "category", "unitName",
              "unitsPerPallet", "unitsPerCase", "boxesPerPallet",
              "unitsPerBox", "stdCaseFactor"],
    numeric: ["unitsPerPallet", "unitsPerCase", "boxesPerPallet",
              "unitsPerBox", "stdCaseFactor"],
    required: ["name"],
  },
  products: {
    // `materials` is the bill of materials for a run: a pipe-delimited list of
    // material names. Pipe rather than comma so it survives the CSV round-trip
    // even though several material names contain commas.
    columns: ["name", "type", "galPerPallet", "casesPerPallet", "factor", "materials"],
    numeric: ["galPerPallet", "casesPerPallet", "factor"],
    required: ["name", "type"],
  },
  qacodes: {
    columns: ["name", "category", "weeks"],
    numeric: ["weeks"],
    required: ["name", "category"],
  },
};

/** Fields whose value drives production maths — changes here deserve a prompt. */
export const CRITICAL_FIELDS = {
  materials: ["unitsPerPallet", "unitsPerCase"],
  products: ["galPerPallet", "casesPerPallet", "factor"],
  qacodes: ["weeks"],
};

/**
 * Turn a raw record (CSV strings or form values) into typed data.
 * Empty optional fields are omitted rather than written as 0, because a stored
 * 0 silently produces Infinity downstream.
 */
export function coerceRecord(collection, raw) {
  const schema = SCHEMAS[collection];
  if (!schema || !raw) return {};

  const out = {};
  for (const col of schema.columns) {
    const v = raw[col];
    if (v === undefined || v === null || String(v).trim() === "") continue;

    if (schema.numeric.includes(col)) {
      out[col] = parseFloat(String(v).replace(/,/g, ""));
    } else {
      out[col] = String(v).trim();
    }
  }
  return out;
}

/**
 * Validate a coerced record. Returns an array of human-readable problems;
 * empty means it's safe to save.
 */
export function validateRecord(collection, data) {
  const schema = SCHEMAS[collection];
  if (!schema) return ["Unknown collection"];

  const errors = [];
  const d = data || {};

  for (const f of schema.required) {
    if (d[f] === undefined || String(d[f]).trim() === "") {
      errors.push(`${f} is required`);
    }
  }

  for (const f of schema.numeric) {
    if (f in d && !Number.isFinite(d[f])) {
      errors.push(`${f} must be a number`);
    }
  }

  const positive = (f) => {
    if (!(d[f] > 0)) errors.push(`${f} must be greater than 0`);
  };

  if (collection === "materials") {
    positive("unitsPerPallet");
    positive("unitsPerCase");
  }

  if (collection === "products") {
    if (d.type === "can") {
      positive("galPerPallet");
      positive("casesPerPallet");
    } else if (d.type === "bottle") {
      positive("factor");
    } else if (d.type !== undefined) {
      errors.push('type must be "can" or "bottle"');
    }
  }

  if (collection === "qacodes") {
    positive("weeks");
    if (d.category !== undefined && !["can", "bottle"].includes(d.category)) {
      errors.push('category must be "can" or "bottle"');
    }
  }

  return [...new Set(errors)];
}

/**
 * Did a production-critical value move enough to be worth confirming?
 * Guards against a typo like 3403.75 for 340.375, which would silently put
 * every device on the floor 10x out.
 */
export function significantChanges(collection, previous, next, threshold = 0.25) {
  if (!previous || !next) return [];

  return (CRITICAL_FIELDS[collection] || []).flatMap((field) => {
    const before = previous[field];
    const after = next[field];
    if (!(before > 0) || !(after > 0) || before === after) return [];
    const delta = Math.abs(after - before) / before;
    return delta > threshold
      ? [{ field, before, after, pctChange: Math.round(delta * 100) }]
      : [];
  });
}

/**
 * Where does an entry live — cloud, app code, or both?
 *
 * The calculator runs on `{...defaults, ...cloud}`, so an entry present only in
 * code still drives real numbers and must be listed and editable. Built-ins have
 * no document to delete; editing one creates a cloud override.
 */
export function classifyEntry(name, idsByName, defaults) {
  const docIds = (idsByName && idsByName[name]) || [];
  const isCloud = docIds.length > 0;
  return {
    docIds,
    isCloud,
    isBuiltIn: Object.prototype.hasOwnProperty.call(defaults || {}, name),
    overridesBuiltIn: isCloud && Object.prototype.hasOwnProperty.call(defaults || {}, name),
    duplicateCount: Math.max(0, docIds.length - 1),
    canDelete: isCloud,
    primaryId: isCloud ? docIds[0] : null,
  };
}

/** Build an upsert plan: which records are new vs replacing an existing doc. */
export function planUpsert(records, existingIdsByName) {
  const ids = existingIdsByName || {};
  const plan = { create: [], update: [], duplicatesCleaned: 0 };

  for (const rec of records || []) {
    const docIds = ids[rec.name];
    if (docIds && docIds.length) {
      plan.update.push({ id: docIds[0], data: rec });
      // Extra copies of the same name get removed as part of the upsert.
      plan.duplicatesCleaned += docIds.length - 1;
    } else {
      plan.create.push(rec);
    }
  }
  return plan;
}
