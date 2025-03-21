"use client"

interface FormSuccessProps {
  message: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) return null

  return (
    <div className="bg-green-50 text-green-800 p-4 rounded-lg mb-4">
      {message}
    </div>
  )
}
