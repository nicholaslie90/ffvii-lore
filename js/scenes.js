/* ============================================================
   EVENT ILLUSTRATIONS  (FFScene)
   FFScene(key) -> inner SVG markup for a 0 0 200 100 banner.
   Flat, atmospheric vector scenes — no gradient <defs> (so the
   same key can appear many times without id collisions).
   ============================================================ */

function FFScene(key) {
  const sky = (a, b) =>
    `<rect width="200" height="100" fill="${a}"/>` +
    `<rect width="200" height="60" fill="${b}" opacity="0.6"/>`;
  const stars = (n, c) => {
    let s = "";
    const xs = [12,28,47,63,80,96,112,131,148,166,182,193,38,72,121,158];
    const ys = [14,30,9,22,12,28,18,8,24,14,30,12,40,6,34,20];
    for (let i = 0; i < n; i++) s += `<circle cx="${xs[i%xs.length]}" cy="${ys[i%ys.length]}" r="${i%3?0.7:1.1}" fill="${c||'#cfe'}" opacity="0.5"/>`;
    return s;
  };
  const ground = (c, y) => `<path d="M0 ${y} L200 ${y} L200 100 L0 100 Z" fill="${c}"/>`;

  switch (key) {
    case "calamity":
      return sky("#0a0e1a", "#1a0e2a") + stars(10, "#9ad")
        + `<line x1="150" y1="-5" x2="78" y2="70" stroke="#c45bff" stroke-width="3" opacity="0.85"/>`
        + `<line x1="158" y1="-2" x2="84" y2="68" stroke="#ff9af0" stroke-width="1" opacity="0.7"/>`
        + `<circle cx="78" cy="72" r="9" fill="#e85bff"/><circle cx="78" cy="72" r="18" fill="#c45bff" opacity="0.3"/>`
        + ground("#0d1411", 80)
        + `<path d="M0 80 Q60 74 100 80 Q150 76 200 80 L200 100 L0 100 Z" fill="#101a16"/>`;

    case "cetra":
      return sky("#101626", "#23304a") + stars(9, "#ffe9b0")
        + ground("#1a2a22", 70)
        + `<path d="M0 92 Q70 70 130 80 Q170 86 200 74" stroke="#f0c861" stroke-width="2" fill="none" opacity="0.7"/>`
        + `<circle cx="150" cy="40" r="16" fill="#f0c861" opacity="0.18"/><circle cx="150" cy="40" r="7" fill="#f7e0a0" opacity="0.5"/>`
        + `<path d="M40 92 l4 -12 l4 12 Z" fill="#2a3a30"/><path d="M52 92 l5 -16 l5 16 Z" fill="#2a3a30"/>`;

    case "reactor":
      return sky("#0c1212", "#13201c")
        + ground("#0a0f0d", 64)
        + `<g fill="#16201d" stroke="#0a0f0d" stroke-width="1">`
        + `<rect x="20" y="40" width="22" height="50"/><rect x="50" y="28" width="28" height="62"/><rect x="120" y="34" width="26" height="56"/><rect x="156" y="46" width="20" height="44"/></g>`
        + `<circle cx="92" cy="60" r="16" fill="#45e6b0" opacity="0.18"/><circle cx="92" cy="60" r="7" fill="#45e6b0" opacity="0.6"/>`
        + `<rect x="86" y="44" width="12" height="46" fill="#1a2a26"/>`
        + `<line x1="0" y1="74" x2="200" y2="74" stroke="#45e6b0" stroke-width="0.6" opacity="0.4"/>`;

    case "war":
      return sky("#1a0e10", "#2a1418")
        + ground("#140c0e", 70)
        + `<path d="M150 30 l16 -16 l4 4 l-16 16 Z" fill="#cfd8d4"/>`
        + `<path d="M170 30 l-16 -16 l-4 4 l16 16 Z" fill="#cfd8d4"/>`
        + `<path d="M150 28 L168 90 M170 28 L152 90" stroke="#8a9a94" stroke-width="2"/>`
        + `<path d="M30 70 l16 -22 l16 22 Z M50 70 l20 -30 l20 30 Z" fill="#241418"/>`
        + `<path d="M64 40 h18 v4 h-18 Z M64 48 h14 v4 h-14 Z" fill="#e2576b" opacity="0.7"/>`;

    case "lab":
      return sky("#08120f", "#0c1a16")
        + ground("#0a1310", 72)
        + `<rect x="78" y="20" width="30" height="60" rx="15" fill="#0e2620" stroke="#1c4a3e" stroke-width="1.5"/>`
        + `<ellipse cx="93" cy="50" rx="13" ry="26" fill="#45e6b0" opacity="0.18"/>`
        + `<path d="M93 36 q-5 8 0 16 q5 -8 0 -16" fill="#7af0c4" opacity="0.6"/>`
        + `<g stroke="#5fd0ff" stroke-width="1.2" opacity="0.7" fill="none"><path d="M40 28 Q52 40 40 52 Q28 64 40 76"/><path d="M40 28 Q28 40 40 52 Q52 64 40 76"/></g>`
        + `<g stroke="#5fd0ff" stroke-width="1.2" opacity="0.5" fill="none"><path d="M160 28 Q172 40 160 52 Q148 64 160 76"/><path d="M160 28 Q148 40 160 52 Q172 64 160 76"/></g>`;

    case "station":
      return sky("#0c0f16", "#161c2a") + stars(6, "#9ab")
        + ground("#0a0d12", 74)
        + `<rect x="0" y="70" width="200" height="5" fill="#1a2230"/>`
        + `<rect x="150" y="34" width="4" height="40" fill="#222c3a"/><circle cx="152" cy="34" r="5" fill="#f0c861" opacity="0.5"/><circle cx="152" cy="34" r="11" fill="#f0c861" opacity="0.12"/>`
        + `<path d="M96 56 q4 -6 8 0 l2 18 h-12 Z" fill="#1c2430"/><circle cx="100" cy="52" r="4" fill="#2a3442"/>`;

    case "coffin":
      return `<rect width="200" height="100" fill="#0a0a0c"/>`
        + `<rect width="200" height="100" fill="#1a0c10" opacity="0.4"/>`
        + `<path d="M84 22 L116 22 L122 50 L116 86 L84 86 L78 50 Z" fill="#1c1418" stroke="#3a2228" stroke-width="1.5"/>`
        + `<path d="M96 30 L104 30 L107 50 L104 70 L96 70 L93 50 Z" fill="#2a1820"/>`
        + `<circle cx="100" cy="50" r="2.4" fill="#e23a3a" opacity="0.8"/><circle cx="100" cy="50" r="7" fill="#e23a3a" opacity="0.15"/>`;

    case "fire":
      return sky("#1a0a06", "#3a1408")
        + ground("#160a06", 66)
        + `<g fill="#1c100a" stroke="#0d0805" stroke-width="1"><path d="M24 66 l14 -20 l14 20 Z"/><rect x="30" y="56" width="16" height="14"/><path d="M120 66 l18 -26 l18 26 Z"/><rect x="128" y="54" width="20" height="16"/></g>`
        + flames(36, 56) + flames(138, 50) + flames(150, 58) + flames(80, 60)
        + `<ellipse cx="100" cy="20" rx="80" ry="16" fill="#2a1408" opacity="0.6"/>`;

    case "avalanche":
      return sky("#08120f", "#0c1a16")
        + ground("#0a1310", 70)
        + `<g fill="#16201d"><rect x="140" y="36" width="22" height="48"/><rect x="166" y="46" width="16" height="38"/></g>`
        + `<circle cx="151" cy="56" r="10" fill="#45e6b0" opacity="0.2"/>`
        + `<g transform="translate(60,52)"><circle r="20" fill="none" stroke="#45e6b0" stroke-width="2" opacity="0.7"/><path d="M-8 6 q8 -16 16 0 q-8 6 -16 0 Z M-9 4 l3 8 M9 4 l-3 8 M-4 -2 l1 12 M4 -2 l-1 12" fill="#45e6b0" stroke="#45e6b0" stroke-width="1.5" opacity="0.85"/></g>`;

    case "wing":
      return sky("#0e0f16", "#1a1424") + stars(7, "#bcd")
        + `<g transform="translate(70,52)"><path d="M0 0 Q40 -28 70 -4 Q44 0 54 22 Q34 8 40 32 Q22 16 24 38 Q8 22 0 0 Z" fill="#e8eef2" opacity="0.9"/></g>`
        + `<path d="M150 30 l-2 8 M158 44 l-3 7 M140 54 l-2 7" stroke="#e8eef2" stroke-width="1.5" stroke-linecap="round" opacity="0.6"/>`
        + ground("#0a0c12", 84);

    case "sword":
      return sky("#101622", "#1c2a3a") + stars(6, "#bcd")
        + ground("#0c120e", 72)
        + `<g transform="translate(100,16)"><rect x="-6" y="0" width="12" height="54" rx="2" fill="#b9c3c9"/><rect x="-6" y="0" width="4" height="54" fill="#dfe7ec"/><rect x="-3" y="6" width="6" height="42" fill="#0d1116" opacity="0.25"/><rect x="-14" y="52" width="28" height="5" rx="2" fill="#5a4632"/><rect x="-3" y="56" width="6" height="20" rx="2" fill="#3a2c1e"/></g>`
        + `<circle cx="100" cy="74" r="20" fill="#5aa6ff" opacity="0.12"/>`;

    case "flower":
      return `<rect width="200" height="100" fill="#0c1410"/>`
        + `<path d="M70 0 L130 0 L150 100 L50 100 Z" fill="#13201a" opacity="0.7"/>`
        + `<path d="M88 0 L112 0 L120 100 L80 100 Z" fill="#f7e9b0" opacity="0.12"/>`
        + `<g>` + flower(70,82,"#f0c861") + flower(92,86,"#ff9ac4") + flower(110,84,"#fff") + flower(128,88,"#f0c861") + flower(84,90,"#fff") + flower(118,92,"#ff9ac4") + `</g>`
        + `<circle cx="100" cy="30" r="4" fill="#fff" opacity="0.9"/><circle cx="100" cy="30" r="10" fill="#fff" opacity="0.18"/>`;

    case "whisper":
      return sky("#0a0f14", "#12202a")
        + `<g fill="none" stroke="#bfeede" stroke-width="2" opacity="0.5">`
        + `<path d="M30 80 Q50 30 70 60 Q86 84 104 50 Q120 22 140 58 Q156 86 176 48"/>`
        + `<path d="M20 60 Q44 90 64 52 Q82 22 100 64 Q118 92 138 50 Q156 24 180 64" opacity="0.6"/></g>`
        + `<g fill="#dffaf0" opacity="0.5"><circle cx="70" cy="60" r="2"/><circle cx="104" cy="50" r="2"/><circle cx="140" cy="58" r="2"/></g>`;

    case "plate":
      return sky("#0c0e12", "#16191f")
        + ground("#0a0d10", 86)
        + `<rect x="92" y="20" width="16" height="66" fill="#2a2e36"/>`
        + `<g transform="rotate(-6 100 30)"><rect x="6" y="14" width="188" height="20" fill="#3a3f48" stroke="#1c2026" stroke-width="1.5"/><rect x="6" y="30" width="188" height="6" fill="#23272e"/></g>`
        + `<path d="M40 86 l6 -10 l6 10 Z M120 86 l8 -12 l8 12 Z" fill="#15181d"/>`
        + `<line x1="60" y1="40" x2="58" y2="60" stroke="#f0a830" stroke-width="1" opacity="0.5"/><line x1="150" y1="42" x2="152" y2="62" stroke="#f0a830" stroke-width="1" opacity="0.5"/>`;

    case "masamune":
      return sky("#0a0a0e", "#16101a")
        + `<rect x="98" y="6" width="3" height="84" fill="#cfd8e0"/><rect x="98" y="6" width="1" height="84" fill="#ffffff"/>`
        + `<rect x="92" y="86" width="15" height="4" rx="1" fill="#2a2c34"/><rect x="97" y="88" width="5" height="10" fill="#1c1e24"/>`
        + `<circle cx="100" cy="50" r="22" fill="#c45bff" opacity="0.1"/>`
        + `<path d="M100 70 q-3 8 0 16 q3 -8 0 -16" fill="#9a1c2c" opacity="0.7"/>`;

    case "memory":
      return sky("#0c1016", "#181f2a")
        + `<g opacity="0.85">`
        + `<path d="M70 30 L120 24 L126 70 L92 80 L66 64 Z" fill="#16202c" stroke="#2a3a4a" stroke-width="1"/>`
        + `<path d="M92 28 L92 80 M70 52 L126 46" stroke="#0a0e12" stroke-width="2"/></g>`
        + `<path d="M88 40 q6 -8 12 0 q-2 22 0 30" stroke="#5fd0ff" stroke-width="1.5" fill="none" opacity="0.6"/>`
        + `<g fill="#5fd0ff" opacity="0.4"><circle cx="40" cy="40" r="1.6"/><circle cx="150" cy="60" r="1.6"/><circle cx="160" cy="32" r="1.2"/><circle cx="34" cy="68" r="1.2"/></g>`;

    case "lifestream":
      return sky("#0a1412", "#0e2620")
        + ground("#0c1a14", 60)
        + `<path d="M40 100 Q44 60 60 40 L150 40 Q166 60 170 100 Z" fill="#10231c"/>`
        + `<path d="M76 40 a34 14 0 0 1 68 0" fill="#16302a" stroke="#1c4a3e" stroke-width="1.5"/>`
        + `<g stroke="#45e6b0" stroke-width="2" fill="none" opacity="0.7"><path d="M64 100 Q70 70 60 44"/><path d="M100 100 Q96 64 102 40"/><path d="M138 100 Q132 70 142 44"/></g>`
        + `<g fill="#7af0c4" opacity="0.6"><circle cx="60" cy="60" r="1.6"/><circle cx="102" cy="56" r="1.6"/><circle cx="142" cy="62" r="1.6"/></g>`;

    case "blackmateria":
      return sky("#0c0a14", "#160e22")
        + ground("#0a0810", 74)
        + `<path d="M60 90 L80 50 L120 50 L140 90 Z" fill="#14101c"/><path d="M80 50 L120 50 L112 40 L88 40 Z" fill="#1c1628"/>`
        + `<circle cx="100" cy="44" r="11" fill="#1a0f24"/><circle cx="100" cy="44" r="11" fill="none" stroke="#c45bff" stroke-width="1.5"/>`
        + `<circle cx="100" cy="44" r="20" fill="#7a1cff" opacity="0.12"/>`
        + `<g stroke="#c45bff" stroke-width="1" opacity="0.5"><path d="M100 33 L100 23 M100 55 L100 64 M89 44 L80 44 M111 44 L120 44"/></g>`;

    case "weapon":
      return sky("#0e1216", "#1a2228")
        + ground("#0a0f12", 70)
        + `<path d="M40 70 Q38 40 56 36 Q60 24 72 32 Q88 28 92 44 Q104 48 100 64 L96 70 Z" fill="#1a2730" stroke="#0c1216" stroke-width="1"/>`
        + `<circle cx="66" cy="44" r="2.4" fill="#e2576b"/><circle cx="80" cy="42" r="2" fill="#e2576b"/>`
        + `<rect x="140" y="40" width="50" height="10" rx="3" fill="#23303a"/><circle cx="140" cy="45" r="7" fill="#5fd0ff" opacity="0.5"/>`
        + `<path d="M138 45 L70 50" stroke="#9af0ff" stroke-width="2" opacity="0.7"/>`;

    case "meteor":
      return sky("#160a0a", "#2a0e0e") + stars(8, "#fca")
        + `<circle cx="120" cy="34" r="26" fill="#3a0e08"/><circle cx="120" cy="34" r="26" fill="none" stroke="#e2576b" stroke-width="1.5"/>`
        + `<circle cx="120" cy="34" r="38" fill="#e2576b" opacity="0.12"/>`
        + `<g stroke="#ff7a5a" stroke-width="1" opacity="0.6"><path d="M108 22 l-10 -8 M132 24 l10 -8 M110 46 l-12 6"/></g>`
        + ground("#0c100c", 76)
        + `<g stroke="#45e6b0" stroke-width="2.5" fill="none" opacity="0.8"><path d="M60 100 Q66 60 88 44"/><path d="M150 100 Q144 60 122 46"/></g>`
        + `<rect x="86" y="62" width="8" height="22" fill="#16201c"/><rect x="104" y="58" width="8" height="26" fill="#16201c"/>`;

    case "stigma":
      return sky("#0c1014", "#161c20")
        + `<g stroke="#2a3a44" stroke-width="1.4" opacity="0.7">`
        + rain() + `</g>`
        + ground("#0a0f12", 78)
        + `<circle cx="100" cy="48" r="6" fill="#9a6bff" opacity="0.5"/><circle cx="100" cy="48" r="16" fill="#9a6bff" opacity="0.12"/>`
        + `<path d="M100 54 q-3 10 0 18 q3 -8 0 -18" fill="#1c1226" opacity="0.7"/>`;

    case "remnant":
      return sky("#0c0e14", "#161824") + stars(6, "#bcd")
        + ground("#0a0c10", 72)
        + figure(70, "#cfd6da") + figure(100, "#dfe4e8") + figure(130, "#cfd6da")
        + `<g fill="#43d977" opacity="0.7"><circle cx="66" cy="46" r="1.2"/><circle cx="74" cy="46" r="1.2"/><circle cx="96" cy="42" r="1.3"/><circle cx="104" cy="42" r="1.3"/><circle cx="126" cy="46" r="1.2"/><circle cx="134" cy="46" r="1.2"/></g>`;

    case "deepground":
      return `<rect width="200" height="100" fill="#0a0810"/>` + `<rect width="200" height="60" fill="#160e22" opacity="0.6"/>`
        + ground("#08060c", 70)
        + `<g stroke="#2a1e3a" stroke-width="3" opacity="0.7"><path d="M0 84 H200 M30 70 V100 M90 70 V100 M150 70 V100"/></g>`
        + `<g transform="translate(100,42)"><circle r="18" fill="none" stroke="#c45bff" stroke-width="2" opacity="0.8"/><path d="M-10 8 A12 12 0 1 1 10 8 L6 14 H10 M-6 14 H-10 L-10 8" fill="none" stroke="#c45bff" stroke-width="2" opacity="0.8"/></g>`
        + `<circle cx="100" cy="42" r="28" fill="#c45bff" opacity="0.1"/>`;

    default:
      return sky("#0c1110", "#13201c") + ground("#0a0f0d", 70)
        + `<circle cx="100" cy="46" r="10" fill="#45e6b0" opacity="0.3"/><circle cx="100" cy="46" r="20" fill="#45e6b0" opacity="0.1"/>`;
  }

  function flames(x, y) {
    return `<g transform="translate(${x},${y})">`
      + `<path d="M0 0 q-7 -10 0 -22 q3 8 4 4 q5 -8 2 -16 q10 12 4 28 q-2 8 -10 6 Z" fill="#f0782a" opacity="0.9"/>`
      + `<path d="M0 -2 q-4 -8 0 -16 q4 6 2 -2 q5 8 -2 18 Z" fill="#ffd24a" opacity="0.9"/></g>`;
  }
  function flower(x, y, c) {
    return `<g transform="translate(${x},${y})"><g fill="${c}">`
      + `<circle cx="0" cy="-3" r="2"/><circle cx="3" cy="0" r="2"/><circle cx="-3" cy="0" r="2"/><circle cx="0" cy="3" r="2"/></g>`
      + `<circle r="1.4" fill="#caa45a"/><line x1="0" y1="3" x2="0" y2="12" stroke="#2a4a32" stroke-width="1"/></g>`;
  }
  function rain() {
    let s = "";
    for (let i = 0; i < 18; i++) { const x = 6 + i * 11; s += `<line x1="${x}" y1="6" x2="${x-6}" y2="74"/>`; }
    return s;
  }
  function figure(x, c) {
    return `<g transform="translate(${x},0)">`
      + `<path d="M-7 72 Q-8 56 -3 50 L3 50 Q8 56 7 72 Z" fill="#14161c"/>`
      + `<path d="M-6 50 Q-7 36 0 30 Q7 36 6 50 Z" fill="${c}"/>`
      + `<ellipse cx="0" cy="40" rx="5" ry="6.5" fill="#e6dcd4"/></g>`;
  }
}
