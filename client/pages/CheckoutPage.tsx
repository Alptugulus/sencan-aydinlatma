import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Check, ArrowLeft, Shield, AlertCircle, MapPin, Plus } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { useOrders } from "../hooks/useOrders";
import { useAddresses } from "../hooks/useAddresses";
import { formatPrice } from "../lib/utils";
import { toast } from "sonner";
import { trackPurchase } from "../lib/analytics";
import { Address } from "../lib/types";
import { Link } from "react-router-dom";

type Step = "address" | "payment" | "confirmation";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder, isLoading: isCreatingOrder } = useOrders();
  const { addresses, fetchAddresses } = useAddresses();
  const [step, setStep] = useState<Step>("address");
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [useSavedAddress, setUseSavedAddress] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [agreements, setAgreements] = useState({
    privacy: false,
    kvkk: false,
  });

  const total = getTotal();
  const freeShippingThreshold = 500;
  const shippingCost = total >= freeShippingThreshold ? 0 : 50;
  const finalTotal = total + shippingCost;

  // Fetch saved addresses
  useEffect(() => {
    if (user?.id) {
      fetchAddresses(user.id);
    }
  }, [user?.id, fetchAddresses]);

  // Set default address when addresses are loaded
  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0];
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        setUseSavedAddress(true);
        // Pre-fill form with default address
        setFormData((prev) => ({
          ...prev,
          fullName: defaultAddress.fullName,
          phone: defaultAddress.phone,
          address: defaultAddress.street,
          city: defaultAddress.city,
          postalCode: defaultAddress.postalCode || "",
        }));
      }
    }
  }, [addresses, selectedAddressId]);

  if (items.length === 0) {
    navigate("/sepet");
    return null;
  }

  const selectedAddress = addresses.find((addr) => addr.id === selectedAddressId);

  const validateField = (name: string, value: string) => {
    let error = "";
    
    switch (name) {
      case "email":
        if (!value) {
          error = "E-posta adresi gereklidir";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Geçerli bir e-posta adresi girin";
        }
        break;
      case "phone":
        if (!value) {
          error = "Telefon numarası gereklidir";
        } else if (!/^[0-9\s()+-]+$/.test(value)) {
          error = "Geçerli bir telefon numarası girin";
        }
        break;
      case "cardNumber":
        if (!value) {
          error = "Kart numarası gereklidir";
        } else if (value.replace(/\s/g, "").length < 16) {
          error = "Kart numarası 16 haneli olmalıdır";
        }
        break;
      case "expiryDate":
        if (!value) {
          error = "Son kullanma tarihi gereklidir";
        } else if (!/^\d{2}\/\d{2}$/.test(value)) {
          error = "MM/YY formatında girin";
        }
        break;
      case "cvv":
        if (!value) {
          error = "CVV gereklidir";
        } else if (value.length !== 3) {
          error = "CVV 3 haneli olmalıdır";
        }
        break;
      default:
        if (!value) {
          error = "Bu alan gereklidir";
        }
    }
    
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Gerçek zamanlı validasyon (Doküman: 04-ux-akis)
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If using saved address, just proceed
    if (useSavedAddress && selectedAddressId) {
      setStep("payment");
      return;
    }
    
    // Validate form fields for new address
    if (
      formData.fullName &&
      formData.email &&
      formData.phone &&
      formData.address &&
      formData.city &&
      formData.postalCode
    ) {
      setStep("payment");
    } else {
      toast.error("Lütfen tüm alanları doldurun");
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreements.privacy || !agreements.kvkk) {
      toast.error("Lütfen tüm sözleşmeleri onaylayın");
      return;
    }
    if (!user?.id) {
      toast.error("Lütfen giriş yapın");
      navigate("/giris", { state: { from: "/odeme" } });
      return;
    }
    if (formData.cardNumber && formData.cardName && formData.expiryDate && formData.cvv) {
      try {
        // Use selected saved address or create new address object
        let shippingAddress: Address;
        
        if (useSavedAddress && selectedAddress) {
          shippingAddress = selectedAddress;
        } else {
          // Create temporary address object for new address
          shippingAddress = {
            id: `temp_${Date.now()}`,
            userId: user.id,
            title: "Teslimat Adresi",
            type: "home" as const,
            fullName: formData.fullName,
            phone: formData.phone,
            city: formData.city,
            district: "", // Not collected in checkout
            neighborhood: "", // Not collected in checkout
            street: formData.address,
            buildingNumber: undefined,
            apartmentNumber: undefined,
            postalCode: formData.postalCode,
            isDefault: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
        }

        // Create order
        const order = await createOrder(
          user.id,
          items,
          shippingAddress,
          "card", // Payment method
          total,
          shippingCost,
          0 // Discount (can be added later)
        );

        // Analytics: Purchase tracking
        const purchaseItems = items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
        }));
        trackPurchase(order.orderNumber, finalTotal, purchaseItems);
        
        setCreatedOrderNumber(order.orderNumber);
        clearCart();
        setStep("confirmation");
        toast.success("Siparişiniz alındı!");
      } catch (error) {
        // Error handled by useOrders hook
      }
    } else {
      toast.error("Lütfen tüm ödeme bilgilerini doldurun");
    }
  };

  return (
    <>
      <Helmet>
        <title>Ödeme - Sencan Aydınlatma</title>
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        {/* Progress Bar - Her zaman görünür (Doküman: 04-ux-akis) */}
        <div className="mb-8 sticky top-20 bg-white py-4 z-10 border-b">
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  step === "address" || step === "payment" || step === "confirmation"
                    ? "border-accent bg-accent text-white"
                    : "border-muted-foreground bg-muted"
                }`}
              >
                {step !== "address" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">1</span>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-medium">Adres</span>
            </div>
            <div
              className={`h-1 w-8 sm:w-16 transition-colors ${
                step === "payment" || step === "confirmation"
                  ? "bg-accent"
                  : "bg-muted"
              }`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  step === "payment" || step === "confirmation"
                    ? "border-accent bg-accent text-white"
                    : "border-muted-foreground bg-muted"
                }`}
              >
                {step === "confirmation" ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="font-semibold">2</span>
                )}
              </div>
              <span className="hidden sm:inline text-sm font-medium">Ödeme</span>
            </div>
            <div
              className={`h-1 w-8 sm:w-16 transition-colors ${
                step === "confirmation" ? "bg-accent" : "bg-muted"
              }`}
            />
            <div className="flex items-center gap-2">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                  step === "confirmation"
                    ? "border-accent bg-accent text-white"
                    : "border-muted-foreground bg-muted"
                }`}
              >
                <span className="font-semibold">3</span>
              </div>
              <span className="hidden sm:inline text-sm font-medium">Onay</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === "address" && (
              <Card>
                <CardHeader>
                  <CardTitle>Teslimat Adresi</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Saved Addresses */}
                  {addresses.length > 0 && (
                    <div className="mb-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium">Kayıtlı Adreslerim</label>
                        <Link
                          to="/hesabim/adresler"
                          className="text-sm text-accent hover:underline flex items-center gap-1"
                        >
                          <Plus className="h-3 w-3" />
                          Yeni Adres Ekle
                        </Link>
                      </div>
                      <div className="space-y-2">
                        {addresses.map((address) => (
                          <label
                            key={address.id}
                            className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                              selectedAddressId === address.id
                                ? "border-accent bg-accent/5"
                                : "border-input hover:bg-muted/50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="address"
                              checked={selectedAddressId === address.id}
                              onChange={() => {
                                setSelectedAddressId(address.id);
                                setUseSavedAddress(true);
                                setFormData((prev) => ({
                                  ...prev,
                                  fullName: address.fullName,
                                  phone: address.phone,
                                  address: address.street,
                                  city: address.city,
                                  postalCode: address.postalCode || "",
                                }));
                              }}
                              className="mt-1 h-4 w-4 text-accent focus:ring-accent"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{address.title}</span>
                                {address.isDefault && (
                                  <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                                    Varsayılan
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">{address.fullName}</p>
                              <p className="text-sm text-muted-foreground">{address.phone}</p>
                              <p className="text-sm text-muted-foreground">
                                {address.street}, {address.neighborhood}, {address.district}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {address.city} {address.postalCode && `- ${address.postalCode}`}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                      <div className="pt-2 border-t">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={!useSavedAddress}
                            onChange={(e) => {
                              setUseSavedAddress(!e.target.checked);
                              if (e.target.checked) {
                                setSelectedAddressId(null);
                                setFormData((prev) => ({
                                  ...prev,
                                  fullName: "",
                                  phone: "",
                                  address: "",
                                  city: "",
                                  postalCode: "",
                                }));
                              }
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                          />
                          <span className="text-sm text-muted-foreground">
                            Yeni adres gireceğim
                          </span>
                        </label>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleAddressSubmit} className="space-y-4">
                    {/* Address Form - Show when not using saved address or no saved addresses */}
                    {(!useSavedAddress || addresses.length === 0) && (
                      <>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Ad Soyad *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        disabled={useSavedAddress && selectedAddressId !== null}
                        className={`w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : touched.fullName && !errors.fullName
                            ? "border-green-500"
                            : "border-input focus:border-accent focus:ring-accent"
                        } ${useSavedAddress && selectedAddressId !== null ? "opacity-60 cursor-not-allowed" : ""}`}
                        required
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.fullName}
                        </p>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          E-posta *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors ${
                            errors.email
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : touched.email && !errors.email
                              ? "border-green-500"
                              : "border-input focus:border-accent focus:ring-accent"
                          }`}
                          required
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors ${
                            errors.phone
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                              : touched.phone && !errors.phone
                              ? "border-green-500"
                              : "border-input focus:border-accent focus:ring-accent"
                          }`}
                          required
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {errors.phone}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Adres *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Şehir *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Posta Kodu *
                        </label>
                        <input
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        />
                      </div>
                    </div>
                    </>
                    )}
                    {/* Güven Rozeti (Doküman: 05-guven-elementleri) */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Güvenli Ödeme - SSL ile korunuyor</span>
                    </div>
                    <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90 text-white">
                      Devam Et
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "payment" && (
              <Card>
                <CardHeader>
                  <CardTitle>Ödeme Bilgileri</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    {/* Güven Rozeti */}
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4 p-3 bg-muted/50 rounded-md">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>3D Secure ile korunuyorsunuz</span>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Kart Numarası *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className={`w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors ${
                          errors.cardNumber
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : touched.cardNumber && !errors.cardNumber
                            ? "border-green-500"
                            : "border-input focus:border-accent focus:ring-accent"
                        }`}
                        required
                      />
                      {errors.cardNumber && (
                        <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {errors.cardNumber}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">
                        Kart Üzerindeki İsim *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Son Kullanma *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength={3}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          required
                        />
                      </div>
                    </div>
                    {/* KVKK ve Sözleşme Onayları (Doküman: 04-ux-akis) */}
                    <div className="mb-6 space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreements.privacy}
                          onChange={(e) =>
                            setAgreements({ ...agreements, privacy: e.target.checked })
                          }
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-muted-foreground">
                          <a href="/gizlilik" target="_blank" className="text-accent hover:underline">
                            Gizlilik Politikası
                          </a> ve{" "}
                          <a href="/sozlesme" target="_blank" className="text-accent hover:underline">
                            Mesafeli Satış Sözleşmesi
                          </a>'ni okudum, kabul ediyorum. *
                        </span>
                      </label>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreements.kvkk}
                          onChange={(e) =>
                            setAgreements({ ...agreements, kvkk: e.target.checked })
                          }
                          className="mt-1 h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
                        />
                        <span className="text-sm text-muted-foreground">
                          <a href="/kvkk" target="_blank" className="text-accent hover:underline">
                            KVKK Aydınlatma Metni
                          </a>'ni okudum, kişisel verilerimin işlenmesine izin veriyorum. *
                        </span>
                      </label>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setStep("address")}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Geri
                      </Button>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="flex-1 bg-accent hover:bg-accent/90 text-white"
                        disabled={isCreatingOrder}
                      >
                        {isCreatingOrder ? "Sipariş Oluşturuluyor..." : "Siparişi Tamamla"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === "confirmation" && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                      <Check className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">
                      Siparişiniz Alındı!
                    </h2>
                    {createdOrderNumber && (
                      <p className="text-muted-foreground mb-2">
                        Sipariş numaranız: <span className="font-semibold text-accent">#{createdOrderNumber}</span>
                      </p>
                    )}
                    <p className="text-sm text-muted-foreground mb-6">
                      Sipariş detayları e-posta adresinize gönderildi.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={() => navigate("/")} variant="outline">
                        Ana Sayfaya Dön
                      </Button>
                      <Button onClick={() => navigate("/hesabim/siparisler")}>
                        Siparişlerimi Gör
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {step !== "confirmation" && (
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardHeader>
                    <CardTitle>Sipariş Özeti</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {item.name} x{item.quantity}
                          </span>
                          <span>{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Ara Toplam</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Kargo</span>
                        <span>
                          {shippingCost === 0 ? (
                            <span className="text-green-600">Ücretsiz</span>
                          ) : (
                            formatPrice(shippingCost)
                          )}
                        </span>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    {/* Net Toplam: Büyük, vurgulu (Doküman: 04-ux-akis) */}
                    <div className="flex justify-between text-price font-bold">
                      <span>Toplam</span>
                      <span className="text-accent">{formatPrice(finalTotal)}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

