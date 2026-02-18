import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { MAIN_CATEGORIES_FOR_GRID } from "../data/categories";

export default function CategoryGrid() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container-custom">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foreground md:text-4xl">
            Kategoriler
          </h2>
          <p className="mt-2 text-muted-foreground">
            İhtiyacınıza uygun aydınlatma çözümünü bulun
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MAIN_CATEGORIES_FOR_GRID.map((category) => (
            <Link key={category.slug} to={`/kategori/${category.slug}`}>
              <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg border border-border">
                {/* Görsel: %80 alan kaplar, hover'da zoom (Doküman: 04-ux-akis) */}
                <div className="relative aspect-[4/3] overflow-hidden bg-muted rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-white/90 line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

