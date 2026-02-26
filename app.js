// =========================
// app.js (FULL – FINAL + SEARCH ADDON)
// =========================
// ✅ Panel labels
const panelSkinLabel   = document.getElementById("panelSkinLabel");

const panelBrandLabel  = document.getElementById("panelBrandLabel");
const panelBrandLogo   = document.getElementById("panelBrandLogo");
const panelBrandName   = document.getElementById("panelBrandName");

const panelProductLabel = document.getElementById("panelProductLabel");
const panelProductIcon  = document.getElementById("panelProductIcon");
const panelProductName  = document.getElementById("panelProductName");

// ===== Elements =====
const skinSelect  = document.getElementById("skinSelect");
const brandSelect = document.getElementById("brandSelect");
const categorySelect = document.getElementById("categorySelect");
const panelNightBadge = document.getElementById("panelNightBadge");

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
const searchHeader = document.getElementById("searchHeader");
const panelPregnancyWrap = document.getElementById("panelPregnancyWrap");
const panelPregnancyIcon = document.getElementById("panelPregnancyIcon");
// =========================
// ✅ Search Elements (ADDON)
// =========================
const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");


const PREGNANCY_ICON_URL = "pregnancy.png";
const PREGNANCY_TIP_TEXT = "لا يُستخدم أثناء فترة الحمل";


