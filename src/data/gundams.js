// ---------------------------------------------------------------------------
// ROSTER DATA LAYER
//
// Everything the UI shows about a unit lives here. Components never hardcode
// a unit. To add one, append an entry to RAW_ROSTER.
//
// Artwork: put cut-out images in /public/assets/gundams/ and set `image` to
// the file name. Missing files fall back to a placeholder in <GundamImage />.
//
// Data quality: this is a fan-compiled roster. Any field that has not been
// confirmed is left as null (or an empty array) and renders as UNRECORDED.
// Check entries against a reliable source before treating them as canon.
//
// `telemetry` values are UI presentation data (0-100), not canon measurements.
// ---------------------------------------------------------------------------

const ASSET_DIR = `${import.meta.env.BASE_URL}assets/gundams/`;

/** Resolve an artwork file name to its public URL. */
export const assetPath = (file) => `${ASSET_DIR}${file}`;

export const CATEGORY = {
  GUNDAM_FRAME: 'GUNDAM_FRAME',
  MOBILE_SUIT: 'MOBILE_SUIT',
  OTHER: 'OTHER',
};

export const CATEGORIES = [
  { id: 'ALL', label: 'ALL' },
  { id: CATEGORY.GUNDAM_FRAME, label: 'GUNDAM FRAMES' },
  { id: CATEGORY.MOBILE_SUIT, label: 'MOBILE SUITS' },
  { id: CATEGORY.OTHER, label: 'OTHER' },
];

export const STATUS = {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED',
  UNVERIFIED: 'UNVERIFIED',
};

export const TELEMETRY_FIELDS = [
  { key: 'frame', label: 'FRAME STATUS' },
  { key: 'mobility', label: 'MOBILITY' },
  { key: 'armament', label: 'ARMAMENT' },
  { key: 'armor', label: 'ARMOR' },
  { key: 'integrity', label: 'SYSTEM INTEGRITY' },
];

// Shared by every Gundam Frame entry.
const FRAME_COMMON = {
  category: CATEGORY.GUNDAM_FRAME,
  frame: 'Gundam Frame',
  specifications: {
    height: '~18 m',
    powerSource: 'Twin Ahab Reactors',
  },
};

const INCOMPLETE_NOTE =
  'Service record incomplete. Entry is waiting for field data and reference art.';

