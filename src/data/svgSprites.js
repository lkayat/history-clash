// Chibi unit SVG sprites, 64×80px viewBox.
// Two walk frames per unit: <id> and <id>_walk
// Colours follow faction palettes:
//   British Entente:   khaki #8B7355, accent #C8A96E
//   German Reich:      feldgrau #5C6B4A, accent #A3B899
//   Red Bolsheviks:    crimson #8B1A1A, accent #CC2936
//   White Guards:      ivory #E8E0D0, accent #C8B89A
//   Democratic Allies: navy #1A3A6B, accent #4A7AC8
//   Fascist Powers:    black #1A1A1A, accent #8B1A1A
//   Soviet 1941:       olive-red #6B1A1A, accent #CC2936
//   Wehrmacht 1940/41: panzer #3A4A2A, accent #6B8B5A
//   Allied 1944:       olive-drab #4A5A3A, accent #8B9B6B

const skin = '#F5CBA7';
const darkSkin = '#C8956C';
const eye = '#2C1810';

// Helper: compact SVG string
const svg = (content) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 80">${content}</svg>`;

// ─── BUILDING SPRITES ──────────────────────────────────────────────────────
// Buildings are placed, not walked, so one frame only

export const buildingSprites = {
  'field-artillery': svg(`
    <rect x="4" y="50" width="56" height="8" rx="2" fill="#5C4A2A"/>
    <rect x="10" y="42" width="44" height="10" rx="2" fill="#8B7355"/>
    <circle cx="12" cy="58" r="8" fill="#4A3A20"/>
    <circle cx="52" cy="58" r="8" fill="#4A3A20"/>
    <rect x="8" y="38" width="6" height="16" rx="1" fill="#6B5A3A"/>
    <rect x="26" y="28" width="40" height="6" rx="3" fill="#A0896B" transform="rotate(-8,26,31)"/>
    <rect x="20" y="34" width="20" height="8" rx="2" fill="#C8A96E"/>
  `),
  'howitzer': svg(`
    <rect x="4" y="52" width="56" height="8" rx="2" fill="#4A5A38"/>
    <circle cx="14" cy="60" r="8" fill="#3A4A2A"/>
    <circle cx="50" cy="60" r="8" fill="#3A4A2A"/>
    <rect x="18" y="40" width="28" height="14" rx="2" fill="#5C6B4A"/>
    <rect x="28" y="22" width="6" height="24" rx="3" fill="#A3B899" transform="rotate(20,31,34)"/>
    <rect x="16" y="36" width="8" height="6" rx="1" fill="#8B9B6B"/>
  `),
  'propaganda-van': svg(`
    <rect x="4" y="36" width="56" height="32" rx="4" fill="#8B1A1A"/>
    <rect x="10" y="40" width="18" height="12" rx="2" fill="#CC3333" opacity="0.7"/>
    <rect x="36" y="40" width="18" height="12" rx="2" fill="#CC3333" opacity="0.7"/>
    <rect x="14" y="54" width="36" height="4" rx="1" fill="#CC2936"/>
    <circle cx="16" cy="72" r="6" fill="#2C2C2C"/>
    <circle cx="48" cy="72" r="6" fill="#2C2C2C"/>
    <rect x="24" y="30" width="16" height="8" rx="1" fill="#CC2936"/>
    <rect x="30" y="22" width="4" height="10" fill="#CC2936"/>
  `),
  'white-artillery': svg(`
    <rect x="4" y="50" width="56" height="8" rx="2" fill="#A0947E"/>
    <circle cx="12" cy="58" r="8" fill="#8A7E68"/>
    <circle cx="52" cy="58" r="8" fill="#8A7E68"/>
    <rect x="10" y="42" width="44" height="10" rx="2" fill="#E8E0D0"/>
    <rect x="26" y="28" width="38" height="6" rx="3" fill="#C8B89A" transform="rotate(-5,26,31)"/>
  `),
  'maginot-bunker': svg(`
    <rect x="2" y="40" width="60" height="30" rx="4" fill="#606060"/>
    <rect x="8" y="30" width="48" height="14" rx="2" fill="#808080"/>
    <rect x="14" y="44" width="10" height="6" rx="1" fill="#2C2C2C"/>
    <rect x="40" y="44" width="10" height="6" rx="1" fill="#2C2C2C"/>
    <rect x="22" y="46" width="20" height="4" rx="1" fill="#1A1A1A"/>
    <rect x="0" y="68" width="64" height="8" rx="2" fill="#505050"/>
    <rect x="4" y="62" width="56" height="8" rx="0" fill="#686868"/>
  `),
  'monastery': svg(`
    <rect x="8" y="36" width="48" height="34" rx="2" fill="#D4C9B0"/>
    <rect x="4" y="32" width="56" height="6" rx="1" fill="#C0B49A"/>
    <rect x="24" y="10" width="16" height="28" rx="2" fill="#D4C9B0"/>
    <rect x="28" y="6" width="8" height="6" rx="1" fill="#C0B49A"/>
    <rect x="30" y="2" width="4" height="6" fill="#8B6B3A"/>
    <rect x="28" y="2" width="8" height="2" fill="#8B6B3A"/>
    <rect x="16" y="48" width="12" height="22" rx="1" fill="#A0947E"/>
    <rect x="36" y="48" width="12" height="22" rx="1" fill="#A0947E"/>
    <rect x="26" y="50" width="12" height="8" rx="1" fill="#8B6B3A"/>
  `),
  'french-75mm': svg(`
    <rect x="4" y="52" width="56" height="8" rx="2" fill="#5A6850"/>
    <circle cx="14" cy="60" r="7" fill="#4A5A3A"/>
    <circle cx="50" cy="60" r="7" fill="#4A5A3A"/>
    <rect x="12" y="44" width="40" height="10" rx="2" fill="#6B8060"/>
    <rect x="20" y="26" width="42" height="5" rx="2.5" fill="#8B9B6B" transform="rotate(-6,20,28)"/>
    <rect x="18" y="40" width="10" height="6" rx="1" fill="#7A9070"/>
  `),
  'atlantic-bunker': svg(`
    <rect x="0" y="38" width="64" height="32" rx="0" fill="#707070"/>
    <rect x="0" y="34" width="64" height="6" rx="0" fill="#888888"/>
    <rect x="4" y="20" width="56" height="16" rx="2" fill="#787878"/>
    <rect x="12" y="42" width="14" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="38" y="42" width="14" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="0" y="68" width="64" height="8" fill="#505050"/>
    <rect x="8" y="24" width="4" height="18" rx="1" fill="#606060"/>
    <rect x="52" y="24" width="4" height="18" rx="1" fill="#606060"/>
  `),
  'field-hospital': svg(`
    <rect x="6" y="28" width="52" height="44" rx="4" fill="#E8E8E8"/>
    <rect x="2" y="24" width="60" height="8" rx="2" fill="#CC3333"/>
    <rect x="26" y="10" width="12" height="28" fill="#CC3333"/>
    <rect x="18" y="18" width="28" height="12" fill="#CC3333"/>
    <rect x="14" y="44" width="16" height="20" rx="2" fill="#D0D0D0"/>
    <rect x="34" y="44" width="16" height="20" rx="2" fill="#D0D0D0"/>
  `),
};

