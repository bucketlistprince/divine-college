"use client"

import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import Image from "next/image"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { ProductForm } from "@/components/forms/product-form"
import { Package, Plus, Edit, Trash2, Grid, List } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  title: string
  description: string
  price: number
  stock: number
  sales: number
  status: "AVAILABLE" | "UNAVAILABLE" | "LOW_STOCK"
  images: string[]
}

interface ProductFormData {
  title: string
  description: string
  price: string
  stock: string
  status: "AVAILABLE" | "UNAVAILABLE" | "LOW_STOCK"
  images: File[]
  imageUrls?: string[]
}

const categories = ["All", "Apparel", "Books", "Accessories", "Stationery"]

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedView, setSelectedView] = useState<"grid" | "list">("grid")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/products')
      if (!response.ok) throw new Error('Failed to fetch products')
      const data = await response.json()
      // Validate product data before setting state
      const validatedProducts = data.map((product: Product) => ({
        id: product.id || '',
        title: product.title || 'Untitled Product',
        description: product.description || '',
        price: typeof product.price === 'number' ? product.price : 0,
        stock: typeof product.stock === 'number' ? product.stock : 0,
        sales: typeof product.sales === 'number' ? product.sales : 0,
        status: product.status || 'UNAVAILABLE',
        images: Array.isArray(product.images) ? product.images : []
      } as Product))
      setProducts(validatedProducts)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProducts = products.filter((product) =>
    selectedCategory === "All" ? true : product.images && product.images.length > 0 ? product.title === selectedCategory : product.title === selectedCategory
  )

  const handleAddProduct = async (data: ProductFormData) => {
    try {
      const images = [] 
      if (data.images.length) {
        for (const image of data.images) {
          const formData = new FormData()
          formData.append('file', image)
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })
          if (!uploadResponse.ok) throw new Error('Failed to upload image')
          const uploadData = await uploadResponse.json()
          images.push(uploadData.url)
        }
      }

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          status: data.status,
          images 
        })
      })

      if (!response.ok) throw new Error('Failed to create product')
      const newProduct = await response.json()
      setProducts([...products, newProduct])
      setIsModalOpen(false)
      await fetchProducts() 
    } catch (error) {
      console.error('Error adding product:', error)
      throw error
    }
  }

  const handleEditProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    try {
      const images = [...(editingProduct.images || [])]; 
      
      if (data.images?.length) {
        for (const image of data.images) {
          const formData = new FormData();
          formData.append('file', image);
          const uploadResponse = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          if (!uploadResponse.ok) throw new Error('Failed to upload image');
          const uploadData = await uploadResponse.json();
          images.push(uploadData.url);
        }
      }
      
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingProduct.id,
          title: data.title,
          description: data.description,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          status: data.status,
          images 
        })
      });

      if (!response.ok) throw new Error('Failed to update product');
      const updatedProduct = await response.json();
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      setEditingProduct(null);
      setIsModalOpen(false);
      await fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
      throw error
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products?id=${id}`, {
          method: 'DELETE'
        })
        if (!response.ok) throw new Error('Failed to delete product')
        setProducts(products.filter((product) => product.id !== id))
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const mapProductToFormData = (product: Product): ProductFormData => {
    return {
      title: product.title,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      status: product.status,
      images: [],
      imageUrls: product.images || [] 
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 space-y-4 sm:space-y-6">
      <PageHeader
        title="Shop Management"
        description="Manage college store products and orders"
      />

      {/* Actions Bar */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedView('grid')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  selectedView === 'grid'
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setSelectedView('list')}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  selectedView === 'list'
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/admin/shop/orders')}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Orders
            </Button>
            <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Products List */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 sm:p-12 text-center">
            <Package className="h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No products</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating a new product.
            </p>
            <Button
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        ) : selectedView === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={product.images[0] || "/images/placeholder.png"}
                    alt={product.title || "Product image"}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="font-medium text-gray-900">{product.title}</h3>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-lg font-bold text-blue-600">
                    GH₵{product.price.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product)
                        setIsModalOpen(true)
                      }}
                      className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-100 relative">
                            <Image
                              src={product.images[0] || "/images/placeholder.png"}
                              alt={product.title || "Product image"}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.title}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">GH₵{product.price}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.stock}</div>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                          product.status === 'AVAILABLE'
                            ? "bg-green-100 text-green-800"
                            : product.status === 'LOW_STOCK'
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        )}>
                          {product.status === 'AVAILABLE'
                            ? 'In Stock'
                            : product.status === 'LOW_STOCK'
                            ? 'Low Stock'
                            : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingProduct(product)
                              setIsModalOpen(true)
                            }}
                            className="text-gray-500 hover:text-gray-900"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <Modal
          title={editingProduct ? "Edit Product" : "Add Product"}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setEditingProduct(null)
          }}
        >
          <ProductForm
            onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
            initialData={editingProduct ? mapProductToFormData(editingProduct) : undefined}
          />
        </Modal>
      )}
    </div>
  )
}