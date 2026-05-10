"use client";

import {
  MotionConfig,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useScroll,
  useTransform,
  type MotionValue,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Menu,
  Send,
  X,
} from "lucide-react";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BrandLogo } from "@/components/brand-logo";
import { FormDropdown } from "@/components/form-dropdown";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionTitle } from "@/components/section-title";
import { SmoothScroll } from "@/components/smooth-scroll";
import {
  contentByLocale,
  locales,
  type Locale,
  type SiteContent,
} from "@/lib/site-content";

/** Anchors mirrored in the header — order matches section DOM / scroll sequence */
const NAV_ANCHOR_IDS = [
  "services",
  "technologies",
  "process",
  "contact",
  "faq",
  "payment",
] as const;

const TabVisibleContext = createContext(true);

function TabVisibleProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const sync = () => {
      const hidden = document.hidden;
      setVisible(!hidden);
      document.documentElement.toggleAttribute("data-tab-hidden", hidden);
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      document.documentElement.removeAttribute("data-tab-hidden");
    };
  }, []);

  return (
    <TabVisibleContext.Provider value={visible}>
      {children}
    </TabVisibleContext.Provider>
  );
}

function useTabVisible() {
  return useContext(TabVisibleContext);
}

/** Smooth symmetrical easing for looping ambient motion */
const EASE_BREATH: [number, number, number, number] = [0.45, 0, 0.55, 1];

/** Apple-like deceleration — smooth stops without sluggishness */
const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.74, ease: EASE_PREMIUM },
  },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.068,
    },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.62, ease: EASE_PREMIUM },
  },
};

const heroTitleStagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.03,
    },
  },
};

const heroTitleLine: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.82, ease: EASE_PREMIUM },
  },
};

const processLaneFromLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.68, ease: EASE_PREMIUM },
  },
};

const processLaneFromRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.68, ease: EASE_PREMIUM },
  },
};

type LandingPageProps = {
  locale: Locale;
};

export function LandingPage({ locale }: LandingPageProps) {
  const content = contentByLocale[locale];

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <TabVisibleProvider>
          <MouseLight />
          <div className="noise-overlay" />
          <main
            className="studio-surface relative isolate min-h-screen overflow-hidden bg-ink-950/94 text-cream-100"
            lang={locale}
          >
            <ScrollProgressBar />
            <Navigation content={content} />
            <HeroSection content={content} />
            <ServicesSection content={content} />
            <TechnologiesSection content={content} />
            <ProcessSection content={content} />
            {/* <ShowcaseSection content={content} /> */}
            <ContactSection content={content} />
            <FaqSection content={content} />
            <PaymentSection content={content} />
            <FinalCtaSection content={content} />
            <SiteFooter content={content} />
          </main>
        </TabVisibleProvider>
      </SmoothScroll>
    </MotionConfig>
  );
}

function MouseLight() {
  const x = useSpring(useMotionValue(-500), {
    stiffness: 65,
    damping: 24,
    mass: 0.45,
  });
  const y = useSpring(useMotionValue(-500), {
    stiffness: 65,
    damping: 24,
    mass: 0.45,
  });
  const enabledRef = useRef(false);

  useEffect(() => {
    const canTrack =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    enabledRef.current = canTrack;

    if (!canTrack) {
      return;
    }

    let frame = 0;
    const moveLight = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        x.set(event.clientX - 180);
        y.set(event.clientY - 180);
      });
    };

    window.addEventListener("pointermove", moveLight, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", moveLight);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-50 hidden size-[22rem] rounded-full bg-cyan-glow/[0.075] blur-3xl motion-reduce:hidden lg:block"
    />
  );
}

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 88,
    damping: 26,
    mass: 0.12,
  });

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[3px] origin-left"
      style={{ scaleX }}
      aria-hidden
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-glow to-lime-glow/95 opacity-90 shadow-[0_1px_20px_rgba(124,231,247,0.45)]" />
    </motion.div>
  );
}

