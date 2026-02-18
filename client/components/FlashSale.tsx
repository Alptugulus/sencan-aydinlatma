import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(timer);
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Flash sale ürünleri (örnek)
  const flashSaleProducts = products.filter((p) => p.featured).slice(0, 4);

  if (flashSaleProducts.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-amber-50 to-orange-50 border-y">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Zap className="h-6 w-6 text-amber-600" />
            <h2 className="text-h2 font-bold text-foreground">⚡ FLASH SALE</h2>
          </div>
          
          {/* Gerisayım Timer (Doküman: 07-donusum-artirici) */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex items-center gap-2 bg-white rounded-lg px-4 py-2 shadow-md">
              <Clock className="h-5 w-5 text-amber-600" />
              <span className="text-sm font-medium text-muted-foreground">Kalan Süre:</span>
              <div className="flex items-center gap-1 font-mono font-bold text-lg">
                <span className="bg-amber-600 text-white px-2 py-1 rounded">
                  {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-amber-600">:</span>
                <span className="bg-amber-600 text-white px-2 py-1 rounded">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-amber-600">:</span>
                <span className="bg-amber-600 text-white px-2 py-1 rounded">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-lg font-semibold text-amber-700">
            %30 İndirim - Sınırlı Süre!
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {flashSaleProducts.map((product) => (
            <div key={product.id} className="relative">
              <Badge className="absolute top-2 left-2 z-10 bg-red-600 text-white animate-pulse">
                %30 İNDİRİM
              </Badge>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link to="/kategori/led-ampul">
            <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
              Tüm Fırsatları Gör
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

