"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Download, Mail, Phone, User } from "lucide-react"
import { StudentModal } from "@/components/ui/student-modal"

interface Application {
  id: string
  name: string
  email: string
  phone: string
  program: string
  status: string
  documents: string[]
}

export default function StudentsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [selectedStudent, setSelectedStudent] = useState<Application | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('/api/applications')
        if (!response.ok) throw new Error('Failed to fetch applications')
        const data = await response.json()
        setApplications(data)
      } catch (error) {
        console.error('Error fetching applications:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const handleViewDetails = (application: Application) => {
    setSelectedStudent(application)
    setIsModalOpen(true)
  }

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      // Update the applications list
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, status: newStatus } : app
        )
      )

      // Close the modal
      setIsModalOpen(false)
    } catch (error) {
      console.error('Error updating application status:', error)
    }
  }

  const filteredApplications = applications.filter(application =>
    application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    application.program.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  return (
    <div>
      <PageHeader 
        title="Student Applications"
        description="View and manage student applications"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Input
            placeholder="Search by name, email, or program..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Program</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">{application.name}</div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {application.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {application.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.program}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${application.status === 'PENDING_FOLLOWUP' ? 'bg-yellow-100 text-yellow-800' :
                        application.status === 'FOLLOWED_UP' ? 'bg-blue-100 text-blue-800' :
                        application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                      {application.status === 'PENDING_FOLLOWUP' ? 'Pending Follow-up' :
                        application.status === 'FOLLOWED_UP' ? 'Followed up' :
                        application.status === 'ACCEPTED' ? 'Accepted' : 'Rejected'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleViewDetails(application)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(application.documents[0], '_blank')}
                        disabled={!application.documents?.length}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <StudentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          student={selectedStudent}
          onUpdateStatus={handleStatusUpdate}
        />
      </div>
    </div>
  )
}
