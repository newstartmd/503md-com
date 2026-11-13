"use client";

import { useActionState } from "react";
import { submitProvider, type ProviderState } from "@/app/providers/actions";
import { PROGRAM_CHOICES } from "@/lib/site";

const initial: ProviderState = { ok: false };
const CREDENTIALS = ["MD", "DO", "NP", "PA", "PharmD", "RN", "Other"];

export default function ProviderForm() {
  const [state, action, pending] = useActionState(submitProvider, initial);

  if (state.ok) {
    return (
      <div className="done">
        <div className="mk" aria-hidden="true">✓</div>
        <h2>You&apos;re registered</h2>
        <p>{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="formwrap" id="register">
      {state.error && <div className="alert err" role="alert">{state.error}</div>}

      {/* honeypot */}
      <input className="hp" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="formgrid">
        <div className="field">
          <label htmlFor="firstName">First name</label>
          <input id="firstName" name="firstName" required autoComplete="given-name" />
        </div>
        <div className="field">
          <label htmlFor="lastName">Last name</label>
          <input id="lastName" name="lastName" required autoComplete="family-name" />
        </div>
        <div className="field">
          <label htmlFor="email">Work email</label>
          <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@practice.com" />
        </div>
        <div className="field">
          <label htmlFor="credential">Credential</label>
          <select id="credential" name="credential" required defaultValue="">
            <option value="" disabled>Select…</option>
            {CREDENTIALS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="npi">NPI (optional)</label>
          <input id="npi" name="npi" inputMode="numeric" placeholder="10-digit" />
        </div>
        <div className="field">
          <label htmlFor="state">Practice state</label>
          <input id="state" name="state" autoComplete="address-level1" placeholder="AZ" />
        </div>
        <div className="field full">
          <label htmlFor="practice">Practice / clinic name</label>
          <input id="practice" name="practice" autoComplete="organization" />
        </div>
        <div className="field full">
          <label htmlFor="program">Which program do you order through today?</label>
          <select id="program" name="program" defaultValue="">
            <option value="">Select (optional)…</option>
            {PROGRAM_CHOICES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="notes">Anything we should know? (optional)</label>
          <textarea id="notes" name="notes" placeholder="Patient volume, compounds you use most, timing…" />
        </div>
        <div className="field full" style={{ flexDirection: "row", alignItems: "flex-start", gap: 10 }}>
          <input id="linkNsmd" name="linkNsmd" type="checkbox" style={{ width: 18, height: 18, marginTop: 2 }} />
          <label htmlFor="linkNsmd" style={{ textTransform: "none", letterSpacing: 0, color: "var(--mut)", fontFamily: "var(--disp)", fontSize: 14 }}>
            Optionally connect my patients to the NewStartMD client portal. <span style={{ color: "var(--dim)" }}>Not required to order — you can turn this on anytime.</span>
          </label>
        </div>
      </div>

      <div style={{ marginTop: 22, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn btn-lime" type="submit" disabled={pending}>
          {pending ? "Submitting…" : "Register my practice →"}
        </button>
        <span className="mono" style={{ fontSize: 12, color: "var(--dim)" }}>No PHI collected · takes under a minute</span>
      </div>

      <p className="formnote">
        503MD is integration-agnostic — your portal is built to connect to LocumTele, Virtual ClinicOS, or both.
        You don&apos;t have to order through us to use the reference.
      </p>
    </form>
  );
}
