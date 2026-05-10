"use client";

import Lenis from "lenis";
import { type ReactNode, useEffect } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 767px)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (time: number) => Math.min(1, 1.001 - Math.pow(2, -10 * time)),
      smoothWheel: true,
      wheelMultiplier: 0.82,
      touchMultiplier: 1.85,
      allowNestedScroll: true,
    });

    let frame = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(loop);
    };

    const pauseIfHidden = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else if (!frame) {
        frame = requestAnimationFrame(loop);
      }
    };

    frame = requestAnimationFrame(loop);
    document.addEventListener("visibilitychange", pauseIfHidden);

    return () => {
      document.removeEventListener("visibilitychange", pauseIfHidden);
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return children;
}
