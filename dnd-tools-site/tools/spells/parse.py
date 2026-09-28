#!/usr/bin/env python3
"""
Block 1 of the spell compendium: turn three homebrew spell chapters into one
validated roster of structured records.

Each book needs its own reading, but they share a shape: a name line, a
level/school line, a run of labelled meta lines, then prose. The differences
are which labels use colons, whether classes are printed at all, and what the
parenthetical after the school means.

Nothing here writes site data. The output is a roster to check before any of
it gets written up.
"""
import json, re, sys
from pathlib import Path

HERE = Path(__file__).parent
SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment",
           "Evocation", "Illusion", "Necromancy", "Transmutation"]
SCH_RE = "|".join(SCHOOLS)

# Lines that are furniture, not content. The Retia watermark is a per-purchase
# mark carrying a real name and order number — it must never reach site data,
# so it is dropped here and asserted against later.
NOISE = [
    re.compile(r"dhruv\s+ravikumar", re.I),
    re.compile(r"Order\s*#\s*\d+", re.I),
    re.compile(r"^\s*\d{1,3}\s*$"),                  # bare folio
    # running headers: Retia letterspaces them, Kibbles uses pipes
    re.compile(r"^\s*Ch\s*a\s*p\s*te\s*r\b", re.I),
    re.compile(r"^\s*Spe\s*ll\s*s\s*&\s*M\s*agic\s*$", re.I),
    re.compile(r"\|"),
    re.compile(r"^\s*Chapter\s+\d+\s*$", re.I),
]

def is_noise(line):
    return any(p.search(line.strip()) for p in NOISE)


# ---------------------------------------------------------------- level/school

# Craft and Creation adds a ninth school of its own for Psion spells, and the
# book is inconsistent about the hyphen ('4th level evocation'). Capture any
# single word in the school slot and validate against this vocabulary after,
# so an unexpected school is reported rather than silently dropped.
KNOWN_SCHOOLS = {s.lower() for s in SCHOOLS} | {"psionic"}

def parse_kib_header(s):
    """Kibbles: '5th-level conjuration (arcane, primal)' / 'Evocation cantrip'"""
    m = re.match(r"^(\d)(?:st|nd|rd|th)[- ]level\s+([A-Za-z]+)\s*(?:\(([^)]*)\))?\s*$", s, re.I)
    if m and m.group(2).lower() in KNOWN_SCHOOLS:
        return int(m.group(1)), m.group(2).title(), m.group(3) or ""
    m = re.match(r"^([A-Za-z]+)\s+cantrip\b\s*(?:\(([^)]*)\))?\s*$", s, re.I)
    if m and m.group(1).lower() in KNOWN_SCHOOLS:
        return 0, m.group(1).title(), m.group(2) or ""
    return None

def parse_retia_header(s):
    """Retia: '2nd-level Evocation spell (Legacy)' / 'Evocation Cantrip (Legacy)'"""
    # 'spell' is optional: Arcane Lucubration (p. 536) omits it.
    m = re.match(r"^(\d)(?:st|nd|rd|th)[- ]level\s+([A-Za-z]+)(?:\s+spell)?\s*(?:\(([^)]*)\))?\s*$", s, re.I)
    if m and m.group(2).lower() in KNOWN_SCHOOLS:
        return int(m.group(1)), m.group(2).title(), m.group(3) or ""
    m = re.match(r"^([A-Za-z]+)\s+Cantrip\s*(?:\(([^)]*)\))?\s*$", s, re.I)
    if m and m.group(1).lower() in KNOWN_SCHOOLS:
        return 0, m.group(1).title(), m.group(2) or ""
    return None


# ---------------------------------------------------------------- meta lines

# Kibbles writes 'Casting Time: 1 action'; Retia drops the colon.
META = ["Casting Time", "Range", "Components", "Duration", "Classes"]
def meta_key(line):
    for k in META:
        m = re.match(r"^%s\s*:?\s+(.*)$" % re.escape(k), line)
        if m:
            return k, m.group(1).strip()
    return None, None


def rec_tail(rec, key):
    return rec["classes"] if key == "Classes" else rec[
        {"Casting Time": "castingTime", "Range": "range",
         "Components": "components", "Duration": "duration"}[key]]


