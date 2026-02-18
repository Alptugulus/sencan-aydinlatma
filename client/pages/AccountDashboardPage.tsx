import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AccountSidebar from "@/components/AccountSidebar";
import AccountTabs from "@/components/AccountTabs";
import { Package, ShoppingCart, Truck, CheckCircle, ArrowRight, User, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { formatDate } from "@/lib/utils";

export default function AccountDashboardPage() {
  const { user } = useAuth();
  const { orders, stats, isLoading, fetchOrders, fetchStats } = useOrders();

  useEffect(() => {
    if (user?.id) {
      fetchOrders(user.id);
      fetchStats(user.id);
    }
  }, [user?.id, fetchOrders, fetchStats]);

  const recentOrders = orders.slice(0, 5);

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
        <title>Hesabım - Sencan Aydınlatma</title>
        <meta name="description" content="Hesap özetiniz ve son siparişleriniz." />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <AccountTabs />
          <div className="flex gap-8">
            <AccountSidebar />
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <h1 className="text-h2 font-bold text-foreground mb-2">
                  Hoş geldiniz, {user?.name}!
                </h1>
                <p className="text-muted-foreground">
                  Hesap özetiniz ve son aktiviteleriniz
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Toplam Sipariş</p>
                        <p className="text-2xl font-bold">{stats?.totalOrders || 0}</p>
                      </div>
                      <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Bekleyen</p>
                        <p className="text-2xl font-bold">{stats?.pendingOrders || 0}</p>
                      </div>
                      <ShoppingCart className="h-8 w-8 text-yellow-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Kargoda</p>
                        <p className="text-2xl font-bold">{stats?.shippingOrders || 0}</p>
                      </div>
                      <Truck className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Toplam Harcama</p>
                        <p className="text-2xl font-bold text-accent">
                          {stats ? formatPrice(stats.totalSpent) : formatPrice(0)}
                        </p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Son Siparişler</CardTitle>
                      <Link to="/hesabim/siparisler">
                        <Button variant="ghost" size="sm">
                          Tümünü Gör
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </CardHeader>
                    <CardContent>
                      {recentOrders.length === 0 ? (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground mb-4">
                            Henüz sipariş vermediniz
                          </p>
                          <Link to="/">
                            <Button>Alışverişe Başla</Button>
                          </Link>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {recentOrders.map((order) => (
                            <Link
                              key={order.id}
                              to={`/hesabim/siparis/${order.id}`}
                              className="block p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">Sipariş #{order.orderNumber}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {formatDate(order.createdAt)}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {order.items.length} ürün
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-semibold text-accent">
                                    {formatPrice(order.total)}
                                  </p>
                                  <p className="text-xs text-muted-foreground capitalize">
                                    {order.status}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Links */}
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hızlı Erişim</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Link to="/hesabim/siparisler">
                        <Button variant="outline" className="w-full justify-start">
                          <Package className="h-4 w-4 mr-2" />
                          Siparişlerim
                        </Button>
                      </Link>
                      <Link to="/hesabim/adresler">
                        <Button variant="outline" className="w-full justify-start">
                          <MapPin className="h-4 w-4 mr-2" />
                          Adreslerim
                        </Button>
                      </Link>
                      <Link to="/profil">
                        <Button variant="outline" className="w-full justify-start">
                          <User className="h-4 w-4 mr-2" />
                          Profilim
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>

                  {/* Account Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Hesap Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">E-posta</p>
                        <p className="font-medium">{user?.email}</p>
                      </div>
                      {user?.phone && (
                        <div>
                          <p className="text-muted-foreground">Telefon</p>
                          <p className="font-medium">{user.phone}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

