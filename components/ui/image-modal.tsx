"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { X, ZoomIn, ZoomOut, Download } from "lucide-react"
import { useState } from "react"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  item: {
    id: string
    title: string
    description: string
    image: string
  } | null
}

export function ImageModal({ isOpen, onClose, item }: ImageModalProps) {
  const [scale, setScale] = useState(1)
  const [isDragging, setIsDragging] = useState(false)

  if (!item) return null

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    setScale(prev => Math.min(prev + 0.5, 3))
  }

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    setScale(prev => Math.max(prev - 0.5, 1))
  }

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(item.image, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 z-50 p-4 overflow-hidden flex items-center justify-center"
        >
          {/* Controls */}
          <div className="fixed top-4 right-4 flex items-center gap-4 z-50">
            <button
              onClick={handleZoomOut}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ZoomOut className="w-6 h-6" />
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <ZoomIn className="w-6 h-6" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <Download className="w-6 h-6" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Image */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full h-full flex items-center justify-center"
            drag={scale > 1}
            dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            style={{ cursor: scale > 1 ? 'grab' : 'default' }}
          >
            <div
              className={`relative w-full h-full ${isDragging ? 'cursor-grabbing' : ''}`}
              style={{ maxWidth: '90vh', maxHeight: '90vh' }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain"
                sizes="90vh"
                priority
                style={{ transform: `scale(${scale})`, transition: 'transform 0.2s' }}
              />
            </div>
          </motion.div>

          {/* Caption */}
          <div className="fixed bottom-4 left-0 right-0 text-center text-white">
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.description}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
