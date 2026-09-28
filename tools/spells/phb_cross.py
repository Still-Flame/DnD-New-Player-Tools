#!/usr/bin/env python3
"""Check the donjon PHB text against the book itself, field by field.

Why this exists
---------------
The donjon text is clean and almost certainly right, and that is exactly why it
gets checked. The two mistakes this project has already made were both of that
shape: a stat line written confidently from memory gave the 2014 material
component for Wall of Force, and a group blurb written from a group's name
invented a rule that no book contains. Neither was caught by anything except a
second reading.

So every donjon fact that can be read a second way is read a second way:

  page number   the PDF page image is the book. If the spell's name is not on
                the page donjon claims, one of them is wrong.
  stat line     the OCR layer is damaged but not random; where it agrees on a
                casting time, range, component or duration, that is two
                independent readings of the same line.
  class list    the PHB's own class spell-list tables, harvested separately,
                give a third reading of who gets the spell.
  dice          a die size outside the real set (d4 d6 d8 d10 d12 d20 d100)
                is a corruption wherever it comes from.
  hand-written  the 18 stat lines in phb_pilot.json, written out before donjon
                was found, are compared too — they were the only reading
                available at the time and disagreements are worth seeing.

Nothing here resolves a disagreement. Disagreements are printed, and the ones
that matter get fixed by hand in donjon_parse.py's REPAIRS with a note saying
what the evidence was.
"""
import json, re, sys, collections
from pathlib import Path

HERE = Path(__file__).parent
DIE = re.compile(r"\b(\d{1,3})d(\d{1,3})\b")
REAL_DICE = {2, 3, 4, 6, 8, 10, 12, 20, 100}


# The scan's faults are systematic, not random, and they were catalogued while
# repairing it: 1 set as l, 5 as S, 0 as O, rn as rm, letters lost to
# letterspacing. A disagreement that disappears once those are undone on the
# scan's side is the scan being damaged, not the two sources differing. What
# survives is the short list worth a human eye.
def undo_scan_faults(s):
    """Apply the scan's known digit faults to a string, to a fixed point.

    'l SO feet' passes through l->1, S->5, O->0 and comes out '150feet'. Run
    repeatedly because the rules feed each other: the O only looks like a zero
    once the S beside it has become a five."""
    s = re.sub(r"\s+", "", s)
    for _ in range(4):
        s = re.sub(r"(?<=[0-9lOS])O|O(?=[0-9lOS])", "0", s)
        s = re.sub(r"(?<=[0-9])S|S(?=[0-9])|S(?=\+)", "5", s)
        s = re.sub(r"l(?=[0-9])|(?<=[0-9])l|l(?=\+)", "1", s)
    return s


def digits(s):
    return re.sub(r"\D", "", undo_scan_faults(str(s)))


def default(s):
    return re.sub(r"[^a-z0-9]", "", undo_scan_faults(str(s)).lower())


# Disagreements that the scan's faults do not explain, each settled by opening
# the PDF page at 400 dpi and reading the printed line. Recorded here so the
# check reports them as closed rather than raising them again every run — and
# so that if the data changes underneath, they come back.
RESOLVED = {
    ("Astral Projection", "components"):
        "the page prints '1,000+ GP'; the scan's '7,000+' is an OCR misread. "
        "donjon is right, nothing to repair.",
    ("Mirror Image", "components"):
        "the scan ran the whole spell body into the components field. The "
        "page prints 'Components: V, S'. donjon is right.",
}


def flat(s):
    """Reduce to letters and digits, and undo the scan's l-for-1 fault.

    The OCR splits words with stray spaces ('l mi nute') and sets 1 as l, so
    comparing raw strings only measures how badly the page was scanned. What
    survives this is a real difference in wording."""
    s = str(s or "").lower().replace("’", "'").replace("~", ",")
    s = re.sub(r"[^a-z0-9]", "", s)
    return re.sub(r"l(?=minute|hour|round|day|mile|foot|feet|action|d\d|\d)", "1", s)


