import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: {
        status: 'AVAILABLE',
        stock: {
          gt: 0
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(products)
  } catch (error: unknown) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    console.log('Received data:', data)
    
    // Validate required fields
    const name = data.title || data.name;
    if (!name || !data.description || !data.price || data.stock === undefined || !data.status) {
      console.error('Missing required fields:', { 
        hasName: !!name, 
        hasDescription: !!data.description,
        hasPrice: !!data.price,
        hasStock: data.stock !== undefined,
        hasStatus: !!data.status
      });
      return NextResponse.json(
        { error: 'Missing required fields. Required: title/name, description, price, stock, status' },
        { status: 400 }
      )
    }

    // Validate numeric fields
    const price = parseFloat(data.price)
    const stock = parseInt(data.stock)
    
    if (isNaN(price) || price < 0) {
      return NextResponse.json(
        { error: 'Invalid price value' },
        { status: 400 }
      )
    }

    if (isNaN(stock) || stock < 0) {
      return NextResponse.json(
        { error: 'Invalid stock value' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['AVAILABLE', 'UNAVAILABLE', 'LOW_STOCK']
    if (!validStatuses.includes(data.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }

    const productData: Prisma.ProductCreateInput = {
      name: name.trim(),
      description: data.description.trim(),
      category: data.category ? data.category.trim() : 'General',
      price,
      stock,
      status: data.status,
      images: Array.isArray(data.images) ? data.images : (data.images ? [data.images] : []),
      sales: 0
    }
    
    const product = await prisma.product.create({
      data: productData
    })
    
    return NextResponse.json(product)
  } catch (error: unknown) {
    console.error('Error creating product:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json()
    const { id, images, ...rest } = data // Changed from imageUrls to images
    
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...rest,
        images: images || [] // Changed from imageUrls to images
      }
    })
    
    return NextResponse.json(product)
  } catch (error: unknown) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
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
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error: unknown) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}