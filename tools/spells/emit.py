#!/usr/bin/env python3
"""Third stage: roster.json -> src/spells/spells.js, the page's only data file.

Keys are short because there are 589 of them and this file is downloaded whole;
the page maps them back to names in one place. Nothing is summarised here — the
prose is the books' own text, split into the paragraphs and lists they set.
"""
import json, re
from pathlib import Path

HERE = Path(__file__).parent
OUT = HERE.parent.parent / "src" / "spells" / "spells.js"

BOOKS = {
    "ll":    {"t": "Legends & Legacies",     "s": "Kibbles' Compendium of Legends & Legacies"},
    "llb":   {"t": "Legends & Legacies",     "s": "Kibbles' Compendium of Legends & Legacies — Blood Magic"},
    "cc":    {"t": "Craft and Creation",     "s": "Kibbles' Compendium of Craft and Creation"},
    "retia": {"t": "Lyre's Guide to Retia",  "s": "Lyre's Guide to Retia — Land of Industry"},
    "phb":   {"t": "Player's Handbook",      "s": "Player's Handbook (2024)", "official": 1},
}

SCHOOL_ABBR = {"Abjuration": "ABJ", "Conjuration": "CON", "Divination": "DIV",
               "Enchantment": "ENC", "Evocation": "EVO", "Illusion": "ILL",
               "Necromancy": "NEC", "Transmutation": "TRA", "Psionic": "PSI"}

# CC BY 4.0 requires this statement word for word from anyone who uses the
# material. The page carries it in full; the wording is not ours to shorten.
# Source: the licence page of SRD 5.2.1 itself.
SRD_NOTICE = (
    'This work includes material from the System Reference Document 5.2.1 '
    '("SRD 5.2.1") by Wizards of the Coast LLC, available at '
    'https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the '
    'Creative Commons Attribution 4.0 International License, available at '
    'https://creativecommons.org/licenses/by/4.0/legalcode.'
)