def pages_from_scan():
    """{printed page number: its text}, from the column-split extraction.

    The extraction marks each PDF page with '@@PAGE n'. The PHB's printed
    number is one more than the PDF's, a calibration taken from the spell card
    the user supplied: Burning Hands sits on PDF page 247 and prints 248.

    The marker is not always at the start of a line: pdftotext ends a page with
    a form feed and no newline, so the next marker lands on that same line.
    Splitting on the marker rather than reading line by line finds all of them
    (reading by line found exactly one, and the page check silently passed on
    five spells out of 391 while looking like it had run)."""
    parts = re.split(r"@@PAGE (\d+)", open(HERE / "phb_cols.txt",
                     encoding="utf-8", errors="replace").read())
    return {int(parts[i]) + 1: parts[i + 1] for i in range(1, len(parts) - 1, 2)}


def loose(word):
    """A pattern that survives letterspacing: the scan sets 'M ELF 1 S ACID'."""
    core = re.sub(r"[^A-Za-z]", "", word)
    return re.compile(r"[^A-Za-z]{0,3}".join(re.escape(c) for c in core), re.I)


def name_probes(name):
    """The patterns worth looking for when hunting a spell's heading.

    The whole name often will not match: the scan mangles letters as well as
    spacing ('Hideous' comes out 'Hro so us'), and two of donjon's own index
    names carry typos. So each word of five letters or more is tried on its
    own, and one hit counts — a five-letter word from the spell's name landing
    on the page donjon claims is what is being tested, not a perfect heading."""
    words = [w for w in re.findall(r"[A-Za-z]{5,}", name)]
    return [loose(w) for w in words] or [loose(name)]


