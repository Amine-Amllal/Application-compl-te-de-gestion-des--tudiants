import { Link } from "react-router-dom"
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"

import Avatar from "../ui/Avatar"
import StatusBadge from "./StatusBadge"

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-slate-100">
      <td className="px-4 py-4"><div className="h-10 w-10 rounded-full bg-slate-200" /></td>
      <td className="px-4 py-4"><div className="h-4 w-36 rounded bg-slate-200" /></td>
      <td className="px-4 py-4"><div className="h-4 w-44 rounded bg-slate-200" /></td>
      <td className="px-4 py-4"><div className="h-4 w-24 rounded bg-slate-200" /></td>
      <td className="px-4 py-4"><div className="h-5 w-20 rounded-full bg-slate-200" /></td>
      <td className="px-4 py-4"><div className="h-4 w-28 rounded bg-slate-200" /></td>
      <td className="px-4 py-4"><div className="h-8 w-24 rounded bg-slate-200" /></td>
    </tr>
  )
}

export default function StudentTable({ students, loading, onDelete }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="sticky top-0 bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">Photo</th>
              <th className="px-4 py-3">Nom complet</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Filiere</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3">Inscription</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
              : students.map((student, index) => (
                  <motion.tr
                    key={student.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="border-b border-slate-100 hover:bg-slate-50"
                  >
                    <td className="px-4 py-4">
                      <Avatar student={student} />
                    </td>
                    <td className="px-4 py-4 font-medium text-slate-900">
                      {student.last_name} {student.first_name}
                    </td>
                    <td className="px-4 py-4 text-slate-600">{student.email}</td>
                    <td className="px-4 py-4 text-slate-700">{student.filiere}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={student.status} />
                    </td>
                    <td className="px-4 py-4 text-slate-600">
                      {new Date(student.date_inscription).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/${student.id}`}
                          title="Voir"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-100"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </Link>
                        <Link
                          to={`/${student.id}/edit`}
                          title="Modifier"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-100"
                        >
                          <PencilSquareIcon className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          title="Supprimer"
                          onClick={() => onDelete(student)}
                          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-rose-200 text-rose-600 transition-all duration-200 hover:bg-rose-50"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
