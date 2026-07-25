import './styles.css';
// Self-hosted Font Awesome (solid set only) — removes the blocking cdnjs
// request and lets the service worker cache the icon font for offline use.
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Swal from 'sweetalert2';
// All arithmetic lives in calc.js so it can be tested without a DOM.
import {
  fmt,
  parseNumericInput,
  evaluateExpression,
  computeSkuYields,
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
  MONTHS,
  parseMaterialList,
  formatMaterialList,
  buildRunPlan,
} from './calc.js';
import {
  SCHEMAS,
  toCsv,
  parseCsv,
  coerceRecord,
  validateRecord,
  significantChanges,
  planUpsert,
  classifyEntry,
} from './admin-data.js';
import {
  STATUS,
  statusFromSnapshot,
  overallDataStatus,
  describeDataStatus,
} from './data-status.js';
import { initializeApp } from "firebase/app";
import {
  getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc,
  serverTimestamp, writeBatch
} from "firebase/firestore";
import { 
  getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut 
} from "firebase/auth";

// --- FIREBASE CONFIGURATION ---
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Debug warning so you know when the .env file is finally in the right place
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
    console.warn("⚠️ Vite cannot see the .env file. Using fallback keys. Make sure .env is placed directly next to package.json, NOT inside the /src folder!");
} else {
    console.log("✅ Secure environment variables loaded successfully!");
}

const app = initializeApp(firebaseConfig);

// Persist Firestore data on the device so a plant-floor dead zone shows the
// last real data instead of silently falling back to the built-in constants.
// Multi-tab manager keeps several open tabs from fighting over the same cache.
let db;
try {
  db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch (e) {
  // Private browsing or a blocked IndexedDB — still usable, just not offline.
  console.warn("Offline cache unavailable; continuing without it.", e?.message);
  db = getFirestore(app);
}

const auth = getAuth(app);

// --- HARDCODED DEFAULTS (FALLBACKS) ---
const DEFAULT_PRODUCTS = {
  "12 oz. Can": { type: "can", galPerPallet: 118, casesPerPallet: 340.375 },
  "12 oz. Slim Can": { type: "can", galPerPallet: 117, casesPerPallet: 337.333 },
  "7.5 oz. Can": { type: "can", galPerPallet: 109, casesPerPallet: 506 },
  "16 oz. Can": { type: "can", galPerPallet: 120, casesPerPallet: 259.33 },
  "12oz Bottle": { type: "bottle", factor: 2.8889 },
  "20oz Bottle": { type: "bottle", factor: 1.7281 },
  "0.5 Liter Bottle": { type: "bottle", factor: 2.0502 },
  "1 Liter Bottle": { type: "bottle", factor: 2.0502 },
  "1.5 Liter Bottle": { type: "bottle", factor: 1.625 },
};

const DEFAULT_MATERIALS = {
  "12oz Can Wraps (12-Pack)": { boxesPerPallet: 48, unitsPerBox: 185, unitsPerPallet: 8880, unitsPerCase: 2, desc: "12oz Can - 12 Pack Config", category: "can", unitName: "Pallets" },
  "12oz 24PK 2 Tray (24PK)": { unitsPerPallet: 2400, unitsPerCase: 1, desc: "12oz 24PK 2 Tray (24PK)", category: "can", unitName: "Pallets" },
  "12oz Can Wraps (24-Pack)": { boxesPerPallet: 24, unitsPerBox: 150, unitsPerPallet: 3600, unitsPerCase: 1, desc: "12oz Can - 24 Pack Config", category: "can", unitName: "Pallets" },
  "12oz Can Film Trays (35-Pack)": { unitsPerPallet: 1600, unitsPerCase: 1, desc: "12oz Can - 35 Pack Tray (Film)", category: "can", unitName: "Pallets", stdCaseFactor: 35/24 },
  "7.5oz Can Hi-Cone Trays (6-Pack)": { unitsPerPallet: 2800, unitsPerCase: 1, desc: "7.5oz Can - 6 Pack Hi-Cone", category: "can", unitName: "Pallets" },
  "7.5oz Can Film Trays (30-Pack)": { unitsPerPallet: 2400, unitsPerCase: 1, desc: "7.5oz Can - 30 Pack Tray (Film)", category: "can", unitName: "Pallets", stdCaseFactor: 30/24 },
  "0.5L Bottle Label Rolls (6-Pack)": { unitsPerPallet: 23000, unitsPerCase: 24, desc: "0.5L Labels (6-Pack) - Hi-Cone Config", category: "bottle", unitName: "Rolls" },
  "20oz Bottle Label Rolls (Loose)": { unitsPerPallet: 21000, unitsPerCase: 24, desc: "20oz Labels (Loose) - Roll Config", category: "bottle", unitName: "Rolls" },
  "Bottle Caps (Box)": { unitsPerPallet: 58850, unitsPerCase: 24, desc: "28mm Caps (58,850/Box)", category: "bottle", unitName: "Boxes" },
  "20oz Film Pads (24-Pack)": { unitsPerPallet: 3168, unitsPerCase: 1, desc: "20oz Film Pads - 24-Pack (3,168/Pallet)", category: "bottle", unitName: "Pallets" },
  "Hi-Cone Reel 6-Pack (12oz/0.5l)": { unitsPerPallet: 68800, unitsPerCase: 24, desc: "Hi-Cone Reel 6-Pack - 12oz/0.5L (68,800/Reel)", category: "bottle", unitName: "Reels" },
};

const DATE_CODE_BOTTLES = [
  { name: "DPSG Diets, Sweetened, Zero & RCCB Core (0.5L, 20oz Bottles)", weeks: 11 },
  { name: "DPSG Diets & RCCB Core (1L Bottles)", weeks: 13 },
  { name: "MM Lemonade Zero Sugar & MM Brands (Bottles)", weeks: 22 },
  { name: "MM Lemonade Brands <1L Bottles (Except 20oz Fruit Punch)", weeks: 26 },
  { name: "Non-carbonated / MM Fruit Punch (20oz Bottles)", weeks: 35 },
  { name: "POWERADE / POWER WATER (Bottles)", weeks: 39 },
  { name: "Dasani (Bottles)", weeks: 52 }
];

const DATE_CODE_CANS = [
  { name: "C/F Diet Coke, All Diet Coke flavors (except Diet Coke Lime & Diet Cherry Coke)", weeks: 13 },
  { name: "All Coke Zero flavors, Zero Barq's RB, Fanta Orange Zero, All Sprite Zero flavors, Vanilla Coke Zero, Fresca Original/Peach, Diet Coke Lime, Diet Cherry Coke, Mr Pibb Zero", weeks: 18 },
  { name: "MM Lemonade, MM Pink Lemonade, MM Lemonade Zero", weeks: 26 },
  { name: "All Aguas Frescas flavors, All Topo Chico Sabores flavors", weeks: 30 },
  { name: "MM Fruit Punch", weeks: 35 },
  { name: "Coke, All Coke flavors, All Fanta flavors, Seagram's GA/Tonic, All Sprite flavors, All Powerade Flavors, Mr Pibb, Barq's Root Beer, Coke Orange Cream, All Peace Tea flavors, Barq's Red Crème, Inca Kola, All Bodyarmor-FIT", weeks: 39 },
  { name: "Seagram's Seltzer, All AHA Flavors, Dasani can", weeks: 52 } 
];

// --- APP STATE ---
let MATERIAL_DB = { ...DEFAULT_MATERIALS };
let PRODUCT_DB = { ...DEFAULT_PRODUCTS };
let QA_CODE_DB = {};

// Built-in QA codes as a dictionary, mirroring DEFAULT_MATERIALS / DEFAULT_PRODUCTS
// so the admin panel can tell built-in entries from cloud ones.
const DEFAULT_QACODES = {};
DATE_CODE_BOTTLES.forEach(d => DEFAULT_QACODES[d.name] = { ...d, category: 'bottle' });
DATE_CODE_CANS.forEach(d => DEFAULT_QACODES[d.name] = { ...d, category: 'can' });

QA_CODE_DB = { ...DEFAULT_QACODES };

let MATERIAL_IDS = {};
let PRODUCT_IDS = {};
let QA_CODE_IDS = {};

let editingId = null;
let editingName = null;   // highlights the row being edited in the admin list
let currentActiveTab = "syrup";
let currentAdminTab = "materials";
let currentSkuYields = { casesPerGal: 0, casesPerPlt: 0 };

// --- INIT ---
async function init() {
  try {
    setupAuthUI();
    const dateInput = document.getElementById("datecode-date");
    if (dateInput) dateInput.valueAsDate = new Date();

    initFizz();
    initNavCondense();
    initCopyButtons();
    initAdminControls();

    // Safety net: Populate immediately from defaults so the app never crashes
    populateDropdowns();
    populateDateCodeDropdown();

    // Turn the native selects into searchable comboboxes (progressive
    // enhancement — the underlying <select> stays the source of truth).
    document.querySelectorAll('select[data-combobox]').forEach(enhanceSelect);

    // Bring back whatever the user was last working on.
    restoreSession();

    // Show "Loading…" up front: until a listener reports, the figures on screen
    // are the hardcoded safety net above, not anyone's real data.
    renderDataStatus();

    // LISTENER: Materials
    listenToCollection("materials", (snapshot) => {
      const newDB = {}; MATERIAL_IDS = {};
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data(); newDB[data.name] = data;
          // Store an array of IDs just in case there are duplicates
          if(!MATERIAL_IDS[data.name]) MATERIAL_IDS[data.name] = [];
          MATERIAL_IDS[data.name].push(doc.id);
        });
      }

      // Merge hardcoded defaults with Firestore data
      MATERIAL_DB = { ...DEFAULT_MATERIALS, ...newDB };

      populateDropdowns();
      updateMaterial();
      if(currentAdminTab === 'materials') renderAdminList();
    });

    // LISTENER: Products
    listenToCollection("products", (snapshot) => {
      const newDB = {}; PRODUCT_IDS = {};
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data(); newDB[data.name] = data;
          // Store an array of IDs just in case there are duplicates
          if(!PRODUCT_IDS[data.name]) PRODUCT_IDS[data.name] = [];
          PRODUCT_IDS[data.name].push(doc.id);
        });
      }

      // Merge hardcoded defaults with Firestore data
      PRODUCT_DB = { ...DEFAULT_PRODUCTS, ...newDB };

      populateDropdowns();
      updateSyrupProduct();
      if(currentAdminTab === 'products') renderAdminList();
    });

    // LISTENER: QA Codes
    listenToCollection("qacodes", (snapshot) => {
      const newDB = {}; QA_CODE_IDS = {};
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data(); newDB[data.name] = data;
          // Store an array of IDs just in case there are duplicates
          if(!QA_CODE_IDS[data.name]) QA_CODE_IDS[data.name] = [];
          QA_CODE_IDS[data.name].push(doc.id);
        });
      }

      // Built-in codes first, then cloud entries override by name.
      QA_CODE_DB = { ...DEFAULT_QACODES, ...newDB };

      populateDateCodeDropdown();
      calculateDateCode();
      if(currentAdminTab === 'qacodes') renderAdminList();
    });

  } catch (error) {
    console.error("Initialization Error:", error);
  }
}

// --- DATA FRESHNESS ---

// One entry per Firestore collection the calculator reads. Everything starts
// pending; the banner resolves once each listener has reported in.
const dataStatuses = {
  materials: STATUS.PENDING,
  products:  STATUS.PENDING,
  qacodes:   STATUS.PENDING,
};

function setDataStatus(name, status) {
  if (dataStatuses[name] === status) return;
  dataStatuses[name] = status;
  renderDataStatus();
}

// Tailwind scans this file, so these class strings must be written out in full
// rather than assembled from fragments, or they get purged from the build.
const STATUS_STYLES = {
  ok:      'border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-100',
  warn:    'border-amber-300 bg-amber-50 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-100',
  error:   'border-brand-300 bg-brand-50 text-brand-900 dark:border-brand-500/40 dark:bg-brand-500/10 dark:text-brand-100',
  pending: 'border-slate-300 bg-slate-50 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200',
};

