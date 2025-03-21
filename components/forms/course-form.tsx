"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormSubmitButton } from "@/components/ui/form-submit-button"
import { FormSuccess } from "@/components/ui/form-success"

interface CourseFormData {
  title: string
  description: string
  duration: string
  status: 'DRAFT' | 'PUBLISHED'
}

interface CourseFormProps {
  initialData?: CourseFormData
  onSubmit: (data: CourseFormData) => Promise<void>
  onCancel: () => void
}

export function CourseForm({ initialData, onSubmit, onCancel }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>(
    initialData || {
      title: "",
      description: "",
      duration: "",
      status: "DRAFT"
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
      setSuccessMessage(initialData ? "Course updated successfully!" : "Course added successfully!")
      // Reset form if it's a new course
      if (!initialData) {
        setFormData({
          title: "",
          description: "",
          duration: "",
          status: "DRAFT"
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSuccess message={successMessage} />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Title
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
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duration
        </label>
        <input
          type="text"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="e.g., 6 months"
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as 'DRAFT' | 'PUBLISHED' })}
          className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
        </select>
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
          submitText={initialData ? "Update Course" : "Add Course"}
        />
      </div>
    </form>
  )
}