// ─── UNIT SPRITES ──────────────────────────────────────────────────────────
// Pattern: head, helmet, body, weapon, legs. Walk variant shifts legs.

const makeUnit = ({
  helmetColor,
  helmetShape, // 'brodie' | 'pickelhaube' | 'budenovka' | 'flat' | 'peaked' | 'beret' | 'stahlhelm' | 'pilotka'
  bodyColor,
  legColor,
  weapon, // 'rifle' | 'pistol' | 'machinegun' | 'saber' | 'none'
  extra = '',
  walkExtra = '',
}) => {
  const helmetPaths = {
    brodie: `<ellipse cx="32" cy="18" rx="18" ry="7" fill="${helmetColor}"/><ellipse cx="32" cy="16" rx="12" ry="6" fill="${helmetColor}"/>`,
    pickelhaube: `<rect x="20" y="10" width="24" height="14" rx="2" fill="${helmetColor}"/><rect x="29" y="4" width="6" height="8" rx="2" fill="${helmetColor}"/>`,
    budenovka: `<polygon points="32,4 18,22 46,22" fill="${helmetColor}"/><rect x="18" y="20" width="28" height="4" rx="1" fill="${helmetColor}"/>`,
    flat: `<ellipse cx="32" cy="16" rx="16" ry="5" fill="${helmetColor}"/>`,
    peaked: `<rect x="18" y="12" width="28" height="10" rx="3" fill="${helmetColor}"/><rect x="14" y="20" width="12" height="3" rx="1" fill="${helmetColor}"/>`,
    beret: `<ellipse cx="32" cy="17" rx="15" ry="6" fill="${helmetColor}"/><circle cx="32" cy="14" r="4" fill="${helmetColor}" opacity="0.5"/>`,
    stahlhelm: `<ellipse cx="32" cy="17" rx="16" ry="8" fill="${helmetColor}"/><rect x="16" y="22" width="32" height="3" rx="1" fill="${helmetColor}"/>`,
    pilotka: `<rect x="22" y="12" width="20" height="8" rx="2" fill="${helmetColor}"/><polygon points="22,12 32,6 42,12" fill="${helmetColor}"/>`,
  };

  const weapons = {
    rifle: `<rect x="44" y="26" width="4" height="26" rx="2" fill="#5D4E37"/>`,
    rifleLeft: `<rect x="16" y="26" width="4" height="26" rx="2" fill="#5D4E37"/>`,
    pistol: `<rect x="46" y="36" width="8" height="5" rx="2" fill="#4A4A4A"/><rect x="50" y="32" width="4" height="6" rx="1" fill="#4A4A4A"/>`,
    machinegun: `<rect x="38" y="34" width="20" height="5" rx="2" fill="#5A5A5A"/><rect x="50" y="28" width="4" height="12" rx="1" fill="#4A4A4A"/>`,
    saber: `<rect x="44" y="28" width="3" height="22" rx="1" fill="#C8C8C8" transform="rotate(-10,45,39)"/>`,
    none: '',
  };

  const legs = (walk) =>
    walk
      ? `<rect x="20" y="58" width="11" height="16" rx="3" fill="${legColor}" transform="rotate(-12,25,58)"/>
         <rect x="33" y="58" width="11" height="16" rx="3" fill="${legColor}" transform="rotate(12,39,58)"/>`
      : `<rect x="20" y="58" width="11" height="16" rx="3" fill="${legColor}"/>
         <rect x="33" y="58" width="11" height="16" rx="3" fill="${legColor}"/>`;

  const base = (walk) => `
    ${helmetPaths[helmetShape] || helmetPaths.flat}
    <circle cx="32" cy="30" r="12" fill="${skin}"/>
    <circle cx="27" cy="29" r="2.5" fill="${eye}"/>
    <circle cx="37" cy="29" r="2.5" fill="${eye}"/>
    <path d="M27 35 Q32 38 37 35" stroke="${darkSkin}" stroke-width="1.5" fill="none"/>
    <rect x="18" y="40" width="28" height="20" rx="4" fill="${bodyColor}"/>
    ${weapons[weapon] || ''}
    ${extra}
    ${walk ? walkExtra : ''}
    ${legs(walk)}
  `;

  return {
    stand: svg(base(false)),
    walk: svg(base(true)),
  };
};

// ─── GENERATE ALL UNIT SPRITES ─────────────────────────────────────────────

