"use client"

import { NavigationProvider } from "@/components/providers/navigation-provider"
import { Navigation } from "@/components/navigation"
import { ConditionalFooter } from "@/components/ui/conditional-footer"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavigationProvider>
      <div className="flex min-h-screen flex-col">
        <header className="fixed inset-x-0 top-0 z-50">
          <Navigation />
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <ConditionalFooter />
      </div>
    </NavigationProvider>
  )
}
