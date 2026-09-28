#!/usr/bin/env python3
"""
Second stage: derive the fields the page will filter and sort on, split the
taxonomy into mechanical and descriptive facets, and resolve the Craft and
Creation reprints against Legends & Legacies.

Mechanical facets (filterable, and load-bearing on the page):
    level, school, classes
Descriptive facets (shown as tags, never filters):
    magic source, Retia spell group, Legacy, blood magic, ritual, concentration

Retia carries no class tag: its spell chapter prints none, and inventing one
would put my judgement where the book's authority belongs.
"""
import json, re, collections
from pathlib import Path

HERE = Path(__file__).parent

ABBR = {"Abjuration": "ABJ", "Conjuration": "CON", "Divination": "DIV",
        "Enchantment": "ENC", "Evocation": "EVO", "Illusion": "ILL",
        "Necromancy": "NEC", "Transmutation": "TRA", "Psionic": "PSI"}

# The eleven groups the Spell Groups section (p. 530) actually defines.
RETIA_GROUPS = {
    "Altissima-Cor’s Arcane Arts", "Blood of Cineris", "Chromatic Convocation",
    "Daemoturgy", "Eidomancy", "Epic of Duality", "Legacy of Gold",
    "Nine Branch Arts", "Ossenheimer’s Memoirs", "Sky-Keeper’s Arcana",
    "Whisperwood Tome",
}
# Used on spells but never defined in that section — a gap in the book, not in
# the parse. Kept so the tag still renders; it just has no explainer.
RETIA_UNDOCUMENTED = {"Skulker’s Grimoire"}

# Misprints in the tag line, each read back against the page. 'Sky-Keeper's
# Grimoire' (Eviscerate, p. 554) is deliberately absent: it could be either
# Sky-Keeper's Arcana or Skulker's Grimoire and the book does not say, so it
# stays as printed and gets reported.
TAG_FIX = {
    "(Legacy": "Legacy",                              # p. 534, doubled paren
    "Sky-Weaver’s Arcana": "Sky-Keeper’s Arcana",     # p. 552
    "Whispering Tome": "Whisperwood Tome",            # p. 565
    "Ossenhimer’s Memoirs": "Ossenheimer’s Memoirs",  # p. 578
}

MAGIC_SOURCES = {"arcane", "primal", "divine", "psionic", "shadow"}


def components(raw):
    """'V, S, M (a pinch of soot)' -> flags plus the material text."""
    m = re.search(r"\bM\b\s*\(?([^)]*)\)?", raw)
    return {
        "v": bool(re.search(r"\bV\b", raw)),
        "s": bool(re.search(r"\bS\b", raw)),
        "m": bool(re.search(r"\bM\b", raw)),
        "material": (m.group(1).strip() if m else ""),
        "costly": bool(re.search(r"\b\d+\s*gp\b", raw, re.I)),
        "consumed": bool(re.search(r"consume", raw, re.I)),
    }


def facets(rec):
    tags = [TAG_FIX.get(t.strip(), t.strip())
            for t in rec["paren"].split(",") if t.strip()]
    src   = [t for t in tags if t.lower() in MAGIC_SOURCES]
    ritual = any(t.lower() == "ritual" for t in tags)
    blood  = any(t.lower() == "blood magic" for t in tags)
    legacy = any(t.lower() == "legacy" for t in tags)
    rest = [t for t in tags if t.lower() not in MAGIC_SOURCES
            and t.lower() not in ("ritual", "blood magic", "legacy")]
    return src, rest, ritual, blood, legacy


# A handful of entries have a boxed creature stat block, a boxed table or a
# designer's sidebar sitting inside them on the page. pdftotext gives back the
# words but not the box, so that content lands in the spell's prose — and in one
# case (Summon Dragon, L&L p. 256) the box belongs to the spell printed next to
# it. These are found and flagged rather than quietly shipped as clean text.
STATBLOCK = re.compile(
    r"\b(Armor Class \d|Hit Points \d|STR DEX CON|Melee Weapon Attack|"
    r"Ranged Spell Attack|Damage Immunities|Condition Immunities|Multiattack)\b")

# A die table's header ('d4 Effect', 'd20 Tweaked Fates') left inside a
# paragraph means the table's rows were flattened into the prose around it.
DIETABLE = re.compile(r"\bd(4|6|8|10|12|20|100)\s+[A-Z]")

def needs_review(blocks):
    hits = sum(1 for b in blocks if b["t"] == "p" and STATBLOCK.search(b.get("text", "")))
    if hits >= 2:
        return True
    if any(b["t"] == "tbl" for b in blocks):
        return True
    return any(b["t"] == "p" and DIETABLE.search(b.get("text", "")) for b in blocks)


def key(name):
    """Match key for dedup — case, punctuation and any '(alt name)' ignored."""
    return re.sub(r"[^a-z0-9]", "", re.sub(r"\(.*?\)", "", name).lower())


