import { Link } from "react-router-dom"
import { PencilSquareIcon, TrashIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

import Avatar from "../ui/Avatar"
import Button from "../ui/Button"
import StatusBadge from "./StatusBadge"

export default function StudentDetail({ student, onDeleteClick }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col items-center gap-4 border-b border-slate-100 pb-6 text-center sm:flex-row sm:items-start sm:text-left">
        <Avatar student={student} size="lg" />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-slate-900">
            {student.last_name} {student.first_name}
          </h1>
          <p className="mt-1 text-slate-600">{student.filiere}</p>
          <div className="mt-3">
            <StatusBadge status={student.status} />
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
        <Info label="Email" value={student.email} />
        <Info label="Telephone" value={student.phone || "-"} />
        <Info
          label="Date de naissance"
          value={student.date_naissance ? new Date(student.date_naissance).toLocaleDateString("fr-FR") : "-"}
        />
        <Info
          label="Date d'inscription"
          value={new Date(student.date_inscription).toLocaleString("fr-FR")}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link to={`/${student.id}/edit`}>
          <Button>
            <PencilSquareIcon className="h-4 w-4" />
            Modifier
          </Button>
        </Link>
        <Button variant="danger" onClick={onDeleteClick}>
          <TrashIcon className="h-4 w-4" />
          Supprimer
        </Button>
        <Link to="/">
          <Button variant="ghost">
            <ArrowLeftIcon className="h-4 w-4" />
            Retour
          </Button>
        </Link>
      </div>
    </section>
  )
}

function Info({ label, value }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value}</p>
    </div>
  )
}
