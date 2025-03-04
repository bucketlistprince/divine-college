"use client"

import { useState } from "react"
import Link from 'next/link';
import { LoginDialog } from "./login-dialog"

export function Navigation() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b z-50 dark:bg-gray-950/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-primary">
            Divine College
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/about" className="text-gray-700 hover:text-primary dark:text-gray-300">
              About Us
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-primary dark:text-gray-300">
              Courses
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-primary dark:text-gray-300">
              Events
            </Link>
            <Link href="/gallery" className="text-gray-700 hover:text-primary dark:text-gray-300">
              Gallery
            </Link>
            <Link href="/shop" className="text-gray-700 hover:text-primary dark:text-gray-300">
              Shop
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary dark:text-gray-300">
              Contact
            </Link>
            <div className="flex items-center space-x-4">
              <Link 
                href="/apply" 
                className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Apply Now
              </Link>
              <span className="text-gray-300">|</span>
              <button 
                onClick={() => setShowLoginDialog(true)}
                className="flex items-center space-x-1 text-gray-700 hover:text-primary dark:text-gray-300"
              >
                <svg 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                  />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:text-primary dark:text-gray-300">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <LoginDialog 
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </nav>
  );
}
