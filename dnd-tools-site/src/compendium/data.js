/* Subclass Compendium — content.
   Terms, class definitions and entries. The page in index.html renders this;
   nothing here knows anything about the DOM. */
(function(){
"use strict";

  /* ================= glossary ================= */
var TERMS = {
    /* --- universal --- */
    advantage:{n:"Advantage",s:"core",d:"Roll two twenty-sided dice and keep the higher. Worth about +5 on average, and it doesn't stack — two sources is still just advantage."},
    disadvantage:{n:"Disadvantage",s:"core",d:"Roll two dice and keep the lower. One advantage and one disadvantage cancel out completely, however many of each you have."},
    bonusaction:{n:"Bonus Action",s:"core",d:"A small extra action on your turn, on top of your main one. Only one per turn, so features competing for it is a real cost."},
    reaction:{n:"Reaction",s:"core",d:"Something you do outside your own turn, in response to a trigger. One per round, refreshing at the start of your turn."},
    savingthrow:{n:"Saving Throw",s:"core",d:"A roll to resist something happening to you — a spell, a poison, a shove. Six kinds, one per ability score."},
    abilitycheck:{n:"Ability check",s:"core",d:"A roll to see whether you manage something: climbing, persuading, spotting. Usually an ability plus a skill."},
    proficiencybonus:{n:"Proficiency Bonus",s:"core",d:"A number that rises with level, +2 to +6. Added to things you're trained in, and it sets the difficulty of effects others resist."},
    concentration:{n:"Concentration",s:"core",d:"Some ongoing effects need focus, and taking damage can break it. You can only hold one at a time, which quietly limits a lot of builds."},
    temporaryhp:{n:"Temporary Hit Points",s:"core",d:"A buffer absorbing damage before your real hit points do. They don't stack — a new batch replaces the old — and they don't heal you."},
    hitpoints:{n:"Hit Points",s:"core",d:"How much damage you can take before dropping. At zero you're dying, not dead."},
    resistance:{n:"Resistance",s:"core",d:"You take half damage from that type."},
    immunity:{n:"Immunity",s:"core",d:"Completely unaffected. For damage that means none at all; for a condition it means the condition can't take hold."},
    charmed:{n:"Charmed",s:"core",d:"A condition. You can't attack whoever charmed you, and they have an easier time influencing you socially."},
    frightened:{n:"Frightened",s:"core",d:"A condition. Disadvantage on rolls while you can see the source, and you can't willingly move closer to it."},
    prone:{n:"Prone",s:"core",d:"A condition. You're on the ground — slow, worse at attacking, easier to hit in melee. Standing costs half your movement."},
    incapacitated:{n:"Incapacitated",s:"core",d:"A condition. No actions, no reactions, no concentration."},
    exhaustion:{n:"Exhaustion",s:"core",d:"A stacking penalty from pushing too hard. Each level makes everything measurably worse, and it clears slowly."},
    longrest:{n:"Long Rest",s:"core",d:"Roughly eight hours of sleep. Resets almost everything."},
    shortrest:{n:"Short Rest",s:"core",d:"About an hour of sitting down. Classes that recharge on one can go much harder between big rests."},
    ritual:{n:"Ritual",s:"core",d:"Casting a spell the slow way — ten extra minutes — without spending a spell slot. Only works outside a fight."},
    spellslot:{n:"Spell slot",s:"core",d:"The fuel most casters spend to cast. Psions famously don't have any — they use points instead."},
    cantrip:{n:"Cantrip",s:"core",d:"A small spell you can cast endlessly without spending anything."},
    speed:{n:"Speed",s:"core",d:"How far you can move on your turn, in feet. Most people have 30."},
    initiative:{n:"Initiative",s:"core",d:"The roll at the start of a fight that sets turn order. Going early is worth more than it sounds."},
    teleport:{n:"Teleport",s:"core",d:"Move instantly from one place to another without crossing the space between — ignoring terrain, walls and anything waiting in the middle."},
    opportunityattack:{n:"Opportunity Attack",s:"core",d:"A free swing an enemy gets when you walk out of its reach. Avoiding them is why so many movement features say 'without provoking'."},
    unarmedstrike:{n:"Unarmed Strike",s:"core",d:"Hitting something with your body. It counts as a weapon attack for most purposes."},
    emanation:{n:"Emanation",s:"core",d:"A 2024 term for an area radiating out from you and moving with you, rather than aimed at a fixed point."},
    darkvision:{n:"Darkvision",s:"core",d:"You see in dim light as though bright, and in darkness as though dim — in grey, not colour."},
    flyspeed:{n:"Fly Speed",s:"core",d:"You can move through the air at that rate. Unless it says you can hover, you fall when you stop."},
    necroticradiant:{n:"Necrotic and Radiant",s:"core",d:"Two damage types: withering death-magic, and searing holy light. Few things resist both."},
    antimagic:{n:"Antimagic",s:"core",d:"Effects that switch magic off in an area, or strip it from a target. Psionics get caught by some of these and slip past others."},
    extraattack:{n:"Extra Attack",s:"core",d:"From level 5, attacking takes two swings instead of one. Most weapon classes get it; it roughly doubles your damage overnight."},

    /* --- barbarian --- */
    rage:{n:"Rage",s:"barbarian",d:"The Barbarian's core trick. A Bonus Action switch giving resistance to most weapon damage, bonus damage on Strength attacks, and advantage on Strength rolls — but it blocks spellcasting."},
    ragedamage:{n:"Rage Damage bonus",s:"barbarian",d:"The extra damage Rage adds to Strength attacks, from +2 up to +4. Several features use this number as a dice count."},
    recklessattack:{n:"Reckless Attack",s:"barbarian",d:"Declare it on your first attack: advantage on Strength attacks until your next turn, and everyone gets advantage attacking you."},
    brutalstrike:{n:"Brutal Strike",s:"barbarian",d:"From level 9, trade the advantage from Reckless Attack on one attack for extra damage and a rider — a shove, or a speed cut."},
    unarmoreddefense:{n:"Unarmored Defense",s:"barbarian",d:"With no armour on, your Armor Class is 10 plus Dexterity and Constitution. A shield still works. This is why Barbarians fight bare-chested."},
    weaponmastery:{n:"Weapon Mastery",s:"barbarian",d:"New in 2024: each weapon has a special property — Push, Topple, Cleave — and you know a couple of them, swappable on a long rest."},
    dangersense:{n:"Danger Sense",s:"barbarian",d:"Advantage on Dexterity saving throws — the ones for dodging fireballs, traps and falling rock — unless you're incapacitated."},

    /* --- psion --- */
    psipoints:{n:"Psi points",s:"psion",d:"The Psion's fuel, replacing spell slots entirely. You have as many as your level, spend at most half your level at once, and get them all back on a short rest."},
    psionicdiscipline:{n:"Psionic discipline",s:"psion",d:"A branch of mental power — telepathy, telekinesis and seven more. Each gives a free passive ability plus one active power you pump psi points into. You start with one, and get more at 3rd and 18th."},
    psionicpower:{n:"Psionic power",s:"psion",d:"The active ability at the heart of each discipline. Spending more psi points makes it bigger, and most disciplines add extra ways to shape it."},
    psionictalent:{n:"Psionic talent",s:"psion",d:"Small permanent upgrades picked from a list, starting with two at 2nd level. Many require a specific discipline, so your talents follow your disciplines."},
    psionicability:{n:"Psionic ability",s:"psion",d:"Your Intelligence plus proficiency bonus, used for the difficulty of your powers and for your attack rolls with them."},
    innatepsionics:{n:"Innate Psionics",s:"psion",d:"From 11th level, a handful of very large spells you can cast once each per long rest, whatever your disciplines. Unlike everything else, these need the spell's components."},
    astralconstruct:{n:"Astral Construct",s:"psion",d:"A creature built out of thought and projected into the world. It acts on your turn and can be rebuilt each time you make it."},
    borderethereal:{n:"Border Ethereal",s:"psion",d:"A layer sitting alongside the ordinary world — close enough to see into, far enough that most things there can't touch you."}
  };

  /* ================= content ================= */
var CLASSES = {
    barbarian: {
      name: "Barbarian", src: "official",
      note: "<strong>The simple case.</strong> One class, four paths that all modify a single central term. Feature text is paraphrased, with page references to the 2024 Player's Handbook.",
      foot: "Source: Player's Handbook (2024), Chapter 3 — Barbarian, pp. 50–57.",
      groups: [
        { label: "The class itself", keys: ["b-core"] },
        { label: "Paths", keys: ["b-berserker","b-wildheart","b-worldtree","b-zealot"] }
      ]
    },
    psion: {
      name: "Psion", src: "homebrew",
      note: "<strong>The hard case.</strong> A Psion juggles two separate lists — an archetype that shapes who they are, and disciplines that decide what they can actually do. Your archetype hands you your first discipline; the rest you choose. Paraphrased from Kibbles' Compendium of Craft and Creation.",
      foot: "Source: Kibbles' Compendium of Craft and Creation v1.2.1 (KibblesTasty), Chapter 1 — Psion, pp. 64–85.",
      groups: [
        { label: "The class itself", keys: ["p-core"] },
        { label: "Archetypes — who you are", keys: ["p-awakened","p-unleashed","p-transcended","p-shaper","p-wandering","p-elemental","p-consuming"] },
        { label: "Disciplines — what you can do", keys: ["p-telepathy","p-telekinesis","p-enhancement","p-projection","p-transposition","p-psychokinesis","p-precognition","p-nullification","p-consumption"] }
      ]
    }
  };

var ENTRIES = {

    /* ---------------- Barbarian ---------------- */
    "b-core": { cls:"barbarian", nav:"Core features", navSub:"The class itself", kicker:"Barbarian",
      name:"Core Class Features", tag:"What every Barbarian has, whichever path they walk",
      flavor:"Read this first — every path modifies something on this page. Barbarians run on primal force that surfaces as Rage: not a mood, but an incarnation of a predator's ferocity and a storm's fury.",
      src:"Player's Handbook 2024, pp. 50–53", mods:{},
      features:[
        {lvl:"Level 1",name:"Rage",body:
          "<p>Enter it as a {{bonusaction}} when you aren't in heavy armour. Limited uses, one back on a {{shortrest}} and all on a {{longrest}}.</p>"+
          "<ul><li><b>Damage Resistance.</b> {{resistance}} to bludgeoning, piercing and slashing — nearly everything a weapon does.</li>"+
          "<li><b>Rage Damage.</b> Strength attacks deal extra damage, the {{ragedamage}}.</li>"+
          "<li><b>Strength Advantage.</b> {{advantage}} on Strength checks and saves.</li>"+
          "<li><b>No spells.</b> You can't cast, and you can't hold {{concentration}}.</li></ul>"+
          "<p>It lasts until the end of your next turn; extend it by attacking, forcing a {{savingthrow}}, or spending a {{bonusaction}} — up to ten minutes. Heavy armour or {{incapacitated}} ends it.</p>"},
        {lvl:"Level 1",name:"Unarmored Defense",body:"<p>{{unarmoreddefense}}. A shield is still allowed.</p>"},
        {lvl:"Level 1",name:"Weapon Mastery",body:"<p>You can use the {{weaponmastery}} property of two kinds of weapon, rising to four by level 12, swappable on a {{longrest}}.</p>"},
        {lvl:"Level 2",name:"Danger Sense",body:"<p>{{dangersense}}.</p>"},
        {lvl:"Level 2",name:"Reckless Attack",body:"<p>{{recklessattack}}. Almost every Barbarian feature keys off this, so the trade is less optional than it looks.</p>"},
        {lvl:"Level 3",name:"Primal Knowledge",body:"<p>One more skill, and while raging you can make an {{abilitycheck}} for Acrobatics, Intimidation, Perception, Stealth or Survival using Strength instead of its usual ability.</p>"},
        {lvl:"Level 5",name:"Extra Attack, Fast Movement",body:"<p>{{extraattack}}, and your {{speed}} rises by 10 feet out of heavy armour.</p>"},
        {lvl:"Level 7",name:"Feral Instinct, Instinctive Pounce",body:"<p>{{advantage}} on {{initiative}}, and entering Rage carries you half your {{speed}} in the same {{bonusaction}}.</p>"},
        {lvl:"Level 9",name:"Brutal Strike",body:"<p>{{brutalstrike}}. Forceful Blow shoves the target 15 feet and lets you follow without provoking an {{opportunityattack}}; Hamstring Blow cuts its {{speed}} by 15 feet.</p>"},
        {lvl:"Level 11",name:"Relentless Rage",body:"<p>Dropping to 0 {{hitpoints}} while raging lets you make a Constitution {{savingthrow}} to stand back up on twice your level in hit points. The difficulty climbs each time until you rest.</p>"},
        {lvl:"Level 15",name:"Persistent Rage",body:"<p>Rolling {{initiative}} refills all Rage uses once per {{longrest}}, and Rage now runs ten minutes on its own.</p>"},
        {lvl:"Levels 18–20",name:"Indomitable Might, Primal Champion",body:"<p>Strength rolls can't total less than your Strength score, and at 20 your Strength and Constitution both rise by 4, past the usual ceiling.</p>"}
      ]},

    "b-berserker": { cls:"barbarian", nav:"Path of the Berserker", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Barbarian path",
      name:"Path of the Berserker", tag:"Channel Rage into violent fury",
      flavor:"The plainest of the four and the most direct. Berserkers point their Rage at violence and nothing else, and thrill in the chaos as it takes hold of them.",
      src:"Player's Handbook 2024, p. 54",
      mods:{
        rage:"Frenzy turns Rage from a defensive switch into a damage engine, and from 6 it makes you immune to being charmed or frightened while it lasts — raging actually scrubs those off you. From 14 you can spend a use of Rage to reload Intimidating Presence.",
        recklessattack:"Frenzy only fires if you attacked recklessly, so the trade stops being a judgement call and becomes your default opening.",
        charmed:"Rage makes you immune, and ends it if it's already on you.",
        frightened:"Rage makes you immune, and ends it if it's already on you. You also hand it out at 14."},
      features:[
        {lvl:"Level 3",name:"Frenzy",body:"<p>If you use {{recklessattack}} while raging, the first target you hit each turn with a Strength attack takes extra damage: roll d6s equal to your {{ragedamage}}.</p>"},
        {lvl:"Level 6",name:"Mindless Rage",body:"<p>{{immunity}} to {{charmed}} and {{frightened}} while {{rage|your Rage}} is active — and entering Rage ends either one already on you.</p>"},
        {lvl:"Level 10",name:"Retaliation",body:"<p>When something within 5 feet damages you, spend your {{reaction}} to swing back with a weapon or {{unarmedstrike}}.</p>"},
        {lvl:"Level 14",name:"Intimidating Presence",body:"<p>A {{bonusaction}} forces every creature you choose in a 30-foot {{emanation}} to make a Wisdom {{savingthrow}} against 8 plus your Strength modifier and {{proficiencybonus}}, or be {{frightened}} for a minute. Once per {{longrest}}, or spend a use of {{rage|Rage}} to get it back.</p>"}
      ]},

    "b-wildheart": { cls:"barbarian", nav:"Path of the Wild Heart", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Barbarian path",
      name:"Path of the Wild Heart", tag:"Walk in community with the animal world",
      flavor:"These Barbarians count animals as kin. They learn to speak with them, and their Rage borrows an animal's shape of strength rather than simply burning hotter.",
      src:"Player's Handbook 2024, p. 55",
      mods:{
        rage:"This is the path that makes Rage a choice rather than a switch. Every time you enter it you pick an animal: Bear widens your resistance to almost everything, Eagle folds Disengage and Dash into the same Bonus Action, Wolf hands allies advantage against anyone beside you. From 14 you pick a second benefit on top.",
        resistance:"Bear turns Rage's three damage types into every type except force, necrotic, psychic and radiant — by far the broadest defence any Barbarian gets.",
        ritual:"Rage blocks spellcasting, so these spells live entirely outside it. Ritual-only isn't the limitation it looks like: you were never casting them mid-rage anyway.",
        speed:"Panther and Salmon give climb and swim speeds matching your own; Falcon adds flight while raging unarmoured.",
        advantage:"Wolf gives it to your allies rather than you — the only Barbarian feature that does.",
        prone:"Ram lets any melee hit knock a Large or smaller creature down while you're raging."},
      features:[
        {lvl:"Level 3",name:"Animal Speaker",body:"<p>Cast Beast Sense and Speak with Animals, but only as {{ritual|Rituals}}, using Wisdom.</p>"},
        {lvl:"Level 3",name:"Rage of the Wilds",body:"<p>Choose one each time you enter {{rage|your Rage}}:</p><ul>"+
          "<li><b>Bear.</b> {{resistance}} to every damage type except force, necrotic, psychic and radiant.</li>"+
          "<li><b>Eagle.</b> Disengage and Dash inside the {{bonusaction}} that starts your Rage, and again as a Bonus Action each turn after.</li>"+
          "<li><b>Wolf.</b> Allies get {{advantage}} attacking anyone within 5 feet of you.</li></ul>"},
        {lvl:"Level 6",name:"Aspect of the Wilds",body:"<p>Pick one, swappable on a {{longrest}}: {{darkvision}} to 60 feet, a climb {{speed}} matching your own, or a swim speed matching your own.</p>"},
        {lvl:"Level 10",name:"Nature Speaker",body:"<p>Commune with Nature, as a {{ritual}}.</p>"},
        {lvl:"Level 14",name:"Power of the Wilds",body:"<p>A second choice each time you rage:</p><ul>"+
          "<li><b>Falcon.</b> A {{flyspeed}} matching your own, unarmoured.</li>"+
          "<li><b>Lion.</b> Enemies within 5 feet have {{disadvantage}} attacking anyone but you.</li>"+
          "<li><b>Ram.</b> Melee hits can knock a Large or smaller creature {{prone}}.</li></ul>"}
      ]},

    "b-worldtree": { cls:"barbarian", nav:"Path of the World Tree", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Barbarian path",
      name:"Path of the World Tree", tag:"Trace the roots and branches of the multiverse",
      flavor:"Rage as a connection to Yggdrasil, the cosmic tree threaded through the planes. The strangest Barbarian on the list: part bodyguard, part public transport.",
      src:"Player's Handbook 2024, p. 56",
      mods:{
        rage:"Rage stops being purely selfish. Entering it hands you temporary hit points equal to your level, and each turn it's up you can pass a fresh batch to somebody within 10 feet. From 14, entering Rage also teleports you.",
        temporaryhp:"The whole path runs on these. They vanish when Rage ends, so they're a fight's worth of buffer, not a savings account.",
        reaction:"Branches of the Tree spends it to yank an enemy across the battlefield to you — a far better use than one more swing.",
        weaponmastery:"Battering Roots fires Push or Topple on top of whatever mastery you were already using. Two effects from one hit, which nothing else in the class does.",
        teleport:"By 14 this is your movement. Entering Rage teleports you, and a Bonus Action does it again each turn."},
      features:[
        {lvl:"Level 3",name:"Vitality of the Tree",body:
          "<p><b>Vitality Surge.</b> Entering {{rage|your Rage}} gives you {{temporaryhp}} equal to your Barbarian level.</p>"+
          "<p><b>Life-Giving Force.</b> At the start of each turn while raging, give a creature within 10 feet temporary hit points: roll d6s equal to your {{ragedamage}}. They vanish when Rage ends.</p>"},
        {lvl:"Level 6",name:"Branches of the Tree",body:"<p>When a visible creature starts its turn within 30 feet while you're raging, spend a {{reaction}} to force a Strength {{savingthrow}} against 8 plus your Strength modifier and {{proficiencybonus}}. On a failure it's {{teleport|teleported}} next to you, and you can drop its {{speed}} to zero for the turn.</p>"},
        {lvl:"Level 10",name:"Battering Roots",body:"<p>Your reach grows 10 feet with heavy or versatile melee weapons, and on a hit you can use Push or Topple <em>as well as</em> a different {{weaponmastery}} property.</p>"},
        {lvl:"Level 14",name:"Travel Along the Tree",body:"<p>{{teleport|Teleport}} 60 feet when you enter Rage and as a {{bonusaction}} while it lasts. Once per Rage, stretch that to 150 feet and bring six willing creatures with you.</p>"}
      ]},

    "b-zealot": { cls:"barbarian", nav:"Path of the Zealot", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Barbarian path",
      name:"Path of the Zealot", tag:"Rage in ecstatic union with a god",
      flavor:"A god, or a whole pantheon, has taken an interest. Zealots feel Rage as divine possession rather than temper — and they are very hard to keep down.",
      src:"Player's Handbook 2024, p. 57",
      mods:{
        rage:"Rage becomes a channel for a god: extra necrotic or radiant damage on your first hit each turn, one guaranteed reroll on a failed save per Rage, and at 14 a flying divine form that can drag a dying ally back. Two features let you spend Rage uses as currency.",
        savingthrow:"Fanatical Focus gives one reroll per Rage with your Rage Damage bonus added — effectively a free save against the effect that would have ended you.",
        necroticradiant:"Divine Fury lets you choose between them on every hit, so you're rarely caught out by a resistance.",
        hitpoints:"Warrior of the Gods is a private pool of d12s spent as a Bonus Action — healing without a healer, unusual for a weapon class.",
        flyspeed:"Rage of the Gods grants it with hovering, for a minute, once per long rest."},
      features:[
        {lvl:"Level 3",name:"Divine Fury",body:"<p>While raging, the first creature you hit each turn takes an extra d6 plus half your level as {{necroticradiant|necrotic or radiant}} damage — your choice each time.</p>"},
        {lvl:"Level 3",name:"Warrior of the Gods",body:"<p>A pool of four d12s. Spend them as a {{bonusaction}} to heal yourself, refilling on a {{longrest}}. The pool grows to seven dice by 17.</p>"},
        {lvl:"Level 6",name:"Fanatical Focus",body:"<p>Once per {{rage|Rage}}, reroll a failed {{savingthrow}} with your {{ragedamage}} added.</p>"},
        {lvl:"Level 10",name:"Zealous Presence",body:"<p>A {{bonusaction}} battle cry gives up to ten allies within 60 feet {{advantage}} on attacks and saves until your next turn. Once per {{longrest}}, or spend a use of {{rage|Rage}}.</p>"},
        {lvl:"Level 14",name:"Rage of the Gods",body:"<p>Entering Rage can turn you into a divine warrior for a minute: a {{flyspeed}} with hovering, {{resistance}} to necrotic, psychic and radiant, and a {{reaction}} that spends a use of Rage to haul a creature within 30 feet back from 0 {{hitpoints}}.</p>"}
      ]},

    /* ---------------- Psion ---------------- */
    "p-core": { cls:"psion", nav:"Core features", navSub:"The class itself", kicker:"Psion",
      name:"Core Class Features", tag:"Two lists to juggle, and no spell slots anywhere",
      flavor:"A Psion has tapped something otherworldly and actualises it through sheer will. Mechanically it's the cleanest break from normal casting in either book: no slots, no prepared list, just a pool of points and a couple of branches of power you shape on the fly.",
      src:"Kibbles' Compendium of Craft and Creation, pp. 64–66", mods:{},
      features:[
        {lvl:"Level 1",name:"Psionic Archetype",body:"<p>Pick who you are: Awakened, Unleashed, Transcended, Shaper's, Wandering, Elemental or Consuming Mind. It grants features at 1, 3, 6, 10 and 14 — and hands you your first {{psionicdiscipline}}.</p>"},
        {lvl:"Level 1",name:"Psionics",body:"<p>Your powers aren't spells, and the difference matters. {{antimagic}} fields suppress them and Dispel Magic works on them, but Counterspell only bites if you were recreating an actual spell. Anyone trying to identify or dispel your powers does so at {{disadvantage}} unless they're psionic too. Detect Magic sees <em>something</em>, but not what.</p>"},
        {lvl:"Level 1",name:"Psi Points",body:"<p>{{psipoints}}. There are no {{spellslot|spell slots}} at any point in this class.</p>"},
        {lvl:"Level 1",name:"Psionic Ability",body:"<p>{{psionicability}}.</p>"},
        {lvl:"Level 2",name:"Psionic Talents",body:"<p>{{psionictalent|Two psionic talents}}, with more at 5, 7, 9, 12, 15 and 18. You can swap one out whenever you level.</p>"},
        {lvl:"Level 3",name:"Second Discipline",body:"<p>A second {{psionicdiscipline}}, chosen freely — this is where the two lists stop matching up, and where a Psion starts to look unlike any other Psion.</p>"},
        {lvl:"Level 5",name:"Psionic Mastery",body:"<p>One free psi point at the start of each of your turns, rising to three by 17. It only empowers {{psionicpower|discipline powers}} — not spells, not talents — and it evaporates if unspent.</p>"},
        {lvl:"Level 11",name:"Innate Psionics",body:"<p>{{innatepsionics}}.</p>"},
        {lvl:"Level 18",name:"Third Discipline",body:"<p>A third {{psionicdiscipline}}.</p>"},
        {lvl:"Level 20",name:"Ascension",body:"<p>If you die you can carry on as an incorporeal thing on the {{borderethereal}}, with a ghost's body and your own mind and powers intact. You can't rest in that form; when the {{psipoints}} run out, so do you.</p>"}
      ]},

    "p-awakened": { cls:"psion", nav:"Awakened Mind", navSub:"Grants Telepathy", kicker:"Psion archetype",
      name:"Awakened Mind", tag:"Something switched it on, and it was not gentle",
      flavor:"A latent mind woken by an encounter, a dream, or a glimpse of something that shouldn't have been walking down the street. Awakenings tend to be traumatic, not least because the first power to surface — telepathy — is the one people fear most.",
      src:"Kibbles' Compendium of Craft and Creation, p. 67",
      mods:{
        psionicdiscipline:"Your first one is Telepathy, and the whole archetype is built to sharpen it rather than branch away from it.",
        psionicability:"Mind Reader lets you aim Telepathic Intrusion at Intelligence instead of Wisdom, choosing as you use it — so you can pick whichever save the target is worse at.",
        abilitycheck:"You can read people with Intelligence instead of Wisdom, which conveniently makes your best stat your social stat too."},
      features:[
        {lvl:"Level 1",name:"Opened Mind",body:"<p>You gain the Telepathy {{psionicdiscipline}}.</p>"},
        {lvl:"Level 1",name:"Mental Awareness",body:"<p>Use Intelligence instead of Wisdom on an {{abilitycheck}} to read a creature with a real mind. After speaking telepathically to a willing creature, you know roughly where they are for an hour.</p>"},
        {lvl:"Level 3",name:"Mind Reader",body:"<p>Telepathic Intrusion can demand an Intelligence {{savingthrow}} instead of Wisdom. When a creature fails, you gain a d4 to add to or subtract from your next roll against it.</p>"},
        {lvl:"Level 6",name:"Empowered Psionics",body:"<p>Add your Intelligence modifier to damage from a {{psionicpower}}.</p>"}
      ]},

    "p-unleashed": { cls:"psion", nav:"Unleashed Mind", navSub:"Grants Telekinesis", kicker:"Psion archetype",
      name:"Unleashed Mind", tag:"Power that came with you, and doesn't ask first",
      flavor:"Innate force that mirrors your mood and throws it at the room. An Unleashed Psion's story is usually about control — or about deciding not to bother. Their power tends to become known the first time their temper does.",
      src:"Kibbles' Compendium of Craft and Creation, p. 68",
      mods:{
        psionicdiscipline:"Telekinesis, immediately — the most physical of the branches, which suits a power that expresses itself by throwing things.",
        psipoints:"The rampage die grows the longer you keep dealing damage, and you can spend 2 psi points to roll an extra one when it saves your life.",
        hitpoints:"Unstoppable Rampage turns a killing blow into one hit point if the rampage die beats the overkill damage — a gambler's version of staying up.",
        exhaustion:"Holding the rampage die at its maximum for more than a minute costs you a level of it. The power is genuinely hard to hold."},
      features:[
        {lvl:"Level 1",name:"Unshackled Power",body:"<p>You gain the Telekinesis {{psionicdiscipline}}.</p>"},
        {lvl:"Level 3",name:"Rampaging Power",body:"<p>A d4 you add to one damage roll a turn. Keep dealing damage on consecutive turns and it climbs a step each time up to a d12; stop, or get {{incapacitated}}, and it falls back to a d4. Holding it at d12 past a minute gives you a level of {{exhaustion}}.</p>"},
        {lvl:"Level 14",name:"Unstoppable Rampage",body:"<p>When an attack drops you to 0 {{hitpoints}}, roll the rampage die. Beat the excess damage with it plus your Constitution and you stay up on one hit point. Spend 2 {{psipoints}} for a second die.</p>"}
      ]},

    "p-transcended": { cls:"psion", nav:"Transcended Mind", navSub:"Grants Enhancement", kicker:"Psion archetype",
      name:"Transcended Mind", tag:"Saw where the levers were, and reached for them",
      flavor:"Power through epiphany — usually meditation, occasionally an accident. Transcended Psions hold their abilities more steadily than anyone, having understood the shape of the thing, and are regarded by less transcendent minds as a bit peculiar.",
      src:"Kibbles' Compendium of Craft and Creation, p. 68",
      mods:{
        psionicdiscipline:"Enhancement, which aims your power inward at bodies and abilities rather than outward at the room.",
        temporaryhp:"Perfected Enhancement adds your proficiency bonus to temporary hit points you hand out — small, constant, and it adds up over a long day.",
        concentration:"Mental Control adds your Intelligence to the save for holding concentration on a discipline effect, which matters because psionic effects concentrate like spells do."},
      features:[
        {lvl:"Level 1",name:"Transcendent Mind",body:"<p>You gain the Enhancement {{psionicdiscipline}}.</p>"},
        {lvl:"Level 1",name:"Overwhelming Power",body:"<p>Cast Thaumaturgy psionically, with two extra options: set loose objects floating, or shove everyone within 5 feet back on a failed Strength {{savingthrow}}.</p>"},
        {lvl:"Level 6",name:"Perfected Enhancement",body:"<p>Add your {{proficiencybonus}} to {{temporaryhp}} you grant one creature with a {{psionicpower}}.</p>"},
        {lvl:"Level 10",name:"Mental Control",body:"<p>Add your Intelligence modifier to Constitution saves made to keep {{concentration}} on a discipline effect.</p>"}
      ]},

    "p-shaper": { cls:"psion", nav:"Shaper's Mind", navSub:"Grants Projection", kicker:"Psion archetype",
      name:"Shaper's Mind", tag:"Imagination, made solid enough to swing a sword",
      flavor:"The Psion who builds. Thought is projected outward until it holds shape — a weapon, a tool, or a constructed thing that fights alongside you and gets rebuilt to suit the afternoon.",
      src:"Kibbles' Compendium of Craft and Creation, p. 69",
      mods:{
        psionicdiscipline:"Projection, which is the only discipline whose main power is a creature rather than an effect.",
        astralconstruct:"You get to modify yours: deadlier weapons, the ability to cast your own powers from its space, or permanent solidity. And you can switch which as a bonus action.",
        concentration:"From 3rd level your construct stops needing it, which is enormous — it frees your concentration for everything else you're doing."},
      features:[
        {lvl:"Level 1",name:"Mind Over Matter",body:"<p>You gain the Projection {{psionicdiscipline}}.</p>"},
        {lvl:"Level 1",name:"Boundless Imagination",body:"<p>Give your {{astralconstruct}} one of: bigger weapons (d12 damage), the ability to channel your powers through its space, or automatic solidity each turn. Swap as a {{bonusaction}}.</p>"},
        {lvl:"Level 3",name:"Astral Metastability",body:"<p>Your construct no longer needs {{concentration}} and lasts until dismissed — but you can only have one at a time.</p>"},
        {lvl:"Level 6",name:"Empowered Construct",body:"<p>Add your Intelligence modifier to damage from the construct or a projected weapon.</p>"}
      ]},

    "p-wandering": { cls:"psion", nav:"Wandering Mind", navSub:"Grants Transposition", kicker:"Psion archetype",
      name:"Wandering Mind", tag:"Not entirely rooted in the same reality as everyone else",
      flavor:"Some were born on the ethereal plane, some walked through a door as children, some simply think along an axis nobody else can follow. They treat the metaphysical with the mundanity of someone using an arm.",
      src:"Kibbles' Compendium of Craft and Creation, p. 70",
      mods:{
        psionicdiscipline:"Transposition, and uniquely you run it off Dexterity instead of Intelligence — the only archetype that changes which stat a discipline uses.",
        psionicability:"For Transposition powers only, Dexterity replaces Intelligence. That makes this the one Psion who can reasonably be built as a front-line skirmisher.",
        psionictalent:"Rift Strike arrives free at 3rd level and doesn't count against your total, which effectively hands you a whole extra pick.",
        teleport:"Flicker Step replaces your movement with a short blink that ignores creatures and thin walls. It's how you get around, not an emergency button."},
      features:[
        {lvl:"Level 1",name:"Spatial Manipulation",body:"<p>You gain the Transposition {{psionicdiscipline}}, and use Dexterity in place of Intelligence for its {{psionicability|difficulty and attack rolls}}.</p>"},
        {lvl:"Level 1",name:"Nomad's Gear",body:"<p>Proficiency with martial weapons and medium armour — alone among Psions.</p>"},
        {lvl:"Level 3",name:"Cunning Strikes",body:"<p>The Rift Strike {{psionictalent}} free, not counted against your total. If you already have it, take another instead.</p>"}
      ]},

    "p-elemental": { cls:"psion", nav:"Elemental Mind", navSub:"Grants Psychokinesis", kicker:"Psion archetype",
      name:"Elemental Mind", tag:"Fire, cold and lightning as an extension of will",
      flavor:"The most straightforwardly destructive archetype. An Elemental Mind doesn't summon the elements so much as decide they are happening, and wears whichever one they last used.",
      src:"Kibbles' Compendium of Craft and Creation, p. 71",
      mods:{
        psionicdiscipline:"Psychokinesis — the blaster branch, and the one that most obviously looks like a wizard from the outside.",
        psipoints:"Both of your signature tricks scale off how many you spent: Controlled Power spares that many allies from your own area effect, and Raging Power rerolls that many damage dice plus one.",
        resistance:"The Cold aspect cuts ordinary weapon damage by your proficiency bonus, which is a quiet amount of survivability for a d6 class."},
      features:[
        {lvl:"Level 1",name:"Elemental Power",body:"<p>You gain the Psychokinesis {{psionicdiscipline}}.</p>"},
        {lvl:"Level 1",name:"Primordial Aspect",body:"<p>Dealing fire, cold or lightning damage wraps you in that element until your next turn ends: cold reduces ordinary weapon damage by your {{proficiencybonus}}, fire burns whoever hits you in melee, lightning adds 5 feet of {{speed}}.</p>"},
        {lvl:"Level 3",name:"Controlled Power",body:"<p>When a power covers an area, pick a number of creatures equal to the {{psipoints}} spent — it simply passes around them.</p>"},
        {lvl:"Level 3",name:"Raging Power",body:"<p>Or let it off the leash: reroll a number of damage dice equal to 1 plus the {{psipoints}} spent, keeping the new roll.</p>"}
      ]},

    "p-consuming": { cls:"psion", nav:"Consuming Mind", navSub:"Grants Consumption", kicker:"Psion archetype",
      name:"Consuming Mind", tag:"Other minds as food",
      flavor:"A feared branch, sometimes thought to be the root of all psionics — it turns up in mind-eating monsters and ancient psychic things in deep space. Refined by people who wanted power badly enough to take it from someone.",
      src:"Kibbles' Compendium of Craft and Creation, p. 72",
      mods:{
        psionicdiscipline:"Consumption, which is the only discipline that takes something from a target and gives it to you.",
        psionictalent:"Mind Devourer arrives free at 3rd, ignores its level requirement, and doesn't count against your total — and you can trigger it from 30 feet away when a power of yours kills something.",
        abilitycheck:"After feeding you borrow a skill, tool or language the victim had until your next long rest, one at a time."},
      features:[
        {lvl:"Level 1",name:"Psionic Predator",body:"<p>You gain the Consumption {{psionicdiscipline}}.</p>"},
        {lvl:"Level 3",name:"Ravenous Powers",body:"<p>The Mind Devourer {{psionictalent}} free and uncounted, usable at 30 feet when your powers kill.</p>"},
        {lvl:"Level 6",name:"Empowered Psionics",body:"<p>Add your Intelligence modifier to damage from a {{psionicpower}}.</p>"}
      ]},

    /* --- disciplines --- */
    "p-telepathy": { cls:"psion", nav:"Telepathy", navSub:"Awakened Mind", kicker:"Psion discipline",
      name:"Telepathy Discipline", tag:"Interfering with other minds directly",
      flavor:"The power people fear most, and the one an Awakened Mind surfaces first. Speech without language, and a power that reaches into a mind to rummage.",
      src:"Kibbles' Compendium of Craft and Creation, p. 76",
      mods:{ psionicpower:"Telepathic Intrusion is the active power here — a Wisdom save by default, though an Awakened Mind can aim it at Intelligence instead." },
      features:[
        {lvl:"Passive",name:"Telepathic Communication",body:"<p>Speak mind-to-mind with any creature you can see within 30 feet. No shared language needed, though they must understand at least one. They can answer.</p>"},
        {lvl:"Power",name:"Telepathic Intrusion",body:"<p>The discipline's {{psionicpower}} — a direct strike at a mind, scaled by the {{psipoints}} you feed it.</p>"}
      ]},

    "p-telekinesis": { cls:"psion", nav:"Telekinesis", navSub:"Unleashed Mind", kicker:"Psion discipline",
      name:"Telekinesis Discipline", tag:"Physical objects and energy, at a distance",
      flavor:"The one everyone pictures. Objects and force moved by intent, from opening a latch across the room to hitting something with the room.",
      src:"Kibbles' Compendium of Craft and Creation, p. 75",
      mods:{ psipoints:"Telekinetic Hands normally tops out at 10 pounds — but each psi point spent raises that by 100 pounds for a turn, which is how a party ends up moving a portcullis." },
      features:[
        {lvl:"Passive",name:"Telekinetic Hands",body:"<p>Manipulate small objects within 30 feet as if by hand — opening unlocked doors, retrieving items, pouring vials. No attacking, no magic items, 10 pounds. Spend {{psipoints}} to raise that by 100 pounds per point for a turn.</p>"},
        {lvl:"Power",name:"Telekinetic Force",body:"<p>Smash a creature or object you can see within 60 feet with a Strength {{savingthrow}} to resist.</p>"}
      ]},

    "p-enhancement": { cls:"psion", nav:"Enhancement", navSub:"Transcended Mind", kicker:"Psion discipline",
      name:"Enhancement Discipline", tag:"Reaching into what a body can do",
      flavor:"Power aimed inward rather than outward — at a creature's nature and capabilities, including your own.",
      src:"Kibbles' Compendium of Craft and Creation, p. 73",
      mods:{ abilitycheck:"Enhancing Skill quietly adds a d4 to every Strength or Dexterity check you make, for free, forever. Small numbers that never stop arriving." },
      features:[
        {lvl:"Passive",name:"Enhancing Skill",body:"<p>Add 1d4 to any Strength or Dexterity {{abilitycheck}}.</p>"},
        {lvl:"Power",name:"Enhancing Surge",body:"<p>A {{psionicpower}} that buffs a creature, up to granting an extra limited action for 2 {{psipoints}}.</p>"}
      ]},

    "p-projection": { cls:"psion", nav:"Projection", navSub:"Shaper's Mind", kicker:"Psion discipline",
      name:"Projection Discipline", tag:"Thought made solid",
      flavor:"Building things out of mind: weapons, tools, and a construct that acts on your turn.",
      src:"Kibbles' Compendium of Craft and Creation, p. 73",
      mods:{ astralconstruct:"This is the discipline that makes one. Everything a Shaper's Mind does is a modification of this." },
      features:[
        {lvl:"Passive",name:"Project Item",body:"<p>Form tools and weapons out of projected thought.</p>"},
        {lvl:"Power",name:"Astral Construct",body:"<p>Summon an {{astralconstruct}} — normally needing {{concentration}}, unless you're a Shaper's Mind.</p>"}
      ]},

    "p-transposition": { cls:"psion", nav:"Transposition", navSub:"Wandering Mind", kicker:"Psion discipline",
      name:"Transposition Discipline", tag:"Space treated as negotiable",
      flavor:"Modifying the properties of space and pushing on dimensional boundaries — mostly so you can be somewhere else.",
      src:"Kibbles' Compendium of Craft and Creation, p. 77",
      mods:{ teleport:"Flicker Step is a short blink that replaces your whole movement, starting at 5 feet and ending up equal to your speed at 17th level." },
      features:[
        {lvl:"Passive",name:"Flicker Step",body:"<p>Replace your movement with a {{teleport}} of 5 feet, growing to 10 at 5th, 15 at 11th, and your full {{speed}} at 17th. Passes through creatures, not through thick walls.</p>"},
        {lvl:"Power",name:"Phase Rift",body:"<p>Step through space up to 10 feet, leaving a tear that catches anything in the path with a Dexterity {{savingthrow}} for force damage.</p>"}
      ]},

    "p-psychokinesis": { cls:"psion", nav:"Psychokinesis", navSub:"Elemental Mind", kicker:"Psion discipline",
      name:"Psychokinesis Discipline", tag:"Energy created and controlled on the spot",
      flavor:"Sapping heat to freeze, or spinning fire and lightning out of nothing. The destructive branch, and the one that most resembles ordinary spellcasting from the outside.",
      src:"Kibbles' Compendium of Craft and Creation, p. 78",
      mods:{ cantrip:"Energy Manipulation covers what a caster would spend cantrips on — light, small fires, arcs of current, freezing water — at will and permanently." },
      features:[
        {lvl:"Passive",name:"Energy Manipulation",body:"<p>At will: 30 feet of light, setting things alight by touch, small arcs of electricity, or freezing and thawing water. Several at once, up to your Intelligence modifier.</p>"},
        {lvl:"Power",name:"Elemental Blast",body:"<p>A ranged {{psionicpower}} of fire, cold or lightning at 60 feet.</p>"}
      ]},

    "p-precognition": { cls:"psion", nav:"Precognition", navSub:"Free pick only", kicker:"Psion discipline",
      name:"Precognition Discipline", tag:"Reading a future close enough to still change",
      flavor:"Seeing what's coming by tracing it back from now — clearer the nearer it is, and changeable precisely because you looked. No archetype hands this out; you choose it at 3rd or 18th.",
      src:"Kibbles' Compendium of Craft and Creation, p. 80",
      mods:{
        initiative:"Prescience adds your proficiency to it, doubled on Perception if you were already proficient — and while concentrating, Intelligence replaces Dexterity for initiative entirely.",
        savingthrow:"While concentrating you make Intelligence saves in place of Dexterity ones, which turns the class's best stat into its dodge."},
      features:[
        {lvl:"Passive",name:"Prescience",body:"<p>Add your {{proficiencybonus}} to Perception and {{initiative}} — doubled on Perception if already proficient. {{concentration|Concentrate}} and Intelligence replaces Wisdom for Perception, Dexterity for initiative, and Dexterity for {{savingthrow|saving throws}}.</p>"},
        {lvl:"Power",name:"Foresight powers",body:"<p>Active powers that steer a roll before it lands.</p>"}
      ]},

    "p-nullification": { cls:"psion", nav:"Nullification", navSub:"Free pick only", kicker:"Psion discipline",
      name:"Nullification Discipline", tag:"Insisting that reality go back to how it was",
      flavor:"Interference rather than creation — unwinding supernatural effects and making it hard for anyone nearby to work magic at all. Like Precognition, no archetype grants it.",
      src:"Kibbles' Compendium of Craft and Creation, p. 81",
      mods:{
        antimagic:"This is the discipline that does it to other people. Touch ends minor effects, and grappling a caster lets you spend psi points to force a save before they can cast at all.",
        cantrip:"Disruptive Touch simply ends them by touching them."},
      features:[
        {lvl:"Passive",name:"Disruptive Touch",body:"<p>End minor magical or psionic effects by touch, and resist illusions and magical damage from things you touch. Grapple a caster and spend {{psipoints}} to force a save before they can cast at all.</p>"},
        {lvl:"Power",name:"Denial",body:"<p>An active {{psionicpower}} at 30 feet that shuts an effect down.</p>"}
      ]},

    "p-consumption": { cls:"psion", nav:"Consumption", navSub:"Consuming Mind", kicker:"Psion discipline",
      name:"Consumption Discipline", tag:"Taking the power out of someone else",
      flavor:"Predatory psionics. Thoughts, feelings and vital psychic energy treated as food — and, occasionally, as a borrowed skill set.",
      src:"Kibbles' Compendium of Craft and Creation, p. 82",
      mods:{ abilitycheck:"Adaptive Hunter lends you a skill, tool or language your victim had until your next long rest — one at a time, replaced each time you feed." },
      features:[
        {lvl:"Passive",name:"Adaptive Hunter",body:"<p>After using Mind Leech, take one skill, tool or language the target had until your next {{longrest}}. Using it again replaces the last one.</p>"},
        {lvl:"Power",name:"Mind Leech",body:"<p>Drain a mind. You can hold one stolen spell at a time for a minute; healing spells cast this way cost you the hit points they restore.</p>"}
      ]}
  };



window.COMPENDIUM = { TERMS: TERMS, CLASSES: CLASSES, ENTRIES: ENTRIES };

/* ---------------- Bard ---------------- */
TERMS.bardicinspiration = {n:"Bardic Inspiration",s:"bard",d:"A die you hand a friend as a Bonus Action. They add it to a roll later, whenever they like. It starts as a d6 and grows to a d12, and you get your Charisma modifier's worth per rest."};
TERMS.expertise = {n:"Expertise",s:"core",d:"Double your proficiency bonus on a chosen skill. It's the difference between being good at something and being the person others send."};
TERMS.jackofalltrades = {n:"Jack of All Trades",s:"bard",d:"Half your proficiency bonus added to any skill check you have no training in at all — so a Bard is never completely useless at anything."};
TERMS.preparedspells = {n:"Prepared spells",s:"core",d:"The list you choose ahead of time and can cast that day. You swap it out as you level or rest, rather than knowing spells permanently."};
TERMS.spellsavedc = {n:"Spell save DC",s:"core",d:"The number others must beat to resist your magic: 8 plus your proficiency bonus plus your casting ability."};
TERMS.armorclass = {n:"Armor Class",s:"core",d:"How hard you are to hit. Attack rolls must meet or beat it."};

CLASSES.bard = {
  name:"Bard", src:"official",
  note:"<strong>Four colleges, four completely different jobs.</strong> Dance is an unarmoured skirmisher, Glamour a fey enchanter, Lore the one who steals other people's spells, Valor a genuine front-line fighter. What ties them together is the die you hand your friends.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Bard, pp. 58–67.",
  groups:[
    {label:"The class itself", keys:["bd-core"]},
    {label:"Colleges", keys:["bd-dance","bd-glamour","bd-lore","bd-valor"]}
  ]
};

ENTRIES["bd-core"] = { cls:"bard", nav:"Core features", navSub:"The class itself", kicker:"Bard",
  name:"Core Class Features", tag:"The one who makes everyone else better, and knows a bit of everything",
  flavor:"Bards believe the world was spoken into existence and that some of those words are still lying around. In practice: a full spellcaster, the best social character in the game, and a die you can hand somebody at the exact moment they need it.",
  src:"Player's Handbook 2024, pp. 58–61", mods:{},
  features:[
    {lvl:"Level 1",name:"Bardic Inspiration",body:"<p>{{bardicinspiration}}. The recipient decides when to spend it, which makes it the most forgiving support ability in the book — you can't really waste it.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>A full caster on Charisma, with {{preparedspells}} you reshape as you level. Your {{spellsavedc}} runs off the same score as your talking.</p>"},
    {lvl:"Level 2",name:"Expertise and Jack of All Trades",body:"<p>{{expertise}} in two skills, two more at 9. And {{jackofalltrades}}.</p>"},
    {lvl:"Level 3",name:"Bard Subclass",body:"<p>Your college: Dance, Glamour, Lore or Valor. They diverge more sharply than most classes' subclasses do.</p>"},
    {lvl:"Level 5",name:"Font of Inspiration",body:"<p>{{bardicinspiration|Bardic Inspiration}} comes back on a {{shortrest}} rather than only a long one. This is the level where you stop rationing it.</p>"},
    {lvl:"Level 7",name:"Countercharm",body:"<p>A {{reaction}} that gives you or a nearby ally {{advantage}} against being {{charmed}} or {{frightened}}.</p>"},
    {lvl:"Level 10",name:"Magical Secrets",body:"<p>New {{preparedspells}} can now be taken from the Cleric, Druid and Wizard lists too — the feature that lets a Bard end up with anyone's best trick.</p>"},
    {lvl:"Level 18",name:"Superior Inspiration",body:"<p>Rolling {{initiative}} tops you back up to two uses of {{bardicinspiration|Bardic Inspiration}} if you had fewer.</p>"},
    {lvl:"Level 20",name:"Words of Creation",body:"<p>Power Word Heal and Power Word Kill always {{preparedspells|prepared}}, and each can catch a second creature within 10 feet of the first.</p>"}
  ]};

ENTRIES["bd-dance"] = { cls:"bard", nav:"College of Dance", navSub:"Levels 3 · 6 · 14", kicker:"Bard college",
  name:"College of Dance", tag:"Move in harmony with the cosmos",
  flavor:"These Bards hold that the Words of Creation aren't only spoken — they're uttered by the movement of celestial bodies and the motion of the smallest creature. In practice you are an unarmoured martial artist who happens to cast spells.",
  src:"Player's Handbook 2024, p. 63",
  mods:{
    bardicinspiration:"Dance spends it on itself more than any other college. Every use is also a free unarmed strike, the die sets your punching damage without being spent, and you can burn one to reposition yourself and an ally, or to hand the whole party an initiative bonus.",
    armorclass:"Dazzling Footwork gives you 10 plus Dexterity plus Charisma while unarmoured — so your spellcasting stat is also your defence.",
    unarmedstrike:"This is your weapon. Dexterity to hit, and your Bardic Inspiration die plus Dexterity for damage, without spending the die.",
    reaction:"Inspiring Movement spends one to move you and an ally out of trouble, neither provoking anything.",
    initiative:"Tandem Footwork hands your whole nearby party a bonus to it."
  },
  features:[
    {lvl:"Level 3",name:"Dazzling Footwork",body:"<p>Unarmoured and shieldless, you get: {{advantage}} on Performance checks involving dancing; an {{armorclass}} of 10 plus Dexterity plus Charisma; a free {{unarmedstrike}} whenever you spend {{bardicinspiration|Bardic Inspiration}}; and Dexterity-based unarmed strikes dealing your Inspiration die plus Dexterity, without spending the die.</p>"},
    {lvl:"Level 6",name:"Inspiring Movement",body:"<p>When an enemy ends its turn within 5 feet, spend a {{reaction}} and a use of {{bardicinspiration|Bardic Inspiration}} to move half your {{speed}} — and an ally within 30 feet moves half theirs. No {{opportunityattack|opportunity attacks}} either way.</p>"},
    {lvl:"Level 6",name:"Tandem Footwork",body:"<p>On {{initiative}}, spend a use of Bardic Inspiration and roll it: you and every ally within 30 feet who can see or hear you adds that much.</p>"},
    {lvl:"Level 14",name:"Leading Evasion",body:"<p>On a Dexterity {{savingthrow}} for half damage you take none on a success and half on a failure — and you can share that with anyone within 5 feet making the same save. Not while {{incapacitated}}.</p>"}
  ]};

ENTRIES["bd-glamour"] = { cls:"bard", nav:"College of Glamour", navSub:"Levels 3 · 6 · 14", kicker:"Bard college",
  name:"College of Glamour", tag:"Weave beguiling fey magic",
  flavor:"Magic out of the Feywild, threading beauty and terror through a performance. Their songs stir wistful longing for forgotten innocence and tug at the emotions of the hard-hearted — and the strongest of them can put on majesty like a coat.",
  src:"Player's Handbook 2024, p. 65",
  mods:{
    bardicinspiration:"Glamour turns it into a second currency. Mantle of Inspiration spends a use to hand out temporary hit points and free movement to a crowd, and you can spend one to reload Beguiling Magic.",
    charmed:"You hand it out on demand after any enchantment or illusion, and anyone already charmed by you simply fails against your Command.",
    frightened:"Beguiling Magic lets you choose it instead of Charmed — same feature, and the choice is made after you see who failed.",
    temporaryhp:"Mantle of Inspiration gives twice your Inspiration die's roll to several creatures at once, which is a lot of buffer for one Bonus Action.",
    spellsavedc:"Two of the three signature features key off it, so Charisma does even more work here than it does for other Bards."
  },
  features:[
    {lvl:"Level 3",name:"Beguiling Magic",body:"<p>Charm Person and Mirror Image always {{preparedspells|prepared}}. After casting an enchantment or illusion with a {{spellslot}}, force a Wisdom {{savingthrow}} against your {{spellsavedc}} on a creature within 60 feet: on a failure it's {{charmed}} or {{frightened}}, your choice, for a minute. Once per {{longrest}}, or spend a use of {{bardicinspiration|Bardic Inspiration}}.</p>"},
    {lvl:"Level 3",name:"Mantle of Inspiration",body:"<p>Spend a {{bonusaction}} and a use of {{bardicinspiration|Bardic Inspiration}}: several creatures within 60 feet each gain {{temporaryhp}} equal to twice the roll, and each may use a {{reaction}} to move their full {{speed}} without provoking an {{opportunityattack}}.</p>"},
    {lvl:"Level 6",name:"Mantle of Majesty",body:"<p>Command always prepared. As a {{bonusaction}}, cast it free and become unearthly for a minute, casting it again as a Bonus Action each turn. Anyone {{charmed}} by you fails automatically. Once per {{longrest}}, or spend a level 3 {{spellslot}}.</p>"},
    {lvl:"Level 14",name:"Unbreakable Majesty",body:"<p>For a minute, the first attack against you each turn forces a Charisma {{savingthrow}} against your {{spellsavedc}} — on a failure the attack simply misses. Once per {{shortrest}}.</p>"}
  ]};

ENTRIES["bd-lore"] = { cls:"bard", nav:"College of Lore", navSub:"Levels 3 · 6 · 14", kicker:"Bard college",
  name:"College of Lore", tag:"Plumb the depths of magical knowledge",
  flavor:"Collectors of spells and secrets from scholarly tomes, mystical rites and peasant tales alike. They gather in libraries to trade lore, and turn up at affairs of state to expose corruption and poke fun at self-important people.",
  src:"Player's Handbook 2024, p. 66",
  mods:{
    bardicinspiration:"Lore spends it defensively and on itself. Cutting Words subtracts it from an enemy's roll after you've seen the result, and Peerless Skill adds it to your own failed roll — and isn't spent if you still fail.",
    reaction:"Cutting Words uses one, which makes this the college that does something on other people's turns.",
    abilitycheck:"Peerless Skill rescues a failed one at 14, and three extra skill proficiencies at 3 mean there are more of them to rescue.",
    preparedspells:"Magical Discoveries adds two spells from the Cleric, Druid or Wizard lists at 6th — four levels before every other Bard gets that."
  },
  features:[
    {lvl:"Level 3",name:"Bonus Proficiencies",body:"<p>Three more skills of your choice.</p>"},
    {lvl:"Level 3",name:"Cutting Words",body:"<p>When a creature within 60 feet makes a damage roll, or succeeds on an {{abilitycheck}} or attack, spend a {{reaction}} and a use of {{bardicinspiration|Bardic Inspiration}} to subtract the roll — reducing the damage, or turning that success into a failure.</p>"},
    {lvl:"Level 6",name:"Magical Discoveries",body:"<p>Two spells from the Cleric, Druid or Wizard lists, always {{preparedspells|prepared}}, swappable as you level.</p>"},
    {lvl:"Level 14",name:"Peerless Skill",body:"<p>Failed an {{abilitycheck}} or attack? Spend a use of {{bardicinspiration|Bardic Inspiration}} and add it. If it still fails, the use isn't spent.</p>"}
  ]};

ENTRIES["bd-valor"] = { cls:"bard", nav:"College of Valor", navSub:"Levels 3 · 6 · 14", kicker:"Bard college",
  name:"College of Valor", tag:"Sing the deeds of ancient heroes",
  flavor:"Daring storytellers who travel to witness great events in person, so the memory of them doesn't pass away. They also carry a shield, which tells you most of what you need to know.",
  src:"Player's Handbook 2024, p. 67",
  mods:{
    bardicinspiration:"Combat Inspiration widens what the die can be spent on: a friend can add it to their Armor Class against an attack that just hit them, or to the damage of an attack that just landed.",
    armorclass:"The die can be added to a friend's after the attack roll is known, which turns a hit into a miss.",
    extraattack:"Valor is the only Bard that gets it, at 6 — and you can swap one of the two attacks for a cantrip.",
    cantrip:"Extra Attack lets you replace an attack with one, so you can open with a weapon and follow with magic in the same action.",
    bonusaction:"Battle Magic gives you a weapon attack with it after you cast, so casting stops costing you your whole turn."
  },
  features:[
    {lvl:"Level 3",name:"Combat Inspiration",body:"<p>A creature holding your {{bardicinspiration|Bardic Inspiration}} die can spend it for defence — a {{reaction}} adding it to their {{armorclass}} against an attack that hit — or offence, adding it to the damage of an attack that landed.</p>"},
    {lvl:"Level 3",name:"Martial Training",body:"<p>Martial weapons, medium armour and shields. You can also cast through a weapon instead of a focus.</p>"},
    {lvl:"Level 6",name:"Extra Attack",body:"<p>{{extraattack}}, and you can swap one attack for a {{cantrip}} with a casting time of an action.</p>"},
    {lvl:"Level 14",name:"Battle Magic",body:"<p>After casting a spell that takes an action, make one weapon attack as a {{bonusaction}}.</p>"}
  ]};

/* ---------------- Cleric ---------------- */
TERMS.channeldivinity = {n:"Channel Divinity",s:"cleric",d:"Divine energy drawn straight from the outer planes. Two uses to start, one back on a short rest and all on a long one. Every domain adds its own thing to spend it on."};
TERMS.turnundead = {n:"Turn Undead",s:"cleric",d:"A Channel Divinity that sends undead fleeing for a minute. From 5th level it also burns them."};
TERMS.divinespark = {n:"Divine Spark",s:"cleric",d:"The other starting Channel Divinity: point at a creature within 30 feet and either heal it or hurt it, your choice each time."};
TERMS.bloodied = {n:"Bloodied",s:"core",d:"A 2024 term for a creature at half its hit points or lower. A few features only work on targets in that state."};
TERMS.magicaction = {n:"Magic action",s:"core",d:"The 2024 name for using your action to cast a spell or work a magical feature."};
TERMS.undead = {n:"Undead",s:"core",d:"Skeletons, zombies, ghosts, vampires. A creature type that several Cleric features single out."};

CLASSES.cleric = {
  name:"Cleric", src:"official",
  note:"<strong>Four domains, and the domain decides the class.</strong> Life is the best healer in the game, War is nearly a Paladin, Light is a blaster with a panic button, Trickery is a rogue who happens to pray. All four run on the same Channel Divinity pool.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Cleric, pp. 68–77.",
  groups:[
    {label:"The class itself", keys:["cl-core"]},
    {label:"Domains", keys:["cl-life","cl-light","cl-trickery","cl-war"]}
  ]
};

ENTRIES["cl-core"] = { cls:"cleric", nav:"Core features", navSub:"The class itself", kicker:"Cleric",
  name:"Core Class Features", tag:"Armour, a full spell list, and a pool of divine energy",
  flavor:"A Cleric is where something divine touches the world. You rebuild your spell list every morning, you wear armour, and you carry a pool of Channel Divinity that each domain spends differently. One of the most useful classes to have in a party and one of the most decision-heavy to play.",
  src:"Player's Handbook 2024, pp. 68–72", mods:{},
  features:[
    {lvl:"Level 1",name:"Spellcasting",body:"<p>A full caster on Wisdom with {{preparedspells}} — you choose the day's list each morning, which is the real skill of the class.</p>"},
    {lvl:"Level 1",name:"Divine Order",body:"<p>Pick a role. <b>Protector</b> gives martial weapons and heavy armour. <b>Thaumaturge</b> gives an extra {{cantrip}} and adds your Wisdom modifier to Arcana and Religion checks.</p>"},
    {lvl:"Level 2",name:"Channel Divinity",body:"<p>{{channeldivinity}}. You start with {{divinespark}} and {{turnundead}}; your domain adds a third at level 3.</p>"},
    {lvl:"Level 3",name:"Cleric Subclass",body:"<p>Your domain: Life, Light, Trickery or War. Each grants spells that are always {{preparedspells|prepared}} on top of your daily list, which is quietly a big deal.</p>"},
    {lvl:"Level 5",name:"Sear Undead",body:"<p>{{turnundead|Turn Undead}} now also deals radiant damage — d8s equal to your Wisdom modifier — to each {{undead}} that fails, without breaking the fleeing.</p>"},
    {lvl:"Level 7",name:"Blessed Strikes",body:"<p>Choose once: <b>Divine Strike</b> adds d8 damage to a weapon hit once a turn, or <b>Potent Spellcasting</b> adds your Wisdom modifier to cantrip damage.</p>"},
    {lvl:"Level 10",name:"Divine Intervention",body:"<p>As a {{magicaction}}, cast any Cleric spell of level 5 or lower free, no {{spellslot}} and no materials. Once per {{longrest}}.</p>"},
    {lvl:"Level 14",name:"Improved Blessed Strikes",body:"<p>Divine Strike rises to 2d8; Potent Spellcasting instead hands out {{temporaryhp}} equal to twice your Wisdom whenever a cantrip of yours deals damage.</p>"},
    {lvl:"Level 20",name:"Greater Divine Intervention",body:"<p>Divine Intervention can now choose Wish — at the cost of not using the feature again for 2d4 long rests.</p>"}
  ]};

ENTRIES["cl-life"] = { cls:"cleric", nav:"Life Domain", navSub:"Levels 3 · 6 · 17", kicker:"Cleric domain",
  name:"Life Domain", tag:"Preserve life, and hold back death",
  flavor:"The plainest and most reliable domain. Life Clerics keep people breathing — and at high levels stop rolling dice for it altogether.",
  src:"Player's Handbook 2024, p. 73",
  mods:{
    channeldivinity:"Preserve Life is the domain's own use of it: five times your level in healing, handed out in whatever portions you like among bloodied creatures within 30 feet.",
    bloodied:"Preserve Life only works on creatures in that state, and can't take anyone past half their maximum — it's triage, not topping up.",
    hitpoints:"Every healing number you produce gets bigger: spells heal an extra 2 plus the slot level, they heal you too from 6th, and from 17th you stop rolling and take the maximum."
  },
  features:[
    {lvl:"Level 3",name:"Disciple of Life",body:"<p>Whenever a spell cast with a {{spellslot}} restores {{hitpoints}}, add 2 plus the slot's level on top.</p>"},
    {lvl:"Level 3",name:"Preserve Life",body:"<p>A {{magicaction}} and a use of {{channeldivinity}}: five times your Cleric level in healing, split among {{bloodied}} creatures within 30 feet. It can't take anyone past half their maximum.</p>"},
    {lvl:"Level 6",name:"Blessed Healer",body:"<p>Healing others with a {{spellslot}} heals you as well, by 2 plus the slot's level.</p>"},
    {lvl:"Level 17",name:"Supreme Healing",body:"<p>Stop rolling healing dice — take the maximum every time. 2d6 becomes 12, always.</p>"}
  ]};

ENTRIES["cl-light"] = { cls:"cleric", nav:"Light Domain", navSub:"Levels 3 · 6 · 17", kicker:"Cleric domain",
  name:"Light Domain", tag:"Bring light to banish darkness",
  flavor:"Blazing fire and revelation. Light Clerics are the closest the class gets to a blaster, and they carry the best defensive reaction in the domain list.",
  src:"Player's Handbook 2024, p. 74",
  mods:{
    channeldivinity:"Radiance of the Dawn spends it on a 30-foot burst of radiant damage that also scrubs magical darkness out of the area.",
    reaction:"Warding Flare is the standout: impose disadvantage on an attack against anyone within 30 feet, Wisdom-modifier times per long rest. It's a Cleric feature that works on other people's turns.",
    disadvantage:"You hand it out twice over — on attacks with Warding Flare, and on saves against your fire and radiant magic inside Corona of Light.",
    emanation:"Radiance of the Dawn uses a 30-foot one, so it catches everything around you and spares whoever you choose."
  },
  features:[
    {lvl:"Level 3",name:"Radiance of the Dawn",body:"<p>A {{magicaction}} and a use of {{channeldivinity}}: a 30-foot {{emanation}} dispels magical darkness, and creatures of your choice take 2d10 plus your Cleric level in radiant damage on a failed Constitution {{savingthrow}}, half on a success.</p>"},
    {lvl:"Level 3",name:"Warding Flare",body:"<p>A {{reaction}} imposing {{disadvantage}} on an attack roll made by anyone you can see within 30 feet. Wisdom-modifier uses, back on a {{longrest}}.</p>"},
    {lvl:"Level 6",name:"Improved Warding Flare",body:"<p>Warding Flare now also restores {{hitpoints}} to the target of the attack, and its uses come back on a {{shortrest}}.</p>"},
    {lvl:"Level 17",name:"Corona of Light",body:"<p>A minute of sunlight — 60 feet bright, 30 more dim. Enemies in the bright light have {{disadvantage}} on saves against Radiance of the Dawn and any fire or radiant spell of yours.</p>"}
  ]};

ENTRIES["cl-trickery"] = { cls:"cleric", nav:"Trickery Domain", navSub:"Levels 3 · 6 · 17", kicker:"Cleric domain",
  name:"Trickery Domain", tag:"Make mischief and challenge authority",
  flavor:"Deception, illusion and stealth. A disruptive force by design — puncturing pride, mocking tyrants, freeing captives, flouting hollow traditions. They prefer a prank to a confrontation.",
  src:"Player's Handbook 2024, p. 75",
  mods:{
    channeldivinity:"Invoke Duplicity spends it on a perfect illusion of yourself that lasts a minute, which you move and cast from — the most interesting thing any domain does with the resource.",
    teleport:"Trickster's Transposition swaps you with the illusion whenever you move it, which turns the duplicate into a repeatable escape route.",
    advantage:"At 17 you and your allies get it against anything standing within 5 feet of the illusion.",
    bonusaction:"Creating and moving the illusion both cost one, so this is the domain that actually competes for your bonus action."
  },
  features:[
    {lvl:"Level 3",name:"Blessing of the Trickster",body:"<p>Give yourself or a willing creature within 30 feet {{advantage}} on Stealth checks until your next {{longrest}}.</p>"},
    {lvl:"Level 3",name:"Invoke Duplicity",body:"<p>A {{bonusaction}} and a use of {{channeldivinity}} creates a perfect, intangible illusion of you within 30 feet for a minute. It mimics your gestures, and you can cast spells as though standing in its space. It ends early if you dismiss it or become {{incapacitated}}.</p>"},
    {lvl:"Level 6",name:"Trickster's Transposition",body:"<p>Whenever you move the illusion, you can {{teleport}} — swapping places with it.</p>"},
    {lvl:"Level 17",name:"Improved Duplicity",body:"<p>You and your allies get {{advantage}} attacking anything within 5 feet of the illusion, and when it ends someone within 5 feet of it regains {{hitpoints}}.</p>"}
  ]};

ENTRIES["cl-war"] = { cls:"cleric", nav:"War Domain", navSub:"Levels 3 · 6 · 17", kicker:"Cleric domain",
  name:"War Domain", tag:"Inspire valor and smite foes",
  flavor:"Gods of war watch over warriors and reward them for great deeds. These Clerics excel in battle — inspiring others to fight the good fight, or offering acts of violence as prayers.",
  src:"Player's Handbook 2024, p. 76",
  mods:{
    bonusaction:"War Priest gives you an extra weapon attack with it, Wisdom-modifier times per short rest. This is the domain that turns a Cleric into a front-line fighter.",
    channeldivinity:"War God's Blessing spends it to cast Shield of Faith or Spiritual Weapon — and crucially without needing concentration, so you can hold something else.",
    concentration:"The domain's whole trick at 6th is dodging it. Both spells run for a minute on their own instead.",
    resistance:"At 17 you simply have it against bludgeoning, piercing and slashing, permanently — the same defence a raging Barbarian gets, without the raging."
  },
  features:[
    {lvl:"Level 3",name:"War Priest",body:"<p>A {{bonusaction}} weapon or {{unarmedstrike}} attack, Wisdom-modifier times, back on a {{shortrest}}.</p>"},
    {lvl:"Level 6",name:"War God's Blessing",body:"<p>Spend {{channeldivinity}} instead of a {{spellslot}} to cast Shield of Faith or Spiritual Weapon, and it needs no {{concentration}} — lasting a minute unless you recast it, become {{incapacitated}}, or die.</p>"},
    {lvl:"Level 17",name:"Avatar of Battle",body:"<p>Permanent {{resistance}} to bludgeoning, piercing and slashing damage.</p>"}
  ]};

/* ---------------- Druid ---------------- */
TERMS.wildshape = {n:"Wild Shape",s:"druid",d:"Turn into an animal as a Bonus Action, for hours at a time. Two uses to start, one back on a short rest. Three of the four circles spend it on something other than being an animal."};
TERMS.challengerating = {n:"Challenge Rating",s:"core",d:"A rough difficulty number on every creature. For a Druid it's the ceiling on what you're allowed to turn into."};
TERMS.d20test = {n:"D20 Test",s:"core",d:"The 2024 umbrella term for the three things you roll a twenty-sided die for: attack rolls, ability checks and saving throws."};
TERMS.cover = {n:"Cover",s:"core",d:"Something between you and an attacker. Half cover is +2 to your defence and Dexterity saves; three-quarters is +5."};
TERMS.poisoned = {n:"Poisoned",s:"core",d:"A condition. Disadvantage on attack rolls and ability checks until it wears off."};

CLASSES.druid = {
  name:"Druid", src:"official",
  note:"<strong>Watch what each circle does with Wild Shape.</strong> Moon is the only one that uses it to be an animal. Land spends it on a burst of flowers and thorns, Sea on a cloud of ocean spray, Stars on a constellation. Same resource, four completely different classes.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Druid, pp. 78–89.",
  groups:[
    {label:"The class itself", keys:["dr-core"]},
    {label:"Circles", keys:["dr-land","dr-moon","dr-sea","dr-stars"]}
  ]
};

ENTRIES["dr-core"] = { cls:"druid", nav:"Core features", navSub:"The class itself", kicker:"Druid",
  name:"Core Class Features", tag:"A full spell list, and a pool of shapes to wear",
  flavor:"Druids belong to old orders that speak for the natural world. The most flexible class in the game and the one most likely to have you reading a stat block mid-turn — because a Druid who becomes a bear has to run the bear.",
  src:"Player's Handbook 2024, pp. 78–81", mods:{},
  features:[
    {lvl:"Level 1",name:"Spellcasting",body:"<p>A full caster on Wisdom with {{preparedspells}}, rebuilt as you rest.</p>"},
    {lvl:"Level 1",name:"Primal Order",body:"<p>Pick a role. <b>Magician</b> gives an extra {{cantrip}} and adds your Wisdom modifier to Arcana and Nature checks. <b>Warden</b> gives martial weapons and medium armour.</p>"},
    {lvl:"Level 2",name:"Wild Shape",body:"<p>{{wildshape}}. Your level caps the form's {{challengerating}} and decides how many forms you know.</p>"},
    {lvl:"Level 2",name:"Wild Companion",body:"<p>Spend a {{spellslot}} or a use of {{wildshape|Wild Shape}} to cast Find Familiar without materials. The familiar is Fey and lasts until your next {{longrest}}.</p>"},
    {lvl:"Level 3",name:"Druid Subclass",body:"<p>Your circle: Land, Moon, Sea or Stars.</p>"},
    {lvl:"Level 7",name:"Elemental Fury",body:"<p>Choose once: <b>Potent Spellcasting</b> adds your Wisdom modifier to {{cantrip}} damage, or <b>Primal Strike</b> adds d8 cold, fire, lightning or thunder to one hit a turn — including a beast form's attack.</p>"},
    {lvl:"Level 15",name:"Improved Elemental Fury",body:"<p>Potent Spellcasting extends cantrip range by 300 feet; Primal Strike rises to 2d8.</p>"},
    {lvl:"Level 18",name:"Beast Spells",body:"<p>You can cast while in a {{wildshape|Wild Shape}} form.</p>"},
    {lvl:"Level 20",name:"Archdruid",body:"<p>Rolling {{initiative}} with no {{wildshape|Wild Shape}} uses left gives one back, and you can convert unspent uses into a {{spellslot}}.</p>"}
  ]};

ENTRIES["dr-land"] = { cls:"druid", nav:"Circle of the Land", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Druid circle",
  name:"Circle of the Land", tag:"Draw on the magic of a particular place",
  flavor:"Mystics and sages who guard ancient knowledge and rites. Your magic is shaped by a landscape — arid, polar, temperate or tropical — and you can change which one you're attuned to as you travel.",
  src:"Player's Handbook 2024, p. 84",
  mods:{
    wildshape:"Land almost never turns into anything. Land's Aid spends a use on a 10-foot burst that hurts your enemies and heals one ally in the same breath, and Nature's Sanctuary spends one on terrain.",
    spellslot:"Natural Recovery is the real prize: cast one circle spell free per long rest, and recover slots worth half your level on every short rest. This is the closest a Druid gets to a Wizard's stamina.",
    resistance:"Nature's Ward gives it against a damage type matched to your chosen landscape — fire in arid, lightning in temperate, and so on.",
    poisoned:"Flat immunity from 10th, which quietly removes a whole category of problem.",
    cover:"Nature's Sanctuary hands your allies half of it inside a movable cube of spectral plants."
  },
  features:[
    {lvl:"Level 3",name:"Circle of the Land Spells",body:"<p>Extra {{preparedspells}} set by your chosen landscape, and you can change the landscape as you rest.</p>"},
    {lvl:"Level 3",name:"Land's Aid",body:"<p>A {{magicaction}} and a use of {{wildshape|Wild Shape}}: flowers and thorns fill a 10-foot sphere within 60 feet. Creatures of your choice take 2d6 necrotic on a failed Constitution {{savingthrow}} against your {{spellsavedc}}, and one creature of your choice regains 2d6 {{hitpoints}}. Both rise at 10 and 14.</p>"},
    {lvl:"Level 6",name:"Natural Recovery",body:"<p>Cast one of your circle spells free once per {{longrest}}, and recover {{spellslot|spell slots}} totalling half your level on a {{shortrest}}.</p>"},
    {lvl:"Level 10",name:"Nature's Ward",body:"<p>Immune to {{poisoned}}, and {{resistance}} to the damage type tied to your current landscape.</p>"},
    {lvl:"Level 14",name:"Nature's Sanctuary",body:"<p>Spend {{wildshape|Wild Shape}} to raise a 15-foot cube of spectral plants for a minute. Allies inside get half {{cover}} and your Nature's Ward {{resistance}}, and a {{bonusaction}} moves the cube 60 feet.</p>"}
  ]};

ENTRIES["dr-moon"] = { cls:"druid", nav:"Circle of the Moon", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Druid circle",
  name:"Circle of the Moon", tag:"Adopt animal forms to guard the wilds",
  flavor:"The circle that actually is the bear. Changeable as the moon, these Druids gather under it to share news and perform rites — and then go and fight things with claws.",
  src:"Player's Handbook 2024, p. 86",
  mods:{
    wildshape:"This is the only circle that uses it for its stated purpose, and it upgrades every part: a higher Challenge Rating ceiling, a defence of 13 plus Wisdom, temporary hit points on transforming, and the ability to cast circle spells while transformed.",
    challengerating:"Moon raises the ceiling to a third of your level rather than the default, so your animals stay relevant instead of falling behind.",
    armorclass:"In a beast form yours becomes 13 plus your Wisdom modifier if that beats the animal's own — which it usually does.",
    temporaryhp:"Three times your Druid level, every time you transform. It's what makes being a bear survivable rather than a two-round experiment.",
    teleport:"Moonlight Step at 10 is a 30-foot bonus-action blink with advantage on your next attack — and at 14 you can bring a friend."
  },
  features:[
    {lvl:"Level 3",name:"Circle Forms",body:"<p>In {{wildshape|Wild Shape}}: the {{challengerating}} ceiling becomes a third of your level, your {{armorclass}} becomes 13 plus Wisdom if higher, and you gain {{temporaryhp}} equal to three times your level.</p>"},
    {lvl:"Level 3",name:"Circle of the Moon Spells",body:"<p>Extra {{preparedspells}}, and you can cast them while transformed — five levels before other Druids can cast at all in a form.</p>"},
    {lvl:"Level 6",name:"Improved Circle Forms",body:"<p>Your beast attacks can deal radiant damage instead of their usual type, chosen per hit, and you add Wisdom to Constitution {{savingthrow|saving throws}}.</p>"},
    {lvl:"Level 10",name:"Moonlight Step",body:"<p>A {{bonusaction}} {{teleport}} of 30 feet with {{advantage}} on your next attack this turn. Wisdom-modifier uses per {{longrest}}, or spend a level 2 {{spellslot}} to restore one.</p>"},
    {lvl:"Level 14",name:"Lunar Form",body:"<p>An extra 2d10 radiant once a turn on a beast form's attack, and Moonlight Step can carry one willing creature with you.</p>"}
  ]};

ENTRIES["dr-sea"] = { cls:"druid", nav:"Circle of the Sea", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Druid circle",
  name:"Circle of the Sea", tag:"Channel the tides and the storm",
  flavor:"Not a shapeshifter but a weather system. Sea Druids wrap themselves in ocean spray and simply keep hurting whatever stands close, turn after turn.",
  src:"Player's Handbook 2024, p. 87",
  mods:{
    wildshape:"Spent entirely on Wrath of the Sea — a cloud of spray around you for ten minutes rather than an animal form.",
    emanation:"The spray is one, 5 feet at first and 10 from 6th, and you pick a target inside it every turn as a bonus action.",
    bonusaction:"This circle wants it every single turn, which is the real cost of the subclass.",
    resistance:"Stormborn adds cold, lightning and thunder while the spray is up.",
    flyspeed:"Also from Stormborn — flight matching your speed, for as long as the spray lasts."
  },
  features:[
    {lvl:"Level 3",name:"Wrath of the Sea",body:"<p>A {{bonusaction}} and a use of {{wildshape|Wild Shape}} raise a 5-foot {{emanation}} of ocean spray for ten minutes. On that turn and each turn after, a {{bonusaction}} picks a creature inside it to make a Constitution {{savingthrow}}. It ends early if you dismiss it or are {{incapacitated}}.</p>"},
    {lvl:"Level 6",name:"Aquatic Affinity",body:"<p>The {{emanation}} grows to 10 feet, and you gain a swim {{speed}} matching your own.</p>"},
    {lvl:"Level 10",name:"Stormborn",body:"<p>While the spray is up: a {{flyspeed}} matching your {{speed}}, and {{resistance}} to cold, lightning and thunder.</p>"},
    {lvl:"Level 14",name:"Oceanic Gift",body:"<p>Raise the {{emanation}} around an ally instead of yourself.</p>"}
  ]};

ENTRIES["dr-stars"] = { cls:"druid", nav:"Circle of the Stars", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Druid circle",
  name:"Circle of the Stars", tag:"Read the sky, and wear a constellation",
  flavor:"Druids who study the heavens and carry a star chart they made themselves. Instead of becoming an animal, they light up along their joints like a diagram of the night sky.",
  src:"Player's Handbook 2024, p. 88",
  mods:{
    wildshape:"Spent on Starry Form: you keep your own statistics and glow instead, taking one of three constellations — an archer that attacks, a chalice that heals, a dragon that steadies your rolls.",
    reaction:"Cosmic Omen gives you one that changes daily. Roll even and you add d6 to allies' rolls; roll odd and you subtract it from enemies'. Either way you act on other people's turns.",
    d20test:"Cosmic Omen applies to all three kinds, which is an unusually wide reach for a single reaction.",
    concentration:"The Dragon constellation treats any d20 of 9 or lower as a 10 when you're holding it — which makes a Druid's concentration close to unbreakable.",
    resistance:"Full of Stars at 14 makes the Starry Form partly incorporeal: bludgeoning, piercing and slashing all halved."
  },
  features:[
    {lvl:"Level 3",name:"Star Map",body:"<p>A chart you made, usable as a casting focus. Guidance and Guiding Bolt always {{preparedspells|prepared}}, and Guiding Bolt free a Wisdom-modifier number of times per {{longrest}}.</p>"},
    {lvl:"Level 3",name:"Starry Form",body:"<p>A {{bonusaction}} and a use of {{wildshape|Wild Shape}} light you up for ten minutes as one of: <b>Archer</b>, a bonus-action ranged attack for d8 plus Wisdom; <b>Chalice</b>, healing d8 plus Wisdom alongside your healing spells; <b>Dragon</b>, treating a d20 of 9 or lower as a 10 on Intelligence and Wisdom checks and {{concentration}} saves.</p>"},
    {lvl:"Level 6",name:"Cosmic Omen",body:"<p>Roll a die after each {{longrest}}. Even gives you a {{reaction}} adding d6 to any {{d20test}} by someone within 30 feet; odd gives you one subtracting it.</p>"},
    {lvl:"Level 10",name:"Twinkling Constellations",body:"<p>Archer and Chalice rise to 2d8, Dragon grants a 20-foot {{flyspeed}} with hovering, and you can change constellation at the start of each turn.</p>"},
    {lvl:"Level 14",name:"Full of Stars",body:"<p>Partly incorporeal in Starry Form: {{resistance}} to bludgeoning, piercing and slashing.</p>"}
  ]};

/* ---------------- Fighter ---------------- */
TERMS.actionsurge = {n:"Action Surge",s:"fighter",d:"Take a second full action on your turn, once per short rest. The single biggest burst of damage available to anyone at low levels."};
TERMS.secondwind = {n:"Second Wind",s:"fighter",d:"A Bonus Action that heals you for d10 plus your level. Several uses, refilling on a short rest, and the Fighter's other features keep finding new things to spend it on."};
TERMS.fightingstyle = {n:"Fighting Style",s:"core",d:"A permanent specialisation — archery, defence, two weapons, great weapons and so on — chosen at level 1."};
TERMS.superioritydice = {n:"Superiority Dice",s:"fighter",d:"The Battle Master's fuel. A handful of d8s spent on manoeuvres, refilling on a short rest, growing to a d12 by level 18."};
TERMS.maneuver = {n:"Manoeuvre",s:"fighter",d:"A named trick a Battle Master buys with a Superiority Die — tripping, goading, feinting, rallying an ally. You know a few, and can only use one per attack."};
TERMS.criticalhit = {n:"Critical Hit",s:"core",d:"A natural 20 on an attack: you roll the damage dice twice. The Champion widens the range that counts."};
TERMS.heroicinspiration = {n:"Heroic Inspiration",s:"core",d:"A one-shot licence to reroll any die. You either have it or you don't — it doesn't stack up."};
TERMS.psionicenergydice = {n:"Psionic Energy Dice",s:"fighter",d:"The Psi Warrior's pool. Spent on shielding an ally, adding force damage, or powering the subclass's later tricks. Refills on a short rest."};
TERMS.vulnerability = {n:"Vulnerability",s:"core",d:"The opposite of resistance — double damage from that type. Rarer than resistance and worth knowing about before you choose a weapon."};
TERMS.deathsavingthrow = {n:"Death Saving Throw",s:"core",d:"Rolled each turn while you're at zero hit points. Three successes and you stabilise; three failures and you die."};

CLASSES.fighter = {
  name:"Fighter", src:"official",
  note:"<strong>The widest spread of any class.</strong> Champion is the simplest character in the game; Battle Master has a dozen manoeuvres to pick between; Eldritch Knight is a part-time Wizard; Psi Warrior is a telekinetic. All four attack four times by level 20.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Fighter, pp. 90–99.",
  groups:[
    {label:"The class itself", keys:["fi-core"]},
    {label:"Subclasses", keys:["fi-battlemaster","fi-champion","fi-eldritch","fi-psiwarrior"]}
  ]
};

ENTRIES["fi-core"] = { cls:"fighter", nav:"Core features", navSub:"The class itself", kicker:"Fighter",
  name:"Core Class Features", tag:"More attacks than anyone, and the armour to stand where you like",
  flavor:"Soldiers, knights, duellists, bodyguards and hired swords. What unites them is being simply better with weapons and armour than anyone else in the room — and having a burst of extra turns to spend when it matters.",
  src:"Player's Handbook 2024, pp. 90–92", mods:{},
  features:[
    {lvl:"Level 1",name:"Fighting Style and Second Wind",body:"<p>A {{fightingstyle}}, and {{secondwind}}.</p>"},
    {lvl:"Level 1",name:"Weapon Mastery",body:"<p>The {{weaponmastery}} property of three kinds of weapon — more than any other class — swappable on a {{longrest}}.</p>"},
    {lvl:"Level 2",name:"Action Surge",body:"<p>{{actionsurge}}.</p>"},
    {lvl:"Level 2",name:"Tactical Mind",body:"<p>Failed an {{abilitycheck}}? Spend a use of {{secondwind}} to add d10 — and if it still fails, the use isn't spent.</p>"},
    {lvl:"Level 3",name:"Fighter Subclass",body:"<p>Battle Master, Champion, Eldritch Knight or Psi Warrior.</p>"},
    {lvl:"Level 5",name:"Extra Attack and Tactical Shift",body:"<p>{{extraattack}}, and using {{secondwind}} also moves you half your {{speed}} without provoking an {{opportunityattack}}.</p>"},
    {lvl:"Level 9",name:"Indomitable and Tactical Master",body:"<p>Reroll a failed {{savingthrow}} with your level added, once per {{longrest}}. And any attack can swap its {{weaponmastery}} property for Push, Sap or Slow.</p>"},
    {lvl:"Level 11",name:"Two Extra Attacks",body:"<p>Three attacks instead of one.</p>"},
    {lvl:"Level 13",name:"Studied Attacks",body:"<p>Miss a creature and you have {{advantage}} on your next attack against it. Missing stops being a wasted turn.</p>"},
    {lvl:"Level 20",name:"Three Extra Attacks",body:"<p>Four attacks — eight with {{actionsurge|Action Surge}}.</p>"}
  ]};

ENTRIES["fi-battlemaster"] = { cls:"fighter", nav:"Battle Master", navSub:"Levels 3 · 7 · 10 · 15 · 18", kicker:"Fighter subclass",
  name:"Battle Master", tag:"A trained repertoire of battlefield tricks",
  flavor:"The Fighter who studied. Manoeuvres are a toolbox bought with a small pool of dice — trip someone, goad them into attacking you, rally a wounded ally, add the die to a Stealth roll. The most decision-rich martial subclass in the book.",
  src:"Player's Handbook 2024, p. 93",
  mods:{
    superioritydice:"The whole subclass. Three manoeuvres to start and more as you level, one per attack, all fuelled from the same small pool — which is why knowing when not to spend matters as much as knowing which to use.",
    maneuver:"You learn a fixed set and swap them as you level, so a Battle Master is defined by which handful they chose.",
    initiative:"The Ambush manoeuvre adds a Superiority Die to it, or to a Stealth check — a rare case of the pool doing something outside a fight.",
    resistance:"Know Your Enemy tells you what a creature resists, is immune to, or is vulnerable to, before you commit.",
    vulnerability:"Same feature. Finding one is usually worth more than any single manoeuvre."
  },
  features:[
    {lvl:"Level 3",name:"Combat Superiority",body:"<p>{{superioritydice}} and three {{maneuver|manoeuvres}} to spend them on, one per attack. More manoeuvres and dice arrive as you level.</p>"},
    {lvl:"Level 7",name:"Know Your Enemy",body:"<p>A {{bonusaction}} reveals a creature's {{immunity|immunities}}, {{resistance|resistances}} and {{vulnerability|vulnerabilities}} within 30 feet. Once per {{longrest}}, or spend a {{superioritydice|Superiority Die}}.</p>"},
    {lvl:"Level 15",name:"Relentless",body:"<p>Once a turn, use a {{maneuver}} by rolling d8 instead of spending a die at all.</p>"},
    {lvl:"Level 18",name:"Ultimate Combat Superiority",body:"<p>Your {{superioritydice|Superiority Die}} becomes a d12.</p>"}
  ]};

ENTRIES["fi-champion"] = { cls:"fighter", nav:"Champion", navSub:"Levels 3 · 7 · 10 · 15 · 18", kicker:"Fighter subclass",
  name:"Champion", tag:"Raw physical excellence, and nothing to track",
  flavor:"The simplest character you can build. Champions get better at the thing they were already doing — hitting hard and not dying — with no pool, no list, and no decisions in the middle of a turn.",
  src:"Player's Handbook 2024, p. 96",
  mods:{
    criticalhit:"This is the subclass. It lands on 19–20 from level 3 and 18–20 from 15 — tripling how often you crit, and it applies to unarmed strikes too.",
    initiative:"Remarkable Athlete gives advantage on it, alongside Athletics checks.",
    heroicinspiration:"From 10 you simply give it to yourself at the start of any turn you don't have it — a free reroll, every round of every fight.",
    deathsavingthrow:"Survivor gives advantage on them and treats 18–20 as a natural 20, which is close to refusing to die.",
    bloodied:"Heroic Rally heals you 5 plus your Constitution at the start of each turn while you're in that state."
  },
  features:[
    {lvl:"Level 3",name:"Improved Critical",body:"<p>{{criticalhit|Critical hits}} on 19 or 20.</p>"},
    {lvl:"Level 3",name:"Remarkable Athlete",body:"<p>{{advantage}} on {{initiative}} and Athletics, and a {{criticalhit}} lets you move half your {{speed}} without provoking an {{opportunityattack}}.</p>"},
    {lvl:"Level 7",name:"Additional Fighting Style",body:"<p>A second {{fightingstyle}}.</p>"},
    {lvl:"Level 10",name:"Heroic Warrior",body:"<p>Give yourself {{heroicinspiration}} at the start of any turn in combat you don't already have it.</p>"},
    {lvl:"Level 15",name:"Superior Critical",body:"<p>{{criticalhit|Critical hits}} on 18 to 20.</p>"},
    {lvl:"Level 18",name:"Survivor",body:"<p><b>Defy Death.</b> {{advantage}} on {{deathsavingthrow|death saving throws}}, and 18–20 counts as a natural 20. <b>Heroic Rally.</b> While {{bloodied}} and above 0 {{hitpoints}}, regain 5 plus your Constitution modifier each turn.</p>"}
  ]};

ENTRIES["fi-eldritch"] = { cls:"fighter", nav:"Eldritch Knight", navSub:"Levels 3 · 7 · 10 · 15 · 18", kicker:"Fighter subclass",
  name:"Eldritch Knight", tag:"A soldier who studied a little Wizardry",
  flavor:"Part-time arcane magic bolted onto a full Fighter chassis, leaning on abjuration and evocation. The appeal isn't the spell list — it's what happens when you start replacing attacks with spells.",
  src:"Player's Handbook 2024, p. 96",
  mods:{
    preparedspells:"A short Wizard list on Intelligence, weighted to abjuration and evocation. It will never rival a real Wizard's, and it doesn't need to.",
    cantrip:"War Magic at 7 lets you swap an attack for one, so casting stops costing your whole turn — and at 18 you can swap two attacks for a proper spell.",
    disadvantage:"Eldritch Strike imposes it on the target's next save against your magic, which is how a third-rate caster lands first-rate spells.",
    actionsurge:"Arcane Charge bolts a 30-foot teleport onto it, before or after the extra action.",
    teleport:"Same feature. It turns Action Surge into a repositioning tool as well as a damage burst."
  },
  features:[
    {lvl:"Level 3",name:"Spellcasting",body:"<p>{{preparedspells}} from the Wizard list on Intelligence, mostly abjuration and evocation.</p>"},
    {lvl:"Level 3",name:"War Bond",body:"<p>An hour-long ritual over a weapon during a {{shortrest}} binds it to you — it can't be taken from you, and you can summon it to your hand.</p>"},
    {lvl:"Level 7",name:"War Magic",body:"<p>Replace one attack with a {{cantrip}} that takes an action to cast.</p>"},
    {lvl:"Level 10",name:"Eldritch Strike",body:"<p>Hitting with a weapon gives the target {{disadvantage}} on its next {{savingthrow}} against a spell of yours.</p>"},
    {lvl:"Level 15",name:"Arcane Charge",body:"<p>{{actionsurge|Action Surge}} now also {{teleport|teleports}} you 30 feet, before or after the extra action.</p>"},
    {lvl:"Level 18",name:"Improved War Magic",body:"<p>Replace two attacks with a level 1 or 2 Wizard spell.</p>"}
  ]};

ENTRIES["fi-psiwarrior"] = { cls:"fighter", nav:"Psi Warrior", navSub:"Levels 3 · 7 · 10 · 15 · 18", kicker:"Fighter subclass",
  name:"Psi Warrior", tag:"Telekinetic force, running on a small pool of dice",
  flavor:"A Fighter with a wellspring of psionic energy. The dice do three jobs — shielding whoever needs it, adding force damage to your hits, and shoving people around — which makes this the most flexible Fighter without a spell list.",
  src:"Player's Handbook 2024, p. 98",
  mods:{
    psionicenergydice:"Everything runs on them. Protective Field is a reaction that reduces damage to anyone within 30 feet, Psionic Strike adds force damage once a turn, and later features let you spend one to reload themselves.",
    reaction:"Protective Field uses it to cut damage to you or an ally by the die plus your Intelligence — the best damage-prevention any Fighter gets.",
    prone:"Telekinetic Thrust can impose it, or shove the target 10 feet, on top of Psionic Strike's damage.",
    charmed:"Guarded Mind lets you spend a die to end it outright at the start of your turn.",
    frightened:"Same feature, same cost — both conditions simply come off.",
    cover:"Bulwark of Force hands half of it to several creatures within 30 feet for a minute.",
    flyspeed:"Psi-Powered Leap gives you twice your speed in flight for a single turn, on a bonus action."
  },
  features:[
    {lvl:"Level 3",name:"Psionic Power",body:"<p>{{psionicenergydice}}, spent three ways. <b>Protective Field.</b> A {{reaction}} reducing damage to you or anyone within 30 feet by the die plus Intelligence. <b>Psionic Strike.</b> Once a turn, extra force damage after a hit within 30 feet. <b>Telekinetic Movement.</b> A {{magicaction}} moving an object or creature with your mind.</p>"},
    {lvl:"Level 7",name:"Telekinetic Adept",body:"<p><b>Psi-Powered Leap.</b> A {{bonusaction}} {{flyspeed}} of twice your {{speed}} until the turn ends. <b>Telekinetic Thrust.</b> Psionic Strike can also knock the target {{prone}} or shove it 10 feet on a failed Strength {{savingthrow}}.</p>"},
    {lvl:"Level 10",name:"Guarded Mind",body:"<p>{{resistance}} to psychic damage, and you can spend a die to end {{charmed}} and {{frightened}} on yourself.</p>"},
    {lvl:"Level 15",name:"Bulwark of Force",body:"<p>A {{bonusaction}} gives half {{cover}} to creatures within 30 feet, up to your Intelligence modifier, for a minute.</p>"},
    {lvl:"Level 18",name:"Telekinetic Master",body:"<p>Telekinesis always {{preparedspells|prepared}}, castable free on Intelligence — and each turn you hold {{concentration}} on it you get a {{bonusaction}} weapon attack.</p>"}
  ]};

/* ---------------- Monk ---------------- */
TERMS.focuspoints = {n:"Focus Points",s:"monk",d:"The Monk's inner energy, one per level, back on a short rest. Almost everything a Monk does beyond swinging costs one, so the class is an exercise in budgeting."};
TERMS.martialartsdie = {n:"Martial Arts die",s:"monk",d:"The die your unarmed strikes deal, a d6 rising to a d12. Several subclasses use it as a measure for healing and extra damage too."};
TERMS.flurryofblows = {n:"Flurry of Blows",s:"monk",d:"One Focus Point for two unarmed strikes as a Bonus Action, three from 10th level. Three of the four subclasses hang something off it."};
TERMS.patientdefense = {n:"Patient Defense",s:"monk",d:"Disengage as a Bonus Action free, or spend a Focus Point to Disengage and Dodge at once."};
TERMS.stepofthewind = {n:"Step of the Wind",s:"monk",d:"Dash as a Bonus Action free, or spend a Focus Point to Dash and Disengage with a doubled jump."};
TERMS.stunned = {n:"Stunned",s:"core",d:"A condition. No actions, no movement, and every attack against you has advantage. The single most powerful thing a Monk can inflict."};
TERMS.invisible = {n:"Invisible",s:"core",d:"A condition. You can't be seen without special senses, attacks against you have disadvantage, and yours have advantage."};
TERMS.difficultterrain = {n:"Difficult Terrain",s:"core",d:"Ground that costs double movement to cross."};
TERMS.evasion = {n:"Evasion",s:"core",d:"Dexterity saves for half damage instead take none on a success and half on a failure."};

CLASSES.monk = {
  name:"Monk", src:"official",
  note:"<strong>One pool, four very different bills.</strong> Mercy spends focus on healing and harming by touch, Shadow on darkness and teleporting, Elements on reach and bursts, Open Hand on getting more out of Flurry of Blows for free. Watch what each one does to your Focus budget.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Monk, pp. 100–107.",
  groups:[
    {label:"The class itself", keys:["mo-core"]},
    {label:"Subclasses", keys:["mo-mercy","mo-shadow","mo-elements","mo-openhand"]}
  ]
};

ENTRIES["mo-core"] = { cls:"monk", nav:"Core features", navSub:"The class itself", kicker:"Monk",
  name:"Core Class Features", tag:"Speed, unarmed strikes, and a budget of inner energy",
  flavor:"Training and mental discipline turned into speed nobody can match. You wear no armour and you aren't sturdy, so surviving means never standing still — and the class gives you an enormous number of ways not to.",
  src:"Player's Handbook 2024, pp. 100–103", mods:{},
  features:[
    {lvl:"Level 1",name:"Martial Arts",body:"<p>Your {{martialartsdie}}, Dexterity for unarmed and monk weapon attacks, and a free {{unarmedstrike}} as a {{bonusaction}} after you attack.</p>"},
    {lvl:"Level 1",name:"Unarmored Defense",body:"<p>{{armorclass}} of 10 plus Dexterity plus Wisdom while wearing no armour and no shield.</p>"},
    {lvl:"Level 2",name:"Monk's Focus",body:"<p>{{focuspoints}}, spent on {{flurryofblows}}, {{patientdefense}} and {{stepofthewind}}.</p>"},
    {lvl:"Level 2",name:"Unarmored Movement",body:"<p>Your {{speed}} rises by 10 feet unarmoured, and keeps rising with level.</p>"},
    {lvl:"Level 2",name:"Uncanny Metabolism",body:"<p>On {{initiative}}, refill every {{focuspoints|Focus Point}} and heal your level plus a {{martialartsdie}}. Once per {{longrest}}.</p>"},
    {lvl:"Level 3",name:"Deflect Attacks",body:"<p>A {{reaction}} cutting an attack's damage by d10 plus Dexterity plus your level. Reduce it to nothing and you can spend a point to fling the force back at someone.</p>"},
    {lvl:"Level 5",name:"Extra Attack and Stunning Strike",body:"<p>{{extraattack}}, and once a turn a hit can spend a {{focuspoints|Focus Point}} to leave the target {{stunned}} on a failed Constitution {{savingthrow}} — or halved and easier to hit on a success.</p>"},
    {lvl:"Level 7",name:"Evasion",body:"<p>{{evasion}}, unless you're {{incapacitated}}.</p>"},
    {lvl:"Level 10",name:"Heightened Focus and Self-Restoration",body:"<p>{{flurryofblows|Flurry}} becomes three strikes, {{patientdefense|Patient Defense}} adds {{temporaryhp}}, and {{stepofthewind|Step of the Wind}} can carry an ally. Separately, shed {{charmed}}, {{frightened}} or {{poisoned}} at the end of each turn.</p>"},
    {lvl:"Level 14",name:"Disciplined Survivor",body:"<p>Proficiency in every {{savingthrow}}, and a {{focuspoints|Focus Point}} rerolls any failed one.</p>"},
    {lvl:"Level 18",name:"Superior Defense",body:"<p>Three {{focuspoints|Focus Points}} give {{resistance}} to everything but force damage for a minute.</p>"},
    {lvl:"Level 20",name:"Body and Mind",body:"<p>Dexterity and Wisdom both rise by 4, past the usual ceiling.</p>"}
  ]};

ENTRIES["mo-mercy"] = { cls:"monk", nav:"Warrior of Mercy", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass",
  name:"Warrior of Mercy", tag:"Manipulate life force to heal and to harm",
  flavor:"A physician and an executioner in the same pair of hands. Mercy Monks travel masked, treat the sick, and use exactly the same knowledge to stop a heart.",
  src:"Player's Handbook 2024, p. 104",
  mods:{
    focuspoints:"Mercy is the hungriest subclass for them early and the most generous later — by 11 you can pour healing and harm through a whole Flurry of Blows without paying for either.",
    flurryofblows:"You can swap strikes for healing touches, and from 11 every strike can carry both a heal and extra necrotic damage for free.",
    martialartsdie:"It measures your healing as well as your damage here, so the same number does both jobs.",
    poisoned:"Physician's Touch hands it out with Hand of Harm — and Hand of Healing can remove one condition instead.",
    hitpoints:"At 17 you can return the dead: five Focus Points and a corpse under a day old comes back on 4d10 plus Wisdom."
  },
  features:[
    {lvl:"Level 3",name:"Implements of Mercy",body:"<p>Insight, Medicine and a herbalism kit.</p>"},
    {lvl:"Level 3",name:"Hand of Harm",body:"<p>Once a turn, a {{focuspoints|Focus Point}} adds necrotic damage equal to a {{martialartsdie}} plus Wisdom to an {{unarmedstrike}}.</p>"},
    {lvl:"Level 3",name:"Hand of Healing",body:"<p>A {{magicaction}} and a {{focuspoints|Focus Point}} heals a touched creature a {{martialartsdie}} plus Wisdom. Inside {{flurryofblows|Flurry of Blows}} you can swap a strike for it and pay nothing.</p>"},
    {lvl:"Level 6",name:"Physician's Touch",body:"<p>Hand of Harm also inflicts {{poisoned}}; Hand of Healing can also end one condition on the target.</p>"},
    {lvl:"Level 11",name:"Flurry of Healing and Harm",body:"<p>Every strike in a {{flurryofblows|Flurry}} can become a free Hand of Healing, and every strike that lands can carry a free Hand of Harm.</p>"},
    {lvl:"Level 17",name:"Hand of Ultimate Mercy",body:"<p>Five {{focuspoints|Focus Points}} and a {{magicaction}} revive a creature dead under 24 hours on 4d10 plus Wisdom {{hitpoints}}, clearing blinded, deafened, paralysed, {{poisoned}} and {{stunned}}.</p>"}
  ]};

ENTRIES["mo-shadow"] = { cls:"monk", nav:"Warrior of Shadow", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass",
  name:"Warrior of Shadow", tag:"Harness shadow power for stealth and subterfuge",
  flavor:"Drawing on the Shadowfell to hide, to leap from gloom to gloom, and eventually to go wraithlike. The most self-sufficient scout in the game.",
  src:"Player's Handbook 2024, p. 105",
  mods:{
    focuspoints:"Shadow spends them on positioning rather than damage — casting Darkness, removing Shadow Step's conditions, and at 17 buying a minute of invisibility.",
    teleport:"Shadow Step is a 60-foot bonus-action blink between patches of dim light, with advantage on the melee attack that follows. From 11, a Focus Point removes the lighting requirement entirely.",
    darkvision:"60 feet, or 60 more if you had it — which you need, because the Darkness you cast is the Darkness you fight inside.",
    invisible:"Cloak of Shadows grants it outright for a minute.",
    difficultterrain:"Partially incorporeal at 17 — you move through occupied spaces as if they were it.",
    flurryofblows:"Free inside Cloak of Shadows, costing no Focus Points at all."
  },
  features:[
    {lvl:"Level 3",name:"Shadow Arts",body:"<p><b>Darkness</b> for a {{focuspoints|Focus Point}}, componentless, visible to you, and movable 60 feet each turn. <b>{{darkvision}}</b>. <b>Shadowy Figments</b> — Minor Illusion on Wisdom.</p>"},
    {lvl:"Level 6",name:"Shadow Step",body:"<p>Entirely in dim light or darkness, a {{bonusaction}} {{teleport|teleports}} you 60 feet to another such space, with {{advantage}} on your next melee attack this turn.</p>"},
    {lvl:"Level 11",name:"Improved Shadow Step",body:"<p>A {{focuspoints|Focus Point}} lifts the lighting requirement, and you get a free {{unarmedstrike}} on arrival.</p>"},
    {lvl:"Level 17",name:"Cloak of Shadows",body:"<p>Three {{focuspoints|Focus Points}} for a minute of being {{invisible}}, moving through occupied spaces as {{difficultterrain}}, and using {{flurryofblows|Flurry of Blows}} for free.</p>"}
  ]};

ENTRIES["mo-elements"] = { cls:"monk", nav:"Warrior of the Elements", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass",
  name:"Warrior of the Elements", tag:"Wield strikes and bursts of elemental power",
  flavor:"Monks who briefly tame the Elemental Chaos. The one subclass that solves the Monk's oldest problem — reach — by simply extending elemental energy out of your fists.",
  src:"Player's Handbook 2024, p. 106",
  mods:{
    focuspoints:"One point buys ten minutes of Elemental Attunement, which everything else in the subclass then sits on top of. Elemental Burst costs two on top of that.",
    unarmedstrike:"Attuned, your reach grows by 10 feet and your strikes can deal acid, cold, fire, lightning or thunder — and push or pull the target.",
    martialartsdie:"Elemental Burst deals three rolls of it in a 20-foot sphere at 120 feet, which is real ranged damage from a class that normally has none.",
    speed:"Stride of the Elements adds a fly and swim speed while attuned.",
    resistance:"Elemental Epitome at 17 adds it to a damage type of your choice, changeable each turn."
  },
  features:[
    {lvl:"Level 3",name:"Elemental Attunement",body:"<p>A {{focuspoints|Focus Point}} at the start of your turn buys ten minutes: {{unarmedstrike|unarmed strikes}} with 10 feet more reach, dealing your choice of acid, cold, fire, lightning or thunder, and able to push or pull the target 10 feet.</p>"},
    {lvl:"Level 3",name:"Manipulate Elements",body:"<p>The Elementalism {{cantrip}} on Wisdom.</p>"},
    {lvl:"Level 6",name:"Elemental Burst",body:"<p>A {{magicaction}} and two {{focuspoints|Focus Points}}: a 20-foot sphere within 120 feet, three rolls of your {{martialartsdie}} on a failed Dexterity {{savingthrow}}, half on a success.</p>"},
    {lvl:"Level 11",name:"Stride of the Elements",body:"<p>While attuned, fly and swim speeds matching your {{speed}}.</p>"},
    {lvl:"Level 17",name:"Elemental Epitome",body:"<p>While attuned: {{resistance}} to a damage type you choose each turn, extra damage on your first elemental hit, and more speed.</p>"}
  ]};

ENTRIES["mo-openhand"] = { cls:"monk", nav:"Warrior of the Open Hand", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass",
  name:"Warrior of the Open Hand", tag:"Master unarmed combat in its purest form",
  flavor:"No borrowed magic, no other plane — just hands. The classic Monk, and the one whose features cost nothing extra on top of what you were already spending.",
  src:"Player's Handbook 2024, p. 107",
  mods:{
    flurryofblows:"This subclass is built on it. Every strike that lands can also shut down opportunity attacks, shove 15 feet, or knock the target down — for no extra Focus Point.",
    focuspoints:"The cheapest subclass to run. Open Hand Technique is free, and Wholeness of Body heals off its own uses rather than your pool.",
    prone:"Topple imposes it on a failed Dexterity save, once per landing strike.",
    opportunityattack:"Addle stops the target making them until its next turn — which is how a Monk walks away safely.",
    stepofthewind:"Fleet Step at 11 hands it to you free after any other Bonus Action, so you almost always end the turn somewhere safer."
  },
  features:[
    {lvl:"Level 3",name:"Open Hand Technique",body:"<p>Each {{flurryofblows|Flurry of Blows}} hit can <b>Addle</b> (no {{opportunityattack|opportunity attacks}} until its next turn), <b>Push</b> 15 feet on a failed Strength {{savingthrow}}, or <b>Topple</b> for {{prone}} on a failed Dexterity save.</p>"},
    {lvl:"Level 6",name:"Wholeness of Body",body:"<p>A {{bonusaction}} heals you a {{martialartsdie}} plus Wisdom, Wisdom-modifier times per {{longrest}} — no {{focuspoints|Focus Points}} spent.</p>"},
    {lvl:"Level 11",name:"Fleet Step",body:"<p>Take any {{bonusaction}} other than {{stepofthewind|Step of the Wind}}, and you get Step of the Wind immediately after it.</p>"},
    {lvl:"Level 17",name:"Quivering Palm",body:"<p>Four {{focuspoints|Focus Points}} on a hit set lethal vibrations you can trigger later — a Constitution {{savingthrow}} against dropping to 0 {{hitpoints}}.</p>"}
  ]};

/* ---------------- Paladin ---------------- */
TERMS.auraofprotection = {n:"Aura of Protection",s:"paladin",d:"From level 6, everyone within 10 feet of you adds your Charisma modifier to their saving throws — 30 feet at 18. Every oath bolts something extra onto it."};
TERMS.layonhands = {n:"Lay On Hands",s:"paladin",d:"A pool of healing worth five times your level, spent a point at a time as a Bonus Action. It also cures poison, and later, conditions."};
TERMS.divinesmite = {n:"Divine Smite",s:"paladin",d:"Pour a spell slot into a hit for a burst of radiant damage. In the 2024 rules it's a spell, so you commit before the attack roll, not after."};
TERMS.paladinchanneldivinity = {n:"Channel Divinity",s:"paladin",d:"Two uses, refilling on a short rest. You start with Divine Sense; your oath adds its own options, and that's mostly what distinguishes one oath from another."};
TERMS.restrained = {n:"Restrained",s:"core",d:"A condition. Speed zero, disadvantage on your attacks and Dexterity saves, and advantage for anyone attacking you."};
TERMS.fiend = {n:"Fiend",s:"core",d:"Devils and demons. A creature type several Paladin features single out, alongside Undead."};

CLASSES.paladin = {
  name:"Paladin", src:"official",
  note:"<strong>Every oath is a modification of the same aura.</strong> Devotion makes it immunity to being charmed, Ancients makes it resistance to otherworldly damage, Glory makes it speed, Vengeance ignores it and hunts one target instead. Read Aura of Protection first.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Paladin, pp. 108–117.",
  groups:[
    {label:"The class itself", keys:["pa-core"]},
    {label:"Oaths", keys:["pa-devotion","pa-glory","pa-ancients","pa-vengeance"]}
  ]
};

ENTRIES["pa-core"] = { cls:"paladin", nav:"Core features", navSub:"The class itself", kicker:"Paladin",
  name:"Core Class Features", tag:"An oath, heavy armour, and an aura nobody else has",
  flavor:"A warrior held together by a promise — sworn to a god, to nature spirits, or in a bad moment with only the dead as witnesses. What makes a Paladin unique at the table isn't the smiting; it's standing near one.",
  src:"Player's Handbook 2024, pp. 108–112", mods:{},
  features:[
    {lvl:"Level 1",name:"Lay On Hands",body:"<p>{{layonhands}}.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>Half a caster's progression on Charisma, with {{preparedspells}}.</p>"},
    {lvl:"Level 2",name:"Fighting Style and Paladin's Smite",body:"<p>A {{fightingstyle}} — or Blessed Warrior, for two Cleric {{cantrip|cantrips}}. And {{divinesmite}} always {{preparedspells|prepared}}, castable free once per {{longrest}}.</p>"},
    {lvl:"Level 3",name:"Channel Divinity",body:"<p>{{paladinchanneldivinity}}. Divine Sense finds celestials, {{fiend|fiends}} and {{undead}} within 60 feet for ten minutes.</p>"},
    {lvl:"Level 3",name:"Paladin Subclass",body:"<p>Your oath: Devotion, Glory, the Ancients or Vengeance.</p>"},
    {lvl:"Level 5",name:"Extra Attack and Faithful Steed",body:"<p>{{extraattack}}, and Find Steed always prepared plus one free casting per {{longrest}}.</p>"},
    {lvl:"Level 6",name:"Aura of Protection",body:"<p>{{auraofprotection}}. A 10-foot {{emanation}}, inactive while you're {{incapacitated}}. This is the feature that makes a party want a Paladin.</p>"},
    {lvl:"Level 9",name:"Abjure Foes",body:"<p>A {{paladinchanneldivinity|Channel Divinity}} that leaves several creatures {{frightened}} and unable to act freely.</p>"},
    {lvl:"Level 10",name:"Aura of Courage",body:"<p>You and your allies are immune to {{frightened}} inside the {{auraofprotection|aura}}.</p>"},
    {lvl:"Level 11",name:"Radiant Strikes",body:"<p>Every melee hit carries an extra d8 radiant damage — free, permanent, no resource.</p>"},
    {lvl:"Level 14",name:"Restoring Touch",body:"<p>{{layonhands|Lay On Hands}} can also strip blinded, {{charmed}}, deafened, {{frightened}}, paralysed or {{stunned}}, at 5 points each.</p>"},
    {lvl:"Level 18",name:"Aura Expansion",body:"<p>The {{auraofprotection|aura}} becomes a 30-foot {{emanation}} — most of a battlefield.</p>"}
  ]};

ENTRIES["pa-devotion"] = { cls:"paladin", nav:"Oath of Devotion", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Paladin oath",
  name:"Oath of Devotion", tag:"The knight in shining armour",
  flavor:"The oath most people picture: honesty, courage, duty, and the protection of those who cannot protect themselves. Its features are all about making your weapon and your aura more reliable rather than more interesting.",
  src:"Player's Handbook 2024, p. 113",
  mods:{
    auraofprotection:"Devotion turns it into immunity to being charmed for everyone inside, and from 15 a smite makes the whole aura grant half cover until your next turn.",
    paladinchanneldivinity:"Sacred Weapon spends it to add your Charisma to attack rolls with one melee weapon for ten minutes — the most straightforward damage upgrade any oath offers.",
    charmed:"Immunity inside the aura at 7, and an ally who walks in with the condition simply stops suffering it while there.",
    cover:"Smite of Protection at 15 gives half of it to everyone in your aura whenever you cast Divine Smite.",
    divinesmite:"Casting it now protects the party as well as hurting the target."
  },
  features:[
    {lvl:"Level 3",name:"Sacred Weapon",body:"<p>A use of {{paladinchanneldivinity|Channel Divinity}} adds your Charisma to attack rolls with a melee weapon for ten minutes, and makes it shed light and deal radiant damage.</p>"},
    {lvl:"Level 3",name:"Oath of Devotion Spells",body:"<p>Extra {{preparedspells}} — protection and radiance.</p>"},
    {lvl:"Level 7",name:"Aura of Devotion",body:"<p>Immunity to {{charmed}} for you and your allies in the {{auraofprotection|aura}}.</p>"},
    {lvl:"Level 15",name:"Smite of Protection",body:"<p>Casting {{divinesmite}} gives everyone in your {{auraofprotection|aura}} half {{cover}} until your next turn.</p>"},
    {lvl:"Level 20",name:"Holy Nimbus",body:"<p>A {{bonusaction}} fills the {{auraofprotection|aura}} with holy power for ten minutes: {{advantage}} on saves forced by {{fiend|fiends}} and {{undead}}, and radiant damage to enemies inside it.</p>"}
  ]};

ENTRIES["pa-glory"] = { cls:"paladin", nav:"Oath of Glory", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Paladin oath",
  name:"Oath of Glory", tag:"Strive for the heroic destiny you were promised",
  flavor:"Paladins who believe in the glorious destiny waiting at the end of the road, and train relentlessly to be worthy of it. The most athletic oath, and the one that makes the whole party faster.",
  src:"Player's Handbook 2024, p. 114",
  mods:{
    auraofprotection:"Glory adds 10 feet of speed to every ally who enters it or starts their turn there — the most useful non-defensive thing any aura does.",
    paladinchanneldivinity:"Two options rather than one. Peerless Athlete for an hour of advantage on Athletics and Acrobatics, or Inspiring Smite to convert a smite into temporary hit points for the party.",
    temporaryhp:"Inspiring Smite distributes 2d8 plus your level among anyone within 30 feet, however you like.",
    reaction:"Glorious Defense at 15 adds your Charisma to someone's defence against an attack that already hit — and if it misses, you get a free swing at the attacker.",
    speed:"Your own rises by 10 at 7, on top of what the aura gives everyone else."
  },
  features:[
    {lvl:"Level 3",name:"Inspiring Smite",body:"<p>After casting {{divinesmite}}, spend {{paladinchanneldivinity|Channel Divinity}} to hand out 2d8 plus your level in {{temporaryhp}} among creatures within 30 feet.</p>"},
    {lvl:"Level 3",name:"Peerless Athlete",body:"<p>A {{bonusaction}} and a use of {{paladinchanneldivinity|Channel Divinity}}: an hour of {{advantage}} on Athletics and Acrobatics, with 10 feet more jump.</p>"},
    {lvl:"Level 7",name:"Aura of Alacrity",body:"<p>Your {{speed}} rises by 10 feet, and allies entering your {{auraofprotection|aura}} gain 10 feet until the end of their next turn.</p>"},
    {lvl:"Level 15",name:"Glorious Defense",body:"<p>A {{reaction}} adds your Charisma to the {{armorclass}} of anyone within 10 feet against an attack that hit — and on a miss you may attack the attacker.</p>"},
    {lvl:"Level 20",name:"Living Legend",body:"<p>Charisma-driven presence: {{advantage}} on Charisma checks, a missed attack can be turned into a hit once a turn, and failed saves can be rerolled.</p>"}
  ]};

ENTRIES["pa-ancients"] = { cls:"paladin", nav:"Oath of the Ancients", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Paladin oath",
  name:"Oath of the Ancients", tag:"Preserve life and light wherever you find them",
  flavor:"Older than the gods of law and good — a promise made to the green things and the first light. Ancients Paladins fight for delight and beauty rather than duty, and they are extraordinarily hard to remove from a fight.",
  src:"Player's Handbook 2024, p. 115",
  mods:{
    auraofprotection:"Ancients turns it into resistance to necrotic, psychic and radiant for everyone inside — the three damage types that usually bypass armour.",
    paladinchanneldivinity:"Nature's Wrath spends it to conjure spectral vines that restrain everything you choose within 15 feet for a minute.",
    restrained:"That's what the vines do, with a Strength save each turn to escape. It's a control effect on a class that otherwise has none.",
    resistance:"The aura's version applies to your whole party, which is a defensive upgrade nothing else in the class approaches.",
    hitpoints:"Undying Sentinel catches you at 0 and brings you back on three times your level, once per long rest."
  },
  features:[
    {lvl:"Level 3",name:"Nature's Wrath",body:"<p>A {{magicaction}} and a use of {{paladinchanneldivinity|Channel Divinity}} leave creatures of your choice within 15 feet {{restrained}} for a minute on a failed Strength {{savingthrow}}.</p>"},
    {lvl:"Level 3",name:"Oath of the Ancients Spells",body:"<p>Extra {{preparedspells}} — fey magic and preservation.</p>"},
    {lvl:"Level 7",name:"Aura of Warding",body:"<p>You and your allies gain {{resistance}} to necrotic, psychic and radiant damage inside the {{auraofprotection|aura}}.</p>"},
    {lvl:"Level 15",name:"Undying Sentinel",body:"<p>Dropped to 0 {{hitpoints}} without being killed outright, you drop to 1 instead and regain three times your level. Once per {{longrest}}. You also stop aging.</p>"},
    {lvl:"Level 20",name:"Elder Champion",body:"<p>A {{bonusaction}} fills the {{auraofprotection|aura}} with primal power for a minute: enemies inside have {{disadvantage}} on saves against your magic, and you regenerate each turn.</p>"}
  ]};

ENTRIES["pa-vengeance"] = { cls:"paladin", nav:"Oath of Vengeance", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Paladin oath",
  name:"Oath of Vengeance", tag:"Punish those who have done great evil",
  flavor:"The grim one. Vengeance Paladins accept that they may have to do wrong to stop a greater wrong, and they pick a target rather than protecting a group.",
  src:"Player's Handbook 2024, p. 116",
  mods:{
    paladinchanneldivinity:"Vow of Enmity spends it for a minute of advantage on every attack against one creature — and the vow jumps to a new target when the old one falls.",
    advantage:"Permanent, on one target, for a whole minute. Combined with Divine Smite it's the highest single-target damage any Paladin produces.",
    opportunityattack:"Relentless Avenger turns yours into a trap: the target's speed drops to zero and you move half your speed for free.",
    reaction:"You get two uses for it — cutting off a runner at 7, and a free melee swing whenever your vowed target attacks at 15.",
    auraofprotection:"Notably, Vengeance is the one oath that adds nothing to it. The whole subclass is aimed outward at a single enemy instead."
  },
  features:[
    {lvl:"Level 3",name:"Vow of Enmity",body:"<p>When you Attack, spend {{paladinchanneldivinity|Channel Divinity}} for {{advantage}} on attacks against one creature within 30 feet for a minute. If it drops, the vow moves to someone else.</p>"},
    {lvl:"Level 3",name:"Oath of Vengeance Spells",body:"<p>Extra {{preparedspells}} — hunting and pursuit.</p>"},
    {lvl:"Level 7",name:"Relentless Avenger",body:"<p>Hit with an {{opportunityattack}} and the target's {{speed}} drops to zero — then move half your speed as part of the same {{reaction}}, provoking nothing.</p>"},
    {lvl:"Level 15",name:"Soul of Vengeance",body:"<p>Whenever your vowed target attacks, a {{reaction}} lets you swing back if it's in range.</p>"},
    {lvl:"Level 20",name:"Avenging Angel",body:"<p>A {{bonusaction}} sprouts spectral wings for ten minutes: a 60-foot {{flyspeed}} with hovering, and an aura that leaves enemies {{frightened}}.</p>"}
  ]};

/* ---------------- Ranger ---------------- */
TERMS.huntersmark = {n:"Hunter's Mark",s:"ranger",d:"Mark one creature and every hit on it deals extra damage. In the 2024 rules the Ranger casts it free several times a day, so it's effectively a class feature rather than a spell."};
TERMS.primalcompanion = {n:"Primal Companion",s:"ranger",d:"A beast made of primal magic that fights alongside you. It acts when you command it, and it comes back after an hour's rest rather than needing replacing."};
TERMS.blindsight = {n:"Blindsight",s:"core",d:"You perceive without needing to see — darkness, invisibility and illusions stop mattering within its range."};

CLASSES.ranger = {
  name:"Ranger", src:"official",
  note:"<strong>All four subclasses bend Hunter's Mark.</strong> Beast Master adds a beast that hits marked targets harder, Hunter spreads the mark's damage around, Gloom Stalker ignores it in favour of ambushing, Fey Wanderer layers psychic damage on top. Read the core feature first.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Ranger, pp. 118–127.",
  groups:[
    {label:"The class itself", keys:["ra-core"]},
    {label:"Subclasses", keys:["ra-beastmaster","ra-feywanderer","ra-gloomstalker","ra-hunter"]}
  ]
};

ENTRIES["ra-core"] = { cls:"ranger", nav:"Core features", navSub:"The class itself", kicker:"Ranger",
  name:"Core Class Features", tag:"A tracker with a little nature magic and one marked quarry",
  flavor:"At home where the roads stop. The 2024 rewrite handed the Ranger its signature spell for free, so your combat turn stays simple while your exploration kit gets very deep.",
  src:"Player's Handbook 2024, pp. 118–121", mods:{},
  features:[
    {lvl:"Level 1",name:"Favored Enemy",body:"<p>{{huntersmark}} always {{preparedspells|prepared}}, and free to cast several times per {{longrest}} — more as you level.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>Half a caster's progression on Wisdom, from the Druid-flavoured Ranger list.</p>"},
    {lvl:"Level 2",name:"Deft Explorer and Fighting Style",body:"<p>{{expertise}} in a skill and two languages, plus a {{fightingstyle}} — or Druidic Warrior, for two Druid {{cantrip|cantrips}}.</p>"},
    {lvl:"Level 3",name:"Ranger Subclass",body:"<p>Beast Master, Fey Wanderer, Gloom Stalker or Hunter.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 6",name:"Roving",body:"<p>{{speed}} up 10 feet out of heavy armour, plus climb and swim speeds matching it.</p>"},
    {lvl:"Level 9",name:"Expertise",body:"<p>{{expertise}} in two more skills.</p>"},
    {lvl:"Level 10",name:"Tireless",body:"<p>{{temporaryhp}} on demand, and your travels stop wearing you down.</p>"},
    {lvl:"Level 13",name:"Relentless Hunter",body:"<p>Taking damage can no longer break your {{concentration}} on {{huntersmark|Hunter's Mark}}.</p>"},
    {lvl:"Level 14",name:"Nature's Veil",body:"<p>A {{bonusaction}} makes you {{invisible}} until the end of your next turn, a Wisdom-modifier number of times per {{longrest}}.</p>"},
    {lvl:"Level 17",name:"Precise Hunter",body:"<p>{{advantage}} on attacks against your {{huntersmark|marked}} creature.</p>"},
    {lvl:"Level 18",name:"Feral Senses",body:"<p>{{blindsight}} out to 30 feet.</p>"},
    {lvl:"Level 20",name:"Foe Slayer",body:"<p>{{huntersmark|Hunter's Mark}} damage rises to d10, and you can move it without spending anything.</p>"}
  ]};

ENTRIES["ra-beastmaster"] = { cls:"ranger", nav:"Beast Master", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger subclass",
  name:"Beast Master", tag:"Bond with a primal beast",
  flavor:"The animal companion, finally made to work. Your beast is summoned primal magic rather than a real animal, so it scales with you and comes back after an hour rather than dying permanently.",
  src:"Player's Handbook 2024, p. 122",
  mods:{
    primalcompanion:"This is the subclass. Land, sea or sky, it adds your proficiency bonus to everything it rolls, and it grows with you rather than falling behind.",
    huntersmark:"Bestial Fury at 11 lets the beast deal the mark's bonus damage too, the first time it hits a marked creature each turn — so marking now pays twice.",
    bonusaction:"Commanding the beast costs one, which is the real tension of the subclass: your bonus action is already spoken for by Hunter's Mark.",
    preparedspells:"Share Spells at 15 lets a spell you cast on yourself reach the beast as well, if it's within 30 feet."
  },
  features:[
    {lvl:"Level 3",name:"Primal Companion",body:"<p>{{primalcompanion}} — Land, Sea or Sky. A {{bonusaction}} commands it; without one it only dodges. It returns after an hour if it falls.</p>"},
    {lvl:"Level 7",name:"Exceptional Training",body:"<p>Commanding the beast also lets it Dash, Disengage, Dodge or Help with its own {{bonusaction}}, and its attacks can deal force damage.</p>"},
    {lvl:"Level 11",name:"Bestial Fury",body:"<p>The beast strikes twice when commanded, and its first hit each turn on a {{huntersmark|marked}} creature carries the mark's extra damage as force.</p>"},
    {lvl:"Level 15",name:"Share Spells",body:"<p>A spell you cast on yourself also affects the beast within 30 feet.</p>"}
  ]};

ENTRIES["ra-feywanderer"] = { cls:"ranger", nav:"Fey Wanderer", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger subclass",
  name:"Fey Wanderer", tag:"Carry a fey blessing, and a little of its strangeness",
  flavor:"Touched by the Feywild — gifted, cursed, or both. The only Ranger built to talk its way through a room, and the one most likely to unsettle everyone in it.",
  src:"Player's Handbook 2024, p. 124",
  mods:{
    huntersmark:"Fey Wanderer stacks its own psychic damage on top rather than modifying the mark itself — every weapon hit carries extra damage whether the target is marked or not.",
    abilitycheck:"Otherworldly Glamour adds your Wisdom modifier to every Charisma check, which turns the party's tracker into its negotiator.",
    charmed:"Beguiling Twist lets you reflect an attempt at charming or frightening straight back at someone else.",
    frightened:"Same feature, and the same reflection.",
    teleport:"Misty Wanderer at 15 gives free Misty Step several times a day — and you can bring a friend."
  },
  features:[
    {lvl:"Level 3",name:"Dreadful Strikes",body:"<p>An extra d4 psychic on a weapon hit, once per turn per target, rising to d6 at 11.</p>"},
    {lvl:"Level 3",name:"Otherworldly Glamour",body:"<p>Add your Wisdom modifier to every Charisma {{abilitycheck}}, plus a social skill proficiency.</p>"},
    {lvl:"Level 7",name:"Beguiling Twist",body:"<p>{{advantage}} on saves against being {{charmed}} or {{frightened}}, and when someone nearby resists such an effect you can bounce it onto a different creature.</p>"},
    {lvl:"Level 11",name:"Fey Reinforcements",body:"<p>Summon Fey always {{preparedspells|prepared}} and free once per {{longrest}}.</p>"},
    {lvl:"Level 15",name:"Misty Wanderer",body:"<p>Misty Step free a Wisdom-modifier number of times per {{longrest}}, carrying one willing creature with you when you {{teleport}}.</p>"}
  ]};

ENTRIES["ra-gloomstalker"] = { cls:"ranger", nav:"Gloom Stalker", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger subclass",
  name:"Gloom Stalker", tag:"Hunt in the dark, and be gone before it answers",
  flavor:"Rangers of the Underdark and everywhere else light doesn't reach. The ambusher's subclass — built to end a fight in the first round rather than win it over five.",
  src:"Player's Handbook 2024, p. 125",
  mods:{
    huntersmark:"Gloom Stalker is the one subclass that largely ignores it. Its damage comes from Dreadful Strike and its first-round burst instead, which is why it feels so unlike the other three.",
    initiative:"Dread Ambusher adds your Wisdom modifier to it, and the whole subclass is designed around acting first.",
    darkvision:"60 feet, or 60 more — and crucially you're invisible to anything relying on darkvision while you're in darkness.",
    invisible:"Umbral Sight grants it against darkvision specifically, which is a very different thing from ordinary invisibility and catches most underground enemies.",
    reaction:"Shadowy Dodge at 15 imposes disadvantage on an attack against you and teleports you 30 feet whether it lands or not.",
    frightened:"Mass Fear at 11 spreads it from your target to everything within 10 feet of it."
  },
  features:[
    {lvl:"Level 3",name:"Dread Ambusher",body:"<p>Add your Wisdom modifier to {{initiative}}, and open a fight with a burst of speed and an extra attack carrying psychic damage — the Dreadful Strike its later features build on.</p>"},
    {lvl:"Level 3",name:"Umbral Sight",body:"<p>{{darkvision}} out to 60 feet, and while entirely in darkness you are {{invisible}} to anything relying on darkvision to see you.</p>"},
    {lvl:"Level 7",name:"Iron Mind",body:"<p>Proficiency in Wisdom {{savingthrow|saving throws}} — or Intelligence or Charisma if you had it already.</p>"},
    {lvl:"Level 11",name:"Stalker's Flurry",body:"<p>Dreadful Strike rises to 2d8, and can add <b>Sudden Strike</b>, another attack on a nearby creature, or <b>Mass Fear</b>, leaving the target and everything within 10 feet {{frightened}}.</p>"},
    {lvl:"Level 15",name:"Shadowy Dodge",body:"<p>A {{reaction}} imposes {{disadvantage}} on an attack against you, then {{teleport|teleports}} you 30 feet — hit or miss.</p>"}
  ]};

ENTRIES["ra-hunter"] = { cls:"ranger", nav:"Hunter", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger subclass",
  name:"Hunter", tag:"Protect nature and people from destruction",
  flavor:"The plainest Ranger, and the most adaptable. Every Hunter feature is a choice between two options you can swap on a rest, so the subclass reshapes itself to whatever you're fighting this week.",
  src:"Player's Handbook 2024, p. 127",
  mods:{
    huntersmark:"Hunter squeezes the most out of it: Hunter's Lore reads a marked creature's defences, and at 11 the mark's damage can hit a second creature 30 feet away every turn.",
    resistance:"Hunter's Lore tells you what the marked creature has, and Superior Hunter's Defense at 15 gives you some of your own as a reaction, matched to whatever just hit you.",
    vulnerability:"Same feature — you learn it about anything you've marked, for free, all the time.",
    opportunityattack:"Escape the Horde at 7 gives them disadvantage against you, which is how a Hunter walks out of a crowd.",
    reaction:"Superior Hunter's Defense spends one to gain resistance to the damage type that just hit you, for the rest of the turn."
  },
  features:[
    {lvl:"Level 3",name:"Hunter's Lore",body:"<p>While a creature is {{huntersmark|marked}}, you know its {{immunity|immunities}}, {{resistance|resistances}} and {{vulnerability|vulnerabilities}}.</p>"},
    {lvl:"Level 3",name:"Hunter's Prey",body:"<p>Pick one, swappable on a rest. <b>Colossus Slayer</b> adds d8 once a turn to a creature missing any {{hitpoints}}. <b>Horde Breaker</b> gives a second attack against a different creature nearby.</p>"},
    {lvl:"Level 7",name:"Defensive Tactics",body:"<p><b>Escape the Horde</b> gives {{opportunityattack|opportunity attacks}} {{disadvantage}} against you, or <b>Multiattack Defense</b> makes a creature's follow-up attacks harder after its first hits.</p>"},
    {lvl:"Level 11",name:"Superior Hunter's Prey",body:"<p>Once a turn, the {{huntersmark|mark}}'s extra damage also lands on a second creature within 30 feet of the first.</p>"},
    {lvl:"Level 15",name:"Superior Hunter's Defense",body:"<p>A {{reaction}} gives you {{resistance}} to the damage you just took, and to that type, until the turn ends.</p>"}
  ]};

/* ---------------- Rogue ---------------- */
TERMS.sneakattack = {n:"Sneak Attack",s:"rogue",d:"Once a turn, a pile of extra d6s when you have advantage or a friend is next to the target. It's most of a Rogue's damage, and it grows every other level."};
TERMS.cunningaction = {n:"Cunning Action",s:"rogue",d:"Dash, Disengage or Hide as a Bonus Action, every turn, for free. The reason Rogues are so hard to pin down."};
TERMS.cunningstrike = {n:"Cunning Strike",s:"rogue",d:"From level 5, trade Sneak Attack dice for effects — poison, trip, withdraw, and later daze or knock out. Damage spent on control."};
TERMS.uncannydodge = {n:"Uncanny Dodge",s:"rogue",d:"A Reaction that halves the damage of an attack you saw coming."};
TERMS.soulknifedice = {n:"Psionic Energy Dice",s:"rogue",d:"The Soulknife's pool, spent on landing missed attacks, teleporting, boosting checks, and later on invisibility. Refills on a rest."};
TERMS.unconscious = {n:"Unconscious",s:"core",d:"A condition. You're out — prone, unaware, dropping what you held, and attacks against you from nearby are automatic critical hits."};

CLASSES.rogue = {
  name:"Rogue", src:"official",
  note:"<strong>Sneak Attack is the whole class, and each subclass spends it differently.</strong> Assassin front-loads it into the first round, Soulknife throws it as a psychic blade, Arcane Trickster sets it up with spells, Thief mostly ignores combat and gets very good at everything else.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Rogue, pp. 128–137.",
  groups:[
    {label:"The class itself", keys:["ro-core"]},
    {label:"Subclasses", keys:["ro-arcanetrickster","ro-assassin","ro-soulknife","ro-thief"]}
  ]
};

ENTRIES["ro-core"] = { cls:"rogue", nav:"Core features", navSub:"The class itself", kicker:"Rogue",
  name:"Core Class Features", tag:"One precise strike, and the best skill package in the book",
  flavor:"Rogues win by knowing something the other side doesn't. Rather than wearing an opponent down, you wait for the opening — and outside a fight you're simply the most capable person in the party.",
  src:"Player's Handbook 2024, pp. 128–131", mods:{},
  features:[
    {lvl:"Level 1",name:"Expertise and Sneak Attack",body:"<p>{{expertise}} in two skills, and {{sneakattack}}.</p>"},
    {lvl:"Level 1",name:"Thieves' Cant and Weapon Mastery",body:"<p>A secret language of signs and slang, and the {{weaponmastery}} property of two kinds of weapon.</p>"},
    {lvl:"Level 2",name:"Cunning Action",body:"<p>{{cunningaction}}.</p>"},
    {lvl:"Level 3",name:"Rogue Subclass and Steady Aim",body:"<p>Your subclass, plus a {{bonusaction}} giving {{advantage}} on your next attack — at the price of not moving this turn.</p>"},
    {lvl:"Level 5",name:"Cunning Strike and Uncanny Dodge",body:"<p>{{cunningstrike}}, and {{uncannydodge}}.</p>"},
    {lvl:"Level 7",name:"Evasion and Reliable Talent",body:"<p>{{evasion}}, and any {{abilitycheck}} using a proficiency treats a d20 of 9 or lower as a 10 — you stop failing at things you're good at.</p>"},
    {lvl:"Level 11",name:"Improved Cunning Strike",body:"<p>Two {{cunningstrike|Cunning Strike}} effects at once, paying for each.</p>"},
    {lvl:"Level 14",name:"Devious Strikes",body:"<p>New {{cunningstrike|Cunning Strike}} options: <b>Daze</b> for 2d6, or <b>Knock Out</b> for 6d6, leaving the target {{unconscious}} for a minute.</p>"},
    {lvl:"Level 15",name:"Slippery Mind",body:"<p>Proficiency in Wisdom and Charisma {{savingthrow|saving throws}}.</p>"},
    {lvl:"Level 18",name:"Elusive",body:"<p>No attack can have {{advantage}} against you unless you're {{incapacitated}}.</p>"},
    {lvl:"Level 20",name:"Stroke of Luck",body:"<p>Turn a failed {{d20test}} into a 20. Once per {{shortrest}}.</p>"}
  ]};

ENTRIES["ro-arcanetrickster"] = { cls:"rogue", nav:"Arcane Trickster", navSub:"Levels 3 · 9 · 13 · 17", kicker:"Rogue subclass",
  name:"Arcane Trickster", tag:"Enhance stealth and mischief with magic",
  flavor:"A Rogue who learned enough Wizardry to cheat with. Illusion and enchantment mostly, and a spectral hand that does the actual burgling while you stand somewhere innocent.",
  src:"Player's Handbook 2024, p. 132",
  mods:{
    sneakattack:"Arcane Trickster is the subclass that manufactures the conditions for it rather than boosting the damage — invisibility, illusions and a distracting hand all exist to get you the advantage you need.",
    preparedspells:"A third of a Wizard's progression on Intelligence, weighted to illusion and enchantment.",
    invisible:"Magical Ambush at 9 rewards it: cast while invisible and the target has disadvantage on the save.",
    bonusaction:"Mage Hand Legerdemain lets you cast and control the hand with one, so the trick runs alongside your normal turn.",
    disadvantage:"Magical Ambush imposes it on saves, which is how a part-time caster lands full-time spells."
  },
  features:[
    {lvl:"Level 3",name:"Spellcasting",body:"<p>{{preparedspells}} from the Wizard list on Intelligence, mostly illusion and enchantment, plus Mage Hand.</p>"},
    {lvl:"Level 3",name:"Mage Hand Legerdemain",body:"<p>Cast and control Mage Hand as a {{bonusaction}}, make it {{invisible}}, and make Sleight of Hand checks through it.</p>"},
    {lvl:"Level 9",name:"Magical Ambush",body:"<p>Cast while {{invisible}} and the target has {{disadvantage}} on its {{savingthrow}} that turn.</p>"},
    {lvl:"Level 13",name:"Versatile Trickster",body:"<p>Use the hand to distract a creature, handing you {{advantage}} on attacks against it.</p>"},
    {lvl:"Level 17",name:"Spell Thief",body:"<p>Steal a spell cast at you, denying the caster its use and gaining it yourself for a short while.</p>"}
  ]};

ENTRIES["ro-assassin"] = { cls:"rogue", nav:"Assassin", navSub:"Levels 3 · 9 · 13 · 17", kicker:"Rogue subclass",
  name:"Assassin", tag:"Practise the grim art of death",
  flavor:"Disguises, poisons, and a first round designed to end the conversation. The Assassin is front-loaded by design — enormously dangerous before the enemy has taken a turn.",
  src:"Player's Handbook 2024, p. 134",
  mods:{
    sneakattack:"Assassinate makes the first round of every fight worth more: advantage on anything that hasn't acted yet, and bonus damage equal to your level on a Sneak Attack landed in that round.",
    initiative:"Advantage on it, permanently. Going first isn't a bonus here, it's the subclass working as intended.",
    cunningstrike:"Envenom Weapons at 13 doubles the damage of the Poison option, making the cheapest Cunning Strike the best one.",
    poisoned:"The Poison option inflicts it, and this is the subclass built to lean on it.",
    speed:"Roving Aim at 9 removes Steady Aim's penalty, so you can take the advantage and still move."
  },
  features:[
    {lvl:"Level 3",name:"Assassinate",body:"<p>{{advantage}} on {{initiative}}. In the first round, {{advantage}} on attacks against anything yet to take a turn — and a {{sneakattack|Sneak Attack}} landed that round deals extra damage equal to your Rogue level.</p>"},
    {lvl:"Level 3",name:"Assassin's Tools",body:"<p>A disguise kit and a poisoner's kit, with proficiency in both.</p>"},
    {lvl:"Level 9",name:"Infiltration Expertise",body:"<p>Mimic anyone's speech or handwriting after an hour of study, and Steady Aim no longer drops your {{speed}} to zero.</p>"},
    {lvl:"Level 13",name:"Envenom Weapons",body:"<p>The Poison {{cunningstrike|Cunning Strike}} option deals double its usual damage.</p>"},
    {lvl:"Level 17",name:"Death Strike",body:"<p>In the first round, a hit on a surprised creature forces a Constitution {{savingthrow}} — on a failure, double all the damage.</p>"}
  ]};

ENTRIES["ro-soulknife"] = { cls:"rogue", nav:"Soulknife", navSub:"Levels 3 · 9 · 13 · 17", kicker:"Rogue subclass",
  name:"Soulknife", tag:"Strike foes with psionic blades",
  flavor:"A Rogue who never needs to carry a weapon, because the weapon is made of mind. Blades you manifest, throw sixty feet, and dismiss — and a pool of dice that quietly fixes your misses.",
  src:"Player's Handbook 2024, p. 135",
  mods:{
    sneakattack:"Psychic Blades carry it like any finesse weapon, and at 17 a Sneak Attack through them can leave the target stunned outright.",
    soulknifedice:"The subclass's second resource alongside Sneak Attack. Homing Strikes turns a miss into a hit, Psychic Teleportation moves you, and later a die buys back your invisibility.",
    invisible:"Psychic Veil at 13 gives an hour of it, ending the moment you hurt someone — so it's an infiltration tool, not a combat one.",
    teleport:"Psychic Teleportation throws a blade at a space and puts you there.",
    stunned:"Rend Mind at 17 can impose it for a minute off a single Sneak Attack — the strongest control any Rogue gets.",
    abilitycheck:"Psi-Bolstered Knack spends a die to rescue a failed one."
  },
  features:[
    {lvl:"Level 3",name:"Psionic Power",body:"<p>{{soulknifedice}}. <b>Psi-Bolstered Knack</b> rescues a failed {{abilitycheck}}; <b>Psychic Whispers</b> gives telepathy for a while.</p>"},
    {lvl:"Level 3",name:"Psychic Blades",body:"<p>Manifest a blade when you Attack or make an {{opportunityattack}}: a finesse, thrown simple weapon dealing d6 psychic at 60 feet, with a second blade as a {{bonusaction}}.</p>"},
    {lvl:"Level 9",name:"Soul Blades",body:"<p><b>Homing Strikes</b> spends a die to turn a missed blade attack into a hit. <b>Psychic Teleportation</b> throws a blade and {{teleport|teleports}} you to where it lands.</p>"},
    {lvl:"Level 13",name:"Psychic Veil",body:"<p>A {{magicaction}} makes you {{invisible}} for an hour, ending when you deal damage or force a {{savingthrow}}. Once per {{longrest}}, or spend a die.</p>"},
    {lvl:"Level 17",name:"Rend Mind",body:"<p>A {{sneakattack|Sneak Attack}} with the blades can leave the target {{stunned}} for a minute on a failed Wisdom {{savingthrow}}.</p>"}
  ]};

ENTRIES["ro-thief"] = { cls:"rogue", nav:"Thief", navSub:"Levels 3 · 9 · 13 · 17", kicker:"Rogue subclass",
  name:"Thief", tag:"Hunt for treasure as a classic adventurer",
  flavor:"The oldest Rogue there is. Thief spends almost nothing on combat and everything on being somewhere you shouldn't be, holding something that isn't yours.",
  src:"Player's Handbook 2024, p. 137",
  mods:{
    bonusaction:"Fast Hands is the subclass. Picking a lock, disarming a trap, picking a pocket or using a magic item all move to your bonus action — so the turn you'd have lost to fiddling, you keep.",
    cunningstrike:"Supreme Sneak adds Stealth Attack, which lets you attack without giving away that you were hidden, provided you end behind cover.",
    invisible:"The Hide action's version survives an attack under Supreme Sneak, which is unique in the class.",
    cover:"Stealth Attack requires you to end the turn behind three-quarters or total cover for it to work.",
    initiative:"Thief's Reflexes gives you two turns in the first round — your normal one, and another ten lower.",
    speed:"Second-Story Work gives a climb speed matching your own, and lets you jump off Dexterity."
  },
  features:[
    {lvl:"Level 3",name:"Fast Hands",body:"<p>A {{bonusaction}} for Sleight of Hand, thieves' tools, or using an object — including magic items that need an action.</p>"},
    {lvl:"Level 3",name:"Second-Story Work",body:"<p>A climb {{speed}} matching your own, and jumps measured off Dexterity.</p>"},
    {lvl:"Level 9",name:"Supreme Sneak",body:"<p>A {{cunningstrike|Cunning Strike}} option: attack without losing the Hide action's {{invisible}} condition, if you end the turn behind three-quarters or total {{cover}}.</p>"},
    {lvl:"Level 13",name:"Use Magic Device",body:"<p>Attune to four magic items instead of three, and charges you spend sometimes aren't spent at all.</p>"},
    {lvl:"Level 17",name:"Thief's Reflexes",body:"<p>Two turns in the first round of any fight — one at your {{initiative}}, one at your initiative minus 10.</p>"}
  ]};

/* ---------------- Sorcerer ---------------- */
TERMS.sorcerypoints = {n:"Sorcery Points",s:"sorcerer",d:"The Sorcerer's second currency, one per level. Spent on Metamagic, converted into spell slots, and used by every origin to reload its own features."};
TERMS.metamagic = {n:"Metamagic",s:"sorcerer",d:"Bending a spell as you cast it — twin it onto a second target, cast it in an instant, make it silent and gestureless, or spare your friends from its area."};
TERMS.innatesorcery = {n:"Innate Sorcery",s:"sorcerer",d:"A Bonus Action that raises your spell save DC and gives advantage on your spell attacks for a minute, twice per long rest. Several later features only work while it's running."};
TERMS.wildmagicsurge = {n:"Wild Magic Surge",s:"sorcerer",d:"A roll after casting that can unleash something entirely unplanned — and can't be controlled with Metamagic."};

CLASSES.sorcerer = {
  name:"Sorcerer", src:"official",
  note:"<strong>Everything spends Sorcery Points.</strong> Metamagic spends them, and so does every origin's best feature — Aberrant reshapes your body with them, Clockwork buys back its trance, Draconic buys wings, Wild Magic bends luck. Budgeting them is the class.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Sorcerer, pp. 138–151.",
  groups:[
    {label:"The class itself", keys:["so-core"]},
    {label:"Origins", keys:["so-aberrant","so-clockwork","so-draconic","so-wildmagic"]}
  ]
};

ENTRIES["so-core"] = { cls:"sorcerer", nav:"Core features", navSub:"The class itself", kicker:"Sorcerer",
  name:"Core Class Features", tag:"A short spell list you know by heart, and the power to bend it",
  flavor:"Sorcerers never studied. The magic was in you from the start, and the art of the class is learning to shape it — splitting a spell across two targets, firing it off in an instant, casting it with no words at all.",
  src:"Player's Handbook 2024, pp. 138–141", mods:{},
  features:[
    {lvl:"Level 1",name:"Innate Sorcery",body:"<p>{{innatesorcery}}.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>A full caster on Charisma with a short list you know permanently — nothing to pack in the morning.</p>"},
    {lvl:"Level 2",name:"Font of Magic and Metamagic",body:"<p>{{sorcerypoints}}, convertible into {{spellslot|spell slots}} and back. And two {{metamagic}} options, with more as you level.</p>"},
    {lvl:"Level 3",name:"Sorcerer Subclass",body:"<p>Your origin: Aberrant, Clockwork, Draconic or Wild Magic.</p>"},
    {lvl:"Level 5",name:"Sorcerous Restoration",body:"<p>Recover {{sorcerypoints|Sorcery Points}} up to half your level on a {{shortrest}}, once per {{longrest}}.</p>"},
    {lvl:"Level 7",name:"Sorcery Incarnate",body:"<p>Spend 2 {{sorcerypoints|Sorcery Points}} to use {{innatesorcery}} when you're out, and stack two {{metamagic}} options per spell while it runs.</p>"},
    {lvl:"Level 20",name:"Arcane Apotheosis",body:"<p>While {{innatesorcery}} is active, one {{metamagic}} option a turn costs nothing.</p>"}
  ]};

ENTRIES["so-aberrant"] = { cls:"sorcerer", nav:"Aberrant Sorcery", navSub:"Levels 3 · 6 · 14 · 18", kicker:"Sorcerer origin",
  name:"Aberrant Sorcery", tag:"Psionic power warped into you from somewhere else",
  flavor:"Something from the Far Realm brushed your bloodline. Your magic works on minds and on your own body, and it is not entirely comfortable to be near.",
  src:"Player's Handbook 2024, p. 145",
  mods:{
    sorcerypoints:"Aberrant is the origin that turns them into flesh. Revelation in Flesh spends one per body change — flight, a swim speed, seeing in the dark, squeezing through gaps — for ten minutes.",
    charmed:"Advantage on saves to avoid or end it from level 6.",
    frightened:"The same feature covers both, alongside resistance to psychic damage.",
    teleport:"Warping Implosion at 18 puts you 120 feet away and drags everything near where you were after you.",
    bonusaction:"Telepathic Speech opens a mental link with someone you can see, and it holds for miles."
  },
  features:[
    {lvl:"Level 3",name:"Psionic Spells",body:"<p>Extra {{preparedspells}} — mind-affecting and strange.</p>"},
    {lvl:"Level 3",name:"Telepathic Speech",body:"<p>A {{bonusaction}} links your mind to a creature within 30 feet, holding for miles equal to your Charisma.</p>"},
    {lvl:"Level 6",name:"Psychic Defenses",body:"<p>{{resistance}} to psychic damage, and {{advantage}} on saves against {{charmed}} and {{frightened}}.</p>"},
    {lvl:"Level 14",name:"Revelation in Flesh",body:"<p>A {{bonusaction}} and one or more {{sorcerypoints|Sorcery Points}} reshape you for ten minutes — one benefit per point: flight, a swim speed, {{darkvision}}, or a body that squeezes through anything.</p>"},
    {lvl:"Level 18",name:"Warping Implosion",body:"<p>{{teleport}} 120 feet; everything within 30 feet of where you stood takes 3d10 force and is hauled toward the space you left.</p>"}
  ]};

ENTRIES["so-clockwork"] = { cls:"sorcerer", nav:"Clockwork Sorcery", navSub:"Levels 3 · 6 · 14 · 18", kicker:"Sorcerer origin",
  name:"Clockwork Sorcery", tag:"Draw on the plane of absolute order",
  flavor:"Magic from Mechanus, where everything turns on schedule. The Clockwork Sorcerer spends the whole game removing randomness — from allies' rolls, from enemies' advantage, and eventually from their own dice.",
  src:"Player's Handbook 2024, p. 146",
  mods:{
    advantage:"Restore Balance cancels it, or disadvantage, on somebody else's roll before it happens. It's the only feature in the game that simply deletes both.",
    disadvantage:"Same feature, same reaction — which makes it useful for helping allies as well as hindering enemies.",
    reaction:"Restore Balance spends one, a Charisma-modifier number of times per long rest.",
    sorcerypoints:"Bastion of Law spends 1 to 5 of them on a ward of d8s that soaks damage, and 5 more buy back Trance of Order.",
    d20test:"Trance of Order treats any d20 of 9 or lower as a 10 for a full minute, and stops attacks against you benefiting from advantage."
  },
  features:[
    {lvl:"Level 3",name:"Clockwork Spells",body:"<p>Extra {{preparedspells}} — order, protection and restoration.</p>"},
    {lvl:"Level 3",name:"Restore Balance",body:"<p>A {{reaction}} stops a roll within 60 feet benefiting from {{advantage}} or suffering {{disadvantage}}.</p>"},
    {lvl:"Level 6",name:"Bastion of Law",body:"<p>A {{magicaction}} and 1 to 5 {{sorcerypoints|Sorcery Points}} ward a creature within 30 feet with that many d8s, spent to reduce damage.</p>"},
    {lvl:"Level 14",name:"Trance of Order",body:"<p>A {{bonusaction}} for a minute: attacks against you can't have {{advantage}}, and every {{d20test}} treats 9 or lower as a 10.</p>"},
    {lvl:"Level 18",name:"Clockwork Cavalcade",body:"<p>A 30-foot cube of order spirits that heals, repairs and ends spells within it.</p>"}
  ]};

ENTRIES["so-draconic"] = { cls:"sorcerer", nav:"Draconic Sorcery", navSub:"Levels 3 · 6 · 14 · 18", kicker:"Sorcerer origin",
  name:"Draconic Sorcery", tag:"A dragon somewhere in the bloodline",
  flavor:"The sturdiest Sorcerer. Scales, extra hit points, and eventually wings — this is the origin that answers the class's biggest problem, which is that a d6 caster dies easily.",
  src:"Player's Handbook 2024, p. 148",
  mods:{
    hitpoints:"Draconic Resilience raises your maximum by 3 and by 1 every level after — quietly the largest survivability bump any origin gives.",
    armorclass:"Unarmoured, yours becomes 10 plus Dexterity plus Charisma, which means your casting stat is also your defence.",
    resistance:"Elemental Affinity gives it against a dragon damage type of your choice, and lets you add Charisma to one damage roll of that type.",
    flyspeed:"Dragon Wings at 14: 60 feet for an hour, once per long rest or for 3 Sorcery Points.",
    sorcerypoints:"Three of them buy the wings back, which is the origin's main claim on the budget."
  },
  features:[
    {lvl:"Level 3",name:"Draconic Resilience",body:"<p>Your {{hitpoints|hit point}} maximum rises by 3, and by 1 per level after. Unarmoured, your {{armorclass}} is 10 plus Dexterity plus Charisma.</p>"},
    {lvl:"Level 3",name:"Draconic Spells",body:"<p>Extra {{preparedspells}} — dragon magic.</p>"},
    {lvl:"Level 6",name:"Elemental Affinity",body:"<p>Pick acid, cold, fire, lightning or poison: {{resistance}} to it, and your Charisma added to one damage roll of that type.</p>"},
    {lvl:"Level 14",name:"Dragon Wings",body:"<p>A {{bonusaction}} for an hour of {{flyspeed}} at 60 feet. Once per {{longrest}}, or 3 {{sorcerypoints|Sorcery Points}}.</p>"},
    {lvl:"Level 18",name:"Dragon Companion",body:"<p>Summon Dragon always {{preparedspells|prepared}}, and free once per {{longrest}}.</p>"}
  ]};

ENTRIES["so-wildmagic"] = { cls:"sorcerer", nav:"Wild Magic Sorcery", navSub:"Levels 3 · 6 · 14 · 18", kicker:"Sorcerer origin",
  name:"Wild Magic Sorcery", tag:"Magic that doesn't always do what it's told",
  flavor:"Power from raw chaos. The 2024 version is far kinder than its reputation — surges only fire on a natural 20 of your own rolling, and by 18 you choose the surge outright.",
  src:"Player's Handbook 2024, p. 149",
  mods:{
    wildmagicsurge:"Once a turn after casting with a slot, roll a d20 — a 20 triggers something from the table. Metamagic can't touch the result, which is the point.",
    metamagic:"Explicitly locked out of the surge. If you want control, this is the wrong origin.",
    advantage:"Tides of Chaos hands it to you on any d20 test, and casting with a slot afterwards gives it back.",
    d20test:"Tides of Chaos applies to any of them, which makes it one of the most flexible level-3 features in the class.",
    sorcerypoints:"Bend Luck spends 2 as a reaction to add or subtract d4 from somebody else's roll."
  },
  features:[
    {lvl:"Level 3",name:"Wild Magic Surge",body:"<p>{{wildmagicsurge}}.</p>"},
    {lvl:"Level 3",name:"Tides of Chaos",body:"<p>{{advantage}} on one {{d20test}}. Casting a spell with a {{spellslot}} afterwards restores the use.</p>"},
    {lvl:"Level 6",name:"Bend Luck",body:"<p>A {{reaction}} and 2 {{sorcerypoints|Sorcery Points}} add or subtract d4 from another creature's {{d20test}}.</p>"},
    {lvl:"Level 14",name:"Controlled Chaos",body:"<p>Roll twice on the surge table and pick which happens.</p>"},
    {lvl:"Level 18",name:"Tamed Surge",body:"<p>Choose the surge effect outright instead of rolling, once per {{longrest}}.</p>"}
  ]};

/* ---------------- Warlock ---------------- */
TERMS.pactmagic = {n:"Pact Magic",s:"warlock",d:"Very few spell slots — but they always fire at your highest level and refill on a short rest. A Warlock casts less often and bigger than anyone."};
TERMS.invocations = {n:"Eldritch Invocations",s:"warlock",d:"Permanent customisations you pick and can swap as you level: always-on spells, upgrades to Eldritch Blast, new senses. They're what actually distinguishes one Warlock from another."};
TERMS.mysticarcanum = {n:"Mystic Arcanum",s:"warlock",d:"From level 11, one very high-level spell per tier that you can cast once per long rest, entirely outside your normal slots."};

CLASSES.warlock = {
  name:"Warlock", src:"official",
  note:"<strong>The patron is only half the character.</strong> Invocations do at least as much work as your subclass, and they're chosen freely — so two Warlocks with the same patron can play nothing alike.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Warlock, pp. 152–163.",
  groups:[
    {label:"The class itself", keys:["wl-core"]},
    {label:"Patrons", keys:["wl-archfey","wl-celestial","wl-fiend","wl-greatoldone"]}
  ]
};

ENTRIES["wl-core"] = { cls:"warlock", nav:"Core features", navSub:"The class itself", kicker:"Warlock",
  name:"Core Class Features", tag:"Few spells, always at full strength, and a long list of permanent tricks",
  flavor:"You went looking for power and found something willing to trade. The rulebook is candid that many Warlocks treat a patron as a resource rather than a master — the relationship can be reverent, resentful, or quietly hostile.",
  src:"Player's Handbook 2024, pp. 152–158", mods:{},
  features:[
    {lvl:"Level 1",name:"Eldritch Invocations",body:"<p>{{invocations}}.</p>"},
    {lvl:"Level 1",name:"Pact Magic",body:"<p>{{pactmagic}}.</p>"},
    {lvl:"Level 2",name:"Magical Cunning",body:"<p>A one-minute rite recovers half your {{pactmagic|Pact Magic}} slots, once per {{longrest}} — effectively a third short rest's worth of casting.</p>"},
    {lvl:"Level 3",name:"Warlock Subclass",body:"<p>Your patron: Archfey, Celestial, Fiend or Great Old One.</p>"},
    {lvl:"Level 9",name:"Contact Patron",body:"<p>Contact Other Plane always {{preparedspells|prepared}}, and free once per {{longrest}} — reaching your patron directly, who answers truthfully.</p>"},
    {lvl:"Level 11",name:"Mystic Arcanum",body:"<p>{{mysticarcanum}} — a level 6 spell, with 7th, 8th and 9th arriving at 13, 15 and 17.</p>"},
    {lvl:"Level 20",name:"Eldritch Master",body:"<p>Regain all your {{mysticarcanum|Mystic Arcanum}} uses once per {{longrest}}.</p>"}
  ]};

ENTRIES["wl-archfey"] = { cls:"warlock", nav:"Archfey Patron", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Warlock patron",
  name:"Archfey Patron", tag:"A bargain with a lord of the Feywild",
  flavor:"Titania, the Prince of Frost, the Queen of Air and Darkness — beings of enormous power and famously poor faith. The most mobile Warlock, and the hardest to hold onto.",
  src:"Player's Handbook 2024, p. 159",
  mods:{
    teleport:"Steps of the Fey is the subclass: free Misty Step several times per long rest, with a rider attached to each casting — and from 6th you can cast it as a reaction to taking damage.",
    reaction:"Two of them here. Misty Escape blinks you away when hurt, and Beguiling Defenses halves an attack's damage and punishes the attacker.",
    charmed:"Flat immunity from level 10.",
    temporaryhp:"One of the Steps of the Fey riders grants it on arrival, which turns your escape into a small heal."
  },
  features:[
    {lvl:"Level 3",name:"Steps of the Fey",body:"<p>Misty Step free a Charisma-modifier number of times per {{longrest}}, each casting carrying a rider — {{temporaryhp}}, or forcing a creature away from you.</p>"},
    {lvl:"Level 3",name:"Archfey Spells",body:"<p>Extra {{preparedspells}} — charm, illusion and escape.</p>"},
    {lvl:"Level 6",name:"Misty Escape",body:"<p>Cast Misty Step as a {{reaction}} to taking damage, with more rider options.</p>"},
    {lvl:"Level 10",name:"Beguiling Defenses",body:"<p>Immune to {{charmed}}, and a {{reaction}} halves an attack's damage and forces the attacker into a Wisdom {{savingthrow}}.</p>"},
    {lvl:"Level 14",name:"Bewitching Magic",body:"<p>Casting an enchantment or illusion lets you {{teleport}} with Misty Step free as part of the same turn.</p>"}
  ]};

ENTRIES["wl-celestial"] = { cls:"warlock", nav:"Celestial Patron", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Warlock patron",
  name:"Celestial Patron", tag:"A pact with something from the Upper Planes",
  flavor:"An empyrean, a couatl, a unicorn. The only Warlock who can reliably heal, which makes this the patron for a party without a Cleric.",
  src:"Player's Handbook 2024, p. 160",
  mods:{
    hitpoints:"Healing Light is a pool of d6s equal to your level plus one, spent as a Bonus Action on anyone within 60 feet — refilling on a long rest, entirely separate from your spell slots.",
    bonusaction:"Healing Light costs one every time, so this patron competes with everything else you'd want to do with it.",
    resistance:"Radiant from level 6, and you add Charisma to one radiant or fire damage roll per turn.",
    temporaryhp:"Celestial Resilience gives them to you and your allies on every rest, which quietly stretches the party's day."
  },
  features:[
    {lvl:"Level 3",name:"Healing Light",body:"<p>A pool of d6s equal to your level plus 1. A {{bonusaction}} spends some to restore {{hitpoints}} to anyone within 60 feet. Back on a {{longrest}}.</p>"},
    {lvl:"Level 3",name:"Celestial Spells",body:"<p>Extra {{preparedspells}} — light, fire and healing.</p>"},
    {lvl:"Level 6",name:"Radiant Soul",body:"<p>{{resistance}} to radiant, and once a turn add your Charisma to one radiant or fire damage roll.</p>"},
    {lvl:"Level 10",name:"Celestial Resilience",body:"<p>{{temporaryhp}} for you and your allies whenever you finish a rest.</p>"},
    {lvl:"Level 14",name:"Searing Vengeance",body:"<p>When you would drop to 0 {{hitpoints}}, rise instead in a burst of radiance that blinds nearby enemies.</p>"}
  ]};

ENTRIES["wl-fiend"] = { cls:"warlock", nav:"Fiend Patron", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Warlock patron",
  name:"Fiend Patron", tag:"A deal with something from the Lower Planes",
  flavor:"A devil, a demon, a yugoloth. The sturdiest Warlock, because your patron would rather you kept working than died.",
  src:"Player's Handbook 2024, p. 161",
  mods:{
    temporaryhp:"Dark One's Blessing hands them to you every time you drop an enemy — so the more the fight goes your way, the harder you are to kill.",
    hitpoints:"The same feature. It's the most consistent survivability in the class, and it costs nothing.",
    d20test:"Dark One's Own Luck adds a d10 to one a few times per rest — quietly one of the best level 6 features anywhere.",
    resistance:"Fiendish Resilience picks a damage type on every rest, so you can retune it to whatever you're about to fight.",
    teleport:"Hurl Through Hell throws a creature through the Lower Planes for a turn; it comes back badly hurt."
  },
  features:[
    {lvl:"Level 3",name:"Dark One's Blessing",body:"<p>Drop an enemy to 0 {{hitpoints}} and gain {{temporaryhp}} equal to your Charisma modifier plus your Warlock level.</p>"},
    {lvl:"Level 3",name:"Fiend Spells",body:"<p>Extra {{preparedspells}} — fire and command.</p>"},
    {lvl:"Level 6",name:"Dark One's Own Luck",body:"<p>Add d10 to a {{d20test}} after rolling, a Charisma-modifier number of times per {{longrest}}.</p>"},
    {lvl:"Level 10",name:"Fiendish Resilience",body:"<p>{{resistance}} to a damage type of your choice other than force, re-chosen on every rest.</p>"},
    {lvl:"Level 14",name:"Hurl Through Hell",body:"<p>Once a turn on a hit, {{teleport}} the target through the Lower Planes — it returns at the end of your next turn having taken heavy psychic damage.</p>"}
  ]};

ENTRIES["wl-greatoldone"] = { cls:"warlock", nav:"Great Old One Patron", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Warlock patron",
  name:"Great Old One Patron", tag:"A pact with something that may not know you exist",
  flavor:"An entity of the Far Realm whose attention you may never have had. The most psychic Warlock — minds, curses, and spells cast without saying anything at all.",
  src:"Player's Handbook 2024, p. 162",
  mods:{
    preparedspells:"Psychic Spells lets any damaging spell become psychic, and any enchantment or illusion be cast with no words and no gestures — which is close to a permanent Subtle Spell.",
    bonusaction:"Awakened Mind opens a telepathic bond with someone you can see, holding for miles.",
    disadvantage:"Two sources: Clairvoyant Combatant makes your bonded target worse at attacking you, and Eldritch Hex widens Hex to cover saving throws.",
    resistance:"Thought Shield gives it against psychic damage and makes your mind unreadable.",
    temporaryhp:"Create Thrall gives them to a summoned aberration, which also hits your hexed target harder."
  },
  features:[
    {lvl:"Level 3",name:"Awakened Mind",body:"<p>A {{bonusaction}} opens a telepathic link with a creature within 30 feet, holding for miles equal to your Charisma.</p>"},
    {lvl:"Level 3",name:"Psychic Spells",body:"<p>Any damaging Warlock spell can become psychic, and enchantments and illusions need no words or gestures.</p>"},
    {lvl:"Level 6",name:"Clairvoyant Combatant",body:"<p>Your bonded creature makes a Wisdom {{savingthrow}}; on a failure it attacks you at {{disadvantage}} and you attack it with {{advantage}}.</p>"},
    {lvl:"Level 10",name:"Eldritch Hex and Thought Shield",body:"<p>Hex always {{preparedspells|prepared}}, and it also gives {{disadvantage}} on saves of the chosen ability. Your thoughts can't be read, and you gain {{resistance}} to psychic damage.</p>"},
    {lvl:"Level 14",name:"Create Thrall",body:"<p>Summon Aberration without {{concentration}} for a minute, with {{temporaryhp}} and bonus psychic damage against your hexed target.</p>"}
  ]};

/* ---------------- Wizard ---------------- */
TERMS.spellbook = {n:"Spellbook",s:"wizard",d:"The Wizard's real class feature. Every spell you find written down can be copied into it, so your options grow from loot as well as from levelling."};
TERMS.arcanerecovery = {n:"Arcane Recovery",s:"wizard",d:"Recover spell slots on a short rest, once a day, worth up to half your level. The reason a Wizard can keep going when a Sorcerer can't."};
TERMS.portent = {n:"Portent",s:"wizard",d:"Two d20 results rolled at dawn and set aside. You may substitute one for any roll made by you or a creature you can see — including replacing an enemy's hit with a 1."};
TERMS.arcaneward = {n:"Arcane Ward",s:"wizard",d:"A shield of absorbed magic with its own hit points, recharged every time you cast an abjuration spell. It sits between you and damage all day."};

CLASSES.wizard = {
  name:"Wizard", src:"official",
  note:"<strong>All four subclasses are about a school of magic, but only two are about casting it.</strong> Abjurer builds a shield out of its spells, Diviner rewrites dice, Evoker protects allies from its own fireballs, Illusionist eventually makes illusions partly real.",
  foot:"Source: Player's Handbook (2024), Chapter 3 — Wizard, pp. 164–175.",
  groups:[
    {label:"The class itself", keys:["wi-core"]},
    {label:"Schools", keys:["wi-abjurer","wi-diviner","wi-evoker","wi-illusionist"]}
  ]
};

ENTRIES["wi-core"] = { cls:"wizard", nav:"Core features", navSub:"The class itself", kicker:"Wizard",
  name:"Core Class Features", tag:"More spells than anyone, and a book that keeps growing",
  flavor:"Magic is a system with rules and you've spent your life learning them. The hardest class to play well, the most powerful one to play well, and the one most likely to solve the adventure in an afternoon of reading.",
  src:"Player's Handbook 2024, pp. 164–167", mods:{},
  features:[
    {lvl:"Level 1",name:"Spellcasting and Spellbook",body:"<p>A full caster on Intelligence, choosing {{preparedspells}} from your {{spellbook}}.</p>"},
    {lvl:"Level 1",name:"Ritual Adept and Arcane Recovery",body:"<p>Any {{ritual}} in the book can be cast as one without preparing it. And {{arcanerecovery}}.</p>"},
    {lvl:"Level 2",name:"Scholar",body:"<p>{{expertise}} in one of Arcana, History, Investigation, Medicine, Nature or Religion.</p>"},
    {lvl:"Level 3",name:"Wizard Subclass",body:"<p>Your school: Abjurer, Diviner, Evoker or Illusionist.</p>"},
    {lvl:"Level 5",name:"Memorize Spell",body:"<p>Swap one prepared spell for another from the {{spellbook}} on every {{shortrest}} — which makes a Wizard's list flexible mid-adventure, not just each morning.</p>"},
    {lvl:"Level 18",name:"Spell Mastery",body:"<p>One level 1 and one level 2 spell you can cast at will, without a {{spellslot}}.</p>"},
    {lvl:"Level 20",name:"Signature Spells",body:"<p>Two level 3 spells always {{preparedspells|prepared}}, each castable free once per {{shortrest}}.</p>"}
  ]};

ENTRIES["wi-abjurer"] = { cls:"wizard", nav:"Abjurer", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Wizard school",
  name:"Abjurer", tag:"Master protective magic",
  flavor:"Wards, dispelling and banishment. Abjurers are the most durable Wizards by a wide margin, because every protective spell they cast quietly tops up a shield they carry all day.",
  src:"Player's Handbook 2024, p. 172",
  mods:{
    arcaneward:"The subclass. Casting any abjuration spell with a slot creates or refills it, and it lasts until a long rest — so a Wizard who casts Shield twice a fight is also rebuilding their own armour.",
    reaction:"Projected Ward at 6 spends one to make the ward absorb damage aimed at someone else within 30 feet.",
    resistance:"Spell Resistance at 14 gives it against all spell damage, on top of advantage on saves against spells.",
    savingthrow:"Advantage against spells specifically, from 14 — which is most of what threatens a high-level Wizard.",
    spellbook:"Abjuration Savant adds free abjuration spells to it at every new spell level, so the ward's fuel supply grows on its own."
  },
  features:[
    {lvl:"Level 3",name:"Abjuration Savant",body:"<p>Two free abjuration spells in your {{spellbook}}, and another whenever you reach a new {{spellslot}} level.</p>"},
    {lvl:"Level 3",name:"Arcane Ward",body:"<p>{{arcaneward}} — a maximum of twice your Wizard level plus Intelligence, refilled by casting abjuration spells.</p>"},
    {lvl:"Level 6",name:"Projected Ward",body:"<p>A {{reaction}} makes the {{arcaneward|ward}} absorb damage taken by anyone within 30 feet.</p>"},
    {lvl:"Level 10",name:"Spell Breaker",body:"<p>Counterspell and Dispel Magic always {{preparedspells|prepared}}, and you can cast them without spending a {{spellslot}}.</p>"},
    {lvl:"Level 14",name:"Spell Resistance",body:"<p>{{advantage}} on {{savingthrow|saving throws}} against spells, and {{resistance}} to spell damage.</p>"}
  ]};

ENTRIES["wi-diviner"] = { cls:"wizard", nav:"Diviner", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Wizard school",
  name:"Diviner", tag:"Learn the secrets of the multiverse",
  flavor:"Sought out by kings and priests for a glimpse of what's coming. In play, Portent is one of the strongest features in the book — you get to decide, twice a day, that something simply goes the way you want.",
  src:"Player's Handbook 2024, p. 173",
  mods:{
    portent:"The whole subclass. Rolled at dawn and held until used — and because you can apply one to an enemy's roll, a Diviner can cancel a dragon's breath save or turn its critical into a fumble.",
    d20test:"Portent replaces any of them, for you or for anyone you can see.",
    spellslot:"Expert Divination refunds one whenever you cast a divination spell of level 2 or higher, which makes the school close to free.",
    darkvision:"One of The Third Eye's options, alongside seeing invisible creatures and reading any language."
  },
  features:[
    {lvl:"Level 3",name:"Divination Savant",body:"<p>Two free divination spells in your {{spellbook}}, and another at each new {{spellslot}} level.</p>"},
    {lvl:"Level 3",name:"Portent",body:"<p>{{portent}}.</p>"},
    {lvl:"Level 6",name:"Expert Divination",body:"<p>Casting a divination spell of level 2 or higher gives back a lower-level {{spellslot}}.</p>"},
    {lvl:"Level 10",name:"The Third Eye",body:"<p>A {{bonusaction}} grants {{darkvision}}, the ability to see {{invisible}} creatures, or to read any language — until your next rest.</p>"},
    {lvl:"Level 14",name:"Greater Portent",body:"<p>Three {{portent}} dice instead of two.</p>"}
  ]};

ENTRIES["wi-evoker"] = { cls:"wizard", nav:"Evoker", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Wizard school",
  name:"Evoker", tag:"Create explosive elemental effects",
  flavor:"The Wizard who throws the fireball — and, crucially, the one who can throw it into a melee without killing their own party.",
  src:"Player's Handbook 2024, p. 174",
  mods:{
    cantrip:"Potent Cantrip means a missed cantrip still deals half damage, so your at-will attacks stop having bad turns.",
    savingthrow:"Sculpt Spells makes chosen allies succeed automatically against your own evocations, and take no damage at all.",
    spellslot:"Overchannel maximises the damage of a level 1–5 spell — free the first time each long rest, and increasingly painful after that.",
    hitpoints:"Overchannel's repeat uses cost you 2d12 necrotic per spell level, which cannot be reduced."
  },
  features:[
    {lvl:"Level 3",name:"Evocation Savant",body:"<p>Two free evocation spells in your {{spellbook}}, and another at each new {{spellslot}} level.</p>"},
    {lvl:"Level 3",name:"Potent Cantrip",body:"<p>A creature that saves against, or is missed by, your damaging {{cantrip}} still takes half the damage.</p>"},
    {lvl:"Level 6",name:"Sculpt Spells",body:"<p>Choose 1 plus the spell's level in creatures to automatically succeed on their {{savingthrow}} against your evocation — and take nothing.</p>"},
    {lvl:"Level 10",name:"Empowered Evocation",body:"<p>Add your Intelligence modifier to one damage roll of any evocation spell.</p>"},
    {lvl:"Level 14",name:"Overchannel",body:"<p>Maximum damage on a level 1–5 spell. Free once per {{longrest}}; after that it costs you 2d12 necrotic per spell level, and it climbs.</p>"}
  ]};

ENTRIES["wi-illusionist"] = { cls:"wizard", nav:"Illusionist", navSub:"Levels 3 · 6 · 10 · 14", kicker:"Wizard school",
  name:"Illusionist", tag:"Weave subtle deceptions",
  flavor:"The school that rewards imagination more than arithmetic. It ends somewhere genuinely strange: at 14 your illusions stop being illusions for a moment.",
  src:"Player's Handbook 2024, p. 175",
  mods:{
    cantrip:"Improved Illusions upgrades Minor Illusion to make a sound and an image at once, and hands it to you free if you didn't have it.",
    preparedspells:"Phantasmal Creatures makes Summon Beast and Summon Fey permanent fixtures, castable as illusions without a slot at half strength.",
    reaction:"Illusory Self at 10 turns a hit into a miss by leaving an illusion of yourself where you were.",
    spellslot:"Illusory Reality at 14 makes one object in your illusion physically real for a minute — a bridge, a wall, a barricade."
  },
  features:[
    {lvl:"Level 3",name:"Illusion Savant",body:"<p>Two free illusion spells in your {{spellbook}}, and another at each new {{spellslot}} level.</p>"},
    {lvl:"Level 3",name:"Improved Illusions",body:"<p>Illusions cast without words, with 60 feet more range, and Minor Illusion as a free {{cantrip}} producing sound and image together.</p>"},
    {lvl:"Level 6",name:"Phantasmal Creatures",body:"<p>Summon Beast and Summon Fey always {{preparedspells|prepared}}, castable as illusions without a {{spellslot}} at half strength.</p>"},
    {lvl:"Level 10",name:"Illusory Self",body:"<p>A {{reaction}} replaces you with an illusion, turning a hit into a miss.</p>"},
    {lvl:"Level 14",name:"Illusory Reality",body:"<p>Make one object within an illusion you cast physically real for a minute.</p>"}
  ]};

/* ---------------- Inventor ---------------- */
TERMS.greatcreation = {n:"Great creation",s:"inventor",d:"The one thing your specialisation builds — a golem, a cannon, a suit of armour, a cursed artifact. It arrives at level 1 and everything after is an upgrade to it."};
TERMS.upgrade = {n:"Upgrade",s:"inventor",d:"A modification bought at 3rd level and every odd level after, chosen from your specialisation's own list. Upgrades, not levels, are what make two Inventors of the same craft play differently."};
TERMS.toolexpertise = {n:"Tool Expertise",s:"inventor",d:"Double proficiency on anything you do with the tools this class gave you — which is how an Inventor out-crafts everybody without rolling well."};
TERMS.arcaneretrofit = {n:"Arcane Retrofit",s:"inventor",d:"Melt a magic weapon down over a long rest and pour its bonus into something you built. It's how your own invention keeps pace with treasure the party finds."};

CLASSES.inventor = {
  name:"Inventor", src:"homebrew",
  note:"<strong>Ten crafts that play like ten classes.</strong> Each specialisation hands you one great creation at level 1 — a golem, a cannon, powered armour, a cursed artifact — and everything after is an upgrade to it. Read the core page first: Upgrades matter more than levels here.",
  foot:"Source: Kibbles' Compendium of Craft and Creation v1.2.1 (KibblesTasty), Chapter 1 — Inventor, pp. 10–63.",
  groups:[
    {label:"The class itself", keys:["in-core"]},
    {label:"Specialisations", keys:["in-gadgetsmith","in-golemsmith","in-infusionsmith","in-potionsmith","in-thundersmith","in-warsmith","in-fleshsmith","in-cursesmith","in-runesmith","in-relicsmith"]}
  ]
};

ENTRIES["in-core"] = { cls:"inventor", nav:"Core features", navSub:"The class itself", kicker:"Inventor",
  name:"Core Class Features", tag:"Half a caster, and one invention you spend the campaign improving",
  flavor:"To an Inventor, magic is a system waiting to be decoded and then improved on — and spells are too temporary to be interesting when you could build something that lasts. The class is unusual in that your specialisation arrives at level 1 rather than level 3, so you are your craft from the first session.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 10–13", mods:{},
  features:[
    {lvl:"Level 1",name:"Inventor Specialization",body:"<p>Your craft, chosen immediately: Cursesmith, Fleshsmith, Gadgetsmith, Golemsmith, Infusionsmith, Potionsmith, Relicsmith, Runesmith, Thundersmith or Warsmith. It grants features at 1, 3, 5 and 14 — and your {{greatcreation}}.</p>"},
    {lvl:"Level 1",name:"Magic Item Analysis",body:"<p>Detect Magic and Identify, castable as {{ritual|Rituals}} with no components. You are the party's appraiser from the start.</p>"},
    {lvl:"Level 2",name:"Tool Expertise",body:"<p>{{toolexpertise}}.</p>"},
    {lvl:"Level 2",name:"Arcane Retrofit",body:"<p>{{arcaneretrofit}}. You can also convert magical armour down to a lighter type.</p>"},
    {lvl:"Level 2",name:"Spellcasting",body:"<p>Half a caster's progression on Intelligence, from a list aimed at modifying creatures and objects rather than blasting.</p>"},
    {lvl:"Level 3",name:"Specialization Upgrade",body:"<p>Your first {{upgrade}}, with another at every odd level after. This is the main dial on the class.</p>"},
    {lvl:"Level 10",name:"Improved Magical Crafting",body:"<p>Crafting magic items gets faster and cheaper, and your {{greatcreation}} gains recharging properties.</p>"},
    {lvl:"Level 11",name:"Study of Magic",body:"<p>Deeper understanding of how magic items work, extending what you can build and repair.</p>"},
    {lvl:"Level 18",name:"Wondrous Item Mastery",body:"<p>Attune to more magic items than anyone else, and use them more efficiently.</p>"},
    {lvl:"Level 20",name:"Peerless Inventor",body:"<p>The capstone — your Intelligence rises and your inventions reach their final form.</p>"}
  ]};

ENTRIES["in-gadgetsmith"] = { cls:"inventor", nav:"Gadgetsmith", navSub:"Gadgets", kicker:"Inventor specialisation",
  name:"Gadgetsmith", tag:"Quantity is at least as good as quality",
  flavor:"An Inventor whose curiosity ran rampant. Where others perfect one pursuit for a career, a Gadgetsmith carries a dozen half-mad contraptions and is never without another trick. Quick-footed, quicker-witted, and instinctively hostile to anyone suppressing knowledge.",
  src:"Kibbles' Compendium of Craft and Creation, p. 14",
  mods:{
    greatcreation:"Not one thing but many: a belt of gadgets you deploy and swap, so your great creation is really a toolkit that changes shape between fights.",
    upgrade:"The widest upgrade list of the ten, and the one where taking a breadth of small options beats specialising.",
    toolexpertise:"Tinker's tools are yours from level 1, alongside nets, rapiers and whips — an oddly specific weapon set that tells you how this plays."
  },
  features:[
    {lvl:"Level 1",name:"Gadgetsmith's Proficiency",body:"<p>Nets, rapiers, whips and tinker's tools.</p>"},
    {lvl:"Level 1",name:"Gadgets",body:"<p>Your {{greatcreation}} is a collection of contraptions rather than one device — deployed, spent and rebuilt as the situation changes.</p>"},
    {lvl:"Levels 3+",name:"Gadget Upgrades",body:"<p>{{upgrade|Upgrades}} add new gadgets rather than deepening one. Breadth is the point.</p>"}
  ]};

ENTRIES["in-golemsmith"] = { cls:"inventor", nav:"Golemsmith", navSub:"A golem companion", kicker:"Inventor specialisation",
  name:"Golemsmith", tag:"Forge a true work of artifice",
  flavor:"Inventors who commit their life to one construct. Some chase the perfect creation; others simply wanted something loyal that could carry the loot. Rarely chaotic — you do not get this far without discipline.",
  src:"Kibbles' Compendium of Craft and Creation, p. 19",
  mods:{
    greatcreation:"A golem that fights beside you, rebuilt and re-specified as you level. Of the ten crafts this is the one that adds a second body to the battlefield.",
    upgrade:"Upgrades here go into the golem — its frame, its armaments, its resilience — rather than into you.",
    arcaneretrofit:"Particularly good here: pour a found magic weapon's bonus into the golem's fists."
  },
  features:[
    {lvl:"Level 1",name:"Golem",body:"<p>Your {{greatcreation}} is a construct that acts on your command and can be rebuilt between rests.</p>"},
    {lvl:"Levels 3+",name:"Golem Upgrades",body:"<p>{{upgrade|Upgrades}} reshape the golem — heavier plating, better armaments, new movement modes.</p>"}
  ]};

ENTRIES["in-infusionsmith"] = { cls:"inventor", nav:"Infusionsmith", navSub:"Infused gear", kicker:"Inventor specialisation",
  name:"Infusionsmith", tag:"Tinker with magic itself",
  flavor:"The most quintessential Inventor — and the one entitled to call a Wizard an impulsive spellslinger. Infusionsmiths lay magic down hours before using it, or craft enchantments that last. A magical swordsman, a wandslinger, or a bookish sort with a bag of tricks that never runs dry.",
  src:"Kibbles' Compendium of Craft and Creation, p. 23",
  mods:{
    greatcreation:"Infusions placed into gear rather than a single device — so your great creation is distributed across the whole party's equipment.",
    upgrade:"Upgrades add infusion types and slots, which makes this the craft that most rewards planning a day ahead.",
    preparedspells:"Infusions work like a second, slower spell list: chosen in advance, spent later."
  },
  features:[
    {lvl:"Level 1",name:"Infusions",body:"<p>Your {{greatcreation}} is a set of infusions placed into weapons, armour and objects — yours or your allies'.</p>"},
    {lvl:"Levels 3+",name:"Infusion Upgrades",body:"<p>{{upgrade|Upgrades}} add new infusion options and ways to place them.</p>"}
  ]};

ENTRIES["in-potionsmith"] = { cls:"inventor", nav:"Potionsmith", navSub:"Potions and bombs", kicker:"Inventor specialisation",
  name:"Potionsmith", tag:"Alchemy, with explosive results",
  flavor:"Every village has an apothecary grinding roots into something hopeful. A Potionsmith knows the intricate version — mixing, brewing, and direct infusion by ritual — and can produce results in the blink of an eye. Sometimes literally.",
  src:"Kibbles' Compendium of Craft and Creation, p. 27",
  mods:{
    greatcreation:"A stock of potions and bombs, brewed on rests and thrown or drunk during them. The most consumable-driven craft of the ten.",
    upgrade:"Upgrades add recipes, so your list of what you can brew is the real character sheet.",
    hitpoints:"Alone among Inventors, a good chunk of your output is healing the party rather than hurting the enemy."
  },
  features:[
    {lvl:"Level 1",name:"Potions",body:"<p>Your {{greatcreation}} is a brewed stock replenished on rests — healing, buffing and throwing.</p>"},
    {lvl:"Levels 3+",name:"Alchemical Upgrades",body:"<p>{{upgrade|Upgrades}} add recipes and improve potency.</p>"}
  ]};

ENTRIES["in-thundersmith"] = { cls:"inventor", nav:"Thundersmith", navSub:"A thunder cannon", kicker:"Inventor specialisation",
  name:"Thundersmith", tag:"One weapon of unmatched devastation",
  flavor:"Elemental force channelled into a single terrible weapon — spectacular to allies, alarming to everyone else. Each one is unique, and truly understood only by whoever forged it. Some Thundersmiths are coldly analytical about the destruction; others revel in the crash.",
  src:"Kibbles' Compendium of Craft and Creation, p. 32",
  mods:{
    greatcreation:"A cannon, and the most single-minded great creation in the book. Everything you do goes through it.",
    upgrade:"Upgrades tune the weapon — range, blast shape, reload, elemental type — rather than adding new tools.",
    resistance:"Several upgrades let you choose the damage type, which is how a one-weapon build avoids being walled by resistance."
  },
  features:[
    {lvl:"Level 1",name:"Thunder Cannon",body:"<p>Your {{greatcreation}} is a single devastating ranged weapon, unique to you.</p>"},
    {lvl:"Levels 3+",name:"Cannon Upgrades",body:"<p>{{upgrade|Upgrades}} reshape its range, blast and element.</p>"}
  ]};

ENTRIES["in-warsmith"] = { cls:"inventor", nav:"Warsmith", navSub:"Powered armour", kicker:"Inventor specialisation",
  name:"Warsmith", tag:"Make yourself a juggernaut of war",
  flavor:"An Inventor who turned the craft on their own survivability. Warsmiths tend to be lawful — few people build a war machine without a purpose driving them — whether that purpose is justice, terror, or pure innovation.",
  src:"Kibbles' Compendium of Craft and Creation, p. 36",
  mods:{
    greatcreation:"A suit of powered armour, which makes this the one Inventor that stands at the front rather than behind it.",
    armorclass:"The suit is your defence, and it improves with upgrades rather than with treasure.",
    upgrade:"Upgrades bolt weapons and systems onto the suit — a force blast, a shield, flight.",
    arcaneretrofit:"Explicitly called out in the rules: a found magic weapon's bonus can be poured into your Force Blast."
  },
  features:[
    {lvl:"Level 1",name:"Warsuit",body:"<p>Your {{greatcreation}} is powered armour that sets your {{armorclass}} and carries your weapons.</p>"},
    {lvl:"Levels 3+",name:"Suit Upgrades",body:"<p>{{upgrade|Upgrades}} add systems — blasts, shields, movement.</p>"}
  ]};

ENTRIES["in-fleshsmith"] = { cls:"inventor", nav:"Fleshsmith", navSub:"Your own body", kicker:"Inventor specialisation",
  name:"Fleshsmith", tag:"The craft turned inward",
  flavor:"A discomfiting presence in any group — a Fleshsmith looks at you with a lingering gaze that says “how could I improve that?” They seek to understand and correct the limitations of flesh, and tend to find beauty primarily in efficiency.",
  src:"Kibbles' Compendium of Craft and Creation, p. 42",
  mods:{
    greatcreation:"Yourself. There is no device — the modifications go into your own body, which makes this the hardest Inventor to disarm.",
    upgrade:"Upgrades are grafts and alterations, permanent rather than equipped.",
    hitpoints:"Much of the craft goes into simply being harder to kill, which is unusual for an Intelligence class."
  },
  features:[
    {lvl:"Level 1",name:"Fleshcraft",body:"<p>Your {{greatcreation}} is your own body, modified.</p>"},
    {lvl:"Levels 3+",name:"Grafts",body:"<p>{{upgrade|Upgrades}} are permanent alterations — limbs, senses, reinforcement.</p>"}
  ]};

ENTRIES["in-cursesmith"] = { cls:"inventor", nav:"Cursesmith", navSub:"A forbidden artifact", kicker:"Inventor specialisation",
  name:"Cursesmith", tag:"No mistakes, only opportunities",
  flavor:"Power marked by the decisions that bought it. Some Cursesmiths ignore the darkness clinging to their work; some weaponise the side effects deliberately; and some embrace it until they are twisted creations themselves. Not always evil — but the path leans.",
  src:"Kibbles' Compendium of Craft and Creation, p. 48",
  mods:{
    greatcreation:"A Forbidden Artifact that binds and twists — the only great creation with a downside written into it on purpose.",
    restrained:"Grasping Form lets the artifact bind targets, which makes this the most controlling of the ten crafts.",
    upgrade:"Upgrades deepen the curse, and several trade your own safety for effect."
  },
  features:[
    {lvl:"Level 1",name:"Forbidden Artifact",body:"<p>Your {{greatcreation}} is a cursed object whose power comes with consequences you learn to aim.</p>"},
    {lvl:"Level 1",name:"Grasping Form",body:"<p>The artifact twists to bind targets, leaving them {{restrained}}.</p>"},
    {lvl:"Levels 3+",name:"Curse Upgrades",body:"<p>{{upgrade|Upgrades}} widen the curse's reach, often at a price.</p>"}
  ]};

ENTRIES["in-runesmith"] = { cls:"inventor", nav:"Runesmith", navSub:"Runes", kicker:"Inventor specialisation",
  name:"Runesmith", tag:"A specific language of magic",
  flavor:"Powerful runes that hold long-lasting power, drawn from many traditions. A Runesmith might be a knight with runes blazing across their armour, a scholar marking allies' weapons before standing back, or a tattooed mystic wearing the runes on their skin.",
  src:"Kibbles' Compendium of Craft and Creation, p. 54",
  mods:{
    greatcreation:"Runes placed on gear — yours or the party's — and held for as long as you choose to leave them there.",
    upgrade:"Upgrades add rune types, so your repertoire grows the way a spell list would.",
    preparedspells:"Runes are laid down in advance like a prepared list, but they persist rather than being spent."
  },
  features:[
    {lvl:"Level 1",name:"Runes",body:"<p>Your {{greatcreation}} is a set of runes inscribed onto equipment, lasting until you re-inscribe them.</p>"},
    {lvl:"Levels 3+",name:"Rune Upgrades",body:"<p>{{upgrade|Upgrades}} add new runes and ways to carry more at once.</p>"}
  ]};

ENTRIES["in-relicsmith"] = { cls:"inventor", nav:"Relicsmith", navSub:"A holy relic", kicker:"Inventor specialisation",
  name:"Relicsmith", tag:"Holy power in ways that defy arcane logic",
  flavor:"Viewed with skepticism by other Inventors and bolstered by one fact: the inventions work. A blend of methodology and faith, built on scriptures and inscriptions — sometimes inherited, sometimes uncovered in research, sometimes only believed to have been uncovered.",
  src:"Kibbles' Compendium of Craft and Creation, p. 59",
  mods:{
    greatcreation:"A relic — the only Inventor creation powered by faith rather than mechanism, which is exactly what unsettles their peers.",
    upgrade:"Upgrades are rites and blessings placed on the relic.",
    hitpoints:"The most supportive craft of the ten: a Relicsmith heals and shields in a way no other Inventor does."
  },
  features:[
    {lvl:"Level 1",name:"Relic",body:"<p>Your {{greatcreation}} is a holy object of your own making, powered by conviction as much as craft.</p>"},
    {lvl:"Levels 3+",name:"Relic Upgrades",body:"<p>{{upgrade|Upgrades}} add rites, blessings and protective effects.</p>"}
  ]};

/* ---------------- Warden ---------------- */
TERMS.primalinterdiction = {n:"Primal Interdiction",s:"warden",d:"The ground around you becomes difficult terrain for enemies — 5 feet at 2nd, growing to 20 by 17th. You can also throw yourself open to attack to give your allies inside it cover from harm."};
TERMS.endurancedice = {n:"Endurance Dice",s:"warden",d:"A pool spent to reduce damage you take, or added to a saving throw after you roll it but before you know the outcome. Back on a short rest."};
TERMS.mysticbulwark = {n:"Mystic Bulwark",s:"warden",d:"Your armour runs on Wisdom instead of Dexterity, and flatly reduces weapon damage by 2, rising to 6. Damage reduction applies before resistance, which stacks unusually well."};
TERMS.primalmanifestation = {n:"Primal Manifestation",s:"warden",d:"Free-choice powers picked from a shared list at 3rd level and after — separate from your bond, and swappable as you level. Two Wardens of the same bond can still differ a lot."};
TERMS.wardenbond = {n:"Warden Bond",s:"warden",d:"The primal aspect you're bonded to — one of ten, chosen at level 1. It grants features at 1, 3, 7, 14 and 17."};
TERMS.grappled = {n:"Grappled",s:"core",d:"A condition. Speed zero, and you move only where whoever grabbed you goes."};

CLASSES.warden = {
  name:"Warden", src:"homebrew",
  note:"<strong>Two lists again, like the Psion.</strong> Your Bond decides what kind of primal force you are; Manifestations are picked freely from a shared list and swapped as you level. And read Primal Interdiction — it is the feature the whole class is built to protect.",
  foot:"Source: Kibbles' Compendium of Legends and Legacies v1.0.2 (KibblesTasty), Chapter 1 — Warden, pp. 60–83.",
  groups:[
    {label:"The class itself", keys:["wd-core"]},
    {label:"Bonds — what you are", keys:["wd-elemental","wd-beasthide","wd-elderheart","wd-stoneblood","wd-sunwatcher","wd-ironbound","wd-dreadwing","wd-timetwister","wd-astral","wd-bonebinder"]}
  ]
};

ENTRIES["wd-core"] = { cls:"warden", nav:"Core features", navSub:"The class itself", kicker:"Warden",
  name:"Core Class Features", tag:"A d12 defender in a game that rarely rewards defending",
  flavor:"Nature's chosen bulwark. The Warden solves the oldest problem with playing a tank — that enemies can simply walk past you — by making the ground around you refuse to cooperate.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 60–63", mods:{},
  features:[
    {lvl:"Level 1",name:"Warden Bond",body:"<p>{{wardenbond}} — elemental fury, beast ferocity, ancient roots, stone, sunlight, iron, dragon-terror, time, the astral, or bone.</p>"},
    {lvl:"Level 1",name:"Mystic Bulwark",body:"<p>{{mysticbulwark}}.</p>"},
    {lvl:"Level 2",name:"Primal Interdiction",body:"<p>{{primalinterdiction}}.</p>"},
    {lvl:"Level 2",name:"Endurance Dice",body:"<p>{{endurancedice}} — three to start, seven by 17, growing from d8 to d12.</p>"},
    {lvl:"Level 3",name:"Primal Manifestations",body:"<p>Two {{primalmanifestation|Primal Manifestations}}, with more as you level and the option to swap one each time.</p>"},
    {lvl:"Level 3",name:"Warden's Grasp",body:"<p>Replace an {{opportunityattack}} with a grapple check — so anyone trying to leave can be held instead of merely hit.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}, and your {{endurancedice|Endurance Dice}} become d10s.</p>"},
    {lvl:"Level 11",name:"Growing Power",body:"<p>{{endurancedice|Endurance Dice}} become d12s, and {{primalinterdiction}} reaches 15 feet.</p>"},
    {lvl:"Level 17",name:"Full Interdiction",body:"<p>{{primalinterdiction}} reaches 20 feet and your damage reduction peaks at 6.</p>"}
  ]};

ENTRIES["wd-elemental"] = { cls:"warden", nav:"Elemental Soul", navSub:"Fire, ice, lightning", kicker:"Warden bond",
  name:"Elemental Soul", tag:"Shrouded in harsh primal forces",
  flavor:"Wardens who tap the elemental planes and wear the result. They destroy foes with their very presence — the most straightforwardly damaging bond, and the one that turns standing still into an attack.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 64",
  mods:{
    primalinterdiction:"Elemental Soul makes the interdiction hurt as well as hinder, so enemies caught in it are losing hit points for staying near you.",
    mysticbulwark:"Your plating is elemental — icy, molten or crackling depending on what you attuned to.",
    resistance:"The bond hands you it against your chosen element, which is why this is the most reliable Warden against a matching enemy."
  },
  features:[
    {lvl:"Level 1",name:"Elemental Armaments",body:"<p>Your weapons and {{mysticbulwark|armour}} carry your element, adding damage of that type.</p>"},
    {lvl:"Levels 3+",name:"Elemental Fury",body:"<p>Later features widen the element's reach, including through your {{primalinterdiction}}.</p>"}
  ]};

ENTRIES["wd-beasthide"] = { cls:"warden", nav:"Beasthide", navSub:"Primal ferocity", kicker:"Warden bond",
  name:"Beasthide", tag:"Terrible wrath on anyone who touches your people",
  flavor:"The ferocity of beasts, aimed squarely at whoever attacks you or your companions. The highest-damage Warden bond, and the one that most punishes being ignored.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 66",
  mods:{
    primalinterdiction:"Beasthide punishes anyone who attacks an ally inside it, which turns the reckless-defence option from a sacrifice into a trap.",
    reaction:"The bond leans on it heavily — retaliation is the core idea.",
    endurancedice:"Several features let you spend one to strike back rather than only to soak."
  },
  features:[
    {lvl:"Level 1",name:"Beast's Wrath",body:"<p>Attacks on you or your allies invite retaliation, often through a {{reaction}}.</p>"},
    {lvl:"Levels 3+",name:"Primal Ferocity",body:"<p>Later features deepen the counter-attack, spending {{endurancedice}} for damage as well as defence.</p>"}
  ]};

ENTRIES["wd-elderheart"] = { cls:"warden", nav:"Elderheart", navSub:"Vines and roots", kicker:"Warden bond",
  name:"Elderheart", tag:"Vines that lash, bind and drag",
  flavor:"Rooted in the ancient growth of the world. Elderheart Wardens deal relatively little damage and simply wear their enemies down, dragging them toward their place in the cycle of life and death.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 67",
  mods:{
    primalinterdiction:"The most controlling version of it — vines make the area not merely slow but actively hostile to crossing.",
    restrained:"Lashing Vines imposes it, which is what makes this the defensive-control bond rather than a damage one.",
    grappled:"Combines with Warden's Grasp: an Elderheart can hold several creatures in place at once."
  },
  features:[
    {lvl:"Level 1",name:"Lashing Vines",body:"<p>Vines reach out to bind, leaving targets {{restrained}} or {{grappled}}.</p>"},
    {lvl:"Levels 3+",name:"Inexorable Growth",body:"<p>Later features widen the vines' reach and make escaping them harder.</p>"}
  ]};

ENTRIES["wd-stoneblood"] = { cls:"warden", nav:"Stoneblood", navSub:"Earth and stone", kicker:"Warden bond",
  name:"Stoneblood", tag:"An indomitable monolith",
  flavor:"The enduring blood of the world. The most defensive and durable breed of Warden — few things break their defence, and nothing makes them bleed.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 69",
  mods:{
    mysticbulwark:"Stoneblood pushes damage reduction furthest of the ten bonds, which stacks in front of resistance rather than behind it.",
    endurancedice:"The bond gets more out of them defensively than anyone else.",
    prone:"Stone Fists and tremors knock people down, which pairs with an area they already struggle to cross."
  },
  features:[
    {lvl:"Level 1",name:"Stone Fists",body:"<p>Your strikes carry the weight of earth, and can leave targets {{prone}}.</p>"},
    {lvl:"Levels 3+",name:"Unbreakable",body:"<p>Later features deepen your {{mysticbulwark|damage reduction}} and stability.</p>"}
  ]};

ENTRIES["wd-sunwatcher"] = { cls:"warden", nav:"Sunwatcher", navSub:"Radiance", kicker:"Warden bond",
  name:"Sunwatcher", tag:"Burn away what lurks in the dark",
  flavor:"Power from the highest primal authority. The most supportive and the longest-ranged Warden — the one bond that can help allies who aren't standing next to you.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 70",
  mods:{
    primalinterdiction:"Sunwatcher extends support beyond it, which is unusual — most bonds only work inside the circle.",
    hitpoints:"The only Warden bond that meaningfully heals, which changes what the class is for in a party without a healer.",
    darkvision:"Light is the theme throughout, and darkness stops being a problem for the party."
  },
  features:[
    {lvl:"Level 1",name:"Radiant Aspect",body:"<p>Fire and radiance woven to hurt enemies and support allies at range.</p>"},
    {lvl:"Levels 3+",name:"Dawnbringer",body:"<p>Later features restore {{hitpoints}} and empower allies across the field.</p>"}
  ]};

ENTRIES["wd-ironbound"] = { cls:"warden", nav:"Ironbound", navSub:"Forged metal", kicker:"Warden bond",
  name:"Ironbound", tag:"Nature and civilisation, fused",
  flavor:"Wardens who argue that forged metal is as primal as anything that grows — often from mining communities or smithies. Heavy armour and two-handed weapons, which no other Warden gets.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 72",
  mods:{
    mysticbulwark:"Ironbound is the one bond that wears heavy armour, so the Wisdom-based calculation matters less and raw plating matters more.",
    weaponmastery:"Heavy two-handed weapons open options the rest of the class simply can't take.",
    primalinterdiction:"Still the core job — you just do it in plate with a greatsword."
  },
  features:[
    {lvl:"Level 1",name:"Iron Carapace",body:"<p>Plate, spikes and chains — heavy armour and martial weapons alongside your {{mysticbulwark}}.</p>"},
    {lvl:"Levels 3+",name:"Edifice of Iron",body:"<p>Later features harden the carapace and extend its reach.</p>"}
  ]};

ENTRIES["wd-dreadwing"] = { cls:"warden", nav:"Dreadwing", navSub:"Draconic terror", kicker:"Warden bond",
  name:"Dreadwing", tag:"The might and majesty of dragons",
  flavor:"An ancient bond with the primal power inside dragonkind — strength, elemental fury and fear. The bond that makes enemies not want to be near you, rather than merely unable to leave.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 74",
  mods:{
    frightened:"Dreadwing's signature. Fear plus difficult terrain is a nasty combination — they can't approach and they don't want to.",
    primalinterdiction:"Fear makes the area work even on things that could cross it.",
    flyspeed:"Wings arrive later, which is unusual for a class built around holding one spot."
  },
  features:[
    {lvl:"Level 1",name:"Draconic Aspect",body:"<p>Elemental fury and a presence that leaves enemies {{frightened}}.</p>"},
    {lvl:"Levels 3+",name:"Terror of the Skies",body:"<p>Later features add a {{flyspeed}} and widen the fear.</p>"}
  ]};

ENTRIES["wd-timetwister"] = { cls:"warden", nav:"Timetwister", navSub:"Time", kicker:"Warden bond",
  name:"Timetwister", tag:"Speed your allies, slow your enemies",
  flavor:"Drawing on time's unstoppable march and the ebb between past and future. The support-and-control end of the class — allies move like a blur, enemies crawl.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 76",
  mods:{
    speed:"The bond's whole currency. Allies gain it, enemies lose it, and inside your interdiction that difference decides the fight.",
    primalinterdiction:"Slowing enemies who are already crossing difficult terrain compounds — this is the hardest Warden to get past.",
    reaction:"Glimpses of the future give you things to do on other people's turns."
  },
  features:[
    {lvl:"Level 1",name:"Temporal Aspect",body:"<p>Manipulate {{speed}} — hastening allies, dragging enemies.</p>"},
    {lvl:"Levels 3+",name:"Flickers of Time",body:"<p>Later features add {{reaction|reactions}} drawn from glimpsed futures.</p>"}
  ]};

ENTRIES["wd-astral"] = { cls:"warden", nav:"Astral Guardian", navSub:"The infinite planes", kicker:"Warden bond",
  name:"Astral Guardian", tag:"Spatial distortion and celestial energy",
  flavor:"A Warden who transcends the earthly and draws on the infinite planes instead. Trades some of the class's control for damage and utility — including letting allies step across the battlefield.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 77",
  mods:{
    teleport:"The distinguishing trick: your allies can move through space in a way the rest of the class never offers.",
    primalinterdiction:"Weaker here by design — Astral Guardian gives up some control for utility and damage.",
    resistance:"Force and psychic protection sit naturally with the astral theme."
  },
  features:[
    {lvl:"Level 1",name:"Astral Aspect",body:"<p>Celestial energy and spatial distortion, including short {{teleport|teleports}} for allies.</p>"},
    {lvl:"Levels 3+",name:"Infinite Reach",body:"<p>Later features widen the distortion and its damage.</p>"}
  ]};

ENTRIES["wd-bonebinder"] = { cls:"warden", nav:"Bone Binder", navSub:"A bone construct", kicker:"Warden bond",
  name:"Bone Binder", tag:"The remains of life, put to one final service",
  flavor:"Solemn and grim, watching over the final silence at the end of life. Bone Binders bind the remains of the dead into armour, weapons and constructs — the only Warden who brings a companion.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 79",
  mods:{
    primalinterdiction:"Shared with your construct, which effectively gives the party two interdictions to position.",
    mysticbulwark:"Your armour is literally bone, bound and re-bound from what's available.",
    undead:"The grim edge of the class — the bond works with remains in a way some tables will want to discuss first."
  },
  features:[
    {lvl:"Level 1",name:"Bone Binding",body:"<p>Bind remains into your {{mysticbulwark|armour}} and weapons — and into a construct that fights beside you.</p>"},
    {lvl:"Levels 3+",name:"Grim Constructs",body:"<p>Later features strengthen the construct and share your {{primalinterdiction}} with it.</p>"}
  ]};

/* ---------------- Warlord ---------------- */
TERMS.leadershipdice = {n:"Leadership Dice",s:"warlord",d:"The Warlord's whole economy, spent on Rallying Mark, Urgent Orders and Helpful Word. You can spend more per turn as you level, and they refill on a short rest."};
TERMS.battlefieldpresence = {n:"Battlefield Presence",s:"warlord",d:"Give up one of your own attacks to hand a friend an extra one on their turn. Free, every round, from level 1 — and the reason a Warlord's damage shows up on somebody else's sheet."};
TERMS.rallyingmark = {n:"Rallying Mark",s:"warlord",d:"Mark a target; the next ally to damage it adds your Leadership Dice to the damage and heals for the same amount. Damage and healing in one bonus action."};
TERMS.urgentorders = {n:"Urgent Orders",s:"warlord",d:"Spend dice to let an ally move their full speed immediately as a reaction, without provoking, and gain temporary hit points for it."};
TERMS.helpfulword = {n:"Helpful Word",s:"warlord",d:"Spend a die to Help as a bonus action, at range — handing an ally advantage without standing next to them."};
TERMS.warlordpresence = {n:"Presence",s:"warlord",d:"The kind of leader you are, chosen at level 1 — Commander, Chieftain, Noble, Packleader, Paragon, Tactician, Dancer or Dreadlord. Features at 1, 3, 7, 11, 15 and 18."};

CLASSES.warlord = {
  name:"Warlord", src:"homebrew",
  note:"<strong>A force multiplier, not a star.</strong> Battlefield Presence trades your attack for somebody else's, and Leadership Dice buy damage, movement and help for the party. If you'd rather set other people up than take the spotlight, nothing else in either book does this.",
  foot:"Source: Kibbles' Compendium of Legends and Legacies v1.0.2 (KibblesTasty), Chapter 1 — Warlord, pp. 84–97.",
  groups:[
    {label:"The class itself", keys:["wr-core"]},
    {label:"Presences", keys:["wr-commander","wr-chieftain","wr-noble","wr-packleader","wr-paragon","wr-tactician","wr-dancer","wr-dreadlord"]}
  ]
};

ENTRIES["wr-core"] = { cls:"warlord", nav:"Core features", navSub:"The class itself", kicker:"Warlord",
  name:"Core Class Features", tag:"No spell list, and most of your output lands on other people's turns",
  flavor:"Warlords don't control their allies — they polish what those allies can already do and open opportunities for them to shine. One of the easier homebrew classes to pick up, and one of the rarer things to want.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 84–87", mods:{},
  features:[
    {lvl:"Level 1",name:"Warlord Specialization",body:"<p>Your {{warlordpresence}}.</p>"},
    {lvl:"Level 1",name:"Battlefield Presence",body:"<p>{{battlefieldpresence}}.</p>"},
    {lvl:"Level 2",name:"Leadership Dice",body:"<p>{{leadershipdice}} — one spendable per turn at first, two at 6, three at 11, four at 17.</p>"},
    {lvl:"Level 2",name:"Rallying Mark",body:"<p>{{rallyingmark}} — a {{bonusaction}} marking a target within 60 feet.</p>"},
    {lvl:"Level 2",name:"Urgent Orders",body:"<p>{{urgentorders}} — up to 30 feet of free movement plus {{temporaryhp}}, on an ally's {{reaction}}.</p>"},
    {lvl:"Level 2",name:"Helpful Word",body:"<p>{{helpfulword}}.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}} — which also means two chances to convert an attack into {{battlefieldpresence|somebody else's}}.</p>"}
  ]};

ENTRIES["wr-commander"] = { cls:"warlord", nav:"Commander's Presence", navSub:"Wisdom · support and tank", kicker:"Warlord presence",
  name:"Commander's Presence", tag:"A steady hand and a steadier head",
  flavor:"The iconic Warlord — a veteran whose leadership comes from calm rather than charisma. Leans toward keeping people alive and in the fight.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 87",
  mods:{
    rallyingmark:"Press the Attack doubles its healing: when one ally heals from the mark, a reaction and another die heal a second ally the same amount.",
    reaction:"Commander is the presence that acts most often outside its own turn.",
    hitpoints:"More of your Leadership Dice end up as healing here than in any other presence.",
    leadershipdice:"Spent defensively — this is the presence that treats them as a healing pool as much as a damage one."
  },
  features:[
    {lvl:"Level 1",name:"Steady Command",body:"<p>Wisdom-based leadership aimed at keeping the line intact.</p>"},
    {lvl:"Level 3",name:"Press the Attack",body:"<p>When a creature heals from {{rallyingmark|Rallying Mark}}, spend a {{reaction}} and a {{leadershipdice|Leadership Die}} to heal another creature within 60 feet the same amount.</p>"}
  ]};

ENTRIES["wr-chieftain"] = { cls:"warlord", nav:"Chieftain's Presence", navSub:"Physical · damage", kicker:"Warlord presence",
  name:"Chieftain's Presence", tag:"Rule by force of personality",
  flavor:"A booming voice and a fearless attitude — it is easy to believe your band is infallible while the chieftain is standing. The Warlord that joins the fray rather than directing it.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 88",
  mods:{
    battlefieldpresence:"Chieftain is the presence least keen to give up its own attacks, because it hits hardest of the eight.",
    leadershipdice:"Spent on war cries that trade defence for damage — yours and your allies'.",
    armorclass:"Several features knowingly lower it in exchange for offence, which is the presence's whole bargain."
  },
  features:[
    {lvl:"Level 1",name:"War Cry",body:"<p>Aggressive shouts that trade defence for damage, for you and your allies.</p>"},
    {lvl:"Level 3",name:"Into the Fray",body:"<p>Later features reward fighting alongside the people you're leading.</p>"}
  ]};

ENTRIES["wr-noble"] = { cls:"warlord", nav:"Noble's Presence", navSub:"Charisma · inspiration", kicker:"Warlord presence",
  name:"Noble's Presence", tag:"A shining beacon of what you're fighting for",
  flavor:"Not necessarily born noble, though many are. People have always fought twice as hard when their leader takes the field beside them — this presence turns that into a mechanic.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 90",
  mods:{
    leadershipdice:"Noble gets the most out of them per die, because the presence scales what allies do rather than what you do.",
    abilitycheck:"Charisma does double duty here — your leadership stat is also your social stat.",
    battlefieldpresence:"Handing attacks away costs you least here, since your own attacks were never the point."
  },
  features:[
    {lvl:"Level 1",name:"Beacon",body:"<p>Charisma-driven inspiration that lifts everyone who can see you.</p>"},
    {lvl:"Level 3",name:"Retainers",body:"<p>Later features drive your companions to greater heights the longer you stand with them.</p>"}
  ]};

ENTRIES["wr-packleader"] = { cls:"warlord", nav:"Packleader's Presence", navSub:"Cunning · ambush", kicker:"Warlord presence",
  name:"Packleader's Presence", tag:"Win the fight before it becomes a battle",
  flavor:"Scouting, preparing, stacking the odds. Packleaders don't fight fair — they fight to win, and try only to fight when they've already won.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 91",
  mods:{
    initiative:"Packleader is built around acting first and setting the terms, so initiative matters more here than for any other presence.",
    advantage:"Preparation converts into it before the fight starts, rather than being bought with dice during it.",
    leadershipdice:"Some are effectively spent in advance, which makes this the presence that rewards planning."
  },
  features:[
    {lvl:"Level 1",name:"Stack the Odds",body:"<p>Scouting and preparation convert into {{advantage}} before the fighting starts.</p>"},
    {lvl:"Level 3",name:"Twist the Field",body:"<p>Later features extend your control to the ground itself, not just the people on it.</p>"}
  ]};

ENTRIES["wr-paragon"] = { cls:"warlord", nav:"Paragon's Presence", navSub:"Valour · front line", kicker:"Warlord presence",
  name:"Paragon's Presence", tag:"An army behind their Paragon is an unstoppable legion",
  flavor:"The warrior who fights at the front of the legion, and the valour that gives everyone behind them. Not inherently good — an evil legion can be led just as effectively.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 92",
  mods:{
    battlefieldpresence:"Paragon wants to be seen fighting, so it finds ways to lead and attack in the same turn rather than choosing.",
    frightened:"Standing at the front means resisting fear as much as causing it — the presence shores up the party's nerve.",
    leadershipdice:"Spent where you are, so positioning matters more here than range."
  },
  features:[
    {lvl:"Level 1",name:"Dauntless",body:"<p>Leading from the front, with the party's courage tied to your standing there.</p>"},
    {lvl:"Level 3",name:"Legion",body:"<p>Later features grow what the people behind you can do while you hold the line.</p>"}
  ]};

ENTRIES["wr-tactician"] = { cls:"warlord", nav:"Tactician's Presence", navSub:"Intellect · control", kicker:"Warlord presence",
  name:"Tactician's Presence", tag:"Win the fight before reaching it",
  flavor:"A Tactician would rather not be close enough to count as a combatant — but underestimating them once they are on the field is a mistake. Plans laid in advance, and a sharp mind for taking apart whatever arrives instead.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 94",
  mods:{
    leadershipdice:"Tactician squeezes the most control out of them — repositioning and denying rather than adding damage.",
    urgentorders:"The presence that leans hardest on it, because moving the right ally at the right moment is the whole game.",
    reaction:"Plans made in advance cash out as reactions during the fight."
  },
  features:[
    {lvl:"Level 1",name:"Read the Field",body:"<p>Intelligence-driven command that turns observation into orders.</p>"},
    {lvl:"Level 3",name:"Contingencies",body:"<p>Later features let plans laid before the fight resolve during it.</p>"}
  ]};

ENTRIES["wr-dancer"] = { cls:"warlord", nav:"Dancer's Presence", navSub:"Dodge · tank and support", kicker:"Warlord presence",
  name:"Dancer's Presence", tag:"Wind through death and destruction with elegance",
  flavor:"Prancing jesters or graceful enchanters — supernaturally captivating either way. The one presence built around the Dodge action, which turns a defensive turn into a productive one.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 95",
  mods:{
    bonusaction:"Dodging grants you extra bonus actions, which is how a defensive turn still produces leadership.",
    battlefieldpresence:"Dancer converts safety into output — hard to hit, and still handing out attacks.",
    armorclass:"Being difficult to hit is the engine, not a side effect.",
    leadershipdice:"Spent while dodging, which no other presence manages."
  },
  features:[
    {lvl:"Level 1",name:"The Dance",body:"<p>Taking the Dodge action grants special {{bonusaction|bonus actions}}, so defending and leading happen together.</p>"},
    {lvl:"Level 3",name:"Captivating",body:"<p>Later features draw enemy attention onto you while you remain hard to hit.</p>"}
  ]};

ENTRIES["wr-dreadlord"] = { cls:"warlord", nav:"Dreadlord's Presence", navSub:"Fear · control", kicker:"Warlord presence",
  name:"Dreadlord's Presence", tag:"Undermine and terrify instead of inspiring",
  flavor:"The inversion of the class. Where other Warlords lift their allies, a Dreadlord weaponises presence against the enemy — crushing their will to fight and leaving them easy prey.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 96",
  mods:{
    frightened:"The presence's entire output. A Dreadlord spends Leadership Dice on fear where others spend them on damage or healing.",
    leadershipdice:"Aimed at enemies rather than allies, which makes this the only presence whose dice never touch your own party.",
    battlefieldpresence:"Still available — you can terrify and still hand out an attack — but it's no longer the main plan."
  },
  features:[
    {lvl:"Level 1",name:"Terror",body:"<p>Presence turned outward, leaving enemies {{frightened}}.</p>"},
    {lvl:"Level 3",name:"Crush the Will",body:"<p>Later features deepen the fear and punish those who fail to shake it.</p>"}
  ]};

/* ---------------- Spellblade ---------------- */
TERMS.spellstrike = {n:"Spellstrike",s:"spellblade",d:"Cast a spell as a bonus action into your weapon instead of releasing it, then deliver it with your next melee hit. Attack-roll spells ride on the weapon's roll; save spells land as if the target failed."};
TERMS.arcanesurge = {n:"Arcane Surge",s:"spellblade",d:"A pool spent once per turn to fuel the technique's signature tricks. It's the resource that separates one Spellblade from another as much as the technique itself."};
TERMS.technique = {n:"Technique",s:"spellblade",d:"Your subclass, chosen at level 1 — nine of them, each a different loadout and approach to delivering Spellstrike."};

CLASSES.spellblade = {
  name:"Spellblade", src:"homebrew",
  note:"<strong>One idea, executed nine ways.</strong> Spellstrike is the class: cast into the weapon, deliver on the hit. Every technique is a different answer to the question of how you get that weapon where it needs to be — teleport, bow, fist, floating sword.",
  foot:"Source: Kibbles' Compendium of Legends and Legacies v1.0.2 (KibblesTasty), Chapter 1 — Spellblade, pp. 42–59.",
  groups:[
    {label:"The class itself", keys:["sb-core"]},
    {label:"Techniques", keys:["sb-battlemage","sb-aetherblade","sb-guardian","sb-swiftblade","sb-magehunter","sb-spellshot","sb-rimeblade","sb-flyingsword","sb-spellfist"]}
  ]
};

ENTRIES["sb-core"] = { cls:"spellblade", nav:"Core features", navSub:"The class itself", kicker:"Spellblade",
  name:"Core Class Features", tag:"Magic and steel, with the seam removed",
  flavor:"The fusion of martial and magical combat made singular. Highly mobile, full of teleports, and built so that casting a spell and swinging a weapon are the same action rather than competing ones.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 42–46", mods:{},
  features:[
    {lvl:"Level 1",name:"Technique",body:"<p>Your {{technique}}, chosen immediately rather than at 3rd.</p>"},
    {lvl:"Level 1",name:"Arcane Surge",body:"<p>{{arcanesurge}}.</p>"},
    {lvl:"Level 2",name:"Spellstrike",body:"<p>{{spellstrike}}. The spell fizzles if you cast anything else before attacking, so the sequencing is the skill.</p>"},
    {lvl:"Level 2",name:"Spellcasting",body:"<p>Half a caster's progression on Intelligence, from the Spellblade list.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}} — which means a Spellstrike and an ordinary swing in the same action.</p>"},
    {lvl:"Level 9",name:"Spellblade Aegis",body:"<p>A defensive ward layered over your casting, so committing to a Spellstrike stops being a risk.</p>"}
  ]};

ENTRIES["sb-battlemage"] = { cls:"spellblade", nav:"Battlemage", navSub:"Balanced striker", kicker:"Spellblade technique",
  name:"Battlemage", tag:"The perfect synthesis of might and magic",
  flavor:"The iconic Spellblade and the paragon of balance — prepared for every eventuality, strong at neither extreme and weak at none. If you aren't sure which technique you want, this is the one that answers every question adequately.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 47",
  mods:{
    spellstrike:"Battlemage keeps it general — a wide spell selection rather than a narrow one aimed at a single trick.",
    preparedspells:"The broadest list of the nine, which is what adaptability means here.",
    arcanesurge:"Spent flexibly rather than on one signature effect."
  },
  features:[
    {lvl:"Level 1",name:"Battle Magic",body:"<p>A balanced selection of classic spells and a technique that doesn't specialise.</p>"},
    {lvl:"Levels 3+",name:"Adaptability",body:"<p>Later features widen what a {{spellstrike}} can carry.</p>"}
  ]};

ENTRIES["sb-aetherblade"] = { cls:"spellblade", nav:"Aether Blade", navSub:"Force damage", kicker:"Spellblade technique",
  name:"Aether Blade", tag:"A weapon of pure arcane power",
  flavor:"Conjure a blade of scintillating energy and scythe through the field with it. The most focused striker of the nine — almost everything revolves around the blade you made.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 48",
  mods:{
    spellstrike:"Delivered through a conjured blade rather than a carried one, so nothing can disarm you.",
    arcanesurge:"Spent on the blade's force damage, which few things resist.",
    greatcreation:"Conceptually close to an Inventor's — one made object that everything else upgrades."
  },
  features:[
    {lvl:"Level 1",name:"Aether Blade",body:"<p>A conjured weapon dealing force damage, and the vehicle for your {{spellstrike}}.</p>"},
    {lvl:"Levels 3+",name:"Scything Power",body:"<p>Later features sharpen the blade and widen its reach.</p>"}
  ]};

ENTRIES["sb-guardian"] = { cls:"spellblade", nav:"Guardian", navSub:"Defender", kicker:"Spellblade technique",
  name:"Guardian", tag:"A highly mobile line of defence",
  flavor:"Abjuration and self-enhancement, leaning physical. Guardians stand at the front and give up some striking power for the ability to keep other people upright.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 49",
  mods:{
    spellstrike:"Less central here — Guardian trades some of the class's offence for protection.",
    armorclass:"Heavy armour and shields, alone among the nine techniques.",
    arcanesurge:"Spent on wards and damage reduction for allies rather than on your own damage.",
    reaction:"Defending other people means acting on their turns."
  },
  features:[
    {lvl:"Level 1",name:"Arcane Bulwark",body:"<p>Heavy armour, shields, and abjuration magic shared with your allies.</p>"},
    {lvl:"Levels 3+",name:"Shielding Magic",body:"<p>Later features distribute defences and spend {{arcanesurge}} to absorb damage.</p>"}
  ]};

ENTRIES["sb-swiftblade"] = { cls:"spellblade", nav:"Swiftblade", navSub:"Dual wielding", kicker:"Spellblade technique",
  name:"Swiftblade", tag:"Strike from the shadows, withdraw just as fast",
  flavor:"The quickest and deadliest of the nine — a dual-wielding specialist who rains attacks and leaves before the reply. Take this if you want as much damage on one target as possible.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 50",
  mods:{
    spellstrike:"Used as a burst: the flurry sets up one enormous delivered spell rather than spreading damage around.",
    speed:"Mobility is half the technique — arriving and leaving are both part of the turn.",
    arcanesurge:"Spent on extra attacks and movement rather than on spell power.",
    opportunityattack:"Withdrawing cleanly is built in, so leaving costs you nothing."
  },
  features:[
    {lvl:"Level 1",name:"Twin Blades",body:"<p>Dual-wielding built around a flurry that sets up one delivered {{spellstrike}}.</p>"},
    {lvl:"Levels 3+",name:"In and Out",body:"<p>Later features add {{speed}} and safer disengages.</p>"}
  ]};

ENTRIES["sb-magehunter"] = { cls:"spellblade", nav:"Mage Hunter", navSub:"Anti-caster", kicker:"Spellblade technique",
  name:"Mage Hunter", tag:"Any wizard's worst nightmare",
  flavor:"Spellblades who honed their magic to counter other people's. Fighting fire with fire, binding and denying — and fully equipped to bring justice to people used to teleporting away from it.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 51",
  mods:{
    spellstrike:"Aimed at interrupting rather than damaging — a delivered spell that stops the target casting is worth more than one that hurts.",
    teleport:"The technique specifically shuts down enemy escapes, which is unusual and very specific.",
    concentration:"Breaking other people's is a core job here.",
    savingthrow:"Mage Hunter gets resistance to spells as well as tools for denying them."
  },
  features:[
    {lvl:"Level 1",name:"Hunter of Mages",body:"<p>Tools for resisting magic and stopping casters mid-spell.</p>"},
    {lvl:"Levels 3+",name:"Binding",body:"<p>Later features deny {{teleport|teleports}} and break {{concentration}}.</p>"}
  ]};

ENTRIES["sb-spellshot"] = { cls:"spellblade", nav:"Spellshot", navSub:"Ranged", kicker:"Spellblade technique",
  name:"Spellshot", tag:"Spellstriking from a safe distance",
  flavor:"Arcane archers and magical gunslingers, united in wanting to sling spells from range by infusing them into ammunition. Enormous freedom of movement, always out of reach.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 52",
  mods:{
    spellstrike:"Delivered through ammunition rather than a melee hit — the single biggest change any technique makes to the core feature.",
    speed:"Staying out of reach is the technique's defence, so positioning replaces armour.",
    arcanesurge:"Spent on shots and repositioning."
  },
  features:[
    {lvl:"Level 1",name:"Infused Ammunition",body:"<p>{{spellstrike}} delivered at range through arrows or shot.</p>"},
    {lvl:"Levels 3+",name:"Perfect Position",body:"<p>Later features improve range and keep you out of reach.</p>"}
  ]};

ENTRIES["sb-rimeblade"] = { cls:"spellblade", nav:"Rimeblade", navSub:"Frost and control", kicker:"Spellblade technique",
  name:"Rimeblade", tag:"The cold precision of an icicle's edge",
  flavor:"Blurring the arcane and the arctic. Your enemies find no warmth and no respite — and because frost slows as well as hurts, this is the most controlling of the nine.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 53",
  mods:{
    spellstrike:"Carries cold, and cold does more than damage here — delivered spells slow and hold.",
    speed:"Reducing the enemy's is the technique's signature, which no other Spellblade does.",
    restrained:"Ice can hold targets outright at higher levels.",
    resistance:"Cold resistance is common, which is the technique's one real weakness."
  },
  features:[
    {lvl:"Level 1",name:"Rime",body:"<p>Cold woven into your blade, slowing what it touches.</p>"},
    {lvl:"Levels 3+",name:"Deep Freeze",body:"<p>Later features hold targets fast and spread the frost.</p>"}
  ]};

ENTRIES["sb-flyingsword"] = { cls:"spellblade", nav:"Flying Sword", navSub:"A floating weapon", kicker:"Spellblade technique",
  name:"Flying Sword", tag:"A blade that fights without your hand on it",
  flavor:"Infuse a weapon over a long rest and it floats beside you, striking out on its own as part of your Attack action. The strangest delivery method in the class — and the one that lets you keep your hands free.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 54",
  mods:{
    spellstrike:"Delivered by a weapon you aren't holding, which changes where you can stand while doing it.",
    greatcreation:"The sword is made on a long rest and carried, stowed or readied — closer to an Inventor's creation than a spell.",
    arcanesurge:"Spent on additional swords and commands."
  },
  features:[
    {lvl:"Level 3",name:"Flying Sword",body:"<p>Infuse a melee weapon on a {{longrest}}; readied, it floats beside you and attacks as part of your Attack action.</p>"},
    {lvl:"Levels 5+",name:"Swarm of Blades",body:"<p>Later features add more swords and better control of them.</p>"}
  ]};

ENTRIES["sb-spellfist"] = { cls:"spellblade", nav:"Spellfist", navSub:"Unarmed and grappling", kicker:"Spellblade technique",
  name:"Spellfist", tag:"Punch someone with a fireball",
  flavor:"The Spellblade that threw away the blade. Point-blank blasts and grappling, with a grip that is both hard to escape and actively lethal.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 56",
  mods:{
    spellstrike:"Delivered by an unarmed strike, which means you can do it while holding somebody.",
    unarmedstrike:"Your weapon. No sword to drop or disarm.",
    grappled:"Grappling is the technique's control mechanism, and a held target is easier to keep spellstriking.",
    arcanesurge:"Spent on point-blank blasts and tightening your grip."
  },
  features:[
    {lvl:"Level 1",name:"Arcane Fists",body:"<p>{{unarmedstrike|Unarmed strikes}} that carry your {{spellstrike}}, and a grip that hurts.</p>"},
    {lvl:"Levels 3+",name:"Crushing Grip",body:"<p>Later features make {{grappled}} targets harder to escape and more dangerous to be.</p>"}
  ]};

/* ---------------- Occultist ---------------- */
TERMS.occulttradition = {n:"Tradition",s:"occultist",d:"Your branch of forgotten magic, chosen at level 1 — witch, hedge mage, oracle, shaman, spiritualist or voidwatcher. They differ enough that several were full classes in older editions."};
TERMS.occultrite = {n:"Occult Rite",s:"occultist",d:"Free-choice abilities picked from a shared class list plus your tradition's own, and swappable as you level. Two Occultists of the same tradition can still look nothing alike."};
TERMS.coven = {n:"Coven",s:"occultist",d:"A Witch's sub-choice — Black for debilitation, Green for illusion, White for binding and healing. All three are control and support with a different twist."};
TERMS.familiar = {n:"Familiar",s:"core",d:"A small bound creature that scouts, delivers spells and acts on your turn. The Occultist's is unusually capable and genuinely intelligent."};

CLASSES.occultist = {
  name:"Occultist", src:"homebrew",
  note:"<strong>Six traditions and a shared pool of rites.</strong> Pick the tradition first — it decides almost everything — then rites from both your tradition's list and the class list. A full caster with a very large spell list, usually shifting the shape of a fight rather than ending it.",
  foot:"Source: Kibbles' Compendium of Legends and Legacies v1.0.2 (KibblesTasty), Chapter 1 — Occultist, pp. 12–41.",
  groups:[
    {label:"The class itself", keys:["oc-core"]},
    {label:"Traditions", keys:["oc-witch","oc-hedgemage","oc-oracle","oc-shaman","oc-spiritualist","oc-voidwatcher"]}
  ]
};

ENTRIES["oc-core"] = { cls:"occultist", nav:"Core features", navSub:"The class itself", kicker:"Occultist",
  name:"Core Class Features", tag:"The branches of magic that fell out of fashion",
  flavor:"A collection of esoteric traditions — witches, shamans, oracles, hedge mages — gathered into one full-casting class on Wisdom. Control and support by default, though the tradition can push it almost anywhere.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 12–15", mods:{},
  features:[
    {lvl:"Level 1",name:"Occult Tradition",body:"<p>{{occulttradition}}.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>A full caster on Wisdom, with one of the largest spell lists in either book.</p>"},
    {lvl:"Level 2",name:"Occult Rites",body:"<p>{{occultrite|Occult Rites}}, picked from your tradition's list and the class list together, and swappable as you level.</p>"},
    {lvl:"Level 10",name:"Traditional Expertise",body:"<p>{{expertise}} in a skill, from passed-down knowledge.</p>"}
  ]};

ENTRIES["oc-witch"] = { cls:"occultist", nav:"Tradition of the Witch", navSub:"Covens and hexes", kicker:"Occultist tradition",
  name:"Tradition of the Witch", tag:"The iconic Occultist",
  flavor:"Most often the person villagers find scary and weird — and at the heart of the stories, a sliver of truth. Some live openly; some are the last person anyone would suspect. Defined by utilitarian magic, hexes that make crossing them unwise, and a genuinely clever familiar.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 15",
  mods:{
    occultrite:"The Witch's own rite list is the classic-witch material — flying brooms, potion brewing, floppy hats — alongside the control options.",
    coven:"A second choice on top of the tradition: {{coven|Black, Green or White}}, each a different flavour of control.",
    familiar:"Enhanced well past the usual, and central rather than decorative."
  },
  features:[
    {lvl:"Level 1",name:"Witch's Magic",body:"<p>Curses, hexes and a {{familiar}} that is genuinely useful.</p>"},
    {lvl:"Level 1",name:"Coven",body:"<p>{{coven}} — Black specialises in debilitation, Green in illusion, White in binding and healing.</p>"},
    {lvl:"Levels 3+",name:"Witch's Rites",body:"<p>Tradition-specific {{occultrite|rites}} on top of the class list.</p>"}
  ]};

ENTRIES["oc-hedgemage"] = { cls:"occultist", nav:"Tradition of the Hedge Mage", navSub:"Improvised magic", kicker:"Occultist tradition",
  name:"Tradition of the Hedge Mage", tag:"The tradition older than the traditions",
  flavor:"A loose collection of magic users who worked it out as they went, borrowing from everywhere. Frowned on by more studied routes, and undeniably practical — they excel at cantrips and simple magic, and at stealing bits of other people's traditions.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 21",
  mods:{
    cantrip:"Hedge Mage is built to make small, endlessly repeatable magic worth casting — the only tradition where cantrips are a plan rather than a fallback.",
    occultrite:"Rites here borrow from other traditions and other classes, which is the tradition's whole identity.",
    preparedspells:"Twisting how a known spell works matters more here than knowing more of them."
  },
  features:[
    {lvl:"Level 1",name:"Patchwork Magic",body:"<p>Unconventional uses of ordinary magic, and unusual strength with {{cantrip|cantrips}}.</p>"},
    {lvl:"Levels 3+",name:"Borrowed Tricks",body:"<p>{{occultrite|Rites}} that steal from other traditions and classes.</p>"}
  ]};

ENTRIES["oc-oracle"] = { cls:"occultist", nav:"Tradition of the Oracle", navSub:"Fate and revelations", kicker:"Occultist tradition",
  name:"Tradition of the Oracle", tag:"A piece of divine mystery, carried whether you wanted it or not",
  flavor:"Power from a connection to fate rather than service to a god. Oracles gain their abilities in thematic clusters — life or death, light or darkness, fire or nature — and understand more of the mystery with each revelation.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 24",
  mods:{
    occulttradition:"The most configurable of the six: delve fire and you're a blaster, delve war and you're a hybrid, delve life and you're the party's healer.",
    occultrite:"Revelations and rites together mean two axes of choice, so no two Oracles converge.",
    d20test:"Foresight features let you nudge rolls, which is the thread running through every mystery."
  },
  features:[
    {lvl:"Level 1",name:"Mystery",body:"<p>Your aspect of fate, which shapes what the rest of the tradition gives you.</p>"},
    {lvl:"Levels 3+",name:"Revelations",body:"<p>Clusters of power unlocked as you understand the mystery, stacked with foresight.</p>"}
  ]};

ENTRIES["oc-shaman"] = { cls:"occultist", nav:"Tradition of the Shaman", navSub:"Spirits and striking", kicker:"Occultist tradition",
  name:"Tradition of the Shaman", tag:"Bind spirits, and stand in the thick of it",
  flavor:"Occultists who walk the paths of the spirits and bind them to their cause. Tough and powerful, usually found wreathed in primal power in the middle of the fight — the most damage-focused of the six.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 29",
  mods:{
    occulttradition:"The only tradition that wants to be in melee, and it can be built as a melee striker, a ranged striker or a blaster depending on your attributes.",
    occultrite:"Shaman rites empower you rather than debilitate others — the inverse of the rest of the class.",
    resistance:"Spirit-wreathing gives the durability a front-line caster needs."
  },
  features:[
    {lvl:"Level 1",name:"Spirit Binding",body:"<p>Elemental and ancestral spirits bound to empower you.</p>"},
    {lvl:"Levels 3+",name:"Primal Wreath",body:"<p>{{occultrite|Rites}} that deepen the spirits' presence and your durability.</p>"}
  ]};

ENTRIES["oc-spiritualist"] = { cls:"occultist", nav:"Tradition of the Spiritualist", navSub:"Totems and hexes", kicker:"Occultist tradition",
  name:"Tradition of the Spiritualist", tag:"Subtle, pervasive, and hard to point at",
  flavor:"The most esoteric of the six. Spiritualists call forth totems and lay down hexes that inexorably shift the balance of a fight without ever looking like they did much. Mysterious and often reclusive.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 32",
  mods:{
    occulttradition:"Support and control by nature — a range of small effects that compound rather than one big one.",
    occultrite:"Totems and hexes are mostly bought here, so your rite choices are the subclass.",
    concentration:"Totems sit on the field rather than needing you to hold them, which frees your concentration for something else."
  },
  features:[
    {lvl:"Level 1",name:"Totems and Hexes",body:"<p>Placed effects that strengthen allies or debilitate enemies over time.</p>"},
    {lvl:"Levels 3+",name:"Whispers from Beyond",body:"<p>{{occultrite|Rites}} that widen what your totems and hexes can do.</p>"}
  ]};

ENTRIES["oc-voidwatcher"] = { cls:"occultist", nav:"Tradition of the Voidwatcher", navSub:"What you saw out there", kicker:"Occultist tradition",
  name:"Tradition of the Voidwatcher", tag:"A fallen Oracle, altered by one event",
  flavor:"Those who gazed into an infinite void and glimpsed something of unlimited power. A fragment stays embedded in their eyes and branded on their mind. Some are driven entirely insane — or, more troublingly, entirely sane.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 35",
  mods:{
    occulttradition:"Defined by your Conclusion — Annihilation, Madness or Tranquility — which is how you reacted to what you saw, and decides your whole role.",
    occultrite:"Void rites lean on psychic damage and on unsettling the people you use them against.",
    frightened:"Common currency here, since a Voidwatcher's power is partly the horror of what they carry."
  },
  features:[
    {lvl:"Level 1",name:"Conclusion",body:"<p>Annihilation, Madness or Tranquility — your response to the void, and the shape of your power.</p>"},
    {lvl:"Levels 3+",name:"Void Rites",body:"<p>{{occultrite|Rites}} drawn from what lies beyond.</p>"}
  ]};

/* ---------------- Retia: shared terms ---------------- */
TERMS.pactspellslots = {n:"Pact spell slots",s:"retia",d:"Retia's version of Warlock casting: few slots, all at the same level, all back on a short rest — but paired with a prepared list rather than a fixed one."};
TERMS.focuspointsretia = {n:"Focus points",s:"retia",d:"The Sword Saint's pool of concentration, spent on focus techniques. No spell list to prepare, which makes it the most approachable Retia class."};
TERMS.focustechnique = {n:"Focus technique",s:"retia",d:"A named manoeuvre bought with focus points — summoning elemental energy, conjuring tools or poisons, or landing a superhuman strike. Each ancient Sword Saint passed down their own."};
TERMS.favordie = {n:"Favor Die",s:"retia",d:"The revised Ranger's core die, added to rolls tied to your quarry and your training. Its size and your Favor Bonus grow with level."};
TERMS.epithet = {n:"Epithet",s:"retia",d:"A flower emblem that appears when the world appraises a Petal Knight's soul — an honest picture of who they are, which then decides what powers they can reach."};
TERMS.inscriptionmark = {n:"Inscription mark",s:"retia",d:"The Inscriptor's written sigils. Many of the class's best options require a certain number of marks rather than a level."};
TERMS.narrativetwist = {n:"Narrative twist",s:"retia",d:"A resource spent to bend a scene the way a story would — an escape, a sudden second casting, a convenient turn of events."};
TERMS.divinemantle = {n:"Divine Mantle",s:"retia",d:"The Favored Soul's subclass, called a Burden — one per god of Somnus Domina. It decides what the fragment of divinity inside you actually does."};

/* ---------------- Sword Saint ---------------- */
CLASSES.swordsaint = {
  name:"Sword Saint", src:"homebrew",
  note:"<strong>The gentlest homebrew class here.</strong> No spell list at all — one pool of focus points, spent on techniques passed down by the legendary swordsmen you're emulating. Fourteen Paths of Devotion, each modelled on a different ancient master. Subclass pages here list the level-by-level progression and what each one changes, and cite the book for the full feature text.",
  foot:"Source: Lyre's Guide to Retia — Land of Industry (Logan Laidlaw / Nat19), Ch. 8, pp. 413–429.",
  groups:[
    {label:"The class itself", keys:["ss-core"]},
    {label:"Paths of Devotion", keys:["ss-kyuubi","ss-bluemetal","ss-dragonfly","ss-kojiro","ss-muramasa","ss-musashi","ss-pendragon","ss-tomoe","ss-snowwhite","ss-freezingsoul","ss-erodedlord","ss-heavenbreaker","ss-deep","ss-brokenchain","ss-gadabout"]}
  ]
};

ENTRIES["ss-core"] = { cls:"swordsaint", nav:"Core features", navSub:"The class itself", kicker:"Sword Saint",
  name:"Core Class Features", tag:"Walking a road someone already walked, on purpose",
  flavor:"The true Sword Saints went past mastery into legend. You are deliberately emulating one — a 'phantom saint' — until you come into your own. The book is firm that a Sword Saint never embellishes: the stories told about you afterwards must be earned.",
  src:"Lyre's Guide to Retia, pp. 413–416", mods:{},
  features:[
    {lvl:"Level 1",name:"Focus Channeling",body:"<p>{{focuspointsretia}}, spent on {{focustechnique|focus techniques}}.</p>"},
    {lvl:"Level 2",name:"Dragon Surge",body:"<p>A burst of spiritual energy that fuels your heaviest techniques.</p>"},
    {lvl:"Level 3",name:"Path of Devotion",body:"<p>The ancient master you're emulating — fourteen to choose between, each with its own weapon set and mentality.</p>"},
    {lvl:"Level 13",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 14",name:"Saint Weapon Bond",body:"<p>A bond with the weapon your path is built around.</p>"},
    {lvl:"Level 18",name:"Soul of Luxus",body:"<p>Your spiritual energy reaches its final form.</p>"},
    {lvl:"Level 20",name:"Unwavering Legend",body:"<p>You become the thing you were emulating.</p>"}
  ]};


/* ---------------- Ranger (Revised) ---------------- */
CLASSES.rangerrev = {
  name:"Ranger (Revised)", src:"homebrew",
  note:"<strong>A ground-up rewrite, not a patch.</strong> Same fantasy as the official Ranger — swift, hard to pin down, ready for surprises — but rebuilt so its hunter's tricks still apply against creatures you haven't specifically studied. Subclass pages here list the level-by-level progression and what each one changes, and cite the book for the full feature text.",
  foot:"Source: Lyre's Guide to Retia — Land of Industry (Logan Laidlaw / Nat19), Ch. 8, pp. 402–412.",
  groups:[
    {label:"The class itself", keys:["rr-core"]},
    {label:"Subclasses", keys:["rr-beastrider","rr-versatilebeast","rr-deadshot","rr-greyarrow","rr-dunestalker","rr-seadog","rr-wilderudite"]}
  ]
};

ENTRIES["rr-core"] = { cls:"rangerrev", nav:"Core features", navSub:"The class itself", kicker:"Ranger (Revised)",
  name:"Core Class Features", tag:"The Ranger, rebuilt around a die instead of a spell",
  flavor:"The Retia book's answer to a class it describes as comprised almost entirely of optional features. A swift combatant who acts quickly, is prepared for surprise, and strikes with tactical precision — adaptable, and difficult to pin down.",
  src:"Lyre's Guide to Retia, pp. 402–406", mods:{},
  features:[
    {lvl:"Level 1",name:"Favored Enemy and Favor Die",body:"<p>{{favordie}} — added to rolls concerning your quarry, and to the things your subclass cares about.</p>"},
    {lvl:"Level 2",name:"Spellcasting",body:"<p>Half a caster's progression on Wisdom, kept deliberately light.</p>"},
    {lvl:"Level 3",name:"Subclass",body:"<p>Your specialisation. Old official Ranger subclasses can mostly be dropped in with small adjustments.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 11",name:"Slayer's Reach",body:"<p>Your slayer features begin applying briefly to enemies outside your favoured types — the fix the rewrite exists for.</p>"}
  ]};


/* ---------------- Favored Soul ---------------- */
CLASSES.favoredsoul = {
  name:"Favored Soul", src:"homebrew",
  note:"<strong>Nineteen Burdens, one per god.</strong> The book openly calls this class powerful and suggests treating it as a special occasion — raise it with whoever runs your game before you pick it. Subclass pages here list the level-by-level progression and what each one changes, and cite the book for the full feature text.",
  foot:"Source: Lyre's Guide to Retia — Land of Industry (Logan Laidlaw / Nat19), Ch. 8, pp. 339–358.",
  groups:[
    {label:"The class itself", keys:["fs-core"]},
    {label:"Divine Mantles — the Burdens", keys:["fs-agris","fs-apophemia","fs-aymere","fs-burtromet","fs-chan","fs-echobliss","fs-gotham","fs-harros","fs-ilsrabae","fs-invidiva","fs-ivsil","fs-lussuria","fs-mortuous","fs-nyphlamour","fs-saanjeck","fs-scorn","fs-tithiss","fs-tquinn","fs-vestias"]}
  ]
};

ENTRIES["fs-core"] = { cls:"favoredsoul", nav:"Core features", navSub:"The class itself", kicker:"Favored Soul",
  name:"Core Class Features", tag:"A fragment of a god, handed over without conditions",
  flavor:"Granted great power by prophecy, destiny or circumstance. Unlike those who form contracts or pray for it, the power is entirely yours once given — neither faith nor servitude came with it, though there is a pull at the back of your head you'll spend the campaign arguing with.",
  src:"Lyre's Guide to Retia, pp. 339–342", mods:{},
  features:[
    {lvl:"Level 1",name:"Pact Magic",body:"<p>{{pactspellslots}} on Charisma, paired with a prepared list — the versatility of both systems at once.</p>"},
    {lvl:"Level 1",name:"Martial Training",body:"<p>Martial weapons and medium armour, which is what separates this from an ordinary caster.</p>"},
    {lvl:"Level 3",name:"Divine Mantle",body:"<p>{{divinemantle}} — your Burden, one of nineteen.</p>"},
    {lvl:"Level 17",name:"Crown of Splendor",body:"<p>Your divine inheritance becomes visible to everyone.</p>"},
    {lvl:"Level 18",name:"Essence Mastery",body:"<p>Full command of the fragment you carry.</p>"},
    {lvl:"Level 20",name:"True Divine Mantle",body:"<p>The Burden's final form.</p>"}
  ]};


/* ---------------- Petal Knight ---------------- */
CLASSES.petalknight = {
  name:"Petal Knight", src:"homebrew",
  note:"<strong>Fourteen epithets, and your DM may pick yours.</strong> The book suggests letting them choose the flower that fits your character's true nature — which makes this the one class here where the subclass is partly out of your hands. Subclass pages here list the level-by-level progression and what each one changes, and cite the book for the full feature text.",
  foot:"Source: Lyre's Guide to Retia — Land of Industry (Logan Laidlaw / Nat19), Ch. 8, pp. 382–401.",
  groups:[
    {label:"The class itself", keys:["pk-core"]},
    {label:"Epithets", keys:["pk-blackrose","pk-camellia","pk-coralrose","pk-dahlia","pk-foxandcub","pk-foxglove","pk-gardenia","pk-hydrangea","pk-morningglory","pk-osmanthus","pk-pinkrose","pk-redspiderlily","pk-sakura","pk-winecup"]}
  ]
};

ENTRIES["pk-core"] = { cls:"petalknight", nav:"Core features", navSub:"The class itself", kicker:"Petal Knight",
  name:"Core Class Features", tag:"A duellist with a code, and a flower where their heart is",
  flavor:"Proud warriors who tow the line between sorcerer and duellist. The world appraises your soul and lends you a fragment of its power. Petal Knights champion order and coexistence with the land, and turn up in royal courts as often as in ruins.",
  src:"Lyre's Guide to Retia, pp. 382–386", mods:{},
  features:[
    {lvl:"Level 1",name:"Fighting Style",body:"<p>Including Arcane Flourisher, which is unique to the class.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>{{pactspellslots}} on Wisdom — light armour, light weapons, and roughly half your magic aimed at other people.</p>"},
    {lvl:"Level 3",name:"Epithet",body:"<p>{{epithet}}.</p>"},
    {lvl:"Level 17",name:"Resplendence",body:"<p>The flower opens fully.</p>"},
    {lvl:"Level 20",name:"Paragon of Protection",body:"<p>The class's protective ideal, realised.</p>"}
  ]};


/* ---------------- Inscriptor ---------------- */
CLASSES.inscriptor = {
  name:"Inscriptor", src:"homebrew",
  note:"<strong>The heaviest bookkeeping in the Retia set, and the most fun for a DM.</strong> You cast by describing. Many of the class's best options need a number of inscription marks rather than a level, so the marks are the real progression. Subclass pages here list the level-by-level progression and what each one changes, and cite the book for the full feature text.",
  foot:"Source: Lyre's Guide to Retia — Land of Industry (Logan Laidlaw / Nat19), Ch. 8, pp. 359–381.",
  groups:[
    {label:"The class itself", keys:["is-core"]},
    {label:"Intents", keys:["is-mystery","is-history","is-playwright","is-forbiddance","is-adventure","is-mythology"]}
  ]
};

ENTRIES["is-core"] = { cls:"inscriptor", nav:"Core features", navSub:"The class itself", kicker:"Inscriptor",
  name:"Core Class Features", tag:"A writer whose work comes true",
  flavor:"A novelist, playwright, poet or records clerk whose talent caught the eye of a Correfont — one of a cabal of demigods keeping an endless library. A novelist narrates events into being; an archivist writes objects into having new qualities.",
  src:"Lyre's Guide to Retia, pp. 359–362", mods:{},
  features:[
    {lvl:"Level 1",name:"Pact Magic",body:"<p>{{pactspellslots}} on Intelligence, cast by describing rather than incanting.</p>"},
    {lvl:"Level 1",name:"Inscription Marks",body:"<p>{{inscriptionmark|Inscription marks}} — the class's second axis of progression.</p>"},
    {lvl:"Level 1",name:"Narrative Twists",body:"<p>{{narrativetwist|Narrative twists}} spent to bend a scene.</p>"},
    {lvl:"Level 3",name:"Intent",body:"<p>Your form of writing, which decides your method of casting.</p>"},
    {lvl:"Level 18",name:"Consultation",body:"<p>Direct recourse to your patron, several times per rest.</p>"},
    {lvl:"Level 20",name:"Intent Feature",body:"<p>Your intent reaches its final form.</p>"}
  ]};


ENTRIES["ss-kyuubi"] = { cls:"swordsaint", nav:"Way of Kyuubi", navSub:"The original Sword Saint", kicker:"Sword Saint path",
  name:"Way of Kyuubi", tag:"The original Sword Saint",
  flavor:"Based on the swordsman who developed the basic techniques everyone after built on. Masters the fundamentals and borrows freely from other paths.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focustechnique:"Refined Focus Techniques plus Skillsteal make this the path that can use other paths' work — the widest technique access in the class.",
    focuspointsretia:"Spent broadly rather than on one signature trick."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Jack of All Trades</li><li><b>3</b> · Refined Focus Techniques</li><li><b>6</b> · Skillsteal</li><li><b>11</b> · Falcon Wing Deflection</li><li><b>14</b> · Blade of the Splitting Path</li><li><b>17</b> · Ars Magnus</li></ul>"}
  ]};

ENTRIES["ss-bluemetal"] = { cls:"swordsaint", nav:"Way of Blue Metal", navSub:"An ancient elven swordsman", kicker:"Sword Saint path",
  name:"Way of Blue Metal", tag:"An ancient elven swordsman",
  flavor:"A master of internal spiritual energy who adopts the techniques of others and recovers focus more easily than anyone.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focuspointsretia:"Extra Focus and Focus Mastery mean this path simply has more to spend, which changes how freely you can use techniques.",
    focustechnique:"Adopting others' techniques is the point, so your list grows rather than deepens."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Focus Mastery</li><li><b>3</b> · Focus Techniques</li><li><b>6</b> · Central Aura</li><li><b>11</b> · Extra Focus</li><li><b>14</b> · Purity of Form</li><li><b>17</b> · Roaring Dragon Surge</li></ul>"}
  ]};

ENTRIES["ss-dragonfly"] = { cls:"swordsaint", nav:"Way of the Dragonfly", navSub:"Heavy weapons", kicker:"Sword Saint path",
  name:"Way of the Dragonfly", tag:"Heavy weapons",
  flavor:"Patterned after an ancient military general. Durable, and thrown readily into the heart of combat.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focustechnique:"Rally and Conquer turns your techniques outward, which is unusual for a class this self-contained.",
    hitpoints:"The most survivable path — Unslayable at 17 is exactly what it sounds like."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Fighting Style: Great Weapon Fighting</li><li><b>3</b> · Focus Techniques</li><li><b>6</b> · Rally and Conquer</li><li><b>14</b> · Rising Dragonfly</li><li><b>17</b> · Unslayable</li></ul>"}
  ]};

ENTRIES["ss-kojiro"] = { cls:"swordsaint", nav:"Way of Kojirō", navSub:"Two-handed control", kicker:"Sword Saint path",
  name:"Way of Kojirō", tag:"Two-handed control",
  flavor:"Two-handed weapons wielded easily, with techniques that turn an opponent's attacks in on themselves.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    opportunityattack:"Intercept is the core idea — controlling how enemies are allowed to approach you.",
    focustechnique:"Defensive rather than offensive, which is rare here."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Focus Techniques</li><li><b>6</b> · Intercept</li><li><b>14</b> · Washing Pole Technique</li><li><b>17</b> · Backslide</li></ul>"}
  ]};

ENTRIES["ss-muramasa"] = { cls:"swordsaint", nav:"Way of Muramasa", navSub:"Cursed blades", kicker:"Sword Saint path",
  name:"Way of Muramasa", tag:"Cursed blades",
  flavor:"Blood-thirsty wielders of a legendary smith's demonic weapons. Strikes hard and repeatedly, with cursed techniques that decay their targets.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    criticalhit:"Bloody Critical and its superior version make this the crit-focused path, landing far more often than normal.",
    hitpoints:"Blood Drinker takes them from the target and gives them to you."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Bloody Critical</li><li><b>3</b> · Reckless Attacker</li><li><b>6</b> · Bloodlust</li><li><b>11</b> · Blood Drinker</li><li><b>14</b> · Superior Bloody Critical</li><li><b>17</b> · Blood Crest</li></ul>"}
  ]};

ENTRIES["ss-musashi"] = { cls:"swordsaint", nav:"Way of Musashi", navSub:"Two weapons", kicker:"Sword Saint path",
  name:"Way of Musashi", tag:"Two weapons",
  flavor:"The master of two-weapon combat — strings of attacks seemingly without end, adaptable and mindful of the whole battlefield.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focustechnique:"Way of Five Souls organises your techniques into a rotation rather than a set of one-offs.",
    extraattack:"More attacks than any other path, which is what the technique economy is built around."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Fighting Style: Two-Weapon Fighting</li><li><b>3</b> · Focus Techniques</li><li><b>6</b> · Point Zero</li><li><b>11</b> · Way of Five Souls</li><li><b>14</b> · The Undeniable Path</li><li><b>17</b> · Heartless Heavenly Blade</li></ul>"}
  ]};

ENTRIES["ss-pendragon"] = { cls:"swordsaint", nav:"Way of Pendragon", navSub:"A knightly legacy", kicker:"Sword Saint path",
  name:"Way of Pendragon", tag:"A knightly legacy",
  flavor:"An ancient lord of knights wielded a sword of certain victory. This path inspires allies and commands fate.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    d20test:"Instincts & Luck lets you lean on fate rather than skill, which no other path does.",
    focustechnique:"Aimed at the party as much as the enemy."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Fighting Style: Defense</li><li><b>11</b> · Instincts &amp; Luck</li><li><b>14</b> · Grit</li></ul>"}
  ]};

ENTRIES["ss-tomoe"] = { cls:"swordsaint", nav:"Way of Tomoe", navSub:"Lightning at range", kicker:"Sword Saint path",
  name:"Way of Tomoe", tag:"Lightning at range",
  flavor:"A ranged style harnessing lightning. Capable up close, but truly excellent at long range.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focustechnique:"Lightning Blossom Stance is a stance rather than a strike — the path commits to a position and fires from it.",
    speed:"The only path that would rather not close the distance at all."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Fighting Style: Archery</li><li><b>6</b> · Saint Relic Folding Sky</li><li><b>6</b> · Thunder Lotus</li><li><b>11</b> · Lightning Blossom Stance</li><li><b>17</b> · Aim Beyond Perfection</li></ul>"}
  ]};

ENTRIES["ss-snowwhite"] = { cls:"swordsaint", nav:"Way of the Snow White Sleeve", navSub:"Ice and dance", kicker:"Sword Saint path",
  name:"Way of the Snow White Sleeve", tag:"Ice and dance",
  flavor:"A dance that freezes everything around its practitioner, bending ice to slow and debilitate.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    speed:"Slowing enemies is the whole style, and it compounds with a class that already controls approach.",
    restrained:"White Haze and Dance of the Freezing Pond hold enemies in place."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Cold in Death</li><li><b>3</b> · Focus Techniques</li><li><b>11</b> · Dance of the Freezing Pond</li><li><b>14</b> · White Haze</li></ul>"}
  ]};

ENTRIES["ss-freezingsoul"] = { cls:"swordsaint", nav:"Way of the Freezing Soul", navSub:"Cold turned inward", kicker:"Sword Saint path",
  name:"Way of the Freezing Soul", tag:"Cold turned inward",
  flavor:"Frost worn as much as thrown — a path that survives the cold it creates.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    resistance:"Tundra Borne makes the cold yours, so you can stand inside your own effects.",
    restrained:"Binding Blizzard and Rime Coffin hold what they touch."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Frost Reaper</li><li><b>3</b> · Tundra Borne</li><li><b>6</b> · Snow Bandages</li><li><b>11</b> · Binding Blizzard</li><li><b>17</b> · Rime Coffin</li></ul>"}
  ]};

ENTRIES["ss-erodedlord"] = { cls:"swordsaint", nav:"Way of the Eroded Lord", navSub:"Sorcery", kicker:"Sword Saint path",
  name:"Way of the Eroded Lord", tag:"Sorcery",
  flavor:"A sorcery-based style after the enigmatic Eroded Lord, champion of Halte Itonia — generating magical energy to empower swordsmanship.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    preparedspells:"The only Path of Devotion with actual Spellcasting, which changes the class from martial to hybrid.",
    focuspointsretia:"Maximum Output spends everything at once, which is the path's signature gamble."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Focus Techniques</li><li><b>3</b> · Spellcasting</li><li><b>6</b> · Maximum Output</li><li><b>11</b> · Break the Vault</li><li><b>14</b> · Carve Your Own Path</li></ul>"}
  ]};

ENTRIES["ss-heavenbreaker"] = { cls:"swordsaint", nav:"Way of the Heavenbreaker", navSub:"Luck and nerve", kicker:"Sword Saint path",
  name:"Way of the Heavenbreaker", tag:"Luck and nerve",
  flavor:"A hard-headed warrior relying on dumb luck and tenacity. Defined by recklessness and overwhelming confidence.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    d20test:"Make the Impossible Possible is exactly what it sounds like — the path bets on outcomes rather than technique.",
    armorclass:"Boastful Defense rewards you for taking risks rather than avoiding them."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Boastful Defense</li><li><b>3</b> · Fighting Style: Reckless Fighter</li><li><b>3</b> · Focus Techniques</li><li><b>6</b> · Giga Helix</li><li><b>11</b> · Make the Impossible Possible</li><li><b>14</b> · Helictical Passage</li></ul>"}
  ]};

ENTRIES["ss-deep"] = { cls:"swordsaint", nav:"Way of the Deep", navSub:"Something older", kicker:"Sword Saint path",
  name:"Way of the Deep", tag:"Something older",
  flavor:"Techniques drawn from somewhere darker and older than a duelling school.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focustechnique:"Kraken's Reach and Eel Weave extend your threat further than a weapon should reach.",
    speed:"Ocean's Gift changes how you move entirely."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Bonus Proficiencies</li><li><b>3</b> · Eel Weave</li><li><b>6</b> · Kraken’s Reach</li><li><b>11</b> · Ocean’s Gift</li><li><b>17</b> · Water Locker</li></ul>"}
  ]};

ENTRIES["ss-brokenchain"] = { cls:"swordsaint", nav:"Way of the Broken Chain", navSub:"What was escaped", kicker:"Sword Saint path",
  name:"Way of the Broken Chain", tag:"What was escaped",
  flavor:"A path built on what its practitioner escaped rather than what they were taught.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focuspointsretia:"Desperate Measures spends them when you have nothing left, which is the path's whole shape."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>17</b> · Desperate Measures</li></ul>"}
  ]};

ENTRIES["ss-gadabout"] = { cls:"swordsaint", nav:"Gadabout", navSub:"No path at all", kicker:"Sword Saint path",
  name:"Gadabout", tag:"No path at all",
  flavor:"Those who abandoned their discipline but kept the skills. Looked on as wanderers and quitters, they sharpen personal skill rather than refining a master's.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    focustechnique:"Stolen Fighting Style takes from whoever is nearby rather than from a tradition.",
    frightened:"Contemptible Reputation leans on your poor standing, frightening several creatures at once."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Focus Techniques</li><li><b>3</b> · Stolen Fighting Style</li><li><b>6</b> · Pathcarver’s Expertise</li><li><b>14</b> · Unbonded</li><li><b>17</b> · Pleasure Seeker</li></ul>"}
  ]};

ENTRIES["pk-blackrose"] = { cls:"petalknight", nav:"Black Rose", navSub:"Heavy weapons, marked prey", kicker:"Petal Knight epithet",
  name:"Black Rose", tag:"Heavy weapons, marked prey",
  flavor:"Manifests for those who seek power and reject the notion that the world is pure. They break the standards of a Petal Knight, wielding weapons considered too heavy for the order.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    epithet:"The only epithet that pushes you toward heavy weaponry, against everything else the class assumes.",
    criticalhit:"Improved Critical in melee, which nothing else in the class offers this early."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Divergent Arms</li><li><b>6</b> · Improved Critical (Melee)</li><li><b>6</b> · Noble Prey</li><li><b>11</b> · Black Rose Branches</li><li><b>15</b> · Stained Roots</li></ul>"}
  ]};

ENTRIES["pk-camellia"] = { cls:"petalknight", nav:"Camellia", navSub:"Bonds", kicker:"Petal Knight epithet",
  name:"Camellia", tag:"Bonds",
  flavor:"A duellist who draws power from their bonds with others, and uses magic to reinforce those bonds.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    epithet:"Your power scales with who you're standing beside, which makes this the most party-dependent epithet.",
    advantage:"Bond of Trust converts a relationship into a mechanical edge."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Wylam Bond</li><li><b>6</b> · Virtue of the Soft</li><li><b>11</b> · Blooming Action</li><li><b>11</b> · Bond of Trust</li><li><b>15</b> · Stardust Dream</li></ul>"}
  ]};

ENTRIES["pk-coralrose"] = { cls:"petalknight", nav:"Coral Rose", navSub:"Illusion and teleportation", kicker:"Petal Knight epithet",
  name:"Coral Rose", tag:"Illusion and teleportation",
  flavor:"Adaptable fighters who use illusions and quick movement, including teleportation, to deceive their enemies.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    teleport:"Coral Rose Branches make blinking part of your normal turn rather than an escape.",
    epithet:"The trickster of the fourteen — deception where the others use conviction."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Deceptive Bouquet</li><li><b>6</b> · Breath of Tranquility</li><li><b>11</b> · Coral Rose Branches</li><li><b>15</b> · Undeterrable Pace</li></ul>"}
  ]};

ENTRIES["pk-dahlia"] = { cls:"petalknight", nav:"Dahlia", navSub:"Flame and recklessness", kicker:"Petal Knight epithet",
  name:"Dahlia", tag:"Flame and recklessness",
  flavor:"Flame-wreathed duellists who face challenges with reckless abandon. Strong damage dealers with expanded critical ranges.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    criticalhit:"Expanded range plus flames makes this the highest-damage epithet.",
    epithet:"Aggression where the order usually prefers restraint."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Flames of Passion</li><li><b>6</b> · Infernal Rebuff</li><li><b>11</b> · Extra Attack Improvement</li><li><b>15</b> · Duke of Flames</li></ul>"}
  ]};

ENTRIES["pk-foxandcub"] = { cls:"petalknight", nav:"Fox and Cub", navSub:"Nurturing light", kicker:"Petal Knight epithet",
  name:"Fox and Cub", tag:"Nurturing light",
  flavor:"Gentle travellers who support others through nurturing light, and can reach into Druid spells.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    epithet:"The healer of the fourteen, and the only one that opens the Druid list.",
    hitpoints:"Regenerative Glow and Gift of the Sun make this a genuine support build."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Golden Sun</li><li><b>2</b> · Harmonious Oath</li><li><b>6</b> · Cubfire Light</li><li><b>11</b> · Gift of the Sun</li><li><b>15</b> · Regenerative Glow</li></ul>"}
  ]};

ENTRIES["pk-foxglove"] = { cls:"petalknight", nav:"Foxglove", navSub:"Poisons and hazards", kicker:"Petal Knight epithet",
  name:"Foxglove", tag:"Poisons and hazards",
  flavor:"Those with a travel-lust for exotic places, naturally prepared to deal with poisons and natural hazards.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    poisoned:"You hand it out with Toxic Smite and shrug it off yourself — the epithet's whole identity.",
    resistance:"Toxicological Miracle turns hazards into something you walk through."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Bonus Proficiencies</li><li><b>2</b> · Toxic Smite</li><li><b>6</b> · Toxicological Miracle</li><li><b>11</b> · Venom Epithet</li><li><b>15</b> · Creeping Death</li></ul>"}
  ]};

ENTRIES["pk-gardenia"] = { cls:"petalknight", nav:"Gardenia", navSub:"Standing your ground", kicker:"Petal Knight epithet",
  name:"Gardenia", tag:"Standing your ground",
  flavor:"Pure knights who hold the world to a high standard. Strong and enduring, able to face opponents without falling back or losing ground.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    epithet:"The immovable one — Gardenia never gives ground, which pairs oddly well with a light-armour class.",
    savingthrow:"Proud Heart and Royal Posture shore up exactly what a duellist usually lacks."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Purity of Nature</li><li><b>6</b> · Bane of the Unknown</li><li><b>6</b> · Royal Posture</li><li><b>11</b> · Gardenia Branches</li><li><b>15</b> · Proud Heart</li></ul>"}
  ]};

ENTRIES["pk-hydrangea"] = { cls:"petalknight", nav:"Hydrangea", navSub:"Ice and reflection", kicker:"Petal Knight epithet",
  name:"Hydrangea", tag:"Ice and reflection",
  flavor:"Shifting and many-coloured like the flower, turning what comes at them back outward.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    reaction:"Frenetic Reflection and Gracious Karma both act on other people's turns.",
    restrained:"Garden of Ice holds what approaches."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Beckoning Knowledge</li><li><b>2</b> · Frenetic Reflection</li><li><b>6</b> · Gracious Karma</li><li><b>11</b> · Frozen Epithet</li><li><b>15</b> · Garden of Ice</li></ul>"}
  ]};

ENTRIES["pk-morningglory"] = { cls:"petalknight", nav:"Morning Glory", navSub:"Unity, briefly", kicker:"Petal Knight epithet",
  name:"Morning Glory", tag:"Unity, briefly",
  flavor:"Brief and bright, tied to the turning of the day and to the people you fight beside.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    epithet:"Breath of Unity and Bond of Dedication make this a second bond-based epithet, shorter-lived and sharper than Camellia.",
    temporaryhp:"Most of what you give allies arrives as a buffer rather than healing."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Breath of Unity</li><li><b>6</b> · Attention Collar</li><li><b>11</b> · Bond of Dedication</li><li><b>15</b> · Bitter Farewell</li></ul>"}
  ]};

ENTRIES["pk-osmanthus"] = { cls:"petalknight", nav:"Osmanthus", navSub:"A living fortress", kicker:"Petal Knight epithet",
  name:"Osmanthus", tag:"A living fortress",
  flavor:"Knights of strong dedication and nobility who fight like a living fortress — unrelenting in the face of opposition.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    armorclass:"Fortress of One is the most defensive capstone in the class.",
    epithet:"Truesight at 11 is a remarkable thing for a martial subclass to simply have."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Oath of Nobility</li><li><b>2</b> · Truthful Proficiency</li><li><b>6</b> · Face to Face</li><li><b>11</b> · Truesight</li><li><b>15</b> · Fortress of One</li></ul>"}
  ]};

ENTRIES["pk-pinkrose"] = { cls:"petalknight", nav:"Pink Rose", navSub:"Healing at reach", kicker:"Petal Knight epithet",
  name:"Pink Rose", tag:"Healing at reach",
  flavor:"Pure knights battling injustice while upholding gratitude and humility. Capable healers with the ability to extend their reach.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    hitpoints:"Gentle Treatment makes this the class's other healer, alongside Fox and Cub.",
    criticalhit:"Uniquely, Pink Rose gets both improved and superior critical ranges in melee."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Gentle Treatment</li><li><b>2</b> · Improved Critical (Melee)</li><li><b>6</b> · Stunning Drive</li><li><b>11</b> · Graceful Reach</li><li><b>15</b> · Elegant Extension</li><li><b>15</b> · Superior Critical (Melee)</li></ul>"}
  ]};

ENTRIES["pk-redspiderlily"] = { cls:"petalknight", nav:"Red Spider Lily", navSub:"Daemoturgy", kicker:"Petal Knight epithet",
  name:"Red Spider Lily", tag:"Daemoturgy",
  flavor:"Petal Knights affected by otherworldly forces who lost something to it. They draw on daemoturgy spells and carry fiendish qualities.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    epithet:"The only epithet that came from damage rather than appraisal, and the spell access shows it.",
    preparedspells:"Blooming Daemonology opens a list no other Petal Knight can reach."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Degree of Separation</li><li><b>2</b> · Whispered Knowledge</li><li><b>6</b> · Starcrossed Field</li><li><b>11</b> · Virtue of Perspective</li><li><b>15</b> · Blooming Daemonology</li></ul>"}
  ]};

ENTRIES["pk-sakura"] = { cls:"petalknight", nav:"Sakura", navSub:"Sorcery and blood", kicker:"Petal Knight epithet",
  name:"Sakura", tag:"Sorcery and blood",
  flavor:"Strong-minded, instinct-driven duellists who can use Sorcery, sap health from opponents, and strike more often than other Petal Knights.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    extraattack:"Extra Attack Improvement makes this the fastest epithet.",
    hitpoints:"Vampiric Blade and Blood Roots take them from whoever you hit."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Spark of Sorcery</li><li><b>2</b> · Valor</li><li><b>6</b> · Gilded Instincts</li><li><b>6</b> · Vampiric Blade</li><li><b>11</b> · Extra Attack Improvement</li><li><b>15</b> · Blood Roots</li></ul>"}
  ]};

ENTRIES["pk-winecup"] = { cls:"petalknight", nav:"Winecup", navSub:"Stealth and mischief", kicker:"Petal Knight epithet",
  name:"Winecup", tag:"Stealth and mischief",
  flavor:"One with a mind for subterfuge and an undeniable mischievous streak. Can turn invisible and negate crowd-based tactics aimed at them.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    invisible:"Open Mantle and Closing Petal make this the only Petal Knight who disappears.",
    epithet:"Subterfuge in an order built on open conduct — which the book treats as a feature."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>2</b> · Open Mantle</li><li><b>6</b> · Poison Resistance</li><li><b>6</b> · Winecup Branches</li><li><b>11</b> · Closing Petal</li><li><b>15</b> · Ever Aware</li></ul>"}
  ]};

ENTRIES["fs-agris"] = { cls:"favoredsoul", nav:"Burden of Agris", navSub:"Judgement and binding", kicker:"Favored Soul Burden",
  name:"Burden of Agris", tag:"Judgement and binding",
  flavor:"A god of judgement. The Burden turns you into an instrument of a verdict already reached.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"Silver Chain Seal and Perfect Judgment make this the binding Burden — it stops things rather than destroying them.",
    restrained:"Chains are the Burden's signature, and they hold."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Avatar of the Absolute</li><li><b>6</b> · Blade of the Bound Judge</li><li><b>10</b> · Perfect Judgment</li><li><b>10</b> · Silver Chain Seal</li></ul>"}
  ]};

ENTRIES["fs-apophemia"] = { cls:"favoredsoul", nav:"Burden of Apophemia", navSub:"Madness and whispers", kicker:"Favored Soul Burden",
  name:"Burden of Apophemia", tag:"Madness and whispers",
  flavor:"Something that speaks. Psychic Tolerance suggests the Burden costs you something to carry.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"Intrusive Insanity aims at minds rather than bodies, which is rare in this class.",
    resistance:"Psychic Tolerance is the price and the protection at once."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Psychic Tolerance</li><li><b>6</b> · Whispered Speech</li><li><b>10</b> · Intrusive Insanity</li><li><b>13</b> · Playbook of a Correfont</li></ul>"}
  ]};

ENTRIES["fs-aymere"] = { cls:"favoredsoul", nav:"Burden of Aymere", navSub:"The Wise Forest", kicker:"Favored Soul Burden",
  name:"Burden of Aymere", tag:"The Wise Forest",
  flavor:"One of the four Eidolons. Wood, miasma and a body that hardens into steel-like bark.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"Skin of Steel Wood and Shroud of Miasma make this a defensive Burden that also poisons the air around it.",
    resistance:"Fiery Resistance, which a wooden body badly needs."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Eidolons’ Favored</li><li><b>1</b> · Touch of the Forest</li><li><b>6</b> · Shroud of Miasma</li><li><b>10</b> · Fiery Resistance</li><li><b>13</b> · Skin of Steel Wood</li></ul>"}
  ]};

ENTRIES["fs-burtromet"] = { cls:"favoredsoul", nav:"Burden of Burtromet", navSub:"Forge and meteor", kicker:"Favored Soul Burden",
  name:"Burden of Burtromet", tag:"Forge and meteor",
  flavor:"Fire and falling metal. Charred Essence and Meteoric Javelin describe the whole Burden.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"Hammer of Cracking Kilns is the heaviest single strike in the Burden list.",
    extraattack:"Extra Attack Improvement, which few Burdens give."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Charred Essence</li><li><b>6</b> · Meteoric Javelin</li><li><b>10</b> · Hammer of Cracking Kilns</li><li><b>13</b> · Extra Attack Improvement</li></ul>"}
  ]};

ENTRIES["fs-chan"] = { cls:"favoredsoul", nav:"Burden of Chan Karegosh", navSub:"Moon and rabbit", kicker:"Favored Soul Burden",
  name:"Burden of Chan Karegosh", tag:"Moon and rabbit",
  flavor:"A moon god, a rabbit familiar, and sight in the dark.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    familiar:"The Moon Rabbit is the only familiar any Burden grants.",
    speed:"Rabbit's Haste makes this the fastest Favored Soul."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Moon Rabbit Familiar</li><li><b>1</b> · Rabbit’s Haste</li><li><b>6</b> · Bright Eyes in the Darkness</li><li><b>13</b> · New Moon Shade</li></ul>"}
  ]};

ENTRIES["fs-echobliss"] = { cls:"favoredsoul", nav:"Burden of Echobliss", navSub:"Wrath", kicker:"Favored Soul Burden",
  name:"Burden of Echobliss", tag:"Wrath",
  flavor:"A god of wrath, a greatscythe, and a form that torments.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    criticalhit:"Improved and Superior Critical make this the crit Burden.",
    divinemantle:"Wrath's Tormented Form is a transformation rather than a buff."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Improved Critical</li><li><b>1</b> · Wrathful Fighter</li><li><b>6</b> · Favored Weapon(s) Greatscythe</li><li><b>10</b> · Wrath’s Tormented Form</li><li><b>13</b> · Superior Critical</li></ul>"}
  ]};

ENTRIES["fs-gotham"] = { cls:"favoredsoul", nav:"Burden of Gotham", navSub:"Necromancy", kicker:"Favored Soul Burden",
  name:"Burden of Gotham", tag:"Necromancy",
  flavor:"A dark god. Master of Necromancy at level 1, and menials animated later.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"The only Burden that hands you a school of magic outright at first level.",
    undead:"Animate Menials means you arrive with staff."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Master of Necromancy</li><li><b>1</b> · Uncanny Body</li><li><b>6</b> · Deathly Fortitude</li><li><b>10</b> · Gluttonous Infliction</li><li><b>13</b> · Animate Menials</li></ul>"}
  ]};

ENTRIES["fs-harros"] = { cls:"favoredsoul", nav:"Burden of Harros", navSub:"The Golden Sun", kicker:"Favored Soul Burden",
  name:"Burden of Harros", tag:"The Golden Sun",
  flavor:"One of the four Eidolons. A legendary knight's proficiencies, paragon will and adamantine hide.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"The most martial Burden — it makes a Favored Soul into a knight rather than a caster.",
    savingthrow:"Paragon Will shores up the one thing armour doesn't."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Eidolons’ Favored</li><li><b>1</b> · Legendary Knight’s Proficiencies’</li><li><b>6</b> · Paragon Will</li><li><b>13</b> · Adamantine Hide</li></ul>"}
  ]};

ENTRIES["fs-ilsrabae"] = { cls:"favoredsoul", nav:"Burden of Ilsrabae", navSub:"Cold and secrets", kicker:"Favored Soul Burden",
  name:"Burden of Ilsrabae", tag:"Cold and secrets",
  flavor:"Frost, hoarded knowledge, and a veil worn like an empress.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    resistance:"Shivering Resistance is the entry point; the whole Burden is built on cold.",
    divinemantle:"Tundral Hurricane is its one large area effect."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Shivering Resistance</li><li><b>1</b> · Sunken Essence</li><li><b>6</b> · Secret Hoarder</li><li><b>10</b> · Tundral Hurricane</li><li><b>13</b> · Veil of the Empress</li></ul>"}
  ]};

ENTRIES["fs-invidiva"] = { cls:"favoredsoul", nav:"Burden of Invidiva", navSub:"The Grasping Twin", kicker:"Favored Soul Burden",
  name:"Burden of Invidiva", tag:"The Grasping Twin",
  flavor:"Envy and agility — Cunning Action at first level, which no other Burden grants.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    cunningaction:"Handed to you at level 1, which quietly makes this the most mobile Favored Soul.",
    speed:"Increased Agility on top."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Cunning Action</li><li><b>1</b> · Skills of the Grasping Twin</li><li><b>6</b> · Tempestuous Essence</li><li><b>10</b> · Total Elimination</li><li><b>13</b> · Increased Agility</li></ul>"}
  ]};

ENTRIES["fs-ivsil"] = { cls:"favoredsoul", nav:"Burden of Ivsil", navSub:"Thunder and stillness", kicker:"Favored Soul Burden",
  name:"Burden of Ivsil", tag:"Thunder and stillness",
  flavor:"Storm and the silence inside it. Faster movement, and thunder made from still air.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    resistance:"Thunderous Resistance.",
    initiative:"Initiative Surge — the Burden wants to act first."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Thunderous Resistance</li><li><b>6</b> · Whirlwind Shunt</li><li><b>10</b> · Thunder of Still Air</li><li><b>13</b> · Initiative Surge</li></ul>"}
  ]};

ENTRIES["fs-lussuria"] = { cls:"favoredsoul", nav:"Burden of Lussuria", navSub:"Charm and subjugation", kicker:"Favored Soul Burden",
  name:"Burden of Lussuria", tag:"Charm and subjugation",
  flavor:"A god of indulgence. Entrapping Charm, malicious pleading, and a wave of subjugative will.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    charmed:"This is the charm Burden — nothing else in the class does it.",
    divinemantle:"Aimed almost entirely at people rather than monsters."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Entrapping Charm</li><li><b>6</b> · Malicious Pleading</li><li><b>10</b> · Wave of Subjugative Will</li><li><b>13</b> · Compelling Allure</li></ul>"}
  ]};

ENTRIES["fs-mortuous"] = { cls:"favoredsoul", nav:"Burden of Mortuous", navSub:"The challenger", kicker:"Favored Soul Burden",
  name:"Burden of Mortuous", tag:"The challenger",
  flavor:"A champion's Burden — a body built for the duel and a surge to finish it.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"Challenger's Body and Surging Champion make this the single-combat Burden.",
    extraattack:"Extra Attack Improvement."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>6</b> · Challenger’s Body</li><li><b>10</b> · Surging Champion</li><li><b>13</b> · Extra Attack Improvement</li></ul>"}
  ]};

ENTRIES["fs-nyphlamour"] = { cls:"favoredsoul", nav:"Burden of Nyphlamour", navSub:"Comradery", kicker:"Favored Soul Burden",
  name:"Burden of Nyphlamour", tag:"Comradery",
  flavor:"A gentle Burden — muses, kind winds, and protection cast on the people around you.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"The most supportive Burden of the nineteen.",
    preparedspells:"Communal Spell of Protection extends what you cast to the whole party."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Gift of Comradery</li><li><b>1</b> · Muse’s Guidance</li><li><b>6</b> · Carried on Kind Winds</li><li><b>10</b> · Communal Spell of Protection</li><li><b>13</b> · Connective Speech</li></ul>"}
  ]};

ENTRIES["fs-saanjeck"] = { cls:"favoredsoul", nav:"Burden of Saanjeck", navSub:"Twilight and study", kicker:"Favored Soul Burden",
  name:"Burden of Saanjeck", tag:"Twilight and study",
  flavor:"Knowledge for the inquisitive, twilight eyes, and force drawn from the half-light.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    darkvision:"Twilight Eyes is the entry point.",
    divinemantle:"The scholar's Burden — Replete Lucubration rewards preparation."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Lessons for the Inquisitive</li><li><b>1</b> · Twilight Eyes</li><li><b>6</b> · Twilight Force</li><li><b>10</b> · Replete Lucubration</li></ul>"}
  ]};

ENTRIES["fs-scorn"] = { cls:"favoredsoul", nav:"Burden of Scorn", navSub:"Beast and return", kicker:"Favored Soul Burden",
  name:"Burden of Scorn", tag:"Beast and return",
  flavor:"Claws, obscene criticals, and coming back from death more than once.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    hitpoints:"Return from Death and Ruthless Reconstitution make this the hardest Burden to finish off.",
    criticalhit:"Obscene Critical is exactly as unpleasant as it sounds."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Bestial Clawing</li><li><b>1</b> · Obscene Critical</li><li><b>6</b> · Return from Death</li><li><b>10</b> · Bloody Phantasia</li><li><b>13</b> · Ruthless Reconstitution</li></ul>"}
  ]};

ENTRIES["fs-tithiss"] = { cls:"favoredsoul", nav:"Burden of Tithiss", navSub:"Oak and acid", kicker:"Favored Soul Burden",
  name:"Burden of Tithiss", tag:"Oak and acid",
  flavor:"Skin turned wooden and hard, acid immunity, and forests that rise where you stand.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    resistance:"Acid Resistance at 1, immunity later — plus flat damage reduction of half your level.",
    hitpoints:"Lifelight and Nurturing Arcanist make this a quietly supportive Burden."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Acid Resistance</li><li><b>1</b> · Oaken Essence</li><li><b>6</b> · Nurturing Arcanist</li><li><b>10</b> · Emergent Forestation</li><li><b>13</b> · Lifelight</li></ul>"}
  ]};

ENTRIES["fs-tquinn"] = { cls:"favoredsoul", nav:"Burden of T'quinn", navSub:"The Resonant", kicker:"Favored Soul Burden",
  name:"Burden of T'quinn", tag:"The Resonant",
  flavor:"One of the four Eidolons. An illusory duplicate you swap places with, and eventually attack through.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"Harmonious Duplicate is the most mechanically distinctive Burden — positioning, defence and a second attack source in one feature.",
    reaction:"Swapping with the duplicate costs one, and rolls d100 to see whether the illusion survives.",
    opportunityattack:"From 13th, creatures provoke them for leaving the duplicate's reach as well as yours."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Eidolons’ Favored</li><li><b>1</b> · Enchantment of the Muses</li><li><b>6</b> · Second Echo</li><li><b>10</b> · Harmonious Duplicate</li><li><b>13</b> · Echoing Blade</li></ul>"}
  ]};

ENTRIES["fs-vestias"] = { cls:"favoredsoul", nav:"Burden of Vestias", navSub:"The Sky-Keeper", kicker:"Favored Soul Burden",
  name:"Burden of Vestias", tag:"The Sky-Keeper",
  flavor:"One of the four Eidolons, and the goddess of magic. High sorcery, quick casting, and an anti-magic aegis.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    divinemantle:"The caster's Burden — Quickcast and Sky-Keeper's High Sorcery push it furthest from the martial end.",
    antimagic:"Anti-Magic Aegis is the class's only real answer to enemy casters."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Eidolons’ Favored</li><li><b>1</b> · Sky-Keeper’s High Sorcery</li><li><b>6</b> · Quickcast</li><li><b>10</b> · Anti-Magic Aegis</li></ul>"}
  ]};

ENTRIES["rr-beastrider"] = { cls:"rangerrev", nav:"Beast Rider", navSub:"A mount", kicker:"Ranger (Revised) subclass",
  name:"Beast Rider", tag:"A mount",
  flavor:"A companion you ride rather than command from a distance — and, unusually, firearm proficiency alongside it.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    favordie:"Extends to your mount, so the die is rolling for two bodies.",
    primalcompanion:"Closest thing in Retia to the official Beast Master, built around riding rather than directing."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Beast Rider Companion</li><li><b>3</b> · Bonus Proficiencies</li><li><b>7</b> · Beastmaster Sync</li><li><b>11</b> · Greater Beast Improvement</li><li><b>15</b> · Beast Rider Companion</li></ul>"}
  ]};

ENTRIES["rr-versatilebeast"] = { cls:"rangerrev", nav:"Versatile Beast", navSub:"Becoming the beast", kicker:"Ranger (Revised) subclass",
  name:"Versatile Beast", tag:"Becoming the beast",
  flavor:"Not a companion at all — you take on the beast's qualities yourself, partially and then completely.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    favordie:"Rolled on your own transformed attacks rather than a companion's.",
    hitpoints:"Healing Factor makes this the most durable of the seven."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Beast’s Darkvision</li><li><b>3</b> · Tooth &amp; Claw</li><li><b>9</b> · Partial Transformation</li><li><b>13</b> · Cursed Wound</li><li><b>13</b> · Primal Flurry</li><li><b>17</b> · Healing Factor</li></ul>"}
  ]};

ENTRIES["rr-deadshot"] = { cls:"rangerrev", nav:"Deadshot", navSub:"Firearms", kicker:"Ranger (Revised) subclass",
  name:"Deadshot", tag:"Firearms",
  flavor:"Precision at range with a gun — tactician, master, and eventually faster on the draw than anyone.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    favordie:"Attached to the shot, which makes this the most focused damage subclass.",
    cover:"Superior Cover Fire turns your shooting into protection for someone else."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Firearm Tactician</li><li><b>9</b> · Gun Master</li><li><b>13</b> · Superior Cover Fire</li><li><b>17</b> · Swift Draw</li></ul>"}
  ]};

ENTRIES["rr-greyarrow"] = { cls:"rangerrev", nav:"Grey Arrow", navSub:"Anti-magic archery", kicker:"Ranger (Revised) subclass",
  name:"Grey Arrow", tag:"Anti-magic archery",
  flavor:"A disciplined archer order with rounds that pierce magic and arrows that erase.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    antimagic:"Magic-Piercing Rounds and Erasure Arrow make this the Ranger built to shoot casters.",
    favordie:"Spent on the shots that matter rather than every shot."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Magic-Piercing Rounds</li><li><b>11</b> · Erasure Arrow</li><li><b>15</b> · Web-Severing Bullet</li></ul>"}
  ]};

ENTRIES["rr-dunestalker"] = { cls:"rangerrev", nav:"Dunestalker", navSub:"Desert and fire", kicker:"Ranger (Revised) subclass",
  name:"Dunestalker", tag:"Desert and fire",
  flavor:"Built for arid country, with an arcane hound and flames that burst.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    favordie:"Tied to terrain as much as quarry.",
    extraattack:"Extra Attack Improvement, which few Retia Ranger subclasses give."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Arcane Hound</li><li><b>3</b> · Assassin of the Sands</li><li><b>7</b> · Desert Flames</li><li><b>11</b> · Extra Attack Improvement</li><li><b>15</b> · Bursting Flames</li></ul>"}
  ]};

ENTRIES["rr-seadog"] = { cls:"rangerrev", nav:"Sea Dog", navSub:"Water", kicker:"Ranger (Revised) subclass",
  name:"Sea Dog", tag:"Water",
  flavor:"Swim speeds, doubled breath, a melee weapon and a ranged one used together, and anything swimming treated as favoured prey.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    favordie:"Added to Survival checks at sea, underwater, or on waterborne travel.",
    speed:"A swim speed matching your own, increasing by five times your Favor Bonus if you already had one."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Ocean Expert</li><li><b>3</b> · Sea Legs</li><li><b>7</b> · Hand-in-Hand</li><li><b>11</b> · Wet-Heeled Advantage</li><li><b>15</b> · Lord of the Sea</li></ul>"}
  ]};

ENTRIES["rr-wilderudite"] = { cls:"rangerrev", nav:"Wild Erudite", navSub:"Research", kicker:"Ranger (Revised) subclass",
  name:"Wild Erudite", tag:"Research",
  flavor:"The scholar of the seven — knowledge of a creature converted directly into an edge against it.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    favordie:"Storied Research turns preparation into the die.",
    advantage:"Complete Certainty and Situational Savant reward knowing what you're fighting before you fight it."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>3</b> · Complete Certainty</li><li><b>3</b> · Storied Research</li><li><b>6</b> · Magic Strike</li><li><b>6</b> · Situational Savant</li></ul>"}
  ]};

ENTRIES["is-mystery"] = { cls:"inscriptor", nav:"Intent of Mystery", navSub:"Detective fiction", kicker:"Inscriptor intent",
  name:"Intent of Mystery", tag:"Detective fiction",
  flavor:"A writer of mysteries — careful investigation, a suspect, and an escape nobody can explain.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    inscriptionmark:"Mystery rites lean on marks for concealment, including Disguise Self at will.",
    abilitycheck:"Careful Investigator and Private Eye make this the investigative intent."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Careful Investigator</li><li><b>5</b> · Whodunit</li><li><b>8</b> · Private Eye</li><li><b>12</b> · Likely Suspect</li><li><b>20</b> · Impossible Escape</li></ul>"}
  ]};

ENTRIES["is-history"] = { cls:"inscriptor", nav:"Intent of History", navSub:"Recorded fact", kicker:"Inscriptor intent",
  name:"Intent of History", tag:"Recorded fact",
  flavor:"A chronicler. Ossenheimer's Fond Memory lets you cast any spell from a memoir you have studied, whether you know it or not.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    inscriptionmark:"Requires marks rather than levels — twelfth level and two marks for the memoir trick.",
    preparedspells:"History gets the widest one-off spell access of the six."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>5</b> · Invasive Research</li><li><b>8</b> · Informed Account</li><li><b>12</b> · Categoric Truth</li></ul>"}
  ]};

ENTRIES["is-playwright"] = { cls:"inscriptor", nav:"Intent of Playwright", navSub:"Scripts and staging", kicker:"Inscriptor intent",
  name:"Intent of Playwright", tag:"Scripts and staging",
  flavor:"A dramatist. Free castings of Command, and a narrative twist to make it a bonus action.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    narrativetwist:"Spent to move Command to a bonus action, which is the intent's signature tempo trick.",
    bonusaction:"Playwright is the intent that competes hardest for it."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Take the Stage</li><li><b>5</b> · Motivation</li><li><b>8</b> · Stage Direction</li><li><b>12</b> · Reliable Talent</li><li><b>20</b> · Encore</li></ul>"}
  ]};

ENTRIES["is-forbiddance"] = { cls:"inscriptor", nav:"Intent of Forbiddance", navSub:"Words of power", kicker:"Inscriptor intent",
  name:"Intent of Forbiddance", tag:"Words of power",
  flavor:"Prohibitions and locks. From 8th, Writ and Power Word spells become bonus actions.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    inscriptionmark:"Eighth level and two marks for the Power Word trick — the clearest example of marks gating the good options.",
    bonusaction:"Turns the class's biggest spells into bonus actions, once per turn."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>5</b> · Unknowable Mind</li><li><b>8</b> · Lock and Key</li><li><b>12</b> · Modify Memory</li></ul>"}
  ]};

ENTRIES["is-adventure"] = { cls:"inscriptor", nav:"Intent of Adventure", navSub:"Adventurous fantasy", kicker:"Inscriptor intent",
  name:"Intent of Adventure", tag:"Adventurous fantasy",
  flavor:"A writer of adventure stories, and the only intent that fights. Poetry in Motion grants a second weapon attack.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    extraattack:"Poetry in Motion is effectively Extra Attack for a d8 caster, which changes the class entirely.",
    narrativetwist:"Against the Odds and Ultimate Stakes spend them at the dramatic moment."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Against the Odds</li><li><b>5</b> · Armed with Knowledge</li><li><b>8</b> · Extra Attack</li><li><b>12</b> · Finest Hour</li><li><b>20</b> · Ultimate Stakes</li></ul>"}
  ]};

ENTRIES["is-mythology"] = { cls:"inscriptor", nav:"Intent of Mythology", navSub:"Old stories", kicker:"Inscriptor intent",
  name:"Intent of Mythology", tag:"Old stories",
  flavor:"The oldest tales, written down and made to happen again — phantasms, beasts and steeds.",
  src:"Lyre's Guide to Retia, Ch. 8",
  mods:{
    preparedspells:"Conjure major steed and Invoke Phantasm give Mythology the summoning niche.",
    inscriptionmark:"Hide Enchantment and Grounding keep the summons stable."
  },
  features:[
    {lvl:"Progression",name:"Features by level",body:"<ul class=\"prog-list\"><li><b>1</b> · Hide Enchantment</li><li><b>5</b> · Subversive Beast Hunter</li><li><b>8</b> · Grounding</li><li><b>12</b> · Invoke Phantasm</li><li><b>20</b> · Conjure major steed</li></ul>"}
  ]};


/* ===== Spellblade techniques, brought to parity ===== */
ENTRIES["sb-battlemage"] = { cls:"spellblade", nav:"Battlemage", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Battlemage", tag:"The paragon of balance",
  flavor:"The iconic Spellblade, standing at the crossroads of might and magic. Every feature widens what Arcane Surge can do rather than specialising it — which makes this the technique that is never the wrong answer.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 47",
  mods:{
    arcanesurge:"Battlemage is the technique built on it. Quickening Surge casts an action spell as a bonus action; Twin Surge takes two options at once; Surge Mastery upgrades every option; and at 20 surging stops consuming uses entirely for a minute.",
    spellstrike:"Kept general — the technique widens your casting rather than changing how the strike is delivered.",
    bonusaction:"Quickening Surge is the whole early game: a full-action spell moved onto your bonus action, every turn you can pay for it."
  },
  features:[
    {lvl:"Level 3",name:"Quickening Surge",body:"<p>A new {{arcanesurge}} option: cast a Spellblade spell with a casting time of one action as a {{bonusaction}} instead.</p>"},
    {lvl:"Level 7",name:"Twin Surge",body:"<p>When you use {{arcanesurge|Arcane Surge}}, choose two of the available options rather than one.</p>"},
    {lvl:"Level 15",name:"Surge Mastery",body:"<p>Every Surge option gains an enhanced result — Arcane Sight, for instance, adds more to a surge-cast Detect Magic.</p>"},
    {lvl:"Level 20",name:"Unlimited Surges",body:"<p>A minute of perfect arcane resonance, during which using {{arcanesurge|Arcane Surge}} costs no uses at all.</p>"}
  ]};

ENTRIES["sb-aetherblade"] = { cls:"spellblade", nav:"Aether Blade", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Aether Blade", tag:"A weapon of pure force, conjured on demand",
  flavor:"Spellblades who conjure an oversized weapon of pure force and build everything around it. Nothing can disarm you, and by 20 nothing much can stop the blade either.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 48",
  mods:{
    arcanesurge:"Empowering Surge adds damage to the blade for no action, and by 15 you get that effect from <em>any</em> Surge option — so every surge is also a damage boost.",
    spellstrike:"Delivered through a conjured weapon, so it can't be taken from you or sundered.",
    greatcreation:"Aether Enhancement lets you absorb a magic weapon's bonus into the blade over an hour's ritual, the same way an Inventor retrofits their own creation.",
    initiative:"The blade manifests on initiative or as a bonus action, so you're armed the moment a fight starts."
  },
  features:[
    {lvl:"Level 3",name:"Aether Blade",body:"<p>Manifest an oversized melee weapon of pure force on {{initiative}} or as a {{bonusaction}}.</p>"},
    {lvl:"Level 3",name:"Aether Enhancement",body:"<p>An hour-long ritual absorbs the attack and damage bonus of a magic weapon into the blade. No artifacts or sentient weapons.</p>"},
    {lvl:"Level 3",name:"Empowering Surge",body:"<p>An {{arcanesurge}} option, needing no action: the blade deals additional damage.</p>"},
    {lvl:"Level 7",name:"Aether Great Weapon",body:"<p>The blade grows — damage rises to d12 and it gains the reach property.</p>"},
    {lvl:"Level 15",name:"Channeled Power",body:"<p>You gain Empowering Surge's effect whenever you use <em>any</em> {{arcanesurge}} option.</p>"},
    {lvl:"Level 20",name:"Massive Blade",body:"<p>Overcharge the blade for a minute: your attacks with it ignore the defences that would normally blunt them.</p>"}
  ]};

ENTRIES["sb-guardian"] = { cls:"spellblade", nav:"Guardian", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Guardian", tag:"A highly mobile line of defence",
  flavor:"Abjuration and self-enhancement, leaning physical. Guardians stand at the front and spend their magic on other people — the only Spellblade in heavy armour, and the only one whose Surge protects somebody else.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 49",
  mods:{
    arcanesurge:"Turned outward. Projected Barrier casts Shield on an <em>ally</em>; Fortifying Surge gives you temporary hit points every time you surge; Swapping Surge trades places with a friend and protects you both.",
    armorclass:"Heavy armour and shields, alone among the nine — and a melee weapon usable as your arcane focus, so you never need a free hand.",
    reaction:"Projected Barrier spends one to put Shield on someone else, including against Magic Missile.",
    temporaryhp:"1d8 plus Intelligence on every single Surge from 7th, which is a steady trickle nothing else in the class gets.",
    teleport:"Swapping Surge converts your escape into a rescue — you take their place and they take yours.",
    resistance:"Resilient Aegis at 20: resistance to all damage for a minute, once per long rest."
  },
  features:[
    {lvl:"Level 3",name:"Guardian Proficiency",body:"<p>Heavy armour and shields. A melee weapon works as your arcane focus, and you can perform somatic components with the hand holding it.</p>"},
    {lvl:"Level 3",name:"Projected Barrier",body:"<p>An {{arcanesurge}} option: as a {{reaction}} when an ally within 30 feet is hit or targeted by Magic Missile, cast Shield free — giving <em>them</em> the {{armorclass}} bonus.</p>"},
    {lvl:"Level 7",name:"Fortifying Surge",body:"<p>Every use of {{arcanesurge|Arcane Surge}} gives you {{temporaryhp}} equal to 1d8 plus your Intelligence modifier.</p>"},
    {lvl:"Level 15",name:"Swapping Surge",body:"<p>A Surge {{teleport}} can instead swap you with a willing creature in range — and both of you gain the Fortifying Surge {{temporaryhp}}.</p>"},
    {lvl:"Level 20",name:"Resilient Aegis",body:"<p>{{resistance}} to all damage for a minute, no action required. Once per {{longrest}}.</p>"}
  ]};

ENTRIES["sb-swiftblade"] = { cls:"spellblade", nav:"Swiftblade", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Swiftblade", tag:"Strike from the shadows, withdraw before the reply",
  flavor:"The quickest and deadliest technique. Two-weapon fighting, a Spellstrike folded into the Attack action, and a Surge that simply buys more attacks.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 50",
  mods:{
    spellstrike:"Swift Casting is the key change: Spellstrike becomes part of the Attack action rather than a separate bonus action, so you can strike and still do something else. Still only once per turn.",
    arcanesurge:"Rapid Surge buys a weapon attack for no action; Vanishing Surge turns every surge into a disappearing act.",
    bonusaction:"Freed up, which is why this is the highest-damage technique — everyone else spends theirs on Spellstrike.",
    invisible:"From 15, every Arcane Surge leaves you invisible until your next turn.",
    fightingstyle:"Two-Weapon Fighting, granted at 3rd."
  },
  features:[
    {lvl:"Level 3",name:"Fighting Style",body:"<p>The Two-Weapon Fighting {{fightingstyle}}.</p>"},
    {lvl:"Level 3",name:"Swift Casting",body:"<p>Use {{spellstrike}} as part of the Attack action, before a melee attack — freeing your {{bonusaction}}. Still once per turn.</p>"},
    {lvl:"Level 3",name:"Rapid Surge",body:"<p>An {{arcanesurge}} option: spend a use to make a single weapon attack, no action required.</p>"},
    {lvl:"Level 7",name:"Relentless Spellstrike",body:"<p>Miss with a Spellstrike and you can decline to trigger it — the spell carries to your next attack before the end of your turn instead.</p>"},
    {lvl:"Level 15",name:"Vanishing Surge",body:"<p>Every {{arcanesurge|Arcane Surge}} leaves you {{invisible}} until the start of your next turn.</p>"},
    {lvl:"Level 20",name:"Infinite Strikes",body:"<p>A minute of blinding speed: weapon attacks made with an action multiply.</p>"}
  ]};

ENTRIES["sb-magehunter"] = { cls:"spellblade", nav:"Mage Hunter", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Mage Hunter", tag:"The anathema of all spellcasters",
  flavor:"Spellblades who honed their magic to counter other people's. Bonus force damage that doubles against casters, a Surge that strips magic off the field, and eventually a walking antimagic field.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 51",
  mods:{
    antimagic:"The whole technique. Purging Surge ends magical and supernatural effects; Nullifying Surge projects that outward; at 20 you become a moving antimagic field for a minute.",
    arcanesurge:"Spent on removal rather than on damage — and Nullifying Surge works even while you're incapacitated, which is unique.",
    incapacitated:"Explicitly no obstacle here: you can still purge while suffering it.",
    proficiencybonus:"Disrupting Blows adds it as force damage once a turn, doubled against anything that casts."
  },
  features:[
    {lvl:"Level 3",name:"Disrupting Blows",body:"<p>Once a turn, a melee hit deals bonus force damage equal to your {{proficiencybonus}} — doubled against spellcasters.</p>"},
    {lvl:"Level 3",name:"Purging Surge",body:"<p>An {{arcanesurge}} option: end a magical or supernatural effect.</p>"},
    {lvl:"Level 7",name:"Nullifying Surge",body:"<p>Purging Surge works even while {{incapacitated}}, and two uses project the purge outward rather than at a single target.</p>"},
    {lvl:"Level 20",name:"Mage Hunter's Void",body:"<p>Become a magical void for a minute, projecting the effect of {{antimagic|Antimagic Field}} around yourself.</p>"}
  ]};

ENTRIES["sb-spellshot"] = { cls:"spellblade", nav:"Spellshot", navSub:"Levels 3 · 7 · 20", kicker:"Spellblade technique",
  name:"Spellshot", tag:"Spellstriking from a safe distance",
  flavor:"Arcane archers and magical gunslingers, infusing spells into ammunition. The single biggest change any technique makes to the core feature — and the only one that never needs to close.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 52",
  mods:{
    spellstrike:"Applied to ammunition as well as melee weapons, which moves the entire class to range. Transmuted Ammunition goes further: a line-targeting spell is released as a line along the shot.",
    arcanesurge:"Distant Strike extends an infused spell to a creature or line at range.",
    speed:"Staying out of reach is the technique's armour — there is no defensive feature here because the plan is not to be hit.",
    cover:"Complete Control at 20 makes your ranged attacks ignore it entirely."
  },
  features:[
    {lvl:"Level 3",name:"Ranged Spellstrike",body:"<p>Apply {{spellstrike}} to pieces of ammunition as well as melee weapons.</p>"},
    {lvl:"Level 3",name:"Distant Surge",body:"<p>An {{arcanesurge}} option — Distant Strike — for infusing a spell that targets a creature or a line into ammunition.</p>"},
    {lvl:"Level 7",name:"Transmuted Ammunition",body:"<p>Infuse a line-targeting spell and the ammunition becomes the spell, releasing it as a line.</p>"},
    {lvl:"Level 20",name:"Complete Control",body:"<p>A minute of perfect focus: your ranged attacks ignore {{cover}} and bend to their target.</p>"}
  ]};

ENTRIES["sb-rimeblade"] = { cls:"spellblade", nav:"Rimeblade", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Rimeblade", tag:"The cold precision of an icicle's edge",
  flavor:"Blurring the arcane and the arctic. Frostbite strips a creature's cold resistance outright, which quietly solves the one problem every cold build has.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 53",
  mods:{
    resistance:"Cut both ways here. Frostbite <em>removes</em> a target's cold immunity or resistance; at 7th you gain cold resistance yourself.",
    immunity:"Frostbite strips that too, which is unusual — most effects can't touch immunity at all.",
    arcanesurge:"Spent on Frostbite, and from 15 each further hit of cold prolongs it.",
    charmed:"Advantage on saves against it from 7th, alongside being frightened.",
    cantrip:"Arctic Armory grants Ice Weapon, castable once a turn without a bonus action."
  },
  features:[
    {lvl:"Level 3",name:"Ice Blade",body:"<p>On a {{longrest}}, touch one non-two-handed weapon you're proficient with to make it your ice blade.</p>"},
    {lvl:"Level 3",name:"Arctic Armory",body:"<p>The Ice Weapon {{cantrip}}, castable once per turn without a {{bonusaction}}. Weapons it creates count as your ice blade.</p>"},
    {lvl:"Level 3",name:"Frostbite",body:"<p>An {{arcanesurge}} option: a melee hit strips the target's {{immunity}} or {{resistance}} to cold and leaves them taking it.</p>"},
    {lvl:"Level 7",name:"Cold Endurance",body:"<p>{{resistance}} to cold, and {{advantage}} on saves against being {{charmed}} or {{frightened}}.</p>"},
    {lvl:"Level 15",name:"Winter's Grip",body:"<p>Each time a creature takes cold damage, Frostbite's effect extends by another round.</p>"},
    {lvl:"Level 20",name:"Ice Age",body:"<p>A 30-foot radius around you plunges into everfrost for a minute.</p>"}
  ]};

ENTRIES["sb-flyingsword"] = { cls:"spellblade", nav:"Flying Sword", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Flying Sword", tag:"A blade that fights without your hand on it",
  flavor:"Infuse a weapon on a long rest and it floats beside you, striking as part of your Attack action. By 15 there are four of them, and by 7 you can ride one.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 54",
  mods:{
    spellstrike:"Delivered by a weapon you aren't holding, which changes where you can stand while doing it.",
    arcanesurge:"Phantom Swords spends it to duplicate the blade mid-attack — two extra copies by 15, each striking on its own.",
    greatcreation:"The sword is made on a long rest and then carried, stowed or readied — closer to an Inventor's creation than to a spell.",
    flyspeed:"Sword Flight at 7 turns the blade into transport as well as a weapon.",
    speed:"You command it remotely, so your own position and the blade's stop being the same question."
  },
  features:[
    {lvl:"Level 3",name:"Flying Sword",body:"<p>On a {{longrest}}, infuse a melee weapon. Carried, stowed, or readied to float beside you and attack as part of the Attack action.</p>"},
    {lvl:"Level 3",name:"Phantom Sword Surge",body:"<p>An {{arcanesurge}} option: attacking with the flying sword creates a phantom copy that strikes as well.</p>"},
    {lvl:"Level 7",name:"Sword Flight",body:"<p>Command the blade remotely, and use it as a mode of transport — a {{flyspeed}} on a sword.</p>"},
    {lvl:"Level 15",name:"Phantom Sword Barrage",body:"<p>Phantom Sword Surge creates two additional copies, up to four swords striking at once.</p>"},
    {lvl:"Level 20",name:"Ultimate Move",body:"<p>An attack made as part of the Attack action that channels the style's full power into one unstoppable strike.</p>"}
  ]};

ENTRIES["sb-spellfist"] = { cls:"spellblade", nav:"Spellfist", navSub:"Levels 3 · 7 · 15 · 20", kicker:"Spellblade technique",
  name:"Spellfist", tag:"Punch someone with a fireball",
  flavor:"The Spellblade that threw the blade away. A former street fighter who found a talent for magic, or a caster who decided the honest way to deliver it was by hand.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 56",
  mods:{
    spellstrike:"Point Blank is the big one: Spellstrike while grappling and the spell simply <em>lands</em>, treated as an automatic hit on the creature you're holding.",
    unarmedstrike:"Your weapon, upgraded at 3rd — nothing to drop, nothing to disarm.",
    grappled:"The technique's control mechanism and its damage multiplier at once, since a held target can't avoid Point Blank.",
    arcanesurge:"Arcane Impact rewards shoving people; Brawler's Resilience at 15 makes every surge give resistance to all damage until your next turn.",
    resistance:"From 15, every single Arcane Surge grants it against everything for a round."
  },
  features:[
    {lvl:"Level 3",name:"Kinetic Magic",body:"<p>Your {{unarmedstrike}} damage increases, and your fists become the delivery system for your magic.</p>"},
    {lvl:"Level 3",name:"Impactful Magic",body:"<p>Two {{arcanesurge}} options, including Arcane Impact — spend a use when you knock a target away from you.</p>"},
    {lvl:"Level 7",name:"Point Blank",body:"<p>Use {{spellstrike}} while {{grappled|grappling}} a target and the spell infuses them directly, treated as an automatic hit.</p>"},
    {lvl:"Level 15",name:"Brawler's Resilience",body:"<p>Spending an {{arcanesurge|Arcane Surge}} grants {{resistance}} to all damage until the start of your next turn.</p>"},
    {lvl:"Level 20",name:"Unlimited Power",body:"<p>Magic channelled directly into muscle, pushing your strength past common reason.</p>"}
  ]};

/* ===== Warden bonds, brought to parity ===== */
TERMS.tremorsense = {n:"Tremorsense",s:"core",d:"You feel vibrations through the ground and know where things are standing, without needing to see them."};

ENTRIES["wd-elemental"] = { cls:"warden", nav:"Elemental Soul", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Elemental Soul", tag:"Shrouded in harsh primal forces",
  flavor:"Wardens who tap the elemental planes and wear the result, destroying foes with their very presence. Four different conjured weapons, and an interdiction that becomes a buffeting maelstrom.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 64",
  mods:{
    primalinterdiction:"Elemental Interdiction turns the area into a maelstrom rather than just rough ground — and at 14 you run two elemental options at once.",
    endurancedice:"Elemental Reflection makes blocking a melee attack hurt the attacker, so spending a die is offensive as well as defensive.",
    resistance:"Elemental Body gives it against cold, fire or lightning, re-chosen on every long rest.",
    mysticbulwark:"Your armaments are the bond — flames, ice, claws or a lightning whip, manifested on initiative or as a bonus action."
  },
  features:[
    {lvl:"Level 1",name:"Elemental Armaments",body:"<p>On {{initiative}} or as a {{bonusaction}}, manifest elemental weapons: <b>Primal Flames</b> (d6 fire), <b>Icy Claws</b> (d6 slashing), <b>Lightning Lash</b> (d6 lightning, reach), or a <b>Frost Shield</b> in one hand.</p>"},
    {lvl:"Level 1",name:"Elemental Manipulation",body:"<p>The Manipulate Fire and Manipulate Water {{cantrip|cantrips}}, plus innate spells channelled through your bond.</p>"},
    {lvl:"Level 3",name:"Elemental Interdiction",body:"<p>{{primalinterdiction|Your interdiction}} becomes a buffeting maelstrom of elemental power while an armament is manifested.</p>"},
    {lvl:"Level 3",name:"Elemental Reflection",body:"<p>Spend an {{endurancedice|Endurance Die}} to block a melee attack and the attacker takes elemental damage in return.</p>"},
    {lvl:"Level 7",name:"Elemental Body and Primal State",body:"<p>{{resistance}} to cold, fire or lightning, re-chosen on a {{longrest}}. And spend an Endurance Die to cast Become Fire, Water or Wind.</p>"},
    {lvl:"Level 14",name:"Elemental Form",body:"<p>Cast Form of Fire, Ice or Wind without a {{spellslot}} — and run two Elemental Interdiction options at once.</p>"},
    {lvl:"Level 17",name:"Cataclysm Unleashed",body:"<p>Elemental Form can instead become Form of the Elements, without the usual restriction.</p>"}
  ]};

ENTRIES["wd-beasthide"] = { cls:"warden", nav:"Beasthide", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Beasthide", tag:"Terrible wrath on anyone who touches your people",
  flavor:"Primal ferocity aimed squarely at whoever attacked you or yours. The bond that punishes being attacked, crits on 19 and 20, and finishes by simply becoming enormous.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 66",
  mods:{
    primalinterdiction:"Ruthless Interdiction gives you advantage on your first attack or grapple against anyone who attacked an ally inside it — so the reckless-defence option becomes a trap rather than a sacrifice.",
    endurancedice:"Enduring Ferocity adds the rolled die to your next damage roll or Athletics check, which makes spending one purely profitable.",
    criticalhit:"Vicious Endurance lands them on 19 or 20 with natural weapons.",
    advantage:"Handed to you whenever somebody hurts a friend of yours in your area.",
    concentration:"Focused Transformation protects it on the bond's own innate spells."
  },
  features:[
    {lvl:"Level 1",name:"Bestial Claws",body:"<p>On {{initiative}} or as a {{bonusaction}}, turn one or both arms into a vicious set of claws — a natural one-handed weapon dealing d8 slashing.</p>"},
    {lvl:"Level 1",name:"Bond of the Wild",body:"<p>Animal Handling proficiency, or {{expertise}} if you had it. Plus innate spells from your bond.</p>"},
    {lvl:"Level 3",name:"Ruthless Interdiction",body:"<p>{{advantage}} on the first attack or grapple you make against anyone who attacked an ally inside {{primalinterdiction|your interdiction}}.</p>"},
    {lvl:"Level 3",name:"Enduring Ferocity",body:"<p>Roll an {{endurancedice|Endurance Die}} and you can also add it to your next damage roll or Athletics check.</p>"},
    {lvl:"Level 7",name:"Path of Survival",body:"<p>Proficiency in Constitution or Dexterity {{savingthrow|saving throws}}.</p>"},
    {lvl:"Level 14",name:"Vicious Endurance",body:"<p>Natural weapons score a {{criticalhit}} on 19 or 20. Focused Transformation also shields your {{concentration}} on the bond's spells.</p>"},
    {lvl:"Level 17",name:"Gigantification",body:"<p>Swell to enormous size as a {{bonusaction}} or when you manifest your claws.</p>"}
  ]};

ENTRIES["wd-elderheart"] = { cls:"warden", nav:"Elderheart", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Elderheart", tag:"Vines that lash, bind and drag",
  flavor:"Rooted in the ancient growth of the world. Low damage, inexorable pressure — and at 14 you take root and become a wrathful treant.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 67",
  mods:{
    primalinterdiction:"Spiked Interdiction overgrows the difficult terrain with thorns, so crossing it costs blood as well as movement.",
    mysticbulwark:"Body of Thorns turns your damage reduction into retaliation — melee attackers take piercing damage equal to the amount you reduce.",
    armorclass:"Arboreal Shelter adds +1 and turns every critical hit against you into a normal hit.",
    criticalhit:"Simply cannot happen to you from 7th, which is a remarkable thing to have flatly switched off.",
    restrained:"The vines' special property is binding, which is what the bond is for."
  },
  features:[
    {lvl:"Level 1",name:"Lashing Vines",body:"<p>On {{initiative}} or as a {{bonusaction}}, manifest vines as natural weapons — d6 slashing, with Light, Reach and a binding special property.</p>"},
    {lvl:"Level 1",name:"Eyes of Nature",body:"<p>{{advantage}} on Nature and Survival checks involving plants, plus innate spells.</p>"},
    {lvl:"Level 3",name:"Body of Thorns",body:"<p>A melee attacker takes piercing damage equal to your {{mysticbulwark}} damage reduction.</p>"},
    {lvl:"Level 3",name:"Spiked Interdiction",body:"<p>{{primalinterdiction|Your interdiction}} grows thorns — creatures crossing it are cut as well as slowed.</p>"},
    {lvl:"Level 7",name:"Arboreal Shelter",body:"<p>+1 {{armorclass}}, and any {{criticalhit}} against you becomes a normal hit.</p>"},
    {lvl:"Level 14",name:"Primeval Guardian",body:"<p>A {{bonusaction}} to take root and merge with the ground, becoming a wrathful treant.</p>"},
    {lvl:"Level 17",name:"New Growth",body:"<p>An action sprouts a tree within 30 feet that morphs the battlefield around it.</p>"}
  ]};

ENTRIES["wd-stoneblood"] = { cls:"warden", nav:"Stoneblood", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Stoneblood", tag:"An indomitable monolith",
  flavor:"The enduring blood of the world. The most defensive bond — and the one that banks spent Endurance Dice into a charged pool and gives them back as an earthquake.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 69",
  mods:{
    endurancedice:"Seismic Backlash stores every die you spend in a charged pool for a minute, so defending builds up an attack instead of just costing you.",
    mysticbulwark:"Resilient Bulwark raises damage reduction by 1 on top of the class progression, which stacks in front of resistance.",
    opportunityattack:"Gravitational Pull replaces one attack with a surge that drags creatures toward you — the opposite of everyone else's problem.",
    tremorsense:"Stone Sense at 14, out to the full range of your interdiction — so nothing inside your area can hide from you.",
    primalinterdiction:"Sets the radius of your tremorsense, which ties the bond's senses to the class's core feature."
  },
  features:[
    {lvl:"Level 1",name:"Stone Fists",body:"<p>On {{initiative}} or as a {{bonusaction}}, turn one or both arms to stone — natural weapons dealing d6 bludgeoning with the Light property.</p>"},
    {lvl:"Level 1",name:"Empowered Earth",body:"<p>The Manipulate Earth and Stone Forming {{cantrip|cantrips}}; Stone Forming can meld a one-handed object into stone.</p>"},
    {lvl:"Level 3",name:"Seismic Backlash",body:"<p>Each {{endurancedice|Endurance Die}} you spend is stored in a charged pool for a minute, to be released later.</p>"},
    {lvl:"Level 3",name:"Gravitational Pull",body:"<p>Replace one attack with a surge that hauls creatures toward you.</p>"},
    {lvl:"Level 7",name:"Resilient Bulwark",body:"<p>{{mysticbulwark}} damage reduction increases by 1, plus {{resistance}} to a damage type.</p>"},
    {lvl:"Level 14",name:"World Breaker and Stone Sense",body:"<p>Cast Fissure without a {{spellslot}} once per {{longrest}}, and gain {{tremorsense}} out to your {{primalinterdiction}} range.</p>"},
    {lvl:"Level 17",name:"Primordial Avatar",body:"<p>Become an embodiment of the world beneath your feet.</p>"}
  ]};

ENTRIES["wd-sunwatcher"] = { cls:"warden", nav:"Sunwatcher", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Sunwatcher", tag:"Burn away what lurks in the dark",
  flavor:"Power from the highest primal authority. The most supportive and the longest-ranged Warden — the only bond whose interdiction lights the battlefield instead of merely slowing it.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 70",
  mods:{
    primalinterdiction:"Radiant Aura fills it with bright light and sheds dim light well beyond it, which makes a Sunwatcher's area useful to allies rather than only hostile to enemies.",
    endurancedice:"Solar Flare turns a block into a blinding flash; Empowering Presence at 7 spends them on allies instead of yourself.",
    hitpoints:"The only Warden bond that meaningfully supports — which changes what the class is for in a party without a healer.",
    darkvision:"Largely irrelevant near you, because you are the light source."
  },
  features:[
    {lvl:"Level 1",name:"Solar Fragment",body:"<p>Cast Light on Wisdom. Cast on a simple object and it becomes something more.</p>"},
    {lvl:"Level 1",name:"Radiant Blast",body:"<p>Gather and release fiery radiant power from your hands or a wielded weapon.</p>"},
    {lvl:"Level 3",name:"Solar Flare",body:"<p>Spend an {{endurancedice|Endurance Die}} to block damage and the attacker must resist a blinding flare.</p>"},
    {lvl:"Level 3",name:"Radiant Aura",body:"<p>{{primalinterdiction|Your interdiction}} fills with bright light and casts dim light for an additional radius beyond it.</p>"},
    {lvl:"Level 7",name:"Empowering Presence",body:"<p>Spend an {{endurancedice|Endurance Die}} to empower an ally rather than protect yourself.</p>"},
    {lvl:"Level 14",name:"Transcendent Passage",body:"<p>A {{bonusaction}} turns you into a burst of radiant sunlight, travelling up to 60 feet.</p>"},
    {lvl:"Level 17",name:"Solar Avatar",body:"<p>A {{bonusaction}} embodies the sun itself for a minute.</p>"}
  ]};

ENTRIES["wd-ironbound"] = { cls:"warden", nav:"Ironbound", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Ironbound", tag:"Nature and civilisation, fused",
  flavor:"Wardens who argue that forged metal is as primal as anything that grows. Heavy armour, martial weapons, and chains that rise inside your interdiction to hold whatever wandered in.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 72",
  mods:{
    mysticbulwark:"Ironmonger makes it work in heavy armour, which no other bond allows — so you keep the Wisdom-based calculation and the plating.",
    primalinterdiction:"Binding Interdiction manifests chains inside it, turning slow ground into a genuine trap.",
    grappled:"The chains do it, and Iron Incarceration at 14 does it to every Large-or-smaller creature in range at once.",
    endurancedice:"Unbreakable Endurance gives you something back when a die fails to block the damage completely — so a bad roll isn't wasted.",
    resistance:"Iron Carapace at 7 morphs your metal into bludgeoning, piercing and slashing resistance."
  },
  features:[
    {lvl:"Level 1",name:"Ironmonger",body:"<p>Heavy armour and martial melee weapons, and your {{mysticbulwark}} keeps working inside heavy armour.</p>"},
    {lvl:"Level 1",name:"Armor Bond",body:"<p>An action to touch and fortify metal armour worn by any creature, including yourself.</p>"},
    {lvl:"Level 3",name:"Unbreakable Endurance",body:"<p>When an {{endurancedice|Endurance Die}} fails to block all the damage, you gain something back anyway.</p>"},
    {lvl:"Level 3",name:"Binding Interdiction",body:"<p>Manifest chains inside {{primalinterdiction|your interdiction}} to hold what enters it.</p>"},
    {lvl:"Level 7",name:"Iron Carapace",body:"<p>Morph your metal into {{resistance}} against bludgeoning, piercing and slashing.</p>"},
    {lvl:"Level 14",name:"Iron Incarceration",body:"<p>A {{bonusaction}} forces every Large or smaller creature you choose in range into the chains — {{grappled}} at once.</p>"},
    {lvl:"Level 17",name:"Metallic Monolith",body:"<p>An action turns you into an edifice of iron.</p>"}
  ]};

ENTRIES["wd-dreadwing"] = { cls:"warden", nav:"Dreadwing", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Dreadwing", tag:"The might and majesty of dragons",
  flavor:"An ancient bond with the primal power inside dragonkind. Fear plus difficult terrain is a nasty combination — they can't approach, and they don't want to.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 74",
  mods:{
    primalinterdiction:"Intimidating Interdiction sparks the primordial fear dragons invoke, so your area works even on things that could cross it.",
    frightened:"Dragon's Presence at 1 and Intimidating Interdiction at 3 — the bond's signature, and the reason it controls without needing to hold anyone.",
    endurancedice:"Dragon Breath banks each spent die as stored elemental energy, released as a breath weapon.",
    flyspeed:"Dragon Wings manifest at 7 and actually fly from 14, at 30 feet — unusual for a class built around holding one spot."
  },
  features:[
    {lvl:"Level 1",name:"Draconic Talons",body:"<p>On {{initiative}} or as a {{bonusaction}}, manifest talons — natural one-handed weapons dealing d6 slashing.</p>"},
    {lvl:"Level 1",name:"Dragon's Presence",body:"<p>Draconic, and the ability to channel a fragment of a dragon's supernatural dread, leaving creatures {{frightened}}.</p>"},
    {lvl:"Level 3",name:"Intimidating Interdiction",body:"<p>{{primalinterdiction|Your interdiction}} sparks the primordial fear dragons invoke in lesser creatures.</p>"},
    {lvl:"Level 3",name:"Dragon Breath",body:"<p>Each {{endurancedice|Endurance Die}} you spend banks elemental energy in a pool, released as breath.</p>"},
    {lvl:"Level 7",name:"Dragon Wings",body:"<p>Manifest wings alongside your talons.</p>"},
    {lvl:"Level 14",name:"Empowered Wings",body:"<p>The wings become a {{flyspeed}} of 30 feet.</p>"},
    {lvl:"Level 17",name:"Dragon Form",body:"<p>Instead of manifesting talons, become a dragon outright — claws and a bite, with changed damage types.</p>"}
  ]};

ENTRIES["wd-timetwister"] = { cls:"warden", nav:"Timetwister", navSub:"Levels 1 · 3 · 7 · 17", kicker:"Warden bond",
  name:"Timetwister", tag:"Speed your allies, slow your enemies",
  flavor:"Drawing on time's unstoppable march. The only bond that can pick its interdiction up and put it somewhere else — and the only one that ends with Time Stop.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 76",
  mods:{
    primalinterdiction:"Time Distortion warps the difficult terrain into a temporal drag, and Time Zone at 7 lets you project the whole thing onto a point 60 feet away rather than centring it on yourself.",
    speed:"Time Dilation accelerates an ally or decelerates an enemy within 60 feet, which is the bond's whole currency.",
    initiative:"Foreshadowing records your initiative roll and lets you reuse that result later — a glimpse of the future banked as a number.",
    endurancedice:"Timely Intervention spends them to bend time inside your area rather than to soak damage.",
    d20test:"The banked initiative result can be substituted, which makes this the only Warden that rewrites dice."
  },
  features:[
    {lvl:"Level 1",name:"Time Dilation",body:"<p>An action to accelerate a creature, or decelerate one within 60 feet, reducing its {{speed}}.</p>"},
    {lvl:"Level 1",name:"Foreshadowing",body:"<p>Record your {{initiative}} roll and reuse that {{d20test}} result later.</p>"},
    {lvl:"Level 3",name:"Time Distortion",body:"<p>{{primalinterdiction|Your interdiction}} distorts time as well as terrain.</p>"},
    {lvl:"Level 3",name:"Timely Intervention",body:"<p>Spend {{endurancedice|Endurance Dice}} to bend time further inside your area.</p>"},
    {lvl:"Level 7",name:"Time Zone",body:"<p>A {{bonusaction}} projects {{primalinterdiction|your interdiction}} onto a point within 60 feet instead of centring it on you.</p>"},
    {lvl:"Level 17",name:"Time Lock",body:"<p>Cast Time Stop without a {{spellslot}} — and when you do, it always stops time for the maximum.</p>"}
  ]};

ENTRIES["wd-astral"] = { cls:"warden", nav:"Astral Guardian", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Astral Guardian", tag:"Spatial distortion and celestial energy",
  flavor:"A Warden who transcends the earthly and draws on the infinite planes. The one bond whose interdiction catches flying creatures — and the one that can teleport friends out of trouble.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 77",
  mods:{
    primalinterdiction:"Dimensional Interdiction extends the difficult terrain to flying creatures, which closes the one gap every other Warden has.",
    teleport:"Astral Beacon moves a willing creature 60 feet as a bonus action, and Astral Rift at 14 connects two places outright — the only Warden that gives the party mobility.",
    endurancedice:"Astral Strike spends one to empower your next attack rather than to absorb damage.",
    resistance:"Dimensional Guardian gives it against force damage, plus advantage on saves against being teleported against your will.",
    speed:"Astral Projection at 17 leaves your body behind entirely."
  },
  features:[
    {lvl:"Level 1",name:"Astral Arms",body:"<p>A {{bonusaction}} forms up to two astral arms as natural melee weapons.</p>"},
    {lvl:"Level 1",name:"Sixth Sense",body:"<p>Detect extraplanar energies, including when you're being observed from elsewhere.</p>"},
    {lvl:"Level 3",name:"Dimensional Interdiction",body:"<p>{{primalinterdiction|Your interdiction}} affects flying creatures too.</p>"},
    {lvl:"Level 3",name:"Astral Strike",body:"<p>Spend an {{endurancedice|Endurance Die}} to empower your next attack with the astral arms.</p>"},
    {lvl:"Level 7",name:"Astral Beacon and Dimensional Guardian",body:"<p>A {{bonusaction}} {{teleport|teleports}} a willing creature within 60 feet. Plus {{resistance}} to force damage and {{advantage}} on saves against being teleported.</p>"},
    {lvl:"Level 14",name:"Astral Rift",body:"<p>Open a tear in reality connecting two places.</p>"},
    {lvl:"Level 17",name:"Astral Projection",body:"<p>Project your soul out of your body as an action, keeping your abilities and your {{primalinterdiction}}.</p>"}
  ]};

ENTRIES["wd-bonebinder"] = { cls:"warden", nav:"Bone Binder", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Bone Binder", tag:"The remains of life, put to one final service",
  flavor:"Solemn and grim, watching over the silence at the end of life. The only Warden who brings a companion — a construct of bone that grapples and shoves alongside you.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 79",
  mods:{
    primalinterdiction:"Shared with the construct, which effectively gives your party two areas to position rather than one.",
    mysticbulwark:"Macabre Mantle repairs your armour out of a corpse's bones, so damaged plating is a supply problem rather than a trip to a smith.",
    grappled:"The construct's main action is a grapple or shove check — control delivered by something that isn't you.",
    proficiencybonus:"The construct uses yours for its checks, so it scales with you instead of falling behind.",
    undead:"The bond works with remains, which is worth raising with your table before you choose it."
  },
  features:[
    {lvl:"Level 1",name:"Bone Construct",body:"<p>An action calls a grim construct of bones from the ground in an empty space. Its actions include a grapple or shove check against a creature within 5 feet, using your {{proficiencybonus}}.</p>"},
    {lvl:"Level 1",name:"Macabre Mantle",body:"<p>Repair damaged armour using the bones of a Medium or larger corpse.</p>"},
    {lvl:"Levels 3–17",name:"Grim Constructs",body:"<p>Later features strengthen the construct, share {{primalinterdiction|your interdiction}} with it, and extend what the bones can be bound into. See the page reference for the full progression.</p>"}
  ]};


/* ===== Bone Binder, brought to parity ===== */

ENTRIES["wd-bonebinder"] = { cls:"warden", nav:"Bone Binder", navSub:"Levels 1 · 3 · 7 · 14 · 17", kicker:"Warden bond",
  name:"Bone Binder",
  tag:"A second body made of other people's bones",
  flavor:"Shunned by some, but not evil by definition — a Bone Binder recycles the remains of the dead into one final service. You get a construct that fights beside you, armour forged from ribs, and a slow drift toward being hard to kill in the same way a corpse is.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 79",
  mods:{
    wardenbond:"The only bond that hands you a second creature. Most of your decisions are about where it stands.",
    primalinterdiction:"Your construct projects one of its own from level 3, so you cover two patches of ground at once — and at 17 both of them double in size.",
    endurancedice:"Bonded Endurance makes them shared: block for the construct and you gain the temporary hit points, block for yourself and the construct does.",
    mysticbulwark:"Macabre Mantle forges the armour it bonds with out of bone, and wearing it grants Intimidation proficiency.",
    undead:"The construct is Undead and the bond works with corpses, which is worth raising with your table before you choose it.",
    proficiencybonus:"The construct uses yours for its attack, its skills and its AC, so it scales with you rather than falling behind."
  },
  features:[
    {lvl:"Level 1",name:"Bone Construct",body:"<p>An action calls a Medium {{undead}} construct from the ground within 10 feet. It has AC 12 plus your {{proficiencybonus}}, {{hitpoints|hit points}} equal to five times your Warden level, {{darkvision}} 60 feet, {{resistance}} to piercing and necrotic, {{immunity}} to poison and psychic, and {{vulnerability}} to bludgeoning. Its Strength is your Strength or Wisdom. It shares your turn but only acts when you spend your action directing it to Slam, Grapple, Dash or Dodge — and once you have {{extraattack}}, directing it can replace one of your attacks. It also gains an innate spell at 1, 3, 5, 9, 13 and 17, each once per {{longrest}}, castable early for 1 plus the spell's level in {{endurancedice|Endurance Dice}}.</p>"},
    {lvl:"Level 1",name:"Macabre Mantle",body:"<p>Repair or forge armour from the bones of a Medium or larger corpse — any mundane armour worth up to 100 gold per Warden level, usable only by you. While wearing it, or armour you have bonded with {{mysticbulwark}}, you gain Intimidation proficiency.</p>"},
    {lvl:"Level 3",name:"Bone Emissary",body:"<p>Your construct projects its own {{primalinterdiction|Primal Interdiction}} out to 5 feet, and defends creatures inside it whenever you defend creatures inside yours.</p>"},
    {lvl:"Level 3",name:"Bonded Endurance",body:"<p>Spend {{endurancedice|Endurance Dice}} to reduce damage to the construct and you gain {{temporaryhp|temporary hit points}} equal to the roll. Block damage to yourself and the construct gains them instead.</p>"},
    {lvl:"Level 7",name:"Unearthed Titan",body:"<p>The construct can be summoned Large, can be commanded with a {{bonusaction}} on the turn you summon it, and its attacks count as magical.</p>"},
    {lvl:"Level 7",name:"Unliving Resilience",body:"<p>{{resistance}} to cold, necrotic or poison, {{advantage}} on saves against poison and disease, and you can go twice as long without breathing, eating or sleeping.</p>"},
    {lvl:"Level 14",name:"Grave Grip",body:"<p>An action raises skeletal hands across your interdiction — or your construct's. Large or smaller creatures make a Dexterity {{savingthrow|save}} or are {{restrained}} by a hand with AC 13 and 13 hit points, taking 3d6 necrotic at the end of each turn they remain held. Once per {{shortrest}}.</p>"},
    {lvl:"Level 17",name:"Death's Domain",body:"<p>A {{bonusaction}} projects your domain for a minute: your {{primalinterdiction|interdiction}} doubles in range, an ally dropping to 0 {{hitpoints|hit points}} inside it can be stabilised with your {{reaction}} at any distance, and every skeletal thing you have made — the construct, Grave Grip's hands, animated skeletons — gains {{resistance}} to all damage inside it. Once per {{longrest}}.</p>"}
  ]};

/* ===== Warlord, brought to parity ===== */

ENTRIES["wr-core"] = { cls:"warlord", nav:"Core features", navSub:"The class itself", kicker:"Warlord",
  name:"Core Class Features",
  tag:"No spell list, and most of your output lands on other people's turns",
  flavor:"Warlords don't control their allies — they polish what those allies can already do and open opportunities for them to shine. One of the easier homebrew classes to pick up, and one of the rarer things to want.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 84–87",
  mods:{},
  features:[
    {lvl:"Level 1",name:"Warlord Specialization",body:"<p>Your {{warlordpresence}} — the choice that shapes everything else, and it arrives at level 1 rather than 3.</p>"},
    {lvl:"Level 1",name:"Battlefield Presence",body:"<p>{{battlefieldpresence}}. Replacing an attack with somebody else's attack is the whole class in one sentence.</p>"},
    {lvl:"Level 2",name:"Leadership Dice",body:"<p>{{leadershipdice}} — one spendable per turn at first, two at 6, three at 11, four at 17. The die grows from d6 to d12 across the twenty levels.</p>"},
    {lvl:"Level 2",name:"Rallying Mark",body:"<p>{{rallyingmark}} — a {{bonusaction}} marking a target within 60 feet, so whoever hits it next is paid for your die.</p>"},
    {lvl:"Level 2",name:"Urgent Orders",body:"<p>{{urgentorders}} — up to 30 feet of free movement plus {{temporaryhp}}, spent on an ally's {{reaction}} rather than on your turn.</p>"},
    {lvl:"Level 3",name:"Warlord's Expertise",body:"<p>{{expertise}} in Investigation, Insight, Intimidation or Persuasion, or plain proficiency if you did not have it.</p>"},
    {lvl:"Level 2",name:"Helpful Word",body:"<p>{{helpfulword}} — the Help action at 30 feet instead of 5, for a die and a {{bonusaction}}.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}} — which also means two chances to convert an attack into {{battlefieldpresence|somebody else's}}.</p>"},
    {lvl:"Level 6",name:"Prepare for Battle",body:"<p>Spend a minute and any number of {{leadershipdice|Leadership Dice}} to give five creatures {{temporaryhp|temporary hit points}} that last until a rest — and let them spend that many Hit Dice as though on a {{shortrest}}.</p>"},
    {lvl:"Level 13",name:"Warlord's Intuition",body:"<p>Before an {{abilitycheck}} you are proficient in, decide the d20 equals your Warlord level rather than rolling it. Once per {{longrest}}.</p>"},
    {lvl:"Level 14",name:"Shift the Field",body:"<p>An action and one die moves five allies who can see or hear you up to half their {{speed}}, with no {{opportunityattack|opportunity attacks}}.</p>"},
    {lvl:"Level 17",name:"Unbreakable Will",body:"<p>{{immunity}} to {{frightened}} and {{charmed}}.</p>"},
    {lvl:"Level 20",name:"Tireless Leader",body:"<p>Roll d4s instead of spending {{leadershipdice|Leadership Dice}} for {{rallyingmark|Rallying Mark}}, {{urgentorders|Urgent Orders}}, {{helpfulword|Helpful Word}} or Prepare for Battle — your floor stops being zero.</p>"}
  ]};

ENTRIES["wr-commander"] = { cls:"warlord", nav:"Commander's Presence", navSub:"Levels 1 · 3 · 7 · 9 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Commander's Presence",
  tag:"A steady hand and a steadier head",
  flavor:"The iconic Warlord — a trusted sergeant, a weary veteran, or someone with an uncommon amount of common sense and a keen eye for how a fight is going. Less flashy than the other presences, which also means less likely to get skewered. Wisdom-keyed, and pointed at keeping people upright.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 87",
  mods:{
    rallyingmark:"Boost Morale at 9 lets a reaction and one die echo the healing onto a second creature within 60 feet of the attacker.",
    urgentorders:"Coordinated Movements at 9 — every extra die you spend adds another creature to the order.",
    helpfulword:"Free from level 3 when you are within 5 feet, and from 9 you can add a die after the roll but before the outcome is revealed.",
    leadershipdice:"Mostly spent on other people's survival: On Your Feet! picks an ally up off the floor and stands them back up.",
    savingthrow:"Bulwark at 15 hands your advantage to everyone: if you pass a shared save, allies within 30 feet roll theirs with advantage."
  },
  features:[
    {lvl:"Level 1",name:"Martial Proficiency",body:"<p>Heavy armour, shields and martial weapons.</p>"},
    {lvl:"Level 1",name:"Form Up!",body:"<p>When you roll {{initiative}} and are not surprised, any number of friendly creatures within 30 feet move five times your Wisdom modifier in feet, before anyone has acted.</p>"},
    {lvl:"Level 3",name:"Martial Advantage",body:"<p>{{helpfulword|Helpful Word}} costs no die while you are within 5 feet of the creature you are helping — and you can spend dice to put {{rallyingmark|Rallying Mark}} on their target in the same {{bonusaction}}.</p>"},
    {lvl:"Level 7",name:"On Your Feet!",body:"<p>A {{bonusaction}} and one die heals an ally within 5 feet. If they are at 0 {{hitpoints}} add your Wisdom modifier, and if they are {{prone}} they stand for free.</p>"},
    {lvl:"Level 9",name:"Empowered Orders",body:"<p><b>Boost Morale.</b> When someone heals from {{rallyingmark|Rallying Mark}}, a {{reaction}} and one die heals a second creature within 60 feet for the same amount. <b>Coordinated Movements.</b> Extra dice on {{urgentorders|Urgent Orders}} add extra targets. <b>Expert Instructions.</b> A {{reaction}} and one die adds to a {{helpfulword|helped}} ally's roll after it lands but before the result is read.</p>"},
    {lvl:"Level 11",name:"Keen Pointer",body:"<p>Once per turn, 2d6 extra damage to a creature standing within 5 feet of an ally who is not {{incapacitated}}.</p>"},
    {lvl:"Level 15",name:"Bulwark",body:"<p>When you and any number of allies within 30 feet face the same {{savingthrow|save}}, your success gives all of them {{advantage}} on theirs.</p>"},
    {lvl:"Level 18",name:"No One Left Behind!",body:"<p>On Your Feet! can begin with a run: move your {{speed}} to reach them, with {{resistance}} to all damage on the way, and every {{opportunityattack}} taken against you adds 1d8 to the healing.</p>"}
  ]};

ENTRIES["wr-chieftain"] = { cls:"warlord", nav:"Chieftain's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Chieftain's Presence",
  tag:"Rule by the sheer force of your personality",
  flavor:"A booming voice and a fearless attitude — it is easy to believe your band is infallible while the chieftain is still standing. They need not literally rule anything, but they walk like someone who could. Charisma-keyed, and the most aggressive of the presences.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 88",
  mods:{
    temporaryhp:"Warcry is your engine — it hands out temporary hit points to the group, and from 7 those points can be spent as damage.",
    leadershipdice:"Spending one is its own reward: Savage Momentum gives advantage on your next attack every time you do.",
    advantage:"Savage Momentum means you have it on your own attacks almost constantly, so long as you keep spending.",
    frightened:"Booming Shout at 15 bolts fear onto the Warcry — a Wisdom save or frightened until the end of their turn.",
    battlefieldpresence:"Wolfpack Tactics adds 1d4 to a granted attack against a creature you have already bloodied this turn."
  },
  features:[
    {lvl:"Level 1",name:"Chieftain's Proficiency",body:"<p>Shields, martial weapons and Intimidation, or another skill if you already had it.</p>"},
    {lvl:"Level 1",name:"Wolfpack Rush",body:"<p>The first time an ally moves after {{initiative}}, it drags willing creatures within 20 feet of you along with it — up to your Charisma modifier of them, half their {{speed}}, staying within 20 feet of you.</p>"},
    {lvl:"Level 3",name:"Warcry",body:"<p>An action, or in place of an attack: spend dice and you and friendly creatures within 20 feet gain {{temporaryhp|temporary hit points}} equal to the roll plus your Charisma modifier. Then take a {{bonusaction}} weapon attack, at {{disadvantage}} unless the weapon is light.</p>"},
    {lvl:"Level 3",name:"Savage Momentum",body:"<p>Every {{leadershipdice|Leadership Die}} you spend gives {{advantage}} on your next attack roll this turn.</p>"},
    {lvl:"Level 7",name:"Reckless Assault",body:"<p>Anyone carrying {{temporaryhp|temporary hit points}} from your features can burn them on a hit, adding half the sacrificed total to their damage.</p>"},
    {lvl:"Level 11",name:"Wolfpack Tactics",body:"<p>1d12 extra on the first creature you hit that an ally has damaged since your last turn — and 1d4 extra on the first granted attack against a creature you have already hurt this turn.</p>"},
    {lvl:"Level 15",name:"Booming Shout",body:"<p>Warcry can now {{frightened|frighten}} everyone in range on a failed Wisdom {{savingthrow|save}}, once per {{shortrest}}. The range of Warcry, {{rallyingmark|Rallying Mark}}, {{urgentorders|Urgent Orders}} and {{helpfulword|Helpful Word}} doubles permanently.</p>"},
    {lvl:"Level 18",name:"Bloody Victory",body:"<p>When you or an ally drops an enemy that has hurt you, a {{reaction}} unleashes a free Warcry using a d12 instead of your die. Charisma modifier uses per {{longrest}}.</p>"}
  ]};

ENTRIES["wr-noble"] = { cls:"warlord", nav:"Noble's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Noble's Presence",
  tag:"A shining beacon of the thing everyone is fighting for",
  flavor:"Not necessarily born noble, though many are. This is the Warlord who drives retainers and companions to heights they could not reach alone — and the one that leans hardest on having someone else swing the sword. Charisma-keyed, with a thin skim of divine magic.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 90",
  mods:{
    leadershipdice:"You get more of them than any other presence — an extra die at 3, 9 and 15 — and they double as spell fuel for command, bless and heroism.",
    battlefieldpresence:"Inspiring Leader lets a weak ally borrow your proficiency bonus plus Charisma for the first granted attack of their turn, so hirelings hit like you do.",
    rallyingmark:"Charismatic Leadership adds your Charisma modifier to its damage bonus.",
    urgentorders:"Charismatic Leadership adds your Charisma to the temporary hit points, and Imperative Order at 7 lets a target attack with its reaction instead of moving — or do both for 3 dice.",
    armorclass:"Divine Right adds up to 2 from Charisma while you are out of heavy armour and carrying no shield."
  },
  features:[
    {lvl:"Level 1",name:"Destined Leader",body:"<p>Rapiers, longswords and Persuasion — plus an extra {{leadershipdice|Leadership Die}} at 3rd, 9th and 15th level.</p>"},
    {lvl:"Level 1",name:"Call to Arms",body:"<p>On {{initiative}}, your Charisma modifier in allies within 60 feet gain {{advantage}} on their first attack roll.</p>"},
    {lvl:"Level 1",name:"Inspiring Leader",body:"<p>An ally weaker than you — {{challengerating|CR}} below half your level, or fewer class levels — can use your {{proficiencybonus}} plus Charisma for the first attack you grant them each turn.</p>"},
    {lvl:"Level 3",name:"Divine Right",body:"<p>Spend {{leadershipdice|Leadership Dice}} to cast command at a level equal to the dice spent, at a {{spellsavedc|save DC}} of 8 plus Charisma plus proficiency. Also adds up to 2 to your {{armorclass}} out of heavy armour.</p>"},
    {lvl:"Level 3",name:"Charismatic Leadership",body:"<p>Charisma is added to {{rallyingmark|Rallying Mark}}'s damage, {{urgentorders|Urgent Orders}}' {{temporaryhp|temporary hit points}} and the attack roll from {{helpfulword|Helpful Word}}.</p>"},
    {lvl:"Level 7",name:"Words of Conviction",body:"<p>Spend dice to cast bless or heroism without materials, at a level equal to the dice spent.</p>"},
    {lvl:"Level 7",name:"Imperative Order",body:"<p>Two or more dice on {{urgentorders|Urgent Orders}} lets the target attack with its {{reaction}} instead of moving. Three or more and it does both.</p>"},
    {lvl:"Level 11",name:"Inspired Zeal",body:"<p>Creatures of your choice within 30 feet add 1d4 radiant to every weapon hit.</p>"},
    {lvl:"Level 15",name:"Untouchable Presence",body:"<p>You are permanently under sanctuary. Breaking it costs you one turn — it returns at the start of your next.</p>"},
    {lvl:"Level 18",name:"Grand Decree",body:"<p>Cast command for free on every creature of your choice in range, once per {{longrest}}.</p>"}
  ]};

ENTRIES["wr-packleader"] = { cls:"warlord", nav:"Packleader's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Packleader's Presence",
  tag:"Win the fight before it becomes a battle",
  flavor:"Scout, prepare, stack the odds. A Packleader does not fight fair and does not fight until they have already won — bending the terrain itself to hide allies and stymie foes. Wisdom-keyed, and the only presence with a real druid spell list attached.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 91",
  mods:{
    initiative:"Anyone within 30 feet who rolls it while hidden adds your Wisdom modifier, so a prepared ambush starts with the whole party acting first.",
    advantage:"Ghosts of the Wild lets a die grant it on a granted attack — free if the target is under pass without trace.",
    leadershipdice:"Doubles as a spell battery: fog cloud, snare, pass without trace, and at 18 any five druid spells of 4th level or lower.",
    battlefieldpresence:"Fleeting Strikers lets a granted attack become a Dash instead, which is how a Packleader repositions the whole party.",
    difficultterrain:"Mold earth and the rest of the kit means you are usually making some of it, and standing behind the part you made."
  },
  features:[
    {lvl:"Level 1",name:"Tools of the Wild",body:"<p>Martial weapons, Survival, and a Herbalism or Poisoner's Kit.</p>"},
    {lvl:"Level 1",name:"Concealed Approach",body:"<p>Given a minute, add your Wisdom modifier to Stealth for yourself and five allies. Anyone within 30 feet who rolls {{initiative}} while hidden adds it to that too.</p>"},
    {lvl:"Level 3",name:"Nature's Gift",body:"<p>Mold earth plus one more druid {{cantrip}}. One {{leadershipdice|Leadership Die}} casts fog cloud or snare — snare's casting time drops to an action — plus one more 1st-level druid spell of your choosing. Wisdom is the spellcasting modifier.</p>"},
    {lvl:"Level 7",name:"Shroud of Nature",body:"<p>Whenever one of your spells obscures you or an ally, the obscured creature can Hide with its {{reaction}}.</p>"},
    {lvl:"Level 7",name:"Trackless Trails",body:"<p>Two dice cast pass without trace with no materials.</p>"},
    {lvl:"Level 11",name:"Fleeting Strikers",body:"<p>1d10 extra on your first attack if you have moved since your last turn or are obscured from the target — and a granted attack can become a Dash instead.</p>"},
    {lvl:"Level 15",name:"Ghosts of the Wild",body:"<p>Under pass without trace, a die lets you Hide at the end of your turn without spending an action. A die also shrouds a creature you grant an attack to, giving it {{advantage}} — free if it is already under pass without trace.</p>"},
    {lvl:"Level 18",name:"Warlord of the Wilds",body:"<p>Five druid spells of 4th level or lower, cast for dice equal to their level and swapped on each {{longrest}}. Any turn you cast this way, one weapon attack comes free as a {{bonusaction}}.</p>"}
  ]};

ENTRIES["wr-paragon"] = { cls:"warlord", nav:"Paragon's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Paragon's Presence",
  tag:"Fight at the front and let the legion follow",
  flavor:"A Paragon before their army is a dauntless foe, and an army behind their Paragon is an unstoppable legion. This is the presence that stands in the line rather than behind it — the one that keeps hitting and keeps refusing to fall over. Charisma-keyed.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 92",
  mods:{
    initiative:"Lead the Charge adds your Charisma to it, and hands you temporary hit points the moment it is rolled.",
    temporaryhp:"Charisma plus proficiency, every single combat, before anyone has swung.",
    fightingstyle:"You get a real one at 3 — Defense, Dueling, Great Weapon Fighting or Two-Weapon Fighting.",
    rallyingmark:"Heroic Strike applies it as part of a melee attack once per turn, and the dice spent are added to that attack's damage as well.",
    savingthrow:"Dauntless Resolve at 15 turns one failure a day into a success."
  },
  features:[
    {lvl:"Level 1",name:"Martial Proficiency",body:"<p>Heavy armour, shields and martial weapons.</p>"},
    {lvl:"Level 1",name:"Lead the Charge",body:"<p>Add your Charisma modifier to {{initiative}}, and gain {{temporaryhp|temporary hit points}} equal to Charisma plus your {{proficiencybonus}} when you roll it.</p>"},
    {lvl:"Level 3",name:"Fighting Style",body:"<p>A {{fightingstyle}}: Defense, Dueling, Great Weapon Fighting or Two-Weapon Fighting.</p>"},
    {lvl:"Level 3",name:"Heroic Strike",body:"<p>Once per turn on the Attack action, spend dice to apply {{rallyingmark|Rallying Mark}} as part of a melee attack — and add those dice to the attack's own damage roll.</p>"},
    {lvl:"Level 7",name:"Stand Defiant",body:"<p>Dropping to 0 {{hitpoints}} instead leaves you at your Charisma modifier, and you can spend one die per ally within 60 feet to heal further. Once per {{shortrest}}.</p>"},
    {lvl:"Level 11",name:"Inspired Warrior",body:"<p>Once per turn, when an ally within 30 feet takes or deals damage, bank a d4 — up to your Charisma modifier of them. Spend any number on your damage until the end of your next turn.</p>"},
    {lvl:"Level 15",name:"Dauntless Resolve",body:"<p>Turn one failed {{savingthrow|saving throw}} into a success, once per {{longrest}}.</p>"},
    {lvl:"Level 18",name:"Invincible Legion",body:"<p>An ally within 60 feet reduced to 0 {{hitpoints}}, but not killed outright, drops to 1 instead if they can see or hear you. Once per {{longrest}} each.</p>"}
  ]};

ENTRIES["wr-tactician"] = { cls:"warlord", nav:"Tactician's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Tactician's Presence",
  tag:"Read the enemy, then take their options away",
  flavor:"A Tactician would rather not be close enough to the fight to count as a combatant, having preferred to win it in advance — but underestimating them once the swords are out is a mistake. Intelligence-keyed, and the most decision-dense presence on the list.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 94",
  mods:{
    initiative:"Battle Plans adds your Intelligence — and then lets you hand the roll to a willing ally within 60 feet after seeing it.",
    urgentorders:"Control the Field bolts three riders onto it at 7, and at 15 the target can Search, Hide, Dodge or Use an Object with its reaction instead of moving.",
    helpfulword:"Expose Weakness makes it free, and Tactical Flexibility lets it be an action or a bonus action, so you can spend two of them in a turn.",
    savingthrow:"Inscrutable Mind gives Intelligence save proficiency and lets a reaction plus one die add to any mental save you make.",
    disadvantage:"Determine Attack imposes it on the enemy's next attack, and it lands on a contested check rather than a save they might pass."
  },
  features:[
    {lvl:"Level 1",name:"Tactician's Cunning",body:"<p>History and Investigation — and given a minute, any {{abilitycheck}} with a skill you are proficient in treats a d20 of 4 or lower as a 5.</p>"},
    {lvl:"Level 1",name:"Battle Plans",body:"<p>Add your Intelligence to {{initiative}}, then swap that roll with a willing ally within 60 feet after you have seen it.</p>"},
    {lvl:"Level 3",name:"Tactical Insight",body:"<p>A {{bonusaction}} and an Intelligence (Investigation) check against a creature's Charisma (Deception) within 60 feet. On a success pick one: <b>Determine Attack</b> ({{disadvantage}} on its next attack), <b>Predict Movement</b> (−10 feet of {{speed}} if it changes plan), <b>Outwit Response</b> (no {{reaction}} until the end of its next turn) or <b>Expose Weakness</b> (a free {{helpfulword|Helpful Word}} granting {{advantage}} against it).</p>"},
    {lvl:"Level 3",name:"Tactical Flexibility",body:"<p>Tactical Insight, {{rallyingmark|Rallying Mark}}, {{helpfulword|Helpful Word}} and {{urgentorders|Urgent Orders}} can each be an action or a {{bonusaction}}.</p>"},
    {lvl:"Level 7",name:"Inscrutable Mind",body:"<p>Intelligence {{savingthrow|save}} proficiency, and a {{reaction}} plus one die adds to any Wisdom, Intelligence or Charisma save you make.</p>"},
    {lvl:"Level 7",name:"Control the Field",body:"<p>Anything that moves your allies gains three riders: <b>Deceptive Movement</b> (shove an enemy 5 feet on a failed Intelligence save, provoking {{opportunityattack|opportunity attacks}}), <b>Flanking Maneuvers</b> ({{advantage}} for the first ally to attack a creature you have bracketed) and <b>Coordinated Transitions</b> (allies pass through each other freely).</p>"},
    {lvl:"Level 11",name:"Tactical Strike",body:"<p>After a successful Tactical Insight, the next damage roll you or an ally makes against that creature gains 2d6.</p>"},
    {lvl:"Level 15",name:"Advanced Orders",body:"<p>{{urgentorders|Urgent Orders}} targets can Use an Object, Search, Hide or Dodge with their {{reaction}} instead of moving.</p>"},
    {lvl:"Level 18",name:"Unstoppable Schemes",body:"<p>Allies you move can pass straight through hostile creatures' spaces, so long as they do not stop there.</p>"},
    {lvl:"Level 18",name:"Multilayered Tactics",body:"<p>A successful Tactical Insight grants two of its effects instead of one.</p>"}
  ]};

ENTRIES["wr-dancer"] = { cls:"warlord", nav:"Dancer's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Dancer's Presence",
  tag:"Wind through the fight and never quite be where the blow lands",
  flavor:"Prancing jesters or graceful enchanters, captivating to everyone they meet, for good or ill. They look out of place in danger right up until they are the last one standing. The only presence built around Dodging as an offensive action, with an unarmoured defence to match.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 95",
  mods:{
    armorclass:"Dancer's Grace gives 10 plus Dexterity plus Charisma unarmoured, so both of your good stats feed it.",
    initiative:"Graceful Entrance adds Charisma, then moves you half your speed and hands temporary hit points to whoever you finish beside.",
    battlefieldpresence:"Dancer's Dodge is the trick: take the Dodge action and you can still spend dice to grant attacks, so defending costs you no offence.",
    leadershipdice:"Battlefield Grace refunds one every round an attack misses you, which on a Dodging Dancer is most rounds.",
    evasion:"Arrives at 15, the same as a Rogue's."
  },
  features:[
    {lvl:"Level 1",name:"Dancer's Grace",body:"<p>Performance proficiency, or {{expertise}} if you had it. Unarmoured and shieldless, your {{armorclass}} is 10 plus Dexterity plus Charisma.</p>"},
    {lvl:"Level 1",name:"Graceful Entrance",body:"<p>Charisma added to {{initiative}}. When you roll it unsurprised, move half your {{speed}} — you and anyone you end within 5 feet of gain Charisma {{temporaryhp|temporary hit points}}.</p>"},
    {lvl:"Level 3",name:"Bewildering Steps: Distract",body:"<p>A {{bonusaction}} marks a creature within 30 feet. Until your next turn, if it attacks anyone but you while you are in its reach, roll a {{leadershipdice|Leadership Die}} and subtract it from the attack.</p>"},
    {lvl:"Level 3",name:"Dancer's Dodge",body:"<p>Dodging while unarmoured gives you Distract, {{helpfulword|Helpful Word}}, {{urgentorders|Urgent Orders}} or {{rallyingmark|Rallying Mark}} for free, as though one die had been spent. And you can still spend dice to grant attacks with {{battlefieldpresence|Battlefield Presence}} while Dodging.</p>"},
    {lvl:"Level 7",name:"Battlefield Grace",body:"<p>When an attack misses you, regain a spent die and move 5 feet. Once per round.</p>"},
    {lvl:"Level 7",name:"Whirling Thorns",body:"<p>A {{bonusaction}} attack with a light melee weapon, plus one more per die spent — each against a different target.</p>"},
    {lvl:"Level 11",name:"Furious Tempo",body:"<p>Charisma added to the damage of every attack you make or grant.</p>"},
    {lvl:"Level 15",name:"Evasion",body:"<p>{{evasion}}.</p>"},
    {lvl:"Level 18",name:"Elegant Exchange",body:"<p>A {{reaction}} shifts a willing creature within 15 feet five feet aside and makes you the target of the attack, spell or effect instead.</p>"}
  ]};

ENTRIES["wr-dreadlord"] = { cls:"warlord", nav:"Dreadlord's Presence", navSub:"Levels 1 · 3 · 7 · 11 · 15 · 18", kicker:"Warlord presence",
  name:"Dreadlord's Presence",
  tag:"Undermine and terrify instead of inspiring",
  flavor:"The inversion of the class. Where other Warlords lift their allies, a Dreadlord weaponises presence against the enemy — crushing their will to fight and leaving them easy prey. Not necessarily evil, but always someone who can put dread into a room.",
  src:"Kibbles' Compendium of Legends and Legacies, p. 96",
  mods:{
    leadershipdice:"Every die you spend hands you a Demoralization Die of the same size, so your support spending becomes a second, reactive pool.",
    reaction:"The whole presence runs on it — Demoralization Dice are only ever spent as reactions, which means you are doing something on almost every enemy turn.",
    frightened:"Your win condition. Punish the Weak upgrades 1d8 to 1d12 against a frightened target, and Dreadful Terror at 18 escalates fear into blindness or paralysis.",
    disadvantage:"Unapproachable imposes it on the enemy's opening attack, before anyone has acted.",
    concentration:"Iron Mask uses it to suppress fear on yourself — unbreakable, but it locks you out of concentrating on a spell."
  },
  features:[
    {lvl:"Level 1",name:"Dreadlord Proficiency",body:"<p>Heavy armour and Intimidation.</p>"},
    {lvl:"Level 1",name:"Unapproachable",body:"<p>After {{initiative}}, the first attack made by the first hostile creature against an ally within 30 feet has {{disadvantage}}.</p>"},
    {lvl:"Level 3",name:"Demoralization Dice",body:"<p>Every {{leadershipdice|Leadership Die}} spent grants a Demoralization Die of the same size, lasting until a minute passes without one being earned or spent. Spend them as {{reaction|reactions}}: <b>Make it Excruciating</b> (extra damage when an ally's weapon attack lands within 30 feet), <b>Don't Touch That</b> (reduce an attack roll against an ally) or <b>Are You Sure?</b> (Wisdom {{savingthrow|save}} or the creature retreats 10 feet per die spent).</p>"},
    {lvl:"Level 7",name:"Supernatural Dread",body:"<p>Spend dice to cast frighten at a level equal to the dice. Or spend 3, even over your per-turn limit, to cast fear once per {{longrest}}.</p>"},
    {lvl:"Level 7",name:"Iron Mask",body:"<p>{{disadvantage}} on Insight checks against you, and you can suppress {{frightened}} on yourself with {{concentration}} that cannot be broken — but not while concentrating on a spell.</p>"},
    {lvl:"Level 11",name:"Punish the Weak",body:"<p>Mark a creature within 60 feet with no action. Once per turn it takes 1d8 extra damage, or 1d12 if it is {{frightened}} of you. The mark lasts until it dies, flees 60 feet, or you mark someone else.</p>"},
    {lvl:"Level 15",name:"Instinctive Flinch",body:"<p>Creatures that pass a Wisdom {{savingthrow|save}} against your fear effects still take {{disadvantage}} on their next attack.</p>"},
    {lvl:"Level 15",name:"Expanded Dominion",body:"<p>Demoralization Dice ranges double, to 60, 60 and 10 feet.</p>"},
    {lvl:"Level 18",name:"Dreadful Terror",body:"<p>When a creature becomes {{frightened}} of you, spend Demoralization Dice for free: <b>Panicked Terror</b> (it flees half its {{speed}} with its {{reaction}}), <b>Blind Terror</b> (2 dice, blinded until your next turn) or <b>Paralyzing Terror</b> (3 dice, paralyzed until your next turn).</p>"}
  ]};


/* ===== Occultist traditions, brought to parity ===== */

ENTRIES["oc-witch"] = { cls:"occultist", nav:"Tradition of the Witch", navSub:"Levels 1 · 3 · 6 · 14", kicker:"Occultist tradition",
  name:"Tradition of the Witch",
  tag:"A coven, a grudge, and a familiar that talks back",
  flavor:"Most often the person villagers find scary and weird — and at the heart of the stories, a sliver of truth. Some live openly; some are the last person anyone would suspect. Defined by utilitarian magic, hexes that make crossing them unwise, and a genuinely clever familiar.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 15–20",
  mods:{
    familiar:"Yours acts on your {{initiative}} from level 1, gets a real mind and speech at 3, can take damage for you or hand its share to you, and fetches material components so your hands stay free.",
    coven:"A second choice layered on the tradition — Black for pain and curses, White for binding and healing, Green for fey trickery — each granting bonus spells at 1, 3, 5, 7 and 9 and a different familiar power.",
    occultrite:"The Witch list is the classic material: flying brooms, animated hair, potion brewing, alongside the control options.",
    concentration:"Master of Curses at 14 breaks the usual rule — a 1st-level Hex or Curse can run alongside one other concentration spell.",
    spellsavedc:"Witch's Touch lets you bolt a rider onto any touch-range spell, so your save DC starts carrying two effects instead of one."
  },
  features:[
    {lvl:"Level 1",name:"Witch's Magic",body:"<p>You learn find familiar, and your {{familiar}} acts on your own {{initiative}} rather than trailing behind it. Two extra {{cantrip|cantrips}} from the Occultist list on top.</p>"},
    {lvl:"Level 1",name:"Coven",body:"<p>Join the <b>Black Coven</b> (pain, curses and an eventual agonising death — your familiar can subtract 1d4 plus half your level from an attack roll), the <b>White Coven</b> (binding and healing — your familiar carries {{temporaryhp|temporary hit points}} it can hand out to whoever needs them) or the <b>Green Coven</b> (hag-rooted fey magic — your familiar gets illusory duplicates that soak hits for it). Each also grants free spells at levels 1, 3, 5, 7 and 9.</p>"},
    {lvl:"Level 3",name:"Familiar Bond",body:"<p>Your {{familiar}} gains Intelligence, Wisdom and Charisma of at least 10 and every language you speak. You can take its damage for it, and it can hold your material components — including touching a target to supply a curse's component.</p>"},
    {lvl:"Level 6",name:"Witch's Touch",body:"<p>Any touch-range spell gains a rider: {{temporaryhp|temporary hit points}} equal to your Wisdom, extra damage equal to your Wisdom, or 1d4 added to or subtracted from the target's next roll. You can drag a longer-ranged spell down to touch to qualify — which also removes a curse spell's material component — or spend an action just touching someone for the rider alone.</p>"},
    {lvl:"Level 14",name:"Master of Curses",body:"<p>Curse spells never need their material component again, even at range. And a 1st-level Hex or Curse stops fighting with {{concentration}}, letting you hold two spells so long as one of them is that.</p>"}
  ]};

ENTRIES["oc-hedgemage"] = { cls:"occultist", nav:"Tradition of the Hedge Mage", navSub:"Levels 1 · 3 · 6 · 14", kicker:"Occultist tradition",
  name:"Tradition of the Hedge Mage",
  tag:"Self-taught, and never told what was supposed to be impossible",
  flavor:"A loose collection of magic users who worked it out as they went, borrowing from everywhere. Frowned on by more studied routes, and undeniably practical — they excel at cantrips and simple magic, and at stealing bits of other people's traditions.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 21–24",
  mods:{
    cantrip:"The only tradition where they are a plan rather than a fallback: the whole druid and wizard lists open up, your Wisdom is added to their damage at 6, and at 14 you can cast one as a bonus action.",
    occultrite:"Rites here borrow from other traditions and other classes — a Sorcerer metamagic, a wizard spell, another tradition's rite — which is the tradition's whole identity.",
    ritual:"Improvised Ritual lets you cast ritual-tagged spells you do not know at all, from any list, provided you have them written down somewhere.",
    metamagic:"The Manipulate Magic rite buys you one option outright, usable once per {{longrest}} or paid for with a {{spellslot}}.",
    bonusaction:"Cantrip Mastery at 14 turns an action cantrip into one, so a turn can hold two cantrips instead of one."
  },
  features:[
    {lvl:"Level 1",name:"Practical Skills",body:"<p>One skill from Animal Handling, Arcana, Medicine, Nature or Survival. Every wizard and druid {{cantrip}} joins your list, plus thaumaturgy, and you learn one extra {{cantrip}} straight away.</p>"},
    {lvl:"Level 1",name:"The Way I Learned It",body:"<p>Every Occultist spell you learn can be permanently rewritten: swap its damage type among acid, cold, fire, lightning and poison; pull its range down to touch or push touch out to 10 feet; or trade one component type for another. You can learn the same spell twice with different choices.</p>"},
    {lvl:"Level 1",name:"Casting Style",body:"<p>One of three: <b>Reliable Casting</b> (reroll 1s and 2s on cantrip damage), <b>Habitual Casting</b> (a {{concentration}} cantrip runs free for rounds equal to your level) or <b>Tactical Casting</b> (a readied cantrip needs no concentration).</p>"},
    {lvl:"Level 3",name:"Personalized Path",body:"<p>One extra spell and one extra {{occultrite|occult rite}}, neither counting against your totals.</p>"},
    {lvl:"Level 3",name:"Improvised Ritual",body:"<p>Cast any {{ritual}}-tagged spell you do not know, from any list, at up to a third of your Occultist level — it takes ritual time and still burns a {{spellslot}}, and off-list spells must be written down somewhere you can read them.</p>"},
    {lvl:"Level 6",name:"Stolen Techniques",body:"<p>A free 1st- or 2nd-level spell from the bard, cleric, druid or wizard list, plus a free {{occultrite|rite}} from any tradition — anything without a prerequisite.</p>"},
    {lvl:"Level 6",name:"Empowered Cantrips",body:"<p>Once per turn, add your Wisdom modifier to a {{cantrip}}'s damage.</p>"},
    {lvl:"Level 14",name:"Cantrip Mastery",body:"<p>An action-cost {{cantrip}} can be cast as a {{bonusaction}}, at 1st-level power. It does not dodge the bonus-action spell rule, so the pairing is two cantrips rather than a cantrip and a spell.</p>"}
  ]};

ENTRIES["oc-oracle"] = { cls:"occultist", nav:"Tradition of the Oracle", navSub:"Levels 1 · 3 · 6 · 14", kicker:"Occultist tradition",
  name:"Tradition of the Oracle",
  tag:"A piece of divine mystery, carried whether you wanted it or not",
  flavor:"Power from a connection to fate rather than service to a god. Oracles gain their abilities in thematic Mysteries — life or death, light or darkness, fire or nature — and unlock them further through Revelations. Great power, not meant for mortals to hold, and frequently a burden.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 24–29",
  mods:{
    occulttradition:"The most configurable of the six. Take the Mystery of Fire and you are a blaster, War and you are a half-martial, Life and you are the party's healer — and you take a second at 5 and a third at 11.",
    occultrite:"Revelations are Oracle-only rites that fire when you cast a spell, so your rite choices and your Mystery choices stack into two separate axes.",
    armorclass:"Fate Reading is your defence: a reaction adds your Wisdom to it until your next turn, including against the attack that triggered it.",
    temporaryhp:"Enlightened Understanding hands them to you every time a Revelation fires, which on a spell-per-turn Oracle is constant.",
    ritual:"Augury becomes at-will from level 3 — the only spell in the book you can cast infinitely — with the usual escalating unreliability."
  },
  features:[
    {lvl:"Level 1",name:"Divine Touch",body:"<p>The guidance and thaumaturgy {{cantrip|cantrips}}, plus a divination spell at each of levels 1, 3, 5, 7 and 9 — identify through to legend lore.</p>"},
    {lvl:"Level 1",name:"Mystery Unveiled",body:"<p>Choose a Mystery: Darkness, Death, Fire, Life, Light, Nature, Souls or War. Each grants free spells at 1, 3, 5, 7 and 9, and War also brings simple weapons, medium armour, shields and Wisdom-based weapon attacks. A second Mystery at 5, a third at 11.</p>"},
    {lvl:"Level 1",name:"Oracle's Curse (optional)",body:"<p>Take on a burden for an extra boon: <b>Blind</b> (permanently blinded, with the Oracle's Sight rite free) or <b>Frail</b> (d4 Hit Dice, but you recover spell slots on a {{shortrest}} once a day).</p>"},
    {lvl:"Level 3",name:"Fate Reading",body:"<p>When you are hit, a {{reaction}} adds your Wisdom modifier to your {{armorclass}} until your next turn — including against the triggering attack. {{proficiencybonus}} uses per {{longrest}}. You also learn augury and can cast it at will.</p>"},
    {lvl:"Level 3",name:"Revelations of Fate",body:"<p>Your Mysteries unlock Revelations — Oracle-only {{occultrite|rites}} triggered by casting a spell, one per spell.</p>"},
    {lvl:"Level 6",name:"Enlightened Understanding",body:"<p>Every Revelation you trigger gives {{temporaryhp|temporary hit points}} equal to your Wisdom — and a Revelation can now fire on any 1st-level-or-higher spell, even one that does not meet its requirements.</p>"},
    {lvl:"Level 14",name:"Master of Prophecy",body:"<p>Augury stays reliable for Wisdom-modifier castings a day. And you can issue a cryptic prophecy: name three future rolls and reserve a d4, d6 or d8 against each depending on how specific you were, to be spent when the prophecy comes true.</p>"}
  ]};

ENTRIES["oc-shaman"] = { cls:"occultist", nav:"Tradition of the Shaman", navSub:"Levels 1 · 3 · 6 · 14", kicker:"Occultist tradition",
  name:"Tradition of the Shaman",
  tag:"Bind a spirit, then stand in the thick of it",
  flavor:"Occultists who walk the paths of the spirits and bind them to their cause. Tough and powerful, usually found wreathed in primal power in the middle of the fight — the only tradition of the six that actually wants to be in melee.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 29–32",
  mods:{
    occulttradition:"The striker of the six. Wisdom replaces Dexterity for medium armour, you get Extra Attack, and the spirit is a second weapon you can send across the room.",
    extraattack:"Arrives at 6, which no other Occultist tradition offers — and either attack can be made by your manifested spirit instead of by you.",
    spellslot:"Slots double as fuel: spending one empowers the called spirit, adding damage to your weapon and to the spirit's own strikes.",
    occultrite:"Shaman rites empower you rather than debilitating others — elemental forms, fighting styles, detonating your spirit — the inverse of the rest of the class.",
    fightingstyle:"The Rite of Prowess buys one: Dueling, Great Weapon Fighting or Two-Weapon Fighting."
  },
  features:[
    {lvl:"Level 1",name:"Spiritual Warrior",body:"<p>Simple weapons, medium armour and shields, and your Wisdom stands in for Dexterity when calculating {{armorclass}}.</p>"},
    {lvl:"Level 1",name:"Call Spirit",body:"<p>A {{bonusaction}} calls a primal spirit of fire, cold or lightning, or an ancestral spirit of radiance or necrosis, for 10 minutes. While bonded, your melee weapon attacks deal an extra 1d4 of its type. Manifest it within 30 feet and it becomes a Medium spectral body: any attack you could make can instead be a melee spell attack from it for 1d4 plus your Wisdom, and a {{bonusaction}} moves it 30 feet. It cannot stray more than 60 feet from you.</p>"},
    {lvl:"Level 3",name:"Empowered Spirits",body:"<p>Spend a {{spellslot}} when calling a spirit to empower it, raising both the damage it adds to your weapon and the damage it deals when manifested.</p>"},
    {lvl:"Level 6",name:"Extra Attack",body:"<p>{{extraattack}} — and either attack can be made by the manifested spirit instead of by you.</p>"},
    {lvl:"Level 14",name:"Spiritual Empowerment",body:"<p>Casting a spell of 1st level or higher lets you make a weapon attack as a {{bonusaction}}, or send the manifested spirit to make it for you.</p>"}
  ]};

ENTRIES["oc-spiritualist"] = { cls:"occultist", nav:"Tradition of the Spiritualist", navSub:"Levels 1 · 3 · 6 · 14", kicker:"Occultist tradition",
  name:"Tradition of the Spiritualist",
  tag:"Subtle, pervasive, and hard to point at",
  flavor:"The most esoteric of the six. Spiritualists call forth totems and set malignant spirits on people, inexorably shifting the balance of a fight without ever looking like they did much. Mysterious, often reclusive, and colloquially — if inaccurately — called Witch Doctors.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 32–35",
  mods:{
    occulttradition:"Support and control by nature — a spread of small effects that compound, rather than one big one.",
    concentration:"Totems sit on the field on their own, so none of your battlefield control costs you the ability to hold a spell.",
    reaction:"Malignant Possession spends yours to subtract a spirit die from an enemy roll — after they roll, before the outcome is read.",
    occultrite:"Totems and hexes are mostly bought with rites here, so your rite choices really are the subclass.",
    difficultterrain:"The Binding Totem makes it in a 10-foot radius, and blocks teleportation in or out on a failed Charisma save."
  },
  features:[
    {lvl:"Level 1",name:"Mystical Medicine",body:"<p>Medicine proficiency and {{advantage}} on checks to work out what ails a creature. Plus Spiritualist spells at levels 1, 3, 5, 7 and 9.</p>"},
    {lvl:"Level 1",name:"Malignant Possession",body:"<p>Hit a creature, or land a spell on it, and a malignant spirit haunts it for a minute. Any attack, {{savingthrow|save}} or {{abilitycheck}} it makes can be cut by a d6 spirit die spent with your {{reaction}} — after the roll, before the outcome. The die grows to d8 at 5, d10 at 11 and d12 at 17. Once per {{shortrest}}.</p>"},
    {lvl:"Level 3",name:"Totem Binding",body:"<p>An action plants a totem within 15 feet. You know two, rising to five by 17 — <b>Agonizing</b> (necrotic to anyone nearby), <b>Binding</b> ({{difficultterrain}} and no teleporting), <b>Grasping</b> (binds a creature on creation) and more.</p>"},
    {lvl:"Level 3",name:"Totemic Technique",body:"<p>Pick one: <b>Dancing Totems</b> (they orbit you as Tiny objects instead of sitting still), <b>Sturdy Totems</b> ({{proficiencybonus}} to their AC and twice your level in hit points) or <b>Swift Totems</b> (place one as a {{bonusaction}}).</p>"},
    {lvl:"Level 6",name:"Empowered Totems",body:"<p>Any totem that rolls a die rolls one more — 1d6 becomes 2d6, and 3d6 at level 14.</p>"},
    {lvl:"Level 6",name:"Rotting Affliction",body:"<p>Every spirit die you spend on Malignant Possession also deals that much necrotic damage.</p>"},
    {lvl:"Level 14",name:"Grand Spirit Totem",body:"<p>A Medium grand totem within 30 feet, carrying five times your Wisdom in {{temporaryhp|temporary hit points}}. Anyone but you who starts a turn or steps within 20 feet makes a Charisma {{savingthrow|save}} or subtracts your Malignant Possession die from every roll they make while they stay inside it.</p>"}
  ]};

ENTRIES["oc-voidwatcher"] = { cls:"occultist", nav:"Tradition of the Voidwatcher", navSub:"Levels 1 · 3 · 6 · 14", kicker:"Occultist tradition",
  name:"Tradition of the Voidwatcher",
  tag:"A fallen Oracle, altered by one event",
  flavor:"Those who gazed into an infinite void and glimpsed something of unlimited power. A fragment stays embedded in their eyes and branded on their mind. Some are driven entirely insane — or, more troublingly, entirely sane.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 35–38",
  mods:{
    occulttradition:"Defined by your Conclusion — Annihilation, Madness or Tranquility — which is how you reacted to what you saw, and decides whether you are a blaster, a debuffer or a healer.",
    occultrite:"Void rites lean on psychic damage and on unsettling the people you use them against; the Chaotic Thesis rite lets you borrow the other two Conclusions' effects.",
    frightened:"Eye of the End opens with Intimidation and a reserved fate die, so unsettling people is a mechanic rather than flavour.",
    blindsight:"Overusing Void Gaze risks blinding you until you rest — you keep 10 feet of it while blinded, which is the tradition's built-in cost.",
    advantage:"Eye of the End grants it on your first Intimidation check against the target, and the Madness conclusion hands it to whoever attacks them next."
  },
  features:[
    {lvl:"Level 1",name:"Eye of the End",body:"<p>An action looks into a creature within 30 feet and sees its doom. You gain {{advantage}} on your first Intimidation check against it for a minute, and roll a d20 fate die held in reserve against its next {{savingthrow|save}} versus one of your spells.</p>"},
    {lvl:"Level 1",name:"Eschatological Conclusion",body:"<p>How you embraced the end: <b>Annihilation</b> (acid splash and decaying touch, plus destructive spells at 1, 3, 5, 7 and 9), <b>Madness</b> (message and minor illusion, plus fear and confusion magic) or <b>Tranquility</b> (a calmer list built on protection and mending). This choice keys everything that follows.</p>"},
    {lvl:"Level 3",name:"Void Gaze",body:"<p>A {{bonusaction}} unveils the void in your eyes for 10 minutes. Each turn, a {{bonusaction}} directs it at a creature within 60 feet: <b>Annihilation</b> makes a ranged spell attack for 1d8 force, <b>Madness</b> forces a Wisdom {{savingthrow|save}} for 1d4 psychic and gives the next attacker {{advantage}}, <b>Tranquility</b> grants 1d8 {{temporaryhp|temporary hit points}}. While it is active you see through darkness out to 60 feet and cannot be blinded. Wisdom-modifier uses — past that, a DC 10 Wisdom save or you go blind until you rest, keeping 10 feet of {{blindsight}}.</p>"},
    {lvl:"Level 6",name:"Empowered Gaze",body:"<p>Add your Wisdom modifier to the damage or {{temporaryhp|temporary hit points}} of every Void Gaze effect.</p>"},
    {lvl:"Level 14",name:"They Watch",body:"<p>Void Gaze can also leave up to three spectral eyes at points within 60 feet, each lasting a minute, each able to direct the gaze in your place.</p>"}
  ]};


/* ===== Inventor specializations, brought to parity ===== */

ENTRIES["in-gadgetsmith"] = { cls:"inventor", nav:"Gadgetsmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Gadgetsmith",
  tag:"Quantity is at least as good as quality",
  flavor:"An Inventor whose curiosity ran rampant. Where others perfect one pursuit for a career, a Gadgetsmith carries a dozen half-mad contraptions and is never without another trick. Quick-footed, quicker-witted, and instinctively hostile to anyone suppressing knowledge.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 14–18",
  mods:{
    greatcreation:"Not one thing but many: a belt of gadgets you deploy and swap, so your great creation is really a toolkit that changes shape between fights.",
    upgrade:"The widest list of the ten, you get one more than every other craft from level 3, and you can swap every single one on a long rest.",
    toolexpertise:"Tinker's tools from level 1, alongside nets, rapiers and whips — an oddly specific weapon set that tells you how this plays.",
    extraattack:"Arrives at 5, and from 14 any of those attacks can be a gadget instead."
  },
  features:[
    {lvl:"Level 1",name:"Gadgetsmith's Proficiency",body:"<p>Nets, rapiers, whips and tinker's tools.</p>"},
    {lvl:"Level 1",name:"Essential Tools",body:"<p>A permanent kit that needs no upkeep: a <b>Gadgetsmith Weapon</b> of your choosing, a <b>Grappling Hook</b> that pulls you to a surface or drags a creature to you, and <b>Smoke Bombs</b> that cast fog cloud as often as you like.</p>"},
    {lvl:"Level 3",name:"Additional Upgrade",body:"<p>One more {{upgrade}} than the table gives every other Inventor, at every level.</p>"},
    {lvl:"Level 3",name:"Recycle Gadgets",body:"<p>Strip and rebuild on a {{longrest}} — replace any {{upgrade}} you have with another you qualify for.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 14",name:"Combat Gadgets",body:"<p>Any attack in the Attack action can instead be a gadget that would normally cost an action.</p>"}
  ]};

ENTRIES["in-golemsmith"] = { cls:"inventor", nav:"Golemsmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Golemsmith",
  tag:"Forge a true work of artifice",
  flavor:"Inventors who commit their life to one construct. Some chase the perfect creation; others simply wanted something loyal that could carry the loot. Rarely chaotic — you do not get this far without discipline.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 19–22",
  mods:{
    greatcreation:"A golem that fights beside you, rebuilt and re-specified as you level. Of the ten crafts this is the one that adds a second body to the battlefield.",
    upgrade:"Upgrades go into the golem — its frame, its armaments, its resilience — rather than into you.",
    arcaneretrofit:"Particularly good here: pour a found magic weapon's bonus into the golem's fists.",
    reaction:"Until level 5, the golem's reactions cost yours — which is the real constraint on the build, and the thing Autonomous Action lifts.",
    proficiencybonus:"The golem's rises with yours, and at 14 your Intelligence is added to everything it rolls."
  },
  features:[
    {lvl:"Level 1",name:"Golemsmith's Proficiency",body:"<p>Smith's tools and tinker's tools.</p>"},
    {lvl:"Level 1",name:"Mechanical Golem",body:"<p>A construct under your control that understands your languages but cannot speak. You direct its movement for free, spend your action to have it act, and — at first — your {{reaction}} to have it react. Killed, it can be raised by normal means or repaired on a {{longrest}} to half {{hitpoints}}; destroyed beyond recovery, rebuilt in four days and 100 gp. A {{shortrest}} repairs it for your Intelligence plus your level.</p>"},
    {lvl:"Level 3",name:"Intelligent Oversight",body:"<p>Help the golem as a {{bonusaction}} rather than an action.</p>"},
    {lvl:"Level 5",name:"Autonomous Action",body:"<p>The golem acts and reacts without spending your action or {{reaction}}, and takes orders mentally within 60 feet. This is the level the subclass comes together.</p>"},
    {lvl:"Level 5",name:"Magical Nature",body:"<p>Its natural weapons count as magical for {{resistance}} and {{immunity}}.</p>"},
    {lvl:"Level 14",name:"Perfected Design",body:"<p>The golem adds your Intelligence modifier to every attack roll, {{abilitycheck}} and {{savingthrow|save}} it makes.</p>"}
  ]};

ENTRIES["in-infusionsmith"] = { cls:"inventor", nav:"Infusionsmith", navSub:"Levels 1 · 3 · 14", kicker:"Inventor specialization",
  name:"Infusionsmith",
  tag:"Tinker with magic itself",
  flavor:"The most quintessential Inventor — and the one entitled to call a Wizard an impulsive spellslinger. Infusionsmiths lay magic down hours before using it, or craft enchantments that last. A magical swordsman, a wandslinger, or a bookish sort with a bag of tricks that never runs dry.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 23–26",
  mods:{
    greatcreation:"An Infused Armament — a weapon that runs on Intelligence and hits a die size harder than it should.",
    upgrade:"Upgrades add infusion types and slots, which makes this the craft that most rewards planning a day ahead.",
    spellbook:"The Spell Manual is one in all but name: wizard spells collected for free every level, convertible into Inventor spells as you learn them.",
    concentration:"Infused Focus at 14 anchors a concentration spell into an object, so you can hold two at once.",
    spellslot:"Infuse Magic stores them into wands and items ahead of time, turning today's unused slots into tomorrow's charges."
  },
  features:[
    {lvl:"Level 1",name:"Infusionsmith's Proficiency",body:"<p>Calligrapher's supplies and jeweler's tools, and spell scrolls take you half the usual time to scribe.</p>"},
    {lvl:"Level 1",name:"Infused Armament",body:"<p>A weapon that uses your Intelligence for attack and damage, and whose damage die grows by one step — a dagger rolls d6, and so on up to d12.</p>"},
    {lvl:"Level 3",name:"Spell Manual",body:"<p>A {{spellbook|book}} holding two 1st-level wizard spells, plus one more free wizard spell at every Inventor level. You cannot cast from it — but whenever you would learn an Inventor spell you can take one out of the manual instead, and it becomes an Inventor spell for you.</p>"},
    {lvl:"Level 3",name:"Infuse Magic",body:"<p>A minute-long ritual stores a spell into a wand or item, spending the {{spellslot}} now so someone can release the effect later.</p>"},
    {lvl:"Level 14",name:"Infused Focus",body:"<p>Anchor a {{concentration}} spell into an object you touch, so the object holds it instead of you.</p>"}
  ]};

ENTRIES["in-potionsmith"] = { cls:"inventor", nav:"Potionsmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Potionsmith",
  tag:"Alchemy, with explosive results",
  flavor:"Every village has an apothecary grinding roots into something hopeful. A Potionsmith knows the intricate version — mixing, brewing, and direct infusion by ritual — and can produce results in the blink of an eye. Sometimes literally.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 27–31",
  mods:{
    greatcreation:"A stock of potions and bombs, brewed on rests and thrown or drunk during them. The most consumable-driven craft of the ten.",
    upgrade:"Upgrades add recipes, so your list of what you can brew is the real character sheet.",
    hitpoints:"Alone among Inventors, a good chunk of your output is healing the party rather than hurting the enemy.",
    bonusaction:"Practiced Quaff at 3 makes drinking one — yours or anybody's — cost only this, which is what makes the craft keep pace in a fight.",
    spellslot:"Slots are brewing fuel: an infused potion costs one at the end of a rest, and at 14 the first one each rest is free."
  },
  features:[
    {lvl:"Level 1",name:"Potionsmith's Proficiency",body:"<p>Blowguns, alchemist's supplies and a herbalism kit.</p>"},
    {lvl:"Level 1",name:"Alchemical Reagents Pouch",body:"<p>A pouch of basic reagents, drawn from as part of the action that uses them — your equivalent of a component pouch.</p>"},
    {lvl:"Level 1",name:"Instant Reactions",body:"<p>Quick concoctions mixed on the spot, without the grinding and simmering refined work needs. These are the throwables you use round to round.</p>"},
    {lvl:"Level 3",name:"Alchemical Infusions",body:"<p>Skip the brewing process entirely by pouring your own magic in: spend a {{spellslot}} at the end of a rest to create an infused potion with a far stronger effect.</p>"},
    {lvl:"Level 3",name:"Practiced Quaff",body:"<p>Drink a potion or an infused potion as a {{bonusaction}}.</p>"},
    {lvl:"Level 5",name:"Empowered Alchemy",body:"<p>Add your Intelligence modifier to the damage, healing or {{temporaryhp|temporary hit points}} of any instant reaction or infused potion you use on your turn.</p>"},
    {lvl:"Level 14",name:"Infusion Expertise",body:"<p>The first infused potion you brew each rest costs no {{spellslot}}, and you can pick its effect freely.</p>"}
  ]};

ENTRIES["in-thundersmith"] = { cls:"inventor", nav:"Thundersmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Thundersmith",
  tag:"One weapon of unmatched devastation",
  flavor:"Elemental force channelled into a single terrible weapon — spectacular to allies, alarming to everyone else. Each one is unique, and truly understood only by whoever forged it. Some Thundersmiths are coldly analytical about the destruction; others revel in the crash.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 32–35",
  mods:{
    greatcreation:"A cannon, and the most single-minded great creation in the book. Everything you do goes through it.",
    upgrade:"Upgrades tune the weapon — range, blast shape, reload, elemental type — rather than adding new tools.",
    resistance:"Several upgrades let you choose the damage type, which is how a one-weapon build avoids being walled by it.",
    spellslot:"Unleashed Power at 14 spends them on rerolled damage dice, which is the only real sink a Thundersmith has for slots in combat."
  },
  features:[
    {lvl:"Level 1",name:"Thundersmith's Proficiency",body:"<p>Tinker's tools and smith's tools — and you can forge your own ammunition if the weapon needs it.</p>"},
    {lvl:"Level 1",name:"Stormforged Weapon",body:"<p>Your attuned weapon, and only ever yours. Choose its form from the Stormforged table — Thunder Cannon and its relatives — each with its own damage, weight and properties. Lost or destroyed, you can forge another in three days and 200 gp, picking a new form and new upgrades if you like.</p>"},
    {lvl:"Level 3",name:"Thundermonger",body:"<p>An extra 1d6 thunder damage on a hit, which is the flat damage floor the whole craft is built on.</p>"},
    {lvl:"Level 5",name:"Devastating Blasts",body:"<p>Missing still hurts: apply half your Thundermonger damage to a target you missed.</p>"},
    {lvl:"Level 14",name:"Unleashed Power",body:"<p>Spend a {{spellslot}} to reroll up to your Intelligence modifier in damage dice on the weapon or on Thundermonger.</p>"}
  ]};

ENTRIES["in-warsmith"] = { cls:"inventor", nav:"Warsmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Warsmith",
  tag:"Make yourself a juggernaut of war",
  flavor:"An Inventor who turned the craft on their own survivability. Warsmiths tend to be lawful — few people build a war machine without a purpose driving them — whether that purpose is justice, terror, or pure innovation.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 36–41",
  mods:{
    greatcreation:"A suit of powered armour, which makes this the one Inventor that stands at the front rather than behind it.",
    armorclass:"The suit is your defence, and it improves with upgrades rather than with treasure.",
    upgrade:"Upgrades bolt weapons and systems onto the suit — a force blast, a shield, flight — and at 14 you get one that costs nothing.",
    arcaneretrofit:"Explicitly called out in the rules: a found magic weapon's bonus can be poured into your Force Blast.",
    extraattack:"Arrives at 5, which is unusual for a half-caster carrying this much armour."
  },
  features:[
    {lvl:"Level 1",name:"Warsmith's Proficiency",body:"<p>Heavy armour, tinker's tools and smith's tools.</p>"},
    {lvl:"Level 1",name:"Warplate Gauntlet",body:"<p>An attuned Wondrous Item carrying a free {{upgrade}}: <b>Power Fist</b>, <b>Force Blast</b> or <b>Martial Grip</b>. You can build several with different loadouts and switch which one you wear. Remade on a {{longrest}} for 25 gp, or two days of scavenging for nothing.</p>"},
    {lvl:"Level 1",name:"Artificial Strength",body:"<p>Donning the gauntlet, or an action while wearing it, trades points of Intelligence for the same number of points of Strength — up to what your Intelligence was. Reversible whenever you like.</p>"},
    {lvl:"Level 3",name:"Warsmith's Armor",body:"<p>Eight hours turns ordinary heavy armour into your own augmenting suit, chosen from the Warsmith Armor table and improved by {{upgrade|upgrades}} rather than by loot.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 14",name:"Fully Customized Gear",body:"<p>One extra {{upgrade}} on the armour that does not count against your total.</p>"}
  ]};

ENTRIES["in-fleshsmith"] = { cls:"inventor", nav:"Fleshsmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Fleshsmith",
  tag:"The craft turned inward",
  flavor:"A discomfiting presence in any group — a Fleshsmith looks at you with a lingering gaze that says how could I improve that. They seek to understand and correct the limitations of flesh, and tend to find beauty primarily in efficiency.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 42–47",
  mods:{
    greatcreation:"Yourself. There is no device — the modifications go into your own body, which makes this the hardest Inventor to disarm.",
    upgrade:"Grafts and alterations rather than equipment: acid glands, a brimstone bladder, extra limbs. Permanent, not equipped.",
    hitpoints:"Much of the craft goes into simply being harder to kill, which is unusual for an Intelligence class — Uncanny Vitality burns Hit Dice mid-fight to top yourself back up.",
    arcaneretrofit:"Arcane Bioengineering lets it pour a magic weapon's bonus into your own natural weapons, which nothing else in the book allows.",
    spellsavedc:"The Perfection of Form thesis lets you swap Intelligence for Constitution when calculating it, which is how a Fleshsmith can dump the casting stat."
  },
  features:[
    {lvl:"Level 1",name:"Fleshsmith's Proficiency",body:"<p>The Medicine skill and leatherworker's tools. It is best not to think about the details.</p>"},
    {lvl:"Level 1",name:"Thesis of Flesh",body:"<p>Your approach to the art: <b>Perfection of Form</b> (a free Fleshcrafted Mutation, and Constitution can replace Intelligence in your {{spellsavedc}}), <b>Perfection of Creation</b> (a free Adorable Critter that grows a real natural weapon and can be sent to attack) or <b>Perfection of Technique</b> (martial weapons and a free Flaying Hook you can build into another weapon).</p>"},
    {lvl:"Level 3",name:"Uncanny Vitality",body:"<p>While above 0 {{hitpoints}}, spend a Hit Die at the start of your turn to heal — regeneration paid for out of your own reserves.</p>"},
    {lvl:"Level 3",name:"Arcane Bioengineering",body:"<p>{{arcaneretrofit}} can move a weapon's bonus onto the natural weapons this subclass grew you.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 14",name:"Perfection of Thesis",body:"<p>Your thesis resource comes back on a {{shortrest}}, Intelligence-modifier uses at a time.</p>"}
  ]};

ENTRIES["in-cursesmith"] = { cls:"inventor", nav:"Cursesmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Cursesmith",
  tag:"No mistakes, only opportunities",
  flavor:"Power marked by the decisions that bought it. Some Cursesmiths ignore the darkness clinging to their work; some weaponise the side effects deliberately; and some embrace it until they are twisted creations themselves. Not always evil — but the path leans.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 48–53",
  mods:{
    greatcreation:"A Forbidden Artifact bound to your soul — the only great creation with a downside written into it on purpose.",
    restrained:"Grasping Form lets the artifact bind targets on a hit, which makes this the most controlling of the ten crafts.",
    upgrade:"Upgrades deepen the curse, and several trade your own safety for effect. The artifact caps at your proficiency bonus of them.",
    bonusaction:"Soul Investiture spends one to feed part of your soul into the weapon — more damage now, the bane spell on you until you claw it back.",
    extraattack:"Arrives at 5, because the artifact is a weapon and the craft expects you to swing it."
  },
  features:[
    {lvl:"Level 1",name:"Cursesmith's Proficiency",body:"<p>One artisan's tool, and one language from Infernal, Abyssal, Deep Speech or Primordial.</p>"},
    {lvl:"Level 1",name:"Forbidden Artifact",body:"<p>A dark ritual invests part of your soul into a weapon, binding it to you permanently. Choose two of <b>Empowered Artifact</b>, <b>Abhorrent Life</b>, <b>Grasping Form</b> (grapple as a {{bonusaction}} on a hit), <b>Twisting Reach</b>, <b>Necrotic Wounding</b> or <b>Eldritch Eruption</b>. More can be bought as {{upgrade|upgrades}}, up to your {{proficiencybonus}}. Lost or destroyed, a day-long rite calls it back.</p>"},
    {lvl:"Level 1",name:"Soul Investiture",body:"<p>A {{bonusaction}} feeds more of your soul in: the weapon deals an extra 1d6 necrotic, and you are under the bane spell until you spend an action on a DC 10 Charisma {{savingthrow|save}} to reclaim it. Resting while invested halves the Hit Dice you recover.</p>"},
    {lvl:"Level 3",name:"Cursed Path",body:"<p>The curse starts claiming you, and you choose how. <b>Curse Bearer</b> shrugs off bane and your own upgrades' curses a proficiency-bonus number of times per {{longrest}}, and can force another creature within 30 feet to suffer them instead. Each path also grants free spells at 3, 5 and beyond.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 14",name:"Unlimited Power",body:"<p>Soul Investiture can double its bonus damage — at the cost of 1 necrotic damage per turn it has been running, taken at the end of each of your turns.</p>"}
  ]};

ENTRIES["in-runesmith"] = { cls:"inventor", nav:"Runesmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Runesmith",
  tag:"A specific language of magic",
  flavor:"Powerful runes that hold long-lasting power, drawn from many traditions. A Runesmith might be a knight with runes blazing across their armour, a scholar marking allies' weapons before standing back, or a tattooed mystic wearing the runes on their skin.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 54–58",
  mods:{
    greatcreation:"Runes placed on gear — yours or the party's — and held for as long as you choose to leave them there.",
    upgrade:"Upgrades add rune types, so your repertoire grows the way a spell list would. They widen the range you can mark, not the number you can hold.",
    preparedspells:"Runes are laid down in advance like a prepared list, but they persist rather than being spent.",
    bonusaction:"Runic Flare spends one to fire a rune's active effect, proficiency-bonus times per {{shortrest}}.",
    extraattack:"Arrives at 5, and either attack can be a rune activation instead."
  },
  features:[
    {lvl:"Level 1",name:"Runesmith Proficiency",body:"<p>Martial weapons, plus smith's tools or calligrapher's supplies depending on how you mark your runes.</p>"},
    {lvl:"Level 1",name:"Runic Marks",body:"<p>Mark a rune on a weapon, armour, a shield or your own skin. Each weapon or suit of armour bears one; a creature can bear any number, choosing the weapon or armour effect for each. You hold two at a time, three at 3, four at 5 and five at 14, re-marked on a {{longrest}} with the oldest fading when you exceed your limit.</p>"},
    {lvl:"Level 3",name:"Runic Flare",body:"<p>Trigger a rune's active effect as a {{bonusaction}}, {{proficiencybonus}} times per {{shortrest}}.</p>"},
    {lvl:"Level 3",name:"Runic Path",body:"<p><b>Runic Knight</b> (proficiency with anything your runes mark, and heavy armour stops slowing you), <b>Runic Mystic</b> (runes marked on yourself grant both effects, and Intelligence replaces Strength on unarmed strikes and Dexterity on {{armorclass}}) or <b>Runic Sage</b> (each marked rune grants a {{cantrip}} and a spell).</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}} — and a rune's active property can replace either attack.</p>"},
    {lvl:"Level 14",name:"Twin Flares",body:"<p>Once per turn, activating one rune or glyph fires the active effect of two.</p>"}
  ]};

ENTRIES["in-relicsmith"] = { cls:"inventor", nav:"Relicsmith", navSub:"Levels 1 · 3 · 5 · 14", kicker:"Inventor specialization",
  name:"Relicsmith",
  tag:"Holy power in ways that defy arcane logic",
  flavor:"Viewed with skepticism by other Inventors and bolstered by one fact: the inventions work. A blend of methodology and faith, built on scriptures and inscriptions — sometimes inherited, sometimes uncovered in research, sometimes only believed to have been uncovered.",
  src:"Kibbles' Compendium of Craft and Creation, pp. 59–63",
  mods:{
    greatcreation:"A relic — the only Inventor creation powered by faith rather than mechanism, which is exactly what unsettles their peers. It doubles as your spellcasting focus.",
    upgrade:"Upgrades are rites and blessings placed on the relic, and the reliquary you build it into decides which ones make sense.",
    hitpoints:"The most supportive craft of the ten: a Relicsmith heals and shields in a way no other Inventor does.",
    cantrip:"Two arrive free with the relic — light and sacred flame — which is the only place an Inventor gets cleric magic.",
    fightingstyle:"The Path of Justice grants one: Dueling, Two-Weapon Fighting or Great Weapon Fighting."
  },
  features:[
    {lvl:"Level 1",name:"Relicsmith's Proficiency",body:"<p>Martial weapons, the Religion skill and calligrapher's supplies.</p>"},
    {lvl:"Level 1",name:"Divine Relic",body:"<p>A small pendant, amulet or device that channels divine power and serves as your focus. It grants the light and sacred flame {{cantrip|cantrips}}, and a {{bonusaction}} sets a weapon ablaze for an extra 1d4 fire damage for a minute.</p>"},
    {lvl:"Level 3",name:"Ordained Path",body:"<p>A revelation of faith: <b>Path of Justice</b> (a {{fightingstyle}}, plus divine favor and guardian of faith), <b>Path of Salvation</b> or <b>Path of Penance</b>. Each grants free spells at 3, 5 and 17.</p>"},
    {lvl:"Level 3",name:"Ingenious Reliquary",body:"<p>Build the relic into something: a <b>melee weapon</b> that adds fire damage when ignited, a <b>Relic Lantern</b> casting bright light 20 feet and handing out 1d4 {{temporaryhp|temporary hit points}} as a {{bonusaction}}, or another housing. Fixed once chosen, though you can move it to a different weapon on a {{longrest}}.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 14",name:"Broadened Faith",body:"<p>A second Ordained Path, with everything it grants.</p>"}
  ]};

/* ===== Occultist core, filled out ===== */

ENTRIES["oc-core"] = { cls:"occultist", nav:"Core features", navSub:"The class itself", kicker:"Occultist",
  name:"Core Class Features",
  tag:"The branches of magic that fell out of fashion",
  flavor:"A collection of esoteric traditions — witches, shamans, oracles, hedge mages — gathered into one full-casting class on Wisdom. Control and support by default, though the tradition can push it almost anywhere, including into melee.",
  src:"Kibbles' Compendium of Legends and Legacies, pp. 12–15",
  mods:{},
  features:[
    {lvl:"Level 1",name:"Occult Tradition",body:"<p>{{occulttradition}} — Witch, Hedge Mage, Oracle, Shaman, Spiritualist or Voidwatcher, granting features at 1, 3, 6 and 14.</p>"},
    {lvl:"Level 1",name:"Spellcasting",body:"<p>A full caster on Wisdom, with spells known rather than {{preparedspells|prepared}} — so your list is fixed and personal, and your {{spellsavedc}} runs off the same score.</p>"},
    {lvl:"Level 1",name:"Occult Focus",body:"<p>A macabre trinket — a feathered skull, a runed tooth — that serves as your spellcasting focus, worth 10 gp and about a pound.</p>"},
    {lvl:"Level 2",name:"Occult Rites",body:"<p>{{occultrite|Two occult rites}}, with more at later levels, taken from your tradition's list or the general one, and swappable one at a time as you level.</p>"},
    {lvl:"Level 10",name:"Traditional Expertise",body:"<p>{{expertise}} in Animal Handling, Arcana, Medicine, Nature, Religion or Survival — and you can burn a {{spellslot}} for {{advantage}} on any Wisdom {{abilitycheck}}.</p>"},
    {lvl:"Level 20",name:"The Old Ways",body:"<p>Every Occultist spell you know of 3rd level or lower becomes a {{ritual}} — at 10 gold per level in consumed components for the ones that were not already — and rituals take only the spell's level in extra turns rather than ten minutes.</p>"}
  ]};


/* ===== Psion archetypes, brought to parity ===== */

ENTRIES["p-awakened"] = { cls:"psion", nav:"Awakened Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Awakened Mind",
  tag:"Something woke it up, and it never went back to sleep",
  flavor:"A Psion whose power was switched on by an encounter, an event, or a circumstance — latent all along, or simply destiny arriving. The archetype of minds reading minds: insight, intrusion, and eventually seeing the world by the thoughts in it.",
  src:"Kibbles' Compendium of Craft and Creation, p. 67",
  mods:{
    psionicdiscipline:"Telepathy comes free at level 1, and the rest of the archetype is built to sharpen it.",
    psipoints:"Full Awakening at 14 spends 2 at the start of your turn for advantage on every saving throw that round.",
    blindsight:"All Seeing Eye at 10 gives 60 feet of mindsight — you see thinking creatures through walls, though not mindless ones.",
    savingthrow:"Mind Reader lets you aim Telepathic Intrusion at Intelligence instead of Wisdom, which is usually the softer target.",
    psionicpower:"Empowered Psionics adds your Intelligence modifier to any discipline power's damage from level 6."
  },
  features:[
    {lvl:"Level 1",name:"Opened Mind",body:"<p>The {{psionicdiscipline|Telepathy discipline}}, free.</p>"},
    {lvl:"Level 1",name:"Mental Awareness",body:"<p>Intelligence replaces Wisdom on Insight checks against anything with an Intelligence of 6 or higher — you read the mind rather than the face.</p>"},
    {lvl:"Level 3",name:"Mind Reader",body:"<p>Telepathic Intrusion can force an Intelligence {{savingthrow|save}} instead of a Wisdom one, chosen when you use it.</p>"},
    {lvl:"Level 6",name:"Empowered Psionics",body:"<p>Add your Intelligence modifier to the damage of any {{psionicpower|discipline power}}.</p>"},
    {lvl:"Level 10",name:"All Seeing Eye",body:"<p>Mindsight out to 60 feet: you perceive any creature with an Intelligence of 6 or higher as though by {{blindsight}}.</p>"},
    {lvl:"Level 14",name:"Full Awakening",body:"<p>At the start of your turn, spend 2 {{psipoints|psi points}} for {{advantage}} on all {{savingthrow|saving throws}} that round.</p>"}
  ]};

ENTRIES["p-unleashed"] = { cls:"psion", nav:"Unleashed Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Unleashed Mind",
  tag:"A force you struggle to understand, let alone control",
  flavor:"Power that leaks out as mood — a state of mind projected onto the world, usually destructively. Unleashed Psions rarely chose this and often cannot switch it off. The most straightforwardly violent of the seven.",
  src:"Kibbles' Compendium of Craft and Creation, p. 68",
  mods:{
    psionicdiscipline:"Telekinesis comes free at level 1 — you move the world rather than reading it.",
    psionicpower:"Empowered Psionics adds your Intelligence modifier to discipline damage from 6.",
    charmed:"Uncontrollable Mind at 10 makes you immune to it, and to being frightened, and to anything reading or controlling your thoughts.",
    hitpoints:"Unstoppable Rampage at 14 turns a killing blow into a survivable one if the rampage die plus Constitution beats the excess damage."
  },
  features:[
    {lvl:"Level 1",name:"Unshackled Power",body:"<p>The {{psionicdiscipline|Telekinesis discipline}}, free.</p>"},
    {lvl:"Level 1",name:"Overwhelming Power",body:"<p>Thaumaturgy, cast psionically, with extra options — including hurling up to 10 pounds of loose objects around you.</p>"},
    {lvl:"Level 3",name:"Rampaging Power",body:"<p>A d4 rampage die added to one damage roll per turn. Keep dealing damage turn after turn and the die grows.</p>"},
    {lvl:"Level 6",name:"Empowered Psionics",body:"<p>Add your Intelligence modifier to the damage of any {{psionicpower|discipline power}}.</p>"},
    {lvl:"Level 10",name:"Uncontrollable Mind",body:"<p>{{immunity}} to {{charmed}} and {{frightened}}, and to effects that would read or seize control of your mind.</p>"},
    {lvl:"Level 14",name:"Unstoppable Rampage",body:"<p>When an attack drops you to 0 {{hitpoints}}, roll your rampage die — beat the excess damage with it plus your Constitution modifier and you stay standing.</p>"}
  ]};

ENTRIES["p-transcended"] = { cls:"psion", nav:"Transcended Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Transcended Mind",
  tag:"An epiphany about where your mind sits in the multiverse",
  flavor:"Psions who arrived through realisation rather than accident — understanding how the mind ties to everything else, and then acting on it. They tend to have the firmest grip on their own powers of any archetype.",
  src:"Kibbles' Compendium of Craft and Creation, p. 68",
  mods:{
    psionicdiscipline:"Enhancement comes free at level 1: you improve bodies, starting with your own.",
    temporaryhp:"Your core currency. Perfected Enhancement adds your proficiency bonus to them, and Balance of Power banks the overflow into a pool you can spend later.",
    concentration:"Mental Control at 10 adds your Intelligence modifier to the Constitution save for holding a discipline effect.",
    savingthrow:"At 14 you can pay 2 psi points to make Strength, Dexterity or Constitution saves with Intelligence instead — and 4 points turns a death save into a natural 20.",
    exhaustion:"State of Mind shrugs off heat, cold, hunger and sleeplessness, so the environmental kind mostly stops applying to you."
  },
  features:[
    {lvl:"Level 1",name:"Enlightened",body:"<p>The {{psionicdiscipline|Enhancement discipline}}, free.</p>"},
    {lvl:"Level 1",name:"State of Mind",body:"<p>Ignore extreme heat and cold, hold your breath twice as long, and go twice as long without food or sleep before it costs you anything.</p>"},
    {lvl:"Level 3",name:"Balance of Power",body:"<p>Healing or {{temporaryhp|temporary hit points}} you grant psionically also bank an equal amount into a stored pool you can draw on later.</p>"},
    {lvl:"Level 6",name:"Perfected Enhancement",body:"<p>Add your {{proficiencybonus}} to the {{temporaryhp|temporary hit points}} one creature gains from a psionic power.</p>"},
    {lvl:"Level 10",name:"Mental Control",body:"<p>Add your Intelligence modifier to Constitution {{savingthrow|saves}} made to keep {{concentration}} on a discipline effect.</p>"},
    {lvl:"Level 14",name:"Transcendent Body",body:"<p>Spend 2 {{psipoints|psi points}} to make an Intelligence {{savingthrow|save}} in place of a Strength, Dexterity or Constitution one — or 4 to treat a {{deathsavingthrow|death saving throw}} as a 20.</p>"}
  ]};

ENTRIES["p-shaper"] = { cls:"psion", nav:"Shaper's Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Shaper's Mind",
  tag:"Materialise your imagination and send it at people",
  flavor:"No mere conjurer borrowing from other planes — a Shaper weaves things out of nothing but their own mind. Of the seven archetypes this is the one that puts a second body on the board and keeps making more of them.",
  src:"Kibbles' Compendium of Craft and Creation, p. 69",
  mods:{
    psionicdiscipline:"Projection comes free at level 1, and everything after is about the Astral Construct it grants.",
    astralconstruct:"Yours is upgraded at every turn: a free power at 1, no {{concentration}} at 3, your Intelligence on its damage at 6, a bodyguard at 10, and a second construct at 14.",
    concentration:"Astral Metastability frees it at level 3 — the construct lasts until dismissed, which no other build gets.",
    reaction:"Astral Guardian spends it to pull the construct into your space and solidify it, transposing the hit onto it.",
    psipoints:"Nearly all of yours go into construct commands — Grow, Solidify, Strike, Replicate, Sustain."
  },
  features:[
    {lvl:"Level 1",name:"Creator's Mind",body:"<p>The {{psionicdiscipline|Projection discipline}}, free.</p>"},
    {lvl:"Level 1",name:"Boundless Imagination",body:"<p>Your {{astralconstruct}} carries one free power — <b>Devastating Weapons</b> for a bigger damage die, or one of the other shapes your imagination gives it — changeable for the duration.</p>"},
    {lvl:"Level 3",name:"Astral Metastability",body:"<p>The construct needs no {{concentration}} and lasts until dismissed — but only one at a time.</p>"},
    {lvl:"Level 6",name:"Empowered Construct",body:"<p>Add your Intelligence modifier to damage dealt by the construct or by a weapon from Project Item.</p>"},
    {lvl:"Level 10",name:"Astral Guardian",body:"<p>When you would take damage with the construct within 30 feet, a {{reaction}} and 1 {{psipoints|psi point}} conjures it into your space, solidified, to take the blow.</p>"},
    {lvl:"Level 14",name:"Imaginary Army",body:"<p>Replicate makes an extra construct beyond the usual, so a Shaper at full stretch is three bodies.</p>"}
  ]};

ENTRIES["p-wandering"] = { cls:"psion", nav:"Wandering Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Wandering Mind",
  tag:"Not quite rooted in the same reality as everyone else",
  flavor:"The most mysterious of the seven — Psions who find space pliable and reality negotiable. They skip across the battlefield rather than crossing it, and by the end they are stepping between planes.",
  src:"Kibbles' Compendium of Craft and Creation, p. 70",
  mods:{
    psionicdiscipline:"Transposition comes free at level 1, and Phase Rift is the power the rest of the archetype bends around.",
    teleport:"Flicker Step replaces your movement with a short teleport that grows from 5 feet to your full speed by level 17 — walls under four inches thick do not stop you.",
    psionicability:"The only archetype with martial weapons and medium armour, so Rift Strike's bonus-action attack is worth having.",
    psionictalent:"Rift Strike is granted free at 3 and does not count against your total.",
    psionicpower:"Phase Rift is a movement, an attack and a repositioning tool at once — at 14 it stops having to travel in a straight line."
  },
  features:[
    {lvl:"Level 1",name:"Spatial Manipulation",body:"<p>The {{psionicdiscipline|Transposition discipline}}, free.</p>"},
    {lvl:"Level 1",name:"Nomad's Gear",body:"<p>Martial weapons and medium armour — unique among Psions.</p>"},
    {lvl:"Level 3",name:"Cunning Strikes",body:"<p>The Rift Strike {{psionictalent|talent}} free, which turns a Phase Rift into a bonus-action weapon attack. If you have it already, take another talent instead.</p>"},
    {lvl:"Level 3",name:"Curious Mind",body:"<p>On each {{longrest}}, pick two skills you lack and be proficient in them until the next one.</p>"},
    {lvl:"Level 6",name:"Phase Dancer",body:"<p>Once per turn, Phase Rift gives you a free illusory duplicate, and your first attack roll after it lands with an edge.</p>"},
    {lvl:"Level 10",name:"Flickering Presence",body:"<p>Unspent Psionic Mastery points survive until the start of your next turn, usable for flicker.</p>"},
    {lvl:"Level 14",name:"Planeswalker and Winding Paths",body:"<p>Cast plane shift and teleport. And your Phase Rift no longer travels in a straight line, though it can still only cross each creature's space once.</p>"}
  ]};

ENTRIES["p-elemental"] = { cls:"psion", nav:"Elemental Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Elemental Mind",
  tag:"The elements as an extension of your will",
  flavor:"A Psion who manifests and commands fire, cold and lightning directly — not borrowed from a plane, but produced. The blaster of the seven, and eventually a Psion who simply becomes the element.",
  src:"Kibbles' Compendium of Craft and Creation, p. 71",
  mods:{
    psionicdiscipline:"Psychokinesis comes free at level 1 — Elemental Blast is your attack for the whole campaign.",
    psionicpower:"Empowered Psionics adds Intelligence to its damage from 6, on top of the blast's own slow, burn and arc riders.",
    resistance:"Primordial Aspect wraps you in whichever element you just dealt, and at 10 full manifestation makes it a body rather than a coating.",
    psipoints:"Living Power at 3 cuts the cost of overcharging a blast from psi points down to 1 force damage to yourself.",
    hitpoints:"Overcharging costs you them rather than points, which is the archetype's central trade."
  },
  features:[
    {lvl:"Level 1",name:"Elemental Power",body:"<p>The {{psionicdiscipline|Psychokinesis discipline}}, free.</p>"},
    {lvl:"Level 1",name:"Primordial Aspect",body:"<p>As an action, or free whenever you deal fire, cold or lightning damage, take on that element's aspect until the end of your next turn.</p>"},
    {lvl:"Level 3",name:"Living Power",body:"<p>Overcharging an Elemental Blast costs 1 force damage to yourself instead of the usual price — your power becomes a living extension rather than a spent resource.</p>"},
    {lvl:"Level 6",name:"Empowered Psionics",body:"<p>Add your Intelligence modifier to the damage of any {{psionicpower|discipline power}}.</p>"},
    {lvl:"Level 10",name:"Full Manifestation",body:"<p>Spend 1 {{psipoints|psi point}} on entering an aspect to become the element outright, replacing the aspect with a far stronger form.</p>"},
    {lvl:"Level 14",name:"Elemental Form",body:"<p>5 {{psipoints|psi points}} casts shapechange into elemental forms, with no verbal or material components.</p>"}
  ]};

ENTRIES["p-consuming"] = { cls:"psion", nav:"Consuming Mind", navSub:"Levels 1 · 3 · 6 · 10 · 14", kicker:"Psionic archetype",
  name:"Consuming Mind",
  tag:"Their thoughts and vitality are your food",
  flavor:"A feared branch, sometimes believed to be the primeval root of all psionics — found in mind-eating monsters and ancient psionic space whales. Refined by those who wanted power badly enough, it works, and it is terrible.",
  src:"Kibbles' Compendium of Craft and Creation, p. 72",
  mods:{
    psionicdiscipline:"Consumption comes free at level 1 — Mind Leech is the power everything else amplifies.",
    psionictalent:"Mind Devourer is granted free at 3, ignores its level requirement and cannot be swapped out.",
    psionicpower:"Mind Leech hits far harder against anything already frightened, charmed, stunned, restrained, grappled or paralyzed — so you want a controller in the party.",
    temporaryhp:"Every psionic charge you do not spend on damage becomes them at the end of your turn.",
    psipoints:"Mind Vampire at 10 lets kills feed points back, so at high levels the archetype starts paying for itself."
  },
  features:[
    {lvl:"Level 1",name:"Psionic Predator",body:"<p>The {{psionicdiscipline|Consumption discipline}}, free.</p>"},
    {lvl:"Level 1",name:"Dark Lurker",body:"<p>Stealth and Deception proficiency — and a way to conceal that you are using psionics at all.</p>"},
    {lvl:"Level 3",name:"Ravenous Powers",body:"<p>The Mind Devourer {{psionictalent|talent}}, free and permanent, triggered at 30 feet when one of your powers kills.</p>"},
    {lvl:"Level 6",name:"Empowered Psionics",body:"<p>Add your Intelligence modifier to the damage of any {{psionicpower|discipline power}}.</p>"},
    {lvl:"Level 10",name:"Mind Vampire",body:"<p>Mind Devourer triggers on any psychic damage you deal within 30 feet, kill or not — and you can bank {{psipoints|psi points}} past your usual ceiling.</p>"},
    {lvl:"Level 14",name:"Shattered Husks",body:"<p>Mind Leech always carries the Shredding modifier for free, and can leave its victims as husks.</p>"}
  ]};

/* ===== Psionic disciplines, brought to parity ===== */

ENTRIES["p-telepathy"] = { cls:"psion", nav:"Telepathy", navSub:"Passive · power · 4 modifiers", kicker:"Psionic discipline",
  name:"Telepathy Discipline",
  tag:"Interact with the minds of other creatures",
  flavor:"Free to an Awakened Mind, and the discipline that makes a Psion a social problem as well as a combat one. The power itself is a reliable, cheap Wisdom save that both damages and blunts the target's attacks on you.",
  src:"Kibbles' Compendium of Craft and Creation, p. 76",
  mods:{
    psionicdiscipline:"Granted free by the Awakened Mind, which can also aim Telepathic Intrusion at Intelligence instead of Wisdom.",
    stunned:"The Overwhelming modifier, 3 psi points — the heaviest condition any base discipline power hands out.",
    frightened:"The Terrifying modifier costs a single point, making it the cheapest fear in the class.",
    invisible:"The Meddling modifier makes one creature invisible to the target, or plants a minor illusion in its head.",
    psipoints:"Rending scales the damage a die at a time, so this is the discipline that converts spare points into damage most smoothly."
  },
  features:[
    {lvl:"Passive",name:"Telepathic Communication",body:"<p>Speak mind to mind with anything you can see within 30 feet, no shared language needed — they can reply in kind so long as they understand some language.</p>"},
    {lvl:"Power",name:"Telepathic Intrusion",body:"<p>An action, 60 feet. A Wisdom {{savingthrow|save}} or 1d8 psychic damage, and on a failure the target attacks you at {{disadvantage}} until your next turn. You can choose to deal no damage at all.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Rending</b> (1+): another 1d8 per point. <b>Terrifying</b> (1): {{frightened}} of you until the end of your next turn. <b>Meddling</b> (2): a creature becomes {{invisible}} to the target, or it sees something that is not there. <b>Overwhelming</b> (3): {{stunned}} until the end of its next turn.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>{{psipoints|Psi points}} can cast Telepathy's spell list instead — mind-reading, suggestion and domination magic rising by point cost.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p><b>Attuned Argument</b> rolls a second d20 on Charisma checks, {{proficiencybonus}} times per {{longrest}}. <b>Empathy</b> spends your {{reaction}} to give an ally {{resistance}} and take the psychic damage yourself — unreducible, and unlimited in range if you have a telepathic bond with them.</p>"}
  ]};

ENTRIES["p-telekinesis"] = { cls:"psion", nav:"Telekinesis", navSub:"Passive · power · 4 modifiers", kicker:"Psionic discipline",
  name:"Telekinesis Discipline",
  tag:"Interact with physical objects and energy",
  flavor:"Free to an Unleashed Mind. The bluntest discipline in the book: a Strength save that hits, shoves and knocks down, with modifiers that turn it into an area attack or a restraint.",
  src:"Kibbles' Compendium of Craft and Creation, p. 75",
  mods:{
    psionicdiscipline:"Granted free by the Unleashed Mind, whose rampage die stacks onto every hit.",
    restrained:"The Crushing modifier, 2 psi points, on a failed save.",
    prone:"Telekinetic Force does this or a 5-foot shove on every successful use, before any points are spent.",
    psipoints:"Zone of turns a single target into a 5-, 10- or 20-foot radius, which is how a Psion gets an area attack without a spell.",
    concentration:"The Mental Might talent lets you grapple at 30 feet, but holding it at range needs this."
  },
  features:[
    {lvl:"Passive",name:"Telekinetic Hands",body:"<p>Manipulate objects within 30 feet with your mind — open an unlocked door, stow or fetch an item, pour out a vial. No attacking, no magic items, nothing over 10 pounds, though {{psipoints|psi points}} raise that by 100 pounds each.</p>"},
    {lvl:"Power",name:"Telekinetic Force",body:"<p>An action, 60 feet. A Strength {{savingthrow|save}} or 1d10 bludgeoning, plus a 5-foot shove or knocked {{prone}}.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Hammering</b> (1+): another 1d10 per point. <b>Hurling</b> (1–3): 10 more feet of shove per point. <b>Crushing</b> (2): {{restrained}} until the end of its next turn. <b>Zone of</b> (1–3): hit everyone in a 5-, 10- or 20-foot radius instead.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>jump and thunderwave at 1 point, through levitate and shatter, fly, resilient sphere, and telekinesis or wall of force at 5.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p><b>Kinetic Slam</b> converts the save into a ranged spell attack. <b>Mental Might</b> grapples and shoves at 30 feet and uses Intelligence for Athletics. <b>Telekinetic Movement</b> buys 10 feet plus spider climb, feather fall or levitate for a point. <b>Precise Power</b> nudges someone else's ranged attack by 2d4 after the roll.</p>"}
  ]};

ENTRIES["p-enhancement"] = { cls:"psion", nav:"Enhancement", navSub:"Passive · power · 5 modifiers", kicker:"Psionic discipline",
  name:"Enhancement Discipline",
  tag:"Interact with a creature's nature and abilities",
  flavor:"Free to a Transcended Mind. The support discipline: temporary hit points and a damage rider handed to whoever needs them, with modifiers that buy resistance or an extra action outright.",
  src:"Kibbles' Compendium of Craft and Creation, p. 73",
  mods:{
    psionicdiscipline:"Granted free by the Transcended Mind, which adds its proficiency bonus to the temporary hit points.",
    temporaryhp:"The core of it — 1d6 baseline, another 1d6 per point of Fortifying, and they fade when you use the power again.",
    resistance:"The Resilient modifier, 3 psi points, to all damage until the start of your next turn.",
    bonusaction:"The Surging Power talent drops the cost to this when you target only yourself, at reduced dice.",
    psipoints:"Swift, at 2 points, buys the target an extra action — Attack, Dash, Disengage, Hide or Use an Object."
  },
  features:[
    {lvl:"Passive",name:"Enhancing Skill",body:"<p>Add 1d4 to any Strength or Dexterity {{abilitycheck}}.</p>"},
    {lvl:"Power",name:"Enhancing Surge",body:"<p>An action, 60 feet, one round. The target gains 1d6 {{temporaryhp|temporary hit points}} and deals an extra 1d6 the next time it deals damage.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Fortifying</b> (1+): another 1d6 {{temporaryhp|temporary hit points}} per point. <b>Savage</b> (1+): another 1d6 on the next weapon attack per point. <b>Swift</b> (2): an extra limited action. <b>Resilient</b> (3): {{resistance}} to all damage.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>heroism and longstrider at 1 point, alter self and lesser restoration at 2, haste at 3, freedom of movement and stoneskin at 4, greater restoration at 5.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p><b>Physical Surge</b> sets your Strength or Dexterity equal to your Intelligence when you target yourself. <b>Surging Power</b> makes a self-targeted surge a {{bonusaction}}. <b>Body Control</b> casts alter self at will. <b>Enhanced Regrowth</b> adds cure wounds. <b>Metamorphosis</b> and <b>Transcendent Life</b> add polymorph, mass cure wounds and reincarnate.</p>"}
  ]};

ENTRIES["p-projection"] = { cls:"psion", nav:"Projection", navSub:"Passive · power · 7 commands", kicker:"Psionic discipline",
  name:"Projection Discipline",
  tag:"Project what is in your mind into the world",
  flavor:"Free to a Shaper's Mind, and the most mechanically involved discipline in the class. The Astral Construct is a second body you steer with commands rather than a spell you cast once.",
  src:"Kibbles' Compendium of Craft and Creation, p. 73",
  mods:{
    psionicdiscipline:"Granted free by the Shaper's Mind, which drops the concentration requirement and adds Intelligence to its damage.",
    astralconstruct:"A Medium ethereal creature, weapon or object you move 30 feet and attack with each turn for 1d8 force.",
    concentration:"The base power needs it, up to a minute — the Shaper's Mind is the only way out of that.",
    psipoints:"Every command costs them, and they are capped by your per-use limit, so a turn is a budget rather than a list.",
    restrained:"The Grab command, 1 point, but only while the construct is Solidified."
  },
  features:[
    {lvl:"Passive",name:"Project Item",body:"<p>An action pulls an imagined object into your hands — up to 3 feet and 10 pounds, clearly ethereal, solid enough to use. Weapons made this way deal force damage. Three at a time, each lasting a minute.</p>"},
    {lvl:"Power",name:"Astral Construct",body:"<p>An action, 60 feet, {{concentration}} up to a minute. {{astralconstruct|An ethereal creation}} you move 30 feet and attack with — a melee spell attack for 1d8 force. It fades if it leaves range.</p>"},
    {lvl:"Commands",name:"Spending psi points",body:"<p>Free to issue, once each per turn, capped by your point limit. <b>Grab</b> (1): {{restrained}} while Solidified. <b>Grow</b> (1): a size bigger and another damage die. <b>Relocate</b> (1): reappear anywhere within 60 feet of you. <b>Solidify</b> (1): becomes real, AC 16, blocking its space. <b>Strike</b> (2): attack again. <b>Replicate</b> (3): a second construct until your next turn. <b>Sustain</b> (1+): keep any of those running another round.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>floating disk and unseen servant at 1 point, mirror image at 2, phantom steed at 3, arcane eye at 4, creation at 5.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p><b>Projected Weaponry</b> is the big one — bonus-action weapons, Intelligence to hit and damage, no size limit, thrown range doubled, and Grow applies. <b>Astral Swap</b> trades places with the construct. <b>Life Link</b> takes its damage for it at {{resistance}}. <b>Matter Made Real</b> adds fabricate and wall of stone. <b>Animated Projections</b> casts animate objects out of nothing.</p>"}
  ]};

ENTRIES["p-transposition"] = { cls:"psion", nav:"Transposition", navSub:"Passive · power · 3 modifiers", kicker:"Psionic discipline",
  name:"Transposition Discipline",
  tag:"Modify the properties of space itself",
  flavor:"Free to a Wandering Mind. Mobility that doubles as damage: the Phase Rift is a line you travel through, and everyone standing in it takes the consequences.",
  src:"Kibbles' Compendium of Craft and Creation, p. 77",
  mods:{
    psionicdiscipline:"Granted free by the Wandering Mind, which also gets Rift Strike free and unbends the rift at 14.",
    teleport:"Flicker Step is a free short one every turn — 5 feet at first, your whole speed by 17.",
    difficultterrain:"Largely irrelevant to you: Flicker Step and Phase Rift both pass through creatures and thin walls.",
    psipoints:"Long extends the rift 10 feet per point and Ethereal lets it pass through solid matter, so points buy reach rather than damage.",
    bonusaction:"The Rift Strike talent converts a rift into a free weapon attack with one."
  },
  features:[
    {lvl:"Passive",name:"Flicker Step",body:"<p>Replace your movement with a {{teleport}} of 5 feet — 10 at level 5, 15 at 11, your full {{speed}} at 17. You pass through creatures, and through anything under four inches thick.</p>"},
    {lvl:"Power",name:"Phase Rift",body:"<p>An action. Travel 10 feet in a straight line, leaving a tear behind. Anything in the path makes a Dexterity {{savingthrow|save}} or takes 1d8 force damage.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Disruptive</b> (1+): another 1d8 per point. <b>Long</b> (1–3): 10 more feet of travel per point. <b>Ethereal</b> (2): pass through solid objects and terrain, provided you end somewhere you can stand.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>expeditious retreat at 1 point, misty step and blur at 2, blink and nondetection at 3, dimension door and banishment at 4.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p><b>Rift Strike</b> adds a {{bonusaction}} weapon attack to a rift. <b>Flickering Escape</b> and the rest of the list turn the discipline into an escape hatch as much as an attack.</p>"}
  ]};

ENTRIES["p-psychokinesis"] = { cls:"psion", nav:"Psychokinesis", navSub:"Passive · power · 3 modifiers", kicker:"Psionic discipline",
  name:"Psychokinesis Discipline",
  tag:"Spontaneously create and control energy",
  flavor:"Free to an Elemental Mind. The damage discipline — a ranged attack whose element you pick per cast, each carrying its own rider: cold slows, fire burns, lightning arcs to someone else.",
  src:"Kibbles' Compendium of Craft and Creation, p. 78",
  mods:{
    psionicdiscipline:"Granted free by the Elemental Mind, which wraps you in whichever element you last dealt.",
    resistance:"Picking the element per cast is how this discipline plays around it — cold, fire, lightning or force, chosen at the moment of the attack.",
    psipoints:"Amplified adds 1d8 a point, Massive turns it into a 15-foot cone, and Lasting leaves the zone behind.",
    speed:"Every die of cold damage cuts the target's by 5 feet until the end of its next turn.",
    difficultterrain:"The Lasting modifier makes something close to it — a 5-foot sphere that reapplies the blast's rider to anyone in it."
  },
  features:[
    {lvl:"Passive",name:"Energy Manipulation",body:"<p>At-will minor energy: 30 feet of bright light, setting things alight by touch, small arcs of electricity, or freezing and thawing a 5-foot cube of water. Effects last 10 minutes, up to your Intelligence modifier at once.</p>"},
    {lvl:"Power",name:"Elemental Blast",body:"<p>An action, 60 feet. A ranged spell attack for 1d8 cold, fire, force or lightning. Each die of cold cuts 5 feet of {{speed}}; each die of fire burns for 1d4 next turn; each die of lightning arcs 1d4 to another creature within 30 feet.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Amplified</b> (1+): another 1d8 per point. <b>Lasting</b> (1): a 5-foot sphere of devastation stays behind until your next turn. <b>Massive</b> (1–3): a 15-foot cone with a Dexterity {{savingthrow|save}} instead of an attack roll.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>The elemental spell list, from burning hands and ice knife upward by point cost.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p>Talents here sharpen the blast — extra elements, cheaper overcharging, and better control of the zones it leaves behind.</p>"}
  ]};

ENTRIES["p-precognition"] = { cls:"psion", nav:"Precognition", navSub:"Passive · power · 4 modifiers", kicker:"Psionic discipline",
  name:"Precognition Discipline",
  tag:"See what lies ahead, and steer around it",
  flavor:"No archetype grants this one — it is a free pick, and the purest support discipline in the class. The future is readable because it grows from the present, and it gets cloudier the further out you look.",
  src:"Kibbles' Compendium of Craft and Creation, p. 80",
  mods:{
    psionicdiscipline:"A free pick rather than an archetype grant, which makes it the usual second discipline for a support build.",
    initiative:"Prescience adds your {{proficiencybonus}} to it, and while concentrating you roll it with Intelligence instead of Dexterity.",
    advantage:"Seeing hands it out at range, with an extra 1d6 damage if the boosted attack lands.",
    savingthrow:"Concentrating lets you make Intelligence saves in place of Dexterity ones — a real defensive upgrade for a d6 class.",
    reaction:"The Withheld modifier costs nothing and lets you hold Seeing until an attack is actually made."
  },
  features:[
    {lvl:"Passive",name:"Prescience",body:"<p>Add your {{proficiencybonus}} to Perception and {{initiative}} — doubled on Perception if you already had it. Concentrate and you use Intelligence for Perception, {{initiative}} and any Dexterity {{savingthrow|save}}.</p>"},
    {lvl:"Power",name:"Seeing",body:"<p>An action. Either grant {{advantage}} on an ally's next attack, adding 1d6 damage if it hits, or impose {{disadvantage}} on the next attack against someone, cutting 1d6 from the damage if it lands anyway.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Withheld</b> (0): hold it as a {{reaction}} instead of committing in advance. <b>Omniscient</b> (1): bless and guidance on the beneficiary. <b>Positioning</b> (1+): 5 feet of free movement per point, no {{opportunityattack|opportunity attacks}}. <b>Thwarting</b> (2): {{advantage}} on their next {{savingthrow|save}}.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>detect good and evil at 1 point, augury at 2, clairvoyance at 3, divination and death ward at 4, scrying at 5.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p>Talents here lean into foresight — more uses of Seeing, better reaction timing, and deeper divination.</p>"}
  ]};

ENTRIES["p-nullification"] = { cls:"psion", nav:"Nullification", navSub:"Passive · power · modifiers", kicker:"Psionic discipline",
  name:"Nullification Discipline",
  tag:"Assert reality, and revert everything else",
  flavor:"The other free pick, and the answer to anything supernatural. Small damage, but it strips effects, punishes creatures that are themselves magical, and can shut a caster down entirely if you can get hold of them.",
  src:"Kibbles' Compendium of Craft and Creation, p. 81",
  mods:{
    psionicdiscipline:"A free pick rather than an archetype grant — usually taken as an answer to a specific problem.",
    antimagic:"The closest thing a Psion has to it: Disruptive Touch ends minor effects on contact and Supernatural ends larger ones by the point.",
    grappled:"Grab a caster and Disruptive Touch forces them to save just to cast at all, unless they outspend you.",
    resistance:"Disruptive Touch gives it against illusions and magical damage from anything you touch.",
    concentration:"Denial makes a disoriented target subtract a d4 from the Constitution save that keeps it."
  },
  features:[
    {lvl:"Passive",name:"Disruptive Touch",body:"<p>End minor magical or psionic effects by touching them, with {{resistance}} to illusions and magical damage from things you touch. While {{grappled|grappling}} a caster, spend {{psipoints|psi points}} at the start of your turn and they must save to cast at all — unless the spell outranks what you spent.</p>"},
    {lvl:"Power",name:"Denial",body:"<p>An action, 30 feet. A Charisma {{savingthrow|save}} or 1d4 force damage. Against an aberration, celestial, construct, elemental, fey, fiend, {{undead}} or anything that casts, add another 1d4 and it becomes disoriented — subtracting a d4 from attacks, checks and {{concentration}} saves.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Supernatural</b> (1+): end a supernatural effect on or of the creature, provided your points match the spell level or power cost behind it. Innate properties can be suppressed the same way.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>Dispelling and warding magic by point cost, up to the heavier counterspelling effects.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p>Talents here widen what counts as suppressible and lower the cost of shutting a caster down.</p>"}
  ]};

ENTRIES["p-consumption"] = { cls:"psion", nav:"Consumption", navSub:"Passive · power · 3 modifiers", kicker:"Psionic discipline",
  name:"Consumption Discipline",
  tag:"Their thoughts and vital energy are food",
  flavor:"Free to a Consuming Mind. A Charisma save that doubles its die against anything already suffering — and each success banks a charge you spend on damage or on keeping yourself alive.",
  src:"Kibbles' Compendium of Craft and Creation, p. 82",
  mods:{
    psionicdiscipline:"Granted free by the Consuming Mind, which triggers its talent on any psychic damage from level 10.",
    temporaryhp:"An unspent charge becomes them at the end of your turn, equal to your Intelligence modifier.",
    psionicpower:"Mind Leech goes from 1d6 to 1d12 against a target that is frightened, charmed, stunned, restrained, grappled or paralyzed — so it pays to fight alongside a controller.",
    frightened:"One of six conditions that upgrade the die; any of them will do.",
    psipoints:"Devouring turns it into a 5-foot aura around you, Nourishing banks an extra charge, Rending adds dice."
  },
  features:[
    {lvl:"Passive",name:"Adaptive Hunter",body:"<p>After a Mind Leech, take one skill, tool or language proficiency the target had, until the end of your next {{longrest}}. Taking a new one drops the old.</p>"},
    {lvl:"Power",name:"Mind Leech",body:"<p>An action, 30 feet. A Charisma {{savingthrow|save}} or 1d6 psychic — 1d12 if the target is already {{frightened}}, {{charmed}}, {{stunned}}, {{restrained}}, {{grappled}} or paralyzed. A failure banks a charge: spend it for extra damage equal to your Intelligence modifier, or cash it at the end of your turn for that many {{temporaryhp|temporary hit points}}. It also works on a corpse less than a minute old.</p>"},
    {lvl:"Modifiers",name:"Spending psi points",body:"<p><b>Nourishing</b> (1): a second charge on a failed save. <b>Rending</b> (1+): another die per point. <b>Devouring</b> (2): a 5-foot radius centred on you instead of a single target.</p>"},
    {lvl:"Alternate effects",name:"Spells you can cast",body:"<p>inflict wounds at 1 point, rising through the draining and life-stealing list.</p>"},
    {lvl:"Talents",name:"What you can specialise in",body:"<p>The Mind Devourer talent is the centrepiece — a kill feeds you back. Others widen the range and let you hold a stolen spell for a minute before casting it, at the cost of your own hit points if it heals.</p>"}
  ]};


/* ===== Sword Saint, brought to parity ===== */

ENTRIES["ss-core"] = { cls:"swordsaint", nav:"Core features", navSub:"The class itself", kicker:"Sword Saint",
  name:"Core Class Features",
  tag:"Walking a road someone already walked, on purpose",
  flavor:"The true Sword Saints went past mastery into legend. You are deliberately emulating one — a phantom saint — until you come into your own. The book is firm that a Sword Saint never embellishes: the stories told about you afterwards must be earned.",
  src:"Lyre's Guide to Retia, pp. 413–416",
  mods:{},
  features:[
    {lvl:"Level 1",name:"Focus Channeling",body:"<p>{{focuspointsretia}}, spent on {{focustechnique|focus techniques}}. No spell list, no prepared list, no slots — one pool and a set of named manoeuvres.</p>"},
    {lvl:"Level 2",name:"Dragon Surge",body:"<p>A burst of spiritual energy that fuels your heaviest techniques and carries you extra movement. Using it again in short order costs more points, which several paths later fix.</p>"},
    {lvl:"Level 3",name:"Path of Devotion",body:"<p>The ancient master you are emulating — twelve to choose between, each with its own Saint Relic, {{fightingstyle}} and set of {{focustechnique|techniques}}.</p>"},
    {lvl:"Level 13",name:"Extra Attack",body:"<p>{{extraattack}} — late, because the techniques are doing the work until then.</p>"},
    {lvl:"Level 14",name:"Saint Weapon Bond",body:"<p>Attune to the weapon your path is built around. It gives +1 to attack and damage, and most of the high-level path features only work through it.</p>"},
    {lvl:"Level 18",name:"Soul of Luxus",body:"<p>At 0 {{hitpoints}} you neither fall {{unconscious}} nor start dying — you keep acting while rolling {{deathsavingthrow|death saves}}, and can spend a focus point to cancel each failure. You cannot regain focus while doing it.</p>"},
    {lvl:"Level 20",name:"Unwavering Legend",body:"<p>You stop emulating and become the thing you were emulating.</p>"}
  ]};

ENTRIES["ss-kyuubi"] = { cls:"swordsaint", nav:"Way of Kyuubi", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Kyuubi",
  tag:"The original, and the one that borrows from everyone",
  flavor:"Kyuubi, first of the Sword Saints and student of Luxus, developed the fundamentals every later path refined. She valued mindfulness and moderation, could pick up any skill on sight, and was as composed as the surface of a lake.",
  src:"Lyre's Guide to Retia, pp. 423–424",
  mods:{
    focustechnique:"The path with the widest access in the class. Kyuubi does not learn new techniques — it upgrades the base ones, then steals a proficiency-bonus worth from other paths.",
    focuspointsretia:"Spent broadly rather than on one signature trick, and at 17 one chosen technique per rest becomes free on its first use each turn.",
    abilitycheck:"Jack of All Trades adds half your proficiency bonus to anything you are not already proficient in.",
    savingthrow:"Blade of the Splitting Path gives {{advantage}} on all of them while you hold your Saint Weapon.",
    initiative:"The refined Falcon Wing Deflection tops you back up to 3 focus points when you roll it low."
  },
  features:[
    {lvl:"Level 3",name:"Jack of All Trades",body:"<p>Half your {{proficiencybonus}} added to any {{abilitycheck}} you are not already proficient in.</p>"},
    {lvl:"Level 3",name:"Refined Focus Techniques",body:"<p>No new techniques — the base ones improve. <b>Adept Moment</b> works on any {{abilitycheck}}. <b>Cunning Vertical</b> becomes free and can be taken as a {{bonusaction}}. <b>Falcon Wing Deflection</b> drops to 1 point and refills you to 3 on a low {{initiative}}. <b>Falter Fleeting</b> doubles its movement. <b>Overwhelming Advance</b> treats a reroll under 10 as a 10.</p>"},
    {lvl:"Level 6",name:"Skillsteal",body:"<p>Learn {{proficiencybonus}} techniques from any other path — bar the spellcasting ones — and swap one each level.</p>"},
    {lvl:"Level 11",name:"Falcon Wing Deflection",body:"<p>The refinements above come online in full, which is where the path's economy starts beating everyone else's.</p>"},
    {lvl:"Level 14",name:"Blade of the Splitting Path",body:"<p>{{advantage}} on every {{savingthrow|saving throw}} while wielding your attuned Saint Weapon.</p>"},
    {lvl:"Level 17",name:"Ars Magnus",body:"<p>Meditate on one {{focustechnique|technique}} each rest: until you switch, its first use each turn costs no focus points.</p>"}
  ]};

ENTRIES["ss-bluemetal"] = { cls:"swordsaint", nav:"Way of Blue Metal", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Blue Metal",
  tag:"An ancient elven swordsman, taught by dragons",
  flavor:"The most spiritually attuned of the paths, forged by an elf who sought inner peace. Legend says a series of dragons each contributed knowledge to its form, teaching its founder to force their own spirit to manifest as elemental energy.",
  src:"Lyre's Guide to Retia, pp. 417–418",
  mods:{
    focustechnique:"Two free picks from any other path at 3, two more at 11, swappable every level — and at 14 all of them cost one point less.",
    focuspointsretia:"Focus Mastery refunds your whole proficiency bonus on a natural 20, so this path runs hotter than any other.",
    resistance:"Central Aura converts incoming damage of your chosen element into temporary hit points and then grants it while they last.",
    criticalhit:"A natural 20 is a refuel as well as a crit, which changes how you weigh risky attacks.",
    reaction:"Central Aura spends one to negate elemental damage entirely."
  },
  features:[
    {lvl:"Level 3",name:"Focus Mastery",body:"<p>A natural 20 on an attack refunds {{proficiencybonus}} focus points — 1 point on further 20s the same turn.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p>Any two {{focustechnique|techniques}} from other paths, swapping one every time you level.</p>"},
    {lvl:"Level 6",name:"Central Aura",body:"<p>Pick cold, fire, lightning or poison. A {{reaction}} and 2 points negate that damage, convert it to {{temporaryhp|temporary hit points}}, and grant {{resistance}} while they last. An action and 2 points also imbue your weapon with it for 10 minutes, adding half your level in damage.</p>"},
    {lvl:"Level 11",name:"Extra Focus",body:"<p>Two more borrowed {{focustechnique|techniques}}.</p>"},
    {lvl:"Level 14",name:"Purity of Form",body:"<p>Every technique costs 1 fewer point while you are attuned to your Saint Weapon, minimum 1 — weapon techniques must use that weapon to qualify.</p>"},
    {lvl:"Level 17",name:"Roaring Dragon Surge",body:"<p>Dragon Surge stops escalating in cost. One extra point upgrades it: {{advantage}} on Saint Weapon attacks until your next turn, +1d10 damage on each hit, and 30 feet of extra movement.</p>"}
  ]};

ENTRIES["ss-dragonfly"] = { cls:"swordsaint", nav:"Way of the Dragonfly", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of the Dragonfly",
  tag:"A general who never took a wound in his whole career",
  flavor:"Patterned after a bombastic military general who threw himself into battle after battle and came out unmarked. His followers raise the spear high and charge — durable, loud, and drawn to the roar of a crowd.",
  src:"Lyre's Guide to Retia, pp. 418–419",
  mods:{
    focustechnique:"Blasting Spear trades an attack roll for a 30-foot line, and Thunder Joust turns a charge into advantage plus a knockdown.",
    temporaryhp:"Enduring Bulwark is the path's survival button — 1d10 per point spent, draining 1d8 a turn.",
    prone:"Thunder Joust knocks a charged target down on a failed Strength save.",
    armorclass:"Rising Dragonfly cuts the target's by 1d4+1 on a failed Constitution save.",
    advantage:"Rally and Conquer hands your allies a 1d4 bonus against anything you are engaging — a party-wide buff from just hitting things."
  },
  features:[
    {lvl:"Level 3",name:"Fighting Style: Great Weapon Fighting",body:"<p>{{fightingstyle|Great Weapon Fighting}}.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Blasting Spear</b> (2 points): drop the attack roll and hit a 30-foot line with a Dexterity {{savingthrow|save}} for full weapon damage. <b>Thunder Joust</b> (1 point): move 10 feet in a straight line at a creature for {{advantage}}, and a Strength save or {{prone}} on a hit. <b>Majestic</b> (2 points): all attacks against you at {{disadvantage}} until your next turn.</p>"},
    {lvl:"Level 6",name:"Rally and Conquer",body:"<p>Every melee hit steals the target's attention: while it stays in your reach, your allies add 1d4 to attack rolls against it. Lost if you are {{incapacitated}} or blinded.</p>"},
    {lvl:"Level 11",name:"Enduring Bulwark",body:"<p>Once per {{shortrest}}, when damage would drop you to 0 {{hitpoints}}, spend points to stay at 1 instead and gain 1d10 {{temporaryhp|temporary hit points}} per point — losing 1d8 of them each turn.</p>"},
    {lvl:"Level 14",name:"Rising Dragonfly",body:"<p>One attack a turn can throw your Saint Weapon at 50/150 feet, transforming it into a spear and adding 1d12 before it flies back. Extra throws cost 1 point each. Anything it hits makes a Constitution {{savingthrow|save}} or loses 1d4+1 {{armorclass}} until your next turn.</p>"},
    {lvl:"Level 17",name:"Unslayable",body:"<p>Take 10 less from all bludgeoning, piercing and slashing damage while not {{incapacitated}}, plus Constitution {{savingthrow|save}} proficiency.</p>"}
  ]};

ENTRIES["ss-kojiro"] = { cls:"swordsaint", nav:"Way of Kojirō", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Kojirō",
  tag:"Wield the oversized blade one-handed, and turn attacks back",
  flavor:"A disputed legend — possibly invented, possibly a nameless swordsman that history gave a name. The stories agree on one thing: an extremely long sword called the washing pole, trained with day and night until it could be swung in one hand. A clever defensive fighter, killed by underhanded tactics, whose followers make sure it does not happen to them.",
  src:"Lyre's Guide to Retia, pp. 422–423",
  mods:{
    focustechnique:"Sparrow Reversal, Backslide and Escape Slayer — all about punishing the approach rather than making it.",
    reaction:"Intercept is the centrepiece: swap places with an ally being targeted, then either brace or counterattack before the trigger resolves.",
    opportunityattack:"Escape Slayer doubles the cost of every foot the target moves, so leaving you is expensive.",
    prone:"Backslide shoves or knocks down whenever a heavy weapon rolls maximum on a damage die.",
    armorclass:"Intercept can add half your proficiency bonus to it until your next turn, in place of the counterattack."
  },
  features:[
    {lvl:"Level 3",name:"Washing Pole Technique",body:"<p>Two-handed Saint Weapons can be wielded in one hand, and versatile ones still use the bigger die that way. Wield it two-handed instead and once per turn you add 1d6 to an attack roll with it.</p>"},
    {lvl:"Level 3",name:"Fighting Style: Proficiency (Two-Handed)",body:"<p>{{fightingstyle|Proficiency (Two-Handed)}}.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Sparrow Reversal</b>, <b>Backslide</b> (2 points: shove or knock {{prone}} when a heavy weapon's damage die rolls maximum) and <b>Escape Slayer</b> (2 points: every foot of the target's movement costs an extra foot until the end of its next turn).</p>"},
    {lvl:"Level 6",name:"Intercept",body:"<p>A {{reaction}} swaps you with an adjacent ally being targeted and redirects the attack to you. Then pick one: half your {{proficiencybonus}} to {{armorclass}}, the same to {{savingthrow|saves}}, or an immediate weapon attack at the attacker that resolves first and may prevent the trigger outright.</p>"},
    {lvl:"Level 11",name:"Superhuman Prospect",body:"<p>A {{bonusaction}} and 2 points cast enhance ability on yourself — and you also gain {{advantage}} on saves of the matching type.</p>"},
    {lvl:"Level 14",name:"Counterstrike",body:"<p>When an attack roll you can see targets you, answer it with a weapon attack using a two-handed or heavy weapon. Beat their roll and the attack is deflected — and you can keep doing it against that creature all turn. Twice per {{longrest}} free, 1 point per counter after that.</p>"},
    {lvl:"Level 17",name:"Backslide",body:"<p>The technique matures into the path's finisher against anything one size larger than you or smaller.</p>"}
  ]};

ENTRIES["ss-muramasa"] = { cls:"swordsaint", nav:"Way of Muramasa", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Muramasa",
  tag:"Demonic blades, and a crit range that keeps widening",
  flavor:"Blood-thirsty warriors wielding the cursed work of a certain legendary blacksmith. They strike hard, repeatedly, and their techniques decay whatever they touch.",
  src:"Lyre's Guide to Retia, pp. 424–425",
  mods:{
    criticalhit:"The whole path. 19–20 from level 3, 18–20 from 14, each one dealing necrotic on top and handing you a free advantaged attack.",
    temporaryhp:"Blood Drinker converts damage dealt into them, decided after you see the damage roll.",
    recklessattack:"The Reckless Fighter style is granted at 3, which is how you get the attack volume the crit range needs.",
    proficiencybonus:"It multiplies your Bloody Critical dice and caps the extra attacks Bloodlust gives you.",
    savingthrow:"Blood Crest forces a Constitution one on your first hit each turn, cursing the target."
  },
  features:[
    {lvl:"Level 3",name:"Bloody Critical",body:"<p>{{criticalhit|Critical hits}} on 19–20. Each one deals extra necrotic equal to 1d10 times half your {{proficiencybonus}} — a full 1d10 times your proficiency bonus if the die showed 20. Once per Attack action.</p>"},
    {lvl:"Level 3",name:"Reckless Attacker",body:"<p>The Reckless Fighter {{fightingstyle|fighting style}}, or an advancement of it if you had it.</p>"},
    {lvl:"Level 6",name:"Bloodlust",body:"<p>A {{criticalhit}} grants an attack with {{advantage}} against another enemy in range, up to half your {{proficiencybonus}} times a turn. Those extra attacks cannot chain.</p>"},
    {lvl:"Level 11",name:"Blood Drinker",body:"<p>2 points on a hit against anything not {{undead}} or a construct converts the damage dealt into {{temporaryhp|temporary hit points}} — decided after you see the roll.</p>"},
    {lvl:"Level 14",name:"Superior Bloody Critical",body:"<p>The necrotic dice become d12s, and your Saint Weapon crits on 18–20.</p>"},
    {lvl:"Level 17",name:"Blood Crest",body:"<p>Your first hit each turn forces a Constitution {{savingthrow|save}} or the target is cursed and marked with a demonic seal — repeatable on later hits for 1 point each.</p>"}
  ]};

ENTRIES["ss-musashi"] = { cls:"swordsaint", nav:"Way of Musashi", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Musashi",
  tag:"Two weapons, and strings of attacks that do not end",
  flavor:"Musashi mastered fighting with two blades and chained attacks seemingly without end. Adaptable, and mindful of how every element of a situation touches the fight.",
  src:"Lyre's Guide to Retia, pp. 425–426",
  mods:{
    focustechnique:"Exemplary Deflection halves an incoming hit for a single point, and Reposition moves you 20 feet whenever someone misses you.",
    reaction:"Point Zero uses one to downgrade a critical hit and counter with two weapon attacks in the same breath.",
    savingthrow:"Way of Five Souls at 11 gives proficiency in all of them, which almost nothing in the game does.",
    criticalhit:"Point Zero means an enemy landing one against you is a trap rather than a disaster.",
    extraattack:"The Undeniable Path bonds a second Saint Weapon, both attuned as a single item."
  },
  features:[
    {lvl:"Level 3",name:"Fighting Style: Two-Weapon Fighting",body:"<p>{{fightingstyle|Two-Weapon Fighting}}.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Exemplary Deflection</b> (1 point): a {{reaction}} halves the damage of an attack you can see hitting you. <b>Reposition</b> (2 points): move 20 feet immediately when a melee attack against you misses.</p>"},
    {lvl:"Level 6",name:"Point Zero",body:"<p>A {{reaction}} turns a {{criticalhit}} against you into an ordinary hit — and in the same reaction you make two weapon attacks, one with each hand, against a creature in reach.</p>"},
    {lvl:"Level 11",name:"Way of Five Souls",body:"<p>Proficiency in every {{savingthrow|saving throw}}.</p>"},
    {lvl:"Level 14",name:"The Undeniable Path",body:"<p>A second Saint Weapon with all the same benefits, and both attune as though they were one magic item.</p>"},
    {lvl:"Level 17",name:"Heartless Heavenly Blade",body:"<p>An action and 4 points: one attack roll and one damage roll applied separately to every creature you choose within 15 feet.</p>"}
  ]};

ENTRIES["ss-pendragon"] = { cls:"swordsaint", nav:"Way of Pendragon", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Pendragon",
  tag:"A knight king who drew the sword and commanded fate",
  flavor:"Chosen by prophecy, Pendragon drew a holy sword from a stone and led a band of noble, troubled knights. His kingdom fell to treachery from within, but he stood tall and radiant until the end. His followers look to fate when in doubt, and are rarely wrong to.",
  src:"Lyre's Guide to Retia, pp. 426–427",
  mods:{
    d20test:"Instincts & Luck is the standout: a bank of pre-rolled high d20s you can substitute for any roll — even after the outcome was declared, for a point.",
    focustechnique:"Light of Hope, Grit, Inspiring Call and Hold Fast — the most supportive technique list in the class.",
    temporaryhp:"Inspiring Call hands 1d10 plus your proficiency bonus to a Wisdom-modifier worth of allies, with resistance to fear and charm attached.",
    savingthrow:"Charisma saves from level 3, and at 17 a failed half-damage save still takes only half.",
    exhaustion:"Avalon's Guidance clears every level of it in a single long rest."
  },
  features:[
    {lvl:"Level 3",name:"Fighting Style: Defense",body:"<p>{{fightingstyle|Defense}}, plus heavy armour and Charisma {{savingthrow|save}} proficiency.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Light of Hope</b>: a {{bonusaction}} makes your Saint Weapon shed 50 feet of bright light and dispel magical darkness up to 4th level; up to 4 points infuse it for +1d10 radiant per point on your next hit. <b>Grit</b> (1 point): add your Strength modifier to every melee hit in an Attack action. <b>Inspiring Call</b> (2 points): Wisdom-modifier allies gain 1d10 plus {{proficiencybonus}} {{temporaryhp|temporary hit points}} and {{advantage}} against {{frightened}} and {{charmed}}.</p>"},
    {lvl:"Level 6",name:"Brave Assault",body:"<p>A {{bonusaction}} after your first attack adds 1d8 to every attack roll you make that turn. {{proficiencybonus}} uses per {{longrest}}.</p>"},
    {lvl:"Level 11",name:"Instincts & Luck",body:"<p>Each {{longrest}}, roll {{proficiencybonus}} d20s, rerolling anything 10 or under until it is 11 or higher — a natural 1 costs you that die. Spend one in place of any {{d20test|d20 roll}} before you roll, or for 1 focus point after the result is already known.</p>"},
    {lvl:"Level 14",name:"Grit and Hold Fast",body:"<p>Hold Fast: 2 points reduce an incoming attack's damage by 1d8 plus your Constitution modifier, stackable on the same attack if declared first.</p>"},
    {lvl:"Level 17",name:"Avalon's Guidance",body:"<p>All healing you receive is maximised, a single {{longrest}} clears every level of {{exhaustion}}, and a failed {{savingthrow|save}} against a half-damage effect still only takes half — a success takes none.</p>"}
  ]};

ENTRIES["ss-tomoe"] = { cls:"swordsaint", nav:"Way of Tomoe", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of Tomoe",
  tag:"Challenged a god of lightning and impressed them",
  flavor:"A bowman who refined their skill past perfection, and was granted the storm for it. A tragic figure who always took the field and lost everything else. Those who take this path accept that they carry Tomoe's karma as well as their lightning.",
  src:"Lyre's Guide to Retia, pp. 428–429",
  mods:{
    criticalhit:"19–20 on ranged attacks from 6, 18–20 from 17, with extra damage dice on each.",
    disadvantage:"Eyes of the Saint removes it entirely at long range and while an enemy is in your face — the only path that ignores both.",
    focustechnique:"Thunder Lotus, Majestic, Rise and Fly and Wind Chain — Wind Chain stretches melee attacks out to 30 feet for the rest of the turn.",
    resistance:"Raikou Bombardment grants it to lightning, which matters once you are the one filling the field with it.",
    stunned:"Aim Beyond Perfection stuns anything that fails a save against you by 5 or more."
  },
  features:[
    {lvl:"Level 3",name:"Fighting Style: Archery",body:"<p>{{fightingstyle|Archery}}, plus you ignore the loading property and drawing a thrown weapon is free if you throw it immediately.</p>"},
    {lvl:"Level 3",name:"Thunder Lotus",body:"<p>1 point on a hit charges the attack with lightning: a Dexterity {{savingthrow|save}} or 2d8 lightning, plus 1d8 per extra point, plus 1d12 more if it was your Saint Weapon. Metal armour means {{disadvantage}} on the save.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Majestic</b> (2 points): all attacks against you at {{disadvantage}}. <b>Rise and Fly</b> (1 point): 10 more feet of {{speed}}, standing jumps and running up walls. <b>Wind Chain</b> (1 point): melee attacks reach 30 feet for the rest of the turn and still count as melee.</p>"},
    {lvl:"Level 6",name:"Eyes of the Saint",body:"<p>No {{disadvantage}} from enemies within 5 feet or from long range, and ranged {{criticalhit|crits}} on 19–20 with an extra damage die.</p>"},
    {lvl:"Level 11",name:"Raikou Bombardment",body:"<p>{{resistance}} to lightning, and your first hit on each creature each turn deals 1d8 plus half your level in extra lightning damage.</p>"},
    {lvl:"Level 14",name:"Lightning Blossom Stance",body:"<p>An action and 3 points arm a ranged weapon with spiritual lightning for a minute — it fires bolts instead of ammunition and its damage becomes lightning. While armed, an action drops a 15-foot sphere for 1d10 plus the weapon's dice on a failed Dexterity {{savingthrow|save}}, once free when you arm it.</p>"},
    {lvl:"Level 17",name:"Aim Beyond Perfection",body:"<p>Ranged {{criticalhit|crits}} on 18–20 with two extra dice on top of Eyes of the Saint — and anything that misses a save against you by 5 or more is {{stunned}}.</p>"}
  ]};

ENTRIES["ss-snowwhite"] = { cls:"swordsaint", nav:"Way of the Snow White Sleeve", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of the Snow White Sleeve",
  tag:"A dance that freezes everything around it",
  flavor:"A mysterious fighter who blended dance into swordwork with a dazzling white blade of ice, defending lost souls from the fiends that preyed on them. Spoken of like a ghost walking inside a snowstorm.",
  src:"Lyre's Guide to Retia, pp. 427–428",
  mods:{
    difficultterrain:"Dance of the White Moon makes a 15-foot sphere of it for everyone but you, with cold damage attached.",
    speed:"The path's whole plan. Dancing Snowflakes cuts it, Dance of the Freezing Pond drops it to 0, and Dance of the Ice Blade applies slow outright.",
    reaction:"Dance of the Freezing Pond also strips them, which is what makes it more than a movement debuff.",
    savingthrow:"Constitution saves everywhere — against your aura, your freezing pond and your final chill.",
    focustechnique:"Dancing Snowflakes and Severance — the latter imposing disadvantage on every attack the target makes for a minute."
  },
  features:[
    {lvl:"Level 3",name:"Cold in Death",body:"<p>Dropping a creature to 0 {{hitpoints}} or landing a {{criticalhit}} coats you in ice: the next attack that hits you within a minute deals your Sword Saint level less damage.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Dancing Snowflakes</b> (1 point): an {{opportunityattack}} hit cuts their {{speed}} by five times your {{proficiencybonus}} in feet. <b>Severance</b> (2 points): a Constitution {{savingthrow|save}} or {{disadvantage}} on all their attacks for a minute, repeatable at the end of each of their turns.</p>"},
    {lvl:"Level 6",name:"Dance of the White Moon",body:"<p>A {{bonusaction}} fills a 15-foot sphere around you with bright moonlight for a minute. It is {{difficultterrain}} for everyone but you, and anyone starting a turn or entering takes 1d8 cold on a failed Constitution {{savingthrow|save}} — 1d10 at level 10, 1d12 at 16. Once per {{longrest}}, or 2 points for another.</p>"},
    {lvl:"Level 11",name:"Dance of the Freezing Pond",body:"<p>A {{bonusaction}} fills 20 feet around you with ice: a failed Constitution {{savingthrow|save}} drops the target's {{speed}} to 0 and strips its {{reaction}} until your next turn. Liquid and gelatinous creatures, and anything submerged, roll at {{disadvantage}}. Half your {{proficiencybonus}} uses per {{longrest}}.</p>"},
    {lvl:"Level 14",name:"White Haze",body:"<p>2 points reduce an incoming attack's damage by 1d8 plus your Constitution modifier, stackable if declared before the damage lands. Your Saint Weapon also freezes, adding 1d8 plus half your level in cold to the first hit each turn.</p>"},
    {lvl:"Level 17",name:"Dance of the Ice Blade",body:"<p>1 point on a hit forces a Constitution {{savingthrow|save}} or the target is affected as by slow, repeating the save at the end of each of its turns.</p>"}
  ]};

ENTRIES["ss-erodedlord"] = { cls:"swordsaint", nav:"Way of the Eroded Lord", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of the Eroded Lord",
  tag:"Sorcery out of rusted armour, and nobody knows why",
  flavor:"A righteous champion of Halte Itonia in an ancient suit of eroded heavy armour that seemed to grant him strength — and sorcery, despite no arcane bloodline. He vanished mid-battle at the Itonian Capital. His followers are mostly trying to work out where the power came from.",
  src:"Lyre's Guide to Retia, pp. 419–421",
  mods:{
    spellslot:"You get real Sorcerer slots as a one-third caster, and they are as much a damage resource as a spell resource.",
    focustechnique:"Burden of the Mind holds concentration for 2 points, Spiritual Armor buys temporary hit points and AC, Target Split duplicates a single-target spell.",
    concentration:"Burden of the Mind means losing it is a choice rather than a dice roll.",
    armorclass:"Spiritual Armor adds half your proficiency bonus while you hold the temporary hit points and no shield.",
    spellsavedc:"Runs off Charisma, and anything that raises your focus technique DC raises it too."
  },
  features:[
    {lvl:"Level 3",name:"Fighting Style: Defense",body:"<p>{{fightingstyle|Defense}}.</p>"},
    {lvl:"Level 3",name:"Spellcasting",body:"<p>Sorcerer spells on Charisma — two cantrips and three 1st-level spells at 3, growing as a one-third caster. Your weapon is your focus, and your {{spellsavedc}} rises with anything that raises your focus technique DC.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Burden of the Mind</b> (2 points): keep {{concentration}} instead of losing it. <b>Spiritual Armor</b>: 1d10 {{temporaryhp|temporary hit points}} per point plus half your level, and half your {{proficiencybonus}} to {{armorclass}} while you hold them without a shield. <b>Target Split</b>: pay the spell's base level in points to give a single-target spell a second target.</p>"},
    {lvl:"Level 6",name:"Maximum Output",body:"<p>Spend a {{spellslot}} on a weapon hit for 1d10 force damage, plus another 1d10 per level of the slot. The attack counts as magical.</p>"},
    {lvl:"Level 11",name:"Break the Vault",body:"<p>Cast an action-cost Sorcerer spell and still make a weapon attack in the same action. <b>Perfect Conductivity</b> also lets 1 point add 1d4 to a missed melee attack roll, up to {{proficiencybonus}} times on the same roll.</p>"},
    {lvl:"Level 14",name:"Carve Your Own Path",body:"<p>Below half {{hitpoints}}, a {{bonusaction}} and 3 points add half your {{proficiencybonus}} to every attack, {{savingthrow|save}} and {{abilitycheck}} for a minute — suspended if you heal past half, resuming if you drop again.</p>"},
    {lvl:"Level 17",name:"Grit Those Teeth",body:"<p>Focus points upcast your Sorcerer spells, one level per point to a maximum of 9th. Maximum Output's slot counts a level higher, your first Saint Weapon hit each turn deals half your level in force damage, and 2 points let allies within 30 feet reroll a {{savingthrow|save}} that {{stunned|stunned}}, frightened or charmed them.</p>"}
  ]};

ENTRIES["ss-heavenbreaker"] = { cls:"swordsaint", nav:"Way of the Heavenbreaker", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Way of the Heavenbreaker",
  tag:"Dumb luck, a spiral halberd and total confidence",
  flavor:"An enigmatic, boisterous figure who came out of the crowd to overthrow tyrants with a spiral halberd — rumoured to be a reincarnated Monumental soldier, and to have piloted a great machine against an interplanar threat before disappearing. They pulled their people forward endlessly, and never knew the machine was a DGR unit.",
  src:"Lyre's Guide to Retia, pp. 421–422",
  mods:{
    d20test:"The path bends them relentlessly — a natural 1 becomes a 10, and any time you roll multiple dice you simply pick.",
    armorclass:"Boastful Defense is 10 plus Dexterity plus Charisma, so charisma is a defensive stat here.",
    disadvantage:"Make the Impossible Possible turns it into a free choice among the dice, and Giga Helix hands it to everyone attacking you.",
    criticalhit:"Giga Helix converts a natural 20 into 8d12 force damage for 2 points — or 5 points on an ordinary hit.",
    difficultterrain:"Helictical Passage ignores it while you drill across the battlefield to whoever you are attacking."
  },
  features:[
    {lvl:"Level 3",name:"Boastful Defense",body:"<p>Unarmoured, your {{armorclass}} is 10 plus Dexterity plus Charisma.</p>"},
    {lvl:"Level 3",name:"Fighting Style: Reckless Fighter",body:"<p>{{fightingstyle|Reckless Fighter}}.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Arcane Strike</b> and <b>Fortified Footing</b> (1 point: having taken no movement, your {{speed}} becomes 0, you Dodge as a {{bonusaction}}, and you gain +2 to melee attacks until your next turn). No other path may borrow these.</p>"},
    {lvl:"Level 6",name:"Dumb Luck",body:"<p>A natural 1 on any attack, {{abilitycheck}} or {{savingthrow|save}} counts as a 10 instead.</p>"},
    {lvl:"Level 11",name:"Make the Impossible Possible",body:"<p>Whenever you roll multiple d20s — {{disadvantage}} included — 2 points let you simply choose which result you use.</p>"},
    {lvl:"Level 14",name:"Helictical Passage",body:"<p>Attack anything within your remaining movement, even out of reach: you drill to the nearest open space beside them, spending that movement, ignoring {{difficultterrain}} and {{opportunityattack|opportunity attacks}}.</p>"},
    {lvl:"Level 17",name:"Giga Helix",body:"<p>A natural 20 plus 2 points deals an extra 8d12 force damage — you cannot repeat it until your next turn, but every attack against you has {{disadvantage}} in the meantime. Or spend 5 points to do it on an ordinary hit. Not multiplied by {{criticalhit|crits}}.</p>"}
  ]};

ENTRIES["ss-gadabout"] = { cls:"swordsaint", nav:"Gadabout", navSub:"Levels 3 · 6 · 11 · 14 · 17", kicker:"Sword Saint path",
  name:"Gadabout",
  tag:"No path at all, and not sorry about it",
  flavor:"The only path that follows nobody. Sword Saints who abandoned their discipline and now seek personal fulfilment — looked on by other swordsmen as wanderers and quitters who achieve very little. They sharpen themselves instead of someone else's legend.",
  src:"Lyre's Guide to Retia, pp. 416–417",
  mods:{
    focustechnique:"Deride and Jack Mastery, plus a stolen fighting style from any other path — the Gadabout takes rather than inherits.",
    focuspointsretia:"Deride spends 2 as a reaction to cut an attack roll by your Charisma modifier, declared after the roll.",
    frightened:"Contemptible Reputation is the only fear effect in the class, and up to 5 points widen it to more targets.",
    proficiencybonus:"Pathcarver's Expertise turns one new proficiency into something close to expertise on the checks that matter.",
    exhaustion:"Pleasure Seeker sidesteps the usual costs — poison immunity, maximised healing, an extra short rest and a four-hour long rest."
  },
  features:[
    {lvl:"Level 3",name:"Stolen Fighting Style",body:"<p>Any {{fightingstyle|fighting style}} belonging to any other Path of Devotion.</p>"},
    {lvl:"Level 3",name:"Focus Techniques",body:"<p><b>Deride</b> (2 points): a {{reaction}} cuts an attack roll against you by your Charisma modifier, declared after the roll but before the result. <b>Jack Mastery</b>: applies to whatever you happen to be swinging.</p>"},
    {lvl:"Level 6",name:"Pathcarver's Expertise",body:"<p>Either a new skill or tool proficiency that rolls better than it should, or a sharpening of what you already had.</p>"},
    {lvl:"Level 11",name:"Contemptible Reputation",body:"<p>A {{bonusaction}} makes a creature within 30 feet take a Wisdom {{savingthrow|save}} or become {{frightened}} of you — up to 5 points add extra targets.</p>"},
    {lvl:"Level 14",name:"Unbonded",body:"<p>Your Saint Weapon gives +2 instead of +1, and attuning to it costs you no attunement slot.</p>"},
    {lvl:"Level 17",name:"Pleasure Seeker",body:"<p>{{immunity}} to {{poisoned}}, maximum {{hitpoints}} from every potion, heal and treatment, an extra {{shortrest}} per {{longrest}}, and a {{longrest}} in four hours — two of which you can spend moderately active.</p>"}
  ]};

CLASSES.swordsaint.note = "<strong>The gentlest homebrew class here.</strong> No spell list at all — one pool of focus points, spent on techniques passed down by the legendary swordsmen you're emulating. Twelve Paths of Devotion, each modelled on a different ancient master, each with its own Saint Relic and fighting style.";
CLASSES.swordsaint.groups[1].keys = ["ss-kyuubi","ss-bluemetal","ss-dragonfly","ss-kojiro","ss-muramasa","ss-musashi","ss-pendragon","ss-tomoe","ss-snowwhite","ss-erodedlord","ss-heavenbreaker","ss-gadabout"];


/* ===== Retia Monk subclasses — moved out of Sword Saint, where they did not belong ===== */

ENTRIES["mo-brokenchain"] = { cls:"monk", nav:"Way of the Broken Chain", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass · homebrew",
  name:"Way of the Broken Chain",
  tag:"Invite the blow, then strike through the opening it makes",
  flavor:"Untether yourself from the consequences of the flesh and use your body as a weapon meant to bloody and kill. Broken Chain monks openly invite attacks and answer them in the gaps that recklessness opens up.",
  src:"Lyre's Guide to Retia, pp. 464–465",
  mods:{
    focuspoints:"Retia calls this Ki, and the subclass spends very little of it — Reckless Fist is free, and only Devastating Blows has a repeat cost.",
    advantage:"Reckless Fist hands it to you against one target and to everyone against you — the same trade a Barbarian makes, but triggered by missing.",
    martialartsdie:"Devastating Blows adds one to every Reckless Fist hit.",
    flurryofblows:"Desperate Measures adds an extra attack to it, and to the Attack and Dash actions, while you are under half health.",
    unarmoreddefense:"Desperate Measures gives it +2 while you are bloodied, so the subclass gets tougher as it gets more dangerous."
  },
  features:[
    {lvl:"Level 3",name:"Reckless Fist",body:"<p>Once per turn, when you miss with a Monk weapon or {{unarmedstrike}}, enter a violent fervor: that attack and every matching attack against that target until your next turn gain {{advantage}} — and every attack against you gains it too.</p>"},
    {lvl:"Level 6",name:"Adversarial Techniques",body:"<p><b>Cleaving Hand.</b> Drop a creature to 0 {{hitpoints}} and immediately attack another in range, carrying the excess damage over — and inheriting Reckless Fist onto the new target. <b>Into the Spearhead.</b> Give an incoming attack {{advantage}} in exchange for {{resistance}} to its damage, and if it misses anyway, answer it with a free strike.</p>"},
    {lvl:"Level 11",name:"Devastating Blows",body:"<p>Once per {{shortrest}}, a {{bonusaction}} casts foresight on yourself for 10 minutes — repeatable for 5 Ki points. Every Reckless Fist hit also deals an extra {{martialartsdie|Martial Arts die}}.</p>"},
    {lvl:"Level 17",name:"Desperate Measures",body:"<p>Below half {{hitpoints}}: one extra attack on the Attack action, the Dash action or {{flurryofblows|Flurry of Blows}}; +2 to your {{unarmoreddefense}}; and {{temporaryhp|temporary hit points}} equal to half your Monk level at the start of each turn you begin above 0.</p>"}
  ]};

ENTRIES["mo-deep"] = { cls:"monk", nav:"Way of the Deep", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass · homebrew",
  name:"Way of the Deep",
  tag:"Trained underwater, and it shows in everything",
  flavor:"Monks who hone their bodies in the ocean, learning to endure harsh conditions and to move with the water rather than against it. They come to see themselves as single drops inside a crashing wave — flexible, swift, and quietly aware of their small part in something much larger.",
  src:"Lyre's Guide to Retia, pp. 465–466",
  mods:{
    focuspoints:"Retia calls this Ki. Eel Weave costs none at all, and Ocean's Gift turns the pool into a small spell list.",
    speed:"You get a swim speed equal to your walking speed at level 3, which most parties never have.",
    difficultterrain:"You stop treating allies' spaces as it and start treating enemies' spaces as merely that — you walk through people.",
    opportunityattack:"Kraken's Reach extends yours to 10 feet, and you can make them against anything leaving either range band.",
    cover:"Water Locker's membrane gives three-quarters of it against anything shooting in or out."
  },
  features:[
    {lvl:"Level 3",name:"Bonus Proficiencies",body:"<p>Athletics, a swim {{speed}} equal to your walking speed, no underwater penalties on Monk weapons, and five more minutes of held breath.</p>"},
    {lvl:"Level 3",name:"Eel Weave",body:"<p>Disengage as a {{bonusaction}} for free. Allies' spaces stop being {{difficultterrain}} for you entirely, and enemies' spaces become merely that.</p>"},
    {lvl:"Level 6",name:"Kraken's Reach",body:"<p>Tentacle-like extensions of water give your {{unarmedstrike|unarmed strikes}} and Monk weapons 10 feet of reach, with {{opportunityattack|opportunity attacks}} at either range.</p>"},
    {lvl:"Level 11",name:"Ocean's Gift",body:"<p>Cast Water Walk (1 Ki), Drowning Wave (2), Hydro Wall (2) and Hydro Cage (3) with no {{spellslot|spell slots}}, on Wisdom.</p>"},
    {lvl:"Level 17",name:"Water Locker",body:"<p>An action and 1+ Ki raise a membrane of water 5 feet across, plus 5 more per extra point, lasting a minute. It grants three-quarters {{cover}} through its wall and blocks fire and lightning crossing it; a {{bonusaction}} sends a sonic pulse for 2d12 thunder; and it pushes inward or outward, dumping creatures that fail a Strength {{savingthrow|save}} either into the sphere at 0 {{speed}} or out of it {{prone}}.</p>"}
  ]};

ENTRIES["mo-freezingsoul"] = { cls:"monk", nav:"Way of the Freezing Soul", navSub:"Levels 3 · 6 · 11 · 17", kicker:"Monk subclass · homebrew",
  name:"Way of the Freezing Soul",
  tag:"A scythe of condensed ice, and a body that stopped minding the cold",
  flavor:"Monks who temper mind and body in the frozen wastelands south of Retia, enduring until the environment stops mattering, then bending ice and snow to their will. The signature is a scythe manifested out of moisture and treated as an extension of the arm.",
  src:"Lyre's Guide to Retia, pp. 466–467",
  mods:{
    focuspoints:"Retia calls this Ki. One point makes your scythe, and Binding Blizzard scales directly with how many you are willing to throw at it.",
    resistance:"Cold, from level 3 — and ice and snow stop being difficult terrain for you.",
    martialartsdie:"Rime Coffin deals one plus your Wisdom modifier at the start of each of the victim's turns.",
    difficultterrain:"Snow and ice stop counting as it, which in this subclass's home terrain is most of the map.",
    temporaryhp:"Snow Bandages rerolls every Hit Die you spent on a short rest and converts the result into them."
  },
  features:[
    {lvl:"Level 3",name:"Tundra Borne",body:"<p>{{resistance}} to cold, {{advantage}} on saves against freezing conditions, and snow and ice stop being {{difficultterrain}}.</p>"},
    {lvl:"Level 3",name:"Frost Reaper",body:"<p>Combat scythes count as Monk weapons with finesse. <b>Harvesting Strike.</b> Any {{unarmedstrike}} can be a scythe attack instead. <b>Ice Scythe.</b> 1 Ki as a {{bonusaction}} condenses one out of the air, dealing cold and carrying an enhancement bonus of half your {{proficiencybonus}}. <b>Oversharpen.</b> Attack with {{advantage}} and, on a hit, add extra dice equal to that bonus — then the scythe shatters.</p>"},
    {lvl:"Level 6",name:"Snow Bandages",body:"<p>On a {{shortrest}}, reroll every Hit Die you spent and gain that much in {{temporaryhp|temporary hit points}}, capped so they and your {{hitpoints}} never exceed your maximum.</p>"},
    {lvl:"Level 11",name:"Binding Blizzard",body:"<p>An action and 2 Ki or more — up to half your Monk level — throws a wave of frost as a 20-foot sphere centred on you, hitting 2 plus the points spent in targets, or a 5-foot line 10 feet long per point that hits everything. A Constitution {{savingthrow|save}} or {{proficiencybonus}} d10s of cold and {{speed}} reduced to 0 until your next turn.</p>"},
    {lvl:"Level 17",name:"Rime Coffin",body:"<p>3 Ki on a hit coats the target in ice on a failed Constitution {{savingthrow|save}}: half {{speed}}, one action or {{bonusaction}} per turn but not both, and a {{martialartsdie|Martial Arts die}} plus Wisdom in cold damage each turn, with a save at the end of each of theirs.</p>"}
  ]};

CLASSES.monk.groups.push({ label:"Homebrew subclasses (Retia)", keys:["mo-brokenchain","mo-deep","mo-freezingsoul"] });
CLASSES.monk.foot = "Sources: Player's Handbook (2024), Chapter 3 — Monk, pp. 100–107. Homebrew: Lyre's Guide to Retia — Land of Industry, Ch. 8.";


// these three are Retia Monk subclasses, not Sword Saint paths — they now live under Monk
delete ENTRIES["ss-freezingsoul"];
delete ENTRIES["ss-deep"];
delete ENTRIES["ss-brokenchain"];


/* ===== Petal Knight epithets, brought to parity ===== */

ENTRIES["pk-blackrose"] = { cls:"petalknight", nav:"Black Rose", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Black Rose", tag:"Heavy weapons, marked prey",
  flavor:"Manifests for those who seek power and reject the notion that the world is pure — a black flower that only emerges when nature has been guided or forced. They break the order's standards, carrying weapons considered far too heavy for a Petal Knight.",
  src:"Lyre's Guide to Retia, pp. 390–391",
  mods:{
    epithet:"The only epithet that pushes you toward heavy weaponry, against everything else the class assumes.",
    criticalhit:"Improved Critical in melee at level 6, which nothing else in the class offers this early — and Stained Roots turns each one into healing.",
    reaction:"Noble Prey gives you an extra one per turn, one against each marked target, spent before your ordinary reaction.",
    disadvantage:"You cannot suffer it on saves against your prey, and you can impose it on their attacks against you.",
    prone:"The Repulsion branch shoves everyone 30 feet and knocks down whatever hits a wall on the way."
  },
  features:[
    {lvl:"Level 2",name:"Divergent Arms",body:"<p>Heavy armour and every simple and martial weapon. Features that would demand a one-handed weapon now work with anything you are proficient in.</p>"},
    {lvl:"Level 6",name:"Noble Prey",body:"<p>A {{bonusaction}} marks a creature for an hour. Against it: you cannot have {{disadvantage}} on {{savingthrow|saves}}, it needs total {{cover}} to hide from you, your first attack each turn has {{advantage}}, its attacks on you can be given {{disadvantage}} with a {{reaction}} — and you gain an extra {{reaction}} per turn for each marked target. {{proficiencybonus}} uses per {{longrest}}.</p>"},
    {lvl:"Level 6",name:"Improved Critical (Melee)",body:"<p>{{criticalhit|Critical hits}} on 19–20 with melee weapon and melee spell attacks.</p>"},
    {lvl:"Level 11",name:"Black Rose Branches",body:"<p>Two Virtuous Branches options. <b>Billowing Bulwark</b>: black petals and wind give all ranged attacks against you {{disadvantage}} until your next turn. <b>Noble Mark</b>: anything your spell hits becomes Noble Prey for free. <b>Repulsion</b>: push everyone the spell caught 30 feet, knocking them {{prone}} if they hit something solid.</p>"},
    {lvl:"Level 15",name:"Stained Roots",body:"<p>A {{criticalhit}} in melee against anything that is not an elemental, {{undead}} or a construct heals you for the damage dealt — or gives half of it as {{temporaryhp|temporary hit points}} if you are already whole.</p>"}
  ]};

ENTRIES["pk-camellia"] = { cls:"petalknight", nav:"Camellia", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Camellia", tag:"Bonds",
  flavor:"A poofy pink flower for trusting people who believe in teamwork and wear their heart on their sleeve. The knight of the camellia forms a temporary but undying bond with one ally, and from there they guide each other's hands and see through each other's eyes.",
  src:"Lyre's Guide to Retia, pp. 392–393",
  mods:{
    epithet:"Your power scales with who you are standing beside, which makes this the most party-dependent epithet in the class.",
    reaction:"The whole subclass runs on it — negating an attack on your partner, granting them an action, reflecting their initiative.",
    advantage:"Dual Radiance turns any creature one of you has hit into a soft target for the other.",
    temporaryhp:"Virtue of the Soft converts a bond use into 1d10 plus your level, and gives every attack against you disadvantage while they last.",
    bonusaction:"Bond of Trust spends one to make your partner attack, which is as close as this class gets to a second turn."
  },
  features:[
    {lvl:"Level 2",name:"Wylam Bond",body:"<p>A {{bonusaction}} marks an ally you touch with an ethereal camellia for a minute. Either of you can spend a {{reaction}} to make an attack on the other miss outright, even unseen — then roll a Charisma check against half the attack roll, and on a failure the bond ends. Once per {{shortrest}}, twice from level 11, one partner at a time.</p>"},
    {lvl:"Level 6",name:"Dual Radiance",body:"<p>When either of you attacks a creature the other has hit since their last turn, the first such attack each turn has {{advantage}}.</p>"},
    {lvl:"Level 6",name:"Virtue of the Soft",body:"<p>Spend a bond use as a {{bonusaction}} for 1d10 plus your total level in {{temporaryhp|temporary hit points}} — and while you hold them, ghostly petals give every attack against you {{disadvantage}}.</p>"},
    {lvl:"Level 11",name:"Blooming Action",body:"<p>End the bond with your {{reaction}} on your partner's turn to give them an extra action — not stacking with {{actionsurge}} or anything like it.</p>"},
    {lvl:"Level 11",name:"Bond of Trust",body:"<p>Either of you can spend a {{bonusaction}} to make the other attack, and you see and hear everything the other does.</p>"},
    {lvl:"Level 15",name:"Stardust Dream",body:"<p>Either of you can cast a spell from the other's position, or target a point seen through their senses — and touch-range effects reach each other at any distance.</p>"}
  ]};

ENTRIES["pk-coralrose"] = { cls:"petalknight", nav:"Coral Rose", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Coral Rose", tag:"Illusion and teleportation",
  flavor:"Adaptable fighters who deceive with illusion and speed, never quite where the blow lands. The trickster of the fourteen — deception where the rest of the order uses conviction.",
  src:"Lyre's Guide to Retia, pp. 393–394",
  mods:{
    invisible:"Deceptive Bouquet is a self-refreshing invisibility that survives attacking, so long as you keep passing the check.",
    teleport:"Undeterrable Pace grants a teleport speed equal to your movement, which makes blinking part of a normal turn.",
    epithet:"The escape artist of the fourteen — every feature is about not being where they expect.",
    opportunityattack:"Undeterrable Pace gives them all disadvantage against you, on top of 10 extra feet of speed.",
    charmed:"Breath of Tranquility ends it, or frightened, poisoned, stunned or paralyzed, at the cost of your action that turn."
  },
  features:[
    {lvl:"Level 2",name:"Deceptive Bouquet",body:"<p>A {{bonusaction}} leaves an illusory clone in your space and turns you {{invisible}}. The clone speaks and gestures for you. At the end of each turn, and whenever you attack or cast, roll a Charisma {{savingthrow|save}} against 8 plus the rounds you have been hidden — fail and you reappear. Striking or being struck reveals you for an instant, then another clone forms as you slip away.</p>"},
    {lvl:"Level 6",name:"Breath of Tranquility",body:"<p>Start a turn {{charmed}}, {{frightened}}, {{poisoned}}, {{stunned}} or paralyzed and you can end one of them at once — forfeiting your action, but keeping your {{bonusaction}} and movement.</p>"},
    {lvl:"Level 11",name:"Coral Rose Branches",body:"<p>Virtuous Branches options, including <b>Advance</b>: a d10 you hold for a minute and spend on any failed attack or {{savingthrow|save}}, possibly turning it around.</p>"},
    {lvl:"Level 15",name:"Undeterrable Pace",body:"<p>+10 feet of {{speed}} permanently, {{disadvantage}} on all {{opportunityattack|opportunity attacks}} against you, and a {{bonusaction}} that grants a {{teleport}} speed equal to your movement for the turn. Half your {{proficiencybonus}} uses per {{shortrest}}.</p>"}
  ]};

ENTRIES["pk-dahlia"] = { cls:"petalknight", nav:"Dahlia", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Dahlia", tag:"Flame and recklessness",
  flavor:"A striking crimson flower for those who confront danger head-on with vibrant enthusiasm. They wreathe themselves in the element that provokes change and rebirth in nature, and bathe in it enthusiastically.",
  src:"Lyre's Guide to Retia, pp. 394–395",
  mods:{
    criticalhit:"An expanded range plus the flames makes this the highest-damage epithet of the fourteen.",
    extraattack:"Extra Attack Improvement at 11 gives three attacks, so long as nothing heavy or two-handed is involved.",
    reaction:"Infernal Rebuff burns anything that enters or leaves your reach, which punishes both approaching and disengaging.",
    epithet:"Aggression where the order usually prefers restraint.",
    resistance:"Duke of Flames wraps you in a retaliatory blaze that answers every melee hit you take."
  },
  features:[
    {lvl:"Level 2",name:"Flames of Passion",body:"<p>A {{bonusaction}} wreathes you in cinders for a minute. Your first weapon attack each turn deals extra fire damage, alongside the rest of the trance's benefits.</p>"},
    {lvl:"Level 6",name:"Infernal Rebuff",body:"<p>A {{reaction}} when a creature enters or leaves your reach: a Dexterity {{savingthrow|save}} against your {{spellsavedc}} or half your total level in fire damage.</p>"},
    {lvl:"Level 11",name:"Extra Attack Improvement",body:"<p>Three attacks on the Attack action instead of one — none of them with a heavy or two-handed weapon.</p>"},
    {lvl:"Level 15",name:"Duke of Flames",body:"<p>Flames of Passion now adds its fire damage to <em>every</em> attack, and anything that hits you in melee while it burns takes the blaze back.</p>"}
  ]};

ENTRIES["pk-foxandcub"] = { cls:"petalknight", nav:"Fox and Cub", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Fox and Cub", tag:"Nurturing light",
  flavor:"Gentle travellers tied to the earth and to the light that comes back after dark. Their flower blooms on the collar whenever magical darkness falls, glowing orange and burning straight through it.",
  src:"Lyre's Guide to Retia, pp. 396–397",
  mods:{
    epithet:"The healer of the fourteen, and the only one that opens the Druid list.",
    hitpoints:"Regenerative Glow restores 5 plus your Constitution every turn below half — and unconditionally in sunlight.",
    preparedspells:"Harmonious Oath lets any Petal Knight spell you learn be a Druid spell instead.",
    invisible:"Cubfire Light reveals invisible creatures within 30 feet while it burns.",
    disadvantage:"Golden Smite removes it against anything hidden by invisibility, cover or darkness."
  },
  features:[
    {lvl:"Level 2",name:"Golden Sun",body:"<p>Inside any magical darkness, a glowing flower blooms at your collar and sheds light that cuts through it.</p>"},
    {lvl:"Level 2",name:"Harmonious Oath",body:"<p>Any Petal Knight spell you learn can be taken from the Druid list instead, counting as a Petal Knight spell.</p>"},
    {lvl:"Level 6",name:"Cubfire Light",body:"<p>An action wraps you in warm radiance for a minute, with spectral foxes circling you. Among its benefits, you see {{invisible}} creatures within 30 feet.</p>"},
    {lvl:"Level 11",name:"Gift of the Sun",body:"<p>Virtuous Flora options including <b>Golden Smite</b>: your smite becomes radiant, and suffers no {{disadvantage}} against a target hidden by invisibility, {{cover}} or darkness.</p>"},
    {lvl:"Level 15",name:"Regenerative Glow",body:"<p>Below half {{hitpoints}}, regain 5 plus your Constitution modifier at the start of each turn as golden threads knit you shut — and in direct sunlight, regardless of how hurt you are.</p>"}
  ]};

ENTRIES["pk-foxglove"] = { cls:"petalknight", nav:"Foxglove", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Foxglove", tag:"Poisons and hazards",
  flavor:"For those with a travel-lust for exotic places — naturally equipped for whatever grows there and whatever it does to you. They hand out poison as readily as they shrug it off.",
  src:"Lyre's Guide to Retia, pp. 397–398",
  mods:{
    poisoned:"You deal it and become immune to it — the epithet's whole identity, and Creeping Death turns it lethal outright.",
    resistance:"Venom Epithet gives it to poison, and Toxicological Miracle converts incoming poison into healing for you or an ally.",
    reaction:"Toxicological Miracle spends one to rewrite poison damage as hit points, even retroactively.",
    pactspellslots:"Toxic Smite is where most of yours go.",
    epithet:"The only one that makes a hostile environment into an advantage rather than an obstacle."
  },
  features:[
    {lvl:"Level 2",name:"Bonus Proficiencies",body:"<p>Survival and poisoner's kits.</p>"},
    {lvl:"Level 2",name:"Toxic Smite",body:"<p>Spend a {{pactspellslots|pact slot}} on a one-handed melee hit for extra damage in a purple miasma. It does not stack with other smites.</p>"},
    {lvl:"Level 6",name:"Toxicological Miracle",body:"<p>A {{reaction}} when you or anyone within 30 feet would take poison damage: they take none and heal that much instead.</p>"},
    {lvl:"Level 11",name:"Venom Epithet",body:"<p>+1d8 poison on your weapon attacks, {{resistance}} to poison, and {{immunity}} to anything you breathe in.</p>"},
    {lvl:"Level 15",name:"Creeping Death",body:"<p>Hit a {{poisoned}} creature in melee and spend a Virtuous Flora use: a Constitution {{savingthrow|save}} or the poison floods them and drops them to 0 {{hitpoints}} on the spot.</p>"}
  ]};

ENTRIES["pk-gardenia"] = { cls:"petalknight", nav:"Gardenia", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Gardenia", tag:"Standing your ground",
  flavor:"Pure knights who hold the world to a high standard and refuse to give an inch of it. Strong, enduring, and hardest to move of the fourteen.",
  src:"Lyre's Guide to Retia, pp. 398–399",
  mods:{
    epithet:"The immovable one — Gardenia never gives ground, which pairs oddly well with a light-armour class.",
    prone:"You cannot be knocked down by anything your own size, and you break grapples as a bonus action.",
    savingthrow:"Proud Heart converts a killing blow into a Charisma save you can simply pass, at an escalating DC.",
    grappled:"Advantage on every roll to resist or escape it, plus shoves and restraints.",
    preparedspells:"Purity of Nature opens the Cleric list to you."
  },
  features:[
    {lvl:"Level 2",name:"Purity of Nature",body:"<p>Any Petal Knight spell you learn can be a Cleric spell instead, of a level you have slots for.</p>"},
    {lvl:"Level 6",name:"Bane of the Unknown",body:"<p>Nothing your size or smaller can knock you {{prone}}, you have {{advantage}} against {{grappled|grapples}}, shoves and {{restrained|restraints}}, and you break a grapple as a {{bonusaction}}.</p>"},
    {lvl:"Level 6",name:"Royal Posture",body:"<p>+1d6 radiant against monstrosities and aberrations, 2d6 from level 14. Spend a {{pactspellslots|pact slot}} on a hit and every creature of that type within 30 feet makes a Wisdom {{savingthrow|save}} or is turned for a minute.</p>"},
    {lvl:"Level 11",name:"Gardenia Branches",body:"<p>Virtuous Branches options. <b>Buffer</b>: all damage you take is reduced by half your Petal Knight level until your next turn. <b>Expedience</b>: creatures your spell touched move half their {{speed}} with their {{reaction}}, no {{opportunityattack|opportunity attacks}}. <b>Rejuvenation</b>: a healing spell also cures {{poisoned}}, {{frightened}}, {{stunned}} or {{charmed}}.</p>"},
    {lvl:"Level 15",name:"Proud Heart",body:"<p>Dropping to 0 {{hitpoints}} becomes a Charisma {{savingthrow|save}} against the excess damage — pass and you are at 1d6 instead. The DC climbs by 2 each time you use it, resetting on a {{longrest}}.</p>"}
  ]};

ENTRIES["pk-hydrangea"] = { cls:"petalknight", nav:"Hydrangea", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Hydrangea", tag:"Ice and reflection",
  flavor:"Shifting and many-coloured like the flower itself, turning whatever comes at them back outward. Their gratitude is as mechanical as their retaliation.",
  src:"Lyre's Guide to Retia, pp. 399–400",
  mods:{
    reaction:"Frenetic Reflection and Gracious Karma both fire on other people's turns, so a Hydrangea is never idle.",
    restrained:"Garden of Ice holds whatever approaches, so long as it is on the ground or in liquid.",
    resistance:"Frozen Epithet grants it to cold and frees you from snow and ice underfoot.",
    preparedspells:"Beckoning Knowledge opens the Warlock list.",
    temporaryhp:"Gracious Karma repays anyone who heals you with them."
  },
  features:[
    {lvl:"Level 2",name:"Beckoning Knowledge",body:"<p>Any Petal Knight spell you learn can be a Warlock spell instead.</p>"},
    {lvl:"Level 2",name:"Frenetic Reflection",body:"<p>A {{reaction}} when someone within 30 feet takes damage from an attack or a failed {{savingthrow|save}}: half of it is reflected onto another creature nearby.</p>"},
    {lvl:"Level 6",name:"Gracious Karma",body:"<p>When someone heals you, a {{reaction}} pays them back in {{temporaryhp|temporary hit points}}.</p>"},
    {lvl:"Level 11",name:"Frozen Epithet",body:"<p>+1d8 cold on your weapon attacks, {{resistance}} to cold, and snow, ice and freezing terrain stop slowing you.</p>"},
    {lvl:"Level 15",name:"Garden of Ice",body:"<p>Replace one attack a turn by striking the ground or air near a creature within reach — on the ground or submerged — to freeze it in place with icy flowers.</p>"}
  ]};

ENTRIES["pk-morningglory"] = { cls:"petalknight", nav:"Morning Glory", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Morning Glory", tag:"Unity, briefly",
  flavor:"Brief and bright, tied to the turning of the day and to the people fighting beside you. Where Camellia binds one ally in battle, Morning Glory binds a life.",
  src:"Lyre's Guide to Retia, pp. 401–402",
  mods:{
    epithet:"Breath of Unity and Bond of Dedication make this the second bond-based epithet — longer-lived and less tactical than Camellia.",
    shortrest:"Breath of Unity gives the whole party an extra one for a minute of meditation, once per long rest each.",
    charmed:"Attention Collar is a curse that forces its targets to keep their attention on you, on a failed Charisma save.",
    opportunityattack:"Bitter Farewell moves you your full speed when an attack misses, immune to them and to Sentinel-style effects.",
    speed:"The Attention Collar constrains where cursed creatures can move, which is how a Morning Glory controls a fight."
  },
  features:[
    {lvl:"Level 2",name:"Breath of Unity",body:"<p>A minute of guided breathing gives you and up to five others the benefits of an extra {{shortrest}}, once per {{longrest}} each, without counting against the usual limit.</p>"},
    {lvl:"Level 6",name:"Attention Collar",body:"<p>An action collars up to your Charisma modifier in creatures within 60 feet on a failed Charisma {{savingthrow|save}}, cursing them for a minute. While collared they cannot move in ways that take them away from you; an action and a repeat save rips it off, and making new collars dispels the old ones.</p>"},
    {lvl:"Level 11",name:"Bond of Dedication",body:"<p>An hour-long ceremony binds you and one creature in mind and body, marked by blue and purple rings. While you are on the same plane you are constantly aware of each other's condition — hit points, wounds, conditions — though only of context at least one of you already knows. One bond at a time.</p>"},
    {lvl:"Level 15",name:"Bitter Farewell",body:"<p>When an attack misses you, move your full {{speed}} at once — provoking no {{opportunityattack|opportunity attacks}} and dodging effects that punish leaving reach. Once per round, refreshing at the start of your turn.</p>"}
  ]};

ENTRIES["pk-osmanthus"] = { cls:"petalknight", nav:"Osmanthus", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Osmanthus", tag:"A living fortress",
  flavor:"Knights of strong dedication and nobility who fight like a living fortress — unrelenting, honest, and very hard to get around.",
  src:"Lyre's Guide to Retia, pp. 402–403",
  mods:{
    armorclass:"Fortress of One is the most defensive capstone in the class, and Face to Face makes ranged attackers give up.",
    epithet:"Truesight at 11 is a remarkable thing for a martial subclass to simply have.",
    expertise:"Truthful Proficiency effectively grants it in Insight, on top of martial weapons and shields.",
    disadvantage:"Every ranged weapon attack against you has it from level 6, unconditionally.",
    temporaryhp:"Face to Face hands you your Petal Knight level in them at the start of every turn while you fight defensively."
  },
  features:[
    {lvl:"Level 2",name:"Oath of Nobility",body:"<p>Any Petal Knight spell you learn can be a Paladin spell instead.</p>"},
    {lvl:"Level 2",name:"Truthful Proficiency",body:"<p>Insight proficiency and your {{proficiencybonus}} added a second time to it, plus all martial weapons and shields — and your one-handed-weapon features work with anything that is not heavy.</p>"},
    {lvl:"Level 6",name:"Face to Face",body:"<p>Ranged weapon attacks against you have {{disadvantage}} while you are not {{incapacitated}}. Fighting defensively, a miss lets you strike back once a turn, and you gain your Petal Knight level in {{temporaryhp|temporary hit points}} each turn.</p>"},
    {lvl:"Level 11",name:"Truesight",body:"<p>A {{bonusaction}} grants truesight out to 120 feet for a minute, half your {{proficiencybonus}} times per {{longrest}}.</p>"},
    {lvl:"Level 15",name:"Fortress of One",body:"<p>An action braces you for a minute: {{resistance}} to bludgeoning, piercing and slashing, and an extra attack whenever you take the Attack action. Once per {{shortrest}}.</p>"}
  ]};

ENTRIES["pk-pinkrose"] = { cls:"petalknight", nav:"Pink Rose", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Pink Rose", tag:"Healing at reach",
  flavor:"Upbeat, noble knights who brandish their blades against injustice while upholding gratitude and humility. Capable healers, and the only ones who can reach across the room without leaving their feet.",
  src:"Lyre's Guide to Retia, pp. 403–404",
  mods:{
    hitpoints:"Gentle Treatment makes this the class's other healer, alongside Fox and Cub — a pool of d10s spent as a bonus action.",
    criticalhit:"Uniquely, Pink Rose gets both the improved and the superior melee crit ranges — 19–20 at level 2 and 18–20 at 15.",
    grappled:"Graceful Reach lets you do it at 20 feet, dragging the target to you.",
    stunned:"Stunning Drive strikes pressure points with radiant energy, which is the epithet's control button.",
    opportunityattack:"Graceful Reach deliberately does not extend the range for them — the extra reach is offence only."
  },
  features:[
    {lvl:"Level 2",name:"Gentle Treatment",body:"<p>A pool of d10s equal to your {{proficiencybonus}} plus 4. A {{bonusaction}} spends up to your proficiency bonus of them to heal a creature within 30 feet. Refills on a {{longrest}}.</p>"},
    {lvl:"Level 2",name:"Improved Critical (Melee)",body:"<p>Melee {{criticalhit|crits}} on 19–20.</p>"},
    {lvl:"Level 6",name:"Stunning Drive",body:"<p>A hit with a one-handed weapon can strike a pressure point with radiant energy and freeze the target in place.</p>"},
    {lvl:"Level 11",name:"Graceful Reach",body:"<p>Pink ethereal chains replace the handles of your one-handed melee weapons, stretching their reach to 20 feet. Attacks stay melee, you cannot be disarmed, and you can {{grappled|grapple}} at that range, pulling the target in. {{opportunityattack|Opportunity attacks}} still use the weapon's normal reach.</p>"},
    {lvl:"Level 15",name:"Elegant Extension",body:"<p><b>Bursting Range</b>: push the chains out to 60 feet for a turn, with {{advantage}} on the first attack, half your {{proficiencybonus}} times per {{shortrest}}. <b>Undying Assault</b>: an action strikes every creature within 20 feet. And melee {{criticalhit|crits}} land on 18–20.</p>"}
  ]};

ENTRIES["pk-redspiderlily"] = { cls:"petalknight", nav:"Red Spider Lily", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Red Spider Lily", tag:"Daemoturgy",
  flavor:"The epithet of those touched by something otherworldly who lost whatever grounded them among their own kind — curses, demonic blood, the haunting of a yokai. They draw out powers others would call fiendish, trying to make order from the discord they have lived with.",
  src:"Lyre's Guide to Retia, pp. 405–406",
  mods:{
    epithet:"The only epithet that came from damage rather than appraisal, and the spell access shows it.",
    preparedspells:"Whispered Knowledge opens the daemoturgy group, which no other Petal Knight can reach.",
    charmed:"Degree of Separation attracts or repels up to six creatures at once, as a gift or as a command.",
    pactspellslots:"Blooming Daemonology hands you a 6th- and a 7th-level spell that cost none at all, once each per long rest.",
    invisible:"Mindful Gaze sees through every illusion and negates mirror image and blur outright."
  },
  features:[
    {lvl:"Level 2",name:"Degree of Separation",body:"<p>A {{bonusaction}} casts a brief charm that attracts or repels up to six creatures within 60 feet — each one either a gift or a command, your choice.</p>"},
    {lvl:"Level 2",name:"Whispered Knowledge",body:"<p>Any Petal Knight spell you learn can be a daemoturgy spell instead, of a level you have {{pactspellslots|pact slots}} for.</p>"},
    {lvl:"Level 6",name:"Starcrossed Field",body:"<p>Instead of a Virtuous Branches option, a daemoturgy spell can raise a 30-foot sphere of spider lilies around where you stood when you cast it.</p>"},
    {lvl:"Level 11",name:"Virtue of Perspective",body:"<p>Virtuous Flora options including <b>Mindful Gaze</b>: until your next turn you see through every illusion, magical or not, gain devilsight out to 60 feet, and ignore mirror image and blur.</p>"},
    {lvl:"Level 15",name:"Blooming Daemonology",body:"<p>One 6th-level and one 7th-level daemoturgy spell, each castable once per {{longrest}} with no {{spellslot}} — and your Virtuous Branches still trigger as though you had paid for them.</p>"}
  ]};

ENTRIES["pk-sakura"] = { cls:"petalknight", nav:"Sakura", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Sakura", tag:"Sorcery and blood",
  flavor:"Strong-minded, instinct-driven duellists who reach into Sorcery, take health from whoever they cut, and swing more often than any other Petal Knight.",
  src:"Lyre's Guide to Retia, pp. 406–407",
  mods:{
    extraattack:"Extra Attack Improvement makes this the fastest epithet — three swings with one-handed weapons.",
    hitpoints:"Vampiric Blade takes them from whoever you hit, and Blood Roots converts that from temporary to real.",
    armorclass:"Gilded Instincts is 10 plus Dexterity plus Wisdom unarmoured, which is unusually good for a knight.",
    preparedspells:"Spark of Sorcery opens the Sorcerer list.",
    temporaryhp:"Half the damage you deal on your first hit each turn, until Blood Roots upgrades them at 15."
  },
  features:[
    {lvl:"Level 2",name:"Spark of Sorcery",body:"<p>Any Petal Knight spell you learn can be a Sorcerer spell instead.</p>"},
    {lvl:"Level 2",name:"Valor",body:"<p>A pool of d6 Valor dice equal to half your Petal Knight level plus 2, refilling on a {{longrest}}, spent on the epithet's effects.</p>"},
    {lvl:"Level 6",name:"Gilded Instincts",body:"<p>Unarmoured and shieldless, your {{armorclass}} is 10 plus Dexterity plus Wisdom.</p>"},
    {lvl:"Level 6",name:"Vampiric Blade",body:"<p>Your first one-handed hit each turn gives {{temporaryhp|temporary hit points}} equal to half the damage dealt.</p>"},
    {lvl:"Level 11",name:"Extra Attack Improvement",body:"<p>Three attacks on the Attack action, all with one-handed weapons.</p>"},
    {lvl:"Level 15",name:"Blood Roots",body:"<p>Vampiric Blade restores real {{hitpoints}} instead of temporary ones — and now triggers on any attack benefiting from a Valor effect.</p>"}
  ]};

ENTRIES["pk-winecup"] = { cls:"petalknight", nav:"Winecup", navSub:"Levels 2 · 6 · 11 · 15", kicker:"Petal Knight epithet",
  name:"Winecup", tag:"Stealth and mischief",
  flavor:"A mind for subterfuge and an undeniable mischievous streak — in an order built on open conduct, which the book treats as a feature rather than a flaw.",
  src:"Lyre's Guide to Retia, pp. 408–409",
  mods:{
    invisible:"Open Mantle and Closing Petal make this the only Petal Knight who disappears — and Closing Petal survives everything but casting and attacking.",
    poisoned:"Immunity from level 6, and resistance that upgrades to immunity if anything else would have granted it.",
    epithet:"Subterfuge in an order built on open conduct, which the book is quite comfortable with.",
    advantage:"Ever Aware denies it to anyone relying on numbers, and hands it to you against every target you engage.",
    reaction:"The Open Flight branch halves an incoming hit and carries you your full movement away from it."
  },
  features:[
    {lvl:"Level 2",name:"Open Mantle",body:"<p>A {{bonusaction}} blooms winecup flowers on a weapon for a minute: +1d6 poison on its first hit each turn, rising to 1d8 at 8 and 1d10 at 12, and applying to every hit from 17. Once a turn a hit also forces a Constitution {{savingthrow|save}}.</p>"},
    {lvl:"Level 6",name:"Poison Resistance",body:"<p>You cannot be {{poisoned}}, and gain {{resistance}} to poison — {{immunity}} if anything else would also have granted the resistance.</p>"},
    {lvl:"Level 6",name:"Winecup Branches",body:"<p>Virtuous Branches options. <b>Antibody Enhancement</b>: everyone your spell touched gets {{advantage}} against poison, blindness and deafness for a minute. <b>Open Flight</b>: a {{reaction}} halves an incoming hit and moves you your full {{speed}} away. <b>Tactical Advantage</b>: one extra weapon attack per Attack action against a chosen target for a minute.</p>"},
    {lvl:"Level 11",name:"Closing Petal",body:"<p>A {{bonusaction}} and a Virtuous Flora use scatters you into petals — {{invisible}} for a minute, ending only if you cast, attack or force a {{savingthrow|save}}.</p>"},
    {lvl:"Level 15",name:"Ever Aware",body:"<p>Unless {{incapacitated}}, nobody can benefit from effects that need {{advantage}} against you or need you surrounded. Facing more than one enemy, your first attack on each of them each turn has {{advantage}}.</p>"}
  ]};

CLASSES.petalknight.note = "<strong>Fourteen epithets, and your DM may pick yours.</strong> The book suggests letting them choose the flower that fits your character's true nature — which makes this the one class here where the subclass is partly out of your hands. Most epithets also open a second class's spell list, so two Petal Knights can end up casting nothing alike.";


/* ===== Favored Soul Burdens, brought to parity ===== */

ENTRIES["fs-core"] = { cls:"favoredsoul", nav:"Core features", navSub:"The class itself", kicker:"Favored Soul",
  name:"Core Class Features",
  tag:"A god picked you, and the choice is made at level 1",
  flavor:"Your soul and blood are infused with the power of a being beyond your understanding. The Burden arrives with your first level rather than your third, so unlike almost every other class here you are the god's chosen from the first session.",
  src:"Lyre's Guide to Retia, pp. 340–345",
  mods:{},
  features:[
    {lvl:"Level 1",name:"Cosmic Burden",body:"<p>{{divinemantle}} — chosen at character creation, granting features at 1, 6, 10 and 13.</p>"},
    {lvl:"Level 1",name:"Pact Magic",body:"<p>{{pactspellslots}} — every slot the same level, all back on a {{shortrest}}, up to 5th level.</p>"},
    {lvl:"Level 2",name:"Divergent Essence",body:"<p>Shape the divine fragment: <b>Essence Armament</b> (a weapon), <b>Essence Flight</b> (wings) or <b>Essential Radiance</b> (an aura). Your Burden modifies whichever you take.</p>"},
    {lvl:"Level 2",name:"Purification",body:"<p>Limited uses spent on your Burden's heaviest features — most Burdens' 10th-level feature runs on this.</p>"},
    {lvl:"Level 3",name:"Fighting Style",body:"<p>{{fightingstyle}} — several Burdens grant one early and let you advance it here instead.</p>"},
    {lvl:"Level 5",name:"Extra Attack",body:"<p>{{extraattack}}, which three Burdens later push to three or four attacks.</p>"},
    {lvl:"Level 9",name:"Essence Focus",body:"<p>Your Divergent Essence sharpens.</p>"},
    {lvl:"Level 14",name:"Essence Expansion",body:"<p>A second Divergent Essence option opens up.</p>"},
    {lvl:"Level 17",name:"Crown of Splendor",body:"<p>The divine fragment becomes visible to everyone.</p>"},
    {lvl:"Level 18",name:"Essence Mastery",body:"<p>Full command of the essence you shaped.</p>"},
    {lvl:"Level 20",name:"True Divine Mantle",body:"<p>You stop carrying the Burden and start being it.</p>"}
  ]};

ENTRIES["fs-agris"] = { cls:"favoredsoul", nav:"Burden of Agris", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Agris", tag:"Judgement and binding",
  flavor:"Those granted Agris' power feel the weight of justice on their soul. They see into hearts easily and resist temptation and coercion completely — knights, judges and executioners tasked with eliminating corruption in Agris' stead. Favoured weapon: the broadsword.",
  src:"Lyre's Guide to Retia, pp. 345–346",
  mods:{
    charmed:"Flat immunity at level 1, along with immunity to anything that would force an action or reaction out of you.",
    expertise:"Perfect Judgment gives it in Insight at 10, on top of proficiency at 1.",
    restrained:"Silver Chain Seal binds everything in a 10-foot sphere for a minute in magical silver chains.",
    reaction:"Binding Intervention spends one to reroll an enemy's attack on an ally <em>and</em> counterattack from any distance.",
    divinemantle:"The most controlling Burden of the nineteen, and the only one that gives outright mental immunity this early."
  },
  features:[
    {lvl:"Level 1",name:"Avatar of the Absolute",body:"<p>{{immunity}} to {{charmed}} and to being forced into actions or reactions against your will. Insight and heavy armour proficiency.</p>"},
    {lvl:"Level 6",name:"Blade of the Bound Judge",body:"<p>The 2nd-level Essence Armament option free — or, if you already have it, a 9th-level option ahead of schedule, which you then cannot take again later.</p>"},
    {lvl:"Level 10",name:"Perfect Judgment",body:"<p>{{expertise}} in Insight.</p>"},
    {lvl:"Level 10",name:"Silver Chain Seal",body:"<p>Spend a use of <b>Purification</b>: a 10-foot sphere within 30 feet, Strength {{savingthrow|save}} or {{restrained}} for a minute by silver chains. Escaping needs an action and a Strength check against your {{spellsavedc}}, or the chains destroyed.</p>"},
    {lvl:"Level 13",name:"Binding Intervention",body:"<p>A {{reaction}} when anything within 30 feet is about to be hit: a celestial broadsword deflects it — roll a new d20 and replace the attack roll, then make a weapon attack at the attacker even if they are out of reach, resolving before theirs.</p>"}
  ]};

ENTRIES["fs-apophemia"] = { cls:"favoredsoul", nav:"Burden of Apophemia", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Apophemia", tag:"Madness and whispers",
  flavor:"Apophemia was once a correfont, which is why her favoured can reach into the writing magic an Inscriptor uses. Their gift is speech that arrives inside other people's heads — and silence imposed on anyone else's.",
  src:"Lyre's Guide to Retia, pp. 346–347",
  mods:{
    resistance:"Psychic, from level 1, plus immunity to the enraged condition — which matters because your own capstone hands enraged out.",
    charmed:"Intrusive Insanity leaves targets charmed by you <em>and</em> enraged, attacking each other before anyone else.",
    reaction:"Value of Silence spends one to drop a silence sphere on anyone who opens their mouth, wasting their action entirely.",
    savingthrow:"Charisma saves are the whole Burden — for the telepathy, the madness and the silence.",
    divinemantle:"The most disruptive Burden: you take away speech, sanity and the ability to tell friend from foe."
  },
  features:[
    {lvl:"Level 1",name:"Playbook of a Correfont",body:"<p>Inscriptor spells count as Favored Soul spells for you.</p>"},
    {lvl:"Level 1",name:"Psychic Tolerance",body:"<p>{{resistance}} to psychic damage and {{immunity}} to the enraged condition.</p>"},
    {lvl:"Level 6",name:"Whispered Speech",body:"<p>Speak telepathically to anything you can see within 60 feet that shares a language — one-way, and recognisably in your voice. A {{reaction}} and a Charisma {{savingthrow|save}} lets them block you for 24 hours, at will.</p>"},
    {lvl:"Level 10",name:"Intrusive Insanity",body:"<p>An action and a use of <b>Purification</b>: every creature you choose within 15 feet makes a Charisma {{savingthrow|save}} or becomes {{charmed}} by you and enraged for 10 minutes — attacking the nearest other enraged creature, unable to understand speech, repeating the save on damage from anyone not enraged.</p>"},
    {lvl:"Level 13",name:"Value of Silence",body:"<p>A {{reaction}} when anything within 60 feet speaks, casts with a verbal component or utters a command word: a silence sphere covers their space for a minute, their effect fails and their action is spent. Half your {{proficiencybonus}} uses per {{shortrest}}.</p>"}
  ]};

ENTRIES["fs-aymere"] = { cls:"favoredsoul", nav:"Burden of Aymere", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Aymere", tag:"The Wise Forest",
  flavor:"One of the four Eidolons. Those bound by Aymere's burden feel the patience, wrath and mercy of the natural elements, and are driven to burn away whatever eats unfairly at nature's domain. Favoured weapons: the combat scythe and greatscythe.",
  src:"Lyre's Guide to Retia, pp. 346–347",
  mods:{
    divinemantle:"An Eidolon Burden, so every attack you make is magical and eidolic, and eidomancy burn checks favour you.",
    preparedspells:"Touch of the Forest opens the Druid list and the Whisperwood Tome group.",
    poisoned:"Shroud of Miasma converts any spell's damage to poison and adds it to your first hit each turn.",
    hitpoints:"Rapid Revitalization is one of the strongest heals in the class — a burst, a cleanse and a minute of regeneration on one touch.",
    resistance:"Skin of Steel Wood cuts all physical damage by half your Favored Soul level, which is flat reduction rather than a fraction."
  },
  features:[
    {lvl:"Level 1",name:"Eidolons' Favored",body:"<p>{{advantage}} on eidomancy burn checks, and every attack you make counts as magical and eidolic.</p>"},
    {lvl:"Level 1",name:"Touch of the Forest",body:"<p>Druid spells and the Whisperwood Tome group count as Favored Soul spells for you.</p>"},
    {lvl:"Level 6",name:"Shroud of Miasma",body:"<p>Any spell's damage can become poison instead — and your first weapon hit each turn adds poison damage equal to half your Favored Soul level.</p>"},
    {lvl:"Level 10",name:"Rapid Revitalization",body:"<p>An action, a touch and a use of <b>Purification</b>: 1d8 {{hitpoints}} per {{pactspellslots|pact slot}} level, cure {{poisoned}} and paralyzed, and half your level in healing at the start of each of their turns for a minute.</p>"},
    {lvl:"Level 13",name:"Skin of Steel Wood",body:"<p>All piercing, slashing and bludgeoning damage you take is reduced by half your Favored Soul level.</p>"}
  ]};

ENTRIES["fs-burtromet"] = { cls:"favoredsoul", nav:"Burden of Burtromet", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Burtromet", tag:"Forge and meteor",
  flavor:"Burtromet, a paraprismatic deity of the Elemental Planes, lays unquenchable flame on their favoured. Those who inherit it want to spread fire, melt metal into new implements of war, and reach further into destruction. Favoured weapon: the greathammer.",
  src:"Lyre's Guide to Retia, pp. 347–348",
  mods:{
    resistance:"Fire, from level 1 — and Burtromet's Mantle upgrades that to outright immunity when you take Essential Radiance.",
    extraattack:"Extra Attack Improvement gives three attacks at 13 and four at 20, one of only three Burdens that does.",
    divinemantle:"Charred Essence rewrites whichever Divergent Essence you chose — fire damage on the armament, a burning shroud on the radiance.",
    pactspellslots:"They scale the damage directly: Hammer of Cracking Kilns deals 2d10 per slot level.",
    proficiencybonus:"Forged in Flame adds it as bonus fire damage to every Essence Armament hit."
  },
  features:[
    {lvl:"Level 1",name:"Fiery Resistance",body:"<p>{{resistance}} to fire.</p>"},
    {lvl:"Level 1",name:"Charred Essence",body:"<p>Your Divergent Essence choice gains fire traits: <b>Forged in Flame</b> makes the armament deal fire and add your {{proficiencybonus}} in fire damage; <b>Burtromet's Mantle</b> turns Ilsrabae's veil into a white-hot shroud granting fire {{immunity}}.</p>"},
    {lvl:"Level 6",name:"Meteoric Javelin",body:"<p>Replace any attack with hurling a javelin of flame at a target within 60 feet — a ranged spell attack for 2d6 plus your casting modifier. Land two in a turn and the target ignites.</p>"},
    {lvl:"Level 10",name:"Hammer of Cracking Kilns",body:"<p>Once per turn, a melee hit plus a use of <b>Purification</b>: a Dexterity {{savingthrow|save}} or 2d10 per {{pactspellslots|pact slot}} level in fire. On a success they take half and you can burst the flames outward into a 20-foot radius. Anything failing either save ignites, burning for 2d8.</p>"},
    {lvl:"Level 13",name:"Extra Attack Improvement",body:"<p>Three attacks on the Attack action, four at level 20.</p>"}
  ]};

ENTRIES["fs-chan"] = { cls:"favoredsoul", nav:"Burden of Chan Karegosh", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Chan Karegosh", tag:"Moon and rabbit",
  flavor:"An avatar of the moon, and the only Burden that hands you a companion. Its favoured move like the rabbit that carries its name — quick, high-jumping, and completely at home in the dark.",
  src:"Lyre's Guide to Retia, pp. 347–348",
  mods:{
    familiar:"A moon rabbit with its own stat block — it attacks with Moonlight Missile and can teleport to an ally to raise their AC with a reaction.",
    darkvision:"Bright Eyes turns it into normal sight in any darkness, magical or not, out to 20 feet times your proficiency bonus.",
    invisible:"New Moon Shade makes you it in dim light as a bonus action, plus greater invisibility once a rest that is not even a magical effect.",
    bonusaction:"Rabbit's Haste makes Dash one, and New Moon Shade uses one to vanish.",
    speed:"High and Long Jumps gain 10 feet, which on a mobility Burden compounds fast."
  },
  features:[
    {lvl:"Level 1",name:"Moon Rabbit Familiar",body:"<p>Once per {{longrest}}, cast find familiar at your {{pactspellslots|pact slot}} level for free to summon a moon rabbit {{familiar}}. It has its own stat block, attacks with Moonlight Missile, adds your slot level to its saves, and can {{teleport}} to an ally with its {{reaction}} to raise their {{armorclass}}.</p>"},
    {lvl:"Level 1",name:"Rabbit's Haste",body:"<p>Dash as a {{bonusaction}}, and both jump types gain 10 feet — 5 without a run-up.</p>"},
    {lvl:"Level 6",name:"Bright Eyes in the Darkness",body:"<p>See normally in darkness and dim light, magical or otherwise, out to 20 feet times your {{proficiencybonus}}, plus {{expertise}} in Perception. Your rabbit also gains {{advantage}} on saves against magic.</p>"},
    {lvl:"Level 10",name:"Sphere of Moonlight",body:"<p>An action and a use of <b>Purification</b>: a 40-foot sphere of bright moonlight centred on you for a minute, moving with you and burning away magical darkness. On arrival, every creature you choose inside makes a Constitution {{savingthrow|save}} for 1d10 per {{pactspellslots|pact slot}} level in radiant. Each turn after, a {{bonusaction}} repeats it on one creature — and a single target that fails is blinded.</p>"},
    {lvl:"Level 13",name:"New Moon Shade",body:"<p>In darkness or dim light, a {{bonusaction}} turns you {{invisible}} until the end of your turn or until you step into the light. Plus greater invisibility once per {{shortrest}}, treated as neither a spell nor a magical effect.</p>"}
  ]};

ENTRIES["fs-echobliss"] = { cls:"favoredsoul", nav:"Burden of Echobliss", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Echobliss", tag:"Wrath",
  flavor:"Echobliss, Duke of Thunder. Their favoured can unleash great strength at will but must resist the impulse to shred everything in front of them — and are known to become twin-tailed draconic monstrosities that lose all sense of self.",
  src:"Lyre's Guide to Retia, pp. 348–349",
  mods:{
    criticalhit:"19–20 from level 1 and 18–20 from 13 — and if something else would duplicate the range, you get an extra weapon die instead.",
    recklessattack:"The Reckless Fighter style at level 1, advanceable at 3 rather than replaced.",
    hitpoints:"Wrath's Tormented Form gives you an escape from 0 on a d100 roll under your level, plus twice your level in temporary hit points.",
    frightened:"Not your problem — the transformed state treats everything in sight as hostile and ignores concentration penalties.",
    divinemantle:"The most self-destructive Burden. The capstone form is genuinely dangerous to your own party."
  },
  features:[
    {lvl:"Level 1",name:"Improved Critical",body:"<p>{{criticalhit|Critical hits}} on 19–20 — or an extra weapon die per crit if something else already gave you that range.</p>"},
    {lvl:"Level 1",name:"Wrathful Fighter",body:"<p>The Reckless Fighter {{fightingstyle|fighting style}}, which you can advance at 3rd level instead of taking a new one.</p>"},
    {lvl:"Level 6",name:"Blighted Wave",body:"<p>In place of a weapon attack, a cube of destructive thunder originating from you — at least 5 feet, up to five feet per {{pactspellslots|pact slot}} level. A Constitution {{savingthrow|save}} or 3d10 thunder. Once per turn, {{proficiencybonus}} times per {{longrest}}.</p>"},
    {lvl:"Level 10",name:"Wrath's Tormented Form",body:"<p>An action and a use of <b>Purification</b> transforms you into a draconic monstrosity for 10 minutes: half damage from physical attacks, extra weapon damage equal to your level, an extra action each turn for attacking — and you are enraged, treat everything in sight as hostile, and hold {{concentration}} regardless. Dropping to 0 lets you roll d100 to survive at 1 instead.</p>"},
    {lvl:"Level 13",name:"Superior Critical",body:"<p>{{criticalhit|Critical hits}} on 18–20.</p>"}
  ]};

ENTRIES["fs-gotham"] = { cls:"favoredsoul", nav:"Burden of Gotham", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Gotham", tag:"Necromancy",
  flavor:"Gotham's chosen is his true representative on the Material Plane, and the Court of Decay watches for them to take them in as their leader — above even the court's equerries. The Burden is to spread undeath, which not every bearer is keen to do. Favoured weapon: the greatscythe.",
  src:"Lyre's Guide to Retia, pp. 350–351",
  mods:{
    pactspellslots:"You get one extra slot at the same level as the rest, which no other Burden grants.",
    resistance:"Necrotic, plus Constitution save proficiency, from level 1.",
    undead:"Animate Menials conjures 1d4+2 Decaying Menials that share one initiative count and last 10 minutes.",
    deathsavingthrow:"Deathly Fortitude usually stops you getting there — a Constitution save against 5 plus the damage, unless it was radiant or a crit.",
    hitpoints:"Gluttonous Infliction turns a weapon attack into a free inflict wounds, which feeds you as much as it hurts them."
  },
  features:[
    {lvl:"Level 1",name:"Master of Necromancy",body:"<p>All necromancy spells count as Favored Soul spells, and you gain one extra {{pactspellslots|pact slot}} at the usual level.</p>"},
    {lvl:"Level 1",name:"Uncanny Body",body:"<p>Constitution {{savingthrow|save}} proficiency and {{resistance}} to necrotic.</p>"},
    {lvl:"Level 6",name:"Deathly Fortitude",body:"<p>Damage that would drop you to 0 {{hitpoints}} calls for a Constitution {{savingthrow|save}} against 5 plus the damage — pass and you stay at 1. Radiant damage and {{criticalhit|critical hits}} are exempt.</p>"},
    {lvl:"Level 10",name:"Gluttonous Infliction",body:"<p>In place of a weapon attack, spend a use of <b>Purification</b> to cast inflict wounds at your {{pactspellslots|pact slot}} level for free, prepared or not.</p>"},
    {lvl:"Level 13",name:"Animate Menials",body:"<p>Once per {{longrest}}, conjure 1d4+2 Decaying Menials within 30 feet. They share a single {{initiative}} count and a joint turn, and crumble after 10 minutes.</p>"}
  ]};

ENTRIES["fs-harros"] = { cls:"favoredsoul", nav:"Burden of Harros", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Harros", tag:"The Golden Sun",
  flavor:"The favoured of the god of knights carry a deeply ingrained sense of responsibility — they challenge lords who abuse their power and bring justice to whoever deserves it. As an Eidolon's chosen they are filled with eidomantic energy. Favoured weapons: halberd, axe, greataxe.",
  src:"Lyre's Guide to Retia, pp. 350–351",
  mods:{
    divinemantle:"An Eidolon Burden — magical, eidolic attacks and advantage on burn checks.",
    savingthrow:"Paragon Will adds half your Favored Soul level to a failed one after the fact, half your proficiency bonus times per short rest.",
    reaction:"Two of them: Paragon Will rescues a failed roll, Adamantine Hide downgrades a critical hit to an ordinary one.",
    criticalhit:"You can simply refuse to be hit by one, from level 13.",
    preparedspells:"Legendary Knight's Proficiencies opens the Paladin list and the Legacy of Gold group."
  },
  features:[
    {lvl:"Level 1",name:"Eidolons' Favored",body:"<p>{{advantage}} on eidomancy burn checks, and every attack you make counts as magical and eidolic.</p>"},
    {lvl:"Level 1",name:"Legendary Knight's Proficiencies",body:"<p>Heavy armour and shields, plus Paladin spells and the Legacy of Gold group added to your list.</p>"},
    {lvl:"Level 6",name:"Paragon Will",body:"<p>A {{reaction}} after a failed {{savingthrow|save}} or {{abilitycheck}} adds half your Favored Soul level to it. Half your {{proficiencybonus}} uses per {{shortrest}}.</p>"},
    {lvl:"Level 10",name:"Crimson Spiral Meteor",body:"<p>An action and a use of <b>Purification</b> wraps you in a radiant aura and launches you at a creature within 60 feet. It and everything within 20 feet make a Dexterity {{savingthrow|save}} for 1d12 radiant per {{pactspellslots|pact slot}} level, and the primary target takes the same again in piercing. You land anywhere in range.</p>"},
    {lvl:"Level 13",name:"Adamantine Hide",body:"<p>Take 5 less from all physical damage, and a {{reaction}} turns a {{criticalhit}} against you into an ordinary hit.</p>"}
  ]};

ENTRIES["fs-ilsrabae"] = { cls:"favoredsoul", nav:"Burden of Ilsrabae", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Ilsrabae", tag:"Cold and secrets",
  flavor:"Ilsrabae beckons her favoured beneath the waves, to spy on those who walk on land and collect tributes to throw down to her. Her sweet voice whispers of their responsibility in their sleep, demanding affection and loyalty. Favoured weapon: the trident.",
  src:"Lyre's Guide to Retia, pp. 352–353",
  mods:{
    resistance:"Cold, from level 1 — and Ilsrabae's Regalia upgrades it to immunity while imposing disadvantage on melee attacks against you.",
    restrained:"Tundral Hurricane freezes a 40-foot radius of failed saves in place, with ice that has to be broken or beaten.",
    divinemantle:"Sunken Essence rewrites your Divergent Essence for the water — a fly speed that works as a swim speed, or a dress of icy silk.",
    invisible:"Secret Hoarder gives see invisibility once a rest, free of slots and components.",
    vulnerability:"The ice from Tundral Hurricane can be shattered by 10 damage in a single hit, which is how allies free each other."
  },
  features:[
    {lvl:"Level 1",name:"Shivering Resistance",body:"<p>{{resistance}} to cold.</p>"},
    {lvl:"Level 1",name:"Sunken Essence",body:"<p>Your Divergent Essence gains aquatic traits: <b>Aquatic Versatility</b> lets you breathe water and use your fly speed as a swim speed; <b>Ilsrabae's Regalia</b> casts Ilsrabae's veil once a {{shortrest}} as a dress of icy silk, granting cold {{immunity}} and {{disadvantage}} on melee attacks against you.</p>"},
    {lvl:"Level 6",name:"Secret Hoarder",body:"<p>Read every form of writing that is not coded or nonsensical — including spell scrolls, which you can then cast as though they were on your list. Plus see invisibility once per {{shortrest}}, free.</p>"},
    {lvl:"Level 10",name:"Tundral Hurricane",body:"<p>An action and a use of <b>Purification</b> spirals a whirlpool of freezing water around you, hitting every creature you choose within 40 feet. A Strength {{savingthrow|save}} or 1d8 magical bludgeoning per {{pactspellslots|pact slot}} level and {{restrained}} in ice — escapable with a Strength check or by dealing 10 damage to the ice in one blow.</p>"},
    {lvl:"Level 13",name:"Veil of the Empress",body:"<p>A permanent veil of ice: anything that hits you in melee from within 5 feet, or grapples you, takes cold damage equal to half your Favored Soul level.</p>"}
  ]};

ENTRIES["fs-invidiva"] = { cls:"favoredsoul", nav:"Burden of Invidiva", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Invidiva", tag:"The Grasping Twin",
  flavor:"Envy given a body, and the most rogue-like Burden of the nineteen — Cunning Action at level 1, which nothing else here grants, and corrosive sap generated on every advantaged strike.",
  src:"Lyre's Guide to Retia, pp. 353–354",
  mods:{
    cunningaction:"At level 1, from a half-caster. Nothing else in the class comes close to this much early mobility.",
    expertise:"Stealth, from level 1 — and Total Elimination makes the invisibility silent and trackless.",
    invisible:"Total Elimination is a minute of it with no sound and no tracks, plus 19–20 crits while you are in it.",
    advantage:"Skills of the Grasping Twin only pays out on attacks that already have it, so the Burden wants you hidden.",
    speed:"Increased Agility adds 10 feet permanently at level 13."
  },
  features:[
    {lvl:"Level 1",name:"Cunning Action",body:"<p>{{cunningaction}} — Dash, Hide or Disengage as a {{bonusaction}}.</p>"},
    {lvl:"Level 1",name:"Skills of the Grasping Twin",body:"<p>{{expertise}} in Stealth, and attacks made with {{advantage}} using light or finesse weapons deal an extra d6 acid from corrosive sap.</p>"},
    {lvl:"Level 6",name:"Expert Duelist",body:"<p>The Dueling {{fightingstyle|fighting style}}, or an advancement of it.</p>"},
    {lvl:"Level 6",name:"Twin Strike",body:"<p>A weapon with the secondary property can make its second attack inside the Attack action rather than as a {{bonusaction}}, using whichever ability the primary attack would use.</p>"},
    {lvl:"Level 10",name:"Total Elimination",body:"<p>An action and a use of <b>Purification</b>: {{invisible}} for a minute, silent and leaving no tracks, with {{criticalhit|crits}} on 19–20 using light or finesse weapons. End it early on a crit to add 2d10 per {{pactspellslots|pact slot}} level.</p>"},
    {lvl:"Level 13",name:"Increased Agility",body:"<p>+10 feet of {{speed}}.</p>"}
  ]};

ENTRIES["fs-ivsil"] = { cls:"favoredsoul", nav:"Burden of Ivsil", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Ivsil", tag:"Thunder and stillness",
  flavor:"The will of the Blood Wind is hard to read, but the storm it embodies leaves its favoured wracked with displacement — they never feel they are where they should be, and compulsively uproot themselves from whatever holds them down. Favoured weapon: the scimitar.",
  src:"Lyre's Guide to Retia, pp. 353–354",
  mods:{
    resistance:"Thunder, from level 1.",
    prone:"Whirlwind Shunt pushes everyone around you 5 feet and knocks them down on a failed Strength save.",
    initiative:"Initiative Surge gives advantage on it, immunity to surprise, and disadvantage on every attack against you before your first turn.",
    disadvantage:"You hand it to anyone who acts before you do, which effectively buys the party a free round.",
    divinemantle:"Ivsil's Billowing Shroud rewrites Essential Radiance into a wind-borne veil."
  },
  features:[
    {lvl:"Level 1",name:"Thunderous Resistance",body:"<p>{{resistance}} to thunder.</p>"},
    {lvl:"Level 1",name:"Tempestuous Essence",body:"<p>Your Divergent Essence gains storm traits, including <b>Ivsil's Billowing Shroud</b>, which casts Ilsrabae's veil once per {{shortrest}} for free.</p>"},
    {lvl:"Level 6",name:"Whirlwind Shunt",body:"<p>An action raises a gust in a 15-foot cone or a 15-foot cube centred on you. Everything but you makes a Strength {{savingthrow|save}} or is pushed 5 feet and knocked {{prone}}.</p>"},
    {lvl:"Level 10",name:"Thunder of Still Air",body:"<p>An action and a use of <b>Purification</b> casts reverse gravity for free — and you can exempt yourself from it.</p>"},
    {lvl:"Level 13",name:"Initiative Surge",body:"<p>You cannot be surprised, you roll {{initiative}} with {{advantage}}, and every attack made against you before your first turn has {{disadvantage}}.</p>"}
  ]};

ENTRIES["fs-lussuria"] = { cls:"favoredsoul", nav:"Burden of Lussuria", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Lussuria", tag:"Charm and subjugation",
  flavor:"A god of indulgence, and a Burden that works almost entirely through other people's minds. Where other Favored Souls swing, this one persuades — and where persuasion fails, it overwhelms.",
  src:"Lyre's Guide to Retia, pp. 354–355",
  mods:{
    charmed:"Entrapping Charm is free once a rest, and it tells you when a target is immune — then stuns them instead.",
    reaction:"Malicious Pleading fills an attacker with guilt: a Charisma save or they cannot attack you for the rest of the turn.",
    stunned:"The consolation prize when charm fails, which makes Entrapping Charm useful against absolutely everything.",
    abilitycheck:"Compelling Allure treats any Charisma d20 of 9 or lower as a 10, permanently.",
    pactspellslots:"Wave of Subjugative Will scales at 2d6 psychic per slot level, across everything within 30 feet."
  },
  features:[
    {lvl:"Level 1",name:"Entrapping Charm",body:"<p>Once per rest, cast charm person at your {{pactspellslots|pact slot}} level for free. Anything immune to being {{charmed}} announces itself to you — and you can choose to have it {{stunned}} for the duration instead.</p>"},
    {lvl:"Level 6",name:"Malicious Pleading",body:"<p>A {{reaction}} to a weapon attack you can see fills the attacker with guilt: a Charisma {{savingthrow|save}} or they cannot attack you for the rest of the turn.</p>"},
    {lvl:"Level 10",name:"Wave of Subjugative Will",body:"<p>An action and a use of <b>Purification</b>: every creature you can see within 30 feet makes a Charisma {{savingthrow|save}} or takes 2d6 psychic per {{pactspellslots|pact slot}} level.</p>"},
    {lvl:"Level 13",name:"Compelling Allure",body:"<p>Any Charisma {{abilitycheck}} or {{savingthrow|save}} that rolls 9 or lower counts as a 10.</p>"}
  ]};

ENTRIES["fs-mortuous"] = { cls:"favoredsoul", nav:"Burden of Mortuous", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Mortuous", tag:"The challenger",
  flavor:"The Challenger seeks entertainment by combat and raises their favoured as a combatant worth watching — filling their head with competition, strength and glory, meaning one day to bring them over and test the limits of their divine strength. Their skin slowly takes on Mortuous' dragonkin scales.",
  src:"Lyre's Guide to Retia, pp. 355–356",
  mods:{
    opportunityattack:"Focus Fighter lets you make one whenever anyone in your reach attacks someone who is not you — and adds a weapon die when it lands.",
    hitpoints:"Challenger's Body adds twice your Favored Soul level, then 2 more every level after. The tankiest Burden of the nineteen.",
    extraattack:"Extra Attack Improvement gives three attacks at 13 and four at 20.",
    advantage:"Surging Champion's whole extra Attack action has it, and misses still deal damage at the end of your turn.",
    divinemantle:"The duellist's Burden — everything here punishes an enemy for looking at anyone else."
  },
  features:[
    {lvl:"Level 1",name:"Focus Fighter",body:"<p>When a creature in reach of your melee weapon attacks anyone but you, a {{reaction}} makes an {{opportunityattack}} against it — and every opportunity attack you land rolls an extra weapon damage die.</p>"},
    {lvl:"Level 6",name:"Challenger's Body",body:"<p>Maximum {{hitpoints}} rise by twice your Favored Soul level, and by 2 more at every level after.</p>"},
    {lvl:"Level 10",name:"Surging Champion",body:"<p>A use of <b>Purification</b> grants an additional Attack action, every attack of it with {{advantage}} — and at the end of your turn you roll weapon damage for each of those attacks that missed.</p>"},
    {lvl:"Level 13",name:"Extra Attack Improvement",body:"<p>Three attacks on the Attack action, four at level 20.</p>"}
  ]};

ENTRIES["fs-nyphlamour"] = { cls:"favoredsoul", nav:"Burden of Nyphlamour", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Nyphlamour", tag:"Comradery",
  flavor:"The Celestial Efficate is charged with connecting others, and so is their chosen. To understand, aid and soothe is the purpose of a Nyphlamour Favored Soul, who is drawn to healing and care rather than to the fight.",
  src:"Lyre's Guide to Retia, pp. 356–357",
  mods:{
    temporaryhp:"Gift of Comradery attaches 1d10 plus half your level to every Help action, which is a bonus action for you.",
    teleport:"Carried on Kind Winds moves you to an ally or an ally to you, over a range of 10 feet times your proficiency bonus.",
    resistance:"Communal Spell of Protection gives it against all three physical types plus one more of your choice, to your whole proficiency bonus in allies.",
    bonusaction:"Help costs you one instead of an action, which makes the support constant rather than occasional.",
    concentration:"Communal Spell of Protection needs it, so the big group buff and your spells compete."
  },
  features:[
    {lvl:"Level 1",name:"Gift of Comradery",body:"<p>Help as a {{bonusaction}}, and whoever you help gains 1d10 plus half your Favored Soul level in {{temporaryhp|temporary hit points}}.</p>"},
    {lvl:"Level 1",name:"Muse's Guidance",body:"<p>Bard spells count as Favored Soul spells for you.</p>"},
    {lvl:"Level 6",name:"Carried on Kind Winds",body:"<p>An action {{teleport|teleports}} you to a willing creature within 10 feet times your {{proficiencybonus}}, or them to you — and anyone {{prone}} arrives standing.</p>"},
    {lvl:"Level 10",name:"Communal Spell of Protection",body:"<p>An action and a use of <b>Purification</b>: {{proficiencybonus}} creatures within 30 feet gain {{resistance}} to all three physical damage types plus one more of your choosing. If any of them suffers a {{criticalhit}} or drops to 0 {{hitpoints}}, they heal 1d8 per {{pactspellslots|pact slot}} level and leave the effect. Needs {{concentration}}.</p>"},
    {lvl:"Level 13",name:"Connective Speech",body:"<p>Understand every language, and be understood by anything that speaks one. Creatures with Intelligence 3 or lower only catch your tone.</p>"}
  ]};

ENTRIES["fs-saanjeck"] = { cls:"favoredsoul", nav:"Burden of Saanjeck", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Saanjeck", tag:"Twilight and study",
  flavor:"Saanjeck drives the College of Gun Ghuth and advocates for arcanists who seek knowledge in good faith. Their favoured take to a powerful spell the way another person takes to a good book. Favoured weapon: the quarterstaff.",
  src:"Lyre's Guide to Retia, pp. 357–358",
  mods:{
    darkvision:"Twilight Eyes gives 60 feet, or extends existing darkvision to 120 — whichever is better.",
    preparedspells:"Lessons for the Inquisitive opens the Wizard list, and Replete Lucubration lets you cast off-list without having learned it at all.",
    savingthrow:"Magic Resistance at 13 gives advantage on every one against a magical effect.",
    extraattack:"Twilight Force adds a bonus ranged spell attack to every Attack action — 1d8 rising to 4d8 by level 17.",
    pactspellslots:"Replete Lucubration casts anything up to half your level minus one, at your slot level."
  },
  features:[
    {lvl:"Level 1",name:"Lessons for the Inquisitive",body:"<p>Wizard spells count as Favored Soul spells for you.</p>"},
    {lvl:"Level 1",name:"Twilight Eyes",body:"<p>{{darkvision}} out to 60 feet — or your existing darkvision extended to 120 feet, or by 30, whichever is greater.</p>"},
    {lvl:"Level 6",name:"Twilight Force",body:"<p>Every Attack action gains one extra attack: hurled arcane force at up to 60 feet, dealing 1d8 plus your casting modifier. It becomes 2d8 at 9, 3d8 at 13 and 4d8 at 17.</p>"},
    {lvl:"Level 10",name:"Replete Lucubration",body:"<p>A use of <b>Purification</b> casts any Favored Soul spell up to half your level minus one — learned or not, prepared or not — at your {{pactspellslots|pact slot}} level, still paying the action and components.</p>"},
    {lvl:"Level 13",name:"Magic Resistance",body:"<p>{{advantage}} on {{savingthrow|saving throws}} against magical effects.</p>"}
  ]};

ENTRIES["fs-scorn"] = { cls:"favoredsoul", nav:"Burden of Scorn", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Scorn", tag:"Beast and return",
  flavor:"Scorn's favoured live with its bloody desires whispering constantly, compelling them to kill. Scorn cares only for death and mayhem, which maps an unfortunate fate for whoever inherits its blessing. Favoured weapon: the maul.",
  src:"Lyre's Guide to Retia, pp. 358–359",
  mods:{
    criticalhit:"19–20 from level 1, and each one heals you for half the damage dealt against anything with blood in it.",
    deathsavingthrow:"Return from Death makes 19 as good as 20, and heals you a Hit Die plus Constitution when it happens.",
    hitpoints:"Ruthless Reconstitution regenerates half your Favored Soul level every turn you start below half health.",
    teleport:"Bloody Phantasia flashes you next to anything within 30 feet and hands you a free Attack action on arrival.",
    divinemantle:"The book attaches an optional curse: start a turn near a creature at 0 hit points and you may be compelled to finish them."
  },
  features:[
    {lvl:"Level 1",name:"Bestial Clawing",body:"<p>The 2nd-level Essence Armament option immediately — your favoured weapon, or a bestial transformation of your limbs.</p>"},
    {lvl:"Level 1",name:"Obscene Critical",body:"<p>{{criticalhit|Critical hits}} on 19–20, and a weapon crit heals you for half the damage dealt — nothing from {{undead}}, constructs or anything bloodless.</p>"},
    {lvl:"Level 6",name:"Return from Death",body:"<p>{{deathsavingthrow|Death saves}} restore {{hitpoints}} on a 19 as well as a 20 — and when they do, you regain a Hit Die plus your Constitution modifier.</p>"},
    {lvl:"Level 10",name:"Bloody Phantasia",body:"<p>A {{bonusaction}} and a use of <b>Purification</b> vanishes you in a red flash, {{teleport|teleporting}} you beside a creature within 30 feet — then you take a free Attack action.</p>"},
    {lvl:"Level 13",name:"Ruthless Reconstitution",body:"<p>Start a turn above 0 but below half your maximum {{hitpoints}} and regain half your Favored Soul level.</p>"}
  ]};

ENTRIES["fs-tithiss"] = { cls:"favoredsoul", nav:"Burden of Tithiss", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Tithiss", tag:"Oak and acid",
  flavor:"Attuned to the life around them, the Favored Soul of Tithiss yearns to ease the pain of every living thing nearby, and is bound by the desire to spread relief. Favoured weapons: the club and quarterstaff.",
  src:"Lyre's Guide to Retia, pp. 360–361",
  mods:{
    resistance:"Acid, from level 1 — and your Essence Armament deals it, plus your proficiency bonus in acid damage on every hit.",
    hitpoints:"Nurturing Arcanist heals an ally every time you cast at them, and Lifelight is a 2d6-per-slot-level touch heal that also cleanses.",
    restrained:"Emergent Forestation holds anyone ending a turn inside it in vines that deal 2d6 acid a turn.",
    difficultterrain:"Emergent Forestation makes a 30-foot sphere of it, with three 30-foot trees you place yourself.",
    teleport:"The Burden lets you break apart into dirt and stone and step out of a tree within 10 feet times your proficiency bonus."
  },
  features:[
    {lvl:"Level 1",name:"Acid Resistance",body:"<p>{{resistance}} to acid.</p>"},
    {lvl:"Level 1",name:"Oaken Essence",body:"<p>Your Divergent Essence gains woodland traits: <b>Sapblooded Strike</b> makes the armament deal acid and add your {{proficiencybonus}} in acid damage, and the tree-step lets you move through trees within 10 feet times your proficiency bonus.</p>"},
    {lvl:"Level 6",name:"Nurturing Arcanist",body:"<p>Any spell you cast at a single ally also heals them half your Favored Soul level — or, for multiple allies, your {{pactspellslots|pact slot}} level each.</p>"},
    {lvl:"Level 10",name:"Emergent Forestation",body:"<p>An action and a use of <b>Purification</b> fills a 30-foot sphere with growth and three Large 30-foot trees you place, healing you 1d8 per {{pactspellslots|pact slot}} level. It is {{difficultterrain}} for everyone else, and anything ending a turn inside makes a Strength {{savingthrow|save}} or is {{restrained}} by vines dealing 2d6 acid a turn. Lasts a minute with {{concentration}}.</p>"},
    {lvl:"Level 13",name:"Lifelight",body:"<p>An action and a {{pactspellslots|pact slot}} restores 2d6 per slot level to a creature you touch, and cures them besides.</p>"}
  ]};

ENTRIES["fs-tquinn"] = { cls:"favoredsoul", nav:"Burden of T'quinn", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of T'quinn", tag:"The Resonant",
  flavor:"One of the four Eidolons, and the harmonious one. Their favoured are shadowed by a second, illusory self that never sleeps — first as a watchman, then as a duplicate they can act and fight through.",
  src:"Lyre's Guide to Retia, pp. 361–362",
  mods:{
    divinemantle:"An Eidolon Burden — magical, eidolic attacks and advantage on burn checks.",
    preparedspells:"Enchantment of the Muses opens the Bard list and the Epic of Duality group, plus an Expertise on top.",
    initiative:"Second Echo means you cannot be surprised, ever, and your passive Perception holds while you sleep.",
    invisible:"The Second Echo is, permanently and by default — which is what makes the later duplicate hard to answer.",
    extraattack:"Echoing Blade adds one attack a turn made through the duplicate, from wherever it stands."
  },
  features:[
    {lvl:"Level 1",name:"Eidolons' Favored",body:"<p>{{advantage}} on eidomancy burn checks, and every attack you make counts as magical and eidolic.</p>"},
    {lvl:"Level 1",name:"Enchantment of the Muses",body:"<p>Bard spells and the Epic of Duality group count as Favored Soul spells, plus {{expertise}} in a skill.</p>"},
    {lvl:"Level 6",name:"Second Echo",body:"<p>An {{invisible}} illusory extension of you watches at all times: you cannot be surprised, and it keeps your passive Perception intact while you sleep or are distracted.</p>"},
    {lvl:"Level 10",name:"Harmonious Duplicate",body:"<p>An action and a use of <b>Purification</b> conjures a duplicate within 30 feet — illusory, but treated as you. Each turn you choose which of you is which.</p>"},
    {lvl:"Level 13",name:"Echoing Blade",body:"<p>Once a turn, make a weapon attack through the duplicate. It counts as coming from you in every way except its physical origin.</p>"}
  ]};

ENTRIES["fs-vestias"] = { cls:"favoredsoul", nav:"Burden of Vestias", navSub:"Levels 1 · 6 · 10 · 13", kicker:"Favored Soul Burden",
  name:"Burden of Vestias", tag:"The Sky-Keeper",
  flavor:"One of the four Eidolons, and the goddess of magic. As keeper of the eidomantic web, her favoured resist spells and eidomantic radiation, carry more magical energy than they should, and cast faster than anyone else in the class. They are burdened with a reverence for magic that sets them against both its abusers and its censors. Favoured weapons: spear, quarterstaff, whip.",
  src:"Lyre's Guide to Retia, pp. 362–363",
  mods:{
    divinemantle:"An Eidolon Burden — magical, eidolic attacks and advantage on burn checks.",
    pactspellslots:"Boon of Sorcery's Might grants an extra one at full level, which is the single best resource gain in the class.",
    bonusaction:"Quickcast turns an action spell into one on any turn you also attack, at its base level.",
    antimagic:"Anti-Magic Aegis is a minute of immunity to spells of half your level or lower, cast from outside.",
    preparedspells:"Sky-Keeper's High Sorcery opens the Sorcerer list and the Sky-Keeper's Arcana group."
  },
  features:[
    {lvl:"Level 1",name:"Eidolons' Favored",body:"<p>{{advantage}} on eidomancy burn checks, and every attack you make counts as magical and eidolic.</p>"},
    {lvl:"Level 1",name:"Sky-Keeper's High Sorcery",body:"<p>Sorcerer spells and the Sky-Keeper's Arcana group count as Favored Soul spells for you.</p>"},
    {lvl:"Level 6",name:"Quickcast",body:"<p>On any turn you take the Attack action, a {{bonusaction}} casts a Favored Soul spell that would normally take an action — at its base level, whatever slot you spend.</p>"},
    {lvl:"Level 10",name:"Anti-Magic Aegis",body:"<p>An action and a use of <b>Purification</b> raises a barrier for a minute: you are {{immunity|immune}} to spells of a level up to half your Favored Soul level cast from outside it.</p>"},
    {lvl:"Level 13",name:"Boon of Sorcery's Might",body:"<p>An additional {{pactspellslots|pact slot}}, identical to the rest and at the same level.</p>"}
  ]};


/* ===== Ranger (Revised), brought to parity — and its roster corrected ===== */

ENTRIES["rr-beastrider"] = { cls:"rangerrev", nav:"Beast Rider", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Beast Rider", tag:"A mount, not a pet",
  flavor:"A companion you ride rather than direct from a distance. The bond is intuitive enough that the simplest motion conveys a plan, and if the beast falls the same magic conjures it back.",
  src:"Lyre's Guide to Retia, pp. 384–386",
  mods:{
    favordie:"Extends to your mount — it adds your Favor Bonus to every saving throw and to its passive Perception, so the die is rolling for two bodies.",
    primalcompanion:"The closest thing in Retia to the official Beast Master, built around riding rather than directing.",
    bonusaction:"Commanding the beast costs one, and doing so lets it act immediately rather than waiting for its own turn.",
    initiative:"It shares yours but acts right after you, which makes the pair effectively one long turn.",
    incapacitated:"If you are, the beast stops needing orders and can take any action it likes."
  },
  features:[
    {lvl:"Level 3",name:"Bonus Proficiencies",body:"<p>Riding and Animal Handling.</p>"},
    {lvl:"Level 3",name:"Beast Rider Companion",body:"<p>A Medium or Large beast you can ride, using your {{proficiencybonus}}, Favor Bonus and {{favordie|Favor Die}} throughout its stat block — AC 14, five times your Ranger level in {{hitpoints}}, 40 feet of {{speed}}, {{darkvision}} 60. It shares your {{initiative}} and acts after you, Dodging if given no orders; a {{bonusaction}} commands it and lets it act at once. If you are {{incapacitated}} it acts freely.</p>"},
    {lvl:"Level 7",name:"Beast Improvement",body:"<p>Permanent upgrades to the companion, chosen from a list.</p>"},
    {lvl:"Level 7",name:"Beastmaster Sync",body:"<p>The bond tightens: commands pass intuitively, and a fallen companion can be conjured back through the magic binding you.</p>"},
    {lvl:"Level 11",name:"Greater Beast Improvement",body:"<p>Two more improvements plus one you did not take at 7 — a Multiattack of three natural attacks, two ability scores raised, and more.</p>"},
    {lvl:"Level 15",name:"Perfected Companion",body:"<p>The stat block reaches its final form, still scaling off your own numbers rather than a fixed table.</p>"}
  ]};

ENTRIES["rr-greyarrow"] = { cls:"rangerrev", nav:"Grey Arrow", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Grey Arrow", tag:"Anti-magic archery",
  flavor:"Magic-cancelling Rangers using old Academy techniques to disrupt and destroy the efforts of spellcasters. The order is disciplined, and its arrows are the only thing in the book that carries an antimagic field downrange.",
  src:"Lyre's Guide to Retia, pp. 387–388",
  mods:{
    antimagic:"Web-Severing Bullet loads a localized field into a single round — the only ranged antimagic in Retia.",
    favordie:"Magic-Piercing Rounds adds one against anything currently under a spell, so the die keys off their choices rather than yours.",
    concentration:"Severance Aura gives everyone within 30 feet disadvantage on it, from a migraine your presence causes.",
    reaction:"Severance Aura triggers on anyone within 60 feet casting or starting a turn concentrating.",
    disadvantage:"You impose it on the whole enemy back line simply by standing near them."
  },
  features:[
    {lvl:"Level 3",name:"Arcane Hound",body:"<p>A {{bonusaction}} invokes detect magic for a minute with no {{concentration}}, {{proficiencybonus}} times per {{shortrest}}. You also sense anyone within 60 feet holding concentration, on a Perception check against their passive Deception.</p>"},
    {lvl:"Level 3",name:"Magic-Piercing Rounds",body:"<p>Attack anything willingly under a magical effect or concentrating and treat it as a Favored Enemy — or, if it already was, add a {{favordie|Favor Die}} of damage.</p>"},
    {lvl:"Level 7",name:"Severance Aura",body:"<p>{{concentration}} checks within 30 feet are made at {{disadvantage}} — a migraine caused by concentrating on magic near you. And anyone within 60 feet casting, or starting a turn concentrating, triggers your {{reaction}}.</p>"},
    {lvl:"Level 11",name:"Erasure Arrow",body:"<p>counterspell and dispel magic become free Ranger spells, and while you hold a ranged weapon you can cast both at that weapon's range.</p>"},
    {lvl:"Level 15",name:"Web-Severing Bullet",body:"<p>Replace ammunition with a magically created round carrying a localized {{antimagic}} field. It counts as magical and adds your {{favordie|Favor Die}} to the attack roll.</p>"}
  ]};

ENTRIES["rr-dunestalker"] = { cls:"rangerrev", nav:"Dunestalker", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Dunestalker", tag:"Desert and fire",
  flavor:"From the scorching dunes of Greyrock, used to burns, dehydration and exhaustion. Most of their work is for isolated desert settlements outside the Retian empire, and the grim part of it is protecting against raiders — which leaves them ruthlessly efficient against humanoids.",
  src:"Lyre's Guide to Retia, pp. 388–389",
  mods:{
    favordie:"Desert Flames multiplies it by twice your Favor Bonus for fire damage, which is the biggest single burst any Ranger subclass produces.",
    extraattack:"Extra Attack Improvement at 11 gives three attacks, which few Retia Ranger subclasses do.",
    resistance:"Fire, from level 3, along with advantage against heat and dehydration.",
    criticalhit:"Bursting Flames makes every one a free Desert Flames, which is how the subclass fires without spending uses.",
    advantage:"Stealth Skirmisher grants it against your initial target to everyone, as though you were still hidden."
  },
  features:[
    {lvl:"Level 3",name:"Tactical Ambush",body:"<p>All humanoids become Favored Enemies, you gain {{resistance}} to fire, and {{advantage}} on saves against heat and the desert's other effects.</p>"},
    {lvl:"Level 3",name:"Assassin of the Sands",body:"<p>Hide or Disengage as a {{bonusaction}}, Favor Bonus times per {{shortrest}} — and hiding this way works while only lightly obscured.</p>"},
    {lvl:"Level 7",name:"Desert Flames",body:"<p>A weapon hit ignites: extra fire damage equal to your {{favordie|Favor Die}} multiplied by twice your Favor Bonus. Half your {{proficiencybonus}} uses per {{shortrest}}.</p>"},
    {lvl:"Level 7",name:"Stealth Skirmisher",body:"<p>Attack while hidden and every creature in that Attack action counts as a Favored Enemy — and all attacks against your initial target gain {{advantage}} as though you were still hidden.</p>"},
    {lvl:"Level 11",name:"Extra Attack Improvement",body:"<p>Three attacks on the Attack action.</p>"},
    {lvl:"Level 15",name:"Bursting Flames",body:"<p>A {{criticalhit}} triggers Desert Flames for free, spending none of its uses.</p>"}
  ]};

ENTRIES["rr-gundweller"] = { cls:"rangerrev", nav:"Gun Dweller", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Gun Dweller", tag:"Firearms, quickly and efficiently",
  flavor:"Rangers whose skill with firearms runs well past ordinary proficiency — stunt shots, reloads with a flourish, and primal magic channelled into the ammunition itself.",
  src:"Lyre's Guide to Retia, pp. 389–390",
  mods:{
    favordie:"Full Unload adds it to every firearm critical, and the specialist options key off it throughout.",
    spellslot:"Arcane Munitions converts one into a full reload of rounds that treat everything as a Favored Enemy.",
    cover:"Stunt Shot ignores half and two-thirds of it by shooting around the obstacle.",
    criticalhit:"Superior Critical (Firearms) widens the range at 15, on a class that does not normally get one.",
    extraattack:"The 15th-level specialist option adds a third attack, so long as one of them uses a firearm."
  },
  features:[
    {lvl:"Level 3",name:"Firearm Proficiency",body:"<p>Simple and martial firearms — or, if you had them, one advanced firearm of your choice.</p>"},
    {lvl:"Level 3",name:"Gun Specialist",body:"<p>One option now: <b>Close Quarters Shooter</b> (no {{disadvantage}} firing within 5 feet) or <b>Full Unload</b> (add your {{favordie|Favor Die}} to firearm {{criticalhit|crits}}), among others.</p>"},
    {lvl:"Level 7",name:"Arcane Munitions",body:"<p>A {{bonusaction}} and a {{spellslot}} reloads a firearm with a full magazine of rounds that treat their targets as Favored Enemies and suffer no {{disadvantage}} at long range.</p>"},
    {lvl:"Level 11",name:"Stunt Shot",body:"<p>Ricochet shots around half and two-thirds {{cover}}, and call a stunt on any firearm attack.</p>"},
    {lvl:"Level 11",name:"Reload Flourish",body:"<p>Reloading becomes part of the flourish rather than a cost.</p>"},
    {lvl:"Level 15",name:"Advanced Gun Specialist",body:"<p>A second option: <b>Extra Attack Improvement (Firearms)</b> for three attacks when one uses a gun, or <b>Superior Critical (Firearms)</b> for a wider {{criticalhit|crit}} range.</p>"}
  ]};

ENTRIES["rr-radiantarcher"] = { cls:"rangerrev", nav:"Radiant Archer", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Radiant Archer", tag:"Celestial charms on the arrowheads",
  flavor:"A celestial Ranger who blesses their weapons with charms, which lets them face fiends and undead more easily than most. The only Ranger here who can simply decide an attack will hit.",
  src:"Lyre's Guide to Retia, pp. 390–391",
  mods:{
    advantage:"Guided Hand grants it outright — even cancelling disadvantage — and adds radiant damage on top.",
    favordie:"Guided Hand's radiant damage is a Favor Die, and Radiant Reservoir lets your Focus Die become radiant too.",
    fiend:"Fiends and undead are permanently Favored Enemies from level 3.",
    flyspeed:"Soaring Veil grants one equal to your walking speed whenever you use Nature's Veil, on invisible angelic sigils.",
    opportunityattack:"Guardian Archer makes them at range — with a bow, or with an action-cost spell."
  },
  features:[
    {lvl:"Level 3",name:"Guided Hand",body:"<p>Give any attack with a weapon you are proficient in {{advantage}}, even through {{disadvantage}}, and add your {{favordie|Favor Die}} in radiant damage on a hit. Limited uses per {{shortrest}}.</p>"},
    {lvl:"Level 3",name:"Radiant Reservoir",body:"<p>Your Focus Die can deal radiant damage, and all {{fiend|fiends}} and {{undead}} count as Favored Enemies.</p>"},
    {lvl:"Level 7",name:"Celestial Spellstore",body:"<p>Cleric spells become available whenever you learn or swap a Ranger spell.</p>"},
    {lvl:"Level 11",name:"Providential Sights",body:"<p>A Guided Hand attack marks its target as a Favored Enemy until the end of your next turn, and Guided Hand applies to every attack you make against it that turn.</p>"},
    {lvl:"Level 11",name:"Soaring Veil",body:"<p>Nature's Veil now raises invisible angelic sigils that grant a {{flyspeed}} equal to your walking {{speed}} until your next turn.</p>"},
    {lvl:"Level 15",name:"Guardian Archer",body:"<p>A Favored Enemy moving more than 5 feet in your sight triggers a {{reaction}}: a ranged weapon attack, or an action-cost spell, at its full range.</p>"}
  ]};

ENTRIES["rr-seadog"] = { cls:"rangerrev", nav:"Sea Dog", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Sea Dog", tag:"Water, above and below it",
  flavor:"A pirate-like master of the sea who specialises in fighting on open water and under it — cutlass in one hand, pistol in the other.",
  src:"Lyre's Guide to Retia, pp. 391–392",
  mods:{
    favordie:"Ocean Expert adds your Favor Bonus to physical saves while you are submerged, which is most of this subclass's life.",
    speed:"A swim speed equal to your walking speed, or five feet per Favor Bonus added if you already had one — rescaling every time the bonus grows.",
    extraattack:"Hand-in-Hand gives a free second attack each turn when you hold a one-handed melee weapon and a one-handed ranged one.",
    disadvantage:"The bonus ranged attack from Hand-in-Hand does not suffer it, even at point-blank range.",
    spellslot:"Lord of the Sea gives drowning wave and control water once each per long rest without spending one."
  },
  features:[
    {lvl:"Level 3",name:"Ocean Expert",body:"<p>Half-submerged in liquid that is not hurting you, add your Favor Bonus to Strength, Dexterity and Constitution {{savingthrow|saves}} — and to Survival checks for finding food at sea.</p>"},
    {lvl:"Level 3",name:"Sea Legs",body:"<p>A swim {{speed}} equal to your walking speed, or +5 feet per Favor Bonus if you had one already, rescaling as the bonus grows. Hold your breath twice as long.</p>"},
    {lvl:"Level 7",name:"Hand-in-Hand",body:"<p>Holding a one-handed melee weapon and a one-handed ranged weapon, once a turn an attack with one grants a free attack with the other in the same action — and the ranged one takes no {{disadvantage}}.</p>"},
    {lvl:"Level 11",name:"Wet-Heeled Advantage",body:"<p>Anything with a swim speed, or currently swimming, counts as a Favored Enemy.</p>"},
    {lvl:"Level 15",name:"Lord of the Sea",body:"<p>drowning wave and control water become free Ranger spells, castable once each per {{longrest}} without a {{spellslot}}.</p>"}
  ]};

ENTRIES["rr-technoscope"] = { cls:"rangerrev", nav:"Technoscope", navSub:"Levels 3 · 7 · 11 · 15", kicker:"Ranger (Revised) subclass",
  name:"Technoscope", tag:"Battling machines, and repairing them",
  flavor:"An expert at fighting constructs and at fixing them afterwards. The most Retian of the seven — tinker's tools, mines, scopes, and a d100 table for improvising your way out of trouble.",
  src:"Lyre's Guide to Retia, pp. 393–394",
  mods:{
    favordie:"Your Tinkertech pool is sized by your Favor Bonus, so the subclass's gadget economy rides on the same number as everything else.",
    hitpoints:"Techmending lets healing spells work on constructs, which they explicitly are not supposed to.",
    reaction:"Gizmo Solution spends one to build a device on the spot and roll d100 plus your Ranger level against a problem.",
    disadvantage:"Gizmo Solution only triggers under it, which makes the subclass strongest exactly when things go wrong.",
    concentration:"Arcane Mine stores a spell in a trap instead of casting it, so it costs nothing to hold."
  },
  features:[
    {lvl:"Level 3",name:"Mechanical Focus",body:"<p>Tinker's tools, and constructs are automatically an extra Favored Enemy — or another of your choice if you had already taken them.</p>"},
    {lvl:"Level 3",name:"Techmending",body:"<p>Healing spells that exclude constructs work on them anyway, by rewiring them or reproducing the magic that made them. Destroyed parts stay destroyed.</p>"},
    {lvl:"Level 7",name:"Tinkertech",body:"<p>A pool of Tinkertech points equal to your Favor Bonus, spent on small mechanical solutions wherever you have tools or scrap.</p>"},
    {lvl:"Level 11",name:"Arcane Mine",body:"<p>Cast a spell as normal but place its effect in a stationary mine on a surface you touch, with any trigger you describe.</p>"},
    {lvl:"Level 15",name:"Gizmo Solution",body:"<p>Rolling with {{disadvantage}} and holding tools, a {{reaction}} builds a temporary device: roll d100 plus your Ranger level to see what it does.</p>"}
  ]};

CLASSES.rangerrev.groups[1].keys = ["rr-beastrider","rr-greyarrow","rr-dunestalker","rr-gundweller","rr-radiantarcher","rr-seadog","rr-technoscope"];

/* these three were filed here by mistake — they are homebrew subclasses for official classes */
delete ENTRIES["rr-versatilebeast"];
delete ENTRIES["rr-deadshot"];
delete ENTRIES["rr-wilderudite"];

/* ===== Retia homebrew subclasses for official classes ===== */

ENTRIES["ro-versatilebeast"] = { cls:"rogue", nav:"Versatile Beast", navSub:"Levels 3 · 9 · 13 · 17", kicker:"Rogue subclass · homebrew",
  name:"Versatile Beast", tag:"Lycanthropy, but only partly",
  flavor:"Inflicted with a case of lycanthropy that never completed — contact with a lycanthrope, a parent who nearly succumbed, or a mutation from dark magic. Sharpened fangs and nails, and a fighting style that uses them as readily as a dagger.",
  src:"Lyre's Guide to Retia, pp. 465–466",
  mods:{
    unarmedstrike:"Tooth and Claw makes yours light, finesse weapons dealing 1d4 and rising — which means Sneak Attack works off them.",
    sneakattack:"The subclass exists to make unarmed strikes a legal delivery for it, with a bonus-action strike every turn.",
    darkvision:"30 feet, or 30 more if you already had it, extended again by Partial Transformation.",
    hitpoints:"Healing Factor regenerates half your Rogue level every turn for a minute, once per rest.",
    resistance:"Primal Flurry makes your strikes magical for overcoming it."
  },
  features:[
    {lvl:"Level 3",name:"Beast's Darkvision",body:"<p>{{darkvision}} out to 30 feet, or 30 feet further if you already had it.</p>"},
    {lvl:"Level 3",name:"Tooth & Claw",body:"<p>{{unarmedstrike|Unarmed strikes}} count as light, finesse weapons dealing 1d4 slashing, rising with level — and one comes free as a {{bonusaction}}.</p>"},
    {lvl:"Level 9",name:"Partial Transformation",body:"<p>A climb {{speed}} equal to your walking speed, extended {{darkvision}}, and further bestial benefits.</p>"},
    {lvl:"Level 13",name:"Cursed Wound",body:"<p>An {{unarmedstrike}} can force your partial lycanthropy on the target: a Constitution {{savingthrow|save}} or necrotic damage at the start of each of their turns for a minute.</p>"},
    {lvl:"Level 13",name:"Primal Flurry",body:"<p>The {{bonusaction}} strike becomes two, and your strikes count as magical for {{resistance}}.</p>"},
    {lvl:"Level 17",name:"Healing Factor",body:"<p>A {{bonusaction}} regenerates half your Rogue level in {{hitpoints}} at the start of each turn for a minute, once per {{shortrest}}.</p>"}
  ]};

ENTRIES["ro-deadshot"] = { cls:"rogue", nav:"Deadshot", navSub:"Levels 3 · 9 · 13 · 17", kicker:"Rogue subclass · homebrew",
  name:"Deadshot", tag:"Firearms, and nowhere to hide from them",
  flavor:"A Rogue whose whole discipline is the gun — tactician first, master second, and by the end faster on the draw than anyone else at the table.",
  src:"Lyre's Guide to Retia, pp. 470–471",
  mods:{
    sneakattack:"Firearms carry it, and Swift Draw gives you a second chance at it on any turn you have not shot yet.",
    cover:"Superior Cover Fire turns your firing arc into a threatened zone anyone entering has to pay for.",
    opportunityattack:"You make them on anything entering your firearm's normal range, not just anything leaving your reach.",
    bonusaction:"Gun Master spends one and a round of ammunition on a trick shot; Swift Draw spends one for two shots.",
    fightingstyle:"Gun Master grants Gun Expert and then advances it twice by level 17."
  },
  features:[
    {lvl:"Level 3",name:"Firearm Tactician",body:"<p>Simple and martial firearms, and your first firearm attack each turn fires at long range as though it were normal range.</p>"},
    {lvl:"Level 9",name:"Gun Master",body:"<p>The Gun Expert {{fightingstyle|fighting style}}, advanced if you had it and again at 17. A {{bonusaction}} and a round of ammunition performs trick shots.</p>"},
    {lvl:"Level 9",name:"Loaded Shot",body:"<p>Prepared ammunition that does more than hit.</p>"},
    {lvl:"Level 13",name:"Superior Cover Fire",body:"<p>Anything entering your firearm's normal range provokes an {{opportunityattack}} from it.</p>"},
    {lvl:"Level 17",name:"Swift Draw",body:"<p>On a turn you have not fired, a {{bonusaction}} makes two firearm attacks.</p>"}
  ]};

ENTRIES["bd-wilderudite"] = { cls:"bard", nav:"Wild Erudite", navSub:"Levels 3 · 6 · 14", kicker:"Bard college · homebrew",
  name:"College of the Wild Erudite", tag:"Research turned into an edge",
  flavor:"The scholar's college — beasts and monsters studied at length, in stories and in literal accounts, and that knowledge converted directly into advantage the moment you meet one.",
  src:"Lyre's Guide to Retia, pp. 442–443",
  mods:{
    expertise:"Nature, from level 3, and a bonus-action check against a creature's Challenge Rating tells you what it can do.",
    bardicinspiration:"Situational Savant lets the recipient decide after seeing the situation, and Complete Certainty spends one as a reaction to lock in a hit.",
    challengerating:"Storied Research reads it directly as the DC, so a high-CR monster is genuinely harder to identify.",
    advantage:"Situational Savant converts it into a flat Bardic Inspiration bonus on the attacks that would already have had it.",
    extraattack:"Magic Strike at 6 lets an action-cost spell carry a weapon attack, which is unusual for a Bard."
  },
  features:[
    {lvl:"Level 3",name:"Storied Research",body:"<p>{{expertise}} in Nature, and a {{bonusaction}} Nature check against a non-humanoid within 60 feet — DC equal to its {{challengerating}} — reveals what it can do.</p>"},
    {lvl:"Level 6",name:"Magic Strike",body:"<p>An action-cost spell can carry a weapon attack in the same action.</p>"},
    {lvl:"Level 6",name:"Situational Savant",body:"<p>Anyone holding your {{bardicinspiration}} who would have {{advantage}} from long range, {{cover}} or the environment can instead add the die to the attack before rolling.</p>"},
    {lvl:"Level 14",name:"Complete Certainty",body:"<p>Light armour, shields and martial weapons — and when you or an ally within 60 feet hits, a {{reaction}} and a {{bardicinspiration}} die locks that attack and the ones following it in.</p>"}
  ]};

CLASSES.rogue.groups.push({ label:"Homebrew subclasses (Retia)", keys:["ro-versatilebeast","ro-deadshot"] });
CLASSES.rogue.foot = "Sources: Player's Handbook (2024), Chapter 3 — Rogue, pp. 114–121. Homebrew: Lyre's Guide to Retia — Land of Industry, Ch. 8.";
CLASSES.bard.groups.push({ label:"Homebrew colleges (Retia)", keys:["bd-wilderudite"] });
CLASSES.bard.foot = "Sources: Player's Handbook (2024), Chapter 3 — Bard, pp. 60–67. Homebrew: Lyre's Guide to Retia — Land of Industry, Ch. 8.";


/* ===== Inscriptor intents, brought to parity — all twelve of them ===== */

ENTRIES["is-core"] = { cls:"inscriptor", nav:"Core features", navSub:"The class itself", kicker:"Inscriptor",
  name:"Core Class Features",
  tag:"A writer whose work comes true",
  flavor:"A novelist, playwright, poet or records clerk whose talent caught the eye of a Correfont — one of a cabal of demigods keeping an endless library. A novelist narrates events into being; an archivist writes objects into having new qualities. Your Intent is the genre you write in, and it arrives at level 1.",
  src:"Lyre's Guide to Retia, pp. 364–367",
  mods:{},
  features:[
    {lvl:"Level 1",name:"Intent",body:"<p>The genre you write in — twelve of them, granting features at 1, 5, 8, 12 and 20. Each also brings its own Chapter Spells at spell levels 1, 3, 5, 7 and 9.</p>"},
    {lvl:"Level 1",name:"Pact Magic",body:"<p>{{pactspellslots}} on Intelligence — you cast by describing rather than by incanting.</p>"},
    {lvl:"Level 1",name:"Inscription Marks",body:"<p>{{inscriptionmark|Inscription marks}}. Many of the class's best options need a number of marks rather than a level, so the marks are the real progression.</p>"},
    {lvl:"Level 1",name:"Narrative Twists",body:"<p>{{narrativetwist|Narrative twists}} — spent to bend a scene the way a story would.</p>"},
    {lvl:"Level 18",name:"Consultation",body:"<p>Ask the Correfont directly. Several Intents spend uses of it on their heaviest features.</p>"},
    {lvl:"Level 20",name:"Intent Feature",body:"<p>Your genre's capstone, which is where the Intents diverge most sharply.</p>"}
  ]};

ENTRIES["is-adventure"] = { cls:"inscriptor", nav:"Intent of Adventure", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Adventure", tag:"Adventurous fantasy",
  flavor:"You write heroes, and then endow yourself with what you wrote. Danger and misfortune are only the setup for a last-second escape — the only Intent that expects to be in the fight.",
  src:"Lyre's Guide to Retia, pp. 367–368",
  mods:{
    extraattack:"The only Intent that gets it, at level 8, which is what makes this the martial option.",
    inscriptionmark:"Armed with Knowledge hands you the Adventurous Fantasy Inscription for free, refunding the marks if you had already bought it.",
    d20test:"Against the Odds rerolls every natural 1 you roll on anything — attacks, checks, saves, even damage dice.",
    temporaryhp:"Finest Hour gives your whole Inscriptor level to a proficiency-bonus worth of allies.",
    narrativetwist:"Less central here than elsewhere — Adventure spends Consultation and marks instead."
  },
  features:[
    {lvl:"Level 1",name:"Against the Odds",body:"<p>Roll a 1 on any attack, {{abilitycheck}}, {{savingthrow|save}} or damage die and you may reroll it once, keeping the new result.</p>"},
    {lvl:"Level 5",name:"Armed with Knowledge",body:"<p>The Adventurous Fantasy Inscription free, with no {{inscriptionmark|mark}} cost — and your marks refunded if you already had it.</p>"},
    {lvl:"Level 8",name:"Extra Attack",body:"<p>{{extraattack}}.</p>"},
    {lvl:"Level 12",name:"Finest Hour",body:"<p>An action and a use of Consultation gives {{proficiencybonus}} creatures within 30 feet your Inscriptor level in {{temporaryhp|temporary hit points}}.</p>"},
    {lvl:"Level 20",name:"Ultimate Stakes",body:"<p>Once per {{longrest}}, cast invulnerability on yourself, free of slot and components.</p>"}
  ]};

ENTRIES["is-comedy"] = { cls:"inscriptor", nav:"Intent of Comedy", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Comedy", tag:"Hubris, happenstance and misfortune",
  flavor:"A comic writer, which turns out to be a control specialist. Your jokes charm, your props animate, and your finale is an extended story of everything going wrong for everyone but you.",
  src:"Lyre's Guide to Retia, pp. 368–369",
  mods:{
    charmed:"You are immune to it from level 1, and Death Duck hands it out to everyone within 20 feet of an adorable decoy.",
    frightened:"Immune from level 1, alongside charmed and enraged — the cleanest mental defence of the twelve.",
    incapacitated:"Anything charmed by Death Duck also is, and cannot move at all while it lasts.",
    narrativetwist:"Death Duck costs one as a bonus action, which makes it the Intent's main play.",
    concentration:"Comedy of Errors needs it plus a bonus action every turn, so the capstone is a commitment."
  },
  features:[
    {lvl:"Level 1",name:"I Don't Get It",body:"<p>You cannot be {{charmed}}, enraged or {{frightened}}.</p>"},
    {lvl:"Level 5",name:"Slapstick",body:"<p>Once per {{longrest}}, cast dominate person or animate objects free of slot and components — and a use of Consultation raises its level.</p>"},
    {lvl:"Level 8",name:"Death Duck",body:"<p>A {{bonusaction}} and a {{narrativetwist|narrative twist}} places a lifelike replica of an adorable animal within 60 feet. Anyone starting a turn or entering within 20 feet makes a Charisma {{savingthrow|save}} or is {{charmed}} and {{incapacitated}}, unable to move or look away. A success grants permanent immunity to that replica.</p>"},
    {lvl:"Level 12",name:"Prop Comedy",body:"<p>Objects become part of the act rather than the scenery.</p>"},
    {lvl:"Level 20",name:"Comedy of Errors",body:"<p>An action begins an extensive story of hubris and misfortune, lasting a minute so long as you spend a {{bonusaction}} and hold {{concentration}} each turn.</p>"}
  ]};

ENTRIES["is-cosmichorror"] = { cls:"inscriptor", nav:"Intent of Cosmic Horror", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Cosmic Horror", tag:"Things you wrote that took notice",
  flavor:"You write eldritch horror, and it writes back. Either you invented a being that has since taken an interest in you, or you earned its attention honestly — the book notes there may be no way to tell the difference.",
  src:"Lyre's Guide to Retia, pp. 369–370",
  mods:{
    narrativetwist:"Sudden Terror spends one to drop an aberration of up to your Inscriptor level in CR onto the field, acting immediately.",
    hitpoints:"Conjured Horror costs 2d12 irreducible psychic damage to cast — the only summon in the book that hurts you to use.",
    frightened:"Your Worst Nightmare is the payload, and at 20 you become immune to it yourself.",
    charmed:"Immune from level 20, along with frightened and stunned, plus a hover speed.",
    darkvision:"Devil Eyes gives devilsight out to 60 feet and lets you share 30 feet of it with the party."
  },
  features:[
    {lvl:"Level 1",name:"Devil Eyes",body:"<p>Devilsight out to 60 feet. Once per {{longrest}}, a {{bonusaction}} gives {{proficiencybonus}} creatures within 30 feet 30 feet of it for 10 minutes.</p>"},
    {lvl:"Level 5",name:"Conjured Horror",body:"<p>Once per {{longrest}}, an action summons a loyal aberration within 15 feet — at the cost of 2d12 irreducible psychic damage to you.</p>"},
    {lvl:"Level 8",name:"Your Worst Nightmare",body:"<p>Once per {{shortrest}}, an action catches a creature within 60 feet and everything within 15 feet of it in a whirlwind of eldritch horror — mental assault and grotesque appendages together.</p>"},
    {lvl:"Level 12",name:"Sudden Terror",body:"<p>A {{bonusaction}} and a {{narrativetwist|narrative twist}} writes an aberration of CR up to your Inscriptor level into an unoccupied space within 60 feet, and it acts on arrival.</p>"},
    {lvl:"Level 20",name:"Conduit for a Greater Power",body:"<p>An outer being's blessing: {{immunity}} to {{charmed}}, {{frightened}} and {{stunned}}, plus a hovering {{flyspeed}}.</p>"}
  ]};

ENTRIES["is-fantasy"] = { cls:"inscriptor", nav:"Intent of Fantasy", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Fantasy", tag:"Named techniques and training arcs",
  flavor:"You write about beings who go past mortal limits and into the realm of the gods — epic stakes, colourful casts, and techniques that get announced before they land.",
  src:"Lyre's Guide to Retia, pp. 370–371",
  mods:{
    pactspellslots:"Ultimate Boost gives an extra one at 12, another at 15 and another at 18 — the largest slot gain of the twelve Intents.",
    narrativetwist:"Named Technique spends one to attach your written, named manoeuvre to a damaging spell.",
    speed:"Training Arc can buy 10 more feet of it, or blindsight, or another boon, with a second pick at level 10.",
    blindsight:"One of the Training Arc options, which is unusual for a caster to simply have.",
    proficiencybonus:"Beyond the Beyond adds half of it to every roll and the AC of a willing ally you write into a super-being."
  },
  features:[
    {lvl:"Level 1",name:"Training Arc",body:"<p>One boon now and another at level 10: +10 feet of {{speed}}, {{blindsight}}, or one of the other written-in results of all that personal training.</p>"},
    {lvl:"Level 5",name:"Named Technique",body:"<p>Write and name a technique. Spend a {{narrativetwist|narrative twist}} on a damaging spell to deploy it.</p>"},
    {lvl:"Level 8",name:"Return from the Brink",body:"<p>The hero's recovery, written into reality.</p>"},
    {lvl:"Level 12",name:"Ultimate Boost",body:"<p>An extra {{pactspellslots|pact slot}}, plus another at 15 and another at 18.</p>"},
    {lvl:"Level 20",name:"Beyond the Beyond",body:"<p>An action writes a willing creature within 60 feet into a super-being: half your {{proficiencybonus}} added to every attack, {{savingthrow|save}}, {{abilitycheck}} and their {{armorclass}}.</p>"}
  ]};

ENTRIES["is-forbiddance"] = { cls:"inscriptor", nav:"Intent of Forbiddance", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Forbiddance", tag:"Words of power, locks and keys",
  flavor:"You chase ancient tomes and forgotten lore, chronicling or protecting knowledge that has fallen out of public reach. Your talents run to comprehension, mental protection, and sealing or unsealing whatever stands in the way.",
  src:"Lyre's Guide to Retia, pp. 372–373",
  mods:{
    resistance:"Psychic, plus advantage on Intelligence saves and a mind nobody can read or reach without your permission.",
    savingthrow:"Unknowable Mind covers the one stat an Inscriptor cannot afford to lose.",
    spellsavedc:"An object you lock with no previous lock takes yours as the DC to break or pick.",
    proficiencybonus:"Lock and Key's free arcane lock and knock castings are metered by half of it.",
    concentration:"Nothing here needs it, which is rare — Forbiddance is almost entirely passive."
  },
  features:[
    {lvl:"Level 1",name:"Omnilingual",body:"<p>Understand and speak any language whose script you have seen. You also perceive the spell stored inside any glyph-like effect, and what it would target.</p>"},
    {lvl:"Level 5",name:"Unknowable Mind",body:"<p>{{resistance}} to psychic damage, {{advantage}} on Intelligence {{savingthrow|saves}}, and no creature can read your mind or reach you telepathically without permission — you know when they try.</p>"},
    {lvl:"Level 8",name:"Lock and Key",body:"<p>Open or close any unlocked, nonmagical door or container within 60 feet as an interaction. Cast arcane lock and knock half your {{proficiencybonus}} times per {{longrest}}, free — arcane lock reaches 60 feet, knock is silent, and an unlocked object takes your {{spellsavedc}} as its DC. Each lock needs a written record of who may pass; destroy the record and the spell ends.</p>"},
    {lvl:"Level 12",name:"Truesight",body:"<p>See through deceptive effects: truesight out to 60 feet.</p>"},
    {lvl:"Level 20",name:"Words of Power",body:"<p>You know the written forms of powerful words, which change how every spell with writ or power word in its name behaves at 5th level and beyond.</p>"}
  ]};

ENTRIES["is-history"] = { cls:"inscriptor", nav:"Intent of History", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of History", tag:"Recorded fact",
  flavor:"A history buff by nature — archives, rosters, recollections, non-fiction. Literary casting lets you read the past and look at the present as though it were a descriptive account, learning things you should not have.",
  src:"Lyre's Guide to Retia, pp. 373–374",
  mods:{
    expertise:"History, from level 1 — and you can recall useful information about subjects you never formally researched.",
    narrativetwist:"Invasive Research spends one to read three concrete facts off a creature you can see: hit points, AC, ability scores.",
    bonusaction:"Researcher makes Help one, usable at 60 feet, on any check regardless of whether you know the subject.",
    proficiencybonus:"A narrative twist spreads one Help action across that many creatures at once.",
    abilitycheck:"You can Help with any of them — the Intent writes about someone's success in broad terms rather than assisting directly."
  },
  features:[
    {lvl:"Level 1",name:"Informed Account",body:"<p>Proficiency and {{expertise}} in History — or another skill if you had it. History checks on subjects you never researched still turn something up.</p>"},
    {lvl:"Level 5",name:"Invasive Research",body:"<p>A {{bonusaction}} and a {{narrativetwist|narrative twist}} reads three facts off a creature you can see: remaining {{hitpoints}} to the nearest 20, current and unmodified {{armorclass}}, ability scores, and more.</p>"},
    {lvl:"Level 8",name:"Researcher",body:"<p>Help as a {{bonusaction}} on anyone within 60 feet, for any {{abilitycheck}} whether or not you know the skill. A {{narrativetwist|narrative twist}} spreads it across {{proficiencybonus}} creatures at once.</p>"},
    {lvl:"Level 12",name:"Categoric Truth",body:"<p>legend lore cast with a {{pactspellslots|pact slot}} takes one action. Cast it over an hour into an empty tome and everything you learn is transcribed, cross-referenced with other sources and appended with where to look next.</p>"},
    {lvl:"Level 20",name:"Sabotage Record",body:"<p>The record itself becomes something you can edit.</p>"}
  ]};

ENTRIES["is-mystery"] = { cls:"inscriptor", nav:"Intent of Mystery", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Mystery", tag:"Detective fiction",
  flavor:"A writer of mysteries: careful investigation, a suspect, a second suspect, and an escape nobody can explain afterwards.",
  src:"Lyre's Guide to Retia, pp. 374–375",
  mods:{
    invisible:"Impossible Escape teleports you your full speed and turns you invisible with no concentration, taking everything you carry.",
    disadvantage:"Whodunit imposes it on the first save of anyone you are hidden from — and a failure keeps you hidden.",
    savingthrow:"Likely Suspect redirects an effect onto a second target when the first one passes, so nothing you cast is wasted.",
    darkvision:"Private Eye gives devilsight out to 120 feet, the longest in the class.",
    teleport:"Impossible Escape at 20, with no trace left behind."
  },
  features:[
    {lvl:"Level 1",name:"Careful Investigator",body:"<p>Stealth, Insight and Investigation — or another Charisma or Intelligence skill in place of any you already had.</p>"},
    {lvl:"Level 5",name:"Whodunit",body:"<p>Cast while hidden and anyone who cannot see you has {{disadvantage}} on their first {{savingthrow|save}} — and if they fail it, you stay hidden.</p>"},
    {lvl:"Level 8",name:"Private Eye",body:"<p>Devilsight out to 120 feet.</p>"},
    {lvl:"Level 12",name:"Likely Suspect",body:"<p>When a target passes its first {{savingthrow|save}} against your effect, you can have the effect ignore them and pick a second target instead.</p>"},
    {lvl:"Level 20",name:"Impossible Escape",body:"<p>A {{bonusaction}} {{teleport|teleports}} you your full {{speed}} and turns you {{invisible}} until your next turn — no {{concentration}}, everything you carry comes with you, and no trace is left.</p>"}
  ]};

ENTRIES["is-mythology"] = { cls:"inscriptor", nav:"Intent of Mythology", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Mythology", tag:"Bestiaries, and what is in them",
  flavor:"You study bestiaries and write about great beasts. Where others stand in awe, you take notes on the particulars — and then imagine them into being on your side.",
  src:"Lyre's Guide to Retia, pp. 375–376",
  mods:{
    armorclass:"Hide Enchantment is 10 plus Dexterity plus Intelligence, written as a dragon's scales.",
    savingthrow:"Invoke Phantasm gives proficiency in all of them while you are not incapacitated — the strongest defensive feature of the twelve.",
    narrativetwist:"Subversive Beast Hunter spends one to add 1d10 to a failed roll against a beast, dragon or monstrosity, plus resistance to whatever it was about to do.",
    restrained:"Grounding strips every movement type but walking for an hour on a failed Intelligence save, at 240 feet.",
    challengerating:"Summon Legend conjures anything up to CR 20, with its hit points rewritten to twice your own."
  },
  features:[
    {lvl:"Level 1",name:"Hide Enchantment",body:"<p>Unarmoured, your {{armorclass}} is 10 plus Dexterity plus Intelligence — written as a mythical beast's hide.</p>"},
    {lvl:"Level 5",name:"Subversive Beast Hunter",body:"<p>Fail a {{savingthrow|save}} or {{abilitycheck}} against a monstrosity, dragon or beast and a {{narrativetwist|narrative twist}} adds 1d10 — plus a minute of {{resistance}} to whatever damage you would have taken.</p>"},
    {lvl:"Level 8",name:"Grounding",body:"<p>A {{bonusaction}} and a use of Consultation targets a creature within 240 feet: an Intelligence {{savingthrow|save}} or it loses every movement type but walking for an hour, repeatable as an action.</p>"},
    {lvl:"Level 12",name:"Invoke Phantasm",body:"<p>Proficiency in every {{savingthrow|saving throw}} while you are not {{incapacitated}} — each one written as a legendary beast's method of surviving it.</p>"},
    {lvl:"Level 20",name:"Summon Legend",body:"<p>Once per {{longrest}}, conjure a fictional beast, dragon, monstrosity or celestial of {{challengerating|CR}} 20 or less within 30 feet for 10 minutes — mountable on arrival, no legendary or lair actions, and its maximum {{hitpoints}} become twice your own.</p>"}
  ]};

ENTRIES["is-playwright"] = { cls:"inscriptor", nav:"Intent of Playwright", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Playwright", tag:"Scripts and staging",
  flavor:"A dramatist. You block the scene, hand out the lines, and expect everyone to hit their marks — which, being written by you, they do.",
  src:"Lyre's Guide to Retia, pp. 376–377",
  mods:{
    initiative:"Take the Stage adds your whole proficiency bonus to it, which no other Intent does.",
    charmed:"Motivation charms willing creatures — including the ones who are immune — as the price of the protection it offers.",
    abilitycheck:"Reliable Talent turns any proficient skill check under 10 into a 10.",
    bonusaction:"Stage Direction spends one and a Consultation to hand an ally an entire extra action.",
    spellslot:"Encore casts any spell you have seen cast since your last long rest, at the level you saw it, for free."
  },
  features:[
    {lvl:"Level 1",name:"Take the Stage",body:"<p>Add your {{proficiencybonus}} to {{initiative}}.</p>"},
    {lvl:"Level 5",name:"Motivation",body:"<p>Once per {{shortrest}}, an action {{charmed|charms}} up to {{proficiencybonus}} willing creatures including yourself — even those normally immune — and guides them out of harm.</p>"},
    {lvl:"Level 8",name:"Stage Direction",body:"<p>A {{bonusaction}} and a use of Consultation writes lines for an ally within 60 feet: they gain an extra action, taken on their next turn within the minute.</p>"},
    {lvl:"Level 12",name:"Reliable Talent",body:"<p>Any {{abilitycheck}} with a proficient skill treats a d20 under 10 as a 10.</p>"},
    {lvl:"Level 20",name:"Encore",body:"<p>A use of Consultation casts any spell you have seen cast, or cast yourself, since your last {{longrest}} — at the level you saw it, with no {{spellslot}} or components.</p>"}
  ]};

ENTRIES["is-romance"] = { cls:"inscriptor", nav:"Intent of Romance", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Intent of Romance", tag:"Affection, and what it costs",
  flavor:"You write romance, which makes you charming by construction and dangerous by implication — the same pen that binds two people together can overload a charmed mind with contradictions.",
  src:"Lyre's Guide to Retia, pp. 377–378",
  mods:{
    charmed:"Lovers to Enemies charms at your full pact slot level, then converts the charm into stunning by overloading it.",
    stunned:"The follow-through: every creature you have charmed can be stunned at once with a single action.",
    reaction:"Attentive casts an action-cost spell on your reaction when an ally within 30 feet drops or takes a critical hit.",
    abilitycheck:"Suave treats any Charisma d20 of 9 or lower as a 10, permanently.",
    narrativetwist:"Lovers to Enemies spends one, which is the Intent's only real cost."
  },
  features:[
    {lvl:"Level 1",name:"Suave",body:"<p>Any Charisma {{abilitycheck}} or {{savingthrow|save}} that rolls 9 or lower counts as a 10.</p>"},
    {lvl:"Level 5",name:"Attentive",body:"<p>When an ally within 30 feet drops to 0 {{hitpoints}} or takes a {{criticalhit}}, a {{reaction}} casts a spell of one action or faster at them — or at whoever hurt them.</p>"},
    {lvl:"Level 8",name:"Lovers to Enemies",body:"<p>An action and a {{narrativetwist|narrative twist}} casts charm person at your {{pactspellslots|pact slot}} level. While anything is {{charmed}} by you, an action overloads every charmed mind with contradictions and leaves them {{stunned}} instead.</p>"},
    {lvl:"Level 12",name:"Good Health",body:"<p>A use of Consultation casts greater restoration, free of slot and components.</p>"},
    {lvl:"Level 20",name:"Until Death",body:"<p>Once per {{shortrest}}, a minute-long ceremony bonds two willing creatures who genuinely care for each other: while within 60 feet, neither falls until both do.</p>"}
  ]};

ENTRIES["is-vestiasscribe"] = { cls:"inscriptor", nav:"Vestias' Scribe", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Vestias' Scribe", tag:"Writing for the god of magic",
  flavor:"Not a genre but a patron — the Sky-Keeper herself. A Vestias' Scribe breaks down the barriers between magical sources, and ends up with more of other people's spell lists than anyone in the book.",
  src:"Lyre's Guide to Retia, pp. 378–379",
  mods:{
    spellbook:"Arcane Savant attunes to a Wizard's as though it were a magic item, and prepares Intelligence-modifier spells out of it each long rest.",
    pactspellslots:"Deific Consultation guarantees every Consultation-made slot is at least your normal level, whatever your proficiency bonus says.",
    savingthrow:"Magic Resistance at 12 gives advantage against spells and magical effects, plus resistance to their damage.",
    resistance:"To magical damage outright, which almost nothing else in Retia grants.",
    preparedspells:"Arcane Font opens a Ranger, Sorcerer, Warlock or Wizard list permanently."
  },
  features:[
    {lvl:"Level 1",name:"Arcane Font",body:"<p>Choose Ranger, Sorcerer, Warlock or Wizard — their spells count as Inscriptor spells for you as you level.</p>"},
    {lvl:"Level 5",name:"Arcane Savant",body:"<p>Attune to a Wizard's {{spellbook}} as a magic item. Each {{longrest}}, prepare your Intelligence modifier in spells from it, of a level you have {{pactspellslots|pact slots}} for.</p>"},
    {lvl:"Level 8",name:"Deific Consultation",body:"<p>Slots made with Consultation are always at least your normal {{pactspellslots|pact slot}} level, whatever your {{proficiencybonus}}.</p>"},
    {lvl:"Level 12",name:"Magic Resistance",body:"<p>{{advantage}} on {{savingthrow|saves}} against spells and magical effects, and {{resistance}} to their damage.</p>"},
    {lvl:"Level 20",name:"Weave God's Pen",body:"<p>Once per {{longrest}}, an action makes you a conduit for Vestias for a minute — a hovering {{flyspeed}} of 60 feet, and more.</p>"}
  ]};

ENTRIES["is-wakefield"] = { cls:"inscriptor", nav:"Wakefield", navSub:"Levels 1 · 5 · 8 · 12 · 20", kicker:"Inscriptor intent",
  name:"Wakefield", tag:"No writing at all — dreams instead",
  flavor:"The Intent for someone with little experience outlining their desires. A Wakefield leans on nightmares and dreams to shape their power, and wakes to find pages and notes that turn out, later, to have been about what was coming.",
  src:"Lyre's Guide to Retia, pp. 379–380",
  mods:{
    preparedspells:"Wakefield does not learn Inscriptor spells at all — you prepare from what the dreams left behind on each long rest.",
    inscriptionmark:"Less central here than in any other Intent, since your list is rewritten nightly rather than built up.",
    reaction:"Avoidance turns the cryptic notes into split-second timing.",
    d20test:"Flicker Future casts foresight on yourself once per long rest, which is the strongest roll-manipulation in the class.",
    longrest:"The whole Intent runs on them — your spells, your notes and your future all arrive during sleep."
  },
  features:[
    {lvl:"Level 1",name:"Nightmare Guide",body:"<p>You never learn Inscriptor spells. Instead, each {{longrest}} you prepare a number of spells from what the dreams supplied — a {{preparedspells|prepared}} caster in a class of known-spell casters.</p>"},
    {lvl:"Level 5",name:"Object of Power",body:"<p>Each rest, name a weapon as your Object of Power until the next one — you gain proficiency with it and write yourself as someone better trained in it.</p>"},
    {lvl:"Level 8",name:"Manuscript",body:"<p>An action and a use of Consultation targets {{proficiencybonus}} creatures within 60 feet: whoever controls them must declare their actions and movement in advance.</p>"},
    {lvl:"Level 12",name:"Avoidance",body:"<p>Cryptic pages from your sleep resolve into split-second {{reaction|reactions}} at exactly the right moment.</p>"},
    {lvl:"Level 20",name:"Flicker Future",body:"<p>Once per {{longrest}}, cast foresight on yourself, free of slot and components.</p>"}
  ]};

CLASSES.inscriptor.note = "<strong>The heaviest bookkeeping in the Retia set, and the most fun for a DM.</strong> You cast by describing. Many of the class's best options need a number of inscription marks rather than a level, so the marks are the real progression — and there are twelve Intents, each with its own Chapter Spells at levels 1, 3, 5, 7 and 9.";
CLASSES.inscriptor.groups[1].keys = ["is-adventure","is-comedy","is-cosmichorror","is-fantasy","is-forbiddance","is-history","is-mystery","is-mythology","is-playwright","is-romance","is-vestiasscribe","is-wakefield"];

/* ==APPEND CLASSES ABOVE THIS LINE== */
})();
