# 📐 Layout ve Responsive Tasarım

## 📐 Layout Sistemi

### Grid Yapısı

#### Desktop (1024px+)
- **12 Column Grid**
- Container max-width: **1280px**
- Gutter: **24px** (1.5rem)
- Margin: Auto (ortalanmış)

#### Tablet (640-1024px)
- **8 Column Grid**
- Container max-width: **1024px**
- Gutter: **20px** (1.25rem)
- Margin: Auto

#### Mobil (0-640px)
- **4 Column Grid**
- Container: Full width (padding: 16px)
- Gutter: **16px** (1rem)
- Margin: 0

### Container Yapısı

```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 0 20px;
  }
}

@media (max-width: 640px) {
  .container {
    padding: 0 16px;
  }
}
```

### Spacing Sistemi

#### Spacing Ölçeği
```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;    /* 8px */
--spacing-md: 1rem;      /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;      /* 32px */
--spacing-2xl: 3rem;     /* 48px */
--spacing-3xl: 4rem;     /* 64px */
--spacing-4xl: 6rem;     /* 96px */
```

#### Kullanım Alanları
- **xs**: İkonlar arası, küçük boşluklar
- **sm**: Form elemanları arası
- **md**: Kartlar arası, bölümler arası
- **lg**: Büyük bölümler arası
- **xl**: Sayfa bölümleri arası
- **2xl-4xl**: Hero alanı, büyük boşluklar

## 📱 Responsive Strateji

### Breakpoints

| Cihaz | Min Width | Max Width | Grid | Özellikler |
|-------|-----------|-----------|------|------------|
| **Mobile** | 0px | 640px | 4 column | Tek kolon layout, sticky bottom CTA |
| **Tablet** | 640px | 1024px | 8 column | İki kolon layout, drawer menüler |
| **Desktop** | 1024px+ | - | 12 column | Tam özellikli layout |

### Tailwind CSS Breakpoints
```typescript
screens: {
  'sm': '640px',   // Tablet başlangıcı
  'md': '768px',   // Tablet orta
  'lg': '1024px',  // Desktop başlangıcı
  'xl': '1280px',  // Büyük desktop
  '2xl': '1536px', // Çok büyük ekranlar
}
```

## 📱 Mobil Öncelikli Kurallar

### 1. Dokunmatik Dostu Arayüz

#### Minimum Dokunma Alanları
```css
--touch-target-min: 44px; /* iOS ve Android standart */
```

**Uygulama:**
- Tüm butonlar minimum 44x44px
- Linkler yeterli padding ile
- Form input'ları yeterli yükseklikte
- Checkbox ve radio button'lar büyük

#### Dokunma Aralıkları
- Butonlar arası: Minimum 8px
- Form elemanları arası: Minimum 16px
- Kartlar arası: Minimum 16px

### 2. Sticky Bottom "Sepete Ekle"

**Mobilde:**
```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  z-index: 50;
}
```

**Özellikler:**
- Her zaman görünür
- Büyük, belirgin buton
- Fiyat bilgisi içerir
- Scroll'da kaybolmaz

### 3. Filtreler Drawer İçinde

**Mobilde:**
- Filtreler sağdan açılan drawer'da
- Kategori filtreleri accordion yapıda
- Fiyat aralığı slider ile
- Uygula ve Temizle butonları

**Tablet/Desktop:**
- Filtreler sidebar'da
- Her zaman görünür
- Sticky pozisyon

### 4. Checkout Tek Kolon

**Mobilde:**
- Form alanları tam genişlik
- Adım adım ilerleme
- Progress bar üstte
- Büyük input alanları

**Desktop:**
- İki kolon layout (form + özet)
- Sidebar'da sipariş özeti

## 🎨 Layout Bileşenleri

### Header Layout

#### Desktop
```
[Logo] [Nav Links] [Search] [Cart Icon] [User Icon]
```

#### Tablet
```
[Logo] [Search] [Cart] [Menu Toggle]
```

#### Mobil
```
[Menu] [Logo] [Cart]
```

### Hero Layout

#### Desktop
- Full width container
- İçerik ortalanmış
- CTA butonları yan yana

#### Mobil
- Full width
- İçerik sola hizalı
- CTA butonları alt alta (stack)

### Ürün Grid Layout

#### Desktop (12 column)
```
[Ürün] [Ürün] [Ürün] [Ürün]  (4 kolon)
```

#### Tablet (8 column)
```
[Ürün] [Ürün] [Ürün]  (3 kolon)
veya
[Ürün] [Ürün]  (2 kolon)
```

#### Mobil (4 column)
```
[Ürün]  (1 kolon)
```

### Ürün Detay Layout

#### Desktop
```
[Görsel Galeri] | [Ürün Bilgileri]
     (60%)      |      (40%)
```

#### Mobil
```
[Görsel Galeri]
[Ürün Bilgileri]
[Sticky CTA]
```

## 📐 Flexbox ve Grid Kullanımı

### Flexbox Kullanım Alanları
- Navigasyon menüleri
- Buton grupları
- Form elemanları
- Kart içerikleri
- Footer bölümleri

### Grid Kullanım Alanları
- Ürün listeleri
- Kategori grid'leri
- Dashboard layout'ları
- Galeri görünümleri

## 🎯 Responsive Görsel Stratejisi

### Görsel Boyutları

#### Desktop
- Hero görsel: 1920x800px
- Ürün görseli: 600x600px
- Thumbnail: 150x150px

#### Tablet
- Hero görsel: 1024x600px
- Ürün görseli: 400x400px
- Thumbnail: 120x120px

#### Mobil
- Hero görsel: 640x400px
- Ürün görseli: 100% width
- Thumbnail: 80x80px

### Responsive Görsel Teknikleri
- `srcset` kullanımı
- WebP format desteği
- Lazy loading
- Aspect ratio korunması

## 📱 Cihaz Özel Optimizasyonlar

### iOS Optimizasyonları
- Safe area desteği
- Touch action optimizasyonu
- Safari özel stilleri
- Viewport meta tag

### Android Optimizasyonları
- Material Design uyumluluğu
- Touch feedback
- Back button davranışı
- Chrome özel stilleri

## 🔄 Layout Geçişleri

### Smooth Transitions
```css
.layout-transition {
  transition: all 0.3s ease-in-out;
}
```

### Breakpoint Geçişleri
- Ani değişikliklerden kaçın
- Smooth layout değişimleri
- Content reflow'u minimize et

## 📊 Layout Test Senaryoları

### Test Edilmesi Gerekenler
1. **320px**: En küçük mobil
2. **375px**: iPhone standart
3. **768px**: Tablet portrait
4. **1024px**: Tablet landscape / Desktop başlangıcı
5. **1280px**: Standart desktop
6. **1920px**: Büyük desktop
7. **2560px**: Ultra-wide

### Test Kriterleri
- ✅ Tüm içerik görünür
- ✅ Scroll gerektiğinde çalışıyor
- ✅ Butonlar tıklanabilir
- ✅ Formlar kullanılabilir
- ✅ Görseller optimize
- ✅ Performans iyi

