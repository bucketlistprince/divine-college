import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { prisma } from "@/lib/prisma"
import { ShopContent } from "./shop-content"

async function getProducts() {
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
    return products
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

export default async function ShopPage() {
  const products = await getProducts()

  return (
    <div className="bg-white">
      <Navigation />
      <PageHeader 
        title="College Store"
        description="Show your Divine College pride with our official merchandise"
      />
      <ShopContent products={products} />
    </div>
  )
}
