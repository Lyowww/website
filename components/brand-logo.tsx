"use client";

import Image from "next/image";
import logoSrc from "@/assets/logo.png";

type BrandLogoProps = {
  /**
   * Wrapper establishes layout box (`relative` + explicit size) for `fill` image.
   * Defaults assume a square mark (e.g. 1024×1024 asset).
   */
  className?: string;
  imgClassName?: string;
  /** Passed to next/image — match the CSS box width so the right src size is chosen. */
  sizes?: string;
  priority?: boolean;
};

export function BrandLogo({
  className = "relative inline-block size-8 shrink-0 sm:size-9",
  imgClassName = "object-contain object-center",
  sizes = "(max-width: 640px) 32px, 40px",
  priority = false,
}: BrandLogoProps) {
  return (
    <span className={className}>
      <Image
        src={logoSrc}
        alt=""
        fill
        sizes={sizes}
        className={imgClassName}
        priority={priority}
        draggable={false}
      />
    </span>
  );
}
