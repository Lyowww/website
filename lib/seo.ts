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
        name: "AdLog",
        url: siteUrl,
        email: "adlog.agency@gmail.com",
        sameAs: ["https://t.me/adlog"],
        description: content.seo.description
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "AdLog",
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
        mainEntity: [
          {
            "@type": "Question",
            name: locale === "hy" ? "Ի՞նչ ծառայություններ եք մատուցում։" : "What services do you provide?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                locale === "hy"
                  ? "Մենք տրամադրում ենք վեբ և մոբայլ մշակում, AI ավտոմատացում, SEO, գովազդ, Telegram բոտեր, DevOps և բիզնեսի աճի ռազմավարություն։"
                  : "We provide web and mobile development, AI automation, SEO, advertising, Telegram bots, DevOps infrastructure, and business growth strategy."
            }
          },
          {
            "@type": "Question",
            name: locale === "hy" ? "Կարո՞ղ եք ավտոմատացնել ներքին գործընթացները։" : "Can you automate internal business processes?",
            acceptedAnswer: {
              "@type": "Answer",
              text:
                locale === "hy"
                  ? "Այո։ Մենք կառուցում ենք AI գործակալներ, workflow-ներ, CRM ինտեգրացիաներ և bot համակարգեր, որոնք նվազեցնում են manual աշխատանքը։"
                  : "Yes. We build AI agents, workflows, CRM integrations, and bot systems that reduce manual work and improve operational speed."
            }
          }
        ]
      }
    ]
  };
}
