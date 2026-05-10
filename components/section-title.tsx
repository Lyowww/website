"use client";

import { motion, type Variants } from "framer-motion";
import { BrandLogo } from "@/components/brand-logo";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wrap: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE },
  },
};

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <motion.div
      variants={wrap}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-72px 0px -72px 0px" }}
      className="mx-auto mb-10 max-w-3xl px-1 text-center sm:mb-14 md:mb-16 md:px-0"
    >
      {eyebrow ? (
        <motion.div
          variants={rise}
          className="mb-3 inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-glow/90 shadow-[0_0_36px_-14px_rgba(124,231,247,0.35)] backdrop-blur-md sm:mb-4 sm:px-4 sm:text-xs sm:tracking-[0.28em]"
        >
          <BrandLogo
            className="relative inline-block size-3 shrink-0 sm:size-3.5"
            sizes="14px"
            imgClassName="object-contain object-center"
          />
          <span className="truncate">{eyebrow}</span>
        </motion.div>
      ) : null}
      <motion.h2
        variants={rise}
        className="font-display relative mx-auto w-fit text-[clamp(1.55rem,4.8vw,3.65rem)] font-semibold tracking-[-0.038em] text-cream-100 text-pretty after:pointer-events-none after:absolute after:inset-x-[10%] after:-bottom-1 after:h-px after:bg-gradient-to-r after:from-transparent after:via-cyan-glow/45 after:to-lime-glow/30 sm:text-5xl lg:text-6xl"
      >
        {title}
      </motion.h2>
      {description ? (
        <motion.p
          variants={rise}
          className="mx-auto mt-4 max-w-2xl text-pretty text-[15px] leading-7 text-cream-100/[0.62] sm:mt-5 sm:text-lg sm:leading-8"
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  );
}
