'use client'

import { X, Package, User, Mail, Phone, MapPin, Calendar, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

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

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order | null
  onUpdateStatus?: (id: string, status: string) => void
}

export function OrderModal({ isOpen, onClose, order, onUpdateStatus }: OrderModalProps) {
  if (!order) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-700 border-amber-200'
      case 'PROCESSING': return 'bg-blue-100 text-blue-700 border-blue-200'
      case 'SHIPPED': return 'bg-indigo-100 text-indigo-700 border-indigo-200'
      case 'DELIVERED': return 'bg-emerald-100 text-emerald-700 border-emerald-200'
      case 'CANCELLED': return 'bg-rose-100 text-rose-700 border-rose-200'
      default: return 'bg-gray-100 text-gray-700 border-gray-200'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-[60] p-4 md:p-8 overflow-y-auto flex items-start justify-center backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden my-auto"
          >
            {/* Header */}
            <div className="relative bg-gray-50 border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm font-mono text-blue-600 font-semibold">#{order.orderNumber}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-500 transition-colors shadow-sm"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 grid gap-8 overflow-y-auto max-h-[75vh]">
              {/* Customer and Order Summary */}
              <div className="grid md:grid-cols-2 gap-8">
                {/* Customer Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Customer Information
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-white rounded shadow-sm">
                        <Package className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Full Name</p>
                        <p className="text-sm text-gray-900 font-medium">{order.customerName}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-white rounded shadow-sm">
                        <Mail className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Email Address</p>
                        <p className="text-sm text-gray-900">{order.email || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-1.5 bg-white rounded shadow-sm">
                        <Phone className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Phone Number</p>
                        <p className="text-sm text-gray-900">{order.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-2 border-t border-gray-200">
                      <div className="p-1.5 bg-white rounded shadow-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Shipping Address</p>
                        <p className="text-sm text-gray-900 italic whitespace-pre-wrap">{order.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status and Items Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Order Management
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-6">
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Change Order Status</p>
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus?.(order.id, e.target.value)}
                        className="w-full text-sm rounded-lg border-gray-300 bg-white py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="PENDING">Pending Approval</option>
                        <option value="PROCESSING">Currently Processing</option>
                        <option value="SHIPPED">Shipped & En Route</option>
                        <option value="DELIVERED">Confirmed Delivered</option>
                        <option value="CANCELLED">Order Cancelled</option>
                      </select>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs">Placed on {new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-600 rounded-xl p-6 shadow-lg shadow-blue-200 text-white">
                    <p className="text-sm opacity-80 uppercase tracking-widest font-bold mb-1">Grand Total</p>
                    <p className="text-4xl font-black">
                      GH₵{order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Order Items</h3>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-white border rounded-xl hover:border-blue-200 transition-colors"
                    >
                      <div className="relative w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.product.images?.[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-300">
                            <Package className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-gray-900">{item.product.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Quantity: <span className="font-bold text-blue-600">{item.quantity}</span></p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 font-medium">Price per unit: GH₵{item.price.toFixed(2)}</p>
                        <p className="text-sm font-bold text-gray-900">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 border-t flex justify-end">
              <Button 
                onClick={onClose}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8"
              >
                Close View
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
