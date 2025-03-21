import { prisma } from '../lib/prisma'

async function updateCourse() {
  try {
    const course = await prisma.course.update({
      where: { id: 1 },
      data: { status: 'PUBLISHED' }
    })
    console.log('Course updated successfully:', course)
  } catch (error) {
    console.error('Error updating course:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateCourse()
