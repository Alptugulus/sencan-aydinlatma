import { Helmet } from "react-helmet-async";
import { Card, CardContent } from "../components/ui/card";

export default function KVKKPage() {
  return (
    <>
      <Helmet>
        <title>KVKK Aydınlatma Metni - Sencan Aydınlatma</title>
        <meta
          name="description"
          content="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında aydınlatma metni."
        />
      </Helmet>
      <div className="container-custom py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-h2 font-bold text-foreground mb-8">
            KVKK Aydınlatma Metni
          </h1>

          <Card>
            <CardContent className="p-6 md:p-8 space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-4">Veri Sorumlusu</h2>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Sencan Aydınlatma</strong>
                  <br />
                  Adres: Emekyemez Mahallesi Okçumusa Cad Tutsak Sokak No: 15/5, 34420 İstanbul
                  <br />
                  Telefon: 0532 642 4816 / 0212 253 91 10
                  <br />
                  E-posta: info@sencanaydinlatma.com
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Kişisel Verilerin İşlenme Amaçları
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Siparişlerinizin işlenmesi ve teslimatı</li>
                  <li>Müşteri hizmetleri faaliyetlerinin yürütülmesi</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                  <li>Pazarlama ve iletişim faaliyetleri (izin verilmesi halinde)</li>
                  <li>Web sitesi analizi ve iyileştirme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">
                  İşlenen Kişisel Veriler
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  İşlediğimiz kişisel veriler:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Kimlik bilgileri (ad, soyad)</li>
                  <li>İletişim bilgileri (telefon, e-posta, adres)</li>
                  <li>Müşteri işlem bilgileri (sipariş geçmişi)</li>
                  <li>Finansal bilgiler (ödeme bilgileri - güvenli şekilde)</li>
                  <li>İşlem güvenliği bilgileri (IP adresi, çerez bilgileri)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">
                  Kişisel Verilerin Aktarılması
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Kişisel verileriniz, yasal yükümlülükler ve hizmet kalitesi için
                  kargo firmaları, ödeme kuruluşları ve yasal mercilerle paylaşılabilir.
                  Tüm aktarımlar KVKK'ya uygun şekilde gerçekleştirilmektedir.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Haklarınız</h2>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  6698 sayılı KVKK'nın 11. maddesi uyarınca sahip olduğunuz haklar:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                  <li>İşlenmesini gerektiren sebeplerin ortadan kalkması halinde silinmesini veya yok edilmesini isteme</li>
                  <li>Düzeltme, silme, yok etme işlemlerinin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
                  <li>İşlenen verilerin münhasıran otomatik sistemler ile analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
                  <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">Başvuru Hakkı</h2>
                <p className="text-muted-foreground leading-relaxed">
                  KVKK'ya aykırı işlemler nedeniyle şikayetlerinizi Kişisel Verileri Koruma
                  Kurulu'na iletebilirsiniz. Detaylı bilgi için{" "}
                  <a
                    href="https://kvkk.gov.tr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline"
                  >
                    kvkk.gov.tr
                  </a>{" "}
                  adresini ziyaret edebilirsiniz.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4">İletişim</h2>
                <p className="text-muted-foreground leading-relaxed">
                  KVKK kapsamındaki haklarınızı kullanmak için{" "}
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

