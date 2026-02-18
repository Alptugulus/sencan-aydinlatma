# 🔍 SEO, Performans ve Erişilebilirlik

## 🔍 SEO (Search Engine Optimization)

### Meta Tags

#### Temel Meta Tags
```html
<!-- Title -->
<title>Sencan Aydınlatma - Modern Aydınlatma Çözümleri</title>

<!-- Description -->
<meta name="description" content="Modern aydınlatma ürünleri, LED ampuller, avize ve spot sistemleri. Kaliteli aydınlatma çözümleri için Sencan Aydınlatma.">

<!-- Keywords -->
<meta name="keywords" content="aydınlatma, led ampul, avize, spot, aydınlatma ürünleri">

<!-- Open Graph (Social Media) -->
<meta property="og:title" content="Sencan Aydınlatma">
<meta property="og:description" content="Modern aydınlatma çözümleri">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://sencanaydinlatma.com">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Sencan Aydınlatma">
<meta name="twitter:description" content="Modern aydınlatma çözümleri">
```

### URL Yapısı

#### SEO Dostu URL'ler

**Kategori URL'leri:**
```
/kategori/ic-mekan-aydinlatma
/kategori/dis-mekan-aydinlatma
/kategori/led-ampul
/kategori/spot-ray-sistemleri
```

**Ürün URL'leri:**
```
/urun/e27-9w-sicak-beyaz-led-ampul
/urun/avize-modern-kristal-5-kollu
/urun/spot-led-12w-3000k
```

**Kurallar:**
- ✅ Küçük harf kullan
- ✅ Türkçe karakterleri çevir (ş→s, ç→c, ğ→g)
- ✅ Tire (-) ile kelimeleri ayır
- ✅ Kısa ve açıklayıcı
- ✅ Anahtar kelimeleri içer

### Schema Markup

#### Ürün Schema
```json
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "E27 9W Sıcak Beyaz LED Ampul",
  "image": "https://example.com/urun-gorseli.jpg",
  "description": "Enerji tasarruflu LED ampul...",
  "brand": {
    "@type": "Brand",
    "name": "Sencan"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://example.com/urun/e27-9w",
    "priceCurrency": "TRY",
    "price": "89.90",
    "availability": "https://schema.org/InStock"
  }
}
```

#### Organization Schema
```json
{
  "@context": "https://schema.org/",
  "@type": "Organization",
  "name": "Sencan Aydınlatma",
  "url": "https://sencanaydinlatma.com",
  "logo": "https://sencanaydinlatma.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+90-XXX-XXX-XXXX",
    "contactType": "customer service"
  }
}
```

### Breadcrumb

#### Yapı
```
Ana Sayfa > Kategori > Alt Kategori > Ürün
```

#### Schema Markup
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Ana Sayfa",
    "item": "https://sencanaydinlatma.com"
  }, {
    "@type": "ListItem",
    "position": 2,
    "name": "LED Ampuller",
    "item": "https://sencanaydinlatma.com/kategori/led-ampul"
  }]
}
```

### Sitemap

#### XML Sitemap Yapısı
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://sencanaydinlatma.com</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://sencanaydinlatma.com/kategori/led-ampul</loc>
    <lastmod>2024-01-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

### robots.txt

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/

Sitemap: https://sencanaydinlatma.com/sitemap.xml
```

## ⚡ Performans Optimizasyonu

### Görsel Optimizasyonu

#### Format Seçimi
- **WebP**: Modern tarayıcılar için (fallback: JPEG/PNG)
- **AVIF**: En yeni format (fallback: WebP/JPEG)
- **JPEG**: Fotoğraflar için
- **PNG**: Şeffaflık gerektiğinde

#### Boyutlandırma
- **Hero görsel**: 1920x800px (desktop), 640x400px (mobil)
- **Ürün görseli**: 600x600px
- **Thumbnail**: 150x150px
- **Icon**: SVG format

#### Lazy Loading
```html
<img 
  src="urun.jpg" 
  loading="lazy" 
  alt="Ürün açıklaması"
/>
```

#### Responsive Images
```html
<picture>
  <source 
    media="(max-width: 640px)" 
    srcset="urun-mobil.webp"
  />
  <source 
    media="(max-width: 1024px)" 
    srcset="urun-tablet.webp"
  />
  <img 
    src="urun-desktop.webp" 
    alt="Ürün"
    loading="lazy"
  />
</picture>
```

### Code Splitting

#### Route-based Splitting
```typescript
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
```

#### Component-based Splitting
- Büyük bileşenler lazy load
- Modal'lar lazy load
- Drawer'lar lazy load

