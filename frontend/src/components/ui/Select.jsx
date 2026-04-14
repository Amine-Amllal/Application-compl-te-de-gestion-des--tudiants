export default function Select({ label, error, children, className = "", ...props }) {
  return (
    <label className="block space-y-1">
      {label ? (
        <span className="text-sm font-medium text-slate-700">{label}</span>
      ) : null}
      <select
        className={`h-11 w-full rounded-lg border px-3 text-sm text-slate-900 shadow-sm transition-all duration-200 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100 ${
          error ? "border-rose-400" : "border-slate-300"
        } ${className}`}
        {...props}
      >
        {children}
      </select>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </label>
  )
}
