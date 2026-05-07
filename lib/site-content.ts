import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Bot,
  BrainCircuit,
  ChartNoAxesCombined,
  CircleDollarSign,
  Clock3,
  CloudCog,
  Code2,
  Gauge,
  Globe2,
  Layers3,
  LifeBuoy,
  Mail,
  Megaphone,
  MessageCircle,
  Milestone,
  MousePointer2,
  Network,
  Rocket,
  Search,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Zap
} from "lucide-react";

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

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ecosystem.studio";

export const contentByLocale: Record<Locale, SiteContent> = {
  en: {
    locale: "en",
    languageLabel: "EN",
    seo: {
      title: "AI Automation, Software Engineering & Digital Growth Agency",
      description:
        "Premium digital agency building scalable web and mobile products, AI automation systems, SEO, ads, Telegram bots, DevOps infrastructure, and business growth ecosystems.",
      keywords: [
        "AI automation agency",
        "software engineering agency",
        "web development",
        "mobile app development",
        "SEO agency",
        "Telegram bot development",
        "DevOps infrastructure",
        "business growth strategy"
      ]
    },
    nav: {
      benefits: "Benefits",
      services: "Services",
      process: "Process",
      contact: "Contact",
      start: "Start",
      menu: "Menu",
      close: "Close"
    },
    processStepWord: "Step",
    hero: {
      eyebrow: "AI, engineering, automation, growth",
      titleBefore: "Build Smarter",
      titleHighlight: "Digital Systems",
      titleAfter: "For Your Business",
      subtitle:
        "We help businesses grow through modern development, AI automation, SEO, advertising, and scalable digital systems.",
      primaryCta: "Get Free Consultation",
      secondaryCta: "View Services",
      stats: [
        ["AI", "automation-first"],
        ["360", "digital growth"],
        ["24/7", "support systems"]
      ],
      dashboardTitle: "Business Command Center",
      dashboardEyebrow: "Growth OS",
      live: "Live",
      dashboardStats: [
        ["Leads", "+37%", "from SEO"],
        ["Automation", "18.4h", "saved weekly"],
        ["Revenue", "+$86k", "pipeline"]
      ],
      acquisition: "Acquisition Engine",
      aiRouting: "AI Routing",
      botFlow: "Bot Flow",
      botFlowDescription: "Lead captured, qualified, and synced to CRM.",
      launchReady: "Launch Ready",
      ciHealthy: "CI/CD healthy"
    },
    sections: {
      benefits: {
        eyebrow: "Why businesses work with us",
        title: "Why Businesses Work With Us",
        description:
          "We combine strategic clarity, senior execution, and intelligent systems to create digital ecosystems that compound over time."
      },
      services: {
        eyebrow: "Digital ecosystem services",
        title: "A Full-Stack Growth Engine",
        description:
          "From product architecture to AI automation, paid acquisition, SEO, and infrastructure, every service is designed to make the business stronger."
      },
      technologies: {
        eyebrow: "Technology stack",
        title: "Modern Tools For Scalable Systems",
        description:
          "We select proven technologies that keep products fast, maintainable, observable, and ready for the next stage of growth."
      },
      process: {
        eyebrow: "How we build",
        title: "From Strategy To Scalable Growth",
        description:
          "A clear process keeps ambition focused, quality high, and momentum visible from the first conversation to post-launch optimization."
      },
      showcase: {
        eyebrow: "Showcase and results",
        title: "Systems That Look Premium And Work Hard",
        description:
          "Every deliverable becomes part of a broader business engine: measurable, automated, integrated, and ready to scale."
      },
      contact: {
        eyebrow: "Start the conversation",
        title: "Tell Us What You Want To Build",
        description:
          "Share your goals and we will map the best path across product, engineering, AI automation, marketing, and infrastructure."
      }
    },
    benefits: [
      {
        title: "Senior-Level Engineering",
        description: "Architecture, implementation, and delivery led with the discipline of enterprise product teams.",
        icon: Code2
      },
      {
        title: "AI-Powered Automation",
        description: "Agents, workflows, and internal tools that reduce manual work and unlock faster operations.",
        icon: BrainCircuit
      },
      {
        title: "Full-Service Digital Solutions",
        description: "Strategy, product, engineering, SEO, ads, and automation moving in one coordinated system.",
        icon: Layers3
      },
      {
        title: "Scalable Infrastructure",
        description: "Cloud-ready platforms, CI/CD, observability, and deployment systems built for growth.",
        icon: ServerCog
      },
      {
        title: "SEO & Marketing Expertise",
        description: "Visibility systems that compound through search, paid acquisition, and conversion strategy.",
        icon: ChartNoAxesCombined
      },
      {
        title: "Fast Communication & Support",
        description: "Transparent delivery, quick feedback cycles, and reliable support after launch.",
        icon: LifeBuoy
      }
    ],
    services: [
      {
        title: "Web Development",
        description: "High-performance websites, SaaS platforms, dashboards, and conversion-focused web apps.",
        icon: Globe2
      },
      {
        title: "Mobile Applications",
        description: "Premium iOS, Android, and React Native experiences designed for daily engagement.",
        icon: Smartphone
      },
      {
        title: "AI Solutions",
        description: "AI assistants, data workflows, intelligent search, content systems, and agentic tools.",
        icon: BrainCircuit
      },
      {
        title: "Telegram Bots",
        description: "Revenue, support, booking, CRM, and automation bots connected to your business logic.",
        icon: Bot
      },
      {
        title: "Automation Systems",
        description: "Operations pipelines that connect sales, support, marketing, finance, and internal teams.",
        icon: Workflow
      },
      {
        title: "SEO Optimization",
        description: "Technical SEO, content architecture, analytics, and growth loops for organic visibility.",
        icon: Search
      },
      {
        title: "Google Ads & Meta Ads",
        description: "Paid acquisition systems with sharp positioning, tracking, landing pages, and iteration.",
        icon: Megaphone
      },
      {
        title: "Infrastructure & DevOps",
        description: "Docker, CI/CD, cloud systems, monitoring, reliability, and cost-aware scaling.",
        icon: CloudCog
      },
      {
        title: "Business Consultation",
        description: "Digital strategy, product roadmaps, automation opportunities, and scalable growth planning.",
        icon: Rocket
      }
    ],
    techGroups: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript"], icon: MousePointer2 },
      { label: "Backend", items: ["Node.js", "NestJS", "Express"], icon: Network },
      { label: "Mobile", items: ["React Native", "iOS", "Android"], icon: Smartphone },
      { label: "Infrastructure", items: ["Docker", "CI/CD", "Cloud Systems"], icon: ServerCog },
      { label: "AI", items: ["OpenAI", "AI Agents", "Automation"], icon: Sparkles },
      { label: "Marketing", items: ["SEO", "Google Ads", "Meta Ads"], icon: Gauge }
    ],
    processSteps: [
      {
        title: "Research & Strategy",
        description:
          "We identify business goals, audience intent, bottlenecks, and growth opportunities before writing code.",
        icon: Search
      },
      {
        title: "Design & Planning",
        description: "We shape the experience, technical architecture, integrations, milestones, and success metrics.",
        icon: Milestone
      },
      {
        title: "Development",
        description: "We build fast, scalable products with clean code, reliable systems, and premium interface details.",
        icon: Code2
      },
      {
        title: "AI & Automation Integration",
        description: "We connect AI, bots, workflows, and internal tools so the business operates with less friction.",
        icon: Zap
      },
      {
        title: "Launch & Scaling",
        description: "We deploy, measure, optimize, and keep improving the ecosystem as demand grows.",
        icon: Rocket
      }
    ],
    showcase: [
      {
        title: "AI Automation Systems",
        description: "Agent workflows that qualify leads, summarize conversations, trigger tasks, and assist teams.",
        metric: "42%",
        metricLabel: "less manual work",
        icon: Activity
      },
      {
        title: "Business Platforms",
        description: "Customer portals, internal operating systems, booking flows, and revenue dashboards.",
        metric: "3.8x",
        metricLabel: "faster operations",
        icon: ShieldCheck
      },
      {
        title: "Telegram Bots",
        description: "Sales, support, notifications, payments, and CRM-connected bots for instant customer action.",
        metric: "24/7",
        metricLabel: "automated support",
        icon: MessageCircle
      },
      {
        title: "Marketing Systems",
        description: "Landing pages, tracking, SEO infrastructure, paid campaigns, and attribution dashboards.",
        metric: "+68%",
        metricLabel: "lead quality lift",
        icon: Megaphone
      },
      {
        title: "CRM & Internal Dashboards",
        description: "Role-based analytics, pipeline visibility, automations, and team command centers.",
        metric: "1 source",
        metricLabel: "of truth",
        icon: ChartNoAxesCombined
      }
    ],
    showcasePanel: {
      eyebrow: "Ecosystem view",
      title: "One connected operating layer for growth.",
      description:
        "We connect product, marketing, AI, automation, analytics, and infrastructure so your digital presence behaves like one intelligent system.",
      health: "System Health",
      optimized: "Optimized",
      items: ["Lead generation", "AI qualification", "CRM sync", "Retargeting", "Cloud deployment"]
    },
    contact: {
      cards: [
        { title: "Telegram", value: "@ecosystemstudio", href: "https://t.me/", icon: MessageCircle },
        { title: "Email", value: "hello@ecosystem.studio", href: "mailto:hello@ecosystem.studio", icon: Mail },
        { title: "Response Time", value: "Usually within 24 hours", href: "#contact", icon: Clock3 },
        { title: "Engagements", value: "Strategy, builds, retainers, scaling", href: "#contact", icon: CircleDollarSign }
      ],
      trustEyebrow: "Trust signal",
      trustText: "Strategy-first builds with measurable business outcomes.",
      fields: {
        fullName: "Full Name",
        companyName: "Company Name",
        email: "Email",
        phoneTelegram: "Phone / Telegram",
        servicesInterested: "Services Interested In",
        projectDescription: "Project Description",
        estimatedBudget: "Estimated Budget",
        timeline: "Timeline"
      },
      servicePlaceholder: "Select a service",
      selectPlaceholder: "Select an option",
      budgetOptions: ["Under $5k", "$5k - $15k", "$15k - $50k", "$50k+"],
      timelineOptions: ["ASAP", "2-4 weeks", "1-3 months", "Flexible"],
      primaryButton: "Get Free Consultation",
      secondaryButton: "Schedule a Call",
      sending: "Sending...",
      success: "Message received. We sent you a confirmation email and will respond with a clear next step.",
      error: "Something went wrong. Please try again or contact us by email.",
      validation: {
        fullName: "Please enter your full name.",
        email: "Please enter a valid email.",
        projectDescription: "Tell us a little about the project."
      }
    },
    finalCta: {
      heading: "More Visibility. More Customers. More Growth.",
      subtitle:
        "We combine engineering, AI, automation, SEO, and marketing to help businesses scale faster and operate smarter.",
      button: "Build Your Growth System"
    },
    footer: {
      note: "Designed and built in-house by our team.",
      rights: "All rights reserved."
    }
  },
  hy: {
    locale: "hy",
    languageLabel: "HY",
    seo: {
      title: "AI ավտոմատացում, ծրագրավորում և թվային աճ բիզնեսի համար",
      description:
        "Պրեմիում թվային գործակալություն՝ վեբ և մոբայլ մշակում, AI ավտոմատացում, SEO, գովազդ, Telegram բոտեր, DevOps և բիզնեսի աճի համակարգեր։",
      keywords: [
        "AI ավտոմատացում",
        "ծրագրավորման գործակալություն",
        "վեբ կայքերի մշակում",
        "մոբայլ հավելվածների մշակում",
        "SEO ծառայություններ",
        "Telegram բոտեր",
        "DevOps",
        "բիզնեսի աճ"
      ]
    },
    nav: {
      benefits: "Առավելություններ",
      services: "Ծառայություններ",
      process: "Գործընթաց",
      contact: "Կապ",
      start: "Սկսել",
      menu: "Մենյու",
      close: "Փակել"
    },
    processStepWord: "Քայլ",
    hero: {
      eyebrow: "AI, ծրագրավորում, ավտոմատացում, աճ",
      titleBefore: "Կառուցեք խելացի",
      titleHighlight: "թվային համակարգեր",
      titleAfter: "ձեր բիզնեսի համար",
      subtitle:
        "Օգնում ենք բիզնեսներին աճել ժամանակակից ծրագրավորմամբ, AI ավտոմատացմամբ, SEO-ով, գովազդով և մասշտաբավորվող թվային համակարգերով։",
      primaryCta: "Ստանալ անվճար խորհրդատվություն",
      secondaryCta: "Դիտել ծառայությունները",
      stats: [
        ["AI", "ավտոմատացում առաջինը"],
        ["360", "թվային աճ"],
        ["24/7", "աջակցման համակարգեր"]
      ],
      dashboardTitle: "Բիզնեսի կառավարման կենտրոն",
      dashboardEyebrow: "Growth OS",
      live: "Ուղիղ",
      dashboardStats: [
        ["Հարցումներ", "+37%", "SEO-ից"],
        ["Ավտոմատացում", "18.4ժ", "խնայված շաբաթական"],
        ["Եկամուտ", "+$86k", "pipeline"]
      ],
      acquisition: "Հաճախորդների ներգրավում",
      aiRouting: "AI ուղղորդում",
      botFlow: "Բոտի հոսք",
      botFlowDescription: "Հարցումը ստացվեց, որակավորվեց և փոխանցվեց CRM։",
      launchReady: "Պատրաստ է գործարկման",
      ciHealthy: "CI/CD առողջ է"
    },
    sections: {
      benefits: {
        eyebrow: "Ինչու են բիզնեսները աշխատում մեզ հետ",
        title: "Ինչու են բիզնեսները ընտրում մեզ",
        description:
          "Մենք միավորում ենք ռազմավարական հստակությունը, senior մակարդակի իրականացումը և խելացի համակարգերը՝ ստեղծելով երկարաժամկետ աճող թվային էկոհամակարգեր։"
      },
      services: {
        eyebrow: "Թվային էկոհամակարգի ծառայություններ",
        title: "Լիարժեք աճի համակարգ",
        description:
          "Պրոդուկտի ճարտարապետությունից մինչև AI ավտոմատացում, գովազդ, SEO և ենթակառուցվածքներ՝ ամեն ծառայություն ուժեղացնում է բիզնեսը։"
      },
      technologies: {
        eyebrow: "Տեխնոլոգիաներ",
        title: "Ժամանակակից գործիքներ մասշտաբավորման համար",
        description:
          "Ընտրում ենք փորձված տեխնոլոգիաներ, որպեսզի պրոդուկտները լինեն արագ, կայուն, վերահսկելի և պատրաստ աճի հաջորդ փուլին։"
      },
      process: {
        eyebrow: "Ինչպես ենք կառուցում",
        title: "Ռազմավարությունից մինչև մասշտաբավորվող աճ",
        description:
          "Հստակ գործընթացը պահում է որակը բարձր, աշխատանքը տեսանելի, իսկ արդյունքը՝ չափելի առաջին զրույցից մինչև launch և օպտիմիզացում։"
      },
      showcase: {
        eyebrow: "Արդյունքներ և օրինակներ",
        title: "Պրեմիում տեսք ունեցող և իրական աշխատող համակարգեր",
        description:
          "Յուրաքանչյուր լուծում դառնում է ավելի լայն բիզնես շարժիչի մաս՝ չափելի, ավտոմատացված, ինտեգրված և մասշտաբավորվող։"
      },
      contact: {
        eyebrow: "Սկսենք խոսակցությունը",
        title: "Պատմեք՝ ինչ եք ուզում կառուցել",
        description:
          "Կիսվեք ձեր նպատակներով, և մենք կնախագծենք լավագույն ճանապարհը պրոդուկտի, ծրագրավորման, AI ավտոմատացման, մարքեթինգի և ենթակառուցվածքների համար։"
      }
    },
    benefits: [
      {
        title: "Senior մակարդակի ծրագրավորում",
        description: "Ճարտարապետություն, մշակում և առաքում՝ enterprise պրոդուկտ թիմերի կարգապահությամբ։",
        icon: Code2
      },
      {
        title: "AI-ով աշխատող ավտոմատացում",
        description: "Գործակալներ, workflow-ներ և ներքին գործիքներ, որոնք կրճատում են ձեռքով աշխատանքը։",
        icon: BrainCircuit
      },
      {
        title: "Ամբողջական թվային լուծումներ",
        description: "Ռազմավարություն, պրոդուկտ, ծրագրավորում, SEO, գովազդ և ավտոմատացում մեկ համակարգում։",
        icon: Layers3
      },
      {
        title: "Մասշտաբավորվող ենթակառուցվածք",
        description: "Cloud-ready հարթակներ, CI/CD, observability և deployment համակարգեր աճի համար։",
        icon: ServerCog
      },
      {
        title: "SEO և մարքեթինգ",
        description: "Տեսանելիության համակարգեր՝ որոնման, վճարովի ներգրավման և conversion ռազմավարության միջոցով։",
        icon: ChartNoAxesCombined
      },
      {
        title: "Արագ կապ և աջակցություն",
        description: "Թափանցիկ աշխատանք, արագ feedback և վստահելի աջակցություն գործարկումից հետո։",
        icon: LifeBuoy
      }
    ],
    services: [
      {
        title: "Վեբ մշակում",
        description: "Արագ կայքեր, SaaS հարթակներ, dashboard-ներ և conversion-focused վեբ հավելվածներ։",
        icon: Globe2
      },
      {
        title: "Մոբայլ հավելվածներ",
        description: "Պրեմիում iOS, Android և React Native փորձառություններ՝ ամենօրյա օգտագործման համար։",
        icon: Smartphone
      },
      {
        title: "AI լուծումներ",
        description: "AI assistant-ներ, տվյալների workflow-ներ, խելացի որոնում, content համակարգեր և agentic tools։",
        icon: BrainCircuit
      },
      {
        title: "Telegram բոտեր",
        description: "Վաճառքի, աջակցության, booking-ի, CRM-ի և ավտոմատացման բոտեր ձեր բիզնես լոգիկայով։",
        icon: Bot
      },
      {
        title: "Ավտոմատացման համակարգեր",
        description: "Գործառնական pipeline-ներ՝ վաճառք, աջակցություն, մարքեթինգ, ֆինանսներ և թիմեր կապելու համար։",
        icon: Workflow
      },
      {
        title: "SEO օպտիմիզացում",
        description: "Տեխնիկական SEO, content architecture, analytics և growth loops օրգանական տեսանելիության համար։",
        icon: Search
      },
      {
        title: "Google Ads և Meta Ads",
        description: "Վճարովի ներգրավման համակարգեր՝ positioning, tracking, landing pages և շարունակական բարելավում։",
        icon: Megaphone
      },
      {
        title: "Infrastructure և DevOps",
        description: "Docker, CI/CD, cloud systems, monitoring, հուսալիություն և ծախսերի գիտակցված մասշտաբավորում։",
        icon: CloudCog
      },
      {
        title: "Բիզնես խորհրդատվություն",
        description: "Թվային ռազմավարություն, product roadmap-ներ, ավտոմատացման հնարավորություններ և աճի պլան։",
        icon: Rocket
      }
    ],
    techGroups: [
      { label: "Frontend", items: ["React", "Next.js", "TypeScript"], icon: MousePointer2 },
      { label: "Backend", items: ["Node.js", "NestJS", "Express"], icon: Network },
      { label: "Mobile", items: ["React Native", "iOS", "Android"], icon: Smartphone },
      { label: "Infrastructure", items: ["Docker", "CI/CD", "Cloud Systems"], icon: ServerCog },
      { label: "AI", items: ["OpenAI", "AI Agents", "Automation"], icon: Sparkles },
      { label: "Marketing", items: ["SEO", "Google Ads", "Meta Ads"], icon: Gauge }
    ],
    processSteps: [
      {
        title: "Հետազոտություն և ռազմավարություն",
        description: "Պարզում ենք բիզնես նպատակները, լսարանի intent-ը, bottleneck-ները և աճի հնարավորությունները։",
        icon: Search
      },
      {
        title: "Դիզայն և պլանավորում",
        description: "Ձևավորում ենք փորձառությունը, տեխնիկական ճարտարապետությունը, ինտեգրացիաները և չափանիշները։",
        icon: Milestone
      },
      {
        title: "Մշակում",
        description: "Կառուցում ենք արագ և մասշտաբավորվող պրոդուկտներ՝ մաքուր կոդով և պրեմիում UI մանրամասներով։",
        icon: Code2
      },
      {
        title: "AI և ավտոմատացման ինտեգրում",
        description: "Միացնում ենք AI, բոտեր, workflow-ներ և ներքին գործիքներ՝ գործառնությունները հեշտացնելու համար։",
        icon: Zap
      },
      {
        title: "Գործարկում և մասշտաբավորում",
        description: "Deploy, չափում, օպտիմիզացում և շարունակական բարելավում պահանջարկի աճին զուգահեռ։",
        icon: Rocket
      }
    ],
    showcase: [
      {
        title: "AI ավտոմատացման համակարգեր",
        description: "Agent workflow-ներ, որոնք որակավորում են lead-երը, ամփոփում խոսակցությունները և ստեղծում tasks։",
        metric: "42%",
        metricLabel: "քիչ manual աշխատանք",
        icon: Activity
      },
      {
        title: "Բիզնես հարթակներ",
        description: "Customer portals, ներքին OS, booking flows և revenue dashboards։",
        metric: "3.8x",
        metricLabel: "արագ գործառնություններ",
        icon: ShieldCheck
      },
      {
        title: "Telegram բոտեր",
        description: "Վաճառք, աջակցություն, ծանուցումներ, վճարումներ և CRM-connected բոտեր։",
        metric: "24/7",
        metricLabel: "ավտոմատ աջակցություն",
        icon: MessageCircle
      },
      {
        title: "Մարքեթինգ համակարգեր",
        description: "Landing pages, tracking, SEO ենթակառուցվածք, paid campaigns և attribution dashboards։",
        metric: "+68%",
        metricLabel: "lead quality աճ",
        icon: Megaphone
      },
      {
        title: "CRM և ներքին dashboard-ներ",
        description: "Role-based analytics, pipeline visibility, ավտոմատացումներ և թիմային command centers։",
        metric: "1 աղբյուր",
        metricLabel: "ճշմարտության",
        icon: ChartNoAxesCombined
      }
    ],
    showcasePanel: {
      eyebrow: "Էկոհամակարգի տեսք",
      title: "Մեկ միացված գործառնական շերտ աճի համար։",
      description:
        "Միացնում ենք պրոդուկտը, մարքեթինգը, AI-ը, ավտոմատացումը, analytics-ը և ենթակառուցվածքը, որպեսզի ձեր թվային ներկայությունը աշխատի որպես մեկ խելացի համակարգ։",
      health: "Համակարգի վիճակ",
      optimized: "Օպտիմիզացված",
      items: ["Lead generation", "AI qualification", "CRM sync", "Retargeting", "Cloud deployment"]
    },
    contact: {
      cards: [
        { title: "Telegram", value: "@ecosystemstudio", href: "https://t.me/", icon: MessageCircle },
        { title: "Էլ. փոստ", value: "hello@ecosystem.studio", href: "mailto:hello@ecosystem.studio", icon: Mail },
        { title: "Պատասխան", value: "Սովորաբար 24 ժամում", href: "#contact", icon: Clock3 },
        { title: "Աշխատանք", value: "Ռազմավարություն, մշակում, retainer, scaling", href: "#contact", icon: CircleDollarSign }
      ],
      trustEyebrow: "Վստահության նշան",
      trustText: "Ռազմավարությունից սկսվող մշակում՝ չափելի բիզնես արդյունքներով։",
      fields: {
        fullName: "Անուն Ազգանուն",
        companyName: "Ընկերության անուն",
        email: "Էլ. փոստ",
        phoneTelegram: "Հեռախոս / Telegram",
        servicesInterested: "Հետաքրքրող ծառայություններ",
        projectDescription: "Նախագծի նկարագրություն",
        estimatedBudget: "Մոտավոր բյուջե",
        timeline: "Ժամկետ"
      },
      servicePlaceholder: "Ընտրեք ծառայությունը",
      selectPlaceholder: "Ընտրեք տարբերակ",
      budgetOptions: ["Մինչև $5k", "$5k - $15k", "$15k - $50k", "$50k+"],
      timelineOptions: ["Շտապ", "2-4 շաբաթ", "1-3 ամիս", "Ճկուն"],
      primaryButton: "Ստանալ անվճար խորհրդատվություն",
      secondaryButton: "Պլանավորել զանգ",
      sending: "Ուղարկվում է...",
      success: "Հաղորդագրությունը ստացվեց։ Մենք ձեզ հաստատման նամակ ուղարկեցինք և շուտով կպատասխանենք։",
      error: "Ինչ-որ բան սխալ է։ Խնդրում ենք փորձել կրկին կամ կապվել էլ. փոստով։",
      validation: {
        fullName: "Խնդրում ենք լրացնել անունը։",
        email: "Խնդրում ենք լրացնել ճիշտ էլ. փոստ։",
        projectDescription: "Խնդրում ենք մի փոքր պատմել նախագծի մասին։"
      }
    },
    finalCta: {
      heading: "Ավելի շատ տեսանելիություն։ Ավելի շատ հաճախորդներ։ Ավելի շատ աճ։",
      subtitle:
        "Մենք միավորում ենք ծրագրավորումը, AI-ը, ավտոմատացումը, SEO-ն և մարքեթինգը՝ օգնելով բիզնեսներին աճել արագ և աշխատել խելացի։",
      button: "Կառուցել աճի համակարգ"
    },
    footer: {
      note: "Մշակված է մեր ներքին թիմի կողմից։",
      rights: "Բոլոր իրավունքները պաշտպանված են։"
    }
  }
};
