"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Loading } from "@/components/ui/loading"

interface Course {
  id: string
  title: string
  description: string
  duration: string
  status: string
}

export function Programs() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const response = await fetch("/api/courses")
        if (!response.ok) {
          throw new Error("Failed to fetch courses")
        }
        const data = await response.json()
        setCourses(data)
      } catch (error) {
        console.error("Error fetching courses:", error)
        setError("Failed to load courses. Please try again later.")
        // Fallback data
        setCourses([
          {
            id: "CRS001",
            title: "Men's & Women's Wear Design",
            description: "Master the art of designing and creating contemporary men's and women's fashion",
            duration: "2 years",
            status: "PUBLISHED",
          },
          {
            id: "CRS002",
            title: "Bridal Wear Design",
            description: "Specialize in creating stunning bridal wear and wedding attire",
            duration: "1.5 years",
            status: "PUBLISHED",
          },
          {
            id: "CRS003",
            title: "Suit Making",
            description: "Learn the fine art of bespoke tailoring and suit making",
            duration: "1.5 years",
            status: "PUBLISHED",
          },
        ])
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

  if (error) {
    return (
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-32 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#4338ca_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-[0.15]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Our Fashion Design Programs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our specialized fashion design programs to start your journey in the fashion industry
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative" 
              onClick={() => window.location.href = `/courses/${course.id}`}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-300"></div>
              <div className="relative bg-gradient-to-br from-white via-indigo-50/10 to-purple-50/10 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-gray-100 border border-gray-100 cursor-pointer">
                <div className="mb-6">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/80 text-indigo-700 ring-1 ring-indigo-100">
                    {course.duration}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {course.description}
                </p>
                <div className="flex items-center text-sm text-indigo-600 font-medium">
                  Learn more
                  <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="/courses"
            className="inline-flex items-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5"
          >
            View All Programs
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