function renderDataStatus() {
  const wrapper = document.getElementById('data-status');
  if (!wrapper) return;

  const view = describeDataStatus(overallDataStatus(dataStatuses), navigator.onLine);
  wrapper.classList.toggle('hidden', !view.show);
  if (!view.show) return;

  const box = document.getElementById('data-status-box');
  const icon = document.getElementById('data-status-icon');
  box.className = `flex items-start gap-3 rounded-xl border px-4 py-3 shadow-card ${STATUS_STYLES[view.level]}`;
  icon.className = `fas ${view.icon} mt-0.5 flex-shrink-0${view.icon === 'fa-spinner' ? ' fa-spin' : ''}`;
  document.getElementById('data-status-label').textContent = view.label;
  document.getElementById('data-status-detail').textContent = view.detail;
}

/**
 * Subscribe to a collection, tracking how fresh its data is alongside the
 * caller's own handling.
 *
 * `includeMetadataChanges` is what lets us see the cache→server handoff in the
 * case where the server's data turns out to match what was already cached —
 * without it the banner would sit on "Reconnecting…" indefinitely. The cost is
 * metadata-only callbacks, which carry no document changes and would otherwise
 * rebuild the dropdowns underneath whoever is using them, so those skip the
 * caller entirely.
 */
function listenToCollection(name, apply) {
  let applied = false;
  return onSnapshot(
    query(collection(db, name), orderBy("name")),
    { includeMetadataChanges: true },
    (snapshot) => {
      setDataStatus(name, statusFromSnapshot({
        fromCache: snapshot.metadata.fromCache,
        isEmpty: snapshot.empty,
      }));

      // Metadata moved but the documents did not — nothing to re-render. The
      // first snapshot always runs, even when empty, so the defaults land.
      if (applied && snapshot.docChanges().length === 0) return;
      applied = true;
      apply(snapshot);
    },
    (error) => {
      // Rules rejection, or offline with nothing cached: the screen is showing
      // built-in constants and the operator needs to be told.
      console.warn(`Firestore access restricted for ${name}, continuing with defaults.`, error.message);
      setDataStatus(name, STATUS.DEFAULTS);
    }
  );
}

// The cached/offline wording differs, so re-render when connectivity flips.
window.addEventListener('online', renderDataStatus);
window.addEventListener('offline', renderDataStatus);

// --- SHARED HELPERS ---

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function announce(message) {
  const region = document.getElementById('sr-status');
  if (region) region.textContent = message;
}

function toast(icon, title) {
  Swal.fire({ toast: true, position: 'top-end', icon, title, showConfirmButton: false, timer: 2500 });
}

// --- FIZZ (respects reduced-motion and a user toggle) ---
function initFizz() {
  const container = document.getElementById('fizz-container');
  if (!container) return;

  const render = () => {
    container.innerHTML = '';
    if (prefersReducedMotion() || document.documentElement.classList.contains('no-fizz')) return;
    // Fewer bubbles on phones — 20 compositing layers is a real battery cost.
    const count = window.innerWidth < 640 ? 8 : 18;
    for (let i = 0; i < count; i++) createBubble(container);
  };

  render();

  const fizzBtn = document.getElementById('fizz-toggle');
  const fizzIcon = document.getElementById('fizz-toggle-icon');

  const syncFizzIcon = () => {
    if (!fizzIcon) return;
    const off = document.documentElement.classList.contains('no-fizz');
    fizzIcon.classList.toggle('fa-wind', !off);
    fizzIcon.classList.toggle('fa-ban', off);
    if (fizzBtn) fizzBtn.setAttribute('aria-pressed', String(!off));
  };
  syncFizzIcon();

  if (fizzBtn) {
    fizzBtn.addEventListener('click', () => {
      const off = document.documentElement.classList.toggle('no-fizz');
      localStorage.setItem('fizz', off ? 'off' : 'on');
      syncFizzIcon();
      render();
    });
  }

  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', render);
}

// --- ADMIN PANEL CHROME (collapse, filter, CSV) ---
function initAdminControls() {
    const toggle = document.getElementById('admin-toggle');
    const body = document.getElementById('admin-body');
    const icon = document.getElementById('admin-toggle-icon');

    if (toggle && body) {
        const setOpen = (open) => {
            body.classList.toggle('hidden', !open);
            toggle.setAttribute('aria-expanded', String(open));
            if (icon) icon.style.transform = open ? 'rotate(90deg)' : '';
            localStorage.setItem('adminPanelOpen', open ? '1' : '0');
        };
        // Collapsed by default — it sits above the calculator everyone uses.
        setOpen(localStorage.getItem('adminPanelOpen') === '1');
        toggle.addEventListener('click', () => setOpen(body.classList.contains('hidden')));
    }

    const filter = document.getElementById('admin-filter');
    const clearBtn = document.getElementById('admin-filter-clear');
    if (filter) {
        filter.addEventListener('input', () => {
            clearBtn?.classList.toggle('hidden', filter.value === '');
            renderAdminList();
        });
        filter.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && filter.value) {
                filter.value = '';
                clearBtn?.classList.add('hidden');
                renderAdminList();
            }
        });
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            filter.value = '';
            clearBtn.classList.add('hidden');
            filter.focus();
            renderAdminList();
        });
    }

    const importBtn = document.getElementById('admin-import-btn');
    const importFile = document.getElementById('admin-import-file');
    if (importBtn && importFile) {
        importBtn.addEventListener('click', () => importFile.click());
        importFile.addEventListener('change', async () => {
            await importAdminCsv(importFile.files[0]);
            importFile.value = '';   // allow re-importing the same filename
        });
    }
}

// --- NAVBAR CONDENSE ON SCROLL ---
function initNavCondense() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;

  let ticking = false;
  const update = () => {
    const condensed = window.scrollY > 40;
    nav.classList.toggle('condensed', condensed);
    document.body.classList.toggle('nav-condensed', condensed);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });

  update();
}

// --- COPY TO CLIPBOARD ---
function initCopyButtons() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('.copy-btn[data-copy-from]');
    if (!btn) return;

    const source = document.getElementById(btn.dataset.copyFrom);
    if (!source) return;

    const value = ('value' in source ? source.value : source.textContent).trim();
    if (!value || value === '---' || value === '—') {
      toast('info', 'Nothing to copy yet');
      return;
    }

    await copyText(value, `${btn.dataset.copyLabel || 'Value'} copied`);
    flashCopied(btn);
  });

  const summaryBtn = document.getElementById('syrup-copy-summary');
  if (summaryBtn) {
    summaryBtn.addEventListener('click', async () => {
      const text = buildSyrupSummary();
      if (!text) {
        toast('info', 'Enter a calculation first');
        return;
      }
      await copyText(text, 'Summary copied');
      flashCopied(summaryBtn);
    });
  }
}

async function copyText(text, successMessage) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for insecure contexts / older in-plant browsers.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    announce(successMessage);
    toast('success', successMessage);
  } catch (err) {
    toast('error', 'Could not copy to clipboard');
  }
}

function flashCopied(btn) {
  const icon = btn.querySelector('i');
  const label = btn.querySelector('span');
  const originalLabel = label ? label.textContent : null;

  btn.classList.add('copied');
  if (icon) icon.classList.replace('fa-copy', 'fa-check');
  if (label) label.textContent = 'Copied';

  setTimeout(() => {
    btn.classList.remove('copied');
    if (icon) icon.classList.replace('fa-check', 'fa-copy');
    if (label) label.textContent = originalLabel;
  }, 1600);
}

/** Human-readable digest of the whole syrup calculation, for pasting into notes. */
function buildSyrupSummary() {
  const sku = document.getElementById('syrup-product')?.value;
  const gals = document.getElementById('syrup-gals')?.value.trim();
  const plts = document.getElementById('syrup-plts')?.value.trim();
  const cases = document.getElementById('syrup-cases')?.value.trim();
  if (!sku || (!gals && !plts && !cases)) return '';

  const lines = [`${sku} — ${new Date().toLocaleDateString()}`];
  if (gals) lines.push(`Syrup: ${gals} gal`);
  if (plts) lines.push(`Can bodies: ${plts} plts`);
  if (cases) lines.push(`Standard cases (24pk): ${cases}`);

  [1, 2, 3].forEach((n) => {
    const val = document.getElementById(`syrup-actual-cases-${n}`)?.value.trim();
    const pack = document.getElementById(`syrup-pack-size-${n}`)?.value;
    if (val) lines.push(`Line ${'ABC'[n - 1]}: ${val} cs @ ${pack}-pack`);
  });

  return lines.join('\n');
}

// --- CLOUD MIGRATION TOOL ---
const ADMIN_TAB_LABELS = { materials: 'Materials', products: 'Products', qacodes: 'QA Codes' };

/**
 * Write records to a collection, replacing entries that already share a name
 * instead of inserting alongside them. This is what makes migrate and CSV
 * import safe to run twice — the old version appended blindly, which is why
 * the list had to grow a "N copies found" warning.
 */
async function upsertRecords(collectionName, records, idsByName) {
    const plan = planUpsert(records, idsByName);
    const batch = writeBatch(db);

    for (const rec of plan.create) {
        batch.set(doc(collection(db, collectionName)), withAuditStamp(rec));
    }
    for (const { id, data } of plan.update) {
        batch.set(doc(db, collectionName, id), withAuditStamp(data), { merge: true });
    }
    // Collapse any pre-existing duplicates of the names we just wrote.
    for (const rec of records) {
        const extras = (idsByName[rec.name] || []).slice(1);
        for (const id of extras) batch.delete(doc(db, collectionName, id));
    }

    await batch.commit();
    return plan;
}

async function migrateDataToCloud() {
  const ctx = adminTabContext();
  const label = ADMIN_TAB_LABELS[currentAdminTab] || 'Data';
  const records = Object.entries(ctx.defaults).map(([name, data]) => ({ name, ...data }));

  const result = await Swal.fire({
    title: `Sync built-in ${label} to cloud?`,
    text: `Copies the ${records.length} built-in entries into Firestore. Existing entries with the same name are updated, not duplicated — safe to run more than once.`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#ba0f2c',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sync'
  });
  if (!result.isConfirmed) return;

  try {
    const plan = await upsertRecords(ctx.collection, records, ctx.ids);
    const bits = [`${plan.create.length} added`, `${plan.update.length} updated`];
    if (plan.duplicatesCleaned) bits.push(`${plan.duplicatesCleaned} duplicates removed`);
    toast('success', `${label}: ${bits.join(', ')}`);
  } catch (e) {
    toast('error', `Error syncing: ${e.message}`);
  }
}
window.migrateDataToCloud = migrateDataToCloud;

// --- CSV EXPORT / IMPORT ---

function exportAdminCsv() {
    const ctx = adminTabContext();
    const columns = SCHEMAS[ctx.collection].columns;
    const rows = Object.keys(ctx.db).sort().map(name => ({ ...ctx.db[name], name }));

    const csv = toCsv(rows, columns);
    const stamp = new Date().toISOString().slice(0, 10);
    const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prodcalc-${ctx.collection}-${stamp}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);

    toast('success', `Exported ${rows.length} ${ctx.collection}`);
}

async function importAdminCsv(file) {
    if (!file) return;
    const ctx = adminTabContext();

    let records, problems;
    try {
        const text = await file.text();
        const parsed = parseCsv(text);
        if (!parsed.length) return toast('warning', 'That file has no rows');

        records = [];
        problems = [];
        parsed.forEach((raw, i) => {
            const data = coerceRecord(ctx.collection, raw);
            const errors = validateRecord(ctx.collection, data);
            if (errors.length) problems.push(`Row ${i + 2}: ${errors.join(', ')}`);
            else records.push(data);
        });
    } catch (e) {
        return toast('error', `Could not read file: ${e.message}`);
    }

    if (!records.length) {
        return Swal.fire({
            icon: 'error',
            title: 'Nothing could be imported',
            html: `<div style="text-align:left;max-height:40vh;overflow:auto">${
                problems.slice(0, 20).map(p => escapeHtml(p)).join('<br>')}</div>`,
            confirmButtonColor: '#ba0f2c',
        });
    }

    const plan = planUpsert(records, ctx.ids);
    const confirmed = await Swal.fire({
        icon: 'question',
        title: 'Import these changes?',
        html: `<div style="text-align:left">
                 <p><strong>${plan.create.length}</strong> new, <strong>${plan.update.length}</strong> updated${
                   plan.duplicatesCleaned ? `, <strong>${plan.duplicatesCleaned}</strong> duplicates removed` : ''}.</p>
                 ${problems.length ? `<p style="color:#b45309;margin-top:.6em"><strong>${problems.length} row(s) skipped:</strong></p>
                   <div style="max-height:30vh;overflow:auto;font-size:.85em">${
                     problems.slice(0, 20).map(p => escapeHtml(p)).join('<br>')}</div>` : ''}
               </div>`,
        showCancelButton: true,
        confirmButtonText: 'Import',
        confirmButtonColor: '#ba0f2c',
        cancelButtonColor: '#6b7280',
    });
    if (!confirmed.isConfirmed) return;

    try {
        await upsertRecords(ctx.collection, records, ctx.ids);
        toast('success', `Imported ${records.length} ${ctx.collection}`);
    } catch (e) {
        toast('error', `Import failed: ${e.message}`);
    }
}

