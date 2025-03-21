import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(events)
  } catch (error) {
    console.error("Error fetching events:", error)
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const event = await prisma.event.create({
      data: {
        title: json.title,
        description: json.description,
        date: json.date,
        time: json.time,
        location: json.location,
        type: json.type,
        imageUrl: json.imageUrl,
        attendees: 0,
        status: json.status || 'UPCOMING',
        createdBy: json.createdBy,
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error("Error creating event:", error)
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json()
    const event = await prisma.event.update({
      where: { id: json.id },
      data: {
        title: json.title,
        description: json.description,
        date: json.date,
        time: json.time,
        location: json.location,
        type: json.type,
        imageUrl: json.imageUrl,
        status: json.status,
      }
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error("Error updating event:", error)
    return NextResponse.json(
      { error: "Failed to update event" },
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
        { error: "Event ID is required" },
        { status: 400 }
      )
    }
    await prisma.event.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting event:", error)
    return NextResponse.json(
      { error: "Failed to delete event" },
      { status: 500 }
    )
  }
}
