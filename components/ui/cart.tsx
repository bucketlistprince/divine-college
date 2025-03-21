import { useState } from 'react'
import Image from 'next/image'
import { Button } from './button'
import { ShoppingCart, X, Plus, Minus } from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string | null  
}

interface OrderFormData {
  customerName: string
  phone: string
  email?: string
  address: string
}

interface CartProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClose: () => void
}

export function Cart({ items, onUpdateQuantity, onRemoveItem, onClose }: CartProps) {
  const [formData, setFormData] = useState<OrderFormData>({
    customerName: '',
    phone: '',
    email: '',
    address: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          items: items.map(item => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price
          })),
          total
        })
      })

      if (!response.ok) throw new Error('Failed to place order')
      
      // Clear cart and close
      items.forEach(item => onRemoveItem(item.id))
      onClose()
      alert('Order placed successfully!')
    } catch (error) {
      setError('Failed to place order. Please try again.')
      console.error('Error placing order:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] transform transition-transform duration-300 ease-in-out z-50 bg-white shadow-lg flex flex-col">
      <div className="flex-1 flex flex-col max-h-screen overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Cart</h2>
            <span className="text-sm text-gray-500">
              ({items.reduce((total, item) => total + item.quantity, 0)} items)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 border-b border-gray-200">
                  {/* Product Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingCart className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      GH₵{item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-sm text-gray-900 w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-gray-500"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-1 text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-gray-50">
            {/* Total Section */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500">Subtotal</span>
                <span className="text-sm font-medium text-gray-900">GH₵{total.toFixed(2)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-base font-medium text-gray-900">Total</span>
                <span className="text-lg font-bold text-blue-600">GH₵{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-4 space-y-4">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Delivery Address *</label>
                <textarea
                  required
                  placeholder="Enter your delivery address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors resize-none"
                  rows={3}
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="p-4 bg-white border-t border-gray-200">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-base font-medium rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
              >
                {isSubmitting ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
