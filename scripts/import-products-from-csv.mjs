import fs from "node:fs";
import path from "node:path";

const inputPath =
  process.argv[2] || "/Users/sahabt/Downloads/sencan_full_enhanced_utf8.csv";
const outputPath = path.resolve(
  process.cwd(),
  "client/data/generated-products.ts",
);
const BASIC_BULB_IMAGE =
  "/basic-bulb.svg";

function parseCsvLine(line) {
  const out = [];
  let cur = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === "," && !inQuotes) {
      out.push(cur);
      cur = "";
    } else {
      cur += ch;
    }
  }
  out.push(cur);
  return out;
}

function sanitizeText(text) {
  return (text || "").replace(/\s+/g, " ").trim();
}

function normalizeForMatch(text) {
  return sanitizeText(text)
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c");
}

function includesAny(text, keywords) {
  return keywords.some((kw) => text.includes(kw));
}

const FORCED_IC_MEKAN_RAMAZAN_MODELS = new Set([
  "SNC-208",
  "SNC-615",
  "SNC-610",
  "SNC-610-1",
  "SNC-614",
  "SNC-614-1",
  "SNC-615-1",
  "SNC-709-1",
  "SNC-709-2",
  "SNC-709-3",
  "SNC-709-4",
  "SNC-709-5",
  "SNC-710",
  "SNC-710-1",
  "SNC-710-2",
  "SNC-710-3",
  "SNC-710-4",
  "SNC-710-5",
]);

function normalizeModelCode(model) {
  const base = sanitizeText(model).toUpperCase().replace(/\s+/g, "");
  if (base.startsWith("SNC-")) {
    // Bazı satırlarda 0 yerine O harfi yazılmış (örn: SNC-61O-1)
    return base.replace(/O/g, "0");
  }
  return base;
}

function detectForcedCategoryByModel(modelText) {
  const normalized = normalizeModelCode(modelText);
  if (FORCED_IC_MEKAN_RAMAZAN_MODELS.has(normalized)) {
    return {
      category: "İç Mekan",
      categorySlug: "ic-mekan",
      subcategorySlug: "ramazan",
    };
  }
  return null;
}

function detectCategoryAndSubcategory(sourceText) {
  const text = normalizeForMatch(sourceText);

  const isSpotRay = includesAny(text, ["spot", "ray"]);
  if (isSpotRay) {
    return {
      category: "Spot & Ray",
      categorySlug: "spot-ray",
      subcategorySlug: undefined,
    };
  }

  const isOutdoor = includesAny(text, [
    "dis mekan",
    "dıs mekan",
    "bahce",
    "cephe",
    "ip65",
    "ip67",
    "su gecirmez",
    "outdoor",
  ]);

  const isIndoor = includesAny(text, [
    "ic mekan",
    "iç mekan",
    "avize",
    "armatur",
    "tavan",
    "salon",
    "oturma",
    "yatak",
  ]);

  if (isOutdoor) {
    let subcategorySlug;
    if (includesAny(text, ["yilbasi", "yilbasi", "noel"])) subcategorySlug = "yilbasi";
    else if (includesAny(text, ["ramazan", "ay yildiz"])) subcategorySlug = "ramazan";
    else if (includesAny(text, ["sacak", "sacakli"])) subcategorySlug = "sacakli";
    else if (includesAny(text, ["led"])) subcategorySlug = "led";

    return {
      category: "Dış Mekan",
      categorySlug: "dis-mekan",
      subcategorySlug,
    };
  }

  if (isIndoor) {
    let subcategorySlug;
    if (includesAny(text, ["yilbasi", "noel"])) subcategorySlug = "yilbasi";
    else if (includesAny(text, ["ramazan", "ay yildiz"])) subcategorySlug = "ramazan";
    else if (includesAny(text, ["sacak", "sacakli"])) subcategorySlug = "sacakli";
    else if (includesAny(text, ["meteor"])) subcategorySlug = "meteor";
    else if (includesAny(text, ["soft"])) subcategorySlug = "soft-ampul";
    else if (includesAny(text, ["ampul", "filament", "led", "e14", "e27"])) subcategorySlug = "led-ampul";

    return {
      category: "İç Mekan",
      categorySlug: "ic-mekan",
      subcategorySlug,
    };
  }

  if (includesAny(text, ["led ampul", "filament", "ampul", "e14", "e27", "a60", "g45"])) {
    return {
      category: "LED Ampuller",
      categorySlug: "led-ampul",
      subcategorySlug: undefined,
    };
  }

  return {
    category: "Ampul",
    categorySlug: "ampul",
    subcategorySlug: undefined,
  };
}

function toProduct(row) {
  const [productId, name, model, priceRaw, description, slug] = row;
  const price = Number.parseFloat((priceRaw || "0").replace(",", "."));
  const cleanName = sanitizeText(name);
  const cleanDesc = sanitizeText(description);
  const modelText = sanitizeText(model);
  const sourceText = `${cleanName} ${cleanDesc} ${modelText}`;
  const forced = detectForcedCategoryByModel(modelText);
  const detected = forced ?? detectCategoryAndSubcategory(sourceText);

  return {
    id: String(productId || cleanName || slug),
    name: cleanName || "Ürün",
    slug: sanitizeText(slug) || `urun-${productId}`,
    price: Number.isFinite(price) ? price : 0,
    image: BASIC_BULB_IMAGE,
    category: detected.category,
    categorySlug: detected.categorySlug,
    ...(detected.subcategorySlug ? { subcategorySlug: detected.subcategorySlug } : {}),
    description: modelText ? `Model: ${modelText}. ${cleanDesc}` : cleanDesc,
    stock: 50,
  };
}

const raw = fs.readFileSync(inputPath, "utf8");
const lines = raw
  .replace(/^\uFEFF/, "")
  .split(/\r?\n/)
  .filter((line) => line.trim().length > 0);

if (lines.length < 2) {
  throw new Error("CSV satırları bulunamadı.");
}

const rows = lines.slice(1).map(parseCsvLine).filter((r) => r.length >= 6);
const products = rows.map(toProduct);

const content = `// Auto-generated from CSV. Do not edit manually.
export const generatedProducts = ${JSON.stringify(products, null, 2)};\n`;

fs.writeFileSync(outputPath, content, "utf8");
console.log(`Generated ${products.length} products -> ${outputPath}`);