// ##########################################################################
const INGREDIENT_DICTIONARY = [
  {
    key: "niacinamide",
    aliases: ["niacinamide","vitamin b3","ب3","نياسيناميد"],
    icon: "⭐",
    tip: "يساعد على تقليل مظهر المسام وتوحيد اللون وتهدئة الاحمرار، ويدعم حاجز البشرة.",
  },
  {
    key: "caffeine",
    aliases: ["caffeine","كافيين"],
    icon: "⚡",
    tip: "قد يساعد في تقليل الانتفاخات مؤقتًا خصوصًا بمنطقة العين وتحسين مظهر الإرهاق.",
  },
  {
    key: "hyaluronic acid",
    aliases: ["hyaluronic acid","sodium hyaluronate","هيالورونيك","هيالورونيك اسيد"],
    icon: "💧",
    tip: "مرطب جاذب للماء؛ يدعم الترطيب والامتلاء ويقلل الإحساس بالجفاف.",
  },
  {
    key: "ceramides",
    aliases: ["ceramide","ceramides","سيراميد","سيراميدات"],
    icon: "🛡️",
    tip: "دهون داعمة لحاجز البشرة؛ تقلل فقدان الماء وتحسن التحمل للجفاف والتهيج.",
  },
  {
    key: "salicylic acid",
    aliases: ["salicylic acid","bha","ساليسيليك","ساليسيليك اسيد"],
    icon: "✨",
    tip: "مقشر لطيف داخل المسام؛ قد يساعد في الرؤوس السوداء والحبوب للبشرة الدهنية (حسب التحمل).",
  },
  {
    key: "retinol",
    aliases: ["retinol","retinal","retinaldehyde","ريتينول","ريتينال","Retinyl Palmitate"],
    icon: "🌙",
    tip: "يساعد على تحسين مظهر الخطوط والملمس على المدى الطويل؛ يُفضّل استخدامه ليلًا مع واقي شمس نهارًا.",
  },

  // ✅ Mineral water / مياه حرارية
  {
    key: "thermal water",
    aliases: ["thermal water","spring water","eau thermale","مياه حرارية","مياه معدنية"],
    icon: "💠",
    tip: "مياه حرارية/معدنية قد تساعد على تهدئة البشرة ودعم الشعور بالراحة.",
  },

  // ✅ براءات/تكنولوجيا (كلمات عامة)
  {
    key: "patent",
    aliases: ["patented","patent","technology","complex","براءة","براءات","تكنولوجيا","تقنية","حاصلة على براءة"],
    icon: "🏅",
    tip: "يشير إلى مركّب/تكنولوجيا مملوكة للشركة (براءة/تقنية) بهدف تحسين الأداء أو الثبات.",
    
  },
  // ☀️ فلاتر شمسية (UV Filters)

{
  key: "butyl methoxydibenzoylmethane",
  aliases: [
    "butyl methoxydibenzoylmethane"
    
  ],
  icon: "☀️",
  tip: "فلتر يحمي من أشعة UVA (المسببة للتصبغات والشيخوخة).",
},

{
  key: "octocrylene",
  aliases: ["octocrylene"],
  icon: "☀️",
  tip: "يحمي من UVB ويساعد على تثبيت Avobenzone.",
},

{
  key: "ethylhexyl triazone",
  aliases: ["ethylhexyl triazone"],
  icon: "☀️",
  tip: "فلتر قوي جدًا للحماية من UVB.",
},

{
  key: "tinosorb m",
  aliases: [
    "methylene bis-benzotriazolyl tetramethylbutylphenol",
    "tinosorb m"
  ],
  icon: "☀️",
  tip: "فلتر واسع المدى يحمي من UVA و UVB.",
},

{
  key: "mexoryl xl",
  aliases: [
    "drometrizole trisiloxane",
    "mexoryl xl"
  ],
  icon: "☀️",
  tip: "يوفر حماية قوية من UVB وبعض UVA.",
},

{
  key: "mexoryl sx",
  aliases: [
    "terephthalylidene dicamphor sulfonic acid",
    "mexoryl sx"
  ],
  icon: "☀️",
  tip: "فلتر يحمي من UVA و UVB.",
},

{
  key: "titanium dioxide",
  aliases: [
    "titanium dioxide",
    "ci 77891"
  ],
  icon: "🛡️",
  tip: "فلتر معدني يعكس الأشعة ويوفر حماية إضافية.",
},

{
  key: "probiotic-derived bifidus",
  aliases: [
    "probiotic-derived bifidus",
    "bifidus",
    "bifida ferment lysate",
    "بيفيدوس",
    "بروبيوتك بيفيدوس",
    "probiotic"
    
  ],
  icon: "🦠",
  tip: "مكوّن مشتق من البروبيوتك يساعد على تقوية حاجز البشرة، تقليل الحساسية، ودعم توازن الميكروبيوم."
},

{
  key: "vitamin c",
  aliases: [
    "vitamin c",
    "vit c",
    "ascorbic acid",
    "l-ascorbic acid",
    "sodium ascorbyl phosphate",
    "magnesium ascorbyl phosphate",
    "فيتامين c",
    "فيتامين سي"
  ],
  icon: "🍊",
  tip: "مضاد أكسدة قوي يساعد على تفتيح البشرة، توحيد اللون، تقليل التصبغات، ودعم إنتاج الكولاجين."
},


{
  key: "vitamin b3",
  aliases: [
    "vitamin b3",
    "vit b3",
    "b3",
    "فيتامين ب3"
  ],
  icon: "⭐",
  tip: "فيتامين ب3 (نياسيناميد): يساعد على تقليل المسام، توحيد اللون، تقليل الاحمرار، ودعم حاجز البشرة."
},

{
  key: "zinc pca",
  aliases: [
    "zinc pca",
    "zinc",
    "زنك pca",
    "زنك",
    "Zinc Gluconate"

  ],
  icon: "🧴",
  tip: "يساعد على تنظيم إفراز الدهون، تقليل الحبوب، تهدئة الالتهابات، ودعم توازن البشرة الدهنية والمختلطة."
},

{
  key: "sodium laureth sulfate",
  aliases: [
    "sodium laureth sulfate",
    // "sles",
    // "laureth sulfate",
    // "سوديوم لوريث سلفات"
  ],
  icon: "🧼",
  tip: "مادة منظفة رغوية تساعد على إزالة الدهون والشوائب بفعالية، لكنها قد تكون مهيِّجة للبشرة الحساسة عند الاستخدام المتكرر."
},

{
  key: "coco-betaine",
  aliases: [
    "coco-betaine",
    "cocamidopropyl betaine",
    "betaine",
    "كوكو بيتايين"
  ],
  icon: "🧼",
  tip: "مادة منظفة لطيفة مشتقة من جوز الهند، تساعد على تكوين رغوة خفيفة وتنظيف البشرة بلطف مع تقليل التهيج."
},

{
  key: "peptide",
  aliases: [
    "peptide",
    "peptides",
    "matrixyl",
    "copper peptide",
    "ببتيد",
    "بيبتيد"
  ],
  icon: "🧬",
  tip: "الببتيدات تساعد على تحفيز إنتاج الكولاجين، تحسين مرونة البشرة، تقليل الخطوط الدقيقة، ودعم إصلاح وتجديد الجلد."
},

{
  key: "vichy mineralizing water",
  aliases: [
    "vichy mineralizing water",
    "vichy thermal water",
    "vichy water",
    "مياه فيشي الحرارية",
    "مياه فيشي المعدنية"
  ],
  icon: "💧",
  tip: "مياه حرارية غنية بالمعادن تساعد على تهدئة البشرة، تقوية الحاجز الواقي، تقليل الاحمرار، ودعم توازن البشرة الحساسة."
},

{
  key: "shea butter",
  aliases: [
    "shea butter",
    "butyrospermum parkii",
    "زبدة الشيا"
  ],
  icon: "🥥",
  tip: "مرطب عميق غني بالأحماض الدهنية والفيتامينات، يساعد على تغذية البشرة، تقليل الجفاف، تهدئة التهيج، ودعم حاجز البشرة."
},

{
  key: "vitamin b5",
  aliases: [
    "vitamin b5",
    "panthenol",
    "provitamin b5",
    "فيتامين ب5",
    "بانثينول"
  ],
  icon: "💊",
  tip: "فيتامين ب5 (بانثينول): يرطب ويهدئ البشرة، يساعد على إصلاح الحاجز الجلدي، يقلل الاحمرار، ويسرّع تعافي الجلد."
},

{
  key: "prebiotic aqua posae filiformis",
  aliases: [
    "aqua posae filiformis",
    "prebiotic aqua posae filiformis",
    "la roche-posay prebiotic",
    "أكوا بوزيه فيليفورميس"
  ],
  icon: "🦠",
  tip: "مكوّن بريبايوتك يساعد على دعم توازن الميكروبيوم الطبيعي للبشرة، تقليل الحساسية والتهيج، وتقوية حاجز البشرة."
},
{
  key: "comedoclastin",
  aliases: [
    "comedoclastin",
    "milk thistle extract",
    "silybum marianum fruit extract",
    "كوميدوكلاستين",
    "مستخلص شوك الحليب"
  ],
  icon: "🌿",
  tip: "مكوّن نباتي يساعد على تقليل إفراز الدهون الزائدة، الحد من تكون الرؤوس السوداء والحبوب، وتنقية البشرة الدهنية والمعرضة لحب الشباب."
},


{
  key: "tinosorb s",
  aliases: [
    "tinosorb s",
    "bis-ethylhexyloxyphenol methoxyphenyl triazine",
    "bemotrizinol",
    "تينوسورب اس"
  ],
  icon: "☀️",
  tip: "فلتر شمسي واسع الطيف قوي جدًا يحمي من أشعة UVA وUVB، ويساعد على تعزيز ثبات وفعالية واقي الشمس."
},

{
  key: "glycerin",
  aliases: [
    "glycerin",
    "glycerol",
    "جلسرين"
  ],
  icon: "💧",
  tip: "مرطب قوي يجذب الماء إلى البشرة، يساعد على ترطيب الجلد، تقليل الجفاف، ودعم مرونة ونعومة البشرة."
},

{
  key: "perlite",
  aliases: [
    "perlite",
    "perlite powder",
    "بيرلايت"
  ],
  icon: "✨",
  tip: "مكوّن معدني ماص للزيوت يساعد على امتصاص الدهون الزائدة وتقليل اللمعان، مناسب للبشرة الدهنية والمختلطة."
},

{
  key: "silica",
  aliases: [
    "silica",
    "hydrated silica",
    "سيليكا"
  ],
  icon: "🌫️",
  tip: "يساعد على امتصاص الزيوت الزائدة، تقليل اللمعان، وتحسين ملمس البشرة ليعطي تأثيرًا مطفيًا."
},

{
  key: "sebulyse",
  aliases: [
    "sebulyse",
    "sebulys",
    "مركب سيبوليـز"
  ],
  icon: "🌿",
  tip: "مكوّن منظم لإفراز الدهون يساعد على تقليل اللمعان والمسام الواسعة، ويدعم توازن البشرة الدهنية والمعرضة للحبوب."
},

{
  key: "melasyl",
  aliases: [
    "melasyl",
    "melasyl™",
    "mela syl",
    "ميلازيل"
  ],
  icon: "🌟",
  tip: "مكوّن مخصّص لمكافحة التصبغات يساعد على تقليل البقع الداكنة ومنع تراكم الميلانين الزائد، مما يساهم في توحيد لون البشرة وإضفاء إشراقة أوضح."
},

{
  key: "beeswax",
  aliases: [
    "beeswax",
    "cera alba",
    "white beeswax",
    "شمع العسل"
  ],
  icon: "🐝",
  tip: "مكوّن مرطب وواقي يساعد على تكوين طبقة تحافظ على رطوبة البشرة، ينعّم الجلد، ويدعم حاجز الحماية الطبيعي."
},
{
  key: "triasorb",
  aliases: [
    "triasorb",
    "triasorb™",
    "triazorb",
    "تريازورب"
  ],
  icon: "🌟",
  tip: "فلتر شمسي متطور واسع الطيف يوفر حماية قوية من أشعة UVA وUVB بالإضافة إلى الضوء الأزرق (HEV)، مما يساعد على الوقاية من التصبغات والشيخوخة الضوئية."
},

{
  key: "polyhydroxy acid (pha)",
  aliases: [
    "polyhydroxy acid",
    "pha"
  ],
  icon: "🧪",
  tip: "حمض تقشير لطيف مناسب للبشرة الحساسة، يساعد على إزالة الخلايا الميتة وتحسين الملمس مع تهيج أقل من AHA.",
},
{
  key: "vitamin e",
  aliases: [
    "vitamin e",
    "tocopherol",
    "tocopheryl acetate"
  ],
  icon: "🧴",
  tip: "مضاد أكسدة يساعد على حماية البشرة من الضرر البيئي ويدعم الترطيب وتقوية حاجز الجلد.",
},

{
  key: "monolaurin",
  aliases: [
    "monolaurin",
    "glyceryl laurate"
  ],
  icon: "🦠",
  tip: "مكوّن مضاد للبكتيريا يساعد على تقليل البثور وتنظيم إفراز الدهون، ومفيد للبشرة المعرضة لحب الشباب.",
},

{
  key: "madecassoside",
  aliases: [
    "madecassoside"
  ],
  icon: "🌿",
  tip: "مكوّن مهدئ مستخلص من السنتيلا، يساعد على تقليل الالتهاب والاحمرار ودعم إصلاح حاجز البشرة.",
},

{
  key: "squalane",
  aliases: [
    "squalane"
  ],
  icon: "💧",
  tip: "مرطب خفيف يشبه الدهون الطبيعية للبشرة، يساعد على الترطيب وتقوية حاجز الجلد بدون إحساس دهني.",
},

{
  key: "safflower oil",
  aliases: [
    "safflower oil",
    "carthamus tinctorius seed oil"
  ],
  icon: "🌻",
  tip: "زيت نباتي غني بحمض اللينوليك، يساعد على ترطيب البشرة ودعم حاجز الجلد ومناسب للبشرة الدهنية والمعرضة للحبوب.",
},
{
  key: "vichy volcanic water",
  aliases: [
    "vichy volcanic water",
    "vichy mineralizing water",
    "aqua / water"
  ],
  icon: "💧",
  tip: "مياه بركانية غنية بالمعادن، تساعد على تقوية حاجز البشرة وتهدئتها ودعم مقاومتها للعوامل الخارجية.",
},
{
  key: "hydrogenated poly(c6-20 olefin)",
  aliases: [
    "C6-20 Olefin"
  ],
  icon: "🧴",
  tip: "مكوّن مرطب ومطرّي صناعي يساعد على تنعيم البشرة وتقليل فقدان الرطوبة ومنح ملمس حريري خفيف.",
},
{
  key: "bakuchiol",
  aliases: [
    "bakuchiol"
  ],
  icon: "🌿",
  tip: "مكوّن نباتي يُعتبر بديلًا لطيفًا للريتينول، يساعد على تحسين التجاعيد وتوحيد اللون بدون تهيج قوي.",
},
{
  key: "citric acid",
  aliases: [
    "citric acid"
  ],
  icon: "🧪",
  tip: "حمض خفيف يُستخدم لضبط درجة الحموضة، وله خصائص تقشير لطيفة تساعد على تحسين إشراقة البشرة.",
},

{
  key: "glycyrrhetinic acid",
  aliases: [
    "glycyrrhetinic acid"
  ],
  icon: "🌿",
  tip: "مكوّن مهدئ مشتق من العرقسوس، يساعد على تقليل الالتهاب والاحمرار ودعم راحة البشرة.",
},
{
  key: "allantoin",
  aliases: [
    "allantoin"
  ],
  icon: "🌿",
  tip: "مكوّن مهدئ ومرطب يساعد على تهدئة التهيج ودعم تجدد البشرة.",
},
{
  key: "mannitol",
  aliases: [
    "mannitol"
  ],
  icon: "💧",
  tip: "مرطب ومضاد أكسدة يساعد على جذب الرطوبة ودعم حماية البشرة من الإجهاد التأكسدي.",
},
{
  key: "xylitol",
  aliases: [
    "xylitol"
  ],
  icon: "💧",
  tip: "سكر مرطب يساعد على تعزيز ترطيب البشرة ودعم توازنها الطبيعي.",
},
{
  key: "rhamnose",
  aliases: [
    "rhamnose"
  ],
  icon: "🧪",
  tip: "سكر نباتي يساعد على تحسين مظهر التجاعيد ودعم تماسك البشرة.",
},
{
  key: "mexoryl 400",
  aliases: [
    "mexoryl 400",
    "methoxypropylamino cyclohexenylidene ethoxyethylcyanoacetate"
  ],
  icon: "🏅",
  tip: "فلتر أشعة UVA متطور حاصل على براءة اختراع، يوفر حماية قوية خاصة من نطاق UVA الطويل المرتبط بعمق تلف البشرة.",
},
{
  key: "apricot kernel oil",
  aliases: [
    "apricot kernel oil",
    "prunus armeniaca kernel oil"
  ],
  icon: "🍑​",
  tip: "زيت نباتي خفيف غني بفيتامينات A و E، يساعد على تغذية البشرة وترطيبها ومنحها نعومة بدون ملمس دهني ثقيل.",
},
{
  key: "adenosine",
  aliases: [
    "adenosine"
  ],
  icon: "🧬",
  tip: "مكوّن مضاد للتجاعيد يساعد على تحسين مرونة البشرة وتقليل مظهر الخطوط الدقيقة.",
},
{
  key: "hepes",
  aliases: [
    "hepes",
    "hydroxyethylpiperazine ethane sulfonic acid"
  ],
  icon: "🧪",
  tip: "مكوّن يساعد على تقشير لطيف وتحسين تجدد الخلايا، مما يدعم إشراقة ونعومة البشرة.",
},
{
  key: "sodium dextran sulfate",
  aliases: [
    "sodium dextran sulfate"
  ],
  icon: "🌿",
  tip: "مكوّن مهدئ يساعد على تقليل الانتفاخ والالتهاب ودعم راحة البشرة الحساسة.",
},
{
  key: "phe-resorcinol",
  aliases: [
    "phe-resorcinol",
    "phenylethyl resorcinol"
  ],
  icon: "✨",
  tip: "مكوّن تفتيح قوي يساعد على تقليل البقع والتصبغات وتوحيد لون البشرة.",
},


];