function Navigation({ content }: { content: SiteContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const [elevated, setElevated] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setElevated(latest > 32);
  });

  useEffect(() => {
    const allowed = new Set<string>(NAV_ANCHOR_IDS);
    const elements = NAV_ANCHOR_IDS.map((id) =>
      document.getElementById(id),
    ).filter((node): node is HTMLElement => Boolean(node));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const next = visible[0]?.target.id ?? null;
        if (next && allowed.has(next)) {
          setActiveSection(next);
        }
      },
      { rootMargin: "-92px 0px -56% 0px", threshold: [0, 0.08, 0.15, 0.28] },
    );

    elements.forEach((element) => observer.observe(element));

    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      if (hash && allowed.has(hash)) {
        setActiveSection(hash);
      }
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);

    return () => {
      window.removeEventListener("hashchange", syncHash);
      observer.disconnect();
    };
  }, []);

  const navItems = [
    [content.nav.services, "services"],
    [content.nav.technologies, "technologies"],
    [content.nav.process, "process"],
    [content.nav.contact, "contact"],
    [content.nav.faq, "faq"],
    [content.nav.payment, "payment"],
  ];

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, ease: EASE_PREMIUM }}
        className="header-safe-pt page-px fixed left-0 right-0 top-0 z-40"
      >
        <nav
          className={`relative mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border px-3 py-2 shadow-black/25 ring-1 ring-inset ring-white/[0.06] backdrop-blur-xl transition-[border-color,box-shadow,background-color] duration-500 sm:gap-3 sm:px-5 sm:py-3 ${
            elevated
              ? "border-white/14 bg-ink-950/82 shadow-[0_14px_50px_-24px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
              : "border-white/10 bg-ink-950/72 shadow-2xl backdrop-blur-xl"
          }`}
        >
          <a
            href={`/${content.locale}#top`}
            className="relative z-10 flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label="AdLog home"
          >
            <BrandLogo
              priority
              className="relative size-7 shrink-0 sm:size-9"
              sizes="(max-width: 640px) 28px, 36px"
            />
            <span className="font-display truncate text-xs font-bold tracking-[-0.02em] sm:text-base">
              AdLog
            </span>
          </a>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden max-w-[min(100%,calc(100vw-17rem))] -translate-x-1/2 -translate-y-1/2 lg:block xl:max-w-none">
            <div className="pointer-events-auto flex items-center gap-0.5 overflow-x-auto rounded-full border border-white/10 bg-white/[0.04] p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {navItems.map(([item, target]) => (
                <a
                  key={target}
                  href={`#${target}`}
                  className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] transition-colors duration-300 xl:px-4 xl:text-sm ${
                    activeSection === target
                      ? "bg-cyan-glow/14 text-cream-100 ring-1 ring-cyan-glow/28"
                      : "text-cream-100/62 hover:bg-white/[0.06] hover:text-cream-100"
                  }`}
                  aria-current={
                    activeSection === target ? "location" : undefined
                  }
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div className="relative z-10 flex shrink-0 items-center gap-1.5 sm:gap-2">
            <div className="flex rounded-full border border-white/10 bg-white/[0.04] p-0.5 sm:p-1">
              {locales.map((locale) => (
                <a
                  key={locale}
                  href={`/${locale}`}
                  className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide transition sm:px-3 sm:py-1.5 sm:text-xs ${
                    locale === content.locale
                      ? "bg-cream-100 text-ink-950"
                      : "text-cream-100/55 hover:bg-white/[0.06] hover:text-cream-100"
                  }`}
                  hrefLang={locale}
                >
                  {locale.toUpperCase()}
                </a>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-cream-100 transition hover:border-cyan-glow/35 hover:bg-white/[0.09] lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={content.nav.menu}
              onClick={() => setMenuOpen(true)}
            >
              <Menu className="size-5" strokeWidth={2} />
            </button>
          </div>
        </nav>
      </motion.header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink-950/85 backdrop-blur-md"
            aria-label={content.nav.close}
            onClick={closeMenu}
          />
          <motion.div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={content.nav.menu}
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, ease: EASE_PREMIUM }}
            className="page-px footer-safe-pb absolute inset-y-0 right-0 flex w-[min(100%,21rem)] flex-col border-l border-white/10 bg-ink-900/97 shadow-2xl backdrop-blur-xl"
          >
            <div className="header-safe-pt flex items-center justify-between gap-3 border-b border-white/10 py-4">
              <div className="flex min-w-0 items-center gap-3">
                <BrandLogo
                  className="relative size-6 shrink-0"
                  sizes="24px"
                />
                <span className="font-display truncate text-sm font-semibold text-cream-100">
                  {content.nav.menu}
                </span>
              </div>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-cream-100"
                onClick={closeMenu}
                aria-label={content.nav.close}
              >
                <X className="size-5" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col gap-1 py-6">
              {navItems.map(([label, target]) => (
                <a
                  key={target}
                  href={`#${target}`}
                  className={`rounded-xl px-4 py-3.5 text-base font-medium transition-colors duration-300 ${
                    activeSection === target
                      ? "bg-cyan-glow/12 text-cyan-glow"
                      : "text-cream-100/85 hover:bg-white/[0.06] hover:text-cream-100 active:bg-white/[0.08]"
                  }`}
                  onClick={closeMenu}
                >
                  {label}
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      ) : null}
    </>
  );
}

