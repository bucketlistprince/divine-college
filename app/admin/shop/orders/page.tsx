"use client"

import { useState, useEffect } from 'react'
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Package, ChevronLeft } from "lucide-react"
import Link from 'next/link'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    imageUrl?: string
  }
}

interface Order {
  id: string
  orderNumber: string
  customerName: string
  email: string
  phone: string
  address: string
  status: string
  total: number
  createdAt: string
  items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (!response.ok) throw new Error('Failed to fetch orders')
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: newStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update order status')
      
      const updatedOrder = await response.json()
      setOrders(orders.map(order => 
        order.id === orderId ? updatedOrder : order
      ))
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Orders"
        description="View and manage customer orders"
      />

      <main className="mx-auto py-8">
        <div className="mb-6">
          <Link href="/admin/shop">
            <Button variant="outline" className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 sm:p-12 text-center">
              <Package className="h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">No orders have been placed yet.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Details
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">#{order.id}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-sm text-gray-900">{order.customerName}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <span className={
                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" +
                            (order.status === 'PENDING'
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === 'PROCESSING'
                              ? "bg-blue-100 text-blue-800"
                              : order.status === 'SHIPPED'
                              ? "bg-green-100 text-green-800"
                              : order.status === 'DELIVERED'
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                            )
                          }>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="rounded-md border-gray-300 text-sm"
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PROCESSING">Processing</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="DELIVERED">Delivered</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
