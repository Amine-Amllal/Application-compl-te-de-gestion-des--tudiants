const styles = {
  actif: "bg-emerald-50 text-emerald-700",
  suspendu: "bg-amber-50 text-amber-700",
  diplome: "bg-violet-50 text-violet-700",
}

const labels = {
  actif: "Actif",
  suspendu: "Suspendu",
  diplome: "Diplome",
}

export default function StatusBadge({ status }) {
  const color = styles[status] || "bg-slate-100 text-slate-700"
  const label = labels[status] || status

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${color}`}
    >
      <span className="h-2 w-2 rounded-full bg-current opacity-70" />
      {label}
    </span>
  )
}