window.exportAdminCsv = exportAdminCsv;

// --- AUTHENTICATION & ADMIN UI ---
function setupAuthUI() {
  const loginBtn = document.getElementById('login-btn');
  const adminPanel = document.getElementById('admin-panel');
  const logoutBtn = document.getElementById('logout-btn');

  const signedInChip = document.getElementById('admin-signed-in');
  const emailEl = document.getElementById('admin-user-email');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(loginBtn) loginBtn.classList.add('hidden');
      if(adminPanel) adminPanel.classList.remove('hidden');
      if(logoutBtn) logoutBtn.classList.remove('hidden');

      if(emailEl) emailEl.textContent = user.email || user.uid;
      if(signedInChip) signedInChip.classList.remove('hidden');

      renderAdminList();
    } else {
      if(loginBtn) loginBtn.classList.remove('hidden');
      if(adminPanel) adminPanel.classList.add('hidden');
      if(logoutBtn) logoutBtn.classList.add('hidden');
      if(signedInChip) signedInChip.classList.add('hidden');
    }
  });

  if(loginBtn) {
    loginBtn.addEventListener('click', () => {
        // Create a custom modal so the password can be hidden
        const overlay = document.createElement('div');
        overlay.className = "fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4";
        
        const modal = document.createElement('div');
        modal.className = "glass-panel p-6 max-w-sm w-full";
        modal.innerHTML = `
          <h2 class="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Admin Login</h2>
          <input type="email" id="modal-email" autocomplete="username" placeholder="Email" class="input-field w-full mb-3 p-3" />
          <input type="password" id="modal-password" autocomplete="current-password" placeholder="Password" class="input-field w-full mb-5 p-3" />
          <div class="flex justify-end gap-3">
            <button type="button" id="modal-cancel" class="btn-ghost px-4 py-2">Cancel</button>
            <button type="button" id="modal-submit" class="btn-primary px-4 py-2">Login</button>
          </div>
        `;
        
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        
        // Focus email field immediately
        document.getElementById('modal-email').focus();
        
        document.getElementById('modal-cancel').addEventListener('click', () => overlay.remove());
        
        const submitBtn = document.getElementById('modal-submit');
        const emailInput = document.getElementById('modal-email');
        const passwordInput = document.getElementById('modal-password');
        
        const doLogin = async () => {
           const email = emailInput.value.trim();
           const password = passwordInput.value;
           if(email && password) {
               submitBtn.innerText = "Logging in...";
               submitBtn.disabled = true;
               try {
                   await signInWithEmailAndPassword(auth, email, password);
                   Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Logged in successfully', showConfirmButton: false, timer: 2000 });
                   overlay.remove();
               } catch (error) {
                   Swal.fire({ icon: 'error', title: 'Login Failed', text: error.message, confirmButtonColor: '#b91c1c' });
                   submitBtn.innerText = "Login";
                   submitBtn.disabled = false;
               }
           }
        };
        
        submitBtn.addEventListener('click', doLogin);
        passwordInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') doLogin(); });
    });
  }
  if(logoutBtn) logoutBtn.addEventListener('click', () => { signOut(auth); resetAdminForm(); });
}

function switchAdminTab(tab) {
    currentAdminTab = tab;
    // Active styling lives in .admin-tab.active (styles.css) — just flip the flag.
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));
    document.getElementById('admin-tab-' + tab)?.classList.add('active');

    document.querySelectorAll('.admin-form').forEach(el => el.classList.add('hidden'));
    document.getElementById('admin-form-' + tab).classList.remove('hidden');

    resetAdminForm();
    renderAdminList();
}

function toggleProductFields() {
    const type = document.getElementById('new-prod-type').value;
    if(type === 'bottle') {
        document.getElementById('prod-can-fields').classList.add('hidden');
        document.getElementById('prod-bottle-fields').classList.remove('hidden');
    } else {
        document.getElementById('prod-can-fields').classList.remove('hidden');
        document.getElementById('prod-bottle-fields').classList.add('hidden');
    }
}

// --- ADMIN SAVING ---

/** Who to record against a write, for the audit stamp. */
function currentAdminLabel() {
    const u = auth.currentUser;
    return u ? (u.email || u.uid) : 'unknown';
}

function withAuditStamp(data) {
    return { ...data, updatedBy: currentAdminLabel(), updatedAt: serverTimestamp() };
}

/**
 * Shared save path for all three collections.
 * Validates, warns on a large move in a production-critical number, then writes.
 */
async function saveRecord(collectionName, raw) {
    const data = coerceRecord(collectionName, raw);
    const errors = validateRecord(collectionName, data);

    if (errors.length) {
        await Swal.fire({
            icon: 'warning',
            title: "That can't be saved yet",
            html: `<ul style="text-align:left;margin:0;padding-left:1.2em">${
                errors.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>`,
            confirmButtonColor: '#ba0f2c',
        });
        return;
    }

    // A mistyped factor reaches every device on the floor instantly, so make a
    // big change an explicit decision rather than a silent one.
    const ctx = adminTabContext();
    const previous = ctx.db[data.name];
    const jumps = significantChanges(collectionName, previous, data);

    if (jumps.length) {
        const rows = jumps.map(j =>
            `<li><strong>${escapeHtml(j.field)}</strong>: ${fmt(j.before)} → ${fmt(j.after)} (${j.pctChange}%)</li>`
        ).join('');
        const confirmed = await Swal.fire({
            icon: 'warning',
            title: 'Large change — please confirm',
            html: `<p>This updates values every device uses immediately:</p>
                   <ul style="text-align:left;padding-left:1.2em">${rows}</ul>`,
            showCancelButton: true,
            confirmButtonText: 'Yes, save it',
            confirmButtonColor: '#ba0f2c',
            cancelButtonColor: '#6b7280',
        });
        if (!confirmed.isConfirmed) return;
    }

    try {
        if (editingId) await updateDoc(doc(db, collectionName, editingId), withAuditStamp(data));
        else await addDoc(collection(db, collectionName), withAuditStamp(data));
        toast('success', editingId ? 'Updated' : 'Saved');
        resetAdminForm();
    } catch (e) {
        toast('error', `Error saving: ${e.message}`);
    }
}

async function saveMaterial() {
    const name = document.getElementById('new-mat-name').value.trim();
    await saveRecord('materials', {
        name,
        number: document.getElementById('new-mat-number')?.value,
        unitsPerPallet: document.getElementById('new-mat-units').value,
        unitsPerCase: document.getElementById('new-mat-per-case').value,
        desc: document.getElementById('new-mat-desc').value || name,
        category: document.getElementById('new-mat-cat').value,
        stdCaseFactor: document.getElementById('new-mat-factor').value,
        unitName: 'Pallets',
    });
}

async function saveProduct() {
    const type = document.getElementById('new-prod-type').value;
    await saveRecord('products', {
        name: document.getElementById('new-prod-name').value,
        type,
        // Only send the fields that apply, so a blank irrelevant field can't be
        // coerced to 0 and poison the maths.
        galPerPallet: type === 'can' ? document.getElementById('new-prod-gal-plt').value : '',
        casesPerPallet: type === 'can' ? document.getElementById('new-prod-cs-plt').value : '',
        factor: type === 'bottle' ? document.getElementById('new-prod-factor').value : '',
        materials: formatMaterialList(selectedProductMaterials()),
    });
}

/** Names picked in the admin product form's multi-select. */
function selectedProductMaterials() {
    const sel = document.getElementById('new-prod-materials');
    if (!sel) return [];
    return Array.from(sel.selectedOptions).map((o) => o.value);
}

/** Refill the admin product form's material list, keeping the current picks. */
function fillProductMaterialsField(selected) {
    const sel = document.getElementById('new-prod-materials');
    if (!sel) return;

    const chosen = new Set(selected || selectedProductMaterials());
    sel.innerHTML = '';
    Object.keys(MATERIAL_DB).sort().forEach((name) => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.innerText = MATERIAL_DB[name].number ? `[${MATERIAL_DB[name].number}] ${name}` : name;
        opt.selected = chosen.has(name);
        sel.appendChild(opt);
    });
}

async function saveQACode() {
    await saveRecord('qacodes', {
        name: document.getElementById('new-qa-name').value,
        category: document.getElementById('new-qa-cat').value,
        weeks: document.getElementById('new-qa-weeks').value,
    });
}

function resetAdminForm() {
    document.querySelectorAll('.admin-form input').forEach(el => el.value = "");
    fillProductMaterialsField([]);   // multi-select isn't cleared by .value = ""
    const wasEditing = editingName;
    editingId = null;
    editingName = null;

    ['material', 'product', 'qacode'].forEach(type => {
        const btn = document.getElementById(`btn-save-${type}`);
        if(btn) {
            btn.innerText = `Save ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            btn.classList.remove('!bg-amber-600', 'hover:!bg-amber-700');
        }
    });

    document.querySelectorAll('.cancel-edit-btn').forEach(btn => btn.remove());
    toggleProductFields();
    if (wasEditing) renderAdminList();  // clear the row highlight
}

/** Everything the admin UI needs to know about the tab currently open. */
function adminTabContext() {
    const strong = 'text-slate-900 dark:text-slate-100';
    const meta = 'text-xs ml-1 whitespace-nowrap text-slate-500 dark:text-slate-400';

    if (currentAdminTab === 'products') {
        return {
            collection: 'products', db: PRODUCT_DB, ids: PRODUCT_IDS, defaults: DEFAULT_PRODUCTS,
            display: (i) => `<strong class="${strong}">${escapeHtml(i.name)}</strong> <span class="${meta}">(${escapeHtml(String(i.type || '').toUpperCase())})</span>`,
        };
    }
    if (currentAdminTab === 'qacodes') {
        return {
            collection: 'qacodes', db: QA_CODE_DB, ids: QA_CODE_IDS, defaults: DEFAULT_QACODES,
            display: (i) => `<strong class="${strong}">${escapeHtml(i.name)}</strong> <span class="${meta}">(${i.weeks} wks, ${escapeHtml(i.category)})</span>`,
        };
    }
    return {
        collection: 'materials', db: MATERIAL_DB, ids: MATERIAL_IDS, defaults: DEFAULT_MATERIALS,
        display: (i) => `<strong class="${strong}">${i.number ? `[${escapeHtml(i.number)}] ` : ''}${escapeHtml(i.name)}</strong> <span class="${meta}">(${i.unitsPerPallet}/plt)</span>`,
    };
}

/** "2 hours ago" style stamp from a Firestore timestamp. */
function relativeTime(ts) {
    if (!ts) return '';
    const then = typeof ts.toDate === 'function' ? ts.toDate() : new Date(ts);
    if (isNaN(then.getTime())) return '';
    const secs = Math.round((Date.now() - then.getTime()) / 1000);
    if (secs < 60) return 'just now';
    const mins = Math.round(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.round(hrs / 24)}d ago`;
}

function renderAdminList() {
    const listContainer = document.getElementById('admin-database-list');
    if (!listContainer) return;

    // Firestore snapshots re-render this list; without this the scroll position
    // jumps back to the top mid-task.
    const scrollTop = listContainer.scrollTop;

    const ctx = adminTabContext();
    const filter = (document.getElementById('admin-filter')?.value || '').trim().toLowerCase();

    // Show everything the calculator can actually use — built-in entries as well
    // as cloud ones. Previously only cloud docs were listed, so a built-in
    // material was invisible here and could never be edited.
    const names = Object.keys(ctx.db)
        .filter(n => !filter || n.toLowerCase().includes(filter))
        .sort();

    const countEl = document.getElementById('admin-list-count');
    if (countEl) {
        const total = Object.keys(ctx.db).length;
        countEl.textContent = filter ? `${names.length} of ${total}` : `${total} item${total === 1 ? '' : 's'}`;
    }

    listContainer.innerHTML = "";

    if (names.length === 0) {
        listContainer.innerHTML = filter
            ? `<div class="text-sm italic p-3 text-slate-500 dark:text-slate-400">No matches for “${escapeHtml(filter)}”.</div>`
            : '<div class="text-sm italic p-3 text-slate-500 dark:text-slate-400">Nothing here yet. Add an item using the form.</div>';
        return;
    }

    names.forEach(name => {
        const item = ctx.db[name];
        if (!item) return;

        const { docIds, isCloud, overridesBuiltIn, duplicateCount, primaryId } =
            classifyEntry(name, ctx.ids, ctx.defaults);
        const isEditing = editingName === name;

        const badge = isCloud
            ? `<span class="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:border-emerald-800">Cloud</span>`
            : `<span class="text-[10px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded border bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600">Built-in</span>`;

        const overridden = overridesBuiltIn
            ? `<span class="text-[10px] text-slate-400 dark:text-slate-500">overrides built-in</span>` : '';

        const audit = item.updatedBy
            ? `<div class="text-[11px] mt-1 text-slate-400 dark:text-slate-500">edited by ${escapeHtml(item.updatedBy)}${item.updatedAt ? ' · ' + relativeTime(item.updatedAt) : ''}</div>`
            : '';

        const dupes = duplicateCount > 0
            ? `<div class="text-xs font-bold mt-1 px-2 py-0.5 rounded inline-block text-brand-700 bg-brand-100 dark:text-brand-300 dark:bg-brand-500/15"><i class="fas fa-exclamation-triangle"></i> ${docIds.length} copies — delete clears all</div>` : '';

        const div = document.createElement('div');
        div.className = "admin-row flex justify-between items-start p-2 mb-2 rounded-lg border text-sm w-full transition-colors "
            + (isEditing
                ? "bg-amber-50 border-amber-300 dark:bg-amber-500/10 dark:border-amber-600"
                : "bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700");
        div.dataset.name = name;
        div.innerHTML = `
            <div class="flex-1 min-w-0 pr-2">
                <div class="flex items-center gap-2 flex-wrap mb-0.5">${badge}${overridden}</div>
                <div class="whitespace-normal break-words leading-snug">${ctx.display(item)}</div>
                ${audit}${dupes}
            </div>
            <div class="flex gap-1 flex-shrink-0">
                <button type="button" aria-label="Edit ${escapeHtml(name)}" class="p-2 rounded transition-colors edit-btn text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/15" data-name="${escapeHtml(name)}" data-id="${primaryId || ''}"><i class="fas fa-edit"></i></button>
                ${isCloud
                    ? `<button type="button" aria-label="Delete ${escapeHtml(name)}" class="p-2 rounded transition-colors delete-btn text-brand-500 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-brand-500/15" data-ids='${JSON.stringify(docIds)}'><i class="fas fa-trash-alt"></i></button>`
                    : `<span class="p-2 text-slate-300 dark:text-slate-600" title="Built-in entries live in the app code and can't be deleted"><i class="fas fa-lock"></i></span>`}
            </div>`;
        listContainer.appendChild(div);
    });

    listContainer.scrollTop = scrollTop;

    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => handleAdminDelete(JSON.parse(btn.dataset.ids)));
    });

    listContainer.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => beginAdminEdit(btn.dataset.name, btn.dataset.id || null));
    });
}

