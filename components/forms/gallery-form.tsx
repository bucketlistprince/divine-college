"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FormSubmitButton } from "@/components/ui/form-submit-button"
import { FormSuccess } from "@/components/ui/form-success"
import { GALLERY_CATEGORIES, GalleryCategory } from "@/lib/constants"
import { X } from "lucide-react"
import Image from "next/image"

interface GalleryFormData {
  title: string
  description: string
  category: GalleryCategory
  images: File[]
  imageUrls?: string[]
}

interface GalleryFormProps {
  initialData?: GalleryFormData
  onSubmit: (data: GalleryFormData) => Promise<void>
  onCancel: () => void
}

export function GalleryForm({ initialData, onSubmit, onCancel }: GalleryFormProps) {
  const [formData, setFormData] = useState<GalleryFormData>(
    initialData || {
      title: "",
      description: "",
      category: GALLERY_CATEGORIES[0],
      images: [],
      imageUrls: undefined
    }
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState("")
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.images.length === 0) {
      setError("Please select at least one image")
      return
    }
    
    setIsSubmitting(true)
    setSuccessMessage("")
    setError("")
    
    try {
      await onSubmit(formData)
      setSuccessMessage(initialData ? "Images updated successfully!" : "Images added successfully!")
      // Reset form if it's a new gallery item
      if (!initialData) {
        setFormData({
          title: "",
          description: "",
          category: GALLERY_CATEGORIES[0],
          images: [],
          imageUrls: undefined
        })
        setPreviewUrls([])
      }
    } catch (error) {
      console.error(error)
      setError(error instanceof Error ? error.message : "Failed to save images")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      
      // Validate file types
      const invalidFiles = files.filter(file => !file.type.startsWith('image/'))
      if (invalidFiles.length > 0) {
        setError('Please select valid image files only')
        e.target.value = ''
        return
      }

      // Create preview URLs
      const newPreviewUrls = files.map(file => URL.createObjectURL(file))
      setPreviewUrls(prev => [...prev, ...newPreviewUrls])
      
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...files]
      }))
      setError("")
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
    
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
  }

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [previewUrls])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {successMessage && <FormSuccess message={successMessage} />}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as GalleryCategory })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {GALLERY_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          multiple
        />
        
        {/* Image Previews */}
        {previewUrls.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previewUrls.map((url, index) => (
              <div key={url} className="relative group">
                <div className="relative h-32 w-32 overflow-hidden rounded-lg">
                  <Image
                    src={url}
                    alt={`Preview ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          type="button" 
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <FormSubmitButton 
          isSubmitting={isSubmitting}
          isEditing={!!initialData}
          submitText={initialData ? "Update Images" : "Add Images"}
        />
      </div>
    </form>
  )
}
