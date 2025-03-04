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
          className={`flex-1 overflow-y-auto transition-all duration-300 ease-in-out ${
            sidebarOpen ? 'mx-2' : 'mx-2'
          }`}
        >
          <main className="p-8 bg-blue-50">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}