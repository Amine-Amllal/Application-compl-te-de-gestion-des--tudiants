import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline"
import { motion } from "framer-motion"
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

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

export default function StudentTable({
  students,
  loading,
  onDelete,
  searchValue,
  onSearchChange,
  filiere,
  onFiliereChange,
  status,
  onStatusChange,
  filiereOptions,
}) {
  const [sorting, setSorting] = useState([])

  const data = useMemo(() => students, [students])

  const columns = useMemo(
    () => [
      {
        id: "photo",
        header: "Photo",
        enableSorting: false,
        cell: ({ row }) => <Avatar student={row.original} />,
      },
      {
        id: "full_name",
        header: "Nom complet",
        accessorFn: (row) => `${row.last_name} ${row.first_name}`,
        cell: ({ row }) => (
          <span className="fw-semibold text-slate-900">
            {row.original.last_name} {row.original.first_name}
          </span>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => <span className="text-slate-600">{getValue()}</span>,
      },
      {
        accessorKey: "filiere",
        header: "Filiere",
        cell: ({ getValue }) => <span className="text-slate-700">{getValue()}</span>,
      },
      {
        accessorKey: "status",
        header: "Statut",
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      },
      {
        id: "date_inscription",
        header: "Inscription",
        accessorFn: (row) => new Date(row.date_inscription).getTime(),
        cell: ({ row }) => (
          <span className="text-slate-600">
            {new Date(row.original.date_inscription).toLocaleDateString("fr-FR")}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        enableSorting: false,
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              to={`/${row.original.id}`}
              title="Voir"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-100"
            >
              <EyeIcon className="h-4 w-4" />
            </Link>
            <Link
              to={`/${row.original.id}/edit`}
              title="Modifier"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all duration-200 hover:bg-slate-100"
            >
              <PencilSquareIcon className="h-4 w-4" />
            </Link>
            <button
              type="button"
              title="Supprimer"
              onClick={() => onDelete(row.original)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-rose-200 text-rose-600 transition-all duration-200 hover:bg-rose-50"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    [onDelete],
  )

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const sortIndicator = (column) => {
    const sorted = column.getIsSorted()
    if (sorted === "asc") return " ▲"
    if (sorted === "desc") return " ▼"
    return ""
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-3">
      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle mb-0">
          <thead className="table-light">
            <tr>
              {table.getHeaderGroups()[0].headers.map((header) => {
                const canSort = header.column.getCanSort()
                return (
                  <th key={header.id}>
                    {canSort ? (
                      <button
                        type="button"
                        onClick={header.column.getToggleSortingHandler()}
                        className="btn btn-link p-0 text-decoration-none text-dark fw-semibold"
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {sortIndicator(header.column)}
                      </button>
                    ) : (
                      <span className="fw-semibold text-dark">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </span>
                    )}
                  </th>
                )
              })}
            </tr>
            <tr>
              <th colSpan={3}>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  placeholder="Rechercher par nom ou email"
                  value={searchValue}
                  onChange={(event) => onSearchChange(event.target.value)}
                />
              </th>
              <th>
                <select
                  className="form-select form-select-sm"
                  value={filiere}
                  onChange={(event) => onFiliereChange(event.target.value)}
                >
                  <option value="">Toutes les filieres</option>
                  {filiereOptions.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <select
                  className="form-select form-select-sm"
                  value={status}
                  onChange={(event) => onStatusChange(event.target.value)}
                >
                  <option value="">Tous les statuts</option>
                  <option value="actif">Actif</option>
                  <option value="suspendu">Suspendu</option>
                  <option value="diplome">Diplome</option>
                </select>
              </th>
              <th colSpan={2} />
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, idx) => <SkeletonRow key={idx} />)
              : table.getRowModel().rows.map((row, index) => (
                  <motion.tr
                    key={row.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className=""
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </motion.tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
