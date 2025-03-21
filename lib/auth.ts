import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

const prisma = new PrismaClient()

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function getCurrentUser() {
  try {
    // Get the token from cookies
    const cookieStore = await cookies()
    const token = cookieStore.get('auth-token')?.value

    if (!token) {
      return null
    }

    // Verify the token
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    )

    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        id: payload.sub as string
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    })

    return user
  } catch (error) {
    console.error('Error fetching current user:', error)
    return null
  }
}
