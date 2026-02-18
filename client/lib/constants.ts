// İletişim Bilgileri
export const CONTACT_INFO = {
  company: "Sencan Aydınlatma",
  address: {
    full: "Emekyemez Mah. Okçumusa Cad. Tutsak Sok. No:15/5",
    district: "Karaköy",
    city: "İstanbul",
    postalCode: "34420",
    country: "Türkiye",
  },
  phone: {
    mobile: "0532 642 48 16",
    mobileFormatted: "+905326424816",
    landline: "0212 253 91 10",
    landlineFormatted: "+902122539110",
  },
  whatsapp: {
    number: "0532 642 48 16",
    formatted: "+905326424816",
    message: "Merhaba, Sencan Aydınlatma hakkında bilgi almak istiyorum.",
  },
  email: "info@sencanaydinlatma.com",
  instagram: "https://www.instagram.com/sencanelektrik/",
  workingHours: {
    weekdays: "09:00 - 18:00",
    saturday: "09:00 - 14:00",
    sunday: "Kapalı",
  },
} as const;

// WhatsApp URL oluştur
export const getWhatsAppUrl = (message?: string) => {
  const text = message || CONTACT_INFO.whatsapp.message;
  return `https://wa.me/${CONTACT_INFO.whatsapp.formatted}?text=${encodeURIComponent(text)}`;
};

// Telefon URL oluştur
export const getPhoneUrl = (phone: string) => {
  return `tel:${phone}`;
};

// E-posta URL oluştur
export const getEmailUrl = (subject?: string, body?: string) => {
  const params = new URLSearchParams();
  if (subject) params.append("subject", subject);
  if (body) params.append("body", body);
  return `mailto:${CONTACT_INFO.email}${params.toString() ? `?${params.toString()}` : ""}`;
};

