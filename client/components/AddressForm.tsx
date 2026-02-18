import { useState, useEffect } from "react";
import { Address, AddressType } from "@/lib/types";
import { useAddresses } from "@/hooks/useAddresses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TURKEY_CITIES, getDistrictsByCity } from "@/lib/turkey-cities";
import { Home, Building2, Map, X } from "lucide-react";

interface AddressFormProps {
  address?: Address | null;
  userId: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function AddressForm({ address, userId, onSuccess, onCancel }: AddressFormProps) {
  const { createAddress, updateAddress, isLoading } = useAddresses();
  const [formData, setFormData] = useState({
    title: "",
    type: "home" as AddressType,
    fullName: "",
    phone: "",
    city: "",
    district: "",
    neighborhood: "",
    street: "",
    buildingNumber: "",
    apartmentNumber: "",
    postalCode: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);

  useEffect(() => {
    if (address) {
      setFormData({
        title: address.title,
        type: address.type,
        fullName: address.fullName,
        phone: address.phone,
        city: address.city,
        district: address.district,
        neighborhood: address.neighborhood,
        street: address.street,
        buildingNumber: address.buildingNumber || "",
        apartmentNumber: address.apartmentNumber || "",
        postalCode: address.postalCode || "",
        isDefault: address.isDefault,
      });
      // Load districts for the city
      if (address.city) {
        setAvailableDistricts(getDistrictsByCity(address.city));
      }
    }
  }, [address]);

  const handleChange = (name: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // When city changes, update districts
    if (name === "city") {
      setAvailableDistricts(getDistrictsByCity(value as string));
      setFormData((prev) => ({ ...prev, district: "" })); // Reset district
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Adres başlığı gereklidir";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Ad soyad gereklidir";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Ad soyad en az 3 karakter olmalıdır";
    }

    if (!formData.phone) {
      newErrors.phone = "Telefon numarası gereklidir";
    } else if (!/^[0-9\s()+-]+$/.test(formData.phone)) {
      newErrors.phone = "Geçerli bir telefon numarası girin";
    }

    if (!formData.city) {
      newErrors.city = "İl seçimi gereklidir";
    }

    if (!formData.district) {
      newErrors.district = "İlçe seçimi gereklidir";
    }

    if (!formData.neighborhood.trim()) {
      newErrors.neighborhood = "Mahalle gereklidir";
    } else if (formData.neighborhood.trim().length < 2) {
      newErrors.neighborhood = "Mahalle en az 2 karakter olmalıdır";
    }

    if (!formData.street.trim()) {
      newErrors.street = "Cadde/Sokak gereklidir";
    } else if (formData.street.trim().length < 5) {
      newErrors.street = "Cadde/Sokak en az 5 karakter olmalıdır";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const addressData = {
        title: formData.title,
        type: formData.type,
        fullName: formData.fullName,
        phone: formData.phone,
        city: formData.city,
        district: formData.district,
        neighborhood: formData.neighborhood,
        street: formData.street,
        buildingNumber: formData.buildingNumber || undefined,
        apartmentNumber: formData.apartmentNumber || undefined,
        postalCode: formData.postalCode || undefined,
        isDefault: formData.isDefault,
      };

      if (address) {
        await updateAddress(address.id, userId, addressData);
      } else {
        await createAddress(userId, addressData);
      }

      onSuccess();
    } catch (error) {
      // Error handled by hook
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Address Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Adres Başlığı</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Ev Adresi, İş Adresi, vb."
          className={errors.title ? "border-red-500" : ""}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title}</p>
        )}
      </div>

      {/* Address Type */}
      <div className="space-y-2">
        <Label>Adres Tipi</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleChange("type", "home")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
              formData.type === "home"
                ? "border-accent bg-accent/10 text-accent"
                : "border-input hover:bg-muted"
            }`}
          >
            <Home className="h-4 w-4" />
            Ev
          </button>
          <button
            type="button"
            onClick={() => handleChange("type", "work")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
              formData.type === "work"
                ? "border-accent bg-accent/10 text-accent"
                : "border-input hover:bg-muted"
            }`}
          >
            <Building2 className="h-4 w-4" />
            İş
          </button>
          <button
            type="button"
            onClick={() => handleChange("type", "other")}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md border transition-colors ${
              formData.type === "other"
                ? "border-accent bg-accent/10 text-accent"
                : "border-input hover:bg-muted"
            }`}
          >
            <Map className="h-4 w-4" />
            Diğer
          </button>
        </div>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName">Ad Soyad</Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className={errors.fullName ? "border-red-500" : ""}
          aria-invalid={!!errors.fullName}
        />
        {errors.fullName && (
          <p className="text-sm text-red-500">{errors.fullName}</p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Telefon</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          placeholder="0532 123 45 67"
          className={errors.phone ? "border-red-500" : ""}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city">İl</Label>
        <Select
          value={formData.city}
          onValueChange={(value) => handleChange("city", value)}
        >
          <SelectTrigger className={errors.city ? "border-red-500" : ""}>
            <SelectValue placeholder="İl seçin" />
          </SelectTrigger>
          <SelectContent>
            {TURKEY_CITIES.map((city) => (
              <SelectItem key={city.code} value={city.name}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city}</p>
        )}
      </div>

      {/* District */}
      <div className="space-y-2">
        <Label htmlFor="district">İlçe</Label>
        <Select
          value={formData.district}
          onValueChange={(value) => handleChange("district", value)}
          disabled={!formData.city || availableDistricts.length === 0}
        >
          <SelectTrigger className={errors.district ? "border-red-500" : ""}>
            <SelectValue placeholder="İlçe seçin" />
          </SelectTrigger>
          <SelectContent>
            {availableDistricts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.district && (
          <p className="text-sm text-red-500">{errors.district}</p>
        )}
      </div>

      {/* Neighborhood */}
      <div className="space-y-2">
        <Label htmlFor="neighborhood">Mahalle</Label>
        <Input
          id="neighborhood"
          value={formData.neighborhood}
          onChange={(e) => handleChange("neighborhood", e.target.value)}
          className={errors.neighborhood ? "border-red-500" : ""}
          aria-invalid={!!errors.neighborhood}
        />
        {errors.neighborhood && (
          <p className="text-sm text-red-500">{errors.neighborhood}</p>
        )}
      </div>

      {/* Street */}
      <div className="space-y-2">
        <Label htmlFor="street">Cadde/Sokak</Label>
        <Input
          id="street"
          value={formData.street}
          onChange={(e) => handleChange("street", e.target.value)}
          className={errors.street ? "border-red-500" : ""}
          aria-invalid={!!errors.street}
        />
        {errors.street && (
          <p className="text-sm text-red-500">{errors.street}</p>
        )}
      </div>

      {/* Building and Apartment Number */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="buildingNumber">Bina No (Opsiyonel)</Label>
          <Input
            id="buildingNumber"
            value={formData.buildingNumber}
            onChange={(e) => handleChange("buildingNumber", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="apartmentNumber">Daire No (Opsiyonel)</Label>
          <Input
            id="apartmentNumber"
            value={formData.apartmentNumber}
            onChange={(e) => handleChange("apartmentNumber", e.target.value)}
          />
        </div>
      </div>

      {/* Postal Code */}
      <div className="space-y-2">
        <Label htmlFor="postalCode">Posta Kodu (Opsiyonel)</Label>
        <Input
          id="postalCode"
          value={formData.postalCode}
          onChange={(e) => handleChange("postalCode", e.target.value)}
          placeholder="34420"
        />
      </div>

      {/* Default Address */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isDefault"
          checked={formData.isDefault}
          onChange={(e) => handleChange("isDefault", e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent"
        />
        <Label htmlFor="isDefault" className="cursor-pointer">
          Varsayılan adres olarak kaydet
        </Label>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            <X className="h-4 w-4 mr-2" />
            İptal
          </Button>
        )}
        <Button
          type="submit"
          className="flex-1"
          disabled={isLoading}
        >
          {isLoading
            ? "Kaydediliyor..."
            : address
            ? "Güncelle"
            : "Kaydet"}
        </Button>
      </div>
    </form>
  );
}

