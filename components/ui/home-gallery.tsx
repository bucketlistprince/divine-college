"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: string
  updatedAt: string
}

export function HomeGallery({ limit = 6 }: { limit?: number }) {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/gallery")
        if (!res.ok) throw new Error("Failed to fetch gallery items")
        const data: GalleryItem[] = await res.json()
        // Shuffle randomly, then take the desired limit
        const shuffled = [...data].sort(() => 0.5 - Math.random())
        setItems(shuffled.slice(0, limit))
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [limit])

  if (isLoading || items.length === 0) return null

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Campus Moments</h2>
            <p className="text-gray-600 mt-2">A glimpse from our gallery</p>
          </div>
          <a
            href="/gallery"
            className="hidden md:inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition-all duration-300 text-center shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/25"
          >
            View All
          </a>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="/gallery"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:opacity-90 transition-all duration-300 text-center shadow-md shadow-indigo-600/20 hover:shadow-lg hover:shadow-indigo-600/25"
          >
            View All
          </a>
        </div>
      </div>
    </section>
  )
}
