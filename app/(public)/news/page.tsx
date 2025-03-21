"use client"

import { useEffect, useState } from "react"
import { 
  Calendar,
  User,
  Search,
  Tag,
  Eye
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format, parseISO } from "date-fns"
import { Navigation } from "@/components/navigation"
import { Loading } from "@/components/ui/loading"

interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  author: string
  publishDate: string
  imageUrl?: string
  status: 'DRAFT' | 'PUBLISHED'
  views: number
}

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        // Filter only published news
        const publishedNews = data.filter((item: NewsItem) => item.status === 'PUBLISHED')
        setNewsItems(publishedNews)
      } catch (err) {
        console.error('Error fetching news:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const categories = ["All", ...new Set(newsItems.map(item => item.category))]

  const filteredNews = newsItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort by publishDate, most recent first
  const sortedNews = [...filteredNews].sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  )

  // Separate featured (most recent) news from regular news
  const featuredNews = sortedNews.slice(0, 1)
  const regularNews = sortedNews.slice(1)

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <Loading />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h1>
          <p className="text-lg text-gray-600">Stay informed about the latest happenings at Divine College</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured News */}
        {featuredNews.map(item => (
          <Link href={`/news/${item.id}`} key={item.id}>
            <div className="mb-12 bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              {item.imageUrl ? (
                <div className="relative h-[400px]">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={1200}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-[400px] bg-blue-50 flex items-center justify-center">
                  <span className="text-blue-300 text-lg">Featured Article</span>
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Featured
                  </span>
                  <span className="inline-flex items-center text-sm text-gray-500">
                    <Tag className="h-4 w-4 mr-1" />
                    {item.category}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{item.title}</h2>
                <p className="text-gray-600 mb-6">
                  {item.content.length > 200 ? `${item.content.slice(0, 200)}...` : item.content}
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <span className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    {item.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(parseISO(item.publishDate), 'MMMM dd, yyyy')}
                  </span>
                  <span className="flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    {item.views} views
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularNews.map(item => (
            <Link href={`/news/${item.id}`} key={item.id}>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {item.imageUrl ? (
                  <div className="relative h-48">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-300">Article Image</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(parseISO(item.publishDate), 'MMMM dd, yyyy')}
                    </span>
                    <span className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" />
                      {item.views} views
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
