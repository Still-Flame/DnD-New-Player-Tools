# D&D Tools: all updates in one

Put these at the repo root, keeping the folder layout:

- `public/`  the finished redesigned site (what Cloudflare serves)
- `src/`  updated sources: `create.html` (new "Agree it at the table" note) and `stat-roller.html` (dice count and point-buy pool)
- `redesign/`  theme, transition script, home page styles and the restyling script (reference only)
- `build.mjs`  now does nothing, so a build step can't overwrite `public/` with the old design
- `build.legacy.mjs`  your original generator, kept for reference

Included changes: redesign with per-page colours, shorter iris transition with hover preloading, adjustable dice and point pool on Ability Scores, house-rule note in Make a Character, card symbols on the home page.