const CATEGORY_ICON_URLS = {
  "cleanser": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/cleanser.png",
  "moisturizer": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/moist.png",
  "toner": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/toner.png",
  "sunscreen": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/sunscreen.png",
  "wrinkles": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/wrinkles.png",
  "finelines": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/finelines.png",
  "healing": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/healing.png",
  "exfoliating": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/exfoliating.png",
  "brightening": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/whitening.png",
  "viltigo": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/VILTIGO.png",
  "micellar water": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/WATER.png",
  "lip balm": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/lip.png",
  "black heads": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/blackheads.png",
  "acne": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/acne.png",
  "night care": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/night.png",
  "hand": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/HAND.png",
  "eye brow": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/eyelash.png",
  "eye lash": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/eyebrow.png",
  "firming": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/CELL.png",
  "puffness": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/EYE.png",
  "all hair": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/allhair.png",
  "dry hair": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/DRYHAIR.png",
  "normal hair": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/normalhair.png",
  "oily hair": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/oilyhair.png",
  "volume hair": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/hairvolume.png",
  "hair loss": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/hairloss.png",
  "hair dandruf": "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/dandruf.png",
  "dayroutine":"https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/dayroutine.png",
  "nightroutine":"https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/nightroutine.png",
};


const PROBLEM_MAP = [
  {
    keys: ["تصبغات", "تفتيح", "بقع", "بقع داكنة"],
    category: "brightening"
  },
  {
    keys: ["مسام", "مسام واسعة", "رؤوس سوداء"],
    category: "black heads"
  },
  {
    keys: ["جفاف", "جفاف شديد", "شد البشرة"],
    category: "moisturizer"
  },
  {
    keys: ["حبوب", "حب الشباب", "acne"],
    category: "acne"
  },
  {
    keys: ["تجاعيد", "خطوط", "خطوط دقيقة","التجاعيد","الخطوط الدقيقة"],
    category: "wrinkles"
  }
];




const productLabel = document.getElementById("productLabel");
const productName  = document.getElementById("productName");
const productIcon  = document.getElementById("productIcon");

function updateProductLabel(valueOverride) {
  const value = normalizeText(valueOverride ?? categorySelect.value);

  // لو مفيش اختيار أو "جميع المنتجات"
  if (!value) {
    productLabel.classList.add("hidden");
    return;
  }

  // اسم نوع المنتج (من الـ select لو موجود)
  const opt = Array.from(categorySelect.options)
    .find(o => normalizeText(o.value) === value);

  productName.textContent = (opt ? opt.textContent : (categoryDisplay[value] ?? value)).trim();

  // الأيقونة من الـ object اللي عندك
  const iconUrl = CATEGORY_ICON_URLS[value];
  if (iconUrl) {
    productIcon.src = iconUrl;
    productIcon.classList.remove("hidden");
  } else {
    productIcon.classList.add("hidden");
  }

  productLabel.classList.remove("hidden");
}






// fallback icon لو مفيش لينك
const DEFAULT_CAT_ICON = "https://img.icons8.com/fluency/48/tags.png";

// =========================
// Sidebar Build + Sync
// =========================
const categorySidebar = document.getElementById("categorySidebar");

// =========================
// Pinned Circle (Click on sidebar icon)
// =========================
const catPinnedCircle = document.getElementById("catPinnedCircle");
const catPinnedImg = document.getElementById("catPinnedImg");
const catPinnedName = document.getElementById("catPinnedName");

function showPinnedCategory(iconSrc, nameText){
  if (!catPinnedCircle) return;
  catPinnedImg.src = iconSrc || "";
  catPinnedName.textContent = nameText || "";
  catPinnedCircle.classList.remove("hidden");
  catPinnedCircle.setAttribute("aria-hidden", "false");
}

function hidePinnedCategory(){
  if (!catPinnedCircle) return;
  catPinnedCircle.classList.add("hidden");
  catPinnedCircle.setAttribute("aria-hidden", "true");
}

function pinCircleFromCategorySelect(){
  const v = normalizeText(categorySelect.value);

  // لو مفيش اختيار
  if (!v) {
    hidePinnedCategory();
    return;
  }

  // حاول تجيب نفس الكاتيجوري من السايدبار
  const btn = categorySidebar?.querySelector(
    `.cat-btn[data-value="${CSS.escape(v)}"]`
  );

  if (btn) {
    const icon = btn.querySelector(".cat-icon");
    const text = btn.querySelector(".cat-text");

    showPinnedCategory(
      icon?.src || "",
      text?.textContent?.trim() || (categoryDisplay[v] ?? v)
    );
  } else {
    // fallback
    showPinnedCategory("", categoryDisplay[v] ?? v);
  }
}



// Event Delegation: كليك على أي cat-btn


// لو ضغطت في أي مكان بره السايدبار => اخفاء
categorySelect.addEventListener("click", e => e.stopPropagation());


// لو ضغط داخل السايدبار نفسه (على الفراغ) مايقفلش
document.querySelector(".sidebar")?.addEventListener("click", (e) => {
  e.stopPropagation();
});





function buildCategorySidebarFromSelect(){
  if (!categorySidebar || !categorySelect) return;

  categorySidebar.innerHTML = "";

  // خد كل الاوبشنز اللي قيمتها مش فاضية
  const opts = Array.from(categorySelect.options)
    .map(o => ({ value: normalizeText(o.value), text: o.textContent.trim() }))
    .filter(o => o.value); // يشيل "جميع المنتجات"

  for (const o of opts){
    const btn = document.createElement("div");
    btn.className = "cat-btn";
    btn.dataset.value = o.value;

    const iconUrl = CATEGORY_ICON_URLS[o.value] || DEFAULT_CAT_ICON;

    btn.innerHTML = `
      <img class="cat-icon" src="${iconUrl}" alt="">
      <div class="cat-text">${categoryDisplay[o.value] ?? o.text}</div>
    `;

btn.addEventListener("click", () => {

  const current = normalizeText(categorySelect.value);
  categorySelect.value = (current === o.value) ? "" : o.value;

  forcedProductId = "";

  // ✅ تحديث كل حاجة من مصدر واحد
  updateProductLabel();
  pinCircleFromCategorySelect();
  applyFilters();
  syncCategorySidebarActive();
});




    categorySidebar.appendChild(btn);
  }

  syncCategorySidebarActive();
}

function syncCategorySidebarActive(){
  if (!categorySidebar) return;
  const current = normalizeText(categorySelect.value);

  categorySidebar.querySelectorAll(".cat-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.value === current);
  });
}




// =========================
// ✅ Brand logos (ONE PLACE ONLY)
// =========================
// حط هنا روابط اللوجوه مرة واحدة فقط
// لازم تكون روابط مباشرة للصورة (png/jpg/svg)
const BRAND_LOGOS = {
  vichy: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/vichy.png",
  larocheposay: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/la%20roche.png",
  avene: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/avene.png",
  isispharma: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/isis.png",
  bioderma: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/bioderma.png",
  uriage: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/uriage.png",
  acm: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/acm.png",
  eucerin: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/eucerin.png",
  cerave: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/cerave.png",
  anivagen: "https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/anivagen.png",
  matriskin:"https://raw.githubusercontent.com/drshawky26/skin-care/refs/heads/main/matriskin.png",
};

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
  "hair dandruf":"للقشره",
  "viltigo":"بهاق",
  "night care":"العنايه اليليه",
  "hand":"العنايه باليدين",
  "exfoliating":"مقشر",
  "eye lash":"العنايه بالرموش",
  "eye brow":"العنايه بالحواجب",
  "firming":"شد الترهلات والسيلوليت",
  "puffness":"إنتفاخات العين",
  "dayroutine":"روتين النهار",
  "nightroutine":"روتين ليلى"
};

function rebuildCategoryOptions(allowedValues) {
  // ✅ احفظ الاختيار الحالي قبل ما نمسح options
  const prev = normalizeText(categorySelect.value);

  categorySelect.innerHTML = "";

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

  // ✅ رجّع الاختيار القديم لو لسه موجود ضمن المسموح
  const allowedSet = new Set(allowedValues.map(normalizeText));
  if (prev && allowedSet.has(prev)) {
    categorySelect.value = prev;
  } else {
    // لو مش مسموح، سيبه على "جميع المنتجات"
    categorySelect.value = "";
  }

  // ✅ (لو عندك سايدبار) ابنيه تاني + ظبط الـ active
  if (typeof buildCategorySidebarFromSelect === "function") {
    buildCategorySidebarFromSelect();
  }
  if (typeof syncCategorySidebarActive === "function") {
    syncCategorySidebarActive();
  }

  // ✅ (لو عندك دائرة الـ pinned للكاتيجوري) حدّثها
  if (typeof pinCircleFromCategorySelect === "function") {
    pinCircleFromCategorySelect();
  }
}


function normalizeText(v) {
  return String(v ?? "").trim().toLowerCase();
}

