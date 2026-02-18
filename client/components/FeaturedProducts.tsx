import ProductCard from "./ProductCard";
import { getFeaturedProducts } from "../data/products";

export default function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-12 md:py-16 lg:py-20 bg-muted/30">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h2 className="text-h2 font-bold text-foreground">
            Öne Çıkan Ürünler
          </h2>
          <p className="mt-2 text-base text-muted-foreground">
            En popüler aydınlatma çözümlerimiz
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

