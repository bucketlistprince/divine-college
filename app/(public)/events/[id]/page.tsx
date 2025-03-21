"use client"

import { Calendar, MapPin, Clock, Users, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { format, parseISO } from "date-fns"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { PageHeader } from "@/components/ui/page-header"

interface EventItem {
  id: string
  title: string
  description: string
  imageUrl?: string
  date: string
  time: string
  location: string
  type: string
  attendees: number
  status: 'UPCOMING' | 'ONGOING' | 'PAST'
  createdBy: string
  createdAt: string
}

export default function EventPage() {
  const params = useParams()
  const [event, setEvent] = useState<EventItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        if (!params?.id) return
        const response = await fetch(`/api/events/${params.id}`)
        if (!response.ok) throw new Error("Failed to fetch event")
        const data = await response.json()
        setEvent(data)
      } catch (err) {
        console.error("Error fetching event:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchEvent()
  }, [params?.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center text-red-600 min-h-[50vh] flex flex-col items-center justify-center">
            <p className="text-xl mb-4">Event not found</p>
            <Link
              href="/events"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <PageHeader 
        title={event.title}
        description={`Join us for this exciting event on ${format(parseISO(event.date), "MMMM d, yyyy")}`}
      />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/events"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Link>

          {/* Event Header */}
          <article>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {event.title}
            </h1>

            {/* Event Details */}
            <div className="flex flex-wrap gap-6 mb-8 text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{format(parseISO(event.date), 'MMMM dd, yyyy')}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>{event.attendees} attendees</span>
              </div>
            </div>

            {/* Featured Image */}
            {event.imageUrl && (
              <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
                <Image
                  src={event.imageUrl}
                  alt={event.title}
                  width={1200}
                  height={400}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            {/* Event Description */}
            <div className="prose prose-lg max-w-none">
              {event.description.split('\n').map((paragraph, index) => (
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
