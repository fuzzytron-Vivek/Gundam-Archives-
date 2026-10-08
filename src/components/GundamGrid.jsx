import GundamCard from './GundamCard';

function EmptyState({ query, hasCategoryFilter, onClearQuery, onResetFilter }) {
  return (
    <div className="empty brackets" role="status">
      <p className="empty__code label">Error 404 // no matching record</p>
      <p className="empty__title">No signal</p>
      <p className="empty__text">
        {query ? (
          <>
            Nothing in the archive matches <q>{query}</q>
            {hasCategoryFilter ? ' under the current filter' : ''}.
          </>
        ) : (
          'This filter has no entries yet.'
        )}{' '}
        Try a shorter term, a designation such as ASW-G-08, or a pilot name.
      </p>
      <div className="empty__actions">
        {query && (
          <button type="button" className="btn" onClick={onClearQuery}>
            Clear query
          </button>
        )}
        {hasCategoryFilter && (
          <button type="button" className="btn" onClick={onResetFilter}>
            Show all categories
          </button>
        )}
      </div>
    </div>
  );
}

export default function GundamGrid({
  gundams,
  query,
  hasCategoryFilter,
  onSelect,
  onClearQuery,
  onResetFilter,
}) {
  if (gundams.length === 0) {
    return (
      <EmptyState
        query={query}
        hasCategoryFilter={hasCategoryFilter}
        onClearQuery={onClearQuery}
        onResetFilter={onResetFilter}
      />
    );
  }

  return (
    <ul className="grid" aria-label="Mobile suit roster">
      {gundams.map((g, i) => (
        <GundamCard key={g.id} gundam={g} index={i} onSelect={onSelect} />
      ))}
    </ul>
  );
}
