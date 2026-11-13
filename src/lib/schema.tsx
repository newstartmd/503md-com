import { SITE } from "./site";
import type { Compound } from "./compounds";

// Minimal, dependency-free JSON-LD helper.
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  description: SITE.blurb,
  email: SITE.email,
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
};

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}

export function compoundSchema(c: Compound) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `${c.name} — evidence, regulatory status & studies`,
    url: `${SITE.url}/compounds/${c.slug}`,
    about: {
      "@type": "Drug",
      name: c.name,
      ...(c.classLabel ? { drugClass: c.classLabel } : {}),
    },
    description: c.oneLiner || c.summary,
    isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
    ...(c.studies.length
      ? {
          citation: c.studies
            .filter((s) => s.pmid)
            .map((s) => ({
              "@type": "ScholarlyArticle",
              name: s.name,
              ...(s.pmid ? { sameAs: `https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/` } : {}),
              ...(s.year ? { datePublished: s.year } : {}),
            })),
        }
      : {}),
  };
}
