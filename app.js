// =========================
// app.js (FULL – FINAL WORKING)
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
const panel       = document.getElementById("panel");
const closePanel  = document.getElementById("closePanel");

const panelImg         = document.getElementById("panelImg");
const panelName        = document.getElementById("panelName");
const panelDesc        = document.getElementById("panelDesc");
const panelIngredients = document.getElementById("panelIngredients");
const panelBenefits    = document.getElementById("panelBenefits");
const panelUsage       = document.getElementById("panelUsage");

// Zoom elements
const hoverPreview = document.getElementById("hoverPreview");
const hoverPreviewLens = document.getElementById("hoverPreviewLens");

// ===== Helpers =====
function normalizeText(v) {
  return String(v ?? "").trim().toLowerCase();
}

// ===== Display Maps =====
const skinDisplay = {
  oily: "دهنيه",
  normal: "عاديه",
  combination: "مختلطه",
  sensitive: "حساسة",
  dry: "جافه",
  allskin: "جميع أنواع البشرة",
};

const labelClass = {
  oily: "label-oily",
  normal: "label-normal",
  combination: "label-combination",
  sensitive: "label-sensitive",
  dry: "label-dry",
  allskin: "label-allskin",
};

const brandDisplay = {
  vichy: "Vichy",
  "la roche posay": "La Roche-Posay",
  avene: "Avène",
  isispharma: "IsisPharma",
  bioderma: "Bioderma",
  eucerin: "Eucerin",
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=60";

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
        skinTypes,
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
  skinLabel.classList.remove("hidden", ...Object.values(labelClass));
  if (!type) {
    skinLabel.classList.add("hidden");
    return;
  }
  skinLabel.textContent = `نوع البشرة: ${skinDisplay[type] ?? type}`;
  if (labelClass[type]) skinLabel.classList.add(labelClass[type]);
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
  const skin = normalizeText(skinSelect.value);
  const brand = normalizeText(brandSelect.value);
  const category = normalizeText(categorySelect.value);

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
  panelName.textContent = p.name || "—";
  panelDesc.textContent = p.description || "—";
  panelIngredients.textContent = p.ingredients || "—";
  panelBenefits.textContent = p.benefits || "—";
  panelUsage.textContent = p.usage || "—";

  overlay.classList.remove("hidden");
}
closePanel.onclick = () => overlay.classList.add("hidden");

// =========================
// Zoom
// =========================
const MAG_ZOOM = 4;

function setLensImage(src) {
  hoverPreviewLens.style.backgroundImage = `url("${src}")`;
  hoverPreviewLens.style.backgroundSize = `${MAG_ZOOM * 100}% ${MAG_ZOOM * 100}%`;
}
function updateMagnifier(e) {
  const rect = panelImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  hoverPreviewLens.style.backgroundPosition =
    `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;
}
panelImg.onmouseenter = e => {
  setLensImage(panelImg.src);
  hoverPreview.style.display = "block";
  updateMagnifier(e);
};
panelImg.onmousemove = updateMagnifier;
panelImg.onmouseleave = () => hoverPreview.style.display = "none";

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
