'use client'

import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface StudentModalProps {
  isOpen: boolean
  onClose: () => void
  student: {
    id: string
    name: string
    email: string
    phone: string
    program: string
    status: string
    documents: string[]
  } | null
  onUpdateStatus?: (id: string, status: string) => void
}

export function StudentModal({ isOpen, onClose, student, onUpdateStatus }: StudentModalProps) {
  if (!student) return null

  const handleStatusUpdate = async (newStatus: string) => {
    if (onUpdateStatus) {
      onUpdateStatus(student.id, newStatus)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 p-4 overflow-y-auto flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-900">Student Application</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="mt-1 text-base text-gray-900">{student.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Program</h3>
                  <p className="mt-1 text-base text-gray-900">{student.program}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-base text-gray-900">{student.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                  <p className="mt-1 text-base text-gray-900">{student.phone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${student.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                        student.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'}`}
                    >
                      {student.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status Actions */}
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Update Status</h3>
                <select
                  value={student.status}
                  onChange={(e) => handleStatusUpdate(e.target.value)}
                  className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="PENDING_FOLLOWUP">Pending Follow-up</option>
                  <option value="FOLLOWED_UP">Followed up</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              {/* Documents */}
              {student.documents.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Documents</h3>
                  <div className="space-y-3">
                    {student.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-sm text-gray-700">{doc}</span>
                        <button
                          onClick={() => window.open(doc, '_blank')}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              {student.status === 'PENDING' && onUpdateStatus && (
                <div className="mt-8 flex gap-4">
                  <Button
                    onClick={() => handleStatusUpdate('APPROVED')}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    Approve Application
                  </Button>
                  <Button
                    onClick={() => handleStatusUpdate('REJECTED')}
                    variant="destructive"
                  >
                    Reject Application
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
