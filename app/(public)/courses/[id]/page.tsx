import { CourseAction } from "@/components/ui/course-actions"
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { Metadata } from "next"

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params
  const courseId = parseInt(resolvedParams.id)
  
  if (isNaN(courseId)) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found."
    }
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      title: true,
      description: true
    }
  })

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found."
    }
  }

  return {
    title: course.title,
    description: course.description
  }
}

export default async function CoursePage({ params }: Props) {
  const resolvedParams = await params
  const courseId = parseInt(resolvedParams.id)
  
  if (isNaN(courseId)) {
    notFound()
  }

  const course = await prisma.course.findUnique({
    where: { id: courseId },
    select: {
      id: true,
      title: true,
      description: true,
      duration: true,
      status: true
    }
  })

  if (!course) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <CourseAction type="back" />
        <h1 className="text-4xl font-bold text-gray-900 mt-4">{course.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mt-2">
          <span>Duration: {course.duration}</span>
          <span>•</span>
          <span>Status: {course.status}</span>
        </div>
      </div>

      <div className="prose max-w-none mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Description</h2>
        <div className="text-gray-600">{course.description}</div>
      </div>

      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Let&apos;s Begin Your Journey</h2>
        <p className="text-gray-600 text-center max-w-2xl mb-8">
          Take the first step towards your future. Apply now and join our community of learners.
        </p>
        <CourseAction type="apply" className="w-full max-w-md" />
      </div>
    </div>
  )
}
