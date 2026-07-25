import './styles.css';
// Self-hosted Font Awesome (solid set only) — removes the blocking cdnjs
// request and lets the service worker cache the icon font for offline use.
import '@fortawesome/fontawesome-free/css/fontawesome.min.css';
import '@fortawesome/fontawesome-free/css/solid.min.css';
import Swal from 'sweetalert2';
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc 
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
const db = getFirestore(app);
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

// Convert Arrays to Dictionary for initial default state
DATE_CODE_BOTTLES.forEach(d => QA_CODE_DB[d.name] = { ...d, category: 'bottle' });
DATE_CODE_CANS.forEach(d => QA_CODE_DB[d.name] = { ...d, category: 'can' });

let MATERIAL_IDS = {};
let PRODUCT_IDS = {};
let QA_CODE_IDS = {};

let editingId = null;
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

    // Safety net: Populate immediately from defaults so the app never crashes
    populateDropdowns();
    populateDateCodeDropdown();

    // Turn the native selects into searchable comboboxes (progressive
    // enhancement — the underlying <select> stays the source of truth).
    document.querySelectorAll('select[data-combobox]').forEach(enhanceSelect);

    // Bring back whatever the user was last working on.
    restoreSession();

    // LISTENER: Materials
    onSnapshot(query(collection(db, "materials"), orderBy("name")), (snapshot) => {
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
    }, (error) => console.warn("Firestore access restricted, continuing with defaults.", error.message));

    // LISTENER: Products 
    onSnapshot(query(collection(db, "products"), orderBy("name")), (snapshot) => {
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
    }, (error) => console.warn("Firestore access restricted, continuing with defaults.", error.message));

    // LISTENER: QA Codes
    onSnapshot(query(collection(db, "qacodes"), orderBy("name")), (snapshot) => {
      const newDB = {}; QA_CODE_IDS = {}; 
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data(); newDB[data.name] = data; 
          // Store an array of IDs just in case there are duplicates
          if(!QA_CODE_IDS[data.name]) QA_CODE_IDS[data.name] = [];
          QA_CODE_IDS[data.name].push(doc.id); 
        });
      }

      // Rebuild base from hardcoded arrays, then append new ones from Firestore
      QA_CODE_DB = {};
      DATE_CODE_BOTTLES.forEach(d => QA_CODE_DB[d.name] = { ...d, category: 'bottle' });
      DATE_CODE_CANS.forEach(d => QA_CODE_DB[d.name] = { ...d, category: 'can' });
      QA_CODE_DB = { ...QA_CODE_DB, ...newDB };

      populateDateCodeDropdown();
      calculateDateCode();
      if(currentAdminTab === 'qacodes') renderAdminList();
    }, (error) => console.warn("Firestore access restricted, continuing with defaults.", error.message));

  } catch (error) {
    console.error("Initialization Error:", error);
  }
}

// --- SHARED HELPERS ---

const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Consistent number formatting: thousands separators, at most 2 decimals. */
function fmt(num, { decimals = 2 } = {}) {
  if (num === null || num === undefined || isNaN(num) || !isFinite(num)) return '';
  return Number(num).toLocaleString(undefined, {
    minimumFractionDigits: Number.isInteger(num) ? 0 : decimals,
    maximumFractionDigits: decimals,
  });
}

