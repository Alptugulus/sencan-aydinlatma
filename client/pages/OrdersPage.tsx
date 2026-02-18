import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AccountSidebar from "@/components/AccountSidebar";
import AccountTabs from "@/components/AccountTabs";
import EmptyState from "@/components/EmptyState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order, OrderStatus } from "@/lib/types";
import { formatPrice, formatDate } from "@/lib/utils";
import { Package, Search, Calendar, Filter } from "lucide-react";

const statusLabels: Record<OrderStatus, string> = {
  pending: "Beklemede",
  preparing: "Hazırlanıyor",
  shipping: "Kargoda",
  delivered: "Teslim Edildi",
  cancelled: "İptal Edildi",
  returned: "İade Edildi",
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  preparing: "bg-blue-100 text-blue-800",
  shipping: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  returned: "bg-gray-100 text-gray-800",
};

export default function OrdersPage() {
  const { user } = useAuth();
  const { orders, isLoading, fetchOrders } = useOrders();
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  useEffect(() => {
    if (user?.id) {
      const filters: any = {};
      if (statusFilter !== "all") {
        filters.status = statusFilter;
      }
      // Date filter logic can be added here
      fetchOrders(user.id, filters);
    }
  }, [user?.id, statusFilter, dateFilter, fetchOrders]);

  const getFilteredOrders = () => {
    let filtered = orders;

    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "1month":
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case "3months":
          filterDate.setMonth(now.getMonth() - 3);
          break;
        case "6months":
          filterDate.setMonth(now.getMonth() - 6);
          break;
        case "1year":
          filterDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= filterDate
      );
    }

    return filtered;
  };

  const filteredOrders = getFilteredOrders();

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-muted-foreground">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Siparişlerim - Sencan Aydınlatma</title>
        <meta name="description" content="Siparişlerinizi görüntüleyin ve takip edin." />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <AccountTabs />
          <div className="flex gap-8">
            <AccountSidebar />
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h1 className="text-h2 font-bold text-foreground mb-2">Siparişlerim</h1>
                <p className="text-muted-foreground">
                  Tüm siparişlerinizi görüntüleyin ve detaylarına ulaşın
                </p>
              </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as OrderStatus | "all")}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Durum Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Durumlar</SelectItem>
                  <SelectItem value="pending">Beklemede</SelectItem>
                  <SelectItem value="preparing">Hazırlanıyor</SelectItem>
                  <SelectItem value="shipping">Kargoda</SelectItem>
                  <SelectItem value="delivered">Teslim Edildi</SelectItem>
                  <SelectItem value="cancelled">İptal Edildi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Tarih Filtrele" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tüm Zamanlar</SelectItem>
                  <SelectItem value="1month">Son 1 Ay</SelectItem>
                  <SelectItem value="3months">Son 3 Ay</SelectItem>
                  <SelectItem value="6months">Son 6 Ay</SelectItem>
                  <SelectItem value="1year">Son 1 Yıl</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <EmptyState
              icon={<Package className="h-12 w-12 text-muted-foreground" />}
              title="Henüz sipariş vermediniz"
              description="Alışverişe başlayarak ilk siparişinizi oluşturabilirsiniz."
              action={{
                label: "Alışverişe Başla",
                onClick: () => window.location.href = "/",
              }}
            />
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <h3 className="text-lg font-semibold">
                            Sipariş #{order.orderNumber}
                          </h3>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}
                          >
                            {statusLabels[order.status]}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground space-y-1">
                          <p>Tarih: {formatDate(order.createdAt)}</p>
                          <p>Toplam: {formatPrice(order.total)}</p>
                          <p className="text-xs">
                            {order.items.length} ürün
                            {order.items.length > 1 ? "" : ""}
                          </p>
                        </div>
                      </div>

                      {/* Order Items Preview */}
                      <div className="flex gap-2 flex-wrap">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={item.id}
                            src={item.productImage}
                            alt={item.productName}
                            className="h-16 w-16 rounded-md object-cover border"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="h-16 w-16 rounded-md border bg-muted flex items-center justify-center text-xs font-medium">
                            +{order.items.length - 3}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Link to={`/hesabim/siparis/${order.id}`}>
                          <Button variant="outline" className="w-full">
                            Detayları Gör
                          </Button>
                        </Link>
                        {order.status === "delivered" && (
                          <Button variant="outline" className="w-full text-sm">
                            Tekrar Sipariş Ver
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

