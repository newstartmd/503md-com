import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SLUGS } from "@/lib/compounds";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/compounds", "/evidence", "/providers", "/about"];
  const pages: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.8,
  }));
  const compounds: MetadataRoute.Sitemap = SLUGS.map((slug) => ({
    url: `${SITE.url}/compounds/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));
  return [...pages, ...compounds];
}
