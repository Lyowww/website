import type { LucideIcon } from "lucide-react";

import copyEn from "@/content/copy/en.json";
import copyHyPartial from "@/content/copy/hy.json";

import { resolveIcon } from "@/lib/content-icons";

export const locales = ["en", "hy"] as const;
export type Locale = (typeof locales)[number];

export type IconContent = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type SiteContent = {
  locale: Locale;
  languageLabel: string;
  brand: {
    name: string;
    homeAriaLabel: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  faq: { question: string; answer: string }[];
  nav: {
    benefits: string;
    services: string;
    process: string;
    contact: string;
    start: string;
    menu: string;
    close: string;
    cta: string;
  };
  processStepWord: string;
  hero: {
    eyebrow: string;
    titleBefore: string;
    titleHighlight: string;
    titleAfter: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
    stats: [string, string][];
    dashboardTitle: string;
    dashboardEyebrow: string;
    live: string;
    dashboardStats: [string, string, string][];
    acquisition: string;
    aiRouting: string;
    botFlow: string;
    botFlowDescription: string;
    launchReady: string;
    ciHealthy: string;
    acquisitionDelta: string;
  };
  sections: {
    benefits: SectionCopy;
    services: SectionCopy;
    technologies: SectionCopy;
    process: SectionCopy;
    showcase: SectionCopy;
    contact: SectionCopy;
  };
  benefits: IconContent[];
  services: IconContent[];
  techGroups: {
    label: string;
    items: string[];
    icon: LucideIcon;
  }[];
  processSteps: IconContent[];
  showcase: (IconContent & {
    metric: string;
    metricLabel: string;
  })[];
  showcasePanel: {
    eyebrow: string;
    title: string;
    description: string;
    health: string;
    optimized: string;
    items: string[];
  };
  contact: {
    cards: {
      title: string;
      value: string;
      href: string;
      icon: LucideIcon;
    }[];
    trustEyebrow: string;
    trustText: string;
    fields: Record<string, string>;
    servicePlaceholder: string;
    selectPlaceholder: string;
    budgetOptions: string[];
    timelineOptions: string[];
    primaryButton: string;
    secondaryButton: string;
    sending: string;
    success: string;
    error: string;
    validation: {
      fullName: string;
      email: string;
      projectDescription: string;
    };
    email: {
      internalSummaryTitle: string;
      internalFromLabel: string;
      visitorFromLabel: string;
      visitorSubject: string;
      /** Use `{{name}}` for the submitter’s name. */
      visitorText: string;
      visitorHtmlTitle: string;
      visitorHtmlBody: string;
      visitorBrandEyebrow: string;
    };
  };
  finalCta: {
    heading: string;
    subtitle: string;
    button: string;
  };
  footer: {
    rights: string;
    note: string;
  };
};

type SectionCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

/** Parsed JSON — tuples arrive as `string[][]`; `icon` fields resolve at runtime. */
type SiteCopyJson = {
  locale: string;
  languageLabel: string;
  brand: SiteContent["brand"];
  seo: SiteContent["seo"];
  faq: SiteContent["faq"];
  nav: SiteContent["nav"];
  processStepWord: string;
  hero: Omit<SiteContent["hero"], "stats" | "dashboardStats"> & {
    stats: string[][];
    dashboardStats: string[][];
  };
  sections: SiteContent["sections"];
  benefits: { title: string; description: string; icon: string }[];
  services: { title: string; description: string; icon: string }[];
  techGroups: { label: string; items: string[]; icon: string }[];
  processSteps: { title: string; description: string; icon: string }[];
  showcase: {
    title: string;
    description: string;
    metric: string;
    metricLabel: string;
    icon: string;
  }[];
  showcasePanel: SiteContent["showcasePanel"];
  contact: Omit<SiteContent["contact"], "cards"> & {
    cards: { title: string; value: string; href: string; icon: string }[];
  };
  finalCta: SiteContent["finalCta"];
  footer: SiteContent["footer"];
};

/** Armenian JSON overlay — omit English-canonical rows; merged at runtime with `en.json`. */
type SiteCopyHyOverlay = Partial<
  Omit<
    SiteCopyJson,
    | "benefits"
    | "services"
    | "processSteps"
    | "showcase"
    | "showcasePanel"
    | "brand"
    | "seo"
    | "faq"
    | "nav"
    | "hero"
    | "sections"
    | "contact"
    | "finalCta"
    | "footer"
  >
> & {
  brand?: Partial<SiteCopyJson["brand"]>;
  seo?: Partial<SiteCopyJson["seo"]>;
  faq?: SiteCopyJson["faq"];
  nav?: Partial<SiteCopyJson["nav"]>;
  hero?: Partial<SiteCopyJson["hero"]>;
  sections?: Partial<{
    [K in keyof SiteCopyJson["sections"]]: Partial<SiteCopyJson["sections"][K]>;
  }>;
  contact?: Partial<
    Omit<SiteCopyJson["contact"], "cards" | "fields" | "validation" | "email">
  > & {
    cards?: SiteCopyJson["contact"]["cards"];
    fields?: Partial<SiteCopyJson["contact"]["fields"]>;
    validation?: Partial<SiteCopyJson["contact"]["validation"]>;
    email?: Partial<SiteCopyJson["contact"]["email"]>;
  };
  finalCta?: Partial<SiteCopyJson["finalCta"]>;
  footer?: Partial<SiteCopyJson["footer"]>;
  benefits?: Array<
    Partial<Pick<SiteCopyJson["benefits"][number], "description">>
  >;
  services?: Array<
    Partial<Pick<SiteCopyJson["services"][number], "description">>
  >;
  processSteps?: Array<
    Partial<Pick<SiteCopyJson["processSteps"][number], "description">>
  >;
  showcase?: Array<
    Partial<Pick<SiteCopyJson["showcase"][number], "description">>
  >;
  showcasePanel?: Partial<Omit<SiteCopyJson["showcasePanel"], "items">>;
};

/**
 * Armenian copy is an overlay on English: UI strings and descriptions live in `hy.json`;
 * service names, benefit titles, process step titles, showcase titles/icons/metrics, tech stack,
 * and showcase panel item labels always come from `en.json` (single source of truth).
 */
function mergeHySiteCopy(
  en: SiteCopyJson,
  hy: SiteCopyHyOverlay,
): SiteCopyJson {
  const contactMerged = hy.contact
    ? {
        ...en.contact,
        ...hy.contact,
        cards: hy.contact.cards ?? en.contact.cards,
        fields: { ...en.contact.fields, ...hy.contact.fields },
        validation: { ...en.contact.validation, ...hy.contact.validation },
        email: { ...en.contact.email, ...hy.contact.email },
        budgetOptions: hy.contact.budgetOptions ?? en.contact.budgetOptions,
        timelineOptions: hy.contact.timelineOptions ?? en.contact.timelineOptions,
      }
    : en.contact;

  const sectionsMerged = hy.sections
    ? {
        benefits: { ...en.sections.benefits, ...hy.sections.benefits },
        services: { ...en.sections.services, ...hy.sections.services },
        technologies: {
          ...en.sections.technologies,
          ...hy.sections.technologies,
        },
        process: { ...en.sections.process, ...hy.sections.process },
        showcase: { ...en.sections.showcase, ...hy.sections.showcase },
        contact: { ...en.sections.contact, ...hy.sections.contact },
      }
    : en.sections;

  return {
    ...en,
    locale: "hy",
    languageLabel: hy.languageLabel ?? en.languageLabel,
    brand: hy.brand ? { ...en.brand, ...hy.brand } : en.brand,
    seo: hy.seo ? { ...en.seo, ...hy.seo } : en.seo,
    faq: hy.faq ?? en.faq,
    nav: hy.nav ? { ...en.nav, ...hy.nav } : en.nav,
    processStepWord: hy.processStepWord ?? en.processStepWord,
    hero: hy.hero ? { ...en.hero, ...hy.hero } : en.hero,
    sections: sectionsMerged,
    techGroups: en.techGroups,
    benefits: en.benefits.map((row, i) => ({
      ...row,
      ...(hy.benefits?.[i] ?? {}),
      title: row.title,
      icon: row.icon,
    })),
    services: en.services.map((row, i) => ({
      ...row,
      ...(hy.services?.[i] ?? {}),
      title: row.title,
      icon: row.icon,
    })),
    processSteps: en.processSteps.map((row, i) => ({
      ...row,
      ...(hy.processSteps?.[i] ?? {}),
      title: row.title,
      icon: row.icon,
    })),
    showcase: en.showcase.map((row, i) => ({
      ...row,
      ...(hy.showcase?.[i] ?? {}),
      title: row.title,
      icon: row.icon,
      metric: row.metric,
      metricLabel: row.metricLabel,
    })),
    showcasePanel: {
      ...en.showcasePanel,
      ...(hy.showcasePanel ?? {}),
      items: en.showcasePanel.items,
    },
    contact: contactMerged as SiteCopyJson["contact"],
    finalCta: hy.finalCta ? { ...en.finalCta, ...hy.finalCta } : en.finalCta,
    footer: hy.footer ? { ...en.footer, ...hy.footer } : en.footer,
  };
}

function hydrateSiteCopy(raw: SiteCopyJson): SiteContent {
  return {
    ...raw,
    locale: raw.locale as Locale,
    hero: {
      ...raw.hero,
      stats: raw.hero.stats as [string, string][],
      dashboardStats: raw.hero.dashboardStats as [string, string, string][],
    },
    benefits: raw.benefits.map((b) => ({
      title: b.title,
      description: b.description,
      icon: resolveIcon(b.icon),
    })),
    services: raw.services.map((s) => ({
      title: s.title,
      description: s.description,
      icon: resolveIcon(s.icon),
    })),
    techGroups: raw.techGroups.map((g) => ({
      label: g.label,
      items: g.items,
      icon: resolveIcon(g.icon),
    })),
    processSteps: raw.processSteps.map((p) => ({
      title: p.title,
      description: p.description,
      icon: resolveIcon(p.icon),
    })),
    showcase: raw.showcase.map((s) => ({
      title: s.title,
      description: s.description,
      metric: s.metric,
      metricLabel: s.metricLabel,
      icon: resolveIcon(s.icon),
    })),
    contact: {
      ...raw.contact,
      cards: raw.contact.cards.map((c) => ({
        title: c.title,
        value: c.value,
        href: c.href,
        icon: resolveIcon(c.icon),
      })),
    },
  };
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adlog.one";

const copyHyMerged = mergeHySiteCopy(
  copyEn as SiteCopyJson,
  copyHyPartial satisfies SiteCopyHyOverlay,
);

export const contentByLocale: Record<Locale, SiteContent> = {
  en: hydrateSiteCopy(copyEn as SiteCopyJson),
  hy: hydrateSiteCopy(copyHyMerged),
};
