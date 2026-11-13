import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { TIER_META, GRADE_META, countByTier } from "@/lib/compounds";

export const metadata: Metadata = {
  title: "How we rate — tiers, evidence grades & the 503A/503B framework",
  description:
    "503MD rates every compound two ways: a regulatory tier (1–3) and an evidence grade (A–D). Here's exactly what each means, and how 503A and 503B compounding differ.",
};

export default function EvidencePage() {
  const tiers = countByTier();
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Evidence", path: "/evidence" }])} />
      <div className="wrap crumb">
        <Link href="/">Home</Link><span>/</span><span style={{ color: "var(--mut)" }}>Evidence</span>
      </div>

      <section style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">How we rate</div>
              <h2 style={{ fontSize: 38 }}>Two ratings, kept separate on purpose.</h2>
              <p style={{ fontSize: 16 }}>
                Legality and evidence are different questions. A compound can be perfectly legal to compound and barely
                studied in humans — or heavily studied and not lawfully compoundable. So we grade both, and never let
                one stand in for the other.
              </p>
            </div>
          </div>

          <h3 className="mono" style={{ color: "var(--cyan)", letterSpacing: ".1em", fontSize: 13, marginBottom: 16 }}>THE TIER — WHERE IT STANDS</h3>
          <div className="legend">
            {([1, 2, 3] as const).map((t) => (
              <div key={t} className={`lg g${t}`}>
                <div className="tag"><span className={`pill t${t}`}>● {TIER_META[t].short.toUpperCase()}</span><h3>{TIER_META[t].label}</h3></div>
                <p>{TIER_META[t].blurb}</p>
                <span className="ex">{tiers[t]} compounds</span>
              </div>
            ))}
          </div>

          <h3 className="mono" style={{ color: "var(--cyan)", letterSpacing: ".1em", fontSize: 13, margin: "46px 0 16px" }}>THE GRADE — HOW GOOD THE HUMAN DATA IS</h3>
          <div className="facts" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
            {(["A", "B", "C", "D"] as const).map((g) => (
              <div className="fact" key={g}>
                <div className="k">Grade {g}</div>
                <div className="v"><span className={`grade${g} mono`} style={{ fontWeight: 600 }}>●</span> {GRADE_META[g].label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="edu" id="framework">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">The framework</div>
              <h2>503A vs 503B — the two compounding lanes</h2>
              <p>Most of what makes a peptide lawfully available (or not) comes down to these two sections of the Food, Drug &amp; Cosmetic Act. A compound can qualify for one and not the other.</p>
            </div>
          </div>
          <div className="edu3">
            <div className="e">
              <div className="num">503A</div>
              <h3>503A pharmacies</h3>
              <p>Compound patient-specific prescriptions. To be made here legally, a bulk drug substance generally has to be the subject of an approved application, appear in the USP, or sit on FDA&apos;s 503A bulks list. We flag each compound&apos;s 503A standing.</p>
            </div>
            <div className="e">
              <div className="num">503B</div>
              <h3>503B outsourcing facilities</h3>
              <p>Register with FDA and compound larger batches under cGMP, often for office use without a patient-specific script — but only from substances on FDA&apos;s separate 503B list (or in shortage). Different list, different rules.</p>
            </div>
            <div className="e">
              <div className="num">Why it moves</div>
              <h3>Status changes</h3>
              <p>FDA nominations, PCAC votes, and shortage listings shift which lane a compound fits. We note the standing as of each page&apos;s date — always verify current status before prescribing or compounding.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Link className="btn btn-lime" href="/compounds">Browse the compound index →</Link>
        </div>
      </section>
    </>
  );
}
