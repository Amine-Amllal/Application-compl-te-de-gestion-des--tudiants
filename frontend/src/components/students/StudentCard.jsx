import { Link } from "react-router-dom"
import { EyeIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline"

import Avatar from "../ui/Avatar"
import StatusBadge from "./StatusBadge"

export default function StudentCard({ student, onDelete }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Avatar student={student} />
        <div>
          <h3 className="font-semibold text-slate-900">
            {student.last_name} {student.first_name}
          </h3>
          <p className="text-sm text-slate-500">{student.email}</p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase text-slate-400">Filiere</p>
          <p className="text-sm font-medium text-slate-700">{student.filiere}</p>
        </div>
        <StatusBadge status={student.status} />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Link to={`/${student.id}`} className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50">
          <EyeIcon className="mr-2 h-4 w-4" /> Voir
        </Link>
        <Link to={`/${student.id}/edit`} className="inline-flex min-h-11 items-center rounded-lg border border-slate-200 px-3 text-sm text-slate-700 hover:bg-slate-50">
          <PencilSquareIcon className="mr-2 h-4 w-4" /> Modifier
        </Link>
        <button
          type="button"
          onClick={() => onDelete(student)}
          className="inline-flex min-h-11 items-center rounded-lg border border-rose-200 px-3 text-sm text-rose-600 hover:bg-rose-50"
        >
          <TrashIcon className="mr-2 h-4 w-4" /> Supprimer
        </button>
      </div>
    </article>
  )
}
