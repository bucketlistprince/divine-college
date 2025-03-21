"use client"

import { useEffect, useState } from "react"
import { format, parseISO } from "date-fns"
import { Calendar, Tag, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  publishDate: string
  status: 'DRAFT' | 'PUBLISHED'
  views: number
  imageUrl?: string
  author: string
  createdAt: string
}

interface NewsDetailProps {
  id: string
}

export function NewsDetail({ id }: NewsDetailProps) {
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsItem = async () => {
      try {
        const response = await fetch(`/api/news/${id}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('News item not found')
          }
          throw new Error('Failed to fetch news item')
        }
        const data = await response.json()
        setNews(data)
      } catch (err) {
        console.error('Error fetching news item:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNewsItem()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center text-red-600 min-h-[50vh] flex flex-col items-center justify-center">
          <p className="text-xl mb-4">{error || 'News item not found'}</p>
          <Link
            href="/news"
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Link>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <Link
          href="/news"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Link>

        {/* Article Header */}
        <article>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {news.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{format(parseISO(news.publishDate), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Tag className="w-5 h-5 mr-2" />
              <span>{news.category}</span>
            </div>
            <div className="flex items-center">
              <Eye className="w-5 h-5 mr-2" />
              <span>{news.views} views</span>
            </div>
            {news.author && (
              <div className="flex items-center">
                <span>By {news.author}</span>
              </div>
            )}
          </div>

          {/* Featured Image */}
          {news.imageUrl && (
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <Image
                src={news.imageUrl}
                alt={news.title}
                width={1200}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {news.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Share Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
          <div className="flex gap-4">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
            >
              Share on Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="px-4 py-2 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
            >
              Share on Facebook
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
