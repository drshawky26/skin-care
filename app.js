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
// =========================
// Category options control
// =========================
const ALL_CAT_OPTIONS = Array.from(categorySelect.options).map(opt => ({
  value: opt.value,
  text: opt.textContent,
  disabled: opt.disabled,
  selected: opt.selected
}));


const categoryDisplay = {
  "cleanser": "غسول",
  "moisturizer": "مرطب",
  "toner": "تونر",
  "sunscreen": "صن سكرين",
  "wrinkles": "تجاعيد",
  "brightening": "تفتيح",
  "micellar water": "مياه ميسيلار",
  "lip balm": "مرطب شفاه",
  "black heads": "للرؤوس السوداء",
  "healing":"Healing ترميم حاجز البشره",
  "acne":" حب الشباب ",
  "finelines":"الخطوط الدقيقه",
  "all hair": "جميع أنواع الشعر",
  "dry hair": "الشعر الجاف",
  "normal hair": "الشعر العادي",
  "oily hair": "الشعر الدهني",
  "volume hair": "كثافة الشعر",
  "hair loss": "تساقط الشعر",
  "exfoliating":"غسول مقشر",
};



function rebuildCategoryOptions(allowedValues) {
  categorySelect.innerHTML = "";

  // ✅ جميع المنتجات (ترجع كل حاجة)
  const allOpt = document.createElement("option");
  allOpt.value = "";
  allOpt.textContent = "جميع المنتجات";
  categorySelect.appendChild(allOpt);

  for (const v of allowedValues) {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = categoryDisplay[v] ?? v;
    categorySelect.appendChild(opt);
  }

  // افتراضيًا خليها على جميع المنتجات
  categorySelect.value = "";
}


function updateCategoryOptionsBySkin(skin) {
  skin = normalizeText(skin);

  // Eye: wrinkles + moisturizer + brightening فقط
  if (skin === "eye") {
    rebuildCategoryOptions(["wrinkles", "moisturizer", "brightening"], "— اختر (كريم العين) —");
    return;
  }

  // Hair: كل اختيارات الشعر فقط
  if (skin === "hair") {
    // أي option قيمته فيها "hair" نعتبره للشعر
    const hairValues = ALL_CAT_OPTIONS
      .map(o => normalizeText(o.value))
      .filter(v => v && v.includes("hair"));

    rebuildCategoryOptions(hairValues, "— اختر (الشعر) —");
    return;
  }

  // باقي أنواع البشرة: كل اختيارات البشرة (بدون الشعر)
  const skinValues = ALL_CAT_OPTIONS
    .map(o => normalizeText(o.value))
    .filter(v => v && !v.includes("hair"));

  rebuildCategoryOptions(skinValues, "— اختر —");
}

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
  facebody:"للبشره والوجه",
  eye:"للعين",
  cica:"بشره متضرره",
};

