import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const news = await prisma.news.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const news = await prisma.news.create({
      data: {
        title: json.title,
        content: json.content,
        category: json.category,
        author: json.author,
        publishDate: json.publishDate,
        status: json.status || 'DRAFT',
        views: 0,
        imageUrl: json.imageUrl,
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error creating news:", error)
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json()
    const news = await prisma.news.update({
      where: { id: json.id },
      data: {
        title: json.title,
        content: json.content,
        category: json.category,
        author: json.author,
        publishDate: json.publishDate,
        status: json.status,
        imageUrl: json.imageUrl,
      }
    })
    return NextResponse.json(news)
  } catch (error) {
    console.error("Error updating news:", error)
    return NextResponse.json(
      { error: "Failed to update news" },
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
        { error: "News ID is required" },
        { status: 400 }
      )
    }
    await prisma.news.delete({
      where: { id }
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting news:", error)
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    )
  }
}