# Typos in the printed class lists. Each was read back against the page before
# being listed here; they are the book's errors, corrected, not guesses.
CLASS_FIX = {
    "Rangers": "Ranger",              # L&L p. 232, Gale Shot
    "Occutlist": "Occultist",         # C&C p. 140, Mutate
    "Spellblade Sorcerer": "Spellblade, Sorcerer",   # L&L p. 235, missing comma
    "Ranger Sorcerer": "Ranger, Sorcerer",           # L&L p. 267, missing comma
    "Inventor Occultist": "Inventor, Occultist",     # L&L p. 268, missing comma
}

# Every caster these three books print a spell list for. Anything outside this
# set is a parse failure or a new typo, and gets reported rather than filed.
KNOWN_CLASSES = {"Bard", "Cleric", "Druid", "Inventor", "Occultist", "Paladin",
                 "Ranger", "Sorcerer", "Spellblade", "Warlock", "Wizard"}

def normalise_class(c):
    c = re.sub(r"\s+", " ", c).strip(" .,")
    return CLASS_FIX.get(c, c)


def read(path, page_offset):
    """Yield (pdf_page, printed_page, line) with furniture dropped.

    Blank lines survive: they are the only record of where one paragraph ends
    and the next begins, which matters now that spell text is transcribed
    rather than summarised. A lone bullet glyph is joined to the line it
    belongs to — Retia sets those on their own line.
    """
    page, pending_bullet = None, False
    for raw in Path(path).read_text(encoding="utf-8", errors="replace").splitlines():
        if raw.startswith("@@PAGE "):
            page = int(raw.split()[1]); continue
        if is_noise(raw):
            continue
        line = raw.rstrip()
        if re.fullmatch(r"\s*[•·]\s*", line):
            pending_bullet = True
            continue
        if pending_bullet and line.strip():
            line = "• " + line.strip()
            pending_bullet = False
        yield page, (page - page_offset if page else None), line


SENTENCE_END = re.compile(r"[.!?:;”’\"')\]]\s*$")

def join(parts):
    out = ""
    for p in parts:
        p = p.strip()
        if not out:
            out = p
        elif out.endswith("-") and not out[-2:-1].isdigit():
            out = out[:-1] + p              # word hyphenated across the wrap
        elif out.endswith("-"):
            out = out + p                   # a real hyphen: '10-' + 'foot radius'
        else:
            out += " " + p
    return re.sub(r"\s+", " ", out).strip()


def to_blocks(raw_lines):
    """Turn a run of wrapped source lines into paragraphs and list items.

    Transcription needs the paragraphing the books actually set, and the two
    publishers mark it differently. Kibbles indents the first line of a new
    paragraph, which `pdftotext -layout` preserves exactly — that is the
    reliable signal. Retia indents nothing, so its only clue is a short last
    line in justified text, which is a good guess rather than a fact; the worst
    case there is two paragraphs running together, never wrong rules.

    A blank line breaks a paragraph only when the text before it finished a
    sentence — otherwise it is a column or page break landing mid-sentence.
    """
    lines = [l for l in raw_lines]
    filled = [l for l in lines if l.strip()]
    if not filled:
        return []
    base = min(len(l) - len(l.lstrip()) for l in filled)
    width = max(len(l.strip()) for l in filled)

    blocks, cur, kind = [], [], "p"
    def flush():
        if cur:
            if kind == "tbl":
                blocks.append({"t": "tbl", "rows": [re.split(r"\s{2,}", x.strip()) for x in cur]})
            else:
                blocks.append({"t": kind, "text": join(cur)})
            cur.clear()

    # A table row shows its column gutters in -layout output: either several
    # gaps of two spaces or one wide gap. Joined into a paragraph these read as
    # gibberish ('d8 Damage Type 1 Acid 2 Cold…'), so they are kept as rows.
    # One such line on its own is prose that happened to be spaced oddly, so a
    # table has to be at least two consecutive rows.
    def rowish(l):
        s = l.strip()
        if not s or s.startswith("•"):
            return False
        return len(re.findall(r"\S {2,}\S", l)) >= 2 or bool(re.search(r"\S {3,}\S", l))
    istbl, run = [False] * len(lines), 0
    for i in range(len(lines) + 1):
        if i < len(lines) and rowish(lines[i]):
            run += 1
        else:
            if run >= 2:
                for j in range(i - run, i):
                    istbl[j] = True
            run = 0

    # Indentation is read against the current column, not the whole passage. A
    # spell that runs over a column break lands its remainder at a completely
    # different indent, and measuring everything against one global baseline
    # turns every line after the break into its own paragraph.
    col_base = next((len(l) - len(l.lstrip()) for l in filled), 0)
    bullet_indent = None

    for i, l in enumerate(lines):
        s = l.strip()
        if istbl[i]:
            if kind != "tbl":
                flush(); kind = "tbl"
            cur.append(l)
            continue
        if kind == "tbl":
            flush(); kind = "p"
        if not s:
            if cur and SENTENCE_END.search(cur[-1]):
                flush(); kind = "p"
            continue
        indent = len(l) - len(l.lstrip())

        if s.startswith("•"):
            flush(); kind = "li"
            bullet_indent = indent
            cur.append(s.lstrip("•").strip())
            continue
        if kind == "li":
            if cur and bullet_indent is not None and indent > bullet_indent:
                cur.append(s); continue        # wrapped line of the same bullet
            flush(); kind = "p"; bullet_indent = None

        d = indent - col_base
        if d < 0 or d > 8:
            col_base = indent                  # the column changed, not the paragraph
            d = 0
        # a first-line indent, or a short line before this one, opens a paragraph
        short_before = cur and len(cur[-1].rstrip()) < width * 0.82 \
                           and SENTENCE_END.search(cur[-1])
        if cur and (d >= 1 or short_before):
            flush(); kind = "p"
        cur.append(s)
    flush()
    return [b for b in blocks if b.get("text") or b.get("rows")]


