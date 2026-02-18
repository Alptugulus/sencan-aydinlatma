import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "../components/ui/card";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Mesafeli Satış Sözleşmesi - Sencan Aydınlatma</title>
        <meta
          name="description"
          content="Sencan Aydınlatma mesafeli satış sözleşmesi ve kullanım koşulları."
        />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-h2 font-bold text-foreground mb-8">
            Mesafeli Satış Sözleşmesi
          </h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">1. Taraflar</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu sözleşme, aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar
                  çerçevesinde "Mesafeli Satış Sözleşmesi" olarak düzenlenmiştir.
                </p>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  <strong>Satıcı:</strong> Sencan Aydınlatma
                  <br />
                  Adres: Emekyemez Mahallesi Okçumusa Cad Tutsak Sokak No: 15/5, 34420 İstanbul
                  <br />
                  Telefon: 0532 642 4816 / 0212 253 91 10
                  <br />
                  E-posta: info@sencanaydinlatma.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">2. Konu</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu sözleşmenin konusu, alıcının satıcıdan elektronik ortamda sipariş verdiği
                  ürünlerin satışı ve teslimi ile ilgili tarafların hak ve yükümlülüklerinin
                  belirlenmesidir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">3. Sipariş ve Ödeme</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Sipariş süreci:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Ürünlerin seçilmesi ve sepete eklenmesi</li>
                  <li>Adres ve ödeme bilgilerinin girilmesi</li>
                  <li>Siparişin onaylanması</li>
                  <li>Ödemenin tamamlanması</li>
                </ul>
                <p className="text-muted-foreground leading-relaxed mt-3">
                  Ödeme, sipariş onayından sonra alınır. Kredi kartı, banka kartı, kapıda ödeme
                  ve havale/EFT ile ödeme yapabilirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">4. Teslimat</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Ürünler, siparişinizin onaylanmasından sonra 1-3 iş günü içinde kargoya verilir.
                  İstanbul içi 1-2 gün, Türkiye geneli 2-5 gün içinde teslim edilir. 500₺ ve
                  üzeri siparişlerde ücretsiz kargo hizmeti sunulmaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">5. İade ve İptal</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  İade koşulları:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>14 gün içinde iade edebilirsiniz</li>
                  <li>Ürünler orijinal ambalajında ve hasarsız olmalıdır</li>
                  <li>Kullanılmış veya hasarlı ürünler iade edilemez</li>
                  <li>İade kargo ücreti müşteriye aittir (ürün hatası hariç)</li>
                  <li>İade işlemi onaylandıktan sonra ödeme 7-14 iş günü içinde iade edilir</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">6. Garanti</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Tüm ürünlerimiz 2 yıl garantilidir. Garanti kapsamı üretici garantisi ile
                  sınırlıdır. Garanti kapsamı dışındaki arızalar için ücretli servis hizmeti
                  sunulmaktadır.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">7. Uyuşmazlıkların Çözümü</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Bu sözleşmeden kaynaklanan uyuşmazlıkların çözümünde Türkiye Cumhuriyeti
                  yasaları uygulanır. İstanbul Mahkemeleri yetkilidir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">8. İletişim</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Sözleşme hakkında sorularınız için{" "}
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

