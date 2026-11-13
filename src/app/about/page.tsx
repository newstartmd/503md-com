import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { ALL } from "@/lib/compounds";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About 503MD",
  description:
    "503MD is a verified, plain-English reference for clinical peptides and metabolic therapies — built for licensed providers and informed patients.",
};

export default function AboutPage() {
  const withStudies = ALL.filter((c) => c.studyCount).length;
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <div className="wrap crumb">
        <Link href="/">Home</Link><span>/</span><span style={{ color: "var(--mut)" }}>About</span>
      </div>

      <section style={{ paddingTop: 30 }}>
        <div className="wrap" style={{ maxWidth: 760 }}>
          <div className="ey">About</div>
          <h2 style={{ fontSize: 38, margin: "8px 0 20px" }}>A reference you can trust in front of a patient.</h2>
          <p className="proseblock" style={{ fontSize: 16, marginBottom: 18 }}>
            The peptide space is loud, fast-moving, and full of marketing dressed up as medicine. 503MD exists to cut
            through it: one place where every compound carries its real regulatory standing, the strength of its human
            evidence, and a clear 503A/503B status — in plain English, cited to primary sources.
          </p>
          <p className="proseblock" style={{ fontSize: 16, marginBottom: 18 }}>
            We profile <strong style={{ color: "var(--ink)" }}>{ALL.length} compounds</strong>, {withStudies} of them
            with catalogued human studies linked to PubMed. Each is sorted into a tier (where it stands) and an evidence
            grade (how good the data is), kept deliberately separate so neither hides behind the other.
          </p>
          <p className="proseblock" style={{ fontSize: 16, marginBottom: 28 }}>
            503MD is a reference and a provider gateway — not a pharmacy. For licensed providers, it&apos;s also the door
            to a portal that brings your orders together across fulfillment programs. {SITE.disclaimer}
          </p>
          <div className="cta">
            <Link className="btn btn-lime" href="/compounds">Explore the library</Link>
            <Link className="btn btn-ghost" href="/providers">For providers →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
