"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import AdminLayout from "@/app/admin-layout"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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
        <h1 className="text-4xl font-extrabold mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Students</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">1200</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">35</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">10</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
    
  )
}
