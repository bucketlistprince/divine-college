"use client"

import { useSidebar } from "@/components/providers/sidebar-provider"
import { User, LogOut, ChevronDown, Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationPopup } from "@/components/ui/notification-popup"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AdminNavbarProps {
  user: {
    id?: string
    name?: string
    email: string
    role?: string
  } | null
}

export function AdminNavbar({ user }: AdminNavbarProps) {
  const { isCollapsed, toggleSidebar } = useSidebar()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      })
      
      if (response.ok) {
        // Clear any client-side auth state
        localStorage.removeItem('token')
        sessionStorage.clear()
        
        // Redirect to home without triggering login modal
        window.location.href = '/'
      } else {
        console.error('Logout failed')
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <div className={cn(
      "fixed top-0 right-0 z-40 h-16 bg-white border-b border-gray-200 transition-all duration-300",
      "w-full",
      isCollapsed ? "lg:w-[calc(100%-4rem)]" : "lg:w-[calc(100%-16rem)]"
    )}>
      <div className="h-16">
        <div className="h-full px-2 sm:px-4 lg:px-8 flex items-center justify-between">
          {/* Menu icon only on mobile */}
          <button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Empty div to maintain spacing on desktop */}
          <div className="hidden lg:block" />

          {/* Icons on the right */}
          <div className="flex items-center gap-2 ml-auto">
            <NotificationPopup />
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button 
                    className="flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    aria-label="User menu"
                  >
                    <User className="h-5 w-5" />
                    <span className="text-sm font-medium hidden md:inline truncate max-w-[120px]">
                      {user.name || user.email}
                    </span>
                    <ChevronDown className="h-4 w-4 hidden md:block" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem 
                    className="px-3 py-2 text-sm cursor-pointer"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
