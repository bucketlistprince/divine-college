import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [
      studentCount,
      courseCount,
      upcomingEventCount,
      productCount,
      photoCount,
      adminCount
    ] = await Promise.all([
      prisma.studentApplication.count(),
      prisma.course.count(),
      prisma.event.count({
        where: {
          status: 'UPCOMING'
        }
      }),
      prisma.product.count(),
      prisma.gallery.count(),
      prisma.user.count({
        where: {
          role: 'ADMIN'
        }
      })
    ])

    return NextResponse.json({
      students: {
        total: studentCount,
        label: "Total Students"
      },
      courses: {
        total: courseCount,
        label: "Active Courses"
      },
      events: {
        total: upcomingEventCount,
        label: "Upcoming Events"
      },
      products: {
        total: productCount,
        label: "Products"
      },
      gallery: {
        total: photoCount,
        label: "Photos"
      },
      admins: {
        total: adminCount,
        label: "Admin Users"
      }
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json(
      { error: "Failed to fetch admin statistics" },
      { status: 500 }
    )
  }
}
