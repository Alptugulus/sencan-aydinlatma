import { useState } from "react";
import { X, Filter } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

interface ProductFiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export interface FilterState {
  minPrice: number;
  maxPrice: number;
  inStock: boolean | null;
  sortBy: "newest" | "price-low" | "price-high" | "popular";
}

export default function ProductFilters({
  onFilterChange,
  onClose,
  isMobile = false,
}: ProductFiltersProps) {
  const [filters, setFilters] = useState<FilterState>({
    minPrice: 0,
    maxPrice: 10000,
    inStock: null,
    sortBy: "newest",
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      minPrice: 0,
      maxPrice: 10000,
      inStock: null,
      sortBy: "newest",
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const activeFiltersCount =
    (filters.minPrice > 0 ? 1 : 0) +
    (filters.maxPrice < 10000 ? 1 : 0) +
    (filters.inStock !== null ? 1 : 0) +
    (filters.sortBy !== "newest" ? 1 : 0);

  return (
    <div className={isMobile ? "p-4" : "sticky top-24"}>
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtreler
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </h3>
          {isMobile && onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Separator className="my-4" />

        {/* Sıralama */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Sıralama</label>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              handleFilterChange("sortBy", e.target.value as FilterState["sortBy"])
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
          >
            <option value="newest">En Yeni</option>
            <option value="price-low">Fiyat: Düşükten Yükseğe</option>
            <option value="price-high">Fiyat: Yüksekten Düşüğe</option>
            <option value="popular">En Çok Satanlar</option>
          </select>
        </div>

        <Separator className="my-4" />

        {/* Fiyat Aralığı */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Fiyat Aralığı</label>
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handleFilterChange("minPrice", Number(e.target.value) || 0)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxPrice === 10000 ? "" : filters.maxPrice}
              onChange={(e) =>
                handleFilterChange("maxPrice", Number(e.target.value) || 10000)
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>

        <Separator className="my-4" />

        {/* Stok Durumu */}
        <div className="mb-6">
          <label className="text-sm font-medium mb-2 block">Stok Durumu</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === null}
                onChange={() => handleFilterChange("inStock", null)}
                className="h-4 w-4"
              />
              <span className="text-sm">Tümü</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === true}
                onChange={() => handleFilterChange("inStock", true)}
                className="h-4 w-4"
              />
              <span className="text-sm">Stokta Olanlar</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="stock"
                checked={filters.inStock === false}
                onChange={() => handleFilterChange("inStock", false)}
                className="h-4 w-4"
              />
              <span className="text-sm">Tükenenler</span>
            </label>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Temizle Butonu */}
        {activeFiltersCount > 0 && (
          <Button variant="outline" onClick={handleReset} className="w-full">
            Filtreleri Temizle
          </Button>
        )}
      </div>
    </div>
  );
}

