import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Shield, Truck, RotateCcw, MessageCircle } from "lucide-react";
import { CONTACT_INFO, getPhoneUrl, getEmailUrl, getWhatsAppUrl } from "../lib/constants";
import logoImage from "../images/sencan-logo-buyuk-yatay-1356x436.webp";

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-white" role="contentinfo">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logoImage} 
                alt="Sencan Aydınlatma" 
                className="h-12 w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-white/80 mb-4">
              Modern aydınlatma çözümleri ile yaşam alanlarınızı aydınlatıyoruz.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <a href={getPhoneUrl(CONTACT_INFO.phone.mobileFormatted)} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phone.mobile}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <a href={getPhoneUrl(CONTACT_INFO.phone.landlineFormatted)} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phone.landline}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MessageCircle className="h-4 w-4" />
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {CONTACT_INFO.whatsapp.number}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <a href={getEmailUrl()} className="hover:text-white transition-colors">
                  {CONTACT_INFO.email}
                </a>
              </div>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span className="leading-relaxed">
                  {CONTACT_INFO.address.full}<br />
                  {CONTACT_INFO.address.city} {CONTACT_INFO.address.postalCode}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Hızlı Linkler</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link to="/kategori/ampul" className="text-white/80 hover:text-white transition-colors">
                  Ampul
                </Link>
              </li>
              <li>
                <Link to="/kategori/ic-mekan" className="text-white/80 hover:text-white transition-colors">
                  İç Mekan
                </Link>
              </li>
              <li>
                <Link to="/kategori/dis-mekan" className="text-white/80 hover:text-white transition-colors">
                  Dış Mekan
                </Link>
              </li>
              <li>
                <Link to="/kategori/ic-mekan/yilbasi" className="text-white/80 hover:text-white transition-colors">
                  Yılbaşı Işıkları
                </Link>
              </li>
              <li>
                <Link to="/kategori/ic-mekan/ramazan" className="text-white/80 hover:text-white transition-colors">
                  Ramazan Aydınlatma
                </Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-white/80 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-white/80 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust Signals */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Güven</h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2 text-white/80">
                <Shield className="h-4 w-4 text-accent" />
                <span>Güvenli Ödeme</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <Truck className="h-4 w-4 text-accent" />
                <span>Ücretsiz Kargo (500₺ üzeri)</span>
              </li>
              <li className="flex items-center gap-2 text-white/80">
                <RotateCcw className="h-4 w-4 text-accent" />
                <span>14 Gün İade Garantisi</span>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Müşteri Hizmetleri</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <Link to="/sss" className="hover:text-white transition-colors">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link to="/gizlilik" className="hover:text-white transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link to="/iade" className="hover:text-white transition-colors">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link to="/kvkk" className="hover:text-white transition-colors">
                  KVKK Aydınlatma Metni
                </Link>
              </li>
              <li>
                <Link to="/sozlesme" className="hover:text-white transition-colors">
                  Mesafeli Satış Sözleşmesi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/80">
          <p>© 2025 {CONTACT_INFO.company}. Tüm hakları saklıdır.</p>
          <div className="flex items-center gap-2">
            <span>SSL ile korunuyor</span>
            <Shield className="h-4 w-4 text-accent" />
          </div>
        </div>
      </div>
    </footer>
  );
}

