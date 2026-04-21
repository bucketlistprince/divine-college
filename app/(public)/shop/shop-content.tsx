"use client"

import { Suspense, useState, useEffect } from "react"
import { ProductGrid } from "@/components/ui/product-grid"
import { ShopInfo } from "@/components/ui/shop-info"
import { Cart } from "@/components/ui/cart"
import type { Product } from "@prisma/client"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export function ShopContent({ products }: { products: Product[] }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Load cart items from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }

    // Listen for cart open event
    const handleOpenCart = () => setIsCartOpen(true)
    window.addEventListener('openCart', handleOpenCart)
    return () => window.removeEventListener('openCart', handleOpenCart)
  }, [])

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
    // Dispatch cart update event with cart items for immediate UI reactivity
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: { items: cartItems } }))
  }, [cartItems])

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        imageUrl: product.images && product.images.length > 0 ? product.images[0] : undefined
      }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id))
  }

  return (
    <>
      {/* Products Grid */}
      <section className="py-6 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6">
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
              </div>
            }>
              <ProductGrid 
                products={products} 
                onAddToCart={addToCart}
              />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Shopping Info */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 sm:space-y-6">
            <Suspense fallback={<div className="h-48" />}>
              <ShopInfo />
            </Suspense>
          </div>
        </div>
      </section>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-x-0 top-0 z-50">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          <Cart
            items={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeFromCart}
            onClose={() => setIsCartOpen(false)}
          />
        </div>
      )}
    </>
  )
}