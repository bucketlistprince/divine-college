"use client"

import { Calendar, Tag, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { format, parseISO } from "date-fns"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
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
  author: string
  createdAt: string
}

export default function NewsDetail() {
  const params = useParams()
  const [news, setNews] = useState<NewsItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        if (!params?.id) return
        const response = await fetch(`/api/news/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [params?.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-red-600 min-h-[50vh] flex flex-col items-center justify-center">
            <p className="text-xl mb-4">News item not found</p>
            <Link
              href="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to News
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
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
        </div>
      </main>
    </div>
  )
}
