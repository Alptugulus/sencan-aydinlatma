# 🛡️ Güven Elementleri ve Etkileşimler

## 🛡️ Güven Elementleri

### SSL ve Güvenlik Rozetleri

#### SSL Badge
**Konum:**
- Footer'da
- Checkout sayfasında
- Ödeme formu yanında

**Görsel:**
- Yeşil kilit ikonu
- "Güvenli Bağlantı" metni
- SSL sertifika bilgisi

#### Güvenlik Mesajları
```
🔒 Güvenli Ödeme
✅ SSL ile Korunuyor
🛡️ Verileriniz Güvende
```

### Güven Rozetleri

#### "Güvenli Ödeme" Rozeti
- Ödeme sayfasında belirgin
- Güven veren ikon
- Kısa açıklama metni

#### "14 Gün İade" Rozeti
- Ürün detay sayfasında
- Footer'da
- Sepet sayfasında

**Tasarım:**
```
┌─────────────────┐
│  🔄 14 Gün      │
│  İade Garantisi │
└─────────────────┘
```

### İletişim Bilgileri

#### Footer'da Net Gösterim
- **Telefon**: Tıklanabilir link
- **E-posta**: Mailto link
- **Adres**: Fiziksel adres
- **Çalışma Saatleri**: Net bilgi

#### İletişim Sayfası
- Detaylı iletişim formu
- Harita entegrasyonu
- Canlı destek butonu
- WhatsApp butonu

### Müşteri Yorumları ve Değerlendirmeler

#### Ürün Detay Sayfasında
- Yıldız puanı (5 üzerinden)
- Toplam değerlendirme sayısı
- Müşteri yorumları listesi
- Fotoğraflı yorumlar

#### Güven Göstergeleri
- "X müşteri bu ürünü aldı"
- "Son 30 günde X satış"
- "Popüler Ürün" badge'i

### Ödeme Güvenliği

#### Ödeme Yöntemleri Logoları
- Kredi kartı logoları
- Banka logoları
- Güvenli ödeme ağ geçidi logoları

#### 3D Secure Bilgilendirme
- "3D Secure ile korunuyorsunuz" mesajı
- İşlem sırasında bilgilendirme
- Güvenlik açıklaması

## ✨ Micro Interactions

### Buton Hover Animasyonu

