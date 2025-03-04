"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

interface LoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginDialog({ isOpen, onClose }: LoginDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Demo credentials - remove this in production
  const demoCredentials = [
    {
      email: "admin@divinecollege.com",
      password: "admin",
      role: "administrator",
      name: "Admin User"
    },
    {
      email: "faculty@divinecollege.com",
      password: "faculty",
      role: "faculty",
      name: "Faculty Member"
    },
    {
      email: "student@divinecollege.com",
      password: "student",
      role: "student",
      name: "Student User"
    }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      // Check demo credentials
      const user = demoCredentials.find(u => 
        u.email === email && u.password === password
      )

      if (user) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Set authentication state
        sessionStorage.setItem("isAuthenticated", "true")
        sessionStorage.setItem("userRole", user.role)
        sessionStorage.setItem("userName", user.name)
        
        router.push("/admin/dashboard")
        onClose()
      } else {
        setError("Invalid credentials")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to Dashboard</DialogTitle>
          <DialogDescription>
            Enter your credentials to access the admin dashboard.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
