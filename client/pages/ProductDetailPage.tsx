import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { getProductBySlug, products } from "../data/products";
import { PARENT_CATEGORIES } from "../data/categories";
import { formatPrice } from "../lib/utils";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import ProductCard from "../components/ProductCard";
import Breadcrumb from "../components/Breadcrumb";
import { trackViewItem } from "../lib/analytics";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Ürün bulunamadı</h1>
        <Link to="/">
          <Button variant="outline">Ana Sayfaya Dön</Button>
        </Link>
      </div>
    );
  }

  // Benzer Ürünler - Aynı kategorideki ürünler
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  // Birlikte Alınanlar - Farklı kategorilerden tamamlayıcı ürünler (Doküman: 07-donusum-artirici)
  const frequentlyBoughtTogether = products
    .filter((p) => p.id !== product.id && p.categorySlug !== product.categorySlug)
    .slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
      });
    }
    toast.success(`${quantity} adet ${product.name} sepete eklendi`);
  };

  const images = product.images || [product.image];

  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://sencanaydinlatma.com";
  const productUrl = `${siteUrl}/urun/${product.slug}`;
  const productImage = product.images?.[0] || product.image;

  // Analytics: Ürün görüntüleme
  useEffect(() => {
    trackViewItem(product.id, product.name, product.price);
  }, [product.id, product.name, product.price]);

  return (
    <>
      <Helmet>
        <title>{product.name} - Sencan Aydınlatma</title>
        <meta name="description" content={product.description} />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${product.name} - Sencan Aydınlatma`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={productUrl} />
        <meta property="og:image" content={productImage} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.name} />
        <meta name="twitter:description" content={product.description} />
        <meta name="twitter:image" content={productImage} />
        
        {/* Product Schema (Doküman: 06-seo-performans) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            image: productImage,
            description: product.description,
            brand: {
              "@type": "Brand",
              name: "Sencan",
            },
            offers: {
              "@type": "Offer",
              url: productUrl,
              priceCurrency: "TRY",
              price: product.price.toString(),
              availability: product.stock > 0 
                ? "https://schema.org/InStock" 
                : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.5",
              reviewCount: "24",
            },
          })}
        </script>
      </Helmet>
      <div className="container-custom py-6 md:py-8">
        {/* Breadcrumb (Doküman: 06-seo-performans) */}
        <Breadcrumb
          items={(() => {
            const items: { label: string; to?: string }[] = [];
            const parentCat = PARENT_CATEGORIES.find((c) => c.slug === product.categorySlug);
            if (parentCat && product.subcategorySlug) {
              const subCat = parentCat.subcategories.find((s) => s.slug === product.subcategorySlug);
              if (subCat) {
                items.push({ label: parentCat.name, to: `/kategori/${product.categorySlug}` });
                items.push({ label: subCat.name, to: `/kategori/${product.categorySlug}/${product.subcategorySlug}` });
              }
            }
            if (items.length === 0) {
              items.push({ label: product.category, to: `/kategori/${product.categorySlug}` });
            }
            items.push({ label: product.name });
            return items;
          })()}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === idx
                        ? "border-primary"
                        : "border-transparent hover:border-muted-foreground/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} görsel ${idx + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              {product.featured && (
                <Badge className="mb-2 bg-accent text-white">Öne Çıkan</Badge>
              )}
              {/* Ürün Adı: H2, bold (Doküman: 02-renk-paleti) */}
              <h1 className="text-h2 font-bold text-foreground mb-4">
                {product.name}
              </h1>
              {/* Fiyat: Büyük, bold, accent rengi (Doküman: 04-ux-akis) */}
              <p className="text-price font-bold text-accent mb-4">
                {formatPrice(product.price)}
              </p>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <p className="text-base text-muted-foreground mb-4 leading-relaxed">{product.description}</p>
              {/* Stok Durumu: Renk kodlu (Doküman: 04-ux-akis) */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Stok Durumu:</span>
                {product.stock > 0 ? (
                  product.stock <= 5 ? (
                    <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                      ⚠️ Son {product.stock} adet kaldı!
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-700 border-green-300">
                      ✓ Stokta ({product.stock} adet)
                    </Badge>
                  )
                ) : (
                  <Badge variant="destructive">✗ Tükendi</Badge>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Adet</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button - Desktop */}
            <Button
              size="lg"
              className="w-full mb-4 hidden md:flex bg-accent hover:bg-accent/90 text-white"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Sepete Ekle
            </Button>

            {/* Trust Signals */}
            <div className="mt-6 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Ücretsiz kargo (500₺ üzeri)</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>14 gün iade garantisi</span>
              </div>
              <div className="flex items-center gap-2">
                <span>✓</span>
                <span>Güvenli ödeme</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-h3 font-bold mb-6">Benzer Ürünler</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

        {/* Birlikte Alınanlar (Doküman: 07-donusum-artirici) */}
        {frequentlyBoughtTogether.length > 0 && (
          <div className="mt-16">
            <h2 className="text-h3 font-bold mb-6">Bu Ürünü Alanlar Şunları da Aldı</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {frequentlyBoughtTogether.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky CTA - Mobil (Doküman: 04-ux-akis) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t shadow-lg">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Toplam</p>
              <p className="text-price font-bold text-accent">
                {formatPrice(product.price * quantity)}
              </p>
            </div>
            <Button
              size="lg"
              className="flex-1 bg-accent hover:bg-accent/90 text-white h-12"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Sepete Ekle
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

