import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { useCart } from "../hooks/useCart";
import { formatPrice } from "../lib/utils";
import { toast } from "sonner";
import CouponCode from "../components/CouponCode";
import EmptyState from "../components/EmptyState";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  
  const subtotal = getTotal();
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal - discountAmount;
  const freeShippingThreshold = 500;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  
  const handleCouponApply = (code: string) => {
    setCouponCode(code);
    // Kupon koduna göre indirim yüzdesi
    const couponDiscounts: Record<string, number> = {
      WELCOME10: 10,
      SENCAN20: 20,
      FLASH30: 30,
    };
    setDiscount(couponDiscounts[code] || 0);
    if (code) {
      toast.success(`Kupon uygulandı! %${couponDiscounts[code]} indirim`);
    } else {
      toast.info("Kupon kaldırıldı");
    }
  };

  if (items.length === 0) {
    return (
      <>
        <Helmet>
          <title>Sepet - Sencan Aydınlatma</title>
        </Helmet>
        <div className="container-custom py-12 md:py-16">
          <EmptyState
            icon={<ShoppingBag className="h-16 w-16" />}
            title="Sepetiniz boş"
            description="Sepetinize ürün eklemek için ürün sayfalarını ziyaret edin."
            action={{
              label: "Alışverişe Başla",
              onClick: () => window.location.href = "/",
            }}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Sepet - Sencan Aydınlatma</title>
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Sepetim</h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 rounded-lg border bg-card p-4"
              >
                <Link to={`/urun/${item.slug}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-md object-cover"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/urun/${item.slug}`}>
                    <h3 className="font-semibold text-foreground hover:text-primary mb-1">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatPrice(item.price)}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          if (item.quantity > 1) {
                            updateQuantity(item.id, item.quantity - 1);
                          } else {
                            removeItem(item.id);
                            toast.success("Ürün sepetten çıkarıldı");
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-600 hover:text-red-700"
                      onClick={() => {
                        removeItem(item.id);
                        toast.success("Ürün sepetten çıkarıldı");
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-accent text-lg">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={() => {
                clearCart();
                toast.success("Sepet temizlendi");
              }}
              className="w-full"
            >
              Sepeti Temizle
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-lg border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
              <Separator className="my-4" />
              
              {/* Kupon Kodu (Doküman: 07-donusum-artirici) */}
              <div className="mb-4">
                <CouponCode
                  onApply={handleCouponApply}
                  appliedCoupon={couponCode}
                  discount={discount}
                />
              </div>
              
              <Separator className="my-4" />
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ara Toplam</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>İndirim ({couponCode})</span>
                    <span className="font-medium">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Kargo</span>
                  <span>
                    {total >= freeShippingThreshold ? (
                      <span className="font-medium text-green-600">✓ Ücretsiz</span>
                    ) : (
                      <span className="font-medium">{formatPrice(50)}</span>
                    )}
                  </span>
                </div>
              </div>
              <Separator className="my-4" />
              {/* Net Toplam: Büyük, vurgulu (Doküman: 04-ux-akis) */}
              <div className="flex justify-between text-price font-bold mb-4">
                <span>Toplam</span>
                <span className="text-accent">
                  {formatPrice(
                    total + (total >= freeShippingThreshold ? 0 : 50)
                  )}
                </span>
              </div>

              {/* Ücretsiz Kargo Eşiği Göstergesi (Doküman: 07-donusum-artirici) */}
              {remainingForFreeShipping > 0 && (
                <div className="mb-4 rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <p className="text-sm text-amber-900">
                    🎁 Ücretsiz kargo için{" "}
                    <span className="font-bold text-accent">
                      {formatPrice(remainingForFreeShipping)}
                    </span>{" "}
                    daha ekleyin!
                  </p>
                </div>
              )}

              <Link to="/odeme" className="block">
                <Button size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
                  Ödemeye Geç
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

