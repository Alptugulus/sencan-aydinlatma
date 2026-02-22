import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { CONTACT_INFO, getPhoneUrl, getEmailUrl, getWhatsAppUrl } from "../lib/constants";
import logoImage from "../images/sencan-logo-buyuk-yatay-1356x436.webp";

export default function Footer() {
  return (
    <footer className="border-t bg-primary text-white" role="contentinfo">
      <div className="container-custom py-9 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] gap-6 md:gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="max-w-sm">
            <Link to="/" className="inline-block mb-4">
              <img 
                src={logoImage} 
                alt="Sencan Aydınlatma" 
                className="h-12 w-auto object-contain brightness-0 invert"
                loading="lazy"
              />
            </Link>
            <p className="text-sm text-white/75 mb-4">
              Modern aydınlatma çözümleri ile yaşam alanlarınızı aydınlatıyoruz.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="h-4 w-4" />
                <a href={getPhoneUrl(CONTACT_INFO.phone.mobileFormatted)} className="inline-flex py-0.5 hover:text-white transition-colors">
                  {CONTACT_INFO.phone.mobile}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <MessageCircle className="h-4 w-4" />
                <a 
                  href={getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex py-0.5 hover:text-white transition-colors"
                >
                  WhatsApp: {CONTACT_INFO.whatsapp.number}
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4" />
                <a href={getEmailUrl()} className="inline-flex py-0.5 hover:text-white transition-colors">
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
            <div className="mt-4 rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80">
              <p>Pzt-Cum: {CONTACT_INFO.workingHours.weekdays}</p>
              <p>Cmt: {CONTACT_INFO.workingHours.saturday}</p>
              <p>Pazar: {CONTACT_INFO.workingHours.sunday}</p>
            </div>
            <div className="mt-2 text-xs text-white/60">
              Sabit Hat:{" "}
              <a href={getPhoneUrl(CONTACT_INFO.phone.landlineFormatted)} className="inline-flex py-0.5 hover:text-white transition-colors">
                {CONTACT_INFO.phone.landline}
              </a>
              <span className="mx-1">•</span>
              <a
                href={CONTACT_INFO.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex py-0.5 hover:text-white transition-colors"
              >
                Haritada Aç
              </a>
            </div>
          </div>

          {/* Categories */}
          <div className="pt-2 sm:pt-0 border-t border-white/10 sm:border-0">
            <h3 className="text-sm font-semibold mb-3 text-white uppercase tracking-wide">Kategoriler</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <Link to="/kategori/ampul" className="inline-flex py-0.5 hover:text-white transition-colors">
                  Ampul
                </Link>
              </li>
              <li>
                <Link to="/kategori/ic-mekan" className="inline-flex py-0.5 hover:text-white transition-colors">
                  İç Mekan
                </Link>
              </li>
              <li>
                <Link to="/kategori/dis-mekan" className="inline-flex py-0.5 hover:text-white transition-colors">
                  Dış Mekan
                </Link>
              </li>
              <li>
                <Link to="/kategori/ic-mekan/yilbasi" className="inline-flex py-0.5 hover:text-white transition-colors">
                  Yılbaşı Işıkları
                </Link>
              </li>
              <li>
                <Link to="/kategori/ic-mekan/ramazan" className="inline-flex py-0.5 hover:text-white transition-colors">
                  Ramazan Aydınlatma
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="pt-2 sm:pt-0 border-t border-white/10 sm:border-0">
            <h3 className="text-sm font-semibold mb-3 text-white uppercase tracking-wide">Müşteri Hizmetleri</h3>
            <ul className="flex flex-col gap-2 text-sm text-white/80">
              <li>
                <Link to="/sss" className="inline-flex py-0.5 hover:text-white transition-colors">
                  Sık Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link to="/iletisim" className="inline-flex py-0.5 hover:text-white transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link to="/iade" className="inline-flex py-0.5 hover:text-white transition-colors">
                  İade ve Değişim
                </Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="inline-flex py-0.5 hover:text-white transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <a
                  href={CONTACT_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex py-0.5 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </footer>
  );
}

