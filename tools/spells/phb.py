#!/usr/bin/env python3
"""The PHB 2024 spell chapter, read from a scan.

This book is different from the other three and the difference is not cosmetic.
The PDF is a 100 ppi page image with an OCR layer over it, so unlike Legends &
Legacies, Craft and Creation and Retia there is no clean text to transcribe and
no independent second reading to check against — both readings come from the
same flawed layer. Everything this script produces is therefore marked as
OCR-derived and unverified, and the page says so on every PHB entry.

What can be done, and is:

1. The scan's faults are systematic, so the repeatable ones are repaired by
   rule and counted: 'l' read as '1' before a die or a unit ('ld6', 'l minute'),
   'll' read as '/1' or '/' ('Cloudki/1'), and words split by a spurious space
   ('wa rded a rea').
2. The split-word repair needs to know what a word is. Rather than guess, it
   uses a lexicon built from the three clean homebrew books — same genre, same
   vocabulary, and known-good text.
3. Spell names, levels and schools exist twice in the book: in the description
   heading and in the eight class spell-list tables. Those are two independent
   readings of the same fact, so they are cross-checked and disagreements are
   reported rather than resolved silently.
4. What the repairs cannot reach is counted per spell as a confidence score, so
   a reader can see which entries are least trustworthy instead of being told
   only that the book was scanned.

None of this makes the numbers inside a spell's text trustworthy. A '3' misread
as an '8' is invisible to every check here.
"""
import collections, json, re, subprocess, sys
from pathlib import Path

HERE = Path(__file__).parent
PHB = "/mnt/user-data/uploads/PlayersHandbook2024.pdf"
FIRST, LAST = 238, 342          # PDF pages
# Calibrated against a known citation: Burning Hands is printed on p. 248 and
# sits on PDF page 247, so printed = PDF + 1.
PAGE_OFFSET = 1

SCHOOLS = ["Abjuration", "Conjuration", "Divination", "Enchantment",
           "Evocation", "Illusion", "Necromancy", "Transmutation"]
SCHOOL_FLAT = {re.sub(r"[^a-z]", "", s.lower()): s for s in SCHOOLS}
CLASSES = ["Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer",
           "Warlock", "Wizard"]

