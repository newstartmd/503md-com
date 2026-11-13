import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { JsonLd, organizationSchema, websiteSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Self-hosted at build time by next/font — no runtime requests to Google.
const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-disp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
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
