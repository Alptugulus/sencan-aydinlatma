import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  User,
} from "lucide-react";

const menuItems = [
  {
    label: "Hesabım",
    icon: LayoutDashboard,
    path: "/hesabim",
  },
  {
    label: "Siparişlerim",
    icon: Package,
    path: "/hesabim/siparisler",
  },
  {
    label: "Adreslerim",
    icon: MapPin,
    path: "/hesabim/adresler",
  },
  {
    label: "Profilim",
    icon: User,
    path: "/profil",
  },
];

export default function AccountTabs() {
  const location = useLocation();

  return (
    <div className="lg:hidden border-b mb-6">
      <nav className="flex overflow-x-auto scrollbar-hide">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                isActive
                  ? "border-accent text-accent"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

