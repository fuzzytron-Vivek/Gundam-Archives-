import { useCallback, useMemo, useState } from 'react';
import BootScreen from './components/BootScreen';
import Header from './components/Header';
import Hero from './components/Hero';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import GundamGrid from './components/GundamGrid';
import GundamDetail from './components/GundamDetail';
import StatusBar from './components/StatusBar';
import { CATEGORIES, GUNDAMS } from './data/gundams';
import { countByCategory, filterRoster } from './utils/roster';
import { useClock } from './hooks/useClock';

export default function App() {
  const [booted, setBooted] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [selectedId, setSelectedId] = useState(null);
  const clock = useClock();

  const visible = useMemo(() => filterRoster(GUNDAMS, query, category), [query, category]);
  const counts = useMemo(() => countByCategory(GUNDAMS, query), [query]);
  const selected = useMemo(
    () => GUNDAMS.find((g) => g.id === selectedId) ?? null,
    [selectedId],
  );

  // Previous / next follow whatever the roster currently shows.
  const { prevId, nextId } = useMemo(() => {
    const i = visible.findIndex((g) => g.id === selectedId);
    if (i === -1 || visible.length < 2) return { prevId: null, nextId: null };
    return {
      prevId: visible[(i - 1 + visible.length) % visible.length].id,
      nextId: visible[(i + 1) % visible.length].id,
    };
  }, [visible, selectedId]);

  const handleBootDone = useCallback(() => setBooted(true), []);
  const handleClose = useCallback(() => setSelectedId(null), []);
  const clearQuery = useCallback(() => setQuery(''), []);
  const resetFilter = useCallback(() => setCategory('ALL'), []);

  const categoryLabel = CATEGORIES.find((c) => c.id === category)?.label ?? 'ALL';

  return (
    <>
      <div className="crt" aria-hidden="true">
        <span className="crt__noise" />
        <span className="crt__scan" />
        <span className="crt__beam" />
      </div>

      {!booted && <BootScreen onDone={handleBootDone} />}

      <a className="skip-link" href="#roster">
        Skip to roster
      </a>

      <div className="app">
        <Header clock={clock} total={GUNDAMS.length} />

        <main id="main">
          <Hero total={GUNDAMS.length} />

          <section className="controls" aria-label="Search and filters">
            <SearchBar
              value={query}
              onChange={setQuery}
              resultCount={visible.length}
              total={GUNDAMS.length}
            />
            <FilterBar
              categories={CATEGORIES}
              active={category}
              counts={counts}
              onChange={setCategory}
            />
          </section>

          <section id="roster" className="roster" aria-labelledby="roster-heading">
            <div className="roster__head">
              <h2 id="roster-heading" className="roster__title">
                Roster
              </h2>
              <span className="roster__rule" aria-hidden="true" />
              <p className="label">{visible.length} records</p>
            </div>

            <GundamGrid
              gundams={visible}
              query={query}
              hasCategoryFilter={category !== 'ALL'}
              onSelect={setSelectedId}
              onClearQuery={clearQuery}
              onResetFilter={resetFilter}
            />
          </section>

          <p className="disclaimer label">
            Unofficial fan project. Mobile Suit Gundam: Iron-Blooded Orphans and all related
            names belong to their respective owners. Artwork is supplied locally by the user.
          </p>
        </main>

        <StatusBar shown={visible.length} total={GUNDAMS.length} categoryLabel={categoryLabel} />
      </div>

      {selected && (
        <GundamDetail
          gundam={selected}
          total={GUNDAMS.length}
          prevId={prevId}
          nextId={nextId}
          onNavigate={setSelectedId}
          onClose={handleClose}
        />
      )}
    </>
  );
}
