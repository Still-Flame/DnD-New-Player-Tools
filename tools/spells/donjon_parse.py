#!/usr/bin/env python3
"""Turn the harvested donjon records into roster-shaped entries.

Where this text comes from, and why it is trusted more than the scan
----------------------------------------------------------------------
The PHB PDF in this project is a page image with an OCR layer beneath it. The
picture is legible; the text layer is not — it reads 1 as l, drops letters, and
bleeds one spell's block into the next. tools/spells/phb.py extracted it and
got 26% of spells clean, which is not good enough to publish as the book's own
words.

donjon.bin.sh serves the same spells as structured text over an rpc endpoint.
It is typed, not scanned, so there is no OCR fault to repair. It also draws a
line this project has to draw anyway: full text only for what SRD 5.2.1
releases under CC BY 4.0, and nothing for the rest. 338 of the 391 PHB spells
come with text; 53 come as metadata only, and this parser keeps them as cards
with no effect text rather than filling the gap from memory.

The scan is still useful, just not as the source: phb_cross.py diffs every
stat line here against the scan's own reading, so each die, range and duration
has two independent readings behind it.

What the source text looks like
-------------------------------
reStructuredText, hard-wrapped at about 80 columns:

    ========
    Fireball
    ========

    *Level 3 Evocation (Sorcerer, Wizard)*

    :Casting Time: Action
    :Range: 150 feet
    ...

    A bright streak flashes from you to a point you choose within range and then
    blossoms with a low roar into a fiery explosion. ...

    **Using a Higher-Level Spell Slot.** The damage increases by 1d6 for each
    spell slot level above 3.

Plus RST grid tables, bullet lists, and — for the four summoning spells that
print one — a creature stat block under a ``----`` underlined heading.

Two things are taken from the prose rather than from the record's own fields:

* the class list. donjon's ``cls`` field merges every source it knows, so it
  puts Artificer on 79 spells that the 2024 PHB does not. The italic type line
  is the book's own printed line. Across all 338 spells with text, every single
  disagreement between the two was exactly this — donjon having Artificer where
  the book's line does not. Nothing else differed. So the 53 spells with no
  prose take ``cls`` minus Artificer, on 338 confirmations of that one rule.

* the components. The ``cp`` field is a code ("VSMgp"), while the
  ``:Components:`` line carries the material in full.
"""
import json, re, sys, collections
from pathlib import Path

HERE = Path(__file__).parent
SRC = HERE / "donjon" / "phb.json"
OUT = HERE / "donjon" / "phb_roster.json"

# Artificer is not a class in the 2024 Player's Handbook. It reaches these
# records from donjon's cross-source index, not from the book. See the module
# docstring: 338 spells' own printed class lines confirm the rule.
NOT_IN_PHB = {"Artificer"}

SCHOOLS = {"Abjuration", "Conjuration", "Divination", "Enchantment",
           "Evocation", "Illusion", "Necromancy", "Transmutation"}

# ``*Level 3 Evocation (Sorcerer, Wizard)*`` or ``*Evocation Cantrip (...)*``
TYPELINE = re.compile(
    r"^\*(?:Level (\d) )?([A-Z][a-z]+)(?: Cantrip)? \(([^)]*)\)\*\s*$", re.M)
META = re.compile(r"^:([A-Za-z ]+):\s*(.*)$")
RULE = re.compile(r"^(=+|-{3,})$")
TBL_RULE = re.compile(r"^\+[-=+]+\+$")
BOLD_LEAD = re.compile(r"^\*\*(.+?)\.?\*\*\s*(.*)$", re.S)

# The lead-ins the 2024 books use for the upcast rule. The page keeps these in
# their own "At Higher Levels" section, as it does for the homebrew books.
HIGHER_LEADS = {"Using a Higher-Level Spell Slot", "Cantrip Upgrade"}

# Four records arrive damaged. Each repair below was settled by looking at the
# page image in the PDF — not from memory, and not from the OCR text layer,
# which is what phb_cross.py flagged them with.
#
# Divine Smite's Range line runs straight into its component line,
# ':Range: Self**Component:** V'. Both values are present in the string, just
# unseparated; the book's card prints them as two lines.
REPAIRS_META = {
    "Divine Smite": {"Range": "Self", "Components": "V"},
}

