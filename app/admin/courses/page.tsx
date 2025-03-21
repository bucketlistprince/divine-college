"use client"

import { useState, useEffect } from "react"
import { Plus, Pencil, Trash } from "lucide-react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { CourseForm } from "@/components/forms/course-form"

interface Course {
  id: number
  title: string
  description: string
  duration: string
  status: 'DRAFT' | 'PUBLISHED'
  createdAt: string
  updatedAt: string
}

interface CourseFormData {
  title: string
  description: string
  duration: string
  status: 'DRAFT' | 'PUBLISHED'
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses')
      if (!response.ok) throw new Error('Failed to fetch courses')
      const data = await response.json()
      setCourses(data)
    } catch (error) {
      console.error('Error fetching courses:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCourse = async (data: CourseFormData) => {
    try {
      const courseData = {
        title: data.title,
        description: data.description,
        duration: data.duration,
        status: data.status
      }

      const response = await fetch('/api/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      })
      if (!response.ok) throw new Error('Failed to create course')
      const newCourse = await response.json()
      setCourses([...courses, newCourse])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating course:', error)
    }
  }

  const handleEditCourse = async (data: CourseFormData) => {
    try {
      if (!editingCourse) return

      const courseData = {
        id: editingCourse.id,
        title: data.title,
        description: data.description,
        duration: data.duration,
        status: data.status
      }

      const response = await fetch('/api/courses', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(courseData)
      })
      if (!response.ok) throw new Error('Failed to update course')
      const updatedCourse = await response.json()
      setCourses(courses.map(course =>
        course.id === editingCourse.id ? updatedCourse : course
      ))
      setEditingCourse(null)
    } catch (error) {
      console.error('Error updating course:', error)
    }
  }

  const handleDeleteCourse = async (id: number) => {
    if (!confirm("Are you sure you want to delete this course?")) return
    try {
      const response = await fetch(`/api/courses?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete course')
      setCourses(courses.filter(course => course.id !== id))
    } catch (error) {
      console.error('Error deleting course:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Manage Courses"
        description="Add, edit, or remove courses from the catalog"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-end">
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </Button>
        </div>

        <div className="grid gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${course.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {course.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mt-1">{course.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Duration: {course.duration}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingCourse(course)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Modal
          title={editingCourse ? "Edit Course" : "Add Course"}
          isOpen={isModalOpen || editingCourse !== null}
          onClose={() => {
            setIsModalOpen(false)
            setEditingCourse(null)
          }}
        >
          <CourseForm
            initialData={editingCourse ? {
              title: editingCourse.title,
              description: editingCourse.description,
              duration: editingCourse.duration,
              status: editingCourse.status
            } : undefined}
            onSubmit={editingCourse ? handleEditCourse : handleAddCourse}
            onCancel={() => {
              setIsModalOpen(false)
              setEditingCourse(null)
            }}
          />
        </Modal>
      </main>
    </div>
  )
}
