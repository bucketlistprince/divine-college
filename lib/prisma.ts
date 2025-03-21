import { PrismaClient, Prisma } from '@prisma/client'

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    log: ['error', 'warn'],
    errorFormat: 'minimal',
  })

  // Add connection retry logic
  const maxRetries = 3
  client.$use(async (params, next) => {
    let retries = 0
    
    while (retries < maxRetries) {
      try {
        return await next(params)
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          // If it's a connection error, retry
          if (error.code === 'P1001' || error.code === 'P1002') {
            retries++
            if (retries === maxRetries) {
              throw error
            }
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, retries) * 1000))
            continue
          }
        }
        throw error
      }
    }
  })

  return client
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// In development, this ensures we don't create multiple connections
const globalForPrisma = globalThis as { prisma?: PrismaClientSingleton }

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
