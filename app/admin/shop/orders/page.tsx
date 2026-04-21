"use client"

import { useState, useEffect } from 'react'
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Package, ChevronLeft } from "lucide-react"
import Link from 'next/link'
import { OrderModal } from '@/components/ui/order-modal'

interface OrderItem {
  id: string
  quantity: number
  price: number
  product: {
    id: string
    name: string
    images?: string[]
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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      
      // Update selected order if it's the one modified
      if (selectedOrder?.id === orderId) {
        setSelectedOrder(updatedOrder)
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
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

        <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 sm:p-12 text-center">
              <Package className="h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders</h3>
              <p className="mt-1 text-sm text-gray-500">No orders have been placed yet.</p>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Customer & Address
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Items
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Manage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr 
                        key={order.id} 
                        className="hover:bg-blue-50/30 align-top transition-colors cursor-pointer group"
                        onClick={() => openOrderDetails(order)}
                      >
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-sm font-bold text-blue-600 font-mono group-hover:underline">#{order.orderNumber}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-sm font-semibold text-gray-900">{order.customerName}</div>
                          <div className="text-xs text-gray-500">{order.email}</div>
                          <div className="text-xs text-gray-400 mt-1 line-clamp-1">{order.phone}</div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="space-y-1 max-w-[200px]">
                            {order.items.slice(0, 2).map((item) => (
                              <div key={item.id} className="flex justify-between items-start text-[11px]">
                                <span className="text-gray-700 font-medium truncate flex-1">{item.product.name}</span>
                                <span className="text-gray-400 font-bold ml-2">x{item.quantity}</span>
                              </div>
                            ))}
                            {order.items.length > 2 && (
                              <p className="text-[10px] text-blue-500 font-medium">+{order.items.length - 2} more items</p>
                            )}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4 text-right">
                          <div className="text-sm font-bold text-gray-900">
                            GH₵{order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <span className={
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider " +
                            (order.status === 'PENDING'
                              ? "bg-amber-100 text-amber-700"
                              : order.status === 'PROCESSING'
                              ? "bg-blue-100 text-blue-700"
                              : order.status === 'SHIPPED'
                              ? "bg-indigo-100 text-indigo-700"
                              : order.status === 'DELIVERED'
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                            )
                          }>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-3 sm:px-6 py-4" onClick={(e) => e.stopPropagation()}>
                          <select
                            value={order.status}
                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                            className="text-[11px] rounded-md border-gray-300 bg-white py-1 pl-2 pr-7 shadow-sm focus:border-blue-500 focus:ring-blue-500 cursor-pointer"
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

        <OrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
          onUpdateStatus={handleUpdateStatus}
        />
      </main>
    </div>
  )
}
