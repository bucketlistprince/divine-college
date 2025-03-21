import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Get all products
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'asc' }
  })

  // Update each product with a new ID
  for (let i = 0; i < products.length; i++) {
    const newId = `PROD${(i + 1).toString().padStart(3, '0')}`
    await prisma.product.update({
      where: { id: products[i].id },
      data: { id: newId }
    })
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
