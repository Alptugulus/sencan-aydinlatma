import { ReactNode, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";
import ContactWidget from "./ContactWidget";
import SkipToContent from "./SkipToContent";
import { CONTACT_INFO } from "../lib/constants";
import { useAuth } from "../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { checkAuth } = useAuth();

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": CONTACT_INFO.company,
    "url": "https://sencanaydinlatma.com",
    "logo": "https://sencanaydinlatma.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": CONTACT_INFO.phone.mobileFormatted,
      "contactType": "customer service",
      "areaServed": "TR",
      "availableLanguage": ["Turkish"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONTACT_INFO.address.full,
      "addressLocality": CONTACT_INFO.address.city,
      "postalCode": CONTACT_INFO.address.postalCode,
      "addressCountry": "TR"
    },
    "sameAs": [
      "https://www.facebook.com/sencanaydinlatma",
      "https://www.instagram.com/sencanaydinlatma"
    ]
  };

  return (
    <>
      <Helmet>
        <html lang="tr" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sencan Aydınlatma - Modern aydınlatma çözümleri. İç mekan, dış mekan, LED ampul ve spot ışık sistemleri." />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ContactWidget />
      </div>
    </>
  );
}

