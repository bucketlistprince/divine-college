"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { Calendar, Clock, MapPin, Users } from "lucide-react"
import Image from "next/image"
import { format, parseISO } from "date-fns"

interface Event {
  id: string
  title: string
  description: string
  imageUrl?: string
  date: string
  time: string
  location: string
  type: string
  attendees: number
  status: "UPCOMING" | "ONGOING" | "PAST"
  createdAt: string
  updatedAt: string
}

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([])
  const [pastEvents, setPastEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) throw new Error("Failed to fetch events")
        const events: Event[] = await response.json()

        // Sort events by date
        const sortedEvents = events.sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        )

        // Split into upcoming and past events
        const now = new Date()
        setUpcomingEvents(
          sortedEvents.filter(event => 
            new Date(event.date) >= now && event.status === "UPCOMING"
          )
        )
        setPastEvents(
          sortedEvents.filter(event => 
            new Date(event.date) < now || event.status === "PAST"
          )
        )
      } catch (error) {
        console.error("Error fetching events:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
        <Navigation />
        <PageHeader 
          title="Events"
          description="Stay updated with our latest events and activities"
        />
        <div className="container mx-auto px-4 py-20">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-16"></div>
            <div className="grid md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-gray-100 h-96 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <Navigation />
      <PageHeader 
        title="Events"
        description="Stay updated with our latest events and activities"
      />

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join us for these exciting events and be part of our vibrant community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                {event.imageUrl && (
                  <div className="relative h-48">
                    <Image
                      src={event.imageUrl}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {event.description}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">
                        {format(parseISO(event.date), "MMMM d, yyyy")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="text-gray-700">{event.attendees} Attendees</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {upcomingEvents.length === 0 && (
            <div className="text-center text-gray-600 py-12">
              No upcoming events at the moment. Check back soon!
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Past Events
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Relive the memories of our previous events
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {pastEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md mb-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {event.imageUrl ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={event.imageUrl}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>{format(parseISO(event.date), "MMMM d, yyyy")}</span>
                      <span>{event.time}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {pastEvents.length === 0 && (
              <div className="text-center text-gray-600 py-12">
                No past events to display.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center bg-blue-600 text-white p-12 rounded-2xl"
          >
            <Users className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              Want to Host an Event?
            </h2>
            <p className="text-lg mb-8">
              We welcome proposals for academic and cultural events that enrich our community
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Submit Proposal
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
