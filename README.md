# 🎨 Sencan Aydınlatma - E-Ticaret Platformu

Modern, responsive ve kullanıcı dostu aydınlatma e-ticaret platformu. Dokümanlara göre tasarlanmış, production-ready e-ticaret çözümü.

## ✨ Özellikler

- 🎯 **Premium ama Sade Tasarım**: Minimal ve modern UI/UX
- 📱 **Mobile First**: Mobil öncelikli responsive tasarım
- 🛒 **Sepet Sistemi**: Zustand ile state management, mini cart dropdown
- 💳 **3 Adımlı Checkout**: Adres → Ödeme → Onay (Progress bar, form validasyonu)
- 🎨 **Tasarım Sistemi**: Tailwind CSS + Shadcn UI
- ⚡ **Performans**: Vite, code splitting, lazy loading
- ♿ **Accessibility**: WCAG AA uyumlu, ARIA etiketleri, klavye navigasyonu
- 🔍 **SEO Uyumlu**: Meta tags, Schema markup, Breadcrumb, robots.txt
- 🎁 **Dönüşüm Artırıcı**: Flash Sale, kupon sistemi, ürün önerileri
- 📊 **Analytics Hazırlığı**: Event tracking için hazır yapı
- 🔒 **Güven Elementleri**: SSL badge, 3D Secure, güvenli ödeme
- 📞 **İletişim Widget**: Floating "Bize Ulaşın" widget'ı
- 🔎 **Arama**: Gerçek zamanlı ürün arama
- 🎛️ **Filtreler**: Fiyat, stok durumu, sıralama

## 🎨 Tasarım Sistemi

### Renk Paleti
- **Ana Renk**: Soft siyah / antrasit (#111827)
- **Aksiyon Rengi**: Sıcak sarı / amber (ışık hissi)
- **Destek Renkleri**: Açık gri, border gri

### Tipografi
- **Başlık**: Inter / Poppins / Manrope (Bold & SemiBold)
- **Gövde**: Regular / Medium

### Layout
- **Container Max Width**: 1280px
- **Grid**: 12 column desktop, 8 column tablet, 4 column mobile

## 🚀 Kurulum

```bash
# Bağımlılıkları yükle
npm install
# veya
pnpm install

# Development server'ı başlat
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

## 📁 Proje Yapısı

```
sencan-aydinlatma/
├── client/
│   ├── components/      # React bileşenleri
│   │   ├── ui/          # Shadcn UI bileşenleri
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── ...
│   ├── pages/           # Sayfa bileşenleri
│   ├── hooks/           # Custom hooks
│   ├── lib/             # Utility fonksiyonları
│   ├── data/            # Statik veri
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/              # Statik dosyalar
├── index.html
├── package.json
├── tailwind.config.ts
└── vite.config.ts
```

## 🛍️ Özellikler Detayı

### Ana Sayfa
- Hero bölümü (CTA butonları)
- Kategori grid'i (4 kategori, hover efektleri)
- Flash Sale (gerisayım timer, indirim badge'leri)
- Öne çıkan ürünler

### Ürün Sayfaları
- Kategori bazlı ürün listesi
- Filtreler ve sıralama (sidebar/drawer)
- Ürün detay sayfası (görsel galeri, sticky CTA mobilde)
- Benzer ürünler önerisi
- "Bu ürünü alanlar şunları da aldı" özelliği
- Sepete ekleme (analytics tracking)

### Sepet
- Ürün ekleme/çıkarma
- Adet güncelleme
- Toplam hesaplama
- Ücretsiz kargo göstergesi (dinamik)
- Kupon kodu sistemi (WELCOME10, SENCAN20, FLASH30)
- Mini cart dropdown (header'da)

### Checkout
- 3 adımlı süreç (Adres → Ödeme → Onay)
- Sticky progress bar
- Gerçek zamanlı form validasyonu
- Güven rozetleri (SSL, 3D Secure)
- Sipariş özeti (sticky sidebar)
- KVKK ve sözleşme onayları
- Analytics: Purchase tracking

## 🎯 UX İlkeleri

- ✅ 3 tıklama kuralı
- ✅ 2 saniye yükleme kuralı
- ✅ Net CTA butonları
- ✅ Beyaz alan kullanımı
- ✅ Micro interactions (hover, transitions)
- ✅ Toast bildirimleri
- ✅ Skeleton loading
- ✅ Empty states
- ✅ Error boundaries
- ✅ Scroll to top

## 🔒 Güven Elementleri

- SSL badge (footer, checkout)
- "Güvenli Ödeme" mesajı
- "14 Gün İade" garantisi
- 3D Secure bilgilendirmesi
- İletişim bilgileri (footer, contact page, widget)
- Güvenli ödeme rozetleri

## 📱 Responsive Breakpoints

- **Mobile**: 0-640px
- **Tablet**: 640-1024px
- **Desktop**: 1024px+

## 🛠️ Teknolojiler

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn UI** - Component library
- **React Router** - Routing
- **Zustand** - State management
- **Sonner** - Toast notifications
- **React Helmet Async** - SEO

## 📝 Notlar

- Ürün verileri şu anda statik (`client/data/products.ts`)
- Gerçek bir projede API entegrasyonu gerekir
- Ödeme sistemi demo amaçlıdır
- Görseller placeholder olarak Unsplash kullanıyor
- Analytics için Google Analytics 4 (GA4) entegrasyonu yapılmalı
- PWA için service worker eklenebilir

## 📚 Dokümantasyon

Detaylı tasarım dokümantasyonu `docs/` klasöründe:
- `01-tasarim-stratejisi-ve-marka-kimligi.md`
- `02-renk-paleti-ve-typography.md`
- `03-layout-ve-responsive-tasarim.md`
- `04-ux-akis-ve-sayfa-tasarimlari.md`
- `05-guven-elementleri-ve-etkilesimler.md`
- `06-seo-performans-ve-accessibility.md`
- `07-donusum-artirici-ozellikler.md`
- `08-teknik-detaylar-ve-implementasyon.md`

## 🎉 Tamamlanan Özellikler

✅ Tasarım sistemi (renkler, typography, spacing)  
✅ Tüm sayfa tasarımları  
✅ SEO optimizasyonu (meta tags, schema, breadcrumb)  
✅ Performans optimizasyonu (code splitting, lazy loading)  
✅ Erişilebilirlik (WCAG AA, ARIA, keyboard navigation)  
✅ Dönüşüm artırıcı özellikler (flash sale, kupon, öneriler)  
✅ Analytics hazırlığı  
✅ PWA hazırlığı (manifest.json)  
✅ Error handling (Error Boundary)  
✅ Arama ve filtreleme  
✅ İletişim widget'ı  
✅ Mini cart dropdown

## 📄 Lisans

Bu proje özel bir projedir.