function escapeHTML(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function escRegex(s){
  return String(s ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(original, words){
  const safe = escapeHTML(original || "");
  if (!words || !words.length) return safe;

  // نعمل regex لكل كلمة (case-insensitive) مع مراعاة الأحرف الخاصة
  let out = safe;
  for (const w of words){
    const ww = escapeHTML(w).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(ww, "gi");
    out = out.replace(re, (m) => `<span class="ing-hit">${m}</span>`);
  }
  return out;
}


const SKIN_CATEGORY_RULES = {
  // الأنواع الخاصة
  eye: ["wrinkles", "moisturizer", "brightening", "eye lash", "eye brow", "puffness","finelines"],
  cica: ["healing"],
  body: ["cleanser", "moisturizer", "sunscreen", "healing", "exfoliating", "brightening", "night care", "firming"],
  nails: ["moisturizer"],
  facebody: ["moisturizer", "sunscreen"],

  // أنواع البشرة الأساسية
  oily: ["dayroutine","nightroutine","cleanser", "moisturizer", "sunscreen", "acne", "black heads", "night care","toner","wrinkles","finelines","exfoliating","viltigo","micellar water","brightening"],
  dry: ["dayroutine","nightroutine","cleanser", "moisturizer", "sunscreen", "night care","toner","wrinkles","finelines","exfoliating","viltigo","micellar water","lip balm","healing"],
  combination: ["dayroutine","nightroutine","cleanser", "moisturizer", "sunscreen", "acne", "black heads", "night care","toner","wrinkles","finelines","exfoliating","viltigo","micellar water"],
  normal: ["dayroutine","nightroutine","cleanser", "moisturizer", "sunscreen", "acne", "black heads", "night care","toner","wrinkles","finelines","exfoliating","viltigo","micellar water"],
  sensitive: ["dayroutine","nightroutine","cleanser", "moisturizer", "sunscreen", "night care","toner","wrinkles","finelines","exfoliating","viltigo","micellar water"],
};



function updateCategoryOptionsBySkin(skin) {
  skin = normalizeText(skin);

  // لو ليه قواعد محددة
  if (SKIN_CATEGORY_RULES[skin]) {
    rebuildCategoryOptions(SKIN_CATEGORY_RULES[skin]);
    return;
  }

  // hair (لوحده)
  if (skin === "hair") {
  const hairAllowed = [
    "all hair",
    "dry hair",
    "normal hair",
    "oily hair",
    "volume hair",
    "hair loss",
    "hair dandruf",
  ];

  const hairValues = ALL_CAT_OPTIONS
    .map(o => normalizeText(o.value))
    .filter(v => hairAllowed.includes(v));

  rebuildCategoryOptions(hairValues);
  return;
  }

  // fallback (لو مفيش اختيار)
  const skinValues = ALL_CAT_OPTIONS
    .map(o => normalizeText(o.value))
    .filter(v => v && !v.includes("hair"));

  rebuildCategoryOptions(skinValues);
}


// Zoom elements
const hoverPreview = document.getElementById("hoverPreview");
const hoverPreviewLens = document.getElementById("hoverPreviewLens");

// ===== Helpers =====
// ================= Pregnancy Warning Rules =================
// تقدر تزود هنا أي كلمات/أسماء منتجات/مكوّنات
const PREGNANCY_WARNING_RULES = {
  // 1) لو المنتج ID معروف (أفضل اختيار)
  productIds: [
    // "101", "205"
  ],

  // 2) أسماء منتجات / Aliases (ممكن المنتج له أكتر من اسم)
  productNameAliases: [
    // "retinol serum", "vitamin a cream", "ريتينول", "تريتينوين"
  ],

  // 3) مكوّنات/كلمات لو موجودة في الاسم أو الوصف أو المكوّنات أو الاستخدام
  keywordAliases: [
    // Retinoids
    "retinol","retinal","retinaldehyde","tretinoin","isotretinoin","adapalene","tazarotene","Retinyl Palmitate",
    "vitamin a","vit a","ريتينول","ريتينال","فيتامين a",

    // Hydroquinone (لو بتحب تضيفه)
    "hydroquinone","هيدروكينون",

    // Salicylic acid (اختياري حسب سياستك)
    "salicylic acid","bha","ساليسيليك","ساليسيليك اسيد"
  ]
};

function shouldShowPregnancyWarning(p){
  const pid = String(p?.id ?? "").trim();
  if (pid && PREGNANCY_WARNING_RULES.productIds.includes(pid)) return true;

  const blob = normalizeText([
    p?.name, p?.description, p?.ingredients, p?.benefits, p?.usage,
    (p?.skinTypes || []).join(" "),
    p?.brand, p?.category
  ].join(" "));

  // match product names aliases
  for (const a of PREGNANCY_WARNING_RULES.productNameAliases){
    const aa = normalizeText(a);
    if (aa && blob.includes(aa)) return true;
  }

  // match keywords/ingredients aliases
  for (const k of PREGNANCY_WARNING_RULES.keywordAliases){
    const kk = normalizeText(k);
    if (kk && blob.includes(kk)) return true;
  }

  return false;
}

function updatePanelPregnancyWarning(p){
  if (!panelPregnancyWrap || !panelPregnancyIcon) return;

  const show = shouldShowPregnancyWarning(p);

  if (!show){
    panelPregnancyWrap.classList.add("hidden");
    panelPregnancyWrap.setAttribute("aria-hidden","true");
    panelPregnancyWrap.classList.remove("pulse");
    return;
  }

  panelPregnancyIcon.src = PREGNANCY_ICON_URL;
  panelPregnancyWrap.setAttribute("data-tip", PREGNANCY_TIP_TEXT);

  panelPregnancyWrap.classList.remove("hidden");
  panelPregnancyWrap.setAttribute("aria-hidden","false");

  // Pulse خفيف
  panelPregnancyWrap.classList.add("pulse");
}




function isNightProduct(p){
  const words = normalizeText(
    (p.name || "") + " " +
    (p.description || "") + " " +
    (p.usage || "")
  )
  .split(/[\s\-_/،.]+/)
  .filter(Boolean);

  const morningWords = ["morning","am","صباح","صباحا","صباحاً"];
  const nightWords = ["night","pm","overnight","مساء","مساءا","مساءً","ليلي","ليل","ليلى"];

  if (words.some(w => morningWords.includes(w))) return false;
  if (words.includes("صباحا") && words.includes("مساءa")) return false;

  return words.some(w => nightWords.includes(w));
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
  body:"للجسم",
  nails:"للأظافر",
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
  cica:"label-cica",
  nails:"label-nails",
  body:"label-body",
};

const brandDisplay = {
  vichy: "Vichy",
  "la roche posay": "La Roche-Posay",
  avene: "Avène",
  isispharma: "IsisPharma",
  bioderma: "Bioderma",
  eucerin: "Eucerin",
  acm:"Acm",
  uriage:"Uriage",
  cerave:"CeraVe",
  anivagen:"Anivagen",
  matriskin:"matriskin",
};

const PLACEHOLDER =
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=60";

// ===== State =====
let allProducts = [];

// ✅ Search State (ADDON)
let forcedProductId = "";   // لو اختار من البحث: اعرض منتج واحد بس
let forcedQuery = "";          // كلمة المادة اللي هنعمل عليها فلترة
let forcedQueryWords = [];     // كلمات مقسمة (لو المستخدم كتب اكتر من كلمة)
let forcedProblemCategory = "";
let forcedProblemLabel = "";   // النص العربي اللي المستخدم قصده (تصبغات/بقع...)


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

  // بعد تحميل الداتا: جهّز فقاعات اللوجوه
  if (typeof window.__initBrandBubbles === "function") {
    window.__initBrandBubbles();
  }
}

// =========================
// Brand helpers
// =========================



function getBrandLogoUrl(brandKey) {
  return BRAND_LOGOS[brandKey] || "";
}

function getAvailableBrands() {
  const set = new Set(allProducts.map(p => p.brand).filter(Boolean));
  return Array.from(set);
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
    brandLogo.src = "";
    brandLogo.alt = "";
    return;
  }

  brandLabel.classList.remove("hidden");
  brandName.textContent = `الشركة: ${brandDisplay[brand] ?? brand}`;

  const logoUrl = getBrandLogoUrl(brand);
  if (logoUrl) {
    brandLogo.src = logoUrl;
    brandLogo.alt = brandDisplay[brand] ?? brand;
    brandLogo.style.display = "";
  } else {
    brandLogo.src = "";
    brandLogo.alt = "";
    brandLogo.style.display = "none";
  }
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
// ✅ Search Addon (Dropdown + Selection)
// =========================
function productSearchBlob(p){
  return normalizeText([
    p.name, p.brand, p.category, p.description, p.ingredients, p.benefits, p.usage,
    (p.skinTypes || []).join(" ")
  ].join(" "));
}

function scoreMatch(text, qWords){
  let s = 0;
  for (const w of qWords){
    if (!w) continue;
    if (text.includes(w)) s += 1;
  }
  return s;
}

function showDropdown(items){
  if (!searchDropdown) return;
  if (!items.length){
    searchDropdown.innerHTML = "";
    searchDropdown.classList.add("hidden");
    return;
  }

  searchDropdown.innerHTML = "";
  for (const p of items){
    const row = document.createElement("div");
    row.className = "search-item";
    row.innerHTML = `
      <img class="search-thumb" src="${p.image || PLACEHOLDER}" alt="">
      <div class="search-texts">
        <div class="search-name">${p.name || "—"}</div>
        <div class="search-meta">${brandDisplay[p.brand] ?? p.brand} • ${(categoryDisplay[p.category] ?? p.category) || ""}</div>
      </div>
    `;
    row.onclick = () => selectProductFromSearch(p);
    searchDropdown.appendChild(row);
  }

  searchDropdown.classList.remove("hidden");
}

function hideDropdown(){
  if (!searchDropdown) return;
  searchDropdown.classList.add("hidden");
}

function pickSkinForProduct(p){
  const base = ["oily", "normal", "combination", "sensitive", "dry"];
  const st = (p.skinTypes || []).map(normalizeText);

  if (st.includes("oily")) return "oily";
  const firstBase = base.find(x => st.includes(x));
  if (firstBase) return firstBase;

  if (st.includes("allskin")) return "oily"; // زي ما طلبت: لو allskin خليه دهنيه افتراضياً

  return st[0] || "";
}

function pickCategoryForProduct(p){
  const cats = normalizeText(p.category).split(",").map(s => s.trim()).filter(Boolean);
  return cats[0] || "";
}

function selectProductFromSearch(p){
  // 1) skin
  const skin = pickSkinForProduct(p);
  skinSelect.value = skin;

  // لازم نعيد بناء الكاتيجوري قبل ما نحدد category
  updateCategoryOptionsBySkin(skinSelect.value);

  // 2) brand
  brandSelect.value = p.brand || "";

  // 3) category
  const cat = pickCategoryForProduct(p);
  categorySelect.value = cat || "";

  // 4) اعرض المنتج ده فقط
  forcedProductId = p.id;

  // ✅ NEW: حدّث دايرة الصنف + أيقونة الصنف + active في السايدبار
  updateProductLabel(cat);
  pinCircleFromCategorySelect();
  if (typeof syncCategorySidebarActive === "function") syncCategorySidebarActive();

  // 5) طبق واعرض
  applyFilters();
  hideDropdown();

  try { grid.scrollIntoView({ behavior: "smooth", block: "start" }); } catch(e){}
}


function tokenizeQuery(q){
  return normalizeText(q)
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")   // شيل أي ترقيم
    .split(/\s+/)
    .filter(Boolean);
}

function runSearch(){
  if (!searchInput || !searchDropdown) return;

  const raw = searchInput.value || "";
  const words = tokenizeQuery(raw);

  if (!words.length){
    forcedProductId = "";
    hideDropdown();
    applyFilters();
    return;
  }

  // كل الكلمات لازم تكون موجودة (AND)
  const results = allProducts.filter(p => {
    const blob = productSearchBlob(p); // name+brand+category+...
    return words.every(w => blob.includes(w));
  });

  showDropdown(results);
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

  // ✅ لو في forcedProductId من البحث: اعرض المنتج حتى لو selects فاضية
if (!skin && !brand && !category && !forcedProductId && !forcedQueryWords.length) {
    showEmpty("اختار (نوع البشرة) أو (الشركة) أو (نوع المنتج) علشان تظهر المنتجات");
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

    // ✅ Addon: لو في منتج متثبت من البحث
    if (forcedProductId && p.id !== forcedProductId) return false;
    // ✅ Search by ingredient/keyword (Enter mode)
    if (forcedQueryWords.length) {
      const blob = productSearchBlob(p);
      const ok = forcedQueryWords.every(w => blob.includes(w));
      if (!ok) return false;
    }

    // ✅ Problem-based search
    if (forcedProblemCategory) {

      const cats = normalizeText(p.category)
        .split(",")
        .map(s => s.trim());

      const benefitBlob = normalizeText(p.benefits || "");

      const matchCategory = cats.includes(forcedProblemCategory);
      const matchBenefits = benefitBlob.includes(forcedQuery);

      if (!matchCategory && !matchBenefits) return false;
    }



    if (skin) {
      if (skin === "hair") {
        if (!p.skinTypes.includes("hair")) return false;
      } else {
        const baseSkinTypes = ["oily", "normal", "combination", "sensitive", "dry"];
        const allowAllskin = baseSkinTypes.includes(skin);

        const ok =
          p.skinTypes.includes(skin) ||
          (allowAllskin && p.skinTypes.includes("allskin"));

        if (!ok) return false;
      }
    }

    if (category) {
      if (category === "night care") {
        if (!isNightProduct(p)) return false;
      } else {
        const cats = normalizeText(p.category)
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);

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

    // ✅ Badge لو البحث Enter وكان المنتج مطابق
    if (forcedQueryWords.length) {
    const badge = document.createElement("div");
    badge.className = "hit-badge";

    // ✅ لو Problem mode
    if (forcedProblemCategory) {
      badge.textContent = `⭐ مناسب لـ: ${forcedProblemLabel || forcedQuery}`;
    } else {
      // ✅ Ingredient/keyword mode
      badge.textContent = `⭐ يحتوي على: ${forcedQuery}`;
    }

    card.appendChild(badge);
  }




    if (isNightProduct(p)) {
      const badge = document.createElement("div");
      badge.className = "night-badge";
      badge.title = "منتج ليلي";
      badge.innerHTML = `
        <svg viewBox="0 0 122.88 122.89" aria-hidden="true">
          <path d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25 l0.01,0l0,0L49.06,1.27z"/>
        </svg>
      `;
      card.appendChild(badge);
    }

    card.onclick = () => openPanel(p);
    grid.appendChild(card);
  });
}

// ####################################################################################################
function setPanelSkinLabel(type){
  if (!panelSkinLabel) return;

  panelSkinLabel.classList.remove("hidden", ...Object.values(labelClass));
  if (!type) { panelSkinLabel.classList.add("hidden"); return; }

  panelSkinLabel.textContent = `نوع البشرة: ${skinDisplay[type] ?? type}`;
  if (labelClass[type]) panelSkinLabel.classList.add(labelClass[type]);
}

function setPanelBrandLabel(brand){
  if (!panelBrandLabel) return;

  if (!brand){
    panelBrandLabel.classList.add("hidden");
    panelBrandLogo.src = "";
    panelBrandLogo.alt = "";
    return;
  }

  panelBrandLabel.classList.remove("hidden");
  panelBrandName.textContent = `الشركة: ${brandDisplay[brand] ?? brand}`;

  const logoUrl = getBrandLogoUrl(brand);
  if (logoUrl){
    panelBrandLogo.src = logoUrl;
    panelBrandLogo.alt = brandDisplay[brand] ?? brand;
    panelBrandLogo.style.display = "";
  } else {
    panelBrandLogo.src = "";
    panelBrandLogo.alt = "";
    panelBrandLogo.style.display = "none";
  }
}

function setPanelProductLabel(cat){
  if (!panelProductLabel) return;

  if (!cat){
    panelProductLabel.classList.add("hidden");
    return;
  }

  // اسم الكاتيجوري
  panelProductName.textContent = (categoryDisplay[cat] ?? cat).trim();

  // أيقونة الكاتيجوري
  const iconUrl = CATEGORY_ICON_URLS[cat];
  if (iconUrl){
    panelProductIcon.src = iconUrl;
    panelProductIcon.classList.remove("hidden");
  } else {
    panelProductIcon.classList.add("hidden");
  }

  panelProductLabel.classList.remove("hidden");
}



// =========================
// Panel Scoring (Stars + 3 Bars) ✅
// =========================

// 1) Profiles: أوزان بسيطة حسب نوع المنتج







// =========================
// Panel
// =========================
function openPanel(p) {
if (searchHeader) {
    searchHeader.style.display = "none";
  }

  panelImg.src = p.image || PLACEHOLDER;
  panelName.textContent = p.name || "—";
  panelDesc.textContent = p.description || "—";
  panelIngredients.innerHTML = annotateIngredientsText(p.ingredients || "—");

  
  panelBenefits.textContent = p.benefits || "—";
  panelUsage.textContent = p.usage || "—";

  if (isNightProduct(p)) {
    panelNightBadge.classList.remove("hidden");
    panelNightBadge.innerHTML = `
      <svg viewBox="0 0 122.88 122.89" aria-hidden="true">
        <path d="M49.06,1.27c2.17-0.45,4.34-0.77,6.48-0.98c2.2-0.21,4.38-0.31,6.53-0.29c1.21,0.01,2.18,1,2.17,2.21 c-0.01,0.93-0.6,1.72-1.42,2.03c-9.15,3.6-16.47,10.31-20.96,18.62c-4.42,8.17-6.1,17.88-4.09,27.68l0.01,0.07 c2.29,11.06,8.83,20.15,17.58,25.91c8.74,5.76,19.67,8.18,30.73,5.92l0.07-0.01c7.96-1.65,14.89-5.49,20.3-10.78 c5.6-5.47,9.56-12.48,11.33-20.16c0.27-1.18,1.45-1.91,2.62-1.64c0.89,0.21,1.53,0.93,1.67,1.78c2.64,16.2-1.35,32.07-10.06,44.71 c-8.67,12.58-22.03,21.97-38.18,25.29c-16.62,3.42-33.05-0.22-46.18-8.86C14.52,104.1,4.69,90.45,1.27,73.83 C-2.07,57.6,1.32,41.55,9.53,28.58C17.78,15.57,30.88,5.64,46.91,1.75c0.31-0.08,0.67-0.16,1.06-0.25 l0.01,0l0,0L49.06,1.27z"/>
      </svg>
    `;
  } else {
    panelNightBadge.classList.add("hidden");
    panelNightBadge.innerHTML = "";
  }
    
  // ✅ Update panel labels (based on current selection + product)
  const skin = normalizeText(skinSelect.value) || pickSkinForProduct(p);
  const brand = normalizeText(brandSelect.value) || normalizeText(p.brand);
  const cat   = normalizeText(categorySelect.value) || pickCategoryForProduct(p);

  setPanelSkinLabel(skin);
  setPanelBrandLabel(brand);
  setPanelProductLabel(cat);


  updatePanelPregnancyWarning(p);
    
  overlay.classList.remove("hidden");
}

closePanel.onclick = () => {
  overlay.classList.add("hidden");

  // 🟢 رجّع الهيدر
  if (searchHeader) {
    searchHeader.style.display = "";
  }
};

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
skinSelect.addEventListener("change", () => {
  updateCategoryOptionsBySkin(skinSelect.value);
  applyFilters();
});

categorySelect.addEventListener("change", () => {
  forcedProductId = "";
  updateProductLabel();
  applyFilters();
  if (typeof syncCategorySidebarActive === "function") syncCategorySidebarActive();
});


brandSelect.onchange = () => { forcedProductId = ""; applyFilters(); };   // ✅ Addon

// ✅ Search events (ADDON)
if (searchInput && searchDropdown) {
  let searchTimer = null;

searchInput.addEventListener("input", () => {

  const raw = searchInput.value.trim();

  // ✅ لو السيرش اتمسح
  if (!raw) {
    forcedProductId = "";
    forcedQuery = "";
    forcedQueryWords = [];

    hideDropdown();
    applyFilters();
    return;
  }

  clearTimeout(searchTimer);
  searchTimer = setTimeout(runSearch, 120);
});

  searchInput.addEventListener("focus", runSearch);

  // اقفل الدروب لو ضغطت برا
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-wrap")) hideDropdown();
  });
}

