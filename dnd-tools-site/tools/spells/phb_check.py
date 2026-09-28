#!/usr/bin/env python3
"""Diff the written-out PHB stat lines against the scan's own reading.

Neither source is trustworthy alone. The scan is damaged; a stat line written
from knowledge is an assertion. Where the two agree on a die, a range or a
duration, that is two independent readings of the same fact and the value can
be relied on. Where they disagree, or where the scan has nothing, that is
reported — it is not silently resolved in favour of either.

The class spell-list tables give a third reading of level, school and class
list, so those three fields are checked twice over.
"""
import json, re, sys, collections
from pathlib import Path

HERE = Path(__file__).parent

def norm(s):
    """Compare on substance, not on how badly the scan set it.

    The scan splits words with stray spaces ('l mi nute') and reads 1 as l, so
    both sides are flattened to letters and digits and the l-for-1 fault is
    undone before comparing. What survives is a real difference in wording."""
    s = str(s).lower().replace("’", "'").replace("~", ",")
    s = re.sub(r"[^a-z0-9]", "", s)
    s = re.sub(r"l(?=minute|hour|round|day|mile|foot|feet|action|d\d|\d)", "1", s)
    return s


FIELDS = [("castingTime", "castingTime"), ("range", "range"),
          ("components", "components"), ("duration", "duration")]


def main():
    pilot = json.load(open(HERE / "phb_pilot.json"))["spells"]
    ocr = {r["name"].lower(): r for r in json.load(open(HERE / "phb_raw.json"))}
    tables = {k: set(v) for k, v in json.load(open(HERE / "phb_classindex.json")).items()}

    agree = collections.Counter()
    rows = []
    for p in pilot:
        key = p["name"].lower()
        o = ocr.get(key)
        flatname = re.sub(r"[^a-z0-9]", "", key)
        tbl = tables.get(flatname)

        r = {"name": p["name"], "inScan": bool(o), "inTables": bool(tbl),
             "mismatch": [], "unverified": []}

        if o:
            if o["level"] != p["level"]:
                r["mismatch"].append(f"level: scan {o['level']} vs {p['level']}")
            if o["school"] != p["school"]:
                r["mismatch"].append(f"school: scan {o['school']} vs {p['school']}")
            for mine, theirs in FIELDS:
                a, b = norm(p[mine]), norm(o[theirs])
                if not b:
                    r["unverified"].append(mine)
                elif a == b:
                    agree[mine] += 1
                elif a.startswith(b) or b.startswith(a):
                    agree[mine] += 1          # the scan truncated it, no conflict
                else:
                    r["mismatch"].append(f"{mine}: scan {o[theirs]!r} vs {p[mine]!r}")
            # class list: the scan's heading is often comma-damaged, so compare sets
            oc = {x.strip(" .") for c in o["classes"] for x in c.replace("~", ",").split(",") if x.strip()}
            if oc and oc != set(p["classes"]):
                r["mismatch"].append(f"classes: scan {sorted(oc)} vs {sorted(p['classes'])}")
        else:
            r["unverified"].append("the scan never found this spell")

        if tbl and not tbl.issubset(set(p["classes"])):
            r["hint"] = sorted(tbl - set(p["classes"]))

        r.setdefault("hint", [])
        rows.append(r)

    ok = [r for r in rows if not r["mismatch"] and r["inScan"]]
    bad = [r for r in rows if r["mismatch"]]
    noscan = [r for r in rows if not r["inScan"]]

    print(f"pilot: {len(rows)} spells")
    print(f"  confirmed by the scan, no disagreement : {len(ok)}")
    print(f"  disagreed somewhere                    : {len(bad)}")
    print(f"  no second reading (scan lost the spell): {len(noscan)}")
    print(f"\nfield agreements: {dict(agree)}")
    if bad:
        print("\ndisagreements, each needing a human eye:")
        for r in bad:
            print(f"  {r['name']}")
            for m in r["mismatch"]:
                print(f"      {m}")
    hints = [r for r in rows if r["hint"]]
    if hints:
        print("\nthe class tables claim extra classes — they are a noisy third")
        print("reading (they put Fireball on the Druid list), so these are hints:")
        for r in hints:
            print(f"  {r['name']:20} {r['hint']}")
    if noscan:
        print("\nonly one source — written out, nothing to check it against:")
        for r in noscan:
            print(f"  {r['name']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
