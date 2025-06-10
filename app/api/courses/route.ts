import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

interface CourseData {
  title: string
  description: string
  duration: string
  status: 'DRAFT' | 'PUBLISHED'
}

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        duration: true,
        status: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(courses)
  } catch (error) {
    console.error('Error fetching courses:', error)
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json() as CourseData
    const course = await prisma.course.create({
      data: {
        title: json.title,
        description: json.description,
        duration: json.duration,
        status: json.status
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.error('Error creating course:', error)
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const json = await request.json() as CourseData & { id: number }
    const course = await prisma.course.update({
      where: { id: json.id },
      data: {
        title: json.title,
        description: json.description,
        duration: json.duration,
        status: json.status
      }
    })
    return NextResponse.json(course)
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      )
    }

    const course = await prisma.course.delete({
      where: { id: Number(id) }
    })
    
    return NextResponse.json(course)
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
}
