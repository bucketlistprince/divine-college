"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ShoppingBag, 
  Image as ImageIcon, 
  Settings,
  ChevronRight
} from "lucide-react"
import Link from "next/link"

const adminModules = [
  {
    title: "Students",
    description: "Manage student records, applications, and enrollment",
    icon: <Users className="w-6 h-6" />,
    href: "/admin/students",
    key: "students"
  },
  {
    title: "Courses",
    description: "Manage course offerings, schedules, and materials",
    icon: <BookOpen className="w-6 h-6" />,
    href: "/admin/courses",
    key: "courses"
  },
  {
    title: "Events",
    description: "Organize and manage college events and activities",
    icon: <Calendar className="w-6 h-6" />,
    href: "/admin/events",
    key: "events"
  },
  {
    title: "Shop",
    description: "Manage college store products and orders",
    icon: <ShoppingBag className="w-6 h-6" />,
    href: "/admin/shop",
    key: "products"
  },
  {
    title: "Gallery",
    description: "Curate and manage the college photo gallery",
    icon: <ImageIcon className="w-6 h-6" aria-hidden="true" />,
    href: "/admin/gallery",
    key: "gallery"
  },
  {
    title: "Settings",
    description: "Configure system settings and preferences",
    icon: <Settings className="w-6 h-6" />,
    href: "/admin/settings",
    key: "admins"
  }
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Record<string, { total: number, label: string }>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats')
        if (!response.ok) throw new Error('Failed to fetch statistics')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        setError('Failed to load dashboard statistics')
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])
  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-7xl">
        <PageHeader
          title="Admin Dashboard"
          description="Manage your college resources and content"
        />
        <div className="mt-8 text-red-600">{error}</div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 max-w-7xl">
        <PageHeader
          title="Admin Dashboard"
          description="Manage your college resources and content"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {adminModules.map((module, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm p-4 sm:p-6 animate-pulse"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 bg-gray-100 rounded-lg w-10 h-10" />
                <div className="w-5 h-5 bg-gray-100 rounded" />
              </div>
              <div className="h-6 bg-gray-100 rounded mt-4 w-1/2" />
              <div className="h-4 bg-gray-100 rounded mt-2" />
              <div className="h-4 bg-gray-100 rounded mt-1 w-3/4" />
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="h-8 bg-gray-100 rounded w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="container mx-auto px-4 max-w-7xl">
        <PageHeader
          title="Admin Dashboard"
          description="Manage your college resources and content"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
          {adminModules.map((module, index) => (
            <Link
              key={index}
              href={module.href}
              className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  {module.icon}
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mt-4 line-clamp-1">
                {module.title}
              </h3>
              
              <p className="text-gray-600 mt-2 text-sm sm:text-base line-clamp-2">
                {module.description}
              </p>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex flex-col xs:flex-row xs:items-baseline gap-1 xs:gap-2">
                  {isLoading ? (
                    <div className="animate-pulse">
                      <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    </div>
                  ) : (
                    <>
                      <span className="text-xl sm:text-2xl font-bold text-gray-900">
                        {stats[module.key]?.total.toLocaleString() || '0'}
                      </span>
                      <span className="text-sm text-gray-600">
                        {stats[module.key]?.label || 'Items'}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
