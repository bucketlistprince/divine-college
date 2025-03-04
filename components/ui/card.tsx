import { ReactNode } from "react"

interface CardProps {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {children}
    </div>
  )
}

interface CardHeaderProps {
  children: ReactNode
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="mb-4">
      {children}
    </div>
  )
}

interface CardTitleProps {
  children: ReactNode
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <h2 className="text-xl font-semibold">
      {children}
    </h2>
  )
}

interface CardContentProps {
  children: ReactNode
}

export function CardContent({ children }: CardContentProps) {
  return (
    <div>
      {children}
    </div>
  )
}
