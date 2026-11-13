import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Fonts are self-hosted in-repo (woff2) via next/font/local, so the build has
// NO network dependency on Google Fonts — reliable on Vercel/CI and privacy-safe.
const display = localFont({
  src: "./fonts/SpaceGrotesk-var.woff2", // variable font, 300–700
  variable: "--font-disp",
  display: "swap",
  weight: "300 700",
});
const mono = localFont({
  src: [
    { path: "./fonts/IBMPlexMono-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexMono-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/IBMPlexMono-600.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.shortTagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.blurb,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: SITE.url,
    title: `${SITE.name} — ${SITE.shortTagline}`,
    description: SITE.blurb,
  },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