/** Strip locale formatting back to a raw number (inputs are user-editable). */
function parseLocaleNumber(str) {
  if (typeof str !== 'string') return parseFloat(str) || 0;
  return parseFloat(str.replace(/,/g, '')) || 0;
}

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
async function migrateDataToCloud() {
  const tabNames = {
    'materials': 'Materials',
    'products': 'Products',
    'qacodes': 'QA Codes'
  };
  const currentName = tabNames[currentAdminTab] || 'Data';

  const result = await Swal.fire({
    title: 'Migrate to Cloud?',
    text: `This will push all default ${currentName} to the cloud. Clicking multiple times will create duplicates!`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#b91c1c',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Yes, migrate it!'
  });
  if (!result.isConfirmed) return;
  
  try {
    if (currentAdminTab === 'materials') {
        for(const [name, data] of Object.entries(DEFAULT_MATERIALS)) { await addDoc(collection(db, "materials"), { name, ...data }); }
    } else if (currentAdminTab === 'products') {
        for(const [name, data] of Object.entries(DEFAULT_PRODUCTS)) { await addDoc(collection(db, "products"), { name, ...data }); }
    } else if (currentAdminTab === 'qacodes') {
        for(const item of DATE_CODE_BOTTLES) { await addDoc(collection(db, "qacodes"), { name: item.name, category: "bottle", weeks: item.weeks }); }
        for(const item of DATE_CODE_CANS) { await addDoc(collection(db, "qacodes"), { name: item.name, category: "can", weeks: item.weeks }); }
    }
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${currentName} migration complete!`, showConfirmButton: false, timer: 3000 });
  } catch (e) {
    Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: `Error migrating: ${e.message}`, showConfirmButton: false, timer: 3000 });
  }
}
window.migrateDataToCloud = migrateDataToCloud;

// --- AUTHENTICATION & ADMIN UI ---
function setupAuthUI() {
  const loginBtn = document.getElementById('login-btn');
  const adminPanel = document.getElementById('admin-panel');
  const logoutBtn = document.getElementById('logout-btn');

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(loginBtn) loginBtn.classList.add('hidden');
      if(adminPanel) adminPanel.classList.remove('hidden');
      if(logoutBtn) logoutBtn.classList.remove('hidden');
      
      renderAdminList(); 
    } else {
      if(loginBtn) loginBtn.classList.remove('hidden');
      if(adminPanel) adminPanel.classList.add('hidden');
      if(logoutBtn) logoutBtn.classList.add('hidden');
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

// --- ADMIN SAVING FUNCTIONS ---
async function saveMaterial() {
    const name = document.getElementById('new-mat-name').value;
    const numberInput = document.getElementById('new-mat-number');
    const number = numberInput ? numberInput.value.trim() : "";
    const unitsPerPallet = parseFloat(document.getElementById('new-mat-units').value);
    const unitsPerCase = parseFloat(document.getElementById('new-mat-per-case').value);
    const desc = document.getElementById('new-mat-desc').value;
    const category = document.getElementById('new-mat-cat').value;
    const stdFactor = parseFloat(document.getElementById('new-mat-factor').value) || null;

    if(!name || !unitsPerPallet || !unitsPerCase) return toast('warning', 'Name, units/pallet and units/case are required');
    const materialData = { name, number, unitsPerPallet, unitsPerCase, desc: desc || name, category, stdCaseFactor: stdFactor, unitName: "Pallets" };

    try {
        if (editingId) await updateDoc(doc(db, "materials", editingId), materialData);
        else await addDoc(collection(db, "materials"), materialData);
        resetAdminForm();
    } catch (e) { toast('error', 'Error saving material: ' + e.message); }
}

async function saveProduct() {
    const name = document.getElementById('new-prod-name').value;
    const type = document.getElementById('new-prod-type').value;
    if(!name) return toast('warning', 'Product name is required');

    let productData = { name, type };
    if (type === 'can') {
        productData.galPerPallet = parseFloat(document.getElementById('new-prod-gal-plt').value) || 0;
        productData.casesPerPallet = parseFloat(document.getElementById('new-prod-cs-plt').value) || 0;
    } else {
        productData.factor = parseFloat(document.getElementById('new-prod-factor').value) || 0;
    }

    try {
        if (editingId) await updateDoc(doc(db, "products", editingId), productData);
        else await addDoc(collection(db, "products"), productData);
        resetAdminForm();
    } catch (e) { toast('error', 'Error saving product: ' + e.message); }
}

async function saveQACode() {
    const name = document.getElementById('new-qa-name').value;
    const category = document.getElementById('new-qa-cat').value;
    const weeks = parseInt(document.getElementById('new-qa-weeks').value) || 0;
    if(!name || !weeks) return toast('warning', 'Name and weeks are required');

    try {
        if (editingId) await updateDoc(doc(db, "qacodes", editingId), { name, category, weeks });
        else await addDoc(collection(db, "qacodes"), { name, category, weeks });
        resetAdminForm();
    } catch (e) { toast('error', 'Error saving QA code: ' + e.message); }
}

function resetAdminForm() {
    document.querySelectorAll('.admin-form input').forEach(el => el.value = "");
    editingId = null;

    ['material', 'product', 'qacode'].forEach(type => {
        const btn = document.getElementById(`btn-save-${type}`);
        if(btn) {
            btn.innerText = `Save ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            btn.classList.remove('!bg-amber-600', 'hover:!bg-amber-700');
        }
    });

    document.querySelectorAll('.cancel-edit-btn').forEach(btn => btn.remove());
    toggleProductFields();
}

