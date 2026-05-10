import { contentByLocale, type Locale, siteUrl } from "@/lib/site-content";

export function getCanonicalUrl(locale: Locale) {
  return `${siteUrl}/${locale}`;
}

export function getStructuredData(locale: Locale) {
  const content = contentByLocale[locale];
  const canonicalUrl = getCanonicalUrl(locale);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: content.brand.name,
        url: siteUrl,
        email: "adlog.agency@gmail.com",
        sameAs: ["https://t.me/adlog"],
        description: content.seo.description
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: content.brand.name,
        publisher: {
          "@id": `${siteUrl}/#organization`
        },
        inLanguage: locale === "hy" ? "hy-AM" : "en"
      },
      {
        "@type": "ProfessionalService",
        "@id": `${canonicalUrl}#service`,
        name: content.seo.title,
        url: canonicalUrl,
        image: `${siteUrl}/opengraph-image`,
        description: content.seo.description,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: "Worldwide",
        serviceType: content.services.map((service) => service.title),
        inLanguage: locale === "hy" ? "hy-AM" : "en"
      },
      {
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: content.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer
          }
        }))
      }
    ]
  };
}
