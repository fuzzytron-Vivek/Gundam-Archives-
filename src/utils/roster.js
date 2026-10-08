import { CATEGORIES } from '../data/gundams';

const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? '';

/** Lowercased text blob that search runs against. */
function buildHaystack(g) {
  const s = g.specifications;
  return [
    g.name,
    g.short,
    g.designation,
    g.pilot,
    g.frame,
    g.classification,
    g.affiliation,
    g.status,
    categoryLabel(g.category),
    s.height,
    s.powerSource,
    ...(s.weapons ?? []),
    ...(s.equipment ?? []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase();
}

const haystackCache = new WeakMap();
const haystackFor = (g) => {
  if (!haystackCache.has(g)) haystackCache.set(g, buildHaystack(g));
  return haystackCache.get(g);
};

/** Every whitespace-separated term must appear somewhere in the entry. */
export function matchesQuery(g, query) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const hay = haystackFor(g);
  return terms.every((t) => hay.includes(t));
}

export const matchesCategory = (g, category) =>
  category === 'ALL' || g.category === category;

export const filterRoster = (list, query, category) =>
  list.filter((g) => matchesCategory(g, category) && matchesQuery(g, query));

/** Per-category counts for the current query (drives the filter badges). */
export function countByCategory(list, query) {
  const matching = list.filter((g) => matchesQuery(g, query));
  return CATEGORIES.reduce((acc, c) => {
    acc[c.id] =
      c.id === 'ALL' ? matching.length : matching.filter((g) => g.category === c.id).length;
    return acc;
  }, {});
}

/** Decorative, deterministic coordinate readout for an entry number. */
export function coordsFor(number) {
  const n = Number(number);
  const x = String((n * 137) % 1000).padStart(3, '0');
  const y = String((n * 271 + 83) % 1000).padStart(3, '0');
  return `X${x} / Y${y}`;
}

export const displayValue = (v) => (v === null || v === undefined || v === '' ? null : v);
