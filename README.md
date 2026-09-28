# D&D Class Tools

Four static pages for D&D 2024:

- **`/finder/`** — a ten-question class finder aimed at first-time players.
- **`/stats/`** — ability scores by 4d6-drop-lowest, standard array or point buy.
- **`/compendium/`** — every official subclass plus six homebrew classes, with a
  hover glossary that shows what each subclass changes about the rules it touches.
- **`/spells/`** — 980 spells: the 2024 *Player's Handbook* and three homebrew
  books, filterable by class, level, school and book at once, with the same
  hover glossary.

No framework, no server, no build dependencies beyond Node. The whole site is
five HTML files, two data files and an SVG.

## Layout

```
src/                     the pages as authored (Claude artifact fragments)
  class-finder.html
  stat-roller.html
  compendium/
    index.html
    data.js
  spells/
    index.html
    spells.js            980 spells, generated — see tools/spells/
    terms.js             the spell glossary, hand-written
tools/spells/            the extraction pipeline (not shipped)
  cols.sh parse.py enrich.py emit.py   the homebrew PDFs -> spells.js
  donjon_parse.py                      the harvested PHB text -> the same
  fidelity.py phb_cross.py check.mjs   the three checks
static/                  files that ship unchanged
  index.html             landing page
  404.html
  favicon.svg
  _headers               Cloudflare response headers
build.mjs                wraps src/ fragments into complete documents
public/                  build output — this is what gets deployed
```

`src/` is deliberately kept in the shape Claude publishes it in: those files
start at `<title>` with no `<head>` or `<body>`, because the artifact publisher
supplies the document skeleton. `build.mjs` adds the skeleton — doctype, charset,
**viewport**, Open Graph tags, favicon — and injects the nav strip that links the
four tools together. Keeping the sources untouched means the artifact version and
the deployed version never drift apart.

## Build

```sh
node build.mjs
```

Writes `public/`. No `npm install` — it uses only Node's standard library. Node 18+.

To preview locally:

```sh
node build.mjs && npx serve public
```

Opening `public/index.html` directly off the filesystem mostly works, but relative
paths behave differently under `file://`, so prefer a local server.

## Deploy to Cloudflare Pages

1. Push this repo to GitHub. **`build.mjs` must sit at the repo root** — not
   inside a nested folder — or Cloudflare will not find it.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick the repo.
3. Build settings — all three matter:
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `public`
4. Deploy. Every push to the default branch rebuilds and republishes; pull
   requests get their own preview URL.

`public/` is gitignored on purpose: Cloudflare generates it on every deploy, so
committing it would mean two copies that can disagree.

### If the deploy fails

**`Could not detect a directory containing static files`** — Cloudflare had
nothing to upload. Almost always one of:

- **Build command is empty.** Without it `public/` is never created. A working
  build logs three `built …` lines before the upload step; if your log jumps
  straight from the wrangler banner to the error in well under a second, the
  command did not run. Set it to `npm run build`.
- **Build output directory is wrong.** It must be exactly `public`.
- **Root directory is wrong.** If the repo root is a folder like
  `dnd-tools-site/` with everything one level down, set **Root directory** to
  that folder, or flatten the repo so `build.mjs` is at the top.

**Last resort:** if you need it live right now, delete the `public/` line from
`.gitignore`, run `npm run build`, commit the `public/` folder, then clear the
build command and leave the output directory as `public`. Cloudflare will
publish the committed files without building anything. Remember to rebuild and
recommit after every content change — which is the reason not to do this
long-term.

You'll get a `*.pages.dev` address. If you later add a custom domain, update
`SITE` at the top of `build.mjs` so the canonical and Open Graph URLs match —
it's the only place the domain appears.

### Without Git

`npx wrangler pages deploy public` also works, or drag the `public` folder into
the Cloudflare dashboard. Fine for a one-off; the Git connection is better once
the compendium starts changing regularly.

## Updating the content

Edit the files in `src/`, re-run the build, commit. The compendium's content all
lives in `src/compendium/data.js`:

- `TERMS` — the glossary, keyed by a lowercase id used as `{{termid}}` in feature text
- `CLASSES` — each class, its note, and the groups shown in the sidebar
- `ENTRIES` — one object per subclass page: `cls`, `nav`, `flavor`, `src`,
  `mods` (what this subclass changes about a glossary term) and `features`

### Homebrew groups in the sidebar

A group in `CLASSES[x].groups` carrying `homebrew: true` renders as a collapsed
dropdown instead of an open list, so an official class reads as its four official
subclasses until the reader asks for more. A label containing the word "homebrew"
is treated the same way even without the flag. A group is force-opened when it
holds the page you are on — so search still lands on a hidden entry — and
whatever you open or close by hand is remembered in `localStorage`.

