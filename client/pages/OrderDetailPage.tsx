import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AccountSidebar from "@/components/AccountSidebar";
import AccountTabs from "@/components/AccountTabs";
import { Order, OrderStatus } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/utils";
import {
  ArrowLeft,
  Package,
  MapPin,
  Phone,
  Truck,
  FileText,
  X,
  CheckCircle,
} from "lucide-react";
import { toast } from "sonner";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Beklemede",
  preparing: "Hazırlanıyor",
  shipping: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi",
  returned: "İade Edildi",
};

const statusIcons: Record<OrderStatus, typeof Package> = {
  pending: Package,
  preparing: Package,
  shipping: Truck,
  delivered: CheckCircle,
  cancelled: X,
  returned: X,
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-gray-100 text-gray-800",
};

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { fetchOrder, cancelOrder, isLoading } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (id && user?.id) {
      fetchOrder(id, user.id).then(setOrder);
    }
  }, [id, user?.id, fetchOrder]);

  const handleCancel = async () => {
    if (!order || !user?.id) return;
    
    if (!confirm("Bu siparişi iptal etmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await cancelOrder(order.id, user.id);
      setOrder({ ...order, status: "cancelled" });
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleTrackShipping = () => {
    if (order?.trackingNumber && order?.shippingCompany) {
      // In production, this would open the shipping company's tracking page
      toast.info("Kargo takip sayfası açılıyor...");
      // Example: window.open(`https://${shippingCompany}.com/track/${trackingNumber}`);
    } else {
      toast.info("Kargo takip bilgisi henüz eklenmemiş");
    }
  };

  if (isLoading || !order) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status];

  return (
    <>
      <Helmet>
        <title>Sipariş #{order.orderNumber} - Sencan Aydınlatma</title>
        <meta name="description" content={`Sipariş #${order.orderNumber} detayları`} />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <AccountTabs />
          <div className="flex gap-8">
            <AccountSidebar />
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="mb-6">
            <Link
              to="/hesabim/siparisler"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Siparişlerime Dön
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-h2 font-bold text-foreground mb-2">
                  Sipariş #{order.orderNumber}
                </h1>
                <p className="text-muted-foreground">
                  Tarih: {formatDate(order.createdAt)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <StatusIcon className="h-5 w-5" />
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}
                >
                  {statusLabels[order.status]}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Teslimat Adresi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <p className="font-medium">{order.shippingAddress.fullName}</p>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{order.shippingAddress.phone}</span>
                    </div>
                    <div className="flex items-start gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 mt-0.5" />
                      <div>
                        <p>{order.shippingAddress.street}</p>
                        {order.shippingAddress.buildingNumber && (
                          <p>Bina No: {order.shippingAddress.buildingNumber}</p>
                        )}
                        {order.shippingAddress.apartmentNumber && (
                          <p>Daire No: {order.shippingAddress.apartmentNumber}</p>
                        )}
                        <p>
                          {order.shippingAddress.neighborhood}, {order.shippingAddress.district}
                        </p>
                        <p>
                          {order.shippingAddress.city}
                          {order.shippingAddress.postalCode && ` - ${order.shippingAddress.postalCode}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Ürünler</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <Link to={`/urun/${item.slug}`}>
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="h-20 w-20 rounded-md object-cover border"
                          />
                        </Link>
                        <div className="flex-1">
                          <Link to={`/urun/${item.slug}`}>
                            <h4 className="font-medium hover:text-accent mb-1">
                              {item.productName}
                            </h4>
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {item.quantity} adet × {formatPrice(item.price)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-accent">
                            {formatPrice(item.total)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Tracking */}
              {order.trackingNumber && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Kargo Takip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          Takip Numarası
                        </p>
                        <p className="font-mono font-medium">{order.trackingNumber}</p>
                      </div>
                      {order.shippingCompany && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            Kargo Firması
                          </p>
                          <p className="font-medium">{order.shippingCompany}</p>
                        </div>
                      )}
                      <Button
                        variant="outline"
                        onClick={handleTrackShipping}
                        className="w-full"
                      >
                        <Truck className="h-4 w-4 mr-2" />
                        Kargo Takip Et
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Sipariş Özeti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ara Toplam</span>
                    <span className="font-medium">{formatPrice(order.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Kargo</span>
                    <span>
                      {order.shippingCost === 0 ? (
                        <span className="font-medium text-green-600">Ücretsiz</span>
                      ) : (
                        formatPrice(order.shippingCost)
                      )}
                    </span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">İndirim</span>
                      <span className="font-medium text-green-600">
                        -{formatPrice(order.discount)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Toplam</span>
                    <span className="text-accent">{formatPrice(order.total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Ödeme Bilgileri</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ödeme Yöntemi</span>
                    <span className="font-medium">
                      {order.paymentMethod === "card"
                        ? "Kredi/Banka Kartı"
                        : order.paymentMethod === "cash"
                        ? "Kapıda Ödeme"
                        : "Havale/EFT"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ödeme Durumu</span>
                    <span
                      className={`font-medium ${
                        order.paymentStatus === "paid"
                          ? "text-green-600"
                          : order.paymentStatus === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {order.paymentStatus === "paid"
                        ? "Ödendi"
                        : order.paymentStatus === "pending"
                        ? "Beklemede"
                        : "Başarısız"}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-2">
                {order.status === "pending" && (
                  <Button
                    variant="outline"
                    className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Siparişi İptal Et
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    Fatura İndir
                  </Button>
                )}
                {order.status === "delivered" && (
                  <Button variant="outline" className="w-full">
                    İade Talep Et
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

