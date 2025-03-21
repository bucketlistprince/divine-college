import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'User not found' }), {
        status: 404,
      })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error('[USER_GET]', error)
    return new NextResponse(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
    })
  }
}
