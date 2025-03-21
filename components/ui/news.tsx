"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Tag } from "lucide-react"
import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { Loading } from "@/components/ui/loading"

interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  publishDate: string
  status: 'DRAFT' | 'PUBLISHED'
  views: number
  imageUrl?: string
  createdAt: string
}

export function News() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        // Filter only published news and take the latest 3
        const publishedNews = data
          .filter((item: NewsItem) => item.status === 'PUBLISHED')
          .slice(0, 3)
        setNews(publishedNews)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </section>
    )
  }

  if (news.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            No news available at the moment.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Latest News & Events
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings at Divine College
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              {item.imageUrl && (
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-blue-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">{format(parseISO(item.publishDate), 'MMMM dd, yyyy')}</span>
                </div>
                <div className="flex items-center text-blue-600">
                  <Tag className="w-4 h-4 mr-2" />
                  <span className="text-sm">{item.category}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {item.content.length > 150 ? `${item.content.slice(0, 150)}...` : item.content}
              </p>
              <Link
                href={`/news/${item.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-700"
              >
                Read More
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/news"
            className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-block"
          >
            View All News
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
