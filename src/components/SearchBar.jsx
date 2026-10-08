import { useEffect, useRef } from 'react';

const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

export default function SearchBar({ value, onChange, resultCount, total }) {
  const inputRef = useRef(null);

  // "/" jumps to the search field, like most terminal-style tools.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      if (TYPING_TAGS.has(document.activeElement?.tagName)) return;
      if (document.documentElement.classList.contains('has-dossier')) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && value) {
      e.preventDefault();
      onChange('');
    }
  };

  return (
    <div className="search" role="search">
      <label className="search__prompt label" htmlFor="roster-search">
        Query
      </label>
      <input
        ref={inputRef}
        id="roster-search"
        className="search__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Name, designation, pilot, frame..."
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
      />
      {value ? (
        <button type="button" className="search__clear" onClick={() => onChange('')}>
          Clear
        </button>
      ) : (
        <kbd className="search__hint" aria-hidden="true">
          /
        </kbd>
      )}
      <span className="search__count label" aria-live="polite">
        {resultCount} / {total} entries
      </span>
    </div>
  );
}
