import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const applications = await prisma.studentApplication.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const course = await prisma.course.findUnique({
      where: { id: parseInt(data.courseId) }
    })

    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      )
    }

    const application = await prisma.studentApplication.create({
      data: {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        program: course.title,
        notes: data.message || '',
        status: 'PENDING',
        date: new Date().toISOString().split('T')[0],
        documents: []
      }
    })

    // Create notification for new application
    await prisma.notification.create({
      data: {
        type: 'application',
        targetId: application.id,
        title: 'New Student Application',
        message: `Application from ${application.name} for ${application.program}`,
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error creating application:', error)
    return NextResponse.json(
      { error: 'Failed to create application' },
      { status: 500 }
    )
  }
}
