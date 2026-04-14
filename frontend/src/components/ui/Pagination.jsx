import Button from "./Button"

export default function Pagination({
  page,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) {
  if (!totalPages) {
    return null
  }

  const start = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, totalCount)

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <p className="text-sm text-slate-600">
        Affichage {start}-{end} sur {totalCount} etudiants
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="outline"
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
        >
          Precedent
        </Button>
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            className={`h-10 min-w-10 rounded-lg px-3 text-sm font-medium transition-all duration-200 ${
              pageNumber === page
                ? "bg-primary-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        <Button
          variant="outline"
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  )
}
