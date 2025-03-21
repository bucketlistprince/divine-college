import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        read: false
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const orders = notifications.filter(n => n.type === 'order')
    const applications = notifications.filter(n => n.type === 'application')

    return NextResponse.json({
      orders,
      applications
    })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch notifications' },
      { status: 500 }
    )
  }
}

// Create notification when a new order is placed
export async function POST() {
  try {
    const [pendingOrders, pendingApplications] = await Promise.all([
      prisma.order.findMany({
        where: {
          status: 'PENDING'
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.studentApplication.findMany({
        where: {
          status: 'PENDING'
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ])

    // Create notifications for orders
    await Promise.all(
      pendingOrders.map(order =>
        prisma.notification.create({
          data: {
            type: 'order',
            targetId: order.id,
            title: `New Order #${order.orderNumber}`,
            message: `Order from ${order.customerName} for $${order.total.toFixed(2)}`,
          }
        })
      )
    )

    // Create notifications for applications
    await Promise.all(
      pendingApplications.map(app =>
        prisma.notification.create({
          data: {
            type: 'application',
            targetId: app.id,
            title: 'New Student Application',
            message: `Application from ${app.name} for ${app.program}`,
          }
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error creating notifications:', error)
    return NextResponse.json(
      { error: 'Failed to create notifications' },
      { status: 500 }
    )
  }
}
