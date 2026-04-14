import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"

import { getStudent, updateStudent } from "../api/studentsApi"
import StudentForm from "../components/students/StudentForm"
import LoadingSpinner from "../components/ui/LoadingSpinner"
import Button from "../components/ui/Button"

export default function StudentEditPage({ setLayoutMeta }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const studentQuery = useQuery({
    queryKey: ["student", id],
    queryFn: async () => (await getStudent(id)).data,
  })

  useEffect(() => {
    setLayoutMeta({ title: "Modifier etudiant", showSearch: false })
  }, [setLayoutMeta])

  const mutation = useMutation({
    mutationFn: (payload) => updateStudent(id, payload),
    onSuccess: () => {
      toast.success("Etudiant mis a jour")
      queryClient.invalidateQueries({ queryKey: ["students"] })
      queryClient.invalidateQueries({ queryKey: ["student", id] })
      navigate(`/${id}`)
    },
    onError: () => {
      toast.error("Erreur lors de la mise a jour")
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

  return (
    <StudentForm
      initialValues={studentQuery.data}
      onSubmit={(formData) => mutation.mutate(formData)}
      onCancel={() => navigate(-1)}
      loading={mutation.isPending}
    />
  )
}
