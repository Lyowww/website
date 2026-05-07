"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { type ReactNode, useEffect, useRef } from "react";

type MagneticButtonProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  ...props
}: MagneticButtonProps) {
  const canMagnetize = useRef(false);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.35 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.35 });

  useEffect(() => {
    canMagnetize.current =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(min-width: 768px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const variantClass =
    variant === "primary"
      ? "bg-cream-100 text-ink-950 shadow-[0_0_42px_-16px_rgba(124,231,247,0.95)] hover:bg-white"
      : "border border-white/15 bg-white/[0.06] text-cream-100 hover:border-cyan-glow/45 hover:bg-white/[0.09]";

  return (
    <motion.a
      style={{ x, y }}
      onMouseMove={(event) => {
        if (!canMagnetize.current) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.16);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.16);
      }}
      onMouseLeave={() => {
        if (!canMagnetize.current) {
          return;
        }

        x.set(0);
        y.set(0);
      }}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex w-full min-h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition duration-300 sm:w-auto sm:min-h-0 sm:px-7 ${variantClass} ${className}`}
      {...props}
    >
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-60 transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative">{children}</span>
      <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </motion.a>
  );
}
