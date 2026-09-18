# Spell Compendium — scope

Written before any building. Everything below was measured against the four PDFs,
not estimated.

## Decisions taken

- **Homebrew only.** No PHB spell text. Reasons under "The PHB problem".
- **New `/spells/` page**, its own `spells.js`, sharing the glossary and styling.
- **Multi-select filters** — school, level, class, source, spell group — plus a search bar.
- **Retia's spell rules get their own tags**, kept visibly separate from the rest.

## What is actually in the books

| Source | Spells | Printed pages | PDF pages | Text |
|---|---|---|---|---|
| Legends & Legacies | 251 + 32 blood magic | 207–270, 290–297 | same (offset 0) | clean, digital |
| Lyre's Guide to Retia | 280 | 534–601 | 544–611 (offset +10) | clean, digital |
| Craft and Creation | 97 names / 112 blocks | 128–148 | 129–149 (offset +1) | clean, digital |
| PHB 2024 | ~374–400 | 239–343 | 236–348 (offset −3) | **scanned OCR** |

Distinct names across all four: **896**. 94 appear in two books; none in three.

After the Kibbles dedup (below), the buildable set is **roughly 590 spells**.

### The PHB problem

The PHB PDF is a scan with an OCR text layer, not a digital document. `pdffonts`
reports non-embedded Times/Helvetica — the signature of an OCR overlay — over page
images at **100 ppi**, which is too low to re-OCR usefully. The source images are the
limit, so no better extraction exists.

Measured damage in the spell chapter:

- **29%** of spell names come out visibly mangled: `ACID SP LASH`, `ALA R M`,
  `CHROM AT IC ORB`, `CONJUR E 1:·EY`, `,.. -·CONTI N GENCY`.
- **153 occurrences** of lowercase `l` read as the digit `1` — `l minute`, `l hour`,
  `l round`, `l mile`. These sit in Casting Time and Duration lines.
- School names corrupted in body text: `Necrnmancy`, `Conjurntion`, `ConJuration`.
- Spells silently missing from any heading-based extraction: Magic Missile and
  Melf's Acid Arrow are both absent from the 331 names a heading parser recovers,
  against 374 `Casting Time:` lines.

The errors land precisely on the numbers that matter — dice, ranges, durations — and
they are the kind that read as plausible. That is the argument for leaving PHB spell
text out rather than transcribing it.

If PHB coverage is wanted later, the safe path is the **eight per-class spell list
tables** in chapter 3 (pp. 62, 71, 82, 112, 121, 142, 157, 168). Those extract far
more cleanly than the description headings — name, school and level in column order —
and would support an index without rules text.

## Conflicts

### 1. Craft and Creation mostly reprints Legends & Legacies

85 of CC's 97 spell names also appear in L&L. **Zero are byte-identical.** CC's versions
are the earlier ones: they lack L&L's magic-source tags and omit the Spellblade class,
which did not exist yet.

```
LL: Acid Rain  5th-level conjuration (arcane, primal)  Classes: Druid, Occultist, Spellblade, Wizard
CC: Acid Rain  5th-level conjuration                    Classes: Druid, Occultist, Wizard
```

Rule to adopt: **L&L wins**, CC noted as also-printed-in. CC therefore contributes only
about **12–27 genuinely new spells**, not 97 — a real saving, but only if the dedup runs
before the writing does.

### 2. Three incompatible taxonomies

Each book files spells differently, and no facet is shared by all three:

- **PHB** — `Level 2 Abjuration (Bard, Cleric, Druid, Paladin, Ranger)`
- **L&L** — `5th-level conjuration (arcane, primal)` + a separate `Classes:` line
- **Retia** — `2nd-level Transmutation spell (Sky-Keeper's Arcana)` and *no class line at all*

A single filter model has to be a union where some facets are empty for some sources.
The school and level facets are universal; magic source (arcane/primal/divine) is L&L
only; spell group is Retia only.

### 3. Retia's class lists live in the class chapters, not the spell chapter

This is the fix for the missing class filter, and it means no invented mappings are
needed. Retia has eleven **"Expanded Spell List"** tables, one per class, at printed
pages 358 (Favored Soul), 376–377 (Inscriptor), 401 (Petal Knight), 438 (Bard),
442 (Ranger), 450 (Cleric), 455 (Druid), 474 (Paladin), 486 (Sorcerer), 505 (Warlock),
510 (Wizard).

Parsing cost: they are **two-column tables nested inside a two-column page**, so the
306pt split used everywhere else interleaves them. Confirmed on the Wizard list —
`Mental Tether / Cantrips / Mind Whip / Deflect / Orbs of Spelljamming` is four columns
braided together, with level headings (`Cantrips`, `1st-Level Spells`) appearing
mid-stream. Needs a four-way crop. This is the same class of sub-task as the L&L
Features tables, and like those it is worth doing because it is the book's own
authority rather than my judgement.

Note also that these are *expanded* lists — spells added to a class's existing list —
and that some Retia spells (the Daemoturgy group in particular) appear on no class list
at all. Those get a group tag and no class.

