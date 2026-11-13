import Link from "next/link";
import type { Compound } from "@/lib/compounds";

export default function CompoundCard({ c }: { c: Compound }) {
  const goal = c.goalLabels[0];
  const cls = c.classLabel ? c.classLabel.split(/[/(]/)[0].trim() : "";
  const parts = [cls, goal].filter(Boolean);
  // drop a goal that just repeats the class (e.g. "Skin · Skin")
  const line = [...new Set(parts.map((p) => p.trim()))].join(" · ");
  return (
    <Link href={`/compounds/${c.slug}`} className="card">
      <div className="ph">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/vial.jpg" alt="" aria-hidden="true" />
        <div className="glow" />
        <div className={`gr grade${c.gradeLetter}`}>GRADE {c.gradeLetter}</div>
      </div>
      <div className="cb">
        <h3>
          <span className={`tdot dot-t${c.tier}`} title={`Tier ${c.tier}`} aria-hidden="true" />
          {c.name}
        </h3>
        {line && <div className="cls">{line}</div>}
        <p className="mech">{c.oneLiner || c.summary}</p>
        <div className="meta">
          <span>
            Tier {c.tier}
            {c.studyCount ? <> · <b>{c.studyCount}</b> stud{c.studyCount === 1 ? "y" : "ies"}</> : " · reference"}
          </span>
          <span className="go">Open profile →</span>
        </div>
      </div>
    </Link>
  );
}
