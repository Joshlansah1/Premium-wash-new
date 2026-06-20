import { useEffect } from "react";

/**
 * Hook to update page meta tags and structured data dynamically
 * Improves SEO for different pages
 */
export const usePageMeta = (config = {}) => {
  const {
    title = "Premium Wash Laundry",
    description = "Professional laundry services with free pickup and delivery",
    canonical = "https://www.premiumwashgh.com",
    ogImage = "https://www.premiumwashgh.com/laundry.avif",
    ogType = "website",
    keywords = "laundry service, dry cleaning, professional washing",
  } = config;

  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name, content) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    const updatePropertyTag = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Update standard meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updatePropertyTag("og:title", title);
    updatePropertyTag("og:description", description);
    updatePropertyTag("og:image", ogImage);
    updatePropertyTag("og:type", ogType);
    updatePropertyTag("og:url", canonical);

    // Update Twitter tags
    updatePropertyTag("twitter:title", title);
    updatePropertyTag("twitter:description", description);
    updatePropertyTag("twitter:image", ogImage);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonical);

    // Cleanup function is not needed as we want to keep updates
  }, [title, description, canonical, ogImage, ogType, keywords]);
};

/**
 * Hook to add FAQ structured data
 */
export const useFAQStructuredData = (faqs = []) => {
  useEffect(() => {
    if (faqs.length === 0) return;

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

    let script = document.querySelector("script[data-faq-schema]");
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-faq-schema", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqSchema);
  }, [faqs]);
};

/**
 * Hook to add breadcrumb structured data
 */
export const useBreadcrumbStructuredData = (breadcrumbs = []) => {
  useEffect(() => {
    if (breadcrumbs.length === 0) return;

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };

    let script = document.querySelector("script[data-breadcrumb-schema]");
    if (!script) {
      script = document.createElement("script");
      script.setAttribute("type", "application/ld+json");
      script.setAttribute("data-breadcrumb-schema", "true");
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(breadcrumbSchema);
  }, [breadcrumbs]);
};
