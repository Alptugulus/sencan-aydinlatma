import { Helmet } from "react-helmet-async";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import FlashSale from "../components/FlashSale";

export default function HomePage() {
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://sencanaydinlatma.com";
  
  return (
    <>
      <Helmet>
        <title>Sencan Aydınlatma - Modern Aydınlatma Çözümleri</title>
        <meta
          name="description"
          content="Modern aydınlatma ürünleri, LED ampuller, avize ve spot sistemleri. Kaliteli aydınlatma çözümleri için Sencan Aydınlatma. Ücretsiz kargo, 14 gün iade garantisi."
        />
        <meta
          name="keywords"
          content="aydınlatma, led ampul, avize, spot, aydınlatma ürünleri, iç mekan aydınlatma, dış mekan aydınlatma, LED, aydınlatma çözümleri"
        />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sencan Aydınlatma - Modern Aydınlatma Çözümleri" />
        <meta property="og:description" content="Modern aydınlatma ürünleri, LED ampuller, avize ve spot sistemleri. Kaliteli aydınlatma çözümleri." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={`${siteUrl}/og-image.jpg`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sencan Aydınlatma - Modern Aydınlatma Çözümleri" />
        <meta name="twitter:description" content="Modern aydınlatma ürünleri, LED ampuller, avize ve spot sistemleri." />
        <meta name="twitter:image" content={`${siteUrl}/og-image.jpg`} />
        
        {/* Organization Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Sencan Aydınlatma",
            "url": siteUrl,
            "logo": `${siteUrl}/logo.png`,
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+90-532-642-4816",
              "contactType": "customer service",
              "areaServed": "TR",
              "availableLanguage": "Turkish"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Emekyemez Mahallesi Okçumusa Cad Tutsak Sokak No: 15/5",
              "addressLocality": "İstanbul",
              "postalCode": "34420",
              "addressCountry": "TR"
            }
          })}
        </script>
      </Helmet>
      <Hero />
      <CategoryGrid />
      <FlashSale />
      <FeaturedProducts />
    </>
  );
}

