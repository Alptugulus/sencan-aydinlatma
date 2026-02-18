import { useState } from "react";
import { Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface CouponCodeProps {
  onApply: (code: string) => void;
  appliedCoupon?: string;
  discount?: number;
}

export default function CouponCode({ onApply, appliedCoupon, discount }: CouponCodeProps) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // Örnek kupon kodları
  const validCoupons: Record<string, number> = {
    WELCOME10: 10,
    SENCAN20: 20,
    FLASH30: 30,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code.trim()) {
      setError("Lütfen bir kupon kodu girin");
      return;
    }

    const upperCode = code.toUpperCase();
    if (validCoupons[upperCode]) {
      onApply(upperCode);
      setCode("");
    } else {
      setError("Geçersiz kupon kodu");
    }
  };

  const handleRemove = () => {
    onApply("");
  };

  if (appliedCoupon) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">
                ✓ {appliedCoupon} uygulandı
              </p>
              <p className="text-xs text-green-700">
                %{discount} indirim
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleRemove}
            className="h-8 w-8 text-green-700 hover:text-green-900"
            aria-label="Kuponu kaldır"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="coupon" className="text-sm font-medium block">
        Kupon Kodu
      </label>
      <div className="flex gap-2">
        <input
          id="coupon"
          type="text"
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setError("");
          }}
          placeholder="Kupon kodunu girin"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none"
          aria-label="Kupon kodu"
          aria-invalid={!!error}
          aria-describedby={error ? "coupon-error" : undefined}
        />
        <Button type="submit" variant="outline">
          Uygula
        </Button>
      </div>
      {error && (
        <p id="coupon-error" className="text-xs text-red-600" role="alert">
          {error}
        </p>
      )}
      <p className="text-xs text-muted-foreground">
        Örnek: WELCOME10, SENCAN20, FLASH30
      </p>
    </form>
  );
}

