"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AdminLayout from "@/app/admin-layout"

export default function AdminDashboard() {
  const router = useRouter()

  useEffect(() => {
    // TODO: Add proper authentication check
    const isAuthenticated = sessionStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
    }
  }, [router])

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      </div>
    </AdminLayout>
  )
}
