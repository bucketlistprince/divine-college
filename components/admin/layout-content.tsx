"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/components/providers/sidebar-provider"

interface LayoutContentProps {
  children: ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { isCollapsed } = useSidebar()

  return (
    <div className={cn(
      "transition-all duration-300 pt-16",
      "pl-0",
      "lg:pl-64",
      isCollapsed && "lg:pl-16"
    )}>
      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  )
}
