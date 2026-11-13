import data from "@/data/compounds.json";

export type Study = {
  name: string;
  label: string;
  pmid: string;
  doi: string;
  year: string;
  design: string;
  n: string | number;
};

export type Compound = {
  slug: string;
  name: string;
  tier: 1 | 2 | 3;
  grade: string;
  gradeLetter: "A" | "B" | "C" | "D";
  classKey: string;
  classLabel: string;
  goals: string[];
  goalLabels: string[];
  summary: string;
  mechanism: string;
  oneLiner: string;
  fda: string;
  compounding: string;
  dea: string;
  wada: string;
  studyCount: number;
  studies: Study[];
};

const MAP = data as unknown as Record<string, Compound>;

export const ALL: Compound[] = Object.values(MAP).sort((a, b) => {
  if (a.tier !== b.tier) return a.tier - b.tier; // T1 first
  return a.name.localeCompare(b.name);
});

export function getCompound(slug: string): Compound | undefined {
  return MAP[slug];
}

export const SLUGS = Object.keys(MAP);

// ---- taxonomy / display meta ------------------------------------------------

export const TIER_META: Record<
  1 | 2 | 3,
  { key: string; label: string; short: string; blurb: string }
> = {
  1: {
    key: "t1",
    label: "FDA-approved / recognized",
    short: "Tier 1",
    blurb:
      "Approved products, or substances with established human-trial support. Prescribe and compound within the normal rules.",
  },
  2: {
    key: "t2",
    label: "Compoundable · emerging data",
    short: "Tier 2",
    blurb:
      "Lawfully compoundable under 503A/503B with a legitimate evidence base, but outside a full FDA approval. Use with informed consent.",
  },
  3: {
    key: "t3",
    label: "Information only",
    short: "Tier 3",
    blurb:
      "Research compounds with thin or preclinical-only human data, or an unsettled compounding status. Documented here for transparency — not a recommendation.",
  },
};

export const GRADE_META: Record<string, { label: string }> = {
  A: { label: "Randomized controlled-trial evidence" },
  B: { label: "Controlled or sizeable human data" },
  C: { label: "Limited or low-quality human data" },
  D: { label: "Mechanistic / preclinical / anecdotal" },
};

// Build filter facets from the live dataset so they never drift.
export const CLASSES = dedupe(ALL.map((c) => [c.classKey, c.classLabel]));
export const GOALS = dedupe(
  ALL.flatMap((c) => c.goals.map((g, i) => [g, c.goalLabels[i]] as [string, string]))
);

function dedupe(pairs: [string, string][] | string[][]): { key: string; label: string }[] {
  const seen = new Map<string, string>();
  for (const [k, l] of pairs as [string, string][]) {
    if (k && !seen.has(k)) seen.set(k, l || k);
  }
  return [...seen.entries()].map(([key, label]) => ({ key, label }));
}

export function countByTier() {
  return ALL.reduce(
    (acc, c) => ((acc[c.tier] = (acc[c.tier] || 0) + 1), acc),
    {} as Record<number, number>
  );
}
