import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Package, 
  MapPin, 
  User,
  Home
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

export default function AccountSidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <nav className="space-y-1">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors mb-4"
        >
          <Home className="h-4 w-4" />
          Ana Sayfa
        </Link>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-accent/10 text-accent border-l-2 border-accent"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