async function handleAdminDelete(ids) {
    const result = await Swal.fire({
        title: 'Delete from cloud?',
        text: ids.length > 1
            ? `This removes all ${ids.length} copies of this entry.`
            : 'This removes the entry from the cloud database.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ba0f2c',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it'
    });
    if (!result.isConfirmed) return;

    const colName = adminTabContext().collection;
    try {
        for (const id of ids) {
            await deleteDoc(doc(db, colName, id));
            if (editingId === id) resetAdminForm();
        }
        toast('success', 'Deleted');
    } catch (err) {
        toast('error', 'Error deleting: ' + err.message);
    }
}

/**
 * Load an entry into the form.
 * Built-in entries have no document id — saving one creates a cloud override
 * rather than failing silently.
 */
function beginAdminEdit(name, docId) {
    const ctx = adminTabContext();
    const item = ctx.db[name];
    if (!item) return;

    editingId = docId || null;
    editingName = name;

    let saveBtnId = '';

    if (currentAdminTab === 'materials') {
        document.getElementById('new-mat-name').value = item.name || name;
        const numInput = document.getElementById('new-mat-number');
        if (numInput) numInput.value = item.number || "";
        document.getElementById('new-mat-units').value = item.unitsPerPallet ?? "";
        document.getElementById('new-mat-per-case').value = item.unitsPerCase ?? "";
        document.getElementById('new-mat-desc').value = item.desc || "";
        document.getElementById('new-mat-cat').value = item.category || 'can';
        document.getElementById('new-mat-factor').value = item.stdCaseFactor || "";
        saveBtnId = 'btn-save-material';
    } else if (currentAdminTab === 'products') {
        document.getElementById('new-prod-name').value = item.name || name;
        document.getElementById('new-prod-type').value = item.type || 'can';
        toggleProductFields();
        if (item.type === 'can') {
            document.getElementById('new-prod-gal-plt').value = item.galPerPallet ?? "";
            document.getElementById('new-prod-cs-plt').value = item.casesPerPallet ?? "";
        } else {
            document.getElementById('new-prod-factor').value = item.factor ?? "";
        }
        fillProductMaterialsField(parseMaterialList(item.materials));
        saveBtnId = 'btn-save-product';
    } else {
        document.getElementById('new-qa-name').value = item.name || name;
        document.getElementById('new-qa-cat').value = item.category || 'can';
        document.getElementById('new-qa-weeks').value = item.weeks ?? "";
        saveBtnId = 'btn-save-qacode';
    }

    const saveBtn = document.getElementById(saveBtnId);
    saveBtn.innerText = editingId ? "Update" : "Save as cloud override";
    saveBtn.classList.add('!bg-amber-600', 'hover:!bg-amber-700');

    if (!saveBtn.nextElementSibling?.classList.contains('cancel-edit-btn')) {
        const cancelBtn = document.createElement('button');
        cancelBtn.type = "button";
        cancelBtn.innerText = "Cancel";
        cancelBtn.className = "cancel-edit-btn mt-2 w-full px-4 py-2 rounded-lg font-bold text-white transition-colors bg-slate-500 hover:bg-slate-600";
        cancelBtn.addEventListener('click', resetAdminForm);
        saveBtn.parentNode.insertBefore(cancelBtn, saveBtn.nextSibling);
    }

    renderAdminList();  // highlight the row being edited

    // On a phone the form sits above the list, so without this the tap looks
    // like it did nothing at all.
    document.getElementById(`admin-form-${currentAdminTab}`)
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
}

// --- CORE APP LOGIC ---
document.addEventListener("DOMContentLoaded", init);

// ============================================================
// SEARCHABLE COMBOBOX
// Wraps an existing <select>, which stays in the DOM as the single source of
// truth. Every consumer keeps using `select.value` / `change` events, so none
// of the calculation code had to change.
// ============================================================
function enhanceSelect(select) {
  if (select.dataset.comboboxReady === 'true') return;
  select.dataset.comboboxReady = 'true';

  const wrapper = select.parentElement; // the .relative container
  wrapper.classList.add('relative');

  // Hide the native control (kept focusable-free but still form-accurate).
  select.classList.add('sr-only');
  select.setAttribute('tabindex', '-1');
  select.setAttribute('aria-hidden', 'true');
  // The decorative chevron belongs to the native select; drop it.
  wrapper.querySelector('.pointer-events-none')?.remove();

  const host = document.createElement('div');
  host.className = 'relative';
  host.innerHTML = `
    <input type="text" role="combobox" autocomplete="off" spellcheck="false"
           aria-expanded="false" aria-autocomplete="list"
           class="select-field w-full cursor-text" />
    <button type="button" tabindex="-1" aria-label="Show all options"
            class="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-brand-600 transition-colors">
      <i class="fas fa-chevron-down text-xs" aria-hidden="true"></i>
    </button>
    <div class="combobox-panel hidden" role="listbox"></div>`;

  wrapper.appendChild(host);

  const input = host.querySelector('input');
  const toggleBtn = host.querySelector('button');
  const panel = host.querySelector('.combobox-panel');

  input.placeholder = select.dataset.combobox || 'Search…';
  if (select.id) input.id = `${select.id}-search`;
  // Move the <label for="..."> onto the visible input.
  document.querySelector(`label[for="${select.id}"]`)?.setAttribute('for', input.id);

  let options = [];
  let filtered = [];
  let highlighted = -1;
  let isOpen = false;

  /** Read the current <option> set out of the native select. */
  function readOptions() {
    options = [];
    Array.from(select.children).forEach((child) => {
      if (child.tagName === 'OPTGROUP') {
        Array.from(child.children).forEach((opt) => {
          if (opt.value === '' || opt.disabled) return;
          options.push({ value: opt.value, label: opt.textContent, group: child.label });
        });
      } else if (child.value !== '' && !child.disabled) {
        options.push({ value: child.value, label: child.textContent, group: '' });
      }
    });
  }

  function selectedLabel() {
    const match = options.find((o) => o.value === select.value);
    return match ? match.label : '';
  }

  function render(term = '') {
    const needle = term.trim().toLowerCase();
    filtered = needle
      ? options.filter((o) => o.label.toLowerCase().includes(needle))
      : options.slice();

    if (!filtered.length) {
      panel.innerHTML = '<div class="combobox-empty">No matches</div>';
      return;
    }

    let html = '';
    let lastGroup = null;
    filtered.forEach((opt, i) => {
      if (opt.group && opt.group !== lastGroup) {
        html += `<div class="combobox-group">${escapeHtml(opt.group)}</div>`;
        lastGroup = opt.group;
      }
      const isSelected = opt.value === select.value;
      html += `<div class="combobox-option${i === highlighted ? ' highlighted' : ''}" role="option"
                    data-index="${i}" aria-selected="${isSelected}">${escapeHtml(opt.label)}</div>`;
    });
    panel.innerHTML = html;
  }

  function open() {
    if (isOpen) return;
    readOptions();
    isOpen = true;
    panel.classList.remove('hidden');
    input.setAttribute('aria-expanded', 'true');
    highlighted = filtered.findIndex((o) => o.value === select.value);
    render(input.value === selectedLabel() ? '' : input.value);
    scrollHighlightedIntoView();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.add('hidden');
    input.setAttribute('aria-expanded', 'false');
    input.value = selectedLabel(); // discard any partial search text
  }

  function commit(index) {
    const opt = filtered[index];
    if (!opt) return;
    select.value = opt.value;
    input.value = opt.label;
    close();
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function scrollHighlightedIntoView() {
    panel.querySelector('.combobox-option.highlighted')
      ?.scrollIntoView({ block: 'nearest' });
  }

  function move(delta) {
    if (!isOpen) return open();
    if (!filtered.length) return;
    highlighted = (highlighted + delta + filtered.length) % filtered.length;
    render(input.value === selectedLabel() ? '' : input.value);
    scrollHighlightedIntoView();
  }

  input.addEventListener('focus', () => {
    open();
    input.select();
  });
  input.addEventListener('input', () => {
    if (!isOpen) open();
    highlighted = 0;
    render(input.value);
  });
  input.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(1); break;
      case 'ArrowUp':   e.preventDefault(); move(-1); break;
      case 'Enter':
        if (isOpen && highlighted >= 0) { e.preventDefault(); commit(highlighted); }
        break;
      case 'Escape':
        if (isOpen) { e.preventDefault(); close(); }
        break;
      case 'Tab': close(); break;
    }
  });

  toggleBtn.addEventListener('click', () => {
    if (isOpen) { close(); } else { input.focus(); }
  });

  panel.addEventListener('mousedown', (e) => {
    // mousedown (not click) so the input's blur doesn't close the panel first.
    const optionEl = e.target.closest('.combobox-option');
    if (!optionEl) return;
    e.preventDefault();
    commit(parseInt(optionEl.dataset.index, 10));
  });

  document.addEventListener('mousedown', (e) => {
    if (isOpen && !host.contains(e.target)) close();
  });

  // Keep the visible input in sync when Firestore repopulates the select.
  select._syncCombobox = () => {
    readOptions();
    input.value = selectedLabel();
    if (isOpen) render(input.value);
  };

  readOptions();
  input.value = selectedLabel();
}

