"use client"

interface FormattedContentProps {
  content: string
  className?: string
}

export function FormattedContent({ content, className = "" }: FormattedContentProps) {
  return (
    <div 
      className={`formatted-content ${className}`}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  )
}
