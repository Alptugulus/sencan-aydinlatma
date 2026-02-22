import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, MessageCircle, Trash2, User, LogOut, Package, MapPin, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { getWhatsAppUrl } from "../lib/constants";
import { formatPrice } from "../lib/utils";
import { toast } from "sonner";
import SearchBar from "./SearchBar";
import logoImage from "../images/sencan-logo-buyuk-yatay-1356x436.webp";
import { PARENT_CATEGORIES } from "../data/categories";

const icMekanSubcategories =
  PARENT_CATEGORIES.find((category) => category.slug === "ic-mekan")?.subcategories.map((subcategory) => ({
    label: subcategory.label,
    to: `/kategori/ic-mekan/${subcategory.slug}`,
  })) ?? [];

const disMekanSubcategories =
  PARENT_CATEGORIES.find((category) => category.slug === "dis-mekan")?.subcategories.map((subcategory) => ({
    label: subcategory.label,
    to: `/kategori/dis-mekan/${subcategory.slug}`,
  })) ?? [];

const navMenuItems = [
  { type: "link" as const, label: "Ampul", to: "/kategori/ampul" },
  { type: "dropdown" as const, label: "İç Mekan", slug: "ic-mekan", subcategories: icMekanSubcategories },
  { type: "dropdown" as const, label: "Dış Mekan", slug: "dis-mekan", subcategories: disMekanSubcategories },
];

