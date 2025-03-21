"use client"

import React from "react"
import { useEffect } from "react"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from "next/navigation"
import { Menu, X, User, LogOut, ShoppingCart, ChevronDown } from "lucide-react"
import { LoginDialog } from "./login-dialog"
import { useNavigation } from "@/components/providers/navigation-provider"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface NavGroup {
  label: string
  items: {
    href: string
    label: string
  }[]
}

export function Navigation(): React.ReactElement {
  const [showLoginDialog, setShowLoginDialog] = React.useState(false)
  const { isMenuOpen, setIsMenuOpen, openGroups, setOpenGroups } = useNavigation()
  const [user, setUser] = React.useState<{ email: string; role: string } | null>(null)
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const pathname = usePathname()

  useEffect(() => {
    // Check for login parameter in URL
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('login') === 'true') {
        setShowLoginDialog(true)
        // Remove the login parameter from URL
        params.delete('login')
        const newUrl = window.location.pathname + (params.toString() ? `?${params.toString()}` : '')
        window.history.replaceState({}, '', newUrl)
      }

      // Load cart items from localStorage
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart))
        } catch (error) {
          console.error('Error parsing cart data:', error)
          localStorage.removeItem('cart') // Clear invalid data
        }
      }

      // Listen for cart updates
      const handleStorageChange = (e: StorageEvent) => {
        if (e.key === 'cart' && e.newValue) {
          try {
            setCartItems(JSON.parse(e.newValue))
          } catch (error) {
            console.error('Error parsing cart data:', error)
          }
        }
      }

      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  // Effect to check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/user')
        if (response.ok) {
          const userData = await response.json()
          setUser(userData)
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error('Error checking auth:', error)
        setUser(null)
      }
    }

    checkAuth()
  }, [])

  useEffect(() => {
    console.log("Initial render: isMenuOpen =", isMenuOpen, "openGroups =", openGroups)
  }, [])

  const handleLogin = (userData: { email: string; role: string }) => {
    setUser(userData)
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      
      if (response.ok) {
        setUser(null)
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  const handleLinkClick = () => {
    console.log("Closing menu and resetting groups")
    setIsMenuOpen(false)
    setOpenGroups([])
  }

  const toggleMenu = () => {
    console.log("Toggling mobile menu: isMenuOpen =", !isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleGroup = (groupLabel: string) => {
    setOpenGroups(openGroups.includes(groupLabel) 
      ? openGroups.filter(g => g !== groupLabel)
      : [...openGroups, groupLabel])
  }

  const navGroups: NavGroup[] = [
    {
      label: "About",
      items: [
        { href: "/about", label: "About Us" },
        { href: "/contact", label: "Contact" },
        { href: "/news", label: "News" },
        { href: "/events", label: "Events" },
        
      ],
    },
    {
      label: "Academic",
      items: [
        { href: "/courses", label: "Courses" },
        { href: "/apply", label: "Apply" },
      ],
    },
    {
      label: "Resources",
      items: [
        { href: "/gallery", label: "Gallery" },
        { href: "/shop", label: "Shop" },
      ],
    },
  ]

  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 dark:bg-gray-800/80">
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo-black.svg"
                alt="Divine College"
                width={40}
                height={40}
                className="dark:hidden"
              />
              <Image
                src="/images/logo-white.svg"
                alt="Divine College"
                width={40}
                height={40}
                className="hidden dark:block"
              />
              <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                <span className="hidden sm:inline">Divine College</span>
                <span className="sm:hidden">DCCA</span>
              </span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navGroups.map((group) => (
                <div key={group.label} className="relative group">
                  <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors flex items-center gap-1.5">
                    {group.label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 mt-1 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all duration-200 ease-in-out">
                    <div className="py-1">
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={handleLinkClick}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Right side items */}
              <div className="flex items-center pl-4 ml-4 border-l border-gray-200 dark:border-gray-700">
                {/* Cart button - only show on shop pages */}
                {pathname && (pathname === '/shop' || pathname.startsWith('/shop/')) && (
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        const event = new CustomEvent('openCart')
                        window.dispatchEvent(event)
                      }
                    }}
                    className="relative p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </button>
                )}

                {/* User menu */}
                <div className="flex items-center space-x-4 ml-4">
                  {!user ? (
                    <button
                      onClick={() => setShowLoginDialog(true)}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                    >
                      <User className="h-5 w-5" />
                      <span>Login</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-4">
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}

                  {/* Apply Now button */}
                  <Link
                    href="/apply"
                    className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Cart button - only show on shop pages */}
              {pathname && (pathname === '/shop' || pathname.startsWith('/shop/')) && (
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      window.dispatchEvent(new CustomEvent('openCart'))
                    }
                  }}
                  className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors relative"
                >
                  <ShoppingCart className="h-6 w-6" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </button>
              )}

              {/* Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-16 md:hidden bg-white dark:bg-gray-800 overflow-y-auto shadow-lg border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
              <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-700 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <div className="flex-1 overflow-y-auto py-4 px-4 space-y-3">
                  {navGroups.map((group) => (
                    <div key={group.label} className="space-y-2">
                      <button
                        onClick={() => toggleGroup(group.label)}
                        className="w-full px-4 py-2.5 text-base font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors flex items-center justify-between"
                      >
                        {group.label}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${openGroups.includes(group.label) ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {/* Simplified dropdown visibility */}
                      {openGroups.includes(group.label) && (
                        <div className="pl-4 space-y-1">
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => {
                                console.log("Navigating to:", item.href)
                                handleLinkClick()
                              }}
                              className="block px-4 py-2.5 text-base text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 rounded-lg transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                </div>
                {/* Mobile user controls */}
                <div className="py-4 px-4 space-y-3 bg-gray-50 dark:bg-gray-800/50">


                  {/* Apply Now button */}
                  <Link
                    href="/apply"
                    onClick={handleLinkClick}
                    className="block w-full px-4 py-3 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors"
                  >
                    Apply Now
                  </Link>

                  {/* User menu */}
                  {!user ? (
                    <button
                      onClick={() => {
                        setShowLoginDialog(true)
                        setIsMenuOpen(false)
                      }}
                      className="block w-full px-4 py-3 text-base font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
                    >
                      Sign In
                    </button>
                  ) : (
                    <>
                      {user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={handleLinkClick}
                          className="block w-full px-4 py-3 text-base font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg text-center transition-colors"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          handleLogout()
                          setIsMenuOpen(false)
                        }}
                        className="block w-full px-4 py-3 text-base font-semibold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors flex items-center justify-center gap-2"
                      >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                      </button>
                    </>
                  )}


                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        onLogin={handleLogin}
      />
    </nav>
  )
}

