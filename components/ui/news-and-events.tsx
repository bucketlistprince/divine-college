"use client"

import { useState, useEffect } from "react"
import { format, parseISO } from "date-fns"
import { Calendar, MapPin, Users, Clock, Tag, User, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Loading } from "@/components/ui/loading"

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
  type: "news"
}

interface EventItem {
  id: string
  title: string
  description: string
  imageUrl?: string
  date: string
  time: string
  location: string
  type: "event"
  attendees: number
  status: "UPCOMING" | "ONGOING" | "PAST"
}

type FeedItem = (NewsItem | EventItem) & {
  timestamp: Date
}

export function NewsAndEvents() {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        // Fetch both news and events
        const [newsResponse, eventsResponse] = await Promise.all([
          fetch("/api/news"),
          fetch("/api/events")
        ])

        if (!newsResponse.ok || !eventsResponse.ok) {
          throw new Error("Failed to fetch feed items")
        }

        const newsData: NewsItem[] = await newsResponse.json()
        const eventsData: EventItem[] = await eventsResponse.json()

        // Convert and combine feed items
        const newsItems: FeedItem[] = newsData
          .filter(item => item.status === "PUBLISHED")
          .map(item => ({
            ...item,
            type: "news" as const,
            timestamp: new Date(item.publishDate)
          }))

        const eventItems: FeedItem[] = eventsData
          .filter(item => item.status === "UPCOMING")
          .map(item => ({
            ...item,
            type: "event" as const,
            timestamp: new Date(item.date)
          }))

        // Combine and sort by date
        const combinedFeed = [...newsItems, ...eventItems]
          .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
          .slice(0, 3) // Only take the latest 3 items

        setFeedItems(combinedFeed)
      } catch (error) {
        console.error("Error fetching feed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFeed()
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </div>
    )
  }

  if (feedItems.length === 0) {
    return null
  }

  return (
    <section className="py-32 bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#4338ca_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.15]" />
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-5xl font-bold text-gray-900 mb-20 tracking-tight text-center">Latest Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedItems.map((item) => (
            <Link
              key={item.id}
              href={item.type === "news" ? `/news/${item.id}` : `/events/${item.id}`}
              className="group relative block"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-300" />
              <div className="relative h-full bg-white rounded-2xl p-8 ring-1 ring-gray-100">
                {item.imageUrl && (
                  <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.type === "news" ? "bg-indigo-50 text-indigo-700" : "bg-purple-50 text-purple-700"
                    }`}>
                      {item.type === "news" ? "News" : "Event"}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 line-clamp-2">
                    {item.type === "news" ? item.content : item.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-gray-100">
                    {item.type === "news" ? (
                      <>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>{format(parseISO(item.publishDate), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <User className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Tag className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>{item.category}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Eye className="h-4 w-4 mr-2 text-indigo-500" />
                          <span>{item.views} views</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center text-gray-500">
                          <Calendar className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{format(parseISO(item.date), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Clock className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{item.time}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{item.location}</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <Users className="h-4 w-4 mr-2 text-purple-500" />
                          <span>{item.attendees} Attendees</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
