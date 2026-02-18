import { Helmet } from "react-helmet-async";

const PRODUCT_GROUPS = [
  "LED Ampul Çeşitleri",
  "Rustik (Vintage) Ampuller",
  "RGB Saçak LED Sistemleri",
  "Meteor LED Işık Sistemleri",
  "Yılbaşı Işıkları ve Dekoratif Setler",
  "Ramazan Ay Yıldız Işık Setleri",
  "İç Mekân ve Dış Mekân LED Aydınlatma Ürünleri",
];

export default function HakkımızdaPage() {
  return (
    <>
      <Helmet>
        <title>Hakkımızda - Sencan Aydınlatma | Karaköy LED Ampul ve Dekoratif Aydınlatma Mağazası</title>
        <meta
          name="description"
          content="Sencan Aydınlatma - Karaköy LED ampul mağazası. 40 yılı aşkın tecrübe ile saçak LED, meteor LED, yılbaşı ışıkları ve Ramazan aydınlatma ürünleri. İstanbul Karaköy'de perakende ve toptan satış."
        />
        <link rel="canonical" href="https://sencanaydinlatma.com/hakkimizda" />
        <meta property="og:title" content="Hakkımızda - Sencan Aydınlatma | Karaköy LED Ampul ve Dekoratif Aydınlatma" />
        <meta property="og:description" content="40 yılı aşkın tecrübeye sahip Karaköy LED ampul ve dekoratif aydınlatma mağazası. Yılbaşı ışıkları, saçak LED, meteor LED, Ramazan aydınlatma ürünleri." />
        <meta property="og:url" content="https://sencanaydinlatma.com/hakkimizda" />
      </Helmet>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Sencan Aydınlatma | Karaköy LED Ampul ve Dekoratif Aydınlatma Mağazası
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-8">Hakkımızda</h2>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p>
              Sencan Aydınlatma, İstanbul Karaköy'de faaliyet gösteren ve 40 yılı aşkın tecrübeye sahip köklü bir LED aydınlatma firmasıdır. Karaköy LED ampul mağazası olarak hem perakende hem toptan satış hizmeti sunmaktayız.
            </p>
            <p>
              LED ampul, rustik ampul, RGB saçak LED, meteor LED ışık sistemleri, yılbaşı ışıkları ve Ramazan ay yıldız ışık setleri başta olmak üzere iç ve dış mekân dekoratif aydınlatma ürünlerinde geniş ürün yelpazesi sunuyoruz.
            </p>
            <p>
              Ev, ofis, mağaza, vitrin, cephe ve bahçe aydınlatmalarında hem estetik hem enerji tasarruflu çözümler sağlıyoruz. İstanbul genelinde hızlı tedarik ve uygun fiyat avantajı ile bireysel ve kurumsal müşterilerimize kaliteli ve uzun ömürlü LED aydınlatma ürünleri sunmaktayız.
            </p>
          </div>

          <section className="mt-12">
            <h3 className="text-xl font-semibold text-foreground mb-6">Ürün Gruplarımız</h3>
            <ul className="space-y-3">
              {PRODUCT_GROUPS.map((group) => (
                <li key={group} className="flex items-center gap-2 text-foreground">
                  <span className="text-accent">•</span>
                  {group}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
