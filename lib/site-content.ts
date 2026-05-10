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
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
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
  seo: SiteContent["seo"];
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
    "benefits" | "services" | "processSteps" | "showcase" | "showcasePanel"
  >
> & {
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
      }
    : en.contact;

  return {
    ...en,
    locale: "hy",
    languageLabel: hy.languageLabel ?? en.languageLabel,
    seo: hy.seo ?? en.seo,
    nav: hy.nav ?? en.nav,
    processStepWord: hy.processStepWord ?? en.processStepWord,
    hero: hy.hero ?? en.hero,
    sections: hy.sections ?? en.sections,
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
    contact: contactMerged,
    finalCta: hy.finalCta ?? en.finalCta,
    footer: hy.footer ?? en.footer,
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
  copyHyPartial as SiteCopyHyOverlay,
);

export const contentByLocale: Record<Locale, SiteContent> = {
  en: hydrateSiteCopy(copyEn as SiteCopyJson),
  hy: hydrateSiteCopy(copyHyMerged),
};
