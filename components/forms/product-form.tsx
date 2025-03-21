"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FormSubmitButton } from "@/components/ui/form-submit-button"
import { FormSuccess } from "@/components/ui/form-success"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

interface ProductFormData {
  title: string
  description: string
  price: string
  stock: string
  status: "AVAILABLE" | "UNAVAILABLE" | "LOW_STOCK"
  images: File[]
  imageUrls?: string[]
}

interface ProductFormProps {
  initialData?: ProductFormData
  onSubmit: (data: ProductFormData) => Promise<void>
  onCancel?: () => void
}

export function ProductForm({ initialData, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>(
    initialData || {
      title: "",
      description: "",
      price: "",
      stock: "",
      status: "AVAILABLE",
      images: [],
      imageUrls: []  // Initialize as an empty array
    }
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSuccessMessage("")
    
    try {
      await onSubmit(formData)
      if (initialData) {
        setSuccessMessage("Product updated successfully!")
      } else {
        setSuccessMessage("Product added successfully!")
        // Only reset form for new products
        setFormData({
          title: "",
          description: "",
          price: "",
          stock: "",
          status: "AVAILABLE",
          images: [],
          imageUrls: []
        })
      }
    } catch (error) {
      console.error(error)
      alert("Error saving product. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSuccess message={successMessage} />
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <RichTextEditor
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            placeholder="Enter product description..."
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price (GHS)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="AVAILABLE">In Stock</option>
            <option value="UNAVAILABLE">Out of Stock</option>
            <option value="LOW_STOCK">Low Stock</option>
          </select>
        </div>

        <div>
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              setFormData(prev => ({ 
                ...prev, 
                images: files,
                imageUrls: files.map(file => URL.createObjectURL(file)) // Just for preview
              }))
            }}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {formData.imageUrls && formData.imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                alt={`Product image ${index + 1}`}
                width={128}
                height={128}
                className="w-32 h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <FormSubmitButton 
          isSubmitting={isSubmitting}
          isEditing={!!initialData}
        >
          {initialData ? "Update Product" : "Add Product"}
        </FormSubmitButton>
      </div>
    </form>
  )
}