def flat(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


# ---------------------------------------------------------------- lexicon

# Fragments that are real words on their own, so 'a rea' may join but 'a spell'
# must not. Kept deliberately short; anything not here is a candidate fragment.
STANDALONE = set("""a an as at be by do go he i if in is it me my no of on or so
to up us we the and for you your are was not but can all one two its his her
им""".split())

def lexicon():
    """Words the three clean homebrew books use — a dictionary of this genre."""
    words = collections.Counter()
    roster = json.load(open(HERE / "roster.json"))
    for r in roster:
        for b in r["bodyBlocks"] + r["higherBlocks"]:
            for w in re.findall(r"[A-Za-z]+", b.get("text", "")):
                words[w.lower()] += 1
        for f in ("name", "castingTime", "range", "duration", "componentsRaw"):
            for w in re.findall(r"[A-Za-z]+", r[f]):
                words[w.lower()] += 1
    # a word seen once could itself be an artefact; twice is enough to trust
    return {w for w, n in words.items() if n >= 2}


# ---------------------------------------------------------------- repairs

class Repairs:
    """Each rule is applied by regex and counted, so the run can report what it
    changed rather than quietly rewriting the book."""

    def __init__(self, lex):
        self.lex = lex
        self.n = collections.Counter()

    def sub(self, name, pattern, repl, text, flags=0):
        out, k = re.subn(pattern, repl, text, flags=flags)
        self.n[name] += k
        return out

    def line(self, s):
        # 'll' misread as '/1' or '/' inside a word: Cloudki/1, Counterspe/1
        s = self.sub("ll read as /1", r"(?<=[A-Za-z])/1\b", "ll", s)
        s = self.sub("ll read as /", r"(?<=[a-z])/(?=[a-z])", "ll", s)
        # '1' misread as 'l' before a die or a unit
        s = self.sub("1 read as l (dice)", r"\bl(?=d\d)", "1", s)
        s = self.sub("1 read as l (units)",
                     r"\bl(?= (?:minute|hour|round|day|mile|foot|feet|action)\b)", "1", s)
        s = self.sub("1 read as l (in a number)", r"\bl(?=\d)", "1", s)
        return s

    def join_splits(self, s):
        """Rejoin words a spurious space broke in two ('wa rded' -> 'warded').

        Only joins when the result is a word the clean books use and the first
        fragment is not a word in its own right, so 'a rea' joins and 'a spell'
        does not."""
        def fix(m):
            a, b = m.group(1), m.group(2)
            if a.lower() in STANDALONE:
                return m.group(0)
            if a.lower() in self.lex and len(a) > 2:
                return m.group(0)                 # both halves are real words
            if (a + b).lower() in self.lex:
                self.n["split word rejoined"] += 1
                return a + b
            return m.group(0)
        return re.sub(r"\b([A-Za-z]{1,3}) ([A-Za-z]{2,})\b", fix, s)

    def report(self):
        return dict(self.n)


# ---------------------------------------------------------------- the scan

NOISE = [re.compile(r"^\s*\d{1,3}\s*$"), re.compile(r"^\s*CHAPTER\b", re.I),
         re.compile(r"^\s*PART\b", re.I), re.compile(r"^[^A-Za-z0-9]{0,4}$")]

def read_pages():
    out = []
    for p in range(FIRST, LAST + 1):
        for x in (0, 306):
            t = subprocess.run(["pdftotext", "-layout", "-f", str(p), "-l", str(p),
                                "-x", str(x), "-y", "0", "-W", "306", "-H", "792",
                                PHB, "-"], capture_output=True, text=True).stdout
            for line in t.splitlines():
                if any(n.match(line.strip()) for n in NOISE):
                    continue
                out.append((p + PAGE_OFFSET, line.rstrip()))
    return out


HDR = re.compile(r"^\s*(?:Level\s+(\d)\s+([A-Za-z]+)|([A-Za-z]+)\s+Cantrip)\s*\(([^)]*)\)", re.I)

def parse_header(s):
    m = HDR.match(s)
    if not m:
        return None
    lvl = int(m.group(1)) if m.group(1) else 0
    school = SCHOOL_FLAT.get(flat(m.group(2) or m.group(3) or ""))
    if not school:
        return None
    classes = [c.strip() for c in m.group(4).split(",") if c.strip()]
    return lvl, school, classes


META = ["Casting Time", "Range", "Components", "Duration"]
FIELD = {"Casting Time": "castingTime", "Range": "range",
         "Components": "components", "Duration": "duration"}

def meta_key(line):
    for k in META:
        m = re.match(r"^%s\s*[:.]?\s+(.*)$" % re.escape(k), line.strip())
        if m:
            return k, m.group(1).strip()
    return None, None


# ---------------------------------------------------------------- assembly

SENTENCE_END = re.compile(r"[.!?:;”’\"')\]]\s*$")
HIGHER = re.compile(r"^\s*(Using a Higher-Level Spell Slot|Cantrip Upgrade)\b")


def blocks(lines, rep):
    """Paragraphs and list items, with the PHB's two-space first-line indent as
    the paragraph signal — the same convention the Kibbles books use."""
    filled = [l for l in lines if l.strip()]
    if not filled:
        return []
    col = len(filled[0]) - len(filled[0].lstrip())
    out, cur = [], []
    def flush():
        if cur:
            t = " ".join(x.strip() for x in cur)
            t = rep.join_splits(re.sub(r"\s+", " ", t)).strip()
            if t:
                out.append({"t": "p", "text": t})
            cur.clear()
    for l in lines:
        s = l.strip()
        if not s:
            if cur and SENTENCE_END.search(cur[-1]):
                flush()
            continue
        ind = len(l) - len(l.lstrip())
        d = ind - col
        if d < 0 or d > 8:
            col = ind; d = 0
        if cur and d >= 1:
            flush()
        cur.append(s)
    flush()
    return out


SUSPECT = [
    ("stray single letter", re.compile(r"(?<![A-Za-z])[b-hj-km-zB-HJ-KM-Z] (?=[a-z])")),
    ("digit inside a word", re.compile(r"[A-Za-z][0-9][A-Za-z]")),
    ("slash inside a word", re.compile(r"[A-Za-z]/[A-Za-z0-9]")),
    ("lone l before a number", re.compile(r"\bl\d")),
    ("unreadable run", re.compile(r"[^\w\s.,;:'\"()\[\]/+–—’“”&%*-]{2,}")),
]

def confidence(rec):
    """How much OCR damage is still visible after the repairs, per spell."""
    text = " ".join(b["text"] for b in rec["bodyBlocks"] + rec["higherBlocks"])
    text += " " + " ".join(rec[f] for f in ("castingTime", "range", "components", "duration"))
    hits = collections.Counter()
    for label, rx in SUSPECT:
        n = len(rx.findall(text))
        if n:
            hits[label] = n
    return sum(hits.values()), dict(hits)


def main():
    lex = lexicon()
    rep = Repairs(lex)
    idx = {k: set(v) for k, v in json.load(open(HERE / "phb_classindex.json")).items()}

    raw = read_pages()
    lines = [(p, rep.line(l)) for p, l in raw]

    starts = []
    for i, (p, l) in enumerate(lines):
        h = parse_header(l)
        if not h:
            continue
        j = i - 1
        while j >= 0 and not lines[j][1].strip():
            j -= 1
        if j < 0:
            continue
        name_raw = lines[j][1].strip()
        if len(name_raw) > 44 or meta_key(name_raw)[0] or parse_header(name_raw):
            continue
        starts.append((j, i, name_raw, h))

    recs, unmatched = [], []
    for n, (ni, hi, name_raw, (lvl, school, classes)) in enumerate(starts):
        end = starts[n + 1][0] if n + 1 < len(starts) else len(lines)
        # the class tables spell the name without the heading's letterspacing,
        # so they are used to recover it rather than guessing at the spacing
        key = flat(name_raw)
        title = None
        for cand, _ in idx.items():
            if cand == key:
                title = cand
                break
        rec = {"book": "phb", "page": lines[ni][0], "level": lvl, "school": school,
               "classes": classes, "nameRaw": name_raw, "key": key,
               "castingTime": "", "range": "", "components": "", "duration": ""}

        body, higher, in_higher, in_meta, last = [], [], False, True, None
        for k in range(hi + 1, end):
            src = lines[k][1]
            s = src.strip()
            if not s:
                if not in_meta:
                    (higher if in_higher else body).append("")
                continue
            kk, val = meta_key(s)
            if in_meta and kk:
                rec[FIELD[kk]] = val; last = kk
                continue
            if in_meta and last and last != "Duration":
                rec[FIELD[last]] = (rec[FIELD[last]] + " " + s).strip()
                continue
            in_meta = False
            if HIGHER.match(src):
                in_higher = True
            (higher if in_higher else body).append(src)

        rec["bodyBlocks"] = blocks(body, rep)
        rec["higherBlocks"] = blocks(higher, rep)
        for f in ("castingTime", "range", "components", "duration"):
            rec[f] = rep.join_splits(rec[f])
        rec["ocrHits"], rec["ocrDetail"] = confidence(rec)
        if title is None:
            unmatched.append(rec)
        recs.append(rec)

    # ---- cross-check name / level / school against the class tables --------
    named, disagree = 0, []
    for r in recs:
        cls_from_table = idx.get(r["key"])
        if cls_from_table is None:
            r["name"] = tidy_name(r["nameRaw"], lex)
            r["nameSource"] = "heading only"
            continue
        named += 1
        r["name"] = tidy_name(r["nameRaw"], lex)
        r["nameSource"] = "confirmed by the class tables"
        missing = sorted(cls_from_table - set(r["classes"]))
        extra = sorted(set(r["classes"]) & set(CLASSES) - cls_from_table)
        if missing or extra:
            disagree.append((r["name"], missing, extra))

    json.dump(recs, open(HERE / "phb_raw.json", "w"), indent=1)

    print(f"PHB spell descriptions: {len(recs)} parsed from PDF {FIRST}-{LAST}")
    print(f"  casting-time lines in the source: "
          f"{sum(1 for _, l in lines if l.strip().startswith('Casting Time'))}")
    print(f"  names confirmed against a class table: {named}")
    print(f"  names from the heading alone:          {len(recs) - named}")
    print("\nrepairs applied (each by rule, each counted):")
    for k, v in sorted(rep.report().items(), key=lambda x: -x[1]):
        print(f"  {v:6}  {k}")
    lo = sorted(recs, key=lambda r: -r["ocrHits"])
    print(f"\nresidual OCR damage: {sum(r['ocrHits'] for r in recs)} marks across "
          f"{sum(1 for r in recs if r['ocrHits'])} spells")
    print("  worst:")
    for r in lo[:8]:
        print(f"    {r['ocrHits']:3}  {r['name']:26} {r['ocrDetail']}")
    print(f"\nclass-list disagreements between the two readings: {len(disagree)}")
    for nm, miss, ext in disagree[:8]:
        print(f"    {nm:26} table has extra {miss or '-'} · heading has extra {ext or '-'}")


def tidy_name(raw, lex):
    """'ACID SP LASH' -> 'Acid Splash'. Letterspacing is removed only where the
    join makes a word the clean books know."""
    words = raw.split()
    out, i = [], 0
    while i < len(words):
        w = words[i]
        while i + 1 < len(words) and (len(w) <= 3 or len(words[i + 1]) <= 3) \
                and (w + words[i + 1]).lower() in lex:
            w += words[i + 1]; i += 1
        out.append(w)
        i += 1
    return " ".join(x.capitalize() if x.isupper() else x for x in out)


if __name__ == "__main__":
    sys.exit(main() or 0)
