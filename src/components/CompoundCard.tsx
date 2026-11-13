import Link from "next/link";
import type { Compound } from "@/lib/compounds";

const TIER_LABEL: Record<number, string> = { 1: "TIER 1", 2: "TIER 2", 3: "TIER 3" };

export default function CompoundCard({ c }: { c: Compound }) {
  const goal = c.goalLabels[0];
  const cls = c.classLabel ? c.classLabel.split(/[/(]/)[0].trim() : "";
  const parts = [cls, goal].filter(Boolean);
  // drop a goal that just repeats the class (e.g. "Skin · Skin")
  const line = [...new Set(parts.map((p) => p.trim()))].join(" · ");
  return (
    <Link href={`/compounds/${c.slug}`} className={`card tc${c.tier}`}>
      <div className="ph">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/vial.jpg" alt="" aria-hidden="true" />
        <div className="veil" />
        <div className="glow" />
        <div className="pt"><span className={`pill t${c.tier}`}>● {TIER_LABEL[c.tier]}</span></div>
        <div className={`gr grade${c.gradeLetter}`}>GRADE {c.gradeLetter}</div>
      </div>
      <div className="cb">
        <h3>{c.name}</h3>
        {line && <div className="cls">{line}</div>}
        <p className="mech">{c.oneLiner || c.summary}</p>
        <div className="meta">
          <span>
            {c.studyCount ? (
              <><b>{c.studyCount}</b> human stud{c.studyCount === 1 ? "y" : "ies"}</>
            ) : (
              "reference only"
            )}
          </span>
          <span className="go">Open profile →</span>
        </div>
      </div>
    </Link>
  );
}