HDR_START = re.compile(r"^(?:\d(?:st|nd|rd|th)[- ]level\b|[A-Za-z]+\s+cantrip\b)", re.I)

def mend_headers(lines):
    """Glue a level/school line back together when its tag list wrapped.

    Retia p. 568 sets '7th-level Conjuration spell (Legacy, Ossenheimer's Mem-'
    / 'oirs)'. Unmended, the spell has no header and vanishes silently, which is
    exactly the kind of loss the coverage audit exists to catch.
    """
    out, i = [], 0
    while i < len(lines):
        pdfp, prp, l = lines[i]
        s = l.strip()
        # A line already ending in ')' is complete even if the parens do not
        # balance — Retia p. 534 sets a doubled '( (' that would otherwise pull
        # the Casting Time line up into the header.
        if HDR_START.match(s) and s.count("(") > s.count(")") and not s.endswith(")"):
            j = i + 1
            while j < len(lines) and not lines[j][2].strip():
                j += 1
            if j < len(lines):
                tail = lines[j][2].strip()
                glued = (s[:-1] + tail) if s.endswith("-") else (s + " " + tail)
                out.append((pdfp, prp, glued))
                i = j + 1
                continue
        out.append((pdfp, prp, l))
        i += 1
    return out


def parse(path, book, page_offset, header_fn, name_max=46):
    lines = mend_headers(list(read(path, page_offset)))
    # index every line that opens a spell, so a block ends where the next begins
    starts = []
    for i, (pdfp, prp, l) in enumerate(lines):
        h = header_fn(l.strip())
        if not h:
            continue
        # the name is the nearest preceding line that looks like a title
        j = i - 1
        while j >= 0:
            cand = lines[j][2].strip()
            if cand:
                break
            j -= 1
        else:
            continue
        if not cand or len(cand) > name_max:
            continue
        if meta_key(cand)[0] or header_fn(cand):
            continue
        starts.append((j, i, cand, h))

    out = []
    for n, (namei, hdri, name, (lvl, school, paren)) in enumerate(starts):
        end = starts[n + 1][0] if n + 1 < len(starts) else len(lines)
        rec = {
            "book": book, "name": name.strip(), "level": lvl, "school": school,
            "paren": paren.strip(), "page": lines[namei][1], "pdfPage": lines[namei][0],
            "castingTime": "", "range": "", "components": "", "duration": "",
            "classes": "", "body": [], "higher": [],
        }
        # Both books print the meta run contiguously and end it with Duration.
        # Long values wrap, and a wrapped line carries no label — so inside the
        # run an unlabelled line belongs to the label above it. Without this the
        # tail of a wrapped Classes line ('…, Spellblade Sorcerer,\nWizard') is
        # lost and Wizard silently drops off the spell.
        FIELD = {"Casting Time": "castingTime", "Range": "range",
                 "Components": "components", "Duration": "duration"}
        body, higher, in_higher = [], [], False
        last, seen_duration, in_meta = None, False, True
        for k in range(hdri + 1, end):
            src = lines[k][2]           # indentation is the paragraph signal
            l = src.strip()
            if not l:
                if in_meta:
                    continue            # the meta run has no blank lines of its own
                (higher if in_higher else body).append("")
                continue
            key, val = meta_key(l)
            if in_meta and key:
                last = key
                if key == "Classes":
                    rec["classes"] = val
                else:
                    rec[FIELD[key]] = val
                seen_duration = seen_duration or key == "Duration"
                continue
            if in_meta and last and not seen_duration:
                glue = "" if rec_tail(rec, last).endswith("-") else " "
                if last == "Classes":
                    # a class list wraps on a separator, and the comma is not
                    # always reprinted ('…, Spellblade\nWarlock'). No class name
                    # in these books is two words, so a bare wrap is a comma.
                    tail = rec["classes"].rstrip()
                    rec["classes"] = tail + ("" if tail.endswith(",") else ",") + " " + l
                else:
                    rec[FIELD[last]] = rec[FIELD[last]].rstrip() + glue + l
                continue
            in_meta = False
            if re.match(r"^At Higher Levels\b", l):
                in_higher = True
            (higher if in_higher else body).append(src)

        fixed = ", ".join(normalise_class(c) for c in rec["classes"].split(",") if c.strip())
        rec["classes"] = [c.strip() for c in fixed.split(",") if c.strip()]
        rec["bodyBlocks"] = to_blocks(body)
        rec["higherBlocks"] = to_blocks(higher)
        rec["body"] = " ".join(b.get("text", "") for b in rec["bodyBlocks"])
        rec["higher"] = " ".join(b.get("text", "") for b in rec["higherBlocks"])
        out.append(rec)
    return out


