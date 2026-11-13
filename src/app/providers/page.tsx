import type { Metadata } from "next";
import Link from "next/link";
import ProviderForm from "@/components/ProviderForm";
import { JsonLd, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "For providers — your reference and your portal",
  description:
    "Register your practice on 503MD: a fast, evidence-graded peptide reference and the door to your provider portal, built to connect to LocumTele, Virtual ClinicOS, or both.",
};

export default function ProvidersPage() {
  return (
    <>
      <JsonLd data={breadcrumb([{ name: "Home", path: "/" }, { name: "For providers", path: "/providers" }])} />
      <div className="wrap crumb">
        <Link href="/">Home</Link><span>/</span><span style={{ color: "var(--mut)" }}>For providers</span>
      </div>

      {/* intro */}
      <section style={{ paddingTop: 30, paddingBottom: 30 }}>
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">For licensed providers</div>
              <h2 style={{ fontSize: 38 }}>Your reference, and the door to your portal.</h2>
              <p style={{ fontSize: 16 }}>
                503MD is a fast, evidence-graded reference you can pull up chairside — and a single entry point to your
                provider portal. Your portal brings your orders together in one place, whether you fulfill through
                LocumTele, Virtual ClinicOS, or both. Connecting your patients to the NewStartMD client portal is
                optional and never required to order.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* how it works */}
      <section className="edu" id="how" style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div className="wrap">
          <div className="edu3">
            <div className="e">
              <div className="num">01 / Register</div>
              <h3>Tell us who you are</h3>
              <p>Verify your license once and add your practice. Under a minute, no PHI — just enough to set up your portal access.</p>
            </div>
            <div className="e">
              <div className="num">02 / Connect</div>
              <h3>Link your program</h3>
              <p>Point your portal at LocumTele, Virtual ClinicOS, or both. We&apos;re built to hook into either — you&apos;re never locked to one fulfillment path.</p>
            </div>
            <div className="e">
              <div className="num">03 / Order &amp; track</div>
              <h3>One place for your orders</h3>
              <p>See what you&apos;ve ordered and for whom, across connected programs. Optionally extend your patients a NewStartMD portal — your call, not a requirement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* register */}
      <section style={{ paddingTop: 54 }}>
        <div className="wrap">
          <div className="sec-h">
            <div>
              <div className="ey">Register your practice</div>
              <h2>Set up your provider access</h2>
              <p>We&apos;ll confirm by email as the portal comes online. The fulfillment backend is being finalized — registering now puts you first in line.</p>
            </div>
          </div>
          <ProviderForm />
        </div>
      </section>
    </>
  );
}
