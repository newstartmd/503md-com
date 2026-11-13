"use client";

import { useMemo, useState } from "react";
import type { Compound } from "@/lib/compounds";
import CompoundCard from "./CompoundCard";

type Facet = { key: string; label: string };

export default function CompoundExplorer({
  compounds,
  goals,
  initialGoal,
}: {
  compounds: Compound[];
  goals: Facet[];
  initialGoal?: string;
}) {
  const [q, setQ] = useState("");
  const [tier, setTier] = useState<number | null>(null);
  const [goal, setGoal] = useState<string | null>(initialGoal ?? null);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return compounds.filter((c) => {
      if (tier && c.tier !== tier) return false;
      if (goal && !c.goals.includes(goal)) return false;
      if (needle) {
        const hay = `${c.name} ${c.classLabel} ${c.summary} ${c.mechanism}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [compounds, q, tier, goal]);

  return (
    <>
      <div className="cbar" role="search">
        <input
          className="chip"
          style={{ minWidth: 190, cursor: "text" }}
          type="search"
          placeholder="Search compounds…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search compounds"
        />
        <button className={`chip${tier === null ? " on" : ""}`} onClick={() => setTier(null)}>All tiers</button>
        <button className={`chip${tier === 1 ? " on" : ""}`} onClick={() => setTier(1)}>Tier 1</button>
        <button className={`chip${tier === 2 ? " on" : ""}`} onClick={() => setTier(2)}>Tier 2</button>
        <button className={`chip${tier === 3 ? " on" : ""}`} onClick={() => setTier(3)}>Tier 3</button>
      </div>
      <div className="cbar">
        <button className={`chip${goal === null ? " on" : ""}`} onClick={() => setGoal(null)}>All goals</button>
        {goals.map((g) => (
          <button
            key={g.key}
            className={`chip${goal === g.key ? " on" : ""}`}
            onClick={() => setGoal(goal === g.key ? null : g.key)}
          >
            {g.label}
          </button>
        ))}
      </div>

      <p className="mono" style={{ color: "var(--dim)", fontSize: 12, margin: "4px 0 20px" }}>
        {filtered.length} compound{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length ? (
        <div className="cards">
          {filtered.map((c) => <CompoundCard key={c.slug} c={c} />)}
        </div>
      ) : (
        <p className="empty">No compounds match those filters.</p>
      )}
    </>
  );
}