# '4d1' is not a die. phb_cross.py's die-size check caught both of these; the
# OCR layer reads 4d12 in both places, and the page image at 400 dpi shows
# '4d12 plus your spellcasting ability modifier' in both. The SRD text this
# came from has lost the 2.
# The pattern is matched against the wrapped source, so it must not span a
# line break. Each is required to hit exactly once, so a repair cannot quietly
# widen or stop applying.
REPAIRS_TEXT = {
    "Mordenkainen's Sword": [(r"\b4d1\b", "4d12")],
    "Conjure Celestial":    [(r"\b4d1\b", "4d12")],
}

# donjon's index name is the book's name — the page image confirms the 2024
# PHB still prints the wizards' names ('MORDENKAINEN'S FAITHFUL HOUND',
# 'EVARD'S BLACK TENTACLES'), while the text body carries the SRD's de-named
# form ('Faithful Hound'), because the SRD strips those names as trademarks.
# Two of donjon's index names are misspelled against the book's own heading.
REPAIRS_NAME = {
    "Nystul's Magic Arua": "Nystul's Magic Aura",          # scan: NYSTUL'S MAGIC AURA
    "Otto's Irresistable Dance": "Otto's Irresistible Dance",  # scan: OTTO'S IRRESISTIBLE DANCE
}


def unwrap(lines):
    """Join a hard-wrapped paragraph back into one line.

    The source wraps at about 80 columns, so a line break inside a sentence
    means nothing. A hyphen at a break is kept: the source hyphenates nothing
    itself, so every hyphen present is the book's own ('20-foot-radius').
    """
    out = " ".join(l.strip() for l in lines if l.strip())
    return re.sub(r"\s+", " ", out).strip()


def inline(s):
    """Strip reStructuredText emphasis, keeping every word.

    The source italicises cross-referenced spell names (*Dispel Magic*) and the
    stat block's cue labels (*Hit:*), and bolds section lead-ins. The page
    escapes all text before rendering and marks dice and glossary terms itself,
    so emphasis markers would show up as literal asterisks. They are removed;
    no word is changed. What is lost is the roman/italic distinction, which is
    typography rather than wording.
    """
    s = s.replace("\\*", "\x00")
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"\*(.+?)\*", r"\1", s)
    # the source writes em dashes as a double hyphen
    s = s.replace("--", "—")
    return s.replace("\x00", "*").strip()


def parse_table(lines):
    """An RST grid table -> a list of rows, each a list of cells.

    Grid tables draw every border, so the content lines are the ones starting
    with a pipe and the rules are discarded. A cell wrapped across two content
    lines is joined; the header separator (``+===+``) is not treated specially
    because the page styles the first row as the header anyway.
    """
    rows, cur = [], None
    for l in lines:
        s = l.strip()
        if TBL_RULE.match(s):
            if cur:
                rows.append([inline(unwrap([c])) for c in cur])
                cur = None
            continue
        if not s.startswith("|"):
            continue
        cells = [c.strip() for c in s.strip("|").split("|")]
        if cur is None:
            cur = cells
        elif len(cells) == len(cur):
            cur = [(a + " " + b).strip() for a, b in zip(cur, cells)]
    if cur:
        rows.append([inline(unwrap([c])) for c in cur])
    return [r for r in rows if any(c for c in r)]