/** Called after any code rebuilds a select's <option> list. */
function syncComboboxes() {
  document.querySelectorAll('select[data-combobox]').forEach((select) => {
    if (typeof select._syncCombobox === 'function') select._syncCombobox();
  });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

// ============================================================
// SESSION PERSISTENCE
// This is a shift tool that people reopen constantly — losing the SKU and the
// numbers on every reload was the single most annoying thing about it.
// ============================================================
const SESSION_KEY = 'prodcalc.session.v1';
const SESSION_FIELDS = [
  'syrup-product', 'syrup-gals', 'syrup-plts', 'syrup-cases',
  'syrup-actual-cases-1', 'syrup-actual-cases-2', 'syrup-actual-cases-3',
  'syrup-pack-size-1', 'syrup-pack-size-2', 'syrup-pack-size-3',
  'mat-select', 'mat-target', 'mat-onhand',
  'run-product',   // the pack rows persist separately, under RUN_LINES_KEY
  'datecode-product', 'lookup-code', 'lookup-product',
];

let sessionRestored = false;

function saveSession() {
  if (!sessionRestored) return; // don't persist the blank pre-restore state
  try {
    const data = {};
    SESSION_FIELDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && el.value !== '') data[id] = el.value;
    });
    data.tab = currentActiveTab;
    localStorage.setItem(SESSION_KEY, JSON.stringify(data));
  } catch (e) { /* storage full or blocked — not worth interrupting the user */ }
}

function restoreSession() {
  let data = null;
  try {
    data = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch (e) { /* corrupt entry, start fresh */ }

  if (data) {
    // Selects first, so the dependent calculations see the right SKU.
    ['syrup-product', 'mat-select', 'run-product', 'datecode-product', 'lookup-product',
     'syrup-pack-size-1', 'syrup-pack-size-2', 'syrup-pack-size-3'].forEach((id) => {
      const el = document.getElementById(id);
      if (el && data[id] != null && Array.from(el.options).some((o) => o.value === data[id])) {
        el.value = data[id];
      }
    });

    ['syrup-gals', 'syrup-plts', 'syrup-cases', 'syrup-actual-cases-1',
     'syrup-actual-cases-2', 'syrup-actual-cases-3', 'mat-target', 'mat-onhand',
     'lookup-code'].forEach((id) => {
      const el = document.getElementById(id);
      if (el && data[id] != null) el.value = data[id];
    });

    syncComboboxes();
    updateSyrupProduct();
    updateMaterial();
    updateRunProduct();
    calculateDateCode();
    lookupPrintCode();

    if (data.tab && data.tab !== 'syrup') switchTab(data.tab);
  }

  sessionRestored = true;

  // Persist on any edit, debounced so we aren't hammering localStorage per keystroke.
  let saveTimer = null;
  document.addEventListener('input', () => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(saveSession, 300);
  });
  document.addEventListener('change', saveSession);
  window.addEventListener('pagehide', saveSession);
}

function createBubble(container) {
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.style.setProperty("--size", Math.random() * 20 + 5 + "px");
  bubble.style.setProperty("--left", Math.random() * 100 + "%");
  bubble.style.setProperty("--duration", Math.random() * 5 + 8 + "s");
  bubble.style.setProperty("--delay", Math.random() * 10 + "s");
  bubble.style.setProperty("--drift", Math.random() * 100 - 50 + "px");
  container.appendChild(bubble);
}

/** Fill a product select with the can/bottle optgroups, preserving the choice. */
function fillProductSelect(select) {
  if (!select) return;
  const current = select.value;

  select.innerHTML = '<option value="" disabled selected hidden>Select a Product...</option>';
  const canGroup = document.createElement("optgroup"); canGroup.label = "Cans"; canGroup.className = "text-red-800 font-bold bg-red-50";
  const bottleGroup = document.createElement("optgroup"); bottleGroup.label = "Bottles"; bottleGroup.className = "text-gray-800 font-bold bg-slate-50";
  Object.keys(PRODUCT_DB).sort().forEach((key) => {
    let opt = document.createElement("option"); opt.value = key; opt.innerText = key; opt.className = "text-gray-700 bg-white font-normal";
    if (PRODUCT_DB[key].type === "bottle") bottleGroup.appendChild(opt); else canGroup.appendChild(opt);
  });
  select.appendChild(canGroup); select.appendChild(bottleGroup);

  if (current && PRODUCT_DB[current]) {
    select.value = current;
  } else if (PRODUCT_DB["12 oz. Can"]) {
    select.value = "12 oz. Can";
  }
}

function populateDropdowns() {
  const syrupSelect = document.getElementById("syrup-product");
  const runSelect = document.getElementById("run-product");
  const matSelect = document.getElementById("mat-select");

  const currentMat = matSelect ? matSelect.value : null;

  if(syrupSelect) {
    fillProductSelect(syrupSelect);
    if (syrupSelect.value) updateSyrupProduct();
  }

  if(runSelect) {
    fillProductSelect(runSelect);
    if (runSelect.value) updateRunProduct();
  }

  if(matSelect) {
      matSelect.innerHTML = '<option value="" disabled selected hidden>Select a Raw Material...</option>';
      const canGroup = document.createElement("optgroup"); canGroup.label = "Cans"; canGroup.className = "text-red-800 font-bold bg-red-50";
      const bottleGroup = document.createElement("optgroup"); bottleGroup.label = "Bottles"; bottleGroup.className = "text-gray-800 font-bold bg-slate-50";
      Object.keys(MATERIAL_DB).sort().forEach(key => {
          let opt = document.createElement('option'); opt.value = key; 
          opt.innerText = MATERIAL_DB[key].number ? `[${MATERIAL_DB[key].number}] ${key}` : key;
          opt.className = "text-gray-700 bg-white font-normal";
          if (MATERIAL_DB[key].category === 'bottle') bottleGroup.appendChild(opt); else canGroup.appendChild(opt);
      });
      matSelect.appendChild(canGroup); matSelect.appendChild(bottleGroup);

      if (currentMat && MATERIAL_DB[currentMat]) matSelect.value = currentMat;
  }

  // The admin product form lists materials too, so it follows the same data.
  fillProductMaterialsField();

  syncComboboxes();
}

function populateDateCodeDropdown() {
  // Both the forward calculator and the reverse lookup pick a category the same
  // way, so they share one list.
  ["datecode-product", "lookup-product"].forEach(fillDateCodeSelect);
  syncComboboxes();
}

function fillDateCodeSelect(selectId) {
  const select = document.getElementById(selectId);
  if (!select) return;

  const currentVal = select.value;

  select.innerHTML = '<option value="">Select a Product Category...</option>';
  
  const canGroup = document.createElement("optgroup");
  canGroup.label = "Cans"; canGroup.className = "font-bold text-red-800 bg-red-50";
  
  const bottleGroup = document.createElement("optgroup");
  bottleGroup.label = "Bottles"; bottleGroup.className = "font-bold text-gray-800 bg-slate-50";

  Object.keys(QA_CODE_DB).sort().forEach(key => {
      const item = QA_CODE_DB[key];
      const opt = document.createElement("option"); opt.value = item.weeks;
      opt.innerText = `${item.name} (${item.weeks} Weeks)`; opt.className = "font-normal text-gray-800 bg-white";
      if(item.category === 'bottle') bottleGroup.appendChild(opt);
      else canGroup.appendChild(opt);
  });

  select.appendChild(canGroup);
  select.appendChild(bottleGroup);

  if (currentVal) {
     const exists = Object.values(QA_CODE_DB).some(item => item.weeks.toString() === currentVal);
     if (exists) select.value = currentVal;
  }
}

function calculateDateCode() {
  const productSelect = document.getElementById("datecode-product");
  const dateInput = document.getElementById("datecode-date");
  const resultEl = document.getElementById("datecode-result");
  const printEl = document.getElementById("datecode-print");
  
  if (!productSelect || !dateInput) return;

  const result = optimumTasteDate(dateInput.value, parseInt(productSelect.value));

  if (!result) {
      if(resultEl) resultEl.innerText = "---";
      if(printEl) printEl.innerText = "---";
      return;
  }

  if (resultEl) resultEl.innerText = result.display;
  if (printEl) printEl.innerText = result.printCode;
}

/**
 * Reverse lookup: a code off a can, back to the day it was made.
 *
 * The code carries the expiry and the production weekday but not the shelf
 * life, so a category is needed to pin the date. Without one we show every
 * distinct shelf life on file and let the operator recognise theirs, which
 * beats refusing to answer when someone is holding an unlabelled can.
 */
function lookupPrintCode() {
  const codeEl = document.getElementById("lookup-code");
  const out = document.getElementById("lookup-result");
  if (!codeEl || !out) return;

  const raw = codeEl.value.trim();
  const weeks = parseInt(document.getElementById("lookup-product")?.value) || 0;

  if (!raw) {
    out.innerHTML = '<p class="text-sm text-slate-500 dark:text-slate-400">Enter a print code to decode it.</p>';
    return;
  }

  const parsed = parsePrintCode(raw);
  if (!parsed) {
    out.innerHTML = `<p class="text-sm font-bold text-amber-700 dark:text-amber-300"><i class="fas fa-triangle-exclamation mr-2" aria-hidden="true"></i>Not a code we recognise.</p>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">Expected the shape <span class="font-mono">BBJUN0126DDC</span> — month, day, year, then the production day letter.</p>`;
    return;
  }

  const expiryText = `${MONTHS[parsed.expiry.getMonth()]}-${String(parsed.expiry.getDate()).padStart(2, '0')}-${String(parsed.expiry.getFullYear()).slice(-2)}`;

  const header = `<div class="text-center">
      <span class="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Best Before</span>
      <p class="tnum text-2xl font-extrabold text-slate-800 dark:text-slate-100">${escapeHtml(expiryText)}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Produced on a <strong>${escapeHtml(parsed.dayName)}</strong></p>
    </div>`;

  if (!weeks) {
    // No category chosen — offer one row per distinct shelf life on file.
    const weeksOnFile = [...new Set(Object.values(QA_CODE_DB).map((c) => Number(c.weeks)))]
      .filter((w) => w > 0)
      .sort((a, b) => a - b);

    const rows = weeksOnFile.map((w) => {
      const r = productionDateFromCode(raw, w);
      return `<div class="flex items-baseline justify-between gap-3 py-1.5 border-b border-slate-200/70 dark:border-slate-700/70 last:border-0">
        <span class="text-xs text-slate-500 dark:text-slate-400">${w} weeks</span>
        <span class="tnum text-sm font-bold text-slate-800 dark:text-slate-100">${escapeHtml(r.display)}</span>
      </div>`;
    }).join('');

    out.innerHTML = `${header}
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-4 mb-1">Pick a category for the exact date, or match a shelf life:</p>
      <div class="mt-1">${rows}</div>`;
    return;
  }

  const r = productionDateFromCode(raw, weeks);
  const weekEnd = new Date(r.weekStart.getTime() + 6 * 24 * 60 * 60 * 1000);
  const fmtShort = (d) => `${MONTHS[d.getMonth()]} ${d.getDate()}`;

  // A code we printed always expires on a Monday; anything else is worth saying.
  const warn = r.weekAligned ? '' : `<p class="text-xs text-amber-700 dark:text-amber-300 mt-3">
      <i class="fas fa-triangle-exclamation mr-1" aria-hidden="true"></i>This code doesn't expire on a Monday, so it wasn't printed by this plant's system. Treat the date below as a best guess.</p>`;

  out.innerHTML = `${header}
    <div class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 text-center">
      <span class="text-xs font-bold uppercase tracking-wide text-brand-800 dark:text-brand-300">Produced</span>
      <p id="lookup-proddate" class="tnum text-4xl font-extrabold text-brand-700 dark:text-brand-400 tracking-tight">${escapeHtml(r.display)}</p>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">${escapeHtml(r.dayName)} · week of ${escapeHtml(fmtShort(r.weekStart))}–${escapeHtml(fmtShort(weekEnd))} · ${r.weeks} week shelf life</p>
      ${warn}
      <div class="flex items-center justify-center gap-2 mt-4">
        <button type="button" class="copy-btn" data-copy-from="lookup-proddate" data-copy-label="Production date"><i class="fas fa-copy" aria-hidden="true"></i><span>Copy date</span></button>
      </div>
    </div>`;
}

