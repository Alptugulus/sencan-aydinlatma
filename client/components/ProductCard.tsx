import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Product } from "../data/products";
import { formatPrice } from "../lib/utils";
import { useCart } from "../hooks/useCart";
import { toast } from "sonner";
import { trackAddToCart } from "../lib/analytics";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
    toast.success(`${product.name} sepete eklendi`);
    // Analytics tracking
    trackAddToCart(product.id, product.name, product.price);
  };

  return (
    <Link 
      to={`/urun/${product.slug}`}
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
    >
      <Card className="group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border border-border">
        {/* Görsel - %80 alan kaplar, hover'da zoom (Doküman: 04-ux-akis) */}
        <div className="relative aspect-square overflow-hidden bg-muted rounded-t-lg">
          <img
            src={product.image}
            alt={`${product.name} - ${product.description}`}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            width="400"
            height="400"
          />
          {product.featured && (
            <Badge className="absolute top-2 right-2 bg-accent text-white">Öne Çıkan</Badge>
          )}
        </div>
        <CardContent className="flex-1 p-4">
          {/* Ürün isimleri H2 (Doküman: 02-renk-paleti) */}
          <h3 className="text-h5 font-semibold text-foreground mb-2 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>
          <div className="flex items-center justify-between mb-3">
            {/* Fiyat: Büyük, bold, accent rengi (Doküman: 02-renk-paleti) */}
            <span className="text-price font-bold text-accent">
              {formatPrice(product.price)}
            </span>
            {/* Stok durumu: Renk kodlu (Doküman: 04-ux-akis) */}
            {product.stock > 0 ? (
              <span className="text-xs font-medium text-green-600">
                ✓ Stokta
              </span>
            ) : (
              <span className="text-xs font-medium text-red-600">✗ Tükendi</span>
            )}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          {/* Sepete Ekle: Belirgin, accent rengi (Doküman: 04-ux-akis) */}
          <Button
            className="w-full bg-accent hover:bg-accent/90 text-white font-medium"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            aria-label={`${product.name} sepete ekle`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" aria-hidden="true" />
            Sepete Ekle
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

