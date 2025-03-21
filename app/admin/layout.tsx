"use client"

import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminNavbar } from "@/components/admin/navbar"
import { SidebarProvider } from "@/components/providers/sidebar-provider"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/providers/sidebar-provider"
import { Loading } from "@/components/ui/loading"

interface User {
  id: string
  name: string
  email: string
  role: string
}

function AdminContent({ user, children }: { user: User | null, children: React.ReactNode }) {
  const { isCollapsed } = useSidebar()

  return (
    <div className="min-h-screen">
      <AdminSidebar />
      <div className={cn(
        "min-h-screen transition-all duration-300",
        "lg:pl-64",
        isCollapsed && "lg:pl-16"
      )}>
        <AdminNavbar user={user} />
        <main className="py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 mt-16 bg-gray-50 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user')
        if (response.ok) {
          const userData = await response.json()
          // Only allow admin users
          if (userData.role !== 'ADMIN') {
            window.location.href = '/'
            return
          }
          setUser(userData)
        } else {
          // If not authenticated, redirect to home
          window.location.href = '/'
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        window.location.href = '/'
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading size="lg" />
      </div>
    )
  }

  // If not authenticated, redirect to login
  if (!user) {
    window.location.href = '/'
    return null
  }

  return (
    <SidebarProvider>
      <AdminContent user={user}>
        {children}
      </AdminContent>
    </SidebarProvider>
  )
}
