# FFVII Compilation Lorebook

An interactive **fan-made** lorebook for the *Final Fantasy VII* Compilation —
the original game, Crisis Core, Before Crisis, Advent Children, Dirge of Cerberus,
and the Remake saga (Remake / Rebirth / the upcoming finale).

🌐 **Live:** https://nicholaslie90.github.io/ffvii-lore/

## ⚖️ Copyright

**All copyrights belong to Square Enix.** *Final Fantasy VII*, its story,
characters, music, artwork, and all related properties are © **SQUARE ENIX CO., LTD.**
and its respective owners.

This is a **non-commercial, fan-made website** created out of love for the series.
It is **not affiliated with, endorsed by, or sponsored by Square Enix** in any way.
No copyrighted assets are redistributed here:

- All **character portraits** and **event illustrations** are original vector
  graphics drawn in code — no official art or screenshots are used.
- The **background music** is original ambient audio synthesized live in the
  browser (Web Audio API) — **no Square Enix music is included or distributed.**

If you are a rights holder and have any concerns, please open an issue.

## Features

- **Timeline** — a chronological story spine from the Cetra (~2000 years ago) to
  the Geostigma aftermath. Every incident **expands** to reveal a deeper account
  and an original illustration, color-coded by source entry.
- **Relationships** — an interactive force-directed graph of ~44 characters drawn
  as **vector portraits**. Search by name, click a node to dim the rest, and open
  a **dossier** with the character's temperament, story role, expanded background
  (e.g. Cloud's identity crisis), a die-hard-fan "Did you know?", and clickable
  connections. Edge types: ♥ love · ⛓ family · ➜ mentor · ◆ ally · ⚔ enmity.
- **Compendium** — concept cards for the world's core forces: the Lifestream,
  Mako, Materia, Jenova, the Cetra, SOLDIER, Shinra, the WEAPONs, and more.
- **Spoiler toggle** — a "Classified / Declassified" switch (default off) seals the
  major twists behind Shinra-file redaction; declassifying also reveals hidden
  relationship ties, so the web visibly grows as you unlock it.
- **Ambient audio** — an optional, original procedural soundscape. Browsers block
  autoplay-with-sound, so it begins on your first interaction and can be muted at
  any time from the nav.

## Run it

It's a static site — no build step. Either open the live link above, or serve the
folder locally:

```bash
python3 -m http.server   # then visit http://localhost:8000
```

(Open via a local server rather than `file://` so the browser loads the JS modules.)

## Project structure

```
index.html          markup + script/style includes
css/styles.css       all styling
js/data.js           lore data: characters, relationships, events, compendium
js/portraits.js      parametric vector character portraits
js/scenes.js         vector illustrations for timeline incidents
js/audio.js          procedural ambient (Web Audio API)
js/app.js            timeline, graph, search, dossier, view + spoiler logic
docs/                design spec
```

Content is data-driven — add or correct characters, ties, and events by editing
`js/data.js`.
