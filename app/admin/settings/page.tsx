"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { UserForm } from "@/components/forms/user-form"
import {
  User as UserIcon,
  Shield,
  Bell,
  Mail,
  Globe,
  Database,
  Save,
  UserPlus,
  Pencil,
} from "lucide-react"

type BaseField = {
  label: string;
  type: string;
}

type SwitchField = BaseField & {
  type: "switch";
  value: boolean;
}

type SelectField = BaseField & {
  type: "select";
  value: string;
  options: string[];
}

type NumberField = BaseField & {
  type: "number";
  value: number;
}

type TextField = BaseField & {
  type: "text";
  value: string;
}

type SettingField = SwitchField | SelectField | NumberField | TextField;

type SettingSection = {
  title: string;
  icon: React.ElementType;
  description: string;
  fields: SettingField[];
}

interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "STAFF" | "USER"
  createdAt: string
}

interface UserFormData {
  id?: string
  name: string
  email: string
  password: string
  role: "ADMIN" | "STAFF" | "USER"
}

const settingSections: SettingSection[] = [
  {
    title: "User Management",
    icon: UserIcon,
    description: "Manage admin users and permissions",
    fields: [
      {
        label: "Enable User Registration",
        type: "switch",
        value: true,
      },
      {
        label: "Default User Role",
        type: "select",
        value: "editor",
        options: ["admin", "editor", "viewer"],
      },
    ],
  },
  {
    title: "Security",
    icon: Shield,
    description: "Configure security settings and access controls",
    fields: [
      {
        label: "Two-Factor Authentication",
        type: "switch",
        value: true,
      },
      {
        label: "Session Timeout (minutes)",
        type: "number",
        value: 30,
      },
    ],
  },
  {
    title: "Notifications",
    icon: Bell,
    description: "Configure notification preferences",
    fields: [
      {
        label: "Email Notifications",
        type: "switch",
        value: true,
      },
      {
        label: "Push Notifications",
        type: "switch",
        value: false,
      },
    ],
  },
  {
    title: "Email Settings",
    icon: Mail,
    description: "Configure email server and templates",
    fields: [
      {
        label: "SMTP Server",
        type: "text",
        value: "smtp.divinecollegeofarts.com",
      },
      {
        label: "SMTP Port",
        type: "number",
        value: 587,
      },
    ],
  },
  {
    title: "Website Settings",
    icon: Globe,
    description: "Configure website appearance and behavior",
    fields: [
      {
        label: "Site Title",
        type: "text",
        value: "Divine College",
      },
      {
        label: "Maintenance Mode",
        type: "switch",
        value: false,
      },
    ],
  },
  {
    title: "Backup & Storage",
    icon: Database,
    description: "Configure backup settings and storage options",
    fields: [
      {
        label: "Auto Backup",
        type: "switch",
        value: true,
      },
      {
        label: "Backup Frequency (days)",
        type: "number",
        value: 7,
      },
    ],
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState(settingSections)
  const [users, setUsers] = useState<User[]>([])
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserFormData | null>(null)

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      if (!response.ok) throw new Error('Failed to fetch users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }

  const handleAddUser = async (data: UserFormData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to add user')
      }

      await fetchUsers()
      setIsUserModalOpen(false)
    } catch (error) {
      console.error('Error adding user:', error)
      throw error
    }
  }

  const handleEditUser = async (data: UserFormData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update user')
      }

      await fetchUsers()
      setIsUserModalOpen(false)
      setEditingUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  const handleUserAction = async (data: UserFormData) => {
    if (editingUser) {
      await handleEditUser(data)
    } else {
      await handleAddUser(data)
    }
  }

  const openEditModal = (user: User) => {
    setEditingUser({
      id: user.id,
      name: user.name,
      email: user.email,
      password: '', // Empty password field for editing
      role: user.role
    })
    setIsUserModalOpen(true)
  }

  const handleFieldChange = (sectionIndex: number, fieldIndex: number, value: string | number | boolean) => {
    const newSettings = [...settings]
    newSettings[sectionIndex].fields[fieldIndex].value = value
    setSettings(newSettings)
  }

  const handleSaveChanges = async () => {
    try {
      // TODO: Implement API call to save settings
      console.log('Saving settings:', settings)
    } catch (error) {
      console.error('Error saving settings:', error)
    }
  }

  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure system settings and preferences"
      />

      <div className="space-y-4 sm:space-y-6">
        {/* User Management Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <UserIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                <p className="mt-1 text-sm text-gray-600">Manage system users and their roles</p>
              </div>
            </div>
            <Button
              onClick={() => {
                setEditingUser(null)
                setIsUserModalOpen(true)
              }}
              className="flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>

          <div className="mt-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'STAFF' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <Button
                          onClick={() => openEditModal(user)}
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-2"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Other Settings Sections */}
        {settings.map((section, sectionIndex) => (
          <div
            key={section.title}
            className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6"
          >
            <div className="flex items-start gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <section.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {section.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {section.description}
                </p>

                <div className="mt-4 space-y-4">
                  {section.fields.map((field, fieldIndex) => (
                    <div
                      key={field.label}
                      className="flex items-center justify-between"
                    >
                      <label className="text-sm font-medium text-gray-700">
                        {field.label}
                      </label>
                      {field.type === "switch" ? (
                        <button
                          type="button"
                          onClick={() => handleFieldChange(sectionIndex, fieldIndex, !field.value)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            field.value ? "bg-blue-600" : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                              field.value ? "translate-x-6" : "translate-x-1"
                            }`}
                          />
                        </button>
                      ) : field.type === "select" ? (
                        <select
                          value={field.value}
                          onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, e.target.value)}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        >
                          {(field as SelectField).options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          value={field.value}
                          onChange={(e) => handleFieldChange(
                            sectionIndex,
                            fieldIndex,
                            field.type === "number" ? Number(e.target.value) : e.target.value
                          )}
                          className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end">
          <Button onClick={handleSaveChanges} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* User Modal */}
      <Modal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false)
          setEditingUser(null)
        }}
        title={editingUser ? "Edit User" : "Add New User"}
      >
        <UserForm
          initialData={editingUser || undefined}
          onSubmit={handleUserAction}
          onCancel={() => {
            setIsUserModalOpen(false)
            setEditingUser(null)
          }}
        />
      </Modal>
    </>
  )
}
