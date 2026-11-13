import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL, SLUGS, getCompound, TIER_META, GRADE_META } from "@/lib/compounds";
import { JsonLd, breadcrumb, compoundSchema } from "@/lib/schema";

export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCompound(slug);
  if (!c) return { title: "Not found" };
  const desc = c.oneLiner || c.summary || `${c.name} — tier, evidence grade, regulatory status and studies.`;
  return {
    title: `${c.name} — evidence & regulatory status`,
    description: desc.slice(0, 180),
    openGraph: { title: `${c.name} | 503MD`, description: desc.slice(0, 180) },
  };
}

const TIER_LABEL: Record<number, string> = { 1: "TIER 1", 2: "TIER 2", 3: "TIER 3" };

export default async function CompoundDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCompound(slug);
  if (!c) notFound();

  const related = ALL.filter((x) => x.classKey === c.classKey && x.slug !== c.slug).slice(0, 3);
  const facts: [string, string][] = [
    ["FDA status", c.fda || "Not an FDA-approved product"],
    ["Compounding (503A/503B)", c.compounding || "Status varies — see notes"],
    ["DEA", c.dea || "Not listed as controlled"],
    ["WADA (sport)", c.wada || "Not specified"],
  ];

  return (
    <>
      <JsonLd data={breadcrumb([
        { name: "Home", path: "/" },
        { name: "Compounds", path: "/compounds" },
        { name: c.name, path: `/compounds/${c.slug}` },
      ])} />
      <JsonLd data={compoundSchema(c)} />

      <div className="wrap crumb">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/compounds">Compounds</Link><span>/</span>
        <span style={{ color: "var(--mut)" }}>{c.name}</span>
      </div>

      <section className="detail">
        <div className="wrap">
          <div className="top">
            <div className={`vial tc${c.tier}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/vial.jpg" alt="" aria-hidden="true" />
              <div className="veil" />
            </div>
            <div>
              <div className="badges">
                <span className={`pill t${c.tier}`}>● {TIER_LABEL[c.tier]} — {TIER_META[c.tier].label}</span>
                <span className={`mono grade${c.gradeLetter}`} style={{ fontSize: 13, fontWeight: 600 }}>
                  GRADE {c.grade}
                </span>
                {c.classLabel && <span className="mono" style={{ fontSize: 12, color: "var(--cyan)" }}>{c.classLabel}</span>}
              </div>
              <h1>{c.name}</h1>
              {(c.summary || c.oneLiner) && <p className="lead">{c.summary || c.oneLiner}</p>}
              {!!c.goalLabels.length && (
                <p className="mono" style={{ fontSize: 12, color: "var(--dim)", marginTop: 12 }}>
                  GOALS · {c.goalLabels.join(" · ")}
                </p>
              )}
              <div className="facts">
                {facts.map(([k, v]) => (
                  <div className="fact" key={k}><div className="k">{k}</div><div className="v">{v}</div></div>
                ))}
              </div>
            </div>
          </div>

          {c.mechanism && (
            <>
              <h2>Mechanism</h2>
              <p className="proseblock">{c.mechanism}</p>
            </>
          )}

          <h2>Human evidence {c.studyCount ? `· ${c.studyCount}` : ""}</h2>
          {c.studies.length ? (
            <div className="studies">
              {c.studies.map((s, i) => (
                <div className="study" key={i}>
                  <div className="nm">{s.label ? `${s.label} ` : ""}{s.name}</div>
                  <div className="mt">
                    {s.year && <span>{s.year}</span>}
                    {s.design && <span>{s.design}</span>}
                    {s.n && <span>n={String(s.n)}</span>}
                    {s.pmid && <a href={`https://pubmed.ncbi.nlm.nih.gov/${s.pmid}/`} target="_blank" rel="noopener noreferrer">PMID {s.pmid} →</a>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="proseblock">
              No qualifying human studies are catalogued for {c.name} in our database. It is listed here for
              transparency and reference only.
            </p>
          )}

          <div className="callout">
            <strong style={{ color: "var(--ink)" }}>Reference only.</strong> This page summarizes publicly available
            regulatory and research information about {c.name}. It is not a prescription, an endorsement, or an offer
            to dispense, and regulatory status can change. Clinicians should verify current status before prescribing
            or compounding.
          </div>

          {!!related.length && (
            <>
              <h2>Related compounds</h2>
              <div className="cards">
                {related.map((r) => (
                  <Link key={r.slug} href={`/compounds/${r.slug}`} className={`card tc${r.tier}`}>
                    <div className="cb" style={{ padding: "16px 17px" }}>
                      <div className="badges" style={{ marginBottom: 8 }}>
                        <span className={`pill t${r.tier}`}>● {TIER_LABEL[r.tier]}</span>
                        <span className={`mono grade${r.gradeLetter}`} style={{ fontSize: 12, fontWeight: 600 }}>GRADE {r.gradeLetter}</span>
                      </div>
                      <h3>{r.name}</h3>
                      <p className="mech">{r.oneLiner || r.summary}</p>
                      <div className="meta"><span className="go">Open profile →</span></div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