### Bundle Optimizasyonu

#### Tree Shaking
- Kullanılmayan kodları kaldır
- Import'ları optimize et
- Dead code elimination

#### Minification
- Production build'de minify
- CSS minification
- JavaScript minification

### Caching Stratejisi

#### Static Assets
- Cache-Control: max-age=31536000 (1 yıl)
- Immutable resources

#### HTML
- Cache-Control: no-cache
- Her zaman fresh content

#### API Responses
- Cache-Control: max-age=3600 (1 saat)
- Stale-while-revalidate

### CDN Kullanımı

#### Öneriler
- Görseller için CDN
- Fontlar için CDN
- Static assets için CDN

### Performance Metrikleri

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### Diğer Metrikler
- **TTFB (Time to First Byte)**: < 600ms
- **FCP (First Contentful Paint)**: < 1.8s
- **TBT (Total Blocking Time)**: < 200ms

## ♿ Erişilebilirlik (A11Y)

### Kontrast Oranları

#### WCAG Standartları
- **Normal metin**: Minimum 4.5:1
- **Büyük metin (18px+)**: Minimum 3:1
- **UI elemanları**: Minimum 3:1

#### Kontrast Test Araçları
- WebAIM Contrast Checker
- Chrome DevTools
- axe DevTools

### Alt Text (Alternatif Metin)

#### Görseller İçin
```html
<img 
  src="urun.jpg" 
  alt="E27 9W Sıcak Beyaz LED Ampul - Modern tasarım, enerji tasarruflu"
/>
```

#### Kurallar
- ✅ Açıklayıcı ve öz
- ✅ Görselin amacını anlat
- ✅ Dekoratif görsellerde boş alt text
- ✅ Ürün görsellerinde detaylı açıklama

### Klavye Navigasyonu

#### Tab Order
- Mantıklı sıralama
- Tüm interaktif elemanlara erişim
- Skip links

#### Focus States
```css
.element:focus {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

#### Klavye Kısayolları
- ESC: Modal/drawer kapatma
- Enter: Form submit
- Tab: Sonraki eleman
- Shift+Tab: Önceki eleman

### ARIA Etiketleri

#### Landmark Roles
```html
<header role="banner">
<nav role="navigation">
<main role="main">
<aside role="complementary">
<footer role="contentinfo">
```

#### ARIA Labels
```html
<button aria-label="Sepete ekle">
  <ShoppingCartIcon />
</button>

<input 
  type="search" 
  aria-label="Ürün ara"
  placeholder="Ürün ara..."
/>
```

#### ARIA Live Regions
```html
<div aria-live="polite" aria-atomic="true">
  Sepete eklendi
</div>
```

### Form Erişilebilirliği

#### Label Kullanımı
```html
<label for="email">
  E-posta Adresi
  <input 
    type="email" 
    id="email" 
    required
    aria-describedby="email-error"
  />
  <span id="email-error" role="alert">
    Geçerli bir e-posta adresi girin
  </span>
</label>
```

#### Error Mesajları
- `role="alert"` kullan
- `aria-invalid="true"` ekle
- `aria-describedby` ile bağla

### Screen Reader Desteği

#### Semantic HTML
- Doğru HTML5 elementleri
- Heading hiyerarşisi (H1 → H2 → H3)
- List elementleri (ul, ol)
- Table yapısı

#### Skip Links
```html
<a href="#main-content" class="skip-link">
  Ana içeriğe geç
</a>
```

### Reduced Motion

#### Media Query
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 📊 SEO ve Performans Checklist

### SEO Checklist
- ✅ Meta tags (title, description)
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Schema markup (Product, Organization)
- ✅ Sitemap.xml
- ✅ robots.txt
- ✅ SEO dostu URL'ler
- ✅ Breadcrumb navigation
- ✅ Alt text'ler
- ✅ Heading hiyerarşisi

### Performans Checklist
- ✅ Görsel optimizasyonu (WebP, lazy load)
- ✅ Code splitting
- ✅ Bundle minification
- ✅ Caching stratejisi
- ✅ CDN kullanımı
- ✅ Core Web Vitals hedefleri
- ✅ Lighthouse score > 90

### Erişilebilirlik Checklist
- ✅ Kontrast oranları (WCAG AA)
- ✅ Alt text'ler
- ✅ Klavye navigasyonu
- ✅ Focus states
- ✅ ARIA etiketleri
- ✅ Semantic HTML
- ✅ Screen reader testi
- ✅ Reduced motion desteği

