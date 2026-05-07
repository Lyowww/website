"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

type SectionTitleProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px 0px -72px 0px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto mb-10 max-w-3xl px-1 text-center sm:mb-14 md:mb-16 md:px-0"
    >
      <div className="mb-3 inline-flex max-w-[calc(100vw-2rem)] items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-cyan-glow/85 sm:mb-4 sm:px-4 sm:text-xs sm:tracking-[0.28em]">
        <Sparkles className="size-3 shrink-0 sm:size-3.5" />
        <span className="truncate">{eyebrow}</span>
      </div>
      <h2 className="font-display text-[clamp(1.55rem,4.8vw,3.65rem)] font-semibold tracking-[-0.038em] text-cream-100 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-cream-100/62 sm:mt-5 sm:text-lg sm:leading-8">{description}</p>
    </motion.div>
  );
}
