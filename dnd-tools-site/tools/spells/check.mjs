#!/usr/bin/env node
/* Structural check on the file the page actually loads.
   fidelity.py proves the words are the books'; this proves the record around
   them is sound — every field present, every vocabulary closed, no furniture
   left in the prose, and above all nothing of the Retia watermark, which
   carries a real name and order number and must never reach a published page. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const src = readFileSync(join(HERE, "../../src/spells/spells.js"), "utf8");

const window = {};
new Function("window", src)(window);
const { spells, books, groups, srd } = window.SPELLDATA;

let bad = 0;
const fail = (m) => { console.log("  FAIL  " + m); bad++; };
const ok = (m) => console.log("  ok    " + m);

/* --- the watermark, first and loudest --- */
if (/dhruv|order\s*#\s*\d/i.test(src)) fail("the Retia watermark is present in spells.js");
else ok("no watermark anywhere in spells.js");

/* --- vocabularies --- */
const SCHOOLS = new Set(["Abjuration","Conjuration","Divination","Enchantment",
  "Evocation","Illusion","Necromancy","Transmutation","Psionic"]);
const CLASSES = new Set(["Bard","Cleric","Druid","Inventor","Occultist","Paladin",
  "Psion","Ranger","Sorcerer","Spellblade","Warlock","Wizard"]);

/* The block kinds the page knows how to draw. Anything else would render as
   nothing at all, silently, which is the worst way for this to fail. */
const KINDS = new Set(["p", "pb", "li", "tbl", "h", "sb"]);

const seen = new Set();
const problems = { fields: [], school: [], cls: [], level: [], key: [], leak: [], empty: [], group: [] };
const META = /^(Casting Time|Range|Components|Duration|Classes)\b/;

for (const s of spells) {
  for (const f of ["k","n","l","s","sa","c","bk","p","ct","rg","cp","d","b"])
    if (s[f] === undefined || s[f] === "") problems.fields.push(`${s.n}: ${f}`);
  if (!SCHOOLS.has(s.s)) problems.school.push(`${s.n}: ${s.s}`);
  for (const c of s.c) if (!CLASSES.has(c)) problems.cls.push(`${s.n}: ${c}`);
  if (!(Number.isInteger(s.l) && s.l >= 0 && s.l <= 9)) problems.level.push(`${s.n}: ${s.l}`);
  if (seen.has(s.k)) problems.key.push(s.k);
  seen.add(s.k);
  if (!books[s.bk]) problems.fields.push(`${s.n}: unknown book ${s.bk}`);
  for (const g of s.g || []) {
    const G = groups[g];
    if (!G || typeof G.d !== "string" || !G.d.trim()) problems.group.push(`${s.n}: ${g}`);
    for (const r of (G && G.rules) || [])
      if (!r.n || !r.d) problems.group.push(`${g}: malformed rule`);
  }

  const all = [...s.b, ...(s.h || [])];
  // A spell with no text is not a fault when the source says why: the 53 PHB
  // spells the SRD leaves out ship as stat-line-only cards, marked tx = 0.
  if (!all.length && s.tx !== 0) problems.empty.push(s.n);
  if (all.length && s.tx === 0) problems.fields.push(`${s.n}: marked textless but has prose`);
  for (const b of all) {
    if (!KINDS.has(b[0])) { problems.fields.push(`${s.n}: block kind ${b[0]}`); continue; }
    if (b[0] === "tbl") {
      if (!Array.isArray(b[1]) || !b[1].length) problems.fields.push(`${s.n}: empty table`);
      else if (b[1].some(r => !Array.isArray(r) || r.some(c => typeof c !== "string")))
        problems.fields.push(`${s.n}: malformed table row`);
      continue;
    }
    // pb and sb carry a label and a body, so every part must be a real string
    const parts = b.slice(1);
    if (parts.length !== (b[0] === "pb" || b[0] === "sb" ? 2 : 1))
      problems.fields.push(`${s.n}: ${b[0]} has ${parts.length} parts`);
    for (const t of parts)
      if (typeof t !== "string" || !t.trim()) problems.empty.push(`${s.n}: empty ${b[0]}`);
    // a stat line that leaked into the prose means the meta run was misread
    if (b[0] !== "sb" && META.test(parts[parts.length - 1]))
      problems.leak.push(`${s.n}: ${parts[parts.length - 1].slice(0, 40)}`);
    // reStructuredText emphasis should have been resolved, not shipped
    if (parts.some(t => /\*\*|(^|\s)\*\S/.test(t)))
      problems.leak.push(`${s.n}: unresolved emphasis markers`);
  }
}

const report = (k, label) =>
  problems[k].length ? fail(`${label} (${problems[k].length}): ${problems[k].slice(0,4).join(" | ")}`)
                     : ok(label + ": clean");

console.log(`\n${spells.length} spells, ${(src.length/1024).toFixed(0)} KB\n`);
report("fields", "every record has every required field");
report("school", "schools are all in the vocabulary");
report("cls", "classes are all in the vocabulary");
report("level", "levels are 0-9");
report("key", "entry keys are unique");
report("empty", "no empty prose blocks");
report("leak", "no stat-block labels left in the prose");
report("group", "every group tag has an entry in the glossary");

/* --- the licence, which is not optional --- */
const NOTICE = 'This work includes material from the System Reference Document 5.2.1 ("SRD 5.2.1") by Wizards of the Coast LLC, available at https://www.dndbeyond.com/srd. The SRD 5.2.1 is licensed under the Creative Commons Attribution 4.0 International License, available at https://creativecommons.org/licenses/by/4.0/legalcode.';
if (spells.some(s => s.bk === "phb" && s.tx !== 0)) {
  if (srd !== NOTICE) fail("the SRD attribution statement is missing or altered — CC BY 4.0 requires it word for word");
  else ok("the SRD attribution statement is present, word for word");
}

/* --- facts worth stating rather than asserting --- */
const n = (f) => spells.filter(f).length;
console.log("");
ok(`${n(s => !s.c.length)} spells carry no class — all Retia (${n(s => !s.c.length && s.bk === "retia")})`);
ok(`${n(s => s.ci)} class tags inferred rather than printed (the C&C psionic spells)`);
ok(`${n(s => s.rv)} entries flagged for a human eye`);
ok(`${n(s => s.con)} concentration, ${n(s => s.rit)} ritual, ${n(s => s.leg)} legacy, ${n(s => s.bm)} blood magic`);
ok(`${n(s => s.also)} spells printed in both Kibbles books`);
ok(`${n(s => s.bk === "phb")} from the Player's Handbook — ` +
   `${n(s => s.bk === "phb" && s.tx !== 0)} with the SRD's text, ` +
   `${n(s => s.tx === 0)} stat line only`);
ok(`${n(s => s.al)} carry an SRD alias (the SRD strips the wizards' names)`);
ok(`${spells.reduce((a, s) => a + s.b.length + (s.h ? s.h.length : 0), 0)} prose blocks in total`);

console.log(bad ? `\nPROBLEMS: ${bad}` : "\nproblems: none");
process.exit(bad ? 1 : 0);
