"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { ImageModal } from "@/components/ui/image-modal"
import { Loading } from "@/components/ui/loading"
import { Image as ImageIcon, Users, Bookmark, GraduationCap } from "lucide-react"

interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: string
  updatedAt: string
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await fetch('/api/gallery')
        if (!response.ok) throw new Error('Failed to fetch gallery items')
        const data = await response.json()
        setGalleryItems(data)
      } catch (error) {
        console.error('Error fetching gallery items:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchGalleryItems()
  }, [])

  const handleImageClick = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    )
  }

  // Get unique categories from gallery items
  const categories = [
    { title: "All", icon: <ImageIcon className="w-6 h-6" />, active: !selectedCategory },
    ...Array.from(new Set(galleryItems.map(item => item.category)))
      .map(category => ({
        title: category,
        icon: category === "Campus Life" ? <Users className="w-6 h-6" /> :
             category === "Academic" ? <GraduationCap className="w-6 h-6" /> :
             <Bookmark className="w-6 h-6" />,
        active: category === selectedCategory
      }))
  ]

  const filteredItems = selectedCategory
    ? galleryItems.filter(item => item.category === selectedCategory)
    : galleryItems

  return (
    <div className="bg-white">
      <Navigation />
      <PageHeader 
        title="Photo Gallery"
        description="Explore life at Divine College through our lens"
      />

      {/* Category Filter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category.title === "All" ? null : category.title)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full ${
                  category.active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition-colors`}
              >
                {category.icon}
                <span className="font-medium">{category.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Image Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl shadow-lg aspect-[4/3] bg-gray-200 cursor-pointer transform hover:scale-105 transition-transform"
                onClick={() => handleImageClick(item)}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="text-xl font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-200">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Photos CTA */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <ImageIcon className="w-16 h-16 mx-auto mb-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Share Your Moments
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Are you a student or alumni with great photos of Divine College? Share them with our community!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Submit Photos
            </button>
          </motion.div>
        </div>
      </section>

      {/* Image Modal */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem}
      />
    </div>
  )
}
