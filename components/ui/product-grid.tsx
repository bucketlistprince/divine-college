"use client"

import { Plus, Package } from "lucide-react"
import type { Product } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface ProductGridProps {
  products: Product[]
  onAddToCart?: (product: Product) => void
}

export function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Available</h3>
        <p className="text-gray-600">Check back soon for new items!</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {products.map((product) => (
        <div
          key={product.id}
          className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <Link href={`/shop/${product.id}`} className="block aspect-square relative">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100">
                <Package className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </Link>

          <div className="p-4 sm:p-5">
            <Link href={`/shop/${product.id}`}>
              <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                {product.name}
              </h3>
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <p className="font-semibold text-gray-900 text-sm sm:text-base">GH₵{product.price.toFixed(2)}</p>
              <button
                onClick={() => onAddToCart?.(product)}
                className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