if (searchInput && searchDropdown) {

  // ... عندك input / focus / click برا

  searchInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const raw = searchInput.value || "";
    const words = tokenizeQuery(raw);

    // لو فاضي => رجّع الطبيعي
    if (!words.length) {
      forcedProductId = "";
      forcedQuery = "";
      forcedQueryWords = [];
      forcedProblemCategory = "";
      hideDropdown();
      applyFilters();
      return;
    }

    forcedProblemCategory = "";
    forcedProblemLabel = "";

    for (const group of PROBLEM_MAP) {
      const hit = group.keys.find(k => raw.includes(k));
      if (hit) {
        forcedProblemCategory = group.category;
        forcedProblemLabel = hit;   // ✅ النص اللي اتكتب/اتلقط
        break;
      }
    }


    // ✅ هنا: فلترة “بالكلمة” على كل المنتجات
    forcedProductId = "";          // مهم: نلغي اختيار منتج واحد
    forcedQuery = raw.trim();
    forcedQueryWords = words;

    hideDropdown();
    applyFilters();

    // اختياري: اسكرول للجريد
    try { grid.scrollIntoView({ behavior: "smooth", block: "start" }); } catch(e){}
  });
}




// =========================
// Start
// =========================
loadExcel().catch(err => {
  console.error(err);
  showEmpty(err.message);
  updateCategoryOptionsBySkin(skinSelect.value);
});

