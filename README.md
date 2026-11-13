# 503MD — The Peptide Reference

A verified, plain-English reference for clinical peptides and metabolic therapies,
and a gateway to the provider portal. Every compound carries a regulatory **tier**
(1–3), an **evidence grade** (A–D), its **503A/503B** compounding status, and links
to the human studies behind it.

- **Audience:** licensed providers (primary) and informed patients.
- **Scope:** educational reference + provider registration. **PHI-free.** It does
  not sell, dispense, or ship medication. Fulfillment/clinical systems are a
  separate, later layer.
- **Integration-agnostic:** the provider portal is built to connect to
  **LocumTele**, **Virtual ClinicOS**, or both. Connecting patients to the
  NewStartMD client portal is optional and never required to order.

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** · **Tailwind v4**
- Fonts self-hosted at build time (`next/font`): Space Grotesk + IBM Plex Mono
- Host: **Vercel** (domain `503md.com`)
- Design: "The Lab" — dark biotech reference terminal. Charcoal / assay-lime / cyan.
  Tier colors the compound's product vial (green T1 / amber T2 / red T3).

## Data

The compound dataset lives at `src/data/compounds.json` and is **owned by this repo**
(the build never depends on the external library). It is generated from the
attorney-verified FitClinicMD peptide library:

```bash
npm run data -- /path/to/FitClinicMD_Peptides/site   # regenerate src/data/compounds.json
```

Fields per compound: tier, grade, class, goals, summary, mechanism, FDA / 503A-503B /
DEA / WADA status, and verified human studies (PubMed PMIDs).

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
npm run lint
```

## Environment

See `.env.example`. All optional:
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — GSC token.
- `CONTACT_WEBHOOK_URL` — where provider-registration leads POST. If unset, leads
  are logged server-side (no silent loss). **No PHI is collected.**

## Routes

| Path | What |
|---|---|
| `/` | Home — rating system, featured compounds, provider CTA |
| `/compounds` | Searchable/filterable index (tier · goal · class) |
| `/compounds/[slug]` | Per-compound profile (static-generated for all ~74) |
| `/evidence` | How tiers + grades work, and 503A vs 503B |
| `/providers` | Provider registration + portal gateway |
| `/about` | About |
| `/robots.txt`, `/sitemap.xml`, `/llms.txt` | SEO / AEO |

## Deploy

Vercel builds on push to `main`. `.github/workflows/deploy.yml` stays green and
skips until the `VERCEL_TOKEN` secret and the team/project IDs are set.

## Emergency contact

Michael Roth — mroth@rothandroth.net