const labelClass = {
  oily: "label-oily",
  normal: "label-normal",
  combination: "label-combination",
  sensitive: "label-sensitive",
  dry: "label-dry",
  allskin: "label-allskin",
  facebody:"label-facebody",
  eye:"label-eye",
  cica:"label-cica"
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
  let ok = false;

  // category في الشيت ممكن تكون multi: "black heads,acne"
  const cats = normalizeText(p.category)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  // ===== Hair mode =====
  if (skin === "hair") {
    if (!p.skinTypes.includes("hair")) return false;

    if (!category) {
      ok = true;
    } else {
      ok = cats.includes(category);
    }

    if (p.skinTypes.includes("allskin")) ok = false;

  } else {
    // ===== Skin mode =====
    ok =
      p.skinTypes.includes("allskin") ||
      p.skinTypes.includes(skin);

    if (!ok) return false;

    // ✅ فلترة category multi (اختياري)
    if (category) {
      if (!cats.includes(category)) return false;
    }
  }

  if (brand && p.brand !== brand) return false;

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
    img.alt = p.name;

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
skinSelect.onchange = () => {
  updateCategoryOptionsBySkin(skinSelect.value);
  applyFilters();
};
brandSelect.onchange = applyFilters;
categorySelect.onchange = applyFilters;

// =========================
// Start
// =========================
loadExcel().catch(err => {
  console.error(err);
  showEmpty(err.message);
  updateCategoryOptionsBySkin(skinSelect.value);

});

(() => {
  const canvas = document.getElementById("bubblesCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  const DPR = Math.min(2, window.devicePixelRatio || 1);

  let W = 0, H = 0;
  let bubbles = [];
  let lastT = performance.now();

  // تفاعل: نقطة جذب للماوس/اللمس + “wave” خفيف
  const pointer = { x: 0, y: 0, vx: 0, vy: 0, active: false };
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function resize() {
    W = Math.floor(canvas.clientWidth);
    H = Math.floor(canvas.clientHeight);
    canvas.width  = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const targetCount = Math.max(18, Math.min(70, Math.floor((W * H) / 22000)));
    if (!bubbles.length) {
      bubbles = makeBubbles(targetCount);
    } else if (bubbles.length < targetCount) {
      bubbles.push(...makeBubbles(targetCount - bubbles.length));
    } else if (bubbles.length > targetCount) {
      bubbles.length = targetCount;
    }
  }

  function rand(min, max){ return Math.random() * (max - min) + min; }

  // ألوان لطيفة للبشرة/الشعر (روز/مينت/لافندر) + لمعة
  const palette = [
    { core: [255, 188, 220], glow: [255, 214, 234] }, // rose
    { core: [175, 255, 238], glow: [195, 255, 245] }, // mint
    { core: [206, 184, 255], glow: [226, 214, 255] }, // lavender
    { core: [255, 232, 190], glow: [255, 244, 220] }, // honey
  ];

  function makeBubbles(n){
    const arr = [];
    for (let i = 0; i < n; i++){
      const p = palette[Math.floor(Math.random() * palette.length)];
      const r = rand(8, 36) * (W < 520 ? 0.95 : 1);
      arr.push({
        x: rand(0, W),
        y: rand(0, H),
        r,
        // سرعة بطيئة + اختلافات صغيرة
        vx: rand(-0.22, 0.22),
        vy: rand(-0.28, 0.18),
        // "float" و "wobble"
        wob: rand(0.6, 1.6),
        ph: rand(0, Math.PI * 2),
        // شفافية ولمعة
        a: rand(0.10, 0.22),
        shine: rand(0.10, 0.22),
        // لون
        core: p.core,
        glow: p.glow,
        // depth يعطي parallax بسيط
        z: rand(0.4, 1.2)
      });
    }
    return arr;
  }

  function onPointerMove(e){
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);
    pointer.vx = x - pointer.x;
    pointer.vy = y - pointer.y;
    pointer.x = x; pointer.y = y;
    pointer.active = true;
  }

  function onTouchMove(e){
    if (!e.touches || !e.touches[0]) return;
    onPointerMove(e.touches[0]);
  }

  window.addEventListener("mousemove", onPointerMove, { passive: true });
  window.addEventListener("touchstart", onTouchMove, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("mouseleave", () => pointer.active = false, { passive: true });

  // رسم بابل واحدة
  function drawBubble(b){
    // glow
    const grd = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2.2);
    grd.addColorStop(0, `rgba(${b.glow[0]},${b.glow[1]},${b.glow[2]},${b.a})`);
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // body
    const body = ctx.createRadialGradient(
      b.x - b.r * 0.25, b.y - b.r * 0.35, b.r * 0.2,
      b.x, b.y, b.r
    );
    body.addColorStop(0, `rgba(255,255,255,${b.shine})`);
    body.addColorStop(0.25, `rgba(${b.core[0]},${b.core[1]},${b.core[2]},${b.a + 0.08})`);
    body.addColorStop(1, `rgba(${b.core[0]},${b.core[1]},${b.core[2]},${b.a})`);

    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();

    // highlight rim
    ctx.strokeStyle = `rgba(255,255,255,${Math.min(0.22, b.a + 0.08)})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.12, b.y - b.r * 0.10, b.r * 0.9, -0.4, Math.PI * 1.15);
    ctx.stroke();

    // specular dot
    ctx.fillStyle = `rgba(255,255,255,${Math.min(0.25, b.shine + 0.05)})`;
    ctx.beginPath();
    ctx.arc(b.x - b.r * 0.35, b.y - b.r * 0.35, Math.max(1.6, b.r * 0.10), 0, Math.PI * 2);
    ctx.fill();
  }

  function step(t){
    const dt = Math.min(32, t - lastT) / 16.666; // normalize ~60fps
    lastT = t;

    ctx.clearRect(0, 0, W, H);

    if (prefersReduced) {
      // رسم ثابت لطيف بدون حركة
      for (const b of bubbles) drawBubble(b);
      requestAnimationFrame(step);
      return;
    }

    // تأثير جذب/repel خفيف جدًا حسب قرب المؤشر
    const px = pointer.x, py = pointer.y;
    const hasPointer = pointer.active;

    for (const b of bubbles){
      // wobble
      b.ph += 0.01 * b.wob * dt;
      const wobX = Math.sin(b.ph) * 0.15 * b.z;
      const wobY = Math.cos(b.ph * 0.9) * 0.18 * b.z;

      // base motion
      b.x += (b.vx + wobX) * dt * (0.6 + b.z);
      b.y += (b.vy + wobY) * dt * (0.6 + b.z);

      if (hasPointer){
        const dx = b.x - px;
        const dy = b.y - py;
        const dist2 = dx*dx + dy*dy;
        const range = Math.max(120, Math.min(260, (b.r * 7)));
        const range2 = range * range;

        if (dist2 < range2){
          const dist = Math.sqrt(dist2) || 1;
          // push away + swirl بسيط لإحساس “interactive”
          const force = (1 - dist / range) * 0.9 * b.z;
          const nx = dx / dist;
          const ny = dy / dist;

          // repel
          b.x += nx * force * 2.2 * dt;
          b.y += ny * force * 2.2 * dt;

          // swirl based on pointer velocity
          const sv = (pointer.vx * 0.002 + pointer.vy * 0.002);
          b.x += -ny * force * 18 * sv;
          b.y +=  nx * force * 18 * sv;
        }
      }

      // wrap around edges with padding
      const pad = b.r * 2.5;
      if (b.x < -pad) b.x = W + pad;
      else if (b.x > W + pad) b.x = -pad;
      if (b.y < -pad) b.y = H + pad;
      else if (b.y > H + pad) b.y = -pad;

      drawBubble(b);
    }

    requestAnimationFrame(step);
  }

  // init
  const ro = new ResizeObserver(resize);
  ro.observe(document.querySelector(".bg-bubbles"));

  resize();
  requestAnimationFrame(step);
})();