// =========================
// Bubbles + Brand Logo Bubbles (Clickable)
// =========================
(() => {
  const canvas = document.getElementById("bubblesCanvas");
  const ctx = canvas.getContext("2d", { alpha: true });

  const DPR = Math.min(2, window.devicePixelRatio || 1);

  let W = 0, H = 0;
  let bubbles = [];
  let logoBubbles = [];
  let hoveredBrandKey = "";

  const logoImages = new Map();
  const LOGO_COUNT = 12;

  let lastT = performance.now();

  const pointer = { x: 0, y: 0, vx: 0, vy: 0, active: false };
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function resize() {
    W = Math.floor(canvas.clientWidth);
    H = Math.floor(canvas.clientHeight);
    canvas.width  = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const targetCount = Math.max(50, Math.min(180, Math.floor((W * H) / 11000)));

    if (!bubbles.length) {
      bubbles = makeBubbles(targetCount);
    } else if (bubbles.length < targetCount) {
      bubbles.push(...makeBubbles(targetCount - bubbles.length));
    } else if (bubbles.length > targetCount) {
      bubbles.length = targetCount;
    }

    if (!logoBubbles.length && typeof window.__initBrandBubbles === "function") {
      window.__initBrandBubbles();
    }
  }

  const palette = [
    { core: [170, 225, 255], glow: [210, 245, 255] },
    { core: [140, 205, 255], glow: [200, 235, 255] },
    { core: [185, 240, 255], glow: [220, 252, 255] },
  ];

  function makeBubbles(n){
    const arr = [];
    for (let i = 0; i < n; i++){
      const p = palette[Math.floor(Math.random() * palette.length)];
      const r = rand(4, 28) * (W < 520 ? 0.95 : 1);

      arr.push({
        x: rand(0, W),
        y: rand(H * 0.35, H),
        r,
        vx: rand(-0.08, 0.08),
        vy: rand(-0.40, -0.10),
        wob: rand(0.6, 1.6),
        ph: rand(0, Math.PI * 2),
        a: rand(0.10, 0.22),
        core: p.core,
        glow: p.glow,
        z: rand(0.4, 1.2)
      });
    }
    return arr;
  }

  function makeLogoBubbles(brandKeys){
    const keys = brandKeys
      .filter(k => getBrandLogoUrl(k)) // لازم يبقى ليه لوجو
      .slice(0, LOGO_COUNT);

    const arr = [];

    for (const brandKey of keys){
      const url = getBrandLogoUrl(brandKey);
      if (!url) continue;

      if (!logoImages.has(brandKey)) {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.src = url;
        logoImages.set(brandKey, im);
      }

      const r = rand(34, 48) * (W < 520 ? 0.9 : 1.1);

      // ######################## عدد البابلز%%%%###########################
      for (let i = 0; i < 1; i++) {
        const r = rand(34, 48) * (W < 520 ? 0.9 : 1.1);

        arr.push({
          brandKey,
          x: rand(0, W),
          y: rand(H * 0.35, H),
          r,
          vx: rand(-0.08, 0.08),
          vy: rand(-0.36, -0.12),
          wob: rand(0.6, 1.6),
          ph: rand(0, Math.PI * 2),
          a: rand(0.18, 0.30),
          z: rand(0.6, 1.25),
        });
      }
    }
    return arr;
  }

  window.__initBrandBubbles = () => {
    const brands = getAvailableBrands();
    brands.sort();
    logoBubbles = makeLogoBubbles(brands);
  };

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

  // =========================
  // Hover على لوجو الشركة
  // =========================
  canvas.style.pointerEvents = "auto";

 // =========================
// Hover/Click على لوجو الشركة (GLOBAL HIT TEST)
// =========================

// خلي الكانفاس ما يلقطش أي كليك لوحده (علشان الكروت تفضل شغالة)
canvas.style.pointerEvents = "none";

// دالة hit-test تعتمد على مكان المؤشر على الشاشة
function hitTestBrandAt(clientX, clientY){
  const rect = canvas.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;

  // لو خارج حدود الكانفاس
  if (x < 0 || y < 0 || x > rect.width || y > rect.height) return "";

  for (let i = logoBubbles.length - 1; i >= 0; i--) {
    const b = logoBubbles[i];
    const dx = x - b.x;
    const dy = y - b.y;
    if (dx * dx + dy * dy <= b.r * b.r) return b.brandKey;
  }
  return "";
}

// expose للـ document listeners بره
window.__hitBrandBubble = hitTestBrandAt;

  function drawBubble(b) {
    const glow = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * 2.8);
    glow.addColorStop(0, `rgba(200,245,255,${b.a * 0.55})`);
    glow.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 2.8, 0, Math.PI * 2);
    ctx.fill();

    const body = ctx.createRadialGradient(
      b.x - b.r * 0.22, b.y - b.r * 0.22, b.r * 0.10,
      b.x, b.y, b.r
    );
    body.addColorStop(0, `rgba(255,255,255,${b.a * 0.75})`);
    body.addColorStop(0.45, `rgba(170,230,255,${b.a * 0.40})`);
    body.addColorStop(1, `rgba(255,255,255,${b.a * 0.18})`);

    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = 1.6;
    ctx.strokeStyle = `rgba(255,255,255,${b.a * 1.25})`;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 0.98, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawLogoBubble(b){
    // bubble + clip logo
    const body = ctx.createRadialGradient(
      b.x - b.r * 0.22, b.y - b.r * 0.22, b.r * 0.10,
      b.x, b.y, b.r
    );
    body.addColorStop(0, `rgba(255,255,255,${b.a * 0.85})`);
    body.addColorStop(1, `rgba(255,255,255,${b.a * 0.18})`);

    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 0.82, 0, Math.PI * 2);
    ctx.clip();

    const im = logoImages.get(b.brandKey);
    if (im && im.complete && im.naturalWidth) {
      const size = b.r * 1.45;
      ctx.drawImage(im, b.x - size/2, b.y - size/2, size, size);
    }
    ctx.restore();

    ctx.lineWidth = 1.8;
    ctx.strokeStyle = `rgba(255,255,255,${b.a * 1.2})`;
    ctx.beginPath();
    ctx.arc(b.x, b.y, b.r * 0.98, 0, Math.PI * 2);
    ctx.stroke();
  }

  function step(t){
    const dt = Math.min(32, t - lastT) / 16.666;
    lastT = t;

    ctx.clearRect(0, 0, W, H);

    if (prefersReduced) {
      for (const b of bubbles) drawBubble(b);
      for (const b of logoBubbles) drawLogoBubble(b);
      requestAnimationFrame(step);
      return;
    }

    const px = pointer.x, py = pointer.y;
    const hasPointer = pointer.active;

    function moveBubble(b){
      b.ph += 0.01 * b.wob * dt;
      const wobX = Math.sin(b.ph) * 0.15 * b.z;
      const wobY = Math.cos(b.ph * 0.9) * 0.18 * b.z;

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
          const force = (1 - dist / range) * 0.9 * b.z;
          const nx = dx / dist;
          const ny = dy / dist;
          b.x += nx * force * 2.2 * dt;
          b.y += ny * force * 2.2 * dt;
        }
      }

      const pad = b.r * 2.5;
      if (b.x < -pad) b.x = W + pad;
      else if (b.x > W + pad) b.x = -pad;
      if (b.y < -pad) {
        b.y = H + pad;
        b.x = rand(0, W);
      }
    }

    for (const b of bubbles){ moveBubble(b); drawBubble(b); }
    for (const b of logoBubbles){ moveBubble(b); drawLogoBubble(b); }

    requestAnimationFrame(step);
  }

  const ro = new ResizeObserver(resize);
  ro.observe(document.querySelector(".bg-bubbles"));

  resize();
  requestAnimationFrame(step);
})();

// =========================
// Global bubble interactions (works فوق أي UI)
// =========================
document.addEventListener("click", (e) => {
  // ✅ استثناء dock (مهم للموبايل)
  const dock = document.getElementById("sidebarDock");
  if (dock && dock.contains(e.target)) return;

  if (typeof window.__hitBrandBubble !== "function") return;
  const brandKey = window.__hitBrandBubble(e.clientX, e.clientY);
  if (!brandKey) return;

  e.preventDefault();
  e.stopPropagation();

  if (typeof hideDropdown === "function") hideDropdown();

  forcedProductId = "";
  brandSelect.value = brandKey;
  applyFilters();
}, true);

// امسك الكليك قبل ما يروح للكروت (capture)
document.addEventListener("click", (e) => {
  if (typeof window.__hitBrandBubble !== "function") return;

  const brandKey = window.__hitBrandBubble(e.clientX, e.clientY);
  if (!brandKey) return;

  // امنع الكليك من إنه يفتح كارت أو بانل بالغلط
  e.preventDefault();
  e.stopPropagation();

  if (typeof hideDropdown === "function") hideDropdown();

  forcedProductId = "";
  brandSelect.value = brandKey;
  applyFilters();
}, true);

buildCategorySidebarFromSelect();
categorySelect.addEventListener("change", () => {
  pinCircleFromCategorySelect();
});

