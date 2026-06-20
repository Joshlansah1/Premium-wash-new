/**
 * SEO configuration for all pages
 * Maps routes to their SEO metadata
 */
export const seoConfig = {
  "/": {
    title: "Premium Wash Laundry - Professional Laundry Services in Ghana",
    description:
      "Premium Wash is your trusted laundry service provider in Ghana. Offering fast, reliable, and affordable laundry solutions with free pickup and delivery.",
    keywords:
      "laundry service, laundry near me, dry cleaning, premium wash, Ghana laundry",
    canonical: "https://www.premiumwashgh.com",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  },
  "/about": {
    title: "About Premium Wash - Our Story & Mission",
    description:
      "Learn about Premium Wash Laundry - our commitment to quality, sustainability, and customer satisfaction in Ghana.",
    keywords:
      "about premium wash, laundry company, our mission, fabric care experts",
    canonical: "https://www.premiumwashgh.com/about",
    ogImage: "https://www.premiumwashgh.com/about.avif",
  },
  "/services": {
    title: "Our Services - Laundry, Dry Cleaning & More",
    description:
      "Explore our comprehensive laundry services including washing, dry cleaning, ironing, folding, and specialty fabric care.",
    keywords:
      "laundry services, dry cleaning, ironing service, fabric care, washing service",
    canonical: "https://www.premiumwashgh.com/services",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  },
  "/contact": {
    title: "Contact Premium Wash - Get In Touch",
    description:
      "Contact Premium Wash Laundry for inquiries, complaints, or to schedule your laundry pickup today.",
    keywords: "contact us, customer service, inquiries, schedule pickup",
    canonical: "https://www.premiumwashgh.com/contact",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  },
  "/schedule-pickup": {
    title: "Schedule Pickup - Premium Wash Laundry",
    description:
      "Schedule your laundry pickup with Premium Wash. Fast, convenient, and reliable service with free delivery.",
    keywords: "schedule pickup, book laundry, laundry booking, free pickup",
    canonical: "https://www.premiumwashgh.com/schedule-pickup",
    ogImage: "https://www.premiumwashgh.com/pickup.avif",
  },
  "/track-order": {
    title: "Track Your Order - Premium Wash",
    description:
      "Track your laundry order in real-time. Know exactly when your clothes will be ready.",
    keywords: "track order, laundry status, order tracking",
    canonical: "https://www.premiumwashgh.com/track-order",
    ogImage: "https://www.premiumwashgh.com/laundry.avif",
  },
};

/**
 * Get SEO config for a given path
 */
export const getSeoConfig = (path) => {
  return (
    seoConfig[path] || {
      title: "Premium Wash Laundry - Professional Services",
      description: "Premium Wash Laundry Services in Ghana",
      keywords: "laundry service, dry cleaning",
      canonical: `https://www.premiumwashgh.com${path}`,
      ogImage: "https://www.premiumwashgh.com/laundry.avif",
    }
  );
};

/**
 * Generate sitemap XML
 */
export const generateSitemap = () => {
  const baseUrl = "https://www.premiumwashgh.com";
  const routes = Object.keys(seoConfig);

  const urlEntries = routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "/" ? "1.0" : "0.8"}</priority>
  </url>
`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
};

/**
 * Generate robots.txt content
 */
export const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Disallow: /admin
Disallow: /private

Sitemap: https://www.premiumwashgh.com/sitemap.xml

# Google-specific rules
User-agent: Googlebot
Allow: /

# Delay in seconds
Crawl-delay: 1`;
};
