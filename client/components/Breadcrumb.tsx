import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const allItems = [{ label: "Ana Sayfa", to: "/" }, ...items];

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
        {allItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4" />}
            {item.to && index < allItems.length - 1 ? (
              <Link
                to={item.to}
                className="hover:text-foreground transition-colors flex items-center gap-1"
              >
                {index === 0 && <Home className="h-3 w-3" />}
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground font-medium flex items-center gap-1">
                {index === 0 && <Home className="h-3 w-3" />}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
      
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: allItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.label,
              item: item.to ? `${typeof window !== "undefined" ? window.location.origin : ""}${item.to}` : undefined,
            })),
          }),
        }}
      />
    </nav>
  );
}