### 4. The class filter mixes two class systems

L&L brings Occultist, Spellblade, Warden, Warlord. Retia brings Favored Soul, Inscriptor,
Petal Knight. These are different homebrew systems that do not interoperate — an L&L
Spellblade cannot cast from a Retia list just because both appear in one dropdown.
The filter needs to make source visible alongside class, or it will imply
compatibility the books do not offer.

### 5. Retia is a different sub-edition

Retia calls itself "5.19th Edition". Its spells lean on rules from chapter 10
(pp. 519–526) that do not exist elsewhere: Arcane Charges, Eidolic Damage, Combat
Fatigue, the Enraged/Ignited/Sluggish conditions, and its own Spellcasting Rules.
Its 25 spell groups carry mechanics too — Eidomancy spells are explicitly stronger
than their level would suggest.

So the separate tagging is not cosmetic. Retia spells need a visible marker plus
glossary entries for the sub-edition rules, or someone will drop a Retia spell into a
normal 2024 game and find it does not behave.

Spell group distribution, for sizing: Legacy 72, Daemoturgy 20, Skulker's Grimoire 14,
Altissima-Cor's Arcane Arts 11, Chromatic Convocation 9, Sky-Keeper's Arcana 8,
Nine Branch Arts 8, Legacy of Gold 8, Epic of Duality 8, Blood of Cineris 7,
Ossenheimer's Memoirs 5, Eidomancy 4, plus 13 smaller or combined tags.

### 6. The Retia PDF is personally watermarked

`dhruv ravikumar (Order #52935892)` appears in the text stream **68 times in the spell
pages alone** — once per page. The current `data.js` is clean, so the informal filtering
has held so far, but nothing enforces it. Since these pages get published to a
link-shareable artifact, this should become an assertion in `check.js` rather than a
habit.

### 7. Flat key namespace

`ENTRIES` is one namespace for all 322 pages. Spells need an `sp-` prefix, and the 94
cross-book duplicate names need source-suffixed keys (`sp-acidrain-ll`, `sp-acidrain-cc`)
on the same pattern as `fi-llchampion` and `mo-llelements`.

### 8. Payload

`data.js` is already 997 KB. Raw spell text averages ~950 bytes each; summarised with
metadata and markup, ~590 spells lands around 600 KB–1 MB. Folding that into `data.js`
would make every compendium visitor download ~2 MB of JS. A separate `spells.js` on its
own page keeps the compendium's load time exactly where it is. This is the main reason
for the separate page beyond the UI argument.

### 9. The rail does not scale

The sidebar is a flat list per class — fine at 22 entries for Warlock, unusable at
several hundred spells. The spell page needs a list/detail layout with a filter bar,
not the rail component. It shares CSS tokens and the term chip; it does not share
`renderRail`.

Also `choose()` in the search palette scans every entry calling `usedTerms()` to find a
page using a given glossary term. Keeping spells in a separate file and page keeps that
scan at its current size.

### 10. Glossary

142 terms today. Spells want roughly 40 more — the eight schools, V/S/M components,
areas (cone, cube, cylinder, line, sphere, emanation), damage types, "At Higher Levels",
spell attack — plus the Retia sub-edition terms from conflict 5.

Risk: auto-marking every occurrence of `concentration` across 590 spells would bury the
page in underlines. The subclass pages were hand-marked and the spells should be too,
which is part of why the per-spell cost is what it is.

### 11. Build plumbing

`build.mjs` needs a fifth `PAGES` entry, a `cp` for `spells.js`, and a fifth nav link.
The new page must follow the same fragment shape the artifact publisher expects —
opening at `<title>`, no doctype or `<body>` — because `split()` keys on the first
`</style>`.

### 12. House policy on reproduction

The compendium's footer says feature text is summarised rather than reproduced. Holding
that line for 590 spells is the bulk of the work: 590 hand-written plain-language
summaries, not 590 transcriptions. Transcribing would be faster and is the thing the
site has deliberately not done.

## Effort

Blocks sized to stop cleanly between sessions, as with the subclass books.

| # | Block | Turns |
|---|---|---|
| 1 | Extraction: column-split all three books, parse the 11 Retia class tables, dedup CC against L&L, watermark filter, emit a validated roster | 1 |
| 2 | `/spells/` page — list/detail, multi-select filter bar, search, build wiring | 1–2 |
| 3 | Legends & Legacies, 283 spells incl. blood magic | 4 |
| 4 | Retia, 280 spells + spell-group and sub-edition glossary | 4 |
| 5 | Craft and Creation, ~12–27 unique | folded into one of the above |
| 6 | Glossary additions, `check.js` rules, verification pass, publish | 1–2 |

**Total: 12–14 turns.** Block 1 is worth doing alone and reviewing before any writing
starts, because the dedup and the Retia class tables decide how much of block 3–5 there
actually is.

## Open question

Whether a Retia spell that appears on no class list should be filterable by class at all,
or only by group. Leaving it unfilterable is honest; giving it a guessed class is not.
Deferred to block 2, when the filter bar exists to try it against.
