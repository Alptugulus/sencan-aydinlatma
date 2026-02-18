# 🎯 Kullanıcı Paneli ve Sipariş Yönetimi - Analiz Dokümanı

## 📋 İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Kullanıcı Paneli Yapısı](#kullanıcı-paneli-yapısı)
3. [Siparişlerim Modülü](#siparişlerim-modülü)
4. [Adreslerim Modülü](#adreslerim-modülü)
5. [Hesabım Dashboard](#hesabım-dashboard)
6. [Teknik Detaylar](#teknik-detaylar)
7. [UI/UX Gereksinimleri](#uiux-gereksinimleri)
8. [Implementasyon Planı](#implementasyon-planı)

---

## 1. Genel Bakış

### 1.1 Amaç
Kullanıcıların siparişlerini takip edebilmesi, adreslerini yönetebilmesi ve hesap bilgilerine kolay erişebilmesi için kapsamlı bir kullanıcı paneli oluşturulacak.

### 1.2 Kapsam
- ✅ Sipariş geçmişi görüntüleme
- ✅ Sipariş detay sayfası
- ✅ Sipariş durumu takibi
- ✅ Adres ekleme/düzenleme/silme
- ✅ Varsayılan adres belirleme
- ✅ Hesabım dashboard (özet bilgiler)
- ✅ Sipariş filtreleme ve arama

---

## 2. Kullanıcı Paneli Yapısı

### 2.1 Menü Yapısı
```
Hesabım (/hesabim)
├── Dashboard (Ana Sayfa)
├── Siparişlerim (/hesabim/siparisler)
│   ├── Tüm Siparişler
│   ├── Bekleyen Siparişler
│   ├── Kargoda
│   └── Tamamlanan
├── Sipariş Detay (/hesabim/siparis/:id)
├── Adreslerim (/hesabim/adresler)
│   ├── Adres Listesi
│   ├── Yeni Adres Ekle
│   └── Adres Düzenle
├── Profilim (/profil)
└── Çıkış Yap
```

### 2.2 Navigasyon
- **Sidebar Navigation** (Desktop): Sol tarafta sabit menü
- **Tab Navigation** (Mobile): Üstte tab'lar
- **Breadcrumb**: Sayfa hiyerarşisi göstergesi

---

## 3. Siparişlerim Modülü

### 3.1 Sipariş Listesi Sayfası

#### 3.1.1 Özellikler
- Tüm siparişlerin listelenmesi
- Sipariş durumuna göre filtreleme
- Tarih aralığına göre filtreleme
- Sipariş numarasına göre arama
- Sayfalama (pagination)
- Sipariş kartı tasarımı

#### 3.1.2 Sipariş Kartı İçeriği
```
┌─────────────────────────────────────┐
│ Sipariş #12345          📦 Kargoda  │
│ 15 Ocak 2025                         │
├─────────────────────────────────────┤
│ [Ürün Görseli]  LED Ampul E27 9W    │
│ [Ürün Görseli]  Spot Işık 12W       │
│ +2 ürün daha...                     │
├─────────────────────────────────────┤
│ Toplam: 450₺                         │
│ [Detayları Gör] [Tekrar Sipariş Ver] │
└─────────────────────────────────────┘
```

#### 3.1.3 Sipariş Durumları
- **Beklemede** (Pending): Ödeme bekleniyor
- **Hazırlanıyor** (Preparing): Sipariş hazırlanıyor
- **Kargoda** (Shipping): Kargoya verildi
- **Teslim Edildi** (Delivered): Teslim edildi
- **İptal Edildi** (Cancelled): İptal edildi
- **İade Edildi** (Returned): İade edildi

#### 3.1.4 Filtreler
- Durum: Tümü, Beklemede, Hazırlanıyor, Kargoda, Teslim Edildi
- Tarih: Son 1 ay, Son 3 ay, Son 6 ay, Son 1 yıl, Tümü
- Sıralama: En yeni, En eski, Fiyat (yüksek-düşük)

### 3.2 Sipariş Detay Sayfası

#### 3.2.1 Sayfa Yapısı
```
┌─────────────────────────────────────┐
│ ← Siparişlerim                      │
├─────────────────────────────────────┤
│ Sipariş #12345                       │
│ Durum: 📦 Kargoda                   │
│ Tarih: 15 Ocak 2025                 │
├─────────────────────────────────────┤
│ Teslimat Adresi                     │
│ Ahmet Yılmaz                        │
│ İstanbul, Kadıköy                   │
│ 0532 123 45 67                      │
├─────────────────────────────────────┤
│ Ürünler                             │
│ [Görsel] LED Ampul E27 9W           │
│       2 adet × 150₺ = 300₺          │
│ [Görsel] Spot Işık 12W              │
│       1 adet × 150₺ = 150₺          │
├─────────────────────────────────────┤
│ Özet                                │
│ Ara Toplam: 450₺                    │
│ Kargo: Ücretsiz                     │
│ Toplam: 450₺                        │
├─────────────────────────────────────┤
│ Kargo Takip                         │
│ [Takip Numarası: ABC123456789]      │
│ [Kargo Firması: Yurtiçi Kargo]      │
│ [Takip Et]                          │
├─────────────────────────────────────┤
│ İşlemler                            │
│ [Fatura İndir] [İade Talep Et]      │
└─────────────────────────────────────┘
```

#### 3.2.2 Özellikler
- Sipariş bilgileri (numara, tarih, durum)
- Teslimat adresi
- Fatura adresi (varsa)
- Ürün listesi (görsel, isim, miktar, fiyat)
- Fiyat özeti (ara toplam, kargo, indirim, toplam)
- Kargo takip bilgileri
- Fatura indirme (PDF)
- İade talep etme
- Tekrar sipariş verme
- Sipariş iptal etme (duruma göre)

#### 3.2.3 Kargo Takip
- Kargo takip numarası gösterimi
- Kargo firması logosu/linki
- Harici kargo takip sayfasına yönlendirme
- Kargo durumu güncellemeleri (isteğe bağlı)

---

## 4. Adreslerim Modülü

### 4.1 Adres Listesi Sayfası

#### 4.1.1 Özellikler
- Tüm adreslerin listelenmesi
- Varsayılan adres işaretleme
- Adres düzenleme
- Adres silme
- Yeni adres ekleme butonu

#### 4.1.2 Adres Kartı Tasarımı
```
┌─────────────────────────────────────┐
│ 🏠 Ev Adresi          [Varsayılan]  │
│                                     │
│ Ahmet Yılmaz                        │
│ Emekyemez Mah. Okçumusa Cad.        │
│ Tutsak Sok. No: 15/5                │
│ Kadıköy, İstanbul 34420             │
│                                     │
│ 📞 0532 123 45 67                   │
│                                     │
│ [Düzenle] [Sil] [Varsayılan Yap]    │
└─────────────────────────────────────┘
```

#### 4.1.3 Adres Tipleri
- **Ev Adresi** (Home)
- **İş Adresi** (Work)
- **Diğer** (Other)

### 4.2 Adres Ekleme/Düzenleme Formu

#### 4.2.1 Form Alanları
- **Adres Başlığı**: Ev Adresi, İş Adresi, vb.
- **Ad Soyad**: Zorunlu
- **Telefon**: Zorunlu, format kontrolü
- **İl**: Dropdown, zorunlu
- **İlçe**: Dropdown (il'e göre), zorunlu
- **Mahalle**: Text input, zorunlu
- **Cadde/Sokak**: Text input, zorunlu
- **Bina No**: Text input, opsiyonel
- **Daire No**: Text input, opsiyonel
- **Posta Kodu**: Text input, opsiyonel
- **Adres Tipi**: Radio (Ev/İş/Diğer)
- **Varsayılan Adres**: Checkbox

#### 4.2.2 Validasyon Kuralları
- Ad Soyad: Min 3 karakter
- Telefon: Türkiye formatı (05XX XXX XX XX)
- İl/İlçe: Seçilmiş olmalı
- Mahalle: Min 2 karakter
- Cadde/Sokak: Min 5 karakter

#### 4.2.3 Form Tasarımı
- Modal (Drawer) içinde açılabilir
- Veya ayrı sayfa olarak
- Responsive tasarım
- Form validasyonu (real-time)

---

## 5. Hesabım Dashboard

### 5.1 Dashboard İçeriği

#### 5.1.1 Özet Kartlar
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│ Toplam   │ │ Bekleyen │ │ Kargoda  │
│ Sipariş  │ │ Sipariş  │ │ Sipariş  │
│    12    │ │    2     │ │    3     │
└──────────┘ └──────────┘ └──────────┘
```

#### 5.1.2 Son Siparişler
- Son 5 siparişin özeti
- Hızlı erişim linkleri
- Sipariş durumu göstergesi

#### 5.1.3 Hızlı Erişim
- Siparişlerim
- Adreslerim
- Profilim
- Favorilerim (gelecek özellik)

#### 5.1.4 İstatistikler
- Toplam harcama
- Ortalama sipariş tutarı
- En çok sipariş verilen kategori
- Son aktivite tarihi

---

## 6. Teknik Detaylar

### 6.1 Veri Yapıları

#### 6.1.1 Order (Sipariş)
```typescript
interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;
  shippingCost: number;
  discount: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  shippingCompany?: string;
  notes?: string;
}

interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  slug: string;
  quantity: number;
  price: number;
  total: number;
}

type OrderStatus = 
  | 'pending' 
  | 'preparing' 
  | 'shipping' 
  | 'delivered' 
  | 'cancelled' 
  | 'returned';
```

#### 6.1.2 Address (Adres)
```typescript
interface Address {
  id: string;
  userId: string;
  title: string;
  type: 'home' | 'work' | 'other';
  fullName: string;
  phone: string;
  city: string;
  district: string;
  neighborhood: string;
  street: string;
  buildingNumber?: string;
  apartmentNumber?: string;
  postalCode?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### 6.2 State Management
- **Zustand Store**: `useOrderStore` - Sipariş verileri
- **Zustand Store**: `useAddressStore` - Adres verileri
- **Local Storage**: Mock veriler için
- **API Integration**: Gerçek API'ye hazır yapı

### 6.3 API Endpoints (Mock)
```
GET    /api/orders              - Tüm siparişler
GET    /api/orders/:id          - Sipariş detay
GET    /api/orders/stats        - Sipariş istatistikleri
POST   /api/orders/:id/cancel   - Sipariş iptal
POST   /api/orders/:id/return    - İade talep

GET    /api/addresses           - Tüm adresler
POST   /api/addresses           - Yeni adres ekle
PUT    /api/addresses/:id       - Adres güncelle
DELETE /api/addresses/:id       - Adres sil
PATCH  /api/addresses/:id/default - Varsayılan yap
```

### 6.4 Route Yapısı
```typescript
/hesabim                    - Dashboard
/hesabim/siparisler         - Sipariş listesi
/hesabim/siparis/:id        - Sipariş detay
/hesabim/adresler           - Adres listesi
/hesabim/adresler/yeni      - Yeni adres
/hesabim/adresler/:id/edit  - Adres düzenle
/profil                     - Profil (mevcut)
```

---

## 7. UI/UX Gereksinimleri

### 7.1 Tasarım Prensipleri
- **Tutarlılık**: Mevcut tasarım sistemi ile uyumlu
- **Basitlik**: Karmaşık işlemler için adım adım rehberlik
- **Geri Bildirim**: Her işlem için toast bildirimi
- **Yükleme Durumları**: Skeleton loading, spinner
- **Boş Durumlar**: Empty state tasarımları

### 7.2 Responsive Tasarım
- **Desktop**: Sidebar navigation + içerik
- **Tablet**: Collapsible sidebar
- **Mobile**: Tab navigation + full screen içerik

### 7.3 Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader desteği
- Focus management

### 7.4 Performans
- Lazy loading
- Code splitting
- Image optimization
- Pagination

---

## 8. Implementasyon Planı

### 8.1 Faz 1: Veri Yapıları ve Store'lar
- [ ] Order interface ve type'ları
- [ ] Address interface ve type'ları
- [ ] useOrderStore (Zustand)
- [ ] useAddressStore (Zustand)
- [ ] Mock API servisleri

### 8.2 Faz 2: Adres Yönetimi
- [ ] Adres listesi sayfası
- [ ] Adres ekleme formu
- [ ] Adres düzenleme formu
- [ ] Adres silme (confirmation dialog)
- [ ] Varsayılan adres belirleme

### 8.3 Faz 3: Sipariş Listesi
- [ ] Sipariş listesi sayfası
- [ ] Sipariş kartı component'i
- [ ] Filtreleme (durum, tarih)
- [ ] Sıralama
- [ ] Sayfalama

### 8.4 Faz 4: Sipariş Detay
- [ ] Sipariş detay sayfası
- [ ] Ürün listesi
- [ ] Kargo takip entegrasyonu
- [ ] Fatura indirme
- [ ] İade talep formu

### 8.5 Faz 5: Dashboard
- [ ] Dashboard sayfası
- [ ] Özet kartlar
- [ ] Son siparişler widget'ı
- [ ] İstatistikler
- [ ] Hızlı erişim linkleri

### 8.6 Faz 6: Navigasyon ve Entegrasyon
- [ ] Sidebar navigation component
- [ ] Tab navigation (mobile)
- [ ] Route'ları App.tsx'e ekle
- [ ] Header'dan hesabım linki
- [ ] Checkout'tan sipariş oluşturma

---

## 9. Özel Durumlar ve Edge Cases

### 9.1 Sipariş Durumları
- İptal edilebilir mi? (Sadece "beklemede" durumunda)
- İade edilebilir mi? (Teslim edildikten sonra 14 gün içinde)
- Kargo takip bilgisi yoksa ne gösterilir?

### 9.2 Adres Yönetimi
- Minimum kaç adres olmalı? (En az 1)
- Varsayılan adres silinebilir mi? (Hayır, önce başka adres varsayılan yapılmalı)
- İl/İlçe dropdown'ları nasıl doldurulacak? (Türkiye il/ilçe listesi)

### 9.3 Boş Durumlar
- Sipariş yoksa: "Henüz sipariş vermediniz" mesajı + "Alışverişe Başla" butonu
- Adres yoksa: "Henüz adres eklemediniz" mesajı + "Adres Ekle" butonu

---

## 10. Test Senaryoları

### 10.1 Sipariş Yönetimi
- [ ] Sipariş listesi görüntüleme
- [ ] Sipariş detay görüntüleme
- [ ] Sipariş filtreleme
- [ ] Sipariş iptal etme
- [ ] İade talep etme

### 10.2 Adres Yönetimi
- [ ] Adres ekleme
- [ ] Adres düzenleme
- [ ] Adres silme
- [ ] Varsayılan adres belirleme
- [ ] Form validasyonu

### 10.3 Dashboard
- [ ] Özet kartların doğru gösterilmesi
- [ ] Son siparişlerin listelenmesi
- [ ] İstatistiklerin hesaplanması

---

## 11. Gelecek Özellikler (Backlog)

- Favorilerim
- İade/Değişim takibi
- Kuponlarım
- Puanlarım (loyalty program)
- Bildirim tercihleri
- Hesap silme
- İki faktörlü kimlik doğrulama

---

## 12. Notlar

- Tüm sayfalar Protected Route olmalı
- Mock veriler localStorage'da saklanacak
- Gerçek API'ye geçiş için servis katmanı hazır olacak
- Tüm formlar için validasyon gerekli
- Loading state'leri her yerde olmalı
- Error handling için try-catch blokları

---

**Son Güncelleme**: 27 Ocak 2025
**Versiyon**: 1.0

