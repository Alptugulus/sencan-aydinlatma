// Analytics helper functions
// Google Analytics veya başka bir analytics servisi entegrasyonu için hazırlık

export const trackEvent = (eventName: string, eventData?: Record<string, any>) => {
  // Google Analytics 4 (GA4) event tracking
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", eventName, eventData);
  }
  
  // Console log for development
  if (process.env.NODE_ENV === "development") {
    console.log("Analytics Event:", eventName, eventData);
  }
};

export const trackPageView = (path: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", "GA_MEASUREMENT_ID", {
      page_path: path,
    });
  }
};

// E-ticaret event'leri
export const trackAddToCart = (productId: string, productName: string, price: number) => {
  trackEvent("add_to_cart", {
    currency: "TRY",
    value: price,
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
        quantity: 1,
      },
    ],
  });
};

export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  trackEvent("purchase", {
    transaction_id: transactionId,
    value: value,
    currency: "TRY",
    items: items,
  });
};

export const trackViewItem = (productId: string, productName: string, price: number) => {
  trackEvent("view_item", {
    currency: "TRY",
    value: price,
    items: [
      {
        item_id: productId,
        item_name: productName,
        price: price,
      },
    ],
  });
};

export const trackSearch = (searchTerm: string) => {
  trackEvent("search", {
    search_term: searchTerm,
  });
};

