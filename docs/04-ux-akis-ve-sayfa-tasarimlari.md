# 🎯 UX Akışları ve Sayfa Tasarımları

## 🏠 Ana Sayfa UX Akışı

### Hero Alanı

#### Tasarım Özellikleri
- **Büyük Banner**: Full-width, yüksek görsel etkisi
- **Net Mesaj**: "Modern Aydınlatma Çözümleri"
- **Alt Mesaj**: Kısa, öz açıklama (max 2 satır)
- **CTA Butonu**: "Ürünleri Keşfet" - Büyük, belirgin

#### Layout
```
┌─────────────────────────────────────┐
│         [Hero Görsel]               │
│                                     │
│    Modern Aydınlatma Çözümleri      │
│    Kısa açıklama metni              │
│    [Ürünleri Keşfet]                │
└─────────────────────────────────────┘
```

#### Responsive Davranış
- **Desktop**: Görsel + metin yan yana
- **Tablet**: Görsel üstte, metin altta
- **Mobil**: Stack layout, görsel tam genişlik

#### Etkileşimler
- Hover: CTA butonu büyür, shadow artar
- Scroll: Hero kaybolur, header sticky olur
- Animasyon: Fade-in efekt

### Kategori Blokları

#### Kategori Listesi
1. **İç Mekan Aydınlatma**
2. **Dış Mekan Aydınlatma**
3. **LED Ampuller**
4. **Spot & Ray Sistemleri**
5. **Avize & Sarkıt**
6. **Aplik & Duvar Lambaları**

#### Kart Tasarımı
```
┌──────────────┐
│              │
│   [Görsel]   │  (80% alan)
│              │
├──────────────┤
│ Kategori Adı │
│ Açıklama     │
└──────────────┘
```

#### Kart Özellikleri
- **Görsel**: %80 alan kaplar, yüksek kalite
- **Hover Efekti**: 
  - Görsel zoom (scale 1.05)
  - Shadow artışı
  - Smooth transition
- **Hafif Gölge**: Subtle elevation
- **Border Radius**: 8px

#### Grid Layout
- **Desktop**: 3 kolon (4 kategori)
- **Tablet**: 2 kolon
- **Mobil**: 1 kolon

### Öne Çıkan Ürünler

#### Bölüm Başlığı
- "Öne Çıkan Ürünler"
- "Tümünü Gör" linki sağda

#### Grid Yapısı
- **Desktop**: 4 kolon
- **Tablet**: 2 kolon
- **Mobil**: 1 kolon

#### Ürün Kartı İçeriği
```
┌──────────────┐
│              │
│ [Ürün Görsel]│
│              │
├──────────────┤
│ Ürün Adı     │
│ Kategori     │
│ ₺ Fiyat      │
│ [Sepete Ekle]│
└──────────────┘
```

#### Kart Özellikleri
- Görsel: Aspect ratio 1:1
- Hover: Görsel üzerinde "Hızlı Görüntüle" overlay
- Fiyat: Büyük, bold, accent rengi
- Sepete Ekle: Belirgin buton

## 📦 Ürün Detay UX

### Desktop Layout

#### Sol Taraf (60%)
```
┌─────────────────┐
│                 │
│  Ana Görsel     │
│  (Büyük)        │
│                 │
├─────────────────┤
│ [T] [T] [T] [T] │ Thumbnails
└─────────────────┘
```

#### Sağ Taraf (40%)
```
┌─────────────────┐
│ Ürün Adı (H2)   │
│                 │
│ ₺ Fiyat (Büyük) │
│                 │
│ Stok: Stokta ✓  │
│                 │
│ [Adet: - 1 +]   │
│                 │
│ [Sepete Ekle]   │
│                 │
│ Açıklama        │
│ Özellikler      │
└─────────────────┘
```

### Mobil Layout

#### Stack Yapısı
```
┌─────────────────┐
│                 │
│  Görsel Galeri  │
│  (Swipe)        │
│                 │
├─────────────────┤
│ Ürün Adı        │
│ Fiyat           │
│ Stok Durumu     │
│ Açıklama        │
│ Özellikler      │
└─────────────────┘
┌─────────────────┐
│ [Sticky CTA]    │ ← Sabit altta
└─────────────────┘
```

### Görsel Galeri Özellikleri

#### Desktop
- Ana görsel: Büyük, zoom özelliği
- Thumbnail'ler: Alt kısımda, 4-6 adet
- Lightbox: Tıklamada tam ekran görüntüleme
- Zoom: Hover'da görsel büyütme

#### Mobil
- Swipe: Sağa-sola kaydırma
- Dots indicator: Alt kısımda nokta göstergesi
- Fullscreen: Dokunmada tam ekran

### Ürün Bilgileri

#### Zorunlu Bilgiler
1. **Ürün Adı**: H2, bold
2. **Fiyat**: Büyük, bold, accent rengi
3. **Stok Durumu**: Renk kodlu
   - Yeşil: "Stokta"
   - Kırmızı: "Tükendi"
   - Turuncu: "Son 5 adet"
4. **Adet Seçici**: + / - butonları
5. **Sepete Ekle Butonu**: Büyük, belirgin

#### Ek Bilgiler
- Ürün açıklaması
- Teknik özellikler (tablo)
- Kargo bilgisi
- İade politikası
- Benzer ürünler

### Sticky CTA (Mobil)

#### Özellikler
- Position: Fixed bottom
- İçerik: Fiyat + Sepete Ekle butonu
- Z-index: 50 (her zaman üstte)
- Shadow: Üstte gölge efekti

