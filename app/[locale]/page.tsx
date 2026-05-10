import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing-page";
import { getCanonicalUrl, getStructuredData } from "@/lib/seo";
import { contentByLocale, isLocale, locales, type Locale, siteUrl } from "@/lib/site-content";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    return {};
  }

  const content = contentByLocale[rawLocale];
  const canonicalUrl = getCanonicalUrl(rawLocale);
  const alternates = Object.fromEntries(locales.map((locale) => [locale, `/${locale}`]));

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: content.seo.title,
      template: `%s | ${content.brand.name}`
    },
    description: content.seo.description,
    keywords: content.seo.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        ...alternates,
        "x-default": "/en"
      }
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: content.brand.name,
      title: content.seo.title,
      description: content.seo.description,
      locale: rawLocale === "hy" ? "hy_AM" : "en_US",
      alternateLocale: rawLocale === "hy" ? ["en_US"] : ["hy_AM"]
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    }
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getStructuredData(locale)).replace(/</g, "\\u003c")
        }}
      />
      <LandingPage locale={locale} />
    </>
  );
}
