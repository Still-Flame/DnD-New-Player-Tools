# D&D Tools redesign

Drop these into the repo, keeping the folder structure:

- `public/`  the finished redesigned site (all six pages, colour-coded per tool, iris page transitions). Replaces the existing `public/` folder. This is what Cloudflare serves.
- `src/stat-roller.html`  Ability Scores source with the new dice-count stepper (only the three highest dice are added) and the adjustable point-buy pool (scores up to 18; 16 costs 12, 17 costs 15, 18 costs 19).
- `redesign/`  the theme (`theme.css`), transition script (`fx.js`, `vt.css`), home page styles (`home.css`) and the script that restyled the pages (`build2.mjs`). Reference only: it was written against a scratch folder, so it will not run unchanged.

Note: running the repo's own `node build.mjs` regenerates `public/` from `src/` in the old design and overwrites this. Either skip it or extend it with the files in `redesign/`.
