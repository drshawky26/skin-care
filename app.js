// =========================
// app.js (FULL – FIXED)
// =========================

// ===== Elements =====
const skinSelect  = document.getElementById("skinSelect");
const brandSelect = document.getElementById("brandSelect");
const categorySelect = document.getElementById("categorySelect");

const brandLabel  = document.getElementById("brandLabel");
const brandLogo   = document.getElementById("brandLogo");
const brandName   = document.getElementById("brandName");

const skinLabel   = document.getElementById("skinLabel");
const grid        = document.getElementById("grid");
const emptyState  = document.getElementById("emptyState");

const overlay     = document.getElementById("overlay");
const closePanel  = document.getElementById("closePanel");

const panelImg         = document.getElementById("panelImg");
const panelName        = document.getElementById("panelName");
const panelDesc        = document.getElementById("panelDesc");
const panelIngredients = document.getElementById("panelIngredients");
const panelBenefits    = document.getElementById("panelBenefits");
const panelUsage       = document.getElementById("panelUsage");

// ===== Helpers =====
function normalizeText(v) {
  return String(v ?? "").trim().toLowerCase();
}

// ===== Display Maps =====
const skinDisplay = {
  oily: "دهنيه",
  combination: "مختلطه",
  sensitive: "حساسة",
  dry: "جافه",
  allskin: "جميع أنواع البشرة"
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=60";

const brandDisplay = {
  vichy: "Vichy",
  "la roche posay": "La Roche-Posay",
  avene: "Avène",
  isispharma: "IsisPharma",
  bioderma: "Bioderma",
  eucerin: "Eucerin",
};

// ===== State =====
let allProducts = [];

// =========================
// Google Sheet Loader (OpenSheet)
// =========================
const SHEET_ID = "1sGAoP3LRFv9c59CSS3GVYqjhiUtoJ9c5W__29XQMVhc";
const SHEET_NAME = "Sheet1";
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`;

async function loadExcel() {
  const res = await fetch(SHEET_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("فشل تحميل Google Sheet");

  const rows = await res.json();

  allProducts = rows
    .map(r => {
      const skinTypes = normalizeText(r.skinType)
        .split(",")
        .map(s => s.trim())
        .filter(Boolean);

      return {
        id: String(r.id ?? "").trim(),
        skinTypes,                       // 👈 array
        brand: normalizeText(r.brand),
        category: normalizeText(r.category),

        name: String(r.name ?? "").trim(),
        description: String(r.description ?? "").trim(),
        ingredients: String(r.ingredients ?? "").trim(),
        benefits: String(r.benefits ?? "").trim(),
        usage: String(r.usage ?? "").trim(),
        image: String(r.image ?? "").trim(),
      };
    })
    .filter(p => p.skinTypes.length && p.brand && p.name);

  applyFilters();
}

// =========================
// UI Helpers
// =========================
function setSkinLabel(type) {
  if (!type) {
    skinLabel.classList.add("hidden");
    return;
  }
  skinLabel.classList.remove("hidden");
  skinLabel.textContent = `نوع البشرة: ${skinDisplay[type] ?? type}`;
}

function setBrandLabel(brand) {
  if (!brand) {
    brandLabel.classList.add("hidden");
    return;
  }
  brandLabel.classList.remove("hidden");
  brandName.textContent = `الشركة: ${brandDisplay[brand] ?? brand}`;
}

function showEmpty(msg) {
  grid.innerHTML = "";
  emptyState.textContent = msg;
  emptyState.classList.remove("hidden");
}

function hideEmpty() {
  emptyState.classList.add("hidden");
}

// =========================
// Filters
// =========================
function applyFilters() {
  const skin = normalizeText(skinSelect.value);   // إجباري
  const brand = normalizeText(brandSelect.value); // اختياري
  const category = normalizeText(categorySelect.value); // اختياري

  setSkinLabel(skin);
  setBrandLabel(brand);

  if (!skin) {
    showEmpty("اختار نوع البشرة علشان تظهر المنتجات");
    return;
  }

  renderProducts(skin, brand, category);
}

// =========================
// Render Products
// =========================
function renderProducts(skin, brand, category) {
  grid.innerHTML = "";

  const filtered = allProducts.filter(p => {
    // دعم allskin
    const okSkin =
      p.skinTypes.includes("allskin") ||
      p.skinTypes.includes(skin);

    if (!okSkin) return false;

    if (brand && p.brand !== brand) return false;
    if (category && p.category !== category) return false;

    return true;
  });

  if (!filtered.length) {
    showEmpty("مفيش منتجات مطابقة للاختيارات دي");
    return;
  }

  hideEmpty();

  filtered.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = p.image || PLACEHOLDER;

    const name = document.createElement("h3");
    name.textContent = p.name;

    card.append(img, name);
    card.onclick = () => openPanel(p);

    grid.appendChild(card);
  });
}

// =========================
// Panel
// =========================
function openPanel(p) {
  panelImg.src = p.image || PLACEHOLDER;
  panelName.textContent = p.name;
  panelDesc.textContent = p.description;
  panelIngredients.textContent = p.ingredients;
  panelBenefits.textContent = p.benefits;
  panelUsage.textContent = p.usage;

  overlay.classList.remove("hidden");
}

closePanel.onclick = () => overlay.classList.add("hidden");

// =========================
// Events
// =========================
skinSelect.onchange = applyFilters;
brandSelect.onchange = applyFilters;
categorySelect.onchange = applyFilters;

// =========================
// Start
// =========================
loadExcel().catch(err => {
  console.error(err);
  showEmpty(err.message);
});
