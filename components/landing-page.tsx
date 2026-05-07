"use client";

import { motion, useMotionValue, useSpring, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Menu,
  Send,
  Sparkles,
  X
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { FormDropdown } from "@/components/form-dropdown";
import { MagneticButton } from "@/components/magnetic-button";
import { SectionTitle } from "@/components/section-title";
import { SmoothScroll } from "@/components/smooth-scroll";
import { TiltCard } from "@/components/tilt-card";
import { contentByLocale, locales, type Locale, type SiteContent } from "@/lib/site-content";

const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055
    }
  }
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 22, scale: 0.99 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
  }
};

type LandingPageProps = {
  locale: Locale;
};

export function LandingPage({ locale }: LandingPageProps) {
  const content = contentByLocale[locale];

  return (
    <SmoothScroll>
      <MouseLight />
      <div className="noise-overlay" />
      <main className="relative min-h-screen overflow-hidden bg-ink-950 text-cream-100" lang={locale}>
        <Navigation content={content} />
        <HeroSection content={content} />
        <TrustSection content={content} />
        <ServicesSection content={content} />
        <TechnologiesSection content={content} />
        <ProcessSection content={content} />
        <ShowcaseSection content={content} />
        <ContactSection content={content} />
        <FinalCtaSection content={content} />
        <SiteFooter content={content} />
      </main>
    </SmoothScroll>
  );
}