One group per homebrew book, so the source is legible from the sidebar:

```js
CLASSES.monk.groups.push({
  homebrew: true,
  label: "Homebrew subclasses (Retia)",
  keys: ["mo-brokenchain", "mo-deep", "mo-freezingsoul"],
});
```

Feature bodies use `{{term}}` or `{{term|display text}}`, which the page turns
into a hoverable chip at render time. A term listed in `mods` is always reachable
from the page's term index even if the body never mentions it.

### The spell page

`src/spells/spells.js` is generated and should not be hand-edited — run the
pipeline in `tools/spells/` instead:

```
./cols.sh <pdf> <first> <last> <out.txt>   column-cropped text, one file per book
python3 parse.py                           -> roster_raw.json
python3 enrich.py                          -> roster.json  (facets, C&C dedup)
python3 donjon_parse.py                    -> donjon/phb_roster.json
python3 emit.py                            -> src/spells/spells.js  (both rosters)
python3 fidelity.py                        every homebrew paragraph vs a 2nd extraction
python3 phb_cross.py                       every PHB fact vs the book's own pages
node check.mjs                             fields, vocabularies, watermark, licence
```

Unlike the subclass pages, spell text is **transcribed**, not summarised.
`fidelity.py` is what keeps that honest: it re-extracts the same page crops with
a different pdftotext mode and asserts that every paragraph appears verbatim in
that independent reading. 2,316 of 2,318 do; the exceptions are entries that
surround a boxed stat block, which carry a warning on the page itself.

#### Where the Player's Handbook text comes from

The PHB PDF in this project is a page image with an OCR layer under it. The
picture is legible; the layer is not — it reads 1 as l, drops letters, and
bleeds one spell's block into the next, and an extraction of it came out 26%
clean. It is not fit to publish as the book's words, and `tools/spells/phb.py`
is kept only as the record of that attempt.

The text that ships instead is SRD 5.2.1, harvested from donjon's structured
endpoint. It is typed rather than scanned, so there is no OCR fault to repair,
and it draws the line this project has to draw anyway: **338** of the 391 PHB
spells are released under CC BY 4.0 and appear here in full; the other **53**
are not, and ship as a stat line, a page reference and a note saying why. The
gap is never filled from memory.

The scan is still the check. `phb_cross.py` reads every donjon fact a second
way — each page number against the heading printed on that page (389 of 391
confirm), each stat line against the OCR's own reading, each class list against
the book's class spell-list tables, and every die against the set of dice that
exist. It sorts disagreements into the ones the scan's catalogued faults
explain and the ones they do not, and **fails if any of the second kind is left
unexamined**. The ones settled so far were settled by opening the page at 400
dpi: the SRD text had lost the 2 from two `4d12`s, and the scan — not donjon —
was wrong about Astral Projection's jacinth. Both outcomes are written into
`donjon_parse.py`'s `REPAIRS` tables with the evidence.

CC BY 4.0 requires its attribution statement word for word. It is in
`emit.py` as `SRD_NOTICE`, printed in the page footer and on the landing page,
and `check.mjs` fails the build if it is missing or altered.

`src/spells/terms.js` is the spell glossary and is hand-written. A term may set
`p` to a match pattern where its bare name would be noise (area shapes only fire
with a measurement attached). Terms sourced to `retia` or `kibbles` are only
marked on spells from those books — Retia's *Ignited* is a condition, but
"fuel that can be ignited" in a Kibbles spell is just English.

The Lyre's Guide to Retia PDF carries a per-purchase watermark with a real name
and order number. `parse.py` strips it, `emit.py` asserts it never reaches
`spells.js`, and `check.mjs` asserts it again on the shipped file. Do not remove
those checks.

## Sources

The class and subclass pages summarise rather than reproduce; the spell pages
carry the books' own text. Every page cites its book and page number.

This work includes material from the System Reference Document 5.2.1
("SRD 5.2.1") by Wizards of the Coast LLC, available at
https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative
Commons Attribution 4.0 International License, available at
https://creativecommons.org/licenses/by/4.0/legalcode.

- *Player's Handbook* (2024) — Wizards of the Coast
- *Kibbles' Compendium of Craft and Creation* — KibblesTasty
- *Kibbles' Compendium of Legends and Legacies* — KibblesTasty
- *Lyre's Guide to Retia: Land of Industry* — Logan Laidlaw / Nat19

An unofficial fan reference. Not affiliated with or endorsed by Wizards of the Coast.
