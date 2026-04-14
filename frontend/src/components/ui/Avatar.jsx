import { useState } from "react"

function getInitials(firstName = "", lastName = "") {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "ET"
}

function hashToColor(value = "") {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue} 70% 88%)`
}

export default function Avatar({ student, size = "md" }) {
  const [imageError, setImageError] = useState(false)

  const dimensions = {
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-28 w-28 text-2xl",
  }

  if (student.photo_url && !imageError) {
    return (
      <img
        src={student.photo_url}
        alt={`${student.first_name} ${student.last_name}`}
        className={`${dimensions[size]} rounded-full object-cover`}
        onError={() => setImageError(true)}
      />
    )
  }

  const bg = hashToColor(`${student.first_name}${student.last_name}`)
  return (
    <div
      className={`${dimensions[size]} flex items-center justify-center rounded-full font-semibold text-slate-700`}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      {getInitials(student.first_name, student.last_name)}
    </div>
  )
}
