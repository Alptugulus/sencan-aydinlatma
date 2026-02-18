import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useAddresses } from "@/hooks/useAddresses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AccountSidebar from "@/components/AccountSidebar";
import AccountTabs from "@/components/AccountTabs";
import EmptyState from "@/components/EmptyState";
import AddressForm from "@/components/AddressForm";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Plus, MapPin, Home, Building2, Map, Edit, Trash2, Star, Phone } from "lucide-react";
import { Address, AddressType } from "@/lib/types";
import { toast } from "sonner";

const addressTypeIcons = {
  home: Home,
  work: Building2,
  other: Map,
};

const addressTypeLabels = {
  home: "Ev Adresi",
  work: "İş Adresi",
  other: "Diğer",
};

export default function AddressesPage() {
  const { user } = useAuth();
  const { addresses, isLoading, fetchAddresses, deleteAddress, setDefaultAddress } = useAddresses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (user?.id) {
      fetchAddresses(user.id);
    }
  }, [user?.id, fetchAddresses]);

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setIsFormOpen(true);
  };

  const handleDelete = async (addressId: string) => {
    if (!user?.id) return;
    
    if (!confirm("Bu adresi silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await deleteAddress(addressId, user.id);
    } catch (error) {
      // Error handled by hook
    }
  };

  const handleSetDefault = async (addressId: string) => {
    if (!user?.id) return;
    await setDefaultAddress(addressId, user.id);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingAddress(null);
  };

  const handleFormSuccess = () => {
    handleFormClose();
    if (user?.id) {
      fetchAddresses(user.id);
    }
  };

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
        <title>Adreslerim - Sencan Aydınlatma</title>
        <meta name="description" content="Kayıtlı adreslerinizi yönetin." />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <AccountTabs />
          <div className="flex gap-8">
            <AccountSidebar />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-h2 font-bold text-foreground mb-2">Adreslerim</h1>
                  <p className="text-muted-foreground">
                    Teslimat adreslerinizi yönetin ve düzenleyin
                  </p>
                </div>
            <Drawer open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DrawerTrigger asChild>
                <Button size="lg" className="hidden md:flex">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Adres Ekle
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh]">
                <DrawerHeader>
                  <DrawerTitle>
                    {editingAddress ? "Adres Düzenle" : "Yeni Adres Ekle"}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 overflow-y-auto">
                  <AddressForm
                    address={editingAddress}
                    userId={user?.id || ""}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormClose}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Mobile Add Button */}
          <div className="md:hidden mb-6">
            <Drawer open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DrawerTrigger asChild>
                <Button className="w-full" size="lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Adres Ekle
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh]">
                <DrawerHeader>
                  <DrawerTitle>
                    {editingAddress ? "Adres Düzenle" : "Yeni Adres Ekle"}
                  </DrawerTitle>
                </DrawerHeader>
                <div className="px-4 pb-4 overflow-y-auto">
                  <AddressForm
                    address={editingAddress}
                    userId={user?.id || ""}
                    onSuccess={handleFormSuccess}
                    onCancel={handleFormClose}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <EmptyState
              icon={<MapPin className="h-12 w-12 text-muted-foreground" />}
              title="Henüz adres eklemediniz"
              description="İlk adresinizi ekleyerek alışverişe başlayabilirsiniz."
              action={{
                label: "Adres Ekle",
                onClick: () => setIsFormOpen(true),
              }}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => {
                const Icon = addressTypeIcons[address.type];
                return (
                  <Card key={address.id} className="relative">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-accent" />
                          <h3 className="font-semibold text-lg">
                            {address.title}
                          </h3>
                          {address.isDefault && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                              <Star className="h-3 w-3 fill-accent" />
                              Varsayılan
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2 text-sm text-muted-foreground mb-4">
                        <p className="font-medium text-foreground">{address.fullName}</p>
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{address.phone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5" />
                          <div>
                            <p>{address.street}</p>
                            {address.buildingNumber && (
                              <p>Bina No: {address.buildingNumber}</p>
                            )}
                            {address.apartmentNumber && (
                              <p>Daire No: {address.apartmentNumber}</p>
                            )}
                            <p>
                              {address.neighborhood}, {address.district}
                            </p>
                            <p>
                              {address.city} {address.postalCode && `- ${address.postalCode}`}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4 border-t">
                        {!address.isDefault && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleSetDefault(address.id)}
                          >
                            <Star className="h-4 w-4 mr-1" />
                            Varsayılan Yap
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(address)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Düzenle
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => handleDelete(address.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Sil
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

