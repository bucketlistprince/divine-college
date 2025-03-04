"use client";

import { useState } from 'react';
import AdminSidebar from '@/components/admin-sidebar';
import { Navigation } from '../components/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div 
          className={`flex-1 overflow-y-auto bg-gray-50 transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'mx-0' : 'mx-0'
          }`}
        >
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}