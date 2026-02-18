import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      <div className="container-custom py-12 md:py-20 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          {/* H1 - Sadece Hero alanında kullanılır (Doküman: 01-tasarim-stratejisi) */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-hero mb-6">
            Modern Aydınlatma{" "}
            <span className="text-accent">Çözümleri</span>
          </h1>
          {/* Alt mesaj - Max 2 satır (Doküman: 04-ux-akis) */}
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
            Yaşam alanlarınızı aydınlatan, enerji tasarruflu ve modern tasarımlı
            aydınlatma ürünleri ile evinize değer katın.
          </p>
          {/* CTA Butonları - Büyük ve belirgin (Doküman: 04-ux-akis) */}
          <div className="mt-8 md:mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row flex-wrap">
            <Link to="/kategori/ampul">
              <Button 
                size="lg" 
                className="text-base md:text-lg px-8 py-6 h-auto bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Ürünleri Keşfet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/kategori/ic-mekan">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-8 py-6 h-auto border-2"
              >
                İç Mekan
              </Button>
            </Link>
            <Link to="/kategori/dis-mekan">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base md:text-lg px-8 py-6 h-auto border-2"
              >
                Dış Mekan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