function renderAdminList() {
    const listContainer = document.getElementById('admin-database-list');
    if (!listContainer) return;
    listContainer.innerHTML = "";

    let dbObj, idObj, displayFunc;

    const strong = 'text-slate-900 dark:text-slate-100';
    const meta = 'text-xs ml-1 whitespace-nowrap text-slate-500 dark:text-slate-400';

    if (currentAdminTab === 'materials') {
        dbObj = MATERIAL_DB; idObj = MATERIAL_IDS;
        displayFunc = (item) => `<strong class="${strong}">${item.number ? `[${item.number}] ` : ''}${item.name}</strong> <span class="${meta}">(${item.unitsPerPallet}/plt)</span>`;
    } else if (currentAdminTab === 'products') {
        dbObj = PRODUCT_DB; idObj = PRODUCT_IDS;
        displayFunc = (item) => `<strong class="${strong}">${item.name}</strong> <span class="${meta}">(${item.type.toUpperCase()})</span>`;
    } else if (currentAdminTab === 'qacodes') {
        dbObj = QA_CODE_DB; idObj = QA_CODE_IDS;
        displayFunc = (item) => `<strong class="${strong}">${item.name}</strong> <span class="${meta}">(${item.weeks} wks, ${item.category})</span>`;
    }

    const items = Object.keys(idObj).sort();
    if (items.length === 0) return listContainer.innerHTML = '<div class="text-sm italic p-2 text-slate-500 dark:text-slate-400">No custom items in database yet. Try Migrating!</div>';

    items.forEach(name => {
        const item = dbObj[name];
        const docIds = idObj[name];
        if(!item || !docIds) return;

        const primaryId = docIds[0];

        const div = document.createElement('div');
        div.className = "flex justify-between items-start p-2 mb-2 rounded-lg border text-sm w-full bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700";
        div.innerHTML = `
            <div class="flex-1 min-w-0 pr-2">
                <div class="whitespace-normal break-words leading-snug">${displayFunc(item)}</div>
                ${docIds.length > 1 ? `<div class="text-xs font-bold mt-1 px-2 py-0.5 rounded inline-block text-brand-700 bg-brand-100 dark:text-brand-300 dark:bg-brand-500/15"><i class="fas fa-exclamation-triangle"></i> ${docIds.length} Copies Found (Delete to clear all)</div>` : ''}
            </div>
            <div class="flex gap-2 flex-shrink-0">
                <button type="button" aria-label="Edit" class="p-2 rounded transition-colors edit-btn text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/15" data-id="${primaryId}" data-name="${name.replace(/"/g, '&quot;')}"><i class="fas fa-edit"></i></button>
                <button type="button" aria-label="Delete" class="p-2 rounded transition-colors delete-btn text-brand-500 hover:text-brand-700 hover:bg-brand-50 dark:hover:bg-brand-500/15" data-ids='${JSON.stringify(docIds)}'><i class="fas fa-trash-alt"></i></button>
            </div>`;
        listContainer.appendChild(div);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const button = e.target.closest('button');
            const ids = JSON.parse(button.dataset.ids);
            
            const result = await Swal.fire({
                title: 'Delete from Cloud?',
                text: "Are you sure you want to delete this?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#b91c1c',
                cancelButtonColor: '#6b7280',
                confirmButtonText: 'Yes, delete it!'
            });
            
            if(result.isConfirmed) {
                const colName = { products: 'products', qacodes: 'qacodes' }[currentAdminTab] || 'materials';
                try {
                    // Delete ALL duplicates of this item at the exact same time
                    for(const id of ids) {
                        await deleteDoc(doc(db, colName, id));
                        if (editingId === id) resetAdminForm();
                    }
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Deleted successfully', showConfirmButton: false, timer: 2000 });
                } catch(err) {
                    Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: 'Error deleting', text: err.message, showConfirmButton: false, timer: 3000 });
                }
            }
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const button = e.target.closest('button');
            const name = button.dataset.name;
            const item = dbObj[name];
            editingId = button.dataset.id;

            let saveBtnId = '';
            
            if(currentAdminTab === 'materials') {
                document.getElementById('new-mat-name').value = item.name;
                const numInput = document.getElementById('new-mat-number');
                if(numInput) numInput.value = item.number || "";
                document.getElementById('new-mat-units').value = item.unitsPerPallet;
                document.getElementById('new-mat-per-case').value = item.unitsPerCase;
                document.getElementById('new-mat-desc').value = item.desc || "";
                document.getElementById('new-mat-cat').value = item.category;
                document.getElementById('new-mat-factor').value = item.stdCaseFactor || "";
                saveBtnId = 'btn-save-material';
            } else if (currentAdminTab === 'products') {
                document.getElementById('new-prod-name').value = item.name;
                document.getElementById('new-prod-type').value = item.type;
                toggleProductFields();
                if(item.type === 'can') {
                    document.getElementById('new-prod-gal-plt').value = item.galPerPallet;
                    document.getElementById('new-prod-cs-plt').value = item.casesPerPallet;
                } else {
                    document.getElementById('new-prod-factor').value = item.factor;
                }
                saveBtnId = 'btn-save-product';
            } else if (currentAdminTab === 'qacodes') {
                document.getElementById('new-qa-name').value = item.name;
                document.getElementById('new-qa-cat').value = item.category;
                document.getElementById('new-qa-weeks').value = item.weeks;
                saveBtnId = 'btn-save-qacode';
            }

            const saveBtn = document.getElementById(saveBtnId);
            saveBtn.innerText = "Update";
            saveBtn.classList.add('!bg-amber-600', 'hover:!bg-amber-700');

            if (!saveBtn.nextElementSibling?.classList.contains('cancel-edit-btn')) {
                const cancelBtn = document.createElement('button');
                cancelBtn.type = "button";
                cancelBtn.innerText = "Cancel";
                cancelBtn.className = "cancel-edit-btn mt-2 w-full px-4 py-2 rounded-lg font-bold text-white transition-colors bg-slate-500 hover:bg-slate-600";
                cancelBtn.addEventListener('click', resetAdminForm);
                saveBtn.parentNode.insertBefore(cancelBtn, saveBtn.nextSibling);
            }
        });
    });
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
  'datecode-product',
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
    ['syrup-product', 'mat-select', 'datecode-product',
     'syrup-pack-size-1', 'syrup-pack-size-2', 'syrup-pack-size-3'].forEach((id) => {
      const el = document.getElementById(id);
      if (el && data[id] != null && Array.from(el.options).some((o) => o.value === data[id])) {
        el.value = data[id];
      }
    });

    ['syrup-gals', 'syrup-plts', 'syrup-cases', 'syrup-actual-cases-1',
     'syrup-actual-cases-2', 'syrup-actual-cases-3', 'mat-target', 'mat-onhand'].forEach((id) => {
      const el = document.getElementById(id);
      if (el && data[id] != null) el.value = data[id];
    });

    syncComboboxes();
    updateSyrupProduct();
    updateMaterial();
    calculateDateCode();

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

