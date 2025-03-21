import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    console.log('Fetching photos from database')
    const photos = await prisma.gallery.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    console.log('Fetched photos:', photos)
    return NextResponse.json(photos)
  } catch (error) {
    console.error("Error fetching photos:", error)
    return NextResponse.json(
      { error: "Failed to fetch photos" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    console.log('Creating photo with data:', json)
    const photo = await prisma.gallery.create({
      data: {
        title: json.title,
        description: json.description,
        category: json.category,
        image: json.image,
        uploadedBy: json.uploadedBy,
        uploadedAt: new Date().toISOString().split('T')[0],
      }
    })
    console.log('Created photo:', photo)
    return NextResponse.json(photo)
  } catch (error) {
    console.error("Error creating photo:", error)
    return NextResponse.json(
      { error: "Failed to create photo" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json()
    const photo = await prisma.gallery.update({
      where: { id: json.id },
      data: {
        title: json.title,
        description: json.description,
        category: json.category,
        image: json.imageUrl,
      }
    })
    return NextResponse.json(photo)
  } catch (error) {
    console.error("Error updating photo:", error)
    return NextResponse.json(
      { error: "Failed to update photo" },
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
        { error: "Photo ID is required" },
        { status: 400 }
      )
    }

    // First check if the photo exists
    const photo = await prisma.gallery.findUnique({
      where: { id }
    })

    if (!photo) {
      return NextResponse.json(
        { error: "Photo not found" },
        { status: 404 }
      )
    }

    await prisma.gallery.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting photo:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete photo" },
      { status: 500 }
    )
  }
}
