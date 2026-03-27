import { generatedProducts } from "./generated-products";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug: string;
  subcategorySlug?: string; // Alt kategori (yilbasi, sacakli, meteor, ramazan, soft-ampul, led-ampul, led)
  description: string;
  stock: number;
  featured?: boolean;
}

function sanitizeDescription(text: string): string {
  return String(text ?? "")
    .replace(/\u00A0/g, " ")
    .replace(/&NBSP;?/gi, " ")
    .replace(/:/g, "")
    .replace(/([A-Z0-9])UZUNLUK/g, "$1 UZUNLUK")
    .replace(/\bMTLED\b/g, "MT LED")
    .replace(/\s+/g, " ")
    .trim();
}

/** @deprecated Kategori yapısı için client/data/categories.ts kullanın. Geriye dönük uyumluluk için tutuldu. */
export const categories = [
  { name: "İç Mekan", slug: "ic-mekan", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", description: "Modern iç mekan aydınlatma çözümleri" },
  { name: "Dış Mekan", slug: "dis-mekan", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", description: "Dayanıklı dış mekan aydınlatma sistemleri" },
  { name: "Ampul", slug: "ampul", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800", description: "LED ampul, rustik ampul ve dekoratif ampul çeşitleri" },
  { name: "LED Ampuller", slug: "led-ampul", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800", description: "Enerji tasarruflu LED ampuller" },
  { name: "Spot & Ray", slug: "spot-ray", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", description: "Spot ve ray aydınlatma sistemleri" },
];

export const products: Product[] = generatedProducts.map((product) => ({
  ...product,
  description: sanitizeDescription(product.description),
}));

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  // "ampul" ana kategorisi ampul + LED ampul ürünlerini birlikte gösterir
  if (categorySlug === "ampul") {
    return products.filter(
      (p) =>
        p.categorySlug === "ampul" ||
        p.categorySlug === "led-ampul" ||
        p.category.toLocaleLowerCase("tr-TR").includes("ampul")
    );
  }
  const directMatch = products.filter((p) => p.categorySlug === categorySlug);
  if (directMatch.length > 0) return directMatch;
  return [];
}

/** Parent/child URL yapısına göre ürünleri getir (örn: ic-mekan/yilbasi) */
export function getProductsByPath(parent: string, child?: string): Product[] {
  // Alt kategoride ürün varsa (subcategorySlug) filtrele, yoksa ana kategori ürünlerini göster
  const parentProducts = products.filter((p) => p.categorySlug === parent);
  if (!child) return parentProducts;
  const withSub = products.filter(
    (p) => p.categorySlug === parent && p.subcategorySlug === child
  );
  return withSub.length > 0 ? withSub : parentProducts;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

