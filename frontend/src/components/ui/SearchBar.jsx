import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export default function SearchBar({ value, onChange, placeholder = "Rechercher..." }) {
  return (
    <label className="relative block w-full">
      <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full rounded-lg border border-slate-300 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:border-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-100"
        placeholder={placeholder}
      />
    </label>
  )
}
