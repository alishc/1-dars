// Jihozlar uchun SVG chizmalar (mahsulotda image: "img/..." berilmagan bo'lsa ishlatiladi)
// Klasslar: b — korpus, s — chiziq, d — to'q detal, a / as — bo'lim rangi, hot / cold — quvurlar

function fanGrille(cx, cy, r) {
  return `
    <circle class="w" cx="${cx}" cy="${cy}" r="${r}"/>
    <circle class="s" cx="${cx}" cy="${cy}" r="${r * 0.68}"/>
    <circle class="s" cx="${cx}" cy="${cy}" r="${r * 0.36}"/>
    <path class="s" d="M${cx - r} ${cy} H${cx + r} M${cx} ${cy - r} V${cy + r}"/>
    <circle class="d" cx="${cx}" cy="${cy}" r="${r * 0.12}"/>`;
}

function outdoorUnit(x, y, w, h) {
  const r = Math.min(h * 0.36, w * 0.3);
  const fx = x + w * 0.4;
  const gx = x + w * 0.78;
  let grille = "";
  for (let i = 1; i <= 6; i++) {
    const ly = y + (h * i) / 7;
    grille += `M${gx} ${ly} H${x + w - 8} `;
  }
  return `
    <rect class="b" x="${x}" y="${y}" width="${w}" height="${h}" rx="5"/>
    ${fanGrille(fx, y + h / 2, r)}
    <path class="s" d="${grille}"/>
    <rect class="d" x="${x + 8}" y="${y + h}" width="14" height="6"/>
    <rect class="d" x="${x + w - 22}" y="${y + h}" width="14" height="6"/>`;
}