const RAW_ROSTER = [
  {
    ...FRAME_COMMON,
    id: 'gundam-barbatos',
    short: 'BARBATOS',
    name: 'Gundam Barbatos',
    designation: 'ASW-G-08',
    classification: 'Close-Combat Mobile Suit',
    pilot: 'Mikazuki Augus',
    affiliation: 'Tekkadan',
    image: 'barbatos.png',
    status: STATUS.ACTIVE,
    description:
      'A twin-reactor frame built around brutal close-range work. Heavy on torque, light on ceremony, and the unit most closely tied to Tekkadan’s front line.',
    specifications: {
      height: '18.0 m',
      weight: '28.5 t',
      powerSource: 'Twin Ahab Reactors',
      armor: 'Layered alloy plating over a Gundam Frame skeleton',
      equipment: [],
      weapons: ['Mace'],
    },
    telemetry: { frame: 100, mobility: 88, armament: 82, armor: 70, integrity: 96 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-gusion',
    short: 'GUSION',
    name: 'Gundam Gusion',
    designation: 'ASW-G-11',
    classification: 'Heavy Melee Mobile Suit',
    pilot: null,
    affiliation: null,
    image: 'gusion.png',
    status: STATUS.ARCHIVED,
    description:
      'A frame-type unit recognisable by its heavy blade work. Known for committing hard once it closes the distance.',
    specifications: {
      ...FRAME_COMMON.specifications,
      weapons: ['Battle axe'],
    },
    telemetry: { frame: 100, mobility: 74, armament: 84, armor: 86, integrity: 92 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-flauros',
    short: 'FLAUROS',
    name: 'Gundam Flauros',
    designation: 'ASW-G-64',
    classification: 'Fire-Support Mobile Suit',
    pilot: null,
    affiliation: null,
    image: 'flauros.png',
    status: STATUS.ARCHIVED,
    description:
      'A frame configured for long-range fire support, trading some agility for reach and sustained output.',
    specifications: {
      ...FRAME_COMMON.specifications,
      weapons: ['Long-range cannon armament'],
    },
    telemetry: { frame: 100, mobility: 62, armament: 96, armor: 72, integrity: 90 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-kimaris',
    short: 'KIMARIS',
    name: 'Gundam Kimaris',
    designation: 'ASW-G-66',
    classification: 'Frame-Type Mobile Suit',
    pilot: null,
    affiliation: null,
    image: 'kimaris.png',
    status: STATUS.UNVERIFIED,
    description: INCOMPLETE_NOTE,
    telemetry: { frame: 100, mobility: 80, armament: 78, armor: 76, integrity: 88 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-vidar',
    short: 'VIDAR',
    name: 'Gundam Vidar',
    designation: 'ASW-G-XX',
    classification: 'Frame-Type Mobile Suit',
    pilot: 'Gaelio Bauduin',
    affiliation: 'Gjallarhorn',
    image: 'vidar.png',
    status: STATUS.ARCHIVED,
    description:
      'A Gjallarhorn-aligned frame. Service record is partial; see the specification block for what is confirmed.',
    telemetry: { frame: 100, mobility: 84, armament: 80, armor: 78, integrity: 90 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-vual',
    short: 'VUAL',
    name: 'Gundam Vual',
    designation: 'ASW-G-29',
    classification: 'Frame-Type Mobile Suit',
    pilot: null,
    affiliation: null,
    image: 'vual.png',
    status: STATUS.UNVERIFIED,
    description: INCOMPLETE_NOTE,
    telemetry: { frame: 100, mobility: 78, armament: 76, armor: 74, integrity: 86 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-bael',
    short: 'BAEL',
    name: 'Gundam Bael',
    designation: 'ASW-G-01',
    classification: 'Frame-Type Mobile Suit',
    pilot: null,
    affiliation: null,
    image: 'bael.png',
    status: STATUS.UNVERIFIED,
    description: INCOMPLETE_NOTE,
    telemetry: { frame: 100, mobility: 76, armament: 74, armor: 80, integrity: 84 },
  },
  {
    ...FRAME_COMMON,
    id: 'gundam-dantalion',
    short: 'DANTALION',
    name: 'Gundam Dantalion',
    designation: 'ASW-G-47',
    classification: 'Frame-Type Mobile Suit',
    pilot: null,
    affiliation: null,
    image: 'dantalion.png',
    status: STATUS.UNVERIFIED,
    description: INCOMPLETE_NOTE,
    telemetry: { frame: 100, mobility: 72, armament: 82, armor: 78, integrity: 86 },
  },
  {
    id: 'graze',
    short: 'GRAZE',
    name: 'Graze',
    designation: 'EB-06',
    category: CATEGORY.MOBILE_SUIT,
    classification: 'Mass-Production Mobile Suit',
    frame: 'Standard frame',
    pilot: null,
    affiliation: 'Gjallarhorn',
    image: 'graze.png',
    status: STATUS.ACTIVE,
    description:
      'The standard-issue Gjallarhorn mobile suit. Dependable, widely fielded, and the baseline the Gundam Frames are measured against.',
    specifications: {
      powerSource: 'Ahab Reactor',
    },
    telemetry: { frame: 80, mobility: 70, armament: 66, armor: 62, integrity: 80 },
  },
  {
    id: 'graze-ein',
    short: 'GRAZE EIN',
    name: 'Graze Ein',
    designation: 'EB-06 (CUSTOM)',
    category: CATEGORY.MOBILE_SUIT,
    classification: 'Custom Mobile Suit',
    frame: 'Standard frame',
    pilot: null,
    affiliation: null,
    image: 'graze-ein.png',
    status: STATUS.UNVERIFIED,
    description: 'A customised Graze variant. ' + INCOMPLETE_NOTE,
    telemetry: { frame: 82, mobility: 78, armament: 72, armor: 66, integrity: 82 },
  },
  {
    id: 'hyakuren',
    short: 'HYAKUREN',
    name: 'Hyakuren',
    designation: null,
    category: CATEGORY.MOBILE_SUIT,
    classification: 'Mass-Production Mobile Suit',
    frame: 'Standard frame',
    pilot: null,
    affiliation: 'Tekkadan',
    image: 'hyakuren.png',
    status: STATUS.ACTIVE,
    description:
      'A rugged production suit associated with Tekkadan. Built to be repaired in the field rather than admired.',
    telemetry: { frame: 78, mobility: 66, armament: 64, armor: 68, integrity: 78 },
  },
  {
    id: 'geirail',
    short: 'GEIRAIL',
    name: 'Geirail',
    designation: null,
    category: CATEGORY.MOBILE_SUIT,
    classification: 'Mass-Production Mobile Suit',
    frame: 'Standard frame',
    pilot: null,
    affiliation: 'Gjallarhorn',
    image: 'geirail.png',
    status: STATUS.UNVERIFIED,
    description: INCOMPLETE_NOTE,
    telemetry: { frame: 84, mobility: 74, armament: 70, armor: 70, integrity: 84 },
  },
  {
    id: 'hashmal',
    short: 'HASHMAL',
    name: 'Hashmal',
    designation: null,
    category: CATEGORY.OTHER,
    classification: 'Mobile Armor',
    frame: 'Not applicable',
    pilot: null,
    affiliation: null,
    image: 'hashmal.png',
    status: STATUS.ARCHIVED,
    description:
      'A mobile armor. Classified separately from frame-type suits; most fields remain unrecorded.',
    telemetry: { frame: 90, mobility: 58, armament: 94, armor: 88, integrity: 80 },
  },
  {
    id: 'isaribi',
    short: 'ISARIBI',
    name: 'Isaribi',
    designation: null,
    category: CATEGORY.OTHER,
    classification: 'Spaceship',
    frame: 'Not applicable',
    pilot: 'Orga Itsuka (commanding)',
    affiliation: 'Tekkadan',
    image: 'isaribi.png',
    status: STATUS.ACTIVE,
    description:
      'Tekkadan’s ship: carrier, barracks and home. Listed under Other because it hosts the suits rather than being one.',
    telemetry: { frame: 70, mobility: 44, armament: 52, armor: 66, integrity: 82 },
  },
  {
    id: 'mobile-worker',
    short: 'MOBILE WORKER',
    name: 'Mobile Worker',
    designation: null,
    category: CATEGORY.OTHER,
    classification: 'Utility Work Machine',
    frame: 'Not applicable',
    pilot: null,
    affiliation: null,
    image: 'mobile-worker.png',
    status: STATUS.ACTIVE,
    description:
      'A civilian-grade work machine. Not a combat unit, but it shows up wherever the work needs doing.',
    telemetry: { frame: 40, mobility: 52, armament: 8, armor: 30, integrity: 70 },
  },
];

/** Final roster: stable entry numbers, resolved image URLs, defaulted fields. */
export const GUNDAMS = RAW_ROSTER.map((entry, index) => ({
  ...entry,
  number: String(index + 1).padStart(2, '0'),
  imageUrl: assetPath(entry.image),
  specifications: {
    height: null,
    weight: null,
    powerSource: null,
    armor: null,
    equipment: [],
    weapons: [],
    ...entry.specifications,
  },
}));

export const DATABASE_VERSION = 'DB v0.9.4-IBO';
