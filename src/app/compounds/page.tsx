import type { Metadata } from "next";
import Link from "next/link";
import CompoundExplorer from "@/components/CompoundExplorer";
import { JsonLd, breadcrumb } from "@/lib/schema";
import { ALL, GOALS } from "@/lib/compounds";

export const metadata: Metadata = {
  title: "Compound index",
  description:
    "Browse every clinical peptide and metabolic therapy by tier, evidence grade, class, and goal — with regulatory status and human-trial data on each.",
};

export default async function CompoundsPage({
  searchParams,
}: {
  searchParams: Promise<{ goal?: string; tier?: string }>;
}) {
  const sp = await searchParams;
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "Compounds", path: "/compounds" }])} />
      <div className="wrap crumb">
        <Link href="/">Home</Link><span>/</span><span style={{ color: "var(--mut)" }}>Compounds</span>
      </div>
      <section style={{ paddingTop: 30 }}>
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">The library · {ALL.length} compounds</div>
              <h2>Compound index</h2>
              <p>Filter by tier, goal, or class — or search by name. Each profile carries regulatory status, mechanism, and every human study we could verify.</p>
            </div>
          </div>
          <CompoundExplorer compounds={ALL} goals={GOALS} initialGoal={sp.goal} />
        </div>
      </section>
    </>
  );
}
