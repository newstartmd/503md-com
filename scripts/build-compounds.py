#!/usr/bin/env python3
"""
503MD — compound dataset generator.

Reads the attorney-verified FitClinicMD peptide library (structured JSON +
per-compound markdown) and emits ONE self-contained dataset the site owns:
    src/data/compounds.json

Run once (or whenever the library is refreshed):
    python3 scripts/build-compounds.py /path/to/FitClinicMD_Peptides/site

The repo commits the generated JSON so the build never depends on the library.
"""
import json, re, sys, os

LIB = sys.argv[1] if len(sys.argv) > 1 else "/Users/michaelroth/Desktop/FitClinicMD_Peptides/site"
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "src", "data", "compounds.json")

compounds = json.load(open(f"{LIB}/data/compounds.json"))
tax = json.load(open(f"{LIB}/data/taxonomy.json"))
studies = json.load(open(f"{LIB}/data/studies.json"))
P, CLASSES, GOALS = tax["P"], tax["CLASSES"], tax["GOALS"]

# index studies by compound slug
by_slug = {}
for s in studies:
    for slug in s.get("compound_pages", []) or []:
        by_slug.setdefault(slug, []).append(s)

# ---------------------------------------------------------------------------
# Manual overrides applied AFTER generation, so corrections survive a re-run
# from the (slower-moving) upstream library. Each key patches that compound's
# generated record. Use for regulatory status that has changed since the
# library snapshot. Keep the reason + date in the note.
# ---------------------------------------------------------------------------
OVERRIDES = {
    # 2026-11-13: HHS filed an interim enforcement-discretion policy (Oct 28,
    # 2026) covering six compounded peptides including BPC-157. That makes it
    # compoundable under enforcement discretion (not an approval) — Tier 2, not
    # Tier 3. Evidence grade stays C (human data is unchanged and still thin).
    "bpc-157": {
        "tier": 2,
        "compounding": (
            "Covered by HHS's interim enforcement-discretion policy for compounded "
            "peptides (filed Oct 28, 2026): FDA will exercise enforcement discretion "
            "for 503A compounding of BPC-157 that meets the policy's ~10 conditions, "
            "while 503A bulks-list rulemaking is still pending. This is enforcement "
            "discretion, NOT an FDA approval or a bulks-list listing — and the "
            "BPC-157 free base is excluded (only the covered salt form qualifies). "
            "FDA scientists had recommended against listing; the PCAC had voted in favor."
        ),
        "updatedNote": "Regulatory status updated 2026-11-13 for the HHS interim enforcement-discretion policy.",
    },
}


def sections(md):
    out, cur = {}, "_head"
    out[cur] = []
    for line in md.split("\n"):
        if line.startswith("## "):
            cur = line[3:].strip()
            out[cur] = []
        elif line.startswith("# ") and cur == "_head":
            out[cur].append(line)
        else:
            out[cur].append(line)
    return {k: "\n".join(v).strip() for k, v in out.items()}


def clean(t):
    if not t:
        return ""
    t = re.sub(r"\((https?://[^)]+)\)", "", t)          # drop md link targets
    t = re.sub(r"https?://\S+", "", t)                    # drop bare urls
    t = re.sub(r"\[([^\]]+)\]", r"\1", t)                 # unwrap [text]
    t = re.sub(r"\*\*|\*|`", "", t)                        # drop md emphasis
    t = re.sub(r"\(\s*\)", "", t)                          # empty parens left by url removal
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\s+([;,.)])", r"\1", t)                   # no space before punctuation
    t = re.sub(r"\(\s+", "(", t)                            # no space after open paren
    t = re.sub(r"\s{2,}", " ", t).strip(" ·-—\n")
    return t.strip()


def bullet(reg_text, label):
    """Pull the value after '- **Label:**' in the regulatory block."""
    m = re.search(r"\*\*" + re.escape(label) + r":?\*\*\s*(.+)", reg_text)
    return clean(m.group(1)) if m else ""


def first_grade(g):
    m = re.search(r"[A-D]", g or "")
    return m.group(0) if m else "D"


def first_sentence(t, n=220):
    t = clean(t)
    m = re.split(r"(?<=[.!?])\s", t)
    s = m[0] if m else t
    return (s if len(s) <= n else s[: n - 1].rsplit(" ", 1)[0] + "…")


out = {}
for slug, base in compounds.items():
    md_path = f"{LIB}/compounds/{slug}.md"
    md = open(md_path).read() if os.path.exists(md_path) else ""
    sec = sections(md)
    meta = P.get(slug, {})
    goals = meta.get("goals", []) or []
    reg = sec.get("Regulatory status", "")

    summary = clean(sec.get("Summary", ""))
    mechanism = clean(sec.get("Mechanism", ""))

    # studies for this compound
    st = []
    for s in by_slug.get(slug, []):
        st.append({
            "name": s.get("study_name", ""),
            "label": clean(s.get("label", "")),
            "pmid": s.get("pmid") or "",
            "doi": s.get("doi") or "",
            "year": s.get("year") or "",
            "design": s.get("design") or s.get("type") or "",
            "n": s.get("n") or s.get("sample") or "",
        })
    st.sort(key=lambda x: (x["year"] or ""), reverse=True)

    out[slug] = {
        "slug": slug,
        "name": meta.get("title") or base.get("name") or slug,
        "tier": base.get("tier"),
        "grade": base.get("grade", ""),
        "gradeLetter": first_grade(base.get("grade", "")),
        "classKey": base.get("cls", ""),
        "classLabel": CLASSES.get(base.get("cls", ""), ""),
        "goals": goals,
        "goalLabels": [GOALS.get(g, g) for g in goals],
        "summary": summary,
        "mechanism": mechanism,
        "oneLiner": first_sentence(mechanism or summary),
        "fda": bullet(reg, "FDA"),
        "compounding": bullet(reg, "Compounding (503A/503B)") or bullet(reg, "Compounding"),
        "dea": bullet(reg, "DEA"),
        "wada": bullet(reg, "WADA 2026 Prohibited List") or bullet(reg, "WADA"),
        "studyCount": len(st),
        "studies": st,
    }
    if slug in OVERRIDES:
        out[slug].update(OVERRIDES[slug])

os.makedirs(os.path.dirname(OUT), exist_ok=True)
json.dump(out, open(OUT, "w"), indent=1, ensure_ascii=False)

# quick quality report
tiers = {1: 0, 2: 0, 3: 0}
for c in out.values():
    tiers[c["tier"]] = tiers.get(c["tier"], 0) + 1
miss_mech = [s for s, c in out.items() if not c["mechanism"]]
miss_fda = [s for s, c in out.items() if not c["fda"]]
print(f"wrote {len(out)} compounds -> {OUT}")
print(f"tiers: T1={tiers.get(1)} T2={tiers.get(2)} T3={tiers.get(3)}")
print(f"with studies: {sum(1 for c in out.values() if c['studyCount'])} / {len(out)}")
print(f"missing mechanism: {len(miss_mech)}  missing FDA line: {len(miss_fda)}")
if miss_mech:
    print("  no-mech:", ", ".join(miss_mech[:12]))