function populateDropdowns() {
  const syrupSelect = document.getElementById("syrup-product");
  const matSelect = document.getElementById("mat-select");

  const currentSyrup = syrupSelect ? syrupSelect.value : null;
  const currentMat = matSelect ? matSelect.value : null;

  if(syrupSelect) {
    syrupSelect.innerHTML = '<option value="" disabled selected hidden>Select a Product...</option>';
    const canGroup = document.createElement("optgroup"); canGroup.label = "Cans"; canGroup.className = "text-red-800 font-bold bg-red-50";
    const bottleGroup = document.createElement("optgroup"); bottleGroup.label = "Bottles"; bottleGroup.className = "text-gray-800 font-bold bg-slate-50";
    Object.keys(PRODUCT_DB).sort().forEach((key) => {
      let opt = document.createElement("option"); opt.value = key; opt.innerText = key; opt.className = "text-gray-700 bg-white font-normal";
      if (PRODUCT_DB[key].type === "bottle") bottleGroup.appendChild(opt); else canGroup.appendChild(opt);
    });
    syrupSelect.appendChild(canGroup); syrupSelect.appendChild(bottleGroup);

    if (currentSyrup && PRODUCT_DB[currentSyrup]) {
        syrupSelect.value = currentSyrup;
    } else if (PRODUCT_DB["12 oz. Can"]) {
        syrupSelect.value = "12 oz. Can";
    }

    if (syrupSelect.value) {
        updateSyrupProduct();
    }
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

  syncComboboxes();
}

function populateDateCodeDropdown() {
  const select = document.getElementById("datecode-product");
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

  syncComboboxes();
}

function calculateDateCode() {
  const productSelect = document.getElementById("datecode-product");
  const dateInput = document.getElementById("datecode-date");
  const resultEl = document.getElementById("datecode-result");
  const printEl = document.getElementById("datecode-print");
  
  if (!productSelect || !dateInput) return;

  const weeks = parseInt(productSelect.value);
  const prodDateStr = dateInput.value;
  
  if (!weeks || isNaN(weeks) || !prodDateStr) {
      if(resultEl) resultEl.innerText = "---";
      if(printEl) printEl.innerText = "---";
      return;
  }

  const prodDate = new Date(prodDateStr + 'T12:00:00');
  const dayOfWeek = prodDate.getDay(); 
  const daysToSubtract = (dayOfWeek + 6) % 7; 
  const mondayProdDate = new Date(prodDate.getTime() - (daysToSubtract * 24 * 60 * 60 * 1000));
  const expDate = new Date(mondayProdDate.getTime() + (weeks * 7 * 24 * 60 * 60 * 1000));
  
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const m = months[expDate.getMonth()];
  const d = String(expDate.getDate()).padStart(2, '0');
  const y = String(expDate.getFullYear()).slice(-2);
  
  if(resultEl) resultEl.innerText = `${m}-${d}-${y}`;
  const dayLetters = ["G", "A", "B", "C", "D", "E", "F"]; 
  if (printEl) printEl.innerText = `BB${m.toUpperCase()}${d}${y}DD${dayLetters[dayOfWeek]}`;
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

  currentSkuYields.casesPerGal = product.type === "bottle" ? product.factor : product.casesPerPallet / product.galPerPallet;
  currentSkuYields.casesPerPlt = product.type === "bottle" ? 0 : product.casesPerPallet;

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

  let valStr = sourceEl ? sourceEl.value.trim() : "";
  let val = 0;

  if (!source.startsWith('packsize') && valStr.startsWith("=")) {
    try {
        val = new Function("return " + valStr.substring(1).replace(/[^0-9+\-*/(). ]/g, ""))();
    } catch(e) {
        val = 0;
    }
  } else if (!source.startsWith('packsize')) {
    val = parseLocaleNumber(valStr);
  }

  let stdCases = 0;
  let gals = 0;
  let plts = 0;

  let act1 = source === 'actual-1' ? val : parseLocaleNumber(actual1El?.value || '');
  let act2 = source === 'actual-2' ? val : parseLocaleNumber(actual2El?.value || '');
  let act3 = source === 'actual-3' ? val : parseLocaleNumber(actual3El?.value || '');

  // Blank rather than "0" for empty results, and thousands separators everywhere.
  const formatNum = (num) => (!num || isNaN(num) || !isFinite(num)) ? '' : fmt(num);

  // IF TYPING IN ACTUAL CASES (A, B, or C) - SUM THEM TOGETHER
  if (source.startsWith('actual') || source.startsWith('packsize')) {
      stdCases = (act1 * pack1 / 24) + (act2 * pack2 / 24) + (act3 * pack3 / 24);
      
      if (product.type === "bottle") {
          gals = stdCases / product.factor;
      } else {
          gals = stdCases / currentSkuYields.casesPerGal;
          plts = stdCases / currentSkuYields.casesPerPlt;
      }

      if (galsEl) galsEl.value = formatNum(gals);
      if (pltsEl && product.type !== 'bottle') pltsEl.value = formatNum(plts);
      if (casesEl) casesEl.value = formatNum(stdCases);
  } 
  // IF TYPING IN THE TOP ROW - CASCADE DOWN
  else {
      if (source === 'gals') {
          stdCases = (product.type === "bottle") ? (val * product.factor) : (val * currentSkuYields.casesPerGal);
      } else if (source === 'plts') {
          stdCases = (product.type === "bottle") ? 0 : (val * currentSkuYields.casesPerPlt);
      } else if (source === 'cases') {
          stdCases = val;
      }

      if (product.type === "bottle") {
          gals = stdCases / product.factor;
      } else {
          gals = stdCases / currentSkuYields.casesPerGal;
          plts = stdCases / currentSkuYields.casesPerPlt;
      }

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
  const str = (document.getElementById(id)?.value || "").trim();
  if (str.startsWith("=")) {
    try {
      return new Function("return " + str.substring(1).replace(/[^0-9+\-*/(). ]/g, ""))() || 0;
    } catch (e) {
      return 0;
    }
  }
  return parseLocaleNumber(str);
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

  // Cases produced per single unit of the material (pallet / roll / box / reel).
  const casesPerUnit = data ? (data.unitsPerPallet / data.unitsPerCase) : 0;

  let units = 0;

  if (!data || !casesPerUnit || !isFinite(casesPerUnit)) {
    if(window.animateNumber) window.animateNumber(neededEl, 0);
    updatePullReadout(0, data);
    return;
  }

  if (source === 'onhand') {
    units = readNumericField("mat-onhand");
    const cases = units * casesPerUnit;
    if (targetEl) targetEl.value = cases > 0 ? fmt(cases) : "";
  } else {
    const target = readNumericField("mat-target");
    units = target > 0 ? target / casesPerUnit : 0;
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

  if (!units || units <= 0 || !isFinite(units)) {
    wrap.classList.add("hidden");
    valueEl.innerText = "—";
    noteEl.innerText = "";
    return;
  }

  const unitName = (data && data.unitName) || "Pallets";
  const whole = Math.ceil(units - 1e-9); // tolerate float dust on exact figures
  const remainder = whole - units;
  const lastUsedPct = Math.round((1 - remainder) * 100);

  // Singularise "Pallets" → "Pallet" when pulling exactly one.
  const label = whole === 1 && unitName.endsWith("s") ? unitName.slice(0, -1) : unitName;

  wrap.classList.remove("hidden");
  valueEl.innerText = `${fmt(whole, { decimals: 0 })} ${label}`;
  noteEl.innerText = remainder < 1e-6
    ? "Exactly full — no partial unit."
    : `${lastUsedPct}% of the last one used.`;
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
    try {
      const result = new Function("return " + el.value.substring(1).replace(/[^0-9+\-*/(). ]/g, ""))();
      if (isFinite(result)) { el.value = fmt(Math.round(result * 100) / 100); if (callback) callback(); }
    } catch (e) {}
  } else { if (callback) callback(); }
}

// BIND FUNCTIONS EXPLICITLY TO WINDOW FOR HTML ACCESS
window.switchTab = switchTab; 
window.updateSyrupProduct = updateSyrupProduct; 
window.calculateSyrup = calculateSyrup;
window.clearSyrup = clearSyrup; 
window.updateMaterial = updateMaterial; 
window.calculateMaterial = calculateMaterial;
window.clearMaterial = clearMaterial; 
window.handleMath = handleMath; 
window.calculateDateCode = calculateDateCode;
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
    else if (e.altKey && e.key === '3') { e.preventDefault(); switchTab('datecode'); }
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