function switchTab(tab) {
  if (currentActiveTab === tab) return;
  currentActiveTab = tab;

  // Instant swap — visibility and the fade are handled entirely in CSS, so
  // rapid tab clicks can't strand a pane mid-transition.
  document.querySelectorAll(".tab-pane").forEach(el => el.classList.remove("active"));
  document.querySelectorAll(".nav-tab").forEach(el => {
    el.classList.remove("active");
    el.setAttribute("aria-selected", "false");
  });

  document.getElementById("content-" + tab)?.classList.add("active");
  const tabBtn = document.getElementById("tab-" + tab);
  if (tabBtn) {
    tabBtn.classList.add("active");
    tabBtn.setAttribute("aria-selected", "true");
  }

  saveSession();
}

function updateSyrupProduct() {
  const key = document.getElementById("syrup-product").value;
  const product = PRODUCT_DB[key];
  const pltsInput = document.getElementById("syrup-plts");
  const infoBadge = document.getElementById("syrup-info-badge");

  if (!product) {
    if(infoBadge) infoBadge.textContent = "Select a product...";
    currentSkuYields = { casesPerGal: 0, casesPerPlt: 0 };
    return;
  }

  currentSkuYields = computeSkuYields(product);

  // Re-derive the other fields for the new SKU. If per-line counts exist (a
  // restored session, or a live Firestore update), recompute *from* them —
  // going through the 'cases' path would wipe them as if the user had typed.
  const hasActuals = [1, 2, 3].some(
    (n) => document.getElementById(`syrup-actual-cases-${n}`)?.value.trim()
  );
  calculateSyrup(hasActuals ? 'packsize-refresh' : 'cases');

  // Dim the whole card, not just the input wrapper, so "not applicable" reads clearly.
  const pltsCard = pltsInput?.closest('.calc-card');

  if (product.type === "bottle") {
    if (pltsInput) {
      pltsInput.disabled = true;
      pltsInput.placeholder = "N/A";
      // Clear it — a leftover can-pallet figure on a bottle SKU reads as real.
      pltsInput.value = "";
      pltsCard?.classList.add("opacity-50", "pointer-events-none");
    }
    if (infoBadge) {
      infoBadge.innerText = `Bottle · conversion factor ${product.factor}`;
      infoBadge.className = BADGE_NEUTRAL;
    }
  } else {
    if (pltsInput) {
      pltsInput.disabled = false;
      pltsInput.placeholder = "0";
      pltsCard?.classList.remove("opacity-50", "pointer-events-none");
    }
    if (infoBadge) {
      infoBadge.innerText = `Yield: ${fmt(currentSkuYields.casesPerGal)} cs/gal · ${fmt(currentSkuYields.casesPerPlt)} cs/plt`;
      infoBadge.className = BADGE_BRAND;
    }
  }
}

const BADGE_BASE = "mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border";
const BADGE_BRAND = `${BADGE_BASE} bg-brand-100 text-brand-800 border-brand-200 dark:bg-brand-500/15 dark:text-brand-200 dark:border-brand-800`;
const BADGE_NEUTRAL = `${BADGE_BASE} bg-slate-800 text-white border-slate-700 dark:bg-slate-700 dark:border-slate-600`;

// --- FULLY ADDITIVE 3-BOX MATH ENGINE ---
function calculateSyrup(source) {
  const product = PRODUCT_DB[document.getElementById("syrup-product")?.value];
  if (!product) return; 

  const galsEl = document.getElementById('syrup-gals');
  const pltsEl = document.getElementById('syrup-plts');
  const casesEl = document.getElementById('syrup-cases');
  
  const actual1El = document.getElementById('syrup-actual-cases-1');
  const packSize1El = document.getElementById('syrup-pack-size-1');
  
  const actual2El = document.getElementById('syrup-actual-cases-2');
  const packSize2El = document.getElementById('syrup-pack-size-2');
  
  const actual3El = document.getElementById('syrup-actual-cases-3');
  const packSize3El = document.getElementById('syrup-pack-size-3');

  const pack1 = packSize1El ? (parseFloat(packSize1El.value) || 18) : 18;
  const pack2 = packSize2El ? (parseFloat(packSize2El.value) || 24) : 24;
  const pack3 = packSize3El ? (parseFloat(packSize3El.value) || 35) : 35;

  let sourceEl;
  if (source === 'gals') sourceEl = galsEl;
  else if (source === 'plts') sourceEl = pltsEl;
  else if (source === 'cases') sourceEl = casesEl;
  else if (source === 'actual-1') sourceEl = actual1El;
  else if (source === 'actual-2') sourceEl = actual2El;
  else if (source === 'actual-3') sourceEl = actual3El;

  const valStr = sourceEl ? sourceEl.value.trim() : "";
  const val = source.startsWith('packsize') ? 0 : parseNumericInput(valStr);

  let stdCases = 0;
  let gals = 0;
  let plts = 0;

  const act1 = source === 'actual-1' ? val : parseNumericInput(actual1El?.value || '');
  const act2 = source === 'actual-2' ? val : parseNumericInput(actual2El?.value || '');
  const act3 = source === 'actual-3' ? val : parseNumericInput(actual3El?.value || '');

  // Blank rather than "0" for empty results, and thousands separators everywhere.
  const formatNum = (num) => (!num || isNaN(num) || !isFinite(num)) ? '' : fmt(num);

  // IF TYPING IN ACTUAL CASES (A, B, or C) - SUM THEM TOGETHER
  if (source.startsWith('actual') || source.startsWith('packsize')) {
      stdCases = standardCasesFromLines([
        { count: act1, packSize: pack1 },
        { count: act2, packSize: pack2 },
        { count: act3, packSize: pack3 },
      ]);
      ({ gals, plts } = deriveFromStandardCases(product, currentSkuYields, stdCases));

      if (galsEl) galsEl.value = formatNum(gals);
      if (pltsEl && product.type !== 'bottle') pltsEl.value = formatNum(plts);
      if (casesEl) casesEl.value = formatNum(stdCases);
  }
  // IF TYPING IN THE TOP ROW - CASCADE DOWN
  else {
      stdCases = standardCasesFromSource(product, currentSkuYields, source, val);
      ({ gals, plts } = deriveFromStandardCases(product, currentSkuYields, stdCases));

      // Update the other top row fields
      if (galsEl && source !== 'gals') galsEl.value = formatNum(gals);
      if (pltsEl && product.type !== 'bottle' && source !== 'plts') pltsEl.value = formatNum(plts);
      if (casesEl && source !== 'cases') casesEl.value = formatNum(stdCases);

      // Editing the top row invalidates any per-line counts, so clear them.
      // Previously this happened silently and read as a bug — flash the cards
      // that actually held a value so the wipe is visible and explained.
      const hadValues = [actual1El, actual2El, actual3El].some(el => el && el.value.trim() !== "");

      [actual1El, actual2El, actual3El].forEach((el) => {
        if (!el) return;
        const hadValue = el.value.trim() !== "";
        el.value = "";
        if (hadValue) flashWiped(el);
      });

      if (hadValues) announce("Line counts cleared because the totals were edited directly.");
  }
}

/** Brief highlight on a field that was auto-cleared, so the change is noticed. */
function flashWiped(inputEl) {
  if (prefersReducedMotion()) return;
  const card = inputEl.closest('[data-actual-card]') || inputEl;
  card.classList.remove('wipe-flash');
  void card.offsetWidth; // restart the animation
  card.classList.add('wipe-flash');
  setTimeout(() => card.classList.remove('wipe-flash'), 800);
}

function clearSyrup() {
  if(document.getElementById("syrup-gals")) document.getElementById("syrup-gals").value = "";
  if(document.getElementById("syrup-cases")) document.getElementById("syrup-cases").value = "";
  
  const product = PRODUCT_DB[document.getElementById("syrup-product")?.value];
  if (product && product.type !== "bottle" && document.getElementById("syrup-plts")) {
    document.getElementById("syrup-plts").value = "";
  }
  
  if(document.getElementById("syrup-actual-cases-1")) document.getElementById("syrup-actual-cases-1").value = "";
  if(document.getElementById("syrup-actual-cases-2")) document.getElementById("syrup-actual-cases-2").value = "";
  if(document.getElementById("syrup-actual-cases-3")) document.getElementById("syrup-actual-cases-3").value = "";

  saveSession();
  announce("Syrup calculation cleared");
}

function updateMaterial() {
  const matSelect = document.getElementById("mat-select");
  if(!matSelect || !matSelect.value) return;

  const data = MATERIAL_DB[matSelect.value];
  const yieldEl = document.getElementById("mat-yield");
  const badge = document.getElementById("mat-info-badge");
  const unitLabel = document.getElementById("mat-unit-label");

  if(!data) {
     yieldEl.innerText = "—";
     badge.innerText = "Select a material…";
     badge.className = BADGE_NEUTRAL;
     unitLabel.innerText = "Pallets/Rolls";
     calculateMaterial();
     return;
  }

  const yieldVal = data.unitsPerPallet / data.unitsPerCase;
  yieldEl.innerText = fmt(yieldVal) + " Cases";

  const matNumberStr = data.number ? `[${data.number}] ` : "";
  badge.innerText = data.boxesPerPallet
      ? `${matNumberStr}${data.desc} · ${data.boxesPerPallet} boxes × ${data.unitsPerBox} units = ${fmt(data.unitsPerPallet, { decimals: 0 })} total`
      : `${matNumberStr}${data.desc} · ${fmt(data.unitsPerPallet, { decimals: 0 })} total units/pallet`;

  unitLabel.innerText = data.unitName || "Pallets";
  badge.className = BADGE_NEUTRAL;

  calculateMaterial(); // Triggers math engine so target updates instantly on live DB changes
}

/** Evaluate a field that may hold either a number or an `=` expression. */
function readNumericField(id) {
  return parseNumericInput(document.getElementById(id)?.value || "");
}

/**
 * Materials maths, in both directions.
 *   source 'target' — cases wanted  → material units needed
 *   source 'onhand' — units in hand → cases producible
 */
function calculateMaterial(source = 'target') {
  const matSelect = document.getElementById("mat-select");
  if(!matSelect || !matSelect.value) return;

  const data = MATERIAL_DB[matSelect.value];
  const targetEl = document.getElementById("mat-target");
  const onhandEl = document.getElementById("mat-onhand");
  const neededEl = document.getElementById("mat-needed");

  const casesPerUnit = casesPerMaterialUnit(data);
  let units = 0;

  if (!data || !casesPerUnit) {
    if(window.animateNumber) window.animateNumber(neededEl, 0);
    updatePullReadout(0, data);
    return;
  }

  if (source === 'onhand') {
    units = readNumericField("mat-onhand");
    const cases = casesFromMaterialUnits(data, units);
    if (targetEl) targetEl.value = cases > 0 ? fmt(cases) : "";
  } else {
    units = materialUnitsForCases(data, readNumericField("mat-target"));
    if (onhandEl) onhandEl.value = units > 0 ? fmt(units) : "";
  }

  if(window.animateNumber) window.animateNumber(neededEl, units);
  else neededEl.innerText = fmt(units);

  updatePullReadout(units, data);
}

/**
 * Fractional units aren't pullable — surface the whole number an operator
 * actually acts on, plus how much of the last one gets used.
 */
function updatePullReadout(units, data) {
  const wrap = document.getElementById("mat-pull");
  const valueEl = document.getElementById("mat-pull-value");
  const noteEl = document.getElementById("mat-pull-note");
  if (!wrap || !valueEl || !noteEl) return;

  const pull = unitsToPull(units);

  if (!pull) {
    wrap.classList.add("hidden");
    valueEl.innerText = "—";
    noteEl.innerText = "";
    return;
  }

  const unitName = (data && data.unitName) || "Pallets";
  // Singularise "Pallets" → "Pallet" when pulling exactly one.
  const label = pull.whole === 1 && unitName.endsWith("s") ? unitName.slice(0, -1) : unitName;

  wrap.classList.remove("hidden");
  valueEl.innerText = `${fmt(pull.whole, { decimals: 0 })} ${label}`;
  noteEl.innerText = pull.exactlyFull
    ? "Exactly full — no partial unit."
    : `${pull.lastUsedPct}% of the last one used.`;
}

