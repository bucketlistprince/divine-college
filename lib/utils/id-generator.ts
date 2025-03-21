import { PrismaClient } from '@prisma/client'

export async function generateProductId(prisma: PrismaClient): Promise<string> {
  // Get the count of existing products
  const count = await prisma.product.count()
  // Generate ID in format PROD001, PROD002, etc.
  const id = `PROD${(count + 1).toString().padStart(3, '0')}`
  return id
}
