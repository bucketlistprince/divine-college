'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface CourseActionsProps {
  type: 'back' | 'apply'
  className?: string
}

export function CourseAction({ type, className = '' }: CourseActionsProps) {
  const router = useRouter()

  const handleClick = () => {
    if (type === 'back') {
      router.back()
    } else {
      router.push('/apply')
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant={type === 'apply' ? 'default' : 'outline'}
      className={className}
    >
      {type === 'apply' ? 'Apply Now' : 'Back to Courses'}
    </Button>
  )
}
