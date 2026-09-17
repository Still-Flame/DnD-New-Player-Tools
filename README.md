# D&D Class Tools

Two static pages for D&D 2024:

- **`/finder/`** — a ten-question class finder aimed at first-time players.
- **`/compendium/`** — every official subclass plus six homebrew classes, with a
  hover glossary that shows what each subclass changes about the rules it touches.

No framework, no server, no build dependencies beyond Node. The whole site is
four HTML files, one 600 KB data file and an SVG.

## Layout

```
src/                     the pages as authored (Claude artifact fragments)
  class-finder.html
  compendium/
    index.html
    data.js
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
two tools together. Keeping the sources untouched means the artifact version and
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

1. Push this repo to GitHub.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**, and pick the repo.
3. Build settings:
   - **Framework preset:** None
   - **Build command:** `node build.mjs`
   - **Build output directory:** `public`
4. Deploy. Every push to the default branch rebuilds and republishes; pull
   requests get their own preview URL.

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

Feature bodies use `{{term}}` or `{{term|display text}}`, which the page turns
into a hoverable chip at render time. A term listed in `mods` is always reachable
from the page's term index even if the body never mentions it.

## Sources

Content is summarised, not reproduced, and every page cites its book and page
number.

- *Player's Handbook* (2024) — Wizards of the Coast
- *Kibbles' Compendium of Craft and Creation* — KibblesTasty
- *Kibbles' Compendium of Legends and Legacies* — KibblesTasty
- *Lyre's Guide to Retia: Land of Industry* — Logan Laidlaw / Nat19

An unofficial fan reference. Not affiliated with or endorsed by Wizards of the Coast.