def blockify(lines):
    """The prose after the meta run -> the page's block list.

    Block kinds, matching what src/spells/index.html renders:
      ["p",  text]           a paragraph
      ["pb", lead, text]     a paragraph with the book's bold lead-in
      ["li", text]           one item of a bullet list
      ["tbl", [row, ...]]    a table, kept as rows
      ["h",  text]           a sub-heading (a stat block's name, 'Actions')
      ["sb", label, value]   a stat block's :AC:/:HP:/:Speed: line
    """
    blocks, buf, i, n = [], [], 0, len(lines)

    def flush():
        if not buf:
            return
        text = unwrap(buf)
        buf.clear()
        if not text:
            return
        m = BOLD_LEAD.match(text)
        if m and m.group(2).strip():
            blocks.append(["pb", inline(m.group(1)), inline(m.group(2))])
        elif m:
            blocks.append(["h", inline(m.group(1))])
        else:
            blocks.append(["p", inline(text)])

    while i < n:
        raw, s = lines[i], lines[i].strip()

        if not s:
            flush()
            i += 1
            continue

        # a table: gather from its first rule to its last
        if TBL_RULE.match(s):
            flush()
            j = i
            while j < n and (TBL_RULE.match(lines[j].strip())
                             or lines[j].strip().startswith("|")):
                j += 1
            rows = parse_table(lines[i:j])
            if rows:
                blocks.append(["tbl", rows])
            i = j
            continue

        # a stat block meta line
        m = META.match(s)
        if m:
            flush()
            blocks.append(["sb", m.group(1), inline(m.group(2))])
            i += 1
            continue

        # a heading underlined by ---- (above it, RST over-line style, or below)
        if RULE.match(s):
            flush()
            if i + 2 < n and RULE.match(lines[i + 2].strip()):
                blocks.append(["h", inline(lines[i + 1].strip())])
                i += 3
            else:
                i += 1
            continue
        if i + 1 < n and RULE.match(lines[i + 1].strip()) and not RULE.match(s):
            flush()
            blocks.append(["h", inline(s)])
            i += 2
            continue

        # a bullet: '- text', continued by deeper-indented lines
        if re.match(r"^[-*+]\s+\S", s):
            flush()
            item = [re.sub(r"^[-*+]\s+", "", s)]
            i += 1
            while i < n and lines[i].strip() and not re.match(r"^[-*+]\s+\S", lines[i].strip()) \
                    and (len(lines[i]) - len(lines[i].lstrip())) >= 2:
                item.append(lines[i])
                i += 1
            blocks.append(["li", inline(unwrap(item))])
            continue

        buf.append(raw)
        i += 1

    flush()
    return blocks


def split_higher(blocks):
    """Lift the upcast rule into its own section, as the homebrew records do.

    Only a 'pb' block whose lead is one of the book's upcast lead-ins moves,
    and only from the spell's own text — never from inside a stat block, where
    'Using a Higher-Level Spell Slot' refers to the block's own scaling. The
    first sub-heading ends the spell's text, so nothing after it is touched.
    """
    end = next((i for i, b in enumerate(blocks) if b[0] == "h"), len(blocks))
    body, higher = [], []
    for i, b in enumerate(blocks):
        if i < end and b[0] == "pb" and b[1] in HIGHER_LEADS:
            higher.append(b)
        else:
            body.append(b)
    return body, higher


def parse_one(rec):
    """One donjon record -> one roster entry, or a reason it could not be."""
    name = REPAIRS_NAME.get(rec["n"], rec["n"])
    page = None
    m = re.search(r"(\d+)", rec.get("src", ""))
    if m:
        page = int(m.group(1))

    out = {
        "name": name, "book": "phb", "page": page,
        "concentration": bool(rec.get("con")), "ritual": bool(rec.get("rit")),
        "srdAlias": rec.get("srd") or None,
    }

    desc = rec.get("desc", "")
    for pat, new in REPAIRS_TEXT.get(name, []):
        desc, n = re.subn(pat, new, desc)
        if n != 1:
            raise SystemExit(f"{name}: the repair {pat!r} matched {n} times, not "
                             f"once — recheck it against the page before trusting it")
    if not desc.strip():
        # metadata only: SRD 5.2.1 does not release this spell's text, so the
        # page shows the stat line and says so rather than paraphrasing.
        lvl = 0 if rec["lvl"] == "Cantrip" else int(re.match(r"(\d)", rec["lvl"]).group(1))
        out.update({
            "level": lvl, "school": rec["sch"],
            "classes": sorted(set(rec["cls"]) - NOT_IN_PHB),
            "classSource": "donjon index, minus Artificer",
            "castingTime": rec["ct"], "range": rec["rg"],
            "components": None, "componentsCode": rec["cp"],
            "duration": rec["du"],
            "bodyBlocks": [], "higherBlocks": [], "textless": True,
        })
        return out, None

    lines = desc.split("\n")

    # the title, set between two === rules
    ti = next((i for i, l in enumerate(lines) if RULE.match(l.strip())), None)
    if ti is None or ti + 1 >= len(lines):
        return None, "no title rule"
    title = lines[ti + 1].strip()

    tm = TYPELINE.search(desc)
    if not tm:
        return None, "no type line"
    level = int(tm.group(1)) if tm.group(1) else 0
    school = tm.group(2)
    if school not in SCHOOLS:
        return None, f"unknown school {school!r}"
    classes = sorted({c.strip() for c in tm.group(3).split(",") if c.strip()})

    # the meta run: the four ':Label: value' lines directly under the type line
    start = desc[:tm.end()].count("\n") + 1
    meta, i = {}, start
    while i < len(lines):
        s = lines[i].strip()
        if not s:
            i += 1
            if meta:
                break
            continue
        m = META.match(s)
        if not m:
            break
        label, val = m.group(1), m.group(2)
        # a wrapped meta value continues on the next indented, unlabelled line
        j = i + 1
        while j < len(lines) and lines[j].strip() and not META.match(lines[j].strip()) \
                and lines[j].startswith(" "):
            val += " " + lines[j].strip()
            j += 1
        meta[label] = inline(re.sub(r"\s+", " ", val).strip())
        i = j
    for label, val in REPAIRS_META.get(name, {}).items():
        meta[label] = val

    missing = [k for k in ("Casting Time", "Range", "Duration") if k not in meta]
    if missing:
        return None, "missing meta: " + ", ".join(missing)

    body, higher = split_higher(blockify(lines[i:]))
    if not body:
        return None, "no prose"

    out.update({
        "level": level, "school": school, "classes": classes,
        "classSource": "the book's printed type line",
        "castingTime": meta["Casting Time"], "range": meta["Range"],
        "components": meta.get("Components"), "componentsCode": rec["cp"],
        "duration": meta["Duration"],
        "bodyBlocks": body, "higherBlocks": higher, "textless": False,
        "titleInText": title,
    })
    return out, None