// --- RUN PLAN ---
//
// The other tabs each convert one quantity. A run plan answers the question an
// operator actually starts the shift with: "I'm building this on Thursday —
// what do I need?"
//
// A run is rarely a single pack size. 10,000 35-packs plus 2,000 18-packs plus
// 5,000 12-packs is one run, and materials don't spread evenly across it: the
// 35-pack film trays belong to the 35-pack rows only. So each row carries its
// own count, pack size and materials, and calc.js sums each material across
// just the rows that use it.

/**
 * Pack rows per product, persisted.
 *
 * Kept out of SESSION_FIELDS because it's structured data rather than an input
 * value. A product's stored `materials` field seeds the ticks on a brand new
 * row; after that the operator's own choice wins, since pack config varies run
 * to run.
 */
const RUN_LINES_KEY = 'prodcalc.runLines.v1';

/**
 * The pack sizes this plant actually runs, matching the Syrup tab exactly.
 *
 * There are no 6-pack or 12-pack rows, because neither is a case size here: a
 * "12-pack" is a 12x2 case and a "6-pack" is a 6x4 case. Both hold 24 units and
 * both convert at 24. The label spells out both configs so an operator running
 * either recognises this as their row — entering 6 or 12 would divide the
 * standard-case count, and the syrup with it, by four or two.
 */
const PACK_SIZES = [
  { value: 18, label: '18-Pack' },
  { value: 20, label: '20-Pack' },
  { value: 24, label: '24-Pack (12x2 / 6x4)' },
  { value: 30, label: '30-Pack' },
  { value: 35, label: '35-Pack' },
];

const PACK_VALUES = PACK_SIZES.map((p) => p.value);

/** Snap a stored pack size onto a real one; anything unknown means a 12x2 case. */
function normalisePackSize(value) {
  const n = Number(value);
  return PACK_VALUES.includes(n) ? n : 24;
}

function loadRunLines() {
  try {
    return JSON.parse(localStorage.getItem(RUN_LINES_KEY) || '{}') || {};
  } catch (e) {
    return {};
  }
}

function saveRunLines(map) {
  try {
    localStorage.setItem(RUN_LINES_KEY, JSON.stringify(map));
  } catch (e) { /* storage full or blocked — the plan still works this session */ }
}

/** Rows for the current SKU, seeded from the product's own bill of materials. */
function runLinesFor(productName, product) {
  const stored = loadRunLines();
  const rows = stored[productName];
  if (Array.isArray(rows) && rows.length) {
    return rows.map((r) => ({
      count: String(r.count ?? ''),
      packSize: normalisePackSize(r.packSize),
      // Drop anything renamed or deleted upstream.
      materials: (r.materials || []).filter((n) => MATERIAL_DB[n]),
    }));
  }
  return [{
    count: '',
    packSize: 24,
    materials: parseMaterialList(product && product.materials).filter((n) => MATERIAL_DB[n]),
  }];
}

function setRunLinesFor(productName, rows) {
  const stored = loadRunLines();
  stored[productName] = rows;
  saveRunLines(stored);
}

/** Read the rows straight off the DOM, so the UI is the single source of truth. */
function readRunLines() {
  return Array.from(document.querySelectorAll('#run-pack-lines [data-run-line]')).map((row) => ({
    count: row.querySelector('[data-run-count]')?.value ?? '',
    packSize: normalisePackSize(row.querySelector('[data-run-pack]')?.value),
    materials: Array.from(row.querySelectorAll('input[data-run-material]:checked'))
      .map((b) => b.getAttribute('data-run-material')),
  }));
}

/** Materials that could plausibly belong to this product, by category. */
function candidateMaterials(product) {
  if (!product) return [];
  return Object.keys(MATERIAL_DB)
    .filter((name) => {
      const cat = MATERIAL_DB[name].category;
      // An uncategorised material could belong to either line, so always offer it.
      return !cat || cat === product.type;
    })
    .sort();
}

function updateRunProduct() {
  const key = document.getElementById("run-product")?.value;
  const product = PRODUCT_DB[key];
  const badge = document.getElementById("run-info-badge");
  const pltsCard = document.getElementById("run-plts-card");

  if (badge) {
    badge.textContent = product
      ? (product.type === "bottle"
          ? `Bottle · ${fmt(product.factor)} cases/gal`
          : `Can · ${fmt(product.casesPerPallet)} cases/plt · ${fmt(product.galPerPallet, { decimals: 0 })} gal/plt`)
      : "Select a product…";
  }

  // Bottles have no pallet figure, so the card would only ever read zero.
  if (pltsCard) pltsCard.classList.toggle("hidden", !product || product.type === "bottle");

  renderRunLines(product ? runLinesFor(key, product) : []);
  calculateRunPlan();
}

/** Draw the pack rows. Called on SKU change and when rows are added/removed. */
function renderRunLines(rows) {
  const wrap = document.getElementById("run-pack-lines");
  if (!wrap) return;

  const key = document.getElementById("run-product")?.value;
  const product = PRODUCT_DB[key];

  if (!product) {
    wrap.innerHTML = '<p class="text-sm text-slate-500 dark:text-slate-400">Select a product to start a run.</p>';
    return;
  }

  const candidates = candidateMaterials(product);

  wrap.innerHTML = rows.map((row, i) => {
    const packSize = normalisePackSize(row.packSize);
    const packOpts = PACK_SIZES.map((p) =>
      `<option value="${p.value}" ${p.value === packSize ? 'selected' : ''}>${p.label}</option>`).join('');

    const chosen = new Set(row.materials || []);
    const boxes = candidates.length
      ? candidates.map((name) => {
          const m = MATERIAL_DB[name];
          const label = m.number ? `[${m.number}] ${name}` : name;
          return `<label class="flex items-start gap-2 py-1 px-1 cursor-pointer rounded hover:bg-slate-50 dark:hover:bg-white/5">
            <input type="checkbox" data-run-material="${escapeHtml(name)}" ${chosen.has(name) ? 'checked' : ''}
                   class="mt-0.5 h-4 w-4 flex-shrink-0 accent-brand-600 cursor-pointer" />
            <span class="min-w-0 text-xs text-slate-700 dark:text-slate-200">${escapeHtml(label)}</span>
          </label>`;
        }).join('')
      : '<p class="text-xs text-slate-500 dark:text-slate-400 py-1">No materials are categorised for this product type.</p>';

    return `<div class="calc-card" data-run-line="${i}">
      <div class="flex flex-wrap items-end gap-3">
        <div class="flex-1 min-w-[8rem]">
          <label class="input-label" for="run-count-${i}">Cases</label>
          <input type="text" inputmode="decimal" id="run-count-${i}" data-run-count placeholder="0"
                 value="${escapeHtml(String(row.count ?? ''))}" class="input-numeric" />
        </div>
        <div>
          <label class="input-label" for="run-pack-${i}">Pack size</label>
          <select id="run-pack-${i}" data-run-pack class="input-field text-sm font-bold px-2 py-2.5 w-auto cursor-pointer">${packOpts}</select>
        </div>
        <div class="flex-shrink-0">
          <button type="button" data-run-remove class="btn-ghost px-3 py-2.5 text-sm" aria-label="Remove this pack size">
            <i class="fas fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <details class="mt-3" ${chosen.size ? 'open' : ''}>
        <summary class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 cursor-pointer select-none">
          Materials for this pack <span data-run-count-badge class="font-normal normal-case tracking-normal">(${chosen.size} ticked)</span>
        </summary>
        <div class="mt-2 max-h-44 overflow-y-auto rounded-lg border border-slate-200 dark:border-slate-700 p-2">${boxes}</div>
      </details>
    </div>`;
  }).join('');

  wireRunLineEvents();
}

/** One handler set per redraw — rows are re-rendered wholesale. */
function wireRunLineEvents() {
  const wrap = document.getElementById("run-pack-lines");
  if (!wrap) return;

  wrap.querySelectorAll('[data-run-count]').forEach((el) => {
    el.addEventListener('input', calculateRunPlan);
    el.addEventListener('change', () => handleMath(el, calculateRunPlan));
  });

  wrap.querySelectorAll('[data-run-pack]').forEach((el) => {
    el.addEventListener('change', calculateRunPlan);
  });

  wrap.querySelectorAll('input[data-run-material]').forEach((el) => {
    el.addEventListener('change', () => {
      // Keep the "(n ticked)" badge honest without redrawing the whole row,
      // which would collapse the details the operator is working in.
      const row = el.closest('[data-run-line]');
      const badge = row?.querySelector('[data-run-count-badge]');
      if (badge) {
        badge.textContent = `(${row.querySelectorAll('input[data-run-material]:checked').length} ticked)`;
      }
      calculateRunPlan();
    });
  });

  wrap.querySelectorAll('[data-run-remove]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const rows = readRunLines();
      const idx = Number(btn.closest('[data-run-line]')?.getAttribute('data-run-line'));
      rows.splice(idx, 1);
      // Never leave the operator with nothing to type into.
      renderRunLines(rows.length ? rows : [{ count: '', packSize: 24, materials: [] }]);
      calculateRunPlan();
    });
  });
}

function addRunLine() {
  const key = document.getElementById("run-product")?.value;
  if (!PRODUCT_DB[key]) return;
  const rows = readRunLines();
  rows.push({ count: '', packSize: 24, materials: [] });
  renderRunLines(rows);
  calculateRunPlan();
}

/** "Pallets" -> "Pallet" when there's exactly one. */
function unitLabel(unitName, whole) {
  return whole === 1 && unitName.endsWith('s') ? unitName.slice(0, -1) : unitName;
}

function calculateRunPlan() {
  const key = document.getElementById("run-product")?.value;
  const product = PRODUCT_DB[key];
  const listWrap = document.getElementById("run-lines");
  if (!listWrap) return;

  const rows = readRunLines();
  const plan = buildRunPlan({
    product,
    // `=` expressions are allowed in the count fields, same as everywhere else.
    lines: rows.map((r) => ({ ...r, count: parseNumericInput(r.count) })),
    materialsDb: MATERIAL_DB,
  });

  if (product) setRunLinesFor(key, rows);

  const totalEl = document.getElementById("run-total-cases");
  const galsEl = document.getElementById("run-gals");
  const pltsEl = document.getElementById("run-plts");
  if (totalEl) totalEl.innerText = fmt(plan.stdCases);
  if (galsEl) galsEl.innerText = fmt(plan.gals);
  if (pltsEl) pltsEl.innerText = fmt(plan.plts);

  if (!product || !(plan.stdCases > 0)) {
    listWrap.innerHTML = '<p class="text-sm text-slate-500 dark:text-slate-400">Enter a case count to see what to pull.</p>';
    updateRunSummary(key, plan);
    return;
  }

  if (!plan.materials.length) {
    listWrap.innerHTML = '<p class="text-sm text-slate-500 dark:text-slate-400">No materials ticked for this run.</p>';
    updateRunSummary(key, plan);
    return;
  }

  listWrap.innerHTML = plan.materials.map((line) => {
    if (!line.usable) {
      return `<div class="calc-card border-amber-300 dark:border-amber-500/40">
        <p class="font-bold text-sm text-slate-800 dark:text-slate-100">${escapeHtml(line.name)}</p>
        <p class="text-sm text-amber-700 dark:text-amber-300 mt-1">Can't plan this one — its units per pallet/case aren't set.</p>
      </div>`;
    }

    const unitName = unitLabel(line.unitName, line.pull && line.pull.whole);
    const note = line.pull
      ? (line.pull.exactlyFull ? 'Exactly full — no partial unit.' : `${line.pull.lastUsedPct}% of the last one used.`)
      : '';
    // Only worth mentioning when the material isn't already on a 24 baseline.
    const packNote = line.packFactor !== 1
      ? `<span class="field-hint block mt-1">Pack factor ${fmt(line.packFactor)} applied.</span>`
      : '';

    return `<div class="calc-card">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="font-bold text-sm text-slate-800 dark:text-slate-100">${escapeHtml(line.name)}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">${escapeHtml(line.desc)}</p>
          ${packNote}
        </div>
        <div class="text-right flex-shrink-0">
          <p class="text-2xl font-black text-brand-700 dark:text-brand-300">${fmt(line.pull.whole, { decimals: 0 })} <span class="text-sm font-bold">${escapeHtml(unitName)}</span></p>
          <p class="text-xs text-slate-500 dark:text-slate-400">${fmt(line.units)} exact · ${escapeHtml(note)}</p>
        </div>
      </div>
    </div>`;
  }).join('');

  updateRunSummary(key, plan);
}

