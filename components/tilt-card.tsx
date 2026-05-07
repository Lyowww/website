"use client";

import { motion, useMotionTemplate, useMotionValue, type HTMLMotionProps } from "framer-motion";
import { type ReactNode, useEffect, useRef } from "react";

type TiltCardProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  intensity?: number;
};

export function TiltCard({ children, intensity = 10, className = "", ...props }: TiltCardProps) {
  const canTilt = useRef(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const background = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(124, 231, 247, 0.16), transparent 34%)`;

  useEffect(() => {
    canTilt.current =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(min-width: 1024px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        background
      }}
      onMouseMove={(event) => {
        if (!canTilt.current) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouseX.set((x / rect.width) * 100);
        mouseY.set((y / rect.height) * 100);
        rotateX.set(((y - rect.height / 2) / rect.height) * -intensity);
        rotateY.set(((x - rect.width / 2) / rect.width) * intensity);
      }}
      onMouseLeave={() => {
        if (!canTilt.current) {
          return;
        }

        rotateX.set(0);
        rotateY.set(0);
        mouseX.set(50);
        mouseY.set(50);
      }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className={`glass-panel gradient-border ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
