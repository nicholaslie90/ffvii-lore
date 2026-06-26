/* ============================================================
   PARAMETRIC VECTOR PORTRAITS
   FFPortrait(p, uid) -> inner SVG markup for a 0..100 viewBox.
   p = character.portrait config:
     { skin, hair, style, eyes, glow?, slit?, clothes, acc[] }
   uid = unique string (avoids gradient/id collisions across many portraits)
   ============================================================ */

function FFPortrait(p, uid) {
  p = p || {};
  const skin = p.skin || "#ecc6a0";
  const hair = p.hair || "#2a2622";
  const eyes = p.eyes || "#4a3a2e";
  const clothes = p.clothes || "#1d2733";
  const style = p.style || "short";
  const glow = !!p.glow;
  const slit = !!p.slit;
  const acc = p.acc || [];
  const id = "p_" + (uid || "x");

  if (style === "alien") return alienFace(p, id);
  if (style === "beast") return beastFace(p, id);

  const skinShadow = shade(skin, -0.12);
  const hairShadow = shade(hair, -0.18);

  let s = "";

  // ---- background ----
  s += `<circle cx="50" cy="50" r="50" fill="#0c1110"/>`;
  s += `<circle cx="50" cy="58" r="52" fill="${shade(clothes,-0.55)}" opacity="0.5"/>`;
  s += `<ellipse cx="42" cy="30" rx="34" ry="26" fill="#ffffff" opacity="0.04"/>`;

  // ---- back hair (long lengths) ----
  const longish = (style === "long" || style === "braid" || style === "veiled");
  if (longish) {
    s += `<path d="M26 40 Q19 62 24 90 L37 90 Q32 60 34 42 Z" fill="${hairShadow}"/>`;
    s += `<path d="M74 40 Q81 62 76 90 L63 90 Q68 60 66 42 Z" fill="${hairShadow}"/>`;
  }
  if (acc.includes("wing")) s += wing(id);
  if (acc.includes("ponytail")) s += `<path d="M68 34 Q86 40 82 70 Q78 56 70 48 Z" fill="${hairShadow}"/>`;

  // ---- shoulders / clothing ----
  s += `<path d="M16 100 Q18 76 34 70 Q42 78 50 78 Q58 78 66 70 Q82 76 84 100 Z" fill="${clothes}"/>`;
  s += `<path d="M40 72 L60 72 L57 82 Q50 86 43 82 Z" fill="${skinShadow}"/>`; // neck

  // ---- head ----
  s += `<ellipse cx="50" cy="48" rx="19" ry="23" fill="${skin}"/>`;
  s += `<ellipse cx="31" cy="50" rx="3" ry="4.5" fill="${skin}"/>`;
  s += `<ellipse cx="69" cy="50" rx="3" ry="4.5" fill="${skin}"/>`;
  s += `<path d="M31 60 Q50 70 69 60 Q60 68 50 68 Q40 68 31 60 Z" fill="${skinShadow}" opacity="0.5"/>`;

  // ---- face features ----
  s += eyePair(eyes, glow, slit, id);
  s += `<path d="M48 50 Q47 56 50 57" stroke="${skinShadow}" stroke-width="1" fill="none" opacity="0.6"/>`; // nose
  s += `<path d="M44 62 Q50 65 56 62" stroke="${shade(skin,-0.35)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>`; // mouth

  // ---- hair (front) ----
  s += hairFront(style, hair, hairShadow);

  // ---- accessories (front) ----
  if (acc.includes("goggles"))  s += `<g><rect x="30" y="31" width="40" height="6" rx="3" fill="#3a3026"/><circle cx="40" cy="34" r="5" fill="#8fd6ff" opacity="0.8" stroke="#2a2018" stroke-width="1.5"/><circle cx="60" cy="34" r="5" fill="#8fd6ff" opacity="0.8" stroke="#2a2018" stroke-width="1.5"/></g>`;
  if (acc.includes("headband")) s += `<rect x="29" y="36" width="42" height="5" rx="2" fill="${headbandColor(p)}"/>`;
  if (acc.includes("glasses"))  s += `<g stroke="#2a2622" stroke-width="1.4" fill="none"><rect x="37" y="46" width="12" height="9" rx="2" fill="#cfe8ff" fill-opacity="0.25"/><rect x="51" y="46" width="12" height="9" rx="2" fill="#cfe8ff" fill-opacity="0.25"/><path d="M49 50 L51 50"/></g>`;
  if (acc.includes("shades"))   s += `<g><rect x="36" y="46" width="13" height="9" rx="3" fill="#0d0f12"/><rect x="51" y="46" width="13" height="9" rx="3" fill="#0d0f12"/><path d="M49 49 L51 49" stroke="#0d0f12" stroke-width="2"/><path d="M38 47 L46 47" stroke="#5a6b74" stroke-width="1" opacity="0.7"/></g>`;
  if (acc.includes("beard"))    s += `<path d="M33 56 Q34 74 50 78 Q66 74 67 56 Q60 66 50 66 Q40 66 33 56 Z" fill="${hair}"/>`;
  if (acc.includes("mustache")) s += `<path d="M40 60 Q50 64 60 60 Q55 63 50 63 Q45 63 40 60 Z" fill="${hair}"/>`;
  if (acc.includes("bow"))      s += `<g transform="translate(50,26)"><path d="M0 0 L-11 -5 L-11 6 Z" fill="${bowColor(p)}"/><path d="M0 0 L11 -5 L11 6 Z" fill="${bowColor(p)}"/><circle cx="0" cy="0" r="3.2" fill="${shade(bowColor(p),-0.2)}"/></g>`;
  if (acc.includes("scar"))     s += `<path d="M60 44 L64 54" stroke="${shade(skin,-0.4)}" stroke-width="1.3" stroke-linecap="round" opacity="0.8"/>`;

  return s;
}

