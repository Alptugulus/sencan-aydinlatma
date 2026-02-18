import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "../components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası - Sencan Aydınlatma</title>
        <meta
          name="description"
          content="Sencan Aydınlatma gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgiler."
        />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-h2 font-bold text-foreground mb-8">
            Gizlilik Politikası
          </h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Genel Bilgiler</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sencan Aydınlatma olarak, kişisel verilerinizin korunmasına büyük önem veriyoruz.
                  Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi
                  kullandığınızda toplanan bilgilerin nasıl kullanıldığını açıklamaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Toplanan Bilgiler</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Topladığımız bilgiler:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Ad, soyad, e-posta adresi, telefon numarası</li>
                  <li>Teslimat adresi bilgileri</li>
                  <li>Ödeme bilgileri (güvenli şekilde işlenir)</li>
                  <li>Sipariş geçmişi</li>
                  <li>Web sitesi kullanım verileri</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Bilgilerin Kullanımı</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Toplanan bilgiler, siparişlerinizin işlenmesi, teslimat, müşteri hizmetleri
                  ve yasal yükümlülüklerimizin yerine getirilmesi amacıyla kullanılmaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Veri Güvenliği</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kişisel verileriniz SSL şifreleme teknolojisi ile korunmaktadır. Tüm ödemeler
                  güvenli ödeme sistemleri üzerinden gerçekleştirilmektedir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. Çerezler (Cookies)</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır.
                  Çerez ayarlarınızı tarayıcınızdan yönetebilirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Haklarınız</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  KVKK kapsamında sahip olduğunuz haklar:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Kişisel verilerinize erişim hakkı</li>
                  <li>Düzeltme ve silme hakkı</li>
                  <li>İtiraz etme hakkı</li>
                  <li>Veri taşınabilirliği hakkı</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. İletişim</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Gizlilik politikamız hakkında sorularınız için{" "}
                  <a href="/iletisim" className="text-accent hover:underline">
                    iletişim sayfamızdan
                  </a>{" "}
                  bize ulaşabilirsiniz.
                </p>
              </section>

              <div className="pt-4 border-t text-sm text-muted-foreground">
                <p>Son güncelleme: {new Date().toLocaleDateString("tr-TR")}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

