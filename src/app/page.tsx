import Link from "next/link";
import CompoundCard from "@/components/CompoundCard";
import { ALL, getCompound, countByTier, TIER_META } from "@/lib/compounds";
import { SITE } from "@/lib/site";

const FEATURED = ["tesamorelin", "semaglutide", "tirzepatide", "sermorelin", "bpc-157", "cjc-1295"];

export default function Home() {
  const featured = FEATURED.map(getCompound).filter(Boolean);
  const total = ALL.length;
  const tiers = countByTier();

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="grid" />
        <div className="wrap hero-in">
          <div>
            <div className="ey">The peptide reference · {total} compounds mapped</div>
            <h1>Every peptide, graded by the <em>evidence</em> — not the hype.</h1>
            <p className="lede">
              A verified, plain-English reference for clinical peptides and metabolic therapies:
              regulatory status, human-trial data, and a tier rating for each compound. Built for
              providers and the patients they treat.
            </p>
            <div className="cta">
              <Link className="btn btn-lime" href="/compounds">Explore the library</Link>
              <Link className="btn btn-ghost" href="/providers">For providers →</Link>
            </div>
            <div className="statrow">
              <div className="s"><div className="n">{total}</div><div className="l">compounds profiled</div></div>
              <div className="s"><div className="n"><b>A–D</b></div><div className="l">evidence grades</div></div>
              <div className="s"><div className="n">503<b>A/B</b></div><div className="l">compounding framework</div></div>
            </div>
          </div>

          <div className="term" aria-hidden="true">
            <div className="tt"><i className="dot-r" /><i className="dot-y" /><i className="dot-g" /><span>reference / tesamorelin.json</span></div>
            <div className="body">
              <div className="line"><span className="k">compound</span><span className="v">Tesamorelin</span></div>
              <div className="line"><span className="k">tier</span><span className="v"><span className="pill t1">● TIER 1 — FDA-approved</span></span></div>
              <div className="line"><span className="k">evidence_grade</span><span className="v gradeA">A — RCT, n=412</span></div>
              <div className="line"><span className="k">class</span><span className="v">GHRH analog / GH axis</span></div>
              <div className="line"><span className="k">fda_status</span><span className="v">Approved · Egrifta SV</span></div>
              <div className="line"><span className="k">compounding</span><span className="v">503A — copies restricted</span></div>
              <div className="line"><span className="k">key_finding</span><span className="v" style={{ color: "var(--cyan)" }}>VAT −15.2% @ 26 wk</span></div>
              <div className="line"><span className="k">dea</span><span className="v">Not controlled</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* RATING SYSTEM */}
      <section id="rating">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">The rating system</div>
              <h2>Three tiers. Four evidence grades. No marketing.</h2>
              <p>Every compound is sorted by its real regulatory standing and the strength of the human data behind it — so a provider can see in two seconds where a therapy actually stands.</p>
            </div>
          </div>
          <div className="legend">
            {([1, 2, 3] as const).map((t) => (
              <div key={t} className={`lg g${t}`}>
                <div className="tag"><span className={`pill t${t}`}>● {TIER_META[t].short.toUpperCase()}</span><h3>{TIER_META[t].label}</h3></div>
                <p>{TIER_META[t].blurb}</p>
                <span className="ex">{tiers[t]} compounds in this tier</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPOUND GRID */}
      <section id="compounds" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">The library</div>
              <h2>Browse the compound index</h2>
              <p>Each profile carries the tier, the evidence grade, mechanism, regulatory status across jurisdictions, and every human study we could verify — cited to PubMed.</p>
            </div>
            <Link className="btn btn-ghost" href="/compounds">All {total} compounds →</Link>
          </div>
          <div className="cards">
            {featured.map((c) => <CompoundCard key={c!.slug} c={c!} />)}
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="edu" id="edu">
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">How to read this site</div>
              <h2>Compounding, in plain terms</h2>
              <p>Peptide legality turns on one framework most patients have never heard of. Here&apos;s the short version — the long version lives on every compound page.</p>
            </div>
          </div>
          <div className="edu3">
            <div className="e">
              <div className="num">01 / 503A</div>
              <h3>503A pharmacies</h3>
              <p>Compound patient-specific prescriptions. A peptide has to sit on an approved bulks list — or be an approved drug — to be made here legally. We flag each compound&apos;s 503A standing.</p>
            </div>
            <div className="e">
              <div className="num">02 / 503B</div>
              <h3>503B outsourcing facilities</h3>
              <p>Make larger batches under FDA cGMP oversight for office use. Different list, different rules — a compound can qualify for one lane and not the other.</p>
            </div>
            <div className="e">
              <div className="num">03 / The grade</div>
              <h3>Evidence grade A–D</h3>
              <p>Separate from legality: how good is the human data? <Link href="/evidence">Grade A</Link> is RCT-backed; D is mechanism or anecdote. Legal to compound and well-studied are not the same thing — we show both.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROVIDER CTA */}
      <section id="providers">
        <div className="wrap">
          <div className="prov">
            <div className="gridp" />
            <div className="prov-in">
              <div>
                <div className="eybadge">● For licensed providers</div>
                <h2>A fast reference — and the door to your portal.</h2>
                <p>
                  Register your practice, then use 503MD to look things up and jump straight to your portal —
                  where your orders from LocumTele and Virtual ClinicOS live in one place. Connecting your patients
                  to NewStartMD is optional, never required to order.
                </p>
                <div className="cta">
                  <Link className="btn btn-lime" href="/providers">Provider sign-up →</Link>
                  <Link className="btn btn-ghost" href="/providers#how">How it works</Link>
                </div>
              </div>
              <ul>
                <li><span>Verified licensure, once</span></li>
                <li><span>One portal for LocumTele or Virtual ClinicOS — or both</span></li>
                <li><span>Evidence-graded formulary built in</span></li>
                <li><span>503A / 503B status on every compound</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