/* ---- eyes ---- */
function eyePair(color, glow, slit, id) {
  return eye(42, 50, color, glow, slit, id + "a") + eye(58, 50, color, glow, slit, id + "b");
}
function eye(cx, cy, color, glow, slit, id) {
  let s = `<ellipse cx="${cx}" cy="${cy}" rx="4.4" ry="3.2" fill="#f3efe6"/>`;
  if (glow) s += `<circle cx="${cx}" cy="${cy}" r="4.6" fill="${color}" opacity="0.45"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="2.5" fill="${color}"/>`;
  if (slit) s += `<ellipse cx="${cx}" cy="${cy}" rx="0.9" ry="2.6" fill="#0c0c0c"/>`;
  else s += `<circle cx="${cx}" cy="${cy}" r="1.1" fill="#141414"/>`;
  if (glow) s += `<circle cx="${cx-0.8}" cy="${cy-0.8}" r="0.7" fill="#ffffff" opacity="0.9"/>`;
  // brow
  s += `<path d="M${cx-5} ${cy-5.5} Q${cx} ${cy-7} ${cx+5} ${cy-5.5}" stroke="#0000001a" stroke-width="1" fill="none"/>`;
  return s;
}

/* ---- front hair by style ---- */
function hairFront(style, c, cs) {
  switch (style) {
    case "spiky": case "messy":
      return `<path d="M28 47 L29 27 L36 39 L40 19 L46 35 L50 15 L55 34 L61 20 L67 38 L71 28 L73 47 Q62 38 50 38 Q38 38 28 47 Z" fill="${c}"/>`
        + `<path d="M30 44 L33 33 L38 42 Z" fill="${cs}" opacity="0.6"/>`;
    case "long":
      return `<path d="M27 47 Q25 20 50 18 Q75 20 73 47 Q64 37 53 41 Q50 30 47 41 Q36 37 27 47 Z" fill="${c}"/>`
        + `<path d="M27 47 Q26 34 33 30 L31 47 Z" fill="${cs}" opacity="0.5"/>`;
    case "braid":
      return `<path d="M28 46 Q26 21 50 19 Q74 21 72 46 Q62 36 50 38 Q38 36 28 46 Z" fill="${c}"/>`
        + `<path d="M50 78 Q47 88 50 98 Q53 88 50 78 Z" fill="${c}"/>`
        + `<circle cx="50" cy="84" r="2.4" fill="${cs}"/><circle cx="50" cy="90" r="2.2" fill="${c}"/>`;
    case "neat":
      return `<path d="M28 46 Q26 23 50 20 Q74 23 72 46 Q63 35 51 39 Q50 32 47 39 Q37 36 28 46 Z" fill="${c}"/>`;
    case "slick":
      return `<path d="M29 45 Q27 24 50 21 Q73 24 71 45 Q66 31 50 32 Q34 31 29 45 Z" fill="${c}"/>`
        + `<path d="M34 40 Q50 35 66 40" stroke="${cs}" stroke-width="1" fill="none" opacity="0.6"/>`;
    case "buzz":
      return `<path d="M31 41 Q31 28 50 27 Q69 28 69 41 Q60 35 50 35 Q40 35 31 41 Z" fill="${c}"/>`;
    case "veiled":
      return `<path d="M28 47 Q26 24 50 22 Q74 24 72 47 Q62 37 50 38 Q38 37 28 47 Z" fill="${c}"/>`;
    case "elder":
      return `<path d="M33 38 Q34 30 50 30 Q66 30 67 38 Q60 35 50 35 Q40 35 33 38 Z" fill="${c}" opacity="0.85"/>`
        + `<path d="M33 56 Q33 86 50 92 Q67 86 67 56 Q58 66 50 66 Q42 66 33 56 Z" fill="${c}"/>`;
    case "bald": default:
      return style === "short"
        ? `<path d="M30 45 Q29 26 50 24 Q71 26 70 45 Q60 36 50 37 Q40 36 30 45 Z" fill="${c}"/>`
        : "";
  }
}

