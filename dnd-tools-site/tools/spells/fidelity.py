#!/usr/bin/env python3
"""Prove the transcription is the books' text, not something near it.

The roster was built from column crops read with `pdftotext -layout`, which is
what recovers paragraph indents and keeps a bulleted list on one line. This
checks the result against a second extraction of the same crops read WITHOUT
-layout — a different layout reconstruction inside pdftotext, so it disagrees
with the first wherever that one guessed: hyphen joins, wrapped lines, where a
paragraph broke, whether a bullet kept its text.

Both sides are reduced to lowercase letters and digits, which makes the check
blind to what legitimately differs (spacing, hyphenation at a wrap, quote
characters) and sharp about the one thing that matters: whether the words, in
that order, are the book's.

Uncropped pages are deliberately not used as the baseline. Plain pdftotext
interleaves two columns and moves sidebars around, so a mismatch there says
nothing about the transcription.
"""
import importlib.util, json, re, subprocess, sys
from pathlib import Path

HERE = Path(__file__).parent

_spec = importlib.util.spec_from_file_location("parsemod", HERE / "parse.py")
parsemod = importlib.util.module_from_spec(_spec); _spec.loader.exec_module(parsemod)

# book -> (pdf, printed-page range that holds its spells)
SOURCES = {
    "ll":    ("/mnt/user-data/uploads/KibblesCompendiumOfLegendsAndLegaciesV1.0.2-compressed.pdf", 207, 270),
    "llb":   ("/mnt/user-data/uploads/KibblesCompendiumOfLegendsAndLegaciesV1.0.2-compressed.pdf", 290, 297),
    "cc":    ("/root/.claude/uploads/6948f53e-5cfa-58f4-90fa-fb8f9acf52f6/"
              "95682f55-KibblesCompendiumOfCraftAndCraftion-v1.2.1_CC_compressed.pdf", 129, 149),
    "retia": ("/mnt/user-data/uploads/Lyres_Guide_to_Retia_-_Land_of_Industry_(2025_Reformat).pdf", 544, 611),
}

def baseline(book):
    pdf, first, last = SOURCES[book]
    out = []
    for p in range(first, last + 1):
        for x in (0, 306):
            out.append(subprocess.run(
                ["pdftotext", "-f", str(p), "-l", str(p), "-x", str(x), "-y", "0",
                 "-W", "306", "-H", "792", pdf, "-"],
                capture_output=True, text=True).stdout)
    # Running headers, folios and the Retia watermark are furniture in both
    # paths, and a spell that runs over a column break has one sitting in the
    # middle of it. Drop them here with the same filter the parser uses, or the
    # comparison reports the page furniture as a difference in the spell.
    lines = [l for l in "\n".join(out).splitlines() if not parsemod.is_noise(l)]
    return flat("\n".join(lines))

def flat(s):
    return re.sub(r"[^a-z0-9]", "", s.lower())


def main():
    roster = json.load(open(HERE / "roster.json"))
    base = {b: baseline(b) for b in SOURCES}

    bad, checked, tables, badcells = [], 0, 0, []
    for r in roster:
        for label, blocks in (("body", r["bodyBlocks"]), ("higher", r["higherBlocks"])):
            # Table rows are compared separately: the two extraction paths walk
            # a table's cells in different orders, so the flat prose test says
            # nothing useful about them.
            prose = [b for b in blocks if b["t"] != "tbl"]
            for b in blocks:
                if b["t"] == "tbl":
                    tables += 1
                    for cell in (c for row in b["rows"] for c in row):
                        if flat(cell) and flat(cell) not in base[r["book"]]:
                            badcells.append((r, cell))
            # Each paragraph and list item is checked on its own. Joining them
            # first would fail wherever a table sits between two paragraphs —
            # the text is right, it just is not contiguous on the page.
            for b in prose:
                checked += 1
                want = flat(b["text"])
                if want in base[r["book"]]:
                    continue
                lo, hi = 0, len(want)
                while lo < hi:
                    mid = (lo + hi + 1) // 2
                    if want[:mid] in base[r["book"]]: lo = mid
                    else: hi = mid - 1
                bad.append((r, label, lo, len(want)))

    print(f"checked {checked} paragraphs and list items from {len(roster)} spells "
          f"against a second extraction")
    print(f"  verbatim   {checked - len(bad)}")
    print(f"  diverged   {len(bad)}")
    print(f"  table blocks {tables}, cells not found on the page: {len(badcells)}")
    for r, cell in badcells[:8]:
        print(f"    {r['book']} p.{r['page']} {r['name']}: {cell!r}")
    for r, label, upto, total in bad[:20]:
        print(f"    {r['book']:5} p.{r['page']:4} {r['name']:32} {label} diverges at {upto}/{total}")
    if len(bad) > 20:
        print(f"    … and {len(bad) - 20} more")

    return 1 if (bad or badcells) else 0


if __name__ == "__main__":
    sys.exit(main())
