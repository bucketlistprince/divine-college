"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

import { PageHeader } from "@/components/ui/page-header"
import { Book, Clock, Users, Award, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Loading } from "@/components/ui/loading"


interface Course {
  id: string
  title: string
  description: string
  duration: string
  status: string
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses')
        if (!response.ok) throw new Error('Failed to fetch courses')
        const data = await response.json()
        const publishedCourses = data.filter((course: Course) => course.status === 'PUBLISHED')
        if (publishedCourses.length === 0) {
          setError('No courses are currently available. Please check back later.')
        }
        setCourses(publishedCourses)
      } catch (error) {
        console.error('Error fetching courses:', error)
        setError('Failed to load courses. Please try again later.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    )
  }

  return (
    <>
      <PageHeader 
        title="Our Courses"
        description="Discover our specialized fashion design and tailoring courses"
      />

      <div className="container mx-auto px-4">
        {/* Programs List */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            {error ? (
              <div className="text-center text-gray-600 py-12">
                <p>{error}</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {courses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer"
                    onClick={() => router.push(`/courses/${course.id}`)}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      {course.title}
                    </h2>
                    <p className="text-gray-600 mb-6">
                      {course.description.length > 100 
                        ? `${course.description.substring(0, 100)}...`
                        : course.description}
                    </p>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700">{course.duration}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                    >
                      View Course Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-12 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose Divine College?
              </h2>
              <p className="text-lg text-gray-600">
                Experience excellence in education with our distinguished faculty and comprehensive programs
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Professional Instructors
                </h3>
                <p className="text-gray-600">
                  Learn from experienced fashion designers and industry experts
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Book className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Hands-on Training
                </h3>
                <p className="text-gray-600">
                  Practical experience with industry-standard equipment and techniques
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Industry Connections
                </h3>
                <p className="text-gray-600">
                  Network with fashion industry professionals and potential employers
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
