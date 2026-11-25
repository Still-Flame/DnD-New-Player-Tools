/* The Ouronak warlock patrons: Asterion, Hyselix, Sherg'ozoth and Unaal.

   A drop-in file for the Subclass Compendium. It is loaded by compendium/index.html
   right after data.js, and it adds its glossary terms, four patron pages and one
   rail group to window.COMPENDIUM before the page renders. To add another set of
   homebrew the same way, copy this file, change the data, and add one <script> line. */
(function () {
  "use strict";
  var C = window.COMPENDIUM;
  if (!C || !C.TERMS || !C.CLASSES || !C.ENTRIES || !C.CLASSES.warlock) { return; }

  var TERMS = {
 "calm": {
  "n": "Calm",
  "s": "kor",
  "d": "A Kor condition. A Calm creature can't take Reactions, its Speed is reduced by 10 feet, and it has Disadvantage on Initiative rolls. It lasts 1 minute and ends early if a creature other than the one who applied it damages the target. A creature Calmed three times in 24 hours is Emptied."
 },
 "emptied": {
  "n": "Emptied",
  "s": "kor",
  "d": "What three Calms in 24 hours do to a creature: it loses one bond or drive until Greater Restoration is cast on it. Player warlocks never inflict it; only enemies of the Ouronaks use it."
 },
 "ruincounter": {
  "n": "Ruin counter",
  "s": "kor",
  "d": "A marker Asterion's warlock places on a creature when a Warlock cantrip damages it. Each counter deals 1d6 Force damage at the end of the warlock's turn, and one counter falls off. They are how an inevitable ending gets delivered a little at a time."
 },
 "shard": {
  "n": "Shard",
  "s": "kor",
  "d": "A piece of a Sherg'ozoth warlock left somewhere else: a point in space, not a creature or an object. It can't be attacked or targeted. Spells measure range and sight from it, and it carries the warlock's Overfull Mind."
 }
};
  var ENTRIES = {
 "wl-asterion": {
  "cls": "warlock",
  "verbatim": true,
  "nav": "Asterion the Inevitable",
  "navSub": "Levels 3 · 6 · 10 · 14",
  "kicker": "Warlock patron · homebrew",
  "name": "Asterion the Inevitable",
  "tag": "The future that cannot be turned",
  "flavor": "Asterion is a future in which every road ends in ruin, and nothing anyone does moves the date. Its warlock does not hurry the ending. They place it, and then they wait for it to arrive.",
  "src": "The Ouronaks, Kor homebrew",
  "mods": {
   "teleport": "Appointed Ground is a free swap of two creatures' positions, once per rest, right after Initiative. Ruin counters also stop a creature from teleporting once Chain Ruin arrives at 14.",
   "cantrip": "Everything here keys off your cantrips: Foregone Conclusion triggers on a hit, and Ruin Comes places a counter whenever one deals damage."
  },
  "features": [
   {
    "lvl": "Level 3",
    "name": "Hour-Bound",
    "body": "<p>You always know the Doom Clock of any avatar of Asterion within 1 mile.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Asterion Spells",
    "body": "<p>Extra {{preparedspells}}. Level 3: <em>Command</em>, <em>Shatter</em>. Level 5: <em>Counterspell</em>, <em>Fireball</em>. Level 7: <em>Banishment</em>, <em>Wall of Fire</em>. Level 9: <em>Destructive Wave</em>, <em>Hold Monster</em>.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Appointed Ground",
    "body": "<p>Your Patron Hour. At the start of the first round of combat, right after {{initiative|Initiative}}, choose two willing creatures within 30 feet of you (you can be one). Swap their positions: each {{teleport|teleports}} into the other's space. Once per {{shortrest|Short}} or {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Foregone Conclusion",
    "body": "<p>Once per turn, when you hit a creature with a Warlock {{cantrip}}, you can force it to make a Wisdom {{savingthrow}} against your {{spellsavedc|spell save DC}}. On a failure, until the end of its next turn it can take only the action it took on its previous turn (the Dodge action if it took none). That limit covers every action it would take, including extra actions such as the one from <em>Haste</em> or Action Surge.</p><p>You can use this a number of times equal to your Charisma modifier (minimum 1), and you regain all uses when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Ruin Comes",
    "body": "<p>When you deal damage to a creature with a Warlock {{cantrip}}, place a {{ruincounter|Ruin counter}} on it. A creature can have a number of counters up to your {{proficiencybonus|Proficiency Bonus}}.</p><p>At the end of each of your turns, each creature with Ruin counters takes 1d6 Force damage per counter (no attack roll or saving throw), then loses one counter. Counters end when the creature dies or when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 10",
    "name": "Cataclysm",
    "body": "<p>As a {{magicaction|Magic action}}, each creature of your choice that you can see within 120 feet takes 3d8 Force damage per {{ruincounter|Ruin counter}} it has (no saving throw) and loses all its counters. Once per {{shortrest|Short}} or {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 14",
    "name": "Chain Ruin",
    "body": "<p>When a creature takes damage from Ruin Comes, each other creature of your choice within 10 feet of it gains a {{ruincounter|Ruin counter}}, up to the maximum. Each creature can gain one this way per round.</p><p>A creature with a Ruin counter can't {{teleport}} or travel to another plane.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Ruin Caster",
    "body": "<p><b>Counted Days.</b> <em>Level 7+.</em> The maximum number of Ruin counters a creature can have from Ruin Comes increases by 1.</p><p><b>Ruin Ascending.</b> <em>Level 7+, Agonizing Blast.</em> The first time each round a creature takes damage from Ruin Comes, add your Charisma modifier to it.</p><p><b>Ruin Rolls Forward.</b> <em>Level 7+, Repelling Blast.</em> Once per turn, when you push a creature that has Ruin counters with Repelling Blast, it takes damage from Ruin Comes immediately and keeps its counters.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Blade of the End",
    "body": "<p><b>Ruin Edge.</b> <em>Level 7+, Pact of the Blade.</em> Damage you deal with your pact weapon counts as damage from a Warlock cantrip for Ruin Comes and Foregone Conclusion.</p><p><b>Arrival Strike.</b> <em>Pact of the Blade.</em> Immediately after you use Appointed Ground, you can make one attack with your pact weapon against a creature within its reach. This takes no action.</p><p><b>Sentence Passed.</b> <em>Level 9+, Eldritch Smite.</em> When you use Eldritch Smite, the target also gains Ruin counters equal to the level of the spell slot you expended, up to its maximum.</p>"
   }
  ]
 },
 "wl-hyselix": {
  "cls": "warlock",
  "verbatim": true,
  "nav": "Hyselix the Betraying",
  "navSub": "Levels 3 · 6 · 10 · 14",
  "kicker": "Warlock patron · homebrew",
  "name": "Hyselix the Betraying",
  "tag": "The future in which every trust breaks",
  "flavor": "Hyselix is a future where every promise is kept just long enough to be broken. Its warlock makes friends quickly, and chooses whether each one finds out what the friendship was.",
  "src": "The Ouronaks, Kor homebrew",
  "mods": {
   "charmed": "Every Charmed creature here comes from Easy Trust and ends in a choice: Betray or Keep. Stolen Trust can pass someone else's Charmed condition to you.",
   "reaction": "Misplaced Trust and Stolen Trust are both Reactions, each limited by uses per Long Rest."
  },
  "features": [
   {
    "lvl": "Level 3",
    "name": "Hour-Bound",
    "body": "<p>You always know the Doom Clock of any avatar of Hyselix within 1 mile.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Hyselix Spells",
    "body": "<p>Extra {{preparedspells}}. Level 3: <em>Charm Person</em>, <em>Suggestion</em>. Level 5: <em>Hypnotic Pattern</em>, <em>Nondetection</em>. Level 7: <em>Compulsion</em>, <em>Greater Invisibility</em>. Level 9: <em>Dominate Person</em>, <em>Modify Memory</em>.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Easy Trust",
    "body": "<p>Your Patron Hour. As a {{bonusaction|Bonus Action}}, choose a creature within 30 feet that can see or hear you. It makes a Wisdom {{savingthrow}} against your {{spellsavedc|spell save DC}}. On a failure it is {{charmed|Charmed}} by you until the end of your next turn. You can use this a number of times equal to your {{proficiencybonus|Proficiency Bonus}}, and you regain all uses when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Broken Trust",
    "body": "<p>When the Charmed condition you imposed ends, choose one.</p><p><b>Betray.</b> The creature knows what you did. It takes 2d8 Psychic damage and has Disadvantage on its next attack roll before the end of its next turn.</p><p><b>Keep.</b> The creature doesn't know it was Charmed and remembers a friendly meeting.</p><p>If you or an ally harmed the creature, you must Betray. The damage is 3d8 from level 10.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Misplaced Trust",
    "body": "<p>As a {{reaction}}, when a creature you can see within 60 feet makes an attack roll against you, it makes a Wisdom {{savingthrow}} against your spell save DC. On a failure it must make the attack against a creature of your choice other than you, within the attack's range or reach. If there is none, the attack misses. You can use this a number of times equal to your Proficiency Bonus, and you regain all uses when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Vouched For",
    "body": "<p>When you Keep a charm, the creature vouches for you for 24 hours. It is Friendly to you, and so are creatures loyal to it or friends with it who haven't seen you or your companions act hostile. Telling them the Kept creature sent you gives you Advantage on Charisma (Deception or Persuasion) checks to convince them. It ends if you or an ally harm the Kept creature, or if it learns it was Charmed.</p>"
   },
   {
    "lvl": "Level 10",
    "name": "Stolen Trust",
    "body": "<p>As a {{reaction}}, when a creature you can see within 60 feet becomes {{charmed|Charmed}} by someone other than you, it makes a Wisdom {{savingthrow}} against your spell save DC. On a failure the Charmed condition passes to you for the remaining duration. It now counts as one you imposed, so Broken Trust applies. Other effects of the original spell, such as a <em>Dominate Person</em> control link, end. You can use this a number of times equal to your Charisma modifier (minimum 1), and you regain all uses when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 14",
    "name": "Betrayal, Most Deep",
    "body": "<p>As a {{magicaction|Magic action}}, choose a point within 120 feet. A 40-foot-radius sphere appears there for 1 minute, and you must {{concentration|concentrate}} on it. It affects every creature inside, including you and your allies. It starts with a Rift count of 0, to a maximum of 6.</p><p>At the end of each creature's turn in the sphere, if it attacked an ally or targeted one with a damaging effect that turn, the Rift count increases by 1. A creature that did neither makes a Wisdom saving throw against your spell save DC. On a failure it takes (2 + Rift) d10 Psychic damage, or half as much on a success. A creature with no ally in reach or range can't comply, so it makes the saving throw.</p><p>Once per {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Spy",
    "body": "<p><b>Borrowed Face.</b> <em>Level 6+, Mask of Many Faces.</em> When you cast <em>Disguise Self</em> with Mask of Many Faces, it lasts 8 hours instead of 1 hour.</p><p><b>Quiet Word.</b> <em>Level 6+, Gaze of Two Minds.</em> A creature you Kept counts as willing for Gaze of Two Minds, and you don't need to touch it if it is within 30 feet.</p><p><b>Guest List.</b> <em>Level 7+, Pact of the Tome.</em> A page of your Book of Shadows holds a number of names equal to your Charisma modifier (minimum 1). When you Keep a creature, you can write its name on the page. While the name is there, Vouched For doesn't expire for that creature. Erasing a name is a Magic action, and a name also erases itself if the creature learns it was Charmed.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Betrayer",
    "body": "<p><b>Last Word.</b> <em>Level 6+, a Warlock cantrip that deals damage.</em> When you choose Betray, you can cast one Warlock cantrip that has a casting time of an action, targeting the creature whose Charmed condition ended. This takes no action.</p><p><b>Aimed Wrong.</b> <em>Level 6+.</em> When Misplaced Trust redirects an attack, the redirected attack roll has Advantage.</p><p><b>Trust by Proxy.</b> <em>Pact of the Chain.</em> You can use Easy Trust as though you were in your familiar's space, so range and line of sight come from your familiar.</p>"
   }
  ]
 },
 "wl-sherg": {
  "cls": "warlock",
  "verbatim": true,
  "nav": "Sherg'ozoth the Incomprehensible",
  "navSub": "Levels 3 · 6 · 10 · 14",
  "kicker": "Warlock patron · homebrew",
  "name": "Sherg'ozoth the Incomprehensible",
  "tag": "The future that cannot be held in one mind",
  "flavor": "Sherg'ozoth is a future too large for any one head. Its warlock leaves pieces of themselves lying about, and what they cannot hold in one place they hold in several.",
  "src": "The Ouronaks, Kor homebrew",
  "mods": {
   "concentration": "This subclass is built to end it. Overfull Mind gives Disadvantage on the saves, Unmoored Thought ends it outright, and from 10 the loss spreads to creatures nearby. A Shard can also hold a second Concentration spell for you.",
   "frightened": "Overfull Mind gives creatures you choose Disadvantage on saves against it, which makes Fear much more reliable around you and your Shards.",
   "emanation": "Overfull Mind is a 10-foot emanation, and from 6 it also comes from each of your Shards."
  },
  "features": [
   {
    "lvl": "Level 3",
    "name": "Hour-Bound",
    "body": "<p>You always know the Doom Clock of any avatar of Sherg'ozoth within 1 mile.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Sherg'ozoth Spells",
    "body": "<p>Extra {{preparedspells}}. Level 3: <em>Dissonant Whispers</em>, <em>Mirror Image</em>. Level 5: <em>Fear</em>, <em>Major Image</em>. Level 7: <em>Confusion</em>, <em>Phantasmal Killer</em>. Level 9: <em>Mislead</em>, <em>Synaptic Static</em>.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Overfull Mind",
    "body": "<p>Your Patron Hour. Creatures of your choice in a 10-foot {{emanation}} from you have Disadvantage on Constitution saving throws to maintain {{concentration|Concentration}} and on saving throws against being {{frightened|Frightened}}.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Unmoored Thought",
    "body": "<p>Once per turn, when you hit a creature with a Warlock {{cantrip}}, you can force it to make an Intelligence {{savingthrow}} against your {{spellsavedc|spell save DC}}. On a failure, its {{concentration|Concentration}} ends and it can't Concentrate until the start of your next turn. If it wasn't concentrating, it has Disadvantage on the next saving throw it makes before the start of your next turn.</p><p>You can use this a number of times equal to your Charisma modifier (minimum 1), and you regain all uses when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Shard",
    "body": "<p>A piece of you is left elsewhere: an eye, a hand or a mouth hanging in the air. As a {{bonusaction|Bonus Action}}, place a {{shard|Shard}} at a point you can see within 60 feet. It is a point, not a creature or object, and can't be attacked or targeted. It lasts 1 hour, until you place it again, or until you are more than 120 feet away. You can have 1 Shard, 2 at level 10 and 3 at level 14.</p><p><b>Folded distance.</b> Your Warlock spells and cantrips can use a Shard in place of you for range and line of sight, and you can speak through a Shard.</p><p><b>Spread mind.</b> Overfull Mind also emanates from each Shard.</p><p><b>A second thought.</b> You can have a Shard hold a Warlock {{concentration|Concentration}} spell (one per Shard) while you Concentrate on a different spell. Make a separate Constitution saving throw for each spell when you take damage. A Shard's spell ends if the Shard ends or you are {{incapacitated|Incapacitated}}.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Wounds Elsewhere",
    "body": "<p>Once per round, when you take damage, each creature of your choice within 10 feet of one of your Shards takes Psychic damage equal to half the damage you took, rounded down. No attack roll or saving throw.</p>"
   },
   {
    "lvl": "Level 10",
    "name": "Cascade of Thought",
    "body": "<p>When a creature loses {{concentration|Concentration}} because of your damage or Unmoored Thought, each other Concentrating creature within 10 feet of it must succeed on a Constitution {{savingthrow}} against your spell save DC or lose Concentration too. The same applies around each Shard: creatures within 10 feet of a Shard whose point is within 10 feet of the first creature. A creature that loses Concentration this way triggers the effect again, but a creature makes this save only once per round.</p>"
   },
   {
    "lvl": "Level 14",
    "name": "Unbounded Form",
    "body": "<p>As a {{bonusaction|Bonus Action}}, you unfold. Your body comes apart along lines that were never there, and the pieces reach through every Shard. You take 2d8 Psychic damage for each Shard you have, and this damage can't be reduced. The form lasts for 1 minute and ends early if you are {{incapacitated|Incapacitated}}. Once you use it, you can't use it again until you finish a {{longrest|Long Rest}}. While unfolded:</p><p><b>Wrong flesh.</b> You gain {{temporaryhp|Temporary Hit Points}} equal to twice your Warlock level. You can't cast leveled spells, though a Shard keeps holding any spell it already holds.</p><p><b>Unfolded limbs.</b> Your Warlock cantrips that require an attack roll become melee spell attacks with a reach of 10 feet. You can make them from any Shard as though you stood there, striking creatures within 10 feet of that Shard. Using Unmoored Thought costs no use.</p><p><b>Cascade.</b> When you hit a creature with such a cantrip, each other creature within 10 feet of the target makes an Intelligence saving throw against your spell save DC. On a failure, it takes half the damage you dealt (rounded down), loses Concentration, and is Frightened of you until the end of its next turn. Each creature that failed then erupts in turn: each unaffected creature within 5 feet of it makes the same save, and on a failure takes a quarter of the damage you dealt (rounded down) and loses Concentration. A creature takes cascade damage from each of your hits only once.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Shardcaster",
    "body": "<p><b>Shard-Seen.</b> <em>Level 6+, Gaze of Two Minds.</em> One of your Shards counts as a willing creature for Gaze of Two Minds, and you don't need to touch it.</p><p><b>Held Beyond.</b> <em>Level 6+, Eldritch Mind.</em> Eldritch Mind also applies to saves to maintain spells held by a Shard. A held spell no longer ends when you are Incapacitated, only when you die or the Shard ends.</p><p><b>Another Piece.</b> <em>Level 9+.</em> You can have one more Shard than usual.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Fractal Breaker",
    "body": "<p><b>Compounding Thought.</b> <em>Level 7+, Agonizing Blast.</em> When a creature loses Concentration because of your damage, Unmoored Thought or Cascade of Thought, it takes Psychic damage equal to 1d6 per level of the spell it was concentrating on. This happens once per creature per round.</p><p><b>Drag Through Elsewhere.</b> <em>Level 6+, Repelling Blast.</em> When you push a creature with Repelling Blast, the push can be directly away from you or directly away from any of your Shards.</p><p><b>Blade From Elsewhere.</b> <em>Level 6+, Pact of the Blade.</em> You can make attacks with your pact weapon from any Shard as though you stood there, against creatures within the weapon's reach of that Shard.</p>"
   }
  ]
 },
 "wl-unaal": {
  "cls": "warlock",
  "verbatim": true,
  "nav": "Unaal the Hollow",
  "navSub": "Levels 3 · 6 · 10 · 14",
  "kicker": "Warlock patron · homebrew",
  "name": "Unaal the Hollow",
  "tag": "The future in which nothing is left to matter to",
  "flavor": "Unaal is a future after everyone has stopped caring. Its warlock stands in the middle of a fight and drains the want out of everything near them, then lives on what they take.",
  "src": "The Ouronaks, Kor homebrew",
  "mods": {
   "temporaryhp": "This is the whole engine. Siphoned Interest builds a pool of them from the creatures you have made Calm, up to a cap, and Hollow Gift hands the pool to your allies at 14.",
   "concentration": "Held Together means damage fully absorbed by your Temporary Hit Points never forces a Concentration save, which keeps defensive spells running."
  },
  "features": [
   {
    "lvl": "Level 3",
    "name": "Hour-Bound",
    "body": "<p>You always know the Doom Clock of any avatar of Unaal within 1 mile.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Unaal Spells",
    "body": "<p>Extra {{preparedspells}}. Level 3: <em>Ray of Enfeeblement</em>, <em>Blur</em>. Level 5: <em>Bestow Curse</em>, <em>Protection from Energy</em>. Level 7: <em>Blight</em>, <em>Stoneskin</em>. Level 9: <em>Enervation</em>, <em>Wall of Force</em>.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Fallen Quiet",
    "body": "<p>Your Patron Hour. As a {{reaction}}, when a creature you can see within 30 feet drops to 0 Hit Points, each creature of your choice within 10 feet of it makes a Charisma {{savingthrow}} against your {{spellsavedc|spell save DC}}. On a failure, it is {{calm|Calm}} for 1 minute, and you count as the creature that applied it. Once per {{shortrest|Short}} or {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Unmattering",
    "body": "<p>Once per turn, when you hit a creature with a Warlock {{cantrip}}, you can force it to make a Charisma saving throw against your spell save DC. On a failure, it is {{calm|Calm}} for 1 minute and you count as the creature that applied it, so your own damage never ends it. A creature you Calmed has Disadvantage on attack rolls against creatures other than you.</p><p>You can use this a number of times equal to your Charisma modifier (minimum 1), and you regain all uses when you finish a {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Level 3",
    "name": "Siphoned Interest",
    "body": "<p>At the start of each of your turns, you gain {{temporaryhp|Temporary Hit Points}} equal to your Charisma modifier plus your {{proficiencybonus|Proficiency Bonus}} for each creature within 30 feet of you that is {{calm|Calm}} by you, counting up to your Proficiency Bonus in creatures. These add to any Temporary Hit Points you already have instead of replacing them, but your total from this feature can't exceed twice your Warlock level.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Held Together",
    "body": "<p>If damage you take is entirely absorbed by your Temporary Hit Points, you don't have to make a Constitution saving throw to maintain {{concentration|Concentration}} because of it.</p>"
   },
   {
    "lvl": "Level 6",
    "name": "Spreading Quiet",
    "body": "<p>When a creature that is {{calm|Calm}} by you ends its turn, each creature of your choice within 10 feet of it makes a Charisma {{savingthrow}} against your spell save DC. On a failure, it is Calm for 1 minute and you count as the creature that applied it.</p>"
   },
   {
    "lvl": "Level 10",
    "name": "Deepening Drain",
    "body": "<p>Each creature that is {{calm|Calm}} by you has a Drain stage, starting at 1. At the start of each of your turns, Siphoned Interest drains each such creature at its current stage, and then its stage rises by 1, to a maximum equal to your Proficiency Bonus. For each creature, Siphoned Interest gives you an extra amount of {{temporaryhp|Temporary Hit Points}} equal to your Charisma modifier for each stage above the first, and that creature takes Psychic damage equal to the Temporary Hit Points it would give you before the cap applies. This damage can't end its Calm.</p>"
   },
   {
    "lvl": "Level 14",
    "name": "Hollow Gift",
    "body": "<p>As a {{bonusaction|Bonus Action}}, you give away what you've drained. Each creature of your choice within 60 feet, other than you, gains {{temporaryhp|Temporary Hit Points}} equal to your current Temporary Hit Points, and you lose all of yours. For the next minute, whenever you gain Temporary Hit Points from Siphoned Interest, each of those creatures gains the same amount. A creature's total Temporary Hit Points from this feature can't exceed your Siphoned Interest cap. Once per {{longrest|Long Rest}}.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Wall",
    "body": "<p><b>Deeper Well.</b> <em>Level 5+.</em> The cap on Temporary Hit Points from Siphoned Interest increases by your Warlock level, so it becomes three times your Warlock level.</p><p><b>Quiet Before.</b> <em>Level 5+.</em> When you roll Initiative, you gain Temporary Hit Points equal to your Warlock level. Your total Temporary Hit Points from this invocation and Siphoned Interest can't exceed the Siphoned Interest cap.</p><p><b>Familiar of the Quiet.</b> <em>Level 5+, Pact of the Chain.</em> Once per round, when your familiar hits a creature, you can have that creature make a Charisma saving throw against your spell save DC. On a failure, it is Calm for 1 minute and you count as the creature that applied it. This doesn't use up Unmattering.</p>"
   },
   {
    "lvl": "Invocations",
    "name": "Giver",
    "body": "<p><b>Drink Deep.</b> <em>Level 5+, a Warlock cantrip that deals damage.</em> Once per turn, when you deal damage to a creature Calm by you with a Warlock cantrip, you gain Temporary Hit Points equal to your Charisma modifier (minimum 1). These count toward the Siphoned Interest cap.</p><p><b>Pass the Weight.</b> <em>Level 7+.</em> As a Bonus Action, you can give up to your Warlock level in Temporary Hit Points to one creature within 30 feet. You lose that many.</p><p><b>Names Unmourned.</b> <em>Level 9+, Pact of the Tome, Gift of the Protectors.</em> When Gift of the Protectors keeps a creature at 1 Hit Point, that creature also gains Temporary Hit Points equal to your Warlock level. You lose that many.</p>"
   }
  ]
 }
};
  var GROUP = {
 "homebrew": true,
 "label": "Homebrew patrons (Kor: the Ouronaks)",
 "keys": [
  "wl-asterion",
  "wl-hyselix",
  "wl-sherg",
  "wl-unaal"
 ]
};

  Object.keys(TERMS).forEach(function (k) { if (!C.TERMS[k]) { C.TERMS[k] = TERMS[k]; } });
  Object.keys(ENTRIES).forEach(function (k) { C.ENTRIES[k] = ENTRIES[k]; });
  C.CLASSES.warlock.groups.push(GROUP);
})();
