"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users, 
  BookOpen, 
  Calendar, 
  ShoppingBag, 
  Image, 
  Settings,
  ChevronRight,
  Home,
  Menu,
  X,
  FileText,
  Package
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/providers/sidebar-provider"
import { useEffect, useState } from "react"

// Custom hook for media query
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    const listener = () => setMatches(media.matches)
    window.addEventListener('resize', listener)
    return () => window.removeEventListener('resize', listener)
  }, [matches, query])

  return matches
}

const sidebarItems = [
  {
    title: "Dashboard",
    icon: Home,
    href: "/admin"
  },
  {
    title: "Students",
    icon: Users,
    href: "/admin/students"
  },
  {
    title: "Courses",
    icon: BookOpen,
    href: "/admin/courses"
  },
  {
    title: "News",
    icon: FileText,
    href: "/admin/news"
  },
  {
    title: "Events",
    icon: Calendar,
    href: "/admin/events"
  },
  {
    title: "Gallery",
    icon: Image,
    href: "/admin/gallery"
  },
  {
    title: "Shop",
    icon: ShoppingBag,
    href: "/admin/shop"
  },
  {
    title: "Orders",
    icon: Package,
    href: "/admin/shop/orders"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/admin/settings"
  }
]

export function AdminSidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div>
      {/* Mobile overlay */}
      {!isDesktop && !isCollapsed && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen bg-white border-r border-gray-200 transition-all duration-300",
          "w-72 lg:w-64",
          "transform lg:transform-none lg:translate-x-0",
          isCollapsed
            ? "-translate-x-full lg:w-16"
            : "translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
            {!isCollapsed && (
              <Link 
                href="/admin" 
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                Admin Panel
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      // Only close sidebar on mobile screens
                      if (!isDesktop && !isCollapsed) {
                        toggleSidebar()
                      }
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      "relative group",
                      isActive 
                        ? "bg-blue-50 text-blue-600" 
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    )}
                    {!isCollapsed && isActive && (
                      <ChevronRight className="h-4 w-4 ml-auto" />
                    )}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </aside>
    </div>
  )
}