def main():
    roster = json.load(open(HERE / "donjon" / "phb_roster.json"))
    ocr = {r["key"]: r for r in json.load(open(HERE / "phb_raw.json"))}
    tables = {k: set(v) for k, v in json.load(open(HERE / "phb_classindex.json")).items()}
    pilot = {p["name"]: p for p in json.load(open(HERE / "phb_pilot.json"))["spells"]}
    scan = pages_from_scan()
    key = lambda s: re.sub(r"[^a-z0-9]", "", s.lower())

    agree = collections.Counter()
    conflicts = []          # a real difference in wording
    unread = collections.Counter()
    pagebad, pagegood, pagemissing = [], 0, []
    badclass, classok, classnone = [], 0, 0
    baddice = []
    pilotbad = []

    for r in roster:
        n, k = r["name"], key(r["name"])

        # --- the page number, checked against the page image's own text -------
        p = r["page"]
        if p is None or p not in scan:
            pagemissing.append(n)
        else:
            # a spell's own name appears in its heading; allow the facing page,
            # because a long entry starts on one page and the heading sits at
            # the top of the column that begins it
            probes = name_probes(n)
            if any(pat.search(scan.get(q, ""))
                   for q in (p, p - 1, p + 1) for pat in probes):
                pagegood += 1
            else:
                pagebad.append((n, p))

        # --- the stat line, against the OCR reading ---------------------------
        o = ocr.get(k)
        if not o:
            unread["the scan never resolved this spell"] += 1
        else:
            if o["level"] != r["level"]:
                conflicts.append((n, "level", o["level"], r["level"]))
            if o["school"] != r["school"]:
                conflicts.append((n, "school", o["school"], r["school"]))
            for mine, theirs in (("castingTime", "castingTime"), ("range", "range"),
                                 ("components", "components"), ("duration", "duration")):
                a, b = flat(r.get(mine)), flat(o.get(theirs))
                if not a:
                    unread[mine + " (not in the SRD text)"] += 1
                elif not b:
                    unread[mine + " (scan unreadable)"] += 1
                elif a == b or a.startswith(b) or b.startswith(a):
                    agree[mine] += 1        # the scan truncating is not a conflict
                else:
                    conflicts.append((n, mine, o[theirs], r[mine]))

        # --- the class list, against the book's class spell-list tables -------
        tbl = tables.get(k)
        if not tbl:
            classnone += 1
        elif tbl.issubset(set(r["classes"])):
            classok += 1
        else:
            badclass.append((n, sorted(tbl - set(r["classes"])), r["classes"]))

        # --- die sizes that do not exist --------------------------------------
        text = " ".join([r.get("castingTime") or "", r.get("duration") or ""] +
                        [b[-1] if isinstance(b[-1], str) else " ".join(
                            c for row in b[-1] for c in row)
                         for b in r["bodyBlocks"] + r["higherBlocks"]])
        for m in DIE.finditer(text):
            if int(m.group(2)) not in REAL_DICE:
                baddice.append((n, m.group(0)))

        # --- the stat lines written out before donjon was found ---------------
        q = pilot.get(n)
        if q:
            for f in ("castingTime", "range", "components", "duration"):
                a, b = flat(r.get(f)), flat(q.get(f))
                if a and b and not (a == b or a.startswith(b) or b.startswith(a)):
                    pilotbad.append((n, f, q[f], r[f]))

    print(f"{len(roster)} donjon spells checked\n")
    print("page number, against the page image's own heading")
    print(f"  name found on the claimed page : {pagegood}")
    print(f"  name not confirmed             : {len(pagebad)}")
    print(f"  page outside the scanned range : {len(pagemissing)}")
    for n, p in pagebad[:12]:
        print(f"      {n:34} donjon says p. {p}")

    print(f"\nstat line, against the scan's own reading")
    for f, c in sorted(agree.items()):
        print(f"  {f:14} two readings agree on {c}")
    for why, c in sorted(unread.items()):
        print(f"  {'-':14} {c} × {why}")

    print(f"\nclass list, against the book's class spell-list tables")
    print(f"  tables agree (their list is a subset) : {classok}")
    print(f"  tables name a class donjon does not   : {len(badclass)}")
    print(f"  no table entry to compare             : {classnone}")
    for n, extra, have in badclass[:12]:
        print(f"      {n:30} tables add {extra}, donjon has {have}")

    print(f"\ndie sizes outside d4/d6/d8/d10/d12/d20/d100: {len(baddice)}")
    for n, d in baddice:
        print(f"      {n:34} {d}")

    print(f"\nagainst the 18 stat lines written out before donjon was found: "
          f"{len(pilotbad)} disagreements")
    for n, f, mine, theirs in pilotbad:
        print(f"      {n:22} {f:12} written {mine!r}\n      {'':22} {'':12} donjon  {theirs!r}")

    # sort the conflicts into 'the scan is damaged here' and 'these two really
    # differ', because only the second kind is work
    faulty, closed, open_ = [], [], []
    for n, f, a, b in conflicts:
        x, y = default(a), default(b)
        # a bleed: the scan pulled the next block into the field
        bleed = len(str(a)) > 3 * max(len(str(b)), 1)
        if x == y or x.startswith(y) or y.startswith(x) or digits(a) == digits(b) or bleed:
            faulty.append((n, f, a, b))
        elif (n, f) in RESOLVED:
            closed.append((n, f, a, b))
        else:
            open_.append((n, f, a, b))

    print(f"\ndisagreements between donjon and the scan: {len(conflicts)}")
    print(f"  explained by the scan's known faults, same figures : {len(faulty)}")
    for n, f, a, b in faulty:
        print(f"      {n:24} {f:12} scan {str(a)[:56]!r}")
    print(f"\n  not explained by a fault, settled by reading the page image: {len(closed)}")
    for n, f, a, b in closed:
        print(f"      {n:24} {f:12} {RESOLVED[(n, f)]}")
    print(f"\n  OPEN — a real disagreement nobody has looked at: {len(open_)}")
    for n, f, a, b in open_:
        print(f"      {n:24} {f:12} scan   {str(a)[:100]!r}")
        print(f"      {'':24} {'':12} donjon {str(b)[:100]!r}")
    return 1 if open_ else 0


if __name__ == "__main__":
    sys.exit(main())
