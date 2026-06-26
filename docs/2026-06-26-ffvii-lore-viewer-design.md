# FFVII Compilation Lore Viewer — Design Spec

**Date:** 2026-06-26
**Status:** Approved
**Delivery:** Single self-contained Claude Artifact (inline HTML/CSS/JS, no external assets)

## Purpose

An interactive, beautiful lore viewer for the *Final Fantasy VII* Compilation that
(1) displays the world richly, (2) lines up the story chronologically, and
(3) shows how the characters relate to one another.

## Scope

Full Compilation coverage on the main throughline, representative on deep-cut side
material:

- **Original FFVII** (1997)
- **Crisis Core** (Zack, Genesis, Angeal, Nibelheim)
- **Before Crisis** (the Turks)
- **Advent Children** (post-Meteorfall, Geostigma, Kadaj)
- **Dirge of Cerberus** (Vincent, Deepground)
- **Remake / Rebirth** and publicly-known elements of the third part

Target content: ~20–25 characters, a solid cross-entry event set, core world concepts.
Data-driven arrays make later expansion trivial.

## Constraints

- Claude Artifact CSP: **no external images, fonts, scripts, or network calls.**
  All assets inline. Character "art" = stylized SVG/CSS avatars (faction-colored
  sigil + initials/silhouette), not screenshots.
- Vanilla JS only — no libraries.

## Aesthetic

Dark "Mako" theme: deep charcoal/black backgrounds, glowing teal-green accents
(Lifestream/Mako), crackling magenta for Sephiroth/Jenova threads. Crystalline
panels with subtle glow. Cinematic serif headers, clean sans body.

## Architecture

Single page, three views switched via a persistent top nav bar. A global spoiler
toggle lives in the nav. All views render from shared embedded data arrays.

### View 1 — Timeline
- Vertical central spine; events alternate left/right.
- Chronological: Cetra (~5000 yrs ago) → Shinra's rise → Nibelheim → FFVII /
  Meteorfall → Advent Children → Dirge of Cerberus, with Crisis Core /
  Before Crisis / Remake-Rebirth woven in.
- Event cards color-coded by source entry, with era markers and short blurbs.
- Click a card → expands detail; character names link into the Relationship Web.

### View 2 — Relationship Web (centerpiece)
- Interactive SVG node graph. Nodes = characters, colored by faction.
- Edges typed and styled: ♥ love · ⚔ rivalry/nemesis · → mentor · — ally/friend ·
  ⛓ family.
- Click a node → its edges light up, others dim; a slide-in panel shows avatar,
  bio, affiliations, and a clickable relationship list to navigate the graph.
- Light hand-rolled force-directed layout; nodes draggable.

### View 3 — Compendium
- Short illustrated entries for core world concepts/factions: Lifestream, Mako,
  Jenova, the Cetra, SOLDIER, Shinra Inc., the WEAPONs, Materia, Black/White Materia.

## Spoiler System

- Global "Reveal spoilers" toggle in the nav, **default OFF**.
- Spoiler-flagged content (Cloud's true identity, Aerith's fate, Sephiroth's
  origin, etc.) renders blurred/redacted until toggled.
- Applies across all three views. Session-scoped (no persistence required).

## Data Model (embedded JS)

- `factions[]` — `{ id, name, color }`
- `characters[]` — `{ id, name, faction, role, bio, spoilerBio?, affiliations[] }`
- `relationships[]` — `{ from, to, type, label?, spoiler? }`
- `events[]` — `{ order, era, year, title, entry, blurb, detail?, characters[], spoiler? }`
- `compendium[]` — `{ id, title, body, spoiler? }`

Everything is driven from these arrays so content is easy to extend or correct.

## Out of Scope

- Exhaustive coverage of every minor character/event.
- Persistence, accounts, or backend.
- Audio/video assets.