const units = {
  // British Entente
  'tommy-soldier': makeUnit({ helmetColor: '#6B6B4A', helmetShape: 'brodie', bodyColor: '#8B7355', legColor: '#6B5B45', weapon: 'rifle' }),
  'field-medic': makeUnit({ helmetColor: '#8B7355', helmetShape: 'brodie', bodyColor: '#D0C8B8', legColor: '#8B7355', weapon: 'none', extra: `<circle cx="32" cy="50" r="5" fill="#CC2222"/>` }),
  'machine-gunner': makeUnit({ helmetColor: '#6B6B4A', helmetShape: 'brodie', bodyColor: '#8B7355', legColor: '#6B5B45', weapon: 'machinegun' }),
  'gas-mask-troops': makeUnit({ helmetColor: '#5A5A3A', helmetShape: 'brodie', bodyColor: '#7A6B4A', legColor: '#5A4B3A', weapon: 'rifle', extra: `<ellipse cx="32" cy="32" rx="10" ry="8" fill="#4A4A3A" opacity="0.7"/>` }),
  'rfc-biplane': svg(`
    <ellipse cx="32" cy="30" rx="28" ry="8" fill="#C8A96E"/>
    <ellipse cx="32" cy="50" rx="24" ry="6" fill="#C8A96E"/>
    <rect x="28" y="22" width="8" height="36" rx="2" fill="#A08050"/>
    <circle cx="20" cy="30" r="8" fill="#8B8060" opacity="0.8"/>
    <polygon points="32,8 36,20 28,20" fill="#A08050"/>
    <ellipse cx="32" cy="30" rx="4" ry="4" fill="${darkSkin}"/>
  `),
  'general-haig': makeUnit({ helmetColor: '#4A3A20', helmetShape: 'peaked', bodyColor: '#8B7355', legColor: '#6B5B45', weapon: 'saber', extra: `<rect x="22" y="44" width="20" height="4" rx="1" fill="#C8A96E"/>` }),
  'mark-i-tank': svg(`
    <rect x="2" y="30" width="60" height="32" rx="4" fill="#8B7355"/>
    <rect x="0" y="38" width="64" height="16" rx="2" fill="#7A6545"/>
    <rect x="16" y="20" width="32" height="16" rx="3" fill="#A08060"/>
    <rect x="28" y="14" width="16" height="8" rx="2" fill="#9A7A50"/>
    <rect x="36" y="10" width="20" height="5" rx="2.5" fill="#7A6545" transform="rotate(-8,46,12)"/>
    <rect x="0" y="60" width="64" height="10" rx="2" fill="#5A4A30"/>
    <circle cx="12" cy="65" r="5" fill="#4A3A20"/>
    <circle cx="32" cy="65" r="5" fill="#4A3A20"/>
    <circle cx="52" cy="65" r="5" fill="#4A3A20"/>
  `),

  // German Reich WWI
  'landser-infantry': makeUnit({ helmetColor: '#4A5C38', helmetShape: 'stahlhelm', bodyColor: '#5C6B4A', legColor: '#4A5A3A', weapon: 'rifle' }),
  'german-sniper': makeUnit({ helmetColor: '#4A5C38', helmetShape: 'stahlhelm', bodyColor: '#5C6B4A', legColor: '#4A5A3A', weapon: 'rifle', extra: `<rect x="38" y="26" width="18" height="3" rx="1" fill="#3A3A3A"/>` }),
  'stormtrooper': makeUnit({ helmetColor: '#3A4C2A', helmetShape: 'stahlhelm', bodyColor: '#4A5C38', legColor: '#3A4A2A', weapon: 'pistol', extra: `<rect x="20" y="44" width="12" height="4" rx="1" fill="#3A3A2A"/>` }),
  'gas-cloud': svg(`
    <circle cx="32" cy="40" r="28" fill="#8BC34A" opacity="0.6"/>
    <circle cx="20" cy="30" r="16" fill="#8BC34A" opacity="0.5"/>
    <circle cx="44" cy="30" r="18" fill="#A5D65A" opacity="0.4"/>
    <circle cx="32" cy="20" r="14" fill="#C5E87A" opacity="0.4"/>
    <text x="24" y="46" font-size="14" fill="#4A7A00" opacity="0.8">☁</text>
  `),
  'zeppelin': svg(`
    <ellipse cx="32" cy="26" rx="28" ry="12" fill="#8B8B8B"/>
    <ellipse cx="32" cy="26" rx="26" ry="10" fill="#A0A0A0"/>
    <rect x="18" y="36" width="28" height="10" rx="3" fill="#6B6B6B"/>
    <rect x="12" y="36" width="6" height="4" fill="#5A5A5A"/>
    <rect x="46" y="36" width="6" height="4" fill="#5A5A5A"/>
    <rect x="26" y="44" width="12" height="8" rx="2" fill="#5A5A5A"/>
    <rect x="28" y="20" width="4" height="8" fill="#6B6B6B"/>
    <polygon points="4,26 0,20 0,32" fill="#7A7A7A"/>
    <polygon points="60,26 64,20 64,32" fill="#7A7A7A"/>
  `),
  'kaiser-wilhelm': makeUnit({ helmetColor: '#2C2C2C', helmetShape: 'pickelhaube', bodyColor: '#2C3A5C', legColor: '#2C3A5C', weapon: 'saber', extra: `<rect x="20" y="44" width="24" height="4" rx="1" fill="#C8A020"/><rect x="22" y="42" width="8" height="2" fill="#C8A020"/>` }),
  'a7v-tank': svg(`
    <rect x="2" y="26" width="60" height="38" rx="3" fill="#5C6B4A"/>
    <rect x="0" y="36" width="64" height="20" rx="2" fill="#4A5A38"/>
    <rect x="14" y="14" width="36" height="16" rx="3" fill="#6B8060"/>
    <rect x="24" y="10" width="16" height="8" rx="2" fill="#5C6B4A"/>
    <rect x="28" y="6" width="20" height="4" rx="2" fill="#4A5A38" transform="rotate(-5,38,8)"/>
    <rect x="8" y="16" width="6" height="12" rx="1" fill="#6B8060"/>
    <rect x="50" y="16" width="6" height="12" rx="1" fill="#6B8060"/>
    <rect x="0" y="58" width="64" height="8" rx="2" fill="#3A4A2A"/>
    <circle cx="10" cy="63" r="4" fill="#2C3A20"/>
    <circle cx="32" cy="63" r="4" fill="#2C3A20"/>
    <circle cx="54" cy="63" r="4" fill="#2C3A20"/>
  `),

  // Red Bolsheviks
  'red-guard': makeUnit({ helmetColor: '#8B1A1A', helmetShape: 'budenovka', bodyColor: '#8B1A1A', legColor: '#5A2020', weapon: 'rifle', extra: `<polygon points="32,24 30,30 34,30" fill="#CC2936"/>` }),
  'commissar': makeUnit({ helmetColor: '#5A1010', helmetShape: 'peaked', bodyColor: '#8B1A1A', legColor: '#5A2020', weapon: 'pistol', extra: `<rect x="20" y="42" width="24" height="4" rx="1" fill="#CC2936"/>` }),
  'cheka-agent': makeUnit({ helmetColor: '#2C2C2C', helmetShape: 'flat', bodyColor: '#2C2C2C', legColor: '#1A1A1A', weapon: 'pistol' }),
  'armored-train': svg(`
    <rect x="0" y="32" width="64" height="36" rx="4" fill="#8B1A1A"/>
    <rect x="2" y="26" width="60" height="10" rx="2" fill="#CC2936"/>
    <rect x="8" y="16" width="22" height="14" rx="2" fill="#AA2020"/>
    <rect x="34" y="16" width="22" height="14" rx="2" fill="#AA2020"/>
    <rect x="14" y="38" width="10" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="40" y="38" width="10" height="8" rx="1" fill="#1A1A1A"/>
    <rect x="20" y="22" width="6" height="4" rx="1" fill="#CC4444"/>
    <circle cx="14" cy="68" r="6" fill="#2C2C2C"/>
    <circle cx="32" cy="68" r="6" fill="#2C2C2C"/>
    <circle cx="50" cy="68" r="6" fill="#2C2C2C"/>
    <rect x="28" y="10" width="8" height="10" rx="2" fill="#8B1A1A"/>
    <text x="6" y="50" font-size="8" fill="#CC2936">★</text>
  `),
  'red-cavalry': makeUnit({ helmetColor: '#8B1A1A', helmetShape: 'budenovka', bodyColor: '#8B1A1A', legColor: '#5A2020', weapon: 'saber', extra: `<ellipse cx="32" cy="68" rx="18" ry="10" fill="#5C3A20"/><circle cx="32" cy="62" r="8" fill="#7A5030"/>` }),
  'trotsky': makeUnit({ helmetColor: '#5A1010', helmetShape: 'peaked', bodyColor: '#3A3A6B', legColor: '#2A2A5A', weapon: 'none', extra: `<rect x="20" y="44" width="24" height="6" rx="2" fill="#CC2936"/><circle cx="32" cy="30" r="3" fill="#C8A060" opacity="0.5"/>` }),
  'lenin': makeUnit({ helmetColor: '#3A3A3A', helmetShape: 'flat', bodyColor: '#3A3A3A', legColor: '#2A2A2A', weapon: 'none', extra: `<rect x="24" y="42" width="16" height="4" rx="2" fill="#CC2936"/>` }),

  // White Guards
  'tsarist-officer': makeUnit({ helmetColor: '#D4C89A', helmetShape: 'peaked', bodyColor: '#D4C89A', legColor: '#B8A880', weapon: 'pistol', extra: `<rect x="20" y="44" width="24" height="4" rx="1" fill="#C8A020"/>` }),
  'cossack-rider': makeUnit({ helmetColor: '#2C2C2C', helmetShape: 'flat', bodyColor: '#E8E0D0', legColor: '#C8B89A', weapon: 'saber', extra: `<ellipse cx="32" cy="70" rx="18" ry="10" fill="#7A5030"/><circle cx="32" cy="64" r="8" fill="#9A6A40"/>` }),
  'white-biplane': svg(`
    <ellipse cx="32" cy="30" rx="28" ry="8" fill="#E8E0D0"/>
    <ellipse cx="32" cy="50" rx="24" ry="6" fill="#E8E0D0"/>
    <rect x="28" y="22" width="8" height="36" rx="2" fill="#C8B89A"/>
    <circle cx="20" cy="30" r="8" fill="#D0C0A0" opacity="0.8"/>
    <polygon points="32,8 36,20 28,20" fill="#C8B89A"/>
  `),
  'interventionist': makeUnit({ helmetColor: '#6B6B4A', helmetShape: 'brodie', bodyColor: '#8B7355', legColor: '#6B5B45', weapon: 'rifle', extra: `<rect x="24" y="40" width="16" height="3" rx="1" fill="#4A7AC8"/>` }),
  'kolchak': makeUnit({ helmetColor: '#1A1A3A', helmetShape: 'peaked', bodyColor: '#1A1A3A', legColor: '#1A1A2A', weapon: 'pistol', extra: `<rect x="20" y="44" width="24" height="4" rx="1" fill="#C8A020"/>` }),
  'tsar-nicholas': makeUnit({ helmetColor: '#3A3A5A', helmetShape: 'peaked', bodyColor: '#3A3A5A', legColor: '#2A2A4A', weapon: 'saber', extra: `<rect x="20" y="40" width="24" height="6" rx="2" fill="#C8A020"/><rect x="26" y="36" width="12" height="4" rx="1" fill="#C8A020"/>` }),

  // Democratic Allies (Interwar + WWII)
  'league-soldier': makeUnit({ helmetColor: '#1A3A6B', helmetShape: 'brodie', bodyColor: '#1A3A6B', legColor: '#1A2A5A', weapon: 'rifle' }),
  'churchill': makeUnit({ helmetColor: '#2C2C2C', helmetShape: 'flat', bodyColor: '#3C3C3C', legColor: '#2C2C2C', weapon: 'none', extra: `<rect x="22" y="42" width="20" height="4" rx="2" fill="#8B7355"/>` }),
  'treaty-scroll': svg(`
    <rect x="12" y="10" width="40" height="54" rx="4" fill="#F5E8C0"/>
    <rect x="12" y="10" width="40" height="6" rx="2" fill="#C8A060"/>
    <rect x="12" y="58" width="40" height="6" rx="2" fill="#C8A060"/>
    <rect x="16" y="20" width="32" height="3" rx="1" fill="#8B6B3A" opacity="0.6"/>
    <rect x="16" y="26" width="28" height="3" rx="1" fill="#8B6B3A" opacity="0.6"/>
    <rect x="16" y="32" width="30" height="3" rx="1" fill="#8B6B3A" opacity="0.6"/>
    <rect x="16" y="38" width="22" height="3" rx="1" fill="#8B6B3A" opacity="0.6"/>
    <circle cx="32" cy="52" r="6" fill="#C8A060" opacity="0.8"/>
  `),
  'french-poilu': makeUnit({ helmetColor: '#5A6B5A', helmetShape: 'brodie', bodyColor: '#6B7A6B', legColor: '#5A6B5A', weapon: 'rifle' }),
  'raf-fighter': svg(`
    <ellipse cx="32" cy="28" rx="26" ry="7" fill="#1A3A6B"/>
    <ellipse cx="32" cy="48" rx="20" ry="5" fill="#1A3A6B"/>
    <rect x="29" y="20" width="6" height="34" rx="2" fill="#1A2A5A"/>
    <circle cx="20" cy="28" r="7" fill="#C8A060" opacity="0.8"/>
    <polygon points="32,8 35,18 29,18" fill="#1A2A5A"/>
    <rect x="8" y="26" width="10" height="4" rx="2" fill="#C8C8C8"/>
  `),
  'diplomat': makeUnit({ helmetColor: '#3C3C3C', helmetShape: 'flat', bodyColor: '#2C2C2C', legColor: '#2C2C2C', weapon: 'none', extra: `<rect x="22" y="56" width="20" height="18" rx="2" fill="#8B7355"/>` }),
  'roosevelt': makeUnit({ helmetColor: '#2C2C2C', helmetShape: 'flat', bodyColor: '#2C2C4A', legColor: '#1A1A3A', weapon: 'none', extra: `<circle cx="32" cy="70" r="8" fill="#4A3A2A" opacity="0.5"/>` }),

  // Fascist Powers (Interwar + WWII)
  'blackshirt': makeUnit({ helmetColor: '#1A1A1A', helmetShape: 'flat', bodyColor: '#1A1A1A', legColor: '#1A1A1A', weapon: 'pistol' }),
  'ss-officer': makeUnit({ helmetColor: '#2C2C2C', helmetShape: 'peaked', bodyColor: '#1A1A1A', legColor: '#1A1A1A', weapon: 'pistol', extra: `<rect x="20" y="42" width="24" height="3" rx="1" fill="#C8C8C8"/>` }),
  'propaganda-poster': svg(`
    <rect x="8" y="4" width="48" height="64" rx="2" fill="#D42020"/>
    <rect x="12" y="8" width="40" height="56" rx="1" fill="#CC1010"/>
    <polygon points="32,12 22,36 42,36" fill="#FFD700"/>
    <rect x="28" y="36" width="8" height="24" fill="#FFD700"/>
    <rect x="14" y="52" width="36" height="6" rx="1" fill="#FFD700" opacity="0.8"/>
  `),
  'condor-plane': svg(`
    <ellipse cx="32" cy="28" rx="26" ry="7" fill="#1A1A1A"/>
    <ellipse cx="32" cy="48" rx="20" ry="5" fill="#1A1A1A"/>
    <rect x="29" y="20" width="6" height="34" rx="2" fill="#2C2C2C"/>
    <circle cx="20" cy="28" r="7" fill="#606060" opacity="0.8"/>
    <polygon points="32,8 35,18 29,18" fill="#2C2C2C"/>
    <text x="28" y="34" font-size="8" fill="#888888">✚</text>
  `),
  'panzer-i': svg(`
    <rect x="4" y="30" width="56" height="30" rx="3" fill="#5C6B4A"/>
    <rect x="2" y="38" width="60" height="16" rx="2" fill="#4A5A38"/>
    <rect x="18" y="20" width="28" height="14" rx="2" fill="#6B8060"/>
    <rect x="22" y="16" width="16" height="8" rx="2" fill="#5A6B50"/>
    <rect x="26" y="12" width="14" height="5" rx="2" fill="#4A5A38"/>
    <rect x="0" y="56" width="64" height="8" rx="2" fill="#3A4A2A"/>
    <circle cx="10" cy="61" r="4" fill="#2C3A20"/>
    <circle cx="32" cy="61" r="4" fill="#2C3A20"/>
    <circle cx="54" cy="61" r="4" fill="#2C3A20"/>
  `),
  'mussolini': makeUnit({ helmetColor: '#2C1A10', helmetShape: 'flat', bodyColor: '#3A2A1A', legColor: '#2A2010', weapon: 'saber', extra: `<rect x="20" y="42" width="24" height="4" rx="1" fill="#8B1A1A"/>` }),
  'dark-decree': svg(`
    <rect x="10" y="6" width="44" height="60" rx="4" fill="#1A1A1A"/>
    <rect x="14" y="10" width="36" height="52" rx="2" fill="#2C1A1A"/>
    <rect x="18" y="18" width="28" height="3" rx="1" fill="#CC2020" opacity="0.7"/>
    <rect x="18" y="24" width="22" height="3" rx="1" fill="#CC2020" opacity="0.7"/>
    <rect x="18" y="30" width="26" height="3" rx="1" fill="#CC2020" opacity="0.7"/>
    <polygon points="32,38 26,54 38,54" fill="#CC2020"/>
  `),
  'hitler': makeUnit({ helmetColor: '#3C3A3A', helmetShape: 'peaked', bodyColor: '#2C2C2C', legColor: '#1A1A1A', weapon: 'none', extra: `<rect x="26" y="36" width="12" height="5" rx="2" fill="#8B8B8B"/><rect x="20" y="42" width="24" height="4" rx="1" fill="#8B1A1A"/>` }),

  // WWII Wehrmacht
  'Wehrmacht-grenadier': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'stahlhelm', bodyColor: '#5A6B4A', legColor: '#4A5A38', weapon: 'rifle' }),
  'panzer-iii': svg(`
    <rect x="3" y="28" width="58" height="32" rx="3" fill="#5C6B4A"/>
    <rect x="0" y="36" width="64" height="16" rx="2" fill="#4A5A38"/>
    <rect x="16" y="18" width="32" height="14" rx="2" fill="#6B7A5A"/>
    <rect x="22" y="14" width="20" height="8" rx="2" fill="#5C6B4A"/>
    <rect x="26" y="10" width="22" height="5" rx="2.5" fill="#4A5A38" transform="rotate(-4,37,12)"/>
    <rect x="0" y="54" width="64" height="10" rx="2" fill="#3A4A2A"/>
    <circle cx="10" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="32" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="54" cy="60" r="5" fill="#2C3A20"/>
  `),
  'stuka': svg(`
    <ellipse cx="32" cy="24" rx="30" ry="9" fill="#3A4A2A"/>
    <ellipse cx="32" cy="48" rx="18" ry="5" fill="#3A4A2A"/>
    <rect x="28" y="14" width="8" height="38" rx="3" fill="#2C3A1A"/>
    <circle cx="14" cy="24" r="9" fill="#4A5A38" opacity="0.9"/>
    <polygon points="32,6 36,14 28,14" fill="#2C3A1A"/>
    <rect x="14" y="44" width="6" height="14" rx="2" fill="#3A4A2A"/>
    <rect x="44" y="44" width="6" height="14" rx="2" fill="#3A4A2A"/>
    <text x="26" y="34" font-size="7" fill="#6B8060">✚</text>
  `),
  'forest-arrow': svg(`
    <rect x="2" y="34" width="60" height="12" rx="4" fill="#3A4A2A"/>
    <polygon points="64,40 48,28 48,52" fill="#5C6B4A"/>
    <rect x="6" y="20" width="8" height="40" rx="2" fill="#2C4A1A" opacity="0.6"/>
    <rect x="18" y="14" width="8" height="52" rx="2" fill="#2C4A1A" opacity="0.5"/>
    <rect x="36" y="18" width="8" height="46" rx="2" fill="#2C4A1A" opacity="0.6"/>
    <rect x="48" y="22" width="8" height="38" rx="2" fill="#2C4A1A" opacity="0.5"/>
  `),
  'me-109': svg(`
    <ellipse cx="32" cy="26" rx="26" ry="7" fill="#3A4A2A"/>
    <ellipse cx="32" cy="46" rx="18" ry="5" fill="#3A4A2A"/>
    <rect x="29" y="18" width="6" height="34" rx="2" fill="#2C3A1A"/>
    <circle cx="14" cy="26" r="8" fill="#4A5A3A" opacity="0.8"/>
    <polygon points="32,6 35,16 29,16" fill="#2C3A1A"/>
    <text x="27" y="32" font-size="7" fill="#6B8060">✚</text>
  `),
  'rommel': makeUnit({ helmetColor: '#2C3A1A', helmetShape: 'peaked', bodyColor: '#3A4A2A', legColor: '#2C3A1A', weapon: 'pistol', extra: `<rect x="20" y="42" width="24" height="4" rx="1" fill="#6B8060"/>` }),
  'motorcycle-recon': svg(`
    <circle cx="16" cy="60" r="12" fill="#3A4A2A"/>
    <circle cx="16" cy="60" r="7" fill="#2C3A1A"/>
    <circle cx="48" cy="60" r="12" fill="#3A4A2A"/>
    <circle cx="48" cy="60" r="7" fill="#2C3A1A"/>
    <rect x="14" y="42" width="36" height="12" rx="4" fill="#4A5A38"/>
    <rect x="20" y="36" width="24" height="8" rx="3" fill="#5C6B4A"/>
    <circle cx="32" cy="32" r="8" fill="${skin}"/>
    <ellipse cx="32" cy="26" rx="10" ry="5" fill="#3A4A2A"/>
    <circle cx="29" cy="31" r="1.5" fill="${eye}"/>
    <circle cx="35" cy="31" r="1.5" fill="${eye}"/>
    <rect x="28" y="50" width="8" height="12" rx="2" fill="#4A5A38"/>
  `),
  'panzer-iv': svg(`
    <rect x="2" y="26" width="60" height="34" rx="3" fill="#5A6B4A"/>
    <rect x="0" y="36" width="64" height="16" rx="2" fill="#4A5A38"/>
    <rect x="14" y="16" width="36" height="14" rx="3" fill="#6B7A5A"/>
    <rect x="22" y="12" width="20" height="8" rx="2" fill="#5A6B4A"/>
    <rect x="24" y="8" width="26" height="5" rx="2.5" fill="#4A5A38" transform="rotate(-5,37,10)"/>
    <rect x="0" y="54" width="64" height="10" rx="2" fill="#3A4A2A"/>
    <circle cx="10" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="32" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="54" cy="60" r="5" fill="#2C3A20"/>
    <rect x="8" y="18" width="6" height="12" rx="1" fill="#5A6B4A"/>
    <rect x="50" y="18" width="6" height="12" rx="1" fill="#5A6B4A"/>
  `),
  'Wehrmacht-grenadier-1941': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'stahlhelm', bodyColor: '#5A6B4A', legColor: '#4A5A38', weapon: 'rifle' }),
  'panzer-iv-east': svg(`
    <rect x="2" y="26" width="60" height="34" rx="3" fill="#8B7355"/>
    <rect x="0" y="36" width="64" height="16" rx="2" fill="#7A6545"/>
    <rect x="14" y="16" width="36" height="14" rx="3" fill="#A08060"/>
    <rect x="22" y="12" width="20" height="8" rx="2" fill="#8B7355"/>
    <rect x="24" y="8" width="26" height="5" rx="2.5" fill="#7A6545" transform="rotate(-5,37,10)"/>
    <rect x="0" y="54" width="64" height="10" rx="2" fill="#6B5A3A"/>
    <circle cx="10" cy="60" r="5" fill="#5A4A2A"/>
    <circle cx="32" cy="60" r="5" fill="#5A4A2A"/>
    <circle cx="54" cy="60" r="5" fill="#5A4A2A"/>
  `),
  'lightning-arrow': svg(`
    <polygon points="28,4 20,36 30,36 22,76 44,26 32,26 42,4" fill="#FFD700"/>
    <polygon points="28,4 20,36 30,36 22,76 44,26 32,26 42,4" fill="#FFA000" opacity="0.5"/>
  `),
  'fw-190': svg(`
    <ellipse cx="32" cy="26" rx="26" ry="7" fill="#3A4A2A"/>
    <ellipse cx="32" cy="46" rx="18" ry="5" fill="#3A4A2A"/>
    <rect x="29" y="18" width="6" height="34" rx="2" fill="#2C3A1A"/>
    <circle cx="14" cy="26" r="8" fill="#4A5A3A" opacity="0.8"/>
    <polygon points="32,6 36,16 28,16" fill="#2C3A1A"/>
    <text x="27" y="32" font-size="7" fill="#6B8060">✚</text>
  `),
  'guderian': makeUnit({ helmetColor: '#2C3A1A', helmetShape: 'peaked', bodyColor: '#3A4A2A', legColor: '#2C3A1A', weapon: 'pistol', extra: `<rect x="20" y="44" width="24" height="4" rx="1" fill="#C8A020"/>` }),
  'tiger-i': svg(`
    <rect x="1" y="22" width="62" height="38" rx="3" fill="#8B7355"/>
    <rect x="0" y="34" width="64" height="18" rx="2" fill="#7A6545"/>
    <rect x="12" y="12" width="40" height="16" rx="3" fill="#A08060"/>
    <rect x="20" y="8" width="24" height="10" rx="2" fill="#8B7355"/>
    <rect x="22" y="4" width="30" height="6" rx="3" fill="#7A6545" transform="rotate(-6,37,7)"/>
    <rect x="0" y="54" width="64" height="10" rx="2" fill="#6B5A3A"/>
    <circle cx="8" cy="60" r="5" fill="#5A4A2A"/>
    <circle cx="24" cy="60" r="5" fill="#5A4A2A"/>
    <circle cx="40" cy="60" r="5" fill="#5A4A2A"/>
    <circle cx="56" cy="60" r="5" fill="#5A4A2A"/>
    <rect x="6" y="14" width="6" height="14" rx="1" fill="#8B7355"/>
    <rect x="52" y="14" width="6" height="14" rx="1" fill="#8B7355"/>
  `),
  'winter-soldier': makeUnit({ helmetColor: '#E8E8E8', helmetShape: 'stahlhelm', bodyColor: '#E8E8E8', legColor: '#C8C8C8', weapon: 'rifle' }),

  // Red Army 1941
  'soviet-rifleman': makeUnit({ helmetColor: '#5A6B4A', helmetShape: 'pilotka', bodyColor: '#6B7A5A', legColor: '#5A6B4A', weapon: 'rifle', extra: `<polygon points="32,16 30,20 34,20" fill="#CC2936"/>` }),
  't34': svg(`
    <rect x="1" y="24" width="62" height="36" rx="3" fill="#6B7A5A"/>
    <rect x="0" y="34" width="64" height="18" rx="2" fill="#5A6B4A"/>
    <rect x="12" y="14" width="40" height="16" rx="3" fill="#7A8B6A"/>
    <rect x="18" y="10" width="28" height="10" rx="2" fill="#6B7A5A"/>
    <rect x="20" y="6" width="30" height="6" rx="3" fill="#5A6B4A" transform="rotate(-6,35,9)"/>
    <rect x="0" y="54" width="64" height="10" rx="2" fill="#4A5A38"/>
    <circle cx="8" cy="60" r="5" fill="#3A4A28"/>
    <circle cx="24" cy="60" r="5" fill="#3A4A28"/>
    <circle cx="40" cy="60" r="5" fill="#3A4A28"/>
    <circle cx="56" cy="60" r="5" fill="#3A4A28"/>
    <text x="26" y="50" font-size="8" fill="#CC2936">★</text>
  `),
  'katyusha': svg(`
    <rect x="0" y="44" width="64" height="20" rx="2" fill="#5A6B4A"/>
    <rect x="8" y="36" width="48" height="10" rx="2" fill="#6B7A5A"/>
    <rect x="12" y="18" width="6" height="20" rx="1" fill="#8B9B6B" transform="rotate(-10,15,28)"/>
    <rect x="20" y="14" width="6" height="24" rx="1" fill="#8B9B6B" transform="rotate(-10,23,26)"/>
    <rect x="28" y="10" width="6" height="28" rx="1" fill="#8B9B6B" transform="rotate(-10,31,24)"/>
    <rect x="36" y="14" width="6" height="24" rx="1" fill="#8B9B6B" transform="rotate(-10,39,26)"/>
    <rect x="44" y="18" width="6" height="20" rx="1" fill="#8B9B6B" transform="rotate(-10,47,28)"/>
    <circle cx="12" cy="64" r="8" fill="#3A4A28"/>
    <circle cx="52" cy="64" r="8" fill="#3A4A28"/>
    <text x="26" y="58" font-size="8" fill="#CC2936">★</text>
  `),
  'penal-battalion': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'pilotka', bodyColor: '#5A5A5A', legColor: '#4A4A4A', weapon: 'rifle' }),
  'il2': svg(`
    <ellipse cx="32" cy="28" rx="28" ry="9" fill="#5A6B4A"/>
    <ellipse cx="32" cy="50" rx="20" ry="6" fill="#5A6B4A"/>
    <rect x="28" y="18" width="8" height="38" rx="3" fill="#4A5A38"/>
    <circle cx="16" cy="28" r="9" fill="#6B7A5A" opacity="0.9"/>
    <polygon points="32,6 36,16 28,16" fill="#4A5A38"/>
    <rect x="12" y="46" width="8" height="16" rx="2" fill="#5A6B4A"/>
    <rect x="44" y="46" width="8" height="16" rx="2" fill="#5A6B4A"/>
    <text x="26" y="40" font-size="8" fill="#CC2936">★</text>
  `),
  'zhukov': makeUnit({ helmetColor: '#2A3A1A', helmetShape: 'peaked', bodyColor: '#3A4A2A', legColor: '#2A3A1A', weapon: 'pistol', extra: `<rect x="20" y="40" width="24" height="6" rx="2" fill="#C8A020"/>` }),
  'stalin': makeUnit({ helmetColor: '#2A3A1A', helmetShape: 'peaked', bodyColor: '#3A3A3A', legColor: '#2A2A2A', weapon: 'none', extra: `<polygon points="32,16 30,20 34,20" fill="#CC2936"/>` }),
  'people-militia': makeUnit({ helmetColor: '#8B8B8B', helmetShape: 'flat', bodyColor: '#9B9B8B', legColor: '#7B7B7B', weapon: 'rifle' }),

  // Allied Forces 1944
  'gi-soldier': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'brodie', bodyColor: '#5A6B4A', legColor: '#4A5A38', weapon: 'rifle', extra: `<rect x="22" y="56" width="20" height="12" rx="2" fill="#5A6B4A" opacity="0.5"/>` }),
  'para-101st': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'brodie', bodyColor: '#5A6B4A', legColor: '#4A5A38', weapon: 'rifle', extra: `<rect x="20" y="38" width="24" height="22" rx="2" fill="#6B7A5A" opacity="0.4"/>` }),
  'sherman': svg(`
    <rect x="2" y="28" width="60" height="34" rx="3" fill="#5A6B4A"/>
    <rect x="0" y="38" width="64" height="16" rx="2" fill="#4A5A38"/>
    <rect x="14" y="18" width="36" height="14" rx="3" fill="#6B7A5A"/>
    <rect x="22" y="14" width="20" height="8" rx="2" fill="#5A6B4A"/>
    <rect x="24" y="10" width="24" height="5" rx="2.5" fill="#4A5A38" transform="rotate(-5,36,12)"/>
    <rect x="0" y="56" width="64" height="8" rx="2" fill="#3A4A2A"/>
    <circle cx="10" cy="61" r="5" fill="#2C3A20"/>
    <circle cx="32" cy="61" r="5" fill="#2C3A20"/>
    <circle cx="54" cy="61" r="5" fill="#2C3A20"/>
    <text x="26" y="52" font-size="7" fill="#C8C8C8">★</text>
  `),
  'p51': svg(`
    <ellipse cx="32" cy="26" rx="28" ry="7" fill="#4A5A38"/>
    <ellipse cx="32" cy="48" rx="20" ry="5" fill="#4A5A38"/>
    <rect x="29" y="18" width="6" height="34" rx="2" fill="#3A4A2A"/>
    <circle cx="14" cy="26" r="8" fill="#5A6B4A" opacity="0.8"/>
    <polygon points="32,6 36,16 28,16" fill="#3A4A2A"/>
    <text x="26" y="34" font-size="7" fill="#C8C8C8">★</text>
  `),
  'code-talker': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'brodie', bodyColor: '#5A6B4A', legColor: '#4A5A38', weapon: 'none', extra: `<rect x="20" y="54" width="24" height="14" rx="2" fill="#8B6B3A" opacity="0.7"/>` }),
  'b17': svg(`
    <ellipse cx="32" cy="24" rx="30" ry="9" fill="#6B7A5A"/>
    <ellipse cx="32" cy="20" rx="24" ry="6" fill="#7A8B6A"/>
    <ellipse cx="32" cy="50" rx="18" ry="5" fill="#6B7A5A"/>
    <rect x="28" y="14" width="8" height="40" rx="2" fill="#5A6B4A"/>
    <circle cx="12" cy="24" r="9" fill="#4A5A38" opacity="0.9"/>
    <circle cx="54" cy="24" r="7" fill="#4A5A38" opacity="0.9"/>
    <polygon points="32,4 36,14 28,14" fill="#5A6B4A"/>
    <rect x="12" y="48" width="6" height="18" rx="2" fill="#6B7A5A"/>
    <rect x="46" y="48" width="6" height="18" rx="2" fill="#6B7A5A"/>
    <text x="26" y="40" font-size="8" fill="#C8C8C8">★</text>
  `),
  'eisenhower': makeUnit({ helmetColor: '#2A3A2A', helmetShape: 'peaked', bodyColor: '#4A5A38', legColor: '#3A4A2A', weapon: 'none', extra: `<rect x="20" y="40" width="24" height="6" rx="2" fill="#C8A020"/>` }),
  'higgins-boat': svg(`
    <path d="M4,30 L60,30 L56,68 L8,68 Z" fill="#5A6B4A"/>
    <rect x="8" y="22" width="48" height="10" rx="2" fill="#4A5A38"/>
    <rect x="12" y="8" width="40" height="16" rx="3" fill="#6B7A5A"/>
    <rect x="16" y="40" width="10" height="14" rx="2" fill="#4A5A38"/>
    <rect x="26" y="40" width="12" height="14" rx="2" fill="#4A5A38"/>
    <rect x="40" y="40" width="10" height="14" rx="2" fill="#4A5A38"/>
    <rect x="18" y="12" width="4" height="10" fill="#5A6B4A"/>
    <rect x="42" y="12" width="4" height="10" fill="#5A6B4A"/>
  `),

  // Wehrmacht 1944
  'Wehrmacht-veteran': makeUnit({ helmetColor: '#4A5A38', helmetShape: 'stahlhelm', bodyColor: '#6B7A5A', legColor: '#5A6B4A', weapon: 'rifle' }),
  'tiger-ii': svg(`
    <rect x="0" y="20" width="64" height="42" rx="3" fill="#8B7355"/>
    <rect x="0" y="32" width="64" height="20" rx="2" fill="#7A6545"/>
    <rect x="10" y="10" width="44" height="16" rx="3" fill="#A08060"/>
    <rect x="18" y="6" width="28" height="10" rx="2" fill="#8B7355"/>
    <rect x="16" y="2" width="34" height="6" rx="3" fill="#7A6545" transform="rotate(-6,33,5)"/>
    <rect x="0" y="56" width="64" height="10" rx="2" fill="#6B5A3A"/>
    <circle cx="6" cy="62" r="5" fill="#5A4A2A"/>
    <circle cx="20" cy="62" r="5" fill="#5A4A2A"/>
    <circle cx="32" cy="62" r="5" fill="#5A4A2A"/>
    <circle cx="44" cy="62" r="5" fill="#5A4A2A"/>
    <circle cx="58" cy="62" r="5" fill="#5A4A2A"/>
    <rect x="4" y="12" width="6" height="16" rx="1" fill="#8B7355"/>
    <rect x="54" y="12" width="6" height="16" rx="1" fill="#8B7355"/>
  `),
  'v1-rocket': svg(`
    <ellipse cx="32" cy="16" rx="6" ry="14" fill="#8B8B8B"/>
    <ellipse cx="32" cy="10" rx="4" ry="6" fill="#CC2020"/>
    <polygon points="20,24 12,38 24,32" fill="#6B6B6B"/>
    <polygon points="44,24 52,38 40,32" fill="#6B6B6B"/>
    <rect x="26" y="28" width="12" height="44" rx="4" fill="#A0A0A0"/>
    <ellipse cx="32" cy="70" rx="6" ry="4" fill="#CC4040"/>
    <rect x="28" y="66" width="8" height="6" rx="2" fill="#FF4444" opacity="0.6"/>
  `),
  'panther': svg(`
    <rect x="1" y="22" width="62" height="38" rx="3" fill="#5C6B4A"/>
    <rect x="0" y="32" width="64" height="20" rx="2" fill="#4A5A38"/>
    <rect x="10" y="12" width="44" height="16" rx="3" fill="#6B7A5A"/>
    <rect x="18" y="8" width="28" height="10" rx="2" fill="#5C6B4A"/>
    <rect x="16" y="4" width="36" height="6" rx="3" fill="#4A5A38" transform="rotate(-7,34,7)"/>
    <rect x="0" y="54" width="64" height="10" rx="2" fill="#3A4A2A"/>
    <circle cx="8" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="22" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="36" cy="60" r="5" fill="#2C3A20"/>
    <circle cx="50" cy="60" r="5" fill="#2C3A20"/>
    <rect x="4" y="14" width="6" height="14" rx="1" fill="#5C6B4A"/>
    <rect x="54" y="14" width="6" height="14" rx="1" fill="#5C6B4A"/>
  `),
  'fallschirmjager': makeUnit({ helmetColor: '#5A6B4A', helmetShape: 'stahlhelm', bodyColor: '#6B7A5A', legColor: '#5A6B4A', weapon: 'rifle', extra: `<rect x="18" y="36" width="28" height="22" rx="3" fill="#7A8B6A" opacity="0.4"/>` }),
  'field-marshal-model': makeUnit({ helmetColor: '#2C3A1A', helmetShape: 'peaked', bodyColor: '#3A4A2A', legColor: '#2C3A1A', weapon: 'pistol', extra: `<rect x="20" y="40" width="24" height="6" rx="2" fill="#C8A020"/>` }),
  'goliath': svg(`
    <rect x="8" y="40" width="48" height="22" rx="4" fill="#5C6B4A"/>
    <rect x="4" y="44" width="56" height="14" rx="2" fill="#4A5A38"/>
    <rect x="14" y="30" width="36" height="16" rx="3" fill="#6B7A5A"/>
    <circle cx="14" cy="60" r="8" fill="#3A4A28"/>
    <circle cx="50" cy="60" r="8" fill="#3A4A28"/>
    <rect x="20" y="32" width="24" height="4" rx="2" fill="#8B6B3A"/>
    <rect x="24" y="24" width="16" height="8" rx="2" fill="#CC2020" opacity="0.6"/>
  `),

  // Special/spell indicators
  'little-ships': svg(`
    <path d="M8,50 Q20,38 32,40 Q44,38 56,50 L56,64 L8,64 Z" fill="#4A7AC8"/>
    <rect x="18" y="38" width="28" height="14" rx="3" fill="#8B7355"/>
    <rect x="28" y="28" width="8" height="12" fill="#8B7355"/>
    <path d="M28,28 L42,36 L28,40 Z" fill="#E8E0D0"/>
    <circle cx="12" cy="56" r="5" fill="#3A5A9A" opacity="0.7"/>
    <circle cx="52" cy="56" r="5" fill="#3A5A9A" opacity="0.7"/>
    <text x="24" y="60" font-size="10" fill="#E8E0D0">⚓</text>
  `),

  // French 1940
  'french-infantry-1940': makeUnit({ helmetColor: '#5A6B5A', helmetShape: 'brodie', bodyColor: '#6B7A6B', legColor: '#5A6B5A', weapon: 'rifle' }),
  'bef-soldier': makeUnit({ helmetColor: '#6B6B4A', helmetShape: 'brodie', bodyColor: '#8B7355', legColor: '#6B5B45', weapon: 'rifle' }),
  'char-b1': svg(`
    <rect x="2" y="24" width="60" height="36" rx="3" fill="#6B7A6B"/>
    <rect x="0" y="36" width="64" height="16" rx="2" fill="#5A6B5A"/>
    <rect x="14" y="14" width="36" height="16" rx="3" fill="#7A8B7A"/>
    <rect x="22" y="10" width="20" height="8" rx="2" fill="#6B7A6B"/>
    <rect x="10" y="18" width="28" height="5" rx="2.5" fill="#5A6B5A" transform="rotate(0,24,20)"/>
    <rect x="24" y="6" width="18" height="5" rx="2.5" fill="#5A6B5A" transform="rotate(-8,33,8)"/>
    <rect x="0" y="54" width="64" height="8" rx="2" fill="#4A5A4A"/>
    <circle cx="10" cy="59" r="4" fill="#3A4A3A"/>
    <circle cx="32" cy="59" r="4" fill="#3A4A3A"/>
    <circle cx="54" cy="59" r="4" fill="#3A4A3A"/>
  `),
  'de-gaulle': makeUnit({ helmetColor: '#2A3A2A', helmetShape: 'peaked', bodyColor: '#3A4A3A', legColor: '#2A3A2A', weapon: 'none', extra: `<rect x="20" y="42" width="24" height="4" rx="1" fill="#FFD700"/>` }),
  'resistance-fighter': makeUnit({ helmetColor: '#3C2C1A', helmetShape: 'beret', bodyColor: '#3C3C2C', legColor: '#2C2C1A', weapon: 'pistol' }),
  'french-75mm-building': svg(`
    <rect x="4" y="52" width="56" height="8" rx="2" fill="#5A6850"/>
    <circle cx="14" cy="60" r="7" fill="#4A5A3A"/>
    <circle cx="50" cy="60" r="7" fill="#4A5A3A"/>
    <rect x="12" y="44" width="40" height="10" rx="2" fill="#6B8060"/>
    <rect x="20" y="26" width="42" height="5" rx="2.5" fill="#8B9B6B" transform="rotate(-6,20,28)"/>
    <rect x="18" y="40" width="10" height="6" rx="1" fill="#7A9070"/>
  `),
};

// ─── FLATTEN INTO EXPORT MAP ───────────────────────────────────────────────

export const svgSprites = {};
export const svgWalkSprites = {};

for (const [id, value] of Object.entries(units)) {
  if (value && typeof value === 'object' && value.stand) {
    svgSprites[id] = value.stand;
    svgWalkSprites[id] = value.walk;
  } else if (typeof value === 'string') {
    // Single-frame (vehicles, buildings, spells)
    svgSprites[id] = value;
    svgWalkSprites[id] = value;
  }
}

// Add building sprites
for (const [id, value] of Object.entries(buildingSprites)) {
  svgSprites[id] = value;
  svgWalkSprites[id] = value;
}

// Pre-build sprite image cache (returns a Promise that resolves when all images loaded)
export async function buildSpriteCache(spriteMap = svgSprites) {
  const cache = new Map();
  const promises = Object.entries(spriteMap).map(([id, svgString]) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        cache.set(id, img);
        resolve();
      };
      img.onerror = () => {
        console.warn(`Failed to load sprite: ${id}`);
        resolve();
      };
      // Use base64 data URL to avoid blob URL issues on Safari
      try {
        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgString)));
      } catch {
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
      }
    });
  });
  await Promise.all(promises);
  return cache;
}
