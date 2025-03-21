"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { EventForm } from "@/components/forms/event-form"
import { Plus, Calendar, Clock, MapPin, Users, Edit, Trash2 } from "lucide-react"
import Image from 'next/image'

// Form data interface for creating/editing events
interface EventFormData {
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  status: "UPCOMING" | "ONGOING" | "PAST"
  image?: File | null
  imageUrl?: string
}

// Event interface for displaying events
interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  type: string
  attendees: number
  status: "UPCOMING" | "ONGOING" | "PAST"
  imageUrl?: string
  createdBy: string
  createdAt: string
  updatedAt: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch(`${window.location.origin}/api/events`)
      if (!response.ok) throw new Error('Failed to fetch events')
      const data = await response.json()
      setEvents(data)
    } catch (error) {
      console.error('Error fetching events:', error)
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  const filteredEvents = events.filter((event) =>
    filterStatus === "all" ? true : event.status === filterStatus
  )

  const handleAddEvent = async (data: EventFormData) => {
    try {
      let imageUrl = ""
      if (data.image) {
        const formData = new FormData()
        formData.append('file', data.image)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        if (!uploadResponse.ok) throw new Error('Failed to upload image')
        const uploadData = await uploadResponse.json()
        imageUrl = uploadData.url
      }

      const response = await fetch(`${window.location.origin}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          imageUrl: imageUrl,
          createdBy: "admin@divinecollege.edu", // This should come from auth
        })
      })

      if (!response.ok) throw new Error('Failed to create event')
      const newEvent = await response.json()
      setEvents([...events, newEvent])
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error creating event:', error)
      // Show error message to user
    }
  }

  const handleEditEvent = async (data: EventFormData) => {
    if (!editingEvent) return

    try {
      let imageUrl = editingEvent.imageUrl || ""
      if (data.image) {
        const formData = new FormData()
        formData.append('file', data.image)
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })
        if (!uploadResponse.ok) throw new Error('Failed to upload image')
        const uploadData = await uploadResponse.json()
        imageUrl = uploadData.url
      }

      const response = await fetch(`${window.location.origin}/api/events`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingEvent.id,
          ...data,
          imageUrl: imageUrl,
        })
      })

      if (!response.ok) throw new Error('Failed to update event')
      const updatedEvent = await response.json()
      setEvents(events.map(event => 
        event.id === editingEvent.id ? updatedEvent : event
      ))
      setEditingEvent(null)
    } catch (error) {
      console.error('Error updating event:', error)
      // Show error message to user
    }
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      const response = await fetch(`${window.location.origin}/api/events?id=${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Failed to delete event')
      setEvents(events.filter(event => event.id !== id))
    } catch (error) {
      console.error('Error deleting event:', error)
      // Show error message to user
    }
  }

  // Convert Event to EventFormData for the form
  const getFormData = (item: Event): EventFormData => {
    return {
      title: item.title,
      description: item.description,
      date: item.date,
      time: item.time,
      location: item.location,
      type: item.type,
      status: item.status,
      // Note: We can't convert URL back to File, so we leave it undefined
      image: undefined
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingEvent(null)
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Events Management"
        description="Organize and manage college events"
      />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>

            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="all">All Events</option>
                <option value="UPCOMING">Upcoming</option>
                <option value="ONGOING">Ongoing</option>
                <option value="PAST">Past</option>
              </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    {event.imageUrl ? (
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Calendar className="h-8 w-8 text-blue-600" />
                      </div>
                    )}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        event.status === "UPCOMING"
                          ? "bg-green-100 text-green-800"
                          : event.status === "ONGOING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {event.status.charAt(0) + event.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="p-1 hover:bg-gray-100 rounded-lg"
                      onClick={() => setEditingEvent(event)}
                    >
                      <Edit className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-100 rounded-lg"
                      onClick={() => handleDeleteEvent(event.id)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {event.attendees} Attendees
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Modal
          title={editingEvent ? "Edit Event" : "Add Event"}
          isOpen={isModalOpen || editingEvent !== null}
          onClose={() => {
            setIsModalOpen(false)
            setEditingEvent(null)
          }}
        >
          <EventForm
            initialData={editingEvent ? getFormData(editingEvent) : undefined}
            onSubmit={editingEvent ? handleEditEvent : handleAddEvent}
            onCancel={handleCloseModal}
          />
        </Modal>
      </main>
    </div>
  )
}
