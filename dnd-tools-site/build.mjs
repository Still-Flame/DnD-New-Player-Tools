#!/usr/bin/env node
/**
 * Wraps the two page fragments into complete, self-hostable HTML documents.
 *
 * The sources were authored for Claude's artifact publisher, which supplies the
 * document skeleton at publish time — so each one starts at <title> with no
 * doctype, <head> or <body>, and crucially no viewport meta. Dropped onto a
 * static host as-is they render, but mobile is broken. This adds the skeleton.
 *
 *   node build.mjs
 */
import { readFile, writeFile, mkdir, cp } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "src");
const OUT = join(HERE, "public");

const SITE = "https://dnd-tools.pages.dev"; // change after you pick a domain

/* The fragments are `…<style>…</style>` followed by body markup. Everything up
   to and including the final </style> of that opening run belongs in <head>. */
function split(fragment) {
  const marker = "</style>";
  const end = fragment.indexOf(marker);
  if (end === -1) throw new Error("no </style> found — fragment shape changed");
  const cut = end + marker.length;
  return { head: fragment.slice(0, cut).trim(), body: fragment.slice(cut).trim() };
}

const FAVICON = "/favicon.svg";

/* "D&D" inside an attribute has to be escaped or it is invalid markup. */
const attr = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* A compact strip linking the two tools to each other and back to the landing
   page. Injected at build time so the source fragments stay exactly as they are
   published as artifacts — the sources and the site never drift apart. */
function nav(current) {
  const links = [
    ["/", "D&amp;D Tools"],
    ["/finder/", "Class Finder"],
    ["/compendium/", "Subclass Compendium"],
  ];
  const items = links
    .map(([href, label]) =>
      href === current
        ? `<span class="sitenav-here" aria-current="page">${label}</span>`
        : `<a href="${href}">${label}</a>`
    )
    .join('<span class="sitenav-sep" aria-hidden="true">/</span>');

  return `<style>
  .sitenav {
    max-width:64rem; margin-inline:auto; padding:12px 20px 0;
    display:flex; flex-wrap:wrap; align-items:baseline; gap:0 8px;
    font-family:"IBM Plex Mono", ui-monospace, monospace;
    font-size:.7rem; letter-spacing:.11em; text-transform:uppercase;
  }
  .sitenav a { color: var(--ink-faint, #8A9099); text-decoration:none; }
  .sitenav a:hover { color: var(--accent, currentColor); text-decoration:underline; }
  .sitenav a:focus-visible { outline:2px solid var(--accent, currentColor); outline-offset:2px; }
  .sitenav-here { color: var(--ink-soft, #5B626C); }
  .sitenav-sep { color: var(--rule, #C6C2B6); }
  @media print { .sitenav { display:none; } }
</style>
<nav class="sitenav" aria-label="Site">${items}</nav>`;
}

function page({ fragment, description, path, image }) {
  const { head, body } = split(fragment);
  const rawTitle = (head.match(/<title>([^<]*)<\/title>/) || [, "D&amp;D Tools"])[1];
  const title = attr(rawTitle.replace(/&amp;/g, "&"));
  description = attr(description);
  const url = SITE + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<meta name="description" content="${description}">
<link rel="canonical" href="${url}">
<link rel="icon" href="${FAVICON}" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="D&D Tools">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:url" content="${url}">
${image ? `<meta property="og:image" content="${SITE}${image}">\n<meta name="twitter:card" content="summary_large_image">` : `<meta name="twitter:card" content="summary">`}
${head}
</head>
<body>
${nav(path)}
${body}
</body>
</html>
`;
}

const PAGES = [
  {
    src: "class-finder.html",
    out: "finder/index.html",
    path: "/finder/",
    description:
      "Ten questions that point a first-time D&D player at a class they'll actually enjoy — official classes and homebrew, no jargon required.",
  },
  {
    src: "compendium/index.html",
    out: "compendium/index.html",
    path: "/compendium/",
    description:
      "Every D&D 2024 subclass plus six homebrew classes, with a hover glossary that shows what each subclass changes about the rules it touches.",
  },
];

await mkdir(OUT, { recursive: true });

for (const p of PAGES) {
  const fragment = await readFile(join(SRC, p.src), "utf8");
  const html = page({ fragment, description: p.description, path: p.path });
  const dest = join(OUT, p.out);
  await mkdir(dirname(dest), { recursive: true });
  await writeFile(dest, html);
  console.log(`built  ${p.out}  (${(html.length / 1024).toFixed(0)} KB)`);
}

/* data.js ships beside the compendium page and is loaded with a relative
   <script src>, so it just needs copying across unchanged. */
await cp(join(SRC, "compendium/data.js"), join(OUT, "compendium/data.js"));
console.log("copied compendium/data.js");

/* Landing page, 404, favicon and the Cloudflare _headers file ship as-is. */
await cp(join(HERE, "static"), OUT, { recursive: true });
console.log("copied static/ (index.html, 404.html, favicon.svg, _headers)");
