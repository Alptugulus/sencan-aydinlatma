import { useState, useMemo } from "react";
import { useParams, useSearchParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Filter, Package } from "lucide-react";
import { getProductsByCategory, getProductsByPath } from "../data/products";
import { getCategoryByPath, getFlatCategoryBySlug, PARENT_CATEGORIES } from "../data/categories";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import ProductFilters, { FilterState } from "../components/ProductFilters";
import { Button } from "../components/ui/button";
import EmptyState from "../components/EmptyState";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../components/ui/drawer";

const SITE_NAME = "Sencan Aydınlatma";
const SITE_URL = "https://sencanaydinlatma.com";

export default function ProductsPage() {
  const { parent, child, slug } = useParams<{ parent?: string; child?: string; slug?: string }>();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q")?.trim() || "";

  // URL'den kategori bilgisini çözümle
  const categoryInfo = useMemo(() => {
    // /kategori/ic-mekan/yilbasi veya /kategori/ic-mekan
    if (parent) {
      return getCategoryByPath(parent, child ?? undefined);
    }
    // /kategori/ampul, /kategori/led-ampul, /kategori/spot-ray veya /kategori/ic-mekan, /kategori/dis-mekan
    if (slug) {
      const flat = getFlatCategoryBySlug(slug);
      if (flat) {
        return {
          name: flat.name,
          description: flat.description,
          fullSlug: flat.slug,
          breadcrumb: [{ label: flat.name }],
          isSubcategory: false,
        };
      }
      // ic-mekan, dis-mekan tek segment olarak geldiyse parent olarak işle
      const parentCat = PARENT_CATEGORIES.find((c) => c.slug === slug);
      if (parentCat) {
        return {
          name: parentCat.name,
          description: parentCat.description,
          fullSlug: parentCat.slug,
          breadcrumb: [{ label: parentCat.name }],
          isSubcategory: false,
        };
      }
    }
    return null;
  }, [parent, child, slug]);

  // Ürünleri getir
  const allProducts = useMemo(() => {
    if (parent) {
      return getProductsByPath(parent, child);
    }
    if (slug) {
      return getProductsByCategory(slug);
    }
    return [];
  }, [parent, child, slug]);

  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 10000,
    inStock: null,
    sortBy: "newest",
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Arama sorgusu (SearchBar'dan yönlendirme)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    filtered = filtered.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.inStock !== null) {
      filtered = filtered.filter((p) =>
        filters.inStock ? p.stock > 0 : p.stock === 0
      );
    }

    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "popular":
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [allProducts, filters, searchQuery]);

  // Eski URL formatından yeni formata yönlendirme (SEO 301)
  const oldToNewRedirect = useMemo(() => {
    if (!slug || parent) return null;
    const mapping: Record<string, string> = {
      "ic-mekan-yilbasi": "/kategori/ic-mekan/yilbasi",
      "ic-mekan-sacakli": "/kategori/ic-mekan/sacakli",
      "ic-mekan-meteor": "/kategori/ic-mekan/meteor",
      "ic-mekan-ramazan": "/kategori/ic-mekan/ramazan",
      "ic-mekan-soft-ampul": "/kategori/ic-mekan/soft-ampul",
      "ic-mekan-led-ampul": "/kategori/ic-mekan/led-ampul",
      "dis-mekan-yilbasi": "/kategori/dis-mekan/yilbasi",
      "dis-mekan-ramazan": "/kategori/dis-mekan/ramazan",
      "dis-mekan-sacakli": "/kategori/dis-mekan/sacakli",
      "dis-mekan-led": "/kategori/dis-mekan/led",
    };
    return mapping[slug] ?? null;
  }, [slug, parent]);

  if (oldToNewRedirect) {
    return <Navigate to={oldToNewRedirect} replace />;
  }

  if (!categoryInfo) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Kategori bulunamadı</h1>
        <Link to="/">
          <button className="text-primary hover:underline">Ana Sayfaya Dön</button>
        </Link>
      </div>
    );
  }

  const canonicalUrl = parent
    ? `${SITE_URL}/kategori/${parent}${child ? `/${child}` : ""}`
    : `${SITE_URL}/kategori/${slug}`;

  const pageTitle = `${categoryInfo.name} | ${SITE_NAME}`;
  const metaDescription = `${categoryInfo.description} - ${categoryInfo.name} kategorisindeki tüm ürünler. Karaköy LED ampul, saçak LED, meteor LED, yılbaşı ışıkları ve Ramazan aydınlatma ürünleri.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <Breadcrumb
          items={categoryInfo.breadcrumb.map((b) => ({
            label: b.label,
            ...(b.path && { to: b.path }),
          }))}
        />

        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-h2 font-bold text-foreground mb-2">
              {categoryInfo.name}
              {searchQuery && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  — &quot;{searchQuery}&quot; araması
                </span>
              )}
            </h1>
            <p className="text-base text-muted-foreground">
              {searchQuery ? `${categoryInfo.description} Arama sonuçları.` : categoryInfo.description}
            </p>
          </div>

          <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
            <DrawerTrigger asChild className="lg:hidden">
              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                Filtreler
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filtreler</DrawerTitle>
              </DrawerHeader>
              <div className="p-4">
                <ProductFilters
                  onFilterChange={setFilters}
                  onClose={() => setFilterDrawerOpen(false)}
                  isMobile
                />
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Alt kategori linkleri - parent kategori sayfasında (İç Mekan veya Dış Mekan) */}
        {!child && (parent ?? slug) && ["ic-mekan", "dis-mekan"].includes(parent ?? slug ?? "") && (
          <div className="mb-8">
            <h2 className="text-sm font-medium text-muted-foreground mb-3">Alt Kategoriler</h2>
            <div className="flex flex-wrap gap-2">
              {PARENT_CATEGORIES.find((c) => c.slug === (parent ?? slug))?.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  to={`/kategori/${parent ?? slug}/${sub.slug}`}
                  className="px-4 py-2 rounded-lg border border-border bg-white hover:bg-muted hover:border-primary/30 text-sm font-medium transition-colors"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="hidden lg:block">
            <ProductFilters onFilterChange={setFilters} />
          </div>

          <div className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  {filteredProducts.length} ürün bulundu
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <EmptyState
                icon={<Package className="h-12 w-12" />}
                title="Ürün bulunamadı"
                description="Filtre kriterlerinize uygun ürün bulunamadı. Filtreleri temizleyip tekrar deneyin."
                action={{
                  label: "Filtreleri Temizle",
                  onClick: () =>
                    setFilters({
                      minPrice: 0,
                      maxPrice: 10000,
                      inStock: null,
                      sortBy: "newest",
                    }),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