export default function Header() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState<"ic-mekan" | "dis-mekan" | null>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const { items, removeItem, getTotal } = useCart();
  const { user, isAuthenticated, logout, checkAuth } = useAuth();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = getTotal();
  const freeShippingThreshold = 500;
  const shippingCost = total >= freeShippingThreshold ? 0 : 50;
  const finalTotal = total + shippingCost;

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Click outside to close cart, user menu, category dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setCartOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(null);
      }
    };

    if (cartOpen || userMenuOpen || categoryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, userMenuOpen, categoryDropdownOpen]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white shadow-sm overflow-visible" role="banner">
      <div className="container-custom overflow-visible">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4 overflow-visible">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" aria-label="Ana Sayfa">
            <img 
              src={logoImage} 
              alt="Sencan Aydınlatma" 
              className="h-10 md:h-12 w-auto object-contain"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" ref={categoryDropdownRef}>
            {navMenuItems.map((item) =>
              item.type === "dropdown" ? (
                <div
                  key={item.label}
                  className="relative group overflow-visible"
                  onMouseEnter={() => setCategoryDropdownOpen(item.slug)}
                  onMouseLeave={() => setCategoryDropdownOpen(null)}
                >
                  <button
                    onClick={() => setCategoryDropdownOpen(categoryDropdownOpen === item.slug ? null : item.slug)}
                    className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                    <ChevronDown className={`h-4 w-4 transition-transform ${categoryDropdownOpen === item.slug ? "rotate-180" : ""}`} />
                  </button>
                  {categoryDropdownOpen === item.slug && (
                    <div className="absolute left-0 top-full pt-2 min-w-[180px] z-[100]">
                      <div className="rounded-lg border border-border bg-white py-2 shadow-xl">
                      {item.subcategories.map((sub) => (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          onClick={() => setCategoryDropdownOpen(null)}
                          className="block px-4 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Arama - Desktop */}
            <div className="hidden md:block">
              <SearchBar />
            </div>
            
            {/* Arama Butonu - Mobil */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Ara"
            >
              <Search className="h-5 w-5" />
            </Button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex"
              aria-label="WhatsApp ile iletişime geç"
            >
              <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-700">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Button>
            </a>

            {/* User Menu / Login Button */}
            <div className="relative" ref={userMenuRef}>
              {isAuthenticated && user ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="relative"
                    aria-label="Kullanıcı menüsü"
                  >
                    <User className="h-5 w-5" />
                    <span className="sr-only">Kullanıcı</span>
                  </Button>
                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in slide-in-from-top-2">
                      <div className="p-3 border-b">
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                      <div className="p-1">
                        <Link
                          to="/hesabim"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Hesabım
                        </Link>
                        <Link
                          to="/hesabim/siparisler"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <Package className="h-4 w-4" />
                          Siparişlerim
                        </Link>
                        <Link
                          to="/hesabim/adresler"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <MapPin className="h-4 w-4" />
                          Adreslerim
                        </Link>
                        <Link
                          to="/profil"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                        >
                          <User className="h-4 w-4" />
                          Profilim
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        >
                          <LogOut className="h-4 w-4" />
                          Çıkış Yap
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <Link to="/giris">
                  <Button variant="ghost" size="sm" className="hidden md:flex">
                    <User className="h-4 w-4 mr-2" />
                    Giriş Yap
                  </Button>
                  <Button variant="ghost" size="icon" className="md:hidden" aria-label="Giriş Yap">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>

            {/* Mini Cart Dropdown (Doküman: 04-ux-akis) */}
            <div className="relative" ref={cartRef}>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setCartOpen(!cartOpen)}
                aria-label="Sepet"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-white text-xs font-semibold flex items-center justify-center">
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </span>
                )}
                <span className="sr-only">Sepet</span>
              </Button>

              {/* Dropdown */}
              {cartOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in slide-in-from-top-2">
                  <div className="p-4 border-b">
                    <h3 className="font-semibold text-lg">
                      Sepetim {cartItemCount > 0 && `(${cartItemCount})`}
                    </h3>
                  </div>

                  {items.length === 0 ? (
                    <div className="p-8 text-center">
                      <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-sm text-muted-foreground">Sepetiniz boş</p>
                    </div>
                  ) : (
                    <>
                      {/* Ürünler Listesi - Max height 400px, scroll (Doküman: 04-ux-akis) */}
                      <div className="max-h-[400px] overflow-y-auto">
                        {items.map((item) => (
                          <div
                            key={item.id}
                            className="flex gap-3 p-4 border-b hover:bg-muted/50 transition-colors"
                          >
                            <Link
                              to={`/urun/${item.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="flex-shrink-0"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-16 w-16 rounded-md object-cover"
                              />
                            </Link>
                            <div className="flex-1 min-w-0">
                              <Link
                                to={`/urun/${item.slug}`}
                                onClick={() => setCartOpen(false)}
                                className="block"
                              >
                                <h4 className="font-medium text-sm text-foreground hover:text-accent line-clamp-2 mb-1">
                                  {item.name}
                                </h4>
                              </Link>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-muted-foreground">
                                  {item.quantity} adet × {formatPrice(item.price)}
                                </span>
                                <span className="font-semibold text-sm text-accent">
                                  {formatPrice(item.price * item.quantity)}
                                </span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => {
                                removeItem(item.id);
                                toast.success("Ürün sepetten çıkarıldı");
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>

                      {/* Özet */}
                      <div className="p-4 border-t bg-muted/30">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Ara Toplam</span>
                            <span className="font-medium">{formatPrice(total)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Kargo</span>
                            <span>
                              {shippingCost === 0 ? (
                                <span className="font-medium text-green-600">Ücretsiz</span>
                              ) : (
                                formatPrice(shippingCost)
                              )}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between text-lg font-bold mb-4 pb-4 border-b">
                          <span>Toplam</span>
                          <span className="text-accent">{formatPrice(finalTotal)}</span>
                        </div>
                        {total < freeShippingThreshold && (
                          <p className="text-xs text-amber-600 mb-4">
                            🎁 Ücretsiz kargo için {formatPrice(freeShippingThreshold - total)} daha ekleyin
                          </p>
                        )}
                        <Link to="/sepet" onClick={() => setCartOpen(false)}>
                          <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                            Sepete Git
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="lg:hidden border-t py-4 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navMenuItems.map((item) =>
                item.type === "dropdown" ? (
                  <div key={item.label} className="flex flex-col">
                    <button
                      onClick={() => setCategoryDropdownOpen(categoryDropdownOpen === item.slug ? null : item.slug)}
                      className="flex items-center justify-between px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    >
                      {item.label}
                      <ChevronDown className={`h-4 w-4 transition-transform ${categoryDropdownOpen === item.slug ? "rotate-180" : ""}`} />
                    </button>
                    {categoryDropdownOpen === item.slug && (
                      <div className="pl-6 py-1 flex flex-col gap-1">
                        {item.subcategories.map((sub) => (
                          <Link
                            key={sub.to}
                            to={sub.to}
                            onClick={() => {
                              setMobileOpen(false);
                              setCategoryDropdownOpen(null);
                            }}
                            className="px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-muted rounded-md transition-colors flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp ile İletişim
              </a>
              {isAuthenticated ? (
                <>
                  <Link
                    to="/hesabim"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Hesabım
                  </Link>
                  <Link
                    to="/hesabim/siparisler"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                  >
                    <Package className="h-4 w-4" />
                    Siparişlerim
                  </Link>
                  <Link
                    to="/hesabim/adresler"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                  >
                    <MapPin className="h-4 w-4" />
                    Adreslerim
                  </Link>
                  <Link
                    to="/profil"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Profilim
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Çıkış Yap
                  </button>
                </>
              ) : (
                <Link
                  to="/giris"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Giriş Yap
                </Link>
              )}
            </nav>
          </div>
        )}

        {/* Mobile Search */}
        {searchOpen && (
          <div className="md:hidden border-t p-4 animate-fade-in">
            <SearchBar onClose={() => setSearchOpen(false)} isMobile />
          </div>
        )}
      </div>
    </header>
  );
}

