import './styles.css';
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
    // --- BACKGROUND CYCLER ---
    const currentBgIndex = parseInt(localStorage.getItem('bgCycleIndex') || '0');
    document.body.classList.add('bg-' + ((currentBgIndex % 4) + 1));
    localStorage.setItem('bgCycleIndex', currentBgIndex + 1);

    setupAuthUI();
    const dateInput = document.getElementById("datecode-date");
    if (dateInput) dateInput.valueAsDate = new Date();

    const fizzContainer = document.getElementById("fizz-container");
    if (fizzContainer && fizzContainer.childElementCount === 0) {
      for (let i = 0; i < 20; i++) createBubble(fizzContainer);
    }

    // Safety net: Populate immediately from defaults so the app never crashes
    populateDropdowns();
    populateDateCodeDropdown();

    // Inject the Pro Tip explaining standard cases
    injectProTip();

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

// --- DOM INJECTION: PRO TIP ---
function injectProTip() {
  if (document.getElementById('conversion-pro-tip')) return;
  
  // Target the badge right underneath the Product Dropdown
  const infoBadge = document.getElementById('syrup-info-badge');

  const tip = document.createElement('div');
  tip.id = 'conversion-pro-tip';
  tip.className = 'mt-6 mb-2 bg-blue-50/60 border border-blue-200 rounded-lg p-4 shadow-sm backdrop-blur-sm';
  tip.innerHTML = `<div class="flex items-start"> <i class="fas fa-lightbulb text-blue-600 mt-1 mr-3 text-lg"></i> <div> <h4 class="font-bold text-blue-900 text-sm uppercase tracking-wide mb-1">Pro Tip: Standard Case Conversions</h4> <p class="text-xs text-blue-800 leading-relaxed font-medium"> Our plant tracks all production volume using a standard 24-pack as the baseline. Because of this, anytime we run a different package size, we have to do a little math to make sure our physical counts match the system. <br><br> For example, a <strong>35-pack</strong> has 11 more cans than a standard 24-pack. When you divide 35 by 24, you get a multiplier of <strong>1.458</strong>. This means every physical 35-pack we build actually counts as ~1.46 standard cases! <br><br> The same rule applies to smaller packs. An <strong>18-pack</strong> has 6 fewer cans than a 24-pack. Dividing 18 by 24 gives us <strong>0.75</strong>, meaning each physical 18-pack only counts as three-quarters of a standard case. Converting our boxes like this ensures our total can counts always line up perfectly at the end of the shift. </p> </div> </div>`;

  if (infoBadge && infoBadge.parentNode) {
      infoBadge.parentNode.insertBefore(tip, infoBadge.nextSibling);
  } else {
      const syrupTab = document.getElementById('content-syrup');
      if (syrupTab) syrupTab.appendChild(tip);
  }
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
        modal.className = "bg-white p-6 rounded-xl shadow-2xl max-w-sm w-full";
        modal.innerHTML = `
          <h2 class="text-2xl font-bold mb-4 text-gray-800">Admin Login</h2>
          <input type="email" id="modal-email" placeholder="Email" class="w-full mb-3 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <input type="password" id="modal-password" placeholder="Password" class="w-full mb-5 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500" />
          <div class="flex justify-end gap-3">
            <button id="modal-cancel" class="px-4 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition">Cancel</button>
            <button id="modal-submit" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition shadow-md">Login</button>
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
    document.querySelectorAll('.admin-tab').forEach(el => {
        el.classList.remove('active', 'text-red-700', 'border-b-2', 'border-red-700');
        el.classList.add('text-gray-500');
    });
    const activeTab = document.getElementById('admin-tab-' + tab);
    activeTab.classList.remove('text-gray-500');
    activeTab.classList.add('active', 'text-red-700', 'border-b-2', 'border-red-700');

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

    if(!name || !unitsPerPallet || !unitsPerCase) return alert("Fill all required fields!");
    const materialData = { name, number, unitsPerPallet, unitsPerCase, desc: desc || name, category, stdCaseFactor: stdFactor, unitName: "Pallets" };

    try {
        if (editingId) await updateDoc(doc(db, "materials", editingId), materialData);
        else await addDoc(collection(db, "materials"), materialData);
        resetAdminForm();
    } catch (e) { alert("Error saving material: " + e.message); }
}

async function saveProduct() {
    const name = document.getElementById('new-prod-name').value;
    const type = document.getElementById('new-prod-type').value;
    if(!name) return alert("Product name required!");

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
    } catch (e) { alert("Error saving product: " + e.message); }
}

async function saveQACode() {
    const name = document.getElementById('new-qa-name').value;
    const category = document.getElementById('new-qa-cat').value;
    const weeks = parseInt(document.getElementById('new-qa-weeks').value) || 0;
    if(!name || !weeks) return alert("Fill all required fields!");

    try {
        if (editingId) await updateDoc(doc(db, "qacodes", editingId), { name, category, weeks });
        else await addDoc(collection(db, "qacodes"), { name, category, weeks });
        resetAdminForm();
    } catch (e) { alert("Error saving QA code: " + e.message); }
}

function resetAdminForm() {
    document.querySelectorAll('.admin-form input').forEach(el => el.value = "");
    editingId = null;

    ['material', 'product', 'qacode'].forEach(type => {
        const btn = document.getElementById(`btn-save-${type}`);
        if(btn) {
            btn.innerText = `Save ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            btn.classList.replace('bg-yellow-600', 'bg-red-600');
            btn.classList.replace('hover:bg-yellow-700', 'hover:bg-red-700');
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

    if (currentAdminTab === 'materials') {
        dbObj = MATERIAL_DB; idObj = MATERIAL_IDS;
        displayFunc = (item) => `<strong class="text-gray-900">${item.number ? `[${item.number}] ` : ''}${item.name}</strong> <span class="text-xs text-gray-500 ml-1 whitespace-nowrap">(${item.unitsPerPallet}/plt)</span>`;
    } else if (currentAdminTab === 'products') {
        dbObj = PRODUCT_DB; idObj = PRODUCT_IDS;
        displayFunc = (item) => `<strong class="text-gray-900">${item.name}</strong> <span class="text-xs text-gray-500 ml-1 whitespace-nowrap">(${item.type.toUpperCase()})</span>`;
    } else if (currentAdminTab === 'qacodes') {
        dbObj = QA_CODE_DB; idObj = QA_CODE_IDS;
        displayFunc = (item) => `<strong class="text-gray-900">${item.name}</strong> <span class="text-xs text-gray-500 ml-1 whitespace-nowrap">(${item.weeks} wks, ${item.category})</span>`;
    }

    const items = Object.keys(idObj).sort(); 
    if (items.length === 0) return listContainer.innerHTML = '<div class="text-sm text-gray-500 italic p-2">No custom items in database yet. Try Migrating!</div>';

    items.forEach(name => {
        const item = dbObj[name];
        const docIds = idObj[name];
        if(!item || !docIds) return;

        const primaryId = docIds[0];

        const div = document.createElement('div');
        div.className = "flex justify-between items-start bg-white text-slate-800 p-2 mb-2 rounded border border-gray-200 text-sm w-full";
        div.innerHTML = `
            <div class="flex-1 min-w-0 pr-2">
                <div class="whitespace-normal break-words leading-snug">${displayFunc(item)}</div>
                ${docIds.length > 1 ? `<div class="text-xs text-red-600 font-bold mt-1 px-2 py-0.5 bg-red-100 rounded inline-block"><i class="fas fa-exclamation-triangle"></i> ${docIds.length} Copies Found (Delete to clear all)</div>` : ''}
            </div>
            <div class="flex gap-2 flex-shrink-0">
                <button class="text-blue-500 hover:text-blue-700 hover:bg-blue-50 p-1 rounded transition edit-btn" data-id="${primaryId}" data-name="${name.replace(/"/g, '&quot;')}"><i class="fas fa-edit"></i></button>
                <button class="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition delete-btn" data-ids='${JSON.stringify(docIds)}'><i class="fas fa-trash-alt"></i></button>
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
                let colName = currentAdminTab === 'products' ? 'products' : (currentAdminTab === 'qacodes' ? 'qacodes' : 'materials');
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
            saveBtn.classList.replace('bg-red-600', 'bg-yellow-600');
            saveBtn.classList.replace('hover:bg-red-700', 'hover:bg-yellow-700');

            if (!saveBtn.nextElementSibling?.classList.contains('cancel-edit-btn')) {
                const cancelBtn = document.createElement('button');
                cancelBtn.innerText = "Cancel";
                cancelBtn.className = "cancel-edit-btn mt-2 bg-gray-500 text-white px-4 py-2 rounded font-bold hover:bg-gray-600 w-full shadow-md transition";
                cancelBtn.addEventListener('click', resetAdminForm);
                saveBtn.parentNode.insertBefore(cancelBtn, saveBtn.nextSibling);
            }
        });
    });
}

// --- CORE APP LOGIC ---
document.addEventListener("DOMContentLoaded", init);

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
  
  document.querySelectorAll(".tab-pane").forEach(el => {
    el.classList.remove("active");
    setTimeout(() => {
        if(!el.classList.contains("active")) el.classList.add("hidden");
    }, 200); // Wait for fade out
  });
  
  document.querySelectorAll(".nav-tab").forEach(el => el.classList.remove("active"));
  
  setTimeout(() => {
      const target = document.getElementById("content-" + tab);
      target.classList.remove("hidden");
      // Small delay to allow display block to apply before opacity transition
      setTimeout(() => target.classList.add("active"), 10);
  }, 200);
  
  document.getElementById("tab-" + tab).classList.add("active");
  
  // Auto-focus first input of the new tab
  setTimeout(() => {
      if (tab === 'syrup') document.getElementById('syrup-product')?.focus();
      else if (tab === 'materials') document.getElementById('mat-select')?.focus();
      else if (tab === 'datecode') document.getElementById('datecode-product')?.focus();
  }, 250);
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

  calculateSyrup('cases'); 

  if (product.type === "bottle") {
    if (pltsInput) { pltsInput.disabled = true; pltsInput.parentElement.classList.add("opacity-50"); pltsInput.placeholder = "N/A"; }
    if(infoBadge) {
      infoBadge.innerText = `Type: Bottle | Conv Factor: ${product.factor}`; 
      infoBadge.className = "mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-black text-white";
    }
  } else {
    if (pltsInput) { pltsInput.disabled = false; pltsInput.parentElement.classList.remove("opacity-50"); pltsInput.placeholder = "0"; }
    if(infoBadge) {
      infoBadge.innerText = `Yield: ${currentSkuYields.casesPerGal.toFixed(2)} cs/gal | ${currentSkuYields.casesPerPlt.toFixed(2)} cs/plt`; 
      infoBadge.className = "mt-3 inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800";
    }
  }
}

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
    val = parseFloat(valStr) || 0;
  }

  let stdCases = 0;
  let gals = 0;
  let plts = 0;
  
  let act1 = source === 'actual-1' ? val : (parseFloat(actual1El?.value) || 0);
  let act2 = source === 'actual-2' ? val : (parseFloat(actual2El?.value) || 0);
  let act3 = source === 'actual-3' ? val : (parseFloat(actual3El?.value) || 0);

  const formatNum = (num) => (!num || isNaN(num) || !isFinite(num)) ? '' : (Number.isInteger(num) ? num.toString() : num.toFixed(2));

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
      
      // DO NOT AUTO-FILL BOX A ANYMORE. LEAVE THEM BLANK SO THE USER CAN CHOOSE.
      if (actual1El) actual1El.value = "";
      if (actual2El) actual2El.value = "";
      if (actual3El) actual3El.value = "";
  }
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
}

function updateMaterial() {
  const matSelect = document.getElementById("mat-select");
  if(!matSelect || !matSelect.value) return;

  const data = MATERIAL_DB[matSelect.value];
  const yieldEl = document.getElementById("mat-yield");
  const badge = document.getElementById("mat-info-badge");
  const unitLabel = document.getElementById("mat-unit-label");

  if(!data) {
     yieldEl.innerText = "-";
     badge.innerText = "Select a material...";
     badge.classList.remove("hidden");
     unitLabel.innerText = "Pallets/Rolls";
     calculateMaterial();
     return;
  }
  
  const yieldVal = data.unitsPerPallet / data.unitsPerCase;
  yieldEl.innerText = yieldVal.toLocaleString(undefined, { maximumFractionDigits: 2 }) + " Cases";
  
  const matNumberStr = data.number ? `[${data.number}] ` : "";
  badge.innerText = data.boxesPerPallet 
      ? `${matNumberStr}${data.desc} | Spec: ${data.boxesPerPallet} boxes × ${data.unitsPerBox} units = ${data.unitsPerPallet.toLocaleString()} total` 
      : `${matNumberStr}${data.desc} | Spec: ${data.unitsPerPallet.toLocaleString()} total units/pallet`;
  
  unitLabel.innerText = data.unitName || "Pallets";
  badge.classList.remove("hidden");
  
  calculateMaterial(); // Triggers math engine so target updates instantly on live DB changes
}

function calculateMaterial() {
  const matSelect = document.getElementById("mat-select");
  if(!matSelect || !matSelect.value) return;

  const data = MATERIAL_DB[matSelect.value];
  let targetStr = document.getElementById("mat-target").value.trim();
  let target = 0;

  if (targetStr.startsWith("=")) {
    try {
      target = new Function("return " + targetStr.substring(1).replace(/[^0-9+\-*/(). ]/g, ""))();
    } catch(e) {
      target = 0; 
    }
  } else {
    target = parseFloat(targetStr);
  }

  const neededEl = document.getElementById("mat-needed");
  if (data && !isNaN(target) && target > 0) {
      const finalVal = target / (data.unitsPerPallet / data.unitsPerCase);
      if(window.animateNumber) window.animateNumber(neededEl, finalVal);
      else neededEl.innerText = finalVal.toFixed(2);
  } else {
      if(window.animateNumber) window.animateNumber(neededEl, 0);
      else neededEl.innerText = "0.00";
  }
}

function clearMaterial() {
  document.getElementById("mat-target").value = ""; 
  const neededEl = document.getElementById("mat-needed");
  if(window.animateNumber) window.animateNumber(neededEl, 0);
  else neededEl.innerText = "0.00";
}

function handleMath(el, callback) {
  if (el.value.trim().startsWith("=")) {
    try {
      const result = new Function("return " + el.value.substring(1).replace(/[^0-9+\-*/(). ]/g, ""))();
      if (isFinite(result)) { el.value = Math.round(result * 100) / 100; if (callback) callback(); }
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
    
    if (animationStates.has(el.id)) {
        cancelAnimationFrame(animationStates.get(el.id));
    }
    
    let currentText = el.innerText.replace(/[^0-9.-]/g, '');
    let start = parseFloat(currentText);
    if(isNaN(start)) start = 0;
    
    if (start === end) {
        el.innerText = end.toFixed(2);
        return;
    }

    let startTime = null;
    const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 4); // easeOutQuart
        const current = start + (end - start) * easeProgress;
        
        el.innerText = current.toFixed(2);
        
        if (progress < 1) {
            animationStates.set(el.id, requestAnimationFrame(step));
        } else {
            animationStates.delete(el.id);
        }
    };
    animationStates.set(el.id, requestAnimationFrame(step));
};

// --- DARK MODE TOGGLE ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-toggle-icon');

function applyTheme(isDark) {
    if(isDark) {
        document.body.classList.add('dark-mode');
        if(themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
    } else {
        document.body.classList.remove('dark-mode');
        if(themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
    }
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = !document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
        applyTheme(isDark);
    });
    
    // Initial Load
    if(localStorage.getItem('darkMode') === 'enabled') {
        applyTheme(true);
    }
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    if (e.altKey && e.key === '1') { e.preventDefault(); switchTab('syrup'); }
    else if (e.altKey && e.key === '2') { e.preventDefault(); switchTab('materials'); }
    else if (e.altKey && e.key === '3') { e.preventDefault(); switchTab('datecode'); }
});