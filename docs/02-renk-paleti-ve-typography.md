# 🎨 Renk Paleti ve Typography

## 🎨 Renk Paleti

### Ana Renkler

#### Soft Siyah / Antrasit
```css
--color-primary: #111827;
--color-primary-dark: #0F172A;
--color-primary-light: #1F2937;
```
**Kullanım Alanları:**
- Ana metinler
- Başlıklar
- Navigasyon
- Footer arka planı
- Vurgu alanları

#### Beyaz
```css
--color-white: #FFFFFF;
--color-background: #FFFFFF;
```
**Kullanım Alanları:**
- Ana arka plan
- Kart arka planları
- Modal arka planları
- Temiz, ferah görünüm için

### Aksiyon Renkleri

#### Sıcak Sarı / Amber (Işık Teması)
```css
--color-accent: #F59E0B; /* Amber-500 */
--color-accent-light: #FBBF24; /* Amber-400 */
--color-accent-dark: #D97706; /* Amber-600 */
--color-accent-hover: #FCD34D; /* Amber-300 */
```
**Kullanım Alanları:**
- CTA butonları (Sepete Ekle, Satın Al)
- Vurgu metinleri
- İkonlar
- Hover efektleri
- Fiyat vurguları

**Alternatif: Turuncu-Altın Ton**
```css
--color-accent-alt: #EA580C; /* Orange-600 */
--color-accent-alt-light: #FB923C; /* Orange-400 */
```

### Destek Renkleri

#### Açık Gri
```css
--color-gray-light: #F3F4F6; /* Gray-100 */
--color-gray-lighter: #F9FAFB; /* Gray-50 */
```
**Kullanım Alanları:**
- Kart arka planları
- Bölüm arka planları
- Hover durumları
- Ayırıcı alanlar

#### Border Gri
```css
--color-border: #E5E7EB; /* Gray-200 */
--color-border-dark: #D1D5DB; /* Gray-300 */
```
**Kullanım Alanları:**
- Kart kenarlıkları
- Form input kenarlıkları
- Ayırıcı çizgiler
- Bölüm sınırları

#### Metin Renkleri
```css
--color-text-primary: #111827; /* Gray-900 */
--color-text-secondary: #6B7280; /* Gray-500 */
--color-text-muted: #9CA3AF; /* Gray-400 */
--color-text-inverse: #FFFFFF;
```
**Kullanım Alanları:**
- Primary: Ana metinler, başlıklar
- Secondary: Açıklamalar, alt metinler
- Muted: Yardımcı bilgiler, placeholder'lar
- Inverse: Beyaz arka plan üzerinde metin

### Durum Renkleri

#### Başarı (Success)
```css
--color-success: #10B981; /* Green-500 */
--color-success-light: #D1FAE5; /* Green-100 */
```

#### Hata (Error)
```css
--color-error: #EF4444; /* Red-500 */
--color-error-light: #FEE2E2; /* Red-100 */
```

#### Uyarı (Warning)
```css
--color-warning: #F59E0B; /* Amber-500 */
--color-warning-light: #FEF3C7; /* Amber-100 */
```

#### Bilgi (Info)
```css
--color-info: #3B82F6; /* Blue-500 */
--color-info-light: #DBEAFE; /* Blue-100 */
```

### Renk Kullanım Kuralları

#### Genel Kurallar
- ✅ Ana renk (antrasit) metinlerde kullan
- ✅ Aksiyon rengi (amber) sadece CTA'larda
- ✅ Beyaz alanları koru, sıkışık görünümden kaçın
- ✅ Kontrast oranları WCAG AA standardına uygun (4.5:1)
- ✅ Renk körlüğüne duyarlı kombinasyonlar

#### Kaçınılacaklar
- ❌ Çok fazla renk kullanımı
- ❌ Düşük kontrast kombinasyonlar
- ❌ Parlak, göz yoran renkler
- ❌ Renk tek başına bilgi aktarımı (ikon + renk)

## 📝 Typography

### Font Ailesi

#### Başlık Fontu
**Önerilen: Inter / Poppins / Manrope**

```css
--font-heading: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Alternatifler:**
- Poppins: Daha yuvarlak, modern
- Manrope: Geometrik, temiz

**Kullanım:**
- H1, H2, H3 başlıklar
- Logo metni
- Vurgu metinleri
- CTA buton metinleri

#### Gövde Fontu
```css
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Kullanım:**
- Paragraflar
- Açıklamalar
- Form input'ları
- Genel metin içeriği

### Tipografi Ölçeği

