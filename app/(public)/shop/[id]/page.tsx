"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ShoppingCart, Package, ChevronLeft, ChevronRight } from "lucide-react"
import { use } from "react"
import { Cart } from "@/components/ui/cart"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  status: string
  images: string[]
}

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`)
        if (!response.ok) throw new Error('Failed to fetch product')
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
        router.push('/shop')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [id, router])

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
    setIsCartOpen(true)
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

  const nextImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  const previousImage = () => {
    if (product?.images) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
      )
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
        </div>
      </div>
    )
  }

  if (!product) {
    return null
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 sm:mb-10 text-sm sm:text-base transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          Back to Shop
        </button>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              {product.images && product.images.length > 0 ? (
                <div className="relative aspect-square rounded-xl overflow-hidden group bg-gray-50">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                      >
                        <ChevronLeft className="w-6 h-6 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                      >
                        <ChevronRight className="w-6 h-6 text-gray-800" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center">
                  <Package className="w-16 h-16 text-gray-400" />
                </div>
              )}

              {/* Thumbnail Navigation */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2 px-1">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-200 hover:opacity-90 ${
                        currentImageIndex === index ? 'ring-2 ring-blue-600 ring-offset-2' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} - Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8 sm:space-y-10">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-xl sm:text-2xl font-semibold text-blue-600">
                  GH₵{product.price.toLocaleString()}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Description</h3>
                <div 
                  className="prose prose-gray prose-sm sm:prose-base max-w-none text-gray-600"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Availability</h3>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    product.status === 'AVAILABLE'
                      ? 'bg-green-100 text-green-800'
                      : product.status === 'LOW_STOCK'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'AVAILABLE'
                      ? 'In Stock'
                      : product.status === 'LOW_STOCK'
                      ? 'Low Stock'
                      : 'Out of Stock'}
                  </span>
                  {product.stock > 0 && (
                    <span className="text-sm sm:text-base text-gray-500">
                      ({product.stock} available)
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => product && addToCart(product)}
                  disabled={product.status === 'UNAVAILABLE'}
                  className="w-full md:w-auto px-8 py-3 text-base font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </div>
  )
}
