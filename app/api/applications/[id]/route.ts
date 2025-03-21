import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
  try {
    const { id } = await params
    const data = await req.json()
    const { status } = data

    if (!status || !['PENDING_FOLLOWUP', 'FOLLOWED_UP', 'ACCEPTED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const application = await prisma.studentApplication.update({
      where: { id },
      data: { status }
    })

    // Create notification for status update
    await prisma.notification.create({
      data: {
        type: 'status_update',
        targetId: application.id,
        title: 'Application Status Updated',
        message: `Application status for ${application.name} changed to ${status}`,
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json({ error: 'Failed to update application' }, { status: 500 })
  }
}