/** Plain-text plan for the clipboard — what gets carried to the floor. */
function updateRunSummary(productName, plan) {
  const el = document.getElementById("run-summary");
  if (!el) return;

  if (!productName || !(plan.stdCases > 0)) { el.value = ""; return; }

  const rows = [`RUN PLAN — ${productName}`];

  plan.lines.filter((l) => l.stdCases > 0).forEach((l) => {
    const label = (PACK_SIZES.find((p) => p.value === l.packSize) || {}).label || `${l.packSize}-Pack`;
    rows.push(`  ${fmt(l.count, { decimals: 0 })} × ${label} = ${fmt(l.stdCases)} std cases`);
  });

  rows.push(
    `Total: ${fmt(plan.stdCases)} standard cases`,
    `Syrup: ${fmt(plan.gals)} gal${plan.plts > 0 ? ` · ${fmt(plan.plts)} plts` : ''}`
  );

  if (plan.materials.length) {
    rows.push('', 'Materials to pull:');
    plan.materials.forEach((line) => {
      rows.push(line.usable && line.pull
        ? `  ${line.name}: ${fmt(line.pull.whole, { decimals: 0 })} ${unitLabel(line.unitName, line.pull.whole)} (${fmt(line.units)} exact)`
        : `  ${line.name}: not configured`);
    });
  }

  el.value = rows.join('\n');
}

function clearRunPlan() {
  const key = document.getElementById("run-product")?.value;
  // Keep the ticked materials — those describe the SKU, not this particular run.
  const rows = readRunLines().map((r) => ({ ...r, count: '' }));
  renderRunLines(rows.length ? rows : [{ count: '', packSize: 24, materials: [] }]);
  calculateRunPlan();
  saveSession();
  announce("Run plan cleared");
}

function clearMaterial() {
  const targetEl = document.getElementById("mat-target");
  const onhandEl = document.getElementById("mat-onhand");
  if (targetEl) targetEl.value = "";
  if (onhandEl) onhandEl.value = "";

  const neededEl = document.getElementById("mat-needed");
  if(window.animateNumber) window.animateNumber(neededEl, 0);
  else neededEl.innerText = "0.00";
  updatePullReadout(0, null);

  saveSession();
  announce("Material calculation cleared");
}

function handleMath(el, callback) {
  if (el.value.trim().startsWith("=")) {
    const result = evaluateExpression(el.value.trim().slice(1));
    if (isFinite(result)) el.value = fmt(Math.round(result * 100) / 100);
  }
  if (callback) callback();
}

// BIND FUNCTIONS EXPLICITLY TO WINDOW FOR HTML ACCESS
window.switchTab = switchTab; 
window.updateSyrupProduct = updateSyrupProduct; 
window.calculateSyrup = calculateSyrup;
window.clearSyrup = clearSyrup; 
window.updateMaterial = updateMaterial; 
window.calculateMaterial = calculateMaterial;
window.clearMaterial = clearMaterial;
window.updateRunProduct = updateRunProduct;
window.calculateRunPlan = calculateRunPlan;
window.addRunLine = addRunLine;
window.clearRunPlan = clearRunPlan;
window.handleMath = handleMath;
window.calculateDateCode = calculateDateCode;
window.lookupPrintCode = lookupPrintCode;
window.migrateDataToCloud = migrateDataToCloud;
window.switchAdminTab = switchAdminTab;
window.toggleProductFields = toggleProductFields;
window.saveMaterial = saveMaterial;
window.saveProduct = saveProduct;
window.saveQACode = saveQACode;
window.resetAdminForm = resetAdminForm;

// --- NUMBER ANIMATION ---
const animationStates = new Map();
window.animateNumber = function(el, endVal, duration = 400) {
    if(!el) return;
    const end = parseFloat(endVal) || 0;
    const key = el.id;

    const prev = animationStates.get(key);
    if (prev) {
        cancelAnimationFrame(prev.raf);
        clearTimeout(prev.safety);
        animationStates.delete(key);
    }

    // Fixed 2 decimals + tabular-nums (see .tnum in styles.css) keeps the
    // readout from changing width on every animation frame.
    const show = (n) => n.toLocaleString(undefined, {
        minimumFractionDigits: 2, maximumFractionDigits: 2
    });

    let start = parseFloat(el.innerText.replace(/[^0-9.-]/g, ''));
    if(isNaN(start)) start = 0;

    if (start === end || prefersReducedMotion()) {
        el.innerText = show(end);
        return;
    }

    // requestAnimationFrame is paused in backgrounded or occluded tabs. Without
    // a fallback the readout would be stranded on an interpolated value that
    // still looks like a real answer — worse than no animation at all. This
    // timer guarantees the final number lands even if no frame ever runs.
    const safety = setTimeout(() => {
        const s = animationStates.get(key);
        if (s) cancelAnimationFrame(s.raf);
        animationStates.delete(key);
        el.innerText = show(end);
    }, duration + 150);

    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart

        el.innerText = show(start + (end - start) * easeProgress);

        if (progress < 1) {
            const s = animationStates.get(key);
            if (s) s.raf = requestAnimationFrame(step);
        } else {
            clearTimeout(safety);
            animationStates.delete(key);
        }
    };

    animationStates.set(key, { raf: requestAnimationFrame(step), safety });
};

// --- THEME ---
// The `.dark` class lives on <html> (set by the inline script in index.html
// before first paint) and drives every Tailwind `dark:` variant. No stylesheet
// overrides, no `!important`.
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-toggle-icon');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

function applyTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    if (themeIcon) {
        // Show the action, not the state: a sun means "switch to light".
        themeIcon.classList.toggle('fa-sun', isDark);
        themeIcon.classList.toggle('fa-moon', !isDark);
    }
    if (themeToggle) {
        const next = isDark ? 'light' : 'dark';
        themeToggle.setAttribute('aria-label', `Switch to ${next} theme`);
        themeToggle.setAttribute('title', `Switch to ${next} theme`);
    }
}

applyTheme(document.documentElement.classList.contains('dark'));

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = !document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        applyTheme(isDark);
    });
}

// Follow the OS until the user makes an explicit choice.
systemDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) applyTheme(e.matches);
});

// One-time migration off the old localStorage key.
if (localStorage.getItem('darkMode') && !localStorage.getItem('theme')) {
    const wasDark = localStorage.getItem('darkMode') === 'enabled';
    localStorage.setItem('theme', wasDark ? 'dark' : 'light');
    localStorage.removeItem('darkMode');
    applyTheme(wasDark);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || '');

    if (e.altKey && e.key === '1') { e.preventDefault(); switchTab('syrup'); }
    else if (e.altKey && e.key === '2') { e.preventDefault(); switchTab('materials'); }
    // Numbered by position in the tab strip, so Run Plan takes 3 and QA Codes moves to 4.
    else if (e.altKey && e.key === '3') { e.preventDefault(); switchTab('runplan'); }
    else if (e.altKey && e.key === '4') { e.preventDefault(); switchTab('datecode'); }
    else if (e.key === '?' && !typing) { e.preventDefault(); window.showHelpModal(); }
    else if (e.key === '/' && !typing) {
        // Jump straight to the search box of the visible tab.
        e.preventDefault();
        const map = { syrup: 'syrup-product', materials: 'mat-select', datecode: 'datecode-product' };
        document.getElementById(`${map[currentActiveTab]}-search`)?.focus();
    }
});

// Help & Guide Modal
window.showHelpModal = function() {
    Swal.fire({
        title: '<i class="fas fa-book-open text-red-600 mr-2"></i> Application Guide',
        width: '700px',
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
            container: 'help-modal-container',
            title: 'text-2xl font-black border-b pb-4 mb-4 text-left w-full',
            htmlContainer: 'text-left'
        },
        html: `
<div class="space-y-6 max-h-[60vh] overflow-y-auto pr-2 text-slate-700 dark:text-slate-200">

  <!-- Shortcuts -->
  <div>
    <h3 class="font-bold text-lg border-b border-slate-200 dark:border-slate-600 pb-2 mb-3"><i class="fas fa-keyboard text-brand-600 mr-2"></i> Shortcuts</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
      ${[
        ['Alt + 1 / 2 / 3', 'Switch between tabs'],
        ['/', 'Focus the search box'],
        ['?', 'Open this guide'],
        ['=12*24/30', 'Inline math in any number field'],
      ].map(([key, desc]) => `
        <div class="flex items-center gap-2">
          <kbd class="px-2 py-1 rounded border font-mono text-xs font-bold bg-slate-100 border-slate-300 dark:bg-slate-700 dark:border-slate-600">${key}</kbd>
          <span class="text-slate-600 dark:text-slate-300">${desc}</span>
        </div>`).join('')}
    </div>
  </div>

  <!-- Case Baseline -->
  <div>
    <h3 class="font-bold text-lg border-b border-slate-200 dark:border-slate-600 pb-2 mb-3"><i class="fas fa-boxes-stacked text-blue-600 mr-2"></i> Standard 24-Pack Baseline</h3>
    <p class="text-sm leading-relaxed">
      The facility tracks total production volume using a standard 24-pack as the baseline unit. Whenever a different package size runs, a conversion multiplier is applied so physical inventory aligns with system records.
    </p>
    <p class="text-sm leading-relaxed mt-2">
      A <strong>35-pack</strong> ÷ 24 yields <strong>1.4583…</strong>, so every physical 35-pack is recorded as roughly <strong>1.46</strong> standard cases. An <strong>18-pack</strong> ÷ 24 yields exactly <strong>0.75</strong>, so each 18-pack counts as three-quarters of a case. This is what makes the totals reconcile at the end of a shift.
    </p>
  </div>

  <!-- Product Tank Accounting -->
  <div class="rounded-lg p-4 text-sm border bg-amber-50 border-amber-200 text-amber-900 dark:bg-amber-500/10 dark:border-amber-700/60 dark:text-amber-100">
    <div class="flex items-start">
      <i class="fas fa-circle-exclamation mt-1 mr-3 text-amber-600 dark:text-amber-400 text-lg"></i>
      <div>
        <strong class="block mb-1 font-bold uppercase tracking-wide">Product Tank Accounting</strong>
        <p class="leading-relaxed">
          Remember to account for the product tank — typically <strong>2–4 pallets</strong>, depending on tank size and gallon type (Regular vs. QS).
        </p>
        <p class="mt-2 leading-relaxed italic">
          Example (Line 7): add 2 pallets for regular gallons. If running QS, add <strong>4 pallets total</strong> (2× multiplier). So call "last 4" for QS and "last 2" for regular. Add these to the total syrup count for the whole run. Tank sizes vary by line.
        </p>
      </div>
    </div>
  </div>

  <!-- Calculator behaviour -->
  <div class="flex items-start gap-3 text-sm rounded-lg p-4 border bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-600">
    <i class="fas fa-lightbulb text-amber-500 mt-1 text-lg"></i>
    <div class="space-y-2">
      <p><strong>Fields are bi-directional.</strong> Type into any of Gallons, Can Bodies, or Standard Cases and the others follow.</p>
      <p><strong>Line A/B/C add up.</strong> They sum into Standard Cases. Editing the top row clears them, because per-line counts no longer match the new total.</p>
      <p><strong>Your work is saved.</strong> The SKU and numbers are restored the next time you open the app.</p>
    </div>
  </div>

</div>
        `
    });
};

// ─── PWA Install Prompt ─────────────────────────────────────────
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Don't show if user dismissed recently (within 7 days)
    const dismissed = localStorage.getItem('pwa-dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 7 * 24 * 60 * 60 * 1000) return;

    // Show the banner with a slight delay for better UX
    setTimeout(() => {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.classList.remove('translate-y-full');
    }, 2000);
});

// Install button
document.getElementById('pwa-install')?.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.classList.add('translate-y-full');
        Swal.fire({
            icon: 'success',
            title: 'App Installed!',
            text: 'Production Calculator has been added to your device.',
            timer: 3000,
            showConfirmButton: false
        });
    }
    deferredPrompt = null;
});

// Dismiss button
document.getElementById('pwa-dismiss')?.addEventListener('click', () => {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.add('translate-y-full');
    localStorage.setItem('pwa-dismissed', Date.now().toString());
    deferredPrompt = null;
});

// Hide banner if app is already installed
window.addEventListener('appinstalled', () => {
    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.add('translate-y-full');
    deferredPrompt = null;
});