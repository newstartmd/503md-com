"use server";

import { PROGRAM_CHOICES } from "@/lib/site";

export type ProviderState = {
  ok: boolean;
  error?: string;
  message?: string;
};

// FRONT-END INTAKE ONLY.
// This records a provider's interest and routes it onward. There is no
// fulfillment, pharmacy, or clinical backend wired here yet — that layer is
// decided later (LocumTele / Virtual ClinicOS / both). Until a durable store or
// BAA-covered destination is configured, we forward to CONTACT_WEBHOOK_URL when
// present and otherwise log to the server so nothing silently vanishes. No PHI
// is collected on this form.
export async function submitProvider(
  _prev: ProviderState,
  formData: FormData
): Promise<ProviderState> {
  // Honeypot — bots fill hidden fields; humans don't.
  if ((formData.get("company") as string)?.trim()) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const get = (k: string) => (formData.get(k) as string | null)?.trim() ?? "";
  const first = get("firstName");
  const last = get("lastName");
  const email = get("email");
  const credential = get("credential");
  const state = get("state");
  const npi = get("npi");
  const practice = get("practice");
  const program = get("program");
  const linkNsmd = formData.get("linkNsmd") === "on";
  const notes = get("notes");

  if (!first || !last) return { ok: false, error: "Please enter your name." };
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return { ok: false, error: "Please enter a valid work email." };
  if (!credential) return { ok: false, error: "Please select your credential." };
  if (program && !PROGRAM_CHOICES.includes(program as (typeof PROGRAM_CHOICES)[number]))
    return { ok: false, error: "Please choose a valid program option." };

  const lead = {
    type: "provider_registration",
    source: "503md.com",
    receivedAt: new Date().toISOString(),
    first,
    last,
    email,
    credential,
    state,
    npi,
    practice,
    program, // which fulfillment program(s) they order through today
    linkNewStartMd: linkNsmd, // OPTIONAL — never required to order
    notes,
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
    } catch (err) {
      // Don't lose the lead on a transient failure — surface it to logs.
      console.error("[provider-intake] webhook failed:", err, lead);
    }
  } else {
    console.info("[provider-intake] (no CONTACT_WEBHOOK_URL set) lead:", lead);
  }

  return {
    ok: true,
    message: `Thanks, ${first}. Your practice is registered — we'll reach out at ${email} as the portal comes online.`,
  };
}