## 🛒 Sepet UX

### Mini Cart Dropdown

#### Trigger
- Header'da sepet ikonu
- Sepet sayısı badge'i
- Tıklamada dropdown açılır

#### Dropdown İçeriği
```
┌─────────────────────┐
│ Sepetim (3)         │
├─────────────────────┤
│ [Ürün 1]  ₺100      │
│ [Ürün 2]  ₺200      │
│ [Ürün 3]  ₺150      │
├─────────────────────┤
│ Ara Toplam: ₺450    │
│ Kargo: Ücretsiz     │
│ Toplam: ₺450        │
├─────────────────────┤
│ [Sepete Git]        │
└─────────────────────┘
```

#### Özellikler
- Max height: 400px, scroll
- Her ürün: Görsel, isim, fiyat, adet, sil
- Toplam: Vurgulu gösterim
- Kargo: Ücretsiz kargo eşiği gösterimi

### Sepet Sayfası

#### Desktop Layout
```
┌──────────────────┬─────────────┐
│                  │             │
│  Sepet İçeriği   │  Sipariş    │
│  (Ürünler)       │  Özeti      │
│                  │             │
│  - Ürün 1        │  Ara Toplam │
│  - Ürün 2        │  Kargo      │
│  - Ürün 3        │  Toplam     │
│                  │             │
│  [Alışverişe     │  [Ödeme]    │
│   Devam Et]      │             │
└──────────────────┴─────────────┘
```

#### Mobil Layout
```
┌──────────────────┐
│ Sepet İçeriği    │
│                  │
│ - Ürün 1         │
│ - Ürün 2         │
│ - Ürün 3         │
│                  │
│ Sipariş Özeti    │
│ Ara Toplam       │
│ Kargo            │
│ Toplam           │
│                  │
│ [Ödeme]          │
└──────────────────┘
```

#### Sepet Özellikleri
- **Sil Butonu**: Her ürün için görünür
- **Adet Değiştirme**: + / - butonları
- **Kargo Hesaplama**: Form alanı
- **Kupon Kodu**: İndirim kuponu girişi
- **Net Toplam**: Büyük, vurgulu

## 💳 Checkout UX

### Adım Yapısı

#### Progress Bar
```
[1. Adres] ──── [2. Ödeme] ──── [3. Onay]
   ✓              →                ○
```

#### Adım 1: Teslimat Adresi

**Form Alanları:**
- Ad Soyad
- Telefon
- E-posta
- İl
- İlçe
- Mahalle
- Adres Detayı
- Adres Başlığı (Ev, İş, vb.)

**Özellikler:**
- Form validasyonu
- Kayıtlı adresler listesi
- Yeni adres ekleme
- Varsayılan adres seçimi

#### Adım 2: Ödeme

**Ödeme Yöntemleri:**
- Kredi/Banka Kartı
- Kapıda Ödeme
- Havale/EFT

**Kart Bilgileri (Eğer kart seçilirse):**
- Kart Numarası
- Son Kullanma Tarihi
- CVV
- Kart Sahibi Adı

**Özellikler:**
- Güvenli ödeme rozeti
- SSL badge
- 3D Secure desteği

#### Adım 3: Onay

**Sipariş Özeti:**
- Ürünler listesi
- Teslimat adresi
- Ödeme yöntemi
- Toplam tutar

**Onay:**
- Sözleşme onayı checkbox
- KVKK onayı checkbox
- [Siparişi Tamamla] butonu

### Mobil Checkout

#### Özellikler
- **Tek Kolon**: Form alanları tam genişlik
- **Progress Bar**: Üstte, her zaman görünür
- **Büyük Input'lar**: Dokunmatik dostu
- **Net Hata Mesajları**: Form validasyonu
- **Sticky Özet**: Alt kısımda sipariş özeti

### Checkout Validasyonu

#### Gerçek Zamanlı Validasyon
- Alan doldurulduğunda kontrol
- Hata mesajları anında gösterim
- Başarılı alanlar yeşil border
- Hatalı alanlar kırmızı border

#### Hata Mesajları
- Net, anlaşılır dil
- İkon ile desteklenmiş
- Çözüm önerisi içeren

## 🔍 Ürün Listeleme Sayfası

### Filtreler (Sidebar/Drawer)

#### Filtre Kategorileri
1. **Kategori**: Accordion yapı
2. **Fiyat Aralığı**: Slider
3. **Marka**: Checkbox listesi
4. **Stok Durumu**: Radio button
5. **Özellikler**: Checkbox listesi

#### Filtre Özellikleri
- Uygula butonu
- Temizle butonu
- Aktif filtre sayısı
- Seçili filtreler badge'leri

### Sıralama

#### Sıralama Seçenekleri
- En Yeni
- Fiyat: Düşükten Yükseğe
- Fiyat: Yüksekten Düşüğe
- En Çok Satanlar
- En Çok Değerlendirilenler

### Ürün Grid

#### Görünüm Seçenekleri
- Grid görünüm (varsayılan)
- List görünüm
- Görünüm toggle butonları

#### Pagination
- Sayfa numaraları
- Önceki/Sonraki butonları
- Sayfa başına ürün sayısı seçimi

## 📱 Mobil Özel Özellikler

### Bottom Navigation (Opsiyonel)
- Ana Sayfa
- Kategoriler
- Sepet
- Hesabım

### Pull to Refresh
- Ürün listelerinde
- Sepet sayfasında

### Infinite Scroll (Alternatif)
- Pagination yerine
- Otomatik yükleme

