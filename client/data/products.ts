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

const BASIC_BULB_IMAGE =
  "/basic-bulb.svg";

/** @deprecated Kategori yapısı için client/data/categories.ts kullanın. Geriye dönük uyumluluk için tutuldu. */
export const categories = [
  { name: "İç Mekan", slug: "ic-mekan", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800", description: "Modern iç mekan aydınlatma çözümleri" },
  { name: "Dış Mekan", slug: "dis-mekan", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800", description: "Dayanıklı dış mekan aydınlatma sistemleri" },
  { name: "Ampul", slug: "ampul", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800", description: "LED ampul, rustik ampul ve dekoratif ampul çeşitleri" },
  { name: "LED Ampuller", slug: "led-ampul", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800", description: "Enerji tasarruflu LED ampuller" },
  { name: "Spot & Ray", slug: "spot-ray", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800", description: "Spot ve ray aydınlatma sistemleri" },
];

const curatedProducts: Product[] = [
  {
    id: "1",
    name: "E27 9W Sıcak Beyaz LED Ampul",
    slug: "e27-9w-sicak-beyaz",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    category: "LED Ampuller",
    categorySlug: "led-ampul",
    description: "Enerji tasarruflu, uzun ömürlü LED ampul. Sıcak beyaz ışık (3000K).",
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Modern Avize - Altın Detaylı",
    slug: "modern-avize-altin-detayli",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "İç Mekan",
    categorySlug: "ic-mekan",
    subcategorySlug: "led-ampul",
    description: "Modern tasarım avize, altın detaylı. Yemek odası ve oturma odası için ideal.",
    stock: 15,
    featured: true,
  },
  {
    id: "3",
    name: "Bahçe LED Spot Işık",
    slug: "bahce-led-spot-isik",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Dış Mekan",
    categorySlug: "dis-mekan",
    subcategorySlug: "led",
    description: "Su geçirmez, dayanıklı bahçe spot ışığı. IP65 koruma sınıfı.",
    stock: 30,
    featured: true,
  },
  {
    id: "4",
    name: "Ray Sistem Aydınlatma Seti",
    slug: "ray-sistem-aydinlatma-seti",
    price: 599.99,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400",
    category: "Spot & Ray",
    categorySlug: "spot-ray",
    description: "3'lü ray sistem seti. Ayarlanabilir spot ışıkları ile birlikte.",
    stock: 20,
    featured: true,
  },
  {
    id: "5",
    name: "E14 5W Soğuk Beyaz LED",
    slug: "e14-5w-soguk-beyaz",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    category: "LED Ampuller",
    categorySlug: "led-ampul",
    description: "Küçük boyutlu E14 LED ampul. Soğuk beyaz ışık (6000K).",
    stock: 75,
  },
  {
    id: "6",
    name: "Tavan Armatürü - Minimal",
    slug: "tavan-armaturu-minimal",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "İç Mekan",
    categorySlug: "ic-mekan",
    subcategorySlug: "meteor",
    description: "Minimal tasarım tavan armatürü. Modern evler için ideal.",
    stock: 25,
  },
  {
    id: "7",
    name: "Yılbaşı LED Işık Seti - İç Mekan",
    slug: "yilbasi-led-isik-seti-ic",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a943?w=400",
    category: "İç Mekan",
    categorySlug: "ic-mekan",
    subcategorySlug: "yilbasi",
    description: "İç mekan için dekoratif yılbaşı LED ışık seti. Renk değiştirme özellikli.",
    stock: 40,
    featured: true,
  },
  {
    id: "8",
    name: "Ramazan Ay Yıldız Işık - Dış Mekan",
    slug: "ramazan-ay-yildiz-isik-dis",
    price: 349.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Dış Mekan",
    categorySlug: "dis-mekan",
    subcategorySlug: "ramazan",
    description: "Dış mekan Ramazan ay yıldız dekoratif aydınlatma. Su geçirmez.",
    stock: 20,
  },
  {
    id: "9",
    name: "Saçak LED Şerit - İç Mekan",
    slug: "sacak-led-serit-ic-mekan",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    category: "İç Mekan",
    categorySlug: "ic-mekan",
    subcategorySlug: "sacakli",
    description: "İç mekan saçak LED şerit aydınlatma. Mutfak ve banyo için ideal.",
    stock: 35,
  },
  {
    id: "10",
    name: "Ramazan Ay Yıldız - İç Mekan",
    slug: "ramazan-ay-yildiz-ic-mekan",
    price: 279.99,
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a943?w=400",
    category: "İç Mekan",
    categorySlug: "ic-mekan",
    subcategorySlug: "ramazan",
    description: "İç mekan Ramazan ay yıldız dekoratif ışık seti.",
    stock: 28,
  },
  {
    id: "11",
    name: "Soft Ampul Seti - 3'lü",
    slug: "soft-ampul-seti-3lu",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400",
    category: "İç Mekan",
    categorySlug: "ic-mekan",
    subcategorySlug: "soft-ampul",
    description: "3'lü soft ampul seti. Sıcak ışık, dekoratif kullanım.",
    stock: 45,
  },
  {
    id: "12",
    name: "Yılbaşı Işık Seti - Dış Mekan",
    slug: "yilbasi-isik-seti-dis-mekan",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1512389142860-9c449e58a943?w=400",
    category: "Dış Mekan",
    categorySlug: "dis-mekan",
    subcategorySlug: "yilbasi",
    description: "Dış mekan yılbaşı LED ışık seti. IP44 su geçirmez.",
    stock: 22,
  },
  {
    id: "13",
    name: "Saçak LED - Dış Mekan",
    slug: "sacak-led-dis-mekan",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    category: "Dış Mekan",
    categorySlug: "dis-mekan",
    subcategorySlug: "sacakli",
    description: "Dış mekan saçak LED aydınlatma. Bina dış cephe için.",
    stock: 18,
  },
];

export const products: Product[] = [...curatedProducts, ...generatedProducts].map(
  (product) => ({
    ...product,
    image: BASIC_BULB_IMAGE,
    images: undefined,
  })
);

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

