import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site-content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Ecosystem Studio",
  title: {
    default: "Digital Agency — Engineering, Automation & Growth",
    template: "%s | Ecosystem Studio"
  },
  description:
    "Digital agency for scalable web and mobile products, automation systems, SEO, ads, Telegram bots, infrastructure, and growth strategy.",
  keywords: [
    "digital agency",
    "software engineering",
    "automation systems",
    "SEO services",
    "Telegram bot development",
    "DevOps infrastructure",
    "web development",
    "mobile app development"
  ],
  authors: [{ name: "Ecosystem Studio" }],
  creator: "Ecosystem Studio",
  publisher: "Ecosystem Studio",
  category: "technology",
  alternates: {
    canonical: "/en",
    languages: {
      en: "/en",
      hy: "/hy",
      "x-default": "/en"
    }
  }
};

export const viewport: Viewport = {
  themeColor: "#061A1F",
  colorScheme: "dark",
  viewportFit: "cover"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
