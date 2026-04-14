import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
})

export const getStudents = (params) => api.get("students/", { params })
export const getStudent = (id) => api.get(`students/${id}/`)
export const createStudent = (data) =>
  api.post("students/", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
export const updateStudent = (id, data) =>
  api.patch(`students/${id}/`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
export const deleteStudent = (id) => api.delete(`students/${id}/`)
export const exportCSV = (params) =>
  api.get("export/csv/", { responseType: "blob", params })
