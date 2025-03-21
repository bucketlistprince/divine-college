import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma, OrderStatus } from "@prisma/client"

interface OrderItem {
  productId: string
  quantity: number
  price: number
}

interface OrderRequestData {
  userId: string
  customerName: string
  email: string
  phone: string
  address: string
  status?: OrderStatus
  total: number
  items: OrderItem[]
}

interface UpdateOrderRequestData {
  id: string
  customerName: string
  email: string
  phone: string
  address: string
  status: OrderStatus
  total: number
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(orders)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data: OrderRequestData = await request.json()
    const order = await prisma.order.create({
      data: {
        orderNumber: `ORD-${Date.now()}`,
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: data.status || 'PENDING',
        total: data.total,
        items: {
          create: data.items.map((item) => ({
            quantity: item.quantity,
            price: item.price,
            productId: item.productId
          }))
        }
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    // Create notification for new order
    await prisma.notification.create({
      data: {
        type: 'order',
        targetId: order.id,
        title: `New Order #${order.orderNumber}`,
        message: `Order from ${order.customerName} for $${order.total.toFixed(2)}`,
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Error creating order:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const data: UpdateOrderRequestData = await request.json()
    const order = await prisma.order.update({
      where: { id: data.id },
      data: {
        customerName: data.customerName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        status: data.status,
        total: data.total
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
    return NextResponse.json(order)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Error updating order:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.error("Error updating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json(
        { error: "Order ID is required" },
        { status: 400 }
      )
    }
    
    // Delete associated order items first
    await prisma.orderItem.deleteMany({
      where: { orderId: id }
    })
    
    // Then delete the order
    await prisma.order.delete({
      where: { id }
    })
    
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Error deleting order:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
