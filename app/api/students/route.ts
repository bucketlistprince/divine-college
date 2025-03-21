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
    console.error("Error fetching applications:", error)
    return NextResponse.json(
      { error: "Failed to fetch applications" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const application = await prisma.studentApplication.create({
      data: {
        name: json.name,
        email: json.email,
        phone: json.phone,
        program: json.program,
        status: json.status || 'PENDING',
        date: json.date,
        documents: json.documents || [],
        notes: json.notes,
      }
    })
    return NextResponse.json(application)
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json()
    const application = await prisma.studentApplication.update({
      where: { id: json.id },
      data: {
        name: json.name,
        email: json.email,
        phone: json.phone,
        program: json.program,
        status: json.status,
        date: json.date,
        documents: json.documents,
        notes: json.notes,
      }
    })
    return NextResponse.json(application)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      )
    }
    await prisma.studentApplication.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    )
  }
}
