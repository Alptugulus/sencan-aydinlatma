import { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, X, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { CONTACT_INFO, getPhoneUrl, getEmailUrl, getWhatsAppUrl } from "../lib/constants";

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
      {/* Main Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90 text-white"
          aria-label="Bize ulaşın - İletişim seçeneklerini göster"
          aria-expanded={isOpen}
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        </Button>
      )}

      {/* Expanded Widget */}
      {isOpen && (
        <div 
          className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 w-[calc(100vw-2rem)] max-w-sm md:w-80 animate-in slide-in-from-bottom-5 duration-300"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-widget-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 id="contact-widget-title" className="text-lg font-semibold">Bize Ulaşın</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
              aria-label="İletişim widget'ını kapat"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {/* Contact Options */}
          <div className="space-y-3">
            {/* WhatsApp */}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">WhatsApp</p>
                <p className="text-xs text-gray-600">{CONTACT_INFO.whatsapp.number}</p>
              </div>
            </a>

            {/* Phone - Mobile */}
            <a
              href={getPhoneUrl(CONTACT_INFO.phone.mobileFormatted)}
              className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">Telefon</p>
                <p className="text-xs text-gray-600">{CONTACT_INFO.phone.mobile}</p>
              </div>
            </a>

            {/* Email */}
            <a
              href={getEmailUrl()}
              className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 hover:bg-amber-100 transition-colors group"
            >
              <div className="h-10 w-10 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">E-posta</p>
                <p className="text-xs text-gray-600 truncate">{CONTACT_INFO.email}</p>
              </div>
            </a>

            {/* Contact Page Link */}
            <Link
              to="/iletisim"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              Tüm İletişim Bilgileri
              <ChevronUp className="h-4 w-4 rotate-90" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

