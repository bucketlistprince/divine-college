import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const newsId = request.nextUrl.pathname.split('/').pop()
  
  try {
    const news = await prisma.news.findUnique({
      where: {
        id: newsId
      }
    })

    if (!news) {
      return NextResponse.json(
        { error: "News item not found" },
        { status: 404 }
      )
    }

    // Increment views
    await prisma.news.update({
      where: { id: newsId },
      data: { views: { increment: 1 } }
    })

    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news item:", error)
    return NextResponse.json(
      { error: "Failed to fetch news item" },
      { status: 500 }
    )
  }
}
