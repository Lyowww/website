import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import copyEn from "@/content/copy/en.json";
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
  applicationName: copyEn.brand.name,
  title: {
    default: copyEn.seo.title,
    template: `%s | ${copyEn.brand.name}`
  },
  description: copyEn.seo.description,
  keywords: copyEn.seo.keywords,
  authors: [{ name: copyEn.brand.name }],
  creator: copyEn.brand.name,
  publisher: copyEn.brand.name,
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