#### Standart Buton
```css
.button {
  transition: all 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

#### CTA Butonu (Sepete Ekle)
- Hover: Scale 1.05
- Shadow artışı
- Renk değişimi (daha koyu)
- Smooth transition

#### İkincil Buton
- Hover: Background değişimi
- Border kalınlaşması
- Renk geçişi

### Sepete Eklendi Toast Bildirimi

#### Toast Özellikleri
- **Konum**: Sağ üst köşe
- **Süre**: 3 saniye otomatik kapanma
- **İçerik**: 
  - Ürün görseli (küçük)
  - "Sepete eklendi" mesajı
  - Sepete git linki

#### Animasyon
- Slide-in: Sağdan giriş
- Fade-out: Yumuşak çıkış
- Progress bar: Süre göstergesi

#### Örnek Tasarım
```
┌─────────────────────────┐
│ ✓ Sepete Eklendi        │
│                         │
│ [Görsel] Ürün Adı       │
│ Sepete Git →            │
└─────────────────────────┘
```

### Skeleton Loading

#### Kullanım Alanları
- Ürün listesi yüklenirken
- Ürün detay sayfası
- Sepet içeriği
- Kategori listesi

#### Tasarım
```
┌──────────────┐
│ ░░░░░░░░░░░░ │  (Görsel placeholder)
├──────────────┤
│ ░░░░░░░      │  (Başlık)
│ ░░░░         │  (Alt metin)
│ ░░░░░░░░░    │  (Fiyat)
└──────────────┘
```

#### Animasyon
- Shimmer efekti
- Soldan sağa geçiş
- Yumuşak, sürekli animasyon

### Smooth Transitions

#### Genel Geçiş Kuralları
```css
--transition-fast: 0.15s ease;
--transition-base: 0.3s ease;
--transition-slow: 0.5s ease;
```

#### Kullanım Alanları

**Hızlı Geçişler (0.15s):**
- Buton hover
- Link hover
- Icon hover

**Orta Geçişler (0.3s):**
- Modal açılma/kapanma
- Drawer animasyonları
- Dropdown açılma
- Kart hover efektleri

**Yavaş Geçişler (0.5s):**
- Sayfa geçişleri
- Büyük layout değişiklikleri
- Hero animasyonları

### Form Etkileşimleri

#### Input Focus
- Border rengi değişimi (accent)
- Shadow ekleme
- Smooth transition

#### Input Validation
- **Başarılı**: Yeşil border, checkmark ikonu
- **Hata**: Kırmızı border, error ikonu
- **Yükleme**: Spinner animasyonu

#### Form Submit
- Buton disabled durumu
- Loading spinner
- Success/error mesajı

### Kart Hover Efektleri

#### Ürün Kartı
```css
.product-card {
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-card:hover .product-image {
  transform: scale(1.05);
}
```

#### Kategori Kartı
- Görsel zoom
- Overlay ekleme
- Shadow artışı
- Smooth transition

### Dropdown ve Drawer Animasyonları

#### Dropdown
- **Açılış**: Fade-in + slide-down
- **Kapanış**: Fade-out + slide-up
- **Süre**: 0.2s

#### Drawer (Mobil)
- **Açılış**: Slide-in (sağdan)
- **Kapanış**: Slide-out
- **Backdrop**: Fade-in/out
- **Süre**: 0.3s

### Scroll Animasyonları

#### Fade-in on Scroll
- Elemanlar görünür alana geldiğinde
- Yumuşak fade-in efekti
- Stagger animasyon (sırayla)

#### Sticky Header
- Scroll'da header sabitlenir
- Shadow eklenir
- Smooth transition

### Loading States

#### Spinner
- Dönen animasyon
- Accent rengi
- Merkezi konumlandırma

#### Progress Bar
- Yükleme ilerlemesi
- Animasyonlu dolum
- Yüzde göstergesi

#### Skeleton Screen
- İçerik yüklenirken
- Shimmer efekti
- Gerçek içerik boyutları

## 🎯 Etkileşim Best Practices

### Performans
- ✅ CSS transitions kullan (JavaScript değil)
- ✅ Will-change property dikkatli kullan
- ✅ Transform ve opacity kullan (reflow'dan kaçın)
- ✅ 60fps hedefle

### Erişilebilirlik
- ✅ Reduced motion desteği
- ✅ Klavye navigasyonu
- ✅ Focus states belirgin
- ✅ Screen reader uyumlu

### Kullanıcı Deneyimi
- ✅ Anlamlı animasyonlar
- ✅ Hızlı geri bildirim
- ✅ Net durum göstergeleri
- ✅ Aşırı animasyondan kaçın

## 🔔 Bildirim Sistemi

### Toast Bildirimleri

#### Tipler
1. **Success**: Yeşil, checkmark ikonu
2. **Error**: Kırmızı, X ikonu
3. **Warning**: Turuncu, uyarı ikonu
4. **Info**: Mavi, bilgi ikonu

#### Konumlar
- Sağ üst (varsayılan)
- Alt orta (mobil)
- Özel konumlar (ihtiyaca göre)

### Modal Bildirimleri

#### Kullanım Alanları
- Önemli onaylar
- Hata mesajları
- Bilgilendirmeler

#### Özellikler
- Backdrop blur
- Merkezi konumlandırma
- Kapatma butonu
- ESC ile kapatma

## 🎨 Animasyon Kütüphanesi

### Framer Motion Kullanımı

#### Basit Animasyonlar
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  İçerik
</motion.div>
```

#### Hover Animasyonları
```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Buton
</motion.button>
```

### CSS Animasyonları

#### Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
```