/* ---- Sephiroth's single wing ---- */
function wing(id) {
  return `<g opacity="0.92" transform="translate(70,40)">`
    + `<path d="M0 6 Q26 -12 40 2 Q24 4 30 16 Q16 8 20 22 Q8 14 10 28 Q2 18 0 6 Z" fill="#15161b" stroke="#2a2c34" stroke-width="0.6"/>`
    + `<path d="M6 8 Q22 0 33 6" stroke="#3a3d47" stroke-width="0.5" fill="none"/>`
    + `</g>`;
}

/* ---- Jenova (alien) ---- */
function alienFace(p, id) {
  const skin = p.skin || "#c79be0";
  const eyeC = p.eyes || "#e85bff";
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#160a22"/>`;
  s += `<radialGradient id="${id}_g" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${shade(skin,0.15)}"/><stop offset="100%" stop-color="${shade(skin,-0.35)}"/></radialGradient>`;
  // cables/shoulders
  s += `<path d="M18 100 Q24 74 38 70 L62 70 Q76 74 82 100 Z" fill="#241338"/>`;
  for (let i = 0; i < 5; i++) {
    const x = 34 + i * 8;
    s += `<path d="M${x} 72 Q${x-3} 84 ${x+2} 100" stroke="#3a2150" stroke-width="2" fill="none" opacity="0.8"/>`;
  }
  // head — smooth, elongated
  s += `<path d="M50 18 Q72 22 70 52 Q66 74 50 76 Q34 74 30 52 Q28 22 50 18 Z" fill="url(#${id}_g)"/>`;
  // glowing visor / eye band
  s += `<path d="M34 46 Q50 40 66 46 Q50 52 34 46 Z" fill="${eyeC}" opacity="0.9"/>`;
  s += `<ellipse cx="50" cy="46" rx="18" ry="5" fill="${eyeC}" opacity="0.25"/>`;
  s += `<circle cx="42" cy="46" r="1.6" fill="#fff" opacity="0.9"/><circle cx="58" cy="46" r="1.6" fill="#fff" opacity="0.9"/>`;
  // brow ridge + seam
  s += `<path d="M36 38 Q50 33 64 38" stroke="${shade(skin,-0.4)}" stroke-width="1.2" fill="none"/>`;
  s += `<path d="M50 54 L50 68" stroke="${shade(skin,-0.4)}" stroke-width="1" opacity="0.6"/>`;
  return s;
}

