"use client"

import { Hero } from "@/components/ui/hero"
import { Features } from "@/components/ui/features"
import { Programs } from "@/components/ui/programs"
import { NewsAndEvents } from "@/components/ui/news-and-events"
import { CTA } from "@/components/ui/cta"

export default function Home() {
  return (
    <div className="relative bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#818cf8_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />
        <div className="absolute top-0 -left-1/2 w-[200%] h-[100vh] bg-gradient-to-br from-purple-500/5 via-indigo-500/5 to-transparent rotate-12 transform-gpu" />
      </div>
      <Hero />
      <Features />
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 to-white pointer-events-none" />
        <div className="relative">
          <Programs />
        </div>
      </div>
      <div className="bg-white">
        <NewsAndEvents />
        <CTA />
      </div>
    </div>
  )
}
