// Single source of truth for site-wide identity + NAP.
export const SITE = {
  name: "503MD",
  domain: "503md.com",
  url: "https://503md.com",
  tagline: "The Peptide Reference",
  shortTagline: "The Peptide Reference",
  blurb:
    "A verified, plain-English reference for clinical peptides and metabolic therapies — regulatory status, human-trial data, and an evidence tier for every compound. Built for licensed providers and the patients they treat.",
  email: "info@503md.com",
  // Educational reference — not medical, legal, or prescribing advice.
  disclaimer:
    "503MD is an educational reference only. Nothing here is a prescription, an offer to dispense, or a substitute for clinical judgment. Regulatory status is tracked as of the date shown on each compound page and can change.",
} as const;

export const NAV = [
  { label: "Compounds", href: "/compounds" },
  { label: "Evidence", href: "/evidence" },
  { label: "503A / 503B", href: "/evidence#framework" },
  { label: "About", href: "/about" },
] as const;

// Fulfillment programs a provider may already order through. 503MD is
// integration-agnostic: the portal is built to hook into either or both of
// these (and more) once a fulfillment decision is made — nothing here is wired
// to a single vendor. Edit this list to add/rename a program in one place.
// NOTE: "Virtual ClinicOS" is a placeholder for the second program Michael
// referenced as "the other company" — confirm the exact name before launch.
export const PROGRAMS = [
  { key: "locumtele", label: "LocumTele" },
  { key: "virtualclinicos", label: "Virtual ClinicOS" },
] as const;

export const PROGRAM_CHOICES = [
  ...PROGRAMS.map((p) => p.label),
  "Both",
  "Not yet — still deciding",
] as const;
