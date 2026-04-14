import { useEffect } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

import { createStudent } from "../api/studentsApi"
import StudentForm from "../components/students/StudentForm"

export default function StudentCreatePage({ setLayoutMeta }) {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  useEffect(() => {
    setLayoutMeta({ title: "Ajouter un etudiant", showSearch: false })
  }, [setLayoutMeta])

  const mutation = useMutation({
    mutationFn: (payload) => createStudent(payload),
    onSuccess: () => {
      toast.success("Etudiant cree avec succes")
      queryClient.invalidateQueries({ queryKey: ["students"] })
      navigate("/")
    },
    onError: () => {
      toast.error("Erreur lors de la creation")
    },
  })

  return (
    <StudentForm
      onSubmit={(formData) => mutation.mutate(formData)}
      onCancel={() => navigate(-1)}
      loading={mutation.isPending}
    />
  )
}