// =========================
// Collapsible Sidebar (Hover + Click)
// =========================
const sidebar = document.querySelector(".sidebar");
const sidebarDock = document.getElementById("sidebarDock");

(function initSidebarCollapsible(){
  const sidebar = document.querySelector(".sidebar");
  const sidebarDock = document.getElementById("sidebarDock");
  if (!sidebar || !sidebarDock) return;

  // ✅ Desktop الحقيقي: فيه hover + mouse
  const canHover = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  let pinned = false;
  let closeTimer = null;

  function openSidebar(){
    sidebar.classList.remove("is-collapsed");
    sidebar.classList.add("is-open");
  }

  function closeSidebar(force=false){
    if (!force && pinned) return;
    sidebar.classList.remove("is-open");
    sidebar.classList.add("is-collapsed");
  }

  function scheduleClose(ms=140){
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => closeSidebar(false), ms);
  }

  function cancelClose(){ clearTimeout(closeTimer); }

  // initial state
  sidebar.classList.add("is-collapsed");

  // =========================
  // ✅ DESKTOP (Hover)
  // =========================
  function bindDesktop(){
    // Hover على dock يفتح
    sidebarDock.addEventListener("mouseenter", () => {
      cancelClose(); openSidebar();
    });

    sidebarDock.addEventListener("mouseleave", () => {
      scheduleClose(160);
    });

    // Hover على sidebar نفسه يفضل مفتوح
    sidebar.addEventListener("mouseenter", () => {
      cancelClose(); openSidebar();
    });

    sidebar.addEventListener("mouseleave", () => {
      scheduleClose(160);
    });

    // Click: pin/unpin
    sidebarDock.addEventListener("click", (e) => {
      e.stopPropagation();
      pinned = !pinned;
      if (pinned) openSidebar();
      else closeSidebar(true);
    });
  }

  // =========================
  // ✅ MOBILE (Hover-like باللمس)
  // =========================
  function bindMobile(){
    pinned = false;

    // أول لمسة تفتح (بديل hover)
    sidebarDock.addEventListener("pointerdown", (e) => {
      // مهم جدًا على iOS عشان الكليك مايتأخرش
      e.preventDefault();
      e.stopPropagation();

      if (!sidebar.classList.contains("is-open")){
        openSidebar();
        return;
      }

      // لو مفتوح: اللمسة التانية تقفل (Toggle)
      closeSidebar(true);
    }, { passive:false });

    // لمسة جوه السايدبار ما تقفلش
    sidebar.addEventListener("pointerdown", (e) => e.stopPropagation(), { passive:true });

    // لمسة برا تقفل
    document.addEventListener("pointerdown", (e) => {
      const inside = sidebar.contains(e.target) || sidebarDock.contains(e.target);
      if (!inside) closeSidebar(true);
    }, true);
  }

  function rebind(){
    // ملاحظة: لو عندك rebinding كتير، الأفضل reload. هنا بسيط.
    // هنسيبها كده لأن عندك listeners أصلاً، بس غالباً هتشتغل تمام.
  }

  if (canHover()) bindDesktop();
  else bindMobile();

  window.addEventListener("resize", () => {
    // لو اتبدلت البيئة (تابلت/ديسكتوب) — مش هنعيد bind لتجنب تكرار listeners
    // لو حبيت إعادة bind صح 100% قولّي وأنا أعملها بطريقة clean.
  });
})();


window.addEventListener("load", () => {
  const orb = document.getElementById("sidebarDock");
  if (!orb) return;
  orb.classList.add("attention");
  setTimeout(() => orb.classList.remove("attention"), 3500);
});


// باقي الكود بتاعك فوق هنا ...

function syncCatsHeaderBottom(){
  const header = document.getElementById("catsHeader");
  if (!header) return;

  const rect = header.getBoundingClientRect();
  document.documentElement.style.setProperty(
    "--catsBottom",
    `${rect.bottom}px`
  );
}

window.addEventListener("resize", syncCatsHeaderBottom);
window.addEventListener("load", syncCatsHeaderBottom);
window.addEventListener("scroll", syncCatsHeaderBottom, { passive: true });

syncCatsHeaderBottom();



// =========================
// Routine Builder (Dock + Dropdown + Quiz)
// =========================
(function initRoutineBuilder(){
  const dock = document.getElementById("routineDock");
  const drop = document.getElementById("routineDrop");
  const closeBtn = document.getElementById("routineClose");
  const stepHost = document.getElementById("routineStep");
  const nextBtn = document.getElementById("routineNext");
  const resetBtn = document.getElementById("routineReset");
  const resultBox = document.getElementById("routineResult");

  (function positionRoutineUI(){
    const mainDock = document.getElementById("sidebarDock");
    const routineDock = document.getElementById("routineDock");
    const drop = document.getElementById("routineDrop");
  
    if (!mainDock || !routineDock || !drop) return;
  
    function updatePosition(){
      const rect = mainDock.getBoundingClientRect();
  
      // حط الروتين يمين الدوك بـ 12px
      routineDock.style.top = rect.top + "px";
      routineDock.style.left = (rect.right + 50) + "px";
  
      // خلي الدروب تحتهم
      drop.style.top = (rect.bottom + 12) + "px";
      drop.style.left = rect.left + "px";
    }
  
    updatePosition();
  
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, { passive:true });
  })();


  if (!dock || !drop || !stepHost || !nextBtn || !resetBtn || !resultBox) return;

  // --- Quiz model (اختيارات بسيطة لكن عملية) ---
  const quiz = [
    {
      id: "shine",
      title: "بعد 2-3 ساعات من غسل الوجه… بيحصل إيه؟",
      options: [
        { id:"a", text:"لمعان واضح ودهون", score:{ oily:3, combination:2 } },
        { id:"b", text:"لمعان بسيط في الـ T-Zone فقط", score:{ combination:3, oily:1 } },
        { id:"c", text:"عادي بدون لمعان", score:{ normal:3 } },
        { id:"d", text:"شد وجفاف/قشور", score:{ dry:3 } },
      ]
    },
    {
      id: "pores",
      title: "المسام والرؤوس السوداء عندك؟",
      options: [
        { id:"a", text:"كتير جدًا", score:{ oily:3, combination:2, acne:1 } },
        { id:"b", text:"متوسطة", score:{ combination:2, oily:1 } },
        { id:"c", text:"قليلة", score:{ normal:2, dry:1 } },
      ]
    },
    {
      id: "sensitivity",
      title: "هل بشرتك بتتحسس بسرعة (احمرار/حكة)؟",
      options: [
        { id:"a", text:"أيوه غالبًا", score:{ sensitive:4 } },
        { id:"b", text:"أحيانًا", score:{ sensitive:2, combination:1, dry:1 } },
        { id:"c", text:"نادرًا", score:{ normal:2, oily:1 } },
      ]
    },
    {
      id: "tight",
      title: "هل بتحس بشد بعد الغسيل؟",
      options: [
        { id:"a", text:"أيوه جدًا", score:{ dry:3, sensitive:1 } },
        { id:"b", text:"أحيانًا", score:{ combination:1, dry:2 } },
        { id:"c", text:"لا", score:{ oily:2, normal:2 } },
      ]
    }
  ];

  const skinNames = {
    oily: "دهنيه",
    dry: "جافه",
    combination: "مختلطه",
    normal: "عاديه",
    sensitive: "حساسة"
  };

  let stepIndex = 0;
  const answers = {}; // {questionId: optionId}

  function openDrop(){
    drop.classList.remove("hidden");
    requestAnimationFrame(()=> drop.classList.add("show"));
    drop.setAttribute("aria-hidden","false");
  }

  function closeDrop(){
    drop.classList.remove("show");
    drop.setAttribute("aria-hidden","true");
    setTimeout(()=> drop.classList.add("hidden"), 180);
  }

  function renderStep(){
    const q = quiz[stepIndex];
    if (!q) return;

    resultBox.classList.add("hidden");
    resultBox.innerHTML = "";

    stepHost.innerHTML = `
      <div class="q-title">${q.title}</div>
      <div class="q-opts">
        ${q.options.map(o => `
          <div class="q-opt ${answers[q.id]===o.id ? "active":""}" data-q="${q.id}" data-o="${o.id}">
            ${o.text}
          </div>
        `).join("")}
      </div>
    `;

    // click options
    stepHost.querySelectorAll(".q-opt").forEach(el=>{
      el.addEventListener("click", ()=>{
        const qid = el.dataset.q;
        const oid = el.dataset.o;
        answers[qid] = oid;

        stepHost.querySelectorAll(`.q-opt[data-q="${qid}"]`).forEach(x=>x.classList.remove("active"));
        el.classList.add("active");
      });
    });

    nextBtn.textContent = (stepIndex === quiz.length - 1) ? "عرض النتيجة" : "التالي";
  }

  function calcSkin(){
    const score = { oily:0, dry:0, combination:0, normal:0, sensitive:0 };

    for (const q of quiz){
      const picked = answers[q.id];
      const opt = q.options.find(o=>o.id===picked);
      if (!opt) continue;
      for (const [k,v] of Object.entries(opt.score||{})){
        if (score[k] == null) continue;
        score[k] += v;
      }
    }

    // لو sensitive عالي جدًا نخليه أولوية
    const entries = Object.entries(score).sort((a,b)=> b[1]-a[1]);
    return entries[0][0] || "oily";
  }

  function applySkinToSite(skinKey){
    // 1) غيّر select الحقيقي بتاع الموقع
    skinSelect.value = skinKey;

    // 2) أعِد بناء الكاتيجوري حسب البشرة
    updateCategoryOptionsBySkin(skinSelect.value);

    // 3) شيل forcedProductId لو فيه
    forcedProductId = "";

    // 4) طبّق الفلاتر
    applyFilters();
  }

  function showResult(){
    const skinKey = calcSkin();
    const nice = skinNames[skinKey] || skinKey;

    // Badge جميلة + ليبل النوع
    resultBox.innerHTML = `
      <div class="result-badge">✅ نوع بشرتك: <span>${nice}</span></div>
      <div style="margin-top:10px; color:rgba(255,255,255,.78); font-size:13px;">
        تم تطبيق نوع البشرة على الموقع تلقائيًا.
      </div>
    `;
    resultBox.classList.remove("hidden");

    // تطبيق على الموقع
    applySkinToSite(skinKey);
  }

  function resetAll(){
    stepIndex = 0;
    for (const k of Object.keys(answers)) delete answers[k];
    renderStep();
  }

  // Events
  dock.addEventListener("click", (e)=>{
    e.stopPropagation();
    openDrop();
    if (!stepHost.innerHTML.trim()) renderStep();
  });

  closeBtn.addEventListener("click", closeDrop);

  nextBtn.addEventListener("click", ()=>{
    const q = quiz[stepIndex];
    // لازم يختار
    if (!answers[q.id]){
      // لمسة UX بسيطة
      stepHost.querySelector(".q-title")?.animate(
        [{transform:"translateX(0)"},{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],
        {duration: 260}
      );
      return;
    }

    if (stepIndex === quiz.length - 1){
      showResult();
      return;
    }

    stepIndex += 1;
    renderStep();
  });

  resetBtn.addEventListener("click", resetAll);

  // اقفل لو ضغطت برا
  document.addEventListener("click", (e)=>{
    if (drop.classList.contains("hidden")) return;
    if (drop.contains(e.target) || dock.contains(e.target)) return;
    closeDrop();
  });
})();