function HeroSection({ content }: { content: SiteContent }) {
  const heroRef = useRef<HTMLElement | null>(null);
  const tabVisible = useTabVisible();
  const heroInView = useInView(heroRef, {
    margin: "-72px 0px -48% 0px",
    amount: 0.06,
  });
  const ambientOn = tabVisible && heroInView;
  const { scrollYProgress } = useScroll();
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.22], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);
  const bgParallax = useTransform(heroProgress, [0, 1], [0, 64]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="page-px relative overflow-hidden pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-20 lg:pt-32"
    >
      <HeroBackground ambientOn={ambientOn} parallaxY={bgParallax} />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 xl:gap-12"
      >
        <div className="relative flex min-w-0 gap-5 sm:gap-6 lg:gap-7">
          <div
            className="motion-safe-lite mt-1 hidden min-h-[9.5rem] w-px shrink-0 rounded-full bg-gradient-to-b from-cyan-glow/70 via-white/20 to-lime-glow/40 opacity-[0.85] shadow-[0_0_24px_rgba(124,231,247,0.35)] sm:mt-1.5 sm:block sm:min-h-[11rem] lg:min-h-[12.5rem]"
            aria-hidden
          />
          <div className="min-w-0 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, ease: EASE_PREMIUM }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-glow/95 shadow-[0_0_44px_-10px_rgba(124,231,247,0.45)] backdrop-blur-xl sm:mb-6 sm:px-3.5 sm:py-2 sm:text-xs sm:tracking-[0.24em]"
          >
            <span
              className="relative flex size-2 shrink-0 rounded-full bg-cyan-glow shadow-[0_0_12px_rgba(124,231,247,0.85)] hero-signal-dot"
              aria-hidden
            />
            {content.hero.eyebrow}
          </motion.div>
          <motion.h1
            className="font-display text-[clamp(1.65rem,5.2vw,3rem)] font-semibold leading-[1.08] tracking-[-0.045em] text-cream-100 text-pretty sm:text-[clamp(1.85rem,4vw,3.35rem)] lg:text-5xl xl:text-6xl"
            initial="hidden"
            animate="visible"
            variants={heroTitleStagger}
          >
            <motion.span variants={heroTitleLine} className="inline-block">
              {content.hero.titleBefore}
            </motion.span>{" "}
            <motion.span variants={heroTitleLine} className="aurora-text inline-block">
              {content.hero.titleHighlight}
            </motion.span>{" "}
            <motion.span variants={heroTitleLine} className="inline-block">
              {content.hero.titleAfter}
            </motion.span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.72,
              delay: 0.34,
              ease: EASE_PREMIUM,
            }}
            className="mt-6 max-w-xl text-pretty text-[15px] leading-relaxed text-cream-100/[0.68] sm:mt-7 sm:max-w-2xl sm:text-base sm:leading-7 md:text-[17px] md:leading-8"
          >
            {content.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.68,
              delay: 0.44,
              ease: EASE_PREMIUM,
            }}
            className="mt-8 flex w-full max-w-md flex-col gap-2.5 sm:max-w-none sm:flex-row sm:gap-3"
          >
            <MagneticButton href="#contact" className="min-h-11 px-5 py-2.5 text-[13px] sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm">
              {content.hero.primaryCta}
            </MagneticButton>
            <MagneticButton href="#services" variant="secondary" className="min-h-11 px-5 py-2.5 text-[13px] sm:min-h-12 sm:px-6 sm:py-3 sm:text-sm">
              {content.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
          {/* <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.65,
              delay: 0.32,
              ease: EASE_PREMIUM,
            }}
            className="mt-10 grid max-w-xl grid-cols-3 gap-2 sm:gap-3"
          >
            {content.hero.stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 backdrop-blur-xl sm:rounded-3xl sm:p-4"
              >
                <div className="font-display text-xl font-semibold tracking-[-0.04em] text-cream-100 sm:text-2xl">
                  {value}
                </div>
                <div className="mt-1 text-[11px] leading-snug text-cream-100/50 sm:text-xs sm:leading-5">
                  {label}
                </div>
              </div>
            ))}
          </motion.div> */}
          </div>
        </div>
        <div className="relative z-10 flex flex-col self-stretch">
          <div className="mb-8 hidden justify-end lg:flex">
            <motion.a
              href="#contact"
              animate={
                ambientOn ? { scale: [1, 1.06, 1] } : { scale: 1 }
              }
              transition={
                ambientOn
                  ? { duration: 2.6, repeat: Infinity, ease: EASE_BREATH }
                  : { duration: 0.35, ease: EASE_PREMIUM }
              }
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-ink-950 transition hover:brightness-110 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
            >
              {content.nav.cta}
              <ChevronRight className="size-3 transition-transform group-hover:translate-x-0.5 sm:size-3.5" />
            </motion.a>
          </div>
          <div className="flex flex-1 items-center">
            <HeroDashboard ambientOn={ambientOn} content={content} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function HeroBackground({
  parallaxY,
  ambientOn,
}: {
  parallaxY: MotionValue<number>;
  ambientOn: boolean;
}) {
  const [particleCount, setParticleCount] = useState(12);

  useEffect(() => {
    const mqNarrow = window.matchMedia("(max-width: 767px)");
    const mqMid = window.matchMedia("(max-width: 1024px)");
    const sync = () => {
      if (mqNarrow.matches) {
        setParticleCount(5);
      } else if (mqMid.matches) {
        setParticleCount(9);
      } else {
        setParticleCount(12);
      }
    };
    sync();
    mqNarrow.addEventListener("change", sync);
    mqMid.addEventListener("change", sync);
    return () => {
      mqNarrow.removeEventListener("change", sync);
      mqMid.removeEventListener("change", sync);
    };
  }, []);

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        size: 2 + (index % 3),
        delay: (index % 6) * 0.4,
        duration: 9 + (index % 4),
      })),
    [particleCount],
  );

  return (
    <motion.div style={{ y: parallaxY }} className="absolute inset-0">
      <div className="orbital-grid absolute inset-0 opacity-55" />
      <motion.div
        animate={ambientOn ? { scale: [1, 1.06, 1] } : { scale: 1 }}
        transition={
          ambientOn
            ? { duration: 22, repeat: Infinity, ease: EASE_BREATH }
            : { duration: 0.45, ease: EASE_PREMIUM }
        }
        className="absolute -left-32 top-10 size-[22rem] rounded-full bg-teal-700/30 blur-3xl"
      />
      <motion.div
        animate={
          ambientOn ? { x: [0, -28, 0], y: [0, 22, 0] } : { x: 0, y: 0 }
        }
        transition={
          ambientOn
            ? { duration: 22, repeat: Infinity, ease: EASE_BREATH }
            : { duration: 0.45, ease: EASE_PREMIUM }
        }
        className="absolute right-0 top-0 size-[19rem] rounded-full bg-mist-300/12 blur-3xl"
      />
      <div className="absolute left-1/2 top-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-glow/10" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-glow/60 shadow-[0_0_16px_rgba(124,231,247,0.75)]"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={
            ambientOn
              ? { y: [-10, 10, -10], opacity: [0.16, 0.58, 0.16] }
              : { y: 0, opacity: 0.35 }
          }
          transition={
            ambientOn
              ? {
                  duration: particle.duration,
                  delay: particle.delay,
                  repeat: Infinity,
                  ease: EASE_BREATH,
                }
              : { duration: 0.4, ease: EASE_PREMIUM }
          }
        />
      ))}
    </motion.div>
  );
}