def main():
    raw = json.load(open(HERE / "roster_raw.json"))
    out, problems = [], []

    for r in raw:
        src, groups, ritual, blood, legacy = facets(r)
        conc = bool(re.search(r"concentration", r["duration"], re.I))
        rec = {
            "key": key(r["name"]),
            "name": r["name"],
            "book": r["book"], "bookTitle": r["bookTitle"], "page": r["page"],
            # --- mechanical
            "level": r["level"],
            "school": r["school"], "schoolAbbr": ABBR[r["school"]],
            "classes": r["classes"],
            # --- stat block
            "castingTime": r["castingTime"], "range": r["range"],
            "duration": r["duration"], "componentsRaw": r["components"],
            "components": components(r["components"]),
            "concentration": conc, "ritual": ritual,
            # --- descriptive
            "magicSource": src, "groups": groups,
            "legacy": legacy, "bloodMagic": blood,
            # --- prose
            "body": r["body"], "higher": r["higher"],
            "bodyBlocks": r["bodyBlocks"], "higherBlocks": r["higherBlocks"],
        }
        # Craft and Creation's psionic school IS the Psion spell pool: the book
        # prints no Classes line for those spells, and only puts two of them on
        # the Psion Spell List (p. 85). Filing all thirteen under Psion is the
        # project owner's call, recorded here so it is visible rather than
        # buried — it is the one class tag in this roster the books do not state.
        if rec["school"] == "Psionic" and not rec["classes"]:
            rec["classes"] = ["Psion"]
            rec["classesInferred"] = True

        if needs_review(r["bodyBlocks"] + r["higherBlocks"]):
            rec["review"] = True

        if r["book"] == "retia":
            for g in groups:
                if g not in RETIA_GROUPS and g not in RETIA_UNDOCUMENTED:
                    problems.append(f"undefined Retia group {g!r} on {r['name']} (p. {r['page']})")
        out.append(rec)

    # ---- dedup: Craft and Creation reprints Legends & Legacies -------------
    ll = {r["key"]: r for r in out if r["book"] in ("ll", "llb")}
    merged, cc_new = [], []
    for r in out:
        if r["book"] == "cc" and r["key"] in ll:
            # L&L is the later printing: it carries the magic-source tags and
            # the Spellblade class, neither of which existed for C&C. Keep the
            # L&L record and note the second printing on it.
            ll[r["key"]].setdefault("alsoIn", []).append(
                {"book": "cc", "bookTitle": r["bookTitle"], "page": r["page"]})
            continue
        if r["book"] == "cc":
            cc_new.append(r)
        merged.append(r)

    # ---- site keys ---------------------------------------------------------
    # ENTRIES is one flat namespace, so spells take an sp- prefix. Four names
    # are used by two different books for two genuinely different spells
    # (Electric Arc is an L&L cantrip and a 4th-level Retia spell), so a
    # collision takes the book as a suffix rather than one of them losing.
    seen = collections.Counter(r["key"] for r in merged)
    for r in merged:
        r["entryKey"] = "sp-" + r["key"] + ("-" + r["book"] if seen[r["key"]] > 1 else "")
    assert len({r["entryKey"] for r in merged}) == len(merged), "entry key collision"

    json.dump(merged, open(HERE / "roster.json", "w"), indent=1)

    # ---- report ------------------------------------------------------------
    by = collections.Counter(r["book"] for r in merged)
    print(f"roster: {len(merged)} spells  (from {len(out)} printed blocks)")
    for b in ("ll", "llb", "cc", "retia"):
        print(f"   {b:6} {by[b]:4}")
    print(f"   C&C reprints folded into L&L: {len(out) - len(merged)}")
    print(f"   C&C spells unique to that book: {len(cc_new)}")
    print("\n   " + ", ".join(sorted(r["name"] for r in cc_new)))

    print("\nmechanical facets")
    print("   levels :", dict(sorted(collections.Counter(r["level"] for r in merged).items())))
    print("   schools:", dict(collections.Counter(r["school"] for r in merged).most_common()))
    cls = collections.Counter(c for r in merged for c in r["classes"])
    print("   classes:", dict(cls.most_common()))
    print("   untagged by class (all Retia):",
          sum(1 for r in merged if not r["classes"]),
          "| of which Retia:", sum(1 for r in merged if not r["classes"] and r["book"] == "retia"))

    print("\ndescriptive facets")
    print("   magic source:", dict(collections.Counter(
        s for r in merged for s in r["magicSource"]).most_common()))
    print("   Retia groups:", dict(collections.Counter(
        g for r in merged for g in r["groups"]).most_common()))
    print(f"   legacy {sum(r['legacy'] for r in merged)} · blood magic "
          f"{sum(r['bloodMagic'] for r in merged)} · ritual {sum(r['ritual'] for r in merged)}"
          f" · concentration {sum(r['concentration'] for r in merged)}")

    rev = [r for r in merged if r.get("review")]
    print(f"\nflagged for a human eye — boxed stat blocks absorbed into the prose: {len(rev)}")
    for r in rev:
        print(f"    {r['book']:5} p.{r['page']:4} {r['name']}")

    if problems:
        print("\nreported, not guessed:")
        for p in problems:
            print("   ", p)


if __name__ == "__main__":
    main()
