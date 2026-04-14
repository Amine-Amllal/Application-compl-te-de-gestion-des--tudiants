export default function LoadingSpinner({ fullPage = false, label = "Chargement..." }) {
  const wrapper = fullPage
    ? "flex min-h-[50vh] items-center justify-center"
    : "flex items-center justify-center"

  return (
    <div className={wrapper} role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary-100 border-t-primary-600" />
        <p className="text-sm text-slate-600">{label}</p>
      </div>
    </div>
  )
}
