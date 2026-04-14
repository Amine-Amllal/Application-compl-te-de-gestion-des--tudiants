import { ArrowPathIcon } from "@heroicons/react/24/outline"

const variants = {
  primary:
    "bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-600",
  outline:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-400",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100 focus:ring-slate-400",
  danger:
    "border border-rose-300 bg-white text-rose-600 hover:bg-rose-50 focus:ring-rose-500",
}

const sizes = {
  sm: "h-10 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-base",
}

export default function Button({
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  loading = false,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  )
}
