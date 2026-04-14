import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { deleteStudent, getStudent } from "../api/studentsApi"
import DeleteModal from "../components/students/DeleteModal"
import StudentDetail from "../components/students/StudentDetail"
import Button from "../components/ui/Button"
import LoadingSpinner from "../components/ui/LoadingSpinner"

export default function StudentDetailPage({ setLayoutMeta }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [deleteOpen, setDeleteOpen] = useState(false)

  const studentQuery = useQuery({
    queryKey: ["student", id],
    queryFn: async () => (await getStudent(id)).data,
  })

  useEffect(() => {
    setLayoutMeta({ title: "Detail etudiant", showSearch: false, showTotalCount: false })
  }, [setLayoutMeta])

  const deleteMutation = useMutation({
    mutationFn: () => deleteStudent(id),
    onSuccess: () => {
      toast.success("Etudiant supprime")
      queryClient.invalidateQueries({ queryKey: ["students"] })
      navigate("/")
    },
    onError: () => {
      toast.error("Erreur lors de la suppression")
    },
  })

  if (studentQuery.isLoading) {
    return <LoadingSpinner fullPage label="Chargement..." />
  }

  if (studentQuery.isError) {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center">
        <p className="text-sm text-rose-700">Impossible de charger cet etudiant.</p>
        <div className="mt-3">
          <Button onClick={() => studentQuery.refetch()}>Reessayer</Button>
        </div>
      </div>
    )
  }

  const student = studentQuery.data

  return (
    <>
      <StudentDetail student={student} onDeleteClick={() => setDeleteOpen(true)} />
      <DeleteModal
        isOpen={deleteOpen}
        studentName={`${student.last_name} ${student.first_name}`}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => deleteMutation.mutate()}
        loading={deleteMutation.isPending}
      />
    </>
  )
}
