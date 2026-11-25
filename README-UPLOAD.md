# D&D Tools: all updates in one

Put these at the repo root, keeping the folder layout:

- `public/`  the finished redesigned site (what Cloudflare serves)
- `src/`  updated sources: `create.html` (new "Agree it at the table" note) and `stat-roller.html` (dice count and point-buy pool)
- `redesign/`  theme, transition script, home page styles and the restyling script (reference only)
- `build.mjs`  now does nothing, so a build step can't overwrite `public/` with the old design
- `build.legacy.mjs`  your original generator, kept for reference

Included changes: redesign with per-page colours, shorter iris transition with hover preloading, adjustable dice and point pool on Ability Scores, house-rule note in Make a Character, card symbols on the home page.

## Adding homebrew to the Subclass Compendium

Homebrew goes in its own drop-in file next to `compendium/data.js`, so `data.js` never has to be edited.

1. Copy `public/compendium/ouronaks.js` and change the data: glossary terms, entries and the rail group.
2. Save the new file in `public/compendium/` (and a copy in `src/compendium/`).
3. Add one line after the `data.js` script tag in `compendium/index.html`: `<script src="yourfile.js"></script>`.

`ouronaks.js` holds the four Ouronak warlock patrons (Asterion, Hyselix, Sherg'ozoth, Unaal) and their invocations. To remove them, delete the one script line.
