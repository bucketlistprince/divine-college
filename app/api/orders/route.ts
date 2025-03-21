import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

async function generateOrderNumber(): Promise<string> {
  const count = await prisma.order.count()
  return `ORD${(count + 1).toString().padStart(3, '0')}`
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
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const orderNumber = await generateOrderNumber()

    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        email: data.email || '',
        phone: data.phone,
        address: data.address,
        total: data.total,
        items: {
          create: data.items.map((item: { quantity: number; price: number; productId: string }) => ({
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

    // Update product sales and stock
    for (const item of data.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          sales: { increment: item.quantity },
          stock: { decrement: item.quantity }
        }
      })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, status } = data

    const order = await prisma.order.update({
      where: { id },
      data: { status },
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
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}
