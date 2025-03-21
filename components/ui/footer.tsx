"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-950 text-white relative z-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
           
              <Image
                src="/images/logo-white.svg"
                alt="Divine College Logo"
                width={100}
                height={40}
                className="mb-2"
              />
      
            <p className="text-sm leading-relaxed mb-4 text-white">
              Divine College of Creative Arts is committed to nurturing creative excellence
              and preparing students for successful careers in the arts and design industry.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-purple-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-indigo-300 hover:text-indigo-200 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/programs" className="text-sm text-white hover:text-white transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-sm text-white hover:text-white transition-colors">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/campus-life" className="text-sm text-white hover:text-white transition-colors">
                  Campus Life
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-white hover:text-white transition-colors">
                  Events & News
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm">
                <Mail size={16} className="text-white" />
                <a href="mailto:Sabbebg1000@gmail.com" className="text-white hover:text-white transition-colors">
                  Sabbebg1000@gmail.com
                </a>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone size={16} className="text-white" />
                <div className="flex flex-col">
                  <a href="tel:+233249961898" className="text-white hover:text-white transition-colors">
                    +233 24 996 1898
                  </a>
                  <a href="tel:+233249961898" className="text-white hover:text-white transition-colors">
                    +233 24 996 1898 (Business)
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-white" />
                <span className="text-white">
                  P.O. Box 2152<br />
                  Kaneshie, Accra<br />
                  Ghana
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm mb-4 text-indigo-200">
              Subscribe to our newsletter for updates on events, admissions, and campus news.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-sm bg-indigo-950/50 border border-indigo-800 rounded-lg focus:outline-none focus:border-purple-500 text-white placeholder-indigo-300"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 text-sm bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-indigo-900 text-sm text-center text-indigo-300">
          <p> {currentYear} Divine College of Creative Arts. All rights reserved.</p>
          <p>Designed by G-tech Solutions</p>
        </div>
      </div>
    </footer>
  )
}
