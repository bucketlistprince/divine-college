"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FormSuccess } from "@/components/ui/form-success"

interface UserFormData {
  id?: string
  name: string
  email: string
  password: string
  role: "ADMIN" | "STAFF" | "USER"
}

interface UserFormProps {
  initialData?: UserFormData
  onSubmit: (data: UserFormData) => Promise<void>
  onCancel: () => void
}

export function UserForm({ initialData, onSubmit, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<UserFormData>(
    initialData || {
      name: "",
      email: "",
      password: "",
      role: "USER"
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
      setSuccessMessage(initialData ? "User updated successfully!" : "User added successfully!")
      if (!initialData) {
        // Only reset form for new users
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "USER"
        })
      }
    } catch (error) {
      console.error(error)
      alert(error instanceof Error ? error.message : "Error saving user. Please try again.")
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

  const isEditing = Boolean(initialData)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormSuccess message={successMessage} />
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password {isEditing && "(Leave blank to keep current password)"}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!isEditing}
            minLength={6}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="USER">User</option>
            <option value="STAFF">Staff</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          variant="outline"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update User" : "Add User")}
        </Button>
      </div>
    </form>
  )
}