function MouseLight() {
  const x = useSpring(useMotionValue(-500), { stiffness: 65, damping: 24, mass: 0.45 });
  const y = useSpring(useMotionValue(-500), { stiffness: 65, damping: 24, mass: 0.45 });
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

function Navigation({ content }: { content: SiteContent }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    [content.nav.benefits, "benefits"],
    [content.nav.services, "services"],
    [content.nav.process, "process"],
    [content.nav.contact, "contact"]
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
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="header-safe-pt page-px fixed left-0 right-0 top-0 z-40"
      >
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-white/10 bg-ink-950/75 px-3 py-2 shadow-2xl shadow-black/20 backdrop-blur-xl sm:gap-3 sm:px-5 sm:py-3">
          <a
            href={`/${content.locale}#top`}
            className="relative z-10 flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label="Ecosystem Studio home"
          >
            <span className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-cream-100 text-ink-950 sm:size-9">
              <span className="absolute inset-0 rounded-full bg-cyan-glow/25 blur-md" />
              <Sparkles className="relative size-3.5 sm:size-4" />
            </span>
            <span className="font-display truncate text-xs font-bold tracking-[-0.02em] sm:text-base">
              Ecosystem Studio
            </span>
          </a>
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
              {navItems.map(([item, target]) => (
                <a
                  key={target}
                  href={`#${target}`}
                  className="rounded-full px-4 py-2 text-sm text-cream-100/62 transition hover:bg-white/[0.06] hover:text-cream-100"
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
                  {locale}
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
            <a
              href="#contact"
              className="group inline-flex shrink-0 items-center gap-1.5 rounded-full bg-cream-100 px-3 py-2 text-xs font-semibold text-ink-950 transition hover:bg-white sm:gap-2 sm:px-4 sm:text-sm"
            >
              {content.nav.start}
              <ChevronRight className="size-3.5 transition-transform group-hover:translate-x-0.5 sm:size-4" />
            </a>
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
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="page-px footer-safe-pb absolute inset-y-0 right-0 flex w-[min(100%,21rem)] flex-col border-l border-white/10 bg-ink-900/97 shadow-2xl backdrop-blur-xl"
          >
            <div className="header-safe-pt flex items-center justify-between gap-3 border-b border-white/10 py-4">
              <span className="font-display text-sm font-semibold text-cream-100">{content.nav.menu}</span>
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
                  className="rounded-xl px-4 py-3.5 text-base font-medium text-cream-100/85 transition hover:bg-white/[0.06] hover:text-cream-100 active:bg-white/[0.08]"
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
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.22], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.35]);

  return (
    <section id="top" className="page-px relative min-h-screen overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-36 lg:pb-28 lg:pt-40">
      <HeroBackground />
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14"
      >
        <div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-glow/90 sm:tracking-[0.28em]"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-cyan-glow opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-glow" />
            </span>
            {content.hero.eyebrow}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.82, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2rem,9vw,4.35rem)] font-semibold leading-[1.02] tracking-[-0.055em] text-cream-100 sm:text-7xl xl:text-[6.45rem]"
          >
            {content.hero.titleBefore} <span className="aurora-text">{content.hero.titleHighlight}</span>{" "}
            {content.hero.titleAfter}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-2xl text-base leading-7 text-cream-100/66 sm:text-lg sm:leading-8 md:text-xl"
          >
            {content.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row"
          >
            <MagneticButton href="#contact">{content.hero.primaryCta}</MagneticButton>
            <MagneticButton href="#services" variant="secondary">
              {content.hero.secondaryCta}
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
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
                <div className="mt-1 text-[11px] leading-snug text-cream-100/50 sm:text-xs sm:leading-5">{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <HeroDashboard content={content} />
      </motion.div>
    </section>
  );
}

function HeroBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => ({
        id: index,
        left: `${(index * 37) % 100}%`,
        top: `${(index * 53) % 100}%`,
        size: 2 + (index % 3),
        delay: (index % 6) * 0.4,
        duration: 9 + (index % 4)
      })),
    []
  );

  return (
    <div className="absolute inset-0">
      <div className="orbital-grid absolute inset-0 opacity-55" />
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-40 top-10 size-[28rem] rounded-full bg-teal-700/30 blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -36, 0], y: [0, 28, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-0 top-0 size-[24rem] rounded-full bg-mist-300/12 blur-3xl"
      />
      <div className="absolute left-1/2 top-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-glow/10" />
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-cyan-glow/60 shadow-[0_0_16px_rgba(124,231,247,0.75)]"
          style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
          animate={{ y: [-10, 10, -10], opacity: [0.16, 0.58, 0.16] }}
          transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function HeroDashboard({ content }: { content: SiteContent }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 34, rotateX: 8, rotateY: -10 }}
      animate={{ opacity: 1, x: 0, rotateX: 0, rotateY: 0 }}
      transition={{ duration: 0.78, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[37rem] perspective-[1200px] max-lg:mt-4"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel relative overflow-hidden rounded-[1.65rem] p-3 sm:rounded-[2.5rem] sm:p-5"
      >
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent" />
        <div className="rounded-[1.35rem] border border-white/10 bg-ink-950/70 p-3 sm:rounded-[2rem] sm:p-4">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-cream-100/40">{content.hero.dashboardEyebrow}</p>
              <h3 className="mt-1 font-display text-xl font-semibold tracking-[-0.04em] text-cream-100">
                {content.hero.dashboardTitle}
              </h3>
            </div>
            <div className="rounded-full border border-cyan-glow/25 bg-cyan-glow/10 px-3 py-1 text-xs text-cyan-glow">
              {content.hero.live}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {content.hero.dashboardStats.map(([label, value, helper]) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                <p className="text-xs text-cream-100/45">{label}</p>
                <p className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em] text-cream-100">{value}</p>
                <p className="mt-1 text-xs text-cyan-glow/70">{helper}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm font-medium text-cream-100/78">{content.hero.acquisition}</p>
                <p className="text-xs text-cyan-glow">+22.8%</p>
              </div>
              <div className="mb-4 flex min-h-28 items-end gap-1.5 overflow-x-auto pb-1 sm:h-32 sm:gap-2">
                {[42, 58, 46, 72, 64, 86, 78, 96].map((height, index) => (
                  <motion.div
                    key={`${height}-${index}`}
                    initial={{ height: 8 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 rounded-full bg-gradient-to-t from-teal-700 via-cyan-glow/65 to-cream-100 shadow-[0_0_18px_-8px_rgba(124,231,247,0.8)]"
                  />
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="text-sm font-medium text-cream-100/78">{content.hero.aiRouting}</p>
              <div className="relative mt-5 flex aspect-square items-center justify-center rounded-full border border-white/10 bg-ink-900/60">
                <span className="absolute size-28 rounded-full border border-cyan-glow/25" />
                <span className="absolute size-20 rounded-full border border-mist-300/25" />
                <span className="absolute h-[42%] w-px origin-bottom bg-gradient-to-t from-cyan-glow to-transparent [animation:spin_12s_linear_infinite]" />
                <div className="relative flex size-16 items-center justify-center rounded-full bg-cream-100 text-ink-950 shadow-[0_0_35px_-10px_rgba(124,231,247,1)]">
                  <Sparkles className="size-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel absolute -left-4 top-16 hidden w-44 rounded-3xl p-4 shadow-premium sm:block"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-glow/75">{content.hero.botFlow}</p>
        <p className="mt-2 text-sm text-cream-100/72">{content.hero.botFlowDescription}</p>
      </motion.div>
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
        className="glass-panel absolute -right-3 bottom-10 hidden w-48 rounded-3xl p-4 shadow-premium md:block"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-glow/75">{content.hero.launchReady}</p>
        <div className="mt-3 flex items-center gap-2 text-sm text-cream-100/75">
          <CheckCircle2 className="size-4 text-cyan-glow" />
          {content.hero.ciHealthy}
        </div>
      </motion.div>
    </motion.div>
  );
}

function TrustSection({ content }: { content: SiteContent }) {
  return (
    <section id="benefits" className="page-px relative py-20 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle {...content.sections.benefits} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {content.benefits.map((benefit) => (
            <TiltCard key={benefit.title} variants={cardReveal} className="group rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6 md:p-7">
              <div className="mb-8 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow ring-1 ring-cyan-glow/20 transition group-hover:scale-105 group-hover:bg-cyan-glow/15">
                  <benefit.icon className="size-5" />
                </div>
                <ArrowRight className="size-5 text-cream-100/20 transition group-hover:translate-x-1 group-hover:text-cyan-glow" />
              </div>
              <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-cream-100">{benefit.title}</h3>
              <p className="mt-3 leading-7 text-cream-100/58">{benefit.description}</p>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection({ content }: { content: SiteContent }) {
  return (
    <section id="services" className="page-px relative overflow-hidden py-20 sm:py-32">
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
              className="glass-panel gradient-border group relative min-h-0 overflow-hidden rounded-[1.5rem] p-5 sm:min-h-[16rem] sm:rounded-[2rem] sm:p-6"
            >
              <div className="absolute -right-10 -top-10 size-28 rounded-full bg-cyan-glow/10 blur-2xl transition duration-500 group-hover:bg-cyan-glow/18" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex size-13 items-center justify-center rounded-2xl bg-white/[0.06] text-cyan-glow ring-1 ring-white/10">
                    <service.icon className="size-6" />
                  </div>
                  <span className="font-display text-sm text-cream-100/24">0{index + 1}</span>
                </div>
                <div className="mt-auto pt-12 sm:pt-16">
                  <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-cream-100 sm:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 leading-7 text-cream-100/58">{service.description}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function TechnologiesSection({ content }: { content: SiteContent }) {
  const repeatedGroups = [...content.techGroups, ...content.techGroups];

  return (
    <section className="page-px relative overflow-hidden py-20 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionTitle {...content.sections.technologies} />
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl gap-3 md:hidden">
        {content.techGroups.map((group) => (
          <div key={group.label} className="glass-panel rounded-[1.35rem] p-4 sm:rounded-[2rem] sm:p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow">
                <group.icon className="size-5" />
              </div>
              <h3 className="font-display text-lg font-semibold tracking-[-0.03em] sm:text-xl">{group.label}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-xs text-cream-100/75 sm:text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto hidden max-w-[100rem] overflow-hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-950 to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-950 to-transparent sm:w-32" />
        <div className="marquee-track flex w-max gap-5">
          {repeatedGroups.map((group, index) => (
            <div
              key={`${group.label}-${index}`}
              className="glass-panel group min-w-[18rem] rounded-[2rem] p-5 transition hover:-translate-y-1 hover:border-cyan-glow/35"
            >
              <div className="mb-5 flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow">
                  <group.icon className="size-5" />
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-2 text-sm text-cream-100/68 transition group-hover:border-cyan-glow/20 group-hover:text-cream-100"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
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
            {content.processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={cardReveal}
                className={`relative grid gap-5 md:grid-cols-2 ${index % 2 === 0 ? "" : "md:[&>div:first-child]:col-start-2"}`}
              >
                <div className="glass-panel gradient-border rounded-[1.35rem] p-5 sm:rounded-[2rem] sm:p-6">
                  <div className="mb-5 flex items-center gap-4">
                    <div className="relative flex size-12 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow ring-1 ring-cyan-glow/20">
                      <span className="absolute size-full rounded-2xl bg-cyan-glow/20 [animation:pulse-ring_3.2s_ease-out_infinite]" />
                      <step.icon className="relative size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cream-100/36">
                        {content.processStepWord} {index + 1}
                      </p>
                      <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-cream-100">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="leading-8 text-cream-100/58">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

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
              <p className="text-xs uppercase tracking-[0.24em] text-cyan-glow/75">{content.showcasePanel.eyebrow}</p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-0.05em] text-cream-100 sm:text-3xl">
                {content.showcasePanel.title}
              </h3>
              <p className="mt-4 leading-8 text-cream-100/58">{content.showcasePanel.description}</p>
              <div className="mt-8 rounded-[2rem] border border-white/10 bg-ink-950/62 p-4">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-cream-100/70">{content.showcasePanel.health}</p>
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
                          transition={{ duration: 0.8, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
                className={`glass-panel gradient-border group rounded-[1.5rem] p-5 sm:rounded-[2rem] sm:p-6 ${index === 4 ? "sm:col-span-2" : ""}`}
              >
                <div className="mb-7 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow">
                    <showcase.icon className="size-5" />
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-semibold tracking-[-0.04em] text-cream-100">
                      {showcase.metric}
                    </div>
                    <div className="text-xs text-cream-100/40">{showcase.metricLabel}</div>
                  </div>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-[-0.03em] text-cream-100">
                  {showcase.title}
                </h3>
                <p className="mt-3 leading-7 text-cream-100/58">{showcase.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactSection({ content }: { content: SiteContent }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
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
      nextErrors.projectDescription = content.contact.validation.projectDescription;
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
        body: JSON.stringify(Object.fromEntries(data.entries()))
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
                  <p className="mt-1 font-medium text-cream-100">{card.value}</p>
                </div>
              </a>
            ))}
            <div className="glass-panel rounded-[2rem] p-6">
              <p className="text-sm uppercase tracking-[0.24em] text-cyan-glow/70">{content.contact.trustEyebrow}</p>
              <p className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-cream-100">{content.contact.trustText}</p>
            </div>
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
              <FloatingField name="fullName" label={content.contact.fields.fullName} error={errors.fullName} />
              <FloatingField name="companyName" label={content.contact.fields.companyName} />
              <FloatingField name="email" label={content.contact.fields.email} type="email" error={errors.email} />
              <FloatingField name="phoneTelegram" label={content.contact.fields.phoneTelegram} />
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
                  {status === "sending" ? content.contact.sending : content.contact.primaryButton}
                </span>
                <Send className="relative size-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="mailto:hello@ecosystem.studio?subject=Schedule%20a%20Call"
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
                {status === "success" ? content.contact.success : content.contact.error}
              </motion.div>
            ) : null}
          </motion.form>
        </div>
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

function FloatingField({ name, label, type = "text", textarea = false, error, className = "" }: FloatingFieldProps) {
  const inputClass = `field-input peer px-4 pb-3 pt-5 text-sm ${error ? "border-red-400/60" : ""}`;

  return (
    <div className={`field ${className}`}>
      {textarea ? (
        <textarea id={name} name={name} placeholder=" " rows={6} className={`${inputClass} resize-none`} />
      ) : (
        <input id={name} name={name} type={type} placeholder=" " className={inputClass} />
      )}
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      {error ? <p className="mt-2 text-xs text-red-300">{error}</p> : null}
    </div>
  );
}

function FinalCtaSection({ content }: { content: SiteContent }) {
  return (
    <section className="page-px relative overflow-hidden py-20 sm:py-32">
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.4, 0.22] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-1/2 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow/12 blur-3xl"
        />
        <div className="orbital-grid absolute inset-0 opacity-40" />
      </div>
      <motion.div
        variants={sectionReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.22 }}
        className="glass-panel relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] px-5 py-12 text-center sm:rounded-[3rem] sm:px-12 sm:py-20"
      >
        <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-glow/70 to-transparent" />
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-2xl bg-cyan-glow/10 text-cyan-glow ring-1 ring-cyan-glow/20">
          <Sparkles className="size-6" />
        </div>
        <h2 className="font-display text-[clamp(1.65rem,6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.05em] text-cream-100 sm:text-6xl lg:text-7xl">
          {content.finalCta.heading}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-cream-100/62 sm:text-lg sm:leading-8">{content.finalCta.subtitle}</p>
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
          <p className="font-display text-base font-semibold text-cream-100">Ecosystem Studio</p>
          <p className="mt-3 text-sm leading-relaxed text-cream-100/45">
            © {year} Ecosystem Studio. {content.footer.rights}
          </p>
        </div>
        <p className="max-w-lg text-sm leading-relaxed text-cream-100/50">{content.footer.note}</p>
      </div>
    </footer>
  );
}