const ILLUSTRATIONS = {
  split: `
    <rect class="b" x="20" y="38" width="200" height="58" rx="16"/>
    <path class="s" d="M36 54 H150"/>
    <rect class="d" x="36" y="80" width="168" height="7" rx="3.5"/>
    <circle class="a" cx="196" cy="58" r="4"/>
    <path class="as" d="M70 104 q8 10 0 20 q-8 10 0 20 M120 104 q8 10 0 20 q-8 10 0 20 M170 104 q8 10 0 20 q-8 10 0 20"/>`,

  multisplit: `
    <rect class="b" x="14" y="18" width="88" height="28" rx="9"/>
    <rect class="d" x="24" y="36" width="68" height="4" rx="2"/>
    <rect class="b" x="14" y="64" width="88" height="28" rx="9"/>
    <rect class="d" x="24" y="82" width="68" height="4" rx="2"/>
    <rect class="b" x="14" y="110" width="88" height="28" rx="9"/>
    <rect class="d" x="24" y="128" width="68" height="4" rx="2"/>
    <path class="as" d="M102 32 H116 V96 H124 M102 78 H124 M102 124 H116 V100 H124"/>
    ${outdoorUnit(124, 50, 104, 84)}`,

  vrf: `
    <ellipse class="w" cx="92" cy="24" rx="26" ry="7"/>
    <ellipse class="w" cx="148" cy="24" rx="26" ry="7"/>
    <rect class="b" x="56" y="26" width="128" height="118" rx="4"/>
    <path class="s" d="M66 44 H174 M66 56 H174 M66 68 H174 M66 80 H174 M66 92 H174 M66 104 H174 M66 116 H174"/>
    <rect class="a" x="56" y="126" width="128" height="8"/>
    <rect class="d" x="62" y="144" width="20" height="6"/>
    <rect class="d" x="158" y="144" width="20" height="6"/>`,

  chiller: `
    <ellipse class="w" cx="44" cy="46" rx="20" ry="6"/>
    <ellipse class="w" cx="92" cy="46" rx="20" ry="6"/>
    <ellipse class="w" cx="140" cy="46" rx="20" ry="6"/>
    <ellipse class="w" cx="188" cy="46" rx="20" ry="6"/>
    <rect class="b" x="14" y="50" width="212" height="80" rx="3"/>
    <path class="s" d="M14 50 L38 130 L62 50 L86 130 L110 50 L134 130 L158 50 L182 130"/>
    <rect class="w" x="190" y="62" width="28" height="56" rx="2"/>
    <rect class="a" x="196" y="70" width="16" height="10" rx="1"/>
    <rect class="d" x="10" y="130" width="220" height="7"/>
    <path class="as" d="M30 144 H50 M190 144 H210"/>`,

  ahu: `
    <rect class="d" x="4" y="62" width="10" height="48"/>
    <rect class="d" x="226" y="62" width="10" height="48"/>
    <rect class="b" x="14" y="40" width="212" height="92" rx="3"/>
    <path class="s" d="M67 40 V132 M120 40 V132 M173 40 V132"/>
    <path class="as" d="M26 60 L56 90 M26 76 L54 104 M30 96 L50 116"/>
    ${fanGrille(93, 86, 18)}
    <path class="as" d="M132 58 L162 66 L132 74 L162 82 L132 90 L162 98 L132 106 L162 114"/>
    <rect class="a" x="182" y="58" width="34" height="56" rx="3" opacity="0.25"/>
    <path class="as" d="M190 86 H208 M202 80 L208 86 L202 92"/>
    <rect class="d" x="60" y="80" width="3" height="12"/>
    <rect class="d" x="113" y="80" width="3" height="12"/>
    <rect class="d" x="166" y="80" width="3" height="12"/>
    <rect class="d" x="18" y="132" width="204" height="6"/>`,

  precision: `
    <rect class="b" x="68" y="12" width="104" height="134" rx="4"/>
    <path class="s" d="M120 12 V146"/>
    <rect class="d" x="80" y="24" width="30" height="20" rx="2"/>
    <rect class="a" x="84" y="28" width="22" height="12" rx="1"/>
    <path class="s" d="M78 70 H112 M78 80 H112 M78 90 H112 M78 100 H112 M78 110 H112 M78 120 H112 M78 130 H112
      M128 70 H162 M128 80 H162 M128 90 H162 M128 100 H162 M128 110 H162 M128 120 H162 M128 130 H162"/>
    <rect class="d" x="114" y="54" width="3" height="12"/>
    <rect class="d" x="123" y="54" width="3" height="12"/>
    <path class="as" d="M44 30 v100 M36 122 l8 8 l8 -8"/>`,

  heatpump: `
    ${outdoorUnit(20, 34, 160, 104)}
    <path class="hot" d="M180 92 H204 V150"/>
    <path class="cold" d="M180 110 H220 V150"/>
    <circle class="a" cx="160" cy="46" r="4"/>`,

  kotyol: `
    <rect class="b" x="74" y="12" width="92" height="116" rx="12"/>
    <path class="a" d="M120 40 C108 54 110 64 112 70 C104 66 104 58 106 54 C98 62 98 80 120 86 C142 80 140 62 132 56 C132 62 130 66 126 68 C130 58 126 48 120 40 Z"/>
    <rect class="d" x="88" y="96" width="64" height="20" rx="4"/>
    <rect class="a" x="94" y="100" width="22" height="12" rx="2"/>
    <circle class="w" cx="132" cy="106" r="5"/>
    <circle class="w" cx="144" cy="106" r="5"/>
    <path class="hot" d="M90 128 V152"/>
    <path class="s" d="M108 128 V152"/>
    <path class="cold" d="M132 128 V152"/>
    <path class="s" d="M150 128 V152"/>`,

  boiler: `
    <rect class="d" x="168" y="10" width="18" height="40"/>
    <rect class="b" x="58" y="44" width="160" height="72" rx="10"/>
    <ellipse class="w" cx="58" cy="80" rx="14" ry="36"/>
    <path class="s" d="M100 44 V116 M140 44 V116 M180 44 V116"/>
    <rect class="a" x="16" y="64" width="34" height="32" rx="4"/>
    <circle class="w" cx="33" cy="80" r="7"/>
    <rect class="d" x="40" y="116" width="190" height="8"/>
    <rect class="d" x="56" y="124" width="10" height="14"/>
    <rect class="d" x="204" y="124" width="10" height="14"/>`,

  recuperator: `
    <rect class="d" x="28" y="52" width="22" height="20"/>
    <rect class="d" x="28" y="92" width="22" height="20"/>
    <rect class="d" x="190" y="52" width="22" height="20"/>
    <rect class="d" x="190" y="92" width="22" height="20"/>
    <rect class="b" x="50" y="34" width="140" height="96" rx="6"/>
    <path class="a" d="M120 52 L150 82 L120 112 L90 82 Z" opacity="0.3"/>
    <path class="as" d="M120 52 L150 82 L120 112 L90 82 Z"/>
    <path class="hot" d="M60 62 H100 L140 102 H180"/>
    <path class="cold" d="M180 62 H140 L100 102 H60"/>`,

  fan: `
    <rect class="w" x="8" y="64" width="44" height="36"/>
    <rect class="w" x="188" y="64" width="44" height="36"/>
    <rect class="b" x="52" y="46" width="136" height="72" rx="14"/>
    <rect class="d" x="104" y="30" width="32" height="16" rx="2"/>
    <path class="s" d="M80 46 V118 M160 46 V118"/>
    ${fanGrille(120, 82, 24)}
    <path class="as" d="M14 140 H226 M214 132 L226 140 L214 148"/>`,

  roof: `
    <path class="b" d="M44 70 Q120 10 196 70 Z"/>
    <rect class="w" x="70" y="70" width="100" height="22"/>
    <path class="s" d="M80 76 V86 M94 76 V86 M108 76 V86 M122 76 V86 M136 76 V86 M150 76 V86 M160 76 V86"/>
    <rect class="b" x="60" y="92" width="120" height="40" rx="3"/>
    <rect class="d" x="30" y="132" width="180" height="8"/>
    <path class="as" d="M46 64 q-12 -14 -2 -30 M194 64 q12 -14 2 -30 M120 120 V100 M113 107 L120 100 L127 107"/>`
};

function productImage(p) {
  if (p.image) {
    return `<img src="${p.image}" alt="${p.name}" loading="lazy">`;
  }
  let key = p.cat;
  if (p.cat === "vent") {
    key = p.sub === "Rekuperator" ? "recuperator" : p.name.startsWith("Tom") ? "roof" : "fan";
  }
  return `<svg class="illus" viewBox="0 0 240 160" role="img" aria-label="${p.name}">${ILLUSTRATIONS[key]}</svg>`;
}
