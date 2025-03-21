"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface FormSubmitButtonProps {
  isSubmitting: boolean
  isEditing?: boolean
  submitText?: string
  loadingText?: string
  children?: React.ReactNode
}

export function FormSubmitButton({
  isSubmitting,
  isEditing = false,
  submitText,
  loadingText,
  children
}: FormSubmitButtonProps) {
  const defaultSubmitText = isEditing ? "Update" : "Add"
  const defaultLoadingText = isEditing ? "Updating..." : "Adding..."

  return (
    <Button 
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText || defaultLoadingText}
        </>
      ) : (
        children || submitText || defaultSubmitText
      )}
    </Button>
  )
}
