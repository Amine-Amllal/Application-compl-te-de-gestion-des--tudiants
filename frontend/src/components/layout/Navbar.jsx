import SearchBar from "../ui/SearchBar"

export default function Navbar({
  title,
  search,
  onSearchChange,
  totalCount,
  showSearch = false,
  showTotalCount = true,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">{title}</h1>
          <p className="text-sm text-slate-500">Suivi complet des inscriptions et statuts</p>
        </div>
        <div className="flex w-full items-center gap-3 md:w-auto">
          {showSearch ? (
            <div className="w-full md:w-80">
              <SearchBar
                value={search}
                onChange={onSearchChange}
                placeholder="Recherche globale..."
              />
            </div>
          ) : null}
          {showTotalCount ? (
            <span className="inline-flex min-h-11 items-center rounded-full bg-primary-50 px-4 text-sm font-semibold text-primary-700">
              {totalCount} etudiants
            </span>
          ) : null}
        </div>
      </div>
    </header>
  )
}