function HeroDashboard({
  content,
  ambientOn,
}: {
  content: SiteContent;
  ambientOn: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 34, rotateX: 8, rotateY: -10 }}
      animate={{ opacity: 1, x: 0, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 0.82, delay: 0.22, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[31rem] perspective-[1200px] max-lg:mt-3"
    >
      <motion.div
        animate={ambientOn ? { y: [0, -8, 0] } : { y: 0 }}
        transition={
          ambientOn
            ? { duration: 7.5, repeat: Infinity, ease: EASE_BREATH }
            : { duration: 0.45, ease: EASE_PREMIUM }
        }
        className="glass-panel relative overflow-hidden rounded-[1.35rem] p-2.5 sm:rounded-[2rem] sm:p-4"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent" />
        <div className="rounded-[1.15rem] border border-white/10 bg-ink-950/70 p-2.5 sm:rounded-[1.65rem] sm:p-3.5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-cream-100/40 sm:text-xs sm:tracking-[0.24em]">
                {content.hero.dashboardEyebrow}
              </p>
              <h3 className="mt-0.5 font-display text-base font-semibold tracking-[-0.035em] text-cream-100 sm:text-lg">
                {content.hero.dashboardTitle}
              </h3>
            </div>
            <div className="rounded-full border border-cyan-glow/25 bg-cyan-glow/10 px-2.5 py-0.5 text-[11px] text-cyan-glow sm:px-3 sm:py-1 sm:text-xs">
              {content.hero.live}
            </div>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 sm:gap-2.5">
            {content.hero.dashboardStats.map(([label, value, helper]) => (
              <div
                key={label}
                className="rounded-xl border border-white/10 bg-white/[0.045] p-2.5 sm:rounded-2xl sm:p-3"
              >
                <p className="text-[11px] text-cream-100/45 sm:text-xs">{label}</p>
                <p className="mt-1.5 font-display text-lg font-semibold tracking-[-0.035em] text-cream-100 sm:mt-2 sm:text-xl">
                  {value}
                </p>
                <p className="mt-0.5 text-[11px] text-cyan-glow/70 sm:mt-1 sm:text-xs">{helper}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-[1.2fr_0.8fr] sm:mt-3.5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:rounded-3xl sm:p-3.5">
              <div className="mb-3 flex items-center justify-between sm:mb-3.5">
                <p className="text-xs font-medium text-cream-100/78 sm:text-sm">
                  {content.hero.acquisition}
                </p>
                <p className="text-[11px] text-cyan-glow sm:text-xs">
                  {content.hero.acquisitionDelta}
                </p>
              </div>
              <div className="mb-3 flex min-h-[6.25rem] items-end gap-1 overflow-x-auto pb-1 sm:min-h-28 sm:gap-1.5">
                {[42, 58, 46, 72, 64, 86, 78, 96].map((height, index) => (
                  <motion.div
                    key={`${height}-${index}`}
                    initial={{ height: 8 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.035,
                      ease: EASE_PREMIUM,
                    }}
                    className="flex-1 rounded-full bg-gradient-to-t from-teal-700 via-cyan-glow/65 to-cream-100 shadow-[0_0_18px_-8px_rgba(124,231,247,0.8)]"
                  />
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3 sm:rounded-3xl sm:p-3.5">
              <p className="text-xs font-medium text-cream-100/78 sm:text-sm">
                {content.hero.aiRouting}
              </p>
              <div className="relative mt-4 flex aspect-square max-h-[11rem] items-center justify-center rounded-full border border-white/10 bg-ink-900/60 sm:mt-4">
                <span className="absolute size-[7.25rem] rounded-full border border-cyan-glow/25 sm:size-28" />
                <span className="absolute size-[5.25rem] rounded-full border border-mist-300/25 sm:size-20" />
                <span className="needle-spin absolute h-[42%] w-px origin-bottom bg-gradient-to-t from-cyan-glow to-transparent" />
                <div className="relative flex size-14 items-center justify-center rounded-full bg-cream-100 text-ink-950 shadow-[0_0_35px_-10px_rgba(124,231,247,1)] sm:size-16">
                  <BrandLogo
                    className="relative size-[2.35rem] shrink-0 sm:size-11"
                    sizes="44px"
                    imgClassName="object-contain object-center p-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={ambientOn ? { y: [0, 12, 0] } : { y: 0 }}
        transition={
          ambientOn
            ? { duration: 8.5, repeat: Infinity, ease: EASE_BREATH }
            : { duration: 0.45, ease: EASE_PREMIUM }
        }
        className="glass-panel absolute -left-3 top-14 hidden w-[10.25rem] rounded-2xl p-3 shadow-premium sm:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-glow/75 sm:text-xs sm:tracking-[0.2em]">
          {content.hero.botFlow}
        </p>
        <p className="mt-1.5 text-xs text-cream-100/72 sm:mt-2 sm:text-sm">
          {content.hero.botFlowDescription}
        </p>
      </motion.div>
      <motion.div
        animate={ambientOn ? { y: [0, -12, 0] } : { y: 0 }}
        transition={
          ambientOn
            ? { duration: 9, repeat: Infinity, ease: EASE_BREATH }
            : { duration: 0.45, ease: EASE_PREMIUM }
        }
        className="glass-panel absolute -right-2 bottom-8 hidden w-44 rounded-2xl p-3 shadow-premium md:block"
      >
        <p className="text-[10px] uppercase tracking-[0.18em] text-cyan-glow/75 sm:text-xs sm:tracking-[0.2em]">
          {content.hero.launchReady}
        </p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-cream-100/75 sm:mt-2.5 sm:gap-2 sm:text-sm">
          <CheckCircle2 className="size-3.5 text-cyan-glow sm:size-4" />
          {content.hero.ciHealthy}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServicesSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="services"
      className="page-px relative overflow-hidden py-20 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-center px-6"
        aria-hidden
      >
        <div className="section-divider-fade w-full max-w-4xl" />
      </div>
      <div className="absolute inset-x-0 top-24 h-72 bg-gradient-to-r from-transparent via-teal-700/16 to-transparent blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle {...content.sections.services} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {content.services.map((service, index) => (
            <motion.article
              key={service.title}
              variants={cardReveal}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 520, damping: 34 }}
              className="glass-panel card-rim-hover group relative min-h-0 overflow-hidden rounded-[1.5rem] p-5 sm:min-h-[16rem] sm:rounded-[2rem] sm:p-6"
            >
              <div className="absolute -right-10 -top-10 size-28 rounded-full bg-cyan-glow/10 blur-2xl transition duration-500 group-hover:bg-cyan-glow/18" />
              <div className="relative flex h-full flex-col">
                <div className="flex shrink-0 items-center justify-between">
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-white/[0.06] text-cyan-glow ring-1 ring-white/10">
                    <service.icon className="size-6" />
                  </div>
                  <span className="font-display text-sm text-cream-100/24">
                    0{index + 1}
                  </span>
                </div>
                <h3
                  title={service.title}
                  className="mt-12 line-clamp-1 font-display text-xl font-semibold tracking-[-0.04em] text-cream-100 sm:mt-16 sm:text-2xl"
                >
                  {service.title}
                </h3>
                <p className="mt-3 min-h-0 flex-1 leading-7 text-cream-100/58">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechnologiesSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="technologies"
      className="page-px relative overflow-x-hidden py-20 sm:py-32"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-gradient-to-r from-transparent via-cyan-glow/[0.06] to-transparent blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle {...content.sections.technologies} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-10 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3"
        >
          {content.techGroups.map((group, index) => (
            <motion.article
              key={group.label}
              variants={cardReveal}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 440, damping: 30 }}
              className="glass-panel card-rim-hover group relative flex min-h-0 flex-col overflow-hidden rounded-[1.5rem] p-4 sm:min-h-0 sm:rounded-[1.75rem] sm:p-5 xl:p-6"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full bg-cyan-glow/10 blur-2xl transition duration-500 group-hover:bg-cyan-glow/16" />
              <div className="relative flex items-start justify-between gap-3 border-b border-white/[0.08] pb-3 sm:pb-4">
                <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-glow/18 to-white/[0.04] text-cyan-glow ring-1 ring-white/10 sm:size-11">
                    <group.icon className="size-[1.05rem] sm:size-5" />
                  </div>
                  <h3 className="font-display text-base font-semibold leading-snug tracking-[-0.03em] text-cream-100 sm:text-lg">
                    {group.label}
                  </h3>
                </div>
                <span className="shrink-0 font-display text-[10px] tabular-nums text-cream-100/22 sm:text-[11px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="relative mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/12 bg-white/[0.065] px-2 py-1 text-[11px] font-medium leading-snug text-cream-100/82 transition duration-300 hover:-translate-y-px hover:border-cyan-glow/30 hover:bg-cyan-glow/[0.08] hover:text-cream-100 sm:px-2.5 sm:py-1.5 sm:text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProcessSection({ content }: { content: SiteContent }) {
  return (
    <section id="process" className="page-px relative py-20 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionTitle {...content.sections.process} />
        <div className="relative">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-cyan-glow/45 to-transparent md:left-1/2 md:block" />
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="space-y-5"
          >
            {content.processSteps.map((step, index) => {
              const stepLabel = (
                <p className="text-xs uppercase tracking-[0.24em] text-cyan-glow/90 sm:text-sm md:text-base">
                  {content.processStepWord} {index + 1}
                </p>
              );
              const stepLabelCell = (
                <div
                  className={`flex items-center py-1 md:min-h-[7rem] md:py-0 ${
                    index % 2 === 0
                      ? "order-1 justify-start md:order-none md:justify-start md:pl-4 lg:pl-10"
                      : "order-1 justify-end text-right md:order-none md:justify-end md:pr-4 lg:pr-10"
                  }`}
                >
                  {stepLabel}
                </div>
              );
              const cardCell = (
                <div className="glass-panel card-rim-hover order-2 rounded-[1.35rem] p-5 sm:rounded-[2rem] sm:p-6 md:order-none">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="relative flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow ring-1 ring-cyan-glow/20">
                      <span className="pulse-ring-loop absolute size-full rounded-2xl bg-cyan-glow/20" />
                      <step.icon className="relative size-5" />
                    </div>
                    <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-cream-100">
                      {step.title}
                    </h3>
                  </div>
                  <p className="leading-8 text-cream-100/58">
                    {step.description}
                  </p>
                </div>
              );

              return (
                <motion.div
                  key={step.title}
                  variants={
                    index % 2 === 0 ? processLaneFromLeft : processLaneFromRight
                  }
                  className="relative grid gap-4 md:grid-cols-2 md:items-center md:gap-5"
                >
                  {index % 2 === 0 ? (
                    <>
                      {cardCell}
                      {stepLabelCell}
                    </>
                  ) : (
                    <>
                      {stepLabelCell}
                      {cardCell}
                    </>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* Results / showcase section — commented out (restore with `<ShowcaseSection content={content} />` above)
function ShowcaseSection({ content }: { content: SiteContent }) {
  return (
    <section className="page-px relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-x-0 top-1/2 h-80 -translate-y-1/2 bg-cyan-glow/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle {...content.sections.showcase} />
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="glass-panel relative overflow-hidden rounded-[1.5rem] p-5 sm:rounded-[2.5rem] sm:p-6"
          >
            <div className="absolute -right-16 -top-16 size-44 rounded-full bg-cyan-glow/12 blur-3xl" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-glow/75">
                {content.showcasePanel.eyebrow}
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-cream-100 sm:text-3xl">
                {content.showcasePanel.title}
              </h3>
              <p className="mt-4 leading-8 text-cream-100/58">
                {content.showcasePanel.description}
              </p>
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-ink-950/62 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-cream-100/70">
                    {content.showcasePanel.health}
                  </p>
                  <span className="rounded-full bg-cyan-glow/10 px-3 py-1 text-xs text-cyan-glow">
                    {content.showcasePanel.optimized}
                  </span>
                </div>
                <div className="grid gap-3">
                  {content.showcasePanel.items.map((item, index) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex size-7 items-center justify-center rounded-full bg-white/[0.06] text-xs text-cyan-glow">
                        {index + 1}
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${78 + index * 4}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.8,
                            delay: index * 0.05,
                            ease: EASE_PREMIUM,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-teal-700 via-cyan-glow to-cream-100"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {content.showcase.map((showcase, index) => (
              <motion.article
                key={showcase.title}
                variants={cardReveal}
                className={`glass-panel group rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6 ${index === 4 ? "sm:col-span-2" : ""}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow">
                    <showcase.icon className="size-5" />
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-semibold tracking-[-0.04em] text-cream-100">
                      {showcase.metric}
                    </div>
                    <div className="text-xs text-cream-100/40">
                      {showcase.metricLabel}
                    </div>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-cream-100">
                  {showcase.title}
                </h3>
                <p className="mt-3 leading-7 text-cream-100/58">
                  {showcase.description}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
*/

function ContactSection({ content }: { content: SiteContent }) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dropdownReset, setDropdownReset] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Record<string, string> = {};
    const email = String(data.get("email") ?? "");

    if (!data.get("fullName")) {
      nextErrors.fullName = content.contact.validation.fullName;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = content.contact.validation.email;
    }
    if (!data.get("projectDescription")) {
      nextErrors.projectDescription =
        content.contact.validation.projectDescription;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      setStatus("success");
      form.reset();
      setDropdownReset((value) => value + 1);
      window.setTimeout(() => setStatus("idle"), 5200);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="page-px relative py-20 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(124,231,247,0.12),transparent_28rem),radial-gradient(circle_at_82%_72%,rgba(159,183,182,0.1),transparent_30rem)]" />
      </div>
      <div className="relative z-[1] mx-auto max-w-7xl">
        <SectionTitle {...content.sections.contact} />
        <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <motion.aside
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-5"
          >
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-glow/70">
                {content.contact.trustEyebrow}
              </p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-cream-100">
                {content.contact.trustText}
              </p>
            </div>
            {content.contact.cards.map((card) => (
              <a
                key={card.title}
                href={card.href}
                className="glass-panel group flex min-h-[4.25rem] items-center gap-4 rounded-[1.35rem] p-4 transition hover:-translate-y-1 hover:border-cyan-glow/35 sm:rounded-[2rem] sm:p-5"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow">
                  <card.icon className="size-5" />
                </div>
                <div>
                  <p className="text-sm text-cream-100/42">{card.title}</p>
                  <p className="mt-1 font-medium text-cream-100">
                    {card.value}
                  </p>
                </div>
              </a>
            ))}
          </motion.aside>
          <motion.form
            onSubmit={handleSubmit}
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.16 }}
            className="glass-panel relative overflow-visible rounded-[1.5rem] p-5 sm:rounded-[2.5rem] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
              <div className="absolute -right-24 -top-24 size-52 rounded-full bg-cyan-glow/12 blur-3xl" />
            </div>
            <input type="hidden" name="locale" value={content.locale} />
            <div className="relative z-[1] grid gap-5 md:grid-cols-2">
              <FloatingField
                name="fullName"
                label={content.contact.fields.fullName}
                error={errors.fullName}
              />
              <FloatingField
                name="companyName"
                label={content.contact.fields.companyName}
              />
              <FloatingField
                name="email"
                label={content.contact.fields.email}
                type="email"
                error={errors.email}
              />
              <FloatingField
                name="phoneTelegram"
                label={content.contact.fields.phoneTelegram}
              />
              <FormDropdown
                key={`servicesInterested-${dropdownReset}`}
                name="servicesInterested"
                label={content.contact.fields.servicesInterested}
                options={content.services.map((service) => service.title)}
                placeholder={content.contact.servicePlaceholder}
              />
              <FormDropdown
                key={`estimatedBudget-${dropdownReset}`}
                name="estimatedBudget"
                label={content.contact.fields.estimatedBudget}
                options={content.contact.budgetOptions}
                placeholder={content.contact.selectPlaceholder}
              />
              <FormDropdown
                key={`timeline-${dropdownReset}`}
                name="timeline"
                label={content.contact.fields.timeline}
                options={content.contact.timelineOptions}
                placeholder={content.contact.selectPlaceholder}
              />
              <div className="hidden md:block" />
              <FloatingField
                name="projectDescription"
                label={content.contact.fields.projectDescription}
                textarea
                error={errors.projectDescription}
                className="md:col-span-2"
              />
            </div>
            <div className="relative z-[1] mt-7 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex min-h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-cream-100 px-7 py-4 text-sm font-semibold text-ink-950 shadow-[0_0_42px_-18px_rgba(124,231,247,1)] transition hover:bg-white disabled:cursor-wait disabled:opacity-70 sm:min-h-0 sm:w-auto"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">
                  {status === "sending"
                    ? content.contact.sending
                    : content.contact.primaryButton}
                </span>
                <Send className="relative size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="mailto:adlog1agency@gmail.com?subject=Schedule%20a%20Call"
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-7 py-4 text-sm font-semibold text-cream-100 transition hover:border-cyan-glow/35 hover:bg-white/[0.09] sm:min-h-0 sm:w-auto"
              >
                {content.contact.secondaryButton}
                <ArrowRight className="size-4" />
              </a>
            </div>
            {status === "success" || status === "error" ? (
              <motion.div
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className={`relative z-[1] mt-5 flex items-center gap-3 rounded-2xl border p-4 text-sm ${
                  status === "success"
                    ? "border-cyan-glow/25 bg-cyan-glow/10 text-cyan-glow"
                    : "border-red-300/30 bg-red-400/10 text-red-200"
                }`}
              >
                <CheckCircle2 className="size-5" />
                {status === "success"
                  ? content.contact.success
                  : content.contact.error}
              </motion.div>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="faq"
      className="page-px relative border-t border-white/[0.06] py-20 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle {...content.sections.faq} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
          className="mx-auto max-w-3xl space-y-3"
        >
          {content.faq.map((item) => (
            <motion.div key={item.question} variants={cardReveal}>
              <details className="group glass-panel rounded-[1.35rem] px-5 py-1 sm:rounded-[1.75rem] sm:px-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 pr-1 text-left font-display text-base font-semibold tracking-[-0.02em] text-cream-100 sm:text-lg [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronRight
                    aria-hidden
                    className="size-5 shrink-0 text-cyan-glow/70 transition-transform duration-300 group-open:rotate-90"
                  />
                </summary>
                <p className="border-t border-white/[0.08] pb-4 pt-3 text-[15px] leading-7 text-cream-100/58 sm:text-base">
                  {item.answer}
                </p>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PaymentSection({ content }: { content: SiteContent }) {
  return (
    <section
      id="payment"
      className="page-px relative border-t border-white/[0.06] py-20 sm:py-32"
    >
      <div className="relative mx-auto max-w-7xl">
        <SectionTitle {...content.sections.payment} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto max-w-3xl space-y-4"
        >
          {content.payment.milestones.map((milestone, index) => (
            <motion.div
              key={milestone.title}
              variants={cardReveal}
              className="glass-panel card-rim-hover flex gap-4 rounded-[1.35rem] p-5 sm:gap-5 sm:rounded-[1.75rem] sm:p-6"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-cyan-glow/10 font-display text-sm font-semibold text-cyan-glow ring-1 ring-cyan-glow/25">
                {index + 1}
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold tracking-[-0.03em] text-cream-100 sm:text-xl">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-cream-100/58 sm:text-base">
                  {milestone.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.p
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-7 text-cream-100/55 sm:text-lg"
        >
          {content.payment.footer}
        </motion.p>
      </div>
    </section>
  );
}

type FloatingFieldProps = {
  name: string;
  label: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  className?: string;
};

function FloatingField({
  name,
  label,
  type = "text",
  textarea = false,
  error,
  className = "",
}: FloatingFieldProps) {
  const inputClass = `field-input peer px-4 pb-3 pt-5 text-sm ${error ? "border-red-400/60" : ""}`;

  return (
    <div className={`field ${className}`}>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder=" "
          rows={6}
          className={`${inputClass} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder=" "
          className={inputClass}
        />
      )}
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

function FinalCtaSection({ content }: { content: SiteContent }) {
  const tabVisible = useTabVisible();
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.22 });
  const ambientOn = tabVisible && inView;

  return (
    <section
      ref={sectionRef}
      className="page-px relative overflow-hidden py-20 sm:py-32"
    >
      <div className="absolute inset-0">
        <motion.div
          animate={
            ambientOn
              ? { scale: [1, 1.06, 1], opacity: [0.18, 0.38, 0.18] }
              : { scale: 1, opacity: 0.22 }
          }
          transition={
            ambientOn
              ? { duration: 11, repeat: Infinity, ease: EASE_BREATH }
              : { duration: 0.5, ease: EASE_PREMIUM }
          }
          className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/12 blur-3xl"
        />
        <div className="orbital-grid absolute inset-0 opacity-40" />
      </div>
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        className="glass-panel card-rim-hover relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] px-5 py-12 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] sm:rounded-[3rem] sm:px-12 sm:py-20"
      >
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent" />
        <div className="relative mx-auto mb-6 flex size-[4.5rem] items-center justify-center rounded-2xl bg-cyan-glow/10 ring-1 ring-cyan-glow/20">
          <BrandLogo
            className="relative size-[3.25rem] shrink-0"
            sizes="52px"
            imgClassName="object-contain object-center p-1.5"
          />
        </div>
        <h2 className="font-display text-[clamp(1.65rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-cream-100 sm:text-6xl lg:text-7xl">
          {content.finalCta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-cream-100/62 sm:text-lg sm:leading-8">
          {content.finalCta.subtitle}
        </p>
        <div className="mt-9 flex justify-center px-1">
          <MagneticButton href="#contact" className="px-8 py-4">
            {content.finalCta.button}
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}

function SiteFooter({ content }: { content: SiteContent }) {
  const year = new Date().getFullYear();

  return (
    <footer className="page-px footer-safe-pb border-t border-white/[0.08] pt-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-12">
        <div className="max-w-md">
          <BrandLogo
            className="relative mb-4 inline-block size-14 sm:size-16"
            sizes="(max-width: 640px) 56px, 64px"
          />
          <p className="font-display text-base font-semibold text-cream-100">
            AdLog
          </p>
          <p className="mt-3 text-sm leading-relaxed text-cream-100/45">
            © {year} AdLog. {content.footer.rights}
          </p>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-cream-100/50">
          {content.footer.note}
        </p>
      </div>
    </footer>
  );
}
