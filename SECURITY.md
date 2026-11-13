# Security Policy

## Reporting

Report suspected vulnerabilities privately to **security@rothandroth.net**.
Do not open a public issue for security matters. We aim to acknowledge within
2 business days.

## Scope & posture

- This repository is the **public, PHI-free** 503MD reference site and provider
  registration gateway. It does not collect protected health information and does
  not process payments.
- Provider-registration input is validated server-side and forwarded to a
  configured destination (`CONTACT_WEBHOOK_URL`) or logged; it contains no PHI.
- Secrets are never committed. Configuration is via environment variables
  (`.env.local`, Vercel project settings) — see `.env.example`.
- Security headers (HSTS, X-Frame-Options, CSP frame-ancestors, nosniff,
  Referrer-Policy, Permissions-Policy) are set in `next.config.mjs`.
- CodeQL (advanced) and Dependabot run per the network security cadence.

## Out of scope

Fulfillment, pharmacy, e-prescribing, and any clinical/PHI systems are **not**
part of this repository and are handled by separate, access-controlled systems.
