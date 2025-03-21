"use client"

interface TruncatedContentProps {
  content: string
  className?: string
}

export function TruncatedContent({ content, className = "" }: TruncatedContentProps) {
  // Convert HTML to plain text
  const getTextContent = (html: string) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const plainText = getTextContent(content)
  const truncated = plainText.split('\n')[0] // Get first line
  
  return (
    <div className={`truncate ${className}`}>
      {truncated}
    </div>
  )
}
