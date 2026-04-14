import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  ArrowDownTrayIcon,
  PlusIcon,
  UserGroupIcon,
  CheckCircleIcon,
  PauseCircleIcon,
  AcademicCapIcon,
} from "@heroicons/react/24/outline"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { motion } from "framer-motion"

import {
  deleteStudent,
  exportCSV,
  getStudents,
} from "../api/studentsApi"
import DeleteModal from "../components/students/DeleteModal"
import StudentCard from "../components/students/StudentCard"
import StudentTable from "../components/students/StudentTable"
import Button from "../components/ui/Button"
import EmptyState from "../components/ui/EmptyState"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import Pagination from "../components/ui/Pagination"

const FILIERES = ["Informatique", "Maths", "Physique", "Economie", "Gestion"]

function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}

function StatsCard({ title, value, icon: Icon, style }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl p-4 shadow-sm ${style}`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">{title}</p>
        <Icon className="h-8 w-8" />
      </div>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </motion.article>
  )
}

export default function StudentListPage({ globalSearch, setGlobalSearch, setLayoutMeta }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [page, setPage] = useState(1)
  const [filiere, setFiliere] = useState("")
  const [status, setStatus] = useState("")
  const [deletingStudent, setDeletingStudent] = useState(null)

  const debouncedSearch = useDebouncedValue(globalSearch, 300)

  const params = useMemo(
    () => ({ page, q: debouncedSearch || undefined, filiere: filiere || undefined, status: status || undefined }),
    [page, debouncedSearch, filiere, status],
  )

  const studentsQuery = useQuery({
    queryKey: ["students", params],
    queryFn: async () => {
      const response = await getStudents(params)
      return response.data
    },
  })

  const totalQuery = useQuery({
    queryKey: ["students-count-total"],
    queryFn: async () => (await getStudents({ page: 1 })).data.count,
  })

  const actifQuery = useQuery({
    queryKey: ["students-count-actif"],
    queryFn: async () => (await getStudents({ page: 1, status: "actif" })).data.count,
  })

  const suspenduQuery = useQuery({
    queryKey: ["students-count-suspendu"],
    queryFn: async () => (await getStudents({ page: 1, status: "suspendu" })).data.count,
  })

  const diplomeQuery = useQuery({
    queryKey: ["students-count-diplome"],
    queryFn: async () => (await getStudents({ page: 1, status: "diplome" })).data.count,
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => deleteStudent(id),
    onSuccess: () => {
      toast.success("Etudiant supprime avec succes")
      queryClient.invalidateQueries({ queryKey: ["students"] })
      queryClient.invalidateQueries({ queryKey: ["students-count-total"] })
      queryClient.invalidateQueries({ queryKey: ["students-count-actif"] })
      queryClient.invalidateQueries({ queryKey: ["students-count-suspendu"] })
      queryClient.invalidateQueries({ queryKey: ["students-count-diplome"] })
      setDeletingStudent(null)
    },
    onError: () => {
      toast.error("Echec de suppression")
    },
  })

  useEffect(() => {
    setLayoutMeta({
      title: "Etudiants",
      showSearch: true,
      totalCount: totalQuery.data || 0,
    })
  }, [setLayoutMeta, totalQuery.data])

  useEffect(() => {
    setPage(1)
  }, [debouncedSearch, filiere, status])

  const exportHandler = async () => {
    try {
      const response = await exportCSV({ q: debouncedSearch, filiere, status })
      const blob = new Blob([response.data], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "etudiants.csv")
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)
      toast.success("Export CSV termine")
    } catch {
      toast.error("Impossible d'exporter le CSV")
    }
  }

  if (studentsQuery.isError) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="text-sm text-rose-700">Une erreur est survenue lors du chargement.</p>
        <div className="mt-3">
          <Button onClick={() => studentsQuery.refetch()}>Reessayer</Button>
        </div>
      </div>
    )
  }

  const students = studentsQuery.data?.results || []
  const totalCount = studentsQuery.data?.count || 0
  const pageSize = 5
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))

  return (
    <div className="space-y-6 pb-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Total etudiants" value={totalQuery.data ?? "-"} icon={UserGroupIcon} style="bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900" />
        <StatsCard title="Actifs" value={actifQuery.data ?? "-"} icon={CheckCircleIcon} style="bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-900" />
        <StatsCard title="Suspendus" value={suspenduQuery.data ?? "-"} icon={PauseCircleIcon} style="bg-gradient-to-br from-amber-50 to-amber-100 text-amber-900" />
        <StatsCard title="Diplomes" value={diplomeQuery.data ?? "-"} icon={AcademicCapIcon} style="bg-gradient-to-br from-violet-50 to-violet-100 text-violet-900" />
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-end">
          <Button onClick={() => navigate("/add")}>
            <PlusIcon className="h-4 w-4" />
            Ajouter un etudiant
          </Button>
          <Button variant="outline" onClick={exportHandler}>
            <ArrowDownTrayIcon className="h-4 w-4" />
            Exporter CSV
          </Button>
        </div>
      </section>

      {studentsQuery.isLoading ? (
        <LoadingSpinner label="Chargement des etudiants..." />
      ) : students.length === 0 ? (
        <EmptyState
          title="Aucun etudiant trouve"
          description="Ajustez les filtres ou ajoutez un nouvel etudiant pour commencer."
          actionLabel="Ajouter un etudiant"
          onAction={() => navigate("/add")}
        />
      ) : (
        <>
          <div className="hidden md:block">
            <StudentTable
              students={students}
              loading={studentsQuery.isFetching && !studentsQuery.isLoading}
              onDelete={setDeletingStudent}
              searchValue={globalSearch}
              onSearchChange={setGlobalSearch}
              filiere={filiere}
              onFiliereChange={setFiliere}
              status={status}
              onStatusChange={setStatus}
              filiereOptions={FILIERES}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 md:hidden">
            {students.map((student) => (
              <StudentCard key={student.id} student={student} onDelete={setDeletingStudent} />
            ))}
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            onPageChange={setPage}
          />
        </>
      )}

      <DeleteModal
        isOpen={Boolean(deletingStudent)}
        studentName={
          deletingStudent
            ? `${deletingStudent.last_name} ${deletingStudent.first_name}`
            : ""
        }
        onCancel={() => setDeletingStudent(null)}
        onConfirm={() => deleteMutation.mutate(deletingStudent.id)}
        loading={deleteMutation.isPending}
      />
    </div>
  )
}
