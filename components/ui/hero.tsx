"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const heroContent = [
  {
    image: "/images/hero-1.jpeg",
    title: "Welcome to Divine College of Creative Arts",
    description: "Discover a world of opportunities at Divine College. We offer exceptional education that prepares you for success in your chosen field."
  },
  {
    image: "/images/hero-2.jpeg",
    title: "Nurturing Creative Excellence",
    description: "Join a vibrant community of artists and innovators. Our state-of-the-art facilities and expert faculty help bring your creative vision to life."
  },
  {
    image: "/images/hero-3.jpg",
    title: "Shape Your Future",
    description: "Experience hands-on learning in a supportive environment. Our industry connections help launch successful careers in the creative arts."
  }
]

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1) // Move right
      setCurrentIndex((prev) => (prev + 1) % heroContent.length)
    }, 8000) // Switch every 5 seconds

    return () => clearInterval(timer)
  }, [])

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gray-900 pt-[4rem]">
      {/* Background Images */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={`bg-${currentIndex}`}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? '100%' : '-100%',
                zIndex: 1
              }),
              center: {
                x: 0,
                zIndex: 2
              },
              exit: (direction: number) => ({
                x: direction < 0 ? '100%' : '-100%',
                zIndex: 0
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0 }
            }}
            className="absolute inset-0 will-change-transform"
            style={{ 
              position: 'absolute',
              width: '100%',
              height: '100%'
            }}
          >
            <div className="relative w-full h-full">
              <Image
                src={heroContent[currentIndex].image}
                alt={`Divine College - ${heroContent[currentIndex].title}`}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              {/* Modern overlay with multiple gradients */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/95 via-indigo-900/80 to-purple-900/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-indigo-900/40 to-purple-900/30" />
                <div className="absolute inset-0 backdrop-blur-[2px]" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative h-full min-h-[calc(100vh-4rem)] flex items-center z-10">
        <div className="container mx-auto py-20 px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-4xl text-white"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-indigo-100">
                {heroContent[currentIndex].title.split(" ").map((word, i) => (
                  <span 
                    key={i} 
                    className={`inline-block mr-2 sm:mr-3 md:mr-4 ${i === 3 ? "bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent" : ""}`}
                  >
                    {word}
                  </span>
                ))}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 md:mb-10 leading-relaxed max-w-3xl">
                {heroContent[currentIndex].description}
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <Link
                  href="/courses"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 text-base sm:text-lg font-medium text-center shadow-lg shadow-indigo-600/25 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5"
                >
                  Explore Courses
                </Link>
                <Link
                  href="/apply"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/10 text-white border border-indigo-200/30 backdrop-blur rounded-lg hover:bg-white/20 transition-all duration-300 text-base sm:text-lg font-medium text-center shadow-lg shadow-black/5 hover:shadow-xl hover:shadow-black/10 hover:-translate-y-0.5 hover:border-indigo-200/40"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
        {heroContent.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentIndex === index 
                ? "bg-indigo-400 w-6 sm:w-8" 
                : "bg-white/50 hover:bg-indigo-300/70"
            }`}
          />
        ))}
      </div>
    </section>
  )
}