#### Başlık Boyutları
```css
--text-h1: 3rem;      /* 48px - Sadece Hero */
--text-h2: 2.25rem;   /* 36px - Sayfa başlıkları, ürün isimleri */
--text-h3: 1.875rem;  /* 30px - Bölüm başlıkları */
--text-h4: 1.5rem;    /* 24px - Alt başlıklar */
--text-h5: 1.25rem;   /* 20px - Kart başlıkları */
--text-h6: 1.125rem;  /* 18px - Küçük başlıklar */
```

#### Gövde Boyutları
```css
--text-base: 1rem;    /* 16px - Varsayılan */
--text-lg: 1.125rem;  /* 18px - Büyük metin */
--text-sm: 0.875rem;  /* 14px - Küçük metin, açıklamalar */
--text-xs: 0.75rem;   /* 12px - Çok küçük metin, etiketler */
```

#### Özel Boyutlar
```css
--text-hero: 4rem;    /* 64px - Hero başlık (desktop) */
--text-price: 1.5rem; /* 24px - Fiyat gösterimi */
--text-button: 1rem;  /* 16px - Buton metinleri */
```

### Font Ağırlıkları

```css
--font-light: 300;
--font-normal: 400;   /* Regular */
--font-medium: 500;   /* Medium */
--font-semibold: 600; /* SemiBold */
--font-bold: 700;     /* Bold */
```

**Kullanım Kuralları:**
- H1, H2: Bold (700)
- H3, H4: SemiBold (600)
- H5, H6: Medium (500)
- Gövde metin: Regular (400)
- Vurgu metinler: Medium (500) veya SemiBold (600)

### Satır Yüksekliği (Line Height)

```css
--leading-tight: 1.25;   /* Başlıklar */
--leading-normal: 1.5;   /* Gövde metin */
--leading-relaxed: 1.75; /* Uzun paragraflar */
```

### Harf Aralığı (Letter Spacing)

```css
--tracking-tight: -0.025em;  /* Büyük başlıklar */
--tracking-normal: 0;        /* Normal metin */
--tracking-wide: 0.025em;    /* Küçük başlıklar, etiketler */
```

### Tipografi Kuralları

#### Genel Kurallar
- ✅ H1 sadece hero alanında kullanılır
- ✅ Ürün isimleri H2 ile gösterilir
- ✅ Açıklamalar 14-16px arası
- ✅ Satın al butonu büyük ve belirgin (16px+)
- ✅ Fiyatlar vurgulu gösterilir (24px, bold)
- ✅ Responsive tipografi: Mobilde küçük, desktop'ta büyük

#### Hiyerarşi
1. **H1**: Hero başlık (tek kullanım)
2. **H2**: Sayfa başlıkları, ürün isimleri
3. **H3**: Bölüm başlıkları
4. **H4-H6**: Alt başlıklar
5. **Body**: Genel metin içeriği

#### Responsive Tipografi

**Mobil (0-640px):**
```css
--text-h1-mobile: 2rem;      /* 32px */
--text-h2-mobile: 1.75rem;   /* 28px */
--text-base-mobile: 0.875rem; /* 14px */
```

**Tablet (640-1024px):**
```css
--text-h1-tablet: 2.5rem;    /* 40px */
--text-h2-tablet: 2rem;      /* 32px */
--text-base-tablet: 1rem;    /* 16px */
```

**Desktop (1024px+):**
```css
--text-h1-desktop: 3rem;     /* 48px */
--text-h2-desktop: 2.25rem;  /* 36px */
--text-base-desktop: 1rem;   /* 16px */
```

### Metin Stilleri

#### Vurgu Metinleri
- **Fiyat**: Bold, büyük boyut, accent rengi
- **İndirim**: Çizili eski fiyat, yeni fiyat vurgulu
- **Stok Durumu**: Renk kodlu (yeşil: stokta, kırmızı: tükendi)

#### Link Stilleri
```css
--link-color: #3B82F6;        /* Blue-500 */
--link-hover: #2563EB;        /* Blue-600 */
--link-visited: #7C3AED;      /* Purple-600 */
```

#### Form Metinleri
- Placeholder: Muted renk, italic
- Label: Medium ağırlık, küçük boyut
- Error: Kırmızı renk, küçük boyut
- Success: Yeşil renk, küçük boyut

## 🎯 Renk ve Tipografi Kombinasyonları

### Önerilen Kombinasyonlar

#### Ana Başlık
- Renk: Primary (antrasit)
- Font: Heading, Bold, 36px
- Arka plan: Beyaz

#### CTA Butonu
- Renk: Beyaz metin
- Arka plan: Accent (amber)
- Font: Medium, 16px
- Hover: Daha koyu amber

#### Ürün Kartı
- Başlık: Primary, SemiBold, 18px
- Fiyat: Accent, Bold, 24px
- Açıklama: Secondary, Regular, 14px

#### Footer
- Arka plan: Primary (antrasit)
- Metin: Beyaz
- Link: Açık gri, hover'da beyaz

