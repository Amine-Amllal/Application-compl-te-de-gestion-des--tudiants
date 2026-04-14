import { useMemo, useState } from "react"
import { PhotoIcon } from "@heroicons/react/24/outline"

import Button from "../ui/Button"
import Input from "../ui/Input"
import Select from "../ui/Select"

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  filiere: "",
  status: "actif",
  date_naissance: "",
}

function validate(values) {
  const errors = {}
  if (!values.first_name.trim()) errors.first_name = "Le prenom est requis"
  if (!values.last_name.trim()) errors.last_name = "Le nom est requis"
  if (!values.email.trim()) {
    errors.email = "L'email est requis"
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Email invalide"
  }
  if (!values.filiere.trim()) errors.filiere = "La filiere est requise"
  return errors
}

export default function StudentForm({
  initialValues,
  onSubmit,
  onCancel,
  loading,
}) {
  const [values, setValues] = useState({ ...defaultValues, ...initialValues })
  const [errors, setErrors] = useState({})
  const [photoFile, setPhotoFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)

  const previewUrl = useMemo(() => {
    if (photoFile) return URL.createObjectURL(photoFile)
    return initialValues?.photo_url || ""
  }, [photoFile, initialValues])

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handlePhoto = (file) => {
    if (!file) return
    setPhotoFile(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return

    const formData = new FormData()
    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined) formData.append(key, value)
    })
    if (photoFile) {
      formData.append("photo", photoFile)
    }

    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Prenom"
          value={values.first_name}
          onChange={handleChange("first_name")}
          error={errors.first_name}
          placeholder="Ex: Sarah"
        />
        <Input
          label="Nom"
          value={values.last_name}
          onChange={handleChange("last_name")}
          error={errors.last_name}
          placeholder="Ex: El Idrissi"
        />
        <Input
          label="Email"
          type="email"
          value={values.email}
          onChange={handleChange("email")}
          error={errors.email}
          placeholder="email@exemple.com"
        />
        <Input
          label="Telephone"
          value={values.phone}
          onChange={handleChange("phone")}
          placeholder="06XXXXXXXX"
        />
        <Input
          label="Filiere"
          value={values.filiere}
          onChange={handleChange("filiere")}
          error={errors.filiere}
          placeholder="Informatique"
        />
        <Select
          label="Statut"
          value={values.status}
          onChange={handleChange("status")}
        >
          <option value="actif">Actif</option>
          <option value="suspendu">Suspendu</option>
          <option value="diplome">Diplome</option>
        </Select>
        <Input
          label="Date de naissance"
          type="date"
          value={values.date_naissance || ""}
          onChange={handleChange("date_naissance")}
          className="md:col-span-2"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">Photo</p>
        <label
          className={`flex min-h-36 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 text-center transition-all duration-200 ${
            dragOver ? "border-primary-600 bg-primary-50" : "border-slate-300"
          }`}
          onDragOver={(event) => {
            event.preventDefault()
            setDragOver(true)
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragOver(false)
            handlePhoto(event.dataTransfer.files[0])
          }}
        >
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(event) => handlePhoto(event.target.files?.[0])}
          />
          <PhotoIcon className="h-8 w-8 text-slate-400" />
          <p className="mt-2 text-sm text-slate-600">Glisser-deposer ou cliquer pour telecharger</p>
          <p className="text-xs text-slate-400">PNG, JPG jusqu'a 5MB</p>
        </label>

        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Apercu"
            className="mt-3 h-20 w-20 rounded-lg object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button variant="ghost" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" loading={loading}>
          Enregistrer
        </Button>
      </div>
    </form>
  )
}