def main():
    recs = json.load(open(SRC))
    good, bad = [], []
    for r in recs:
        p, why = parse_one(r)
        (good.append(p) if p else bad.append((r["n"], why)))

    # every spell keeps its own page number, so a name collision with a
    # homebrew spell is resolved in the emitter, not here
    seen = collections.Counter(g["name"] for g in good)
    dupes = [n for n, c in seen.items() if c > 1]

    # The title inside the text must be the name we filed it under — unless it
    # is the SRD's de-named form of it, which the record announces in its 'srd'
    # field. SRD 5.2.1 strips the wizards' names as trademarks, so its text
    # calls Evard's Black Tentacles just 'Black Tentacles'. The book's own
    # heading, read off the page image, keeps the wizard: the entry is filed
    # under the book's name and the SRD name is kept as a search alias.
    renamed = [(g["name"], g["titleInText"]) for g in good
               if not g["textless"] and g["titleInText"] == g["srdAlias"]]
    mismatch = [(g["name"], g["titleInText"]) for g in good
                if not g["textless"] and g["titleInText"] != g["name"]
                and g["titleInText"] != g["srdAlias"]]

    withtext = [g for g in good if not g["textless"]]
    blocks = collections.Counter(b[0] for g in good
                                 for b in g["bodyBlocks"] + g["higherBlocks"])

    print(f"{len(recs)} donjon records -> {len(good)} parsed, {len(bad)} rejected")
    print(f"  with full text : {len(withtext)}")
    print(f"  stat line only : {len(good) - len(withtext)}")
    print(f"  blocks         : {dict(blocks)}")
    print(f"  levels         : {dict(sorted(collections.Counter(g['level'] for g in good).items()))}")
    print(f"  no upcast rule : {sum(1 for g in withtext if not g['higherBlocks'])}")
    print(f"  SRD renamed    : {len(renamed)} (filed under the book's name, "
          f"SRD name kept as a search alias)")
    if dupes:
        print(f"  DUPLICATE NAMES: {dupes}")
    if mismatch:
        print(f"  TITLE MISMATCH: {mismatch}")
    if bad:
        print("\nrejected — each of these would have to be checked by hand:")
        for n, why in bad:
            print(f"  {n:34} {why}")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    json.dump(good, open(OUT, "w"), ensure_ascii=False, indent=1)
    print(f"\nwrote {OUT.relative_to(HERE.parents[1])}")
    return 1 if (bad or dupes or mismatch) else 0


if __name__ == "__main__":
    sys.exit(main())