# Retia's eleven spell groups, from the book's own Spell Groups section
# (pp. 530-533). Two of them carry rules that change how their spells work at
# the table, so each group is {d: what it is, rules: [{n, d}, ...]}.
#
# These replace one-line blurbs written earlier from the group names alone.
# One of those blurbs invented a rule outright — it claimed eidomancy spells
# "hit harder than their level suggests; treat them as a tier above", which the
# book nowhere says. What eidomancy actually has is Eidomancy Burn, below.
GROUPS = {
    "Altissima-Cor’s Arcane Arts": {"d":
        "Arcane spells created by the eidolos Altissima-Cor of the Smothering "
        "Depths, a servant of the Eidolon Marrias who had been a prolific "
        "sorceress before her elevation. They tap her cosmic shard and her "
        "power over ice. Her teachings passed to those who aided her work as "
        "record-keeper for the Eidolons, keeping the old world buried."},

    "Blood of Cineris": {"d":
        "Arcane arts built on the magmatic blood of Cineris Clade by the "
        "Congression that experimented with it. Those who consumed it or "
        "branded themselves with it drew on that connection. The Congression "
        "guards these spells closely and treats their theft as sacrilege, "
        "though others do acquire the power by other means."},

    "Chromatic Convocation": {"d":
        "Spells conceived by an ancient goddess of evil dragons, kept largely "
        "secret. Ancient dragons were unusually sensitive to eidomantic "
        "radiation, and these were built on the same principles as eidomancy "
        "but draw on their creator's essence instead. Known mostly to abishai, "
        "her servants, and the Talons of Azharul who succeeded her.",
     "rules": [
        {"n": "Chromatic Energy", "d":
         "Chromatic energy or chromatic damage means a choice of fire, cold, "
         "acid, lightning or poison. You pick one when you cast, and it applies "
         "to every mention of chromatic energy in that casting. Some spells use "
         "several of the five, or all of them. A spell can also be learned tied "
         "to one type — 'Archfiend Step (Fire)' — and then only casts as that."},
        {"n": "Soul Burn", "d":
         "Casting any Chromatic Convocation spell calls for a spellcasting "
         "ability check, DC 10 + the spell's level. On a failure your maximum "
         "hit points drop by twice the spell's level until you finish a long "
         "rest, and nothing short of wish or divine intervention undoes it. A "
         "caster's spellcasting trait may exempt them from these checks."},
     ]},

    "Daemoturgy": {"d":
        "Spells derived from the natural powers, curses and qualities of "
        "fiends — some granted to the servants of greater fiends, others "
        "codified by wizards and sorcerers who dabble in the demonic arts. "
        "Widely held to be taboo, frowned on by most religions, and held in "
        "particular disdain by the Academy."},

    "Eidomancy": {"d":
        "An ancient and difficult magic that harnesses eidomantic radiation "
        "directly, producing powerful but volatile effects. Developed by "
        "Vestias and passed to the arcanists of her time to retake magic from "
        "the Grand Primaries. It fell out of use once the eidomantic web made "
        "safer casting possible — modern magic still draws on ambient "
        "radiation, but converts it quite differently, trading explosive power "
        "for control.",
     "rules": [
        {"n": "Eidolic Energy", "d":
         "All damage from an eidomancy spell counts as eidolic."},
        {"n": "Eidomancy Burn", "d":
         "Eidomancy can hurt the caster. After casting, make an eidomantic "
         "check — a Constitution saving throw, DC 10 + the level it was cast "
         "at + the number of turns after the first you held concentration on "
         "it. A non-concentration spell is checked immediately. On a failure "
         "you take exhaustion equal to half the spell's level (round down, "
         "minimum 1) and cannot cast that spell again for seven days. If the "
         "failure would take you to exhaustion 6, you are set to 5 and dropped "
         "to 0 hit points instead."},
        {"n": "Arcane Reinforcement", "d":
         "If you fail a concentration check on an eidomancy spell, you may use "
         "your reaction to roll a d20 and use that in place of the d20 you "
         "rolled for the check."},
     ]},

    "Epic of Duality": {"d":
        "Spells granted by T'quinn to her subjects, plus many reverse-"
        "engineered from the songs and stories she gave to mankind. They work "
        "like songs, spoken and performed by those who follow her dogma, and "
        "several are named for chapters in the scripture that shares the "
        "group's name."},

    "Legacy of Gold": {"d":
        "Blessings drawn from Harros' heroic tales, given to his followers and "
        "to those who seek his power. Known chiefly to paladins and others who "
        "keep his dogma, and often mistaken for supernatural warfare."},

    "Nine Branch Arts": {"d":
        "Spells founded by Kitsune and used by the kits'adria who follow her. "
        "They are supernatural powers of hers that Luxus sublimated into a "
        "form mortals could cast — a gift to her devoted. Harnessing her "
        "divine flames, they run to environmental and personal control."},

    "Ossenheimer’s Memoirs": {"d":
        "Spells drawn from the memories and dreams of the Correfont "
        "Ossenheimer, once among the Old World's greatest arcanists. His "
        "knowledge of spells is seemingly endless; these are the handful that "
        "have reached modern mages."},

    "Sky-Keeper’s Arcana": {"d":
        "The private collection of Vestias, goddess of magic and the centre of "
        "the Eidomantic Web — spells she derived to warp the world to suit "
        "her. As she stands for lightning and sorcery alike, they run to both. "
        "The Academy treats even knowing them as heresy and will hunt and "
        "imprison anyone who practises them."},

    "Whisperwood Tome": {"d":
        "Spells created by Aymere for his followers among the capy'hado and "
        "minotaurs who serve him, focused on controlling and purifying the "
        "natural world. Druids the world over envy them."},

    # Used on fourteen spells; the Spell Groups section never defines it.
    "Skulker’s Grimoire": {"d":
        "Fourteen spells carry this tag, but the book's Spell Groups section "
        "does not define the group — there is no origin, list or rule for it "
        "anywhere in the chapter."},

    # Printed on Eviscerate (p. 554) and nowhere else. Left as printed rather
    # than corrected, because the book gives no way to tell which it meant.
    "Sky-Keeper’s Grimoire": {"d":
        "Printed on this one spell only, and on no other. The book's Spell "
        "Groups section defines no such group — most likely a misprint for "
        "Sky-Keeper's Arcana or Skulker's Grimoire, and the book does not say "
        "which."},
}


def blk(b):
    """['p'|'li', text] for prose; ['tbl', [row, ...]] for a table."""
    return [b["t"], b["rows"] if b["t"] == "tbl" else b["text"]]


def expand_components(code):
    """donjon's component code -> the letters the book prints.

    'VSMgp' means Verbal, Somatic and a Material component that costs gold.
    Only the letters are written out. The material itself is not invented: for
    the spells where donjon carries no text, it is simply not known here, and
    the card says so."""
    parts = [n for c, n in (("V", "V"), ("S", "S"), ("M", "M")) if c in (code or "")]
    return ", ".join(parts)