(function initRoutineModal(){
  const dock = document.getElementById("routineDock");         // زرار البابل بتاعك
  const modal = document.getElementById("routineDrop");        // المودال
  const overlay = document.getElementById("routineOverlay");   // الخلفية
  const closeBtn = document.getElementById("routineClose");

  if (!dock || !modal || !overlay || !closeBtn) return;

  function openModal(){
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    requestAnimationFrame(()=>{
      overlay.classList.add("show");
      modal.classList.add("show");
      overlay.setAttribute("aria-hidden","false");
      modal.setAttribute("aria-hidden","false");
    });
  }

  function closeModal(){
    overlay.classList.remove("show");
    modal.classList.remove("show");
    overlay.setAttribute("aria-hidden","true");
    modal.setAttribute("aria-hidden","true");
    setTimeout(()=>{
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    }, 220);
  }

  dock.addEventListener("click", (e)=>{
    e.stopPropagation();
    openModal();
    // أول مرة بس
    if (typeof renderStep === "function") renderStep();
  });

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
})();


const routineDock = document.getElementById("routineDock");
const routineDrop = document.getElementById("routineDrop");
const routineClose = document.getElementById("routineClose");

function openRoutineDrop(){
  if (!routineDrop) return;
  routineDrop.classList.remove("hidden");
  routineDrop.classList.add("edge"); // اختياري: يلزّقها بالحافة
  requestAnimationFrame(()=> routineDrop.classList.add("show"));
}

function closeRoutineDrop(){
  if (!routineDrop) return;
  routineDrop.classList.remove("show");
  setTimeout(()=> routineDrop.classList.add("hidden"), 180);
}

routineDock?.addEventListener("click", (e)=>{
  e.stopPropagation();
  openRoutineDrop();
});

routineClose?.addEventListener("click", closeRoutineDrop);

document.addEventListener("click", (e)=>{
  if (!routineDrop || routineDrop.classList.contains("hidden")) return;
  if (routineDrop.contains(e.target) || routineDock?.contains(e.target)) return;
  closeRoutineDrop();
});


function closeRoutineClean(){
  const drop = document.getElementById("routineDrop");
  const overlay = document.getElementById("routineOverlay");

  if (!drop) return;

  drop.classList.remove("show");
  overlay?.classList.remove("show");

  setTimeout(()=>{
    drop.classList.add("hidden");
    overlay?.classList.add("hidden");
  }, 180);
  dock?.classList.remove("active");

}
document.addEventListener("click", function(e){

  const drop = document.getElementById("routineDrop");
  const dock = document.getElementById("routineDock");

  if (!drop || drop.classList.contains("hidden")) return;

  // لو الضغطه جوه الروتين → سيبه
  if (drop.contains(e.target)) return;

  // لو الضغطه على زرار الروتين نفسه → سيبه
  if (dock && dock.contains(e.target)) return;

  // غير كده → اقفل الروتين
  closeRoutineClean();

}, true); // 👈 capture phase مهم جدًا


function annotateIngredientsText(ingredientsText){
  const original = String(ingredientsText ?? "");
  if (!original.trim()) return escapeHTML(original);

  let out = escapeHTML(original);

  // نشتغل على aliases الأطول الأول عشان مايحصلش partial replacement غلط
  const items = [];
  for (const item of INGREDIENT_DICTIONARY){
    for (const a of item.aliases){
      items.push({ ...item, alias: a });
    }
  }
  items.sort((a,b) => (b.alias.length - a.alias.length));

  // Replace
  for (const it of items){
    const re = new RegExp(`\\b${escRegex(it.alias)}\\b`, "gi");

    out = out.replace(re, (m) => {
      const cls = `ing-chip ${it.className ? it.className : ""}`.trim();
      const tip = escapeHTML(it.tip || "");
      const ico = escapeHTML(it.icon || "⭐");
      // chip HTML
      return `<span class="${cls}" data-tip="${tip}"><span class="ing-ico">${ico}</span>${escapeHTML(m)}</span>`;
    });
  }

  return out;
}
(function initSmartIngredientTooltip(){
  const container = document.getElementById("panelIngredients");
  if (!container) return;

  // Tooltip واحد فقط
  const tip = document.createElement("div");
  tip.className = "smart-tip";
  container.appendChild(tip);

  let activeEl = null;

  function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

  function showFor(el){
    const text = el.getAttribute("data-tip") || "";
    if (!text) return;

    activeEl = el;
    tip.textContent = text;
    tip.classList.add("show");

    positionTip(el);
  }

  function hide(){
    activeEl = null;
    tip.classList.remove("show");
  }

  function positionTip(el){
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();

    // لازم نحسب بعد ما النص اتحط (علشان العرض الحقيقي)
    const tRect = tip.getBoundingClientRect();

    // مكان مبدئي: فوق العنصر مباشرة
    const topWanted = (eRect.top - cRect.top) - tRect.height - 10; // 10px gap
    const leftCenter = (eRect.left - cRect.left) + (eRect.width / 2);

    // نحط tooltip بحيث يتسنتر على العنصر
    let leftWanted = leftCenter - (tRect.width / 2);

    // Clamp جوه الكونتينر (padding safety)
    const pad = 8;
    leftWanted = clamp(leftWanted, pad, (cRect.width - tRect.width - pad));

    // لو فوق هيطلع برا الكونتينر من فوق (نادراً) نزّله تحت العنصر
    let topFinal = topWanted;
    if (topFinal < pad){
      topFinal = (eRect.bottom - cRect.top) + 10; // تحت العنصر
      // ولو تحت كمان مش مكفي، خليه داخل الكونتينر قدر الإمكان
      topFinal = clamp(topFinal, pad, (cRect.height - tRect.height - pad));
    }

    tip.style.left = `${leftWanted}px`;
    tip.style.top  = `${topFinal}px`;

    // السهم يبقى في نص العنصر (بس جوه tooltip)
    // نحرك السهم داخل tooltip بدقة
    const arrowX = clamp(leftCenter - leftWanted, 14, tRect.width - 14);
    tip.style.setProperty("--arrow-x", `${arrowX}px`);
    tip.style.setProperty("--arrow-y", `0px`);
    tip.style.setProperty("--arrow-left", `${arrowX}px`);
    tip.style.setProperty("--arrow-top", ``);

    // نخلي السهم يتحرك (override left:50%)
    tip.style.setProperty("--arrow", arrowX);
    tip.querySelector?.(".arrow");
  }

  // نعدل مكان السهم بدل 50%
  // (حل سريع: نستخدم style مباشر على pseudo؟ مش ممكن)
  // إذن نعمل override عن طريق inline style على ::after باستخدام CSS var:
  const style = document.createElement("style");
  style.textContent = `
    .smart-tip::after{ left: var(--arrowLeft, 50%); }
  `;
  document.head.appendChild(style);

  function setArrowLeft(px){
    tip.style.setProperty("--arrowLeft", `${px}px`);
  }

  // listeners
  container.addEventListener("mouseenter", (e) => {
    const el = e.target.closest(".ing-chip[data-tip]");
    if (!el) return;
    showFor(el);
  }, true);

  container.addEventListener("mousemove", (e) => {
    const el = e.target.closest(".ing-chip[data-tip]");
    if (!el){
      if (activeEl) hide();
      return;
    }
    if (activeEl !== el) showFor(el);
    // update position continuously (لو قريب من الحافة)
    positionTip(el);

    // تحديث السهم
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    const leftCenter = (eRect.left - cRect.left) + (eRect.width / 2);
    const leftWanted = parseFloat(tip.style.left || "0");
    const arrowX = clamp(leftCenter - leftWanted, 14, tip.getBoundingClientRect().width - 14);
    setArrowLeft(arrowX);
  }, true);

  container.addEventListener("mouseleave", () => hide(), true);

  // لو resize أو scroll: لو tooltip شغال حدّثه
  window.addEventListener("resize", () => { if (activeEl) positionTip(activeEl); });
  window.addEventListener("scroll", () => { if (activeEl) positionTip(activeEl); }, { passive:true });
})();

(function initTopRowTooltipFlip(){
  const container = document.getElementById("panelIngredients");
  if (!container) return;

  container.addEventListener("mouseover", (e) => {
    const chip = e.target.closest(".ing-chip[data-tip]");
    if (!chip) return;

    const cRect = container.getBoundingClientRect();
    const r = chip.getBoundingClientRect();

    // لو العنصر قريب من أعلى الكونتينر (يعني غالباً أول صف)
    const nearTop = (r.top - cRect.top) < 40; // عدّل 40 لو حابب

    chip.classList.toggle("tip-below", nearTop);
  }, true);
})();




