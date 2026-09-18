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

## Sources

Content is summarised, not reproduced, and every page cites its book and page
number.

- *Player's Handbook* (2024) — Wizards of the Coast
- *Kibbles' Compendium of Craft and Creation* — KibblesTasty
- *Kibbles' Compendium of Legends and Legacies* — KibblesTasty
- *Lyre's Guide to Retia: Land of Industry* — Logan Laidlaw / Nat19

An unofficial fan reference. Not affiliated with or endorsed by Wizards of the Coast.
