"use client"

import { useState, useEffect, useRef } from "react"
import { Bell, Package, GraduationCap, Inbox } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface Notification {
  id: string
  type: 'order' | 'application'
  title: string
  message: string
  createdAt: string
}

interface NotificationsResponse {
  orders: Notification[]
  applications: Notification[]
}

interface NotificationsProps {
  className?: string
}

export function Notifications({ className }: NotificationsProps = {}) {
  const [notifications, setNotifications] = useState<NotificationsResponse>({ orders: [], applications: [] })
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const notificationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications')
      if (!response.ok) throw new Error('Failed to fetch notifications')
      const data = await response.json()
      setNotifications(data)
    } catch (error) {
      console.error('Error fetching notifications:', error)
    }
  }

  useEffect(() => {
    fetchNotifications()
    // Fetch notifications every minute
    const interval = setInterval(fetchNotifications, 60000)
    return () => clearInterval(interval)
  }, [])

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark notification as read
      await fetch(`/api/notifications/${notification.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: true })
      })

      // Refresh notifications
      await fetchNotifications()

      // Navigate to appropriate page
      if (notification.type === 'order') {
        router.push('/admin/shop/orders')
      } else {
        router.push('/admin/students')
      }
      setIsOpen(false)
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }

  const totalCount = notifications.orders.length + notifications.applications.length

  return (
    <div className="relative" ref={notificationRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors",
          className
        )}
      >
        <Bell className="h-5 w-5" />
        {totalCount > 0 && (
          <span className="absolute top-1 right-1 h-4 w-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
            {totalCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed right-4 sm:absolute sm:right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-[200] max-h-[80vh] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
            
            {totalCount > 0 ? (
              <div className="space-y-4">
                {notifications.orders.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">New Orders</h4>
                    {notifications.orders.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 flex items-start gap-3"
                      >
                        <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {notifications.applications.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">New Applications</h4>
                    {notifications.applications.map((notification) => (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className="w-full text-left p-3 hover:bg-gray-50 rounded-lg transition-colors duration-150 flex items-start gap-3"
                      >
                        <GraduationCap className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-gray-500">
                <Inbox className="h-8 w-8 mb-2" />
                <p className="text-sm">No notifications at the moment</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
