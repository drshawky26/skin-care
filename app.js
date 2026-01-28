// =========================
// app.js (FULL)
// =========================

// ===== Elements =====
const skinSelect  = document.getElementById("skinSelect");
const brandSelect = document.getElementById("brandSelect");
const brandLabel  = document.getElementById("brandLabel");
const brandLogo   = document.getElementById("brandLogo");
const brandName   = document.getElementById("brandName");
const categorySelect = document.getElementById("categorySelect");

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

// Magnifier elements (لازم تبقى موجودة في HTML)
const hoverPreview = document.getElementById("hoverPreview");
const hoverPreviewLens = document.getElementById("hoverPreviewLens");

// ===== Display Maps =====
const skinDisplay = {
  oily: "دهنيه",
  combination: "مختلطه",
  sensitive: "حساسة",
  dry: "جافه",
  allskin:"جميع أنواع البشره"
};

const labelClass = {
  oily: "label-oily",
  combination: "label-combination",
  sensitive: "label-sensitive",
  dry: "label-dry",
  allskin:"label-allskin"
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=60";

let allProducts = [];

const brandDisplay = {
  "vichy": "Vichy",
  "la roche posay": "La Roche-Posay",
  "avene": "Avène",
  "isispharma": "IsisPharma",
  "bioderma": "Bioderma",
  "eucerin": "Eucerin",
};

// صور لوجوه (ممكن تغيرها براحتك)
const brandLogos = {
  "vichy": "https://logo-marque.com/wp-content/uploads/2021/01/Vichy-Symbole.jpg",
  "la roche posay": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/La_Roche-Posay_logo.svg/512px-La_Roche-Posay_logo.svg.png",
  "avene": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Av%C3%A8ne_logo.svg/512px-Av%C3%A8ne_logo.svg.png",
  "isispharma": "https://www.isispharma.com/wp-content/uploads/2021/11/logo-isispharma.svg",
  "bioderma": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Bioderma_logo.svg/512px-Bioderma_logo.svg.png",
  "eucerin": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Eucerin_Logo.svg/512px-Eucerin_Logo.svg.png",
};

// ===== Helpers =====
function normalizeText(v) {
  return String(v ?? "").trim().toLowerCase();
}

function setLabel(type) {
  skinLabel.classList.remove("hidden", ...Object.values(labelClass));

  if (!type) {
    skinLabel.classList.add("hidden");
    return;
  }

  skinLabel.textContent = `نوع البشرة: ${skinDisplay[type] ?? type}`;
  const cls = labelClass[type];
  if (cls) skinLabel.classList.add(cls);
}

function setBrandLabel(brand) {
  if (!brand) {
    brandLabel.classList.add("hidden");
    return;
  }

  brandLabel.classList.remove("hidden");
  brandName.textContent = `الشركة: ${brandDisplay[brand] ?? brand}`;

  brandLogo.src = brandLogos[brand] || PLACEHOLDER;
  brandLogo.alt = brandDisplay[brand] ?? brand;
}

function showEmpty(message) {
  grid.innerHTML = "";
  emptyState.textContent = message;
  emptyState.classList.remove("hidden");
}

function hideEmpty() {
  emptyState.classList.add("hidden");
}

// =========================
// Magnifier (Lens Preview)
// =========================
const MAG_ZOOM = 4; // 3=300% (زودها 4 لو عايز قراءة أوضح)

function positionPreviewNextToPanel() {
  if (!panel || !hoverPreview) return;

  const rect = panel.getBoundingClientRect();
  const gap = 12;

  const previewW = 520;
  const previewH = 420;

  // في RTL: المفضل يكون يمين البانل
  let left = rect.right + gap;
  let top = rect.top;

  // لو مفيش مساحة يمين، خليه شمال
  if (left + previewW > window.innerWidth - 10) {
    left = rect.left - gap - previewW;
  }

  // ظبط top لو نازل تحت الشاشة
  if (top + previewH > window.innerHeight - 10) {
    top = Math.max(10, window.innerHeight - 10 - previewH);
  }
  if (top < 10) top = 10;

  hoverPreview.style.left = `${left}px`;
  hoverPreview.style.top = `${top}px`;
}

function setLensImage(src) {
  if (!hoverPreviewLens) return;
  hoverPreviewLens.style.backgroundImage = `url("${src || PLACEHOLDER}")`;
  hoverPreviewLens.style.backgroundSize = `${MAG_ZOOM * 100}% ${MAG_ZOOM * 100}%`;
}

function showHoverPreview() {
  if (!hoverPreview) return;
  positionPreviewNextToPanel();
  hoverPreview.style.display = "block";
  hoverPreview.setAttribute("aria-hidden", "false");
}

function hideHoverPreview() {
  if (!hoverPreview) return;
  hoverPreview.style.display = "none";
  hoverPreview.setAttribute("aria-hidden", "true");
}

/**
 * تحريك الزوم حسب مكان الماوس فوق صورة البانل
 */
function updateMagnifier(e) {
  if (!hoverPreviewLens) return;

  const rect = panelImg.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  let px = (x / rect.width) * 100;
  let py = (y / rect.height) * 100;

  px = Math.max(0, Math.min(100, px));
  py = Math.max(0, Math.min(100, py));

  hoverPreviewLens.style.backgroundPosition = `${px}% ${py}%`;
}



// =========================
// Google Sheet Loader (OpenSheet JSON)
// =========================
const SHEET_ID = "1sGAoP3LRFv9c59CSS3GVYqjhiUtoJ9c5W__29XQMVhc";
const SHEET_NAME = "Sheet1"; // <-- غيّرها لاسم التاب الحقيقي
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(SHEET_NAME)}`;

async function loadExcel() {
  const res = await fetch(SHEET_URL, { cache: "no-store" });
  if (!res.ok) throw new Error(`مش قادر أقرأ Google Sheet. ${res.status} ${res.statusText}`);

  const rows = await res.json();

  allProducts = rows
    .map((r) => ({
      id: String(r.id ?? "").trim(),
      skinType: normalizeText(r.skinType),
      brand: normalizeText(r.brand),
      category: normalizeText(r.category),

      name: String(r.name ?? "").trim(),
      description: String(r.description ?? "").trim(),
      ingredients: String(r.ingredients ?? "").trim(),
      benefits: String(r.benefits ?? "").trim(),
      usage: String(r.usage ?? "").trim(),
      image: String(r.image ?? "").trim(),
    }))
    .filter((p) => p.skinType && p.brand && p.name);

  applyFilters();
}

// =========================
// Render Grid
// =========================
function renderProducts(type, brand, category) {
  grid.innerHTML = "";

  const filtered = allProducts.filter(p => {
    if (p.skinType !== type) return false;

    // لو مفيش اختيار شركة => كل الشركات
    if (brand && p.brand !== brand) return false;

    // لو مفيش اختيار نوع منتج => كل الأنواع
    if (category && p.category !== category) return false;

    return true;
  });

  if (filtered.length === 0) {
    showEmpty("مفيش منتجات مطابقة للاختيارات دي (راجع الشيت).");
    return;
  }

  hideEmpty();

  for (const p of filtered) {
    const card = document.createElement("div");
    card.className = "card";
    card.tabIndex = 0;

    const img = document.createElement("img");
    img.src = p.image || PLACEHOLDER;
    img.alt = p.name;

    const wrap = document.createElement("div");
    wrap.className = "p";

    const name = document.createElement("h3");
    name.className = "name";
    name.textContent = p.name;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = p.description || "—";

    wrap.appendChild(name);
    wrap.appendChild(desc);

    card.appendChild(img);
    card.appendChild(wrap);

    card.addEventListener("click", () => openPanel(p));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") openPanel(p);
    });

    grid.appendChild(card);
  }
}

// =========================
// Modal / Panel
// =========================
function openPanel(p) {
  const src = p.image || PLACEHOLDER;

  panelImg.src = src;
  panelImg.alt = p.name;

  // جهّز العدسة للصورة دي
  setLensImage(src);
  hideHoverPreview();

  panelName.textContent = p.name || "—";
  panelDesc.textContent = p.description || "—";
  panelIngredients.textContent = p.ingredients || "—";
  panelBenefits.textContent = p.benefits || "—";
  panelUsage.textContent = p.usage || "—";

  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");
}

function closeOverlay() {
  hideHoverPreview();
  overlay.classList.add("hidden");
  overlay.setAttribute("aria-hidden", "true");
}

// =========================
// Filters
// =========================
function applyFilters() {
  const type = normalizeText(skinSelect.value);            // إجباري
  const brand = normalizeText(brandSelect.value);          // اختياري
  const category = normalizeText(categorySelect.value);    // اختياري

  setLabel(type);

  // ليبل الشركة يظهر فقط لو مختار شركة
  setBrandLabel(brand);

  if (!type) {
    showEmpty("اختار نوع البشرة علشان تظهر المنتجات");
    return;
  }

  renderProducts(type, brand, category);
}


// =========================
// Events
// =========================
skinSelect.addEventListener("change", applyFilters);
brandSelect.addEventListener("change", applyFilters);
categorySelect.addEventListener("change", applyFilters);

closePanel.addEventListener("click", closeOverlay);

overlay.addEventListener("click", (e) => {
  if (e.target === overlay) closeOverlay();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !overlay.classList.contains("hidden")) closeOverlay();
});

// Magnifier events على صورة البانل
panelImg.addEventListener("mouseenter", (e) => {
  setLensImage(panelImg.src);
  showHoverPreview();
  updateMagnifier(e);
});

panelImg.addEventListener("mousemove", (e) => {
  if (hoverPreview && hoverPreview.style.display === "block") {
    updateMagnifier(e);
  }
});

panelImg.addEventListener("mouseleave", () => {
  hideHoverPreview();
});

// لو حصل scroll/resize والـ preview مفتوح، ظبط مكانه
window.addEventListener("resize", () => {
  if (hoverPreview && hoverPreview.style.display === "block") positionPreviewNextToPanel();
});

window.addEventListener("scroll", () => {
  if (hoverPreview && hoverPreview.style.display === "block") positionPreviewNextToPanel();
}, { passive: true });

// =========================
// Start
// =========================
loadExcel().catch((err) => {
  console.error(err);
  showEmpty(err.message || "حصل خطأ أثناء تحميل البيانات.");
});

