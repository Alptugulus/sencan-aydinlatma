import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "../components/ui/button";
import { Home } from "lucide-react";

export default function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>Sayfa Bulunamadı - Sencan Aydınlatma</title>
      </Helmet>
      <div className="container-custom py-16 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Sayfa Bulunamadı</h2>
          <p className="text-muted-foreground mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <Link to="/">
            <Button size="lg">
              <Home className="mr-2 h-5 w-5" />
              Ana Sayfaya Dön
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

