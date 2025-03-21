"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { NewsForm } from "@/components/forms/news-form"
import {
  Plus,
  FileText,
  Tag,
  Edit,
  Trash2,
  Eye,
  Clock,
  User,
} from "lucide-react"
import Image from "next/image"

// Form data interface for creating/editing news
interface NewsFormData {
  title: string
  content: string
  category: string
  publishDate: string
  status: "DRAFT" | "PUBLISHED"
  image?: File | null
  imageUrl?: string
  author?: string
}

// News item interface for displaying news
interface NewsItem {
  id: string
  title: string
  content: string
  category: string
  author: string
  publishDate: string
  status: "DRAFT" | "PUBLISHED"
  views: number
  imageUrl?: string
}

const categories = ["All", "Announcements", "Events", "Achievements", "Academic", "Student Life"]

export default function NewsPage() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news')
      if (!response.ok) throw new Error('Failed to fetch news')
      const data = await response.json()
      setNewsItems(data)
    } catch (error) {
      console.error('Error fetching news:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredNews = newsItems.filter((item) => {
    const categoryMatch = selectedCategory === "All" || item.category === selectedCategory
    const statusMatch =
      selectedStatus === "all" ||
      (selectedStatus === "PUBLISHED" && item.status === "PUBLISHED") ||
      (selectedStatus === "DRAFT" && item.status === "DRAFT")
    return categoryMatch && statusMatch
  })

  const handleAddNews = async (data: NewsFormData) => {
    try {
      let imageUrl = undefined;
      
      if (data.image) {
        // Upload image to Vercel Blob
        const formData = new FormData();
        formData.append('file', data.image);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          imageUrl: imageUrl, 
          author: "Admin Team",
          publishDate: new Date().toISOString().split("T")[0],
        })
      })

      if (!response.ok) throw new Error('Failed to create news')
      const newNews = await response.json()
      setNewsItems([...newsItems, newNews])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating news:', error)
    }
  }

  const handleEditNews = async (data: NewsFormData) => {
    if (!editingNews) return

    try {
      let imageUrl = editingNews.imageUrl;
      
      if (data.image) {
        // Upload new image to Vercel Blob
        const formData = new FormData();
        formData.append('file', data.image);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      const response = await fetch('/api/news', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingNews.id,
          ...data,
          imageUrl: imageUrl, 
        })
      })

      if (!response.ok) throw new Error('Failed to update news')
      const updatedNews = await response.json()
      setNewsItems(newsItems.map(news => 
        news.id === editingNews.id ? updatedNews : news
      ))
      setEditingNews(null)
    } catch (error) {
      console.error('Error updating news:', error)
    }
  }

  const handleDeleteNews = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news item?")) return

    try {
      const response = await fetch(`/api/news?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete news')
      setNewsItems(newsItems.filter(news => news.id !== id))
    } catch (error) {
      console.error('Error deleting news:', error)
    }
  }

  // Convert NewsItem to NewsFormData for the form
  const getFormData = (item: NewsItem): NewsFormData => {
    return {
      title: item.title,
      content: item.content,
      category: item.category,
      publishDate: item.publishDate,
      status: item.status,
      image: null,
      imageUrl: item.imageUrl,
      author: item.author
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingNews(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="News Management"
        description="Create and manage college news and announcements"
      />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="w-full sm:w-auto">
              <Button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Create News
              </Button>
            </div>

            <div className="w-full sm:w-auto">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full sm:w-auto rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="all">All Status</option>
                <option value="PUBLISHED">Published</option>
                <option value="DRAFT">Draft</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* News Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <FileText className="h-5 w-5" />
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "PUBLISHED"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status.charAt(0) + item.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="p-1 hover:bg-gray-100 rounded-lg"
                      onClick={() => setEditingNews(item)}
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-lg"
                      onClick={() => handleDeleteNews(item.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                  {item.content}
                </p>

                <div className="mt-4 grid grid-cols-2 sm:flex sm:flex-wrap gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    <span>{item.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{item.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{item.views} views</span>
                  </div>
                </div>

                {item.imageUrl && (
                  <div className="mt-4">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={800}
                      height={400}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Modal
          title={editingNews ? "Edit News" : "Add News"}
          isOpen={isModalOpen || editingNews !== null}
          onClose={handleCloseModal}
        >
          <NewsForm
            initialData={editingNews ? getFormData(editingNews) : undefined}
            onSubmit={editingNews ? handleEditNews : handleAddNews}
            onCancel={handleCloseModal}
            categories={categories.filter(cat => cat !== "All")}
          />
        </Modal>
      </main>
    </div>
  )
}