def main():
    books = [
        ("ll",    "ll_spells.txt", "Legends & Legacies",  0,  parse_kib_header),
        ("llb",   "ll_blood.txt",  "Legends & Legacies",  0,  parse_kib_header),
        ("cc",    "cc_spells.txt", "Craft and Creation",  1,  parse_kib_header),
        ("retia", "re_spells.txt", "Lyre's Guide to Retia", 10, parse_retia_header),
    ]
    all_recs, gaps = [], []
    for key, fn, title, off, hdr in books:
        recs = parse(HERE / fn, key, off, hdr)
        for r in recs:
            r["bookTitle"] = title
        # coverage audit: a 'Casting Time' line is a spell, so any that did not
        # land in a record is a spell this parser lost. Silence here is the
        # whole point of the pass.
        raw = (HERE / fn).read_text(encoding="utf-8", errors="replace")
        ct = len(re.findall(r"^[ \t]*Casting Time", raw, re.M))
        if ct != len(recs):
            gaps.append((key, ct, len(recs)))
        print(f"{key:6} {len(recs):4} spells  (pages {min(r['page'] for r in recs)}"
              f"–{max(r['page'] for r in recs)})   casting-time lines: {ct}")
        all_recs += recs
    json.dump(all_recs, open(HERE / "roster_raw.json", "w"), indent=1)
    print("total", len(all_recs))

    bad_cls = sorted({c for r in all_recs for c in r["classes"] if c not in KNOWN_CLASSES})
    if bad_cls:
        print("\nUNKNOWN CLASSES:", bad_cls)
    # the Retia watermark carries a real name and order number; it must not
    # survive into anything downstream, so prove it every run
    blob = json.dumps(all_recs)
    leak = re.findall(r"(?i)dhruv|order\s*#\s*\d+", blob)
    if leak:
        print("\nWATERMARK LEAK:", set(leak))
    if gaps or bad_cls or leak:
        sys.exit(1)
    print("coverage: every casting-time line became a record")
    print("classes: all known · watermark: no leakage")

if __name__ == "__main__":
    main()