def load_phb():
    """donjon/phb_roster.json -> records shaped like the homebrew roster.

    Two kinds of entry come out of this. 338 carry the spell's full text,
    released under CC BY 4.0 as part of SRD 5.2.1. 53 carry only the stat line,
    because the SRD does not include them; those are marked tx=0 and the page
    prints what is missing and why rather than filling the gap.

    Every fact here has been read twice — see phb_cross.py, which checks each
    stat line against the book's own scanned pages and each page number against
    the heading printed on that page."""
    out = []
    for r in json.load(open(HERE / "donjon" / "phb_roster.json")):
        s = {
            "name": r["name"], "book": "phb", "page": r["page"],
            "level": r["level"], "school": r["school"],
            "schoolAbbr": SCHOOL_ABBR[r["school"]],
            "classes": r["classes"],
            "castingTime": r["castingTime"], "range": r["range"],
            "componentsRaw": r["components"] or expand_components(r["componentsCode"]),
            "duration": r["duration"],
            "bodyBlocks": r["bodyBlocks"], "higherBlocks": r["higherBlocks"],
            "concentration": r["concentration"], "ritual": r["ritual"],
            "legacy": False, "bloodMagic": False, "magicSource": [],
            "groups": [], "review": False, "alsoIn": [],
            "textless": r["textless"], "srdAlias": r["srdAlias"],
        }
        # a component code ending in 'gp' says the material has a gold cost;
        # that is all that is known for a spell with no text
        s["costlyComponent"] = bool(r["textless"] and "gp" in (r["componentsCode"] or ""))
        out.append(s)
    return out


def assign_keys(records):
    """sp-<name>, suffixed with the book when two books print the same name.

    Both sides get the suffix, so no entry silently keeps the bare key while
    its twin is renamed — a reader following one link would otherwise have no
    way to tell which printing they were looking at."""
    slug = lambda n: "sp-" + re.sub(r"[^a-z0-9]", "", n.lower())
    counts = {}
    for r in records:
        counts.setdefault(slug(r["name"]), set()).add(r["book"])
    for r in records:
        k = slug(r["name"])
        r["entryKey"] = k + ("-" + r["book"] if len(counts[k]) > 1 else "")


def main():
    R = json.load(open(HERE / "roster.json")) + load_phb()
    assign_keys(R)
    R.sort(key=lambda r: (r["name"].lower(), r["book"]))

    out = []
    for r in R:
        # the homebrew parser hands blocks over as dicts, the PHB parser as the
        # lists the page reads; normalise here rather than in two places
        norm = lambda bs: [b if isinstance(b, list) else blk(b) for b in bs]
        s = {
            "k": r["entryKey"], "n": r["name"], "l": r["level"],
            "s": r["school"], "sa": r["schoolAbbr"], "c": r["classes"],
            "bk": r["book"], "p": r["page"],
            "ct": r["castingTime"], "rg": r["range"],
            "cp": r["componentsRaw"], "d": r["duration"],
            "b": norm(r["bodyBlocks"]),
        }
        if r.get("textless"):
            s["tx"] = 0                       # no text: the SRD omits this spell
            if r.get("costlyComponent"):
                s["cgp"] = 1                  # its material component costs gold
        if r.get("srdAlias"):
            s["al"] = r["srdAlias"]           # searchable under the SRD's name too
        if r["higherBlocks"]:
            s["h"] = norm(r["higherBlocks"])
        if r.get("review"): s["rv"] = 1
        if r["concentration"]: s["con"] = 1
        if r["ritual"]:        s["rit"] = 1
        if r["legacy"]:        s["leg"] = 1
        if r["bloodMagic"]:    s["bm"] = 1
        if r["magicSource"]:   s["ms"] = r["magicSource"]
        if r["groups"]:        s["g"] = r["groups"]
        if r.get("classesInferred"): s["ci"] = 1
        if r.get("alsoIn"):
            s["also"] = [[a["book"], a["page"]] for a in r["alsoIn"]]
        out.append(s)

    payload = {"books": BOOKS, "groups": GROUPS, "spells": out, "srd": SRD_NOTICE}
    js = ("/* Spell Compendium — content, generated by tools/spells/emit.py.\n"
          "   Spell text is transcribed rather than summarised; paragraphs and\n"
          "   lists follow the printed page. The homebrew text is read from the\n"
          "   three PDFs; the Player's Handbook text is the SRD 5.2.1 release of\n"
          "   it, used under CC BY 4.0 — see the notice in this file's payload,\n"
          "   which the page prints in full. */\n"
          "window.SPELLDATA = " + json.dumps(payload, ensure_ascii=False,
                                             separators=(",", ":")) + ";\n")
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(js, encoding="utf-8")

    assert not re.search(r"(?i)dhruv|order\s*#\s*\d", js), "watermark leaked into spells.js"
    print(f"wrote {OUT.relative_to(OUT.parents[2])}  {len(out)} spells  "
          f"{len(js)/1024:.0f} KB")


if __name__ == "__main__":
    main()
