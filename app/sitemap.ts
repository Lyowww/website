import type { MetadataRoute } from "next";
import { locales, siteUrl } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...locales.map((locale) => ({
      url: `${siteUrl}/${locale}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: locale === "en" ? 1 : 0.95,
      alternates: {
        languages: Object.fromEntries(locales.map((alternateLocale) => [alternateLocale, `${siteUrl}/${alternateLocale}`]))
      }
    }))
  ];
}
