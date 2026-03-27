import fs from "node:fs";
import path from "node:path";
import xlsx from "xlsx";

const inputPath = path.resolve(process.cwd(), "sencan-products.xlsx");
const outputPath = path.resolve(process.cwd(), "sencan-products-final.csv");

const REQUIRED_COLUMNS = [
  "Product ID",
  "Name",
  "Model",
  "Description",
  "Price",
  "Tax Class",
  "Categories",
];

function normalizeSpaces(text) {
  return String(text ?? "")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function toUpperNoDottedI(text) {
  return normalizeSpaces(text).toUpperCase().replace(/İ/g, "I");
}

function fixWordSpacingAndRemoveColon(text) {
  return normalizeSpaces(text)
    .replace(/\u00A0/g, " ")
    .replace(/&NBSP;?/gi, " ")
    .replace(/:/g, "")
    .replace(/([A-Z0-9])UZUNLUK/g, "$1 UZUNLUK")
    .replace(/\b(SNC-[A-Z0-9/-]+)\s*UZUNLUK\b/g, "$1 UZUNLUK")
    .replace(/(SNC-\d+)([A-Z])/g, "$1 $2")
    .replace(/(SNC-[A-Z0-9/-]+)([A-Z])/g, "$1 $2")
    .replace(/(\d)\s*MT(?=[A-Z])/g, "$1 MT ")
    .replace(/\bMTLED\b/g, "MT LED")
    .replace(/\bLEDHAREKET\b/g, "LED HAREKET")
    .replace(/\bKABLOSEFFAF\b/g, "KABLO SEFFAF")
    .replace(/\bANIMASYONLUKABLO\b/g, "ANIMASYONLU KABLO")
    .replace(/\bTOPHAREKET\b/g, "TOP HAREKET")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeNumericTypos(text) {
  return text.replace(/(?<=\d)[Oo](?=\d)/g, "0");
}

function extractSncCode(row) {
  const sources = [row.Model, row.Name, row.Description];
  for (const source of sources) {
    const fixed = normalizeNumericTypos(normalizeSpaces(source).toUpperCase());
    const m = fixed.match(/SNC\s*-\s*([A-Z0-9]+(?:[/-][A-Z0-9]+)*)/);
    if (m) return `SNC-${m[1]}`.replace(/([0-9])O(?=[0-9/-]|$)/g, "$10");
    const m2 = fixed.match(/SNC([A-Z0-9]+(?:[/-][A-Z0-9]+)*)/);
    if (m2) return `SNC-${m2[1]}`.replace(/([0-9])O(?=[0-9/-]|$)/g, "$10");
  }
  return `SNC-${normalizeSpaces(row["Product ID"] || "0000")}`;
}

function parseCategoryIds(categories) {
  return String(categories ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function pickProductType(name, description, categories) {
  const ids = parseCategoryIds(categories);
  const text = `${name} ${description}`.toLocaleLowerCase("tr-TR");

  if (ids.includes("77")) return "SENCAN TRAFO";
  if (ids.includes("185") || ids.includes("186")) return "SENCAN SOLAR BAHCE AYDINLATMASI";
  if (ids.includes("155")) return "SENCAN PILLI YILBASI LEDI";
  if (ids.includes("156")) return "SENCAN DIS MEKAN YILBASI LEDI";
  if (ids.includes("154")) return "SENCAN IC MEKAN YILBASI LEDI";
  if (ids.includes("70")) return "SENCAN DIS MEKAN AYDINLATMA";
  if (ids.includes("65")) return "SENCAN IC MEKAN AYDINLATMA";

  if (text.includes("trafo")) return "SENCAN TRAFO";
  if (text.includes("solar")) return "SENCAN SOLAR BAHCE AYDINLATMASI";
  if (text.includes("yılbaşı")) return "SENCAN YILBASI LEDI";
  if (text.includes("filament") || text.includes("ampul")) return "SENCAN LED FILAMENT RUSTIK AMPUL";
  if (text.includes("spot") || text.includes("ray")) return "SENCAN SPOT RAY AYDINLATMA";

  return "SENCAN LED AYDINLATMA";
}

function normalizeModel(row) {
  return extractSncCode(row);
}

function cleanDescription(row) {
  const raw = normalizeNumericTypos(normalizeSpaces(row.Description));
  const noSalesText = raw
    .replace(/bal camlı filament serimiz.*$/i, "")
    .replace(/bu filament led serimiz.*$/i, "")
    .replace(/geçmişin.*$/i, "")
    .replace(/keyifli.*$/i, "")
    .replace(/en iyi alternatif.*$/i, "")
    .replace(/m\s*2 lü.*$/i, "")
    .trim();

  const text = noSalesText
    .replace(/peŞeffaf/gi, "Şeffaf")
    .replace(/IlıK|ılık|ILIK/gi, "Ilık")
    .replace(/(\d+)\s*W/gi, "$1W")
    .replace(/(\d+)\s*lm/gi, "$1 lm")
    .replace(/(\d{3,4})\s*K/gi, "$1K")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\.\s*/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const voltage = text.match(/\b\d{2,3}\s*-\s*\d{2,3}V\b/i)?.[0] ?? text.match(/\b\d{2,3}V\b/i)?.[0] ?? "";
  const watt = text.match(/\b\d{1,3}W\b/i)?.[0] ?? "";
  const lumen = text.match(/\b\d{2,5}\s*lm\b/i)?.[0] ?? "";
  const base = text.match(/\b(E14|E27|GU10|G9|MR16)\b/i)?.[0] ?? "";
  const glass =
    text.match(/\b(Şeffaf Cam|Bal Cam|Opal Cam|Buzlu Cam|Soft Cam)\b/i)?.[0] ??
    text.match(/\b(Şeffaf|Bal|Opal|Buzlu)\s*Cam\b/i)?.[0] ??
    "";
  const kelvins = [...text.matchAll(/\b\d{3,4}K\b/gi)].map((m) => m[0]);
  const kelvinUnique = [...new Set(kelvins)];
  const colorTypeMatch = text.match(/\b(Gün Işığı|Ilık Beyaz|Beyaz Işık|Beyaz|Amber)\b/i)?.[0] ?? "";
  const kelvinPart =
    kelvinUnique.length > 0
      ? `${kelvinUnique.join(", ")}${colorTypeMatch ? ` ${colorTypeMatch}` : ""}`
      : colorTypeMatch;

  const parts = [voltage, watt, lumen, base, glass, kelvinPart]
    .map((p) => normalizeSpaces(p))
    .filter(Boolean);

  const finalText =
    parts.length === 0 ? normalizeSpaces(text).replace(/,/g, " | ") : parts.join(" | ");
  return fixWordSpacingAndRemoveColon(toUpperNoDottedI(finalText));
}

function escapeCsv(value) {
  const text = String(value ?? "");
  if (text.includes(",") || text.includes('"') || text.includes("\n")) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

const wb = xlsx.readFile(inputPath);
const ws = wb.Sheets[wb.SheetNames[0]];
const rows = xlsx.utils.sheet_to_json(ws, { defval: "", raw: false });

for (const col of REQUIRED_COLUMNS) {
  if (!(col in (rows[0] ?? {}))) {
    throw new Error(`Eksik kolon: ${col}`);
  }
}

const finalRows = rows.map((row) => {
  const snc = normalizeModel(row);
  const productType = pickProductType(row.Name, row.Description, row.Categories);
  const cleanName = fixWordSpacingAndRemoveColon(toUpperNoDottedI(`${productType} ${snc}`));
  const cleanModel = toUpperNoDottedI(normalizeModel(row)).replace(/:/g, "");
  const cleanDesc = cleanDescription(row);

  return {
    "Product ID": String(row["Product ID"]),
    Name: cleanName,
    Model: cleanModel,
    Description: cleanDesc,
    Price: String(row.Price),
    "Tax Class": String(row["Tax Class"]),
    Categories: String(row.Categories),
  };
});

const header = REQUIRED_COLUMNS.join(",");
const body = finalRows
  .map((row) => REQUIRED_COLUMNS.map((c) => escapeCsv(row[c])).join(","))
  .join("\n");

fs.writeFileSync(outputPath, `${header}\n${body}\n`, "utf8");

// Validation checks requested by user
const categorySame = rows.every(
  (r, i) => String(r.Categories) === String(finalRows[i].Categories),
);
const idOrderSame = rows.every(
  (r, i) => String(r["Product ID"]) === String(finalRows[i]["Product ID"]),
);
const allNameHasSnc = finalRows.every((r) => /SNC-\S+/.test(r.Name));
const modelClean = finalRows.every((r) => /^SNC-[A-Z0-9]+(?:[/-][A-Z0-9]+)*$/.test(r.Model));
const descOneLine = finalRows.every((r) => !/[\r\n]/.test(r.Description));

console.log(`Processed rows: ${finalRows.length}`);
console.log(`Output: ${outputPath}`);
console.log(
  JSON.stringify(
    { categorySame, idOrderSame, allNameHasSnc, modelClean, descOneLine },
    null,
    2,
  ),
);
