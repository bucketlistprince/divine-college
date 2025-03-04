import { useState } from 'react';
import { Menu, X, BookOpen, Calendar, Image, ShoppingBag, UserPlus, Settings } from 'lucide-react';
import Link from 'next/link';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  className?: string;
}

export default function AdminSidebar({
  sidebarOpen,
  setSidebarOpen,
}: AdminSidebarProps) {
  return (
    <div
      className={`h-screen bg-white border-r border-gray-100 shadow-sm transition-all duration-300 ease-in-out ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {sidebarOpen ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="font-semibold text-gray-800">AdminPro</span>
          </div>
        ) : (
          <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center mx-auto">
            <span className="text-white font-bold">A</span>
          </div>
        )}
        
        <button
          className="rounded-full p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
      
      <div className="px-3 py-6">
        <nav>
          <div className={`${sidebarOpen ? 'px-3 mb-4' : 'text-center mb-4'}`}>
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              {sidebarOpen ? 'Main Menu' : ''}
            </span>
          </div>
          
          <ul className="space-y-1">
            <li>
              <Link href="/admin/courses" className="flex items-center gap-3 p-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                <BookOpen size={20} />
                {sidebarOpen && <span>Courses</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/events" className="flex items-center gap-3 p-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                <Calendar size={20} />
                {sidebarOpen && <span>Events</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/gallery" className="flex items-center gap-3 p-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                <Image size={20} />
                {sidebarOpen && <span>Gallery</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/shop" className="flex items-center gap-3 p-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                <ShoppingBag size={20} />
                {sidebarOpen && <span>Shop</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/admissions" className="flex items-center gap-3 p-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                <UserPlus size={20} />
                {sidebarOpen && <span>Admissions</span>}
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center gap-3 p-2.5 rounded-lg transition-colors text-gray-600 hover:bg-gray-50 hover:text-indigo-600">
                <Settings size={20} />
                {sidebarOpen && <span>Settings</span>}
              </Link>
            </li>
          </ul>
          
          {sidebarOpen && (
            <div className="mt-8 pt-8 border-t border-gray-100">
              <div className="flex items-center px-3 py-3 rounded-lg bg-gray-50">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-600 font-medium text-sm">JD</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}