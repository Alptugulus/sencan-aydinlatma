/**
 * Kategori yapılandırması - SEO uyumlu URL yapısı için
 * URL formatı: /kategori/:parent/:child?
 */

export interface Subcategory {
  label: string;
  slug: string; // URL'de kullanılacak (örn: yilbasi)
  name: string; // Görüntüleme adı (örn: Yılbaşı)
  description: string;
}

export interface ParentCategory {
  label: string;
  slug: string; // ic-mekan, dis-mekan
  name: string;
  description: string;
  subcategories: Subcategory[];
}

export const PARENT_CATEGORIES: ParentCategory[] = [
  {
    label: "İç Mekan",
    slug: "ic-mekan",
    name: "İç Mekan",
    description: "Modern iç mekan aydınlatma çözümleri",
    subcategories: [
      { label: "Yılbaşı", slug: "yilbasi", name: "Yılbaşı Işıkları", description: "İç mekan yılbaşı ışıkları ve dekoratif setler" },
      { label: "Saçaklı", slug: "sacakli", name: "Saçak LED", description: "İç mekan saçak LED aydınlatma sistemleri" },
      { label: "Meteor", slug: "meteor", name: "Meteor LED", description: "İç mekan meteor LED ışık sistemleri" },
      { label: "Ramazan", slug: "ramazan", name: "Ramazan Aydınlatma", description: "İç mekan Ramazan ay yıldız ışık setleri" },
      { label: "Soft Ampul", slug: "soft-ampul", name: "Soft Ampul", description: "İç mekan soft ampul çeşitleri" },
      { label: "LED Ampul", slug: "led-ampul", name: "LED Ampul", description: "İç mekan LED ampul çeşitleri" },
    ],
  },
  {
    label: "Dış Mekan",
    slug: "dis-mekan",
    name: "Dış Mekan",
    description: "Dayanıklı dış mekan aydınlatma sistemleri",
    subcategories: [
      { label: "Yılbaşı", slug: "yilbasi", name: "Yılbaşı Işıkları", description: "Dış mekan yılbaşı ışıkları" },
      { label: "Ramazan", slug: "ramazan", name: "Ramazan Aydınlatma", description: "Dış mekan Ramazan ay yıldız aydınlatma" },
      { label: "Saçaklı", slug: "sacakli", name: "Saçak LED", description: "Dış mekan saçak LED aydınlatma" },
      { label: "LED", slug: "led", name: "LED Aydınlatma", description: "Dış mekan LED aydınlatma ürünleri" },
    ],
  },
];

/** Tek seviyeli kategoriler (ampul, led-ampul, spot-ray) */
export const FLAT_CATEGORIES = [
  { slug: "ampul", name: "Ampul", description: "LED ampul, rustik ampul ve dekoratif ampul çeşitleri", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800" },
  { slug: "led-ampul", name: "LED Ampuller", description: "Enerji tasarruflu LED ampuller", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800" },
  { slug: "spot-ray", name: "Spot & Ray", description: "Spot ve ray aydınlatma sistemleri", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800" },
] as const;

/** Ana sayfa CategoryGrid için kategoriler */
export const MAIN_CATEGORIES_FOR_GRID = [
  { slug: "ampul", name: "Ampul", description: "LED ampul, rustik ampul ve dekoratif ampul çeşitleri", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800" },
  { slug: "ic-mekan", name: "İç Mekan", description: "Modern iç mekan aydınlatma çözümleri", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800" },
  { slug: "dis-mekan", name: "Dış Mekan", description: "Dayanıklı dış mekan aydınlatma sistemleri", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" },
];

/** Kategori bilgisini path'den çözümle */
export function getCategoryByPath(parent: string | undefined, child: string | undefined): {
  name: string;
  description: string;
  fullSlug: string;
  breadcrumb: { label: string; path?: string }[];
  isSubcategory: boolean;
} | null {
  // Parent + Child: /kategori/ic-mekan/yilbasi
  if (parent && child) {
    const parentCat = PARENT_CATEGORIES.find((c) => c.slug === parent);
    if (!parentCat) return null;
    const subCat = parentCat.subcategories.find((s) => s.slug === child);
    if (!subCat) return null;
    return {
      name: `${parentCat.name} ${subCat.name}`,
      description: subCat.description,
      fullSlug: `${parent}/${child}`,
      breadcrumb: [
        { label: parentCat.name, path: `/kategori/${parent}` },
        { label: subCat.name },
      ],
      isSubcategory: true,
    };
  }

  // Sadece Parent: /kategori/ic-mekan
  if (parent && !child) {
    const parentCat = PARENT_CATEGORIES.find((c) => c.slug === parent);
    if (!parentCat) return null;
    return {
      name: parentCat.name,
      description: parentCat.description,
      fullSlug: parent,
      breadcrumb: [{ label: parentCat.name }],
      isSubcategory: false,
    };
  }

  return null;
}

/** Tek seviyeli kategori kontrolü */
export function getFlatCategoryBySlug(slug: string) {
  return FLAT_CATEGORIES.find((c) => c.slug === slug) ?? null;
}
