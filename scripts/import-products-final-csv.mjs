import fs from "node:fs";
import path from "node:path";

const inputPath = path.resolve(process.cwd(), "sencan-products-final.csv");
const outputPath = path.resolve(process.cwd(), "client/data/generated-products.ts");

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

function slugify(input) {
  return String(input)
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapCategory(categoriesText) {
  const ids = String(categoriesText)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (ids.includes("154")) return { category: "İç Mekan", categorySlug: "ic-mekan", subcategorySlug: "yilbasi" };
  if (ids.includes("156")) return { category: "Dış Mekan", categorySlug: "dis-mekan", subcategorySlug: "yilbasi" };
  if (ids.includes("155")) return { category: "İç Mekan", categorySlug: "ic-mekan", subcategorySlug: "yilbasi" };
  if (ids.includes("65")) return { category: "İç Mekan", categorySlug: "ic-mekan" };
  if (ids.includes("70")) return { category: "Dış Mekan", categorySlug: "dis-mekan" };
  if (ids.includes("185") || ids.includes("186")) return { category: "Dış Mekan", categorySlug: "dis-mekan", subcategorySlug: "led" };
  if (ids.includes("77")) return { category: "Ampul", categorySlug: "ampul" };
  return { category: "Ampul", categorySlug: "ampul" };
}

function normalizePrice(rawPrice) {
  const n = Number(String(rawPrice).replace(",", "."));
  if (!Number.isFinite(n)) return 0;
  if (n > 1000) return Number((n / 10000).toFixed(2));
  return Number(n.toFixed(2));
}

const raw = fs.readFileSync(inputPath, "utf8").replace(/^\uFEFF/, "");
const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
const header = parseCsvLine(lines[0]);
const idx = Object.fromEntries(header.map((h, i) => [h, i]));

const products = lines.slice(1).map((line) => {
  const cols = parseCsvLine(line);
  const id = String(cols[idx["Product ID"]] ?? "");
  const name = String(cols[idx["Name"]] ?? "").trim();
  const model = String(cols[idx["Model"]] ?? "").trim();
  const description = String(cols[idx["Description"]] ?? "").trim();
  const price = normalizePrice(cols[idx["Price"]]);
  const categories = String(cols[idx["Categories"]] ?? "");
  const category = mapCategory(categories);
  const slugBase = slugify(`${model || name}-${id}`);

  return {
    id,
    name,
    slug: slugBase || `urun-${id}`,
    price,
    image: "/basic-bulb.svg",
    ...category,
    description,
    stock: 50,
  };
});

const content = `// Auto-generated from sencan-products-final.csv\nexport const generatedProducts = ${JSON.stringify(products, null, 2)};\n`;
fs.writeFileSync(outputPath, content, "utf8");
console.log(`Generated ${products.length} products -> ${outputPath}`);
