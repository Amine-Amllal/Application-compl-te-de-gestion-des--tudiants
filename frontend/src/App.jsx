import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Navbar from "./components/layout/Navbar"
import StudentCreatePage from "./pages/StudentCreatePage"
import StudentDetailPage from "./pages/StudentDetailPage"
import StudentEditPage from "./pages/StudentEditPage"
import StudentListPage from "./pages/StudentListPage"

function Layout({ children, meta, setGlobalSearch, globalSearch }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen flex-col">
        <Navbar
          title={meta.title}
          showSearch={meta.showSearch}
          search={globalSearch}
          onSearchChange={setGlobalSearch}
          totalCount={meta.totalCount || 0}
          showTotalCount={meta.showTotalCount !== false}
        />
        <main className="w-full flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

function AppRoutes() {
  const [layoutMeta, setLayoutMeta] = useState({
    title: "Etudiants",
    showSearch: true,
    totalCount: 0,
  })
  const [globalSearch, setGlobalSearch] = useState("")

  return (
    <Layout meta={layoutMeta} globalSearch={globalSearch} setGlobalSearch={setGlobalSearch}>
      <Routes>
        <Route
          path="/"
          element={
            <StudentListPage
              globalSearch={globalSearch}
              setGlobalSearch={setGlobalSearch}
              setLayoutMeta={setLayoutMeta}
            />
          }
        />
        <Route path="/add" element={<StudentCreatePage setLayoutMeta={setLayoutMeta} />} />
        <Route path="/:id" element={<StudentDetailPage setLayoutMeta={setLayoutMeta} />} />
        <Route path="/:id/edit" element={<StudentEditPage setLayoutMeta={setLayoutMeta} />} />
      </Routes>
    </Layout>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
