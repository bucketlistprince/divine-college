"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormSubmitButton } from "@/components/ui/form-submit-button"
import { FormSuccess } from "@/components/ui/form-success"

interface NewsFormData {
  title: string
  content: string
  category: string
  publishDate: string
  status: "DRAFT" | "PUBLISHED"
  image?: File | null
  imageUrl?: string
}

interface NewsFormProps {
  initialData?: NewsFormData
  onSubmit: (data: NewsFormData) => Promise<void>
  onCancel: () => void
  categories: string[]
}

export function NewsForm({ initialData, onSubmit, onCancel, categories }: NewsFormProps) {
  const [formData, setFormData] = useState<NewsFormData>(
    initialData || {
      title: "",
      content: "",
      category: "",
      publishDate: "",
      status: "DRAFT",
      image: null,
      imageUrl: undefined
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
      setSuccessMessage(initialData ? "News updated successfully!" : "News added successfully!")
      // Reset form if it's a new news item
      if (!initialData) {
        setFormData({
          title: "",
          content: "",
          category: "",
          publishDate: "",
          status: "DRAFT",
          image: null,
          imageUrl: undefined
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSuccess message={successMessage} />
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
          Content
        </label>
        <textarea
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={8}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a category</option>
            {categories.filter(cat => cat !== "All").map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as "DRAFT" | "PUBLISHED" })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Featured Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
          submitText={initialData ? "Update News" : "Add News"}
        />
      </div>
    </form>
  )
}