/* ---- Red XIII (beast) ---- */
function beastFace(p, id) {
  const fur = p.skin || "#d7572a";
  const mane = p.hair || "#b33d1e";
  const eyeC = p.eyes || "#f0c040";
  const furD = shade(fur, -0.18);
  let s = "";
  s += `<circle cx="50" cy="50" r="50" fill="#1a0e08"/>`;
  // mane / back
  s += `<path d="M22 86 Q14 50 26 30 Q22 50 34 62 Z" fill="${mane}"/>`;
  s += `<path d="M78 86 Q86 50 74 30 Q78 50 66 62 Z" fill="${mane}"/>`;
  s += `<path d="M18 100 Q22 72 40 66 L60 66 Q78 72 82 100 Z" fill="${shade(mane,-0.3)}"/>`;
  // ears
  s += `<path d="M30 30 L26 12 L42 26 Z" fill="${fur}"/><path d="M30 28 L29 18 L37 25 Z" fill="${furD}"/>`;
  s += `<path d="M70 30 L74 12 L58 26 Z" fill="${fur}"/><path d="M70 28 L71 18 L63 25 Z" fill="${furD}"/>`;
  // head + muzzle
  s += `<path d="M50 22 Q70 24 70 48 Q70 62 58 66 Q54 74 50 74 Q46 74 42 66 Q30 62 30 48 Q30 24 50 22 Z" fill="${fur}"/>`;
  s += `<ellipse cx="50" cy="62" rx="12" ry="9" fill="${shade(fur,0.08)}"/>`;
  s += `<ellipse cx="50" cy="58" rx="3.2" ry="2.4" fill="#1c1008"/>`; // nose
  s += `<path d="M50 60 L50 66 M50 66 Q45 69 42 67 M50 66 Q55 69 58 67" stroke="#1c1008" stroke-width="1.2" fill="none"/>`; // muzzle lines
  // eye (right) glowing; left scarred
  s += `<circle cx="60" cy="46" r="4.6" fill="${eyeC}" opacity="0.45"/><circle cx="60" cy="46" r="2.6" fill="${eyeC}"/><circle cx="60" cy="46" r="0.9" fill="#1c1008"/>`;
  s += `<path d="M37 41 L43 51" stroke="#7a2a16" stroke-width="2" stroke-linecap="round"/>`;
  s += `<path d="M38 46 L42 46" stroke="#2a140a" stroke-width="1.4"/>`; // closed/scarred eye
  // headband feather + tattoo hint
  s += `<path d="M46 26 L50 14 L54 26 Z" fill="#e8d2a0"/><path d="M50 14 L50 26" stroke="#b09060" stroke-width="0.8"/>`;
  return s;
}

/* ---- color helpers ---- */
function shade(hex, amt) {
  let h = (hex || "#000000").replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  let r = parseInt(h.substring(0, 2), 16);
  let g = parseInt(h.substring(2, 4), 16);
  let b = parseInt(h.substring(4, 6), 16);
  const f = (v) => {
    if (amt >= 0) return Math.round(v + (255 - v) * amt);
    return Math.round(v * (1 + amt));
  };
  const to2 = (v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, "0");
  return "#" + to2(f(r)) + to2(f(g)) + to2(f(b));
}
function headbandColor(p) {
  if (p.eyes === "#e23a3a") return "#9a1c1c";        // Vincent red bandana
  if ((p.clothes || "").includes("2f6f54")) return "#1f4d3a"; // Yuffie
  return "#caa45a";
}
function bowColor(p) { return p.clothes === "#c23a4a" ? "#e85a86" : "#ff7aa8"; }

/* Convenience wrappers ---------------------------------------- */
// Standalone <svg> string (dossier, search results)
function portraitSVG(ch, size, extraClass) {
  const cfg = ch.portrait || {};
  return `<svg class="portrait ${extraClass || ""}" viewBox="0 0 100 100" width="${size}" height="${size}" `
    + `role="img" aria-label="${ch.name}">${FFPortrait(cfg, ch.id)}</svg>`;
}
