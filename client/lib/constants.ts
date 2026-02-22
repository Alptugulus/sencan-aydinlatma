// İletişim Bilgileri
export const CONTACT_INFO = {
  company: "Sencan Aydınlatma",
  address: {
    full: "Emekyemez Mah Okcumusa cad, Tutsak Sk. no:15/5",
    district: "Beyoğlu",
    city: "İstanbul",
    postalCode: "34421",
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
  googleMaps: "https://www.google.com/maps/place/%C5%9Eencan+Elektrik/@41.006104,28.7555997,12z/data=!4m6!3m5!1s0x14cab9e688239c1f:0xf707b3107dc5bd29!8m2!3d41.0265724!4d28.9712564!16s%2Fg%2F11df0pm38w",
  mapCoordinates: {
    lat: 41.0265951237085,
    lng: 28.97125608589783,
  },
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

