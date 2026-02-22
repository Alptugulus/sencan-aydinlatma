import { Helmet } from "react-helmet-async";
import { Phone, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { CONTACT_INFO, getPhoneUrl, getEmailUrl, getWhatsAppUrl } from "../lib/constants";

export default function ContactPage() {
  const fullAddress = `${CONTACT_INFO.address.full}, ${CONTACT_INFO.address.postalCode} ${CONTACT_INFO.address.district}/${CONTACT_INFO.address.city}, ${CONTACT_INFO.address.country}`;
  const mapsSearchUrl = CONTACT_INFO.googleMaps;
  const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${CONTACT_INFO.mapCoordinates.lat},${CONTACT_INFO.mapCoordinates.lng}`;
  const mapsEmbedUrl = `https://www.google.com/maps?hl=tr&q=${CONTACT_INFO.mapCoordinates.lat},${CONTACT_INFO.mapCoordinates.lng}&z=16&output=embed`;

  return (
    <>
      <Helmet>
        <title>İletişim - Sencan Aydınlatma | Karaköy LED ve Dekoratif Aydınlatma</title>
        <meta
          name="description"
          content="Sencan Aydınlatma iletişim. Karaköy LED ampul mağazası. Adres: Emekyemez Mah. Okçumusa Cad. Tutsak Sok. No:15/5, Karaköy İstanbul. Tel: 0212 253 91 10, WhatsApp: 0532 642 48 16."
        />
        <link rel="canonical" href="https://sencanaydinlatma.com/iletisim" />
        <meta property="og:title" content="İletişim - Sencan Aydınlatma | Karaköy LED ve Dekoratif Aydınlatma" />
        <meta property="og:url" content="https://sencanaydinlatma.com/iletisim" />
      </Helmet>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Sencan Aydınlatma | Karaköy LED ve Dekoratif Aydınlatma
          </h1>
          <h2 className="text-2xl font-semibold text-muted-foreground mb-12">İletişim</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Adres */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  <CardTitle>Adres</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">
                  {CONTACT_INFO.address.full}
                </p>
                <p className="text-muted-foreground mt-1">
                  {CONTACT_INFO.address.postalCode} {CONTACT_INFO.address.district} – {CONTACT_INFO.address.city}
                </p>
                <Button asChild variant="outline" className="mt-4">
                  <a
                    href={mapsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Haritada Göster
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Telefon */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Phone className="h-6 w-6 text-primary" />
                  <CardTitle>Telefon</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={getPhoneUrl(CONTACT_INFO.phone.landlineFormatted)}
                  className="text-xl font-semibold text-primary hover:underline"
                >
                  0212 253 91 10
                </a>
                <Button asChild className="mt-4 w-full">
                  <a href={getPhoneUrl(CONTACT_INFO.phone.landlineFormatted)}>Ara</a>
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MessageCircle className="h-6 w-6 text-green-600" />
                  <CardTitle>WhatsApp</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-semibold text-green-600">0532 642 48 16</p>
                <Button
                  asChild
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    WhatsApp ile Mesaj Gönder
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* E-posta */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-6 w-6 text-primary" />
                  <CardTitle>E-posta</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <a
                  href={getEmailUrl()}
                  className="text-lg font-medium text-primary hover:underline break-all"
                >
                  info@sencanaydinlatma.com
                </a>
                <Button asChild variant="outline" className="mt-4 w-full">
                  <a href={getEmailUrl("Sencan Aydınlatma İletişim", "Merhaba,")}>
                    E-posta Gönder
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Google Maps */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-6 w-6 text-primary" />
                <CardTitle>Google Haritalar</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-hidden rounded-lg border border-border">
                <iframe
                  title="Sencan Aydinlatma Google Haritalar Konumu"
                  src={mapsEmbedUrl}
                  className="h-[300px] w-full md:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                Karaköy konumumuzu harita üzerinden açıp tek tıkla yol tarifi alabilirsiniz.
              </p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <Button asChild className="w-full sm:w-auto">
                  <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer">
                    Yol Tarifi Al
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer">
                    Google Maps'te Aç
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Instagram */}
          <Card className="mt-6">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <Instagram className="h-6 w-6 text-pink-600" />
                <CardTitle>Instagram</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <a
                href={CONTACT_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-primary hover:underline"
              >
                https://www.instagram.com/sencanelektrik/
              </a>
              <Button asChild variant="outline" className="mt-4">
                <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram'da Takip Et
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
